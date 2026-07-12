import { Schema, Model, contentStatus } from "#constants";
import { EncryptionService } from "#services/EncryptionService.js";

/**
 * Course model — a paid program shown on /derslar and /derslar/[slug].
 * `curriculum` holds the week-by-week breakdown; `learnings` is the bullet
 * list of takeaways shown on the detail page.
 */
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
    },
    duration: {
      type: String,
    },
    forWhom: {
      type: String,
    },
    curriculum: {
      type: [
        {
          _id: false,
          week: { type: Number, required: true },
          title: { type: String, required: true },
          text: { type: String, required: true },
        },
      ],
      default: [],
    },
    learnings: {
      type: [String],
      default: [],
    },
    includes: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
    },
    format: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: contentStatus,
      default: "draft",
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

// Published courses, ordered listing is the primary access pattern.
courseSchema.index({ status: 1, order: 1 });

courseSchema.virtual("url").get(function () {
  return `/derslar/${this.slug}`;
});

courseSchema.pre("save", function () {
  if (!this.slug && this.title) {
    const base = EncryptionService.generateSlug(this.title);
    const suffix = Math.random().toString(36).slice(2, 7);
    this.slug = `${base || "course"}-${suffix}`;
  }
});

courseSchema.statics.findPublished = function (filter = {}) {
  return this.find({ ...filter, status: "published", isDeleted: false }).sort({
    order: 1,
  });
};

export const Course = Model("Course", courseSchema);
