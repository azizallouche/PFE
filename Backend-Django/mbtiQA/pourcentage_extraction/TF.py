import re
def extract_percentagesTF(text):
    pourcentageE=-1
    pourcentageI=-1
    keywords = ["thinking", "Thinking"]
    for keyword in keywords:
        result = extract_context(text, keyword)
        for context in result:
            if(keyword =="thinking"):
                if(check_order1(context)):
                    numbers = re.findall(r'\d+', context)
                    list1=[int(number) for number in numbers]
                    if not list1:
                        print("")
                    else:
                        if(len(list1)>1):
                            pourcentageI=list1[1]
                        else:
                            pourcentageI=list1[0]
                else:
                    numbers = re.findall(r'\d+', context)
                    list1=[int(number) for number in numbers]
                    if not list1:
                        print("")
                    else:
                        pourcentageI=list1[0]
            elif(keyword =="Thinking"):
                if(check_order2(context)):
                    numbers = re.findall(r'\d+', context)
                    list1=[int(number) for number in numbers]
                    if not list1:
                        print("")
                    else:
                        if(len(list1)>1):
                            pourcentageI=list1[1]
                        else:
                            pourcentageI=list1[0]
                else:
                    numbers = re.findall(r'\d+', context)
                    list1=[int(number) for number in numbers]
                    if not list1:
                        print("")
                    else:
                        pourcentageI=list1[0]
            if(pourcentageI != -1):
                break
        if(pourcentageI != -1):
            break
    keywords = ["feeling", "Feeling"]
    for keyword in keywords:
        result = extract_context(text, keyword)
        for context in result:
            numbers = re.findall(r'\d+', context)
            list=[int(number) for number in numbers]
            if not list:
                print("")
            else:
                if(pourcentageI == list[0]):
                    pourcentageE=list[1]
                else:
                    pourcentageE=list[0]
            if(pourcentageE != -1):
                break
        if(pourcentageE != -1):
            break
    if ((pourcentageE ==-1) and (pourcentageI==-1 )):
        pourcentageI,pourcentageE=findper(text)
    elif ((pourcentageI != -1) and (pourcentageE ==-1)):
        pourcentageE = 100 - pourcentageI
    elif ((pourcentageI == -1) and (pourcentageE != -1)):
        pourcentageI = 100 - pourcentageE
    elif ((pourcentageI != -1) and (pourcentageE != -1) and ((pourcentageI + pourcentageE) != 100)):
        if(pourcentageE > pourcentageI):
            pourcentageI = 100 - pourcentageE
        elif(pourcentageI > pourcentageE):
            pourcentageE = 100 - pourcentageI
    percentages = {'thinking': None, 'feeling': None}
    percentages['thinking'] = pourcentageI
    percentages['feeling'] = pourcentageE
    return percentages


def extract_context(text, keyword):
    pattern = re.compile(rf'(.{{0,20}}{re.escape(keyword)}(.{{0,20}}))', re.IGNORECASE)
    matches = re.finditer(pattern, text)
    result = []
    for match in matches:
        result.append(match.group(1))
    return result

def deleteT(text):
    if(text=="" or text is None):
        return text
    else:
        characters_to_remove = '.,\'"'
        translation_table = str.maketrans("", "", characters_to_remove)
        modified_text = text.translate(translation_table)
        return modified_text

def check_order1(text):
    extrovert_index = text.find("feeling")
    introvert_index = text.find("thinking")

    if extrovert_index != -1 and introvert_index != -1:
        return extrovert_index < introvert_index
    else:
        return False

def check_order2(text):
    extrovert_index = text.find("Feeling")
    introvert_index = text.find("Thinking")

    if extrovert_index != -1 and introvert_index != -1:
        return extrovert_index < introvert_index
    else:
        return False

def findper(text):
    numbers = re.findall(r'\d+', text)
    if(len(numbers)==0):
        return 50,50
    else:
        largest_number = max(map(int, numbers))
    extrovert_positions = []
    extrovert_position = text.find("feeling")
    while extrovert_position != -1:
        extrovert_positions.append(extrovert_position)
        extrovert_position = text.find("feeling", extrovert_position + 1)
    introvert_positions = []
    introvert_position = text.find("thinking")
    while introvert_position != -1:
        introvert_positions.append(introvert_position)
        introvert_position = text.find("thinking", introvert_position + 1)
    ln_position = text.find(str(largest_number))
    result_listE = [x - ln_position for x in extrovert_positions]
    result_listI = [x - ln_position for x in introvert_positions]
    index_of_closest_negativeE = min(
        (index for index, value in enumerate(result_listE) if value < 0),
        key=lambda i: abs(result_listE[i])
    )
    index_of_closest_negativeI = min(
        (index for index, value in enumerate(result_listI) if value < 0),
        key=lambda i: abs(result_listI[i])
    )
    if(introvert_positions[index_of_closest_negativeI]>extrovert_positions[index_of_closest_negativeE]):
        return largest_number,(100 - largest_number)
    elif (introvert_positions[index_of_closest_negativeI]<extrovert_positions[index_of_closest_negativeE]):
        return (100 - largest_number),largest_number
    else:
        return 50,50


