<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import { isDark, toggleDarkModeHandler } from '/@src/state/darkModeState'
import { useUserSession } from '/@src/stores/userSession'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'

import { watch, defineComponent } from "vue"
import {  user, google, registerUser, useLogin} from "../../firebase" 

const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const notif = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const handleLoginGoogle = async () => {
  
}

const handleLogin = async () => {
  if (!isLoading.value) {
    isLoading.value = true

    await sleep(2000)
    userSession.setToken('logged-in')

    notif.dismissAll()
    // notif.success('Welcome back, Erik Kovalsky')

    if (redirect) {
      router.push({ name: redirect })
    } else {
      router.push({
        name: 'app',
      })
    }

    isLoading.value = false
  }
}


defineComponent({
    props: {
        // loginReturnUrl : { type: String, default: "/" }
        // pic,
        // email,
        // dname
    },
    setup(props){
        watch(
            () => user.value,
            newUser => {
              console.log(user.value)
              /*if(user.value != null){
                  const userObj = {
                  name: user.value.displayName || null,
                  email: user.value.email,
              }
              }*/
             
                if(newUser) {
                    // router.push(props.loginReturnUrl)
                }
                /* props.pic = `<img src="${user.displayName}" />`
                props.dname  = `<h1>${user.displayName}</h1>` */
            }
        );
        return {
            ...useLogin(),
            google,
        };
    },
    
});


useHead({
  title: 'Auth Login - Vuero',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div
      class="
        column
        login-column
        is-8
        h-hidden-mobile h-hidden-tablet-p
        hero-banner
      "
    >
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/apps/vuero-banking-light.png?format=webp"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/apps/vuero-banking-dark.png?format=webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>

    <!-- Form section -->
    <div class="column is-4">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <label class="dark-mode ml-auto">
            <input
              type="checkbox"
              :checked="!isDark"
              @change="toggleDarkModeHandler"
            />
            <span></span>
          </label>
          <div class="auth-logo">
            <RouterLink :to="{ name: 'index' }">
              <AnimatedLogo width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content">
                  <h2>Welcome Back.</h2>
                  <p>Please sign in to your account</p>
                  <RouterLink :to="{ name: 'auth-signup1' }">
                    I do not have an account yet
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit.prevent="handleLogin">
                    <div class="login-form">
                      <!-- Username -->
                      <VField>
                        <VControl icon="feather:user">
                          <input
                            class="input"
                            type="text"
                            placeholder="Username"
                            autocomplete="username"
                          />
                        </VControl>
                      </VField>

                      <!-- Password -->
                      <VField>
                        <VControl icon="feather:lock">
                          <input
                            class="input"
                            type="password"
                            placeholder="Password"
                            autocomplete="current-password"
                          />
                        </VControl>
                      </VField>

                      <!-- Switch -->
                      <VControl class="setting-item">
                        <label for="remember-me" class="form-switch is-primary">
                          <input
                            id="remember-me"
                            type="checkbox"
                            class="is-switch"
                          />
                          <i aria-hidden="true"></i>
                        </label>
                        <div class="setting-meta">
                          <label for="remember-me">
                            <span>Remember Me</span>
                          </label>
                        </div>
                      </VControl>

                      <!-- Submit -->
                      <VControl class="login">
                        <!-- <VButton
                          :to="{ name: 'auth-profile-edit'}"
                          :loading="isLoading"
                          color="primary"
                          type="submit"
                          bold
                          fullwidth
                          raised
                        > -->

                        <VButton
                          :to="{ name: 'app-sidebar-layouts-profile-edit'}"
                          :loading="isLoading"
                          color="primary"
                          type="submit"
                          bold
                          fullwidth
                          raised
                        >
                          Sign In
                        </VButton>
                      </VControl>

                      <div>
                        <p style="text-align:center;">OR</p>
                      </div>

                      <VButton icon="lni-night" color="primary" outlined fullwidth @click="google">
                        Sign in Google
                      </VButton>

                      <div class="forgot-link has-text-centered">
                        <a>Forgot Password?</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
