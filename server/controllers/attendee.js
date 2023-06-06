const Attendee = require('../models/attendee');
const Badge = require('../models/badgeInfo');

const saveAttendee = async (req, res) => {
    const attendee = new Attendee({
        name: req.body.name,
        company: req.body.company,
        email: req.body.email,
        role: req.body.role,
        vendorEmail: req.body.vendorEmail,
    });

    try{
        // if(Attendee.find({email: req.body.email, vendorEmail: req.body.vendorEmail})){
        //     res.status(400).json({error: 'Attendee already exists'});
        //     return;
        // }
        attendee.save();
        res.status(200).json(attendee);
    }
    catch(err){
        res.status(400).json({error: err});
    }
};

const getAttendees = async (req, res) => {
    try{
        const attendee = await Attendee.find({vendorEmail:req.params.vendorEmail});
        res.status(200).json(attendee);
    }
    catch(err){
        res.status(400).json({error: err});
    }
}

const getAllAttendees = async (req, res) => {
    try{
        const attendee = await Attendee.find();
        res.status(200).json(attendee);
    }
    catch(err){
        res.status(400).json({error: err});
    }
};

const deleteAttendees = async (req, res) => {
    try{
        const attendee = await Attendee.findOneAndDelete({vendorEmail:req.body.vendorEmail, email:req.body.email});
        res.status(200).json(attendee);
    }
    catch(err){
        res.status(400).json({error: err});
    }
}

const getAttendeeById = async (req, res) => {
    try{
        const user =  await Badge.findOne({orderID: req.params.orderID});
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({error: err});
    }
};



module.exports = {saveAttendee, getAttendees, deleteAttendees, getAllAttendees, getAttendeeById};