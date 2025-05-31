<template>

  <!-- ********************** KPI BAR ********************** -->
  <v-sheet
    elevation="4"
    class="d-flex flex-wrap justify-space-evenly align-center pa-4 mb-6 text-body-2"
  >
    <!-- ************** ITEMS ************** -->
    <div
      v-for="item in items"
      :key="item.label"
      class="d-flex align-center"
      style="gap: 8px"
    >
      <!-- ***** COLOR ***** -->
      <div
        :style="{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: item.color,
        }"
      />

      <!-- ***** VALUE ***** -->
      <span style="opacity: 0.7">{{ item.count }}</span>

      <!-- ***** LABEL ***** -->
      <span style="font-weight: 500">{{ item.label }}</span>
    </div>
  </v-sheet>

</template>

<script setup lang="ts">

  // ********** PROPS **********
  defineProps<{
    items: {
      label: string
      count: number
      color: string
    }[]
  }>()

</script>