# Generated by Django 5.0.4 on 2024-05-16 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_alter_searchresult_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="searchresult",
            name="description",
            field=models.TextField(db_collation="utf8_general_ci"),
        ),
    ]
