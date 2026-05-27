import EditProductForm from "#/components/EditProductForm";
import LoadingSpinner from "#/components/LoadingSpinner";
import { useProduct, useUpdateProduct } from "#/lib/hooks/useProducts";
import { useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/edit-product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;

  if (error || !product || product.userId !== userId) {
    return (
      <div className="card mx-auto max-w-md bg-base-300">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product ? "Not found" : "Access denied"}
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          {
            onSuccess: () => navigate({ to: "/product/$id", params: { id } }),
          },
        );
      }}
    />
  );
}
