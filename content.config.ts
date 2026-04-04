import type { SiteContent } from '@/types';

export const content: SiteContent = {
  identity: {
    name: 'Nico',
    label: 'product lead & designer',
  },

  work: [
    {
      id: 'remote',
      label: 'Remote · 2026–present',
      company: 'Remote',
      abbreviation: 'RMT',
      logo: '/logos/remote_logo.png',
      color: '#4f46e5',
      role: 'Product Lead, Cards',
      dates: 'Jan 2026 – present',
      bullets: [
        'Leading the Cards product end-to-end at Remote',
        'Working across design, engineering and product teams',
        'Owning strategy and execution from discovery to launch',
      ],
      backContent:
        "First role fully owning a product at a global scale. Cards is a complex domain — compliance, UX and infrastructure all have to move together.",
    },
    {
      id: 'atlas',
      label: 'Atlas · 2023–2026',
      company: 'Atlas',
      abbreviation: 'ATL',
      logo: '/logos/atlas_logo.png',
      color: '#1e3a8a',
      role: 'Head of Product',
      dates: 'Apr 2023 – Feb 2026',
      bullets: [
        "Led the company's shift to a product-driven org and a new model centered on the corporate card",
        'Cross-functional leadership across Engineering, Sales and CX',
        'Hands-on with product design and vibe coding throughout',
        'Built and scaled the benefits & perks marketplace',
        'Grew from Product Designer to Head of Product in under 3 years',
      ],
      backContent:
        "Nearly 3 years at Atlas — from designer to head of product. The transition to a card-led business required rethinking the org, the roadmap and the culture at the same time.",
    },
    {
      id: 'lemon',
      label: 'Lemon Cash · 2022',
      company: 'Lemon Cash',
      abbreviation: 'LMN',
      logo: '/logos/lemon_logo.png',
      color: '#b45309',
      role: 'Senior Product Designer',
      dates: 'Feb 2022 – Nov 2022',
      bullets: [
        'Designed FIAT/Crypto bridging experiences for the Argentine market',
        'Owned UX for the ARS wallet and payment flows',
        'Contributed to new investment product development',
      ],
      backContent:
        "In Argentina, the stakes for financial products are real. Designing a crypto wallet when inflation is running at 70%+ is not an abstract exercise.",
    },
    {
      id: 'aivo',
      label: 'Aivo · 2020–2022',
      company: 'Aivo',
      abbreviation: 'AIV',
      logo: '/logos/aivo_logo.png',
      color: '#6d28d9',
      role: 'Senior Product Designer',
      dates: 'Nov 2020 – Feb 2022',
      bullets: [
        'Led the redesign of the chatbot window, admin dashboard and new AI products',
        'Built the company Design System from scratch',
        'Scaled and structured the Design Team',
        'Explored generative AI for customer responses before it was mainstream',
      ],
      backContent:
        "Rebuilding the full product suite while also building the team. The generative AI exploration felt early and uncertain at the time — turns out it was just early.",
    },
    {
      id: 'acamica',
      label: 'Acámica · 2019–2020',
      company: 'Acámica',
      abbreviation: 'ACA',
      logo: '/logos/acamica_logo.png',
      color: '#0f766e',
      role: 'Product Manager & UX Designer',
      dates: 'Aug 2019 – Nov 2020',
      bullets: [
        'Led Growth initiatives in the engineering team',
        'Coordinated execution across Marketing and Learning departments',
        'Defined product and experience specs for technical careers',
        'Acámica was acquired by Digital House in 2021',
      ],
      backContent:
        "Growth PM at an edtech that got acquired. Learned to work at the intersection of product, engineering and business — and how acquisitions change everything overnight.",
    },
    {
      id: 'naranja',
      label: 'Naranja · 2018–2019',
      company: 'Naranja',
      abbreviation: 'NAR',
      logo: '/logos/naranja_logo.png',
      color: '#c2410c',
      role: 'Senior Product Designer',
      dates: 'Mar 2018 – Jul 2019',
      bullets: [
        'Product Designer for the Payments unit',
        'Researched Argentine user profiles and their payment contexts',
        'Contributed to an omnichannel digital payments strategy',
      ],
      backContent:
        "Naranja is one of Argentina's biggest fintechs. Working on payments there meant understanding a huge range of users — many of whom had never used a digital product before.",
    },
    {
      id: 'mercadolibre',
      label: 'MercadoLibre · 2016–2018',
      company: 'MercadoLibre',
      abbreviation: 'MLC',
      logo: '/logos/mercadlibre_logo.png',
      color: '#d97706',
      role: 'User Experience Designer',
      dates: 'Jan 2016 – Aug 2018',
      bullets: [
        'Worked on Mercado Crédito and Mercado Pago',
        'Built solutions for financial inclusion across LatAm',
        'Designed credit access for users outside the banking system',
      ],
      backContent:
        "MercadoLibre at scale is a different kind of design challenge. The goal wasn't beautiful interfaces — it was getting credit to people who had never had a bank account.",
    },
  ],

  ideas: [
    {
      id: 'placeholder-1',
      title: 'Coming soon',
      description: 'Writing in progress',
      url: 'https://linkedin.com/in/alvarezquiros',
    },
  ],

  misc: [
    {
      id: 'placeholder-1',
      text: 'More coming soon',
      icon: '●',
    },
  ],

  connect: [
    { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/alvarezquiros' },
    { id: 'x', label: 'X / Twitter', url: 'https://x.com' },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
  ],
};
