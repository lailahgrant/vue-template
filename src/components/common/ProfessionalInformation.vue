<script lang="ts">
import { ref } from 'vue'
export default {
  setup(){
  const flexibility = ref('')
  const remote = ref('')

return{
  remote,flexibility,
}
  }
}


</script>


<template>
    
    <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Professional Info</h4>
          <p>This can help you to win some opportunities</p>
        </div>
        <div class="columns is-multiline">
          <!--Field-->
          <!-- <div class="column is-6">
            <VField>
              <VControl>
                <Multiselect
                  v-model="experience"
                  placeholder="Experience"
                  :options="[
                    '0-2 years',
                    '2-5 years',
                    '5-10 years',
                    '10+ years',
                  ]"
                />
              </VControl>
            </VField>
          </div> -->
          <!--Field-->
          <!-- <div class="column is-6">
            <VField>
              <VControl>
                <Multiselect
                  v-model="firstJob"
                  placeholder="Is this your first job?"
                  :options="['Yes', 'No']"
                />
              </VControl>
            </VField>
          </div> -->

          <!-- CV Field -->
          <div class="column is-12">
            <p>Please Upload your CV</p>
            <VField grouped>
              <VControl>
                <div class="file  is-success">
                  <label class="file-label">
                    <input class="file-input" type="file" name="resume" />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                      </span>
                      <span class="file-label"> Upload your CV… </span>
                    </span>
                    <span class="file-name light-text">
                      freelancer_name.pdf
                    </span>
                  </label>
                </div>
              </VControl>
            </VField>
          </div>
          
          <!-- CV Field -->
          <div class="column is-12">
            <p>Please Upload your Cover Letter</p>
            <VField grouped>
              <VControl>
                <div class="file  is-success">
                  <label class="file-label">
                    <input class="file-input" type="file" name="resume" />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                      </span>
                      <span class="file-label"> Upload your Cover Letter… </span>
                    </span>
                    <span class="file-name light-text">
                      freelancer_cover_letter.pdf
                    </span>
                  </label>
                </div>
              </VControl>
            </VField>
          </div>

          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl>
                <Multiselect
                  v-model="flexibility"
                  placeholder="Are you flexible?"
                  :options="['Yes', 'No']"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <div class="column is-6">
            <VField>
              <VControl>
                <Multiselect
                  v-model="remote"
                  placeholder="Do you work remotely?"
                  :options="['Yes', 'No']"
                />
              </VControl>
            </VField>
          </div>
          <!--Field-->
          <!-- <div class="column is-12">
            <VField>
              <VControl>
                <Multiselect
                  v-model="skills"
                  mode="tags"
                  :searchable="true"
                  :create-tag="true"
                  :options="skillsOptions"
                  placeholder="Add tags"
                />
              </VControl>
            </VField>
          </div> -->
        </div>
      </div>

</template>