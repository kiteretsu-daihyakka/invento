from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver

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
    
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def createAuthToken(sender,instance,created, **kwargs):
    if created:
        Token.objects.create(user=instance)
