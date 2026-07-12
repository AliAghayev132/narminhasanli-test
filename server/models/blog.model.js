import { Schema, Model, contentStatus } from "#constants";
import { EncryptionService } from "#services/EncryptionService.js";

/**
 * Blog model — a published article shown on /bloglar and /bloglar/[slug].
 */
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Unique URL-safe identifier, auto-generated from title if not provided.
    slug: {
      type: String,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    readTime: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: contentStatus,
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
    views: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Newest published-first listing is the primary access pattern.
blogSchema.index({ status: 1, publishedAt: -1 });

blogSchema.virtual("url").get(function () {
  return `/bloglar/${this.slug}`;
});

blogSchema.pre("save", function () {
  if (!this.slug && this.title) {
    const base = EncryptionService.generateSlug(this.title);
    const suffix = Math.random().toString(36).slice(2, 7);
    this.slug = `${base || "post"}-${suffix}`;
  }
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

blogSchema.statics.findPublished = function (filter = {}) {
  return this.find({ ...filter, status: "published", isDeleted: false }).sort({
    publishedAt: -1,
  });
};

blogSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
  return this.views;
};

export const Blog = Model("Blog", blogSchema);
