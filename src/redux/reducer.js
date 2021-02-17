import axios from 'axios'

const initialState = {
    username: [],
    profilePic: null
}

const ACTION_TYPE = 'ACTION_TYPE'
const REMOVE_USER = 'REMOVE_USER'

export const updateUser = (username, profilePic) => {
    let user = axios.put('/api/auth', { username, profilePic })
        .then(res => res.data)
    return {
        type: ACTION_TYPE,
        payload: user
    }
}

export const logout = (id) => {
    let user = axios.delete(`/api/auth/${id}`).then(res => res.user)
    return {
        type: REMOVE_USER,
        payload: user
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE:
            return { ...state }
        case REMOVE_USER:
            return { state: '' }
        default:
            return state
    }
}