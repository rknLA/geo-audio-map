class AudioLocation
  constructor: (map) ->
    @map = map
    console.log map
    google.maps.event.addListener map, 'click', @audioLocationChanged
    
  audioLocationChanged: (event) =>
    console.log event.latLng
    @latLng = event.latLng
    if !@marker
      @marker = new google.maps.Marker
        map: @map
        title: 'Audio HotSpot'
        position: event.latLng
    else
      @marker.setPosition event.latLng


window.AudioLocation = AudioLocation
