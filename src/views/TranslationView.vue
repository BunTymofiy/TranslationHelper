<template>
  <div style="display: flex; gap: 2em; border: 1px solid black">
    <div>Key</div>
    <div v-for="language in allLanguages" :key="language.label">{{ language.value }}</div>
  </div>
  <div
    v-for="key in getKeys(en)"
    :key="key"
    style="display: flex; gap: 2em; border: 1px solid black"
  >
    <div>{{ key }}</div>
    <div v-for="(objLang, objKey, index) in objectOfTranslations" :key="objLang">
      <div v-if="typeof en[key] == 'object'">
        <div
          v-for="subKey in Object.keys(en[key])"
          :key="subKey"
          style="display: flex; gap: 2em; border: 1px solid black"
        >
          <div>{{ subKey }}</div>
          <div v-for="(objLang, objKey, index) in objectOfTranslations" :key="objLang">
            <div v-if="typeof en[key][subKey] == 'object'">
              <div
                v-for="subSubKey in Object.keys(en[key][subKey])"
                :key="subSubKey"
                style="display: flex; gap: 2em; border: 1px solid black"
              >
                <div>{{ subSubKey }}</div>
              </div>
            </div>
            <div v-else>
              <div>
                {{ objLang && objLang[key] && objLang[key][subKey] ? objLang[key][subKey] : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>{{ objLang && objLang[key] ? objLang[key] : '' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import localeMessagesEn from '@/assets/file_to_translate_backup/en.js'
import localeMessagesFr from '@/assets/file_to_translate_backup/fr.js'
import localeMessagesAr from '@/assets/file_to_translate_backup/ar.js'
import localeMessagesHe from '@/assets/file_to_translate_backup/he.js'
import localeMessagesSv from '@/assets/file_to_translate_backup/sv.js'
import localeMessagesDe from '@/assets/file_to_translate_backup/de.js'
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

const objectOfTranslations = ref<Record<string, any>>({
  en,
  fr,
  ar,
  he,
  sv,
  de
})

const allLanguages = [
  { label: 'en', value: 'English' },
  { label: 'fr', value: 'French' },
  { label: 'ar', value: 'Arabic' },
  { label: 'he', value: 'Hebrew' },
  { label: 'sv', value: 'Swedish' },
  { label: 'de', value: 'German' }
]

function getKeys(obj: Record<string, any>) {
  return Object.keys(obj)
}
</script>

<style scoped></style>
