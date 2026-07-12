import { Router } from "#constants";
import { sessionController } from "#controllers";
import { authenticate, requireRole, writeRateLimiter } from "#middlewares";

const SessionRouter = Router();

// Public
SessionRouter.get("/", sessionController.listSessions);

// Protected (admin only) — Phase 2 UI, endpoints ready now.
SessionRouter.post(
  "/",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  sessionController.createSession,
);
SessionRouter.put(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  sessionController.updateSession,
);
SessionRouter.delete(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  writeRateLimiter,
  sessionController.deleteSession,
);

export { SessionRouter };
