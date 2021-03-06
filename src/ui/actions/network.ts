import { ACTION } from './constants';


export const setNetwork = (netName) => {
    return {
        type: ACTION.CHANGE_NETWORK,
        payload: netName
    }
};

export const setCustomNode = (url) => {
    return {
        type: ACTION.CHANGE_NODE,
        payload: url
    }
};
