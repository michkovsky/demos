dojo.provide("demos.cropper.src");

dojo.require("demos.cropper.src.Preview");
dojo.require("dojox.analytics.Urchin");

// remove to disable json/paging
// dojo . require("demos.cropper.src.nav"); 

;(function(d, $){
	
	d.addOnLoad(function(){
		
		// basic loading indicator code:
		var loadIndicator = d.byId("loader"),
			hide = d.fadeOut({ node: loadIndicator }),
			show = d.fadeIn({ node: loadIndicator })
		;
		
		// create a default instance of this:
		var preview = new image.Preview({
			// hide the loader after each img onload:
			imageReady: d.hitch(hide, "play"),
			hoverable:true
		}, "me");
		// or if no ref needed: $("#me").preview();
		
		// setup the clicking for the thumbnails
		$("#picker").onclick(function(e){
			e.preventDefault();
			
			// it's the link or the img
			var et = e.target,
				src = et.parentNode.href || et.href;
			
			console.log(et, src);
			
			if(src && preview.image.src != src){
				// show the loader after each click
				show.play();
				// when we have a src to load, set both images
				preview.domNode.src = src;
				preview.image.src = src; 
				// update the title text:
			//	d.byId("titleText").innerHTML = preview.image.alt = et.alt;
			}
			
		});
		
		// hook up the nav.js link in footer text:
		var c = d.connect(dojo.byId("navjs"), "onclick", function(e){
			d.disconnect(c); // only do this one time
			dojo["require"]("demos.cropper.src.nav"); // special syntax to trick build system
		})
				
		// shortly after onLoad, track the page (prevent UI blocking)
		new dojox.analytics.Urchin({ 
			acct: "UA-3572741-1", 
			GAonLoad: function(){
				this.trackPageView("/demos/cropper");
			}
		});	
				
	});
	
		
})(dojo, dojo.query);

