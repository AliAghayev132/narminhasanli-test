import { Router } from "#constants";
import { bookingController } from "#controllers";
import { authenticate, requireRole, writeRateLimiter } from "#middlewares";

const BookingRouter = Router();

// Public — the /elaqe reservation form.
BookingRouter.post("/", writeRateLimiter, bookingController.createBooking);

// Protected (admin only) — Phase 2 UI, endpoints ready now.
BookingRouter.get("/", authenticate, requireRole(["admin"]), bookingController.listBookings);
BookingRouter.put(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  bookingController.updateBooking,
);

export { BookingRouter };
