# dashboard/models.py
from django.db import models

class SocialMediaAccount(models.Model):
    platform = models.CharField(max_length=50)
    username = models.CharField(max_length=100)
    access_token = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Post(models.Model):
    account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE)
    content = models.TextField()
    scheduled_time = models.DateTimeField()

    def __str__(self):
        return self.content