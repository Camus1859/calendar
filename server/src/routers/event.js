const express = require('express');
const Event = require('../models/event');
const router = new express.Router();
require('dotenv').config();
const unirest = require('unirest');

router.post('/event', async (req, res) => {
  const newEvent = new Event({
    ...req.body,
  });

  try {
    await newEvent.save();
    res.status(201).send(newEvent);
    console.log(newEvent);
    res.redirect('/');
  } catch (e) {
    res.status(400);
  }
});

router.get('/allEvents', async (req, res) => {
  const allEvents = await Event.find({});
  res.send(allEvents);
});

router.get('/event/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const event = await Event.findOne({
      _id,
    });

    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch {
    res.status(500).send();
  }
});

router.patch('/event/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const event = await Event.findOne({
      _id: req.params.id,
    });

    if (!event) {
      res.status(404).send();
    }

    updates.forEach((update) => (event[update] = req.body[update]));

    await event.save();
    res.send(event);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/event/:id', async (req, res) => {
  try {
    const eventTodelete = await Event.findOneAndDelete({
      _id: req.params.id,
    });

    if (!eventTodelete) {
      return res.status(404).send();
    }
    res.send(eventTodelete);
    console.log(eventTodelete);
  } catch (e) {
    res.status(500).send(e);
  }
});


router.get('/holidays/', async (req, res) => {
  
  const currentYear = new Date().getFullYear();


  const data = unirest(
    'GET',
    `https://public-holiday.p.rapidapi.com/${currentYear}/US`
  );
  
  data.headers({
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': 'public-holiday.p.rapidapi.com',
    useQueryString: true,
  });
  
  data.end(function (res) {
    if (res.error) throw new Error(res.error);
    res.body;
  });

})



module.exports = router;
