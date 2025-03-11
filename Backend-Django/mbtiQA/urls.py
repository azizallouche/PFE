
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import *

schema_view = get_schema_view(
    openapi.Info(
        title="MBTI test ",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('VM/', VariableMatching, name='VariableMatching'),
    path('QA/calculatequestion/', calculateQuestion, name='calculateQuestion'),
    path('big5/test/', big5, name='big5'),
    path('QA/TestResult/', psychologyComputing, name='psychologyComputing'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', custom_logout, name='logout'),
    path('user-info/', user_info, name='user-info'),
    path('user-type/', user_type, name='user-type'),
    path('is_connected/', is_connected_view, name='is_connected'),
    path('users/', user_list, name='user-list'),
    path('jobs/', job_list, name='job-list'),
    path('getJobsbyid/<int:job_id>/', get_job_users, name='get_job_users'),
    path('testJobsbyid/<int:job_id>/', test_job_user, name='test_job_user'),
    path('jobUsave/', save_jobResult, name='save_jobResult'),
    path('getMbti/', getMbti, name='getMbti'),
    path('getBig5/', getBig5, name='getBig5'),
    path('save-job-details/', save_job_details, name='save_job_details'),
    path('get-all-jobs/', get_all_jobs, name='get-all-jobs'),
    path('usernames/', UserListView.as_view(), name='usernames-list'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

