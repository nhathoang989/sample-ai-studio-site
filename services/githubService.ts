
export interface GithubRepoData {
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  lastUpdate: string;
}

export const fetchMixcoreStats = async (): Promise<GithubRepoData | null> => {
  try {
    const response = await fetch('https://api.github.com/repos/mixcore/mix.core');
    if (!response.ok) throw new Error('Failed to fetch github stats');
    const data = await response.json();
    
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      watchers: data.subscribers_count,
      lastUpdate: new Date(data.updated_at).toLocaleDateString('vi-VN'),
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
};
