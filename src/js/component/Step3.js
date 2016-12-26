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
            <div className="step3">
                <span className="result-content">Complete.</span>
            </div>
        );
    }
}

export default Step3;
