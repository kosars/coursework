import {
    //chars
    addNewCharacter,
    getCharacters,
    getCharacter,
    deleteCharacter,
    //races
    addNewRace,
    getRaces,
    getRace,
    deleteRace,
    //subraces
    addNewSubrace,
    getSubraces,
    getSubrace,
    deleteSubrace,
} from '../controllers/todoController';

const routes = (app) => {
    app.route('/chars')
    .post(addNewCharacter)
    .get(getCharacters);

    app.route('/chars/:charId')
    .get(getCharacter)
    .delete(deleteCharacter);

    app.route('/races')
    .post(addNewRace)
    .get(getRaces);

    app.route('/races/:raceId')
    .get(getRace)
    .delete(deleteRace);
    
    app.route('/subraces')
    .post(addNewSubrace)
    .get(getSubraces);

    app.route('/subraces/:subraceId')
    .get(getSubrace)
    .delete(deleteSubrace);
}

export default routes;
