from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import nltk

# nltk.download('stopwords') # Uncomment if stopwords not downloaded

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model for the input data
class NewsRequest(BaseModel):
    title: str
    author: str
    text: str

# Load your trained model and vectorizer
model = joblib.load("fake_news_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")  # Save this during training as `joblib.dump(vector, "vectorizer.pkl")`

# Initialize stemmer
ps = PorterStemmer()

# Define a route for predictions
@app.post("/predict/")
async def predict(news: NewsRequest):
    # Process the input
    processed_input = process_input(news.title, news.author, news.text)
    
    # Vectorize the processed input text
    vectorized_input = vectorizer.transform([processed_input])
    
    # Predict and return the result
    prediction = model.predict(vectorized_input)[0]
    return {"prediction": "Fake news" if prediction == 1 else "Real news"}

# Helper function for input processing (stemming + text cleaning)
def process_input(title, author, text):
    # Combine all text fields
    combined_text = f"{title} {author} {text}"
    
    # Clean the text (only keep alphabets and make lowercase)
    combined_text = re.sub('[^a-zA-Z]', ' ', combined_text).lower()
    
    # Tokenize and stem each word (excluding stopwords)
    words = combined_text.split()
    stemmed_words = [ps.stem(word) for word in words if word not in stopwords.words('english')]
    
    # Join stemmed words into a single string
    return ' '.join(stemmed_words)
