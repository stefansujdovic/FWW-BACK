const express = require('express');
const router = express.Router();

const { authenticate, requireSignin, userId } = require('../controllers/auth');

const { addEvent, allEvents, editEvent, eventId, removeEvent } = require('../controllers/event');

router.post('/add-event/:userId',requireSignin, authenticate, addEvent);
router.put('/edit-event/:eventId/:userId', requireSignin, authenticate, editEvent);
router.delete('/remove-event/:eventId/:userId',requireSignin, authenticate, removeEvent)
router.get('/all-events', allEvents);


router.param('userId', userId);
router.param('eventId', eventId)

module.exports = router;