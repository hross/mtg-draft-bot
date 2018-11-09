import * as React from 'react';

import { DraftFrame } from './components/DraftFrame';


interface IAppState {
  code: string;
}

class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);

    // parse query string parameters here
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') || "GRN"; // default to guilds

    this.state = {
      code
    };
  }

  public render() {
    return (
        <DraftFrame 
          code={this.state.code} />
    );
  }
}

export default App;
