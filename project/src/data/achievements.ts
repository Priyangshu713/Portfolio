export interface Achievement {
  title: string;
  platform: string; // issuing body or platform
  year: string;
  description: string;
  icon: 'book' | 'award' | 'graduation';
  certificate?: string;
}

export const achievements: Achievement[] = [
  {
    title: 'National Service Scheme (NSS)',
    platform: 'Global Institue of Science and Technology',
    year: '2022 - 2025',
    description: 'Completed 3 years of NSS',
    icon: 'award',
    certificate: '/certificates/NSS.jpg',
  },
  {
    title: 'English Communication and IT (Back Office)',
    platform: 'Hindustan Unilever Limited',
    year: 'Dec 2024 - Mar 2025',
    description: 'Completed English Communication and IT (Back Office) training.',
    icon: 'book',
    certificate: '/certificates/HUL_english_it.jpg',
  },
  {
    title: 'Industrial Training',
    platform: 'Euphoria GenX',
    year: 'July 2024 - Aug 2024',
    description: 'Completed Industrial Training on Machine Learning and Data Visualization.',
    icon: 'graduation',
    certificate: '/certificates/I_traning.jpg',
  },
];
