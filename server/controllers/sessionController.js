// Models
import { Session } from "#models";

// Utils
import { asyncHandler, ok, fail } from "#utils";

/**
 * List active session types (public), ordered. Shown on the home page.
 * GET /api/sessions
 */
const listSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.findActive();
  return ok(res, { sessions });
});

/**
 * Create a session type (admin only).
 * POST /api/sessions
 */
const createSession = asyncHandler(async (req, res) => {
  const { name, description, duration, price, format, order, isActive } = req.body;

  if (!name || !description) {
    return fail(res, "Name and description are required", 400);
  }

  const session = await Session.create({
    name,
    description,
    duration,
    price,
    format,
    order,
    isActive,
  });

  return ok(res, { session }, "Session created", 201);
});

/**
 * Update a session type (admin only).
 * PUT /api/sessions/:id
 */
const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) return fail(res, "Session not found", 404);

  const fields = ["name", "description", "duration", "price", "format", "order", "isActive"];
  for (const field of fields) {
    if (req.body[field] !== undefined) session[field] = req.body[field];
  }

  await session.save();

  return ok(res, { session }, "Session updated");
});

/**
 * Delete a session type (admin only).
 * DELETE /api/sessions/:id
 */
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findByIdAndDelete(req.params.id);
  if (!session) return fail(res, "Session not found", 404);

  return ok(res, null, "Session deleted");
});

export { listSessions, createSession, updateSession, deleteSession };
