from django.contrib import admin
from .models import Location,State
# Register your models here.

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    pass
