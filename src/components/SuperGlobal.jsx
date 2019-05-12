const Store = {
    UserLogin : null,
    isShowMobileNav : true,
    currentPosition : [-6.20,106.78],
}

const Reducer=(state = Store,action) => {
    switch (action.type) {
        case "updateUserlogin":
            return {
                ...state,
                currentPosition : action.value
            }
        case "updateCurrentPosition":
            return {
                ...state,
                UserLogin : action.value
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