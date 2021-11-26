<script lang="ts">
import { ref, onMounted, watchEffect,  reactive, defineProps } from 'vue'
// import { createUser } from '../../firebase'
export default {
  props: { data: Object },
  setup(props) {
    // const props = defineProps({
    // })

    /* method 1
    const firstName = ref('')
    const lastName = ref('')
    const job = ref('')
    const location = ref('')
    const bio = ref('')
    */

    // method 2
    const form = ref({
      firstName: '',
      lastName: '',
      job: '',
      location: '',
      bio: '',
    })
    watchEffect(() => {
        // emit('data', form.value)
    })
    
    // get personal infor
    const getPersonalInfor = () => {
      /* method 1
      return {
        firstName,
        lastName,
        job,
        location,
        bio,*/

      // method 2
      return form
    }

    //store infor in database
        //   const onSubmit = async () => {
        //     await createUser({ ...form })
        //     form.value.firstName = ''
        //     form.value.lastName = ''
        //     form.value.location = ''
        //     form.value.job =  ''
        //     form.value.bio = ''
        // }

    onMounted(() => {
      if (props.data != undefined && props.data != null) {
        form.value = {
          ...form.value,
          ...props.data,
        }

        /* method 1
        firstName.value = props.data.firstName
        lastName.value = props.data.lastName
        location.value = props.data.location
        job.value = props.data.job
        bio.value = props.data.bio
        */

      
      }
    })

    
    return {
        // method 2
        form,

    /* method 1
        firstName,
        lastName,
        job,
        location,
        bio,
    */
        getPersonalInfor, 

        // onSubmit,
    }
  },
}
</script>

<template>
  <div class="fieldset">
    <div class="fieldset-heading">
      <h4>Personal Info</h4>
      <p>Others diserve to know you more</p>
    </div>

    <div class="columns is-multiline">
      <!--Field-->
      <div class="column is-6">
        <VField>
          <VControl icon="feather:user">
            <input
              v-model="form.firstName"
              type="text"
              class="input"
              placeholder="First Name"
              autocomplete="given-name"
            />
          </VControl>
        </VField>
      </div>
      <!--Field-->
      <div class="column is-6">
        <VField>
          <VControl icon="feather:user">
            <input
              v-model="form.lastName"
              type="text"
              class="input"
              placeholder="Last Name"
              autocomplete="family-name"
            />
          </VControl>
        </VField>
      </div>
      <!--Field-->
      <div class="column is-12">
        <VField>
          <VControl icon="feather:briefcase">
            <input
              v-model="form.job"
              type="text"
              class="input"
              placeholder="Job Title"
              autocomplete="organization-title"
            />
          </VControl>
        </VField>
      </div>
      <!--Field-->
      <div class="column is-12">
        <VField>
          <VControl icon="feather:map-pin">
            <input
              v-model="form.location"
              type="text"
              class="input"
              placeholder="Location"
              autocomplete="country-name"
            />
          </VControl>
        </VField>
      </div>
      <!--Field-->
      <div class="column is-12">
        <VField>
          <VControl>
            <textarea
              v-model="form.bio"
              class="textarea"
              rows="4"
              placeholder="About / Bio"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="true"
            ></textarea>
          </VControl>
        </VField>
      </div>
      <!-- Button -->
      <div class="column is-12">
            <VField>
              <VControl>
                <VButton color="primary" raised fullwidth>
                  Add Personal Information
                </VButton>
              </VControl>
            </VField>
          </div>
    </div>
  </div>
</template>
