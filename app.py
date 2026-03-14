from flask import Flask, request
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import IsolationForest

app = Flask(__name__)
CORS(app)
data = None

@app.route("/")
def home():
    return "ClimaSense Backend Running"

@app.route("/upload", methods=["POST"])
def upload():
    global data
    file = request.files["file"]
    data = pd.read_csv(file)
    return {"message": "Dataset uploaded"}

@app.route("/data")
def get_data():
    return data.to_json(orient="records")

@app.route("/analyze")
def analyze():
    global data

    # find the highest temperature year
    max_row = data.loc[data["temperature"].idxmax()]

    result = {
        "year": int(max_row["year"]),
        "temperature": float(max_row["temperature"])
    }

    return result

if __name__ == "__main__":
    app.run(debug=True)