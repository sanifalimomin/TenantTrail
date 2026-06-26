const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function apiFetch(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API}/api${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`
    const error = new Error(message)
    error.status = res.status
    throw error
  }
  return data
}

export async function uploadImage(file) {
  const form = new FormData()
  form.append('image', file)
  const res = await fetch(`${API}/api/upload`, {
    method: 'POST',
    credentials: 'include',
    body: form,
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.error || `Upload failed (${res.status})`)
  return data.url
}

export { API }
