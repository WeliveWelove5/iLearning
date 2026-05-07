import { create } from "zustand";
import type { Post, Comment, LeaderboardEntry } from "../types";
import { posts, leaderboard } from "../data/mockData";

interface SocialState {
  posts: Post[];
  leaderboard: LeaderboardEntry[];
  
  addPost: (post: Omit<Post, "id" | "createdAt" | "likes" | "comments">) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Omit<Comment, "id" | "postId" | "createdAt">) => void;
  
  getPostsByCategory: (category: string) => Post[];
  getTopPosts: (limit?: number) => Post[];
  
  getLeaderboard: () => LeaderboardEntry[];
  getUserRank: (userId: string) => number;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  posts: posts,
  leaderboard: leaderboard,

  addPost: (postData) => {
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      likes: 0,
      comments: [],
      createdAt: new Date(),
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
  },

  likePost: (postId: string) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    }));
  },

  addComment: (postId: string, commentData) => {
    const newComment: Comment = {
      ...commentData,
      id: `comment-${Date.now()}`,
      postId,
      createdAt: new Date(),
    };
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ),
    }));
  },

  getPostsByCategory: (category: string) => {
    return get().posts.filter((post) => post.category === category);
  },

  getTopPosts: (limit = 5) => {
    return [...get().posts]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit);
  },

  getLeaderboard: () => {
    return get().leaderboard;
  },

  getUserRank: (userId: string) => {
    const entry = get().leaderboard.find((e) => e.user.id === userId);
    return entry?.rank || 0;
  },
}));
