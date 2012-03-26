initialize_map = () ->
  window.tracker = new GeoTracker()
  window.map = new GeoMap('map_canvas')
  
  window.map.followMe = true
  window.tracker.startTracking(window.map.updateCurrentLocation)

  window.sound_spot = new AudioLocation(window.map.map, window.tracker)

window.initialize_map = initialize_map

jQuery ->
  $('#radius').change (event) ->
    console.log event.currentTarget.value
    window.sound_spot.setRadius parseInt(event.currentTarget.value)
  setTimeout () ->
    window.scrollTo(0,10)
  , 10
  document.getElementById('example_sound').addEventListener 'oncanplaythrough', () ->
      $('#audio_status').text('Audio is done bufferring now!')





  
