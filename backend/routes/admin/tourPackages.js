const express = require("express");
const { body, validationResult } = require("express-validator");
const TourPackage = require("../../models/TourPackage");
const { authorize } = require("../../middleware/auth");
const { asyncHandler } = require("../../middleware/errorHandler");
const { uploadImage, deleteImage } = require("../../services/imageService");

const router = express.Router();

// Apply admin authorization to all routes
router.use(authorize("admin", "manager"));

// @route   GET /api/admin/tour-packages
// @desc    Get all tour packages with pagination and filters
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
        { description: { $regex: req.query.search, $options: "i" } },
        { "locations.name": { $regex: req.query.search, $options: "i" } },
      ];
    }

    const tourPackages = await TourPackage.find(filter)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await TourPackage.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        tourPackages,
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

// @route   GET /api/admin/tour-packages/:id
// @desc    Get tour package by ID
// @access  Private (Admin/Manager)
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const tourPackage = await TourPackage.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    res.json({
      success: true,
      data: { tourPackage },
    });
  })
);

// @route   POST /api/admin/tour-packages
// @desc    Create new tour package
// @access  Private (Admin/Manager)
router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),
    body("description")
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be between 10 and 2000 characters"),
    body("shortDescription")
      .trim()
      .isLength({ min: 10, max: 300 })
      .withMessage("Short description must be between 10 and 300 characters"),
    body("duration")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Duration is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category")
      .isIn([
        "Cultural",
        "Adventure",
        "Beach",
        "Wildlife",
        "Luxury",
        "Family",
        "Honeymoon",
        "Budget",
      ])
      .withMessage("Invalid category"),
    body("difficulty")
      .optional()
      .isIn(["Easy", "Moderate", "Challenging", "Expert"])
      .withMessage("Invalid difficulty level"),
    body("maxGroupSize")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Max group size must be at least 1"),
    body("minAge")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Minimum age cannot be negative"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const tourPackageData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const tourPackage = await TourPackage.create(tourPackageData);

    res.status(201).json({
      success: true,
      message: "Tour package created successfully",
      data: { tourPackage },
    });
  })
);

// @route   PUT /api/admin/tour-packages/:id
// @desc    Update tour package
// @access  Private (Admin/Manager)
router.put(
  "/:id",
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be between 10 and 2000 characters"),
    body("shortDescription")
      .optional()
      .trim()
      .isLength({ min: 10, max: 300 })
      .withMessage("Short description must be between 10 and 300 characters"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category")
      .optional()
      .isIn([
        "Cultural",
        "Adventure",
        "Beach",
        "Wildlife",
        "Luxury",
        "Family",
        "Honeymoon",
        "Budget",
      ])
      .withMessage("Invalid category"),
    body("difficulty")
      .optional()
      .isIn(["Easy", "Moderate", "Challenging", "Expert"])
      .withMessage("Invalid difficulty level"),
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

    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        tourPackage[key] = req.body[key];
      }
    });

    tourPackage.updatedBy = req.user._id;
    await tourPackage.save();

    res.json({
      success: true,
      message: "Tour package updated successfully",
      data: { tourPackage },
    });
  })
);

// @route   DELETE /api/admin/tour-packages/:id
// @desc    Delete tour package
// @access  Private (Admin only)
router.delete(
  "/:id",
  authorize("admin"),
  asyncHandler(async (req, res) => {
    const tourPackage = await TourPackage.findById(req.params.id);

    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    // Delete associated images from cloud storage
    if (tourPackage.images && tourPackage.images.length > 0) {
      for (const image of tourPackage.images) {
        try {
          await deleteImage(image.url);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }
    }

    await TourPackage.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Tour package deleted successfully",
    });
  })
);

// @route   POST /api/admin/tour-packages/:id/images
// @desc    Upload image for tour package
// @access  Private (Admin/Manager)
router.post(
  "/:id/images",
  asyncHandler(async (req, res) => {
    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    // Handle image upload (implement based on your image service)
    const imageUrl = req.body.imageUrl; // This would come from your image upload service
    const alt = req.body.alt || "";
    const isMain = req.body.isMain || false;

    await tourPackage.addImage(imageUrl, alt, isMain);

    res.json({
      success: true,
      message: "Image added successfully",
      data: { tourPackage },
    });
  })
);

// @route   DELETE /api/admin/tour-packages/:id/images/:imageUrl
// @desc    Remove image from tour package
// @access  Private (Admin/Manager)
router.delete(
  "/:id/images/:imageUrl",
  asyncHandler(async (req, res) => {
    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    const imageUrl = decodeURIComponent(req.params.imageUrl);

    // Delete image from cloud storage
    try {
      await deleteImage(imageUrl);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    await tourPackage.removeImage(imageUrl);

    res.json({
      success: true,
      message: "Image removed successfully",
      data: { tourPackage },
    });
  })
);

// @route   PUT /api/admin/tour-packages/:id/status
// @desc    Update tour package status
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

    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    tourPackage.status = req.body.status;
    tourPackage.updatedBy = req.user._id;
    await tourPackage.save();

    res.json({
      success: true,
      message: "Tour package status updated successfully",
      data: { tourPackage },
    });
  })
);

// @route   PUT /api/admin/tour-packages/:id/feature
// @desc    Toggle featured status
// @access  Private (Admin/Manager)
router.put(
  "/:id/feature",
  asyncHandler(async (req, res) => {
    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    tourPackage.featured = !tourPackage.featured;
    tourPackage.updatedBy = req.user._id;
    await tourPackage.save();

    res.json({
      success: true,
      message: `Tour package ${
        tourPackage.featured ? "featured" : "unfeatured"
      } successfully`,
      data: { tourPackage },
    });
  })
);

module.exports = router;
