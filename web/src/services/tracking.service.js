import axios from 'axios';

const connection = axios.create({
  baseURL: `${process.env.VUE_APP_LOCATION_SERVER}/track`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  /**
   * newTracking
   * @param {String} name user name
   * @returns {Promise} http promise
   */
  newTracking(name) {
    return connection.post('', { name }).then(res => res.data);
  },
  /**
   * getTrackList
   * @returns {Promise} http promise
   */
  getTrackList() {
    return connection.get('').then(res => res.data);
  },
  /**
   * disableTracking
   * @param {String} id trackingId
   */
  disableTracking(id) {
    return connection.delete(`/${id}`).then(res => res.data);
  }
};
