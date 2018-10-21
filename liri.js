//couldnt get the keys to link properly
var command = process.argv[2];
var thing = process.argv[3];;
// var spot = require("./keys.js");
var Spotify= require('node-spotify-api');
// var spotify = new Spotify(spot.id, spot.secret);
var spotify = new Spotify({
    id: '5374c11c5d9045cca9ebae6f086ae121',
    secret: '7e8307d9d84f48ceada528c890f4fa9b'
    });
var request = require('request');
var fs = require("fs");
//needs a little work not too bad

switch (command) {
    case 'concert-this':
        concertThis(thing);
        break;
    case 'spotify-this-song':
        spotifyThis(thing);
        break;
    case 'movie-this':
        movieThis(thing);
        break;
    case 'do-what-it-says':
        random();
        break;
}

// just mocked up havent even looked at api yet
// function concertThis(thing) {
//     request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body){
//         if (!error && response.statusCode === 200){
//             console.log('--------------------');
//             console.log('Vender: ' + JSON.parse(body).Vender);
//             console.log('Location: ' + JSON.parse(body).Location);
//             console.log('Date of Event: ' + JSON.parse(body).Date"MM/DD/YYYY");
//             console.log('--------------------');
//         }
//     });
// }

function spotifyThis(thing) {
     if (thing == null) {
        thing = 'The Sign';
    }
    spotify.search({
    	type: 'track',
    	query: thing 
    }, function(error, data) {
        if (error) {
        	console.log('Error occurred: ' + error);
        	return;
			}
            console.log('--------------------');
            console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('--------------------');
    });
}

function movieThis(thing) {
    if (thing == null) {
        thing = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + thing + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('--------------------');
            console.log('Movie Title: ' + JSON.parse(body).Title);
            console.log('Release Year: ' + JSON.parse(body).Year);
            console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Lead Actors: ' + JSON.parse(body).Actors);
            console.log('--------------------');
        }
    });
}

function random() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            spotifyThis(data[1]);
        }
    });
}