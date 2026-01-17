"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { API_BASE_URL } from "@/lib/api";
import {
  Camera,
  Upload,
  Image as ImageIcon,
  MessageSquare,
  Trash2,
  Edit2,
  Send,
  X,
  Sparkles,
  PartyPopper,
  Loader2,
} from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as unknown as React.FC<any>;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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
  const [loadingMedia, setLoadingMedia] = useState(true);

  const router = useRouter();
  

  useEffect(() => {
  if (guestName) {
    sessionStorage.setItem("guest_name", guestName);
  }
}, [guestName]);

  async function fetchMedia() {
    try {
      setLoadingMedia(true);
      const res = await fetch(
        `${API_BASE_URL}/api/media/guest-space/${spaceId}?guest_pin=${encodeURIComponent(pin)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : data?.media ?? []);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setLoadingMedia(false);
    }
  }

  async function fetchGuestbook() {
    try {
      setLoadingMessages(true);
      const res = await fetch(
        `${API_BASE_URL}/api/guestbook/${spaceId}?guest_pin=${encodeURIComponent(pin)}&party_name=${encodeURIComponent(
          partyName
        )}&guest_name=${encodeURIComponent(guestName)}`
      );
      if (!res.ok) return;
      const data = await res.json();
       setMedia(Array.isArray(data) ? data : data?.media ?? []);
    } catch (err) {
      console.error("Failed to fetch guestbook:", err);
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

    try {
      const res = await fetch(`${API_BASE_URL}/api/media/guest/upload`, {
        method: "POST",
        body: form,
      });

      const result: any = await res.json();

      if (res.ok) {
        fetchMedia();
        alert("✅ Upload successful!");
      } else {
        let userFriendlyMessage = "Upload failed";

        interface ValidationError {
          msg: string;
        }

        if (result.detail) {
          if (typeof result.detail === "string") {
            userFriendlyMessage = result.detail;
          } else if (Array.isArray(result.detail)) {
            userFriendlyMessage = result.detail.map((err: ValidationError) => err.msg).join(", ");
          }
        } else if (result.message) {
          userFriendlyMessage = result.message;
        }

        if (res.status === 403) {
          userFriendlyMessage = "Uploads are not allowed at this time.";
        } else if (res.status === 400) {
          userFriendlyMessage = "Invalid file or upload parameters.";
        } else if (res.status === 413) {
          userFriendlyMessage = "File too large. Please choose a smaller file.";
        }

        alert(`❌ ${userFriendlyMessage}`);
      }
    } catch (error: unknown) {
      console.error("Upload error:", error);
      let errorMessage = "Network error - please check your connection.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
      e.target.value = "";
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
    setTab("guestbook");
  }

  async function handleEditMessage() {
    if (!editing) return;

    const form = new FormData();
    form.append("message", messageText.trim());

    await fetch(`${API_BASE_URL}/api/guestbook/${editing.id}?guest_pin=${pin}&guest_name=${guestName}`, {
      method: "PUT",
      body: form,
    });

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

  // Helper to check if current user owns the media
const isOwnMedia = (item: any) => {
  const currentGuest = guestName.trim().toLowerCase();

  if (!currentGuest) return false;

  if (
    item.guest_name?.trim().toLowerCase() === currentGuest ||
    item.uploader_name?.trim().toLowerCase() === currentGuest
  ) {
    return true;
  }

  return item.uploaded_by === `guest_${pin}`;
};


 // Get display name for media (robust)
const getUploaderName = (item: any) => {
  if (item.uploader_name?.trim()) return item.uploader_name;
  if (item.guest_name?.trim()) return item.guest_name;

  // uploaded_by is "guest_<pin>" — never show the pin
  if (item.uploaded_by?.startsWith("guest_")) return "Guest";

  return "Guest";
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white flex flex-col">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Fixed Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-white/10 shrink-0">
        <div className="w-full max-w-6xl mx-auto px-4 py-4">
          {/* Party Name with Icon */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <PartyPopper className="w-6 h-6 text-pink-400" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              {partyName || "Event Gallery"}
            </h1>
            <Sparkles className="w-6 h-6 text-violet-400" />
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Upload Media Button */}
            <label
              className={cn(
                "relative group cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-semibold transition-all duration-300",
                "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30",
                "border border-emerald-500/30 hover:border-emerald-400/50",
                "shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20",
                uploading && "opacity-50 cursor-not-allowed"
              )}
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
              ) : (
                <Upload className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-sm text-emerald-100">
                {uploading ? "Uploading..." : "Upload Media"}
              </span>
              <input
                type="file"
                onChange={handleUpload}
                accept="image/*,video/*"
                className="hidden"
                disabled={uploading}
              />
            </label>

            {/* Take Photo Button */}
            <label
              className={cn(
                "relative group cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-semibold transition-all duration-300",
                "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30",
                "border border-cyan-500/30 hover:border-cyan-400/50",
                "shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20",
                uploading && "opacity-50 cursor-not-allowed"
              )}
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              ) : (
                <Camera className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-sm text-cyan-100">
                {uploading ? "Uploading..." : "Take Photo"}
              </span>
              <input
                type="file"
                accept="image/*,video/*"
                capture="environment"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>

            {/* Gallery Tab */}
            <button
              onClick={() => setTab("gallery")}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-semibold transition-all duration-300",
                tab === "gallery"
                  ? "bg-gradient-to-br from-pink-500/30 to-rose-600/30 border-pink-500/50 shadow-lg shadow-pink-500/20"
                  : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20",
                "border"
              )}
            >
              <ImageIcon className={cn("w-6 h-6", tab === "gallery" ? "text-pink-400" : "text-gray-400")} />
              <span className={cn("text-sm", tab === "gallery" ? "text-pink-100" : "text-gray-300")}>Gallery</span>
            </button>

                {/* Guestbook Tab */}
                <button
                  onClick={() => setTab("guestbook")}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-semibold transition-all duration-300",
                    tab === "guestbook"
                      ? "bg-gradient-to-br from-violet-500/30 to-purple-600/30 border-violet-500/50 shadow-lg shadow-violet-500/20"
                      : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20",
                    "border"
                  )}
                >
                  {/* Badge */}
                  {messages.length > 0 && (
                    <span className="absolute top-2 right-2 min-w-[20px] h-5 px-1 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center">
                      {messages.length}
                    </span>
                  )}

                  <MessageSquare
                    className={cn(
                      "w-6 h-6",
                      tab === "guestbook" ? "text-violet-400" : "text-gray-400"
                    )}
                  />

                  <span
                    className={cn(
                      "text-sm",
                      tab === "guestbook" ? "text-violet-100" : "text-gray-300"
                    )}
                  >
                    Guestbook
                  </span>
                </button>

          </div>
        </div>
      </header>

      {/* Main Content - Scrollable Area */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Gallery View */}
            {tab === "gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {loadingMedia ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-pink-400 animate-spin mb-4" />
                    <p className="text-gray-400">Loading gallery...</p>
                  </div>
                ) : media.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Camera className="w-12 h-12 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No photos yet</h3>
                    <p className="text-gray-500 max-w-md">
                      Be the first to capture a moment! Use the buttons above to upload or take a photo.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-8">
                    {media.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10"
                        onClick={() => {
                          router.push(
                            `/guest-gallery/view?index=${index}&space_id=${spaceId}&pin=${pin}&guest_name=${guestName}&party_name=${partyName}`
                          );
                        }}
                      >
                        {item.file_type?.startsWith("video") ? (
                          <div className="relative w-full h-full bg-black">
                            <ReactPlayer
                              url={item.file_url}
                              width="100%"
                              height="100%"
                              controls={false}
                              light={true}
                              playIcon={null}
                              playing={false}
                              muted
                              style={{ objectFit: "cover" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item.file_url || "/placeholder.jpg"}
                            alt="Event media"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            draggable={false}
                          />
                        )}

                        {/* Gradient Overlay - Always visible for name visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Uploader Name - Always visible */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-sm font-medium text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg inline-block">
                            {getUploaderName(item)}
                          </p>
                        </div>

                        {/* Delete Button - Always visible if user owns the media */}
                        {isOwnMedia(item) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMedia(item.id);
                            }}
                            className="absolute top-2 right-2 p-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 shadow-lg"
                            title="Delete your upload"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Guestbook View */}
            {tab === "guestbook" && (
              <motion.div
                key="guestbook"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                {/* Message Input */}
                <div className="mb-8 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex gap-3">
                    <input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={editing ? "Edit your message..." : "Write a lovely message..."}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                      onKeyDown={(e) => e.key === "Enter" && (editing ? handleEditMessage() : handleMessageSave())}
                    />
                    <button
                      onClick={editing ? handleEditMessage : handleMessageSave}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 flex items-center gap-2"
                    >
                      <Send size={18} />
                      <span className="hidden sm:inline">{editing ? "Save" : "Send"}</span>
                    </button>
                    {editing && (
                      <button
                        onClick={() => {
                          setEditing(null);
                          setMessageText("");
                        }}
                        className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Messages List */}
                {loadingMessages ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-violet-400 animate-spin mb-4" />
                    <p className="text-gray-400">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <MessageSquare className="w-10 h-10 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">No messages yet</h3>
                    <p className="text-gray-500 max-w-sm">
                      Be the first to leave a message for the host!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-8">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/30 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-semibold text-violet-400 mb-2">{msg.guest_name}</p>
                            <p className="text-gray-200 leading-relaxed">{msg.message}</p>
                          </div>
                          {msg.guest_name?.trim().toLowerCase() === guestName?.trim().toLowerCase() && (
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditing(msg);
                                  setMessageText(msg.message);
                                }}
                                className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
