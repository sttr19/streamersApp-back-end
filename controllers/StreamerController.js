import StreamerModel from "../models/Streamer.js";

export const create = async (req, res) => {
  try {
    const doc = new StreamerModel({
      name: req.body.name,
      platformName: req.body.platformName,
      description: req.body.description,
      user: req.userId,
    });

    const streamer = await doc.save(); //saving to DB
    res.json(streamer);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create new streamer",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const streamers = await StreamerModel.find().populate('user').exec();
    res.json(streamers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get list of streamers',
    });
  }
};
