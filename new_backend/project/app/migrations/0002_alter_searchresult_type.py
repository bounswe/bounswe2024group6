# Generated by Django 5.0.4 on 2024-05-16 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="searchresult",
            name="type",
            field=models.CharField(max_length=10),
        ),
    ]
