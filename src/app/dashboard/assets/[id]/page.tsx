"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AssetDetailsPage() {
  const params = useParams();

  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showRequestForm, setShowRequestForm] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [purpose, setPurpose] =
    useState("");

  useEffect(() => {
    fetchAsset();
  }, []);

  const fetchAsset = async () => {
    try {
      const response = await axios.get(
        `/api/assets/${params.id}`
      );

      setAsset(response.data.asset);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submitRequest = async () => {
    try {
      const userResponse =
        await axios.get("/api/me");

      const userId =
        userResponse.data.user.userId;

      await axios.post(
        "/api/requests",
        {
          user: userId,
          asset: asset._id,
          quantity,
          startDate,
          endDate,
          purpose,
        }
      );

      alert(
        "Request submitted successfully"
      );

      setShowRequestForm(false);

      setQuantity(1);
      setStartDate("");
      setEndDate("");
      setPurpose("");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to submit request"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading asset...</p>
      </DashboardLayout>
    );
  }

  if (!asset) {
    return (
      <DashboardLayout>
        <p>Asset not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Asset Details
      </h1>

      <div className="rounded-lg border bg-white p-6 space-y-4">
        <div>
          <strong>Asset ID:</strong>{" "}
          {asset.assetId}
        </div>

        <div>
          <strong>Name:</strong>{" "}
          {asset.name}
        </div>

        <div>
          <strong>Category:</strong>{" "}
          {asset.category?.name}
        </div>

        <div>
          <strong>Total Quantity:</strong>{" "}
          {asset.totalQuantity}
        </div>

        <div>
          <strong>
            Available Quantity:
          </strong>{" "}
          {asset.availableQuantity}
        </div>

        <div>
          <strong>Status:</strong>{" "}
          {asset.status}
        </div>

        <div>
          <strong>Condition:</strong>{" "}
          {asset.condition}
        </div>

        <div>
          <strong>
            Maintenance Notes:
          </strong>{" "}
          {asset.maintenanceNotes ||
            "N/A"}
        </div>

        <div>
          <strong>Location:</strong>{" "}
          {asset.location}
        </div>

        <div>
          <strong>
            Serial Number:
          </strong>{" "}
          {asset.serialNumber}
        </div>

        <div>
          <strong>
            Purchase Cost:
          </strong>{" "}
          ₹{asset.purchaseCost}
        </div>

        <div>
          <strong>
            Description:
          </strong>{" "}
          {asset.description}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() =>
            setShowRequestForm(
              !showRequestForm
            )
          }
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Request Asset
        </button>
      </div>

      {showRequestForm && (
        <div className="mt-6 rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Request Asset
          </h2>

          <div className="space-y-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(
                    e.target.value
                  )
                )
              }
              placeholder="Quantity"
              className="w-full rounded border p-2"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="w-full rounded border p-2"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="w-full rounded border p-2"
            />

            <textarea
              value={purpose}
              onChange={(e) =>
                setPurpose(
                  e.target.value
                )
              }
              placeholder="Purpose"
              className="w-full rounded border p-2"
            />

            <button
              onClick={submitRequest}
              className="rounded bg-green-600 px-4 py-2 text-white"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}