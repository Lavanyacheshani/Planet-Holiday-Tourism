const mongoose = require("mongoose");

const blogArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Article title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxlength: [50000, "Content cannot exceed 50000 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    featuredImage: {
      url: {
        type: String,
        required: [true, "Featured image is required"],
      },
      alt: {
        type: String,
        default: "",
      },
      caption: {
        type: String,
        trim: true,
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
        caption: {
          type: String,
          trim: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Travel Tips",
        "Destination Guides",
        "Cultural Insights",
        "Adventure Stories",
        "Food & Cuisine",
        "Photography",
        "Travel Planning",
        "Local Experiences",
        "Seasonal Travel",
        "Travel News",
      ],
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Tag cannot exceed 50 characters"],
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coAuthors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    publishedAt: {
      type: Date,
      default: null,
    },
    readingTime: {
      type: Number,
      min: [1, "Reading time must be at least 1 minute"],
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
    comments: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          trim: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
          maxlength: [1000, "Comment cannot exceed 1000 characters"],
        },
        approved: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    relatedArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogArticle",
      },
    ],
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],
    tourPackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TourPackage",
      },
    ],
    seo: {
      title: {
        type: String,
        maxlength: [60, "SEO title cannot exceed 60 characters"],
      },
      description: {
        type: String,
        maxlength: [160, "SEO description cannot exceed 160 characters"],
      },
      keywords: [
        {
          type: String,
          trim: true,
        },
      ],
      canonicalUrl: {
        type: String,
        trim: true,
      },
    },
    social: {
      facebook: {
        title: {
          type: String,
          maxlength: [100, "Facebook title cannot exceed 100 characters"],
        },
        description: {
          type: String,
          maxlength: [300, "Facebook description cannot exceed 300 characters"],
        },
        image: {
          type: String,
        },
      },
      twitter: {
        title: {
          type: String,
          maxlength: [100, "Twitter title cannot exceed 100 characters"],
        },
        description: {
          type: String,
          maxlength: [300, "Twitter description cannot exceed 300 characters"],
        },
        image: {
          type: String,
        },
      },
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
blogArticleSchema.index({ slug: 1 });
blogArticleSchema.index({ status: 1, publishedAt: -1 });
blogArticleSchema.index({ category: 1 });
blogArticleSchema.index({ tags: 1 });
blogArticleSchema.index({ author: 1 });
blogArticleSchema.index({ featured: 1, publishedAt: -1 });
blogArticleSchema.index({ views: -1 });
blogArticleSchema.index({ likes: -1 });

// Pre-save middleware to generate slug if not provided
blogArticleSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Set publishedAt when status changes to published
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Calculate reading time based on content length
  if (this.content) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  }

  next();
});

// Static method to get published articles
blogArticleSchema.statics.getPublished = function (limit = 10, skip = 0) {
  return this.find({
    status: "published",
    publishedAt: { $lte: new Date() },
  })
    .populate("author", "name")
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "title slug excerpt featuredImage category tags author publishedAt readingTime views likes"
    );
};

// Static method to get featured articles
blogArticleSchema.statics.getFeatured = function (limit = 6) {
  return this.find({
    status: "published",
    featured: true,
    publishedAt: { $lte: new Date() },
  })
    .populate("author", "name")
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select(
      "title slug excerpt featuredImage category author publishedAt readingTime views"
    );
};

// Static method to get articles by category
blogArticleSchema.statics.getByCategory = function (category, limit = 10) {
  return this.find({
    status: "published",
    category,
    publishedAt: { $lte: new Date() },
  })
    .populate("author", "name")
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select(
      "title slug excerpt featuredImage category author publishedAt readingTime views"
    );
};

// Static method to search articles
blogArticleSchema.statics.search = function (query, limit = 20) {
  return this.find({
    status: "published",
    publishedAt: { $lte: new Date() },
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
      { excerpt: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } },
    ],
  })
    .populate("author", "name")
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select(
      "title slug excerpt featuredImage category author publishedAt readingTime views"
    );
};

// Static method to get related articles
blogArticleSchema.statics.getRelated = function (
  articleId,
  category,
  tags,
  limit = 4
) {
  return this.find({
    _id: { $ne: articleId },
    status: "published",
    publishedAt: { $lte: new Date() },
    $or: [{ category }, { tags: { $in: tags } }],
  })
    .populate("author", "name")
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select(
      "title slug excerpt featuredImage category author publishedAt readingTime views"
    );
};

// Method to increment views
blogArticleSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Method to increment likes
blogArticleSchema.methods.incrementLikes = function () {
  this.likes += 1;
  return this.save();
};

// Method to add comment
blogArticleSchema.methods.addComment = function (comment) {
  this.comments.push(comment);
  return this.save();
};

// Method to approve comment
blogArticleSchema.methods.approveComment = function (commentId) {
  const comment = this.comments.id(commentId);
  if (comment) {
    comment.approved = true;
    return this.save();
  }
  throw new Error("Comment not found");
};

// Method to remove comment
blogArticleSchema.methods.removeComment = function (commentId) {
  this.comments = this.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );
  return this.save();
};

// Method to add image
blogArticleSchema.methods.addImage = function (
  imageUrl,
  alt = "",
  caption = ""
) {
  this.images.push({
    url: imageUrl,
    alt,
    caption,
  });
  return this.save();
};

// Method to remove image
blogArticleSchema.methods.removeImage = function (imageUrl) {
  this.images = this.images.filter((img) => img.url !== imageUrl);
  return this.save();
};

module.exports = mongoose.model("BlogArticle", blogArticleSchema);
