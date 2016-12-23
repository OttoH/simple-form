'use strict';
import React from 'react';

class BaseComponent extends React.Component {
	_bind(...methods) {
		methods.forEach( (method) => {
			if (this[method]) {
				this[method] = this[method].bind(this);
			}
		} );
	}
}

export default BaseComponent;