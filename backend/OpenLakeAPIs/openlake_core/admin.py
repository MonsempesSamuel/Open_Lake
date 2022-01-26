from django.contrib import admin
from .models import Drone, Lake, Analysis, Data
# Register your models here.

admin.site.register(Drone)
admin.site.register(Lake)
admin.site.register(Analysis)
admin.site.register(Data)
