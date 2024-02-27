import requests

API_URL = "https://api-inference.huggingface.co/models/openchat/openchat-3.5-0106"
headers = {"Authorization": "Bearer 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"}

def query(payload, max_tokens=15000):
    payload["max_tokens"] = max_tokens  # Set the maximum tokens for the response
    response = requests.post(API_URL, headers=headers, json=payload)
    response_json = response.json()
    generated_text = response_json[0]["generated_text"]  # Extract the generated text
    return generated_text

def EIApi(input):
    output = query({
        "inputs": input,
    }, max_tokens=15000)  # Specify the maximum tokens for the response
    return output


def EICalculation(data1,data2):
    extrovert1= data1.get('extrovert')
    extrovert2= data2.get('extrovert')
    introvert1= data1.get('introvert')
    introvert2= data2.get('introvert')
    print(extrovert1)
    print(extrovert2)
    print(introvert1)
    print(introvert2)
    lastextraversion=round(((extrovert1*2)+ extrovert2)/3 ,0)
    lastintraversion=round(((introvert1*2)+ introvert2)/3 ,0)
    percentages = {'introvert': lastintraversion, 'extrovert': lastextraversion}
    return percentages

def SNCalculation(data1,data2):
    extrovert1= data1.get('intuition')
    extrovert2= data2.get('intuition')
    introvert1= data1.get('sensing')
    introvert2= data2.get('sensing')
    print(extrovert1)
    print(extrovert2)
    print(introvert1)
    print(introvert2)
    lastextraversion=round(((extrovert2*2)+ extrovert1)/3 ,0)
    lastintraversion=round(((introvert2*2)+ introvert1)/3 ,0)
    percentages = {'sensing': lastintraversion, 'intuition': lastextraversion}
    return percentages

def TFCalculation(data1,data2):
    extrovert1= data1.get('feeling')
    extrovert2= data2.get('feeling')
    introvert1= data1.get('thinking')
    introvert2= data2.get('thinking')
    print(extrovert1)
    print(extrovert2)
    print(introvert1)
    print(introvert2)
    lastextraversion=round(((extrovert2*2)+ extrovert1)/3 ,0)
    lastintraversion=round(((introvert2*2)+ introvert1)/3 ,0)
    percentages = {'thinking': lastintraversion, 'feeling': lastextraversion}
    return percentages

def JPCalculation(data1,data2):
    extrovert1= data1.get('perceiving')
    extrovert2= data2.get('perceiving')
    introvert1= data1.get('judging')
    introvert2= data2.get('judging')
    print(extrovert1)
    print(extrovert2)
    print(introvert1)
    print(introvert2)
    lastextraversion=round(((extrovert2*2)+ extrovert1)/3 ,0)
    lastintraversion=round(((introvert2*2)+ introvert1)/3 ,0)
    percentages = {'judging': lastintraversion, 'perceiving': lastextraversion}
    return percentages

def psychologyCommputing(EI,SN,TF,JP):
    extrovert=EI.get('extrovert')
    introvert=EI.get('introvert')
    sensing = SN.get('sensing')
    intuition = SN.get('intuition')
    thinking =TF.get('thinking')
    feeling = TF.get('feeling')
    judging =JP.get('judging')
    perceiving=JP.get('perceiving')
    E_I = 'E' if extrovert > 50 else 'I'

# Sensing (S) vs. Intuition (N)
    S_N = 'S' if sensing > 50 else 'N'

    # Thinking (T) vs. Feeling (F)
    T_F = 'T' if thinking > 50 else 'F'

    # Judging (J) vs. Perceiving (P)
    J_P = 'J' if judging > 50 else 'P'

    # Combine results to form MBTI personality type
    mbti_type = f'{E_I}{S_N}{T_F}{J_P}'
    data ={'extrovert':extrovert , 'introvert':introvert , 'sensing':sensing , 'intuition':intuition , 'thinking':thinking , 'feeling':feeling , 'judging':judging , 'perceiving':perceiving ,'dimension1':E_I , 'dimension2':S_N , 'dimension3':T_F , 'dimension4':J_P ,'personality':mbti_type}
    return data

