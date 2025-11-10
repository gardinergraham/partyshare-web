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
    <div className="fixed inset-0 bg-black flex flex-col items-center p-4 text-white">
      
      {/* Fixed Back Button - Top Left */}
      <div className="fixed top-4 left-4 z-10">
        <button
          onClick={() => router.back()}
          className="text-lg bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-colors backdrop-blur-sm"
        >
          ← Back
        </button>
      </div>

      {/* Fixed Prev/Next Buttons - Bottom Center */}
      {media.length > 1 && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-6 px-4 z-10">
          <button
            onClick={prev}
            className="text-xl bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-colors backdrop-blur-sm min-w-32"
          >
            ‹ Previous
          </button>

          <button
            onClick={next}
            className="text-xl bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-colors backdrop-blur-sm min-w-32"
          >
            Next ›
          </button>
        </div>
      )}

      {/* Media Container - Takes remaining space */}
      <div className="flex items-center justify-center w-full h-full pt-12 pb-20"> {/* Padding for buttons */}
        <div className="max-w-full max-h-full flex items-center justify-center">
          {item.file_type?.startsWith("video") ? (
            <video
              src={item.file_url}
              controls
              playsInline
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          ) : (
            <img
              src={item.file_url}
              className="max-h-full max-w-full object-contain rounded-lg select-none"
              alt=""
              draggable={false}
            />
          )}
        </div>
      </div>

      {/* Current Index Indicator */}
      {media.length > 1 && (
        <div className="fixed top-4 right-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
          {current + 1} / {media.length}
        </div>
      )}
    </div>
  );
}
