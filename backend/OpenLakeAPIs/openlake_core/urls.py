# Django URLs framework
from django.urls import path, include, re_path
from django.views.generic import TemplateView #To use swagger-ui template
from openlake_core.views import AnalysisViewSet

# app views
from openlake_core import views

# Django REST framework routers
from rest_framework import routers

# Configure Django REST framework router


router = routers.DefaultRouter()
router.register(r'drone', views.DroneViewSet)
router.register(r'lake', views.LakeViewSet)
router.register(r'analysis', views.AnalysisViewSet) #=> ViewSet only use path instead !
#router.register(r'analysis/(?P<id>.+)/$', views.AnalysisSerializer)




router.register(r'data', views.DataViewSet)

router.register(r'upload', views.ImportAnalysisViewSet, basename="upload")
router.register(r'uploadola', views.ImportAnalysisSiteViewSet, basename="uploadola")

urlpatterns = [
    path('', include(router.urls)),
]
