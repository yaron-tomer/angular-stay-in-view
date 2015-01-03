angular-stay-in-view
====================

Prevent an element to scroll out of view by fixing them to the top of the page when they do.
For example, suppose you have a search on the page, and you want to make sure it will not scroll out of view.  To do this, 
you only need to add the stay-in-view attribute directive.  If scrolled out of view, it will fix the search to the top of the screen.

Here are two examples
   <div class="search" stay-in-view="search-fixed">  <!-- this will stay in view when scrolling using the search-fixed css class-->
   </div>
 
   <div class="feedback" stay-in-view>  <!-- this wil stay in view when scrolling using a built in default class -->
   </div>
   
   See the Example for a complete demo


