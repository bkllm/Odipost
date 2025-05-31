<template>
  <div class="d-flex flex-column flex-md-row ga-6">

    <!-- ********************** INFO ********************** -->
    <div style="width: 100%; max-width: 360px">

      <h3 class="text-h6 font-weight-bold mb-3">Vehicle Info</h3>

      <v-img
        :src="vehicleImages[vehicle.type] || defaultImage"
        height="160"
        cover
        class="mb-3 rounded"
      />

      <div><strong>Brand:</strong> {{ vehicle.brand }}</div>
      <div><strong>Model:</strong> {{ vehicle.model }}</div>
      <div><strong>Type:</strong> {{ vehicle.type }}</div>

      <div class="mt-2 d-flex align-center">
        <strong style="margin-right: 10px;">Status:</strong>
        <StatusChip :status="vehicle.status" />
      </div>

      <div class="mt-2"><strong>Last Location:</strong> Brussel</div>
      <div class="text-grey-darken-1">
        {{ location ? new Date(location.timestamp).toLocaleString() : 'N/A' }}
      </div>

      <v-divider class="my-4" />

      <!-- ********************** DRIVER INFO ********************** -->
      <h3 class="text-h6 font-weight-bold mb-3">Driver Info</h3>

      <template v-if="vehicle.currentDriver">
        <div><strong>Name:</strong> {{ vehicle.currentDriver.firstName }} {{ vehicle.currentDriver.lastName }}</div>
        <div><strong>Email:</strong> {{ vehicle.currentDriver.email }}</div>
        <div><strong>Phone:</strong> {{ vehicle.currentDriver.phone }}</div>
        <div><strong>Status:</strong> {{ vehicle.currentDriver.status }}</div>
      </template>
      <em v-else class="text-grey">Unassigned</em>

    </div>

    <v-divider vertical class="d-none d-md-block" />

    <!-- ********************** MAP ********************** -->
    <div class="flex-grow-1">

      <h3 class="text-h6 font-weight-bold mb-3">Location</h3>

      <div v-if="isMapVisible" style="width: 100%; height: 500px; border-radius: 8px; overflow: hidden;">

        <LMap
          :center="mapCenter as [number, number]"
          :zoom="12"
          style="height: 100%; width: 100%;"
          ref="leafletMapRef"
        >
          <LTileLayer
            :url="tileUrl"
            :attribution="attribution"
          />
          <LMarker
            v-if="location"
            :lat-lng="[location.latitude, location.longitude]"
            :icon="icon"
          >
            <LPopup>
              {{ vehicle.licensePlate }} – {{ vehicle.brand }}
            </LPopup>
          </LMarker>
        </LMap>
        
      </div>

    </div>
    
  </div>
</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import { 
    ref, 
    onMounted, 
    onBeforeUnmount, 
    computed, 
    nextTick 
  }                                 from 'vue'
  import { API }                    from '@/api'
  import type { Vehicle, Location } from '@/models'


  // ********** COMPONENTS **********
  import { 
    LMap, 
    LTileLayer, 
    LMarker, 
    LPopup 
  }                                 from '@vue-leaflet/vue-leaflet'
  import L                          from 'leaflet'
  import StatusChip                 from '../shared/StatusChip.vue'


  // ********** PROPS **********
  const props = defineProps<{vehicle: Vehicle}>()

  // ********** MAP **********
  const defaultCenter: [number, number] = [50.85, 4.35]
  const tileUrl                         = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
  const attribution                     = '© <a href="https://www.mapbox.com/">Mapbox</a>'
  const leafletMapRef                   = ref<InstanceType<typeof LMap> | null>(null)
  const isMapVisible                    = ref(false);
  const mapCenter                       = computed(() =>
    location.value ? [location.value.latitude, location.value.longitude] : defaultCenter
  )

  // ********** ICONS **********
  import carIcon    from '@/assets/icons/Car.png'
  import vanIcon    from '@/assets/icons/Van.png'
  import truckIcon  from '@/assets/icons/Truck.png'

  const vehicleIcons: Record<string, L.Icon> = {
    Car: L.icon({ iconUrl: carIcon, iconSize: [32, 24], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
    Van: L.icon({ iconUrl: vanIcon, iconSize: [32, 24], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
    Truck: L.icon({ iconUrl: truckIcon, iconSize: [32, 24], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
  }
  const icon = computed(() => vehicleIcons[props.vehicle.type] || vehicleIcons.Truck)

  // ********** IMAGE **********
  import carImage     from '@/assets/Car.png'
  import vanImage     from '@/assets/Van.png'
  import truckImage   from '@/assets/Truck.png'

  const defaultImage = truckImage
  const vehicleImages: Record<string, string> = {
    Car:    carImage,
    Van:    vanImage,
    Truck:  truckImage
  }

  // ********** LOCATION FETCH **********
  const location = ref<Location | null>(null)
  let intervalId: number

  const fetchLocation = () => {
    API.location.getVehicleById(props.vehicle.id)
    .then((res) => location.value = res.data)
    .catch(console.error)
  }

  
  // ********** HOOKS **********
  onMounted(() => {
    setTimeout(() => {
      isMapVisible.value = true
    }, 300)
    fetchLocation()
    intervalId = setInterval(fetchLocation, 3000)

    nextTick(() => {
      setTimeout(() => {
        const map = leafletMapRef.value?.leafletObject as L.Map
        map?.invalidateSize()
      }, 300)
    })
  })

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
  
</script>