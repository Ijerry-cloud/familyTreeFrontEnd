from django.urls import path
from .views import *


urlpatterns = [
    path('all/', ListAllApiView.as_view(), name="list_all")
]