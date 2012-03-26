(function() {
  var initialize_map;

  initialize_map = function() {
    window.tracker = new GeoTracker();
    window.map = new GeoMap('map_canvas');
    window.map.followMe = true;
    return window.tracker.startTracking(window.map.updateCurrentLocation);
  };

  window.initialize_map = initialize_map;

}).call(this);
