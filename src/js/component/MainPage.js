'use strict';

import React from 'react';
import BaseComponent from './BaseComponent.js';
import cns from '../ClassName.js';
import {Constants} from '../Constants.js';

import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';

class MainPage extends BaseComponent {
	constructor() {
		super();
		this._bind('_getPassStep');

		this.state = {
			step: [1]
		};
	}

	render() {
		let stp = this.state.step.length - 1;
		// console.log('stp: ' + stp);

		return (
			<div className = "main-content">
				<div className = "action-bar"></div>
				<div className = "nav">
					<span className = {cns("nav-step", (stp > 0 && "pass"), (stp === 0 && "enable"))}>Step1</span>
					<span className = "nav-indicator"></span>
					<span className = {cns("nav-step", (stp > 1 && "pass"), (stp === 1 && "enable"))}>Step2</span>
					<span className = "nav-indicator"></span>
					<span className = {cns("nav-step", (stp > 1 && "pass"))}>Step3</span>
				</div>
				<Step1 visible={(stp === 0) ? Constants.visibleView : Constants.visibleHide} getPassStep={this._getPassStep} />
				<Step2 visible={(stp === 1) ? Constants.visibleView : Constants.visibleHide} getPassStep={this._getPassStep} />
				<Step3 visible={(stp === 2) ? Constants.visibleView : Constants.visibleHide} getPassStep={this._getPassStep} />
			</div>
		);
	}

	_getPassStep(res) {
		var concatStep = this.state.step;
		concatStep.push(res);
		this.setState({
			step: concatStep
		});
		// console.log(this.state.step);
	}
}

export default MainPage;
