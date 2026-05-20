import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineChatBubbleLeft,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineCheckBadge,
  HiOutlineXMark,
} from "react-icons/hi2";
import PageWrapper from "@/components/common/PageWrapper.jsx";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/common/Card.jsx";
import Badge from "@/components/common/Badge.jsx";
import Button from "@/components/common/Button.jsx";
import { useToast } from "@/context/ToastContext.jsx";
import communityData from "@/data/community.json";
import { staggerContainer, fadeInUp } from "@/utils/motionVariants.js";
import { classNames } from "@/utils/formatters.js";

const TAG_STYLES = {
  Question: "bg-accent-sky/15 text-sky-300 border-accent-sky/30",
  Tip: "bg-primary-500/15 text-primary-300 border-primary-500/30",
  Alert: "bg-accent-rose/15 text-rose-300 border-accent-rose/30",
  Success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Guide: "bg-violet-500/15 text-violet-300 border-violet-500/30",
};

function Avatar({ initials, size = "md" }) {
  const sz = size === "sm" ? "size-8 text-xs" : "size-10 text-sm";
  return (
    <div
      className={classNames(
        "rounded-xl bg-gradient-to-br from-primary-600 to-emerald-700 flex items-center justify-center font-bold text-white shrink-0",
        sz,
      )}
    >
      {initials}
    </div>
  );
}

function PostCard({ post, onLike }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      onLike(post);
    }
  };

  return (
    <motion.div variants={fadeInUp} className="glass-card p-5">
      {}
      <div className="flex items-start gap-3 mb-3">
        <Avatar initials={post.author.initials} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-ink text-sm">{post.author.name}</p>
            {post.solved && (
              <HiOutlineCheckBadge
                className="text-primary-400 text-base"
                title="Solved"
              />
            )}
            <span
              className={classNames(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border",
                TAG_STYLES[post.tag] ?? "bg-surface-2 text-ink-2 border-line",
              )}
            >
              {post.tag}
            </span>
          </div>
          <p className="text-xs text-ink-3">
            {post.author.role} · {post.timeAgo}
          </p>
        </div>
        <Badge status="neutral">{post.category}</Badge>
      </div>

      {}
      <h3 className="font-display font-semibold text-ink text-sm mb-2 leading-snug">
        {post.title}
      </h3>
      <p className="text-xs text-ink-2 leading-relaxed line-clamp-3">
        {post.body}
      </p>

      {}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-line">
        <button
          onClick={handleLike}
          className={classNames(
            "flex items-center gap-1.5 text-xs transition-colors cursor-pointer",
            liked ? "text-accent-rose" : "text-ink-3 hover:text-accent-rose",
          )}
        >
          <HiOutlineHeart className="text-base" />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-ink-3 hover:text-ink cursor-pointer transition-colors">
          <HiOutlineChatBubbleLeft className="text-base" />
          {post.comments}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-ink-3 hover:text-ink cursor-pointer transition-colors">
          <HiOutlineEye className="text-base" />
          {post.views}
        </button>
      </div>
    </motion.div>
  );
}

function Community() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [posts, setPosts] = useState(() => communityData?.posts ?? []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Pest Control",
    tag: "Question",
    body: "",
  });

  const categories = communityData?.categories ?? [];
  const contributors = communityData?.topContributors ?? [];

  const visible = posts.filter((p) => {
    const matchCat = category === "all" || p.category === category;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleLike = (post) => {
    toast.success("Post liked", `You liked "${post.title.slice(0, 40)}…"`);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.warning("Incomplete post", "Please fill in title and post content.");
      return;
    }

    const createdPost = {
      id: `post-${Date.now()}`,
      author: {
        name: "Aryan Lade",
        role: "Agronomist & Farmer",
        initials: "AL",
      },
      title: formData.title.trim(),
      body: formData.body.trim(),
      category: formData.category,
      tag: formData.tag,
      timeAgo: "Just now",
      likes: 1,
      comments: 0,
      views: 1,
      solved: false,
    };

    setPosts((prev) => [createdPost, ...prev]);
    setIsModalOpen(false);
    setFormData({ title: "", category: "Pest Control", tag: "Question", body: "" });
    toast.success("Post published", "Your question is now live in the community!");
  };

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineUserGroup}
        accent="primary"
        title="Farmer Community"
        description="Ask questions, share experiences, and learn from thousands of farmers and agronomists."
        badge={{ label: `${posts.length} Posts`, status: "info" }}
        action={
          <Button
            icon={HiOutlinePencilSquare}
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            New Post
          </Button>
        }
      />

      <div className="flex flex-col xl:flex-row gap-6">
        {}
        <div className="flex-1 min-w-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {}
            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 glass rounded-xl px-3.5 py-2">
                <HiOutlineMagnifyingGlass className="text-ink-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search posts…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm text-ink placeholder:text-ink-3 outline-none w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={classNames(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                      category === cat.id
                        ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
                        : "glass text-ink-2 hover:text-ink",
                    )}
                  >
                    {cat.label}
                    <span className="ml-1.5 text-ink-3">{cat.count}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {}
            {visible.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}

            {visible.length === 0 && (
              <motion.div
                variants={fadeInUp}
                className="glass-card py-16 flex flex-col items-center gap-3"
              >
                <HiOutlineUserGroup className="text-4xl text-ink-3" />
                <p className="text-ink-3 text-sm">
                  No posts match your search.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {}
        <div className="xl:w-72 shrink-0">
          <Card hover={false} className="sticky top-24">
            <h3 className="font-display font-semibold text-ink mb-4">
              Top Contributors
            </h3>
            <div className="flex flex-col gap-3">
              {contributors.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ink-3 w-4">
                    {i + 1}
                  </span>
                  <Avatar initials={c.initials} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">
                      {c.name}
                    </p>
                    <p className="text-xs text-ink-3">
                      {c.role} · {c.posts} posts
                    </p>
                  </div>
                  <Badge status="optimal">{c.reputation}</Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-line">
              <h3 className="font-semibold text-ink text-sm mb-3">
                Community Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Posts", value: "248" },
                  { label: "Members", value: "1,840" },
                  { label: "Questions", value: "89" },
                  { label: "Solved", value: "72" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="glass rounded-xl px-3 py-2.5 text-center"
                  >
                    <p className="font-bold text-ink">{value}</p>
                    <p className="text-[10px] text-ink-3">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-lg glass-card rounded-2xl p-6 border border-line shadow-2xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink font-semibold">
                  <HiOutlinePencilSquare className="text-primary-400 text-lg" />
                  <h3>Create Community Post</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="size-8 rounded-full glass flex items-center justify-center text-ink-3 hover:text-ink cursor-pointer"
                >
                  <HiOutlineXMark />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-2 mb-1">
                    Question / Discussion Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How to prevent yellow leaf curl in summer tomato crop?"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl glass text-ink text-sm placeholder:text-ink-3 outline-none focus:border-primary-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-2 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl glass text-ink text-sm outline-none cursor-pointer"
                    >
                      <option value="Pest Control" className="bg-night-900 text-white">Pest Control</option>
                      <option value="Irrigation" className="bg-night-900 text-white">Irrigation</option>
                      <option value="Soil Health" className="bg-night-900 text-white">Soil Health</option>
                      <option value="Crop Diseases" className="bg-night-900 text-white">Crop Diseases</option>
                      <option value="Market & Pricing" className="bg-night-900 text-white">Market & Pricing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-2 mb-1">
                      Post Tag
                    </label>
                    <select
                      value={formData.tag}
                      onChange={(e) => setFormData((p) => ({ ...p, tag: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl glass text-ink text-sm outline-none cursor-pointer"
                    >
                      <option value="Question" className="bg-night-900 text-white">Question</option>
                      <option value="Tip" className="bg-night-900 text-white">Tip</option>
                      <option value="Alert" className="bg-night-900 text-white">Alert</option>
                      <option value="Guide" className="bg-night-900 text-white">Guide</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-2 mb-1">
                    Details & Notes
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the issue, symptoms observed, soil type, and any treatments already attempted..."
                    value={formData.body}
                    onChange={(e) => setFormData((p) => ({ ...p, body: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl glass text-ink text-sm placeholder:text-ink-3 outline-none resize-none focus:border-primary-500/50"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-line">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Publish Post
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

export default Community;
