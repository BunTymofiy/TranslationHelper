<script setup lang="ts">
import { ref } from 'vue'
import localeMessagesEn from '@/assets/files_to_translate/en.js'
import localeMessagesFr from '@/assets/files_to_translate/fr.js'
import localeMessagesAr from '@/assets/files_to_translate/ar.js'
import localeMessagesHe from '@/assets/files_to_translate/he.js'
import localeMessagesSv from '@/assets/files_to_translate/sv.js'
import localeMessagesDe from '@/assets/files_to_translate/de.js'

let en = ref(localeMessagesEn)
let fr = ref(localeMessagesFr)
let ar = ref(localeMessagesAr)
let he = ref(localeMessagesHe)
let sv = ref(localeMessagesSv)
let de = ref(localeMessagesDe)
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th>Key</th>
        <th>English</th>
        <th>French</th>
        <th>Arabic</th>
        <th>Hebrew</th>
        <th>Swedish</th>
        <th>German</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="key in Object.keys(en)" :key="key">
        <div v-if="typeof key === 'object'">
          <VTable v-for="subKey in Object.keys(key)" :key="subKey">
            <tbody>
              <tr v-for="subKey in Object.keys(key)" :key="subKey">
                <td>{{ subKey }}</td>
                <td>{{ en[key][subKey] }}</td>
                <td>{{ fr[key][subKey] }}</td>
                <td>{{ ar[key][subKey] }}</td>
                <td>{{ he[key][subKey] }}</td>
                <td>{{ sv[key][subKey] }}</td>
                <td>{{ de[key][subKey] }}</td>
              </tr>
            </tbody>
          </VTable>
        </div>
        <div v-else>
          <td>{{ key }}</td>
          <td>{{ en[key] }}</td>
          <td>{{ fr[key] }}</td>
          <td>{{ ar[key] }}</td>
          <td>{{ he[key] }}</td>
          <td>{{ sv[key] }}</td>
          <td>{{ de[key] }}</td>
        </div>
      </tr>
    </tbody>
  </VTable>
</template>

<style scoped>
.v-table {
}
</style>
