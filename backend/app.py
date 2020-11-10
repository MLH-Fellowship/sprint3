#### HOW TO
# (if needed) pip install virtualenv
# create virtual environment: 'virtualenv venv'
# activate virtual environment (for Windows): 'source venv/Scripts/activate'
# install required packages: 'pip install requirements.txt'
# make sure (venv) appears => can now pip install packages: 'pip install [pakcage name]'
# run app: 'python app.py'

#### IMPORT
import os
from dotenv import load_dotenv
from flask import Flask, redirect, request
from flask_cors import CORS 
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

#### APP SETUP
app = Flask(__name__)
CORS(app)
load_dotenv()

## Spotify
cid = os.getenv('SPOTIFY_CLIENT_ID')
secret = os.getenv('SPOTIFY_SECRET_ID')
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


#### ROUTES

# test route
@app.route('/', methods=['GET'])
def index():
    return "Hi"

# route to search for a term
@app.route('/search/<string:term>', methods=['GET'])
def search(term):
    search_results = sp.search(q=term, type='track', limit=20)
    return search_results



@app.route('/audio-features/<string:id>', methods=['GET'])
def getAudioFeatures(id):
    audio_features = sp.audio_features(id)
    return {'data': audio_features}

@app.route('/generate-playlists', methods=['POST'])
def generatePlaylists():
    data = request.get_json()
    return data

if __name__ == "__main__":
    app.run(debug=True)