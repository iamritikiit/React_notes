# Generated by Django 5.0.7 on 2024-07-30 05:38

import notesapp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notesapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='index',
            name='id',
            field=models.CharField(default=notesapp.models.generate_id, editable=False, max_length=21, primary_key=True, serialize=False),
        ),
    ]
