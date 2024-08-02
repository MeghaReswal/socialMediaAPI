const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },

    media: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Media",
      },
    ],
    title: {
      type: String,
      trim: true,
    },
    type: String,
    content: {
      type: String,
      trim: true,
    },
    reactions: {
      type: Number, // total of likes increase on each click
      default: 0,
    },
    comments: {
      type: Number, // total of comments increase on each comment
      default: 0,
    },
    shares: {
      type: Number, // total of shares increase on each share
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
