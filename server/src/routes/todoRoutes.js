import {
    addNewGroup,
    getGroups,
    getSpecificGroup,
    deleteGroup,
    getGroupItems,
    addNewTask,
    getSpecificTask,
    getalltask,
    deleteTask,
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

    app.route('/groups')    /* GET /groups  --> return all groups in Json*/
    .get(getGroups);

    app.route('/group/:groupId')
    .get(getSpecificGroup)

    .delete(deleteGroup);

    app.route('/creategroup')
    .post(addNewGroup);   /*POST /creategroup     request body: {title: groupname }*/

    app.route('/grouptasks/:groupId')
    .get(getGroupItems);

/*Task Routes */
    app.route('/tasks')
    .get(getalltask);

    app.route('/task/:taskId')
    .get(getSpecificTask);

    app.route('/create')
    .post(addNewTask);    /*requst body: {title} */

    app.route('/remove/:groupId/:taskId')
    .delete(deleteTask);

}

export default routes;
