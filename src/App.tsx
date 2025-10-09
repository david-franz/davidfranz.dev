import React from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import { jsPDF } from 'jspdf';
import {
  Mail, MapPin, Github, Linkedin, Download, ExternalLink,
  Code2, Database, Boxes, Cpu, Server, BookOpen, Sun, Moon
} from 'lucide-react';

const HEADSHOT_SRC = '/headshot.jpg';

const profile = {
  name: 'David Franz',
  location: 'Sydney', // updated
  phone: '+61 425 419 084',
  email: 'davidfranznz@gmail.com',
  github: 'https://github.com/david-franz',
  linkedin: 'https://www.linkedin.com/in/david-franz-48b6a6301/',
  summary:
    // appended hobbies to match your Markdown summary
    'Full-stack software engineer focused on JVM backends and TypeScript frontends, with interests in AI, compilers, algorithms, and formal methods. I enjoy building reliable APIs, visual tooling, and language infrastructure. Outside of software, I enjoy hiking, piano, and 3D animation.',
};

// Reordered so second row is ML/AI, DevOps, Databases (as requested)
const skills = [
  { title: 'Languages', icon: <Code2 className='w-4 h-4' />, items: ['Java', 'Kotlin', 'JavaScript', 'TypeScript', 'Python', 'C', 'C++'] },
  { title: 'Frontend', icon: <Boxes className='w-4 h-4' />, items: ['Angular', 'React', 'Knockout', 'HTML', 'CSS'] },
  { title: 'Backend', icon: <Server className='w-4 h-4' />, items: ['Spring', 'Spring Boot', 'Node', 'Express', 'Vert.x', 'FastAPI'] },
  { title: 'ML/AI', icon: <Cpu className='w-4 h-4' />, items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'LoRA', 'HuggingFace', 'LangChain', 'NLTK'] },
  { title: 'DevOps', icon: <BookOpen className='w-4 h-4' />, items: ['Linux', 'Git', 'Docker', 'AWS', 'Azure'] },
  { title: 'Databases', icon: <Database className='w-4 h-4' />, items: ['PostgreSQL', 'MongoDB', 'MariaDB'] },
];

// Added `stack` for each job
const experience = [
  {
    role: 'Software Engineer',
    company: 'Servicely',
    period: 'July 2024 – April 2025',
    location: 'Sydney',
    stack: 'Java, Kotlin, Spring, PostgreSQL, TypeScript, Angular, Knockout, AWS',
    bullets: [
      'Developed and maintained mobile REST APIs in Java/Kotlin with Spring.',
      'Maintained and enhanced existing backend REST APIs.',
      'Migrated Java APIs to Kotlin to improve maintainability and readability.',
      'Implemented new Angular pages and components with cross-device responsiveness.',
      'Migrated legacy Knockout/HTML/JS pages and renderers to modern Angular.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Solnet (acquired by Accenture)',
    period: 'Nov 2021 – May 2024',
    location: 'Wellington',
    stack: 'Java, Vert.x, MariaDB, TypeScript, React, Docker, Azure',
    bullets: [
      'Built a formal specification language with expression evaluation, types, variables/objects, subprocess management, grammar implementation, and AST generation/manipulation.',
      'Implemented a grammar-based natural-language system to create propositional logic.',
      'Integrated backend version-control features for a web IDE using JGit and Vert.x.',
      'Delivered complex React components, including a visualization tool for version-control histories.',
      'Managed WebSocket APIs for real-time client–server communication.',
    ],
  },
  {
    role: 'Research Assistant',
    company: 'Victoria University',
    period: 'Nov 2020 – Feb 2021',
    location: 'Wellington',
    stack: 'Racket, Redex',
    bullets: [
      'Translated concepts from an academic paper into a working prototype.',
      'Implemented formal syntax and semantics of a research-defined language in Racket/Redex leveraging temporal logic for program verification.',
      'Gained hands-on experience with formal methods, verification, and secure system design.',
    ],
  },
];

const projects = [
  {
    name: 'Flowtomic.ai',
    blurb:
      'Parent platform for the Flow*.dev tools — a unified umbrella for agentic workflows on the JVM, integrating the libraries and builders below.',
    stack: undefined,
  },
  {
    name: 'Flowlang.dev',
    blurb:
      'Compiler for a sandboxed-by-default JVM language (ANTLR lexer/parser → bytecode with ASM). Functional style with declarative task orchestration; features validated via examples and tests.',
    stack: 'Java, Spring Boot, ANTLR, ASM, React, TypeScript, Azure',
  },
  {
    name: 'Flowgraph.dev',
    blurb:
      'Lightweight TypeScript D3 wrapper with React support; reusable graph features and a visual playground for interactive templates used to build Flowtomic’s visual workflows.',
    stack: 'React, TypeScript, Azure',
  },
  {
    name: 'Flowform.dev',
    blurb:
      'Lightweight form library and visual builder interoperable with Flowgraph (for custom nodes); supports multiple field renderers and grouping (containers/tabs).',
    stack: 'React, TypeScript, Azure',
  },
];

const education = [
  { title: 'Postgraduate Diploma in Artificial Intelligence', org: 'Victoria University of Wellington', year: '2025' },
  { title: 'BSc in Computer Science & Mathematics', org: 'Victoria University of Wellington', year: '2021' },
];

function useTheme() {
  const [pref, setPref] = React.useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as any) || 'light');
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', pref === 'dark');
    localStorage.setItem('theme', pref);
  }, [pref]);
  const toggle = () => setPref(p => (p === 'dark' ? 'light' : 'dark'));
  return { pref, toggle } as const;
}

// Added spacing after each section via mb utilities (only change to the wrapper className)
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 mb-10 md:mb-14">
    <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold tracking-tight mb-4">
      {title}
    </motion.h2>
    {children}
  </section>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 text-xs leading-none">
    {children}
  </span>
);

export default function App() {
  const handleEmail = () => (window.location.href = `mailto:${profile.email}`);
  // Removed phone button/handler from the website (kept phone in Markdown as requested)
  const { pref, toggle } = useTheme();

  const buildMarkdown = (): string => {
    const lines: string[] = [];
    lines.push(`# ${profile.name}`);
    lines.push(`\n${profile.location} · ${profile.phone} · ${profile.email}`);
    lines.push(`\n## Summary\n${profile.summary}`);
    lines.push(`\n## Skills`);
    skills.forEach(cat => lines.push(`- **${cat.title}:** ${cat.items.join(', ')}`));
    lines.push(`\n## Experience`);
    experience.forEach(e => {
      lines.push(`\n**${e.role} — ${e.company}**`);
      lines.push(`*${e.period} · ${e.location}*`);
      if ((e as any).stack) lines.push(`*Stack:* ${(e as any).stack}`); // include stack lines in Markdown too
      e.bullets.forEach(b => lines.push(`- ${b}`));
    });
    lines.push(`\n## Projects`);
    lines.push(`- **Flowtomic.ai** — Parent platform for the Flow*.dev tools.`);
    projects.filter(p=>p.name!== 'Flowtomic.ai').forEach(p => {
      lines.push(`- **${p.name}** — ${p.blurb}` + (p.stack ? `  \n  *Stack:* ${p.stack}` : ''));
    });
    lines.push(`\n## Education`);
    education.forEach(ed => lines.push(`- **${ed.title}** — ${ed.org} (${ed.year})`));
    return lines.join('\n');
  };

  const handleSave = () => {
    const a = document.createElement('a');
    a.href = '/cv.pdf';
    a.download = 'David_Franz_CV.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen text-base antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={HEADSHOT_SRC} alt="David Franz" className="h-10 w-10 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800" loading="eager" />
            <div>
              <h1 className="text-lg font-bold leading-tight">{profile.name}</h1>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {profile.location}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-3 text-sm">
            {[
              ['summary', 'Summary'],
              ['skills', 'Skills'],
              ['experience', 'Experience'],
              ['projects', 'Projects'],
              ['education', 'Education'],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:underline underline-offset-4" data-testid={`nav-${id}`}>
                {label}
              </a>
            ))}

            <button onClick={toggle} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm" aria-label="Toggle theme">
              {pref === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} {pref === 'dark' ? 'Light' : 'Dark'}
            </button>

            <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm hover:shadow-sm">
              <Download className="w-4 h-4" /> Save
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Section id="summary" title="Summary">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 bg-white dark:bg-neutral-900">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm md:text-base max-w-3xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                {profile.summary}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm">
                  <Github className="w-4 h-4" /> GitHub <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button onClick={handleEmail} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm">
                  <Mail className="w-4 h-4" /> Email
                </button>
                {/* phone button removed */}
              </div>
            </div>
          </motion.div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((cat) => (
              <div key={cat.title} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
                <div className="flex items-center gap-2 mb-3">
                  {cat.icon}
                  <h3 className="font-medium">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="grid gap-4">
            {experience.map((e) => (
              <div key={e.company + e.role} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <h3 className="text-lg font-semibold">{e.role} — {e.company}</h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{e.period} · {e.location}</p>
                </div>
                {/* show Stack line under header row */}
                {('stack' in e) && e.stack && (
                  <p className="text-xs mt-1"><span className="font-semibold">Stack:</span> {e.stack}</p>
                )}
                <ul className="mt-3 list-disc list-inside space-y-1.5 text-sm">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900">
              <h3 className="text-xl font-semibold">Flowtomic.ai — parent platform</h3>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Parent platform for the Flow*.dev tools — a unified umbrella for agentic workflows on the JVM, integrating the libraries and builders below.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>Flowlang.dev</Chip>
                <Chip>Flowgraph.dev</Chip>
                <Chip>Flowform.dev</Chip>
              </div>
            </div>

            {projects.filter(p => p.name !== 'Flowtomic.ai').map((p) => (
              <div key={p.name} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900">
                <h3 className="text-lg font-semibold flex items-center gap-2">{p.name}</h3>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{p.blurb}</p>
                {p.stack && <p className="mt-3 text-xs"><span className="font-semibold">Stack:</span> {p.stack}</p>}
              </div>
            ))}
          </div>
        </Section>

        {/* Education now as a bullet list */}
        <Section id="education" title="Education">
          <ul className="list-disc list-inside space-y-2">
            {education.map((ed) => (
              <li key={ed.title}>
                <span className="font-semibold">{ed.title}</span> — {ed.org} ({ed.year})
              </li>
            ))}
          </ul>
        </Section>

        <footer className="mt-12 mb-8 text-xs text-neutral-600 dark:text-neutral-400 text-center">
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </main>

      <style>{`
        @media print {
          header { display: none; }
          a::after { content: " (" attr(href) ")"; font-size: 10px; }
          .rounded-2xl { border-radius: 0.5rem; }
          .border { border-color: #ddd !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .p-5, .p-4 { padding: 0.75rem !important; }
          .py-8 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
