from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    # Add your own fields here
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    class Meta:
        app_label = 'accounts'
    def __str__(self):
        return self.username