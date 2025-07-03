import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
from sklearn.ensemble import HistGradientBoostingRegressor
import xgboost as xgb
import lightgbm as lgb
import joblib
import csv
import numpy as np

# Load dataset
# Columns: task_type,machine_type,machine_fuel_used,engine_hours,curr_load_cycles,idling_time,environmental_conditions,operator_level,actual_time_taken
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

# Model candidates
gb_model = HistGradientBoostingRegressor(random_state=42)
xgb_model = xgb.XGBRegressor(random_state=42, n_estimators=100, verbosity=0)
lgb_model = lgb.LGBMRegressor(random_state=42, n_estimators=100)

models = {
    'HistGradientBoosting': gb_model,
    'XGBoost': xgb_model,
    'LightGBM': lgb_model
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    results[name] = mae
    print(f"{name} MAE: {mae:.3f}")

# Select best model
best_model_name = min(results, key=results.get)
best_model = models[best_model_name]
print(f"Best model: {best_model_name}")

# Save best model
joblib.dump(best_model, 'task_time_model.pkl')
print("Model saved as task_time_model.pkl")

# Save encoders
joblib.dump(le_task, 'le_task.pkl')
joblib.dump(le_machine, 'le_machine.pkl')
joblib.dump(le_env, 'le_env.pkl')

# --- Functions for retraining and prediction ---
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
    le_task = LabelEncoder()
    le_machine = LabelEncoder()
    le_env = LabelEncoder()
    df['task_type'] = le_task.fit_transform(df['task_type'])
    df['machine_type'] = le_machine.fit_transform(df['machine_type'])
    df['environmental_conditions'] = le_env.fit_transform(df['environmental_conditions'])
    y = df['actual_time_taken']
    X = df.drop('actual_time_taken', axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    gb_model = HistGradientBoostingRegressor(random_state=42)
    xgb_model = xgb.XGBRegressor(random_state=42, n_estimators=100, verbosity=0)
    lgb_model = lgb.LGBMRegressor(random_state=42, n_estimators=100)
    models = {
        'HistGradientBoosting': gb_model,
        'XGBoost': xgb_model,
        'LightGBM': lgb_model
    }
    results = {}
    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        results[name] = mae
        print(f"{name} MAE after retraining: {mae:.3f}")
    best_model_name = min(results, key=results.get)
    best_model = models[best_model_name]
    print(f"Best model after retraining: {best_model_name}")
    joblib.dump(best_model, 'task_time_model.pkl')
    print("Model retrained and saved as task_time_model.pkl")
    joblib.dump(le_task, 'le_task.pkl')
    joblib.dump(le_machine, 'le_machine.pkl')
    joblib.dump(le_env, 'le_env.pkl')

def predict_task_time(
    task_type, machine_type, machine_fuel_used, engine_hours,
    curr_load_cycles, idling_time, environmental_conditions, operator_level
):
    # Load encoders and model
    le_task = joblib.load('le_task.pkl')
    le_machine = joblib.load('le_machine.pkl')
    le_env = joblib.load('le_env.pkl')
    task_type_enc = le_task.transform([task_type])[0]
    machine_type_enc = le_machine.transform([machine_type])[0]
    env_cond_enc = le_env.transform([environmental_conditions])[0]
    X_new = pd.DataFrame([[task_type_enc, machine_type_enc, machine_fuel_used, engine_hours,
                           curr_load_cycles, idling_time, env_cond_enc, operator_level]],
                         columns=['task_type','machine_type','machine_fuel_used','engine_hours','curr_load_cycles','idling_time','environmental_conditions','operator_level'])
    loaded_model = joblib.load('task_time_model.pkl')
    pred = loaded_model.predict(X_new)
    return pred[0]

# Example usage:
# add_record_and_retrain('Excavation', 'Excavator', 15.2, 1400, 36, 51, 'Sunny', 2, 67)
# result = predict_task_time('Excavation', 'Excavator', 15.0, 1300, 25, 40, 'Sunny', 2)
# print('Predicted time to complete task:', round(result, 2))
