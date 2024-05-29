from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection


def fetch_all_restaurants(data):
    name = None
    genres = None
    city = None

    if 'name' in data:
        name = data['name']

    if 'genres' in data:
        genres = data['genres']

    if 'city' in data:
        city = data['city']

    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        query = "SELECT * FROM `restaurants`"

        if name is not None:
            query += " WHERE `name` LIKE '{}'".format(name)

        if genres is not None:
            genres_str = "("
            for genre in genres:
                genres_str += "'{}',".format(genre)
            genres_str = genres_str[:-1]
            genres_str += ")"

            if name is not None:
                query += " AND"

            query += "WHERE `genre` in {}".format(genres_str)

        if city is not None:
            if name is not None or genres is not None:
                query += " AND"
            else:
                query += " WHERE"

            query += " `city` LIKE '{}'".format(city)

        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]
        restaurants = cursor.fetchall()

        if restaurants:
            restaurants_end_result = []

            for restaurant in restaurants:
                restaurants_end_result.append(dict(zip(row_headers, restaurant)))
            return jsonify(restaurants_end_result), 200
        else:
            return jsonify({"error": "No restaurants found"}), 404

    except Error as e:
        return jsonify({"error": "Failed to fetch restaurants - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()


def fetch_restaurant_by_id(id):
    return None

