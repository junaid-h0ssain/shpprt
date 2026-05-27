import LoadingSpinner from "#/components/LoadingSpinner";
import ProductCard from "#/components/ProductCard";
import useAuthReq from "#/lib/hooks/useAuthReq";
import { useProducts } from "#/lib/hooks/useProducts";
import useUserSync from "#/lib/hooks/useUserSync";
import { SignInButton } from "@clerk/tanstack-react-start";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PackageIcon, SparklesIcon } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { data: products = [], isLoading, error } = useProducts();
  const { isClerkLoaded } = useAuthReq();

  useUserSync();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    );
  }

  if (!isClerkLoaded) return <div>Auth not loaded</div>;

  return (
    <div className="space-y-10">
      <div className="hero rounded-box overflow-hidden bg-linear-to-br from-base-300 via-base-200 to-base-300">
        <div className="hero-content flex-col gap-10 py-10 lg:flex-row-reverse">
          <div className="relative">
            <div className="absolute inset-0 scale-110 rounded-full bg-primary/20 blur-3xl" />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              Share Your <span className="text-primary">Products</span>
            </h1>
            <p className="py-4 text-base-content/60">
              Upload, discover, and connect with creators.
            </p>
            <SignInButton mode="modal">
              <button className="btn btn-primary">
                <SparklesIcon className="size-4" />
                Start Selling
              </button>
            </SignInButton>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <PackageIcon className="size-5 text-primary" />
          All Products
        </h2>

        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center py-16 text-center">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">
                No products yet
              </h3>
              <p className="text-sm text-base-content/40">
                Be the first to share something!
              </p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
