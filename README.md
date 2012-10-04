# Audio Map prototype


I built this project as a proof-of-concept during the design phases of [Made in LA Soundmap](http://itunes.apple.com/us/app/made-in-la-soundmap/id525895329) to experiment with how well web-apps handle geolocation and audio streaming.

The results were enlightening, but a bit of a let-down.  Our original goal was to do Soundmap as a web-app so that cross-platform compatibility wouldn't be an issue, but this prototype was enough to show us that what we wanted to do was not possible on mobile web at the time (March 2012).

The app structure is something I stole from stevegraham's [JPC2000](http://jpc.heroku.com/) [project](https://github.com/stevegraham/JPC2000).  It's an elegant little Sinatra server for static content, but it has guard hooks that allowed me to develop in haml, CoffeeScript, and SCSS.  Since it compiles using guard, I was able to drop the compiled files into a shared host without incurring any unreasonable costs.


The final result (or at least, the only result that mattered to us) lives at http://geo.rkn.la/audio.

## Running the App

Your best bet is to use Ruby 1.9, as I haven't tested things on earlier versions.
 * bundle install
 * ruby app.js
 * guard

You may also want to run guard in a separate tab to avoid cluttering the server logs with guard logs.

## MP3

To keep this repo's size down, I've removed the mp3 associated with the example.  Add your own mp3 file to the app/audio directory and update the src url of the audio tag in `haml/index.html.haml`


***

# The proof of concept test



## Goals

 * Trigger some form of audio control based on the user's location
 * Explore behavior of background audio in a web app.
 * Explore behavior of background geolocation in a web app.
 * Be flexible enough that the tester's location does not matter.

## Instructions

 1. Open the app's url in your mobile device's browser.
 2. Allow the website to access your location.
 3. Kick the audio engine (by tapping on the link).
 4. Tap on the map to drop the sound file's geo-fence.  
 5. Adjust the size of the geofence to be appropriate.  The best circumstances for testing are when the radius is large enough that you can reliably stay in it for a while, but small enough that you can cross the boundary a few times from your current location (yes, that means you must get up and walk around a bit).
 6. Enter the fence.  If you dropped the pin and fence to encompass you from the start, leave and then come back.

If you've done all of this correctly, you should hear a song start to play when you cross the fence, and her it turn off when you leave.


## Results


Note: we all had iPhones throughout this process, so that's what we tested on.  Things may be slightly different on other platforms.

The instructions above are enough to validate that using geolocation to trigger audio playback *is* possible in a web-app.  So, good, we satisfied the first goal.

The "tap the map to drop the fence" feature also satisfies our fourth goal, which is why you can play along at home while you're reaing this.

Once you have the audio playing, however, and you explore different use cases that involve handling these things in the background (i.e. when the phone is in the user's pocket or when the user is using a different app), the ineffectiveness of a web-app to meet our needs comes to light.

One thing I was surprised by is that Mobile Safari *does* support background audio playback.  You can see this for yourself by entering the fence, hearing the audio start, and then hitting the top button or the home button.  Hey, listen to that!  The audio is still playing!  Second goal 

But then you move around, you move far enough away to know for certain that you're no longer in the fence, and...  The audio keeps playing.

When you reopen the webpage and the location updates, the app finally realizes you're out of the fence and shuts off the audio.  Send the browser to the background again and re-enter the fenced area.  Notice anything?  Neither did we.  

What does this mean?  Just that web apps using geolocation don't get geolocation updates while they're in the background.  No big deal, really, unless what you're trying to do is use geolocation in the background to change audio... ;)


## Errata / Etc.


The css isn't really perfect, and the usability related to updating the map's center position is a little wonky, but I was focused purely on the goals.  In the context of the few hours I spend building this, once I had satisfied the research requirements, I let the project go and didn't worry about tidying it up.



