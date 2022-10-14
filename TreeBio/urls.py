from django.urls import path, include
from .views import *

urlpatterns = [
    path("", GetFamilyTreeApiView.as_view(), name="get_family_tree"),
    path("v2/", GetFamilyTreeApiViewApiViewV2.as_view(), name="get_family_tree_v2"),
    path("<int:id>/", GetFamilyTreeApiView.as_view(), name="get_family_tree"),
    path("details/<int:id>/", GetFamilyTreeDetailApiView.as_view(), name="get_family_tree"),
    path("details/<int:id>/image/", GetFamilyTreeBio2ImageApiView.as_view(), name="get_family_tree_image"),
    path("search/", GetFamilyTreeApiSearchApiView.as_view(), name="search_tree")
]
