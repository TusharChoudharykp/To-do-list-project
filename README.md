🛠️ Working Process
User register

Users sign up with name, email, and password.
The frontend sends a POST request to /api/v2/register.
The password is hashed before storing in MongoDB.
On success, the user gets a JWT token.

User Login

Users enter email and password.
The frontend sends a POST request to /api/v2/login.
The backend verifies the credentials.
On success, the user gets a JWT token & ID is stored in sessionStorage.

Users input a title, body, and due date.
The frontend sends a POST request to /api/v2/addTask.
The task is saved in MongoDB, linked to the user.
Fetching Tasks

When the user logs in, a GET request to /api/v2/getTasks/:id fetches tasks.
Tasks are displayed using React state (useState).
Deleting a Task

Clicking delete sends a DELETE request to /api/v2/deleteTask/:id.
The backend removes the task from the database and the user’s task list.
Reordering Tasks (Drag & Drop)

Users can reorder tasks using React DnD.
The new order is stored in React state.
Displaying Time in IST

The backend formats the due date to Indian Standard Time (IST) before saving.
The frontend also uses Moment.js for displaying the correct timezone.
