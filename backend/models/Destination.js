const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      region: {
        type: String,
        required: [true, "Region is required"],
        trim: true,
      },
      country: {
        type: String,
        default: "Sri Lanka",
        trim: true,
      },
      coordinates: {
        lat: {
          type: Number,
          required: [true, "Latitude is required"],
        },
        lng: {
          type: Number,
          required: [true, "Longitude is required"],
        },
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
        isMain: {
          type: Boolean,
          default: false,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Cultural",
        "Beach",
        "Mountain",
        "Wildlife",
        "Historical",
        "Religious",
        "Adventure",
        "City",
      ],
    },
    highlights: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Highlight cannot exceed 200 characters"],
      },
    ],
    attractions: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        image: {
          type: String,
        },
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
    ],
    bestTimeToVisit: {
      type: String,
      trim: true,
    },
    weather: {
      temperature: {
        min: Number,
        max: Number,
      },
      rainfall: {
        type: String,
        trim: true,
      },
      humidity: {
        type: String,
        trim: true,
      },
    },
    activities: [
      {
        type: String,
        trim: true,
      },
    ],
    accommodation: {
      luxury: {
        type: Boolean,
        default: false,
      },
      midRange: {
        type: Boolean,
        default: false,
      },
      budget: {
        type: Boolean,
        default: false,
      },
      camping: {
        type: Boolean,
        default: false,
      },
    },
    transportation: {
      byAir: {
        type: Boolean,
        default: false,
      },
      byTrain: {
        type: Boolean,
        default: false,
      },
      byBus: {
        type: Boolean,
        default: false,
      },
      byCar: {
        type: Boolean,
        default: false,
      },
    },
    tips: [
      {
        type: String,
        trim: true,
        maxlength: [300, "Tip cannot exceed 300 characters"],
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      count: {
        type: Number,
        default: 0,
        min: [0, "Rating count cannot be negative"],
      },
    },
    meta: {
      title: {
        type: String,
        maxlength: [60, "Meta title cannot exceed 60 characters"],
      },
      description: {
        type: String,
        maxlength: [160, "Meta description cannot exceed 160 characters"],
      },
      keywords: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
destinationSchema.index({ slug: 1 });
destinationSchema.index({ status: 1, featured: 1 });
destinationSchema.index({ category: 1 });
destinationSchema.index({ "location.region": 1 });
destinationSchema.index({ "rating.average": -1 });
destinationSchema.index({ "location.coordinates": "2dsphere" });

// Pre-save middleware to generate slug if not provided
destinationSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// Static method to get featured destinations
destinationSchema.statics.getFeatured = function (limit = 6) {
  return this.find({
    status: "published",
    featured: true,
  })
    .sort({ "rating.average": -1, createdAt: -1 })
    .limit(limit)
    .select("name slug shortDescription images category rating location");
};

// Static method to get destinations by category
destinationSchema.statics.getByCategory = function (category, limit = 12) {
  return this.find({
    status: "published",
    category,
  })
    .sort({ "rating.average": -1, createdAt: -1 })
    .limit(limit)
    .select("name slug shortDescription images category rating location");
};

// Static method to get destinations by region
destinationSchema.statics.getByRegion = function (region, limit = 12) {
  return this.find({
    status: "published",
    "location.region": region,
  })
    .sort({ "rating.average": -1, createdAt: -1 })
    .limit(limit)
    .select("name slug shortDescription images category rating location");
};

// Static method to search destinations
destinationSchema.statics.search = function (query, limit = 20) {
  return this.find({
    status: "published",
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { "location.city": { $regex: query, $options: "i" } },
      { "location.region": { $regex: query, $options: "i" } },
    ],
  })
    .sort({ "rating.average": -1, createdAt: -1 })
    .limit(limit)
    .select("name slug shortDescription images category rating location");
};

// Static method to get nearby destinations
destinationSchema.statics.getNearby = function (
  lat,
  lng,
  maxDistance = 50,
  limit = 10
) {
  return this.find({
    status: "published",
    "location.coordinates": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: maxDistance * 1000, // Convert km to meters
      },
    },
  })
    .limit(limit)
    .select("name slug shortDescription images category rating location");
};

// Method to update rating
destinationSchema.methods.updateRating = function (newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Method to add image
destinationSchema.methods.addImage = function (
  imageUrl,
  alt = "",
  isMain = false
) {
  if (isMain) {
    // Remove main flag from other images
    this.images.forEach((img) => (img.isMain = false));
  }

  this.images.push({
    url: imageUrl,
    alt,
    isMain,
  });

  return this.save();
};

// Method to remove image
destinationSchema.methods.removeImage = function (imageUrl) {
  this.images = this.images.filter((img) => img.url !== imageUrl);
  return this.save();
};

// Method to add attraction
destinationSchema.methods.addAttraction = function (attraction) {
  this.attractions.push(attraction);
  return this.save();
};

// Method to remove attraction
destinationSchema.methods.removeAttraction = function (attractionName) {
  this.attractions = this.attractions.filter(
    (attr) => attr.name !== attractionName
  );
  return this.save();
};

module.exports = mongoose.model("Destination", destinationSchema);
