
# Todo List App

A brief description of what this project does and who it's for


## API Reference

#### Get all items

Certainly! Here are the APIs for your project in the specified format:

#### Create Task

```http
  POST /tasks/
```

| Parameter     | Type      | Description                         |
| :------------ | :-------- | :---------------------------------- |
| `title`       | `string`  | **Required**. Title of the task     |
| `description` | `string`  | Description of the task             |
| `status`      | `boolean` | Status of the task (default: false) |

#### Get All Tasks

```http
  GET /tasks/
```

No parameters required.

#### Update Task

```http
  PUT /tasks/${id}
```

| Parameter     | Type      | Description                         |
| :------------ | :-------- | :---------------------------------- |
| `id`          | `int`     | **Required**. Id of the task to update |
| `title`       | `string`  | **Required**. Updated title of the task |
| `description` | `string`  | Updated description of the task     |
| `status`      | `boolean` | Updated status of the task          |

#### Delete Task

```http
  DELETE /tasks/${id}
```

| Parameter | Type | Description                   |
| :-------- | :--- | :---------------------------- |
| `id`      | `int`| **Required**. Id of the task to delete |




## Startup Instructions

To run the application using Docker, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>

2. Build and run the Docker containers:
   ```bash
   docker-compose up --build
   ```
   The Flask application will be available at http://127.0.0.1:5000.
