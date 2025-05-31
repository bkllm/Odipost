<template>
  <!-- <v-app theme="dark"> -->
  <v-app>
    
    <!-- ********************** SIDEBAR ********************** -->
    <v-navigation-drawer
      app
      permanent
      color="primary"
      dark
      width="180"
    >
      <v-list>

        <!-- ***************** LOGO ***************** -->
        <v-list-item class="justify-center pt-4">
          <img
            src="@/assets/odipost-logo.png"
            alt="Odipost"
            style="height: 50px;"
          />
        </v-list-item>

        <!-- ***************** DIVIDER ***************** -->
        <v-divider class="mb-4" />

        <!-- ***************** NAV ITEMS ***************** -->
        <v-list-item
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :title="item.label"
          :prepend-icon="item.icon"
          router
          link
        >
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!-- ********************** ROUTER VIEW ********************** -->
    <v-main>
      <v-container fluid style="padding: 20px 40px;">
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>



<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** DATA ***********
  const navItems = [
    { label: 'Dashboard', path: '/',          icon: 'mdi-view-dashboard' },
    { label: 'Vehicles',  path: '/vehicles',  icon: 'mdi-truck' },
    { label: 'Drivers',   path: '/drivers',   icon: 'mdi-account-group' },
  ]

</script>



<!-- ********************** CSS ********************** -->
<!-- ********************** CSS ********************** -->
<style lang="scss">


  html, html body {
    overflow-y: auto !important;
  }

  .nav-link {
    align-items: center;
    display: flex;
  }
  
</style>