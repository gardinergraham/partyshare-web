"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { API_BASE_URL } from "@/lib/api";
import { Edit2, Trash2 } from "lucide-react";

// ✅ Dynamic player (no SSR issues)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

export default function GuestGalleryPage() {
  const params = useSearchParams();
  const spaceId = params.get("space_id");
  const guestName = params.get("guest_name") || "";
  const pin = params.get("pin") || "";
  const partyName = params.get("party_name") || "";

  const [media, setMedia] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [tab, setTab] = useState<"gallery" | "guestbook">("gallery");
  const [uploading, setUploading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // ✅ Fetch Media
  async function fetchMedia() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/guest-space/${spaceId}?guest_pin=${pin}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Media load failed:", err);
    }
  }

  // ✅ Fetch Guestbook
  async function fetchGuestbook() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/guestbook/${spaceId}?guest_pin=${pin}&party_name=${encodeURIComponent(
          partyName
        )}&guest_name=${encodeURIComponent(guestName)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Guestbook load failed:", err);
    }
  }

  useEffect(() => {
    if (!spaceId) return;
    fetchMedia();
    fetchGuestbook();
  }, [spaceId]);

  // ✅ Upload
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const form = new FormData();
    form.append("space_id", spaceId!);
    form.append("guest_pin", pin);
    form.append("party_name", partyName);
    form.append("guest_name", guestName);
    form.append("file_type", file.type);
    form.append("file", file);

    const res = await fetch(`${API_BASE_URL}/guest/upload`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.detail || "Upload failed.");
      setUploading(false);
      return;
    }

    setUploading(false);
    fetchMedia();
  }

  // ✅ Save / Edit / Send message
  async function handleMessageSave() {
    if (!messageText.trim()) return;

    const form = new FormData();
    form.append("message", messageText.trim());

    if (editing) {
      await fetch(
        `${API_BASE_URL}/guestbook/${editing.id}?guest_pin=${pin}&guest_name=${encodeURIComponent(
          guestName
        )}`,
        { method: "PUT", body: form }
      );
      setEditing(null);
    } else {
      form.append("space_id", spaceId!);
      form.append("guest_pin", pin);
      form.append("party_name", partyName);
      form.append("guest_name", guestName);
      await fetch(`${API_BASE_URL}/guestbook`, { method: "POST", body: form });
    }

    setMessageText("");
    fetchGuestbook();
  }

  // ✅ Delete Media
  async function handleDeleteMedia(id: string) {
    await fetch(
      `${API_BASE_URL}/guest/${id}?guest_pin=${pin}&party_name=${encodeURIComponent(
        partyName
      )}&guest_name=${encodeURIComponent(guestName)}`,
      { method: "DELETE" }
    );
    fetchMedia();
  }

  // ✅ Delete Message
  async function handleDeleteMessage(id: string) {
    await fetch(
      `${API_BASE_URL}/guestbook/${id}?guest_pin=${pin}&party_name=${encodeURIComponent(
        partyName
      )}&guest_name=${encodeURIComponent(guestName)}`,
      { method: "DELETE" }
    );
    fetchGuestbook();
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-[#e94560] mb-6">{partyName}</h1>

      {/* TABS */}
      <div className="flex justify-center gap-6 mb-6">
        <button onClick={() => setTab("gallery")}
          className={`px-4 py-2 rounded-lg ${tab === "gallery" ? "bg-[#e94560]" : "bg-[#1b263b]"}`}>
          Gallery
        </button>
        <button onClick={() => setTab("guestbook")}
          className={`px-4 py-2 rounded-lg ${tab === "guestbook" ? "bg-[#e94560]" : "bg-[#1b263b]"}`}>
          Guestbook
        </button>
      </div>

      {/* GALLERY */}
      {tab === "gallery" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {media.map((item, index) => (
              <motion.div key={item.id}
                className="relative group rounded-xl overflow-hidden border border-white/10 cursor-pointer"
                onClick={() => setSelectedIndex(index)}>

                {/* ✅ Thumbnail logic */}
                {item.file_type?.startsWith("video") ? (
                  <div className="w-full aspect-[4/3] bg-black flex items-center justify-center text-xs text-gray-400">
                    🎥 Video
                  </div>
                ) : (
                  <img src={item.file_url} className="w-full h-full object-cover" />
                )}

                {/* ✅ name tag */}
                <p className="absolute bottom-1 left-1 text-xs bg-black/60 px-2 py-1 rounded">
                  {item.uploader_name || item.guest_name || "Guest"}
                </p>

                {/* ✅ delete button */}
                {item.uploader_name?.trim().toLowerCase() === guestName.trim().toLowerCase() && (
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteMedia(item.id); }}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 p-1 rounded-full">
                    <Trash2 size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Upload */}
          <div className="text-center mt-6">
            <label className="cursor-pointer bg-[#e94560] px-5 py-3 rounded-lg inline-block">
              {uploading ? "Uploading..." : "Upload Media"}
              <input type="file" hidden accept="image/*,video/*" onChange={handleUpload} />
            </label>
          </div>

          {/* Fullscreen Viewer */}
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                onClick={() => setSelectedIndex(null)}>
                <motion.div key={media[selectedIndex]?.id}
                  className="max-w-5xl w-full h-[80vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}>

                  {media[selectedIndex]?.file_type?.startsWith("video") ? (
                    <ReactPlayer url={media[selectedIndex].file_url} playing controls width="100%" height="100%" />
                  ) : (
                    <img src={media[selectedIndex].file_url} className="max-h-full max-w-full rounded-lg" />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* GUESTBOOK */}
      {tab === "guestbook" && (
        <div className="max-w-lg mx-auto">
          {messages.map((m) => (
            <div key={m.id} className="bg-[#1a1a2e] p-4 rounded-lg mb-3">
              <p className="text-[#e94560]">{m.guest_name}</p>
              <p>{m.message}</p>

              {m.guest_name?.toLowerCase() === guestName.toLowerCase() && (
                <div className="flex gap-3 mt-2">
                  <button onClick={() => { setEditing(m); setMessageText(m.message); }}>
                    <Edit2 size={18} className="text-blue-400" />
                  </button>
                  <button onClick={() => handleDeleteMessage(m.id)}>
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Input */}
          <div className="flex gap-2 mt-4">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={editing ? "Edit your message..." : "Write a message..."}
              className="flex-1 bg-[#1a1a2e] p-2 rounded-lg"
            />
            <button onClick={handleMessageSave} className="bg-[#e94560] px-4 py-2 rounded-lg">
              {editing ? "Save" : "Send"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setMessageText(""); }} className="bg-gray-600 px-4 py-2 rounded-lg">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
