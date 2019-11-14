import {
    addNewCharacter,
    getCharacters,
    getCharacter,
} from '../controllers/todoController';

const routes = (app) => {
    app.route('/chars')
    .post(addNewCharacter)
    .get(getCharacters);

    app.route('/chars/:charId')
    .get(getCharacter);

}

export default routes;
