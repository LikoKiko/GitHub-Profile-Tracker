import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

const ProfileCard = ({ profile }) => (
  <Card>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar src={profile.avatar_url} alt={profile.login} style={{ width: 80, height: 80 }} />
        </Grid>
        <Grid item>
          <Typography variant="h5">{profile.name}</Typography>
          <Typography variant="body1">@{profile.login}</Typography>
          <Typography variant="body2">{profile.bio}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default ProfileCard;
