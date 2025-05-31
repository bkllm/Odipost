<template>
  <div>
    <!-- ******************** TITLE ******************** -->
    <h2 class="text-h6 font-weight-bold mb-2">Map</h2>

    <!-- ******************** MAP ******************** -->
    <div v-if="isMapVisible" class="leaflet-map-wrapper">
      <LMap
        :zoom="10"
        :center="center"
        style="height: 100%; width: 100%"
        ref="leafletRef"
      >
        <LTileLayer
          :url="tileUrl"
          :attribution="`© <a href='https://www.mapbox.com/'>Mapbox</a>`"
        />

        <!-- ********** VEHICLE MARKERS ********** -->
        <LMarker
          v-for="vehicle in vehicles"
          :key="vehicle.vehicleId"
          :lat-lng="[vehicle.latitude, vehicle.longitude]"
          :icon="getIcon(vehicle.type)"
          @click="flyTo(vehicle.latitude, vehicle.longitude)"
        >
          <LPopup>
            <div style="line-height: 1.3">
              <strong>{{ vehicle.licensePlate }}</strong><br />
              <small>Brand: {{ vehicle.brand }}</small><br />
              <small>Driver: {{ vehicle.driverName }}</small>
            </div>
          </LPopup>
        </LMarker>
      </LMap>
    </div>
  </div>
</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import { ref, onMounted, onBeforeUnmount }  from 'vue'
  import L                                    from 'leaflet'
  import { API }                              from '@/api'
  import type { Location }                    from '@/models'
  import 'leaflet/dist/leaflet.css'

  // ********** COMPONENTS **********
  import {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  } from '@vue-leaflet/vue-leaflet'
  
  // ********** ICONS **********
  import truckIcon          from '@/assets/icons/truck.png'
  import vanIcon            from '@/assets/icons/van.png'
  import carIcon            from '@/assets/icons/car.png'

  const vehicleIcons: Record<string, L.Icon> = {
    Truck: L.icon({
      iconUrl: truckIcon,
      iconSize: [32, 24],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    Van: L.icon({
      iconUrl: vanIcon,
      iconSize: [32, 20],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    Car: L.icon({
      iconUrl: carIcon,
      iconSize: [32, 20],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
  }

  // ********** DATA **********
  const MAPBOX_TOKEN  = import.meta.env.VITE_MAPBOX_TOKEN
  const isMapVisible  = ref(false)
  const center        = ref<[number, number]>([50.85, 4.35])
  const tileUrl       = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`
  const leafletRef    = ref<InstanceType<typeof LMap> | null>(null)
  const vehicles      = ref<Location[]>([])
  let intervalId: number
  

  // ********** METHODS **********
  const getIcon = (type: string) => vehicleIcons[type] || vehicleIcons.Truck

  const fetchVehicles = async () => {
    try {
      vehicles.value  = await API.location.getAll()
    } catch (err) {
      console.error('Failed to fetch vehicle data', err)
    }
  }

  const flyTo = (lat: number, lng: number) => {
    const map = leafletRef.value?.leafletObject as L.Map
    if (map) {
      map.flyTo([lat, lng], 14, { duration: 1.5 })
    }
  }

  // ********** HOOKS **********
  onMounted(() => {
    // 1. Wait for layout to be ready
    setTimeout(() => {
      isMapVisible.value = true
    }, 300)

    // 2. Fetch data
    fetchVehicles()
    intervalId = setInterval(fetchVehicles, 3000)
  })

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
</script>


<!-- ********************** CSS ********************** -->
<!-- ********************** CSS ********************** -->
<style scoped lang="scss">

  .leaflet-map-wrapper {
    height: 350px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

</style>