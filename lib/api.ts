// ✅ Use live Railway backend in production, local fallback for dev
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://partyshare-production-e1f0.up.railway.app";


export async function apiPost(
  endpoint: string,
  data: Record<string, any>,
  token?: string
) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: objectToFormData(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }

  return res;
}

function objectToFormData(obj: Record<string, any>) {
  const form = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, String(value));
  });
  return form;
}

// ✅ Media endpoints
export const uploadUrl = `${API_BASE_URL}/api/media/upload`;

export function mediaListUrl(spaceId: string) {
  return `${API_BASE_URL}/api/media/space/${spaceId}`;
}
