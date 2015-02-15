// picks random element from an array
function _randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = _randomElement;