"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export default function ViewMediaPageInner() {
  const params = useSearchParams();
  const router = useRouter();

  const index = Number(params.get("index")) || 0;
  const spaceId = params.get("space_id") ?? "";
  const pin = params.get("pin") ?? "";

  const [media, setMedia] = useState<any[]>([]);
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${pin}`
      );
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    }
    load();
  }, [spaceId, pin]);

  if (!media.length) return null;
  const item = media[current];

  const next = () => setCurrent((c) => (c + 1) % media.length);
  const prev = () => setCurrent((c) => (c - 1 + media.length) % media.length);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 text-white">
      
       {/* Media */}
         <div className="flex flex-col items-center justify-center flex-1 w-full max-w-6xl">
      {item.file_type?.startsWith("video") ? (
        <video
          src={item.file_url}
          controls
          playsInline
           className="max-h-[70vh] max-w-full object-contain rounded-lg"
        />
      ) : (
        <img
          src={item.file_url}
          className="max-h-[70vh] max-w-full object-contain rounded-lg select-none"
          alt=""
          draggable={false}
        />
      )}
    {/* Back */}
  <button
    onClick={() => router.back()}
    className="text-lg bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl"
  >
    ← Back
  </button>
        {/* Prev / Next */}
        {media.length > 1 && (
    <div className="w-full flex justify-center gap-12 py-4 mt-4">
        <button
        onClick={prev}
        className="text-xl bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl"
        >
        ‹ Previous
        </button>

        <button
        onClick={next}
        className="text-xl bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl"
        >
        Next ›
        </button>
    </div>
    )}
    </div>
    </div>
  );
}
