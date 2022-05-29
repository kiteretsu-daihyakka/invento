from django.db import models
from django.contrib.auth.models import User

cla
class Category(models.Model):
    name = models.CharField(max_length=100)
    owner = models.OneToOneField(Owner, verbose_name="Category Owner", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.owner + ' ' + self.name
    
    # class Meta:
    #     verbose_name = "Category"
    #     verbose_name_plural = _("s")


    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})
    
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey("Category", on_delete=models.CASCADE)
    # class Meta:
    #     verbose_name = "Product"
    #     verbose_name_plural = "Products"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Product_detail", kwargs={"pk": self.pk})


