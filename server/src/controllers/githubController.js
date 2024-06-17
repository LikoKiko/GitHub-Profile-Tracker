const axios = require('axios');

const getUserContributions = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/events`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from GitHub API' });
  }
};

module.exports = { getUserContributions };
