<template>
  <div class="mb-6">

    <!-- ********************** TITLE ********************** -->
    <h2 class="text-h6 font-weight-bold mb-2">Active Vehicles per Day</h2>


    <!-- ********************** CHART CONTAINER ********************** -->
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

      <!-- ********** SUCCESS / CHART ********** -->
      <template v-else>
        <LineChart :data="chartData" :options="chartOptions" />
      </template>

    </v-sheet>

  </div>
</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  import { ref, onMounted, computed }     from 'vue'
  import { API }                          from '@/api'
  import type { ActiveVehicle }           from '@/models/kpi'

  // ********** COMPONENTS **********
  import LineChart                        from '@/components/LineChart.vue'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    ChartOptions,
  } from 'chart.js'

  // ********** CHART REGISTRATION **********
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
  )

  // ********** CHART DATA **********
  const chartData = computed(() => ({
    labels: data.value.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Active Vehicles',
        data: data.value.map(d => d.count),
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }))

  // ********** CHART OPTIONS **********
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutSine',
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#000'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#333'
        },
        grid: {
          color: '#e0e0e0'
        }
      },
      y: {
        ticks: {
          color: '#333'
        },
        grid: {
          color: '#e0e0e0'
        }
      }
    }
  }

  // ********** DATA **********
  const data    = ref<ActiveVehicle[]>([])
  const loading = ref(true)
  const error   = ref(false)

  // ********** HOOKS **********
  onMounted(async () => {
    try {
      data.value = await API.kpi.getActiveVehiclesDaily()
    } catch (e) {
      console.error(e)
      error.value = true
    } finally {
      loading.value = false
    }
  })

</script>