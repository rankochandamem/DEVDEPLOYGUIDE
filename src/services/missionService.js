export const missions = [
  {
    id: 'deploy-first-site',
    name: 'Deploy Your First Website',
    description: 'Install Git, push to GitHub, and deploy to Render.',
    reward: '+500 XP',
    badge: 'First Deployment',
    requirements: [
      'Install Git',
      'Create GitHub repository',
      'Push project',
      'Create Render service',
      'Deploy application',
    ],
  },
  {
    id: 'git-branch-flow',
    name: 'Git Branch Workflow',
    description: 'Practice branching, merging, and clean collaboration flow.',
    reward: '+350 XP',
    badge: 'Branch Manager',
    requirements: ['Create a feature branch', 'Commit changes', 'Merge to main'],
  },
  {
    id: 'debug-render',
    name: 'Fix a Broken Render Build',
    description: 'Diagnose and repair a failed deployment with logs and config.',
    reward: '+425 XP',
    badge: 'Debug Expert',
    requirements: ['Identify build error', 'Fix config', 'Verify deployment'],
  },
]

export function getMissions() {
  return missions
}
