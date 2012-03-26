(function() {
  var AudioLocation,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  AudioLocation = (function() {

    function AudioLocation(map) {
      this.audioLocationChanged = __bind(this.audioLocationChanged, this);      this.map = map;
      console.log(map);
      google.maps.event.addListener(map, 'click', this.audioLocationChanged);
    }

    AudioLocation.prototype.audioLocationChanged = function(event) {
      console.log(event.latLng);
      this.latLng = event.latLng;
      if (!this.marker) {
        return this.marker = new google.maps.Marker({
          map: this.map,
          title: 'Audio HotSpot',
          position: event.latLng
        });
      } else {
        return this.marker.setPosition(event.latLng);
      }
    };

    return AudioLocation;

  })();

  window.AudioLocation = AudioLocation;

}).call(this);
