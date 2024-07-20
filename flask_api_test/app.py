from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()

    headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    }

    json_data = {
        'origin': data['origin'],
        'destination': data['destination'],
        'partnerPrograms': [
            'Air Canada', 'United Airlines', 'KLM', 'Qantas', 'American Airlines',
            'Etihad Airways', 'Alaska Airlines', 'Qatar Airways', 'LifeMiles'
        ],
        'stops': 2,
        'departureTimeFrom': '2024-07-09T00:00:00Z',
        'departureTimeTo': '2024-10-07T00:00:00Z',
        'isOldData': False,
        'limit': 302,
        'offset': 0,
        'cabinSelection': [data['cabinSelection']],
        'date': '2024-07-09T12:00:17.796Z',
    }

    response = requests.post('https://cardgpt.in/apitest', headers=headers, json=json_data)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
