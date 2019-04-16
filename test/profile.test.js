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
    it('returns all profiles', () => {
        return Profile.create({ name: 'cindy', favoriteCharacter: 'bender' })
            .then(() => {
                return request(app)
                    .get('/profile');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });
    it('returns a profile by id', () => {
        return Profile.create({ name: 'Colin', favoriteCharacter: 'Leela' })
            .then(createdProfile => {
                return request(app)
                    .get(`/profile/${createdProfile._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ name: 'Colin', favoriteCharacter: 'Leela', _id: expect.any(String) });
            });
    });
    it('updates a profile by id', () => {
        Profile.create({ name: 'Fred', favoriteCharacter: 'Zoidberg' })
            .then(createdProfile => {
                return request(app)
                    .patch(`/profile/${createdProfile._id}`)
                    .send({
                        name: 'Fred',
                        favoriteCharacter: 'Leela'
                    });
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Fred',
                    favoriteCharacter: 'Leela',
                    tagline: expect.any(String),
                    _id: expect.any(String)
                })
            })
    })
});
