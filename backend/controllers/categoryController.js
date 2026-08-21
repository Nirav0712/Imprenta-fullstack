import Category from "../models/Category.js";
import slugify from "../utils/slugify.js";

/*
  @desc Create Category
  @route POST /api/categories
  @access Admin
*/

export const createCategory = async (req, res) => {
  try {
    const { name, description, image, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const lastCategory = await Category.findOne().sort({ order: -1 });
    const nextOrder = lastCategory ? (lastCategory.order || 0) + 1 : 1;

    const category = await Category.create({
      name,
      slug: slugify(name),
      description,
      image,
      status,
      order: nextOrder,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("createdBy", "name email")
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, image, status } = req.body;

    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.name = name || category.name;
    category.slug = name ? slugify(name) : category.slug;
    category.description = description || category.description;
    category.image = image || category.image;
    category.status = status || category.status;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};