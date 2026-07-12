import { Schema, Model } from "#constants";

/**
 * Session model — a bookable session type shown on the home page (#sessions).
 * No slug/detail page: sessions are listed inline and booked via /elaqe.
 */
const sessionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    price: {
      type: Number,
    },
    format: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.index({ isActive: 1, order: 1 });

sessionSchema.statics.findActive = function () {
  return this.find({ isActive: true }).sort({ order: 1 });
};

export const Session = Model("Session", sessionSchema);
