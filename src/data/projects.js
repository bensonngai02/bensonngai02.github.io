// Data source for projects; edit to update project cards.
export const projects = [
  {
    company: 'rendr',
    archived: false,
    link: 'https://devpost.com/software/rendr-dev',
    logo: '/assets/projects/rendr.png',
    period: '2023',
    role: 'No-code AI development tool for fast, fluid front-end development.',
    github: 'https://github.com/rendr-dev/rendr/tree/main',
    location: 'HackMIT',
    summary: '',
    expanded: [
      { text: '🏆 HackMIT 2023 Y Combinator 1st Prize & Best AI Application Hack 2nd Prize.' },
      { text: '⚡ Built a no-code AI front-end builder with fast iteration and fluid edits.' },
    ],
    tags: ['React', 'Python', 'PostgreSQL'],
    media: [],
  },
  {
    company: 'SilverAI',
    archived: false,
    github: 'https://github.com/mna1024/HackMIT_2022_SilverAI',
    icon: '🗣',
    period: '2022',
    role: 'Digital speech pathologist',
    location: 'HackMIT',
    summary: '',
    expanded: [
      { text: '🏆 HackMIT 2022 Social Impact Prize' },
      { text: '📱 Digital speech pathologist web app to aid those with speech impairments.' },
      { text: '👄 Visual lip-tracker using facemesh detection to analyze lip movement correctness.' },
      {
        text: '🔊 Audio analyzer using a spectrogram [CNN] to analyze pronunciation correctness.',
        links: [{ label: 'CNN', href: 'https://en.wikipedia.org/wiki/Convolutional_neural_network', buzzword: true }],
      }
    ],
    tags: ['React', 'Flask', 'Python'],
    media: [
      { src: '/assets/projects/silverai-ui.png', size: 'medium' },
      { src: '/assets/projects/silverai-lip-tracker.png', size: 'medium' },
    ],
  },
  {
    company: 'PONZI',
    archived: false,
    link: 'https://github.com/bensonngai02/ponzi',
    icon: '⛏️',
    period: '2021',
    role: "SECD (Landin's Machine) emulator for Scheme's lambda calculus instruction set",
    location: 'Computer Architecture Final Project',
    github: 'https://github.com/bensonngai02/ponzi',
    summary: '',
    expanded: [
      {
        text: '🧤 Developed an [SECD Machine] (aka. Landin’s Machine) emulator using C and C++ for Scheme, a Lisp-based functional programming language.',
        links: [{ label: 'SECD Machine', href: "https://en.wikipedia.org/wiki/SECD_machine#Landin's_contribution", buzzword: true }],
      },
      { text: '📑 Supported entire instruction set to compute lambda calculus expressions.' },
    ],
    tags: ['C', 'C++'],
    media: [{src: 'https://www.youtube.com/embed/IHhq0pkws5Q', size: 'medium'}],
  },
];
