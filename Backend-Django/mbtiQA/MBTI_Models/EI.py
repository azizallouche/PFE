import json

import requests
import os
from groq import Groq
import random
import pandas as pd
import re
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

df_ei = pd.read_csv(str(BASE_DIR)+"/MBTI_Models/mbti_ei.csv")
df_sn = pd.read_csv(str(BASE_DIR)+"/MBTI_Models/mbti_sn.csv")
df_tf = pd.read_csv(str(BASE_DIR)+"/MBTI_Models/mbti_tf.csv")
df_pj = pd.read_csv(str(BASE_DIR)+"/MBTI_Models/mbti_pj.csv")
index_ei = df_ei['index'].tolist()
index_sn = df_sn['index'].tolist()
index_tf = df_tf['index'].tolist()
index_pj = df_pj['index'].tolist()

def display_row_with_index(df, indexx):
    for index, row in df.iterrows():
        if row['index']== indexx:
            return row


# Define a function that returns a random index from the list
def get_random_index(index_list):
    return random.choice(index_list)

def getRow(num,df_ei,df_tf,df_pj,df_sn,index_ei,index_pj,index_sn,index_tf):
    if num in [0,1]:
        return df_ei,index_ei
    elif num in [2,3]:
        return df_sn,index_sn
    elif num in [4,5]:
        return df_tf,index_tf
    elif num in [6,7]:
        return df_pj,index_pj
    else :
        return None,None
def deleteFromlist(num,value,index_ei,index_pj,index_sn,index_tf):
    if num in [0,1]:
        index_ei.remove(value)
    elif num in [2,3]:
        index_sn.remove(value)
    elif num in [4,5]:
        index_tf.remove(value)
    elif num in [6,7]:
        index_pj.remove(value)

client = Groq(
    api_key=os.environ.get("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"),
)

def llm_model(question,num,user_response):
    text=""
    text1=""
    text2=""
    if num in [0,1]:
        text ="introvert or extrovert"
        text1="introvert"
        text2="extrovert"
    elif num in [2,3]:
        text ="Sensing or Intuition (mbti test)"
        text1="sensing"
        text2="intuition"
    elif num in [4,5]:
        text="Thinking or Feeling (mbti test)"
        text1="thinking"
        text2="feeling"
    elif num in [6,7]:
        text="Judging or Perceiving (mbti test)"
        text1="judging"
        text2="perceiving"
    input = "Is this person "+text+" .the question is "+question+", person answer :"+user_response+ ".give me percentage in a only one json like that {'"+text1+"':percentage%,'"+text2+"':percentage%}  "

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": input,
            }
        ],
        model="llama3-70b-8192",
    )
    print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content

def getPercentage(reponse):
    pattern = r"\{.*\}"

    # Search for the pattern in the text
    match = re.search(pattern, reponse)

    # If a match is found, extract the JSON response
    if match:
        json_response = match.group()
        return json_response
    else:
        return "no"

def calculate_average(json_list):
    introvert_values = []
    extrovert_values = []
    sensing_values = []
    feeling_values = []
    thinking_values = []
    intuition_values = []
    judging_values = []
    perceiving_values = []
    print(json_list)

    for json_obj in json_list:
        str_data = json_obj.replace("'", '"').replace("%", "%").replace(",", ",")
        str_data = re.sub(r'(\d+%)', r'"\1"', str_data)
        print(str_data)
        json_obj=json.loads(str_data)
        if 'introvert' in json_obj:
            # Extract the percentage value and convert it to an integer
            value_str = str(json_obj['introvert'])
            value_int = int(value_str.strip('%'))  # Remove '%' and convert to integer
            introvert_values.append(value_int)
            value_str1 = str(json_obj['extrovert']) 
            value_int1 = int(value_str1.strip('%'))  # Remove '%' and convert to integer
            extrovert_values.append(value_int1)
        elif 'sensing' in json_obj:
            value_str = str(json_obj['sensing'])
            value_int = int(value_str.strip('%'))  # Remove '%' and convert to integer
            sensing_values.append(value_int)
            value_str1 = str(json_obj['intuition'])
            value_int1 = int(value_str1.strip('%'))  # Remove '%' and convert to integer
            intuition_values.append(value_int1)
        elif 'thinking' in json_obj:
            value_str = str(json_obj['thinking'])
            value_int = int(value_str.strip('%'))  # Remove '%' and convert to integer
            thinking_values.append(value_int)
            value_str1 = str(json_obj['feeling'])
            value_int1 = int(value_str1.strip('%'))  # Remove '%' and convert to integer
            feeling_values.append(value_int1)
        elif 'judging' in json_obj:
            value_str = str(json_obj['judging'])
            value_int = int(value_str.strip('%'))  # Remove '%' and convert to integer
            judging_values.append(value_int)
            value_str1 = str(json_obj['perceiving'])
            value_int1 = int(value_str1.strip('%'))  # Remove '%' and convert to integer
            perceiving_values.append(value_int1)
    print(json_list)
    print(introvert_values)

    totalI = sum(introvert_values)
    totalE = sum(extrovert_values)
    totalS = sum(sensing_values)
    totalN = sum(intuition_values)
    totalT = sum(thinking_values)
    totalF = sum(feeling_values)
    totalJ = sum(judging_values)
    totalP = sum(perceiving_values)
    countI = len(introvert_values)
    countE = len(extrovert_values)
    countS = len(sensing_values)
    countN = len(intuition_values)
    countT = len(thinking_values)
    countF = len(feeling_values)
    countJ = len(judging_values)
    countP = len(perceiving_values)
    averageI = totalI / countI
    averageE = totalE / countE
    averageS = totalS / countS
    averageN = totalN / countN
    averageT = totalT / countT
    averageF = totalF / countF
    averageJ = totalJ / countJ
    averageP = totalP / countP

    E_I = 'E' if averageE > 50 else 'I'

    # Sensing (S) vs. Intuition (N)
    S_N = 'S' if averageS > 50 else 'N'

    # Thinking (T) vs. Feeling (F)
    T_F = 'T' if averageT > 50 else 'F'

    # Judging (J) vs. Perceiving (P)
    J_P = 'J' if averageJ > 50 else 'P'

    mbti_type = f'{E_I}{S_N}{T_F}{J_P}'
    data ={'extrovert':averageE , 'introvert':averageI , 'sensing':averageS , 'intuition':averageN , 'thinking':averageT , 'feeling':averageF , 'judging':averageJ , 'perceiving':averageP ,'dimension1':E_I , 'dimension2':S_N , 'dimension3':T_F , 'dimension4':J_P ,'personality':mbti_type}


    return data