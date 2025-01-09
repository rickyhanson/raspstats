from flask import Flask, jsonify
import boto3
from decimal import Decimal

app = Flask(__name__)
AWS_REGION = "eu-central-1"
DYNAMODB_TABLE = "TemperatureData"

def fetch_data_from_dynamodb():
    dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
    table = dynamodb.Table(DYNAMODB_TABLE)
    response = table.scan()
    items = response.get("Items", [])
    # Convert Decimal to float for JSON serialization
    for item in items:
        item["temperature"] = float(item["temperature"])
    return items

@app.route("/data", methods=["GET"])
def get_data():
    try:
        data = fetch_data_from_dynamodb()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
