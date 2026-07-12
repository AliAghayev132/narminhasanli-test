// Models
import { Course } from "#models";

// Utils
import { asyncHandler, ok, fail } from "#utils";

/**
 * List published courses (public), ordered.
 * GET /api/courses
 */
const listCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findPublished();
  return ok(res, { courses });
});

/**
 * Get a single published course by slug.
 * GET /api/courses/:slug
 */
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    slug: req.params.slug,
    status: "published",
    isDeleted: false,
  });

  if (!course) return fail(res, "Course not found", 404);

  return ok(res, { course });
});

/**
 * Create a course (admin only).
 * POST /api/courses
 */
const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    subtitle,
    description,
    level,
    duration,
    forWhom,
    curriculum,
    learnings,
    includes,
    price,
    format,
    featured,
    order,
    status,
  } = req.body;

  if (!title || !description) {
    return fail(res, "Title and description are required", 400);
  }

  const course = await Course.create({
    title,
    slug,
    subtitle,
    description,
    level,
    duration,
    forWhom,
    curriculum,
    learnings,
    includes,
    price,
    format,
    featured,
    order,
    status,
  });

  return ok(res, { course }, "Course created", 201);
});

/**
 * Update a course (admin only).
 * PUT /api/courses/:id
 */
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id, isDeleted: false });
  if (!course) return fail(res, "Course not found", 404);

  const fields = [
    "title",
    "subtitle",
    "description",
    "level",
    "duration",
    "forWhom",
    "curriculum",
    "learnings",
    "includes",
    "price",
    "format",
    "featured",
    "order",
    "status",
  ];
  for (const field of fields) {
    if (req.body[field] !== undefined) course[field] = req.body[field];
  }

  await course.save();

  return ok(res, { course }, "Course updated");
});

/**
 * Soft-delete a course (admin only).
 * DELETE /api/courses/:id
 */
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id, isDeleted: false });
  if (!course) return fail(res, "Course not found", 404);

  course.isDeleted = true;
  await course.save();

  return ok(res, null, "Course deleted");
});

export { listCourses, getCourse, createCourse, updateCourse, deleteCourse };
