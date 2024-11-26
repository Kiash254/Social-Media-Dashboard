# Generated by Django 5.1.3 on 2024-11-26 05:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SocialMediaAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platform', models.CharField(max_length=50)),
                ('username', models.CharField(max_length=100)),
                ('access_token', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('scheduled_time', models.DateTimeField()),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.socialmediaaccount')),
            ],
        ),
    ]
