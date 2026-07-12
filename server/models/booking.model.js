import { Schema, Model, bookingStatus } from "#constants";

/**
 * Booking model — a reservation/contact request submitted from /elaqe.
 * No auth required to create one; only admins can list/manage them (Phase 2).
 */
const bookingSchema = new Schema(
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
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
    },
    sessionType: {
      type: String,
    },
    preferredDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: bookingStatus,
      default: "new",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

bookingSchema.index({ status: 1, createdAt: -1 });

bookingSchema.statics.findNew = function () {
  return this.find({ status: "new" }).sort({ createdAt: -1 });
};

export const Booking = Model("Booking", bookingSchema);
