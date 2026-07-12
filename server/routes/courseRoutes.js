import { Router } from "#constants";
import { courseController } from "#controllers";
import { authenticate, requireRole, writeRateLimiter } from "#middlewares";

const CourseRouter = Router();

// Public
CourseRouter.get("/", courseController.listCourses);
CourseRouter.get("/:slug", courseController.getCourse);

// Protected (admin only) — Phase 2 UI, endpoints ready now.
CourseRouter.post(
  "/",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  courseController.createCourse,
);
CourseRouter.put(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  courseController.updateCourse,
);
CourseRouter.delete(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  courseController.deleteCourse,
);

export { CourseRouter };
