
const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

/**
 * Lookup the latitude and longitude for a given address.
 * @param {string} address Any address that Google understands.
 *   For example: 'Central Park, NYC' works fine.
 * @return {Promise<Object>} Fetch promise object.
 */
export default function geocode(address) {
  return fetch(URL + address).then(res => res.json());
}
