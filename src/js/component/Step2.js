'use strict'

import React from 'react';
import BaseComponent from './BaseComponent.js';
import cns from '../ClassName.js';
import {Constants} from '../Constants.js';

class Step2 extends BaseComponent {
    constructor(props) {
        super(props);

        this._bind('_clickNext', '_checkInput');

        this.state = {
            firstName: '-0',
			lastName: '-0',
			conNumber: '-0',
			address: '-0',
            enableNext: false
        };
    }

    render() {
        let st = this.state;

        return (
            <div className={cns("step2", this.props.visible === Constants.visibleHide ? "hidden" : "slide")}>
                <span className="title">Your Contact Information</span>
                <span className="sub-title">Fill in the following details</span>
                <form className="info-form">
                    <div className="input-area">
                        <label className={cns("labels", st.firstName !== '' && st.firstName !== '-0' && "show")} for="first-name">Your First Name</label>
                        <input type="text" className={cns(st.firstName !== '' && st.firstName !== '-0' && "bold")} name="first-name" placeholder="Your First Name" onInput={this._checkInput} />
                        <span className={cns("warning", st.firstName !== '' && "hidden")}>This field cannot be empty</span>
                    </div>
                    <div className="input-area">
                        <label className={cns("labels", st.lastName !== '' && st.lastName !== '-0' && "show")}  for="last-name">Your Last Name</label>
                        <input type="text" className={cns(st.lastName !== '' && st.lastName !== '-0' && "bold")} name="last-name" placeholder="Your Last Name" onInput={this._checkInput} />
                        <span className={cns("warning", st.lastName !== '' && "hidden")}>This field cannot be empty</span>
                    </div>
                    <div className="input-area">
                        <label className={cns("labels", st.conNumber !== '' && st.conNumber !== '-0' && "show")}  for="contact-number">Contact Number</label>
                        <input type="text" className={cns(st.conNumber !== '' && st.conNumber !== '-0' && "bold")} name="contact-number" placeholder="Contact Number" onInput={this._checkInput} />
                        <span className={cns("warning", st.conNumber !== '' && "hidden")}>This field cannot be empty</span>
                    </div>
                    <div className="input-area">
                        <label className={cns("labels", st.address !== '' && st.address !== '-0' && "show")}  for="address">Address</label>
                        <textarea name="address" className={cns(st.address !== '' && st.address !== '-0' && "bold")} placeholder="Address" onInput={this._checkInput} />
                        <span className={cns("warning", st.address !== '' && "hidden")}>This field cannot be empty</span>
                    </div>
                </form>
                <div className="next-step">
                    <button className={cns("next-step-btn", st.enableNext && "enable")} onClick={this._clickNext} disabled={!this.state.enableNext}>NEXT</button>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        let flag = false;

        if (nextState.firstName !== '' && nextState.firstName !== '-0'
            && nextState.lastName !== '' && nextState.lastName !== '-0'
            && nextState.conNumber !== '' && nextState.conNumber !== '-0'
            && nextState.address !== '' && nextState.address !== '-0') {
            flag = true;
        } else {
            flag = false;
        }

        this.setState({
            enableNext: flag
        });

        return true;
    }

    _clickNext(evt) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }

        if (this.state.enableNext) {
            this.props.getPassStep(1);
        }
    }

    _checkInput(e) {
        let currentEle = e.currentTarget;

        if (currentEle && currentEle.getAttribute('name')) {
            switch (currentEle.getAttribute('name')) {
                case 'first-name':
                    this.setState({
                        firstName: currentEle.value
                    });
                    break;
                case 'last-name':
                    this.setState({
                        lastName: currentEle.value
                    });
                    break;
                case 'contact-number':
                    this.setState({
                        conNumber: currentEle.value
                    });
                    break;
                case 'address':
                    this.setState({
                        address: currentEle.value
                    });
                    break;
                DEFAULT:
                break;
            }
        }
    }
}

export default Step2;
