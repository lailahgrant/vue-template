<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'
// import MyProfile from '/@src/components/pages/forms/edit-profile/MyProfile.vue';

pageTitle.value = 'Profile Edit 1'
useHead({
  title: 'Profile Edit 1 - Sidebar - Vuero',
})
</script>

<template>
  <div>
    <MyProfile />
    <!-- <EditProfileGeneral /> -->
    <!-- <EditProfileGeneral /> -->
  </div>
</template>
