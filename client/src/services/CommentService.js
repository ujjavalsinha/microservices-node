import {get, post} from './BaseApi';

export const getComments = (postId) => {
    const url = `${process.env.REACT_APP_COMMENT_SERVICE_URL}/posts/${postId}/comments`;
    return get(url);
}

export const postComments = (postId, body) => {
    const url = `${process.env.REACT_APP_COMMENT_SERVICE_URL}/posts/${postId}/comments`;
    return post(url, body)
}