# Generated by Django 3.2.5 on 2021-08-13 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_session_dates'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='date',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
