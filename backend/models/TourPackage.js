const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tour title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
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
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
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
    highlights: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Highlight cannot exceed 200 characters"],
      },
    ],
    itinerary: [
      {
        day: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        activities: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
    included: [
      {
        type: String,
        trim: true,
      },
    ],
    excluded: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Cultural",
        "Adventure",
        "Beach",
        "Wildlife",
        "Luxury",
        "Family",
        "Honeymoon",
        "Budget",
      ],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Challenging", "Expert"],
      default: "Moderate",
    },
    maxGroupSize: {
      type: Number,
      min: [1, "Group size must be at least 1"],
      default: 12,
    },
    minAge: {
      type: Number,
      min: [0, "Minimum age cannot be negative"],
      default: 0,
    },
    locations: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
    ],
    seasonality: {
      bestTime: {
        type: String,
        trim: true,
      },
      availableMonths: [
        {
          type: String,
          enum: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
      ],
    },
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
tourPackageSchema.index({ slug: 1 });
tourPackageSchema.index({ status: 1, featured: 1 });
tourPackageSchema.index({ category: 1 });
tourPackageSchema.index({ price: 1 });
tourPackageSchema.index({ "rating.average": -1 });

// Virtual for discount percentage
tourPackageSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Virtual for price per day
tourPackageSchema.virtual("pricePerDay").get(function () {
  const days = parseInt(this.duration.match(/\d+/)?.[0] || 1);
  return Math.round(this.price / days);
});

// Pre-save middleware to generate slug if not provided
tourPackageSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// Static method to get featured tours
tourPackageSchema.statics.getFeatured = function (limit = 6) {
  return this.find({
    status: "published",
    featured: true,
  })
    .sort({ "rating.average": -1, createdAt: -1 })
    .limit(limit)
    .select(
      "title slug shortDescription duration price originalPrice images category rating"
    );
};

// Static method to get tours by category
tourPackageSchema.statics.getByCategory = function (category, limit = 12) {
  return this.find({
    status: "published",
    category,
  })
    .sort({ "rating.average": -1, createdAt: -1 })
    .limit(limit)
    .select(
      "title slug shortDescription duration price originalPrice images category rating"
    );
};

// Static method to search tours
tourPackageSchema.statics.search = function (query, limit = 20) {
  return this.find({
    status: "published",
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { "locations.name": { $regex: query, $options: "i" } },
    ],
  })
    .sort({ "rating.average": -1, createdAt: -1 })
    .limit(limit)
    .select(
      "title slug shortDescription duration price originalPrice images category rating"
    );
};

// Method to update rating
tourPackageSchema.methods.updateRating = function (newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Method to add image
tourPackageSchema.methods.addImage = function (
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
tourPackageSchema.methods.removeImage = function (imageUrl) {
  this.images = this.images.filter((img) => img.url !== imageUrl);
  return this.save();
};

module.exports = mongoose.model("TourPackage", tourPackageSchema);
