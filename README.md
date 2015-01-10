angular-stay-in-view
====================

Prevent an element to scroll out of view by fixing them to the top of the page when they do.
For example, suppose you have a search on the page, and you want to make sure it will not scroll out of view.  To do this, 
you only need to add the stay-in-view attribute directive.  If scrolled out of view, it will fix the search to the top of the screen.

Here are two examples: <br><br>
   &lt;div class="search" stay-in-view="search-fixed"&gt;  <!-- this will stay in view when scrolling using the search-fixed css class--> <br/>
   &lt;/div&gt;
 
   &lt;div class="feedback" stay-in-view&gt;  <!-- this wil stay in view when scrolling using a built in default class --><br/>
   &lt;/div&gt;
   
   See the Example for a complete demo


