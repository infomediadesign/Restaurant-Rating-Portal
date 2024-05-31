from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection
import time


def time_is_hh_mm_ss(time_to_check):
    try:
        time.strptime(time_to_check, '%H:%M:%S')
    except ValueError:
        return False
    else:
        return True


def add(data):
    if data is None:
        return jsonify({'error': 'No data provided'}), 400
    if 'fk_restaurant' not in data:
        return jsonify({'error': 'No fk_restaurant'}), 400
    if 'week_day' not in data:
        return jsonify({'error': 'No week_day'}), 400
    if 'open_time' not in data:
        return jsonify({'error': 'No open_time'}), 400
    if 'close_time' not in data:
        return jsonify({'error': 'No close_time'}), 400

    try:
        fk_restaurant = int(data['fk_restaurant'])
        week_day = int(data['week_day'])
    except Error:
        return jsonify({'error': "fk_owner must be int"}), 400

    open_time = data['open_time']
    if not time_is_hh_mm_ss(open_time):
        return jsonify({'error': 'Invalid open_time'}), 400

    close_time = data['close_time']
    if not time_is_hh_mm_ss(close_time):
        return jsonify({'error': 'Invalid close_time'}), 400

    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        sql = ("INSERT INTO `opening_hours` "
               "(`fk_restaurant`, `week_day`, `open_time`, `close_time`) "
               "VALUES "
               "(%s, %s, %s, %s)")
        cursor.execute(sql, (fk_restaurant, week_day, open_time, close_time))
        connection.commit()
        return jsonify({"message": "Data inserted successfully"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        connection.close()