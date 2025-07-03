import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
import joblib
import csv

# Load dataset
# Make sure you have a file named 'task_time_dataset.csv' in the same directory
# with the following columns:
# task_type,machine_type,machine_fuel_used,engine_hours,curr_load_cycles,idling_time,environmental_conditions,operator_level,actual_time_taken

df = pd.read_csv('task_time_dataset.csv')

# Encode categorical variables
le_task = LabelEncoder()
le_machine = LabelEncoder()
le_env = LabelEncoder()
df['task_type'] = le_task.fit_transform(df['task_type'])
df['machine_type'] = le_machine.fit_transform(df['machine_type'])
df['environmental_conditions'] = le_env.fit_transform(df['environmental_conditions'])

# Features and target
y = df['actual_time_taken']
X = df.drop('actual_time_taken', axis=1)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, y_pred))

# Save model for later use
joblib.dump(model, 'task_time_model.pkl')
print("Model saved as task_time_model.pkl")

def add_record_and_retrain(
    task_type, machine_type, machine_fuel_used, engine_hours,
    curr_load_cycles, idling_time, environmental_conditions, operator_level, actual_time_taken
):
    # Append new record to CSV
    with open('task_time_dataset.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            task_type, machine_type, machine_fuel_used, engine_hours,
            curr_load_cycles, idling_time, environmental_conditions, operator_level, actual_time_taken
        ])
    print('New record added to dataset.')
    # Retrain model
    retrain_model()

def retrain_model():
    df = pd.read_csv('task_time_dataset.csv')
    df['task_type'] = le_task.fit_transform(df['task_type'])
    df['machine_type'] = le_machine.fit_transform(df['machine_type'])
    df['environmental_conditions'] = le_env.fit_transform(df['environmental_conditions'])
    y = df['actual_time_taken']
    X = df.drop('actual_time_taken', axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print("MAE after retraining:", mean_absolute_error(y_test, y_pred))
    joblib.dump(model, 'task_time_model.pkl')
    print("Model retrained and saved as task_time_model.pkl")

def predict_task_time(
    task_type, machine_type, machine_fuel_used, engine_hours,
    curr_load_cycles, idling_time, environmental_conditions, operator_level
):
    # Load encoders and model
    # Use the same encoders as training
    task_type_enc = le_task.transform([task_type])[0]
    machine_type_enc = le_machine.transform([machine_type])[0]
    env_cond_enc = le_env.transform([environmental_conditions])[0]
    # Prepare input as DataFrame
    X_new = pd.DataFrame([[
        task_type_enc, machine_type_enc, machine_fuel_used, engine_hours,
        curr_load_cycles, idling_time, env_cond_enc, operator_level
    ]], columns=X.columns)
    # Load model
    loaded_model = joblib.load('task_time_model.pkl')
    pred = loaded_model.predict(X_new)
    return pred[0]

# Example usage:
# add_record_and_retrain('Excavation', 'Excavator', 15.2, 1400, 36, 51, 'Sunny', 2, 67)
result = predict_task_time('Excavation', 'Excavator', 15.0, 1300, 25, 40, 'Sunny', 2)
# print('Predicted time to complete task:', round(result, 2))
