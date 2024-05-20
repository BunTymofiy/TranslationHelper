<template>
  <div v-if="isObject(translationObject, trKey)">
    <div v-for="(translation, key, index) in translationObject" :key="key">
      <TranslationDisplay
        :translationObject="translation"
        :trKey="key"
        :currentEn="currentEn[key]"
      />
    </div>
  </div>
  <td v-else>
    {{ translationObject }}
  </td>
</template>

<script setup lang="ts">
interface Props {
  translationObject: Record<string, any> | string
  trKey: string
  currentEn: Record<string, any>
}
const props = defineProps<Props>()
function displayData(translationObject: Record<string, any>, trKey: string) {
  // if (trKey === 'messages') debugger
  if (translationObject && isObject(translationObject)) {
    return true
  } else {
    return false
  }
}

function isObject(translationObject: Record<string, any>) {
  if (typeof translationObject == 'object') {
    return true
  } else {
    return false
  }
}

const currentEnKeys = isObject(props.currentEn) ? Object.keys(props.currentEn) : []
</script>

<style scoped></style>
