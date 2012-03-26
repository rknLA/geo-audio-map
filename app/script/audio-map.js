(function() {
  var initialize_map;

  initialize_map = function() {
    window.tracker = new GeoTracker();
    window.map = new GeoMap('map_canvas');
    window.map.followMe = true;
    window.tracker.startTracking(window.map.updateCurrentLocation);
    return window.sound_spot = new AudioLocation(window.map.map);
  };

  window.initialize_map = initialize_map;

}).call(this);
