const request = require('supertest');
const app = require('../lib/app');
const Profile = require('../lib/models/Profile');

describe('profile app', () => {
    beforeEach(() => {
        return Profile.drop();
    });
    it('creates a profile with character appropriate quote', () => {
        return request(app)
            .post('/profile')
            .send({
                name: 'Colin',
                favoriteCharacter: 'Bender'
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Colin',
                    favoriteCharacter: 'Bender',
                    tagline: expect.any(String),
                    _id: expect.any(String)
                });
            });
    });
});
