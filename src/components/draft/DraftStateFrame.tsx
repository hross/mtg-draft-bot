import * as React from 'react';

import { Pack } from '../../model/Pack';
import { PackFrame } from './PackFrame';

interface IDraftStateFrameProps {
    packs: Pack[];
}

export class DraftStateFrame extends React.Component<IDraftStateFrameProps> {
    constructor(props: IDraftStateFrameProps) {
        super(props);
    }

    public render() {
        const { packs } = this.props;
        return (
            <div>
                {packs.map((p, idx) => <PackFrame key={idx} index={idx} pack={p} />)}
            </div>
        );
    }
}