from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    TYPE_CHOICES = [
        ('simple_user', 'Simple User'),
        ('staff', 'staff'),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='simple_user')
    def __str__(self):
        return self.username
class Job(models.Model):
    title = models.CharField(max_length=100)
    overview = models.TextField()
    description = models.JSONField(default=list)
    experience = models.CharField(max_length=50)
    work_level = models.CharField(max_length=50)
    employee_type = models.CharField(max_length=50)
    variables = models.JSONField(default=list)
    results=models.JSONField(default=list)
    def __str__(self):
        return self.title
class JobUser(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    job=models.ForeignKey(Job, on_delete=models.CASCADE)
    results = models.JSONField(default=list)
    def __str__(self):
        return self.user.username

class mbti(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    results= models.JSONField(default=dict)
    questions = models.JSONField(default=list)
    responses = models.JSONField(default=list)
    passed  =models.BooleanField(default=False)
    def __str__(self):
        return self.user.username

class big5Test(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    results= models.JSONField(default=dict)
    passed  =models.BooleanField(default=False)
    def __str__(self):
        return self.user.username