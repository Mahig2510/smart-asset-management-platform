"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
export default function EditAssetPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    serialNumber: "",
    purchaseCost: "",
    location: "",
    totalQuantity: "",
    availableQuantity: "",
    maintenanceNotes: "",
  });

  useEffect(() => {
    fetchAsset();
  }, []);

  const fetchAsset = async () => {
    try {
      const response = await axios.get(
        `/api/assets/${params.id}`
      );

      const asset = response.data.asset;

      setFormData({
        name: asset.name || "",
        description: asset.description || "",
        serialNumber: asset.serialNumber || "",
        purchaseCost:
          asset.purchaseCost?.toString() || "",
        location: asset.location || "",
        totalQuantity:
          asset.totalQuantity?.toString() || "1",
        availableQuantity:
          asset.availableQuantity?.toString() || "1",
        maintenanceNotes:
          asset.maintenanceNotes || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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
      setSaving(true);

      await axios.patch(
        `/api/assets/${params.id}`,
        {
          ...formData,
          purchaseCost: Number(
            formData.purchaseCost
          ),
          totalQuantity: Number(
            formData.totalQuantity
          ),
          availableQuantity: Number(
            formData.availableQuantity
          ),
        }
      );

      router.push("/dashboard/assets");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update asset");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Edit Asset
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border bg-white p-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Asset Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <input
            type="text"
            name="serialNumber"
            placeholder="Serial Number"
            value={formData.serialNumber}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <input
            type="number"
            name="purchaseCost"
            placeholder="Purchase Cost"
            value={formData.purchaseCost}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <input
            type="number"
            name="totalQuantity"
            placeholder="Total Quantity"
            value={formData.totalQuantity}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <input
            type="number"
            name="availableQuantity"
            placeholder="Available Quantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <textarea
            name="maintenanceNotes"
            placeholder="Maintenance Notes"
            value={formData.maintenanceNotes}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <button
            type="submit"
            disabled={saving}
            className="rounded bg-black px-4 py-2 text-white"
          >
            {saving
              ? "Updating..."
              : "Update Asset"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}