"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";
import { ChevronLeft, ChevronRight, ArrowLeft, Loader2, X, Trash2 } from "lucide-react";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewMediaPageInner() {
  const params = useSearchParams();
  const router = useRouter();

  const index = Number(params.get("index")) || 0;
  const spaceId = params.get("space_id") ?? "";
  const pin = params.get("pin") ?? "";

  const [media, setMedia] = useState<any[]>([]);
  const [current, setCurrent] = useState(index);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${encodeURIComponent(pin)}`
        );

        if (!res.ok) {
          console.error("Failed to fetch media:", res.status);
          setMedia([]);
          return;
        }

        const data = await res.json();
        const mediaItems = Array.isArray(data?.media) ? data.media : [];

        setMedia(mediaItems);
        setCurrent(index < mediaItems.length ? index : 0);
      } catch (err) {
        console.error("Failed to load media:", err);
        setMedia([]);
      } finally {
        setLoading(false);
      }
    }

    if (spaceId && pin) load();
  }, [spaceId, pin, index]);

  async function handleDelete() {
    if (!confirm("Delete this upload?")) return;

    const item = media[current];

    const res = await fetch(
      `${API_BASE_URL}/api/media/guest/${item.id}?guest_pin=${encodeURIComponent(
        pin
      )}&party_name=${encodeURIComponent(
        params.get("party_name") ?? ""
      )}&guest_name=${encodeURIComponent(
        params.get("guest_name") ?? ""
      )}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      alert("❌ You can only delete your own uploads");
      return;
    }

    const updated = media.filter((_, i) => i !== current);
    setMedia(updated);

    if (updated.length === 0) {
      router.back();
    } else {
      setCurrent((c) => Math.max(0, c - 1));
    }
  }

  const guestNameParam = (params.get("guest_name") ?? "").trim().toLowerCase();

  const isOwnMedia = (item: any) => {
    if (!guestNameParam) return false;

    if (
      item.guest_name?.trim().toLowerCase() === guestNameParam ||
      item.uploader_name?.trim().toLowerCase() === guestNameParam
    ) {
      return true;
    }

    return item.uploaded_by === `guest_${pin}`;
  };

  // Reset image loaded state when changing media
  useEffect(() => {
    setImageLoaded(false);
  }, [current]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % media.length);
  }, [media.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + media.length) % media.length);
  }, [media.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, router]);

  // Get display name for media
  const getUploaderName = (item: any) => {
    return item.uploader_name || item.guest_name || "Guest";
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-pink-400 animate-spin mb-4" />
          <p className="text-gray-400">Loading media...</p>
        </div>
      </div>
    );
  }

  if (!media.length) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-4">
          <p className="text-gray-400 mb-4">No media found</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const item = media[current];

return (
  <div className="fixed inset-0 bg-black flex justify-center overflow-hidden">
    {/* Ambient Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-pink-950/20" />
    </div>

    {/* CENTER RAIL */}
    <div className="relative z-10 w-full max-w-5xl flex flex-col">

      {/* HEADER */}
      <div className="z-20 shrink-0 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex justify-center p-3 sm:p-4">
          <div className="flex items-center gap-4 sm:gap-5">

            {/* Back */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Nav controls */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="p-2 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                  <ChevronLeft size={18} />
                </button>

                <div
                  className="
                    px-4 py-2
                    w-[64px] sm:w-[72px]
                    flex-shrink-0
                    text-center
                    rounded-xl
                    bg-white/10
                    text-white font-medium
                    border border-white/10
                  "
                >
                  <span className="text-pink-400">{current + 1}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-300">{media.length}</span>
                </div>

                <button
                  onClick={next}
                  className="p-2 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Delete */}
            {isOwnMedia(item) && (
              <button
                onClick={handleDelete}
                className="p-2 sm:p-3 rounded-xl bg-red-500/80 hover:bg-red-500 text-white border border-red-400/30"
              >
                <Trash2 size={18} />
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => router.back()}
              className="p-2 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10"
            >
              <X size={18} />
            </button>

          </div>
        </div>
      </div>

      {/* MEDIA VIEW */}
        <div
          className="
            relative
            flex-1
            flex
            items-center
            justify-center
            p-2 sm:p-4
            min-h-0
            overflow-hidden
          "
        >

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex items-center justify-center"
          >
            {item.file_type?.startsWith("video") ? (
             <video
              src={item.file_url}
              controls
              playsInline
              autoPlay
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              style={{ maxHeight: "calc(100vh - 220px)" }}
            />

            ) : (
              <img
                src={item.file_url}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl select-none"
                style={{ maxHeight: "calc(100vh - 220px)" }}
                alt=""
                draggable={false}
              />

            )}
          </motion.div>
        </AnimatePresence>

        {/* Desktop side arrows stay screen-relative */}
        {media.length > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={next}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="z-20 shrink-0 bg-black/90 backdrop-blur-sm border-t border-white/10 p-3 sm:p-4 flex justify-center">
        <div className="px-5 py-2 rounded-full bg-white/10 text-white text-sm border border-white/10">
          Uploaded by{" "}
          <span className="text-pink-400 font-semibold">
            {getUploaderName(item)}
          </span>
        </div>
      </div>

    </div>
  </div>
);

}