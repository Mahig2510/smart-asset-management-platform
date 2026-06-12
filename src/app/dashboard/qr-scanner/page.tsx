"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function QRScannerPage() {
  const router = useRouter();

  const initialized = useRef(false);

useEffect(() => {
  if (initialized.current) return;

  initialized.current = true;
    let scanner: any;

    const startScanner = async () => {
      const { Html5Qrcode } =
        await import("html5-qrcode");

      scanner =
        new Html5Qrcode(
          "qr-reader"
        );

      scanner.start(
        {
          facingMode: "environment",
        },
        {
          fps: 10,
          qrbox: 250,
        },
        async (
          decodedText: string
        ) => {
          try {
            const qrData =
              JSON.parse(
                decodedText
              );

            const response =
              await axios.get(
                `/api/assets/scan?assetId=${qrData.assetId}`
              );

            const asset =
              response.data.asset;

            await scanner.stop();

            await scanner.clear();

            scanner = null;

            router.push(
            `/dashboard/assets/${asset._id}`
        );
          } catch (error) {
            console.error(error);
          }
        },
        () => {}
      );
    };

    startScanner();

   return () => {
  try {
    if (scanner) {
      scanner.stop();
      scanner.clear();
    }
  } catch (error) {
    console.log(error);
  }
};
  }, [router]);

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">
        QR Scanner
      </h1>

      <div
        id="qr-reader"
        className="mx-auto w-full max-w-lg rounded-lg border bg-white p-4"
      />
    </DashboardLayout>
  );
}