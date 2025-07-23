import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vnnjzbugjyvvlodlwfkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZubmp6YnVnanl2dmxvZGx3ZmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMTIzODUsImV4cCI6MjA2ODc4ODM4NX0.4E2TDv8xIu7SBBPu5x09-tAR3lJYI097ZEqNoh6k4Xk';
export const supabase = createClient(supabaseUrl, supabaseKey);