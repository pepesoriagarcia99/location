import axios from 'axios';
import Vue from 'vue';

const connection = axios.create({
  baseURL: `${process.env.VUE_APP_LOCATION_SERVER}/location`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// const INTERVAL = null;

export default {
  interval: null,
  webSocket: null,
  /**
   * startTracking
   * @param {String} trackingId trackingId
   */
  startTracking(trackingId) {
    if (!this.interval) {
      this.interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.newLocation(trackingId, {
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed
            });
          },
          err => {
            console.error(err);
          },
          { enableHighAccuracy: true }
        );
      }, 10000);
    }
  },
  /**
   * stopInterval
   */
  stopInterval() {
    clearInterval(this.interval);
    this.interval = null;
  },
  /**
   * newLocation
   * @param {String} trackingId trackingId
   * @param {Object} location location
   */
  newLocation(trackingId, location) {
    connection.post(`/${trackingId}`, location)
      .then(res => res.data)
      .catch(err => {
        if (err.response.status === 400) {
          window.clearInterval(this.interval);
          Vue.$cookies.remove('trackingId');
        }
      });
  },
  /**
   * newLocation
   * @param {String} trackingId trackingId
   * @param {Object} location location
   */
  getLocations(trackingId) {
    return connection.get(`/${trackingId}`).then(res => res.data);
  },
  /**
   * activeRealTimeLocation
   * @param {String} id id
   * @param {Function} callback callback
   */
  activeRealTimeLocation(id, callback) {
    this.webSocket = new WebSocket(`ws://localhost:3000/location/${id}`);
    this.webSocket.onopen = () => {
      console.log('Real time open');
    }
    this.webSocket.onopen = (event) => callback(event.data);
  },
  /**
  * desactiveRealTimeLocation
   */
  desactiveRealTimeLocation() {
    this.webSocket.close();
  }
}
