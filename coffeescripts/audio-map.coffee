initialize_map = () ->
  window.tracker = new GeoTracker()
  window.map = new GeoMap('map_canvas')
  
  window.map.followMe = true
  window.tracker.startTracking(window.map.updateCurrentLocation)


window.initialize_map = initialize_map




  
