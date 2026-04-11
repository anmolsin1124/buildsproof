import { supabase } from '../utils/supabaseClient';

export const jobService = {
  /**
   * Fetch all job postings
   */
  async getJobs(filters = {}) {
    let query = supabase
      .from('jobs')
      .select('*, profiles(name, avatar_url, company)');

    if (filters.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters.jobType) {
      query = query.eq('job_type', filters.jobType);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single job by ID
   */
  async getJobById(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, profiles(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new job posting
   */
  async createJob(jobData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('jobs')
      .insert([{ ...jobData, recruiter_id: user.id }])
      .select();

    if (error) throw error;
    return data[0];
  },

  /**
   * Update an existing job
   */
  async updateJob(jobId, updates) {
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', jobId);

    if (error) throw error;
    return data;
  },

  /**
   * Delete a job posting
   */
  async deleteJob(jobId) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) throw error;
  },
};
