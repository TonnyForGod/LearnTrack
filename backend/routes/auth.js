// lib/auth.js
import { supabase } from './supabaseClient'

export class AuthService {
  // Sign up new user
  static async signUp(email, password, userData) {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userData.userType,
          full_name: userData.fullName,
          department: userData.department
        }
      }
    })
    return { user, error }
  }

  // Sign in
  static async signIn(email, password) {
    const { user, error } = await supabase.auth.signIn({
      email,
      password
    })
    return { user, error }
  }

  // Sign out
  static async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // Get current user
  static getCurrentUser() {
    return supabase.auth.getUser()
  }

  // Subscribe to auth changes
  static onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
