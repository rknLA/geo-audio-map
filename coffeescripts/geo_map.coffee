class GeoMap
  constructor: (element_id) ->
    @element = document.getElementById(element_id)
    @options = #defaults
      center: new google.maps.LatLng(34.0493444167395, -118.239059513545)
      zoom: 12
      mapTypeId: google.maps.MapTypeId.ROADMAP
    @map = new google.maps.Map @element, @options
    @followMe = false

  showMeMarker: (position) ->
    if !@me_marker
      @me_marker = new google.maps.Marker
        map: @map
        title: 'Current Location'
        position: position

  updateCurrentLocation: (location) =>
    latlng = new google.maps.LatLng location.coords.latitude, location.coords.longitude
    if !@me_marker
      @showMeMarker(latlng)
    else
      @me_marker.setPosition(latlng)
    if @followMe
      @map.setCenter(latlng)


window.GeoMap = GeoMap



