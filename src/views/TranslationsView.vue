<template>
  <table style="border-collapse: collapse; overflow: visible">
    <thead>
      <tr>
        <th>Key</th>
        <th v-for="language in allLanguages" :key="language.label">{{ language.value }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="key in englishKeys" :key="key">
        <td>{{ key }}</td>
        <TranslationDisplay
          v-for="language in allLanguages"
          :key="language.label"
          :translationObject="objectOfAllTranslations[language.label][key]"
          :trKey="key"
          :currentEn="en[key]"
        />
      </tr>
    </tbody>
  </table>
  <!-- <TranslationDisplay
    v-for="(translation, trKey, index) in objectOfAllTranslations"
    :key="getNewRandomUUID()"
    :translationObject="translation"
    :trKey="trKey"
  /> -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import localeMessagesEn from '@/assets/files_to_translate/en.js'
import localeMessagesFr from '@/assets/files_to_translate/fr.js'
import localeMessagesAr from '@/assets/files_to_translate/ar.js'
import localeMessagesHe from '@/assets/files_to_translate/he.js'
import localeMessagesSv from '@/assets/files_to_translate/sv.js'
import localeMessagesDe from '@/assets/files_to_translate/de.js'
import { uuid } from 'vue-uuid'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import TranslationDisplay from '@/components/TranslationDisplay.vue'
import TranslationTable from '@/components/TranslationTable.vue'

const search = ref('')

const en = <Record<string, any>>localeMessagesEn
const fr = <Record<string, any>>localeMessagesFr
const ar = <Record<string, any>>localeMessagesAr
const he = <Record<string, any>>localeMessagesHe
const sv = <Record<string, any>>localeMessagesSv
const de = <Record<string, any>>localeMessagesDe
const listOfAllTranslations = ref<Record<string, any>[]>([en, fr, ar, he, sv, de])

const allLanguages = [
  { label: 'en', value: 'English' },
  { label: 'fr', value: 'French' },
  { label: 'ar', value: 'Arabic' },
  { label: 'he', value: 'Hebrew' },
  { label: 'sv', value: 'Swedish' },
  { label: 'de', value: 'German' }
]
const objectOfAllTranslations = {
  en,
  fr,
  ar,
  he,
  sv,
  de
}
function getNewRandomUUID() {
  const newUuid = uuid.v4()
  return newUuid
}
function isObject(translationObject: Record<string, any>) {
  if (typeof translationObject == 'object') {
    return true
  } else {
    return false
  }
}
const englishKeys = Object.keys(en)
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #d6eeee;
}
</style>
