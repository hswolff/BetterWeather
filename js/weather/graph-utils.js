import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
  scale,
  shape,
};

/**
 * Create an x-scale.
 * @param {number} start Start time in seconds.
 * @param {number} end End time in seconds.
 * @param {number} width Width to create the scale with.
 * @return {Function} D3 scale instance.
 */
function createScaleX(start, end, width) {
  return d3.scale.scaleTime()
    .domain([new Date(start * 1000), new Date(end * 1000)])
    .range([0, width]);
}

/**
 * Create a y-scale.
 * @param {number} minY Minimum y value to use in our domain.
 * @param {number} maxY Maximum y value to use in our domain.
 * @param {number} height Height for our scale's range.
 * @return {Function} D3 scale instance.
 */
function createScaleY(minY, maxY, height) {
  return d3.scale.scaleLinear()
    .domain([minY, maxY]).nice()
    // We invert our range so it outputs using the axis that React uses.
    .range([height, 0]);
}

/**
 * Creates a line graph SVG path that we can then use to render in our
 * React Native application with ART.
 * @param {Array.<Object>} options.data Array of data we'll use to create
 *   our graphs from.
 * @param {function} xAccessor Function to access the x value from our data.
 * @param {function} yAccessor Function to access the y value from our data.
 * @param {number} width Width our graph will render to.
 * @param {number} height Height our graph will render to.
 * @return {Object} Object with data needed to render.
 */
export function createLineGraph({
  data,
  xAccessor,
  yAccessor,
  width,
  height,
}) {
  const lastDatum = data[data.length - 1];

  const scaleX = createScaleX(
    data[0].time,
    lastDatum.time,
    width
  );

  // Collect all y values.
  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum));
    return all;
  }, []);
  // Get the min and max y value.
  const extentY = d3Array.extent(allYValues);
  const scaleY = createScaleY(extentY[0], extentY[1], height);

  const lineShape = d3.shape.line()
    .x(d => scaleX(xAccessor(d)))
    .y(d => scaleY(yAccessor(d)));

  return {
    data,
    scale: {
      x: scaleX,
      y: scaleY,
    },
    path: lineShape(data),
    ticks: data.map((datum) => {
      const time = xAccessor(datum);
      const value = yAccessor(datum);

      return {
        x: scaleX(time),
        y: scaleY(value),
        datum,
      };
    }),
  };
}
