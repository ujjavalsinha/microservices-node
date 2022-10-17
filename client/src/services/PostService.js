import {get, post} from './BaseApi';

export const getPosts = () => {
    const url = `${process.env.REACT_APP_POST_SERVICE_URL}/posts`;
    return get(url);
}

export const createPost = (body) => {
    const url = `${process.env.REACT_APP_POST_SERVICE_URL}/posts`;
    return post(url, body);
}