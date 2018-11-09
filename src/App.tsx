import * as React from 'react';

import { AppBar, Drawer, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { DraftDisplay } from './components/DraftDisplay';
import { DraftFrame } from './components/DraftFrame';
import { DraftMenu } from './components/DraftMenu';

interface IAppState {
  code: string;
  display: DraftDisplay;
  isMenuOpen: boolean;
}

class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);

    // parse query string parameters here
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') || 'GRN'; // default to guilds

    this.state = {
      code,
      display: DraftDisplay.None,
      isMenuOpen: false
    };
  }

  public render() {
    return (
      <div>
        <AppBar position='static' className='appBar'>
          <Toolbar>
              <IconButton color='inherit' aria-label='Menu'>
                <MenuIcon onClick={this.onToggleMenu}/>
              </IconButton>
              <h2>MTG Draft Bot</h2>
            </Toolbar>
        </AppBar>
        <Drawer open={this.state.isMenuOpen}>
            <DraftMenu onMenuChanged={this.changeCanvas}/>
        </Drawer>
        <DraftFrame code={this.state.code} display={this.state.display} />
      </div>
    );
  }

  private onToggleMenu = (): void => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  private changeCanvas = (display: DraftDisplay): void => {
    this.setState({
        display,
        isMenuOpen: false
    });
  }
}

export default App;
