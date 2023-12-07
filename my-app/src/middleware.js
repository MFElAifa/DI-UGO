
export const tokenMiddleware = store => next => action => {
    next(action);
};