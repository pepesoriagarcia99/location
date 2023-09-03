<template>
  <div class="content">
    <div class="map">
      <h3>Map</h3>

      <div style="height: 40%;">
        <l-map ref="map" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" />

          <!-- <l-marker
            v-for="(location, index) in currentUser.locations"
            :key="index"
            :lat-lng="[location.latitude, location.longitude]"
          /> -->
        </l-map>
      </div>
    </div>
    <span style="width: 10px;" />
    <div class="list">
      <h3>Tracked Users</h3>

      <div v-for="user in trackedUsers" :key="user.id" class="card">
        <span style="margin-left: 12px;">{{ user.name }}</span>
        <div style="margin-right: 12px;">
          <button v-if="currentUser.id === user.id" @click="hideUserLocations()">Hide locations</button>
          <button v-else @click="showUserLocations(user)">show locations</button>

          <!-- <button @click="showRealTimeLocation(user)">show real time</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import trackingService from '@/services/tracking.service';
import locationService from '@/services/location.service';

export default {
  name: 'Locations',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  computed: {
    map() {
      return this.$refs.map.mapObject;
    }
  },
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [36.99417391809042, -5.571896677242498],
      markerLatLng: [51.504, -0.159],

      trackedUsers: [],

      currentUser: {},
      currentMarkers: []
    };
  },
  // eslint-disable-next-line require-jsdoc
  created() {
    trackingService
      .getTrackList()
      .then(res => {
        this.trackedUsers = res;
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  },
  methods: {
    async getLocations(id) {
      const data = await locationService.getLocations(id);
      return data;
    },
    async showUserLocations(user) {
      const locations = await this.getLocations(user.id);
      this.currentUser = {
        ...user,
        locations
      };

      locations.forEach(location => {
        console.log("🚀 ~ file: Locations.vue:101 ~ showUserLocations ~ location:", location)

        
        const marker = L.marker([location.latitude, location.longitude]).addTo(this.map);
        this.currentMarkers.push(marker);

        // const circle = L.circle([location.latitude, location.longitude], {
        //   color: 'red',
        //   fillColor: '#f03',
        //   fillOpacity: 0.1,
        //   radius: location.accuracy
        // }).addTo(this.map);

        // this.currentMarkers.push(circle);
      });
    },
    hideUserLocations() {
      this.currentUser = {};
      this.currentMarkers.forEach(marker => this.map.removeLayer(marker));
    }

    // showRealTimeLocation() {
    //   // const trackingId = this.$cookies.get('trackingId');
    //   locationService.activeRealTimeLocation(trackingId, (location) => {
    //     console.log('location --------------------------------> ', location);
    //     this.updateMarker(location)
    //   });
    // },
    // updateMarker(location) {
    //   // this.markerLatLng = [location.latitude, location.longitude];
    // }
  }
};
</script>
<style lang="scss">
.content {
  display: flex;
  justify-content: center;
  // gap: 2rem;
  // margin: 2rem;
  align-items: center;
}

.map {
  min-width: 75vh;
  height: 100vh;
}

.list {
  min-width: 25vh;
  height: 100vh;
}

.card {
  border: 1px solid #000;
  border-radius: 10px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
