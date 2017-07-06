import mongoose from 'mongoose';
import { isURL } from 'validator';

/* eslint func-names: 0*/
/* eslint prefer-arrow-callback: 0*/

const Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

const EventSchema = new Schema({
  eventName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventInformation: {
    type: {
      address: String,
      state: String,
      city: String,
      imageUrl: String
    }
  },
  eventUrl: {
    type: String,
    validate: [{ validator: value => isURL(value), msg: 'Invalid url.' }]
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  eventOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// make event an online event if it has a url
EventSchema.pre('save', function (next) {
  if (this.eventUrl) {
    this.isOnline = true;
  }
  next();
});

EventSchema.pre('validate', function (next) {
  if (!this.eventInformation && !this.eventUrl) {
    next(Error('Events must have a physical location or an online url'));
  } else {
    next();
  }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
