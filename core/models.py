from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.json import JSONField

# Create your models here.
class Profile(models.Model):

    first_name = models.CharField(max_length=1000, null=True)
    middle_name = models.CharField(max_length=1000, null=True)
    last_name = models.CharField(max_length=1000, null=True)
    date_of_birth = models.DateField(null=True)
    hobbies = models.TextField(null=True, blank=True)
    image = models.FileField(null=True)
    gender = models.CharField(max_length=1000, null=True)
    additional_data = JSONField(default=list)


    def __str__(self):
        return "%s %s %s" % (self.last_name, self.middle_name. self.first_name)


    

