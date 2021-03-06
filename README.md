# points-to-line-strings
Converts points to GeoJSON LineStrings.

## Install

`npm install -g points-to-line-strings`

## Usage

Given the following csv:

```txt
name,hour,lat,lon
alpha,0,17.2,-50.5
alpha,6,16.6,-51.5
beta,0,17.2,-50.4
beta,6,17.0,-51.5
```

running this command:

`cat sample.csv | points-to-line-strings -g name`

will output this:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -50.5,
            17.2
          ],
          [
            -51.5,
            16.6
          ]
        ]
      },
      "properties": {
        "name": "alpha"
      }
    },
    {
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -50.4,
            17.2
          ],
          [
            -51.5,
            17
          ]
        ]
      },
      "properties": {
        "name": "beta"
      }
    }
  ]
}
```
