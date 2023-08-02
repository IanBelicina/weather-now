from django.db import models

# Create your models here.

class State(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=40)
    abbreviation = models.CharField(max_length=2, unique=True)

    def __str__(self):
        return f"{self.abbreviation}"



class Location(models.Model):
    city = models.CharField(max_length=200)
    state = models.ForeignKey(
        State,
        on_delete=models.PROTECT,
    )
