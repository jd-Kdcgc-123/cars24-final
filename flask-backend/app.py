# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app
app.config.from_object('config.Config')  # Load configuration from config.py
db = SQLAlchemy(app)  # Initialize SQLAlchemy with the Flask app
migrate = Migrate(app, db)  # Enable database migrations

from routes import task_blueprint
app.register_blueprint(task_blueprint, url_prefix='/tasks')  # Register the tasks blueprint

if __name__ == '__main__':
    app.run(debug=True)  # Run the app in debug mode
