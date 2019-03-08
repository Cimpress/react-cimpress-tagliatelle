import Tagliatelle from 'cimpress-tagliatelle';
import {debug} from '../../../utils/helpers';

const client = new Tagliatelle({
    debugFunction: debug,
});

const updateTag = (accessToken, tagId, tagResourceUrl, tagKey, editValue) => {
    return client.updateTag(accessToken, tagId, tagResourceUrl, tagKey, editValue);
};

const createTag = (accessToken, tagResourceUrl, tagKey, editValue) => {
    return client.createTag(accessToken, tagResourceUrl, tagKey, editValue);
};

export {
    createTag,
    updateTag,
};
