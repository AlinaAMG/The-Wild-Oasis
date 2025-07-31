
import { createClient } from '@supabase/supabase-js'
 export const supabaseUrl = 'https://lnzgeslnvfwflnrntdhy.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxuemdlc2xudmZ3Zmxucm50ZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Njc0MDcsImV4cCI6MjA2ODI0MzQwN30.CIhUnjk-g7nQ0eelDQthrj1Fzk_8RQ_tTXQi62ueMrA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;