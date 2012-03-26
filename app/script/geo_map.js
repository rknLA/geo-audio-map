(function() {
  var GeoMap,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  GeoMap = (function() {

    function GeoMap(element_id) {
      this.updateCurrentLocation = __bind(this.updateCurrentLocation, this);      this.element = document.getElementById(element_id);
      this.options = {
        center: new google.maps.LatLng(34.0493444167395, -118.239059513545),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.element, this.options);
      this.followMe = false;
      this.markers = [];
    }

    GeoMap.prototype.showMeMarker = function(position) {
      if (!this.me_marker) {
        return this.me_marker = new google.maps.Marker({
          map: this.map,
          title: 'Current Location',
          position: position
        });
      }
    };

    GeoMap.prototype.updateCurrentLocation = function(location) {
      var latlng;
      latlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      if (!this.me_marker) {
        this.showMeMarker(latlng);
      } else {
        this.me_marker.setPosition(latlng);
      }
      if (this.followMe) return this.map.setCenter(latlng);
    };

    return GeoMap;

  })();

  window.GeoMap = GeoMap;

}).call(this);
