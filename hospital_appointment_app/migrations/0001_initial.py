# Generated by Django 5.0 on 2024-01-08 13:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("hospital_auth_app", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Appointment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date_of_appointment", models.DateField(blank=True, null=True)),
                ("start_time", models.TimeField(blank=True, null=True)),
                ("end_time", models.TimeField(blank=True, null=True)),
                (
                    "doctor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="appointments",
                        to="hospital_auth_app.doctordetail",
                    ),
                ),
                (
                    "patient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="appointments",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
