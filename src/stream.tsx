import { WindowPostMessageStream } from '@metamask/post-message-stream';

export default new WindowPostMessageStream({
  name: 'ledger-web-app',
  target: 'ledger-web-parent',
  // todo when updating: https://github.com/MetaMask/post-message-stream/pull/23
    // targetOrigin: "*",
  targetWindow: window.parent || window,
});;
