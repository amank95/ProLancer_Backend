import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default:0,
    },

    cat: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
// This code defines a Mongoose schema for a Gig model, which includes fields for userId
// title, desc, totalStars, starNumber, catalog, price, coverImg, images, shortTitle, shortDesc, deliveryTime, revisionNumber, feature, and sales. The schema also includes timestamps for created and updated times. The model is exported for use in other parts of the application.
// The schema ensures that certain fields are required, such as userId, title, desc,
// starNumber, catalog, price, coverImg, shortTitle, shortDesc, deliveryTime, and revisionNumber. Optional fields like images and feature are also included.
// The totalStars field is initialized to 0, and the sales field defaults to 0
// as well. The timestamps option automatically adds createdAt and updatedAt fields to the documents.
// The model is named "Gig" and can be used to interact with the corresponding MongoDB
// collection. This schema can be used to create, read, update, and delete gig documents in a MongoDB database. It provides a structured way to manage gig data in a web application, such as a marketplace or freelance platform.
// It allows for the storage of various attributes related to gigs, such as the user who created the gig, the title and description of the gig, pricing information, and additional features. This structured approach helps maintain data integrity and facilitates efficient querying and manipulation of gig data in the application.
// The Gig model can be used to represent freelance services, products, or any offerings in a marketplace setting, enabling users to create and manage their gigs effectively. It can also be extended with additional fields or methods as needed for specific application requirements.
// The schema can be used to create, read, update, and delete gig documents in a  MongoDB database. It provides a structured way to manage gig data in a web application, such as a marketplace or freelance platform. This schema can be used to create, read, update, and delete gig documents in a MongoDB database. It provides a structured way to manage gig data in a web application, such as a marketplace or freelance platform.
// This schema can be used to create, read, update, and delete gig documents in a MongoDB database. It provides a structured way to manage gig data in a web application, such as a marketplace or freelance platform. The schema allows for the storage of various attributes related to gigs, such as the user who created the gig, the title and description of the gig, pricing information, and additional features. This structured approach helps maintain data integrity and facilitates efficient querying and manipulation of gig data in the application.
// The Gig model can be used to represent freelance services, products, or any offerings in a marketplace setting, enabling users to create and manage their gigs effectively. It can also be extended with additional fields or methods as needed for specific application requirements.
