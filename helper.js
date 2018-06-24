module.exports = {
    remove(arr, thing) {
        if(module.exports.scontains(arr, thing)) {
            return arr.slice(0, arr.indexOf(thing)).concat(arr.slice(arr.indexOf(thing) + 1, arr.length));
        } else {
            return arr;
        }
    },

    scontains(array, it) {
        return array.indexOf(it) !== -1;
    }
}