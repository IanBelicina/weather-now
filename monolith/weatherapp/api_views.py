from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .acls import get_weather_data
from .models import Location, State

# Create your views here.

class LocationListEncoder(ModelEncoder):
    model = Location
    properties = [
        "id",
        "city"
    ]
    def get_extra_data(self, o):
        return {"state": o.state.abbreviation}

class StateListEncoder(ModelEncoder):
    model = State
    properties = [
        "id",
        "name",
        "abbreviation"
    ]


@require_http_methods(["GET", "POST"])
def api_list_locations(request):
    if request.method == "GET":
        locations = Location.objects.all()
        return JsonResponse(
            {"locations":locations},
            encoder=LocationListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        try:
            state = State.objects.get(abbreviation=content["state"])
            content["state"] = state
        except State.DoesNotExist:
            return JsonResponse(
                {"message":"Invalid state abbreviation"},
                status = 400,
            )
        location = Location.objects.create(**content)
        return JsonResponse(
            location,
            encoder=LocationListEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def api_show_location(request, id):
    location = Location.objects.get(id=id)
    weather = get_weather_data(
        location.city,
        location.state
    )
    return JsonResponse(
        {"location":location, "weather":weather},
        encoder=LocationListEncoder,
        safe=False
    )


@require_http_methods(["GET"])
def api_list_states(request):
    states = State.objects.all()
    return JsonResponse(
        {"states":states},
        encoder=StateListEncoder,
        safe=False
    )
