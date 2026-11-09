import { useState } from "react";

// Shows the cover, or a placeholder if it is missing or fails to load.
const Cover = ({ src, title, className = "" }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center rounded bg-stone-100 p-3 text-center font-serif text-sm text-stone-500 ${className}`}>
        {title}
      </div>
    );
  }
  return (
    <img src={src} alt={`Cover of ${title}`} loading="lazy" onError={() => setFailed(true)}
      className={`rounded object-cover ${className}`} />
  );
};

export default Cover;
