/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";



function main() {
  // Create root

  var root = am5.Root.new("chartdiv");


  // Set themes
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
  var chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoNaturalEarth1()
  }));

  // Create polygon series
  var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  }));

  // Create point series
  var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long"
  }));

  pointSeries.bullets.push(function () {
    var circle = am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      tooltipText: "{name}"
    });

    circle.events.on("click", function (ev) {
      alert("Clicked on " + ev.target.dataItem.dataContext.name)
    });

    return am5.Bullet.new(root, {
      sprite: circle
    });
  });

  pointSeries.data.setAll([{
    long: -73.778137,
    lat: 40.641312,
    name: "New York"
  }, {
    long: -0.454296,
    lat: 51.470020,
    name: "London"
  }, {
    long: 116.597504,
    lat: 40.072498,
    name: "Beijing"
  }]);
}


module.exports = main
