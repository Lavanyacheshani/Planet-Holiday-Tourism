const express = require("express");
const { body, validationResult } = require("express-validator");
const BlogArticle = require("../../models/BlogArticle");
const { authorize } = require("../../middleware/auth");
const { asyncHandler } = require("../../middleware/errorHandler");
const { uploadImage, deleteImage } = require("../../services/imageService");

const router = express.Router();

// Apply admin authorization to all routes
router.use(authorize("admin", "manager"));

// @route   GET /api/admin/blog-articles
// @desc    Get all blog articles with pagination and filters
// @access  Private (Admin/Manager)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured !== undefined)
      filter.featured = req.query.featured === "true";
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { content: { $regex: req.query.search, $options: "i" } },
        { excerpt: { $regex: req.query.search, $options: "i" } },
        { tags: { $in: [new RegExp(req.query.search, "i")] } },
      ];
    }

    const blogArticles = await BlogArticle.find(filter)
      .populate("author", "name email")
      .populate("coAuthors", "name email")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogArticle.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        blogArticles,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    });
  })
);

// @route   GET /api/admin/blog-articles/:id
// @desc    Get blog article by ID
// @access  Private (Admin/Manager)
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const blogArticle = await BlogArticle.findById(req.params.id)
      .populate("author", "name email")
      .populate("coAuthors", "name email")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    res.json({
      success: true,
      data: { blogArticle },
    });
  })
);

// @route   POST /api/admin/blog-articles
// @desc    Create new blog article
// @access  Private (Admin/Manager)
router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Title must be between 5 and 200 characters"),
    body("content")
      .trim()
      .isLength({ min: 50, max: 50000 })
      .withMessage("Content must be between 50 and 50000 characters"),
    body("excerpt")
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage("Excerpt must be between 10 and 500 characters"),
    body("category")
      .isIn([
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
      ])
      .withMessage("Invalid category"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
    body("tags.*")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Each tag must be between 1 and 50 characters"),
    body("featuredImage.url")
      .trim()
      .isURL()
      .withMessage("Featured image URL must be a valid URL"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const blogArticleData = {
      ...req.body,
      author: req.user._id,
      createdBy: req.user._id,
    };

    const blogArticle = await BlogArticle.create(blogArticleData);

    res.status(201).json({
      success: true,
      message: "Blog article created successfully",
      data: { blogArticle },
    });
  })
);

// @route   PUT /api/admin/blog-articles/:id
// @desc    Update blog article
// @access  Private (Admin/Manager)
router.put(
  "/:id",
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Title must be between 5 and 200 characters"),
    body("content")
      .optional()
      .trim()
      .isLength({ min: 50, max: 50000 })
      .withMessage("Content must be between 50 and 50000 characters"),
    body("excerpt")
      .optional()
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage("Excerpt must be between 10 and 500 characters"),
    body("category")
      .optional()
      .isIn([
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
      ])
      .withMessage("Invalid category"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
    body("tags.*")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("Each tag must be between 1 and 50 characters"),
    body("status")
      .optional()
      .isIn(["draft", "published", "archived"])
      .withMessage("Invalid status"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const blogArticle = await BlogArticle.findById(req.params.id);
    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        blogArticle[key] = req.body[key];
      }
    });

    blogArticle.updatedBy = req.user._id;
    await blogArticle.save();

    res.json({
      success: true,
      message: "Blog article updated successfully",
      data: { blogArticle },
    });
  })
);

// @route   DELETE /api/admin/blog-articles/:id
// @desc    Delete blog article
// @access  Private (Admin only)
router.delete(
  "/:id",
  authorize("admin"),
  asyncHandler(async (req, res) => {
    const blogArticle = await BlogArticle.findById(req.params.id);

    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    // Delete associated images from cloud storage
    if (blogArticle.featuredImage && blogArticle.featuredImage.url) {
      try {
        await deleteImage(blogArticle.featuredImage.url);
      } catch (error) {
        console.error("Error deleting featured image:", error);
      }
    }

    if (blogArticle.images && blogArticle.images.length > 0) {
      for (const image of blogArticle.images) {
        try {
          await deleteImage(image.url);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }
    }

    await BlogArticle.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Blog article deleted successfully",
    });
  })
);

// @route   POST /api/admin/blog-articles/:id/images
// @desc    Upload image for blog article
// @access  Private (Admin/Manager)
router.post(
  "/:id/images",
  asyncHandler(async (req, res) => {
    const blogArticle = await BlogArticle.findById(req.params.id);
    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    // Handle image upload (implement based on your image service)
    const imageUrl = req.body.imageUrl; // This would come from your image upload service
    const alt = req.body.alt || "";
    const caption = req.body.caption || "";

    await blogArticle.addImage(imageUrl, alt, caption);

    res.json({
      success: true,
      message: "Image added successfully",
      data: { blogArticle },
    });
  })
);

// @route   DELETE /api/admin/blog-articles/:id/images/:imageUrl
// @desc    Remove image from blog article
// @access  Private (Admin/Manager)
router.delete(
  "/:id/images/:imageUrl",
  asyncHandler(async (req, res) => {
    const blogArticle = await BlogArticle.findById(req.params.id);
    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    const imageUrl = decodeURIComponent(req.params.imageUrl);

    // Delete image from cloud storage
    try {
      await deleteImage(imageUrl);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    await blogArticle.removeImage(imageUrl);

    res.json({
      success: true,
      message: "Image removed successfully",
      data: { blogArticle },
    });
  })
);

// @route   PUT /api/admin/blog-articles/:id/status
// @desc    Update blog article status
// @access  Private (Admin/Manager)
router.put(
  "/:id/status",
  [
    body("status")
      .isIn(["draft", "published", "archived"])
      .withMessage("Invalid status"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const blogArticle = await BlogArticle.findById(req.params.id);
    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    blogArticle.status = req.body.status;
    blogArticle.updatedBy = req.user._id;
    await blogArticle.save();

    res.json({
      success: true,
      message: "Blog article status updated successfully",
      data: { blogArticle },
    });
  })
);

// @route   PUT /api/admin/blog-articles/:id/feature
// @desc    Toggle featured status
// @access  Private (Admin/Manager)
router.put(
  "/:id/feature",
  asyncHandler(async (req, res) => {
    const blogArticle = await BlogArticle.findById(req.params.id);
    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    blogArticle.featured = !blogArticle.featured;
    blogArticle.updatedBy = req.user._id;
    await blogArticle.save();

    res.json({
      success: true,
      message: `Blog article ${
        blogArticle.featured ? "featured" : "unfeatured"
      } successfully`,
      data: { blogArticle },
    });
  })
);

// @route   POST /api/admin/blog-articles/:id/comments/:commentId/approve
// @desc    Approve comment
// @access  Private (Admin/Manager)
router.post(
  "/:id/comments/:commentId/approve",
  asyncHandler(async (req, res) => {
    const blogArticle = await BlogArticle.findById(req.params.id);
    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    await blogArticle.approveComment(req.params.commentId);

    res.json({
      success: true,
      message: "Comment approved successfully",
      data: { blogArticle },
    });
  })
);

// @route   DELETE /api/admin/blog-articles/:id/comments/:commentId
// @desc    Remove comment
// @access  Private (Admin/Manager)
router.delete(
  "/:id/comments/:commentId",
  asyncHandler(async (req, res) => {
    const blogArticle = await BlogArticle.findById(req.params.id);
    if (!blogArticle) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found",
      });
    }

    await blogArticle.removeComment(req.params.commentId);

    res.json({
      success: true,
      message: "Comment removed successfully",
      data: { blogArticle },
    });
  })
);

module.exports = router;
