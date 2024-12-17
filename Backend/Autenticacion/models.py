from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

from django.contrib.auth.models import AbstractUser


class Usuarios(AbstractUser):
    imagen = models.URLField(default="https://i.pinimg.com/564x/a6/00/47/a60047d44b1777aa444af361bcf4efba.jpg")
    email_verified = models.BooleanField(default=False)
    email = models.EmailField(_("email address"), blank=True, unique=True)
    