import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  BookOpen,
  Tag,
  Search,
  LayoutGrid,
  List,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string;
  slug: string;
}

type ViewMode = "grid" | "list";

// Lightweight frontmatter parser — no Node/Buffer dependency, works in the browser.
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, frontmatterBlock, content] = match;
  const data: Record<string, string> = {};

  frontmatterBlock.split("\n").forEach((line) => {
    const lineMatch = line.match(/^([^:]+):\s*(.*)$/);
    if (lineMatch) {
      const key = lineMatch[1].trim();
      let value = lineMatch[2].trim();
      // Strip surrounding quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content: content.trim() };
}

const Blog = () => {
  const blogFiles = import.meta.glob("../../content/blogs/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const posts: BlogPost[] = Object.entries(blogFiles).map(
    ([path, file], index) => {
      const markdown = file as string;
      const { data, content } = parseFrontmatter(markdown);

      return {
        id: index + 1,
        slug: path.split("/").pop()?.replace(".md", "") || "",
        title: data.title || "Untitled",
        category: data.category || "General",
        date: data.date || "",
        readTime: data.readTime || "5 min read",
        excerpt: data.excerpt || "",
        image: data.image || "/uploads/default-blog.jpg",
        content,
      };
    },
  );

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return posts;

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    });
  }, [posts, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          /* Articles List View */
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Header row: title + view toggle */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white relative inline-block">
                Blog
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
              </h2>

              {/* View toggle */}
              <div className="flex items-center gap-1 bg-dark-800 border border-dark-700 rounded-xl p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-dark-900 text-primary border border-dark-700"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-dark-900 text-primary border border-dark-700"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, excerpt, or category..."
                className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-dark-700/50 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results count when searching */}
            {searchQuery && (
              <p className="text-xs text-gray-500 -mt-4">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "result" : "results"} for "
                {searchQuery}"
              </p>
            )}

            {posts.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No blog posts found yet. Add markdown files to{" "}
                <code className="bg-dark-900 px-1.5 py-0.5 rounded-md border border-dark-700/50">
                  content/blogs/
                </code>
                .
              </p>
            ) : filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-dark-800/50 border border-dark-700 rounded-2xl">
                <Search size={28} className="text-gray-600 mb-3" />
                <p className="text-gray-300 font-semibold">No matching articles</p>
                <p className="text-gray-500 text-sm mt-1">
                  Try a different search term.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-dark-800 rounded-xl sm:rounded-2xl border border-dark-700 overflow-hidden flex flex-col cursor-pointer hover:border-primary/20 transition-all duration-300 shadow-sm min-w-0"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-dark-900 border-b border-dark-700">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-dark-900/90 backdrop-blur-md text-[8px] sm:text-[10px] font-bold text-primary border border-dark-700/50 rounded-md tracking-wider uppercase flex items-center gap-1 sm:gap-1.5 max-w-[85%]">
                        <Tag size={8} className="shrink-0" />
                        <span className="truncate">{post.category}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-3 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4 min-w-0">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-xs text-gray-500 font-semibold">
                          <span className="flex items-center gap-1 min-w-0">
                            <Calendar size={10} className="shrink-0" />
                            <span className="truncate">{post.date}</span>
                          </span>
                          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-dark-700"></span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} className="shrink-0" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="hidden sm:block text-sm text-gray-400 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-1 sm:pt-2 text-[10px] sm:text-xs font-bold text-primary group-hover:text-amber-500 transition-colors flex items-center gap-1 sm:gap-1.5">
                        <span>Read More</span>
                        <BookOpen
                          size={12}
                          className="group-hover:translate-x-0.5 transition-transform shrink-0"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* LIST VIEW — always horizontal: small thumbnail left, content right, on every screen size */
              <div className="flex flex-col gap-3 sm:gap-4">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-dark-800 rounded-xl sm:rounded-2xl border border-dark-700 overflow-hidden flex flex-row items-stretch cursor-pointer hover:border-primary/20 transition-all duration-300 shadow-sm min-w-0"
                  >
                    {/* Thumbnail — fixed small square/rect on mobile, larger on desktop */}
                    <div className="relative w-24 h-24 sm:w-48 sm:h-auto md:w-56 shrink-0 overflow-hidden bg-dark-900 border-r border-dark-700">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="hidden sm:flex absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-dark-900/90 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-primary border border-dark-700/50 rounded-md tracking-wider uppercase items-center gap-1 sm:gap-1.5 max-w-[85%]">
                        <Tag size={9} className="shrink-0" />
                        <span className="truncate">{post.category}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-3 sm:p-6 flex-1 flex flex-col justify-center space-y-1 sm:space-y-3 min-w-0">
                      {/* Category badge shown inline on mobile since it's hidden on the thumbnail */}
                      <div className="flex sm:hidden items-center gap-1 text-[9px] font-bold text-primary uppercase tracking-wider">
                        <Tag size={9} className="shrink-0" />
                        <span className="truncate">{post.category}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-xs text-gray-500 font-semibold">
                        <span className="flex items-center gap-1 min-w-0">
                          <Calendar size={11} className="shrink-0" />
                          <span className="truncate">{post.date}</span>
                        </span>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-dark-700"></span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="shrink-0" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="hidden sm:block text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="hidden sm:flex pt-1 text-[11px] sm:text-xs font-bold text-primary group-hover:text-amber-500 transition-colors items-center gap-1.5">
                        <span>Read Full Post</span>
                        <BookOpen
                          size={13}
                          className="group-hover:translate-x-0.5 transition-transform shrink-0"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Full Markdown Article View */
          <motion.div
            key="article"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6 sm:space-y-8 bg-dark-800 rounded-2xl border border-dark-700 p-5 sm:p-6 md:p-10 shadow-xl"
          >
            {/* Back Navigation */}
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-900 border border-dark-700 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Articles</span>
            </button>

            {/* Post Header */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-wider bg-dark-900 border border-dark-700/50 px-2.5 py-1 rounded-md">
                {selectedPost.category}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-semibold border-b border-dark-700 pb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {selectedPost.date}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-dark-700"></span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {selectedPost.readTime}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-dark-700 bg-dark-900">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Markdown Body Content */}
            <div className="prose prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4 border-b border-dark-700 pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-bold">{children}</strong>
                  ),
                  li: ({ children }) => (
                    <li className="list-disc pl-2 ml-5 text-gray-300 text-sm leading-relaxed mb-1">
                      {children}
                    </li>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-1 my-4">{children}</ul>
                  ),
                  code: ({ children }) => (
                    <code className="bg-dark-900 text-primary px-1.5 py-0.5 rounded-md font-mono text-sm border border-dark-700/50">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-dark-900 p-4 sm:p-5 rounded-xl border border-dark-700 font-mono text-xs sm:text-sm text-gray-300 overflow-x-auto my-4 shadow-inner leading-relaxed">
                      {children}
                    </pre>
                  ),
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Blog;