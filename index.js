const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

let topMovies = [
    {
        title: 'Schindler\'s List',
        year: '1993'
    },
    {
        title: 'Pulp Fiction',
        year: '1994'
    },
    {
        title: 'Forrest Gump',
        year: '1994'
    },
    {
        title: 'Good Will Hunting',
        year: '1997'
    },
    {
        title: 'The Grand Budapest Hotel',
        year: '2014'
    },
    {
        title: 'Mad Max: Fury Road',
        year: '2015'
    },
    {
        title: 'The Help',
        year: '2011'
    }
];

app.get('/', (req, res) => {
    res.send('My top 10 movies');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});