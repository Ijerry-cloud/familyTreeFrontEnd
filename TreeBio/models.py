from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.
class TreeBio(models.Model):
    
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="children")
    spouse = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="uspouse")
    first_name = models.CharField(max_length=1000, null=True, blank=True)
    last_name = models.CharField(max_length=1000, null=True, blank=True)
    gender = models.CharField(max_length=11, null=True, blank=True)
    marital_status = models.CharField(max_length=11, null=True, blank=True)
    dob = models.DateField(null=True)
    
    def __str__(self) -> str:
        return "%s %s" % (self.first_name, self.last_name)


class TreeBio2(MPTTModel):

    GENDER_CHOICES = [('male', 'male'), ('female', 'Female')]
    
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="children")
    spouse = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, related_name="uspouse")
    first_name = models.CharField(max_length=1000, null=True, blank=True)
    surname = models.CharField(max_length=1000, null=True, blank=True)
    last_name = models.CharField(max_length=1000, null=True, blank=True)
    gender = models.CharField(max_length=11, null=True, blank=True, choices=GENDER_CHOICES)
    marital_status = models.CharField(max_length=11, null=True, blank=True)
    dob = models.DateField(null=True)
    image = models.TextField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    bio2 = models.TextField(null=True, blank=True)
    bio3 = models.TextField(null=True, blank=True)
    bio4 = models.TextField(null=True, blank=True)
    bio5 = models.TextField(null=True, blank=True)
    main_image = models.ImageField(upload_to='main_events/%Y/%m/%d/', blank=True)
    
    def __str__(self) -> str:
        return "%s %s" % (self.first_name, self.last_name)


    
