from django.db import models
from django.conf import settings
    
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey("categories.Category", on_delete=models.CASCADE)
    # class Meta:
    #     verbose_name = "Product"
    #     verbose_name_plural = "Products"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Product_detail", kwargs={"pk": self.pk})


