import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@mui/material';

const FollowersList = ({ followers }) => {
  const [visibleFollowers, setVisibleFollowers] = useState(3);

  const loadMoreFollowers = () => {
    setVisibleFollowers(visibleFollowers + 3);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Followers</Typography>
        <List>
          {followers.slice(0, visibleFollowers).map((follower, index) => (
            <ListItem key={index} button component="a" href={follower.html_url} target="_blank">
              <ListItemAvatar>
                <Avatar src={follower.avatar_url} alt={follower.login} />
              </ListItemAvatar>
              <ListItemText primary={follower.login} />
            </ListItem>
          ))}
        </List>
        {followers.length > visibleFollowers && (
          <Button variant="contained" color="primary" onClick={loadMoreFollowers}>
            Load More Followers
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowersList;
