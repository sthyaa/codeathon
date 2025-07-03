import csv
import random

task_types = [
    "Excavation", "Loading", "Hauling", "Site Grading", "Material Handling",
    "Maintenance", "Inspection", "Fueling", "Operator Training"
]
machine_types = ["Excavator", "Loader", "Dump Truck", "Grader"]
env_conditions = ["Sunny", "Cloudy", "Rainy", "Dusty", "Windy"]
operator_levels = [1, 2, 3]

with open("task_time_dataset.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow([
        "task_type", "machine_type", "environmental_conditions", "operator_level", "actual_time_taken"
    ])
    for _ in range(600):
        task = random.choice(task_types)
        machine = random.choice(machine_types)
        env = random.choice(env_conditions)
        level = random.choice(operator_levels)
        # Generate plausible completion time based on task, machine, level, and environment
        base = 40 + task_types.index(task) * 5 + machine_types.index(machine) * 3
        env_factor = {"Sunny": 0, "Cloudy": 2, "Rainy": 5, "Dusty": 3, "Windy": 4}[env]
        level_factor = (4 - level) * 4  # Higher level = less time
        noise = random.randint(-5, 5)
        actual_time = base + env_factor + level_factor + noise
        writer.writerow([task, machine, env, level, actual_time])
