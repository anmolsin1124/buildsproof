import { supabase } from '../utils/supabaseClient';

export const projectService = {
  /**
   * Fetch all projects with user profile info
   */
  async getProjects(filters = {}) {
    let query = supabase
      .from('projects')
      .select('*, profiles(name, avatar_url, title)');

    if (filters.category && filters.category !== 'All') {
      query = query.eq('category', filters.category);
    }

    if (filters.techStack) {
      query = query.contains('tech_stack', [filters.techStack]);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single project by ID
   */
  async getProjectById(id) {
    const { data, error } = await supabase
      .from('projects')
      .select('*, profiles(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new project
   */
  async createProject(projectData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('projects')
      .insert([{ ...projectData, user_id: user.id }])
      .select();

    if (error) throw error;
    return data[0];
  },

  /**
   * Update an existing project
   */
  async updateProject(projectId, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId);

    if (error) throw error;
    return data;
  },

  /**
   * Delete a project
   */
  async deleteProject(projectId) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
  },

  /**
   * Toggle like on a project
   */
  async toggleLike(projectId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check if like exists
    const { data: existingLike, error: checkError } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', user.id)
      .eq('project_id', projectId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingLike) {
      // Remove like
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);
      if (deleteError) throw deleteError;
      return { liked: false };
    } else {
      // Add like
      const { error: insertError } = await supabase
        .from('likes')
        .insert([{ user_id: user.id, project_id: projectId }]);
      if (insertError) throw insertError;
      return { liked: true };
    }
  },

  /**
   * Get total likes for a project
   */
  async getProjectLikes(projectId) {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId);

    if (error) throw error;
    return count;
  },
};
