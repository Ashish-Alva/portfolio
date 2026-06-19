import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, BookOpen, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string;
}

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Mastering Tailwind CSS v4: Key Changes & Modern Features',
      category: 'Frontend',
      date: 'May 12, 2026',
      readTime: '5 min read',
      excerpt: 'Explore the revolutionary changes in Tailwind CSS v4, including the native CSS-first configuration, theme variable compilation, and major performance boosts.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
      content: `
Tailwind CSS v4.0 is a complete reimagining of the utility-first CSS framework. Built on a brand-new compiler engine, it represents a massive leap forward in build performance, developer experience, and modern CSS integration.

### What's New in v4.0?

The biggest shift in Tailwind CSS v4 is its **CSS-First Configuration**. Instead of utilizing a \`tailwind.config.js\` file, configurations are written directly inside your main CSS stylesheet.

#### Native @theme Directive

Gone are the days of sprawling JavaScript configuration objects. Customization now happens with simple CSS-style key/value mappings inside a \`@theme\` declaration block:

\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #f59e0b; /* Amber/Gold */
  --color-dark-900: #0f1115; /* Main bg */
  --color-dark-800: #1a1d24; /* Sidebar/Card bg */
}
\`\`\`

These keys compile into standard CSS variables (e.g. \`var(--color-primary)\`) that you can reference anywhere in your code.

### Incredible Build Performance

Tailwind v4's custom rust compiler compiles stylesheets up to **10x faster** than the previous JavaScript-based engine. It operates with a fully incremental watch process, rendering design modifications in real-time.

### Dynamic Class Generation

V4 supports out-of-the-box support for advanced CSS utilities, including native container queries, dynamic 3D transforms, fluid grid columns, and enhanced subgrid layouts.

### Wrap-up

Transitioning to Tailwind v4 simplifies your developer toolchain, removes JavaScript clutter, and integrates natively with standard CSS directives. Give it a try on your next project!
      `
    },
    {
      id: 2,
      title: 'Understanding React Server Components (RSC)',
      category: 'React',
      date: 'April 28, 2026',
      readTime: '7 min read',
      excerpt: 'Dive deep into React Server Components. Learn how they differ from Client Components, their performance benefits, and when to use server-side rendering.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
      content: `
React Server Components (RSC) represent one of the most fundamental shifts in web architecture since the launch of React itself. By executing on the build server or during HTTP request lifecycles, Server Components offer the potential for faster initial loads, significantly smaller bundle sizes, and robust SEO capabilities.

### Client vs. Server Components

In the modern React world, components belong to one of two main paradigms:

1. **Server Components:** Rendered strictly on the server. They have direct access to backend resources (databases, file systems) and do not ship any JavaScript to the client.
2. **Client Components:** Standard interactive components. They can use states, hooks (\`useState\`, \`useEffect\`), and interact with browser-only APIs. Marked with \`"use client"\` at the top of the file.

### Why Server Components Matter

#### 1. Zero Bundle Size
Any library used inside a Server Component stays on the server. If you import a heavy markdown parser, it will execute on the server and ship *only* the compiled static HTML to the browser. Your client package stays incredibly lean!

#### 2. Direct Data Fetching
Instead of writing an API route, exposing a fetch controller, and waiting for state hooks to trigger on mount, Server Components can execute standard async database queries directly in the rendering block:

\`\`\`tsx
// This component runs exclusively on the server!
async function UserProfile({ id }: { id: string }) {
  const user = await db.users.findUnique({ id });
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
\`\`\`

#### 3. Automatic Security
API keys, database credentials, and secret strings stay safely isolated on the backend. There is no risk of exposing sensitive data to the client's network tab.

### Summary

React Server Components are not a replacement for traditional client-side React. Instead, they are an extension that allows developers to compose static, backend-driven layouts alongside highly interactive components on a single screen.
      `
    },
    {
      id: 3,
      title: 'Designing High-Throughput REST APIs in Go',
      category: 'Backend',
      date: 'March 15, 2026',
      readTime: '6 min read',
      excerpt: 'Learn strategies for building high-performance APIs with Go, focusing on concurrent connection pooling, request filtering, and memory optimization.',
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop',
      content: `
Go has established itself as the go-to language for engineering robust, low-latency microservices. Thanks to its native concurrency model (goroutines) and excellent memory management, Go makes it possible to build API architectures that easily process thousands of active requests per second on minimal server resources.

### Strategies for Speed

#### 1. Harness Goroutines with Care
While launching a goroutine (\`go func()\`) is incredibly cheap (typically only requiring 2-4KB of stack memory), spawning them uncontrollably can still overwhelm downstream resources like databases or external microservices.

*Use buffered worker pools* to throttle active task threads and handle concurrent traffic gracefully without bottlenecking system memory.

#### 2. Configure Database Pool Sizes
By default, the \`database/sql\` driver allows an unlimited number of concurrent connections. This can lead to database connection exhaustion. Always explicitly configure constraints:

\`\`\`go
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(25)
db.SetConnMaxLifetime(5 * time.Minute)
\`\`\`

#### 3. Stream Serialized Data
Avoid parsing massive JSON arrays directly into memory if you are simply forwarding them. Utilize Go's \`io.Reader\` and \`io.Writer\` interfaces to stream raw payloads asynchronously, minimizing allocation footprints.

### Conclusion

Creating lightning-fast APIs in Go comes down to respecting the language's native strengths: lightweight threading, explicit connection pools, and utilizing streaming interfaces to process network packets efficiently.
      `
    }
  ];

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
                <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-primary rounded-full"></span>
              </h2>
            </div>

            {/* Articles Grid */}
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
                      <BookOpen size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
                  h1: ({ children }) => <h1 className="text-3xl font-extrabold text-white mt-8 mb-4 border-b border-dark-700 pb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-4 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4 text-base">{children}</p>,
                  strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                  li: ({ children }) => <li className="list-disc pl-2 ml-5 text-gray-300 text-sm leading-relaxed mb-1">{children}</li>,
                  ul: ({ children }) => <ul className="space-y-1 my-4">{children}</ul>,
                  code: ({ children }) => <code className="bg-dark-900 text-primary px-1.5 py-0.5 rounded-md font-mono text-sm border border-dark-700/50">{children}</code>,
                  pre: ({ children }) => <pre className="bg-dark-900 p-5 rounded-xl border border-dark-700 font-mono text-sm text-gray-300 overflow-x-auto my-4 shadow-inner leading-relaxed">{children}</pre>,
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
