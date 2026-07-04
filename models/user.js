const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
      lowercase: true,
      trim: true,
    },
    cart: [cartItemSchema], // each user start with an empty array then push stuff to it 
  },
  { timestamps: true } 
);

module.exports = mongoose.model('User', userSchema);