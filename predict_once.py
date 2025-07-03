import sys
from task_time_regression import predict_task_time

if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) != 8:
        print("Error: 8 arguments required", file=sys.stderr)
        sys.exit(1)
    pred = predict_task_time(
        args[0],  # task_type
        args[1],  # machine_type
        float(args[2]),  # machine_fuel_used
        float(args[3]),  # engine_hours
        int(args[4]),    # curr_load_cycles
        float(args[5]),  # idling_time
        args[6],         # environmental_conditions
        int(args[7])     # operator_level
    )
    print(round(pred, 2))
