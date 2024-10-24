import Entry from "../models/Entry.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const getTokenAndDecode = (req) => {
  const access_token =
    req.cookies.access_token || req.headers["authorization"].split(" ")[1];

  return new Promise((resolve, reject) => {
    jwt.verify(access_token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const createEntry = async (req, res, next) => {
  try {
    const decoded = await getTokenAndDecode(req);
    req.body.author = decoded.id;
    const newEntry = new Entry(req.body);

    const savedEntry = await newEntry.save();
    const user = await User.findById(savedEntry.author);

    if (user) {
      user.entries.push(savedEntry._id);
      await user.save();
    }

    res.status(200).json(savedEntry);
  } catch (err) {
    next(err);
  }
};

export const updateEntry = async (req, res, next) => {
  try {
    const decoded = await getTokenAndDecode(req);
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, author: decoded.id }, // Ensure the author is the user from the token
      { new: true }
    );

    res.status(200).json(updatedEntry);
  } catch (err) {
    next(err);
  }
};

export const deleteEntry = async (req, res, next) => {
  try {
    const decoded = await getTokenAndDecode(req);
    const entry = await Entry.findById(req.params.id);

    if (entry.author.toString() !== decoded.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this entry" });
    }
    await Entry.findByIdAndDelete(req.params.id);

    await User.findOneAndUpdate(
      { entries: req.params.id },
      { $pull: { entries: req.params.id } },
      { new: true }
    );

    res.status(200).json("The entry has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getEntries = async (req, res, next) => {
  try {
    const decoded = await getTokenAndDecode(req);
    const entries = await Entry.find({ author: decoded.id });
    // send the entries in descending order of date
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log("Entries", entries);
    res.status(200).json(entries);
  } catch (err) {
    next(err);
  }
};

export const getEntry = async (req, res, next) => {
  try {
    const decoded = await getTokenAndDecode(req);
    // console.log("Entry", req.params.id);
    const entry = await Entry.findById(req.params.id);

    // if (entry.author.toString() !== decoded.id) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to view this entry" });
    // }

    res.status(200).json(entry);
  } catch (err) {
    next(err);
  }
};

export const getPublicEntries = async (req, res, next) => {
  try {
    const decoded = await getTokenAndDecode(req);
    const publicEntries = await Entry.find({
      isPublic: true,
      author: { $ne: decoded.id },
    }).populate("author", "username profilePicture");

    // send the entries in descending order of date
    publicEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(publicEntries);
  } catch (err) {
    next(err);
  }
};
