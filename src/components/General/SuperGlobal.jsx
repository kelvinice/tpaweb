const Store = {
    UserLogin : null,
    isShowMobileNav : false,
    currentPosition : [0,0],
}

const Reducer=(state = Store,action) => {
    switch (action.type) {
        case "updateUserlogin":
            return {
                ...state,
                UserLogin : action.value
            }
        case "updateCurrentPosition":
            return {
                ...state,
                currentPosition : action.value
            }
        case "toggle-mobile":
            return {
                ...state,
                isShowMobileNav : !state.isShowMobileNav
            }
        default :
            return state;
    }
}
export default Reducer;