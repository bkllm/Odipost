<template>
  <div>
    <!-- ******************** TITLE ******************** -->
    <h2 class="text-h6 font-weight-bold mb-2">Vehicle Status Overview</h2>

    <!-- ******************** PIE CONTAINER ******************** -->
    <v-sheet
      elevation="1"
      rounded
      class="pa-4 d-flex align-center justify-center"
      style="height: 240px; background-color: white"
    >
      <!-- ********** LOADING ********** -->
      <template v-if="loading">
        <span class="text-body-2 text-grey">Loading...</span>
      </template>

      <!-- ********** ERROR ********** -->
      <template v-else-if="error">
        <span class="text-body-2 text-error">Failed to load data</span>
      </template>

      <!-- ********** SUCCESS / PIE ********** -->
      <template v-else>
        <Pie :data="chartData" :options="chartOptions" />
      </template>
    </v-sheet>
  </div>
</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import { ref, onMounted }     from 'vue'
  import { API }                from '@/api'
  import type { VehicleStats }  from '@/models/kpi'

  // ********** CHART **********
  import { Pie }                from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
    Title,
    ChartOptions,
    ChartData,
  } from 'chart.js'

  // ********** CONFIG **********
  ChartJS.register(Tooltip, Legend, ArcElement, Title)

  const STATUS_COLORS: Record<string, string> = {
    Available:    '#4caf50',
    InUse:        '#f44336',
    Maintenance:  '#ff9800',
    Unavailable:  '#6c757d',
  }

  // ********** DATA **********
  const loading       = ref(true)
  const error         = ref(false)
  const chartData     = ref<ChartData<'pie'>>({ labels: [], datasets: [] })
  const chartOptions  = ref<ChartOptions<'pie'>>({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 10,
          usePointStyle: true,
          font: { size: 14 },
        },
      },
    },
  })

  // ********** HOOKS **********
  onMounted(async () => {
    try {
      const stats: VehicleStats = await API.kpi.getVehicleStats()

      chartData.value = {
        labels: ['Available', 'InUse', 'Maintenance', 'Unavailable'],
        datasets: [{
          data: [
            stats.available,
            stats.inUse,
            stats.maintenance,
            stats.unavailable,
          ],
          backgroundColor: [
            STATUS_COLORS.Available,
            STATUS_COLORS.InUse,
            STATUS_COLORS.Maintenance,
            STATUS_COLORS.Unavailable,
          ],
        }],
      }

    } catch (e) {
      console.error(e)
      error.value = true
    } finally {
      loading.value = false
    }
  })

</script>