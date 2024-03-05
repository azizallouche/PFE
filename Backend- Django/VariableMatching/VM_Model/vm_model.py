import pandas as pd
import joblib
import os
import numpy as np
current_file = os.path.abspath(__file__)

# Get the directory containing the current file
current_directory = os.path.dirname(current_file)
print(current_directory)

def Model(list_ff):
    df = pd.read_csv("/Users/3alouch/Documents/GitHub/MbtiQ-A/Backend- Django/VariableMatching/VM_Model/dataf.csv",sep=';')
    print(list_ff)
    list_f=[]
    listv=[]
    listw=[]
    for i in range(len(list_ff)):


        for index, row in df.iterrows():
            if row['Variable'] == list_ff[i]:

                listv.append(row['Connected_to'])
                listw.append(row['Weight'])
    list_f.append(listv)
    list_f.append(listw)

    mbti=""
    lenn=len(list_f[0])
    for j in range(len(list_f[0])):
        if (mbti == ""):
            mbti=list_f[0][0]
        else:
            if(j>=lenn):
                continue
            else:
                mbti=list_f[0][j]

        for k in range(len(list_f[0])-1, j, -1):
            if(k>=lenn):
                continue

            if(mbti == list_f[0][k]):
                list_f[1][j]= list_f[1][j]+ list_f[1][k]
                list_f[1].pop(k)
                list_f[0].pop(k)
                lenn-=1
    return list_f
def Calculate(list):
    somme_totale = np.sum(list[1])
    pourcentages = [round((valeur / somme_totale) * 100, 1)  for valeur in list[1]]
    print(somme_totale)
# Trier les types MBTI et les pourcentages correspondants
    types_et_pourcentages_tries = sorted(zip(list[0], pourcentages), key=lambda x: x[1], reverse=True)
    return types_et_pourcentages_tries
