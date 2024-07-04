require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const formData = req.body;

    // Set up the email transport configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Configure the email options
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: formData.email, // Assuming the form has an 'email' field
        subject: 'Thank you for signing up!',
        text: `Dear ${formData.name},\n\nThank you for filling out the form. We appreciate your interest and will get back to you soon.\n\nBest Regards,\nRahab's Daughters Team`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });

    res.status(200).send('Webhook received and email sent');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
