#!/usr/bin/env node
/**
 * Apply BuildProof schema via individual REST calls
 * Uses supabase-js service role client + retry logic
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env
const envPath = path.join(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)="?([^"]*)"?$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PROJECT_REF = SUPABASE_URL.replace('https://', '').split('.')[0];

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Try via the PostgREST /rest/v1/rpc endpoint with a custom function
// OR use the direct pg connection URL

async function tryManagementAPI() {
  const SQL = readFileSync(path.join(__dirname, '..', 'buildsproof-backend', 'schema_complete.sql'), 'utf8');
  
  // Use Node.js fetch with a short timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  
  try {
    const response = await fetch(
      `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: SQL }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);
    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', text.substring(0, 500));
    return response.ok;
  } catch (e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') {
      console.log('Management API timed out (needs personal access token, not service role key)');
    } else {
      console.log('Management API error:', e.message);
    }
    return false;
  }
}

async function checkTablesExist() {
  console.log('Checking if tables exist...');
  
  const tables = ['profiles', 'projects', 'jobs', 'posts', 'likes', 'comments', 'post_likes'];
  const results = {};
  
  for (const table of tables) {
    const { data, error } = await admin.from(table).select('count').limit(1);
    results[table] = !error;
    console.log(`  ${table}: ${!error ? '✅ exists' : '❌ missing - ' + error.message}`);
  }
  
  return results;
}

async function main() {
  console.log('🗄️  BuildProof Schema Checker & Applier');
  console.log(`URL: ${SUPABASE_URL}\n`);

  const tableStatus = await checkTablesExist();
  const allExist = Object.values(tableStatus).every(Boolean);
  
  if (allExist) {
    console.log('\n✅ All tables already exist! Schema is already applied.');
    return;
  }
  
  console.log('\n📋 Some tables are missing. Trying Management API...');
  const success = await tryManagementAPI();
  
  if (!success) {
    console.log('\n⚠️  Could not apply schema automatically.');
    console.log('\n📋 MANUAL STEP REQUIRED:');
    console.log('1. Go to: https://supabase.com/dashboard/project/' + PROJECT_REF + '/sql/new');
    console.log('2. Copy & paste the contents of: buildsproof-backend/schema_complete.sql');
    console.log('3. Click "Run"');
    console.log('4. Then run: node scripts/seed.mjs');
  }
}

main().catch(console.error);
