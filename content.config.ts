import type { SiteContent } from '@/types';

export const content: SiteContent = {
  identity: {
    name: 'Elon',
    label: 'product builder & leader',
  },

  work: [
    {
      id: 'paypal',
      label: 'PayPal · 1999–2002',
      company: 'PayPal',
      abbreviation: 'PPL',
      color: '#003087',
      role: 'Co-founder & CEO',
      dates: '1999 – 2002',
      bullets: [
        'Co-founded X.com, merged with Confinity to become PayPal',
        'Defined product vision for internet-native payments at scale',
        'Led company through $1.5B eBay acquisition',
      ],
      backContent:
        'The early internet-payments space was raw chaos. X.com was built on the bet that money could move like email — instantly, borderlessly. The Confinity merger was painful but the right call.',
    },
    {
      id: 'spacex',
      label: 'SpaceX · 2002–present',
      company: 'SpaceX',
      abbreviation: 'SPX',
      color: '#1a1a2e',
      role: 'Founder, CEO & CTO',
      dates: '2002 – present',
      bullets: [
        'Built the first privately funded rocket to reach orbit',
        'Made reusable launch vehicles the industry standard',
        'Reduced cost-per-kg to orbit by over 90%',
      ],
      backContent:
        'Three consecutive launch failures nearly killed everything. The company had enough money for one more attempt. Falcon 1 Flight 4 worked. That was the moment everything changed.',
    },
    {
      id: 'tesla',
      label: 'Tesla · 2008–present',
      company: 'Tesla',
      abbreviation: 'TSL',
      color: '#cc0000',
      role: 'CEO & Product Architect',
      dates: '2008 – present',
      bullets: [
        "Rebooted a failing EV startup into the world's most valuable car company",
        'Drove the software-defined vehicle paradigm across the industry',
        'Launched Autopilot and full self-driving as consumer products',
      ],
      backContent:
        "The car industry had not changed its fundamental operating model in 100 years. Tesla is not a car company — it's a software company that makes cars. That distinction drives every product decision.",
    },
    {
      id: 'boring',
      label: 'Boring Co · 2016–present',
      company: 'The Boring Company',
      abbreviation: 'TBC',
      color: '#e8a838',
      role: 'Founder',
      dates: '2016 – present',
      bullets: [
        'Founded to reduce urban tunnel construction costs by 10x',
        'Built and operated the Las Vegas Convention Center Loop',
        'Repositioned infrastructure as a product design problem',
      ],
      backContent:
        "I was stuck in LA traffic for two hours. Started a tunnel company. The real insight is that construction hasn't been innovated in decades — it's a software problem disguised as a civil engineering problem.",
    },
    {
      id: 'x',
      label: 'X · 2022–present',
      company: 'X',
      abbreviation: 'X',
      color: '#111111',
      role: 'Owner & CTC',
      dates: '2022 – present',
      bullets: [
        'Acquired and privatized Twitter for $44B',
        'Cut headcount by 80% while maintaining platform uptime',
        'Rebuilding X as an everything-app: payments, video, AI',
      ],
      backContent:
        'Free speech is the load-bearing pillar of democracy. Twitter was the de facto public square and it was being run in ways that undermined open discourse. The acquisition was necessary.',
    },
    {
      id: 'xai',
      label: 'xAI · 2023–present',
      company: 'xAI',
      abbreviation: 'xAI',
      color: '#5b2d8e',
      role: 'Founder & CEO',
      dates: '2023 – present',
      bullets: [
        'Founded to build AI that actually understands the universe',
        'Launched Grok as a real-time, X-integrated LLM',
        'Positioned xAI as counterweight to OpenAI and Google DeepMind',
      ],
      backContent:
        "The most important question in AI is not 'can we build it' — it's 'will it be curious?' An AI that genuinely wants to understand reality is aligned with humanity by definition. That's the thesis.",
    },
  ],

  ideas: [
    {
      id: 'reusable-rockets',
      title: 'Why Rockets Should be Reusable',
      description: 'First principles thinking on why the aerospace industry was wrong for 60 years',
      url: 'https://x.com',
    },
    {
      id: 'cost-of-complexity',
      title: 'The Cost of Complexity',
      description: 'Why most software has too many features and how to fix it',
      url: 'https://x.com',
    },
    {
      id: 'vegas-loop',
      title: 'Las Vegas Loop: What We Learned',
      description: 'Lessons from designing and building infrastructure as a product',
      url: 'https://x.com',
    },
  ],

  misc: [
    {
      id: 'fermi',
      text: 'Obsessed with the Fermi Paradox and why silence is the scariest answer',
      icon: '★',
    },
    {
      id: 'hitchhiker',
      text: 'Reading: "The Hitchhiker\'s Guide to the Galaxy" for the 11th time',
      icon: '♦',
    },
    {
      id: 'saxophone',
      text: 'Currently learning to play the saxophone (badly)',
      icon: '●',
    },
    {
      id: 'cities',
      text: 'Hot take: cities should be designed for walking, not cars',
      icon: '★',
    },
  ],

  connect: [
    { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
    { id: 'x', label: 'X / Twitter', url: 'https://x.com/elonmusk' },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
  ],
};
