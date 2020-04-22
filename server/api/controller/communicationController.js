const exprees = require('express');
const router = exprees.Router();
const communication = require('../models/communicationSchema');
const nodemailer = require('nodemailer')
router.post('/', async (req, res) => {
    const addcommunication = new communication({
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email,
        message: req.body.message,
        subject: req.body.subject
    })
    try {
        await addcommunication.save()
        res.status(201).json({
            addcommunication
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/mail', (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gochem.info@gmail.com',
          pass: 'Gochem2020'
        }
    })

    const mailOptions = {
        from: 'gochem.info@gmail.com',
        to:'gochem.info@gmail.com' ,
        subject: req.body.subject,
        text: req.body.message,
        html: ` <span>Telephone:</span>${req.body.telephone}<hr> <span>email:</span> ${req.body.email} <hr><span>Message:</span> ${req.body.message} `
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
        console.log('Message %s sent: %s')
    })
    res.status(200).json({})
})
module.exports = router