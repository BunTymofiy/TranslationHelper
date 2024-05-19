<template>
  <VTable density="compact" style="padding: 25px; background-color: #ffffff">
    <template #top>
      <VBtn @click="exportToMultipleJs()" color="primary">Export to JS</VBtn>
    </template>
    <thead>
      <tr>
        <th>Key</th>
        <th v-for="language in allLanguages" :key="language.label">{{ language.value }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="key in Object.keys(en)" :key="key">
        <td>{{ key }}</td>

        <td v-for="(translation, index) in listOfAllTranslations" :key="getNewRandomUUID()">
          <TranslationItem
            :listKey="key"
            :translation="translation"
            :en="en"
            @update:translation="
              (value: Record<string, any>) =>
                updateTranslation(index, Object.keys(value)[0].split('.'), Object.values(value)[0])
            "
          />
        </td>
      </tr>
    </tbody>
  </VTable>
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

// const updateTranslation = (index: number, value: Record<string, any>) => {
//   listOfAllTranslations.value[index] = value
// }
function updateNestedTranslation(
  obj: Record<string, any>,
  path: string[],
  value: any
): Record<string, any> {
  debugger
  if (path.length === 1) {
    obj[path[0]] = value
  } else {
    const [firstKey, ...remainingPath] = path
    if (!obj[firstKey]) {
      obj[firstKey] = {}
    }
    obj[firstKey] = updateNestedTranslation(obj[firstKey], remainingPath, value)
  }
  return obj
}
const updateTranslation = (index: number, path: string[], value: any) => {
  listOfAllTranslations.value[index] = updateNestedTranslation(
    listOfAllTranslations.value[index],
    path,
    value
  )
}
function getNewRandomUUID() {
  const newUuid = uuid.v4()
  return newUuid
}

async function exportToMultipleJs() {
  const zip = new JSZip()
  listOfAllTranslations.value.forEach((translations, index) => {
    const jsString = `var localeMessages = ${JSON.stringify(translations, null, 2)} export default localeMessages`
    zip.file(`${allLanguages[index].label}.js`, jsString)
  })
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'translations.zip')
}

watch(
  listOfAllTranslations,
  (newVal) => {
    console.log('newVal', newVal)
  },
  { deep: true }
)
</script>

<style scoped></style>
