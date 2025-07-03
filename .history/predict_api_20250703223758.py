from flask import Flask, request, jsonify
from task_time_regression import predict_task_time

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    required_fields = [
        'task_type', 'machine_type', 'machine_fuel_used', 'engine_hours',
        'curr_load_cycles', 'idling_time', 'environmental_conditions', 'operator_level'
    ]
    # Check for missing fields
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
    try:
        pred = predict_task_time(
            data['task_type'],
            data['machine_type'],
            float(data['machine_fuel_used']),
            float(data['engine_hours']),
            int(data['curr_load_cycles']),
            float(data['idling_time']),
            data['environmental_conditions'],
            int(data['operator_level'])
        )
        return jsonify({'predicted_time': round(pred, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
