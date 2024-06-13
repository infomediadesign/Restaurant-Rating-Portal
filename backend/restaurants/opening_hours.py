from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection
import time
import datetime


def time_is_hh_mm_ss(time_to_check):
    try:
        time.strptime(time_to_check, '%H:%M:%S')
    except ValueError:
        return False
    else:
        return True


def convert_time(time_to_convert):
    print("time")
    print(time_to_convert)


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


def update(data):
    if data is None:
        return jsonify({'error': 'No data provided'}), 400
    if 'pk_opening_hour' not in data:
        return jsonify({'error': 'No pk_opening_hour'}), 400
    if 'week_day' not in data:
        return jsonify({'error': 'No week_day'}), 400
    if 'open_time' not in data:
        return jsonify({'error': 'No open_time'}), 400
    if 'close_time' not in data:
        return jsonify({'error': 'No close_time'}), 400

    try:
        pk_opening_hour = int(data['pk_opening_hour'])
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
        sql = ("UPDATE `opening_hours` "
               "SET `week_day` = %s, `open_time` = %s, `close_time` = %s "
               "WHERE `pk_opening_hour` = %s`")
        connection.execute(sql, (week_day, open_time, close_time, pk_opening_hour, ))
        connection.commit()
        return jsonify({"message": "Data updated successfully"}), 202
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        connection.close()


def delete(pk_opening_hour):
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        sql = ("DELETE FROM `opening_hours` "
               "WHERE `pk_opening_hour` = %s")
        cursor.execute(sql, (pk_opening_hour,))
        connection.commit()
        return jsonify({"message": "Data deleted successfully"}), 204
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        connection.close()


def fetch_by_id(pk_opening_hour):
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        sql = ("SELECT `fk_restaurant`, `week_day`, `open_time`, `close_time` "
               "FROM `opening_hours` "
               "WHERE `pk_opening_hour` = %s"
               "ORDER BY `week_day`, `open_time` ASC")
        cursor.execute(sql, (pk_opening_hour,))
        opening_hour = cursor.fetchone()

        row_headers = [x[0] for x in cursor.description]

        result_opening_hour = dict(zip(row_headers, opening_hour))

        result_opening_hour['open_time'] = str(result_opening_hour['open_time'])
        result_opening_hour['close_time'] = str(result_opening_hour['close_time'])

        return jsonify(result_opening_hour), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        connection.close()


def fetch_all_by_restaurant_id(fk_restaurant):
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        sql = ("SELECT `pk_opening_hour`, `week_day`, `open_time`, `close_time` "
               "FROM `opening_hours` "
               "WHERE `fk_restaurant` = %s "
               "ORDER BY `week_day`, `open_time` ASC")
        cursor.execute(sql, (fk_restaurant,))
        opening_hours = cursor.fetchall()

        result_opening_hours = []

        row_headers = [x[0] for x in cursor.description]

        for opening_hour in opening_hours:
            opening_hour_result = dict(zip(row_headers, opening_hour))
            result_opening_hours.append(opening_hour_result)

        for result_opening_hour in result_opening_hours:
            result_opening_hour['open_time'] = str(result_opening_hour['open_time'])
            result_opening_hour['close_time'] = str(result_opening_hour['close_time'])

        print(result_opening_hours)

        return jsonify(result_opening_hours), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cursor.close()
        connection.close()
