'use strict'

import React from 'react';
import BaseComponent from './BaseComponent.js';
import cns from '../ClassName.js';
import {Constants} from '../Constants.js';

class Step1 extends BaseComponent {
    constructor(props) {
        super(props);

        this._bind('_clickUpload', '_triggerUpload', '_clickNext');

        this.state = {
            isUploadPhoto: false
        }
    }

    render() {
        let isUploadPhoto = this.state.isUploadPhoto;
        let uploadSection;
        let reminderSection;

        if (isUploadPhoto) {
            uploadSection = <div className="upload-photo">
                                <img className="show-photo" src={this.state.photoSrc}/>
                            </div>;
            reminderSection = <div className="reminder">
                                <input className="photo-input hidden" onChange={this._clickUpload} type="file" accept="image/*" /><div className="upoad-photo-btn" onClick={this._triggerUpload}>{Constants.uploadPhotoFinish}</div>
                            </div>;

        } else {
            uploadSection = <div className="upload-photo">
                                <input className="photo-input" onChange={this._clickUpload} type="file" accept="image/*" /><div className="upoad-photo-btn" onClick={this._triggerUpload} />
                            </div>;
            reminderSection = <div className="reminder">{Constants.uploadPhotoReminder}</div>;
        }

        return(
            <div className={cns("step1", this.props.visible === Constants.visibleHide && "hidden")}>
                <span className="title">Upload Photo</span>
                <div className="upload-photo">
                    {uploadSection}
                </div>
                {reminderSection}
                <div className="next-step">
                    <button className={cns("next-step-btn", isUploadPhoto && "enable")} onClick={this._clickNext} disabled={!this.state.isUploadPhoto}>NEXT</button>
                </div>
            </div>
        );
    }

    _clickUpload(evt) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }

        const reader = new FileReader();
        const file = evt.target.files[0];

        reader.readAsDataURL(file);
        reader.onload = (e) => {
            if (e.target.result) {
                this.setState({
                    isUploadPhoto: true,
                    photoUrl: file.name,
                    photoSrc: e.target.result
                });
            }
        };
    }

    _triggerUpload() {
        document.querySelector(".photo-input").click();
    }

    _clickNext(evt) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }

        this.props.getPassStep(1);
    }
}

export default Step1;
