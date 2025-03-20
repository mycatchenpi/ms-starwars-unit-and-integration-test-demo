const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const swapi = require("../apis/swapi");
const starwars = require("../controllers/starwars");
// swapi mocks
const swapiFilmListMock = require("../mocks/swapi/film_list.json");
// starwars mocks
const starwarsFilmListMock = require("../mocks/starwars/film_list.json");

const starwarsFilmMock = require("../mocks/starwars/film.json");
const swapiFilmMock = require("../mocks/swapi/film.json");
const swapiPeopleMock = require("../mocks/swapi/people.json");
const swapiPlanetMock = require("../mocks/swapi/planet.json");
const swapiStarshipMock = require("../mocks/swapi/starship.json");
const swapiVehicleMock = require("../mocks/swapi/vehicle.json");
const swapiSpeciesMock = require("../mocks/swapi/species.json");

/**
 * @author AnDrew Evans https://blog.logrocket.com/author/andrewevans/
 * @blog https://blog.logrocket.com/unit-integration-testing-node-js-apps/
 */
describe("Film List", function() {
    
    // Lifecycle hooks
    afterEach(function() {
        // sinon method:  object.method.restore(); (or stub.restore();)
        // restore original api method to prevent test pollution between different test cases
        swapi.films.restore();
    });

    /**
     * On a high level, you can expect this with any unit tests. We did the following:

        Arrange: Set up our data by creating a stub
        Act: Made a call to our controller method to act on the test
        Assert: Asserted that the response from the controller equals our saved mock value
        This pattern of Arrange, Act, and Assert is a good thing to keep in mind when running any test.
    */
    it("should return all the star wars film when called", async function() {
        
        /**
         * 1. sinon Source Code Comment:
         * Replaces obj.method with a stub function.
         * An exception is thrown if the property is not already a function.
         * The original function can be restored by calling object.method.restore(); (or stub.restore();).
         */
        // 2. Author comment: 
        // This stub signals to Mocha to use the mock file whenever the films method is called from the swapis API service.
        // To free up this method in your test runner, you’ll need to call the restore. 
        // This isn’t really a problem for us since we’re just running one test,
        // but, if you had many tests defined, then you’d want to do this. 
        sinon.stub(swapi, "films").returns(starwarsFilmListMock);

        // Author comment: actual method call
        const response = await starwars.filmList();

        // Author comment: expect to check the result
        expect(response).to.deep.equal(starwarsFilmListMock);
    });
});

describe('Film', function() {
    afterEach(function() {
        swapi.film.restore();
        swapi.people.restore();
    });
    it('should return all the metadata for a film when called', async function() {
        const filmId = '1';
        const peopleId = '1';
        const planetId = '1';
        const starshipId = '2';
        const vehicleId = '4';
        const speciesId = '1';
        sinon
            .stub(swapi, 'film')
            .withArgs(filmId)
            .resolves(swapiFilmMock);
        sinon
            .stub(swapi, 'people')
            .withArgs(peopleId)
            .resolves(swapiPeopleMock);
        sinon
            .stub(swapi, 'planet')
            .withArgs(planetId)
            .resolves(swapiPlanetMock);
        sinon
            .stub(swapi, 'starship')
            .withArgs(starshipId)
            .resolves(swapiStarshipMock);
        sinon
            .stub(swapi, 'vehicle')
            .withArgs(vehicleId)
            .resolves(swapiVehicleMock);
        sinon
            .stub(swapi, 'species')
            .withArgs(speciesId)
            .resolves(swapiSpeciesMock);
        const response = await starwars.film(filmId);
        expect(response).to.deep.equal(starwarsFilmMock);
    });
});