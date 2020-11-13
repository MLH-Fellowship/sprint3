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
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler


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
    # get data from request
    data = request.get_json()
    tracks = data['tracks']
    # extract necessary data for model
    features = ['key', 'mode', 'time_signature', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'tempo']
    for track in tracks:
        for key in features:
            track[key] = track['audio_features'][key]
    print(tracks[0])
    tracks_df = pd.DataFrame(tracks);
    X = MinMaxScaler().fit_transform(tracks_df[features])
    kmeans = KMeans(init="k-means++", 
                    n_clusters=2,
                    random_state=15).fit(X)
    tracks_df['kmeans'] = kmeans.labels_
    return { 'tracks': tracks_df.to_dict('records') }

if __name__ == "__main__":
    app.run(debug=True)