#from django.shortcuts import render

# Django REST framework
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import response
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from django.db.models import Avg
from django.forms.models import model_to_dict
from openlake_core.models import Data, Analysis, Lake
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from openlake_core.paginations import CustomPagination

# Serializers
from openlake_core.serializers import DroneSerializer,LakeSerializer,AnalysisSerializer,DataSerializer, ImportAnalysisSerializer,ImportSiteOLAlaSerializer
# Models
from openlake_core.models import Drone,Lake,Analysis,Data



class DroneViewSet(viewsets.ModelViewSet):
    """
    Queryset is the result of the query performed on the "Drone" object, it is sorted by the "name".
    """
    queryset = Drone.objects.all().order_by('name')
    serializer_class = DroneSerializer

class LakeViewSet(viewsets.ModelViewSet):
    """
    Queryset is the result of the query performed on the "Lake" object, it is sorted by the "name".
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Lake.objects.all().order_by('name')
    serializer_class = LakeSerializer
    pagination_class = CustomPagination


class AnalysisViewSet(viewsets.ModelViewSet):
    """
    Queryset is the result of the query performed on the "Analysis" object, it is sorted by the "datenav".
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Analysis.objects.all().order_by('-datenav')
    serializer_class = AnalysisSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-url

        * Classify analyzes according to navigation date
        """
        queryset = Analysis.objects.all().order_by('-datenav')
        lake_id = self.request.query_params.get('lake_id')
        if lake_id is not None:
            queryset = queryset.filter(lake=lake_id)
        return queryset


class DataViewSet(viewsets.ModelViewSet):
    """
    Queryset is the result of the query performed on the "Data" object, it is sorted by the "id".
    """
    from openlake_core.models import Data, Analysis, Lake

    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Data.objects.all().order_by('id')
    serializer_class = DataSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-the-url

        * Classify data according to their ID
        """
        queryset = Data.objects.all().order_by('id')
        analysis_id = self.request.query_params.get('analysis_id')
        avg = self.request.query_params.get('avg')
        if analysis_id is not None:
            queryset = queryset.filter(analysis=analysis_id)
        return queryset

    def __postavg(self, id):
        """
        * Calculate the average of each data : pH, Temperature, Conductivity
        * Storage in DB
        """
        if not (id == ''):
            print(id)
            analysis = Analysis.objects.get(id=id)
            avg_ph=Data.objects.filter(analysis=id).aggregate(Avg('ph'))
            avg_temp=Data.objects.filter(analysis=id).aggregate(Avg('temperature'))
            avg_conduc=Data.objects.filter(analysis=id).aggregate(Avg('conductivity'))
            avg_oxygen=Data.objects.filter(analysis=id).aggregate(Avg('oxygen'))

            print(avg_ph)
            print (analysis)
            Analysis.objects.filter(id=id).update(avg_ph=avg_ph['ph__avg'],avg_conduc=avg_conduc['conductivity__avg'],avg_temp=avg_temp['temperature__avg'],avg_oxygen=avg_oxygen['oxygen__avg'])

        return


    def put(self, request, format=None):
        """
        * Improved version of the native API PUT function
        * Addition of the calculation of the average of each data by calling the function `__postavg`
            * Calculate the average of each data : pH, Temperature, Conductivity
            * Storage in DB
        """
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            dict = request.data
            id = dict['analysis']
            self.__postavg(id)
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, format=None):
        """
        * Improved version of the native API PUT function
        * Addition of the calculation of the average of each data by calling the function `__postavg`
            * Calculate the average of each data : pH, Temperature, Conductivity
            * Storage in DB
        """
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            dict = request.data
            id = dict['analysis']
            self.__postavg(id)
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        * Allows you to delete a value in the Database: Delete
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        a = model_to_dict(instance)['analysis']
        self.__postavg(a)
        return response.Response(DataSerializer(self.get_object()).data)


    def perform_destroy(self, instance):
        """
        * Allows you to delete a value in the Database: Delete
        """
        instance.delete()

class ImportAnalysisViewSet(viewsets.ViewSet):
    """
    This class helps us to import a CSV file.

    This CSV file contenent data
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ImportAnalysisSerializer
    
    
    def __ifempty(self, obj):
        """
        This function verify if a string is empty,
        and put the none value to him if it the case
        """
        if obj == "":
            obj = None
        return obj

    


    def list(self, request):
        return response.Response("GET API")

    def create(self, request):

        import csv, io , dateparser
        from openlake_core.models import Data, Analysis, Lake
        csv_analysis = request.FILES.get('file_uploaded')
        
        idlake = request.query_params.get('lakeid')
        print(idlake)
        #idlake="1"
        idlake = int(idlake)
        lakeadd = Lake.objects.get(id=idlake)
        
        print(lakeadd)

        content_type = csv_analysis.content_type
        decoded_file = csv_analysis.read().decode('iso-8859-1') #https://stackoverflow.com/questions/57483114/drf-upload-csv-file-then-iterate-over-each-row
        io_string = io.StringIO(decoded_file)
        data = ""
        lake_list_data = []
        if content_type == 'text/csv':
            reader = csv.DictReader(io_string, delimiter=';')  #https://docs.python.org/3/library/csv.html#csv.DictReader
            for row in reader:
                lake_time = row['heure']
                lake_time = self.__ifempty(lake_time)
                lake_date = row['date de prélèvement']
                
                if not lake_date == '':
                    lake_date_us = dateparser.parse(lake_date).date()
                    recordanalysis = Analysis(datenav= lake_date_us,hournav=lake_time,lake=lakeadd)
                    recordanalysis.save()

                lake_temp= row['Température (°c)']
                lake_temp = self.__ifempty(lake_temp)
                lake_conduc=row['cond25degres (ms/cm)']
                lake_conduc = self.__ifempty(lake_conduc)
                lake_ph=row['ph tc (nounit)']
                lake_ph = self.__ifempty(lake_ph)
                lake_depht=row['profondeur réelle observée (m)']
                lake_depht=self.__ifempty(lake_depht)
                lake_oxygen=row['oxygene mg (mg/l)']
                lake_oxygen=self.__ifempty(lake_oxygen)
                analysis_id = Analysis.objects.latest('id')
                #print(analysis_id)
                lake_list_data.append(Data(temperature=lake_temp,conductivity=lake_conduc,ph=lake_ph,oxygen=lake_oxygen,depht=lake_depht,analysis=analysis_id))
            Data.objects.bulk_create(lake_list_data)
            
            avg_ph=Data.objects.filter(analysis=analysis_id).aggregate(Avg('ph'))
            avg_temp=Data.objects.filter(analysis=analysis_id).aggregate(Avg('temperature'))
            avg_conduc=Data.objects.filter(analysis=analysis_id).aggregate(Avg('conductivity'))
            avg_oxygen=Data.objects.filter(analysis=analysis_id).aggregate(Avg('oxygen'))
            Analysis.objects.filter(id=model_to_dict(analysis_id)['id']).update(avg_ph=avg_ph['ph__avg'],avg_conduc=avg_conduc['conductivity__avg'],avg_temp=avg_temp['temperature__avg'],avg_oxygen=avg_oxygen['oxygen__avg'])
            print(model_to_dict(analysis_id)['id'])
            data1 = model_to_dict(analysis_id)['id']
            

            return response.Response(data=str(data1),status=201)
        else:
            response.Response("Bad content type. Please import .csv file")

                



        # import csv, io
        # from openlake_core.models import Data
        # file_uploaded = request.FILES.get('file_uploaded')
        # content_type = file_uploaded.content_type
        # decoded_file = file_uploaded.read().decode() #https://stackoverflow.com/questions/57483114/drf-upload-csv-file-then-iterate-over-each-row
        # io_string = io.StringIO(decoded_file)
        # if content_type == 'text/csv':
        #     csv_reader = csv.reader(io_string, delimiter=',')
        #     line_count = 0
        #     data_list = []
        #     for row in csv_reader:
        #         if line_count == 0:
        #             print(f'Column names are {", ".join(row)}')
        #             line_count += 1
        #         else:
        #             print(row[0],row[1],row[2],row[3],row[4],row[5])
        #             line_count += 1
        #             data_list.append(Data(temperature=row[0],conductivity=row[1],ph=row[2],latgps=row[3],longgps=row[4],freqbat=2.4))

        #     Data.objects.bulk_create(data_list)
        #     data = "POST API and you have uploaded a {} file".format(content_type)
        #     return response.Response(data)
        # else:
        #     response.Response("Bad content type. Please import .csv file")



class ImportAnalysisSiteViewSet(viewsets.ViewSet):
    """
    This class helps us to import a file (File from 'https://si-ola.inrae.fr').
    """
    serializer_class = ImportSiteOLAlaSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def __ifempty(self, obj):
        """
        This function verify if a string is empty,
        and put the none value to him if it the case
        """
        if obj == "":
            obj = None
        return obj

    def create(self, request):
        """
        This function get a csv file from OLA site
        and adapt it and insert value in the Database
        """
        #This part get the file posted, verify the content type, decode the to utf-8
        import csv, io , dateparser
        from openlake_core.models import Data, Analysis, Lake
        csv_ola = request.FILES.get('file_uploaded')
        idlake=''
        idlake = request.query_params.get('lakeid')
        print(idlake)
        
        content_type = csv_ola.content_type
        decoded_file = csv_ola.read().decode('iso-8859-1') #https://stackoverflow.com/questions/57483114/drf-upload-csv-file-then-iterate-over-each-row
        io_string = io.StringIO(decoded_file)
        data = ""
        if content_type == 'text/csv':
            reader = csv.DictReader(io_string, delimiter=';')  #https://docs.python.org/3/library/csv.html#csv.DictReader


            lake_list_analysis = []
            lake_list_data = []
            lake_list_analysis_exist = []


            #This part get the lake name from csv, verify if it exist in the database and store it in the database
            for row in reader:

                lake_name = row['nom du site']
                lake_date_us = dateparser.parse(row['date de prélèvement']).date()
                if not Lake.objects.filter(name=lake_name).exists():
                    record2 = Lake(name = lake_name)
                    record2.save()

                lake_id = Lake.objects.get(name=lake_name)



                #This part get the analysis data, store it in a list and verify that analysis does not exist in that list
                lake_time = row['heure']
                lake_time = self.__ifempty(lake_time)
                lake_date = row['date de prélèvement']

                if not lake_date in lake_list_analysis_exist:
                    lake_date_us = dateparser.parse(lake_date).date()
                    if not Analysis.objects.filter(datenav=lake_date_us,lake=Lake.objects.get(name=lake_name)).exists():

                        lake_list_analysis.append(Analysis(datenav=lake_date_us,hournav=lake_time,lake=lake_id))
                    lake_list_analysis_exist.append(lake_date)


                #This part get the data data, store it in a list
            Analysis.objects.bulk_create(lake_list_analysis)
            io_string.seek(0)
            reader = csv.DictReader(io_string, delimiter=';')
            for row in reader:
                lake_temp= row['Température (°c)']
                lake_temp = self.__ifempty(lake_temp)
                lake_conduc=row['cond25degres (ms/cm)']
                lake_conduc = self.__ifempty(lake_conduc)
                lake_ph=row['ph tc (nounit)']
                lake_ph = self.__ifempty(lake_ph)
                lake_depht=row['profondeur réelle observée (m)']
                lake_depht=self.__ifempty(lake_depht)
                lake_oxygen=row['oxygene mg (mg/l)']
                lake_oxygen=self.__ifempty(lake_oxygen)

                lake_date = row['date de prélèvement']
                lake_date_us = dateparser.parse(lake_date).date()
                analysis_id = Analysis.objects.get(datenav=lake_date_us,lake=Lake.objects.get(name=lake_name))

                lake_list_data.append(Data(temperature=lake_temp,conductivity=lake_conduc,ph=lake_ph,oxygen=lake_oxygen,depht=lake_depht,analysis=analysis_id))
            Data.objects.bulk_create(lake_list_data)


            for i in lake_list_analysis_exist:
                date_lake = dateparser.parse(i).date()
                id_analysis = Analysis.objects.get(datenav=date_lake,lake=Lake.objects.get(name=lake_name))
                print(id_analysis)
                analysis = Analysis.objects.get(id=model_to_dict(id_analysis)['id'])
                print(analysis)
                avg_ph=Data.objects.filter(analysis=id_analysis).aggregate(Avg('ph'))
                avg_temp=Data.objects.filter(analysis=id_analysis).aggregate(Avg('temperature'))
                avg_conduc=Data.objects.filter(analysis=id_analysis).aggregate(Avg('conductivity'))
                avg_oxygen=Data.objects.filter(analysis=id_analysis).aggregate(Avg('oxygen'))
                print(avg_ph)
                Analysis.objects.filter(id=model_to_dict(id_analysis)['id']).update(avg_ph=avg_ph['ph__avg'],avg_conduc=avg_conduc['conductivity__avg'],avg_temp=avg_temp['temperature__avg'],avg_oxygen=avg_oxygen['oxygen__avg'])






            data = "POST API and you have uploaded a {} file".format(content_type)


            return response.Response(data)
        else:
            response.Response("Bad content type. Please import .csv file")
