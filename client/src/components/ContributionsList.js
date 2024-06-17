import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const ContributionsList = ({ contributions, onLoadMore }) => {
  const [visibleContributions, setVisibleContributions] = useState(6);

  const loadMoreContributions = () => {
    setVisibleContributions(visibleContributions + 6);
    onLoadMore();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Contributions</Typography>
        <List>
          {contributions.slice(0, visibleContributions).map((contribution, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Repo: ${contribution.repo}`}
                secondary={`Commit: ${contribution.commit} on ${new Date(contribution.date).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
        {contributions.length > visibleContributions && (
          <Button variant="contained" color="primary" onClick={loadMoreContributions}>
            Load More Contributions
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ContributionsList;
