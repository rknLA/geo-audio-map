class AudioLocation
  constructor: (map, tracker) ->
    @map = map
    @tracker = tracker
    @radius = 5 #in meters
    google.maps.event.addListener map, 'click', @audioLocationChanged
    
  audioLocationChanged: (event) =>
    @latLng = event.latLng
    if !@marker #first click, add zone
      @marker = new google.maps.Marker
        map: @map
        title: 'Audio HotSpot'
        position: @latLng
      @tracker.addZone "audio", @latLng, @radius, @zoneEntered, @zoneExited
    else
      @marker.setPosition event.latLng
      @tracker.changeZone "audio", @latLng, @radius, @zoneEntered, @zoneExited
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
