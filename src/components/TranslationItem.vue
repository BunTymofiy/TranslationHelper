<template>
  <td v-if="typeof translation[listKey] == 'object'">
    <div v-for="subKey in Object.keys(translation[listKey])" :key="subKey">
        <VTable>
            <thead>
                <tr>
                    <th>{{ subKey }}</th>
                </tr>
            </thead>
        </VTable>
      <TranslationItem :listKey="subKey" :translation="translation[listKey]" />
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
