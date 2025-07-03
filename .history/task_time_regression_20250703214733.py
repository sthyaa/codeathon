import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
import joblib

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
