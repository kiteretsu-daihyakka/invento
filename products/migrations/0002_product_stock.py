# Generated by Django 4.0.4 on 2022-08-15 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='stock',
            field=models.IntegerField(default=None),
            preserve_default=False,
        ),
    ]
