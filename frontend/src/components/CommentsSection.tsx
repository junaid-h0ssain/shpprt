import { SignInButton, useAuth } from "@clerk/tanstack-react-start";
import {
  LogInIcon,
  MessageSquareIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { useCreateComment, useDeleteComment } from "../lib/hooks/useComments";
import type { Comment } from "../lib/types";

interface CommentsSectionProps {
  productId: string;
  comments?: Comment[];
  currentUserId?: string | null;
}

function CommentsSection({
  productId,
  comments = [],
  currentUserId,
}: CommentsSectionProps) {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment(productId);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    createComment.mutate(
      { productId, content },
      { onSuccess: () => setContent("") },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-primary" />
        <h3 className="font-bold">Comments</h3>
        <span className="badge badge-neutral badge-sm">{comments.length}</span>
      </div>

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="input input-bordered input-sm flex-1 bg-base-200"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-square"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between rounded-lg bg-base-200 p-3">
          <span className="text-sm text-base-content/60">
            Sign in to join the conversation
          </span>
          <SignInButton mode="modal">
            <button type="button" className="btn btn-primary btn-sm gap-1">
              <LogInIcon className="size-4" />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      <div className="max-h-80 space-y-2 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="py-8 text-center text-base-content/50">
            <MessageSquareIcon className="mx-auto mb-2 size-8 opacity-30" />
            <p className="text-sm">No comments yet. Be first!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const commentAuthor = comment.user;
            const avatarSrc = commentAuthor?.imageUrl ?? "";
            const authorName = commentAuthor?.name ?? "Unknown user";

            return (
              <div key={comment.id} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    <img src={avatarSrc} alt={authorName} />
                  </div>
                </div>

                <div className="chat-header mb-2 text-xs opacity-70">
                  {authorName}
                  <time className="ml-2 text-xs opacity-50">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>

                <div className="chat-bubble chat-bubble-neutral text-sm">
                  {comment.content}
                </div>

                {currentUserId === comment.userId && (
                  <div className="chat-footer">
                    <button
                      type="button"
                      onClick={() =>
                        confirm("Delete?") &&
                        deleteComment.mutate({ commentId: comment.id })
                      }
                      className="btn btn-ghost btn-xs text-error"
                      disabled={deleteComment.isPending}
                    >
                      {deleteComment.isPending ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <Trash2Icon className="size-3" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
