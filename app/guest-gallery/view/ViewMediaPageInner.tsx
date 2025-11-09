"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

export default function ViewMediaPageInner() {
  const params = useSearchParams();
  const index = Number(params.get("index")) || 0;
  const spaceId = params.get("space_id") ?? "";
  const pin = params.get("pin") ?? "";
  const router = useRouter();

  const [media, setMedia] = useState<any[]>([]);
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${pin}`, { cache: "no-store" });
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    }
    load();
  }, [spaceId, pin]);

  const next = () => setCurrent((c) => (c + 1) % media.length);
  const prev = () => setCurrent((c) => (c - 1 + media.length) % media.length);

  if (!media.length) return null;
  const item = media[current];

  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) prev();
    if (dx < -50) next();
    startX.current = null;
  };

  return (
    <div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 text-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-3xl bg-black/40 px-3 py-1 rounded"
      >
        ←
      </button>

      {/* Media */}
      <div className="flex-1 flex items-center justify-center w-full">
        {item.file_type?.startsWith("video") ? (
          <video
            key={item.file_url}
            src={item.file_url}
            autoPlay
            controls
            playsInline
            onEnded={next}
            className="max-h-[85vh] max-w-[95vw] rounded"
          />
        ) : (
          <img
            key={item.file_url}
            src={item.file_url}
            className="max-h-[85vh] max-w-[95vw] rounded select-none"
            alt=""
            draggable={false}
          />
        )}
      </div>

      {/* Navigation */}
      {media.length > 1 && (
        <div className="w-full flex justify-center gap-12 py-4">
          <button
            onClick={prev}
            className="text-3xl bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
          >
            ‹ Prev
          </button>

          <button
            onClick={next}
            className="text-3xl bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
