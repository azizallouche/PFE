from django.http import HttpResponse
from .VM_Model.vm_model import *

from django.views.decorators.csrf import csrf_exempt
import re
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import joblib
@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'variables': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(type=openapi.TYPE_STRING),
            ),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def VariableMatching(request):

    if request.method == 'POST':

        json_data = json.loads(request.body.decode('utf-8'))

        # Extract the 'answer' from the JSON data
        answer = json_data.get('variables', '')
        if isinstance(answer, dict):
            print(list(answer.keys()))
            lista= [item.lower() for item in list(answer.keys())]
        else:
            lista=answer
        df = pd.read_csv("/Users/3alouch/Documents/GitHub/MbtiQ-A/Backend- Django/VariableMatching/VM_Model/dataf.csv",sep=';')
# Specify the path to your .pkl file
        pkl_model_path = '/Users/3alouch/Documents/GitHub/MbtiQ-A/Backend- Django/VariableMatching/VM_Model/model.pkl'
        print(type(answer))
        #model = joblib.load(pkl_model_path)
        listt=Model(lista)
        print(listt)
        listt=Calculate(listt)
        response =JsonResponse(listt, safe=False)
        response["Access-Control-Allow-Origin"] = "http://localhost:4200"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    return response


