// Product photo with a safety net: if the remote FakeStoreAPI image fails (API/CDN down) swap to the bundled copy.
export default function ProductImg({ p, src, alt = '', className = '', ...rest }) {
  const id = p?.id
  const url = src || p?.image
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
      onError={e => {
        const local = `/products/${id}.jpg`
        if (id && !e.currentTarget.src.endsWith(local)) e.currentTarget.src = local
      }}
      {...rest}
    />
  )
}
