<script>
import {ref, onMounted} from 'vue'
import {  createUser, user, google, registerUser, useLogin} from "../../firebase"
import {useStore} from 'vuex'


    export default {
      props: { data: Object },
        setup(props){
        /**
       * ACCESS the STORE
       */
        const store = useStore()
        console.log(store.state.user)
      //commit a new mutation
        store.commit('setUser', 'Lailah')

        // SIGNUP AUTH
         const userData = ref({
           firstname: '',
           lastname: '',
           email: '',
           password: ''
         })

         const getPersonalInfor = () => {
      
       return userData
     }

         const signUp = async () => {
          await registerUser()
           await createUser({...userData.value})
           userData.value.firstname = ''
           userData.value.lastname = ''
           userData.value.email = ''
           userData.value.password = ''
        }

        onMounted(() => {
      if (props.data != undefined && props.data != null) {
        form.value = {
          ...form.value,
          ...props.data,
        }

        //return stuff to use in the template
        return{
          google,
          registerUser,
          signUp,
          getPersonalInfor
        }

    }
    })

  },

}


</script>

<template>

 <div class="column is-8 is-offset-1">
    <div class="signup-card">
                  <form class="signup-form is-mobile-spaced" @submit.prevent="registerUser">
                    <div class="columns is-multiline">
                            <!--  v-model="userData.firstname" -->
                      <div class="column is-6"> 
                        <VField>
                          <VControl>
                            <input
                            v-model="userData.value.firstname"
                              type="text"
                              class="input"
                              autocomplete="given-name"
                            />
                            <div class="auth-label">First Name</div>
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-6">
                        <VField>
                          <VControl>
                            <input
                              type="text"
                              class="input"
                              autocomplete="family-name"
                            />
                            <div class="auth-label">Last Name</div>
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-6">
                        <VField>
                          <VControl>
                            <input
                              type="text"
                              class="input"
                              autocomplete="email"
                            />
                            <div class="auth-label">Email Address</div>
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-6">
                        <VField>
                          <VControl>
                            <input
                              type="password"
                              class="input"
                              autocomplete="password"
                            />
                            <div class="auth-label">Password</div>
                          </VControl>
                        </VField>
                      </div>

                    <div class="control is-agree">
                      <span>
                        By continuing you agree to our <a href="#">Terms</a> and
                        <a href="#">Privacy</a>
                      </span>
                    </div>

                    <div class="button-wrap has-help">

                      <VButton
                        color="primary"
                        size="big"
                        bold
                        fullwidth
                        rounded
                        @click="registerUser"
                      >
                        Sign Up
                      </VButton>

                      <VButton
                        color="primary"
                        size="big"
                        bold
                        fullwidth
                        rounded
                        @click="google"
                      >
                        Sign up with Google
                      </VButton>
                      
                      <span>
                        Or
                        <RouterLink :to="{ name: 'auth-login' }">
                          Sign In
                        </RouterLink>
                        to your account.
                      </span>
                    </div>
                    </div>
                  </form>
              </div>
              </div>


</template>

