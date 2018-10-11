'use strict';

const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const Icecream = require('../models/icecream');

router.get('/', (req, res, next) => {
  Icecream.find({})
    .then((results) => {
      res.json(results);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { flavour, topping } = req.body;
  if (!flavour || !topping) {
    return res.status(422).json({ code: 'unprosessable-entity' });
  }
  const icecream = new Icecream(req.body);
  icecream.save()
    .then(() => {
      res.status(200).json(icecream);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  if (!id || !ObjectId.isValid(id)) {
    res.status(404).json({ code: 'not-found' });
  }
  Icecream.remove({ _id: id })
    .then(() => {
      res.json({ code: 'icecream deleted' });
    })
    .catch(next);
});

module.exports = router;
