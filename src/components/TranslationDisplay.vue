<template>
  <td v-if="isObject(translationObject)">
    <div class="grid-container">
      <div class="grid-item" v-for="aKey in currentEnKeys" :key="aKey">
        {{ aKey }}
        <TranslationDisplay
          :translationObject="translationObject[aKey]"
          :trKey="aKey"
          :currentEn="currentEn[aKey]"
        />
      </div>
    </div>
  </td>
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

function isObject(translationObject: Record<string, any> | string) {
  if (typeof translationObject == 'object') {
    return true
  } else {
    return false
  }
}

const currentEnKeys = isObject(props.currentEn) ? Object.keys(props.currentEn) : []
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust as needed */
  gap: 10px; /* Adjust as needed */
}

.grid-item {
  border: 1px solid #ccc; /* Adjust as needed */
  padding: 10px; /* Adjust as needed */
}
</style>
