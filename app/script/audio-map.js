(function() {
  var initialize_map;

  initialize_map = function() {
    window.tracker = new GeoTracker();
    window.map = new GeoMap('map_canvas');
    window.map.followMe = true;
    window.tracker.startTracking(window.map.updateCurrentLocation);
    return window.sound_spot = new AudioLocation(window.map.map, window.tracker);
  };

  window.initialize_map = initialize_map;

  jQuery(function() {
    $('#radius').change(function(event) {
      console.log(event.currentTarget.value);
      return window.sound_spot.setRadius(parseInt(event.currentTarget.value));
    });
    setTimeout(function() {
      return window.scrollTo(0, 10);
    }, 10);
    document.getElementById('example_sound').addEventListener('oncanplaythrough', function() {
      return $('#audio_status').text('Audio is done bufferring now!');
    });
    return $('#play_audio').click(function(event) {
      return document.getElementById('example_sound').load();
    });
  });

}).call(this);
