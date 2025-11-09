"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/lib/api";

export default function ViewerPage() {
  const router = useRouter();
  const params = useSearchParams();
  const spaceId = params.get("space_id");
  const pin = params.get("pin");
  const index = Number(params.get("index") ?? 0);

  const [media, setMedia] = useState<any[]>([]);
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${pin}`);
      const data = await res.json();
      setMedia(data);
    }
    load();
  }, [spaceId, pin]);

  const next = () => setCurrent((c) => (c + 1) % media.length);
  const prev = () => setCurrent((c) => (c - 1 + media.length) % media.length);

  if (!media.length) return null;
  const item = media[current];

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 text-white">
      {/* Back */}
      <button onClick={() => router.back()} className="absolute top-4 left-4 text-3xl">←</button>

      {/* Next / Previous */}
      {media.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 text-4xl">‹</button>
          <button onClick={next} className="absolute right-4 top-1/2 text-4xl">›</button>
        </>
      )}

      {item.file_type?.startsWith("video") ? (
        <video src={item.file_url} controls playsInline className="max-h-[90vh] max-w-[90vw] rounded" />
      ) : (
        <img src={item.file_url} className="max-h-[90vh] max-w-[90vw] rounded" />
      )}
    </div>
  );
}
