export type ProductSlot = {
  id: string;
  label: string;
  index: string;
  status: string;
  description: string;
  tone: 'rose' | 'petal' | 'mint';
};

export const brand = {
  name: 'Flamingo Syrups',
  creator: 'Manoj Alphones',
  phone: '+91 8971825137',
  email: 'mjsince1987@gmail.com',
  address: 'No 6, RA Road, Ejipura, Bengaluru-560047',
};

/**
 * Product truth note:
 * The supplied product page contains no extractable catalogue information.
 * Keep future product names, flavour notes and specifications in this array only.
 */
export const productSlots: ProductSlot[] = [
  {
    id: 'slot-01',
    label: 'Collection slot 01',
    index: '01',
    status: 'Details in preparation',
    description: 'A considered place for the first syrup profile, ready to be configured when the collection is announced.',
    tone: 'rose',
  },
  {
    id: 'slot-02',
    label: 'Collection slot 02',
    index: '02',
    status: 'Details in preparation',
    description: 'A second canvas for the collection. Product naming, tasting notes and format will be added here.',
    tone: 'petal',
  },
  {
    id: 'slot-03',
    label: 'Collection slot 03',
    index: '03',
    status: 'Details in preparation',
    description: 'An open place for what comes next — kept deliberately clear until the product is ready to share.',
    tone: 'mint',
  },
];

export const timeline = [
  { year: '2023–24', role: 'Beverage Head & Master Mixologist', context: 'Phoenix · Bellona Hospitality' },
  { year: '2021–23', role: 'Beverage Head', context: 'Gatsby' },
  { year: 'Earlier', role: 'Beverage Manager & Head Mixologist', context: 'Beverage-led roles across hospitality' },
];