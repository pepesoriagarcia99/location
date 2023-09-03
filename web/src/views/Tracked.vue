<template>
  <div>
    <h5>you have active tracking</h5>
    <button @click="disableTracking()">disable tracking</button>
  </div>
</template>
<script>
import trackingService from '@/services/tracking.service';
import locationService from '@/services/location.service';

export default {
  name: 'Tracked',
  // eslint-disable-next-line require-jsdoc
  created() {
    const trackingId = this.$cookies.get('trackingId');
    if (trackingId) {
      locationService.startTracking(trackingId);
    }
  },
  methods: {
    /**
     * disableTracking
     */
    disableTracking() {
      const trackingId = this.$cookies.get('trackingId');

      trackingService
        .disableTracking(trackingId)
        .then(() => {
          this.$cookies.remove('trackingId');

          locationService.stopInterval();

          this.$router.push('/tracking');
        })
        .catch(console.error);
    }
  }
};
</script>
<style lang="scss"></style>
