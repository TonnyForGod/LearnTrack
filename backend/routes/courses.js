// lib/.js
import { supabase } from './supabaseClient'

export class CourseService {
  // Get all published courses
  static async getPublishedCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        users:instructor_id(full_name, avatar_url, bio)
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }

  // Get courses by instructor
  static async getInstructorCourses(instructorId) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('instructor_id', instructorId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }

  // Get single course with modules
  static async getCourseWithModules(courseId) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        users:instructor_id(full_name, avatar_url, bio),
        modules(*)
      `)
      .eq('id', courseId)
      .single()
    
    return { data, error }
  }

  // Create new course
  static async createCourse(courseData) {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select()
      .single()
    
    return { data, error }
  }

  // Enroll in course
  static async enrollInCourse(courseId, studentId) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([{ course_id: courseId, student_id: studentId }])
      .select()
      .single()
    
    return { data, error }
  }

  // Check if user is enrolled
  static async isEnrolled(courseId, studentId) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .single()
    
    return { data: !!data, error }
  }
}
