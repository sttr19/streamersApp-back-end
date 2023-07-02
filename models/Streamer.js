import mongoDB from "mongoose";

const streamerSchema = new mongoDB.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    platformName: {
      type: String,
      required: true,
    },
    upVotesCount: {
      type: Number,
      default: 0,
    },
    downVotesCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoDB.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoDB.model("Streamer", streamerSchema);
