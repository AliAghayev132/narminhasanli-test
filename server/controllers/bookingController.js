// Models
import { Booking } from "#models";

// Utils
import { asyncHandler, ok, fail } from "#utils";

/**
 * Create a booking/contact request (public — no auth). Submitted from /elaqe.
 * POST /api/bookings
 */
const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, message, sessionType, preferredDate } = req.body;

  if (!name || !email) {
    return fail(res, "Name and email are required", 400);
  }

  const booking = await Booking.create({
    name,
    email,
    phone,
    message,
    sessionType,
    preferredDate,
  });

  return ok(res, { booking }, "Reservation received", 201);
});

/**
 * List bookings (admin only), newest first, optional status filter.
 * GET /api/bookings?status=new
 */
const listBookings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const bookings = await Booking.find(filter).sort({ createdAt: -1 });

  return ok(res, { bookings });
});

/**
 * Update a booking's status (admin only).
 * PUT /api/bookings/:id
 */
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return fail(res, "Booking not found", 404);

  if (req.body.status !== undefined) booking.status = req.body.status;

  await booking.save();

  return ok(res, { booking }, "Booking updated");
});

export { createBooking, listBookings, updateBooking };
