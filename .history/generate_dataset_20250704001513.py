import csv
import random

task_types = [
    'Excavation', 'Loading', 'Hauling', 'Site Grading', 'Material Handling',
    'Maintenance', 'Inspection', 'Fueling', 'Operator Training'
]
machine_types = ['Excavator', 'Loader', 'Dump Truck', 'Grader']
environmental_conditions = ['Sunny', 'Cloudy', 'Rainy', 'Dusty', 'Windy']

NUM_RECORDS = 600

with open('task_time_dataset.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow([
        'task_type', 'machine_type', 'machine_fuel_used', 'engine_hours',
        'curr_load_cycles', 'idling_time', 'environmental_conditions',
        'operator_level', 'actual_time_taken'
    ])
    for _ in range(NUM_RECORDS):
        task_type = random.choice(task_types)
        machine_type = random.choice(machine_types)
        machine_fuel_used = round(random.uniform(8.0, 22.0), 1)
        engine_hours = random.randint(700, 2200)
        curr_load_cycles = random.randint(0, 45) if task_type != 'Hauling' else random.randint(35, 45)
        idling_time = random.randint(4, 60)
        environmental_condition = random.choice(environmental_conditions)
        operator_level = random.randint(1, 3)
        # Simulate actual_time_taken based on some logic
        base_time = 20 + (engine_hours / 100) + (curr_load_cycles / 2) + (idling_time / 3)
        if task_type == 'Operator Training':
            base_time += 30
        if environmental_condition in ['Rainy', 'Dusty', 'Windy']:
            base_time += 5
        if operator_level == 1:
            base_time += 10
        elif operator_level == 3:
            base_time -= 5
        actual_time_taken = int(base_time + random.uniform(-5, 5))
        writer.writerow([
            task_type, machine_type, machine_fuel_used, engine_hours,
            curr_load_cycles, idling_time, environmental_condition,
            operator_level, actual_time_taken
        ])
print(f"Generated {NUM_RECORDS} records in task_time_dataset.csv")
