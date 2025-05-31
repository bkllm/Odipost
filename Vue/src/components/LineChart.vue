<template>
  <Chart :data="data" :options="options" type="line" />
</template>

<script setup lang="ts">

  import { Chart } from 'vue-chartjs'
  import type { ChartData, ChartOptions } from 'chart.js'

  defineProps<{
    data:     ChartData<'line'>
    options:  ChartOptions<'line'>
  }>()
  
</script>