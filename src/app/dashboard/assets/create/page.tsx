"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Category } from "@/types/category";
import { toast } from "sonner";

export default function CreateAssetPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    assetId: "",
    name: "",
    description: "",
    category: "",
    serialNumber: "",
    purchaseCost: "",
    location: "",
    totalQuantity: "1",
    availableQuantity: "1",
    maintenanceNotes: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");

      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/assets", {
        assetId: formData.assetId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        serialNumber: formData.serialNumber,
        purchaseCost: Number(formData.purchaseCost),
        location: formData.location,
        totalQuantity: Number(formData.totalQuantity),
        availableQuantity: Number(
          formData.availableQuantity
        ),
        maintenanceNotes:
          formData.maintenanceNotes,
        });

      router.push("/dashboard/assets");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Create Asset
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border bg-white p-6"
        >
          <div>
            <label className="block mb-2">
              Asset ID
            </label>

            <input
              type="text"
              name="assetId"
              value={formData.assetId}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              Asset Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border p-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Serial Number
            </label>

            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block mb-2">
              Purchase Cost
            </label>

            <input
              type="number"
              name="purchaseCost"
              value={formData.purchaseCost}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>


           <div>
  <label className="block mb-2">
    Total Quantity
  </label>

  <input
    type="number"
    name="totalQuantity"
    value={formData.totalQuantity}
    onChange={handleChange}
    className="w-full rounded border p-2"
  />
</div>

<div>
  <label className="block mb-2">
    Available Quantity
  </label>

  <input
    type="number"
    name="availableQuantity"
    value={formData.availableQuantity}
    onChange={handleChange}
    className="w-full rounded border p-2"
  />
</div>

<div>
  <label className="block mb-2">
    Maintenance Notes
  </label>

  <textarea
    name="maintenanceNotes"
    value={formData.maintenanceNotes}
    onChange={handleChange}
    className="w-full rounded border p-2"
    rows={3}
  />
</div>

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white"
          >
            {loading
              ? "Creating..."
              : "Create Asset"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}