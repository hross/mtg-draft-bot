import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { DraftDisplay } from './DraftDisplay';

interface IDraftMenuProps {
    onMenuChanged: (option: DraftDisplay) => void;
}

export class DraftMenu extends React.Component<IDraftMenuProps> {
    public render() {
        return (
            <div className='draftMenu'>
                <List>
                    <ListItem>
                        <ListItemText primary='Packs' onClick={this.changeCanvas.bind(this, DraftDisplay.Packs)} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Players' onClick={this.changeCanvas.bind(this, DraftDisplay.Players)} />
                    </ListItem>
                </List>
            </div>
        );
    }

    private changeCanvas = (display: DraftDisplay): void => {
        this.props.onMenuChanged(display);
    }
}