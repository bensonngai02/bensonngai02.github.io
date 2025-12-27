// Data source for projects; edit to update project cards.
export const projects = [
  {
    name: 'SilverAI',
    archived: false,
    link: 'https://github.com/mna1024/HackMIT_2022_SilverAI',
    icon: '🗣',
    period: '2022',
    summary: 'Digital speech pathologist - HackMIT 2022 Social Impact Prize 🏅',
    details: [
      '📱 Developed a digital speech pathologist React.js + Flask web app in Python and JavaScript.',
      '👄 Visual lip-tracker using facemesh detection to analyze lip movement correctness.',
      {
        text: '🔊 Audio analyzer using a spectrogram [CNN] to analyze pronunciation correctness.',
        links: [{ label: 'CNN', href: 'https://en.wikipedia.org/wiki/Convolutional_neural_network', buzzword: true }],
      }
    ],
    tags: ['React', 'Flask', 'Python', 'ML'],
    media: [
      { src: '/assets/projects/silverai-ui.png', size: 'large' },
      { src: '/assets/projects/silverai-lip-tracker.png', size: 'large' },
    ],
  },
  {
    name: 'PONZI',
    archived: false,
    link: 'https://github.com/bensonngai02/ponzi',
    icon: '⛏️',
    period: '2021',
    summary: "SECD (Landin's Machine) emulator for Scheme's lambda calculus instruction set",
    details: [
      {
        text: '🧤 Developed an [SECD Machine] (aka. Landin’s Machine) emulator using C and C++ for Scheme, a Lisp-based functional programming language.',
        links: [{ label: 'SECD Machine', href: "https://en.wikipedia.org/wiki/SECD_machine#Landin's_contribution", buzzword: true }],
      },
      '📑 Supported entire instruction set to compute lambda calculus expressions.',
      '🎤 Presented to computer architecture class.',
    ],
    tags: ['C', 'C++'],
    media: ['https://www.youtube.com/embed/IHhq0pkws5Q'],
  },
];
