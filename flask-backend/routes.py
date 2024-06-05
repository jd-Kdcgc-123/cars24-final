from flask import Flask, Blueprint, request, jsonify  # Import necessary Flask modules
from app import db  # Import the database instance
from models import Task  # Import the Task model
from flask_cors import CORS, cross_origin  # Import CORS support

app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

task_blueprint = Blueprint('tasks', __name__)  # Create a Blueprint for task routes

@task_blueprint.route('/', methods=['POST', 'OPTIONS'])
@cross_origin(origins='http://localhost:3000')  # Allow CORS for specific origin
def create_task():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'CORS preflight'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response, 200
    
    data = request.get_json()  # Get JSON data from the request
    new_task = Task(
        title=data['title'],
        description=data.get('description', ''),
        status=data.get('status', False)
    )
    db.session.add(new_task)  # Add new task to the database
    db.session.commit()  # Commit the transaction
    response = jsonify({
        'id': new_task.id,
        'title': new_task.title,
        'description': new_task.description,
        'status': new_task.status
    })
    return response, 201  # Return the created task with status 201

@task_blueprint.route('/', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()  # Query all tasks from the database
    return jsonify([task.as_dict() for task in tasks]), 200  # Return tasks as JSON

@task_blueprint.route('/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)  # Get the task by ID
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    data = request.get_json()
    task.title = data['title']
    task.description = data['description']
    task.status = data['status']
    db.session.commit()  # Commit the updated task
    return jsonify({'message': 'Task updated!'}), 200

@task_blueprint.route('/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)  # Get the task by ID
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    db.session.delete(task)  # Delete the task from the database
    db.session.commit()  # Commit the transaction
    return jsonify({'message': 'Task deleted!'}), 200
