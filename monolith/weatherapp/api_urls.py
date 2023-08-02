from django.urls import path

from .api_views import api_list_locations, api_list_states, api_show_location

urlpatterns=[
    path("locations/", api_list_locations, name="api_list_locations"),
    path("locations/<int:id>/", api_show_location, name="api_show_location"),
    path("states/", api_list_states, name="api_list_states"),
]
