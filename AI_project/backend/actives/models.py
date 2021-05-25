from django.db import models
from users.models import User

# Create your models here.
class Active(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_time = models.DateTimeField(auto_now=False, auto_now_add=False)


class ActiveDetail(models.Model):
    CHOICES = [
        (1, '집중'),
        (2, '휴식'),
        (3, '졸음'),
        (4, '딴짓')
    ]

    active = models.ForeignKey(
        Active,
        on_delete=models.CASCADE
    )
    active_type = models.IntegerField(choices=CHOICES, null=False)
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_time = models.DateTimeField(auto_now=False, auto_now_add=False)