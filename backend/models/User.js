const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    dark_mode: {
      type: Boolean,
    },
    favorites: [
      {
        category: { type: String },
        title: { type: String },
        length: { type: Number },
        mal_id: { type: Number },
        priority: { type: Number },
        image_url: { type: String },
        name_kanji: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
