import numpy as np
import random
from sklearn.tree import DecisionTreeClassifier


# Adjust MBTI based on Big 5 results
def adjust_mbti(mbti, big5, correlation):
    dimensions = ["E-I", "S-N", "T-F", "J-P"]
    big5_traits = ["E", "O", "A", "C", "N"]

    adjusted_mbti = {}

    for i, dim in enumerate(dimensions):
        adjustment = 0
        for j, trait in enumerate(big5_traits):
            adjustment += correlation[i][j] * (big5[trait] - 50) / 100
        if dim == "E-I":
            initial_value = mbti["extrovert"] if dim[0] == 'E' else mbti["introvert"]
        elif dim == "S-N":
            initial_value = mbti["sensing"] if dim[0] == 'S' else mbti["intuition"]
        elif dim == "T-F":
            initial_value = mbti["thinking"] if dim[0] == 'T' else mbti["feeling"]
        elif dim == "J-P":
            initial_value = mbti["judging"] if dim[0] == 'J' else mbti["perceiving"]

        adjusted_value = initial_value + adjustment * 100
        adjusted_mbti[dim] = {"value": adjusted_value, "type": dim[0] if adjusted_value >= 50 else dim[2]}

    return adjusted_mbti
# Convert adjusted MBTI results to MBTI type
mbti_questions = [


]

# Example dataset of responses and questions for training decision tree
# Features: [PreviousQuestionID, ExtroversionPercentage, IntroversionPercentage, ...]
# Labels: NextQuestionID
response_data = [
]
def mbti_type(adjusted_mbti):
    mbti = ""
    mbti += "E" if adjusted_mbti["E-I"]["type"] == "E" else "I"
    mbti += "S" if adjusted_mbti["S-N"]["type"] == "S" else "N"
    mbti += "T" if adjusted_mbti["T-F"]["type"] == "T" else "F"
    mbti += "J" if adjusted_mbti["J-P"]["type"] == "J" else "P"
    return mbti
def calculeoutof3(job_needs,mbti_results):
    candidate_mbti = ''.join([mbti_results[dimension]['type'] for dimension in ['E-I', 'S-N', 'T-F', 'J-P']])

    # Find the corresponding job need value
    job_need_value = next((value for type_, value in job_needs if type_ == candidate_mbti), None)

    # Calculate the rating for the candidate
    candidate_rating = normalize_job_need_value(job_need_value, job_needs)
    if(candidate_rating<0.25):
        candidate_rating=0
    elif(candidate_rating>=0.25 and candidate_rating<0.75):
        candidate_rating=0.5
    elif(candidate_rating>=0.75 and candidate_rating<1.25):
        candidate_rating=1
    elif(candidate_rating>=1.25 and candidate_rating<1.75):
        candidate_rating=1.5
    elif(candidate_rating>=1.75 and candidate_rating<2.25):
        candidate_rating=2
    elif(candidate_rating>=2.25 and candidate_rating<2.75):
        candidate_rating=2.5
    else:
        candidate_rating=3
    return candidate_rating
# Normalize the job need values to a scale of 1 to 3
def normalize_job_need_value(value, job_needs):
    min_value = min(job_need[1] for job_need in job_needs)
    max_value = max(job_need[1] for job_need in job_needs)
    normalized_value = 1 + 2 * (value - min_value) / (max_value - min_value)

    return normalized_value
def most_dominant_mbti_types(job_needs):
    mbti_totals = {}

    for mbti_type, value in job_needs:
        if mbti_type in mbti_totals:
            mbti_totals[mbti_type] += value
        else:
            mbti_totals[mbti_type] = value

    max_value = max(mbti_totals.values())
    threshold = max_value * 0.7  # Set a threshold (90% of max_value) for considering close values
    dominant_mbti_types = [mbti_type for mbti_type, total in mbti_totals.items() if total >= threshold]

    return dominant_mbti_types

def extract_unique_dimensions(dominant_mbti_types):
    EI = []
    SN = []
    TF = []
    JP = []

    for mbti_type in dominant_mbti_types:
        EI.append(mbti_type[0])
        SN.append(mbti_type[1])
        TF.append(mbti_type[2])
        JP.append(mbti_type[3])

    EI = list(set(EI))
    SN = list(set(SN))
    TF = list(set(TF))
    JP = list(set(JP))

    dominants = [EI, SN, TF, JP]
    return dominants

def calculeoutof2(type,dominants):
    rate=0
    if(type[0] in dominants[0]):rate=rate+0.5
    elif(type[1] in dominants[1]):rate=rate+0.5
    elif(type[2] in dominants[2]):rate=rate+0.5
    elif(type[3] in dominants[3]):rate=rate+0.5
    return rate




# MBTI results
mbti_results = {
    "extrovert": 15.0, "introvert": 85.0,
    "sensing": 65.0, "intuition": 35.0,
    "thinking": 35.0, "feeling": 65.0,
    "judging": 70.0, "perceiving": 30.0,
    "dimension1": "I", "dimension2": "S",
    "dimension3": "F", "dimension4": "J",
    "personality": "ISFJ"
}

# Big 5 results
big5_results = {"E": 55.0, "A": 45.0, "C": 40.0, "N": 45.0, "O": 60.0}






###########
job_needs = [
    ["ENTJ", 20.3], ["ESTJ", 20.0], ["ISTJ", 10.9], ["ESTP", 9.7],
    ["ISFJ", 8.7], ["ISFP", 6.9], ["ENTP", 5.3], ["INTJ", 5.0],
    ["ESFP", 4.3], ["INFP", 3.3], ["ISTP", 3.3], ["INFJ", 2.3]
]



def Score_Calculation(job_needs,mbti_results,big5_results):
    # Correlation table
    correlation_matrix = np.array([
        [-0.74, 0.03, -0.03, 0.08, 0.16],
        [0.10, 0.72, 0.04, -0.15, -0.06],
        [0.19, 0.02, 0.44, -0.15, 0.06],
        [0.15, 0.30, -0.06, -0.49, 0.11]
    ])
    mbti_results = adjust_mbti(mbti_results, big5_results, correlation_matrix)
    new_mbti_type = mbti_type(mbti_results)
    candidate_rating=calculeoutof3(job_needs,mbti_results)
    dominant_mbti_types = most_dominant_mbti_types(job_needs)
    dominants=extract_unique_dimensions(dominant_mbti_types)
    rate=calculeoutof2(new_mbti_type,dominants)

    return rate+candidate_rating,new_mbti_type






# Function to get the next question based on current response
def get_next_question(current_question_id, percentages):
    # Feature vector for decision tree: [QuestionID, Extrovert%, Introvert%, etc.]
    # Extracting features and labels
    X = np.array([data[:-1] for data in response_data])
    y = np.array([data[-1] for data in response_data])

    # Train decision tree model
    decision_tree = DecisionTreeClassifier()
    decision_tree.fit(X, y)
    feature_vector = [current_question_id] + percentages

    # Predict the next question ID using the decision tree
    next_question_id = decision_tree.predict([feature_vector])[0]

    # Find and return the next question
    for question in mbti_questions:
        if question['id'] == next_question_id:
            return question



