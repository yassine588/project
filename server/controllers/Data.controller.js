const Data = require("../models/Data.model");
const nodemailer = require('nodemailer');
require('dotenv').config(); 

module.exports.createData = (req, res) => {
    Data.create(req.body)
        .then(myData => {
            res.status(200).json({ myData });
        })
        .catch(err => {
            res.status(404).json(err);
        });
};

module.exports.updateData = async (req, res) => {
    try {
        const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedData) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER, 
                    pass: process.env.EMAIL_PASS, 
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: updatedData.Email, 
                subject: 'Demande de congé validée',
                text: 'Votre demande de congé a été validée avec succès.',
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            res.status(200).json(updatedData);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while updating data or sending the email' });
    }
};

module.exports.findAllData = (req, res) => {
    Data.find()
        .then(allData => {
            res.status(200).json(allData);
        })
        .catch(err => {
            res.status(404).json(err);
        });
};

module.exports.findData = (req, res) => {
    Data.findOne({ _id: req.params.id })
        .then(myData => {
            res.status(200).json(myData);
        })
        .catch(err => {
            res.status(404).json(err);
        });
};

module.exports.deleteData = (req, res) => {
    Data.findByIdAndDelete({ _id: req.params.id })
        .then(delData => {
            res.status(200).json(delData);
        })
        .catch(err => {
            res.status(404).json(err);
        });
};
