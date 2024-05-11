<template>
  <td v-for="translation in listOfAllTranslations" :key="translation[listKey]">
    <TranslationItem
      v-if="typeof translation[listKey] == 'object'"
      :listOfAllTranslations="listOfAllTranslations"
      :listKey="listKey"
    />
    <div v-else>
      <td>{{ translation[listKey] }}</td>
    </div>
  </td>
</template>

<script setup lang="ts">

interface Props {
  listOfAllTranslations: Record<string, any>[]
  listKey: string
}
defineProps<Props>()
</script>

<style scoped></style>
