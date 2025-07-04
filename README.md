
1. Login / Authentication
Purpose:
Secure access for operators and admins.
How it works:
Users register and log in via the provided forms.
Authentication state is managed (e.g., using Firebase or local storage).
User roles (operator/admin) determine dashboard access and permissions.
Operator info is stored in local storage for session persistence.
2. Safety Measures
Purpose:
Ensure operator and machine safety through real-time monitoring and AI-driven alerts.
How it works:
The alert.jsx page simulates and monitors key safety metrics: seat belt status, machine running state, speed, obstacles, idle time, load cycles, engine hours, and fuel usage.
Thresholds are set for each metric. If a metric approaches or exceeds its threshold, an anomaly alert is shown.
The system uses Google Gemini AI to provide real-time safety suggestions based on current conditions.
Operators receive clear, actionable alerts and guidance to prevent unsafe situations.
3. Task Allocation
Purpose:
Efficiently assign and track tasks for operators.
How it works:
Admins use the dashboard to create and assign tasks to operators (see AdminDashboard.jsx and TaskFormModal.jsx).
Task details include type, machine, operator, schedule, and more.
Assigned tasks are stored in the backend and fetched by operators upon login.
Operators view their assigned tasks in their dashboard, update status, and receive notifications for new or overdue tasks.
Task progress and completion are tracked and visible to admins for monitoring.
