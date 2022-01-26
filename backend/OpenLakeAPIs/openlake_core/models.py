# Django REST framework
from django.db import models

from phone_field import PhoneField



class Drone(models.Model):
    """
    Class to represent a Drone.
    """

    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')

    name = models.CharField(max_length=70, blank=False, default='')
    """
    A string field to store drone name.

        * max_length: 70 characters
    """

    description = models.CharField(max_length=200,blank=False, default='')
    """
    A string field to store drone description.

        * max_length: 200 characters
    """



class Lake(models.Model):
    """
    Class to represent a Lake.http://127.0.0.1:8000/admin/
    """

    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')

    name = models.CharField(max_length=70, blank=False, default='')
    """
    A string field to store lake name.

        * max_length: 70 characters
    """

    address = models.CharField(max_length=200,blank=False, default='')
    """
    A string field to store lake address.

        * max_length: 200 characters
    """

    def __str__(self):
        return '%s' % (self.name)

class Analysis(models.Model):
    """
    Class to represent an Analysis.
    """

    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')

    datenav = models.DateField()
    """
    A data field to store date of navigation.
    """

    hournav = models.TimeField(null=True, blank=True)
    """
    A data field to store hour of navigation.
    """

    durationnav = models.TimeField(null=True, blank=True)
    """
    A data field to store time of navigation.
    """

    avg_ph = models.DecimalField(max_digits=8, decimal_places=4, blank = True, null = True)

    avg_conduc = models.DecimalField(max_digits=8, decimal_places=4, blank = True, null = True)

    avg_temp = models.DecimalField(max_digits=8, decimal_places=4, blank = True, null = True)

    avg_oxygen = models.DecimalField(max_digits=8, decimal_places=4, blank = True, null = True)

    drone = models.ForeignKey(Drone, on_delete=models.CASCADE, null=True, blank=True)
    """
    * ForeignKey to Drone class
    """

    lake = models.ForeignKey('Lake',on_delete=models.CASCADE, null=False, blank=False)
    """
    * ForeignKey to Lake class
    """

class Data(models.Model):
    """
    Class to represent a Data.
    """

    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')

    latgps = models.DecimalField(max_digits=12, decimal_places=8,null=True)
    """
    A decimal field to store latitude.

        * max_digits: 12 digits
        * decimal_places: 8 places
    """

    longgps = models.DecimalField(max_digits=12, decimal_places=8,null=True)
    """
    A decimal field to store longitude.

        * max_digits: 12 digits
        * decimal_places: 8 places
    """

    temperature = models.DecimalField(max_digits=8, decimal_places=4, blank = True, null = True)
    """
    A decimal field to store temperature.

        * max_digits: 8 digits
        * decimal_places: 4 places
    """

    ph = models.DecimalField(max_digits=8, decimal_places=4, blank = True, null = True)
    """
    A decimal field to store ph.

        * max_digits: 8 digits
        * decimal_places: 4 places
    """

    conductivity = models.DecimalField(max_digits=8, decimal_places=2, blank = True, null = True)
    """
    A decimal field to store conductivity.

        * max_digits: 8 digits
        * decimal_places: 2 places
    """

    freqbat = models.DecimalField(max_digits=8, decimal_places=2, null = True)
    """
    A decimal field to store frequency of battery.

        * max_digits: 8 digits
        * decimal_places: 2 places
    """
    oxygen = models.DecimalField(max_digits=8, decimal_places=2, blank = True, null = True)
    """
    A decimal field to store oxygen.

        * max_digits: 8 digits
        * decimal_places: 2 places
    """
    depht = models.DecimalField(max_digits=8, decimal_places=2, blank = True, null = True)
    """
    A decimal field to store depht.

        * max_digits: 8 digits
        * decimal_places: 2 places
    """
    analysis = models.ForeignKey(Analysis,on_delete=models.CASCADE, null=False, blank=False)
    """
    * ForeignKey to Analysis class
    """
