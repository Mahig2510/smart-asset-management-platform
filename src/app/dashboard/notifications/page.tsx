"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const response =
          await axios.get(
            "/api/notifications"
          );

        setNotifications(
          response.data.notifications
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">
        Notifications
      </h1>

      {loading ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-500 shadow-sm">
         Loading notifications...
        </p>
      ) : notifications.length ===
        0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm">
  <h2 className="text-xl font-semibold">
    No Notifications
  </h2>

  <p className="mt-2 text-slate-500">
    You have no notifications yet.
  </p>
</div>
      ) : (
        <div className="space-y-4">
          {notifications.map(
            (notification) => (
              <div
                key={
                  notification._id
                }
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">
                  {notification.title}
                </h2>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </span>
                </div>

                <p className="mt-2 text-gray-600">
                  {
                    notification.message
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </DashboardLayout>
  );
}