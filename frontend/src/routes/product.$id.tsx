import CommentsSection from "#/components/CommentsSection";
import LoadingSpinner from "#/components/LoadingSpinner";
import { useDeleteProduct, useProduct } from "#/lib/hooks/useProducts";
import { useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  CalendarIcon,
  EditIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id);
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct.mutate(id, {
        onSuccess: () => navigate({ to: "/" }),
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="card mx-auto max-w-md bg-base-300">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product not found</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === product.userId;
  const comments = product.comments ?? [];
  const creatorName = product.user?.name ?? "Unknown creator";
  const creatorImage = product.user?.imageUrl ?? "";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="btn btn-ghost btn-sm gap-1">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              to="/edit-product/$id"
              params={{ id: product.id }}
              className="btn btn-ghost btn-sm gap-1"
            >
              <EditIcon className="size-4" /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm gap-1"
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <Trash2Icon className="size-4" />
              )}
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card bg-base-300">
          <figure className="p-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-80 w-full rounded-xl object-cover"
            />
          </figure>
        </div>

        <div className="card bg-base-300">
          <div className="card-body">
            <h1 className="card-title text-2xl">{product.title}</h1>

            <div className="my-2 flex flex-wrap gap-4 text-sm text-base-content/60">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="size-4" />
                {creatorName}
              </div>
            </div>

            <div className="divider my-2"></div>

            <p className="leading-relaxed text-base-content/80">
              {product.description}
            </p>

            {product.user && (
              <>
                <div className="divider my-2"></div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={creatorImage} alt={creatorName} />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{creatorName}</p>
                    <p className="text-xs text-base-content/50">Creator</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-300">
        <div className="card-body">
          <CommentsSection
            productId={id}
            comments={comments}
            currentUserId={userId}
          />
        </div>
      </div>
    </div>
  );
}
