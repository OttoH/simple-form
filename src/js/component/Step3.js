'use strict'

import React from 'react';
import BaseComponent from './BaseComponent.js';
import cns from '../ClassName.js';
import {Constants} from '../Constants.js';

class Step3 extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={cns("step3", this.props.visible === Constants.visibleHide && "hidden")}>
                <span className="result-content">Complete.</span>
            </div>
        );
    }
}

export default Step3;
