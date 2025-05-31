<template>
  <v-chip
    :color="statusColor"
    label
    size="small"
    class="text-white"
    variant="flat"
  >
    {{ status }}
  </v-chip>
</template>

<script setup lang="ts">

  const props       = defineProps<{ status: string }>()
  const statusColor = getStatusColor(props.status)

  // ********** COLOR MAP **********
  function getStatusColor(status: string): string {
    switch (status) {
      case 'Available':
        return 'green'
      case 'InUse':
      case 'Driving':
        return 'red'
      case 'Maintenance':
      case 'OnLeave':
        return 'orange'
      case 'Unavailable':
      default:
        return 'grey'
    }
  }

</script>