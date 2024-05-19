<template>
  <div v-if="isObject(translationObject, trKey)">
    <div v-for="(translation, key, index) in translationObject" :key="key">
      {{ key }}
      <TranslationDisplay :translationObject="translation" :trKey="key" />
    </div>
  </div>
  <div v-else>
    <div>{{ translationObject }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  translationObject: Record<string, any>
  trKey: string
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
</script>

<style scoped></style>
