"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// ✅ Safely import without worrying about types
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as unknown as React.FC<any>;

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

  // ✅ Fetch media
  async function fetchMedia() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${pin}`
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
        `${API_BASE_URL}/api/guestbook/${spaceId}?guest_pin=${pin}&party_name=${partyName}&guest_name=${guestName}`
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
  form.append("guest_pin", pin!);
  form.append("party_name", partyName!);
  form.append("guest_name", guestName!);
  form.append("file_type", file.type);
  form.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/media/guest/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message =
      res.status === 403
        ? data.detail || "Upload window closed for this event."
        : data.detail || "Upload failed. Please try again.";
    alert(`❌ ${message}`);
    setUploading(false);
    return;
  }

  await fetchMedia();
  setUploading(false);
  alert("✅ Upload successful!");
}


  // ✅ Post or save guestbook message
  async function handleMessageSave() {
    if (!messageText.trim()) return alert("Message cannot be empty.");

    if (editing) {
      // ✏️ Edit existing message
      const formData = new FormData();
      formData.append("message", messageText.trim());
      await fetch(
        `${API_BASE_URL}/api/guestbook/${editing.id}?guest_pin=${pin}&party_name=${partyName}&guest_name=${guestName}`,
        { method: "PUT", body: formData }
      );
      setEditing(null);
    } else {
      // 🆕 Post new message
      const formData = new FormData();
      formData.append("space_id", spaceId || "");
      formData.append("guest_pin", pin || "");
      formData.append("party_name", partyName || "");
      formData.append("guest_name", guestName || "");
      formData.append("message", messageText.trim());
      await fetch(`${API_BASE_URL}/api/guestbook`, {
        method: "POST",
        body: formData,
      });
    }

    setMessageText("");
    fetchGuestbook();
  }

  //Handle the deleting of media
  //==================================

  async function handleDeleteMedia(id: string) {
  if (!confirm("Are you sure you want to delete this media?")) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/media/guest/${id}?guest_pin=${encodeURIComponent(
        pin || ""
      )}&party_name=${encodeURIComponent(partyName || "")}&guest_name=${encodeURIComponent(
        guestName || ""
      )}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(`❌ Failed to delete: ${err.detail || res.statusText}`);
      return;
    }

    // ✅ Refresh media list
    fetchMedia();
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Something went wrong while deleting the media.");
  }
}


    //================================================
  // 🗑️ Delete message
  //==================================================
  async function handleDeleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(
      `${API_BASE_URL}/api/guestbook/${id}?guest_pin=${pin}&party_name=${partyName}&guest_name=${guestName}`,
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
          className={`px-4 py-2 rounded-lg ${
            tab === "gallery" ? "bg-[#e94560]" : "bg-[#1b263b]"
          }`}
        >
          Gallery
        </button>
        <button
          onClick={() => setTab("guestbook")}
          className={`px-4 py-2 rounded-lg ${
            tab === "guestbook" ? "bg-[#e94560]" : "bg-[#1b263b]"
          }`}
        >
          Guestbook
        </button>
      </div>

      {/* Gallery */}
      {tab === "gallery" && (
        <>
         
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {media.map((item: any) => (
                <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative group rounded-lg overflow-hidden border border-white/10"
                >
                {item.file_type?.startsWith("video") && item.file_url ? (
                   <ReactPlayer
                    url={item.file_url}
                    width="100%"
                    height="100%"
                    controls
                    playsinline
                    light={false}
                    config={{
                        file: {
                        attributes: {
                            crossOrigin: "anonymous",
                            controlsList: "nodownload",
                        },
                        },
                    }}
                    />

                ) : (
                    <img
                    src={item.file_url || "/placeholder.jpg"}
                    alt="Event media"
                    className="w-full h-full object-cover"
                    />
                )}

                {/* ✅ uploader name — always visible */}
                <p className="absolute bottom-1 left-1 text-xs bg-black/60 px-2 py-1 rounded">
                    {item.uploader_name ||
                    item.guest_name ||
                    item.uploaded_by?.replace("guest_", "") ||
                    "Guest"}
                </p>

                {/* ✅ delete button — only for uploader, shows on hover */}
                {item.uploader_name?.trim().toLowerCase() ===
                    guestName?.trim().toLowerCase() && (
                    <button
                    onClick={() => handleDeleteMedia(item.id)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                    Delete
                    </button>
                )}
                </motion.div>
            ))}
            </div>

         <div className="mt-10 text-center">
            <label className="cursor-pointer inline-block bg-[#e94560] hover:bg-[#ff5b74] px-8 py-4 rounded-xl text-lg font-semibold transition">
                {uploading ? "Uploading..." : "Upload Media"}
                <input
                type="file"
                onChange={handleUpload}
                accept="image/*,video/*"
                hidden
                />
            </label>
            <p className="text-gray-400 text-sm mt-2">
                Supported formats: JPG, PNG, MP4 (max 100MB)
            </p>
            </div>

        </>
      )}

      {/* Guestbook */}
      {tab === "guestbook" && (
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4 text-[#e94560] text-center">
            Guestbook
          </h2>

          {loadingMessages ? (
            <p className="text-gray-400 text-center">Loading messages...</p>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-[#1a1a2e] p-4 rounded-lg">
                  <p className="text-[#e94560] font-semibold">
                    {msg.guest_name}
                  </p>
                  <p className="text-gray-300">{msg.message}</p>

                  {msg.guest_name?.trim().toLowerCase() ===
                    guestName?.trim().toLowerCase() && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setEditing(msg);
                          setMessageText(msg.message);
                        }}
                        className="text-sm text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-sm text-red-400"
                      >
                        Delete
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
              placeholder={
                editing ? "Edit your message..." : "Write a message..."
              }
              className="flex-1 bg-[#1a1a2e] p-2 rounded-lg text-white border border-gray-700"
            />
            <button
              onClick={handleMessageSave}
              className="bg-[#e94560] hover:bg-[#ff5b74] px-4 py-2 rounded-lg"
            >
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
