<template>
  <v-data-table :headers="headers" :items="items">
    <template v-slot:item.value="{ item }">
      <div v-if="typeof item.value === 'object'">
        <translation-table :items="item.value" />
      </div>
      <div v-else>
        {{ item.value }}
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'TranslationTable',
  props: {
    items: {
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Key', value: 'key' },
        { text: 'Value', value: 'value' }
      ]
    },
    rows() {
      return Object.entries(this.items).map(([key, value]) => ({ key, value }))
    }
  },
  components: {
    TranslationTable: () => import('./TranslationTable.vue')
  }
})
</script>
