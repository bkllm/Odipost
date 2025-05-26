<template>
  <v-app>

    <v-card height="100vh" class="d-flex">
      <v-layout>
        <v-navigation-drawer permanent class="bg-indigo-darken-3">
          
          <v-img
            :src="odipostLogo"
            width="200"
            class="mt-4 mb-2"
          ></v-img>

          <v-list nav>
            <v-list-item prepend-icon="mdi-home-city" title="Dashboard" value="dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Fleet" value="fleet"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Employees" value="employees"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Incidents" value="incidents"></v-list-item>
          </v-list>
        </v-navigation-drawer>


        <v-main>
          <v-toolbar app>
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-toolbar>

          <div class="pa-4">
            <h1>Welkom op je Dashboard</h1>
          </div>
        </v-main>
      </v-layout>
    </v-card>

  </v-app>
</template>

<script lang="ts" setup>
import odipostLogo from './assets/odipost-logo.png';
</script>
