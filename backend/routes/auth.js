// auth.js
import { supabase } from './lib/supabaseClient.js'

// Sign up
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { user, error }
}

// Sign in
async function signIn(email, password) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password
  })
  return { user, error }
}

// Sign out
async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}
