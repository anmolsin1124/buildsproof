-- ============================================================
-- BUILDPROOF COMPLETE SCHEMA + MIGRATION
-- Run this ONCE in Supabase SQL Editor → New Query
-- ============================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('developer', 'recruiter')) DEFAULT 'developer',
  avatar_url TEXT,
  title TEXT,
  bio TEXT,
  tech_stack TEXT[],
  company TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  problem_solved TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  image_url TEXT,
  github_link TEXT,
  live_link TEXT,
  category TEXT CHECK (category IN ('AI', 'Frontend', 'Backend', 'Full Stack', 'Mobile')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. JOBS TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  salary TEXT,
  location TEXT,
  job_type TEXT CHECK (job_type IN ('Full-time', 'Part-time', 'Contract', 'Remote')),
  apply_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. LIKES TABLE (for projects)
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(user_id, project_id)
);

-- 5. COMMENTS TABLE (for projects)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. POSTS TABLE (LinkedIn-style posts)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  post_type TEXT CHECK (post_type IN ('general', 'project_showcase', 'job_post', 'achievement', 'question')) DEFAULT 'general',
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. POST_LIKES TABLE
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Profile update trigger
DROP TRIGGER IF EXISTS on_profile_update ON public.profiles;
CREATE TRIGGER on_profile_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Post update trigger
DROP TRIGGER IF EXISTS on_post_update ON public.posts;
CREATE TRIGGER on_post_update
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Auto-create profile on user signup (includes role from metadata)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'developer')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- post_likes increment trigger
CREATE OR REPLACE FUNCTION public.handle_post_like_insert()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_post_like_insert ON public.post_likes;
CREATE TRIGGER on_post_like_insert
  AFTER INSERT ON public.post_likes
  FOR EACH ROW EXECUTE PROCEDURE public.handle_post_like_insert();

-- post_likes decrement trigger
CREATE OR REPLACE FUNCTION public.handle_post_like_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_post_like_delete ON public.post_likes;
CREATE TRIGGER on_post_like_delete
  AFTER DELETE ON public.post_likes
  FOR EACH ROW EXECUTE PROCEDURE public.handle_post_like_delete();

-- ============================================================
-- ENABLE RLS
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- Profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Projects
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
CREATE POLICY "Projects are viewable by everyone"
ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create projects" ON public.projects;
CREATE POLICY "Authenticated users can create projects"
ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
CREATE POLICY "Users can update their own projects"
ON public.projects FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;
CREATE POLICY "Users can delete their own projects"
ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Jobs
DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON public.jobs;
CREATE POLICY "Jobs are viewable by everyone"
ON public.jobs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Recruiters can create jobs" ON public.jobs;
CREATE POLICY "Recruiters can create jobs"
ON public.jobs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'recruiter')
);

DROP POLICY IF EXISTS "Recruiters can update their own jobs" ON public.jobs;
CREATE POLICY "Recruiters can update their own jobs"
ON public.jobs FOR UPDATE USING (auth.uid() = recruiter_id);

DROP POLICY IF EXISTS "Recruiters can delete their own jobs" ON public.jobs;
CREATE POLICY "Recruiters can delete their own jobs"
ON public.jobs FOR DELETE USING (auth.uid() = recruiter_id);

-- Likes (project likes)
DROP POLICY IF EXISTS "Likes are viewable by everyone" ON public.likes;
CREATE POLICY "Likes are viewable by everyone"
ON public.likes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can toggle likes" ON public.likes;
CREATE POLICY "Authenticated users can toggle likes"
ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their own likes" ON public.likes;
CREATE POLICY "Users can remove their own likes"
ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- Comments
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON public.comments;
CREATE POLICY "Comments are viewable by everyone"
ON public.comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can comment" ON public.comments;
CREATE POLICY "Authenticated users can comment"
ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
CREATE POLICY "Users can update their own comments"
ON public.comments FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;
CREATE POLICY "Users can delete their own comments"
ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Posts
DROP POLICY IF EXISTS "Posts are viewable by authenticated users" ON public.posts;
CREATE POLICY "Posts are viewable by authenticated users"
ON public.posts FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.posts;
CREATE POLICY "Authenticated users can create posts"
ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;
CREATE POLICY "Users can update their own posts"
ON public.posts FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;
CREATE POLICY "Users can delete their own posts"
ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- Post Likes
DROP POLICY IF EXISTS "Post likes viewable by authenticated users" ON public.post_likes;
CREATE POLICY "Post likes viewable by authenticated users"
ON public.post_likes FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can like posts" ON public.post_likes;
CREATE POLICY "Authenticated users can like posts"
ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their post likes" ON public.post_likes;
CREATE POLICY "Users can remove their post likes"
ON public.post_likes FOR DELETE USING (auth.uid() = user_id);
