import { Link } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SaveIcon,
  TypeIcon,
} from "lucide-react";
import { useState } from "react";
import type { Product, ProductFormData } from "../lib/types";

interface EditProductFormProps {
  product: Product;
  isPending: boolean;
  isError: boolean;
  onSubmit: (formData: ProductFormData) => void;
}

function EditProductForm({
  product,
  isPending,
  isError,
  onSubmit,
}: EditProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  return (
    <div className="mx-auto max-w-lg">
      <Link to="/profile" className="btn btn-ghost btn-sm mb-4 gap-1">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SaveIcon className="size-5 text-primary" />
            Edit Product
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            className="mt-4 space-y-4"
          >
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Product title"
                className="grow"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="url"
                placeholder="Image URL"
                className="grow"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </label>

            {formData.imageUrl && (
              <div className="overflow-hidden rounded-box">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-40 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 rounded-box border border-base-300 bg-base-200 p-3">
                <FileTextIcon className="mt-1 size-4 text-base-content/50" />
                <textarea
                  placeholder="Description"
                  className="min-h-24 grow resize-none bg-transparent focus:outline-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to update. Try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProductForm;
