import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErros: null,
    isLoggedIn: null,
    isLoading: false,
}

export const mutationsTypes = {
    registerStart: '[auth] registerStart',
    registerFailure: '[auth] registerFailure',
    registerSuccess: '[auth] registerSuccess',

    loginStart: '[auth] loginStart',
    loginFailure: '[auth] loginFailure',
    loginSuccess: '[auth] loginSuccess',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',

    updateCurrentUserStart: '[auth] updateCurrentUserStart',
    updateCurrentUserFailure: '[auth] updateCurrentUserFailure',
    updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',

    logout: '[auth] logout',
}

const mutations = {
    [mutationsTypes.registerStart](state) {
        state.isSubmitting = true;
        state.validationErros = null;
    },
    [mutationsTypes.registerSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationsTypes.registerFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    [mutationsTypes.loginStart](state) {
        state.isSubmitting = true;
        state.validationErros = null;
    },
    [mutationsTypes.loginSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationsTypes.loginFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    [mutationsTypes.getCurrentUserStart](state) {
        state.isLoading = true;
    },
    [mutationsTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationsTypes.getCurrentUserFailure](state) {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
    },

    [mutationsTypes.updateCurrentUserStart]() {},
    [mutationsTypes.updateCurrentUserSuccess](state, payload) {
        state.currentUser = payload;
    },
    [mutationsTypes.updateCurrentUserFailure]() {},

    [mutationsTypes.logout](state) {
        state.currentUser = null;
        state.isLoggedIn = false;
    }
}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateCurrentUser: '[auth] updateCurrentUser',
    logout: '[auth] logoth'
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}

const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser;
    },
    [getterTypes.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn);
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false;
    }
}

const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.registerStart);
            authApi.register(credentials)
            .then(response => {
                context.commit(mutationsTypes.registerSuccess, response.data.user);
                setItem('accessToken', response.data.user.token);
                resolve(response.data.user);
            })
            .catch(result => {
                context.commit(mutationsTypes.registerFailure, result.response.data.errors);
                console.log('result error', result);
            })
        });
    },
    [actionTypes.login](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.loginStart);
            authApi.login(credentials)
            .then(response => {
                context.commit(mutationsTypes.loginSuccess, response.data.user);
                setItem('accessToken', response.data.user.token);
                resolve(response.data.user);
            })
            .catch(result => {
                context.commit(mutationsTypes.loginFailure, result.response.data.errors);
                console.log('result error', result);
            })
        });
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.getCurrentUserStart);
            authApi.getCurrentUser()
            .then(response => {
                context.commit(mutationsTypes.getCurrentUserSuccess, response.data.user);
                resolve(response.data.user);
            })
            .catch(() => {
                context.commit(mutationsTypes.getCurrentUserFailure);
            })
        });
    },
    [actionTypes.updateCurrentUser](context, {currentUserInput}) {
        return new Promise(resolve => {
            context.commit(mutationsTypes.updateCurrentUserStart);
            authApi.updateCurrentUser(currentUserInput)
            .then(user => {
                context.commit(mutationsTypes.updateCurrentUserSuccess, user);
                resolve(user);
            })
            .catch((result) => {
                context.commit(
                    mutationsTypes.updateCurrentUserFailure, 
                    result.response.data.errors
                );
            })
        });
    },
    [actionTypes.logout](context) {
        return new Promise (resolve => {
            setItem('accessToken', '');
            context.commit(mutationsTypes.logout);
            resolve();
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}