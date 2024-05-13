<template>
  <td v-if="typeof translation[listKey] == 'object'">
    <div v-for="subKey in Object.keys(translation[listKey])" :key="subKey">
      <VTable>
        <thead>
          <tr>
            <th>
              <h1 style="color: brown">{{ en[enKey][subKey] }}</h1>
              <h1>{{ subKey }}</h1>
            </th>
          </tr>
        </thead>
      </VTable>
      <TranslationItem
        :listKey="subKey"
        :translation="translation[listKey]"
        :enKey="enKey"
        :en="en"
      />
    </div>
  </td>
  <td v-else>
    <input
      :value="translation[listKey]"
      @input="updateTranslation({ ...translation, [listKey]: $event.target.value })"
    />
  </td>
</template>

<script setup lang="ts">
interface Props {
  listKey: string
  translation: Record<string, any>
  enKey: string
  en: Record<string, any>
}
defineProps<Props>()

interface Emits {
  (event: 'update:translation', value: Record<string, any>): void
}
const emit = defineEmits<Emits>()

const updateTranslation = (value: Record<string, any>) => {
  emit('update:translation', value)
}
</script>

<style scoped></style>
