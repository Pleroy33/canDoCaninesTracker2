const adminReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_REQUESTS':
            return action.payload;
            default: return state;
    }
}


export default adminReducer;