const formatDate = (date) => {
    return date.toLocaleDateString();
}

const formatString = (str) => {
    var words = str.replace(/\s+/g, ' ').trim().split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }

    return words.join(" ");
}

const ifEqual = (str1, str2) => {
    return str1 === str2;
}

module.exports = {
    formatDate,
    formatString,
    ifEqual
};