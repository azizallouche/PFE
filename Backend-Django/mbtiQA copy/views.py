
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator

from .MBTI_Models.EI import *
from .pourcentage_extraction.EI import *
from .pourcentage_extraction.SN import *
from .pourcentage_extraction.TF import *
from .pourcentage_extraction.JP import *

import re
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.cache import cache
# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.views import LogoutView
from .models import User, mbti, big5Test,JobUser
from .models import Job
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt  # Import csrf_exempt
from django.utils.decorators import method_decorator

from .serializers import UserSerializer
from django.http import HttpResponse
from .VM_Model.vm_model import *
from .VM_Model.MbtiAdjust import *

from django.views.decorators.csrf import csrf_exempt
import re
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import joblib
# utils/user_session.py
class jobC:
    title="",
    overview="",
    description=[],
    experience="",
    work_level="",
    employee_type="",
    variables=[],
    result=[]
    @classmethod
    def set_job(cls, title,overview,description,experience,work_level,employee_type,variables ):
        cls.title=title
        cls.overview=overview
        cls.description=description
        cls.experience=experience
        cls.work_level=work_level
        cls.employee_type=employee_type
        cls.variables=variables
    @classmethod
    def clear(cls):
        cls.title="",
        cls.overview="",
        cls.description=[],
        cls.experience="",
        cls.work_level="",
        cls.employee_type="",
        cls.variables=[],
        cls.result=[]
    @classmethod
    def get_job(cls):
        return {
            "title": cls.title,
            "overview": cls.overview,
            "description": cls.description,
            "experience": cls.experience,
            "work_level": cls.work_level,
            "employee_type": cls.employee_type,
            "variables": cls.variables
        }
class mbtiqr:
    questions = []
    responses =[]
    @classmethod
    def set_questions(cls, question):
        cls.questions.append(question)
    @classmethod
    def set_responses(cls, response):
        cls.responses.append(response)
    @classmethod
    def get_questions(cls):
        return  cls.questions
    @classmethod
    def get_responses(cls):
        return  cls.responses

class big5qr:

    questions = []
    responses =[]

    @classmethod
    def set_responses(cls, response):
        cls.responses.append(response)
    @classmethod
    def get_questions(cls):
        return  cls.questions
    @classmethod
    def get_responses(cls):
        return  cls.responses

class UserSession:
    username = None
    is_connected=False
    type=None

    @classmethod
    def set_user(cls, username,type):
        cls.username = username
        cls.is_connected=True
        cls.type=type


    @classmethod
    def clear_user(cls):
        cls.username = None
        cls.is_connected=False
        cls.type=None
    @classmethod
    def get_username(cls):
        return  cls.username

    @classmethod
    def get_user(cls):
        return {
            'username': cls.username
        }
    @classmethod
    def get_type(cls):
        return cls.type
    @classmethod
    def test(cls):
        return cls.is_connected

@csrf_exempt
def save_job_details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            print(f"Received data: {data}")

            # Validate received data
            required_fields = ['jobTitle', 'overview', 'experienceLevel', 'workLevel', 'workType', 'messages', 'variables']
            for field in required_fields:
                if field not in data:
                    return JsonResponse({'error': f'Missing field: {field}'}, status=400)
            jobC.set_job(data['jobTitle'],data['overview'],data['messages'],data['experienceLevel'],data['workLevel'],data['workType'],data['variables'])


            return JsonResponse({'message': 'Job details saved successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def save_jobResult(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            jobid= data['id']
            job_needs=data['results']
            print(f"Received data: {data}")
            username = UserSession.get_username()

            # Retrieve the user based on the username
            user = User.objects.get(username=username)
            job = Job.objects.get(id=jobid)
            mbtit = mbti.objects.get(user=user)
            big5t=big5Test.objects.get(user=user)
            mbtires=mbtit.results
            big5res=big5t.results
            score,personality= Score_Calculation(job_needs,mbtires,big5res)
            jobu_instance = JobUser(user=user,job=job,results={'score':score,'personality':personality})
            jobu_instance.save()
            return JsonResponse({'message': 'Job details saved successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)





@csrf_exempt
def get_all_jobs(request):
    if request.method == 'GET':
        jobs = Job.objects.all().values('title', 'overview', 'description', 'experience', 'work_level', 'employee_type', 'results', 'id')
        job_list = list(jobs)
        username = UserSession.username
        user = User.objects.get(username=username)

        for job in job_list:
            job_id = job['id']
            is_applied = JobUser.objects.filter(user=user, job_id=job_id).exists()
            num_applicants = JobUser.objects.filter(job_id=job_id).count()
            job['is_applied'] = is_applied
            job['num_applicants'] = num_applicants  # Add number of applicants

        return JsonResponse(job_list, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def test_job_user(request, job_id):
    if request.method == 'GET':
        try:
            job = Job.objects.get(id=job_id)
            username = request.user.username
            user = User.objects.get(username=username)

            # Check if the user has applied to the job
            is_applied = JobUser.objects.filter(user=user, job=job).exists()

            return JsonResponse({'applied': is_applied})
        except Job.DoesNotExist:
            return JsonResponse({'error': 'Job does not exist'}, status=404)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
def get_job_users(request, job_id):
    if request.method == 'GET':
        try:
            job = Job.objects.get(id=job_id)
            job_users = JobUser.objects.filter(job=job).select_related('user')


            job_users_list = []
            for job_user in job_users:
                if(job_user.results["personality"] == job.results[0][0]):
                    color=True
                else:
                    color=False
                job_users_list.append({
                    'id': job_user.id,
                    'nom': job_user.user.last_name,
                    'prenom': job_user.user.first_name,
                    'username': job_user.user.username,
                    'email': job_user.user.email,
                    'job_id': job_user.job.id,
                    'job_title': job_user.job.title,
                    'score': job_user.results["score"],
                    'personality': job_user.results["personality"],
                    'color':color
                })

            return JsonResponse(job_users_list, safe=False)
        except Job.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
@csrf_exempt  # Use csrf_exempt decorator if you are not handling CSRF tokens
def job_list(request):
    jobs = Job.objects.all().values('title', 'overview', 'description', 'experience', 'work_level', 'employee_type')
    jobs_list = list(jobs)
    all_jobs = Job.objects.all()

    # Retrieve job IDs
    job_ids = [job.id for job in all_jobs]

    # Print job IDs
    print("Job IDs:", job_ids)
    return JsonResponse(jobs_list, safe=False)
@csrf_exempt
def user_list(request):
    users = User.objects.all().values('username', 'first_name', 'last_name', 'email', 'type')
    users_list = list(users)
    return JsonResponse(users_list, safe=False)
@csrf_exempt
def is_connected_view(request):
    is_connected = UserSession.test()
    return JsonResponse({'is_connected': is_connected})
@csrf_exempt
def user_info(request):
    if request.method == 'GET':
        user_info = UserSession.get_user()
        user = User.objects.get(username=user_info['username'])

        # Manually serialize the user object
        user_data = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'type': user.type,
        }

        return JsonResponse(user_data)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def getMbti(request):
    # Assuming UserSession.get_username() retrieves the current username
    username = UserSession.get_username()

    # Retrieve the user based on the username
    user = User.objects.get(username=username)
    try:
        # Retrieve the MBTI instance for the user
        mbti_instance = get_object_or_404(mbti, user=user)

        # Construct your response data
        response_data = {
            'user': mbti_instance.user.username,
            'results': mbti_instance.results,
            'questions': mbti_instance.questions,
            'responses': mbti_instance.responses,
            'passed': mbti_instance.passed,
        }
        print(response_data)
    except Http404:
        # If MBTI instance is not found, set response_data to passed=False
        response_data = {
            'results': {},
            'passed': False,
        }
    # Return a JSON response with the data
    return JsonResponse(response_data)
@csrf_exempt
def getBig5(request):
    # Assuming UserSession.get_username() retrieves the current username
    username = UserSession.get_username()

    # Retrieve the user based on the username
    user = User.objects.get(username=username)
    try:
        big5_instance = get_object_or_404(big5Test, user=user)
        print(big5_instance)
        # Construct your response data
        response_data = {
            'user': big5_instance.user.username,
            'results': big5_instance.results,

            'passed': big5_instance.passed,
        }
        print(response_data)
    except Http404:
    # If MBTI instance is not found, set response_data to passed=False
        response_data = {
            'results': {},
            'passed': False,
        }
    # Return a JSON response with the data
    return JsonResponse(response_data)

@csrf_exempt
def user_type(request):

    print("method is"+request.method)
    if request.method == 'GET':

        user = request.user
        print(user)
        user_info =UserSession.get_user()
        print(user_info)
        user_type=UserSession.get_type()
        print(user_type)
        return JsonResponse({'type': user_type}, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

class UserListView(APIView):
    def get(self, request):
        users = User.objects.values_list('username', flat=True)
        return Response(users, status=status.HTTP_200_OK)

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        firstname = request.data.get('firstname')
        lastname = request.data.get('lastname')
        if (request.data.get('type')):
            type=request.data.get('type')

        if not username or not email or not password or not firstname or not lastname:
            return Response({'message': 'Username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'message': 'Username already exists'})
        if (request.data.get('type')):
            user = User.objects.create_user(username=username,first_name=firstname,last_name=lastname, email=email, password=password,type=type)
        else:
            user = User.objects.create_user(username=username,first_name=firstname,last_name=lastname, email=email, password=password)
            UserSession.set_user(username,"simple_user")
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            UserSession.set_user(username,user.type)

            return Response({'message': 's'}, status=status.HTTP_200_OK)
        return Response({'message': 'Incorrect Username or Password'} )

@csrf_exempt
def custom_logout(request):
    UserSession.clear_user()
    logout(request)
    user_info =UserSession.get_user()
    print(user_info)
    return JsonResponse({'message': 'Logged out successfully'}, status=200)
def add_item_to_cache(item,where):

    data_list = cache.get(where, [])
    data_list.append(item)
    cache.set(where, data_list, timeout=None)


def get_cache_items(where):
    data_list = cache.get(where, [])
    return data_list

def listResults(listt):
    introvert_jsons = []
    print(listt[-1])
    str_data = listt[-1].replace("'", '"').replace("%", "%").replace(",", ",")
    str_data = re.sub(r'(\d+%)', r'"\1"', str_data)
    print(str_data)
    json_last=json.loads(str_data)

    keys = list(json_last.keys())
    keyy= keys[0]
    # Iterate through the list of JSON objects
    for json_obj in listt:
        if keyy in json_obj:
            introvert_jsons.append(json_obj)

    # Count of JSON objects that contain the key "introvert"
    introvert_count = len(introvert_jsons)
    if introvert_count in [0,1]:
        return "same"
    elif introvert_count == 3:
        json_objj=introvert_jsons[-1]
        str_data = json_objj.replace("'", '"').replace("%", "%").replace(",", ",")
        str_data = re.sub(r'(\d+%)', r'"\1"', str_data)

        json_last=json.loads(str_data)


        if((keys[0] =="judging")or (keys[0] == "perceiving")):
            print("finish")
            return "finish"
        else:
            return "new"
    else:
        values1=[]
        values2=[]
        for i in range(len(introvert_jsons)):
            json_objj=introvert_jsons[i]
            str_data = json_objj.replace("'", '"').replace("%", "%").replace(",", ",")
            str_data = re.sub(r'(\d+%)', r'"\1"', str_data)

            json_last=json.loads(str_data)


            value1_js = str(json_last[keys[0]])
            # Remove the percentage sign and convert to an integer
            print(value1_js)
            if '%' in value1_js:

                value1 = int(value1_js.rstrip('%'))
            else:

                value1 = int(value1_js)
            values1.append(value1)


        lastvalue=round((values1[0]+ values1[1])/2 ,0)
        if((lastvalue>59)or(lastvalue<41)):
            print(keys[0])
            if((keys[0] =="judging")or (keys[0] == "perceiving")):
                print("finish")
                return "finish"
            else:
                return "new"
        else:
            return "same"
    return None

@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'answer': openapi.Schema(type=openapi.TYPE_STRING),
            'num': openapi.Schema(type=openapi.TYPE_INTEGER),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def calculateQuestion(request):

    if request.method == 'POST':

        valid = False
        json_data = json.loads(request.body.decode('utf-8'))
        print(json_data)
        # Extract the 'answer' from the JSON data
        answer = json_data.get('answer', '')
        print(answer)
        num = json_data.get('num', '')
        if(answer=="" or answer is None):
            answer=""
        if(num==0 or num is None):
            num=0
        print(answer)
        if(answer == "first"):
            d,ind=getRow(0,df_ei,df_tf,df_pj,df_sn,index_ei,index_pj,index_sn,index_tf)
            n=get_random_index(ind)
            r=display_row_with_index(d,n)
            deleteFromlist(0,n,index_ei,index_pj,index_sn,index_tf)
            add_item_to_cache(r['Questions / Types'],"questions")

            add_item_to_cache("E/I","type")
        else:
            all_types= get_cache_items('type')
            print(all_types)
            type=all_types[-1]
            if type =="E/I":

                num=0
            elif type == "S/N":

                num=2
            elif type == "T/F":

                num=4
            else:
                num=6
            listquestion=get_cache_items('questions')

            question=listquestion[-1]
            user_response=answer
            reponse=llm_model(question,num,user_response)
            mbtiqr.set_responses(user_response)
            add_item_to_cache(reponse,"responses")
            js=getPercentage(reponse)
            add_item_to_cache(js,"results")
            print(js)
            all_results= get_cache_items('results')
            decision= listResults(all_results)
            print(decision)
            if decision == "new":

                all_types= get_cache_items('type')
                type=all_types[-1]
                newType=type

                if type =="E/I":
                    newType="S/N"
                    num=3
                elif type == "S/N":
                    newType="T/F"
                    num=5
                elif type == "T/F":
                    newType="P/J"
                    num=7
                add_item_to_cache(newType,"type")
                d,ind=getRow(num,df_ei,df_tf,df_pj,df_sn,index_ei,index_pj,index_sn,index_tf)
                n=get_random_index(ind)
                r=display_row_with_index(d,n)
                deleteFromlist(num,n,index_ei,index_pj,index_sn,index_tf)

            elif decision == "same":
                if type =="E/I":
                    num=0
                elif type == "S/N":
                    num=2
                elif type == "T/F":
                    num=4
                else:
                    num=6
                add_item_to_cache(type,"type")
                d,ind=getRow(num,df_ei,df_tf,df_pj,df_sn,index_ei,index_pj,index_sn,index_tf)
                n=get_random_index(ind)
                r=display_row_with_index(d,n)
                deleteFromlist(num,n,index_ei,index_pj,index_sn,index_tf)
            elif decision == "finish":
                valid=True
                response = JsonResponse({'question': "", 'finish': valid})

        if(valid == False):
            mbtiqr.set_questions(r['Questions / Types'])
            response = JsonResponse({'question': r['Questions / Types'], 'finish': valid})
        response["Access-Control-Allow-Origin"] = "http://localhost:4200"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    else:
        return JsonResponse({'question': "", 'finish': False})



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

        json_list= get_cache_items('results')
        data=calculate_average(json_list)
        user = User.objects.get(username=UserSession.get_username())
        print(type(data))
        questions= mbtiqr.get_questions()
        responses= mbtiqr.get_responses()
        mbti_instance = mbti(user=user,results=data,questions=questions,responses=responses,passed=True)
        mbti_instance.save()
        mbtiqr.questions = []
        mbtiqr.responses = []
        return JsonResponse(data)
    else:
        return HttpResponse('No data received')


@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'answer': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(type=openapi.TYPE_STRING),
                description="List of EI objects"
            ),
        },
    ),
)
@api_view(['POST'])
@permission_classes([AllowAny])
def big5(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)

        # Extract the 'EI' list from the JSON data
        ei_list = json_data.get('answer', [])
        l = [int(i) for i in ei_list]
        E = 20 + l[0] - l[5] + l[10]- l[15] + l[20] - l[25] + l[30] - l[35] + l[40] - l[45]
        A = 14 - l[1] + l[6] - l[11] + l[16] - l[21] + l[26] - l[31] + l[36] + l[41] + l[46]
        C = 14 + l[2] - l[7] + l[12] - l[17] + l[22] - l[27] + l[32] - l[37] + l[42] + l[47]
        N = 38 - l[3] + l[8] - l[13] + l[18] - l[23] - l[28] - l[33] - l[38] -l[43] - l[48]
        O = 8 + l[4] - l[9] + l[14] - l[19] + l[24] - l[29] + l[34] + l[39] + l[44] + l[49]

        # Assuming you have the function get_cache_items and calculate_average defined
        print("E: "+str(E))
        print("A: "+str(A))
        print("C: "+str(C))
        print("N: "+str(N))
        print("O: "+str(O))
        print(UserSession.get_username())
        user = User.objects.get(username=UserSession.get_username())


        big5I = big5Test(user=user,results={'E': ((E*100)/40), 'A':((A*100)/40) ,'C': ((C*100)/40),'N': ((N*100)/40),'O': ((O*100)/40)},passed=True)
        big5I.save()



        return JsonResponse({'E': ((E*100)/40), 'A':((A*100)/40) ,'C': ((C*100)/40),'N': ((N*100)/40),'O': ((O*100)/40)})

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
        df = pd.read_csv("/Users/3alouch/Documents/GitHub/MbtiQ-A/Backend - Django/mbtiQA/VM_Model/dataf.csv",sep=';')
        # Specify the path to your .pkl file
        pkl_model_path = '/Users/3alouch/Documents/GitHub/MbtiQ-A/Backend - Django/mbtiQA/VM_Model/model.pkl'
        print(type(answer))
        #model = joblib.load(pkl_model_path)
        listt=Model(lista)
        print(listt)
        listt=Calculate(listt)
        data=jobC.get_job()
        job = Job(
            title=data['title'],
            overview=data['overview'],
            description=data['description'],
            experience=data['experience'],
            work_level=data['work_level'],
            employee_type=data['employee_type'],
            variables=data['variables'],
            results=listt
        )
        jobC.clear();
        print(job)
        job.save()
        print(f"Job saved: {job}")
        response =JsonResponse(listt, safe=False)
        response["Access-Control-Allow-Origin"] = "http://localhost:4200"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    return response



