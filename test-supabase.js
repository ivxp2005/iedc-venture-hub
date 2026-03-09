// Quick Supabase connection test
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Read .env file manually
const envFile = readFileSync('.env', 'utf8')
const envVars = {}
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.VITE_SUPABASE_URL
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? '✓ Present' : '✗ Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test the connection
async function testConnection() {
  try {
    // Try to get the session (this will work even without being logged in)
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Supabase connection error:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    console.log('Session status:', data.session ? 'Authenticated' : 'Not authenticated (normal for test)')
    
    // Try to query a table to verify database access
    const { data: tableData, error: tableError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (tableError) {
      console.warn('⚠️  Database query note:', tableError.message)
      console.log('   (This is normal if tables don\'t exist yet)')
    } else {
      console.log('✅ Database access confirmed!')
    }
    
    return true
  } catch (err) {
    console.error('❌ Connection test failed:', err.message)
    return false
  }
}

testConnection().then(() => {
  process.exit(0)
}).catch(err => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
