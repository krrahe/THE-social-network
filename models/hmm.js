const { Schema, model, Types } = require('mongoose');

const CommentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    commentBody: {
      type: String,
      required: 'Please enter a comment.',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    username: {
      type: String,
      required: 'Please enter your username.',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => (createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const HmmSchema = new Schema(
  {
    hmmText: {
      type: String,
      required: 'Please enter an hmm.',
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => (createdAtVal),
    },
    username: {
      type: String,
      required: 'Please enter your username.',
    },
    comments: [CommentSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

HmmSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

const Hmm = model('Hmm', HmmSchema);

module.exports = Hmm;