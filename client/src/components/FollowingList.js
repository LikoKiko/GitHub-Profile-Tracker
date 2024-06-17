import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@mui/material';

const FollowingList = ({ following }) => {
  const [visibleFollowing, setVisibleFollowing] = useState(3);

  const loadMoreFollowing = () => {
    setVisibleFollowing(visibleFollowing + 3);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Following</Typography>
        <List>
          {following.slice(0, visibleFollowing).map((user, index) => (
            <ListItem key={index} button component="a" href={user.html_url} target="_blank">
              <ListItemAvatar>
                <Avatar src={user.avatar_url} alt={user.login} />
              </ListItemAvatar>
              <ListItemText primary={user.login} />
            </ListItem>
          ))}
        </List>
        {following.length > visibleFollowing && (
          <Button variant="contained" color="primary" onClick={loadMoreFollowing}>
            Load More Following
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowingList;
