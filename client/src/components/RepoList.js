import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const RepoList = ({ repos }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Repositories</Typography>
      <List>
        {repos.map((repo, index) => (
          <ListItem key={index} button component="a" href={repo.html_url} target="_blank">
            <ListItemText
              primary={repo.name}
              secondary={repo.description}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default RepoList;
