const GITHUB_API_BASE = 'https://api.github.com'

export async function fetchRepoData(owner: string, repo: string) {
  try {
    // Fetch basic repo info
    const repoResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`)
    const repoData = await repoResponse.json()

    // Fetch recent commits
    const commitsResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits`)
    const commitsData = await commitsResponse.json()

    // Fetch open issues
    const issuesResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/issues?state=open`)
    const issuesData = await issuesResponse.json()

    // Fetch open PRs
    const prsResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=open`)
    const prsData = await prsResponse.json()

    // Fetch contributors
    const contributorsResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`)
    const contributorsData = await contributorsResponse.json()

    return {
      name: repoData.full_name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      contributors: contributorsData.length,
      files: 0, // This would require a different API call
      lastUpdated: repoData.updated_at,
      language: repoData.language,
      topics: repoData.topics || [],
      stats: {
        totalCommits: repoData.commits_url ? commitsData.length : 0,
        openIssues: issuesData.length,
        openPRs: prsData.length,
      },
      recentActivity: [
        ...commitsData.slice(0, 3).map((commit: any) => ({
          type: 'commit',
          message: commit.commit.message,
          author: commit.author?.login || commit.commit.author.name,
          date: commit.commit.author.date,
        })),
        ...prsData.slice(0, 2).map((pr: any) => ({
          type: 'pr',
          title: pr.title,
          author: pr.user.login,
          date: pr.created_at,
        })),
        ...issuesData.slice(0, 2).map((issue: any) => ({
          type: 'issue',
          title: issue.title,
          author: issue.user.login,
          date: issue.created_at,
        })),
      ],
    }
  } catch (error) {
    console.error('Error fetching repository data:', error)
    throw error
  }
} 