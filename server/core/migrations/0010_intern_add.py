# Generated by Django 3.2.5 on 2021-08-15 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_remove_session_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='intern',
            name='add',
            field=models.BooleanField(default=False),
        ),
    ]