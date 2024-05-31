from flask import Flask, jsonify, request
import json
import mysql.connector
from mysql.connector import Error
from db import create_connection


def fetch_all(data, verified_only=False):
    name_city = None
    genres = None

    if 'name_city' in data:
        name_city = data['name_city']

    if 'genres' in data:
        genres = data['genres']

    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()

    try:
        query = ("SELECT `restaurants`.*, GROUP_CONCAT(`pictures`.`url`) AS 'images' FROM `restaurants`"
                 "LEFT JOIN `pictures` ON `pictures`.`fk_restaurant` = `pk_restaurant`")

        if name_city is not None:
            query += " WHERE (`name` LIKE '%{}%' OR `city` LIKE '%{}%')".format(name_city, name_city)

        if genres is not None:
            genres_str = "("
            for genre in genres:
                genres_str += "'{}',".format(genre)
            genres_str = genres_str[:-1]
            genres_str += ")"

            if name_city is not None:
                query += " AND"

            query += " WHERE `genre` in {}".format(genres_str)

        if verified_only is True:
            if genres is not None or name_city is not None:
                query += "AND"

            query += " AND `verified`= '1'"

        query += " GROUP BY `restaurants`.`pk_restaurant`"
        cursor.execute(query)
        row_headers = [x[0] for x in cursor.description]
        restaurants = cursor.fetchall()

        if restaurants:
            restaurants_end_result = []

            for restaurant in restaurants:
                restaurant_result = dict(zip(row_headers, restaurant))
                if restaurant_result["images"] is not None:
                    restaurant_result["images"] = restaurant_result["images"].split(",")
                restaurants_end_result.append(restaurant_result)

            return jsonify(restaurants_end_result), 200
        else:
            return jsonify({"error": "No restaurants found"}), 404

    except Error as e:
        return jsonify({"error": "Failed to fetch restaurants - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()


def fetch_by_id(restaurant_id):

    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        query = ("SELECT `restaurants`.*, GROUP_CONCAT(`pictures`.`url`) AS 'images' FROM `restaurants` "
                 "LEFT JOIN `pictures` ON `pictures`.`fk_restaurant` = `pk_restaurant` "
                 "WHERE `pk_restaurant` = %s")

        cursor.execute(query, (restaurant_id,))
        row_headers = [x[0] for x in cursor.description]
        restaurant = cursor.fetchone()

        if restaurant:
            restaurant_result = dict(zip(row_headers, restaurant))
            if restaurant_result["images"] is not None:
                restaurant_result["images"] = restaurant_result["images"].split(",")

            return jsonify(restaurant_result), 200
    except Error as e:
        return jsonify({"error": "Failed to fetch restaurants - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()


def fetch_by_owner(owner_id):
    connection = create_connection()

    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    cursor = connection.cursor()
    try:
        query = ("SELECT `restaurants`.*, GROUP_CONCAT(`pictures`.`url`) AS 'images' FROM `restaurants` "
                 "LEFT JOIN `pictures` ON `pictures`.`fk_restaurant` = `pk_restaurant` "
                 "WHERE `fk_owner` = %s")

        cursor.execute(query, (owner_id,))
        row_headers = [x[0] for x in cursor.description]
        restaurant = cursor.fetchone()

        if restaurant:
            restaurant_result = dict(zip(row_headers, restaurant))
            if restaurant_result["images"] is not None:
                restaurant_result["images"] = restaurant_result["images"].split(",")

            return jsonify(restaurant_result), 200
    except Error as e:
        return jsonify({"error": "Failed to fetch restaurants - " + str(e)}), 500

    finally:
        cursor.close()
        connection.close()