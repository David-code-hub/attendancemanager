# Generated by Django 3.2.5 on 2022-02-23 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0021_remove_intern_man'),
    ]

    operations = [
        migrations.AddField(
            model_name='intern',
            name='colorname',
            field=models.CharField(default='', max_length=255),
        ),
    ]