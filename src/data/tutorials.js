export const categories = [
  {
    id: 'git',
    name: 'Git & Version Control',
    description: 'Git installation, workflows, branches, and deployment basics.',
    tutorials: ['git-installation', 'github-basics', 'git-branches', 'git-merge'],
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Repositories, collaboration, pull requests, and automation.',
    tutorials: ['github-basics', 'github-actions'],
  },
  {
    id: 'deployment',
    name: 'Deployment',
    description: 'Host and publish your apps on real platforms.',
    tutorials: ['render-deployment', 'vercel-deployment', 'netlify-deployment'],
  },
  {
    id: 'database',
    name: 'Databases',
    description: 'Database setup, connection strings, and deployment basics.',
    tutorials: ['postgresql-setup'],
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: 'CI/CD, environments, Docker, and production workflows.',
    tutorials: ['docker-deployment', 'github-actions'],
  },
]

export const tutorialData = [
  {
    id: 'git-installation',
    slug: 'git-installation',
    title: 'Install Git on Windows',
    category: 'Git & Version Control',
    categoryId: 'git',
    difficulty: 'Beginner',
    estimatedTime: '10 minutes',
    lessons: 5,
    description: 'Install Git, verify it works, and learn the essential Git commands used by beginners.',
    prerequisites: [],
    status: 'not-started',
    externalLinks: [
      { label: 'Git website', url: 'https://git-scm.com/' },
      { label: 'Official Git download', url: 'https://git-scm.com/download/win' },
      { label: 'GitHub', url: 'https://github.com' },
    ],
    sections: [
      {
        title: 'Download Git',
        content: [
          'Open your browser and go to the official Git download page for Windows.',
          'Most computers should use the Windows x64 installer.',
          'Git is the local version-control tool. GitHub is a remote platform where you can store and share your Git repositories.',
        ],
        links: [
          { label: 'Open the official Git download page for Windows', url: 'https://git-scm.com/download/win' },
        ],
        media: [
          {
            type: 'image',
            title: 'Git for Windows download page',
            caption: 'Figure 1 — Download the latest Git for Windows installer',
            description: 'Choose the Windows x64 installer from the official Git download page.',
            altText: 'Git for Windows download page with the Windows installer link highlighted',
            image: {
              url: '/media/git-install-page.svg',
            },
            stepNumber: '1',
          },
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git --version',
            explanation: 'Verifies that Git is installed and available in your terminal. If Git is found, your terminal prints a version string such as the same version shown below.',
            output: 'git version 2.49.0.windows.1',
          },
        ],
        checklist: ['Open the Git for Windows installer', 'Choose the correct version', 'Finish the setup wizard'],
      },
      {
        title: 'Install Git',
        content: [
          'Run the installer and accept the default configuration unless you have a specific reason to change it.',
          'Keep the recommended options selected and complete the installation.',
        ],
        checklist: ['Accept the license', 'Keep the default folder', 'Use the recommended settings', 'Finish installation'],
      },
      {
        title: 'Verify the installation',
        content: [
          'Open PowerShell or Command Prompt and run the version command.',
          'If you see a Git version, the install was successful.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git --version',
            explanation: 'Shows the installed version of Git. The version line confirms Git is available in the terminal and on your PATH.',
            output: 'git version 2.49.0.windows.1',
          },
        ],
      },
      {
        title: '1. Start a Repository',
        content: [
          'These commands are used when starting a new Git project or downloading an existing repository.',
          'The first command creates a local Git repository. The second copies a remote repository from GitHub to your computer.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git init',
            explanation: 'Creates a hidden .git folder inside your project and starts tracking the project with Git.',
            output: 'Initialized empty Git repository in C:/Users/username/Projects/my-app/.git/',
          },
          {
            label: 'PowerShell',
            code: 'git clone https://github.com/username/my-project.git',
            explanation: 'Downloads a copy of an existing repository from GitHub to your computer.',
            output: 'Cloning into \'my-project\'...\nremote: Enumerating objects: 45, done.\nremote: Counting objects: 100% (45/45), done.\nReceiving objects: 100% (45/45), 12.40 KiB | 2.06 MiB/s, done.',
          },
        ],
      },
      {
        title: 'git init',
        content: [
          'Creates a hidden .git folder inside your project and starts tracking the project with Git.',
          'Git creates a .git directory to store internal repository information. Your files are not automatically committed.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git init',
            explanation: 'Creates a new repository in the current folder.',
            output: 'Initialized empty Git repository in C:/Users/username/Projects/my-app/.git/',
          },
        ],
      },
      {
        title: 'git clone',
        content: [
          'Downloads a copy of an existing remote Git repository to your computer.',
          'The command creates a local folder, downloads all the project files, and configures the remote repository as origin.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git clone https://github.com/username/my-project.git',
            explanation: 'Clones a repository from GitHub into a local folder on your machine.',
            output: 'Cloning into \'my-project\'...\nremote: Enumerating objects: 45, done.\nremote: Counting objects: 100% (45/45), done.\nReceiving objects: 100% (45/45), 12.40 KiB | 2.06 MiB/s, done.',
          },
        ],
      },
      {
        title: '2. Make and Track Changes',
        content: [
          'The basic Git workflow is: edit files, check status, add files, commit changes, and optionally push to GitHub.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git status',
            explanation: 'Shows the current state of your working directory and tells you which files are untracked, modified, or staged.',
            output: 'On branch main\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n    index.html\n\nnothing added to commit but untracked files present (use "git add" to track)',
          },
          {
            label: 'PowerShell',
            code: 'git add .',
            explanation: 'Stages all changes in the current directory for the next commit.',
            output: 'On branch main\nChanges to be committed:\n  (use "git rm --cached <file>..." to unstage)\n    new file:   index.html',
          },
          {
            label: 'PowerShell',
            code: 'git commit -m "Initial commit"',
            explanation: 'Saves the staged changes into the local repository history.',
            output: '[main (root-commit) a1b2c3d] Initial commit\n 1 file changed, 12 insertions(+)\n create mode 100644 index.html',
          },
        ],
      },
      {
        title: 'git status',
        content: [
          'Shows the current state of your working directory and tells you which files are untracked, modified, or staged.',
          'A safe command to run any time before you stage or commit.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git status',
            explanation: 'Shows repository status. Example output: On branch main, Untracked files: index.html, nothing added to commit but untracked files present.',
            output: 'On branch main\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n    index.html\n\nnothing added to commit but untracked files present (use "git add" to track)',
          },
        ],
      },
      {
        title: 'git add',
        content: [
          'Git add places files into the staging area. The files are not permanently saved until you create a commit.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git add .',
            explanation: 'Stages every changed or new file in the current folder.',
            output: 'On branch main\nChanges to be committed:\n  (use "git rm --cached <file>..." to unstage)\n    new file:   index.html',
          },
        ],
      },
      {
        title: 'git commit',
        content: [
          'Saves your staged changes into Git history as a new commit snapshot.',
          'Git commit only saves changes that have already been staged.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git commit -m "Initial commit"',
            explanation: 'Creates a Git commit with a descriptive message.',
            output: '[main (root-commit) a1b2c3d] Initial commit\n 1 file changed, 12 insertions(+)\n create mode 100644 index.html',
          },
        ],
      },
      {
        title: '3. Share and Update Code',
        content: [
          'These commands connect your local repository to GitHub and synchronize changes between your computer and the remote GitHub repository.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git remote add origin https://github.com/username/my-project.git',
            explanation: 'Connects your local repository to a remote GitHub repository.',
            output: 'Command executed successfully.\nNo output is normal.',
          },
          {
            label: 'PowerShell',
            code: 'git push -u origin main',
            explanation: 'Uploads your commits to GitHub and sets the upstream branch reference.',
            output: 'Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nDelta compression using up to 8 threads\nWriting objects: 100% (3/3), 280 bytes | 280.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo https://github.com\n * [new branch]      main -> main\nbranch \'main\' set up to track \'origin/main\'.',
          },
          {
            label: 'PowerShell',
            code: 'git pull',
            explanation: 'Downloads changes from the remote repository and integrates them into your current local branch.',
            output: 'remote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nUnpacking objects: 100% (3/3), 680 bytes | 680.00 KiB/s, done.\nFrom https://github.com\n   a1b2c3d..e5f6g7h  main       -> origin/main\nUpdating a1b2c3d..e5f6g7h\nFast-forward\n readme.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)',
          },
        ],
      },
      {
        title: 'git remote add origin',
        content: [
          'Connects your local Git repository to a remote repository such as GitHub.',
          'On success, this command normally produces no terminal output.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git remote add origin https://github.com/username/my-project.git',
            explanation: 'Creates the origin remote and points it at a GitHub repository.',
            output: 'Command executed successfully.\nNo output is normal.',
          },
        ],
      },
      {
        title: 'git push -u origin main',
        content: [
          'Uploads your local commits to GitHub. The -u flag sets upstream tracking so that future git push and git pull commands know where to send and fetch changes.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git push -u origin main',
            explanation: 'Pushes the current branch to the main branch on the origin remote.',
            output: 'Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nDelta compression using up to 8 threads\nWriting objects: 100% (3/3), 280 bytes | 280.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo https://github.com\n * [new branch]      main -> main\nbranch \'main\' set up to track \'origin/main\'.',
          },
        ],
      },
      {
        title: 'git pull',
        content: [
          'Downloads changes from the remote repository and integrates them into your current local branch.',
          'If both your local and GitHub repository have conflicting changes, git pull may produce a merge conflict that must be resolved manually.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git pull',
            explanation: 'Fetches and merges changes from the configured upstream remote.',
            output: 'remote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nUnpacking objects: 100% (3/3), 680 bytes | 680.00 KiB/s, done.\nFrom https://github.com\n   a1b2c3d..e5f6g7h  main       -> origin/main\nUpdating a1b2c3d..e5f6g7h\nFast-forward\n readme.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)',
          },
        ],
      },
      {
        title: '4. Review History',
        content: [
          'These commands help developers inspect previous commits and compare the current working copy against the latest saved version.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git log --oneline',
            explanation: 'Shows a compact list of previous commits in the repository history.',
            output: 'e5f6g7h (HEAD -> main, origin/main) Update readme layout\nc3d4e5f Fix styling issues on landing page\na1b2c3d Initial commit',
          },
          {
            label: 'PowerShell',
            code: 'git diff',
            explanation: 'Shows the exact line-by-line changes in your working files before they are staged.',
            output: 'diff --git a/index.html b/index.html\nindex 1234567..89abcdef 100644\n--- a/index.html\n+++ b/index.html\n@@ -4,5 +4,5 @@\n <body>\n-    <h1>Hello World</h1>\n+    <h1>Hello GitHub!</h1>\n </body>\n </html>',
          },
        ],
      },
      {
        title: 'git log --oneline',
        content: [
          'Shows a compact list of previous commits. Think of each commit as a saved checkpoint for your project.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git log --oneline',
            explanation: 'Lists recent commits in a short one-line format.',
            output: 'e5f6g7h (HEAD -> main, origin/main) Update readme layout\nc3d4e5f Fix styling issues on landing page\na1b2c3d Initial commit',
          },
        ],
      },
      {
        title: 'git diff',
        content: [
          'Shows the exact line-by-line changes in your working files before they are staged.',
          'Use git diff when you want to review your changes before running git add.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git diff',
            explanation: 'Shows unstaged changes using the Unified Diff format.',
            output: 'diff --git a/index.html b/index.html\nindex 1234567..89abcdef 100644\n--- a/index.html\n+++ b/index.html\n@@ -4,5 +4,5 @@\n <body>\n-    <h1>Hello World</h1>\n+    <h1>Hello GitHub!</h1>\n </body>\n </html>',
          },
        ],
      },
      {
        title: 'Your First Git Workflow',
        content: [
          'Create Project → git init → Create/Edit Files → git status → git add . → git commit -m "Initial commit" → git remote add origin <url> → git push -u origin main → GitHub',
        ],
        commands: [
          {
            label: 'Workflow',
            code: 'git init\ngit status\ngit add .\ngit commit -m "Initial commit"\ngit remote add origin https://github.com/username/my-project.git\ngit push -u origin main',
            explanation: 'This workflow is the common sequence beginners follow when creating and sending a repository to GitHub.',
          },
        ],
      },
      {
        title: 'Common Git Problems',
        content: [
          'Git can sometimes report error messages that look confusing. Read the message carefully, then run a safe command such as git status, git remote -v, or git pull origin main.',
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'fatal: not a git repository',
            explanation: 'A common error that appears when a command is run outside a repository folder.',
          },
          {
            label: 'PowerShell',
            code: 'git remote -v',
            explanation: 'Shows the configured remote repository URLs for the current repository.',
          },
          {
            label: 'PowerShell',
            code: 'git remote set-url origin https://github.com/username/my-project.git',
            explanation: 'If the origin remote already exists, update the URL instead of adding a second remote named origin.',
          },
          {
            label: 'PowerShell',
            code: 'git pull origin main\ngit push origin main',
            explanation: 'A typical safe workflow for repositories that need to sync remote commits before pushing.',
          },
        ],
      },
    ],
    tips: [
      'Most regular Intel and AMD Windows PCs use x64.',
      'Choose ARM64 only if your PC uses ARM architecture.',
      'git status is one of the safest commands to run at any time.',
      'git add does not save your project permanently. It stages changes for the next commit.',
      'git commit saves a snapshot to your local Git history.',
      'git push sends your committed changes to the remote repository.',
      'git pull brings remote changes down to your local computer.',
    ],
    warnings: [
      'Do not confuse Git with GitHub. Git is the local tool; GitHub is the online hosting platform.',
      'Git commit only saves changes that have already been staged.',
      'If both your local computer and GitHub contain conflicting changes, git pull may result in a merge conflict.',
      'Do not upload passwords, API keys, or secret files to GitHub.',
    ],
    troubleshooting: [
      {
        title: "'git' is not recognized",
        solution: 'Restart your terminal or reinstall Git and verify it is on PATH.',
      },
      {
        title: 'fatal: not a git repository',
        solution: 'Change directory into the project folder that contains the .git folder or run git init there.',
      },
      {
        title: 'remote origin already exists',
        solution: 'Run git remote -v to see the current origin URL and use git remote set-url origin <repository-url> if you need to update it.',
      },
      {
        title: 'rejected ... fetch first',
        solution: 'Pull the current remote branch first with git pull origin main, then resolve any conflicts and push again.',
      },
    ],
  },
  {
    id: 'github-basics',
    slug: 'github-basics',
    title: 'Connect Your Code to GitHub',
    category: 'GitHub',
    categoryId: 'github',
    difficulty: 'Beginner',
    estimatedTime: '15 minutes',
    lessons: 7,
    description: 'Create a repository, commit code, and push your project to GitHub.',
    prerequisites: ['git-installation'],
    status: 'not-started',
    externalLinks: [{ label: 'GitHub', url: 'https://github.com' }],
    sections: [
      {
        title: 'Create a repository',
        content: [
          'Sign in to GitHub and create a new repository. Choose Public or Private, and do not add a README if your code already exists locally.',
        ],
        media: [
          {
            type: 'image',
            title: 'GitHub repository screen',
            caption: 'Figure 1 — GitHub new repository button',
            description: 'Click the + button in the top-right corner, then choose New repository.',
            altText: 'GitHub repository page with plus button highlighted',
            image: {
              url: '/media/image-1788874019418.png',
            },
            stepNumber: '1',
          },
        ],
        checklist: ['Sign in to GitHub', 'Create a new repository', 'Choose visibility', 'Create the repo'],
      },
      {
        title: 'Initialize your project',
        content: ['Open PowerShell in your project folder and initialize Git.'],
        media: [
          {
            type: 'image',
            title: 'Terminal setup',
            caption: 'Figure 2 — PowerShell ready for Git commands',
            description: 'Open a terminal in the folder that contains your project.',
            altText: 'Developer terminal open in a project folder',
            image: {
              url: '/media/github-repository-configuration.svg',
            },
            stepNumber: '2',
          },
        ],
        commands: [
          { label: 'PowerShell', code: 'cd "C:\\path\\to\\your\\project"', explanation: 'Moves into the folder that contains your app.' },
          { label: 'PowerShell', code: 'git init', explanation: 'Creates a new Git repository in the current folder.' },
        ],
      },
      {
        title: 'Stage and commit your code',
        content: ['Add all files to the staging area and save your first commit.'],
        commands: [
          { label: 'PowerShell', code: 'git add .', explanation: 'Stages all project files for the next commit.' },
          { label: 'PowerShell', code: 'git commit -m "Initial commit"', explanation: 'Creates the initial commit with a message.' },
        ],
        checklist: ['Stage your files', 'Write a meaningful commit message', 'Save your commit'],
      },
      {
        title: 'Connect GitHub remote',
        content: ['Add the remote repository URL so your local project knows where to push.'],
        media: [
          {
            type: 'image',
            title: 'Git push flow',
            caption: 'Figure 3 — Add remote and push repository to GitHub',
            description: 'The remote URL tells Git where to upload your code.',
            altText: 'Git push flow with git remote and git push commands',
            image: {
              url: '/media/git-push-flow.svg',
            },
            stepNumber: '3',
          },
        ],
        commands: [
          {
            label: 'PowerShell',
            code: 'git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git',
            explanation: 'Links your local repo to the remote GitHub repository.',
          },
          { label: 'PowerShell', code: 'git branch -M main', explanation: 'Renames the default branch to main.' },
          { label: 'PowerShell', code: 'git push -u origin main', explanation: 'Pushes the repository to GitHub for the first time.' },
        ],
      },
    ],
    tips: ['Add sensitive files to a .gitignore file before committing.', 'GitHub may open a browser login flow during the first push.'],
    warnings: ['Never upload passwords, API keys, or secret files to GitHub.'],
    troubleshooting: [
      {
        title: 'Remote origin already exists',
        solution: 'Use git remote -v to check current remotes and remove the incorrect one before re-adding it.',
      },
    ],
  },
  {
    id: 'render-deployment',
    slug: 'render-deployment',
    title: 'Deploy GitHub to Render',
    category: 'Deployment',
    categoryId: 'deployment',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    lessons: 8,
    description: 'Connect your GitHub repository to Render and deploy a working app with a public URL.',
    prerequisites: ['git-installation', 'github-basics'],
    status: 'not-started',
    externalLinks: [{ label: 'Render', url: 'https://render.com/' }],
    sections: [
      {
        title: 'Verify the repository',
        content: ['Make sure your project is already on GitHub and includes the files needed to run it, such as package.json, requirements.txt, or a Dockerfile.'],
        checklist: ['Repository is visible on GitHub', 'Project files are present', 'Dependencies are ready'],
      },
      {
        title: 'Create the Render service',
        content: ['Open Render, sign in, and create a new Web Service connected to your GitHub repository.'],
        media: [
          {
            type: 'image',
            title: 'Render web service setup',
            caption: 'Figure 2 — Create a Render Web Service',
            description: 'Select New +, choose Web Service, and connect the GitHub repository.',
            altText: 'Render web service setup screen',
            image: {
              url: '/media/render-web-service.svg',
            },
            stepNumber: '2',
          },
        ],
        checklist: ['Click New +', 'Choose Web Service', 'Connect a repository', 'Select the project'],
      },
      {
        title: 'Configure build and start commands',
        content: ['Choose the runtime, branch, build command, and start command matching your app type.'],
        commands: [
          { label: 'Node.js frontend', code: 'npm install && npm run build\nnpm start', explanation: 'Installs dependencies, builds the app, and runs it.' },
          { label: 'Express app', code: 'npm install\nnpm start', explanation: 'Common configuration for Express applications.' },
          { label: 'Flask app', code: 'pip install -r requirements.txt\ngunicorn app:app', explanation: 'Installs Python dependencies and starts the Flask service.' },
        ],
      },
      {
        title: 'Environment variables',
        content: ['Add secrets such as API keys, DB URLs, and configuration values through Render instead of storing them in GitHub.'],
        checklist: ['Open Environment Variables', 'Add each required value', 'Keep secrets out of your repository'],
      },
    ],
    tips: ['Use the correct branch such as main.', 'Check deploy logs if the app fails to build or start.'],
    warnings: ['Your app must listen on PORT or Render may not serve it successfully.'],
    troubleshooting: [
      {
        title: 'Render build failed',
        solution: 'Review the deploy logs and confirm the build command, runtime, and dependencies are correct.',
      },
    ],
  },
  {
    id: 'git-branches',
    slug: 'git-branches',
    title: 'Git Branches',
    category: 'Git & Version Control',
    categoryId: 'git',
    difficulty: 'Intermediate',
    estimatedTime: '20 minutes',
    lessons: 6,
    description: 'Learn how branches help organize features, fixes, and releases.',
    prerequisites: ['git-installation', 'github-basics'],
    status: 'not-started',
    sections: [
      {
        title: 'Create a branch',
        content: ['Use a branch to safely work on a feature without disrupting the main codebase.'],
        commands: [
          { label: 'PowerShell', code: 'git checkout -b feature/login-page', explanation: 'Creates and switches to a new feature branch.' },
        ],
      },
      {
        title: 'Merge changes',
        content: ['Once your work is ready, merge it back into the main branch.'],
        commands: [{ label: 'PowerShell', code: 'git checkout main\ngit merge feature/login-page', explanation: 'Merges the feature branch into main.' }],
      },
    ],
  },
  {
    id: 'github-actions',
    slug: 'github-actions',
    title: 'GitHub Actions Basics',
    category: 'GitHub',
    categoryId: 'github',
    difficulty: 'Intermediate',
    estimatedTime: '35 minutes',
    lessons: 8,
    description: 'Automate testing and deployment with GitHub Actions workflows.',
    prerequisites: ['github-basics'],
    status: 'not-started',
    externalLinks: [
      { label: 'GitHub Actions', url: 'https://github.com/features/actions' },
      { label: 'Actions documentation', url: 'https://docs.github.com/en/actions' },
    ],
    sections: [
      {
        title: 'Understand workflows',
        content: [
          'GitHub Actions runs automated jobs in response to repository events such as pushes, pull requests, releases, or a manual request.',
          'A workflow is a YAML file stored inside .github/workflows. Each workflow contains one or more jobs, and each job contains ordered steps.',
        ],
        checklist: ['Choose an event that should start the workflow', 'Define the job name', 'List the commands the runner should execute'],
      },
      {
        title: 'Create the workflow file',
        content: [
          'Create a folder named .github/workflows in the root of your repository. Then create a YAML file such as ci.yml inside it.',
          'The file name can be different, but it must use the .yml or .yaml extension and be committed to GitHub.',
        ],
        commands: [
          { label: 'PowerShell', code: 'New-Item -ItemType Directory -Force .github\\workflows\nNew-Item .github\\workflows\\ci.yml', explanation: 'Creates the workflow directory and a starter workflow file on Windows PowerShell.' },
        ],
        checklist: ['Create .github/workflows', 'Create ci.yml', 'Save the file in the repository root'],
      },
      {
        title: 'Define when it runs',
        content: ['Use the on property to run the workflow when code is pushed to main or when a pull request targets main.'],
        commands: [
          {
            label: 'ci.yml',
            code: 'name: Continuous Integration\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]',
            explanation: 'Runs the workflow for pushes to main and pull requests that target main.',
          },
        ],
        checklist: ['Choose the production branch', 'Add a push trigger', 'Add a pull_request trigger'],
      },
      {
        title: 'Check out the repository',
        content: ['The runner starts in a clean environment. Use the checkout action to download the repository files before running commands.'],
        commands: [
          {
            label: 'ci.yml',
            code: 'jobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Check out code\n        uses: actions/checkout@v4',
            explanation: 'Creates a build job on an Ubuntu runner and checks out the current commit.',
          },
        ],
        checklist: ['Add a jobs section', 'Choose a runner', 'Use actions/checkout@v4'],
      },
      {
        title: 'Install the runtime and dependencies',
        content: ['Set up the language version your project expects, then install dependencies from the lockfile when one is available.'],
        commands: [
          {
            label: 'Node.js setup',
            code: '      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n\n      - name: Install dependencies\n        run: npm ci',
            explanation: 'Installs Node.js 20, enables npm caching, and performs a clean lockfile-based install.',
          },
        ],
        checklist: ['Choose the supported runtime version', 'Use the project lockfile', 'Enable dependency caching when supported'],
      },
      {
        title: 'Build and test the application',
        content: ['Run the same quality checks that should pass before code is merged. A failed command makes the workflow fail.'],
        commands: [
          {
            label: 'Node.js checks',
            code: '      - name: Run tests\n        run: npm test -- --run\n\n      - name: Build application\n        run: npm run build',
            explanation: 'Runs automated tests first and creates a production build only when tests pass.',
          },
        ],
        checklist: ['Run the test command', 'Run linting if configured', 'Run the production build', 'Fix failures before merging'],
      },
      {
        title: 'Use secrets safely',
        content: [
          'Store tokens and private configuration in the repository or organization Secrets and variables settings. Read them through the secrets context inside the workflow.',
          'Do not write secret values to logs or commit them in the YAML file.',
        ],
        commands: [
          {
            label: 'Secret environment variable',
            code: '      - name: Deploy application\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n        run: npm run deploy',
            explanation: 'Passes a stored GitHub secret to a command without placing the secret in source control.',
          },
        ],
        checklist: ['Open repository Settings', 'Add the secret', 'Reference it with secrets.NAME', 'Never print it in logs'],
        warnings: ['Secrets can be exposed by unsafe scripts. Review third-party actions and never echo secret values.'],
      },
      {
        title: 'Run and inspect the workflow',
        content: ['Commit and push the workflow file. Open the Actions tab on GitHub to watch the run, expand each step, and read any error output.'],
        commands: [
          { label: 'PowerShell', code: 'git add .github/workflows/ci.yml\ngit commit -m "Add CI workflow"\ngit push', explanation: 'Publishes the workflow so GitHub can start a run for the push event.' },
        ],
        checklist: ['Open the Actions tab', 'Select the workflow run', 'Read each job step', 'Fix and push changes if it fails'],
      },
      {
        title: 'Require checks before merging',
        content: ['After the workflow is reliable, protect the main branch and require the build job to pass before a pull request can merge.'],
        checklist: ['Open repository Settings', 'Open Branches or Rulesets', 'Add a rule for main', 'Require the build check', 'Require pull request review'],
      },
    ],
    tips: ['Pin action versions to released major versions such as actions/checkout@v4 and review updates before changing them.', 'Keep CI jobs focused so failures are easy to diagnose.'],
    warnings: ['Do not use pull requests from untrusted forks to run workflows that can access deployment secrets.'],
    troubleshooting: [
      {
        title: 'Workflow does not appear in Actions',
        solution: 'Confirm the YAML file is inside .github/workflows, uses a .yml or .yaml extension, and has valid YAML syntax.',
      },
      {
        title: 'npm ci fails',
        solution: 'Commit package-lock.json and make sure it matches package.json. Use npm install locally to update the lockfile, then push it.',
      },
      {
        title: 'Build works locally but fails in Actions',
        solution: 'Compare the Node.js version, environment variables, operating system paths, and case-sensitive file names.',
      },
    ],
  },
  {
    id: 'postgresql-setup',
    slug: 'postgresql-setup',
    title: 'PostgreSQL Setup',
    category: 'Databases',
    categoryId: 'database',
    difficulty: 'Intermediate',
    estimatedTime: '45 minutes',
    lessons: 9,
    description: 'Install PostgreSQL and connect it to a project with environment-based configuration.',
    prerequisites: ['render-deployment'],
    status: 'not-started',
    externalLinks: [
      { label: 'PostgreSQL website', url: 'https://www.postgresql.org/' },
      { label: 'PostgreSQL documentation', url: 'https://www.postgresql.org/docs/' },
    ],
    sections: [
      {
        title: 'Install PostgreSQL',
        content: [
          'Download PostgreSQL from the official website or use the package manager for your operating system. During the Windows installer, keep PostgreSQL Server, pgAdmin, and Command Line Tools selected.',
          'Choose a strong password for the postgres administrator account and remember the port. The default PostgreSQL port is 5432.',
        ],
        checklist: ['Install PostgreSQL Server', 'Install command line tools', 'Set the postgres password', 'Keep port 5432 unless you need another port'],
      },
      {
        title: 'Verify the PostgreSQL service',
        content: ['Open a new terminal and confirm that the PostgreSQL client is available. Then connect to the local server with the administrator account.'],
        commands: [
          { label: 'PowerShell', code: 'psql --version\npsql -U postgres -h localhost -p 5432', explanation: 'Checks the installed client and opens a local PostgreSQL session.' },
        ],
        checklist: ['Open a new terminal', 'Confirm psql is on PATH', 'Connect to localhost', 'Enter the postgres password'],
      },
      {
        title: 'Create an application database',
        content: ['Create a separate database for your application instead of using the default postgres database. Use a short, clear name such as myapp.'],
        commands: [
          { label: 'SQL', code: 'CREATE DATABASE myapp;\n\\l\n\\c myapp', explanation: 'Creates the application database, lists databases, and connects to myapp.' },
        ],
        checklist: ['Choose a database name', 'Run CREATE DATABASE', 'Confirm the database appears', 'Connect to the new database'],
      },
      {
        title: 'Create an application user',
        content: ['Use a dedicated database user for the application. Do not use the postgres administrator account in application code.'],
        commands: [
          { label: 'SQL', code: "CREATE USER myapp_user WITH PASSWORD 'replace-with-a-strong-password';\nGRANT ALL PRIVILEGES ON DATABASE myapp TO myapp_user;", explanation: 'Creates a restricted application login and grants it access to the application database.' },
        ],
        checklist: ['Create a dedicated user', 'Use a strong password', 'Grant only the access the app needs', 'Keep credentials out of source control'],
        warnings: ['Use a secret manager or environment variables for database passwords. Never commit them to GitHub.'],
      },
      {
        title: 'Test the application connection',
        content: ['Build a connection string from the database user, password, host, port, and database name. Test it from the terminal before connecting your application.'],
        commands: [
          { label: 'PowerShell', code: '$env:DATABASE_URL = "postgresql://myapp_user:YOUR_PASSWORD@localhost:5432/myapp"\npsql $env:DATABASE_URL', explanation: 'Sets a temporary Windows environment variable and uses it to connect with the application credentials.' },
        ],
        checklist: ['Use the application user', 'Confirm the host and port', 'Confirm the database name', 'Connect without using the admin account'],
      },
      {
        title: 'Connect a Node.js application',
        content: ['Install a PostgreSQL client and read DATABASE_URL from the environment. The application should create a connection pool instead of opening a new connection for every request.'],
        commands: [
          { label: 'PowerShell', code: 'npm install pg', explanation: 'Installs the PostgreSQL client for a Node.js application.' },
          { label: 'Node.js', code: "import pg from 'pg'\n\nconst { Pool } = pg\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL })\n\nconst result = await pool.query('SELECT NOW()')\nconsole.log(result.rows[0])", explanation: 'Creates a connection pool and runs a small query to confirm the application can reach PostgreSQL.' },
        ],
        checklist: ['Install the database client', 'Read DATABASE_URL from the environment', 'Create a connection pool', 'Run a test query'],
      },
      {
        title: 'Create tables and migrations',
        content: ['Create tables with a migration tool or SQL file so the database structure can be reproduced in every environment. Avoid manually changing production tables without recording the change.'],
        commands: [
          { label: 'SQL', code: 'CREATE TABLE users (\n  id BIGSERIAL PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);', explanation: 'Creates a simple users table with a generated ID, unique email, and creation timestamp.' },
        ],
        checklist: ['Choose a migration tool', 'Create the first schema migration', 'Run it locally', 'Commit migration files to Git'],
      },
      {
        title: 'Configure PostgreSQL in production',
        content: ['Create a production database through your hosting provider and copy its private connection string into the deployment environment variables. Do not use localhost in production.'],
        checklist: ['Create the production database', 'Copy the provider connection string', 'Add DATABASE_URL to deployment settings', 'Run migrations before serving traffic', 'Use SSL when required'],
        warnings: ['A production database URL contains credentials. Treat it like a password and never paste it into public logs or source code.'],
      },
      {
        title: 'Back up and maintain the database',
        content: ['Back up important data before destructive migrations and monitor storage, connections, and slow queries as the application grows.'],
        commands: [
          { label: 'PowerShell', code: 'pg_dump -U myapp_user -h localhost -d myapp -F c -f myapp-backup.dump\npg_restore -U myapp_user -h localhost -d myapp myapp-backup.dump', explanation: 'Creates a custom-format backup and restores it into a database when needed.' },
        ],
        checklist: ['Schedule provider backups', 'Test restoring a backup', 'Review database connections', 'Record destructive schema changes'],
      },
    ],
    tips: ['Use DATABASE_URL so the same application code works locally and in deployment.', 'Use a migration tool for team projects instead of relying on manual SQL changes.'],
    troubleshooting: [
      {
        title: "'psql' is not recognized",
        solution: 'Add the PostgreSQL bin folder to PATH or run psql from the PostgreSQL installation directory, then open a new terminal.',
      },
      {
        title: 'Connection refused on port 5432',
        solution: 'Confirm the PostgreSQL service is running, the host and port are correct, and no firewall rule is blocking the connection.',
      },
      {
        title: 'Password authentication failed',
        solution: 'Check the username and password, confirm the user exists, and verify that the connection string does not contain unescaped special characters.',
      },
      {
        title: 'Application cannot connect after deployment',
        solution: 'Confirm DATABASE_URL is configured in the hosting provider, use the provider host instead of localhost, and redeploy after changing variables.',
      },
    ],
  },
  {
    id: 'docker-deployment',
    slug: 'docker-deployment',
    title: 'Docker Deployment',
    category: 'DevOps',
    categoryId: 'devops',
    difficulty: 'Advanced',
    estimatedTime: '50 minutes',
    lessons: 8,
    description: 'Package apps in containers and prepare them for deployment.',
    prerequisites: ['github-basics'],
    status: 'not-started',
    externalLinks: [
      { label: 'Docker', url: 'https://www.docker.com/' },
      { label: 'Docker documentation', url: 'https://docs.docker.com/' },
    ],
    sections: [
      {
        title: 'Install Docker and prepare the project',
        content: [
          'Install Docker Desktop and make sure it is running before building an image. Start with a project that already runs locally and has a package.json, requirements.txt, or other dependency manifest.',
          'A container should run one clear application process. Keep source code, configuration, and secrets organized before creating the image.',
        ],
        commands: [
          { label: 'PowerShell', code: 'docker --version\ndocker info', explanation: 'Confirms that Docker is installed and that the Docker engine is running.' },
        ],
        checklist: ['Install Docker Desktop', 'Start the Docker engine', 'Confirm the app runs locally', 'Keep secrets out of the project files'],
      },
      {
        title: 'Create a Dockerfile',
        content: ['Create a file named Dockerfile in the project root. It describes the base image, dependencies, application files, and command that starts the container.'],
        commands: [
          {
            label: 'Dockerfile for a Node.js app',
            code: 'FROM node:20-alpine\n\nWORKDIR /app\n\nCOPY package*.json ./\nRUN npm ci\n\nCOPY . .\nRUN npm run build\n\nEXPOSE 3000\nCMD ["npm", "start"]',
            explanation: 'Uses Node.js 20, installs dependencies before copying source files, builds the app, and starts it on port 3000.',
          },
        ],
        checklist: ['Use a maintained base image', 'Set a working directory', 'Install dependencies', 'Copy application files', 'Declare the application port', 'Define the start command'],
      },
      {
        title: 'Add a .dockerignore file',
        content: ['Prevent local dependencies, secrets, build output, and Git metadata from being copied into the image.'],
        commands: [
          { label: '.dockerignore', code: 'node_modules\ndist\nbuild\n.git\n.env\n*.log\nDockerfile\n.dockerignore', explanation: 'Keeps unnecessary or sensitive local files out of the Docker build context.' },
        ],
        checklist: ['Exclude node_modules', 'Exclude build output', 'Exclude .env files', 'Exclude Git metadata', 'Exclude logs'],
        warnings: ['Never copy .env files or private keys into a container image. Pass secrets at runtime instead.'],
      },
      {
        title: 'Build the Docker image',
        content: ['Build an image from the Dockerfile and give it a local name and tag. Docker uses the current directory as the build context.'],
        commands: [
          { label: 'PowerShell', code: 'docker build -t my-app:local .\ndocker image ls', explanation: 'Builds the image from the current folder and lists locally available images.' },
        ],
        checklist: ['Run the command from the project root', 'Choose a descriptive image name', 'Use a meaningful tag', 'Review the build output for errors'],
      },
      {
        title: 'Run and test the container',
        content: ['Run the image and map a host port to the container port. Open the mapped address in a browser and inspect logs if the process exits.'],
        commands: [
          { label: 'PowerShell', code: 'docker run --name my-app -p 3000:3000 my-app:local\ndocker ps\ndocker logs my-app', explanation: 'Starts the container, maps port 3000, lists running containers, and displays application logs.' },
        ],
        checklist: ['Map the correct port', 'Open http://localhost:3000', 'Test the main application flow', 'Read container logs', 'Stop the container when finished'],
      },
      {
        title: 'Pass configuration at runtime',
        content: ['Keep environment-specific settings outside the image. Supply values with an environment file or -e options when the container starts.'],
        commands: [
          { label: 'PowerShell', code: 'docker run --env-file .env.example -p 3000:3000 --name my-app my-app:local', explanation: 'Starts the same image with runtime configuration supplied separately from the image layers.' },
        ],
        checklist: ['Create a safe example environment file', 'Set production values outside Git', 'Pass DATABASE_URL or API URLs at runtime', 'Do not print secrets in logs'],
      },
      {
        title: 'Use Docker Compose for local services',
        content: ['Use Compose when your application needs PostgreSQL or another service locally. The application should connect to the service name instead of localhost inside the Compose network.'],
        commands: [
          {
            label: 'compose.yaml',
            code: 'services:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      DATABASE_URL: postgresql://app:password@db:5432/myapp\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD: password\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n\nvolumes:\n  postgres-data:',
            explanation: 'Runs the application and PostgreSQL together with a shared network and persistent database volume.',
          },
          { label: 'PowerShell', code: 'docker compose up --build\ndocker compose down', explanation: 'Builds and starts the Compose services, then stops them when development is finished.' },
        ],
        checklist: ['Create compose.yaml', 'Use the service name db as the database host', 'Persist database data with a volume', 'Stop services when finished'],
      },
      {
        title: 'Tag and publish the image',
        content: ['For deployment, tag the image with your container registry name and push it to a registry such as Docker Hub or a cloud container registry.'],
        commands: [
          { label: 'PowerShell', code: 'docker login\ndocker tag my-app:local YOUR-USERNAME/my-app:1.0.0\ndocker push YOUR-USERNAME/my-app:1.0.0', explanation: 'Logs in to a registry, adds a publishable tag, and uploads the image.' },
        ],
        checklist: ['Create a registry repository', 'Log in without exposing credentials', 'Use an immutable version tag', 'Push the image', 'Configure the deployment platform to pull it'],
      },
      {
        title: 'Prepare the container for deployment',
        content: ['Configure the hosting platform to use the published image or build the Dockerfile directly. Make sure the application listens on the port supplied by the platform and writes logs to standard output.'],
        checklist: ['Set the production image or Dockerfile source', 'Configure runtime environment variables', 'Expose the platform port', 'Add a health check', 'Review startup logs'],
      },
    ],
    tips: ['Use small, specific base images and multi-stage builds to reduce image size.', 'Tag releases with versions instead of relying only on latest.'],
    warnings: ['Do not bake passwords, API keys, or database credentials into Docker image layers.'],
    troubleshooting: [
      {
        title: 'Docker daemon is not running',
        solution: 'Start Docker Desktop, wait for the engine to become ready, and run docker info again.',
      },
      {
        title: 'Port is already in use',
        solution: 'Stop the process using the host port or map another host port, such as -p 3001:3000.',
      },
      {
        title: 'Container exits immediately',
        solution: 'Run docker logs CONTAINER_NAME and confirm the CMD, start script, environment variables, and application port.',
      },
      {
        title: 'Application cannot reach PostgreSQL',
        solution: 'With Docker Compose, use the database service name as the host. Do not use localhost from inside the application container.',
      },
    ],
  },
  {
    id: 'vercel-deployment',
    slug: 'vercel-deployment',
    title: 'Deploy to Vercel',
    category: 'Deployment',
    categoryId: 'deployment',
    difficulty: 'Beginner',
    estimatedTime: '15 minutes',
    lessons: 8,
    description: 'Deploy frontend apps from GitHub to Vercel with automatic previews and domains.',
    prerequisites: ['github-basics'],
    status: 'not-started',
    externalLinks: [
      { label: 'Vercel', url: 'https://vercel.com/' },
      { label: 'Vercel documentation', url: 'https://vercel.com/docs' },
    ],
    sections: [
      {
        title: 'Prepare your project',
        content: [
          'Make sure your application runs locally before deploying it. Vercel should be able to install dependencies and create a production build from the repository.',
          'Confirm that package.json is committed to GitHub and that your project is using the correct build script.',
        ],
        commands: [
          { label: 'PowerShell', code: 'npm install\nnpm run build', explanation: 'Installs dependencies and confirms that the production build works before deployment.' },
        ],
        checklist: ['Project is pushed to GitHub', 'package.json is committed', 'Application builds locally', 'Secrets are excluded from Git'],
      },
      {
        title: 'Open Vercel and sign in',
        content: [
          'Open Vercel and choose Continue with GitHub. Authorize Vercel when GitHub asks for permission to connect your account.',
          'Use the same GitHub account that owns the repository you want to deploy.',
        ],
        checklist: ['Open vercel.com', 'Choose Continue with GitHub', 'Authorize the GitHub connection'],
      },
      {
        title: 'Import the GitHub repository',
        content: [
          'From the Vercel dashboard, select Add New and then Project. Find your repository in the Import Git Repository list and select Import.',
          'If the repository is missing, review the GitHub repository permissions and grant Vercel access to the correct account or organization.',
        ],
        checklist: ['Click Add New', 'Choose Project', 'Find the GitHub repository', 'Click Import'],
      },
      {
        title: 'Configure the project',
        content: [
          'Vercel usually detects the framework and fills in the defaults. Review the settings before deploying so the build uses the correct folder and command.',
          'For a Vite React application, the framework preset is Vite, the build command is npm run build, and the output directory is dist.',
        ],
        commands: [
          { label: 'Vite React settings', code: 'Framework Preset: Vite\nBuild Command: npm run build\nOutput Directory: dist', explanation: 'Common production settings for a Vite React frontend.' },
          { label: 'Next.js settings', code: 'Framework Preset: Next.js\nBuild Command: npm run build', explanation: 'Next.js projects normally use the detected defaults.' },
        ],
        checklist: ['Confirm the framework preset', 'Check the root directory', 'Confirm the build command', 'Confirm the output directory'],
      },
      {
        title: 'Add environment variables',
        content: [
          'Expand Environment Variables and add every value your application needs at runtime, such as API URLs or database connection strings.',
          'Add production values in Vercel instead of committing a .env file containing secrets to GitHub.',
        ],
        checklist: ['Open Environment Variables', 'Add the variable name', 'Add the variable value', 'Choose the correct environments', 'Save the variables'],
        warnings: ['Never commit passwords, API keys, or private connection strings to GitHub.'],
      },
      {
        title: 'Deploy the application',
        content: [
          'Select Deploy. Vercel clones the repository, installs dependencies, runs the build command, and publishes the generated application.',
          'Keep the deployment page open while the build runs. The logs show which step is currently running and explain failures.',
        ],
        checklist: ['Review the settings', 'Click Deploy', 'Wait for the build to finish', 'Check the deployment logs'],
      },
      {
        title: 'Open and test the live site',
        content: [
          'When deployment succeeds, select Visit or open the generated vercel.app URL. Test the main page, navigation, forms, images, and any API calls.',
          'Use the Vercel project dashboard to find the production URL, deployment history, and domain settings.',
        ],
        checklist: ['Open the vercel.app URL', 'Test the main user flow', 'Check browser console errors', 'Confirm assets load correctly'],
      },
      {
        title: 'Deploy future updates',
        content: [
          'Vercel automatically creates a new deployment when you push a commit to the connected GitHub branch. Pull requests receive preview deployments so you can test changes before production.',
          'Commit and push a small change to verify that the connection is working.',
        ],
        commands: [
          { label: 'PowerShell', code: 'git add .\ngit commit -m "Update application"\ngit push', explanation: 'Pushes a new commit so Vercel can build and deploy the update.' },
        ],
        checklist: ['Make a small change', 'Commit the change', 'Push to the connected branch', 'Open the new deployment URL'],
      },
    ],
    tips: ['Use Preview deployments for pull requests and reserve Production for the connected production branch.', 'Vercel provides free HTTPS on its generated domains.'],
    warnings: ['Client-side environment variables may be exposed to users. Only expose values that are safe to send to the browser.'],
    troubleshooting: [
      {
        title: 'Build command failed',
        solution: 'Run npm run build locally, confirm the framework preset, and check the deployment logs for the first error.',
      },
      {
        title: 'Repository is not listed',
        solution: 'Open your GitHub settings, review Vercel repository access, and grant access to the repository or organization.',
      },
      {
        title: 'Environment variable is undefined',
        solution: 'Confirm the variable name, value, and selected environment. Redeploy after changing a production variable.',
      },
    ],
  },
  {
    id: 'netlify-deployment',
    slug: 'netlify-deployment',
    title: 'Deploy to Netlify',
    category: 'Deployment',
    categoryId: 'deployment',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    lessons: 8,
    description: 'Deploy static and frontend apps with Netlify from GitHub.',
    prerequisites: ['github-basics'],
    status: 'not-started',
    externalLinks: [
      { label: 'Netlify', url: 'https://www.netlify.com/' },
      { label: 'Netlify documentation', url: 'https://docs.netlify.com/' },
    ],
    sections: [
      {
        title: 'Prepare your project',
        content: [
          'Confirm that the project runs locally and that its source code is pushed to GitHub before connecting Netlify.',
          'For a Vite React app, the production output is usually created in dist. Check your framework documentation if your project uses a different output folder.',
        ],
        commands: [
          { label: 'PowerShell', code: 'npm install\nnpm run build', explanation: 'Installs dependencies and confirms that the production build works locally.' },
        ],
        checklist: ['Project is pushed to GitHub', 'package.json is committed', 'Application builds locally', 'Secrets are excluded from Git'],
      },
      {
        title: 'Create a Netlify account',
        content: [
          'Open Netlify and select Sign up. Choose GitHub so Netlify can import repositories and listen for future commits.',
          'Authorize Netlify to access the GitHub repositories you want to deploy.',
        ],
        checklist: ['Open netlify.com', 'Select Sign up', 'Choose GitHub', 'Approve repository access'],
      },
      {
        title: 'Import the GitHub repository',
        content: [
          'From the Netlify dashboard, select Add new site, choose Import an existing project, and select GitHub as the Git provider.',
          'Choose the repository and branch that should be deployed to production. The main branch is the usual choice.',
        ],
        checklist: ['Click Add new site', 'Choose Import an existing project', 'Select GitHub', 'Choose the repository', 'Select the production branch'],
      },
      {
        title: 'Configure build settings',
        content: [
          'Netlify may detect the framework automatically. Review the build command and publish directory before starting the deployment.',
          'For a Vite React application, use npm run build as the build command and dist as the publish directory.',
        ],
        commands: [
          { label: 'Vite React settings', code: 'Build command: npm run build\nPublish directory: dist', explanation: 'Builds the frontend and serves the generated dist folder.' },
          { label: 'Create React App settings', code: 'Build command: npm run build\nPublish directory: build', explanation: 'Create React App writes its production files to build.' },
        ],
        checklist: ['Confirm the base directory', 'Set the build command', 'Set the publish directory', 'Confirm the production branch'],
      },
      {
        title: 'Add environment variables',
        content: [
          'Open Site configuration, then Environment variables, and add the values required by your application.',
          'Environment variables added in Netlify are available during builds and can be scoped to the correct deployment context.',
        ],
        checklist: ['Open Site configuration', 'Open Environment variables', 'Add each variable name and value', 'Choose the correct deploy context', 'Save the variables'],
        warnings: ['Never commit passwords, API keys, or private connection strings to GitHub.'],
      },
      {
        title: 'Deploy the site',
        content: [
          'Select Deploy site. Netlify clones the repository, installs dependencies, runs the build command, and publishes the output directory.',
          'Open the deploy log if the site does not publish. The first failing command usually identifies the configuration problem.',
        ],
        checklist: ['Review the repository and branch', 'Review build settings', 'Click Deploy site', 'Wait for the deploy to finish', 'Read the deploy log if it fails'],
      },
      {
        title: 'Open and test the live site',
        content: [
          'After the deploy succeeds, open the generated netlify.app URL. Check the homepage, navigation, images, forms, and any API requests.',
          'Use Domain management when you are ready to connect a custom domain. Netlify provides HTTPS for the generated and connected domains.',
        ],
        checklist: ['Open the netlify.app URL', 'Test the main user flow', 'Confirm assets load', 'Check browser console errors', 'Review the deploy summary'],
      },
      {
        title: 'Deploy future updates',
        content: [
          'Netlify automatically creates a new deploy whenever you push a commit to the connected production branch. Pull requests can receive deploy previews for review.',
          'Push a small change to confirm that the GitHub connection and automatic deployment are working.',
        ],
        commands: [
          { label: 'PowerShell', code: 'git add .\ngit commit -m "Update application"\ngit push', explanation: 'Pushes a new commit so Netlify can build and deploy the update.' },
        ],
        checklist: ['Make a small change', 'Commit the change', 'Push to GitHub', 'Open the new deploy preview or production URL'],
      },
    ],
    tips: ['Use deploy previews to test pull requests before merging them into the production branch.', 'Use a _redirects file or framework routing configuration when a single-page app needs direct links to client-side routes.'],
    warnings: ['Client-side environment variables can be visible in the browser. Only expose values that are safe for users to see.'],
    troubleshooting: [
      {
        title: 'Publish directory not found',
        solution: 'Run the build locally and confirm the generated folder. Use dist for Vite or build for Create React App.',
      },
      {
        title: 'Repository is not available',
        solution: 'Review Netlify GitHub permissions and grant access to the repository or organization that owns the project.',
      },
      {
        title: 'Page not found after refreshing a route',
        solution: 'Configure the host for single-page app redirects so unknown paths are sent to index.html.',
      },
    ],
  },
]

export const quickLinks = [
  { title: 'Install Git', slug: 'git-installation' },
  { title: 'Connect to GitHub', slug: 'github-basics' },
  { title: 'Deploy to Render', slug: 'render-deployment' },
  { title: 'Git Branches', slug: 'git-branches' },
  { title: 'GitHub Actions', slug: 'github-actions' },
]

export const roadmap = [
  { version: 'v1.1.0', title: 'Interactive Tutorial Builder', details: ['Block-based tutorial editor', 'Image Library integration', 'Live preview and validation', 'Draft autosave, publishing, duplication, and JSON export'] },
  { version: 'v1.0.0', title: 'Git → GitHub → Render basics', details: ['Home dashboard', 'Tutorial library', 'Progress tracking', 'Responsive layout'] },
  { version: 'v1.1.0', title: 'More deployment platforms', details: ['Vercel', 'Netlify', 'Railway', 'Firebase'] },
  { version: 'v1.2.0', title: 'Developer tools & resources', details: ['JSON tools', 'Encoding tools', 'Cheatsheets'] },
]
