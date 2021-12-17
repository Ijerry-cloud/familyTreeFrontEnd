from django.contrib import admin
from .models import *


class TreeBio2Admin(admin.ModelAdmin):

    def get_form(self, request, obj=None, **kwargs):
        form = super(TreeBio2Admin, self).get_form(request, obj, **kwargs)
        form.base_fields['parent'].required = False
        form.base_fields['spouse'].required = False
        form.base_fields['dob'].required = False
        return form



# Register your models here.
admin.site.register(TreeBio2, TreeBio2Admin)