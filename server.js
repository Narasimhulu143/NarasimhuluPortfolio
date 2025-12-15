const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- CONFIGURATION ---
// REPLACE THIS WITH YOUR GMAIL APP PASSWORD
// Guide to get App Password: https://support.google.com/accounts/answer/185833
const MY_EMAIL = "narasimhulub155@gmail.com";
const MY_APP_PASSWORD = "YOUR_GMAIL_APP_PASSWORD_HERE"; // <--- PASTE PASSWORD HERE

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MY_EMAIL,
        pass: MY_APP_PASSWORD
    }
});

// Route to Handle Email Sending
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: MY_EMAIL, // Sent FROM your email (authenticated)
        to: MY_EMAIL,   // Sent TO your email
        replyTo: email, // When you reply, it goes to the visitor
        subject: `Portfolio Contact: ${subject}`,
        text: `You have a new message from your Portfolio!

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
