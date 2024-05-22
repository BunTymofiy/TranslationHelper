<template>
  <div style="overflow: auto">
    <VBtn @click="exportToMultipleJs()" color="primary" style="width: 100%">Export to JS</VBtn>
    <table>
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
              :path="[key]"
              :listKey="key"
              :translation="translation"
              :en="en"
              @update:translation="(path, value) => updateTranslation(path, value, index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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

<style scoped>
table {
  border-collapse: collapse;
  border: 0.1em solid #d6d6d6;
}

th,
td {
  padding: 0.25em 0.5em 0.25em 1em;
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
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

.colheaders td:nth-of-type(2) {
  font-style: italic;
}

.colheaders th:nth-of-type(3),
.colheaders td:nth-of-type(3) {
  text-align: right;
}

.rowheaders td:nth-of-type(1) {
  font-style: italic;
}

.rowheaders th:nth-of-type(3),
.rowheaders td:nth-of-type(2) {
  text-align: right;
}

/* Scrolling wrapper */

div[tabindex='0'][aria-labelledby][role='region'] {
  overflow: auto;
}

div[tabindex='0'][aria-labelledby][role='region']:focus {
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
  outline: 0.1em solid rgba(0, 0, 0, 0.1);
}

div[tabindex='0'][aria-labelledby][role='region'] table {
  margin: 0;
}

div[tabindex='0'][aria-labelledby][role='region'].rowheaders {
  background:
    linear-gradient(to right, transparent 30%, rgba(255, 255, 255, 0)),
    linear-gradient(to right, rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(farthest-side at 0% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%;
  background-repeat: no-repeat;
  background-color: #fff;
  background-size:
    4em 100%,
    4em 100%,
    1.4em 100%,
    1.4em 100%;
  background-position:
    0 0,
    100%,
    0 0,
    100%;
  background-attachment: local, local, scroll, scroll;
}

div[tabindex='0'][aria-labelledby][role='region'].colheaders {
  background:
    linear-gradient(white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%;
  background-repeat: no-repeat;
  background-color: #fff;
  background-size:
    100% 4em,
    100% 4em,
    100% 1.4em,
    100% 1.4em;
  background-attachment: local, local, scroll, scroll;
}

/* Strictly for making the scrolling happen. */

th[scope='row'] {
  min-width: 40vw;
}

@media all and (min-width: 30em) {
  th[scope='row'] {
    min-width: 20em;
  }
}

th[scope='row'] + td {
  min-width: 24em;
}

div[tabindex='0'][aria-labelledby][role='region']:nth-child(3) {
  max-height: 18em;
}

div[tabindex='0'][aria-labelledby][role='region']:nth-child(7) {
  max-height: 15em;
  margin: 0 1em;
}
</style>
