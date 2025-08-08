import Gig from "../models/gig_model.js"
//import createError from "../utils/createError.js";

export const createGig = async (req, res) => {
  if (!req.isSeller)
    // return next(createError(403, "Only sellers can create a gig!"));
    return res.status(403).send("Only sellers can create a gig!");
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    // next(err);
    res.status(500).send("Error creating gig: " + err.message);
  }
};
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id); // Find the gig by ID
    if (gig.userId !== req.userId) // Check if the user is the owner of the gig
      // return next(createError(403, "You can delete only your gig!"));
      return res.status(403).send("You can delete only your gig!");

    await Gig.findByIdAndDelete(req.params.id); // Delete the gig
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    // next(err);
    res.status(500).send("Error deleting gig: " + err.message);
  }
};
export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id); // Find the gig by ID
    if (!gig) next(createError(404, "Gig not found!")); // Check if the gig exists
    res.status(200).send(gig);
  } catch (err) {
    // next(err);
    res.status(500).send("Error fetching gig: " + err.message);
  }
};
export const getGigs = async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 }); // Sort by the specified field in descending order 
    res.status(200).send(gigs);
  } catch (err) {
    // next(err);
    res.status(500).send("Error fetching gigs: " + err.message);
  }
};