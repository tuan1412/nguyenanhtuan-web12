'use strict'

function search(input, target) {
	let start = 0;
	let end = input.length - 1;

	while (start <= end) {
		let middle = Math.floor((start + end) / 2);
		if (target == input[middle]) {
			return middle;
		}
		if (target > input[middle]) {
			start = middle + 1;
		} else {
			end = middle - 1;
		}

	}
	return -1;
}


module.exports = search
