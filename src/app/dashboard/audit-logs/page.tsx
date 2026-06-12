"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AuditLogsPage() {
  const [logs, setLogs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response =
        await axios.get(
          "/api/audit-logs"
        );

      setLogs(response.data.logs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">
        Audit Logs
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-3 text-left">
                  Action
                </th>

                <th className="p-3 text-left">
                  Description
                </th>

                <th className="p-3 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {log.action}
                  </td>

                  <td className="p-3">
                    {log.description}
                  </td>

                  <td className="p-3">
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
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