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
        <td>{{ key }}</td>
        <TranslationItem :list-of-all-translations="listOfAllTranslations" :list-key="key" />
        <!-- <td v-for="translation in listOfAllTranslations" :key="translation[key]">
          <div v-if="typeof(translation[key]) == 'object'">
            <div v-for="subKey in Object.keys(translation)" :key="subKey">
              <div>{{ subKey }}</div>
              <div>{{ translation[subKey] }}</div>
            </div>
            <VTable>
              <tr v-for="subKey in Object.keys(translation)" :key="subKey">
                <td>{{ subKey }}</td>
                <td>{{ translation[subKey] }}</td>
              </tr>
            </VTable>
          </div>
          <div v-else>
            {{ translation[key] }}
          </div>
        </td> -->
      </tr>
    </tbody>
  </VTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import localeMessagesEn from '@/assets/files_to_translate/en.js'
import localeMessagesFr from '@/assets/files_to_translate/fr.js'
import localeMessagesAr from '@/assets/files_to_translate/ar.js'
import localeMessagesHe from '@/assets/files_to_translate/he.js'
import localeMessagesSv from '@/assets/files_to_translate/sv.js'
import localeMessagesDe from '@/assets/files_to_translate/de.js'
import TranslationItem from '@/components/TranslationItem.vue'

const en = <Record<string,any>>(localeMessagesEn)
const fr = <Record<string,any>>(localeMessagesFr)
const ar = <Record<string,any>>(localeMessagesAr)
const he = <Record<string,any>>(localeMessagesHe)
const sv = <Record<string,any>>(localeMessagesSv)
const de = <Record<string,any>>(localeMessagesDe)
const listOfAllTranslations = ref<Record<string,any>[]>([en, fr, ar, he, sv, de])
console.log(listOfAllTranslations.value);
</script>



<style scoped>
</style>
