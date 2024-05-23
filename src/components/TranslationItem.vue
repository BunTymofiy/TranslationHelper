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
        <tbody>
          <tr>
            <TranslationItem
              :path="[...path, subKey]"
              :listKey="subKey"
              :translation="translation && translation[listKey] ? translation[listKey] : {}"
              :en="en[listKey]"
              @update:translation="(path, value) => emitUpdate(path, value)"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </td>
  <td v-else>
    <input
      :value="translation && translation[listKey] ? translation[listKey] : ''"
      @change="emitUpdate(path, ($event.target as HTMLInputElement).value)"
      placeholder="Enter translation here..."
      :key="getNewRandomUUID()"
      :class="translation && translation[listKey] ? 'dataPresent' : 'dataMissing'"
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

<style scoped lang="scss">
.dataMissing {
  background-color: rgba(255, 0, 0, 0.344);
}
.dataPresent {
  background-color: rgba(0, 255, 0, 0.344);
}
table {
  border-collapse: collapse;
  border: 0.1em solid #454545;
  border-radius: 0.5em;
}

th,
td {
  padding: 0.25em 0.5em 0.25em 1.5em;
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}

th {
  background-color: #666;
  color: #fff;
}

tr:nth-child(even) th[scope='row'] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope='row'] {
  background-color: #fff;
}
input {
  padding: 0.25em 0.5em;
  border: 0.1em solid #454545;
  border-radius: 0.5em;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease-in-out;
  }
}
</style>
