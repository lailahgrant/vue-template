<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'


/*for   debugging purposes
// import MyProfile from '/@src/components/pages/forms/edit-profile/MyProfile.vue';
*/

pageTitle.value = 'Profile Edit 1'
useHead({
  title: 'Profile Edit 1 - Sidebar - Vuero',
})
</script>

<template>
    <!-- <MyProfile /> -->
    <EditProfileGeneral />
</template>
