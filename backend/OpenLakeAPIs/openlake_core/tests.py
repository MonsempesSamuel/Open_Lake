from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase
from openlake_core.urls import *
from openlake_core.models import *
from openlake_core.views import *
import sys
import csv, io , dateparser, os



class LakeTests(APITestCase):



    def test_import_ola(self):

        """Ensure we can post a csv from si-ola.com ."""


        from django.core.files.uploadedfile import SimpleUploadedFile
        # from django.core.files import File
        #url = 'http://127.0.0.1:8000/api/uploadola/'
        url = '/api/uploadola/'
        print (url)
        myfile = open('../CSVOLA/pave__1634909919393-993580.csv', 'rb')
        content = SimpleUploadedFile(content = myfile.read(), name = myfile.name, content_type='text/csv')
        data = {'file_uploaded': content}
        response = self.client.post(url, data)
        self.assertEqual(Lake.objects.get().name, 'Pavé')


    def test_get_post_db(self):
        """Ensure we can create a new drone object."""


        url = '/api/drone/'
        # id_contributor = Contributor.objects.get(lastname='lncontributeur').id
        #sys.stderr.write(repr(id_contributor) + '\n')
        data = {'name': 'ndrone', 'description': 'le drone de test'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Drone.objects.count(), 1)
        self.assertEqual(Drone.objects.get().name,'ndrone')
        id_drone = Drone.objects.get(name='ndrone').id
