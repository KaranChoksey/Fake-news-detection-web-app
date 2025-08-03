# Fake News Detection Web App

This repository contains a web application designed to detect fake news articles using machine learning. Users can input news text through the web interface, and the app will predict whether the news is real or fake.

## Features

- **Machine Learning-Based Classification**: Utilizes an XGBoost model trained on a labeled dataset of news articles.
- **Text Preprocessing**: Uses NLTK for cleaning and TF-IDF for feature extraction.
- **Web Interface**: Simple user interface developed using Express.js and HTML.
- **API Backend**: FastAPI serves predictions from the trained model.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/KaranChoksey/Fake-news-detection-web-app.git

cd Fake-news-detection-web-app
```

### 2. Python Backend Setup


- Start the FastAPI server (example, update as needed):
  ```bash
  uvicorn app:app --reload
  ```

### 3. Node.js Frontend Setup

- Install dependencies:
  ```bash
  npm install
  ```
- Start the server:
  ```bash
  node server.js
  ```

### 4. Usage

- Access the web interface via your browser at [http://localhost:3000](http://localhost:3000) (default port).
- Enter a news article or headline and submit to see if it's classified as real or fake.

## Model Training

- The ML model is trained in `fakenews_detection.ipynb` using XGBoost, NLTK, and TF-IDF.
- Training data is sourced from `train.csv`.

## File Overview

- `app.py` – Serves the ML model via an API.
- `server.js` – Handles web requests and communicates with the backend API.
- `index.html` – The web interface for user interaction.

