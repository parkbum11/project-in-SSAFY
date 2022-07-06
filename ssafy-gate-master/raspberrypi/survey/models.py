# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Articles(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    pro = models.ForeignKey('Pros', models.DO_NOTHING, blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = 'articles'


class ProSurveys(models.Model):
    id = models.BigAutoField(primary_key=True)
    text = models.CharField(max_length=200)
    checked = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pro_surveys'


class Pros(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    userid = models.CharField(max_length=50)
    password = models.CharField(max_length=500)
    region = models.ForeignKey('Regions', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pros'


class Regions(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'regions'


class Students(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    class_field = models.BigIntegerField(db_column='class')  # Field renamed because it was a Python reserved word.
    profile_img = models.TextField(blank=True, null=True)
    region = models.ForeignKey(Regions, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'students'


class Surveys(models.Model):
    id = models.BigAutoField(primary_key=True)
    body_temperature = models.FloatField()
    danger = models.BooleanField()
    body_check = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    student = models.ForeignKey(Students, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'surveys'
