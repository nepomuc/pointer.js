# Pointer.js
A JavaScript library for making a cool pointer

## Install Guide
>_Note: You need to import both js and css files._

1. Import 'pointer.js', like so:

	```html
	<script src="path_to_js/pointer.js"></script>
	```
1. Do the same for the css:
		
	```html
	<link href="path_to_css/pointer.css" rel="stylesheet">
	```
1. Finally add this javascript code to customize your pointer:
		
	```javascript
	init_pointer({
	    pointerColor: "#117197", // Css color
	    pointerFollowStiffness: .4, // From 0 to 1
	    pointerSize: 6, // Pixels
	    pointerBoxShadow: "0px 0px 0px 1px white",
	    ringInsideSize: 20, // Pixels
	    ringInsideColor: "transparent",
	    ringInsideSizeClick: 5, // Pixels when clicking
	    ringOutlineSize: 3, // Pixels
	    ringOutlineColor: "#117197",
	    ringBoxShadow: "0px 0px 0px 1px white",
	})
	```
		
You should now have something like the example in `/index.html`.
