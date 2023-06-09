const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, 'A post must have a heading'],
      maxlength: [100, 'A post heading cannot have more than 100 characters'],
      minLength: [10, 'A post heading must have atleast 10 characters'],
      trim: true
    },
    body: {
      type: String,
      required: [true, 'A post must have a body'],
      trim: true,
      maxlength: [2000, 'A post body cannot have more than 2000 characters'],
      minLength: [10, 'A post body must have atleast 10 characters']
    },
    images: {
      type: [String],
      default: [
        'https://firebasestorage.googleapis.com/v0/b/sikayat-4f7ee.appspot.com/o/logohome.webp?alt=media&token=197099a7-3a59-4d08-bb6e-fa112c8d9a9d'
      ]
    },
    imgRef: {
      type: [String],
      default: []
    },
    createdAt: {
      type: Date,
      default: () => {
        return Date.now();
      }
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    tags: {
      type: [String],
      default: []
    },
    upvoters: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    downvoters: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    status: {
      type: Number, // 0 - Fresh, 1 - Addressed, 2 - Resolved
      default: 0,
      required: [true, 'A post must have a status'],
      min: 0,
      max: 2
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// INDEXING
postSchema.index({ downvoters: 1 });
postSchema.index({ upvoters: 1 });

// VIRTUAL FIELDS
postSchema.virtual('upvoteCount').get(function() {
  return this.upvoters.length;
});

postSchema.virtual('downvoteCount').get(function() {
  return this.downvoters.length;
});

// VIRTUAL POPULATE

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
});

// VIRTUAL FIELDS

// QUERY MIDDLEWARE
postSchema.pre(/^find/, function(next) {
  this.start = Date.now();
  next();
});

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

postSchema.post(/^find/, function(docs, next) {
  //eslint-disable-next-line
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
