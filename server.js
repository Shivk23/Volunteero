require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS ? 'Exists' : 'Not Set');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/webhook', (req, res) => {
    const formData = req.body;

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: formData.email,
        subject: 'Thank you for signing up!',
        text: `Dear ${formData.name},\n\nThank you for filling out the form. We appreciate your interest and will get back to you soon.\n\nBest Regards,\nRahab's Daughters Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return res.status(500).send('Failed to send email');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Webhook received and email sent');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
