import { Link } from "@tanstack/react-router";
import { MessageCircleIcon } from "lucide-react";
import type { Product } from "../lib/types";

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;
  const commentsCount = product.comments?.length ?? 0;
  const creatorName = product.user?.name ?? "Unknown creator";
  const creatorImage = product.user?.imageUrl ?? "";

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="card bg-base-300 transition-colors hover:bg-base-200"
    >
      <figure className="px-4 pt-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-40 w-full rounded-xl object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">
          {product.title}
          {isNew && <span className="badge badge-secondary badge-sm">NEW</span>}
        </h2>
        <p className="line-clamp-2 text-sm text-base-content/70">
          {product.description}
        </p>

        <div className="divider my-1"></div>

        <div className="flex items-center justify-between">
          {product.user && (
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-6 rounded-full ring-1 ring-primary">
                  <img src={creatorImage} alt={creatorName} />
                </div>
              </div>
              <span className="text-xs text-base-content/60">
                {creatorName}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 text-base-content/50">
            <MessageCircleIcon className="size-3" />
            <span className="text-xs">{commentsCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
