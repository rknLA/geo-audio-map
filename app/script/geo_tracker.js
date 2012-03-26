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
    }

    GeoTracker.prototype.current = {
      lat: 34.0493444167395,
      lng: -118.239059513545,
      LatLng: function() {
        return new google.maps.LatLng(this.lat, this.lng);
      }
    };

    GeoTracker.prototype._tracking_watch = 0;

    GeoTracker.prototype._user_success_callback = null;

    GeoTracker.prototype._user_err_callback = null;

    GeoTracker.prototype._success_callback = function(position) {
      this.current.lat = position.coords.latitude;
      this.current.lng = position.coords.longitude;
      console.log("position updated");
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

    return GeoTracker;

  })();

  window.GeoTracker = GeoTracker;

}).call(this);
