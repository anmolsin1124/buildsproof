const fs = require('fs');

const filesToFixNewlines = [
  './app/dashboard/analytics/page.js',
  './app/dashboard/freelance/page.js',
  './app/dashboard/jobs/page.js',
  './app/dashboard/problems/page.js',
  './app/dashboard/profile/page.js',
  './app/dashboard/settings/page.js',
  './app/user/[userId]/page.js'
];

for (const file of filesToFixNewlines) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    // Replace literal '\n' characters with actual newlines
    content = content.replace(/\\n/g, '\n');
    // Change @/app/ imports to @/components/ for components
    content = content.replace(/@\/app\/(Developer[a-zA-Z]+)/g, '@/components/$1');
    content = content.replace(/@\/components\/(UserProfilePage)/g, '@/components/$1');
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  } catch(e) {
    console.error(`Failed ${file}:`, e);
  }
}

const otherFiles = [
  './app/dashboard/page.js',
  './app/dashboard/projects/page.js'
];

for (const file of otherFiles) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/@\/app\/(Developer[a-zA-Z]+)/g, '@/components/$1');
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  } catch(e) {
    console.error(`Failed ${file}:`, e);
  }
}
