from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    phone = models.IntegerField(null=True)
    email = models.EmailField(blank=True)
    