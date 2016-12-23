module.exports = function () {
	var res = [];
	var I, L;
	
	for (I = 0, L = arguments.length; I < L; I++) {
		if (typeof arguments[I] === 'string') {
			res.push(arguments[I]);
		}
	}
	return res.join(' ');
};