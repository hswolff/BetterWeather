import queryString from 'query-string';

let apiKey = '';

/**
 * Simple wrapper to make requests to the forecast.io api.
 * Full details found here https://developer.forecast.io/docs/v2.
 * @param {string} lat Latitude.
 * @param {string} long Longitude.
 * @param {string} time Optional. Give a timestamp to make a forecast.io
 *   time machine call.
 * @param {object} options Additional objects the forecast.io api supports.
 * @return {Promise<Object>} Promise request object which resolves to the
 *   JSON value.
 */
export default function forecastio(lat, long, time, options) {
  if (apiKey == null) {
    throw new Error('forecast.io does not have an API_KEY set.');
  }

  let url = `https://api.forecast.io/forecast/${apiKey}/${lat},${long}`;

  if (typeof time === 'object') {
    // eslint-disable-next-line no-param-reassign
    options = time;
  }

  if (time != null) {
    url += `,${time}`;
  }

  url += queryString.stringify(options);

  return fetch(url).then(res => res.json());
}

/**
 * Initialize this wrapper with your apikey.
 * @param {string} newApiKey New api key.
 */
forecastio.initialize = (newApiKey) => {
  apiKey = newApiKey;
};
