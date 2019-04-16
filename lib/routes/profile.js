const { Router } = require('express');
const Profile = require('../models/Profile');
const { getQuote } = require('../services/futuramaApi');
module.exports = Router()
    .post('/', (req, res) => {
        const {
            name,
            favoriteCharacter,
        } = req.body;

        getQuote(favoriteCharacter)
            .then(tagline => {
                console.log(tagline);
                return Profile
                    .create({ name, favoriteCharacter, tagline })
                    .then(newProfile => {
                        res.send(newProfile);
                    });
            });
    })
    .get('/', (req, res) => {
        Profile
            .find()
            .then(profiles => res.send(profiles));
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        return Profile
            .findById(id)
            .then(foundProfile => {
                res.send(foundProfile);
            });

    })
    .patch('/:id', (req, res) => {
        const { id } = req.params;
        const {
            name,
            favoriteCharacter,
            tagline
        } = req.body;
        Profile
            .findByIdAndUpdate(id, { name, favoriteCharacter, tagline });
    });
