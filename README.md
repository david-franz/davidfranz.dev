# David Franz
Sydney · +61 425 419 084 · davidfranznz@gmail.com · [davidfranz.dev](https://davidfranz.dev) · [github.com/david-franz](https://github.com/david-franz) · [linkedin.com/in/david-franz-48b6a6301](https://www.linkedin.com/in/david-franz-48b6a6301/)

## Summary
Full-stack software engineer focused on AI and LLM applications in Python, JVM backends, and TypeScript frontends, with interests in compilers, algorithms, and formal methods. I enjoy building reliable APIs, visual tooling, and language infrastructure. Outside of software, I enjoy hiking, making music, and game development.

## Skills
- **Languages:** Java, Kotlin, JavaScript, TypeScript, Python, C, C++
- **Frontend:** React, Angular, Knockout, HTML, CSS
- **Backend:** Spring, Spring Boot, Node, Express, Vert.x, FastAPI
- **ML/AI:** PyTorch, TensorFlow, Keras, scikit-learn, LoRA, HuggingFace, LangChain, NLTK
- **DevOps/Platforms:** Linux, Git, Docker, Terraform, AWS, Azure
- **Databases:** PostgreSQL, Alembic, MongoDB, MariaDB

## Experience
**Technical Consultant — Palo IT**  
*Jan 2026 – Present · Sydney*  
*Stack:* Python, PostgreSQL, Alembic, AWS (Lambda, SQS), Terraform, React, TypeScript  
Software engineering consultant working with a major Australian radiology company to develop a new RIS (Radiology Information System).
- Contributed to the system design of the RIS, helping design a variety of key services and features end to end.  
- Worked with key stakeholders to gather requirements and turn them into solutions.  
- Built and maintained the core data service in Python and PostgreSQL (Alembic), used for authoring data consumed by other services and kept in sync via SQS and a transactional outbox; deployed as a Lambda on AWS.  
- Built and maintained a room note classifier service that dynamically ingests notes from the existing RIS calendar and converts raw notes into rule assignments, staff assignments, and room blocks.  
- Built a responsive React application for managing the core data service.  
- Built a data seed ingestion pipeline from static CSV and API data.  
- Built Terraform pipelines for deploying services.

**Software Engineer — Servicely**  
*July 2024 – April 2025 · Sydney*  
*Stack:* Java, Kotlin, Spring, PostgreSQL, TypeScript, Angular, Knockout, AWS  
- Maintained and enhanced existing backend REST APIs.  
- Developed and maintained mobile REST APIs in Java/Kotlin with Spring.  
- Migrated Java APIs to Kotlin to improve maintainability and readability.  
- Implemented new Angular pages and components with cross-device responsiveness.  
- Migrated legacy Knockout/HTML/JS pages and renderers to modern Angular.

**Software Engineer — Solnet (acquired by Accenture)**  
*Nov 2021 – May 2024 · Wellington*  
*Stack:* Java, Vert.x, MariaDB, TypeScript, React, Docker, Azure  
- Built a formal specification language with expression evaluation, type definitions, variable/object handling, subprocess management, grammar implementation, and AST generation/manipulation.  
- Implemented a grammar-based natural-language system to create propositional logic.  
- Integrated backend version-control features for a web IDE using JGit and Vert.x.  
- Delivered complex React components, including a visualization tool for version-control histories.  
- Managed WebSocket APIs for real-time client–server communication.

**Research Assistant — Victoria University**  
*Nov 2020 – Feb 2021 · Wellington*  
*Stack:* Racket, Redex  
- Translated concepts from an academic paper into a working prototype.  
- Implemented formal syntax and semantics of a research-defined language in Racket/Redex leveraging temporal logic for program verification.  
- Gained hands-on experience with formal methods, verification, and secure system design.

## Projects
- **[ctx-sys](https://github.com/david-franz/ctx-sys)** — Local hybrid RAG over a code knowledge graph. Indexes a codebase with tree-sitter, embeddings, and a relationship graph, then serves precise context to any AI assistant over MCP — fusing keyword (FTS5), vector, and graph search with reciprocal rank fusion. Local-first via Ollama.  
  *Stack:* TypeScript, Node, SQLite (FTS5, sqlite-vec), tree-sitter, Ollama, MCP.

- **[yaao](https://github.com/david-franz/yaao)** — Plans, converts, and runs multi-agent software work across parallel git worktrees, with dependency-aware branching, topological merge-back, and validation-gated merges. Agent-agnostic (Claude Code, Cursor, Copilot, Codex, raw API) and MCP-first; ships a CLI, an MCP server, and a live web viewer.  
  *Stack:* TypeScript, Node, Hono, MCP, Git.

- **[flowlang](https://github.com/david-franz/flowlang.dev)** — Compiler for a small, strongly-typed JVM language (ANTLR4 grammar → typed AST → bytecode via ASM) blending functional collections, structural records, pattern matching, and declarative task orchestration. Includes a web playground backed by a Spring Boot run API, with hundreds of categorized tests.  
  *Stack:* Java, ANTLR, ASM, Spring Boot, React, TypeScript.

- **[strobe](https://github.com/david-franz/strobe)** — Live-coding music library: patterns and effects are written in TypeScript using the TidalCycles pattern model and hot-reloaded while playing, while a Rust engine renders synthesis, a per-track effects rack, and sampling on a real-time audio thread.  
  *Stack:* Rust, TypeScript.

- **Meridian** — Deep-simulation city builder inspired by Cities: Skylines and SimCity. Simulates cities down to the household and models each trip — mode choice, transfers, congestion — across a region of cities that trade and commute. Soundtrack generated programmatically with strobe.  
  *Stack:* C#, Godot, Blender, Python.

- **[CNN Skin Cancer Detector](https://github.com/david-franz/cnn-skin-cancer-detector)** — CNNs for classifying skin lesions in the ISIC dataset into 9 conditions, grouped as cancerous, precancerous, or benign. Reproduced a baseline CNN from the literature, then designed a parallel-kernel CNN (five kernel sizes, 3 to 27) that raised 9-class validation accuracy from 58.9% to 63.2% and cancer recall from 79% to 84%. Accompanied by a written report covering false negatives, dataset bias, and the safety risks of the approach.  
  *Stack:* Python, PyTorch, Jupyter, Google Colab.

## Education
- **BSc in Computer Science & Mathematics** — Victoria University of Wellington, 2021
