<template>
  <div class="wrapper">
    <VBtn @click="exportToMultipleJs()" color="primary">Export to JS</VBtn>
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th v-for="language in allLanguages" :key="language.label">{{ language.value }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in Object.keys(en)" :key="key">
          <!-- Add row button -->

          <td>{{ key }}</td>

          <TranslationItem
            :path="[key]"
            :listKey="key"
            :translation="translation"
            :en="en"
            @update:translation="(path, value) => updateTranslation(path, value, index)"
            v-for="(translation, index) in listOfAllTranslations"
            :key="getNewRandomUUID()"
          />
        </tr>
      </tbody>
    </table>
  </div>
  <span>kekw poopoo</span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import localeMessagesEn from '@/assets/files_to_translate/en.js'
import localeMessagesFr from '@/assets/files_to_translate/fr.js'
import localeMessagesAr from '@/assets/files_to_translate/ar.js'
import localeMessagesHe from '@/assets/files_to_translate/he.js'
import localeMessagesSv from '@/assets/files_to_translate/sv.js'
import localeMessagesDe from '@/assets/files_to_translate/de.js'
import TranslationItem from '@/components/TranslationItem.vue'
import { uuid } from 'vue-uuid'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

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
// Method to change exactly one translation in the exact language using the exact path
function updateTranslation(path: string[], value: string, index: number) {
  let currentObject = listOfAllTranslations.value[index]
  for (let i = 0; i < path.length; i++) {
    if (i === path.length - 1) {
      currentObject[path[i]] = value
    } else {
      if (!currentObject[path[i]]) {
        currentObject[path[i]] = {}
      }
      currentObject = currentObject[path[i]]
    }
  }
}
function getNewRandomUUID() {
  const newUuid = uuid.v4()
  return newUuid
}

async function addRowBetweenTwoKeys(keyBefore: string, keyAfter: string) {
  const newKey = await prompt('Enter the new key')
}

async function exportToMultipleJs() {
  const zip = new JSZip()
  listOfAllTranslations.value.forEach((translations, index) => {
    const jsString = `var localeMessages = ${JSON.stringify(translations, null, 2)}\nexport default localeMessages`
    zip.file(`${allLanguages[index].label}.js`, jsString)
  })
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'translations.zip')
}
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 50px);
  overflow: auto;
}
table {
  border-collapse: collapse;
  border: 0.1em solid #d6d6d6;
  overflow: visible;
}

th,
td {
  vertical-align: text-top;
  text-align: left;
}

th {
  vertical-align: bottom;
  background-color: #666;
  color: #fff;
}

tr:nth-child(even) th[scope='row'] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope='row'] {
  background-color: #fff;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
