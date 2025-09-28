// database.js
import { supabase } from './lib/supabaseClient.js'

// Create
async function createPost(title, content) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content }])
  return { data, error }
}

// Read
async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
  return { data, error }
}

// Update
async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
  return { data, error }
}

// Delete
async function deletePost(id) {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
  return { data, error }
}
