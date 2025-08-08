import express from "express";
import Review from "../models/review_model.js";
import Gig from "../models/gig_model.js";
import Order from "../models/order_model.js";

export const createReview = async (req, res) => {
  if (req.isSeller)
    //return next(createError(403, "Sellers can't create a review!"));
   return res.status(403).send("Sellers can't create a review!");
   
  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review){
      return res.status(403).send("You have already created a review for this gig!");
        }
    // next(
    //     createError(403, "You have already created a review for this gig!")
    //   );

    //TODO: check if the user purchased the gig.
    // const order = await Order.findOne({
    //   gigId: req.body.gigId,
    //   buyerId: req.userId,
    //   isCompleted: true,
    // }); 
    // if (!order)
    //   return res.status(403).send("You can only review completed orders!");

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    // next(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    // next(err);
    res.status(500).send("Internal Server Error");
  }
};
export const deleteReview = async (req, res) => {
  try {
  } catch (err) {
    // next(err);
    res.status(500).send("Internal Server Error");
  }
};