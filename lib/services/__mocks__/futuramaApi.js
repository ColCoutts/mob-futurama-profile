function getQuote() {
    return Promise.resolve({
        name: 'Colin',
        favoriteCharacter: 'Bender',
        tagline: 'Bite my shiny metal ass'
    });
}

module.exports = {
    getQuote
};
