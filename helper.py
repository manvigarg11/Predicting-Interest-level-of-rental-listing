import pickle
import json
import numpy as np

__locations = None
__city = None
__furnished_type = None
__data_columns = None
__model = None

def get_estimated_rent(bhk,size,bath,city,furniture_type,locality):
    try:
        city_index = __data_columns.index(city.lower())
        furniture_type_index = __data_columns.index(furniture_type.lower())
        loc_index = __data_columns.index(locality.lower())
    except:
        city_index = -1
        furniture_type_index = -1
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = bhk
    x[1] = size
    x[2] = bath

    if city_index >= 0:
        x[city_index] = 1

    if furniture_type_index >= 0:
        x[furniture_type_index] = 1

    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)



def load_saved_artifacts():
    global  __data_columns
    global __locations
    global __city
    global __furnished_type

    with open(r"C:\Users\91852\PycharmProjects\mridul\model\columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __city = __data_columns[3:9]
        __furnished_type = __data_columns[9:12]
        __locations = __data_columns[12:]


    global __model
    if __model is None:
        with open(r'C:\Users\91852\PycharmProjects\mridul\model\saved_model.pickle', 'rb') as f:
            __model = pickle.load(f)

def get_location_names():
    return __locations

def get_city_names():
    return __city


def get_furniture_type():
    return __furnished_type


def get_data_columns():
    return __data_columns
