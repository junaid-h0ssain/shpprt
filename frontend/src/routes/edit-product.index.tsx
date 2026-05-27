import EditProductForm from '#/components/EditProductForm';
import LoadingSpinner from '#/components/LoadingSpinner';
import { useProduct, useUpdateProduct } from '#/lib/hooks/useProducts';
import { useAuth } from '@clerk/tanstack-react-start';
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/edit-product/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();
  
    const { data: product, isLoading } = useProduct(id);
    const updateProduct = useUpdateProduct();
  
    if (isLoading) return <LoadingSpinner />;
  
    if (!product || product.userId !== userId) {
      return (
        <div className="card bg-base-300 max-w-md mx-auto">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-error">{!product ? "Not found" : "Access denied"}</h2>
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
              onSuccess: () => navigate(`/product/${id}`),
            }
          );
        }}
      />
    );
}
