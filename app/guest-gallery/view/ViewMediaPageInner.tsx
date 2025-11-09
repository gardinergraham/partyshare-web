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
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 text-white">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-3xl"
      >
        ←
      </button>

      {/* Prev / Next */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 text-4xl"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 text-4xl"
          >
            ›
          </button>
        </>
      )}

      {/* Media */}
      {item.file_type?.startsWith("video") ? (
        <video
          src={item.file_url}
          controls
          playsInline
          className="max-h-[90vh] max-w-[90vw] rounded"
        />
      ) : (
        <img
          src={item.file_url}
          className="max-h-[90vh] max-w-[90vw] rounded select-none"
          alt=""
          draggable={false}
        />
      )}
    </div>
  );
}
