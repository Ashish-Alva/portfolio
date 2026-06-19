import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowLeft, BookOpen, Tag } from "lucide-react";
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
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-white relative inline-block">
                Blog
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
              </h2>
            </div>

            {posts.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No blog posts found yet. Add markdown files to{" "}
                <code className="bg-dark-900 px-1.5 py-0.5 rounded-md border border-dark-700/50">
                  content/blogs/
                </code>
                .
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden flex flex-col cursor-pointer hover:border-primary/20 transition-all duration-300 shadow-sm"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-dark-900 border-b border-dark-700">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-dark-900/90 backdrop-blur-md text-[10px] font-bold text-primary border border-dark-700/50 rounded-md tracking-wider uppercase flex items-center gap-1.5">
                        <Tag size={10} />
                        {post.category}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-dark-700"></span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 text-xs font-bold text-primary group-hover:text-amber-500 transition-colors flex items-center gap-1.5">
                        <span>Read Full Post</span>
                        <BookOpen
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
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
            className="space-y-8 bg-dark-800 rounded-2xl border border-dark-700 p-6 md:p-10 shadow-xl"
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
              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 font-semibold border-b border-dark-700 pb-6">
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
                    <h1 className="text-3xl font-extrabold text-white mt-8 mb-4 border-b border-dark-700 pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-white mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 leading-relaxed mb-4 text-base">
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
                    <pre className="bg-dark-900 p-5 rounded-xl border border-dark-700 font-mono text-sm text-gray-300 overflow-x-auto my-4 shadow-inner leading-relaxed">
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