# Full-Stack To-Do App

This is a simple to-do application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, log in, and manage their personal to-do lists.

## Features

* User authentication (registration and login) with JWT.
* Create, read, update, and delete to-do items.
* Private routes to protect user-specific data.
* Responsive design for a seamless experience on all devices.

## Tech Stack

* **Frontend:** React, React Router, Axios
* **Backend:** Node.js, Express, Mongoose
* **Database:** MongoDB

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd practice-todo-app
    ```

2.  **Setup Backend:**
    * Navigate to the backend folder: `cd backend`
    * Install dependencies: `npm install`
    * Create a `.env` file and add your `MONGO_URI` and `JWT_SECRET`.
    * Start the backend server: `npm run dev`

3.  **Setup Frontend:**
    * Open a new terminal and navigate to the frontend folder: `cd frontend`
    * Install dependencies: `npm install`
    * Start the React app: `npm start`

## Deployment

This application is deployed with a separate frontend and backend.

* **Backend:** Deployed on Render.
* **Frontend:** Deployed on Vercel.