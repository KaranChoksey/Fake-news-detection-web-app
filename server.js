const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html')); // Send the index.html file
});

// Handle form submissions and make API request to FastAPI server
app.post('/predict', async (req, res) => {
    const { title, author, text } = req.body;

    try {
        // Call the FastAPI backend
        const response = await axios.post('http://localhost:8000/predict/', {
            title,
            author,
            text
        });

        const prediction = response.data.prediction;
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Prediction Result</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f4f4f9;
                    }
                    .result-container {
                        text-align: center;
                        padding: 20px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        height: 200px
                    }
                    .result-container h1 {
                        color: #333;
                    }
                    .result-container a {
                        display: inline-block;
                        margin-top: 20px;
                        text-decoration: none;
                        color: #007bff;
                    }
                </style>
            </head>
            <body>
                <div class="result-container">
                    <h1>Prediction: ${prediction}</h1>
                    <a href="/">Try another</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.send(`<h1>Error: Could not get prediction</h1><br><a href="/">Try again</a>`);
    }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
