import React, { useState } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Content from './Content';
import Header from './Header';

const styles = (theme: Theme) => createStyles({
  main: {
    flex: 1,
    padding: theme.spacing(3, 2),
    background: '#eaeff1',
    height: '100%',
    overflowY: 'scroll'
  },
});

const categories = ["Popular", "Wallet", "Trading", "Borrowing/Lending"];

const apps = [
  {
    categories: ["Popular", "Wallet"],
    name: "Wallet BTC",
    description: "Bitcoin (₿) is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries",
    image: "https://bitcoin.org/img/icons/opengraph.png?1621851118",
    icon: "account_balance_wallet",
    url: "https://www.downloadwebsitetemplates.co.uk/templates/progress/",
  },
  {
    categories: ["Popular", "Wallet"],
    name: "Wallet Ethereum",
    description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH or Ξ) is the native cryptocurrency of the platform",
    image: "https://pbs.twimg.com/profile_images/1084788308595617793/DOnqq1OM.jpg",
    icon: "account_balance_wallet",
    url: "https://www.downloadwebsitetemplates.co.uk/templates/progress/",
  },
  {
    categories: ["Wallet"],
    name: "Wallet Cosmos",
    description: "Cosmos (ATOM) is a decentralized ecosystem of independent blockchains that its creator, All In Bits Inc (dba Tendermint Inc), hopes is the foundation for the next generation of internet technology",
    image: "https://pbs.twimg.com/profile_images/1328431690268729347/flijoJYv_400x400.jpg",
    icon: "account_balance_wallet",
    url: "https://www.downloadwebsitetemplates.co.uk/templates/progress/",
  },
  {
    categories: ["Trading"],
    name: "Thorswap",
    description: "THORSwap is the world's first Multichain DEX that utilizes the THORChain network to provide a front-end user interface to perform cross-chain swaps. This is done in a permissionless, trustless, and non-custodial manner",
    image: "https://pbs.twimg.com/profile_images/1408059226862194698/3k30XVC9_400x400.jpg",
    icon: "swap_horiz",
    url: "https://www.downloadwebsitetemplates.co.uk/templates/progress/",
  },
  {
    categories: ["Borrowing/Lending"],
    name: "Liquity",
    description: "Interest-free liquidity at your fingertips. Borrow LUSD against ETH at 0% interest",
    image: "https://pbs.twimg.com/profile_images/1247198364707545089/zEgsUkSu_400x400.jpg",
    icon: "attach_money",
    url: "https://www.downloadwebsitetemplates.co.uk/templates/progress/",
  }
]

export interface PaperbaseProps extends WithStyles<typeof styles> {}

function Paperbase(props: PaperbaseProps) {
  const { classes } = props;
  const [category, setCategory] = useState(0);

  const selectedApps = apps.filter(app => app.categories.includes(categories[category]));

  return (
    <React.Fragment>
      <Header categories={categories} setCategory={setCategory} category={category} />
      <main className={classes.main}>
      <Content apps={selectedApps} />
      </main>
    </React.Fragment>
  );
}

export default withStyles(styles)(Paperbase);
