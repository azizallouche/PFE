import json

def set_value(key, value):
    with open('data.json', 'r+') as file:
        data = json.load(file)
        data[key] = value
        file.seek(0)
        json.dump(data, file)

def get_value(key):
    with open('data.json', 'r') as file:
        data = json.load(file)
        return data.get(key, None)