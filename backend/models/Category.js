import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    order: {
      type: Number,
      default: 0,
    },

    configurator: {
      enabled: { type: Boolean, default: false },
      baseMinQuantity: { type: Number, default: 100 },
      allowCustomQuantity: { type: Boolean, default: true },
      allowCustomSize: { type: Boolean, default: true },
      sections: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          type: {
            type: String,
            enum: ['dropdown', 'checkbox', 'radio', 'text', 'number', 'quantity', 'custom_size'],
            default: 'dropdown'
          },
          enabled: { type: Boolean, default: true },
          required: { type: Boolean, default: false },
          order: { type: Number, default: 1 },
          options: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              priceAdjustment: { type: Number, default: 0 },
              enabled: { type: Boolean, default: true },
              order: { type: Number, default: 1 }
            }
          ]
        }
      ]
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;