<template>
  <td v-if="typeof translation[listKey] == 'object'">
    <div v-for="subKey in Object.keys(translation)" :key="subKey">
      <TranslationItem :listKey="subKey" :translation="translation" />
    </div>
  </td>
  <td v-else>
    {{ translation[listKey] }}
  </td>
</template>

<script setup lang="ts">
interface Props {
  listKey: string
  translation: Record<string, any>
}
defineProps<Props>()
</script>

<style scoped></style>
