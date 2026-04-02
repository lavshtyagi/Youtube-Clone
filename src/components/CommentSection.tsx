import { useState } from "react";
import type { Comment } from "../utils/types";

// Sample Comments (n-level deep nesting)
const SAMPLE_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Arpit Bhayani",
    avatar: "A",
    text: "This is one of the best explanations I've seen on this topic. The way you broke down each concept step by step was incredibly helpful!",
    likes: 2400,
    publishedAt: "2 days ago",
    replies: [
      {
        id: "1-1",
        author: "Mohak Mangal",
        avatar: "M",
        text: "Completely agree! I've watched this three times already 🔥",
        likes: 312,
        publishedAt: "1 day ago",
        replies: [
          {
            id: "1-1-1",
            author: "Coder Army",
            avatar: "C",
            text: "Same here. Bookmarked it for my students too!",
            likes: 87,
            publishedAt: "20 hours ago",
            replies: [
              {
                id: "1-1-1-1",
                author: "Greg Hogg",
                avatar: "G",
                text: "Great recommendation for beginners 👍",
                likes: 34,
                publishedAt: "15 hours ago",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        author: "Priya Sharma",
        avatar: "P",
        text: "Where can I find the source code for this?",
        likes: 56,
        publishedAt: "22 hours ago",
        replies: [
          {
            id: "1-2-1",
            author: "Arpit Bhayani",
            avatar: "A",
            text: "It's linked in the description! Check the GitHub repo 🚀",
            likes: 210,
            publishedAt: "18 hours ago",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    author: "Zerodha Varsity",
    avatar: "Z",
    text: "The production quality of this channel keeps getting better. Keep it up! 🎬",
    likes: 1870,
    publishedAt: "3 days ago",
    replies: [
      {
        id: "2-1",
        author: "Rahul Dev",
        avatar: "R",
        text: "Fully agree. Audio quality in this one is 🔥",
        likes: 143,
        publishedAt: "2 days ago",
        replies: [],
      },
    ],
  },
  {
    id: "3",
    author: "Krish Naik",
    avatar: "K",
    text: "Can you make a follow-up video on advanced topics? This was too short 😅",
    likes: 930,
    publishedAt: "4 days ago",
    replies: [
      {
        id: "3-1",
        author: "Kunal Kushwaha",
        avatar: "K",
        text: "Part 2 is already in the works, he mentioned it in a community post!",
        likes: 411,
        publishedAt: "3 days ago",
        replies: [
          {
            id: "3-1-1",
            author: "Krish Naik",
            avatar: "K",
            text: "Oh nice! Can't wait 🙌",
            likes: 120,
            publishedAt: "2 days ago",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    author: "Tanay Pratap",
    avatar: "T",
    text: "I've shared this with my entire team. Extremely well explained!",
    likes: 780,
    publishedAt: "5 days ago",
    replies: [],
  },
  {
    id: "5",
    author: "Striver Official",
    avatar: "S",
    text: "The animations really help! Most tutorials just show code but this explains the WHY.",
    likes: 645,
    publishedAt: "6 days ago",
    replies: [
      {
        id: "5-1",
        author: "Neetcode",
        avatar: "N",
        text: "100% — visualising the concept is what makes it stick.",
        likes: 289,
        publishedAt: "5 days ago",
        replies: [],
      },
    ],
  },
];

// Avatar colours based on first letter
const AVATAR_COLORS: Record<string, string> = {
  A: "bg-red-500",
  B: "bg-pink-500",
  C: "bg-purple-500",
  D: "bg-indigo-500",
  E: "bg-blue-500",
  F: "bg-cyan-500",
  G: "bg-teal-500",
  H: "bg-green-500",
  I: "bg-lime-500",
  J: "bg-yellow-500",
  K: "bg-orange-500",
  L: "bg-red-400",
  M: "bg-rose-500",
  N: "bg-fuchsia-500",
  O: "bg-violet-500",
  P: "bg-sky-500",
  Q: "bg-emerald-500",
  R: "bg-amber-500",
  S: "bg-indigo-400",
  T: "bg-blue-400",
  U: "bg-green-400",
  V: "bg-purple-400",
  W: "bg-pink-400",
  X: "bg-cyan-400",
  Y: "bg-red-600",
  Z: "bg-teal-600",
};

const getAvatarColor = (letter: string) =>
  AVATAR_COLORS[letter.toUpperCase()] ?? "bg-gray-500";

// Recursive CommentCard
interface CommentCardProps {
  comment: Comment;
  depth?: number;
}

const CommentCard = ({ comment, depth = 0 }: CommentCardProps) => {
  const [showReplies, setShowReplies] = useState(depth < 1);
  const hasReplies = comment.replies && comment.replies.length > 0;

  const indent = Math.min(depth, 4) * 36;

  return (
    <div style={{ marginLeft: indent }} className="mt-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(comment.avatar)}`}
        >
          {comment.avatar}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {comment.author}
            </span>
            <span className="text-xs text-gray-400">{comment.publishedAt}</span>
          </div>

          <p className="mt-0.5 text-sm leading-relaxed text-gray-800">
            {comment.text}
          </p>

          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            <button className="flex items-center gap-1 transition-colors hover:text-gray-800">
              👍 <span>{comment.likes.toLocaleString()}</span>
            </button>
            <button className="flex items-center gap-1 transition-colors hover:text-gray-800">
              👎
            </button>
            <button className="font-semibold transition-colors hover:text-gray-800">
              Reply
            </button>
          </div>

          {hasReplies && (
            <button
              onClick={() => setShowReplies((v) => !v)}
              className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
            >
              {showReplies ? "▲" : "▼"}
              {showReplies
                ? " Hide replies"
                : ` View ${comment.replies!.length} repl${comment.replies!.length === 1 ? "y" : "ies"}`}
            </button>
          )}
        </div>
      </div>

      {hasReplies && showReplies && (
        <div className="ml-4 border-l-2 border-gray-100 pl-1">
          {comment.replies!.map((reply) => (
            <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// CommentSection
export const CommentSection = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-6 text-lg font-bold text-gray-900">
        {SAMPLE_COMMENTS.length + 3} Comments
      </h2>

      <div className="mb-8 flex gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
          U
        </div>
        <input
          type="text"
          placeholder="Add a comment…"
          className="flex-1 border-b border-gray-300 bg-transparent py-1 text-sm placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Comment list - recursive */}
      <div className="space-y-1 divide-y divide-gray-100">
        {SAMPLE_COMMENTS.map((comment) => (
          <div key={comment.id} className="pt-1">
            <CommentCard comment={comment} depth={0} />
          </div>
        ))}
      </div>
    </div>
  );
};
