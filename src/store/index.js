import { createStore } from 'vuex'
import '../firebase'

const store = createStore({
    state: {
        //property user is null before login
        user : null
    },

    mutations: {
        //create a mutation fn to update the user
        setUser(state, payload) {
            //when this mutation fn is called later on, payload is going to be whatever the user is either login or signup,, It will be their user object from the firebase auth & that include their email or display name
            //logout, call this again and set the payload( their user) will be set to null
            state.user = payload
            console.log('user state changed: ', state.user)
        }
    }

})


//export store
export default store