const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;
// starwars mocks
const starwarsFilmListMock = require('../mocks/starwars/film_list.json');
const { re } = require('prettier');

describe("GET /films-list", () => {
    it('should return a list of films when called', done => {
        chai
            .request(app)
            .get("/films-list")
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal(starwarsFilmListMock);
                done();
            });
    });
});