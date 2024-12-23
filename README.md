# LabelBox

LabelBox is a web application for managing projects and tasks, with features for annotating images. The application is built using a Flask backend and a React frontend.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- Project and task management
- Image annotation
- Responsive design

## Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL (or any other database you prefer)
- Virtualenv (optional but recommended)


## Setup

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/labelbox.git
    cd labelbox/backend
    ```

2. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    Create a `.env` file in the [backend](http://_vscodecontentref_/0) directory and add the necessary environment variables:
    ```plaintext
    FLASK_APP=run.py
    FLASK_ENV=development
    DATABASE_URL=<your_database_url>
    ```

5. Run the application:
    ```sh
    flask run
    ```


### Frontend

1. Navigate to the [frontend](http://_vscodecontentref_/1) directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the application:
    ```sh
    npm run dev
    ```

## Running the Application

- The backend will be running on `http://localhost:5000`
- The frontend will be running on `http://localhost:3000`


---
---


## API Endpoints


### Projects

- `GET /api/projects`: Get all projects
- `POST /api/projects`: Create a new project
- `GET /api/projects/:id`: Get a specific project
- `PUT /api/projects/:id`: Update a specific project
- `DELETE /api/projects/:id`: Delete a specific project

### Tasks

- `GET /api/projects/:project_id/tasks`: Get all tasks for a project
- `POST /api/tasks`: Create a new task
- `GET /api/tasks/:id`: Get a specific task
- `DELETE /api/tasks/:id`: Delete a specific task

### Annotations

- `GET /api/annotations`: Get all annotations
- `POST /api/annotations`: Create a new annotation
- `GET /api/annotations/:id`: Get a specific annotation
- `PUT /api/annotations/:id`: Update a specific annotation
- `DELETE /api/annotations/:id`: Delete a specific annotation

