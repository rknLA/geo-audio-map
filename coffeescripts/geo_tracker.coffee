class GeoTracker
  tracking: false

  constructor: () ->
    if window.navigator.geolocation
      @enabled = true
    else
      @enabled = false
    
  current:
    lat: 34.0493444167395
    lng: -118.239059513545
    LatLng: () ->
      new google.maps.LatLng(@lat, @lng)

  _tracking_watch: 0
  _user_success_callback: null
  _user_err_callback: null

  _success_callback: (position) =>
    @current.lat = position.coords.latitude
    @current.lng = position.coords.longitude
    console.log "position updated"
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


window.GeoTracker = GeoTracker

