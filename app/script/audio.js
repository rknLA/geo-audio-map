(function() {

  $(document).ready(function() {
    var AudioPlayer;
    return AudioPlayer = (function() {

      function AudioPlayer(view) {
        this.view = view;
      }

      AudioPlayer.prototype.play = function() {
        if (this.buffer) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = this.buffer;
          this.source.connect(audioContext.destination);
          this.source.playbackRate.value = this.playbackRate;
          this.source.noteGrainOn(0, this.startAt || 0, (this.endAt - this.startAt) || this.buffer.duration);
          return this.triggerView();
        }
      };

      AudioPlayer.prototype.stop = function() {
        if (this.buffer && this.source) {
          this.source.noteOff(0);
          window.clearTimeout(this.timer);
          return this.view.lightOff;
        }
      };

      AudioPlayer.prototype.getPlaybackRate = function() {
        if (this.source) return this.source.playbackRate.value;
      };

      AudioPlayer.prototype.setPlaybackRate = function(rate) {
        if (this.source) {
          this.playbackRate = rate;
          return this.source.playbackRate.value = rate;
        }
      };

      AudioPlayer.prototype.computedDuration = function() {
        return (((this.endAt - this.startAt) || this.buffer.duration) / this.getPlaybackRate()) * 1000;
      };

      AudioPlayer.prototype.triggerView = function() {
        var timeOut;
        this.view.lightOff();
        this.view.lightOn();
        window.clearTimeout(this.timer);
        Display.draw(this);
        timeOut = this.computedDuration();
        return this.timer = window.setTimeout(this.view.lightOff, timeOut);
      };

      AudioPlayer.prototype.load_file = function(file) {
        var reader, self,
          _this = this;
        reader = new FileReader;
        self = this;
        reader.onload = function(event) {
          var onerror, onsuccess;
          onsuccess = function(buffer) {
            self.buffer = buffer;
            return Display.draw(self);
          };
          onerror = function() {
            return alert('Unsupported file format');
          };
          return audioContext.decodeAudioData(event.target.result, onsuccess, onerror);
        };
        return reader.readAsArrayBuffer(file);
      };

      return AudioPlayer;

    })();
  });

}).call(this);
