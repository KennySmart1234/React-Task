// FakeStoreAPI has no discounts/colors/sizes, so these are derived from the product id (stable, not real data).
export const disc = p => [0, 20, 0, 30, 0, 40][p.id % 6]
export const price = p => Math.round(p.price)
export const oldPrice = p => (disc(p) ? Math.round(p.price / (1 - disc(p) / 100)) : 0)
export const COLORS = [
  { name: 'White', hex: '#FFFFFF' }, { name: 'Red', hex: '#F50606' }, { name: 'Blue', hex: '#063AF5' },
  { name: 'Green', hex: '#00C12B' }, { name: 'Black', hex: '#000000' }, { name: 'Olive', hex: '#4F4631' },
]
export const colorsFor = p => [0, 1, 2].map(i => COLORS[(p.id + i * 2) % COLORS.length])
export const SIZES = ['Small', 'Medium', 'Large', 'X-Large']
export const PROMOS = { SHOP20: 0.2, SAVE30: 0.3, HALFOFF: 0.5 }
