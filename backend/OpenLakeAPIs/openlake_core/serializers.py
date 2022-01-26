from rest_framework import serializers
from openlake_core.models import Drone,Lake,Analysis,Data



class DroneSerializer(serializers.ModelSerializer):
    """
    The model is 'Drone' and the fields are 'id', 'name', 'description' and 'contributor'.
    """
    class Meta:
        model = Drone
        fields = ('id','name', 'description')

class LakeSerializer(serializers.ModelSerializer):
    """
    The model is 'Lake' and the fields are 'id', 'name' and 'address'.
    """
    class Meta:
        model = Lake
        fields = ('id','name', 'address')

class AnalysisSerializer(serializers.ModelSerializer):
    """
    The model is 'Analysis' and the fields are 'id', 'datenav', 'heurenav', 'dureenav', 'drone' and 'lake'.
    """
    class Meta:
        model = Analysis
        fields = ('id','datenav', 'hournav','durationnav','drone','lake','avg_ph','avg_temp','avg_conduc','avg_oxygen')



class DataSerializer(serializers.ModelSerializer):
    """
    The model is 'Data' and the fields are 'id', 'latgps', 'longgps', 'temperature', 'ph', 'conductivity', 'freqbat','oxygen','depht' and 'analysis'.
    """
    class Meta:
        model = Data
        fields = ('id','latgps', 'longgps','temperature','ph','conductivity','freqbat','depht','oxygen','analysis')

class ImportAnalysisSerializer(serializers.Serializer):
    """
    This class helps us to import a file.
    """
    file_uploaded = serializers.FileField()
    class Meta:
       fields = ['file_uploaded']

class ImportSiteOLAlaSerializer(serializers.Serializer):
    """
    This class helps us to import a file (File from 'https://si-ola.inrae.fr').
    """
    file_uploaded = serializers.FileField(allow_empty_file = False)
    class Meta:
        fields = ['file_uploaded']
