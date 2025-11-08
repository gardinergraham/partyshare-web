"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { API_BASE_URL } from "@/lib/api";
import { Edit2, Trash2 } from "lucide-react";

// ✅ Dynamically import ReactPlayer (SSR-safe)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as unknown as React.FC<any>;

export default function GuestGalleryPage() {
  const params = useSearchParams();
  const spaceId = params.get("space_id");
  const guestName = params.get("guest_name");
  const pin = params.get("pin");
  const partyName = params.get("party_name");


  const [media, setMedia] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [tab, setTab] = useState<"gallery" | "guestbook">("gallery");
  const [uploading, setUploading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

 // ✅ Fetch media
async function fetchMedia() {
  try {
    const res = await fetch(
   `${API_BASE_URL}/media/guest-space?pin_code=${encodeURIComponent(pin || "")}&party_name=${encodeURIComponent(partyName || "")}`


    );
    const data = await res.json();
    setMedia(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to load media:", err);
  }
}

// ✅ Fetch guestbook
async function fetchGuestbook() {
  try {
    setLoadingMessages(true);
    const res = await fetch(
    `${API_BASE_URL}/guestbook?pin_code=${encodeURIComponent(pin || "")}&party_name=${encodeURIComponent(partyName || "")}`


    );
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to load guestbook:", err);
  } finally {
    setLoadingMessages(false);
  }
}


  // ⏳ Load on mount
  useEffect(() => {
    if (spaceId) {
      fetchMedia();
      fetchGuestbook();
      const interval = setInterval(() => {
        fetchMedia();
        fetchGuestbook();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [spaceId]);

  // ✅ Upload media
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const form = new FormData();
    form.append("space_id", spaceId!);
    form.append("pin_code", pin!);
    form.append("party_name", partyName!);
    form.append("guest_name", guestName!);
    form.append("file_type", file.type);
    form.append("file", file);

    const res = await fetch(`${API_BASE_URL}/media/guest/upload`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(`❌ ${data.detail || "Upload failed. Please try again."}`);
      setUploading(false);
      return;
    }

    await fetchMedia();
    setUploading(false);
    alert("✅ Upload successful!");
  }

  // ✅ Save or edit guestbook message
  async function handleMessageSave() {
    if (!messageText.trim()) return alert("Message cannot be empty.");

    const formData = new FormData();
    formData.append("message", messageText.trim());

    if (editing) {
    await fetch(
        `${API_BASE_URL}/guestbook/${editing.id}?pin_code=${pin}&party_name=${partyName}&guest_name=${guestName}`,
        { method: "PUT", body: formData }
    );
    setEditing(null);
    } else {
    formData.append("space_id", spaceId || "");
    formData.append("pin_code", pin || "");
    formData.append("name", partyName || "");
    formData.append("guest_name", guestName || "");
    await fetch(`${API_BASE_URL}/guestbook`, { method: "POST", body: formData });
    }


    setMessageText("");
    fetchGuestbook();
  }

  // 🗑️ Delete media
  async function handleDeleteMedia(id: string) {
    if (!confirm("Are you sure you want to delete this media?")) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/media/guest/${id}?pin_code=${encodeURIComponent(
          pin || ""
        )}&party_name=${encodeURIComponent(partyName || "")}&guest_name=${encodeURIComponent(guestName || "")}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const err = await res.json();
        alert(`❌ Failed to delete: ${err.detail || res.statusText}`);
        return;
      }
      fetchMedia();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong while deleting the media.");
    }
  }

  // 🗑️ Delete message
  async function handleDeleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(
      `${API_BASE_URL}/guestbook/${id}?pin_code=${pin}&party_name=${partyName}&guest_name=${guestName}`,
      { method: "DELETE" }
    );
    fetchGuestbook();
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-[#e94560] mb-6">
        {partyName || "Guest Gallery"}
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setTab("gallery")}
          className={`px-4 py-2 rounded-lg ${tab === "gallery" ? "bg-[#e94560]" : "bg-[#1b263b]"}`}
        >
          Gallery
        </button>
        <button
          onClick={() => setTab("guestbook")}
          className={`px-4 py-2 rounded-lg ${tab === "guestbook" ? "bg-[#e94560]" : "bg-[#1b263b]"}`}
        >
          Guestbook
        </button>
      </div>

      {/* Gallery */}
      {tab === "gallery" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {media.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative group rounded-xl overflow-hidden border border-white/10 cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                {selectedIndex === null && item.file_type?.startsWith("video") ? (
                  <div className="relative w-full aspect-[4/3] bg-black">
                    <ReactPlayer
                      url={item.file_url}
                      width="100%"
                      height="100%"
                      controls
                      playsinline
                      className="pointer-events-none"
                      config={{
                        file: {
                          attributes: {
                            playsInline: true,
                            webkitPlaysinline: "true",
                            disablePictureInPicture: true,
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <img src={item.file_url || "/placeholder.jpg"} alt="Event media" className="w-full h-full object-cover" />
                )}

                <p className="absolute bottom-1 left-1 text-xs bg-black/60 px-2 py-1 rounded">
                  {item.uploader_name || item.guest_name || item.uploaded_by?.replace("guest_", "") || "Guest"}
                </p>

                {item.uploader_name?.trim().toLowerCase() === guestName?.trim().toLowerCase() && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMedia(item.id);
                    }}
                    className="absolute top-1 right-1 pointer-events-auto bg-red-600 hover:bg-red-700 p-1 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} className="text-white" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Upload buttons */}
          <div className="mt-10 text-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <label className="cursor-pointer inline-block bg-[#e94560] hover:bg-[#ff5b74] px-10 py-5 rounded-2xl text-xl font-semibold transition">
                {uploading ? "Uploading..." : "Upload Media"}
                <input type="file" onChange={handleUpload} accept="image/*,video/*" hidden />
              </label>
              <label className="cursor-pointer inline-block bg-[#1b263b] hover:bg-[#263b50] px-10 py-5 rounded-2xl text-xl font-semibold transition border border-[#e94560]/40">
                Take a Picture
                <input type="file" accept="image/*,video/*" capture="environment" onChange={handleUpload} hidden />
              </label>
            </div>
            <p className="text-gray-400 text-sm mt-2">Supported formats: JPG, PNG, MP4 (max 100MB)</p>
          </div>

          {/* Full-screen lightbox viewer */}
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                onClick={() => setSelectedIndex(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(null);
                  }}
                  className="absolute top-5 right-5 text-white text-3xl font-bold"
                >
                  ✕
                </button>

                <motion.div
                  key={media[selectedIndex]?.id}
                  className="max-w-5xl w-full h-[80vh] flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 100) setSelectedIndex((i) => (i! - 1 + media.length) % media.length);
                    else if (info.offset.x < -100) setSelectedIndex((i) => (i! + 1) % media.length);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                >
                  {media[selectedIndex]?.file_type?.startsWith("video") ? (
                    <video
                      src={media[selectedIndex].file_url}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-full max-w-full rounded-lg"
                    />
                  ) : (
                    <img
                      src={media[selectedIndex].file_url}
                      alt="Full media"
                      className="max-h-full max-w-full rounded-lg select-none"
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Guestbook */}
      {tab === "guestbook" && (
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4 text-[#e94560] text-center">Guestbook</h2>

          {loadingMessages ? (
            <p className="text-gray-400 text-center">Loading messages...</p>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-[#1a1a2e] p-4 rounded-lg">
                  <p className="text-[#e94560] font-semibold">{msg.guest_name}</p>
                  <p className="text-gray-300">{msg.message}</p>
                  {msg.guest_name?.trim().toLowerCase() === guestName?.trim().toLowerCase() && (
                    <div className="flex gap-3 mt-3 items-center">
                      <button
                        onClick={() => {
                          setEditing(msg);
                          setMessageText(msg.message);
                        }}
                        className="p-2 rounded-full hover:bg-[#1b263b] transition"
                        title="Edit message"
                      >
                        <Edit2 size={18} className="text-blue-400 hover:text-blue-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 rounded-full hover:bg-[#1b263b] transition"
                        title="Delete message"
                      >
                        <Trash2 size={18} className="text-red-400 hover:text-red-300" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No messages yet.</p>
          )}

          <div className="mt-6 flex gap-2">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={editing ? "Edit your message..." : "Write a message..."}
              className="flex-1 bg-[#1a1a2e] p-2 rounded-lg text-white border border-gray-700"
            />
            <button onClick={handleMessageSave} className="bg-[#e94560] hover:bg-[#ff5b74] px-4 py-2 rounded-lg">
              {editing ? "Save" : "Send"}
            </button>
            {editing && (
              <button
                onClick={() => {
                  setEditing(null);
                  setMessageText("");
                }}
                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
