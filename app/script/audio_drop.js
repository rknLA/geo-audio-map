(function() {
  var AudioLocation,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  AudioLocation = (function() {

    function AudioLocation(map, tracker) {
      this.zoneExited = __bind(this.zoneExited, this);
      this.zoneEntered = __bind(this.zoneEntered, this);
      this.audioLocationChanged = __bind(this.audioLocationChanged, this);      this.map = map;
      this.tracker = tracker;
      this.radius = 5;
      google.maps.event.addListener(map, 'click', this.audioLocationChanged);
      this.sound = document.getElementById('example_sound');
    }

    AudioLocation.prototype.audioLocationChanged = function(event) {
      this.latLng = event.latLng;
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          map: this.map,
          title: 'Audio HotSpot',
          position: this.latLng
        });
        this.tracker.addZone("audio", this.latLng, this.radius, this.zoneEntered, this.zoneExited);
      } else {
        this.marker.setPosition(event.latLng);
        this.tracker.changeZone("audio", this.latLng, this.radius, this.zoneEntered, this.zoneExited);
      }
      if (!this.circle) {
        return this.circle = new google.maps.Circle({
          map: this.map,
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          fillColor: "#000000",
          fillOpacity: 0.35,
          center: this.latLng,
          radius: this.radius
        });
      } else {
        return this.circle.setCenter(this.latLng);
      }
    };

    AudioLocation.prototype.setRadius = function(newRadius) {
      this.radius = newRadius;
      if (this.circle) return this.circle.setRadius(this.radius);
    };

    AudioLocation.prototype.zoneEntered = function() {
      return this.sound.play();
    };

    AudioLocation.prototype.zoneExited = function() {
      return this.sound.pause();
    };

    return AudioLocation;

  })();

  window.AudioLocation = AudioLocation;

}).call(this);
