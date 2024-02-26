from django.http import HttpResponse
from .MBTI_Models.EI import *
from .pourcentage_extraction.EI import *
from .pourcentage_extraction.SN import *
from .pourcentage_extraction.TF import *
from .pourcentage_extraction.JP import *
from django.views.decorators.csrf import csrf_exempt
import re
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'answer1': openapi.Schema(type=openapi.TYPE_STRING),
            'answer2': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def EI(request):

    if request.method == 'POST':

        json_data = json.loads(request.body.decode('utf-8'))

        # Extract the 'answer' from the JSON data
        answer = json_data.get('answer1', '')
        answer2 = json_data.get('answer2', '')
        if(answer=="" or answer is None):
            answer=""
        if(answer2=="" or answer2 is None):
            answer2=""
        print(answer)
        answer = deleteT(answer)
        answer2 = deleteT(answer2)




        input = "Is this person introvert or extrovert .the question is When you have a day all to yourself, what does your ideal day look like?, person answer :"+answer+ ".give me percentage in a only one json like that {'introvert':percentage%,'extrovert':percentage%} don't give me description and more then one json "
        input2 = "Is this person introvert or extrovert .the question is In a bustling social event, what role do you find yourself naturally gravitating towards?, person answer :"+answer2+ ".give me percentage in a only one json like that {'introvert':percentage%,'extrovert':percentage%} don't give me description and more then one json "

        output= EIApi(input)
        output2= EIApi(input2)

        print(output2)
        data=extract_percentagesEI(output)
        data2=extract_percentagesEI(output2)
        lastdata=EICalculation(data,data2)

        response =JsonResponse(lastdata)
        response["Access-Control-Allow-Origin"] = "http://localhost:4200"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    else:
        return {'introvert': 50, 'extrovert': 50}


@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'answer1': openapi.Schema(type=openapi.TYPE_STRING),
            'answer2': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def NS(request):

    if request.method == 'POST':

        json_data = json.loads(request.body)

        # Extract the 'answer' from the JSON data
        answer = json_data.get('answer1')
        answer2 = json_data.get('answer2')
        if(answer=="" or answer is None):
            answer=""
        if(answer2=="" or answer2 is None):
            answer2=""
        answer = deleteT(answer)
        answer2 = deleteT(answer2)

        input = "Is this person  Sensing or Intuition (mbti test).the question is How do you typically prepare for a new experience or journey?, person answer :"+answer+ ".give me percentage in a only one json like that {'sensing':percentage%,'intuition':percentage%} don't give me description and more then one json "
        input2 = "Is this person  Sensing or Intuition (mbti test) .the question is When reflecting on a past event, what stands out to you the most - the specific details or the overall meaning?, person answer :"+answer2+ ".give me percentage in a only one json like that {'sensing':percentage%,'intuition':percentage%} don't give me description and more then one json"

        output= EIApi(input)
        output2= EIApi(input2)

        print(output2)
        data=extract_percentagesSN(output)
        data2=extract_percentagesSN(output2)
        print(data2)
        lastdata=SNCalculation(data,data2)
        response =JsonResponse(lastdata)
        response["Access-Control-Allow-Origin"] = "http://localhost:4200"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    else:
        return {'sensing': 50, 'intuition': 50}

@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'answer1': openapi.Schema(type=openapi.TYPE_STRING),
            'answer2': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def TF(request):

    if request.method == 'POST':

        json_data = json.loads(request.body)

        # Extract the 'answer' from the JSON data
        answer = json_data.get('answer1')
        answer2 = json_data.get('answer2')
        answer = deleteT(answer)
        answer2 = deleteT(answer2)
        if(answer=="" or answer is None):
            answer=""
        if(answer2=="" or answer2 is None):
            answer2=""
        input = "Is this person  Thinking or Feeling (mbti test).the question is When offering support to a friend, what is your instinctive response?, person answer :"+answer+ ".give me percentage in a only one json like that {'thinking':percentage%,'feeling':percentage%} don't give me description and more then one json "
        input2 = "Is this person  Sensing or Intuition (mbti test) .the question is Reflecting on a recent decision, what was the primary influence on your choice - logic or the impact on others?, person answer :"+answer2+ ".give me percentage in a only one json like that {'thinking':percentage%,'feeling':percentage%} don't give me description and more then one json"

        output= EIApi(input)
        output2= EIApi(input2)

        #print(output)
        data=extract_percentagesTF(output)
        data2=extract_percentagesTF(output2)
        print(data)
        print(data2)
        lastdata=TFCalculation(data,data2)
        response =JsonResponse(lastdata)
        response["Access-Control-Allow-Origin"] = "http://localhost:4200"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    else:
        return {'thinking': 50, 'feeling': 50}

@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'answer1': openapi.Schema(type=openapi.TYPE_STRING),
            'answer2': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def JP(request):

    if request.method == 'POST':

        json_data = json.loads(request.body)

        # Extract the 'answer' from the JSON data
        answer = json_data.get('answer1')
        answer2 = json_data.get('answer2')
        if(answer=="" or answer is None):
            answer=""
        if(answer2=="" or answer2 is None):
            answer2=""
        answer = deleteT(answer)
        answer2 = deleteT(answer2)
        input = "Is this person  Judging or Perceiving (mbti test).the question is How do you adapt to changes in your daily routine or plans?, person answer :"+answer+ ".give me percentage in a only one json like that {'judging':percentage%,'perceiving':percentage%} don't give me description and more then one json "
        input2 = "Is this person  Judging or Perceiving (mbti test) .the question is In a team setting, what is your approach to completing tasks and reaching goals?, person answer :"+answer2+ ".give me percentage in a only one json like that {'judging':percentage%,'perceiving':percentage%} don't give me description and more then one json"

        output= EIApi(input)
        output2= EIApi(input2)
        print(output)
        #print(output)
        data=extract_percentagesJP(output)
        data2=extract_percentagesJP(output2)
        print(data)
        print(data2)
        lastdata=JPCalculation(data,data2)
        response =JsonResponse(lastdata)
        response["Access-Control-Allow-Origin"] = "http://localhost:4200"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    else:
        return {'judging': 50, 'perceiving': 50}

@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'EI': openapi.Schema(type=openapi.TYPE_OBJECT),
            'SN': openapi.Schema(type=openapi.TYPE_OBJECT),
            'JP': openapi.Schema(type=openapi.TYPE_OBJECT),
            'TF': openapi.Schema(type=openapi.TYPE_OBJECT),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def psychologyComputing(request):

    if request.method == 'POST':

        json_data = json.loads(request.body)

        # Extract the 'answer' from the JSON data
        EI = json_data.get('EI')
        SN = json_data.get('SN')
        TF = json_data.get('TF')
        JP = json_data.get('JP')
        data=psychologyCommputing(EI,SN,TF,JP)


        return JsonResponse(data)
    else:
        return HttpResponse('No data received')