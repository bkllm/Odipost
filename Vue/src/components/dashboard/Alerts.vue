<template>
  <div class="mb-6">

    <!-- ********** TITLE ********** -->
    <h2 class="text-h6 font-weight-bold mb-2">Alerts</h2>

    <!-- ********** ALERT LIST ********** -->
    <div class="d-flex flex-column ga-2">
      <div
        v-for="(alert, index) in alerts"
        :key="index"
        class="d-flex align-center rounded px-4 py-2"
        :style="getStyle(alert.status)"
      >
        <span class="mr-2" style="font-size: 18px">{{ STATUS_STYLES[alert.status].icon }}</span>
        <span class="text-body-2">{{ alert.message }}</span>
      </div>
    </div>

  </div>
</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import { ref, onMounted }   from 'vue'
  import { API }              from '@/api'
  import type { DailyAlert }  from '@/models'

  // ********** STYLES CONFIG **********
  const STATUS_STYLES: Record<DailyAlert['status'], { bg: string; border: string; icon: string }> = {
    warning: { bg: '#fff8e1', border: '#ffecb3', icon: '⚠️' },
    error:   { bg: '#ffebee', border: '#ffcdd2', icon: '🚫' },
    success: { bg: '#e8f5e9', border: '#c8e6c9', icon: '✅' },
    info:    { bg: '#e3f2fd', border: '#90caf9', icon: 'ℹ️'  },
  }

  // ********** DATA **********
  const alerts = ref<DailyAlert[]>([])


  // ********** METHODS **********
  const getStyle = (status: DailyAlert['status']) => {
    const style = STATUS_STYLES[status]
    return {
      backgroundColor: style.bg,
      border: `1px solid ${style.border}`,
    }
  }

  // ********** HOOKS **********
  onMounted(async () => {
    try {
      alerts.value = await API.alerts.getDailyAlerts()
    } catch (e) {
      console.error(e)
    }
  })

</script>