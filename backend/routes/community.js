// lib/
import { supabase } from './supabaseClient'

export class CommunityService {
  // Get posts for a course
  static async getCoursePosts(courseId) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:user_id(full_name, avatar_url, user_type),
        comments(
          *,
          users:user_id(full_name, avatar_url, user_type)
        )
      `)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }

  // Create new post
  static async createPost(postData) {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single()
    
    return { data, error }
  }

  // Add comment to post
  static async addComment(commentData) {
    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .select()
      .single()
    
    return { data, error }
  }

  // Get user's enrolled courses for community access
  static async getUserEnrolledCourses(userId) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        courses:course_id(
          id,
          title,
          instructor_id
        )
      `)
      .eq('student_id', userId)
    
    return { data, error }
  }
}
