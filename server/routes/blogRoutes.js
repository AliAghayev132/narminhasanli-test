import { Router } from "#constants";
import { blogController } from "#controllers";
import { authenticate, requireRole, writeRateLimiter } from "#middlewares";

const BlogRouter = Router();

// Public
BlogRouter.get("/", blogController.listBlogs);
BlogRouter.get("/:slug", blogController.getBlog);

// Protected (admin only) — Phase 2 UI, endpoints ready now.
BlogRouter.post(
  "/",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  blogController.createBlog,
);
BlogRouter.put(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  blogController.updateBlog,
);
BlogRouter.delete(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  blogController.deleteBlog,
);

export { BlogRouter };
