const express = require('express'),
      app = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid');



app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

let users =[
    {
        id: 1,
        name: 'Kim',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Joe',
        favoriteMovies: ['The Grand Budapest Hotel']
    }
];

let movies = [
    {
        'Title': 'Schindler\'s List',
        'Description': 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
        'Genre': {
            'Name': 'Biograghy',
            'Name': 'Drama',
            'Name': 'History'
        },
        'Director': {
            'Name': 'Steven Spielberg',
            'Bio': 'One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood\'s best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.',
            'Birth': 1946
        }
    },
    {
        'Title': 'Pulp Fiction',
        'Description': 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        'Genre': {
            'Name': 'Crime',
            'Name': 'Drama'
        },
        'Director': {
            'Name': 'Quentin Tarantino',
            'Bio': '',
            'Birth': 1963
        }
    },
    {
        'Title': 'Forrest Gump',
        'Description': 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
        'Genre': {
            'Name': 'Romance',
            'Name': 'Drama'
        },
        'Director': {
            'Name': 'Robert Zemeckis',
            'Bio': '',
            'Birth': 1952
        }
    },
    {
        'Title': 'Good Will Hunting',
        'Description': 'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
        'Genre': {
            'Name': 'Romance',
            'Name': 'Drama'
        },
        'Director': {
            'Name': 'Gus Van Sant',
            'Bio': '',
            'Birth': 1952
        }
    },
    {
        'Title': 'The Grand Budapest Hotel',
        'Description': 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
        'Genre': {
            'Name': 'Adventure',
            'Name': 'Comedy',
            'Name': 'Crime'
        },
        'Director': {
            'Name': 'Wes Anderson',
            'Bio': '',
            'Birth': 1969
        }
    },
    {
        'Title': 'Mad Max: Fury Road',
        'Description': 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper and a drifter named Max.',
        'Genre': {
            'Name': 'Action',
            'Name': 'Adventure',
            'Name': 'Sci-Fi'
        },
        'Director': {
            'Name': 'George Miller',
            'Bio': '',
            'Birth': 1945
        }
    },
    {
        'Title': 'The Help',
        'Description': 'An aspiring author during the civil rights movement of the 1960s decides to write a book detailing the African American maids\' point of view on the white families for which they work, and the hardships they go through on a daily basis.',
        'Genre': {
            'Name': 'Drama'
        },
        'Director': {
            'Name': 'Tate Taylor',
            'Bio': '',
            'Birth': 1969
        }
    }
];

//CERATE

app.post('/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name){
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else{
        res.status(400).send('The user need name');
    }
});

//READ

// app.get('/documentation.html', (req, res) => {
//     res.sendFile('public/documentation.html', { root: __dirname });
// });

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//READ

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title ); 

    if (movie){
        res.status(200).json(movie);
    } else {
        res.status(400).send('We don\'t have such movie');
    }; 
});

//READ

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre; 

    if (genre){
        res.status(200).json(genre);
    } else {
        res.status(400).send('We don\'t have such genre');
    }; 
});

//READ

app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director; 

    if (director){
        res.status(200).json(director);
    } else {
        res.status(400).send('We don\'t have such director');
    }; 
});

//UPDATE

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id);

    if(user){
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else{
        res.status(400).send('No such user');
    }
});


//CREATE

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if(user){
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else{
        res.status(400).send('No such user');
    }
});

//DELETE

app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if(user){
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else{
        res.status(400).send('No such user');
    }
});

//DELETE

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id);

    if(user){
        users = users.filter( user => user.id != id);
        res.status(200).send(`User ${id} has been deleted`);
    } else{
        res.status(400).send('No such user');
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});