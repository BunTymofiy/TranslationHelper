<template>
  <td v-if="typeof en[listKey] == 'object'">
    <div v-for="(subKey, index) in Object.keys(en[listKey])" :key="subKey">
      <table>
        <thead>
          <tr>
            <th>
              {{ subKey }}
            </th>
          </tr>
        </thead>
      </table>
      <TranslationItem
        style="border: 1px solid rebeccapurple"
        :path="[...path, subKey]"
        :listKey="subKey"
        :translation="translation && translation[listKey] ? translation[listKey] : {}"
        :en="en[listKey]"
        @update:translation="(path, value) => emitUpdate(path, value)"
      />
    </div>
  </td>
  <td v-else>
    <input
      :value="translation && translation[listKey] ? translation[listKey] : ''"
      @change="emitUpdate(path, ($event.target as HTMLInputElement).value)"
      placeholder="Enter translation here..."
      :key="getNewRandomUUID()"
      :class="translation && translation[listKey] ? '' : 'dataMissing'"
    />
  </td>
</template>

<script setup lang="ts">
import { uuid } from 'vue-uuid'

interface Props {
  path: Array<string>
  listKey: string
  translation: Record<string, any>
  en: Record<string, any>
}

const props = defineProps<Props>()
interface Emits {
  (event: 'update:translation', path: Array<string>, value: string): void
}
const emit = defineEmits<Emits>()

const emitUpdate = (path: string[], value: string) => {
  emit('update:translation', path, value)
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
