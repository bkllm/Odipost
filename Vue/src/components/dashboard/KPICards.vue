<!-- ********************** KPICards.vue ********************** -->
<template>
  <v-row class="kpi-row" no-gutters>
    <v-col
      v-for="(card, i) in cards"
      :key="i"
      cols="12"
      sm="6"
      md="4"
      lg="2"
      class="pr-3 pb-4"
    >
      <v-card elevation="4" class="pa-3">
        <div class="text-h5 font-weight-bold">{{ card.value }}</div>
        <div class="text-subtitle-2 d-flex align-center mt-1 text-grey-darken-1">
          {{ card.icon }} {{ card.label }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>



<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import { ref, onMounted } from 'vue'
  import { API }            from '@/api'


  // ********** DATA **********
  const cards = ref<any[]>([])


  // ********** HOOKS **********
  onMounted(async () => {
    const [vehicle, driver, incident] = await Promise.all([
      API.kpi.getVehicleKPI(),
      API.kpi.getDriverKPI(),
      API.kpi.getIncidentKPI(),
    ])

    cards.value = [
      { label: 'In Use Vehicles',        value: vehicle.inUseVehicleCount,       icon: '🚛' },
      { label: 'Available Vehicles',     value: vehicle.availableVehicleCount,   icon: '🟢' },
      { label: 'Drivers Driving',        value: driver.drivingDriverCount,       icon: '🧑‍✈️' },
      { label: 'Available Drivers',      value: driver.availableDriverCount,     icon: '🟢' },
      { label: 'Open Incidents',         value: incident.openIncidentCount,      icon: '🚨' },
      { label: 'Incidents This Month',   value: incident.incidentsThisMonth,     icon: '📊' },
    ]
  })

</script>



<!-- ********************** STYLES ********************** -->
<!-- ********************** STYLES ********************** -->
<style scoped lang="scss">

  .kpi-row {
    flex-wrap: wrap;
  }

</style>