import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import client from "./client";
import { Paper } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    card: {
      width: 345,
      minWidth: 345,
      display: "inline-block",
      margin: theme.spacing(3, 2),
    },
    media: {
      height: 140,
    },
    description: {
      height: 100,
      width: "100%",
      textOverflow: "ellipsis"
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      padding: theme.spacing(3, 3)
    },
  });

export interface ContentProps extends WithStyles<typeof styles> {
  apps: any[],
  installed: any,
  fetchInstalled: Function,
  category: number,
}

function Content(props: ContentProps) {
  const { classes, category, apps, fetchInstalled, installed } = props;

  return (
    <div className={classes.root}>
      {apps.map((app, i) =>
        <Card key={i} className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={app.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {app.name}
              </Typography>
              <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                {app.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {!installed[app.url] ? <Button
              size="small"
              color="primary"
              onClick={async () => {
                await client.request( "apps", "addApp", [app]);
                fetchInstalled();
              }}
            >
              Add
            </Button> : null}
            {installed[app.url] ? <Button
              size="small"
              color="secondary"
              onClick={async () => {
                await client.request( "apps", "removeApp", [app.url]);
                fetchInstalled();
              }}
            >
              Remove
            </Button> : null}
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )}
      {category === 0 && !apps.length ? (
        <Paper className={classes.paper}>
          Start by adding an app, Wallet BTC for example.
        </Paper>
      ): null}
    </div>
  );
}

export default withStyles(styles)(Content);
