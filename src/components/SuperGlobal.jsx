const Store = {
    UserLogin : null,
    isShowMobileNav : true
}

const Reducer=(state = Store,action) => {
    switch (action.type) {
        case "updateUserlogin":
            // console.log(action.value);
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