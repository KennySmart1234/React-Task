const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const I = (d, extra) => ({ className = 'w-6 h-6' }) => <svg viewBox="0 0 24 24" className={className} {...P}>{d}{extra}</svg>
export const CartIcon = I(<><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.5 12h11L21 7H6" /></>)
export const UserIcon = I(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M6 19c1-3 4-4 6-4s5 1 6 4" /></>)
export const SearchIcon = I(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>)
export const MenuIcon = I(<path d="M3 6h18M3 12h18M3 18h18" />)
export const TrashIcon = I(<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />)
export const MinusIcon = I(<path d="M5 12h14" />)
export const PlusIcon = I(<path d="M12 5v14M5 12h14" />)
export const ChevronIcon = I(<path d="m9 6 6 6-6 6" />)
export const ArrowIcon = I(<path d="M5 12h14M13 6l6 6-6 6" />)
export const CloseIcon = I(<path d="M6 6l12 12M18 6 6 18" />)
export const TagIcon = I(<><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1" /></>)
export const MailIcon = I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>)
