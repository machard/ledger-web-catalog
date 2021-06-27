import React, { useEffect, useReducer, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import client from "./client";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    paper: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      padding: theme.spacing(3, 3)
    }
  });

export interface ContentProps extends WithStyles<typeof styles> {
  fetchInstalled: Function;
}

function Content(props: ContentProps) {
  const { classes, fetchInstalled } = props;
  const [form, dispatch] = useReducer((state: any, u: any) => ({...state, ...u}), {})
  
  const onChange = (event: { target: { id: string; value: string; }; }) =>
    dispatch({
      [event.target.id]: event.target.value,
    });

  const add = async() => {
    if (!form.name || !form.description || !form.url) {
      return;
    }

    const app = {
      ...form,
      name: "[DEV] " + form.name,
      icon: "gavel",
      image: "https://lh3.googleusercontent.com/proxy/uJZA9YwsuK_I0toabhbMs7TbvpkQa0oljD7LQNHiB9b8q_mzap8_qXoOLcwayWtIMu8Ki5s3hvMaLDD1Dv-ve9vdxS7z2i6htiEt1Bz-dpeo"
    }

    await client.request( "apps", "addApp", [app]);

    fetchInstalled();
    dispatch({
      name: "",
      description: "",
      url: ""
    });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6">
          Add a new dev app
        </Typography>
        <Divider light />
        <Box m={1} />
        <TextField
          id="name"
          label="Name"
          required
          value={form.name || ""}
          onChange={onChange}
          helperText="Will automatically be prefixed by [DEV]"
        />
        <TextField
          id="description"
          label="Description"
          required
          value={form.description || ""}
          onChange={onChange}
        />
        <TextField
          id="url"
          label="url"
          helperText="http/https url"
          value={form.url || ""}
          onChange={onChange}
          required
        />
        <Box m={2} />
        <Button variant="contained" color="primary" onClick={add}>
          Add
        </Button>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Content);
