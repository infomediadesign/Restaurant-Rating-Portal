from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection


def create(data):
    if data is None:
        return jsonify({'error': 'No data provided'}), 400
    if 'fk_owner' not in data:
        return jsonify({'error': 'No owner id provided'}), 400
    if 'name' not in data:
        return jsonify({'error': 'No name provided'}), 400
    if 'genre' not in data:
        return jsonify({'error': 'No genre provided'}), 400
    if 'house_number' not in data:
        return jsonify({'error': 'No house_number provided'}), 400
    if 'street_name' not in data:
        return jsonify({'error': 'No street_name provided'}), 400
    if 'city' not in data:
        return jsonify({'error': 'No city provided'}), 400
    if 'state' not in data:
        return jsonify({'error': 'No state provided'}), 400
    if 'country' not in data:
        return jsonify({'error': 'No country provided'}), 400
    if 'zip_code' not in data:
        return jsonify({'error': 'No zip_code provided'}), 400
    if 'licence' not in data:
        return jsonify({'error': 'No licence provided'}), 400

    try:
        fk_owner = int(data['fk_owner'])
    except ValueError as e:
        return jsonify({'error': "Owner ID must be int"}), 400
    name = data['name']
    genre = data['genre']
    try:
        house_number = int(data['house_number'])
    except ValueError as e:
        return jsonify({'error': "House number must be int"}), 400
    street_name = data['street_name']
    city = data['city']
    state = data['state']
    country = data['country']
    try:
        zip_code = int(data['zip_code'])
    except ValueError as e:
        return jsonify({'error': "Zip code must be int"}), 400
    licence = data['licence']

    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        sql = ("INSERT INTO `restaurants` (`fk_owner`, `name`, `genre`, `house_number`, `street_name`, `city`, `state`, `country`, `zip_code`, `licence`)"
               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        cursor.execute(sql, (fk_owner, name, genre, house_number, street_name, city, state, country, zip_code, licence))
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
    if 'pk_restaurant' not in data:
        return jsonify({'error': 'No restaurant id provided'}), 400
    if 'name' not in data:
        return jsonify({'error': 'No name provided'}), 400
    if 'genre' not in data:
        return jsonify({'error': 'No genre provided'}), 400
    if 'house_number' not in data:
        return jsonify({'error': 'No house_number provided'}), 400
    if 'street_name' not in data:
        return jsonify({'error': 'No street_name provided'}), 400
    if 'city' not in data:
        return jsonify({'error': 'No city provided'}), 400
    if 'state' not in data:
        return jsonify({'error': 'No state provided'}), 400
    if 'country' not in data:
        return jsonify({'error': 'No country provided'}), 400
    if 'zip_code' not in data:
        return jsonify({'error': 'No zip_code provided'}), 400
    if 'licence' not in data:
        return jsonify({'error': 'No licence provided'}), 400

    try:
        pk_restaurant = int(data['pk_restaurant'])
    except ValueError as e:
        return jsonify({'error': "Restaurant ID must be int"}), 400
    name = data['name']
    genre = data['genre']
    try:
        house_number = int(data['house_number'])
    except ValueError as e:
        return jsonify({'error': "House number must be int"}), 400
    street_name = data['street_name']
    city = data['city']
    state = data['state']
    country = data['country']
    try:
        zip_code = int(data['zip_code'])
    except ValueError as e:
        return jsonify({'error': "Zip code must be int"}), 400
    licence = data['licence']

    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        sql = ("UPDATE `restaurants` "
               "SET "
               "`name` = %s, "
               "`genre` = %s, "
               "`house_number` = %s, "
               "`street_name` = %s, "
               "`city` = %s, "
               "`state` = %s, "
               "`country` = %s, "
               "`zip_code` = %s, "
               "`licence` = %s "
               "WHERE `pk_restaurant` = %s")
        print(sql)
        cursor.execute(sql, (name, genre, house_number, street_name, city, state, country, zip_code, licence, pk_restaurant))
        connection.commit()
        return jsonify({"message": "Data updated successfully"}), 201
    except mysql.connector.IntegrityError as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


def delete(restaurant_id):
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        sql = "DELETE FROM `restaurants` WHERE `pk_restaurant` = %s"
        cursor.execute(sql, (restaurant_id,))
        connection.commit()
        return jsonify({"message": "Restaurant deleted successfully"}), 200
    except Error as e:
        return jsonify({"error": "Failed to delete restaurant - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()


def verify(restaurant_id):
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        sql = ("UPDATE `restaurants` SET "
               "`verified` = '1'"
               "WHERE `pk_restaurant` = %s")
        cursor.execute(sql, (restaurant_id,))
        connection.commit()
        return jsonify({"message": "Restaurant verified successfully"}), 200
    except Error as e:
        return jsonify({"error": "Failed to delete restaurant - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()
