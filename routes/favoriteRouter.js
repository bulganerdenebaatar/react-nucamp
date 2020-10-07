const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors,(req, res, next) => {
    Favorite.find({user: req.user._id})
    .populate('user','campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOne({user: req.user._id})
    .then(favorites => {
        if (favorites) {
            req.body.forEach(favCamp => {
                if(!favorites.campsites.includes(favCamp._id)){
                favorites.campsites.push(favCamp_id)
                }
            })
        } else {
            Favorite.create({ user: req.user._id })
            .then((favorites) => {
                favorites.campsites.push(favCamp_id)
                }
            )}
            favorites.save();
    })
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/${req.params.campsiteId}`);
})
.delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then (favorites => {
        if (favorites) {
            for (let i = (favorites.campsites.length-1); i >= 0; i --){
                favorites.user._id(favorites.user[i]._id).remove();
            }
            campsite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.favorite.user._id} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});


favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors,(req, res) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /favorites/${req.params.favoriteId}`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Favorite.findById({user: req.user._id})
    .then( favorite => {
        if (favorite) {
            favorites.campsites.push(favCamp_id)
        } else {
            Favorite.create({ user: req.user._id })
            .then((favorites) => {
                favorites.campsites.push(favCamp_id)
                }
            )}
            favorites.save();
    })
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/${req.params.favoriteId}`);
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Favorite.findByIdAndDelete({user: req.user._id})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = favoriteRouter;