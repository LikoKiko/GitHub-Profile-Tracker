import axios from 'axios';

const API_URL = 'https://api.github.com';

export const fetchUserProfile = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const fetchUserRepos = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
};

export const fetchUserFollowers = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}/followers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user followers:', error);
    throw error;
  }
};

export const fetchUserFollowing = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}/following`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user following:', error);
    throw error;
  }
};

export const fetchUserCommits = async (username, repo, page = 1) => {
  try {
    const response = await axios.get(
      `${API_URL}/repos/${username}/${repo}/commits?author=${username}`,
      { params: { page, per_page: 10 } }
    );
    return response.data.map(commit => ({
      repo,
      commit: commit.commit.message,
      date: commit.commit.author.date,
    }));
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.warn(`Conflict error for repository ${repo}`);
      return []; // Return an empty array if there's a conflict
    }
    throw error;
  }
};

export const fetchUserContributions = async (username, page = 1) => {
  try {
    const repos = await fetchUserRepos(username);
    const contributions = await Promise.all(
      repos.map(async (repo) => {
        return await fetchUserCommits(username, repo.name, page);
      })
    );

    return contributions.flat();
  } catch (error) {
    console.error('Error fetching user contributions:', error);
    throw error;
  }
};
