<template>
  <div class="d-flex flex-column flex-sm-row ga-6">
    
    <!-- ********************** LEFT PANEL ********************** -->
    <div class="d-flex align-center ga-4" style="min-width: 340px;">

      <!-- ***** AVTAR ***** -->
      <v-avatar :image="Avatar" size="100" rounded="lg" />

      <!-- ***** INFO ***** -->
      <div class="d-flex flex-column ga-2 text-body-2">
        <div><strong>Email:</strong> {{ driver.email }}</div>
        <div><strong>Phone:</strong> {{ driver.phone }}</div>
        <div class="d-flex align-center">
          <strong style="margin-right: 10px;">Status:</strong>
          <StatusChip :status="driver.status" />
        </div>
      </div>

    </div>

    <v-divider vertical class="d-none d-md-block" />

    <!-- ********************** RIGHT PANEL ********************** -->
    <div class="flex-grow-1">
      <h3 class="text-h6 font-weight-bold mb-2">Address</h3>
      <div>{{ driver.address }}, {{ driver.postalCode }} {{ driver.city }}</div>
    </div>

  </div>
</template>


<script setup lang="ts">

  import Avatar           from '@/assets/avatar.png'
  import StatusChip       from '../shared/StatusChip.vue';
  import type { Driver }  from '@/models'

  const props = defineProps<{
    driver: Driver
  }>()

</script>