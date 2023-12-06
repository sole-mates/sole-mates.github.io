import { getUserData } from '../views/utils.js';


export function addOwner(obj) {
    const userData = getUserData();

    if (userData == null) {
        throw new ReferenceError('User is not logged in');
    }

    const id = userData.objectId;

    obj.owner = pointer('_User', id);

    return obj;
}

export function pointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}