const express = require('express');

const router = express.Router();

const {saveAttendee, getAttendees, deleteAttendees, getAllAttendees, getAttendeeById} = require('../controllers/attendee.js');

router.get('/get-lead/:vendorEmail', getAttendees);

router.post('/add-lead',saveAttendee);

router.post('/delete-lead/',deleteAttendees);

router.get('/get-all-leads',getAllAttendees);
router.get('/get-lead-by-id/:orderID',getAttendeeById);

module.exports = router;