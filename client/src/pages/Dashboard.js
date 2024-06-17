import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import RepoList from '../components/RepoList';
import FollowersList from '../components/FollowersList';
import FollowingList from '../components/FollowingList';
import ContributionsList from '../components/ContributionsList';
import { fetchUserProfile, fetchUserRepos, fetchUserFollowers, fetchUserFollowing, fetchUserContributions } from '../services/githubService';
import { AppBar, Toolbar, Typography, Container, CircularProgress, TextField, Button, Grid, Box, Paper, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commitPage, setCommitPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      fetchData(savedUsername);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFetchData = () => {
    setLoading(true);
    fetchData(username);
  };

  const fetchData = async (username) => {
    setError(null); // Clear previous errors
    try {
      const [profileData, repoData, followersData, followingData, contributionsData] = await Promise.all([
        fetchUserProfile(username),
        fetchUserRepos(username),
        fetchUserFollowers(username),
        fetchUserFollowing(username),
        fetchUserContributions(username)
      ]);

      setProfile(profileData);
      setRepos(repoData);
      setFollowers(followersData);
      setFollowing(followingData);
      setContributions(contributionsData);

      localStorage.setItem('githubUsername', username);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('API rate limit exceeded. Please try again later.');
      } else {
        setError('Error fetching data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMoreContributions = async () => {
    const nextPage = commitPage + 1;
    try {
      const moreContributions = await fetchUserContributions(username, nextPage);
      setContributions((prevContributions) => [...prevContributions, ...moreContributions]);
      setCommitPage(nextPage);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('API rate limit exceeded. Please try again later.');
      } else {
        setError('Error loading more contributions. Please try again.');
      }
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            GitHub Profile Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Box component={Paper} p={3} mb={3}>
          <TextField
            label="GitHub Username"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleFetchData} fullWidth>
            Fetch Data
          </Button>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <CircularProgress style={{ marginTop: '20px' }} />
        ) : (
          profile && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <ProfileCard profile={profile} />
                <Card>
                  <CardContent className="MuiCardContent-root css-46bh2p-MuiCardContent-root">
                    <FollowersList followers={followers} />
                    <FollowingList following={following} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <RepoList repos={repos} />
                  </Grid>
                  <Grid item xs={12}>
                    <ContributionsList contributions={contributions} onLoadMore={loadMoreContributions} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        )}
      </Container>
    </>
  );
};

export default Dashboard;
