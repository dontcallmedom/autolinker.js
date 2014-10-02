/*global define, module */
/*jshint undef:true, smarttabs:true */
// Set up Autolinker appropriately for the environment.
( function( root, factory ) {
    if( typeof define === 'function' && define.amd ) {
	define( factory );             // Define as AMD module if an AMD loader is present (ex: RequireJS).
    } else if( typeof exports !== 'undefined' ) {
	module.exports = factory();    // Define as CommonJS module for Node.js, if available.
    } else {
	root.Autolinker = factory();   // Finally, define as a browser global if no module loader.
    }
}( this, function() {
    var Autolinker = function(cfg) {
	cfg = cfg || {};

	// Assign the properties of `cfg` onto the Autolinker instance
	for( var prop in cfg )
	    if( cfg.hasOwnProperty( prop ) ) this[ prop ] = cfg[ prop ];
    };

    Autolinker.prototype = {
	constructor: Autolinker,  // fix constructor property
    };

    function createLink(url, attributes) {
        var link = document.createElement("a");
        link.href = url;
        link.appendChild(document.createTextNode(url));
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr) && attr!=="href") link.setAttribute(attr, attributes[attr]);
        }
        return link;
    }

    Autolinker.prototype.linkify = function(el) {
        // from https://github.com/bryanwoods/autolink-js/blob/master/autolink.js
        var pattern = /(^|[\s\n\.,])((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
        var skipTags = ["A","TEXTAREA","SCRIPT","STYLE"];
        if (skipTags.indexOf(el.tagName) !== -1)
            return;
        for (var i = 0; i < el.childNodes.length; i++) {
            var node = el.childNodes[i];
            switch(node.nodeType) {
                case Node.ELEMENT_NODE:
                if (skipTags.indexOf(node.tagName) === -1) {
                    this.linkify(node);
                }
                break;
                case Node.TEXT_NODE:
                var parent = node.parentNode;
                var comp = node.textContent.split(pattern);
                var newNode;
                for (var j = 0; j <comp.length; j++) {
                    // every 3 components is an URL
                    if (j % 3 === 2) {
                        newNode = createLink(comp[j], this.attributes);
                    } else {
                        newNode = document.createTextNode(comp[j]);
                    }
                    parent.insertBefore(newNode, node);
                }
                parent.removeChild(node);
                break;
            }
        }
    };

    return Autolinker;
})
);