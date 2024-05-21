<template>
  <td v-if="typeof en[listKey] == 'object'">
    <div v-for="(subKey, index) in Object.keys(en[listKey])" :key="subKey">
      <VTable>
        <thead>
          <tr>
            <th>
              {{ subKey }}
            </th>
          </tr>
        </thead>
      </VTable>
      <TranslationItem
        :a="a + '.' + subKey"
        :listKey="subKey"
        :translation="translation && translation[listKey] ? translation[listKey] : {}"
        :en="en[listKey]"
        @update:translation="(value: Record<string, any>) => emitUpdate({ [listKey]: value })"
      />
    </div>
  </td>
  <td v-else>
    <input
      :value="translation && translation[listKey] ? translation[listKey] : ''"
      @change="emitUpdate({ [listKey]: $event.target.value })"
      placeholder="Enter translation here..."
      :key="getNewRandomUUID()"
      :class="translation && translation[listKey] ? '' : 'dataMissing'"
    />
  </td>
</template>

<script setup lang="ts">
import { uuid } from 'vue-uuid'

interface Props {
  a: string
  listKey: string
  translation: Record<string, any>
  en: Record<string, any>
}

const props = defineProps<Props>()

interface Emits {
  (event: 'update:translation', value: Record<string, any>): void
}
const emit = defineEmits<Emits>()

const emitUpdate = (value: Record<string, any>) => {
  emit('update:translation', value)
}

function getNewRandomUUID() {
  return uuid.v4()
}
</script>

<style scoped>
.dataMissing {
  background-color: rgba(255, 0, 0, 0.344);
}
</style>
