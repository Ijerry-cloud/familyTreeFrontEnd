
from django.urls import path
from .views import *


urlpatterns = [
    path('',  ListCreateApiView.as_view(), name='list_create_event'),
    path('<int:id>/', RetrieveUpdateDestroyEventApiView.as_view(), name="get_update_destroy_event"),
    path('<int:id>/cover_image/', GetEventCoverImageView.as_view(), name="get_event_cover_image"),
]