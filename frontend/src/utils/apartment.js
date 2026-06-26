const GRADIENTS = [
  'linear-gradient(160deg, #93c5a1 0%, #3a9b7a 100%)',
  'linear-gradient(160deg, #5b8ab5 0%, #2d4a73 100%)',
  'linear-gradient(160deg, #9aad79 0%, #5a7042 100%)',
  'linear-gradient(160deg, #4b5e72 0%, #1e293b 100%)',
  'linear-gradient(160deg, #c47a3c 0%, #7c3d10 100%)',
]

export function gradientFor(id) {
  return GRADIENTS[(Number(id) || 0) % GRADIENTS.length]
}

function tagsOf(apt) {
  const raw = apt.tags
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'string' && raw.trim()) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    } catch {
      return raw.split(',').map(s => s.trim()).filter(Boolean)
    }
  }
  return []
}

export function normalizeApartment(apt) {
  const rating = Number(apt.rating) || 0
  return {
    ...apt,
    rating,
    reviews: Number(apt.reviews) || 0,
    stars: Number(apt.stars) || Math.round(rating),
    tags: tagsOf(apt),
    gradient: apt.gradient || gradientFor(apt.id),
    aiSummary: apt.aiSummary ?? apt.ai_summary ?? '',
    yearBuilt: apt.yearBuilt ?? apt.year_built ?? '—',
    landlord: apt.landlord ?? '—',
    units: apt.units ?? '—',
    neighbourhood: apt.neighbourhood ?? apt.neighborhood ?? '',
    description: apt.description ?? '',
  }
}
