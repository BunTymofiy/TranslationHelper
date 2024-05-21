<template>
  <div v-for="(enLang, enKey, index) in en">
    <Tree
      :langObj="objectOfAllTranslations"
      :enKey="enKey"
      :objectOfAllTranslations="objectOfAllTranslations"
      :path="[]"
      :en="en"
    />
  </div>
</template>

<script setup lang="ts">
import localeMessagesEn from '@/assets/files_to_translate/en.js'
import localeMessagesFr from '@/assets/files_to_translate/fr.js'
import localeMessagesAr from '@/assets/files_to_translate/ar.js'
import localeMessagesHe from '@/assets/files_to_translate/he.js'
import localeMessagesSv from '@/assets/files_to_translate/sv.js'
import localeMessagesDe from '@/assets/files_to_translate/de.js'
import { VTreeview } from 'vuetify/labs/components'
import { ref } from 'vue'
import Tree from '@/components/tranlsationsTree/Tree.vue'

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
</script>

<style scoped></style>
