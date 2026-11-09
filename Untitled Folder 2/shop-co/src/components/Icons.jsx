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
export const ChevronDownIcon = I(<path d="m6 9 6 6 6-6" />)
export const DotsIcon = ({ className = 'w-6 h-6' }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><circle cx="5" cy="12" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="19" cy="12" r="1.9" /></svg>
export const SlidersIcon = I(<><path d="M6 3v6M6 13v8M12 3v10M12 17v4M18 3v3M18 10v11" /><path d="M3.5 9h5M9.5 15h5M15.5 6h5" /></>)
export const CheckIcon = ({ className = 'w-4 h-4' }) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
export const VerifiedIcon = ({ className = 'w-5 h-5 lg:w-6 lg:h-6' }) => <svg viewBox="0 0 24 24" className={className} aria-label="Verified buyer" role="img"><circle cx="12" cy="12" r="12" fill="#01AB31" /><path d="m7 12.4 3.3 3.3L17 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
export const TwitterIcon = ({ className = 'w-3.5 h-3.5' }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M23.95 4.57a10 10 0 0 1-2.82.78 4.96 4.96 0 0 0 2.16-2.72c-.95.56-2 .96-3.13 1.18a4.92 4.92 0 0 0-8.38 4.48A13.98 13.98 0 0 1 1.64 3.16a4.82 4.82 0 0 0-.67 2.47c0 1.71.87 3.21 2.19 4.1a4.9 4.9 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.83 5 5 0 0 1-2.21.08 4.94 4.94 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.99 13.99 0 0 0 7.56 2.21c9.05 0 14-7.5 14-13.98 0-.21 0-.42-.02-.63A9.94 9.94 0 0 0 24 4.59z" /></svg>
export const FacebookIcon = ({ className = 'w-3.5 h-3.5' }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.6v3.3h2.8V22z" /></svg>
export const InstagramIcon = ({ className = 'w-3.5 h-3.5' }) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r=".8" fill="currentColor" /></svg>
export const GithubIcon = ({ className = 'w-3.5 h-3.5' }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.921.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
