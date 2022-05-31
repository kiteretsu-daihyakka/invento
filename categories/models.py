from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class Business(AbstractUser):
    name = models.CharField(max_length=100, verbose_name="Business Name")

    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})

class Category(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Category Owner", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
    # class Meta:
    #     verbose_name = "Category"
    #     verbose_name_plural = _("s")


    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})
    
