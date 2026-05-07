import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Heart,
  Share2,
  TrendingUp,
  Clock,
  Tag,
  Plus,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { useSocialStore } from "../stores/socialStore";
import { posts } from "../data/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categories = ["全部", "学习心得", "学习方法", "学习资源", "问答互助"];

export const Community: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const { likePost } = useSocialStore();

  const filteredPosts =
    selectedCategory === "全部"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">学习社区</h1>
          <p className="text-gray-400 mt-1">与其他学习者交流心得，共同进步</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>发布帖子</Button>
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-primary-500 text-white"
                : "bg-dark-card text-gray-400 hover:text-white border border-dark-border"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Posts */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <div className="flex items-start gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="w-12 h-12 rounded-full border border-dark-border"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{post.author.username}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-lg mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{post.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{post.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">分享</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Trending Topics */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-accent-400" />
              <h3 className="font-semibold text-white">热门话题</h3>
            </div>
            <div className="space-y-3">
              {["英语口语练习", "日语N1备考", "韩语发音技巧", "单词记忆方法"].map(
                (topic, index) => (
                  <div
                    key={topic}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-bg transition-colors cursor-pointer"
                  >
                    <span className="w-6 h-6 flex items-center justify-center bg-primary-500/20 text-primary-400 text-sm font-medium rounded">
                      {index + 1}
                    </span>
                    <span className="text-gray-300 text-sm">{topic}</span>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Active Users */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">活跃学习者</h3>
            </div>
            <div className="flex -space-x-2">
              {posts.slice(0, 5).map((post, index) => (
                <img
                  key={post.id}
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="w-10 h-10 rounded-full border-2 border-dark-card"
                  style={{ zIndex: 5 - index }}
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-dark-card bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                +99
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">热门标签</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["英语", "日语", "韩语", "口语", "语法", "单词", "备考", "学习方法"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-dark-bg text-gray-400 text-sm rounded-lg hover:bg-primary-500/20 hover:text-primary-400 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                )
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
