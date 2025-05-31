<template>
  <v-dialog
    v-model="isOpen"
    :max-width="maxWidth"
    scrollable
  >
    <v-card>

      <!-- ********** HEADER ********** -->
      <v-card-title class="d-flex justify-space-between align-center">

        <!-- TITLE -->
        <span class="text-h6 font-weight-bold">{{ title }}</span>

        <!-- CLOSE ICON -->
        <v-btn icon @click="emit('close')" variant="text">
          <v-icon>mdi-close</v-icon>
        </v-btn>

      </v-card-title>

      <v-divider />

      <!-- ********** CONTENT ********** -->
      <v-card-text>
        <slot />
      </v-card-text>

    </v-card>
  </v-dialog>
</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  import { computed } from 'vue'

  // ********** PROPS **********
  const props = defineProps<{
    open:       boolean
    title:      string
    maxWidth?:  string | number
  }>()

  // ********** EMITS **********
  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  // ********** LOCAL STATE **********
  const isOpen = computed({
    get: () => props.open,
    set: (val: boolean) => {
      if (!val) emit('close')
    }
  })

</script>