// About section data; edit to change hero/summary text and social links.

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bensonngai02/' },
  { label: 'GitHub', href: 'https://github.com/bensonngai02' },
];

// Structured about content used by the About section; edit here to change copy.
export const aboutContent = {
  greetingEmoji: '👋🏼',
  heading: 'about me',
  paragraphs: [
    {
      text: "I love working at the intersection of software engineering and ML. \
            I enjoy learning about and solving complex problems in distributed systems, databases, backend engineering, computer vision, and recommenders.",
      links: [
        { label: 'Turing Scholars CS Honors', href: 'https://www.cs.utexas.edu/turing-scholars' },
        { label: 'Texas Club Tennis', href: 'https://texasclubtennis.com'}
      ],
    },
    {
      text: "🎓 I studied [CS] + [Math] @ [UT Austin] in the [Turing Scholars Honors] program 🤘🏼, and was actively part of [Texas Club Tennis].",
      links: [
        { label: 'CS', href: 'https://www.cs.utexas.edu'},
        { label: 'Math', href: 'https://math.utexas.edu'},
        { label: 'UT Austin', href: 'https://www.utexas.edu'},
        { label: 'Turing Scholars Honors', href: 'https://www.cs.utexas.edu/turing-scholars' },
        { label: 'Texas Club Tennis', href: 'https://texasclubtennis.com'}
      ],
    },
    {
      text: "In my free time, you can catch me playing tennis 🎾, working out 🏋🏻, trying new restaurants 🍣, cooking 🍳, exploring nature 🌲, and traveling ✈️.",
    },
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bensonngai02/', icon: '/assets/about/linkedin.png' },
    { label: 'GitHub', href: 'https://github.com/bensonngai02', icon: '/assets/about/github.png' },
  ],
};
