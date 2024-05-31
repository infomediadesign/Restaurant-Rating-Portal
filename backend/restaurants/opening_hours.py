from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection


def create(data):
