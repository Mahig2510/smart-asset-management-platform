"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Asset } from "@/types/asset";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentUser, setCurrentUser] =
  useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
  useState("ALL");

  useEffect(() => {
  fetchAssets();
  fetchCurrentUser();
}, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("/api/assets");

      setAssets(response.data.assets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCurrentUser = async () => {
  try {
    const response =
      await axios.get("/api/me");

    setCurrentUser(
      response.data.user
    );
  } catch (error) {
    console.error(error);
  }
};

  const filteredAssets = assets.filter(
  (asset) => {
    const matchesSearch =
      asset.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      asset.assetId
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" ||
      asset.category?.name ===
        selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold">
    Assets
  </h1>

  {currentUser?.role === "ADMIN" && (
  <Link
    href="/dashboard/assets/create"
    className="rounded bg-black px-4 py-2 text-white"
  >
    + Create Asset
  </Link>
)}
</div>

<div className="mb-6 flex gap-4">
  <input
    type="text"
    placeholder="Search assets..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="w-full rounded border p-2"
  />

  <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(
        e.target.value
      )
    }
    className="rounded border p-2"
  >
    <option value="ALL">
      All Categories
    </option>

    {[
      ...new Set(
        assets.map(
          (asset) =>
            asset.category?.name
        )
      ),
    ].map((category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    ))}
  </select>
</div>+-

      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-3 text-left">
                  Asset ID
                </th>

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                Total Qty
                </th>

                <th className="p-3 text-left">
                Available Qty
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Location
                </th>

                {currentUser?.role === "ADMIN" && (
               <th className="p-3 text-left">
                Actions
                </th>
              )}
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((asset) => (
                <tr
                  key={asset._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {asset.assetId}
                  </td>

                  <td className="p-3">
                    {asset.name}
                  </td>

                  <td className="p-3">
                    {asset.category?.name}
                  </td>

                  <td className="p-3">
                  {asset.totalQuantity}
                  </td>

                  <td className="p-3">
                   {asset.availableQuantity}
                  </td>

                  <td className="p-3">
                    {asset.status}
                  </td>

                  <td className="p-3">
                    {asset.location}
                  </td>
                 <td className="p-3">
  <div className="flex gap-2">
    <Link
      href={`/dashboard/assets/${asset._id}`}
      className="rounded bg-blue-500 px-2 py-1 text-white text-sm"
    >
      View
    </Link>

    {currentUser?.role === "ADMIN" && (
      <>
        <Link
          href={`/dashboard/assets/${asset._id}/edit`}
          className="rounded bg-yellow-500 px-2 py-1 text-white text-sm"
        >
          Edit
        </Link>

        <button
          onClick={async () => {
            const confirmed =
              window.confirm(
                "Delete this asset?"
              );

            if (!confirmed) return;

            try {
              await axios.delete(
                `/api/assets/${asset._id}`
              );

              fetchAssets();
            } catch (error) {
              console.error(error);
              alert(
                "Failed to delete asset"
              );
            }
          }}
          className="rounded bg-red-500 px-2 py-1 text-white text-sm"
        >
          Delete
        </button>
      </>
    )}
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}