#!/usr/bin/env node
/**
 * BuildProof Seed Script
 * Creates 20 sample users (10 developers + 10 recruiters) with profiles,
 * projects, jobs, and LinkedIn-style posts.
 *
 * Usage: node scripts/seed.mjs
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Load .env manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)="?([^"]*)"?$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ============ SAMPLE DATA ============

const DEVELOPERS = [
  { name: 'Aryan Mehta', email: 'aryan.mehta@buildproof.dev', title: 'Full Stack Engineer', bio: 'Building production-grade web apps with Next.js and Supabase. Open source enthusiast.', tech_stack: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Tailwind'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aryan' },
  { name: 'Priya Sharma', email: 'priya.sharma@buildproof.dev', title: 'AI/ML Engineer', bio: 'Turning data into insights. LLM fine-tuning, RAG pipelines, and production ML.', tech_stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Docker'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
  { name: 'Lucas Oliveira', email: 'lucas.oliveira@buildproof.dev', title: 'Backend Engineer', bio: 'Microservices, distributed systems, and cloud-native architectures on AWS.', tech_stack: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas' },
  { name: 'Sara Kim', email: 'sara.kim@buildproof.dev', title: 'Frontend Developer', bio: 'Obsessed with pixel-perfect UIs and smooth animations. CSS is my love language.', tech_stack: ['React', 'Vue.js', 'CSS', 'Framer Motion', 'Figma'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara' },
  { name: 'Dev Patel', email: 'dev.patel@buildproof.dev', title: 'Mobile Developer', bio: 'Cross-platform mobile apps with React Native. 5 apps in the Play Store.', tech_stack: ['React Native', 'Expo', 'Firebase', 'Redux', 'Jest'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev' },
  { name: 'Chen Wei', email: 'chen.wei@buildproof.dev', title: 'DevOps Engineer', bio: 'CI/CD pipelines, infrastructure as code, and cloud cost optimization.', tech_stack: ['Terraform', 'GitHub Actions', 'Docker', 'AWS', 'Prometheus'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen' },
  { name: 'Aisha Abdullah', email: 'aisha.abdullah@buildproof.dev', title: 'Blockchain Developer', bio: 'Smart contracts, DeFi protocols, and Web3 integrations using Solidity.', tech_stack: ['Solidity', 'Ethereum', 'Hardhat', 'React', 'Web3.js'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aisha' },
  { name: 'Marco Russo', email: 'marco.russo@buildproof.dev', title: 'Security Engineer', bio: 'Penetration testing, vulnerability assessments, and secure code reviews.', tech_stack: ['Python', 'Burp Suite', 'Linux', 'OWASP', 'Rust'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marco' },
  { name: 'Neha Kapoor', email: 'neha.kapoor@buildproof.dev', title: 'Data Engineer', bio: 'Building data pipelines at scale. Kafka, Spark, and dbt enthusiast.', tech_stack: ['Python', 'Apache Spark', 'dbt', 'BigQuery', 'Airflow'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha' },
  { name: 'James Wilson', email: 'james.wilson@buildproof.dev', title: 'Game Developer', bio: 'Indie game developer. Unity + C# by day, Godot + GDScript by night.', tech_stack: ['Unity', 'C#', 'Godot', 'Blender', 'HLSL'], avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james' },
];

const RECRUITERS = [
  { name: 'Riya Agarwal', email: 'riya.agarwal@buildproof.dev', title: 'Senior Technical Recruiter', bio: 'Connecting top engineers with mission-driven companies. 8 years in tech hiring.', company: 'TechHunt India', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riya' },
  { name: 'Tom Bradley', email: 'tom.bradley@buildproof.dev', title: 'Head of Talent', bio: 'Building world-class engineering teams for Series A-C startups. Let\'s talk!', company: 'StartupScale', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom' },
  { name: 'Sunita Rao', email: 'sunita.rao@buildproof.dev', title: 'HR Manager', bio: 'HR professional focused on engineering culture, compensation benchmarking, and DEI.', company: 'InnovateTech', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunita' },
  { name: 'David Park', email: 'david.park@buildproof.dev', title: 'Engineering Recruiter', bio: 'Ex-SWE turned recruiter. I know what makes a great engineer because I was one.', company: 'CodeTalent', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
  { name: 'Maya Fischer', email: 'maya.fischer@buildproof.dev', title: 'Talent Acquisition Lead', bio: 'Specialist in AI/ML, blockchain, and cloud engineering roles globally.', company: 'GlobalHire', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya' },
  { name: 'Raj Gupta', email: 'raj.gupta@buildproof.dev', title: 'People Operations Lead', bio: 'Scaling engineering orgs from 5 to 500. Culture first, always.', company: 'ScaleUp HR', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raj' },
  { name: 'Sofia Martinez', email: 'sofia.martinez@buildproof.dev', title: 'Tech Talent Partner', bio: 'Recruiting for FAANG and unicorn startups. 500+ engineers placed in 6 years.', company: 'Elite Tech Recruit', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia' },
  { name: 'Ali Hassan', email: 'ali.hassan@buildproof.dev', title: 'HRBP - Engineering', bio: 'HR Business Partner embedded with engineering to align people strategy with product goals.', company: 'ProductFirst', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali' },
  { name: 'Emily Chen', email: 'emily.chen@buildproof.dev', title: 'Campus Recruiter', bio: 'Hiring top fresh graduates from IITs, NITs, and global universities.', company: 'NextGen Talent', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily' },
  { name: 'Vikram Singh', email: 'vikram.singh@buildproof.dev', title: 'Recruitment Director', bio: 'Leading a team of 15 recruiters. We place 200+ engineers per year across India & SE Asia.', company: 'HireIndia', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram' },
];

const SAMPLE_PROJECTS = [
  { title: 'AI Resume Screener', problem_solved: 'Manual resume screening takes 40+ hours per week. This AI tool reduces it to under 2 hours using LLMs.', tech_stack: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'PostgreSQL'], category: 'AI', github_link: 'https://github.com/sample/ai-resume-screener', live_link: 'https://ai-resume.demo.com' },
  { title: 'CodeCollab — Real-time Pair Programming', problem_solved: 'Remote pair programming is slow and frustrating with existing tools. CodeCollab provides sub-100ms latency collaborative coding.', tech_stack: ['React', 'WebSockets', 'Node.js', 'Monaco Editor', 'Redis'], category: 'Full Stack', github_link: 'https://github.com/sample/codecollab' },
  { title: 'DeFi Portfolio Tracker', problem_solved: 'Tracking multi-chain crypto portfolios requires 5+ apps. This dashboard aggregates everything in one view.', tech_stack: ['Solidity', 'Web3.js', 'React', 'The Graph', 'Moralis'], category: 'Frontend', github_link: 'https://github.com/sample/defi-tracker', live_link: 'https://defi-track.demo.com' },
  { title: 'K8s Cost Optimizer', problem_solved: 'Teams overspend on Kubernetes clusters by 40% on average. This tool analyzes usage and recommends right-sizing.', tech_stack: ['Go', 'Kubernetes', 'Prometheus', 'Grafana', 'AWS'], category: 'Backend', github_link: 'https://github.com/sample/k8s-optimizer' },
  { title: 'BugHunter — Zero-Day Scanner', problem_solved: 'Security teams manually audit codebases for OWASP vulnerabilities. BugHunter automates detection with 95% accuracy.', tech_stack: ['Python', 'AST Parsing', 'Docker', 'FastAPI', 'React'], category: 'Backend', github_link: 'https://github.com/sample/bughunter', live_link: 'https://bughunter.demo.com' },
  { title: 'FitTrack Mobile App', problem_solved: 'Most fitness apps are bloated. FitTrack is a minimal, offline-first workout tracker with smart rest timers.', tech_stack: ['React Native', 'Expo', 'SQLite', 'Redux', 'TypeScript'], category: 'Mobile', github_link: 'https://github.com/sample/fittrack' },
  { title: 'DataPipelineOS', problem_solved: 'Building ETL pipelines requires gluing 6 different tools. DataPipelineOS provides a unified visual pipeline builder.', tech_stack: ['Python', 'Apache Kafka', 'dbt', 'Airflow', 'React'], category: 'Backend', github_link: 'https://github.com/sample/datapipeline-os' },
  { title: 'PixelCraft — Browser Game Engine', problem_solved: 'Existing browser game engines are too complex for indie devs. PixelCraft makes 2D game development as easy as writing HTML.', tech_stack: ['TypeScript', 'WebGL', 'WebAssembly', 'Canvas API'], category: 'Frontend', github_link: 'https://github.com/sample/pixelcraft', live_link: 'https://pixelcraft.demo.com' },
];

const SAMPLE_JOBS = [
  { title: 'Senior Full Stack Engineer', description: 'Join our fast-growing Series B startup. You\'ll own the entire product stack — Next.js frontend, Node.js APIs, and PostgreSQL. We ship weekly and value autonomy over process.', tech_stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'], salary: '₹35-55 LPA', location: 'Bengaluru (Hybrid)', job_type: 'Full-time', apply_link: 'https://jobs.buildproof.dev/job1' },
  { title: 'ML Engineer — LLM Products', description: 'We\'re building the next-gen AI coding assistant. You\'ll work on fine-tuning LLMs, building RAG pipelines, and deploying models at scale.', tech_stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Kubernetes'], salary: '$150,000 - $220,000', location: 'Remote (US)', job_type: 'Full-time', apply_link: 'https://jobs.buildproof.dev/job2' },
  { title: 'DevOps / Platform Engineer', description: 'Own our cloud infrastructure on AWS. Implement self-service developer platforms, IaC with Terraform, and reduce deployment times by 60%.', tech_stack: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions'], salary: '₹28-45 LPA', location: 'Remote (India)', job_type: 'Full-time', apply_link: 'https://jobs.buildproof.dev/job3' },
  { title: 'React Native Developer', description: 'Build our flagship mobile app used by 500k+ users. You\'ll drive architecture decisions and mentor junior devs on a 4-person mobile team.', tech_stack: ['React Native', 'TypeScript', 'Redux', 'Expo', 'Firebase'], salary: '₹20-35 LPA', location: 'Pune (On-site)', job_type: 'Full-time', apply_link: 'https://jobs.buildproof.dev/job4' },
  { title: 'Blockchain Developer (Solidity)', description: 'DeFi protocol looking for a senior Solidity dev. You\'ll audit and develop smart contracts managing $50M+ TVL. Security-first mindset required.', tech_stack: ['Solidity', 'Hardhat', 'Ethers.js', 'OpenZeppelin', 'The Graph'], salary: '$120,000 - $180,000 + tokens', location: 'Remote', job_type: 'Contract', apply_link: 'https://jobs.buildproof.dev/job5' },
  { title: 'Backend Engineer (Go)', description: 'Build high-throughput microservices handling 1M+ req/day. We love Go, clean code, and engineers who think about distributed systems deeply.', tech_stack: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'Kafka'], salary: '$110,000 - $160,000', location: 'Remote (Europe)', job_type: 'Full-time', apply_link: 'https://jobs.buildproof.dev/job6' },
  { title: 'Frontend Engineer — Design Systems', description: 'Own our component library used across 10+ products. You\'ll partner with design to build accessible, performant, and beautiful UI components.', tech_stack: ['React', 'TypeScript', 'Storybook', 'Radix UI', 'CSS'], salary: '₹22-38 LPA', location: 'Bengaluru (Hybrid)', job_type: 'Full-time', apply_link: 'https://jobs.buildproof.dev/job7' },
];

const DEVELOPER_POSTS = [
  { content: '🚀 Just shipped my AI Resume Screener to production! It reduced our HR team\'s screening time from 40 hours/week to under 2 hours. Built with LangChain + FastAPI + Next.js.\n\nThe key insight: don\'t try to replace human judgment — just filter the obvious "no"s automatically and let humans focus on the "maybe"s.\n\nOpen source: github.com/sample/ai-resume-screener\n\n#AI #OpenSource #BuildInPublic', post_type: 'project_showcase', tags: ['AI', 'OpenSource', 'BuildInPublic'] },
  { content: 'Hot take: Most developers over-engineer their database layer.\n\nFor 90% of startups, a single PostgreSQL instance with good indexes will outperform a complex microservices + NoSQL setup — and be 10x easier to debug.\n\nYou can always scale later. You can\'t always debug your over-engineered mess.\n\n#WebDev #PostgreSQL #Engineering', post_type: 'general', tags: ['WebDev', 'PostgreSQL'] },
  { content: 'I\'ve been coding for 6 years and I still Google how to center a div.\n\nIf anyone tells you they have everything memorized, they\'re lying.\n\nThe skill isn\'t memorization. It\'s knowing what to search for and evaluating the results critically. 🙏\n\n#100DaysOfCode #WebDev', post_type: 'general', tags: ['100DaysOfCode'] },
  { content: '📊 6 months of learning Kubernetes in public — what I wish I knew from day 1:\n\n1. Start with a managed cluster (EKS/GKE). Don\'t self-host yet.\n2. Learn kubectl before Helm\n3. Resource limits are not optional — set them ALWAYS\n4. Use Lens IDE, it saves hours\n5. Read the official docs, not just tutorials\n\nWhat else would you add? 👇\n\n#Kubernetes #DevOps #LearningInPublic', post_type: 'general', tags: ['Kubernetes', 'DevOps'] },
  { content: 'Week 12 of building DataPipelineOS in public.\n\nThis week: Added visual debugging — you can now click any node in the pipeline and see exactly what data is flowing through it in real-time.\n\nThis was the hardest feature to build. React Flow + WebSockets + streaming responses from the backend.\n\nProgress thread in replies 🧵\n\n#BuildInPublic #DataEngineering #OpenSource', post_type: 'project_showcase', tags: ['BuildInPublic', 'DataEngineering'] },
  { content: 'Everyone is talking about AI replacing developers.\n\nMeanwhile, I\'m using AI to write 60% of my boilerplate, spending the saved time on:\n\n✅ Architecture decisions\n✅ Code reviews  \n✅ User research\n✅ System design\n\nAI isn\'t replacing me. It\'s making me 3x more productive.\n\nAdapt or get left behind. 🚀\n\n#AI #SoftwareEngineering #FutureOfWork', post_type: 'general', tags: ['AI', 'SoftwareEngineering'] },
  { content: 'Security engineers: please stop treating security as an afterthought.\n\nI just completed a pen test for a "production-ready" SaaS — found:\n❌ SQL injection in 3 endpoints\n❌ API keys hardcoded in frontend JS\n❌ No rate limiting on auth endpoints\n❌ IDOR vulnerability on user profiles\n\nScan your code before you ship. Use SAST tools. Read the OWASP Top 10.\n\n#Security #CyberSecurity #WebDev', post_type: 'general', tags: ['Security', 'CyberSecurity'] },
  { content: 'Just crossed 1,000 GitHub stars on PixelCraft! 🎉\n\nIt\'s a browser-based 2D game engine I built because Unity was too heavy for quick prototypes.\n\nNever expected this response. The dev community is just incredible.\n\nRoadmap: WebAssembly physics engine + multiplayer support coming Q2.\n\nThank you all! 🙏 github.com/sample/pixelcraft\n\n#GameDev #OpenSource #JavaScript', post_type: 'achievement', tags: ['GameDev', 'OpenSource'] },
];

const RECRUITER_POSTS = [
  { content: '📢 We\'re HIRING: Senior Full Stack Engineer @ Series B startup\n\n💰 ₹35-55 LPA\n📍 Bengaluru (Hybrid)\n🛠️ React, Next.js, Node.js, PostgreSQL\n\nWhat makes us different: → Ship every week, not every quarter → No micromanagement. You own your work → Engineering-led culture (CTO writes code daily)\n\nDM me or apply: jobs.buildproof.dev/job1\n\n#Hiring #TechJobs #Bengaluru', post_type: 'job_post', tags: ['Hiring', 'TechJobs'] },
  { content: 'Unpopular recruiting opinion: A GitHub portfolio with 3 impressive projects beats a resume with 10 years of experience at mediocre companies.\n\nThe best engineers I\'ve hired showed me what they can BUILD, not just where they\'ve worked.\n\nDevelopers on BuildProof — keep shipping. Recruiters are watching.\n\n#TechHiring #CareerAdvice #Developers', post_type: 'general', tags: ['TechHiring', 'CareerAdvice'] },
  { content: '5 things that make your tech resume stand out (from someone who reads 50+ per day):\n\n1️⃣ Quantified impact ("reduced latency by 40%", not "improved performance")\n2️⃣ Links to actual work (GitHub, live deployments)\n3️⃣ Clear tech stack per role\n4️⃣ 1 page max for <5 years exp; 2 pages max for senior+\n5️⃣ NO objective statements\n\nShare this with a junior dev who needs it. 🙏\n\n#ResumeAdvice #CareerTips #TechJobs', post_type: 'general', tags: ['ResumeAdvice', 'CareerTips'] },
  { content: '🚨 Actively recruiting ML Engineers for an AI startup in stealth mode.\n\nRequirements:\n→ Strong Python + PyTorch fundamentals\n→ Experience with LLMs (fine-tuning or RAG)\n→ Comfortable with production ML systems\n\nCompensation: $150k-220k + equity\n📍 Remote (US)\n\nNDA required. DM me for details.\n\n#MLJobs #AIJobs #RemoteWork', post_type: 'job_post', tags: ['MLJobs', 'AIJobs', 'RemoteWork'] },
  { content: 'We interviewed 200 engineers last quarter. Here\'s what separated the top 20% from the rest:\n\n✅ They asked great questions about our system design, not just salary\n✅ They had opinions — and could defend them\n✅ They admitted when they didn\'t know something\n✅ They had something they were genuinely PROUD of building\n\n❌ NOT: perfect LeetCode scores\n❌ NOT: perfect FAANG pedigree\n\n#TechHiring #EngineeringInterview #HR', post_type: 'general', tags: ['TechHiring', 'EngineeringInterview'] },
  { content: 'To the developer who withdrew from our final round to take a 30% lower offer elsewhere:\n\nI don\'t know your situation. Maybe it was better culture, location, or faster growth.\n\nBut if it was just because the other company responded faster — we\'re fixing our process. We heard you.\n\nCandidate experience matters. Feedback welcome. 👇\n\n#HiringProcess #CandidateExperience #TechHiring', post_type: 'general', tags: ['HiringProcess', 'TechHiring'] },
];

// ============ SEED FUNCTIONS ============

async function createUser(user, role) {
  console.log(`  Creating user: ${user.email}`);
  
  // Create auth user with service role
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: user.email,
    password: 'BuildProof@2024',
    email_confirm: true, // Skip email confirmation for seed users
    user_metadata: {
      name: user.name,
      full_name: user.name,
      role: role,
      avatar_url: user.avatar_url,
    },
  });

  if (authError) {
    if (authError.message.includes('already been registered') || authError.message.includes('already exists')) {
      console.log(`  ⚠️  User ${user.email} already exists, skipping...`);
      // Try to get existing user
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existing = existingUsers?.users?.find(u => u.email === user.email);
      return existing?.id;
    }
    console.error(`  ❌ Failed to create ${user.email}:`, authError.message);
    return null;
  }

  const userId = authData.user.id;

  // Update profile with additional details
  const profileUpdate = {
    name: user.name,
    email: user.email,
    role: role,
    avatar_url: user.avatar_url,
    title: user.title,
    bio: user.bio,
  };
  if (user.tech_stack) profileUpdate.tech_stack = user.tech_stack;
  if (user.company) profileUpdate.company = user.company;

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...profileUpdate });

  if (profileError) {
    console.error(`  ❌ Failed to update profile for ${user.email}:`, profileError.message);
  }

  return userId;
}

async function seedProjects(developerIds) {
  console.log('\n📦 Seeding projects...');
  for (let i = 0; i < SAMPLE_PROJECTS.length; i++) {
    const project = SAMPLE_PROJECTS[i];
    const userId = developerIds[i % developerIds.length];
    if (!userId) continue;

    const { error } = await supabase.from('projects').insert({
      user_id: userId,
      ...project,
      views: Math.floor(Math.random() * 500) + 50,
    });

    if (error && !error.message.includes('duplicate')) {
      console.error(`  ❌ Failed to insert project "${project.title}":`, error.message);
    } else {
      console.log(`  ✅ Project: ${project.title}`);
    }
  }
}

async function seedJobs(recruiterIds) {
  console.log('\n💼 Seeding jobs...');
  for (let i = 0; i < SAMPLE_JOBS.length; i++) {
    const job = SAMPLE_JOBS[i];
    const recruiterId = recruiterIds[i % recruiterIds.length];
    if (!recruiterId) continue;

    const { error } = await supabase.from('jobs').insert({
      recruiter_id: recruiterId,
      ...job,
    });

    if (error && !error.message.includes('duplicate')) {
      console.error(`  ❌ Failed to insert job "${job.title}":`, error.message);
    } else {
      console.log(`  ✅ Job: ${job.title}`);
    }
  }
}

async function seedPosts(developerIds, recruiterIds) {
  console.log('\n📝 Seeding posts...');
  
  // Developer posts
  for (let i = 0; i < DEVELOPER_POSTS.length; i++) {
    const post = DEVELOPER_POSTS[i];
    const userId = developerIds[i % developerIds.length];
    if (!userId) continue;

    const { error } = await supabase.from('posts').insert({
      user_id: userId,
      ...post,
      likes_count: Math.floor(Math.random() * 200) + 10,
      comments_count: Math.floor(Math.random() * 30),
    });

    if (error && !error.message.includes('duplicate')) {
      console.error(`  ❌ Failed to insert developer post:`, error.message);
    } else {
      console.log(`  ✅ Developer post: ${post.content.substring(0, 50)}...`);
    }
  }

  // Recruiter posts
  for (let i = 0; i < RECRUITER_POSTS.length; i++) {
    const post = RECRUITER_POSTS[i];
    const userId = recruiterIds[i % recruiterIds.length];
    if (!userId) continue;

    const { error } = await supabase.from('posts').insert({
      user_id: userId,
      ...post,
      likes_count: Math.floor(Math.random() * 150) + 5,
      comments_count: Math.floor(Math.random() * 25),
    });

    if (error && !error.message.includes('duplicate')) {
      console.error(`  ❌ Failed to insert recruiter post:`, error.message);
    } else {
      console.log(`  ✅ Recruiter post: ${post.content.substring(0, 50)}...`);
    }
  }
}

// ============ MAIN ============

async function main() {
  console.log('🌱 BuildProof Seed Script Starting...\n');
  console.log(`📡 Supabase URL: ${SUPABASE_URL}`);

  // Create developers
  console.log('\n👩‍💻 Creating 10 Developer accounts...');
  const developerIds = [];
  for (const dev of DEVELOPERS) {
    const id = await createUser(dev, 'developer');
    if (id) developerIds.push(id);
  }
  console.log(`  ✅ Created ${developerIds.length} developers`);

  // Create recruiters
  console.log('\n🏢 Creating 10 Recruiter accounts...');
  const recruiterIds = [];
  for (const rec of RECRUITERS) {
    const id = await createUser(rec, 'recruiter');
    if (id) recruiterIds.push(id);
  }
  console.log(`  ✅ Created ${recruiterIds.length} recruiters`);

  // Seed content
  await seedProjects(developerIds);
  await seedJobs(recruiterIds);
  await seedPosts(developerIds, recruiterIds);

  console.log('\n✨ Seed complete!');
  console.log('\n📋 Sample Login Credentials (all use same password):');
  console.log('   Password: BuildProof@2024');
  console.log('   Developer: aryan.mehta@buildproof.dev');
  console.log('   Recruiter: riya.agarwal@buildproof.dev');
}

main().catch(console.error);
