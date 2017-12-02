const mongoose = require('mongoose');
const mongooseSocketIo = require('mongoose-socket.io');
const { Schema } = mongoose;

const DonationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: Number,
  organization: String
}, {
  timestamps: true
});


module.exports = mongoose.model('Donation', DonationSchema);
