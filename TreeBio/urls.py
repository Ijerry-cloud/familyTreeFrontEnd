from django.urls import path, include
from .views import *

urlpatterns = [
    path("", GetFamilyTreeApiView.as_view(), name="get_family_tree"),
    path("<int:id>/", GetFamilyTreeApiView.as_view(), name="get_family_tree"),
    path("details/<int:id>/", GetFamilyTreeDetailApiView.as_view(), name="get_family_tree"),
]
