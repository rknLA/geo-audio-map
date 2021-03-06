(function() {
  var GeoTracker,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  GeoTracker = (function() {

    GeoTracker.prototype.tracking = false;

    function GeoTracker() {
      this._err_callback = __bind(this._err_callback, this);
      this._success_callback = __bind(this._success_callback, this);      if (window.navigator.geolocation) {
        this.enabled = true;
      } else {
        this.enabled = false;
      }
      this._tracking_watch = 0;
      this._user_success_callback = null;
      this._user_err_callback = null;
      this.zones = {};
      this._current_zones = [];
    }

    GeoTracker.prototype.current = {
      lat: 34.0493444167395,
      lng: -118.239059513545,
      LatLng: function() {
        return new google.maps.LatLng(this.lat, this.lng);
      }
    };

    GeoTracker.prototype._success_callback = function(position) {
      this.current.lat = position.coords.latitude;
      this.current.lng = position.coords.longitude;
      this._check_location_for_zones();
      if (this.user_success_callback) return this.user_success_callback(position);
    };

    GeoTracker.prototype._err_callback = function(err) {
      console.log("the geo watch errored");
      if (this.user_err_callback) return this.user_err_callback(err);
    };

    GeoTracker.prototype.startTracking = function(success_callback, err_callback) {
      if (!this.enabled) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      if (this.tracking) {
        console.log("Geolocation is already tracking. Can't start tracking twice!");
        return;
      }
      this.user_success_callback = success_callback;
      this.user_err_callback = err_callback;
      this._tracking_watch = navigator.geolocation.watchPosition(this._success_callback, this._error_callback, {
        enableHighAccuracy: true,
        maximumAge: 3000
      });
      this.tracking = true;
      return console.log("start tracking");
    };

    GeoTracker.prototype.stopTracking = function() {
      if (!this.enabled) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      if (!this.tracking) {
        console.log("Geolocation is not tracking. Can't stop tracking if it hasn't been started.");
        return;
      }
      navigator.geolocation.clearWatch(this._tracking_watch);
      this.tracking = false;
      return console.log("stop tracking");
    };

    GeoTracker.prototype._check_location_for_zones = function() {
      var currLatLng, details, distance_from_zone, ix, nextZones, oldZone, zone, zoneName, _i, _j, _len, _len2, _ref, _ref2;
      nextZones = [];
      currLatLng = new google.maps.LatLng(this.current.lat, this.current.lng);
      _ref = this.zones;
      for (zone in _ref) {
        details = _ref[zone];
        distance_from_zone = google.maps.geometry.spherical.computeDistanceBetween(currLatLng, details.latLng);
        if (distance_from_zone <= details.radius) nextZones.push(zone);
      }
      for (_i = 0, _len = nextZones.length; _i < _len; _i++) {
        zoneName = nextZones[_i];
        ix = this._current_zones.indexOf(zoneName);
        if (ix > -1) {
          this._current_zones.splice(ix, 1);
        } else {
          this.zones[zoneName].enterZoneCallback();
        }
      }
      _ref2 = this._current_zones;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        oldZone = _ref2[_j];
        this.zones[oldZone].exitZoneCallback();
      }
      return this._current_zones = nextZones;
    };

    GeoTracker.prototype.addZone = function(name, latLng, radius, enterZoneCallback, exitZoneCallback) {
      if (this.zones[name]) {
        console.log("couldn't add zone, existing zone with same name already exists");
        return;
      }
      return this.zones[name] = {
        latLng: latLng,
        radius: radius,
        enterZoneCallback: enterZoneCallback,
        exitZoneCallback: exitZoneCallback
      };
    };

    GeoTracker.prototype.changeZone = function(name, newLatLng, newRadius, newEnterZoneCallback, newExitZoneCallback) {
      return this.zones[name] = {
        latLng: newLatLng,
        radius: newRadius,
        enterZoneCallback: newEnterZoneCallback,
        exitZoneCallback: newExitZoneCallback
      };
    };

    GeoTracker.prototype.deleteZone = function(name) {
      if (this.zones[name]) {
        return delete this.zones[name];
      } else {
        return console.log("couldn't delete zone " + name);
      }
    };

    return GeoTracker;

  })();

  window.GeoTracker = GeoTracker;

}).call(this);
