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
    <div className="fixed inset-0 bg-black flex flex-col">
      
      {/* Top Bar with Back Button and Counter */}
      <div className="flex justify-between items-center p-4 bg-black/80 backdrop-blur-sm z-10">
        <button
          onClick={() => router.back()}
          className="text-lg bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-colors"
        >
          ← Back
        </button>
        
        {media.length > 1 && (
          <div className="bg-black/50 px-4 py-2 rounded-lg text-lg">
            {current + 1} / {media.length}
          </div>
        )}
      </div>

      {/* Media Area - Takes most of the screen */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
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

      {/* Bottom Navigation */}
      {media.length > 1 && (
        <div className="flex justify-center gap-8 p-4 bg-black/80 backdrop-blur-sm z-10">
          <button
            onClick={prev}
            className="text-xl bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl transition-colors min-w-32"
          >
            ‹ Previous
          </button>

          <button
            onClick={next}
            className="text-xl bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl transition-colors min-w-32"
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}