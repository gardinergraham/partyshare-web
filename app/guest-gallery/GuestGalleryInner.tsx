
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { API_BASE_URL } from "@/lib/api";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";



const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as unknown as React.FC<any>;

export default function GuestGalleryPage() {
  const params = useSearchParams();
  const spaceId = params.get("space_id") ?? "";
  const guestName = params.get("guest_name") ?? "";
  const pin = params.get("pin") ?? "";
  const partyName = params.get("party_name") ?? "";

  const [media, setMedia] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [tab, setTab] = useState<"gallery" | "guestbook">("gallery");
  const [uploading, setUploading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const viewerWrapperRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();


  async function fetchMedia() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${encodeURIComponent(pin)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    } catch {}
  }

  async function fetchGuestbook() {
    try {
      setLoadingMessages(true);
      const res = await fetch(
        `${API_BASE_URL}/api/guestbook/${spaceId}?guest_pin=${encodeURIComponent(
          pin
        )}&party_name=${encodeURIComponent(partyName)}&guest_name=${encodeURIComponent(guestName)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } finally {
      setLoadingMessages(false);
    }
  }

  useEffect(() => {
    if (!spaceId) return;
    fetchMedia();
    fetchGuestbook();
    const interval = setInterval(() => {
      fetchMedia();
      fetchGuestbook();
    }, 60000);
    return () => clearInterval(interval);
  }, [spaceId]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("space_id", spaceId);
    form.append("guest_pin", pin);
    form.append("party_name", partyName);
    form.append("guest_name", guestName);
    form.append("file_type", file.type);
    form.append("file", file);

    const res = await fetch(`${API_BASE_URL}/api/media/guest/upload`, { method: "POST", body: form });
    setUploading(false);

    if (res.ok) {
      fetchMedia();
      alert("✅ Upload successful!");
    } else {
      alert("❌ Upload failed");
    }
  }

  async function handleMessageSave() {
    if (!messageText.trim()) return;

    const form = new FormData();
    form.append("space_id", spaceId);
    form.append("guest_pin", pin);
    form.append("party_name", partyName);
    form.append("guest_name", guestName);
    form.append("message", messageText.trim());

    await fetch(`${API_BASE_URL}/api/guestbook`, { method: "POST", body: form });
    setMessageText("");
    fetchGuestbook();
  }

  async function handleEditMessage() {
    if (!editing) return;

    const form = new FormData();
    form.append("message", messageText.trim());

    await fetch(
      `${API_BASE_URL}/api/guestbook/${editing.id}?guest_pin=${pin}&guest_name=${guestName}`,
      { method: "PUT", body: form }
    );

    setEditing(null);
    setMessageText("");
    fetchGuestbook();
  }

  async function handleDeleteMedia(id: string) {
    if (!confirm("Delete this upload?")) return;
    await fetch(
      `${API_BASE_URL}/api/media/guest/${id}?guest_pin=${pin}&party_name=${partyName}&guest_name=${guestName}`,
      { method: "DELETE" }
    );
    fetchMedia();
  }

  async function handleDeleteMessage(id: string) {
    if (!confirm("Delete message?")) return;
    await fetch(
      `${API_BASE_URL}/api/guestbook/${id}?guest_pin=${pin}&party_name=${partyName}&guest_name=${guestName}`,
      { method: "DELETE" }
    );
    fetchGuestbook();
  }

// Keep ref for fullscreen
const viewerVideoRef = React.useRef<HTMLVideoElement | null>(null);


// ✅ Proper fullscreen handling (with real iOS fallback)
const enterFullscreen = () => {
  const wrapper = viewerWrapperRef.current;
  if (!wrapper) return;

  // Desktop & Android first
  if (wrapper.requestFullscreen) {
    wrapper.requestFullscreen();
    return;
  }

  // Older Safari desktop
  // @ts-ignore
  if (wrapper.webkitRequestFullscreen) {
    // @ts-ignore
    wrapper.webkitRequestFullscreen();
    return;
  }

  // iOS Safari fallback (no true fullscreen API)
  const el = viewerVideoRef.current;
  if (el) window.open(el.currentSrc || el.src, "_blank");
};



  return (
    <div className="min-h-screen bg-[#0f0f23] text-white px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-[#e94560] mb-6">{partyName}</h1>

      <div className="flex justify-center gap-6 mb-6">
        <button className={`px-4 py-2 rounded-lg ${tab === "gallery" ? "bg-[#e94560]" : "bg-[#1b263b]"}`} onClick={() => setTab("gallery")}>
          Gallery
        </button>
        <button className={`px-4 py-2 rounded-lg ${tab === "guestbook" ? "bg-[#e94560]" : "bg-[#1b263b]"}`} onClick={() => setTab("guestbook")}>
          Guestbook
        </button>
      </div>

      {/* =======================  GALLERY VIEW  ======================= */}
 {tab === "gallery" && (
  <>
    {/* GRID */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {media.map((item, index) => (
        <motion.div
          key={item.id}
          className="relative group rounded-xl overflow-hidden border border-white/10 cursor-pointer"
         onClick={() => {
            router.push(
                `/guest-gallery/view?index=${index}&space_id=${spaceId}&pin=${pin}&guest_name=${guestName}&party_name=${partyName}`
            );
            }}

          whileHover={{ scale: 1.01 }}
        >
          {/* ✅ Video thumbnail: load only metadata; show first frame when possible */}
           {item.file_type?.startsWith("video") ? (
                <div className="relative w-full aspect-[4/3] bg-black">
                    <ReactPlayer
                    src={item.file_url}
                    width="100%"
                    height="100%"
                    controls={false}       // ✅ No controls in thumbnail
                    light={true}           // ✅ Show video preview thumbnail
                    playIcon={null}        // ✅ No big play icon
                    playing={false}
                    muted={false}
                    playsinline
                    style={{ objectFit: "cover" }}
                    onClick={() => enterFullscreen()}
                    config={{
                        file: {
                        attributes: {
                            playsInline: true,
                            webkitPlaysinline: "true",
                        }
                        }
                    }}
                    />
                </div>
                ) : (

            <img
                src={item.file_url || "/placeholder.jpg"}
                alt="Event media"
                className="w-full h-full object-cover"
                loading="lazy"
            />
            )}


          {/* Name Tag */}
          <p className="absolute bottom-1 left-1 text-[11px] bg-black/60 px-2 py-1 rounded">
            {item.uploader_name ||
              item.guest_name ||
              item.uploaded_by?.replace("guest_", "") ||
              "Guest"}
          </p>

          {/* Delete (only for uploader) */}
          {item.uploader_name?.trim().toLowerCase() ===
            guestName?.trim().toLowerCase() && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteMedia(item.id);
              }}
              className="absolute top-1 right-1 pointer-events-auto bg-red-600 hover:bg-red-700 p-1 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
              title="Delete"
            >
              <Trash2 size={14} className="text-white" />
            </button>
          )}
        </motion.div>
      ))}
    </div>

    {/* UPLOAD */}
    <div className="mt-10 text-center space-y-4">
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <label className="cursor-pointer inline-block bg-[#e94560] hover:bg-[#ff5b74] px-10 py-5 rounded-2xl text-xl font-semibold transition">
          {uploading ? "Uploading..." : "Upload Media"}
          <input
            type="file"
            onChange={handleUpload}
            accept="image/*,video/*"
            hidden
          />
        </label>

        <label className="cursor-pointer inline-block bg-[#1b263b] hover:bg-[#263b50] px-10 py-5 rounded-2xl text-xl font-semibold transition border border-[#e94560]/40">
          Take a Picture
          <input
            type="file"
            accept="image/*,video/*"
            capture="environment"
            onChange={handleUpload}
            hidden
          />
        </label>
      </div>
      <p className="text-gray-400 text-sm mt-2">
        Supported: JPG, PNG, MP4 (max 100MB)
      </p>
    </div>

   

  </>
)}



      {/* =======================  GUESTBOOK VIEW  ======================= */}
      {tab === "guestbook" && (
        <div className="max-w-lg mx-auto">
          {loadingMessages ? (
            <p className="text-center text-gray-400">Loading…</p>
          ) : messages.map((msg) => (
            <div key={msg.id} className="bg-[#1a1a2e] p-4 rounded-lg mb-4">
              <p className="text-[#e94560] font-semibold">{msg.guest_name}</p>
              <p>{msg.message}</p>

              {msg.guest_name.trim().toLowerCase() === guestName.trim().toLowerCase() && (
                <div className="flex gap-3 mt-3">
                  <button onClick={() => { setEditing(msg); setMessageText(msg.message); }}>
                    <Edit2 size={18} className="text-blue-400" />
                  </button>
                  <button onClick={() => handleDeleteMessage(msg.id)}>
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 flex gap-2">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={editing ? "Edit your message..." : "Write a message..."}
              className="flex-1 bg-[#1a1a2e] p-2 rounded-lg border border-gray-700"
            />

            <button onClick={editing ? handleEditMessage : handleMessageSave} className="bg-[#e94560] hover:bg-[#ff5b74] px-4 py-2 rounded-lg">
              {editing ? "Save" : "Send"}
            </button>

            {editing && (
              <button onClick={() => { setEditing(null); setMessageText(""); }} className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
