# mbtiQA/admin.py

from django.contrib import admin

from .models import User
from .models import Job
from .models import mbti
from .models import big5Test
from .models import JobUser

admin.site.register(User)
admin.site.register(Job)
admin.site.register(mbti)
admin.site.register(big5Test)
admin.site.register(JobUser)
