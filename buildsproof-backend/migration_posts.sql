-- BUILDPROOF SCHEMA ADDITION: posts table
-- Run this in Supabase SQL editor after the original schema.sql

-- 6. POSTS TABLE (LinkedIn-style posts for both developers & recruiters)
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

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Posts RLS Policies
CREATE POLICY "Posts are viewable by authenticated users"
ON public.posts FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create posts"
ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
ON public.posts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- Update trigger for posts
CREATE TRIGGER on_post_update
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 7. POST_LIKES TABLE
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, post_id)
);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post likes viewable by authenticated users"
ON public.post_likes FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can like posts"
ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their post likes"
ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- Function: increment likes_count on post_likes insert
CREATE OR REPLACE FUNCTION public.handle_post_like_insert()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_post_like_insert
  AFTER INSERT ON public.post_likes
  FOR EACH ROW EXECUTE PROCEDURE public.handle_post_like_insert();

-- Function: decrement likes_count on post_likes delete  
CREATE OR REPLACE FUNCTION public.handle_post_like_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_post_like_delete
  AFTER DELETE ON public.post_likes
  FOR EACH ROW EXECUTE PROCEDURE public.handle_post_like_delete();

-- Also update the handle_new_user trigger to set the role from metadata
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
