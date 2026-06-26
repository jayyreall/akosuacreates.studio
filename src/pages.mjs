export const navigation = [
  { label: 'About The Artist', href: '/about/' },
  {
    label: 'Portfolio',
    href: '/portfolio/digital-art/',
    children: [
      { label: 'Digital Art', href: '/portfolio/digital-art/' },
      { label: 'Physical Art', href: '/portfolio/physical-art/' },
    ],
  },
  { label: 'Poetry', href: '/poetry/' },
];

export const pages = [
  {
    path: '/',
    title: 'Akosua Creates',
    eyebrow: 'artist studio',
    description:
      'A quiet studio space for ink, paper, poetry, and tactile works in progress.',
    home: true,
  },
  {
    path: '/about/',
    title: 'About The Artist',
    eyebrow: 'artist note',
    description:
      'A placeholder introduction for Akosua: the maker, observer, and hand behind the work.',
  },
  {
    path: '/portfolio/digital-art/',
    title: 'Digital Art',
    eyebrow: 'portfolio',
    description:
      'A placeholder gallery for digital drawings, visual experiments, and screen-based studies.',
  },
  {
    path: '/portfolio/physical-art/',
    title: 'Physical Art',
    eyebrow: 'portfolio',
    description:
      'A placeholder gallery for paper works, objects, paintings, and pieces made by hand.',
  },
  {
    path: '/poetry/',
    title: 'Poetry',
    eyebrow: 'words',
    description:
      'A placeholder room for poems, fragments, field notes, and intimate written pieces.',
  },
];
