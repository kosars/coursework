import {
    addNewCharacter,
    getCharacters,
    getCharacter,
    deleteCharacter,
} from '../controllers/todoController';

const routes = (app) => {
    app.route('/chars')
    .post(addNewCharacter)
    .get(getCharacters);

    app.route('/chars/:charId')
    .get(getCharacter)
    .delete(deleteCharacter);

}

export default routes;
