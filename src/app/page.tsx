import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-6xl">
          <div className="mb-6 text-6xl">
            📦
          </div>

          <h1 className="mb-6 text-5xl font-extrabold text-slate-900 md:text-6xl">
            Smart Asset Management Platform
          </h1>

          <p className="mb-8 text-lg text-slate-600 md:text-xl">
            Manage assets, track allocations, approve requests,
            monitor inventory, scan QR codes, and generate
            analytics — all from a single platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-black px-8 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg border border-black px-8 py-4 font-semibold transition hover:bg-slate-100"
            >
              Register
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-3xl font-bold">
                500+
              </h3>

              <p className="text-slate-600">
                Assets Managed
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                100+
              </h3>

              <p className="text-slate-600">
                Requests Processed
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                50+
              </h3>

              <p className="text-slate-600">
                Users
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                99%
              </h3>

              <p className="text-slate-600">
                Inventory Accuracy
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold">
              Asset Management
            </h3>

            <p className="text-slate-600">
              Create, update, organize and manage
              institutional assets efficiently.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold">
              QR Tracking
            </h3>

            <p className="text-slate-600">
              Generate and scan QR codes for
              quick asset identification.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold">
              Analytics & Reports
            </h3>

            <p className="text-slate-600">
              Visualize requests, allocations,
              inventory status and usage trends.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">
            Key Features
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>✅ Asset Inventory Management</div>
            <div>✅ Request Approval Workflow</div>
            <div>✅ Asset Allocation & Returns</div>
            <div>✅ Notifications System</div>
            <div>✅ Audit Logs</div>
            <div>✅ QR Code Integration</div>
            <div>✅ Analytics Dashboard</div>
            <div>✅ Role Based Access Control</div>
          </div>
        </div>

        <footer className="mt-20 text-center text-sm text-slate-500">
          <p>
            Smart Asset Management Platform
          </p>

          <p className="mt-1">
            Built with Next.js, TypeScript,
            MongoDB and Tailwind CSS
          </p>
        </footer>
      </section>
    </main>
  );
}