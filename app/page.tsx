import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f23] text-white grid place-items-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold mb-4">PartyShare (Web)</h1>
        <p className="text-gray-300 mb-8">
          Join events, upload photos, and view the live guest gallery — no app required.
        </p>
        <Link
          href="/guest-gallery"
          className="inline-block rounded-xl bg-[#e94560] px-6 py-3 font-semibold hover:opacity-90"
        >
          Open Guest Gallery
        </Link>
      </div>
    </main>
  );
}
