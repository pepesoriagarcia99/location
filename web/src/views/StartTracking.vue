<template>
  <div>
    <h1>Tracking</h1>
    <input type="text" placeholder="Name" v-model="userName" />
    <button :disabled="!userName" @click="submit()">
      Submit
    </button>
  </div>
</template>

<script>
import trackingService from '@/services/tracking.service';
import locationService from '@/services/location.service';

export default {
  name : 'StartTracking',
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      userName : ''
    };
  },
  methods : {
    /**
     * Submit
     */
    submit() {
      trackingService
        .newTracking(this.userName)
        .then(res => {
          locationService.startTracking(res.id);

          this.$store.commit('user/trackUser', { id : res.id, name : this.userName });

          this.$cookies.set('trackingId', res.id);

          this.$router.push('/tracked');
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }
};
</script>
<style lang="scss"></style>
