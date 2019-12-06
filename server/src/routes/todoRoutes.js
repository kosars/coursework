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
    //backgrounds
    addNewBack,
    getBacks,
    getBack,
    deleteBack,
    //classes
    addClass,
    getClasses,
    getClass,
    deleteClass,
    //spells
    addSpell,
    getSpells,
    getSpell,
    deleteSpell,
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

    app.route('/classes')
    .post(addClass)
    .get(getClasses);

    app.route('/classes/:classId')
    .get(getClass)
    .delete(deleteClass);

    app.route('/backgrounds')
    .post(addNewBack)
    .get(getBacks);

    app.route('/backgrounds/:backId')
    .get(getBack)
    .delete(deleteBack);

    app.route('/spells')
    .post(addSpell)
    .get(getSpells);

    app.route('/spells/:spellId')
    .get(getSpell)
    .delete(deleteSpell);
}

export default routes;
