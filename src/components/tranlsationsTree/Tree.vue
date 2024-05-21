<template>
  <div style="display: flex; flex-direction: row; gap: 1em">
    {{ enKey }}
    <div v-for="(langValue, langKey, index) in langObj" :key="getNewRandomUUID()">
      <Tree
        :langObj="langValue[enKey]"
        :en-key="enKey"
        v-if="isObject(langValue[enKey], enKey, langKey, index, langValue)"
        :path="[...path, langKey]"
        :en="en"
      />
      <div v-else>
        {{
          objectOfAllTranslations &&
          objectOfAllTranslations[langKey] &&
          objectOfAllTranslations[langKey][enKey]
            ? objectOfAllTranslations[langKey][enKey]
            : langValue[enKey]
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uuid } from 'vue-uuid'

interface Props {
  langObj: Record<string, any> | string
  enKey: string
  objectOfAllTranslations?: Record<string, any>
  path: Array<string>
  en: Record<string, any>
}
const props = defineProps<Props>()
console.log(props.path)
function isObject(
  translationObject: Record<string, any> | string,
  enKey: string,
  langKey: string,
  index: number,
  objectLol: Record<string, any>
) {
  if (typeof translationObject == 'object') {
    // if (enKey == 'messages') debugger
    return true
  } else {
    return false
  }
}
function getNewRandomUUID() {
  const newUuid = uuid.v4()
  return newUuid
}
</script>

<style scoped></style>
