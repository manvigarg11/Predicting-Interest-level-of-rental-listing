from flask import Flask, request, jsonify
import helper

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': helper.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_city_names', methods=['GET'])
def get_city_names():
    response = jsonify({
        'city': helper.get_city_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_furniture_type', methods=['GET'])
def get_furniture_names():
    response = jsonify({
        'furniture_type': helper.get_furniture_type()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_rent', methods=['GET', 'POST'])
def predict_rent():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    city = request.form['city']
    furniture = request.form['furniture']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_rent': helper.get_estimated_rent(bhk,total_sqft,bath,city,furniture,location)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    helper.load_saved_artifacts()
    app.run()