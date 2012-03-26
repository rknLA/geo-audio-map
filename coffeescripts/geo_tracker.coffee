class GeoTracker
  tracking: false

  constructor: () ->
    if window.navigator.geolocation
      @enabled = true
    else
      @enabled = false

    @_tracking_watch = 0
    @_user_success_callback = null
    @_user_err_callback = null
    @zones = {}
    @_current_zones = []

    
  current:
    lat: 34.0493444167395
    lng: -118.239059513545
    LatLng: () ->
      new google.maps.LatLng(@lat, @lng)

  _success_callback: (position) =>
    @current.lat = position.coords.latitude
    @current.lng = position.coords.longitude
    @_check_location_for_zones()
    if @user_success_callback
      @user_success_callback(position)

  _err_callback: (err) =>
    console.log "the geo watch errored"
    if @user_err_callback
      @user_err_callback(err)

  startTracking: (success_callback, err_callback) ->
    if !@enabled
      alert "Geolocation is not supported by your browser."
      return
    if @tracking
      console.log "Geolocation is already tracking. Can't start tracking twice!"
      return
    @user_success_callback = success_callback
    @user_err_callback = err_callback
    @_tracking_watch = navigator.geolocation.watchPosition @_success_callback, @_error_callback,
      enableHighAccuracy: true,
      maximumAge: 3000

    @tracking = true
    console.log "start tracking"

  stopTracking: () ->
    if !@enabled
      alert "Geolocation is not supported by your browser."
      return
    if !@tracking
      console.log "Geolocation is not tracking. Can't stop tracking if it hasn't been started."
      return
    navigator.geolocation.clearWatch(@_tracking_watch)
    @tracking = false
    console.log "stop tracking"

  _check_location_for_zones: () ->
    #get zones for current location
    nextZones = []
    currLatLng = new google.maps.LatLng(@current.lat, @current.lng)
    for zone, details of @zones
      distance_from_zone = google.maps.geometry.spherical.computeDistanceBetween(currLatLng, details.latLng)
      if distance_from_zone <= details.radius
        nextZones.push zone

    #compare current zones with zones for last location and call enter/exit callbacks as appropriate
    for zoneName in nextZones
      ix = @_current_zones.indexOf(zoneName)
      if ix > -1 #it's in the array
        @_current_zones.splice(ix, 1) #still in the zone. remove it from current zones so we don't call the exit callback later
      else
        @zones[zoneName].enterZoneCallback()

    for oldZone in @_current_zones
      @zones[oldZone].exitZoneCallback()

    @_current_zones = nextZones


  addZone: (name, latLng, radius, enterZoneCallback, exitZoneCallback) ->
    if @zones[name]
      console.log "couldn't add zone, existing zone with same name already exists"
      return
    @zones[name] =
      latLng: latLng
      radius: radius
      enterZoneCallback: enterZoneCallback
      exitZoneCallback: exitZoneCallback

  changeZone: (name, newLatLng, newRadius, newEnterZoneCallback, newExitZoneCallback) ->
    @zones[name] =
      latLng: newLatLng
      radius: newRadius
      enterZoneCallback: newEnterZoneCallback
      exitZoneCallback: newExitZoneCallback

  deleteZone: (name) ->
    if @zones[name]
      delete @zones[name]
    else
      console.log "couldn't delete zone " + name
      



window.GeoTracker = GeoTracker

