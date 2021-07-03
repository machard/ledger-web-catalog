import React, { useEffect, useState } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Content from './Content';
import Developer from "./Developer";
import Header from './Header';
import client from "./client";

const styles = (theme: Theme) => createStyles({
  main: {
    flex: 1,
    padding: theme.spacing(3, 2),
    background: '#eaeff1',
    height: '100%',
    overflowY: 'scroll'
  },
});

export interface PaperbaseProps extends WithStyles<typeof styles> {}

function Paperbase(props: PaperbaseProps) {
  const { classes } = props;
  const [category, setCategory] = useState(0);

  const [installed, setInstalled] = useState<any>();
  const [appsData, setAppsData] = useState<any>();

  const fetchInstalled = async () => {
    const installed: any[] = await client.request("apps", "list", []);
    setInstalled(installed.reduce((map, app) => ({
      ...map,
      [app.url]: app
    }), {}));
  }
  const fetchAppsData = async () => {
    const appsData: any = await client.request("apps", "data", []);
    setAppsData(appsData);
  }

  useEffect(() => {
    fetchInstalled()
    fetchAppsData()
  }, []);

  let content = null;

  let categories = ["Installed"];

  if (installed && appsData) {
    const apps = appsData.apps;
    categories = ["Installed"].concat(appsData.categories);

    const selectedApps = category
      ? apps.filter((app: any) => app.categories.includes(categories[category]))
      : Object.values(installed);

    content = category < categories.length ?
      (<Content category={category} apps={selectedApps} fetchInstalled={fetchInstalled} installed={installed} />)
    :
      (<Developer fetchInstalled={fetchInstalled} />);
  }

  return (
    <React.Fragment>
      <Header categories={categories} setCategory={setCategory} category={category} />
      <main className={classes.main}>
        {content}
      </main>
    </React.Fragment>
  );
}

export default withStyles(styles)(Paperbase);
