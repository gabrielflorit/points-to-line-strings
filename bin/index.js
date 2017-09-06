#! /usr/bin/env node

const dsv = require('d3-dsv')
const getStdin = require('get-stdin')
const _ = require('lodash')

const argv = require('yargs')
  .usage('Converts points to GeoJSON LineStrings.\nUsage: $0 <command>')

  .describe('g', 'Grouping column')
  .alias('g', 'group')

  .help('h')
  .alias('h', 'help')

  .demand(['g'])
  .argv

getStdin()
  .then(str => {

    const { group } = argv

    const features = _(dsv.csvParse(str))
      .groupBy(group)
      .map(value => ({
        geometry: {
          type: 'LineString',
          coordinates: value.map(d => ([+d.lon, +d.lat])),
        },
        properties: {
          [group]: value[0][group],
        },
      }))
      .value()

    const geojson = {
      type: 'FeatureCollection',
      features,
    }

    console.log(JSON.stringify(geojson, null, 2))

  })
  .catch(e => {
    console.error(e)
  })
