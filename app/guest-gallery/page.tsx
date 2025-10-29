"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { motion } from "framer-motion";

export default function GuestGalleryPage() {
  const params = useSearchParams();
  const spaceId = params.get("space_id");
  const guestName = params.get("guest_name");
  const pin = params.get("pin");
  const partyName = params.get("party_name");

  const [media, setMedia] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState<"gallery" | "guestbook">("gallery");
  const [uploading, setUploading] = useState(false);
  const [messageText, setMessageText] = useState("");

  // ✅ Fetch media
  async function fetchMedia() {
    const res = await fetch(`${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${pin}`);
    const data = await res.json();
    setMedia(data);
  }

  // ✅ Fetch guestbook
  async function fetchGuestbook() {
    const res = await fetch(
      `${API_BASE_URL}/api/guestbook/${spaceId}?guest_pin=${pin}&party_name=${partyName}&guest_name=${guestName}`
    );
    const data = await res.json();
    setMessages(data);
  }

  // ⏳ Load on mount
  useEffect(() => {
    fetchMedia();
    fetchGuestbook();
    const interval = setInterval(() => {
      fetchMedia();
      fetchGuestbook();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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

    await fetch(`${API_BASE_URL}/api/media/guest/upload`, {
      method: "POST",
      body: form,
    });

    await fetchMedia();
    setUploading(false);
  }

  // ✅ Post guestbook message
  async function handleMessagePost() {
    if (!messageText.trim()) return;
    const body = {
      space_id: spaceId,
      guest_pin: pin,
      party_name: partyName,
      guest_name: guestName,
      message: messageText.trim(),
    };
    await fetch(`${API_BASE_URL}/api/guestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setMessageText("");
    await fetchGuestbook();
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-[#e94560] mb-6">
        {partyName || "Guest Gallery"}
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-6">
        <button onClick={() => setTab("gallery")} className={tab === "gallery" ? "text-[#e94560]" : ""}>
          Gallery
        </button>
        <button onClick={() => setTab("guestbook")} className={tab === "guestbook" ? "text-[#e94560]" : ""}>
          Guest Book
        </button>
      </div>

      {tab === "gallery" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {media.map((item: any) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative rounded-lg overflow-hidden border border-white/10"
              >
                {item.file_type?.startsWith("video") ? (
                  <ReactPlayer url={item.file_url} width="100%" height="100%" controls />
                ) : (
                  <Image src={item.file_url} alt="" width={400} height={400} className="object-cover" />
                )}
                <p className="absolute bottom-1 left-1 text-xs bg-black/60 px-2 py-1 rounded">
                  {item.uploader_name || item.guest_name || "Unknown"}
                  
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <label className="cursor-pointer bg-[#e94560] hover:bg-[#ff5b74] px-4 py-2 rounded-lg">
              {uploading ? "Uploading..." : "Upload Media"}
              <input type="file" onChange={handleUpload} accept="image/*,video/*" hidden />
            </label>
          </div>
        </>
      )}

      {tab === "guestbook" && (
        <div className="max-w-lg mx-auto">
          <div className="space-y-4">
            {messages.map((msg: any) => (
              <div key={msg.id} className="bg-[#1a1a2e] p-4 rounded-lg">
                <p className="text-[#e94560] font-semibold">{msg.guest_name}</p>
                <p className="text-gray-300">{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 bg-[#1a1a2e] p-2 rounded-lg text-white border border-gray-700"
            />
            <button onClick={handleMessagePost} className="bg-[#e94560] px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
