# Generated by Django 3.2 on 2022-12-16 22:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TreeBio', '0006_alter_treebio2_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='treebio2',
            name='avatar',
            field=models.TextField(blank=True, null=True),
        ),
    ]