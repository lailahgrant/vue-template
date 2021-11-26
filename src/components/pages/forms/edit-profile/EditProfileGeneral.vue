<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'

import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import { useViaPlaceholderError } from '/@src/composable/useViaPlaceholderError'

import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'

const isUploading = ref(false)
const isLoading = ref(false)
const isLoadingForm = ref(false)
const experience = ref('')
const firstJob = ref('')

const skills = ref(['software', 'saas', 'engineering'])
const skillsOptions = [
  { value: 'software', label: 'Software' },
  { value: 'saas', label: 'SaaS' },
  { value: 'engineering', label: 'Engineering' },
]

// made the 2 variables to prevent hardcoding them
const years = [
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
]
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const notyf = useNotyf()
const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value > 30
})

const onAddFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }

  console.log('file added', file)
}
const onRemoveFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }

  console.log('file removed', file)
}
const onSave = async () => {
  isLoading.value = true
  await sleep()
  notyf.success('Your changes have been successfully saved!')
  isLoading.value = false
}

const pInforRef = ref<any>()
const logData = () => {
  let data = pInforRef.value.getPersonalInfor()
  console.log(data)
}
</script>

<template>
  <div class="account-box is-form is-footerless">
    <div class="form-head stuck-header" :class="[isScrolling && 'is-stuck']">
      <div class="form-head-inner">
        <div class="left">
          <h3>General Info</h3>
          <p>Edit your account's general information</p>
        </div>
        <div class="right">
          <div class="buttons">
            <VButton
              :to="{ name: 'app-sidebar-layouts-profile-view' }"
              icon="lnir lnir-arrow-left rem-100"
              light
              dark-outlined
            >
              Go Back
            </VButton>
            <VButton
              color="primary"
              raised
              :loading="isLoading"
              @click="logData"
            >
              Save Changes
            </VButton>
            <!-- <VButton
              color="primary"
              raised
              :loading="isLoading"
              :to="{ name: 'app-sidebar-layouts-profile-edit-experience' }"
            >
              Save Changes
            </VButton> -->
          </div>
        </div>
      </div>
    </div>
    <div class="form-body">
      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Profile Picture</h4>
          <p>This is how others will recognize you</p>
        </div>

        <VAvatar size="xl" class="profile-v-avatar">
          <template #avatar>
            <img
              v-if="!isUploading"
              class="avatar"
              src="/images/avatars/svg/vuero-1.svg"
              alt=""
              @error.once="(event) => useViaPlaceholderError(event, '150x150')"
            />
            <VFilePond
              v-else
              class="profile-filepond"
              name="profile_filepond"
              :chunk-retry-delays="[500, 1000, 3000]"
              label-idle="<i class='lnil lnil-cloud-upload'></i>"
              :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']"
              :image-preview-height="140"
              :image-resize-target-width="140"
              :image-resize-target-height="140"
              image-crop-aspect-ratio="1:1"
              style-panel-layout="compact circle"
              style-load-indicator-position="center bottom"
              style-progress-indicator-position="right bottom"
              style-button-remove-item-position="left bottom"
              style-button-process-item-position="right bottom"
              @addfile="onAddFile"
              @removefile="onRemoveFile"
            />
            <VIconButton
              v-if="!isUploading"
              icon="feather:edit-2"
              class="edit-button is-edit"
              circle
              @click="isUploading = true"
            />
            <VIconButton
              v-else
              icon="feather:arrow-left"
              class="edit-button is-back"
              circle
              @click="isUploading = false"
            />
          </template>
        </VAvatar>
      </div>

      <!--Fieldset-->
      <PersonalInfor ref="pInforRef" :data="{ firstName: 'Lailah' }" />

      <!--Fieldset-->
      <!-- professional information -->
      <ProfessionalInformation />

      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Education Info</h4>
          <p>Others deserve to know you more</p>
        </div>

        <div v-if="isLoadingForm" class="fieldset-heading">
          <a class="action-link" @click="isLoadingForm = false">Cancel</a>
        </div>

        <!--Create Item-->
        <div v-else class="setting-list">
          <div class="setting-item is-create">
            <VIconWrap icon="lnil lnil-circle-plus" />

            <div class="meta">
              <span class="dark-inverted">New Item</span>
              <span>Add Education infor</span>
            </div>
            <div class="end">
              <VButton
                raised
                dark-outlined
                icon="fas fa-plus"
                class="add-setting-item"
                @click="isLoadingForm = true"
              >
                Add
              </VButton>
            </div>
          </div>
        </div>

        <div v-if="isLoadingForm" class="columns is-multiline">
          <!--Field-->
          <div class="column is-6">
            <p>School *</p>
            <VField>
              <VControl icon="feather:layers">
                <input
                  type="text"
                  class="input"
                  placeholder="Makerere University"
                  autocomplete="given-name"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-6">
            <p>Degree *</p>
            <VField>
              <VControl icon="feather:award">
                <input
                  type="text"
                  class="input"
                  placeholder="Bachelor"
                  autocomplete="family-name"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-12">
            <p>Field of Study</p>
            <VField>
              <VControl icon="feather:briefcase">
                <input
                  type="text"
                  class="input"
                  placeholder="Computer Science"
                  autocomplete="organization-title"
                />
              </VControl>
            </VField>
          </div>

          <!--Study Duration Field-->
          <div class="column is-6">
            <p>Start Date</p>
            <VField>
              <VControl>
                <Multiselect
                  v-model="experience"
                  placeholder="month"
                  :options="months"
                />
              </VControl>
            </VField>
          </div>

          <!--Field-->
          <div class="column is-6">
            <p>Year</p>
            <VField>
              <VControl>
                <Multiselect
                  v-model="firstJob"
                  placeholder="year"
                  :options="years"
                />
              </VControl>
            </VField>
          </div>

          <div class="column is-6">
            <p>End Date</p>
            <VField>
              <VControl>
                <Multiselect
                  v-model="experience"
                  placeholder="month"
                  :options="months"
                />
              </VControl>
            </VField>
          </div>

          <!--Field-->
          <div class="column is-6">
            <p>End date (or expected)</p>
            <VField>
              <VControl>
                <Multiselect
                  v-model="firstJob"
                  placeholder="year"
                  :options="years"
                />
              </VControl>
            </VField>
          </div>

          <!--Field-->
          <div class="column is-12">
            <p>Grade</p>
            <VField>
              <VControl icon="feather:book">
                <input
                  type="text"
                  class="input"
                  placeholder="Grade"
                  autocomplete="country-name"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-12">
            <p>Activities and Societies</p>
            <VField>
              <VControl>
                <textarea
                  class="textarea"
                  rows="2"
                  placeholder="GDG Lead at University, Football player"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="true"
                ></textarea>
              </VControl>
            </VField>
          </div>
          <div class="column is-12">
            <VField>
              <VControl>
                <VButton color="primary" raised fullwidth>
                  Add Work Experience
                </VButton>
              </VControl>
            </VField>
          </div>
        </div>
      </div>

      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Social Profiles</h4>
          <p>This can help others finding you on social media</p>
        </div>
        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl icon="fab fa-facebook-f">
                <input
                  type="text"
                  class="input"
                  placeholder="Facebook URL"
                  inputmode="url"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl icon="fab fa-twitter">
                <input
                  type="text"
                  class="input"
                  placeholder="Twitter URL"
                  inputmode="url"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl icon="fab fa-dribbble">
                <input
                  type="text"
                  class="input"
                  placeholder="Dribbble URL"
                  inputmode="url"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl icon="fab fa-instagram">
                <input
                  type="text"
                  class="input"
                  placeholder="Instagram URL"
                  inputmode="url"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl icon="fab fa-github">
                <input
                  type="text"
                  class="input"
                  placeholder="Github URL"
                  inputmode="url"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl icon="fab fa-gitlab">
                <input
                  type="text"
                  class="input"
                  placeholder="Gitlab URL"
                  inputmode="url"
                />
              </VControl>
            </VField>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
