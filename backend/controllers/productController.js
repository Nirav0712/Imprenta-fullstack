import Product from "../models/Product.js";
import Category from "../models/Category.js";
import slugify from "../utils/slugify.js";
import { createNotification } from "./notificationController.js";

/*
    @desc Create Product
    @route POST /api/products
    @access Admin
*/

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      slug,
      category,
      brand,
      sku,
      barcode,

      shortDescription,
      description,

      price,
      salePrice,
      discount,
      gst,
      showPrice,
      badge,
      features,
      specifications,
      mainImage,

      stock,
      lowStockAlert,
      manageStock,

      featured,
      trending,
      bestSeller,
      newArrival,
      showOnHome,

      status,

      metaTitle,
      metaDescription,
      keywords,

      images,
      configuration,
      configuratorSections,
    } = req.body;

    // Validation

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Category Check

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Slug

    const productSlug =
      slug && slug.trim() !== ""
        ? slugify(slug)
        : slugify(productName);

    // Duplicate Slug

    const slugExists = await Product.findOne({
      slug: productSlug,
    });

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    // Create Product

    const product = await Product.create({
      name: productName,
      slug: productSlug,

      category,

      brand,
      sku,
      barcode,

      shortDescription,
      description,

      price,
      salePrice,
      discount,
      gst,
      showPrice: showPrice !== undefined ? showPrice : false,
      badge,
      features,
      specifications,
      mainImage,

      stock,
      lowStockAlert,
      manageStock,

      featured,
      trending,
      bestSeller,
      newArrival,
      showOnHome,

      status,
      configuratorSections: configuratorSections || [],

      metaTitle,
      metaDescription,
      keywords,

      images: images || [],
      configuration: configuration || {},

      createdBy: req.user._id,
    });

    if (status === "Published") {
      await createNotification({
        type: "product_published",
        title: "Product Published",
        message: `${productName} has been successfully published.`,
        entityId: product._id,
        entityType: "product",
        productId: product._id,
        productName: productName,
        priority: "low",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
    @desc Get All Products
    @route GET /api/products
    @access Admin
*/

export const getProducts = async (req, res) => {
  try {
    const { categorySlug } = req.query;

    let filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    } else if (categorySlug) {
      const categoryDoc = await Category.findOne({ slug: categorySlug });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        return res.status(200).json({
          success: true,
          count: 0,
          products: [],
        });
      }
    }

    const products = await Product.find(filter)
      .populate("category", "name slug description configurator")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
    @desc Get Single Product
    @route GET /api/products/:id
    @access Admin
*/

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug configurator")
      .populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
    @desc Get Single Product by Slug
    @route GET /api/products/slug/:slug
*/

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "name slug configurator")
      .populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
    @desc Update Product
    @route PUT /api/products/:id
    @access Admin
*/

export const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      slug,
      category,
      brand,
      sku,
      barcode,

      shortDescription,
      description,

      price,
      salePrice,
      discount,
      gst,
      showPrice,
      badge,
      features,
      specifications,
      mainImage,

      stock,
      lowStockAlert,
      manageStock,

      featured,
      trending,
      bestSeller,
      newArrival,
      showOnHome,

      status,

      metaTitle,
      metaDescription,
      keywords,

      images,
      configuration,
      configuratorSections,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check Category
    if (category) {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    // Slug
    let productSlug = product.slug;

    if (slug && slug.trim() !== "") {
      productSlug = slugify(slug);
    } else if (productName) {
      productSlug = slugify(productName);
    }

    // Duplicate Slug
    const slugExists = await Product.findOne({
      slug: productSlug,
      _id: { $ne: product._id },
    });

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    product.name = productName ?? product.name;
    product.slug = productSlug;

    product.category = category ?? product.category;

    product.brand = brand ?? product.brand;
    product.sku = sku ?? product.sku;
    product.barcode = barcode ?? product.barcode;

    product.shortDescription =
      shortDescription ?? product.shortDescription;

    product.description =
      description ?? product.description;

    product.price =
      price ?? product.price;

    product.salePrice =
      salePrice ?? product.salePrice;

    product.discount =
      discount ?? product.discount;

    product.gst =
      gst ?? product.gst;

    product.showPrice =
      showPrice ?? product.showPrice;

    product.badge =
      badge ?? product.badge;

    product.features =
      features ?? product.features;

    product.specifications =
      specifications ?? product.specifications;

    if (mainImage) {
      product.mainImage = mainImage;
    }

    product.stock =
      stock ?? product.stock;

    product.lowStockAlert =
      lowStockAlert ?? product.lowStockAlert;

    product.manageStock =
      manageStock ?? product.manageStock;

    product.featured =
      featured ?? product.featured;

    product.trending =
      trending ?? product.trending;

    product.bestSeller =
      bestSeller ?? product.bestSeller;

    product.newArrival = newArrival !== undefined ? newArrival : product.newArrival;
    product.showOnHome = showOnHome !== undefined ? showOnHome : product.showOnHome;

    if (configuratorSections !== undefined) {
      product.configuratorSections = configuratorSections;
    }

    product.status = status || product.status;

    product.metaTitle =
      metaTitle ?? product.metaTitle;

    product.metaDescription =
      metaDescription ?? product.metaDescription;

    product.keywords =
      keywords ?? product.keywords;

    product.configuration =
      configuration ?? product.configuration;

    if (images) {
      product.images = images;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
    @desc Delete Product
    @route DELETE /api/products/:id
    @access Admin
*/

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};