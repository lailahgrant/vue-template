<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'

const companySize = ref('')
const businessType = ref('')
const productToDemo = ref('')
const date = ref(new Date())

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <form class="form-layout" @submit.prevent>
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Fill in Correctly</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                :to="{ name: 'index' }"
                light
                dark-outlined
              >
                Cancel
              </VButton>
              <VButton color="primary" raised> Schedule </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Personal Info</h4>
            <p>This helps us to know you</p>
          </div>

          <div class="columns is-multiline">
            <div class="column is-6">
              <VField>
                <label>First Name</label>
                <VControl icon="feather:user">
                  <input
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField>
                <label>Last Name</label>
                <VControl icon="feather:user">
                  <input
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="family-name"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <v-date-picker v-model="date" color="green" trim-weeks>
                <template #default="{ inputValue, inputEvents }">
                  <VField>
                    <label>Date of Birth</label>
                    <VControl icon="feather:calendar">
                      <input
                        class="input"
                        type="text"
                        placeholder="Select a date"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </VControl>
                  </VField>
                </template>
              </v-date-picker>
            </div>
            <div class="column is-6">
              <VField>
                <label>Profession</label>
                <VControl>
                  <Multiselect
                    v-model="companySize"
                    placeholder="Select your profession"
                    :options="[
                      'Web Developer',
                      'Android Developer',
                      'iOS Developer',
                      'Wordpress',
                      'Data Scientist',
                      'Other',
                    ]"
                  />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Contact Info</h4>
            <p>How can we reach you?</p>
          </div>

          <div class="columns is-multiline">
            <div class="column is-12">
              <VField>
                <label>Email Address</label>
                <VControl icon="feather:mail">
                  <input
                    type="email"
                    class="input"
                    placeholder=""
                    autocomplete="email"
                    inputmode="email"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField>
                <label>Country</label>
                <VControl>
                  <Multiselect
                    v-model="businessType"
                    placeholder="Select a type"
                    :options="[
                      'Uganda',
                      'Kenya',
                      'Tanzania',
                      'Rwanda',
                      'DR Congo',
                      'South Sudan',
                    ]"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField>
                <label>Contact / Phone Number</label>
                <VControl icon="feather:phone">
                  <input
                    type="tel"
                    class="input"
                    placeholder=""
                    autocomplete="tel"
                    inputmode="tel"
                  />
                </VControl>
              </VField>
            </div>
            
            <div class="column is-6">
              <VField>
                <label>Address</label>
                <VControl>
                  <Multiselect
                    v-model="businessType"
                    placeholder="Select a type"
                    :options="[
                      'Kampala',
                      'Nairobi',
                      'Dar-el-Salaam',
                      'Kinshasha',
                      'Juba',
                    ]"
                  />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>About / Bio</h4>
            <p>Write a captivating bio about yourself</p>
          </div>

          <div class="columns is-multiline">
            <div class="column is-6">
              <VField>
                <label>Gender</label>
                <VControl>
                  <Multiselect
                    v-model="productToDemo"
                    placeholder="Select your Gender"
                    :options="['Female', 'Male', 'Prefer Not To Say', 'Other']"
                  />
                </VControl>
              </VField>
            </div>
            
            <div class="column is-12">
              <VField>
                <label>Write an essay about you</label>
                <VControl>
                  <textarea
                    class="textarea"
                    rows="4"
                    placeholder="Tell us about any details you'd like us to know..."
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="true"
                  ></textarea>
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/generic/_forms.scss';
</style>