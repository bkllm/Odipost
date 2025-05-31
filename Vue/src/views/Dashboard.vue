<template>
  <div>

    <!-- ********************** TITLE ********************** -->
    <h1 class="text-h4 font-weight-bold mb-6">Dashboard</h1>

    <!-- ********************** KPI CARDS ********************** -->
    <KPICards />

    
    <!-- ********************** DASHBOARD CONTENT ********************** -->
    <div class="d-flex flex-column flex-md-row ga-3">

      <!-- ********** LEFT PANEL ********** -->
      <div class="d-flex flex-column" style="flex: 1 1 0">
        <!-- ACTIVE VEHICLES CHART -->
        <ActiveVehicles />

        <!-- VEHICLE STATUS PIE -->
        <VehicleStatusPie />
      </div>

      <!-- ********** RIGHT PANEL ********** -->
      <div class="d-flex flex-column" style="flex: 1 1 0">
        <!-- ALERTS -->
        <Alerts />

        <!-- MAP -->
        <Map />
      </div>

    </div>

  </div>
</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import KPICards         from '@/components/dashboard/KPICards.vue'
  import ActiveVehicles   from '@/components/dashboard/charts/ActiveVehicles.vue';
  import VehicleStatusPie from '@/components/dashboard/charts/VehicleStatusPie.vue';
  import Alerts           from '@/components/dashboard/Alerts.vue';
  import Map              from '@/components/dashboard/Map.vue';

</script>