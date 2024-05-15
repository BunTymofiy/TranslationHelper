<template>
  <VTable>
    <thead>
      <tr>
        <th>Key</th>
        <th v-for="language in allLanguages" :key="language">{{ language }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="key in Object.keys(en)" :key="key">
        <td>{{ key }}</td>

        <td v-for="(translation, index) in listOfAllTranslations" :key="translation[key]">
          <TranslationItem
            :listKey="key"
            :translation="translation"
            :en="en"
            @update:translation="(value: Record<string, any>) => updateTranslation(index, value)"
            :languages="allLanguages"
          />
        </td>
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

const en = <Record<string, any>>localeMessagesEn
const fr = <Record<string, any>>localeMessagesFr
const ar = <Record<string, any>>localeMessagesAr
const he = <Record<string, any>>localeMessagesHe
const sv = <Record<string, any>>localeMessagesSv
const de = <Record<string, any>>localeMessagesDe
const listOfAllTranslations = ref<Record<string, any>[]>([en, fr, ar, he, sv, de])

const allLanguages = ['English', 'French', 'Arabic', 'Hebrew', 'Swedish', 'German']

const updateTranslation = (index: number, value: Record<string, any>) => {
  listOfAllTranslations.value[index] = value
}
</script>

<style scoped></style>
