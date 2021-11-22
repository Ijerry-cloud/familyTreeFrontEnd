from .models import Event 
from django_filters import rest_framework as filters
from django.db import models as django_models
import django_filters

class EventFilter(filters.FilterSet):
    start_date = filters.DateTimeFilter(field_name="start_date", lookup_expr="gt")
    end_date = filters.DateTimeFilter(field_name="end_date", lookup_expr="lt")
    tags = filters.CharFilter(field_name="tags", lookup_expr="icontains")
    title = filters.CharFilter(field_name="title", lookup_expr="icontains")

    class Meta:
        model = Event 
        fields = {
            'title': ["icontains"],
            'tags': ["icontains"],
            'start_date': ['gte', 'lte'],
            'end_date': ['gte', 'lte']
        }
        
        # this can be used to override the default date time object to a date field filter
        filter_overrides = {
            django_models.DateTimeField: {
                'filter_class': django_filters.DateFilter
            },
        }