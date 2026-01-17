"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";
import { ChevronLeft, ChevronRight, ArrowLeft, Loader2, X , Trash2 } from "lucide-react";

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
          `${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${pin}`
        );
        const data = await res.json();
        setMedia(Array.isArray(data) ? data : data?.media ?? []);
      } catch (err) {
        console.error("Failed to load media:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [spaceId, pin]);


  async function handleDelete() {
  if (!confirm("Delete this upload?")) return;

  const item = media[current];

  await fetch(
    `${API_BASE_URL}/api/media/guest/${item.id}?guest_pin=${encodeURIComponent(
      pin
    )}&party_name=${encodeURIComponent(
      params.get("party_name") ?? ""
    )}&guest_name=${encodeURIComponent(
      params.get("guest_name") ?? ""
    )}`,
    { method: "DELETE" }
  );

  // remove from local state
  const updated = media.filter((_, i) => i !== current);
  setMedia(updated);

  if (updated.length === 0) {
    router.back();
  } else {
    setCurrent((c) => Math.max(0, c - 1));
  }
}


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
    <div className="fixed inset-0 bg-black">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-pink-950/20" />
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Navigation Controls */}
        {media.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Counter */}
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white font-medium border border-white/10">
              <span className="text-pink-400">{current + 1}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-300">{media.length}</span>
            </div>

            <button
              onClick={next}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
        {/* Delete Button (only if uploader is current guest) */}
          {item.uploader_name?.trim().toLowerCase() ===
            (params.get("guest_name") ?? "").trim().toLowerCase() && (
            <button
              onClick={handleDelete}
              className="p-3 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition-all duration-300 border border-red-400/30 hover:border-red-400"
            >
              <Trash2 size={20} />
            </button>
          )}

        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 border border-white/10 hover:border-white/20"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Media Area */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="max-w-[95vw] max-h-[85vh] flex items-center justify-center"
          >
            {item.file_type?.startsWith("video") ? (
              <video
                src={item.file_url}
                controls
                playsInline
                autoPlay
                className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="relative">
                {/* Loading Spinner for Image */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-pink-400 animate-spin" />
                  </div>
                )}
                <img
                  src={item.file_url}
                  className={cn(
                    "max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl select-none transition-opacity duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  alt=""
                  draggable={false}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Navigation Buttons (Desktop) */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-110"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-110"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Uploader Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm border border-white/10">
          Uploaded by{" "}
          <span className="text-pink-400 font-medium">
            {item.uploader_name ||
              item.guest_name ||
              item.uploaded_by?.replace("guest_", "") ||
              "Guest"}
          </span>
        </div>
      </div>
    </div>
  );
}