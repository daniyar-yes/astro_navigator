# astro_navigator
Attempt to make navigating in astronomical sky night maps easier.

The web application should make navigating in sky map easier.
It should have the following features.

<ul>
  <li>The next main astronomical event with the countdown until it. The list should contain top 10 astro events of the year, and allow user to choose the event.
  <li>Weather informer that focuses on visibility conditions: air visibility, clouds, rain etc.
  <li>Take the geo-location and current time of user and calculate the position on sky objects for given user: <a href="http://spiff.rit.edu/classes/phys373/lectures/radec/radec.html">Full article on how to calculate the altitude and azimuth of a sky object, knowing the RA and Dec and time of the observer, and the location</a>
  <li>Based on the visibilty of the sky night object, the app should show only visible ones. The objects with altitude below 0 degrees (below the horizon) should be hidden.
  <li>Sky objects should be split into Planets and Constellations. Each category should have a preview on main page, including Alt and Azim. And a detailed page, including all objects and some info about how to find them.
   
    
</ul>
