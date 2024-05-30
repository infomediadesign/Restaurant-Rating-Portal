from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection


def delete(picture_id):
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        sql = "DELETE FROM `pictures` WHERE `pk_picture` = %s"
        cursor.execute(sql, (picture_id,))
        connection.commit()
        return jsonify({"message": "Picture deleted successfully"}), 200
    except Error as e:
        return jsonify({"error": "Failed to delete picture - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()


def upload(data):
    if not data:
        return jsonify({"error": "No data provided"}), 400
    if 'fk_restaurant' not in data:
        return jsonify({"error": "No restaurant data provided (fk_restaurant)"}), 400
    if 'url' not in data:
        return jsonify({"error": "No url data provided"}), 400

    restaurant_id = data['fk_restaurant']
    url = data['url']

    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        sql = "INSERT INTO `pictures` (`fk_restaurant`, `url`) VALUES (%s, %s)"
        cursor.execute(sql, (restaurant_id, url))
        connection.commit()
        return jsonify({"message": "Picture uploaded successfully"}), 201
    except mysql.connector.IntegrityError as e:
        if e.errno == 1062:  # MySQL error number for duplicate entry
            return jsonify({"error": "Image already in Use for another restaurant"}), 400
        else:
            return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()
