# config.py
import os  # Importing the os module to interact with the operating system

class Config:
    # Setting the database URI for SQLAlchemy to connect to a MySQL database
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://user:password@db/taskdb'
    # Disabling SQLAlchemy event system to save resources
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Generating a secret key for session management and other security-related needs
    SECRET_KEY = os.urandom(24)
