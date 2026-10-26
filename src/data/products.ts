import { Product, StyleLook, Currency } from '../types';

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 3.67, label: 'AED (د.إ)' },
  INR: { code: 'INR', symbol: '₹', rate: 85.5, label: 'INR (₹)' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'velora-01',
    name: 'The Monolith Atelier Coat',
    subtitle: 'Double-Faced Cashmere Robe Coat',
    slug: 'monolith-atelier-coat',
    category: 'outerwear',
    categoryLabel: 'Tailored Outerwear',
    price: 1850,
    originalPrice: 2100,
    tag: 'Atelier Signature',
    description: 'An architectural statement in pure double-faced cashmere. Cut with generous drop shoulders, a broad notched lapel, and a self-tie waist belt. Hand-finished with invisible interior blind stitching by our master tailors in Biella.',
    composition: '100% Grade-A Mongolian Cashmere (680gsm)',
    millOrigin: 'Lanificio Fratelli Atelier · Biella, Italy',
    details: [
      'Unlined double-face construction with invisible hand-sewn seams',
      'Detachable sash tie belt with reinforced hand-tacked thread loops',
      'Deep welt front pockets with hand-stitched bartacks',
      'Extended back vent for fluid stride mobility',
      'Includes custom cedarwood storage hanger and breathable linen garment bag'
    ],
    care: [
      'Specialist luxury dry clean only',
      'Store hanging on sculpted wooden coat hanger',
      'Gently steam between wearings to refresh natural loft'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel Sand', hex: '#C19A6B' },
      { name: 'Charcoal Noir', hex: '#262626' },
      { name: 'Warm Alabaster', hex: '#EAE6DF' }
    ],
    primaryImage: '/images/product_cashmere_coat.jpg',
    secondaryImage: '/images/hero_velora_editorial.jpg',
    rating: 4.95,
    reviewCount: 38,
    featured: true,
    bestseller: true,
    reviews: [
      {
        id: 'r1',
        author: 'Eleanor Vance',
        location: 'London, UK',
        rating: 5,
        date: 'October 14, 2026',
        fit: 'True to Size',
        comment: 'The weight and drape of this cashmere is unparalleled. It commands quiet attention wherever I walk. Truly an investment heirloom piece.'
      },
      {
        id: 'r2',
        author: 'Camille Laurent',
        location: 'Paris, France',
        rating: 5,
        date: 'September 28, 2026',
        fit: 'True to Size',
        comment: 'Exquisite blind hand-stitching. The Camel tone is luminous without being orange. Fits over tailoring effortlessly.'
      }
    ]
  },
  {
    id: 'velora-02',
    name: 'The Asymmetric Bias Noir Gown',
    subtitle: 'Heavyweight Mulberry Silk Slip Dress',
    slug: 'asymmetric-bias-noir-gown',
    category: 'evening',
    categoryLabel: 'Silk & Evening',
    price: 980,
    tag: 'Editorial Feature',
    description: 'Sculpted on the bias to caress natural contours. Features a draped cowl décolletage that transitions into a sculptural low back with delicate adjustable rouleau ties. Crafted from 22-momme double georgette silk with a liquid matte sheen.',
    composition: '100% Grade 6A Mulberry Silk (22 Momme)',
    millOrigin: 'Atelier de Soierie Lyonnaise · Lyon, France',
    details: [
      'True 45-degree diagonal bias cut for natural stretch and fluid drape',
      'Sculpted cowl front with French darts for bust contouring',
      'Hand-rolled baby hems throughout the sweeping hemline',
      'Low sculptural back with discreet micro-hook closure',
      'Anti-static natural silk lining'
    ],
    care: [
      'Professional green dry clean only',
      'Do not machine wash or tumble dry',
      'Iron inside out on lowest silk setting with pressing cloth'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Obsidian', hex: '#0F0F11' },
      { name: 'Champagne Pearl', hex: '#EBE5D8' },
      { name: 'Oxblood Crimson', hex: '#4A151B' }
    ],
    primaryImage: '/images/product_noir_silk_dress.jpg',
    secondaryImage: '/images/product_noir_silk_dress.jpg',
    rating: 4.92,
    reviewCount: 44,
    featured: true,
    bestseller: true,
    reviews: [
      {
        id: 'r3',
        author: 'Sophia Chen',
        location: 'New York, USA',
        rating: 5,
        date: 'October 19, 2026',
        fit: 'True to Size',
        comment: 'Wore this to the Venice Biennale opening gala. The silk moves like liquid mercury. Unbelievably comfortable and flattering.'
      }
    ]
  },
  {
    id: 'velora-03',
    name: 'The Sculpted Hourglass Blazer',
    subtitle: 'Architectural Waisted Jacket in Virgin Wool',
    slug: 'sculpted-hourglass-blazer',
    category: 'blazers',
    categoryLabel: 'Tailored Outerwear',
    price: 1240,
    originalPrice: 1390,
    tag: 'Lookbook Essential',
    description: 'A study in sharp structural balance. Cut with padded peaked shoulders, a cinched internal waist corset structure, and carved hip vents. Fastened with genuine polished horn buttons sourced sustainably.',
    composition: '98% Virgin Wool, 2% Elastane; Lining: 100% Cupro Bemberg',
    millOrigin: 'Vitale Barberis Canonico · Pratrivero, Italy',
    details: [
      'Structured canvas chest piece for lasting silhouette retention',
      'Sculpted peak lapels with pick-stitched edges (AMF stitch)',
      'Natural horn button with hand-sewn stem shank',
      'Concealed double jetted hip pockets and interior pen pocket',
      'Four functioning cuff surgeon buttons with working buttonholes'
    ],
    care: [
      'Specialist dry clean only',
      'Use broad-shoulder hanger to preserve canvas chest form'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory Alabaster', hex: '#F4EFEA' },
      { name: 'Obsidian Black', hex: '#1C1917' },
      { name: 'Slate Taupe', hex: '#736B63' }
    ],
    primaryImage: '/images/product_architectural_blazer.jpg',
    secondaryImage: '/images/hero_velora_editorial.jpg',
    rating: 4.98,
    reviewCount: 52,
    featured: true,
    bestseller: true,
    reviews: [
      {
        id: 'r4',
        author: 'Astrid Lindholm',
        location: 'Stockholm, Sweden',
        rating: 5,
        date: 'October 08, 2026',
        fit: 'True to Size',
        comment: 'The hourglass waistline is cut to perfection. It gives sharp architecture to any basic tee or silk blouse beneath. Masterclass tailoring.'
      }
    ]
  },
  {
    id: 'velora-04',
    name: 'The Atelier Box-Calfskin Tote',
    subtitle: 'Structured Minimalist Day-to-Evening Bag',
    slug: 'atelier-box-calfskin-tote',
    category: 'accessories',
    categoryLabel: 'Leather & Objects',
    price: 1150,
    tag: 'Limited Craft',
    description: 'Crafted from hand-selected French box-calfskin leather that develops a noble patina over decades. Architectural trapezoidal lines with hand-lacquered edge paint and discreet brushed 24k gold-plated brass hardware.',
    composition: '100% Full-Grain French Box-Calfskin Leather; Lining: Italian Lambskin Nappa',
    millOrigin: 'Tanneries Haas · Mittelbergheim, France',
    details: [
      'Hand-burnished and 7-layer lacquered raw leather edges',
      'Fitted interior zip pocket and dual slip compartments for tech & essentials',
      'Reinforced base with 5 protective brushed brass feet',
      'Subtle blind-debossed Velora insignia at upper center',
      'Accompanied by silk-lined dust bag and leather care balm'
    ],
    care: [
      'Condition twice yearly with organic neutral beeswax leather cream',
      'Protect from prolonged direct moisture and excessive sunlight'
    ],
    sizes: ['One Size (36cm x 28cm x 14cm)'],
    colors: [
      { name: 'Noir Box', hex: '#171717' },
      { name: 'Espresso Cognac', hex: '#3E2723' },
      { name: 'Forest Moss', hex: '#233226' }
    ],
    primaryImage: '/images/product_leather_tote.jpg',
    rating: 4.96,
    reviewCount: 31,
    featured: true,
    bestseller: true,
    reviews: [
      {
        id: 'r5',
        author: 'Valerie Dupuis',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'October 21, 2026',
        fit: 'True to Size',
        comment: 'The leather aroma and stiffness is comparable to Hermès box leather. Sits upright with quiet elegance on any table.'
      }
    ]
  },
  {
    id: 'velora-05',
    name: 'The Cocoon Ribbed Turtleneck',
    subtitle: 'Seamless Pure Cashmere Knit',
    slug: 'cocoon-ribbed-turtleneck',
    category: 'knitwear',
    categoryLabel: 'Knitwear & Tops',
    price: 680,
    tag: 'Wardrobe Foundation',
    description: 'Spun from cloud-soft 4-ply Mongolian cashmere on Japanese Shima Seiki wholegarment knitting looms, eliminating all chafing side seams for a sculpted, second-skin cocoon feeling.',
    composition: '100% 4-Ply Organic Mongolian Cashmere',
    millOrigin: 'Todd & Duncan · Kinross, Scotland',
    details: [
      'Wholegarment 3D seamless knitting technology',
      'Foldable architectural funnel collar that holds its posture',
      'Extended ribbed thumbhole cuffs for thermal elegance',
      'Pre-washed in Scottish soft water for optimal cloud handfeel'
    ],
    care: [
      'Hand wash gently in lukewarm water with cashmere shampoo',
      'Dry flat on towel, never wring or hang wet'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7CEC2' },
      { name: 'Midnight Charcoal', hex: '#262628' },
      { name: 'Pistachio Sage', hex: '#CCD5C1' }
    ],
    primaryImage: '/images/hero_velora_editorial.jpg',
    rating: 4.89,
    reviewCount: 29,
    featured: false,
    bestseller: false,
    reviews: []
  },
  {
    id: 'velora-06',
    name: 'The Pleated Palazzo Trousers',
    subtitle: 'High-Rise Fluid Virgin Wool Pant',
    slug: 'pleated-palazzo-trousers',
    category: 'outerwear',
    categoryLabel: 'Tailored Outerwear',
    price: 720,
    tag: 'Tailoring Essential',
    description: 'Dramatic double forward pleats and an ultra high-rise waistband create a lengthening drape. Tailored from high-twist tropical virgin wool that naturally repels creasing throughout long travel days.',
    composition: '100% High-Twist Virgin Wool Fresco',
    millOrigin: 'Lanificio Cerruti · Biella, Italy',
    details: [
      'High-waisted fit with interior gripper waistband',
      'Extended tab button closure with concealed horn buttons',
      'Full floor-skimming wide leg profile with generous turn-up hem allowance',
      'Side slash pockets and rear besom pockets'
    ],
    care: ['Dry clean only', 'Steam to refresh pleat crispness'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Fleck', hex: '#333333' },
      { name: 'Chalk Stone', hex: '#E5E0D8' },
      { name: 'Deep Navy', hex: '#1A2238' }
    ],
    primaryImage: '/images/hero_velora_editorial.jpg',
    rating: 4.91,
    reviewCount: 27,
    featured: false,
    bestseller: false,
    reviews: []
  }
];

export const STYLE_LOOKS: StyleLook[] = [
  {
    id: 'look-01',
    lookNumber: '01',
    title: 'The Monolith Tailoring',
    subtitle: 'Power dressing reimagined through gentle restraint',
    season: 'Autumn / Winter 2026',
    editorialImage: '/images/hero_velora_editorial.jpg',
    quote: 'True luxury lies in the discipline of subtraction.',
    stylistNote: 'Pair the Sculpted Hourglass Blazer with the fluid Pleated Palazzo Trousers, grounded by the hand-lacquered Box-Calfskin Tote. A timeless silhouette built for boardrooms and galas alike.',
    productIds: ['velora-03', 'velora-06', 'velora-04']
  },
  {
    id: 'look-02',
    lookNumber: '02',
    title: 'Midnight Silk Reverie',
    subtitle: 'Fluid evening elegance cut on the true bias',
    season: 'Autumn / Winter 2026',
    editorialImage: '/images/product_noir_silk_dress.jpg',
    quote: 'Silk responds to the wearer’s rhythm like nothing else on earth.',
    stylistNote: 'Drape the Asymmetric Bias Noir Gown alone or under the unbuttoned Monolith Coat when transitioning from nightfall into the salon.',
    productIds: ['velora-02', 'velora-01', 'velora-04']
  },
  {
    id: 'look-03',
    lookNumber: '03',
    title: 'The Cashmere Sanctuary',
    subtitle: 'Tactile warmth meets sculpted architectural volume',
    season: 'Autumn / Winter 2026',
    editorialImage: '/images/product_cashmere_coat.jpg',
    quote: '680 grams of double-faced Mongolian cashmere wrapped like architecture.',
    stylistNote: 'Layer the Cocoon Ribbed Turtleneck under the belted Monolith Coat for an effortlessly elevated winter uniform.',
    productIds: ['velora-01', 'velora-05', 'velora-04']
  }
];

export const PRESS_QUOTES = [
  {
    quote: "Velora represents the zenith of quiet luxury. Their double-faced cashmere and bias-cut silks rival Paris's most storied houses.",
    publication: "VOGUE EDITORIAL",
    issue: "September Issue"
  },
  {
    quote: "Architectural purity without stiffness. Velora has created the definitive modern capsule for discerning women of taste.",
    publication: "HARPER'S BAZAAR",
    issue: "Atelier Review"
  },
  {
    quote: "In a world of disposable noise, Velora's slow Italian craftsmanship and zero-overproduction ethics set the new gold standard.",
    publication: "FINANCIAL TIMES",
    issue: "How To Spend It"
  }
];
