const express = require('express');
const mongoose = require('mongoose')
const { validateDonationForm, validateEditProfileForm } = require('./validations');

const router = new express.Router();
const User = mongoose.model('User');
const Donation = mongoose.model('Donation');

router.get('/users/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).select('-password').populate('donations').exec((err, user) => {
    if (err) {
      return res.status(404);
    }
    return res.status(200).json(user);
  })
});

router.get('/users/:id/donations', (req, res) => {
  Donation.find({ user: req.params.id }).exec((err, donations) => {
    if (err) {
      return res.status(404);
    }
    return res.status(200).json(donations);
  })
});

router.put('/users/:id', (req, res) => {
  const validationResult = validateEditProfileForm(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  // Verify user is trying to edit self
  if (req.user._id.toString() !== req.params.id.toString()) return res.send(403);

  const newValues = { email: req.body.email, name: req.body.name };

  User.findOneAndUpdate({ '_id': req.user._id }, newValues, { new: true }, (err, doc) => {
    if (err) {
      return res.status(501).json({ success: false, error: err });
    }
    return res.status(200).json({
      success: true,
      message: 'You have successfully updated your profile!',
      user: { email: doc.email, name: doc.name }
    });
  });
});

router.get('/donations', (req, res) => {
  Donation.find().sort('createdAt').limit(100).exec((err, donations) => {
    if (err) {
      return res.status(501).json({ success: false, error: err });
    }
    return res.status(200).json(donations);
  })
});

router.post('/donations', (req, res) => {
  const validationResult = validateDonationForm(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  const userId = req.user._id;
  const newDonation = {
    user: mongoose.Types.ObjectId(userId),
    amount: req.body.amount,
    organization: req.body.organization
  };

  Donation.create(newDonation, (err, savedDonation) => {
    if (err) {
      return res.status(501).json({ success: false, error: err });
    }
    User.update({ _id: userId }, { $push: { donations: savedDonation._id } }, (err) => {
      if (err) return res.status(501).json({ success: false, error: err });

      global.socketIO.sockets.emit('donate', savedDonation);

      return res.status(200).json({
        success: true,
        message: 'Thank you for your contribution!',
        donation: savedDonation
      });
    });
  });
});

module.exports = router;
