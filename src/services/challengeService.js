export const challenges = [
  {
    id: 'static-site',
    title: 'Deploy a static HTML website',
    objective: 'Create a small static site and configure deployment for a public URL.',
    requirements: ['Create project files', 'Add a homepage', 'Push to GitHub', 'Connect a deployment service'],
    hints: [
      'Start with a single HTML file and a CSS file.',
      'HTML sites often deploy best using a simple static host.',
      'Use a GitHub repository and then connect it to a platform like Render or Netlify.',
    ],
    expectedResult: 'A live page loads and displays your landing page.',
    difficulty: 'Beginner',
  },
  {
    id: 'react-deploy',
    title: 'Deploy a React application',
    objective: 'Build and deploy a React app with the correct install and start commands.',
    requirements: ['Create app', 'Install dependencies', 'Build for production', 'Deploy successfully'],
    hints: [
      'Use npm install and npm run build before launch.',
      'Check that the app listens on the same port Render expects.',
      'Use the production build output folder when your hosting environment expects static assets.',
    ],
    expectedResult: 'Your React app loads and assets are served correctly.',
    difficulty: 'Intermediate',
  },
  {
    id: 'node-api',
    title: 'Deploy a Node.js API',
    objective: 'Host a backend service with a defined start script and environment variables.',
    requirements: ['Install dependencies', 'Add port config', 'Set environment variables', 'Verify health check'],
    hints: [
      'Check your server startup file and listen port.',
      'Use environment variables for secrets and database URLs.',
      'Validate the health endpoint before finishing.',
    ],
    expectedResult: 'The API responds successfully and stays online.',
    difficulty: 'Intermediate',
  },
  {
    id: 'postgres-deploy',
    title: 'Connect PostgreSQL to a deployed app',
    objective: 'Configure a database URL and make sure the app connects to PostgreSQL in production.',
    requirements: ['Create DB', 'Add connection string', 'Configure app settings', 'Test connection'],
    hints: [
      'Use environment variables instead of hardcoding credentials.',
      'Confirm the database hostname, username, password, and port are all correct.',
      'Check whether your app needs a Prisma, Sequelize, or raw SQL configuration.',
    ],
    expectedResult: 'The deployed app can read and write database records safely.',
    difficulty: 'Advanced',
  },
]

export function getChallenges() {
  return challenges
}
