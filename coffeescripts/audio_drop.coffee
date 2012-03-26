class AudioLocation
  constructor: (map) ->
    @map = map
    console.log map
    @radius = 5 #in meters
    google.maps.event.addListener map, 'click', @audioLocationChanged
    
  audioLocationChanged: (event) =>
    console.log event.latLng
    @latLng = event.latLng
    if !@marker
      @marker = new google.maps.Marker
        map: @map
        title: 'Audio HotSpot'
        position: @latLng
    else
      @marker.setPosition event.latLng
    if !@circle
      @circle = new google.maps.Circle
        map: @map
        strokeColor: "#000000"
        strokeOpacity: 0.8
        fillColor: "#000000"
        fillOpacity: 0.35
        center: @latLng
        radius: @radius
    else
      @circle.setCenter(@latLng)


  setRadius: (newRadius) ->
    @radius = newRadius
    if @circle
      @circle.setRadius(@radius)

  zoneEntered: () ->
    alert "audio should play now"

  zoneExited: () ->
    alert "audio should stop maybe?"



window.AudioLocation = AudioLocation
