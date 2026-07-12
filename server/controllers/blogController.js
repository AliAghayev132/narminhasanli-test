// Models
import { Blog } from "#models";

// Utils
import { asyncHandler, ok, fail } from "#utils";

/**
 * List published blog posts (public) with pagination + optional filters.
 * GET /api/blogs?page=1&limit=10&category=rituallar&search=hello
 */
const listBlogs = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
  const skip = (page - 1) * limit;

  const filter = { status: "published", isDeleted: false };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) {
    filter.title = { $regex: String(req.query.search), $options: "i" };
  }

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "firstName lastName avatar"),
    Blog.countDocuments(filter),
  ]);

  return ok(res, {
    blogs,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

/**
 * Get a single published blog post by slug and increment its view counter.
 * GET /api/blogs/:slug
 */
const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    status: "published",
    isDeleted: false,
  }).populate("author", "firstName lastName avatar");

  if (!blog) return fail(res, "Blog post not found", 404);

  await blog.incrementViews();

  return ok(res, { blog });
});

/**
 * Create a blog post (admin only).
 * POST /api/blogs
 */
const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, coverImage, readTime, featured, status, slug } =
    req.body;

  if (!title || !excerpt || !content || !category) {
    return fail(res, "Title, excerpt, content and category are required", 400);
  }

  const blog = await Blog.create({
    title,
    slug,
    excerpt,
    content,
    category,
    coverImage,
    readTime,
    featured,
    status,
    author: req.user._id,
  });

  return ok(res, { blog }, "Blog post created", 201);
});

/**
 * Update a blog post (admin only).
 * PUT /api/blogs/:id
 */
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false });
  if (!blog) return fail(res, "Blog post not found", 404);

  const fields = [
    "title",
    "excerpt",
    "content",
    "category",
    "coverImage",
    "readTime",
    "featured",
    "status",
  ];
  for (const field of fields) {
    if (req.body[field] !== undefined) blog[field] = req.body[field];
  }

  await blog.save();

  return ok(res, { blog }, "Blog post updated");
});

/**
 * Soft-delete a blog post (admin only).
 * DELETE /api/blogs/:id
 */
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false });
  if (!blog) return fail(res, "Blog post not found", 404);

  blog.isDeleted = true;
  await blog.save();

  return ok(res, null, "Blog post deleted");
});

export { listBlogs, getBlog, createBlog, updateBlog, deleteBlog };
