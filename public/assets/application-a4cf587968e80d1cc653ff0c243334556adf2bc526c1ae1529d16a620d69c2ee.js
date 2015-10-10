/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
var countries = [["Afghanistan","AFG"],["Aland lslands","ALA"],["Albania","ALB"],["Algeria","DZA"],["American Samoa","ASM"],["Andorra","AND"],["Angola","AGO"],["Anguilla","AIA"],["Antarctica","ATA"],["Antigua and Barbuda","ATG"],["Argentina","ARG"],["Armenia","ARM"],["Aruba","ABW"],["Ascension Island","ASC"],["Australia","AUS"],["Austria","AUT"],["Azerbaijan","AZE"],["Bahamas","BHS"],["Bahrain","BHR"],["Bangladesh","BGD"],["Barbados","BRB"],["Belgium","BEL"],["Belize","BLZ"],["Benin","BEN"],["Bermuda","BMU"],["Bhutan","BTN"],["Bolivia","BOL"],["Bosnia and Herzegovina","BIH"],["Botswana","BWA"],["Bouvet Island","BVT"],["Brazil","BRA"],["British Indian Ocean Territory","IOT"],["Brunei","BRN"],["Bulgaria","BGR"],["Burkina Faso","BFA"],["Burundi","BDI"],["Cambodia","KHM"],["Cameroon","CMR"],["Canada","CAN"],["Cape Verde","CPV"],["Cayman Islands","CYM"],["Central African Republic","CAF"],["Chad","TCD"],["Chile","CHL"],["China","1"],["Christmas Island","CXR"],["Cocos(Keeling)Islands","CCK"],["Colombia","COL"],["Comoros","COM"],["Congo","COG"],["Congo(DRC)","COD"],["Cook Islands","COK"],["Costa Rica","CRI"],["Cote d'Ivoire","CIV"],["Croatia","HRV"],["Cuba","CUB"],["Cyprus","CYP"],["Czech Republic","CZE"],["Denmark","DNK"],["Djibouti","DJI"],["Dominica","DMA"],["Dominican Republic","DOM"],["Ecuador","ECU"],["Egypt","EGY"],["El Salvador","SLV"],["Eritrea","ERI"],["Estonia","EST"],["Ethiopia","ETH"],["Falkland Islands","FLK"],["Faroe Islands","FRO"],["Fiji Islands","FJI"],["Finland","FIN"],["France","FRA"],["Frech Polynesia","PYF"],["French Guiana","GUF"],["French Southern and Antarctic Lands","ATF"],["Gabon","GAB"],["Gambia","GMB"],["Georgia","GEO"],["Germany","DEU"],["Ghana","GHA"],["Gibraltar","GIB"],["Greece","GRC"],["Greenland","GRL"],["Grenada","GRD"],["Guadeloupe","GLP"],["Guam","GUM"],["Guatemala","GTM"],["Guernsey","GGY"],["Guinea","GIN"],["Guinea-Bissau","GNB"],["Guyana","GUY"],["Haiti","HTI"],["Heard Island and McDonald Islands","HMD"],["Honduras","HND"],["Hungary","HUN"],["Iceland","ISL"],["India","IND"],["Indonesia","IDN"],["Iran","IRN"],["Iraq","IRQ"],["Ireland","IRL"],["Isle of Man","IMN"],["Israel","ISR"],["Italy","ITA"],["Jamaica","JAM"],["Japan","JPN"],["Jersey","JEY"],["Jordan","JOR"],["Kazakhstan","KAZ"],["Kenya","KEN"],["Kiribati","KIR"],["Korea","KOR"],["Kuwait","KWT"],["Kyrgyzstan","KGZ"],["Laos","LAO"],["Latvia","LVA"],["Lebanon","LBN"],["Lesotho","LSO"],["Liberia","LBR"],["Libya","LBY"],["Liechtenstein","LIE"],["Lithuania","LTU"],["Luxembourg","LUX"],["Macedonia,Former Yugoslav Republic of","MKD"],["Madagascar","MDG"],["Malawi","MWI"],["Malaysia","MYS"],["Maldives","MDV"],["Mali","MLI"],["Malta","MLT"],["Marshall Islands","MHL"],["Martinique","MTQ"],["Mauritania","MRT"],["Mauritius","MUS"],["Mayotte","MYT"],["Mexico","MEX"],["Micronesia","FSM"],["Moldova","MDA"],["Monaco","MCO"],["Mongolia","MNG"],["Montserrat","MSR"],["Morocco","MAR"],["Mozambique","MOZ"],["Myanmar","MMR"],["Namibia","NAM"],["Nauru","NRU"],["Nepal","NPL"],["Netherlands","NLD"],["Netherlands Antilles","ANT"],["New Caledonia","NCL"],["New Zealand","NZL"],["Nicaragua","NIC"],["Niger","NER"],["Nigeria","NGA"],["Niue","NIU"],["Norfolk Island","NFK"],["North Korea","PRK"],["Northern Mariana Islands","MNP"],["Norway","NOR"],["Oman","OMN"],["Pakistan","PAK"],["Palau","PLW"],["Palestinian Authority","PSE"],["Panama","PAN"],["Papua New Guinea","PNG"],["Paraguay","PRY"],["Peru","PER"],["Philippines","PHL"],["Pitcairn Islands","PCN"],["Poland","POL"],["Portugal","PRT"],["Puerto Rico","PRI"],["Qatar","QAT"],["Reunion","REU"],["Romania","ROU"],["Russia","RUS"],["Rwanda","RWA"],["Samoa","WSM"],["San Marino","SMR"],["Sao Tome and Principe","STP"],["Saudi Arabia","SAU"],["Senegal","SEN"],["Serbia,Montenegro","SCG"],["Seychelles","SYC"],["Sierra Leone","SLE"],["Singapore","SGP"],["Slovakia","SVK"],["Slovenia","SVN"],["Solomon Islands","SLB"],["Somalia","SOM"],["South Africa","ZAF"],["South Georgia and South Sandwich Islands","SGS"],["Spain","ESP"],["Sri Lanka","LKA"],["St.Helena","SHN"],["St.Kitts and Nevis","KNA"],["St.Lucia","LCA"],["St.Pierre and Miquelon","SPM"],["St.Vincent and the Grenadines","VCT"],["Sudan","SDN"],["Suriname","SUR"],["Svalbard and Jan Mayen","SJM"],["Swaziland","SWZ"],["Sweden","SWE"],["Switzerland","CHE"],["Syria","SYR"],["Tajikistan","TJK"],["Tanzania","TZA"],["Thailand","THA"],["Timor-Leste","TLS"],["Togo","TGO"],["Tokelau","TKL"],["Tonga","TON"],["Trinidad and Tobago","TTO"],["Tristan da Cunha","TAA"],["Tunisia","TUN"],["Turkey","TUR"],["Turkmenistan","TKM"],["Turks and Caicos Islands","TCA"],["Tuvalu","TUV"],["Uganda","UGA"],["Ukraine","UKR"],["United Arab Emirates","ARE"],["United Kingdom","GBR"],["United States","USA"],["United States Minor Outlying Islands","UMI"],["Uruguay","URY"],["Uzbekistan","UZB"],["Vanuatu","VUT"],["Vatican City","VAT"],["Venezuela","VEN"],["Vietnam","VNM"],["Virgin Islands","VIR"],["Virgin Islands,British","VGB"],["Wallis and Futuna","WLF"],["White Russia","BLR"],["Yemen","YEM"],["Zambia","ZMB"],["Zimbabwe","ZWE"],["United Kingdom of Seacen","SCN"]];
var countries_zh = [["中国","1"],["阿尔巴尼亚","ALB"],["阿尔及利亚","DZA"],["阿富汗","AFG"],["阿根廷","ARG"],["阿拉伯联合酋长国","ARE"],["阿鲁巴","ABW"],["阿曼","OMN"],["阿塞拜疆","AZE"],["阿森松岛","ASC"],["埃及","EGY"],["埃塞俄比亚","ETH"],["爱尔兰","IRL"],["爱沙尼亚","EST"],["安道尔","AND"],["安哥拉","AGO"],["安圭拉","AIA"],["安提瓜岛和巴布达","ATG"],["澳大利亚","AUS"],["奥地利","AUT"],["奥兰群岛","ALA"],["巴巴多斯岛","BRB"],["巴布亚新几内亚","PNG"],["巴哈马","BHS"],["巴基斯坦","PAK"],["巴拉圭","PRY"],["巴勒斯坦","PSE"],["巴林","BHR"],["巴拿马","PAN"],["巴西","BRA"],["白俄罗斯","BLR"],["百慕大","BMU"],["保加利亚","BGR"],["北马里亚纳群岛","MNP"],["贝宁","BEN"],["比利时","BEL"],["冰岛","ISL"],["波多黎各","PRI"],["波兰","POL"],["玻利维亚","BOL"],["波斯尼亚和黑塞哥维那","BIH"],["博茨瓦纳","BWA"],["伯利兹","BLZ"],["不丹","BTN"],["布基纳法索","BFA"],["布隆迪","BDI"],["布韦岛","BVT"],["朝鲜","PRK"],["丹麦","DNK"],["德国","DEU"],["东帝汶","TLS"],["多哥","TGO"],["多米尼加","DMA"],["多米尼加共和国","DOM"],["俄罗斯","RUS"],["厄瓜多尔","ECU"],["厄立特里亚","ERI"],["法国","FRA"],["法罗群岛","FRO"],["法属波利尼西亚","PYF"],["法属圭亚那","GUF"],["法属南部领地","ATF"],["梵蒂冈","VAT"],["菲律宾","PHL"],["斐济","FJI"],["芬兰","FIN"],["佛得角","CPV"],["弗兰克群岛","FLK"],["冈比亚","GMB"],["刚果","COG"],["刚果民主共和国","COD"],["哥伦比亚","COL"],["哥斯达黎加","CRI"],["格恩西岛","GGY"],["格林纳达","GRD"],["格陵兰","GRL"],["古巴","CUB"],["瓜德罗普","GLP"],["关岛","GUM"],["圭亚那","GUY"],["哈萨克斯坦","KAZ"],["海地","HTI"],["韩国","KOR"],["荷兰","NLD"],["荷属安地列斯","ANT"],["赫德和麦克唐纳群岛","HMD"],["洪都拉斯","HND"],["基里巴斯","KIR"],["吉布提","DJI"],["吉尔吉斯斯坦","KGZ"],["几内亚","GIN"],["几内亚比绍","GNB"],["加拿大","CAN"],["加纳","GHA"],["加蓬","GAB"],["柬埔寨","KHM"],["捷克共和国","CZE"],["津巴布韦","ZWE"],["喀麦隆","CMR"],["卡塔尔","QAT"],["开曼群岛","CYM"],["科科斯群岛","CCK"],["科摩罗","COM"],["科特迪瓦","CIV"],["科威特","KWT"],["克罗地亚","HRV"],["肯尼亚","KEN"],["库克群岛","COK"],["拉脱维亚","LVA"],["莱索托","LSO"],["老挝","LAO"],["黎巴嫩","LBN"],["利比里亚","LBR"],["利比亚","LBY"],["立陶宛","LTU"],["列支敦士登","LIE"],["留尼旺岛","REU"],["卢森堡","LUX"],["卢旺达","RWA"],["罗马尼亚","ROU"],["马达加斯加","MDG"],["马尔代夫","MDV"],["马耳他","MLT"],["马拉维","MWI"],["马来西亚","MYS"],["马里","MLI"],["马其顿","MKD"],["马绍尔群岛","MHL"],["马提尼克","MTQ"],["马约特岛","MYT"],["曼岛","IMN"],["毛里求斯","MUS"],["毛里塔尼亚","MRT"],["美国","USA"],["美属萨摩亚","ASM"],["美属外岛","UMI"],["蒙古","MNG"],["蒙特塞拉特","MSR"],["孟加拉","BGD"],["密克罗尼西亚","FSM"],["秘鲁","PER"],["缅甸","MMR"],["摩尔多瓦","MDA"],["摩洛哥","MAR"],["摩纳哥","MCO"],["莫桑比克","MOZ"],["墨西哥","MEX"],["纳米比亚","NAM"],["南非","ZAF"],["南极洲","ATA"],["南乔治亚和南桑德威奇群岛","SGS"],["瑙鲁","NRU"],["尼泊尔","NPL"],["尼加拉瓜","NIC"],["尼日尔","NER"],["尼日利亚","NGA"],["纽埃","NIU"],["挪威","NOR"],["诺福克","NFK"],["帕劳群岛","PLW"],["皮特凯恩","PCN"],["葡萄牙","PRT"],["乔治亚","GEO"],["日本","JPN"],["瑞典","SWE"],["瑞士","CHE"],["萨尔瓦多","SLV"],["萨摩亚","WSM"],["塞尔维亚,黑山","SCG"],["塞拉利昂","SLE"],["塞内加尔","SEN"],["塞浦路斯","CYP"],["塞舌尔","SYC"],["沙特阿拉伯","SAU"],["圣诞岛","CXR"],["圣多美和普林西比","STP"],["圣赫勒拿","SHN"],["圣基茨和尼维斯","KNA"],["圣卢西亚","LCA"],["圣马力诺","SMR"],["圣皮埃尔和米克隆群岛","SPM"],["圣文森特和格林纳丁斯","VCT"],["斯里兰卡","LKA"],["斯洛伐克","SVK"],["斯洛文尼亚","SVN"],["斯瓦尔巴和扬马廷","SJM"],["斯威士兰","SWZ"],["苏丹","SDN"],["苏里南","SUR"],["所罗门群岛","SLB"],["索马里","SOM"],["塔吉克斯坦","TJK"],["泰国","THA"],["坦桑尼亚","TZA"],["汤加","TON"],["特克斯和凯克特斯群岛","TCA"],["特里斯坦达昆哈","TAA"],["特立尼达和多巴哥","TTO"],["突尼斯","TUN"],["图瓦卢","TUV"],["土耳其","TUR"],["土库曼斯坦","TKM"],["托克劳","TKL"],["瓦利斯和福图纳","WLF"],["瓦努阿图","VUT"],["危地马拉","GTM"],["维尔京群岛，美属","VIR"],["维尔京群岛，英属","VGB"],["委内瑞拉","VEN"],["文莱","BRN"],["乌干达","UGA"],["乌克兰","UKR"],["乌拉圭","URY"],["乌兹别克斯坦","UZB"],["西班牙","ESP"],["希腊","GRC"],["新加坡","SGP"],["新喀里多尼亚","NCL"],["新西兰","NZL"],["匈牙利","HUN"],["叙利亚","SYR"],["牙买加","JAM"],["亚美尼亚","ARM"],["也门","YEM"],["伊拉克","IRQ"],["伊朗","IRN"],["以色列","ISR"],["意大利","ITA"],["印度","IND"],["印度尼西亚","IDN"],["英国","GBR"],["英属印度洋领地","IOT"],["约旦","JOR"],["越南","VNM"],["赞比亚","ZMB"],["泽西岛","JEY"],["乍得","TCD"],["直布罗陀","GIB"],["智利","CHL"],["中非共和国","CAF"],["喜岑联合王国","SCN"]];
var states = {"AFG":[["Afghanistan","AFG"]],"ALA":[["Aland lslands","ALA"]],"ALB":[["Albania","ALB"]],"DZA":[["Algeria","DZA"]],"ASM":[["American Samoa","ASM"]],"AND":[["Andorra","AND"]],"AGO":[["Angola","AGO"]],"AIA":[["Anguilla","AIA"]],"ATA":[["Antarctica","ATA"]],"ATG":[["Antigua and Barbuda","ATG"]],"ARG":[["Argentina","ARG"]],"ARM":[["Armenia","ARM"]],"ABW":[["Aruba","ABW"]],"ASC":[["Ascension Island","ASC"]],"AUS":[["Canberra","ACT"],["New South Wales","NSW"],["Northern Territory","NT"],["Queensland","QLD"],["South Australia","SA"],["Tasmania","TAS"],["Victoria","VIC"],["Western Australia","WA"]],"AUT":[["Austria","AUT"]],"AZE":[["Azerbaijan","AZE"]],"BHS":[["Bahamas","BHS"]],"BHR":[["Bahrain","BHR"]],"BGD":[["Bangladesh","BGD"]],"BRB":[["Barbados","BRB"]],"BEL":[["Belgium","BEL"]],"BLZ":[["Belize","BLZ"]],"BEN":[["Benin","BEN"]],"BMU":[["Bermuda","BMU"]],"BTN":[["Bhutan","BTN"]],"BOL":[["Bolivia","BOL"]],"BIH":[["Bosnia and Herzegovina","BIH"]],"BWA":[["Botswana","BWA"]],"BVT":[["Bouvet Island","BVT"]],"BRA":[["Brazil","BRA"]],"IOT":[["British Indian Ocean Territory","IOT"]],"BRN":[["Brunei","BRN"]],"BGR":[["Bulgaria","BGR"]],"BFA":[["Burkina Faso","BFA"]],"BDI":[["Burundi","BDI"]],"KHM":[["Cambodia","KHM"]],"CMR":[["Cameroon","CMR"]],"CAN":[["Canada","CAN"]],"CPV":[["Cape Verde","CPV"]],"CYM":[["Cayman Islands","CYM"]],"CAF":[["Central African Republic","CAF"]],"TCD":[["Chad","TCD"]],"CHL":[["Chile","CHL"]],"1":[["Anhui","34"],["Beijing","11"],["Chongqing","50"],["Fujian","35"],["Gansu","62"],["Guangdong","44"],["Guangxi","45"],["Guizhou","52"],["Hainan","46"],["Hebei","13"],["Heilongjiang","23"],["Henan","41"],["Hongkong SAR","81"],["Hubei","42"],["Hunan","43"],["Inner Mongolia","15"],["Jiangsu","32"],["Jiangxi","36"],["Jilin","22"],["Liaoning","21"],["Macao SAR","82"],["Ningxia","64"],["Qinghai","63"],["Shaanxi","61"],["Shandong","37"],["Shanghai","31"],["Shanxi","14"],["Sichuan","51"],["Taiwan","71"],["Tianjin","12"],["Tibet","54"],["Xinjiang","65"],["Yunnan","53"],["Zhejiang","33"]],"CXR":[["Christmas Island","CXR"]],"CCK":[["Cocos(Keeling)Islands","CCK"]],"COL":[["Colombia","COL"]],"COM":[["Comoros","COM"]],"COG":[["Congo","COG"]],"COD":[["Congo(DRC)","COD"]],"COK":[["Cook Islands","COK"]],"CRI":[["Costa Rica","CRI"]],"CIV":[["Cote d'Ivoire","CIV"]],"HRV":[["Croatia","HRV"]],"CUB":[["Cuba","CUB"]],"CYP":[["Cyprus","CYP"]],"CZE":[["Czech Republic","CZE"]],"DNK":[["Denmark","DNK"]],"DJI":[["Djibouti","DJI"]],"DMA":[["Dominica","DMA"]],"DOM":[["Dominican Republic","DOM"]],"ECU":[["Ecuador","ECU"]],"EGY":[["Egypt","EGY"]],"SLV":[["El Salvador","SLV"]],"ERI":[["Eritrea","ERI"]],"EST":[["Estonia","EST"]],"ETH":[["Ethiopia","ETH"]],"FLK":[["Falkland Islands","FLK"]],"FRO":[["Faroe Islands","FRO"]],"FJI":[["Fiji Islands","FJI"]],"FIN":[["Finland","FIN"]],"FRA":[["France","FRA"]],"PYF":[["Frech Polynesia","PYF"]],"GUF":[["French Guiana","GUF"]],"ATF":[["French Southern and Antarctic Lands","ATF"]],"GAB":[["Gabon","GAB"]],"GMB":[["Gambia","GMB"]],"GEO":[["Georgia","GEO"]],"DEU":[["Germany","DEU"]],"GHA":[["Ghana","GHA"]],"GIB":[["Gibraltar","GIB"]],"GRC":[["Greece","GRC"]],"GRL":[["Greenland","GRL"]],"GRD":[["Grenada","GRD"]],"GLP":[["Guadeloupe","GLP"]],"GUM":[["Guam","GUM"]],"GTM":[["Guatemala","GTM"]],"GGY":[["Guernsey","GGY"]],"GIN":[["Guinea","GIN"]],"GNB":[["Guinea-Bissau","GNB"]],"GUY":[["Guyana","GUY"]],"HTI":[["Haiti","HTI"]],"HMD":[["Heard Island and McDonald Islands","HMD"]],"HND":[["Honduras","HND"]],"HUN":[["Hungary","HUN"]],"ISL":[["Iceland","ISL"]],"IND":[["India","IND"]],"IDN":[["Indonesia","IDN"]],"IRN":[["Iran","IRN"]],"IRQ":[["Iraq","IRQ"]],"IRL":[["Ireland","IRL"]],"IMN":[["Isle of Man","IMN"]],"ISR":[["Israel","ISR"]],"ITA":[["Italy","ITA"]],"JAM":[["Jamaica","JAM"]],"JPN":[["Japan","JPN"]],"JEY":[["Jersey","JEY"]],"JOR":[["Jordan","JOR"]],"KAZ":[["Kazakhstan","KAZ"]],"KEN":[["Kenya","KEN"]],"KIR":[["Kiribati","KIR"]],"KOR":[["Busan","26"],["Chungcheongbuk-do","43"],["Chungcheongnam-do","44"],["Daegu","27"],["Daejeon","30"],["Gangwon-do","42"],["Gwangju","29"],["Jeju-do","41"],["Gyeongsangbuk-do","47"],["Gyeongsangnam-do","48"],["Incheon","28"],["Gyeonggi-do","49"],["Jeollabuk-do","45"],["Jeollanam-do","46"],["Seoul","11"],["Ulsan","31"]],"KWT":[["Kuwait","KWT"]],"KGZ":[["Kyrgyzstan","KGZ"]],"LAO":[["Laos","LAO"]],"LVA":[["Latvia","LVA"]],"LBN":[["Lebanon","LBN"]],"LSO":[["Lesotho","LSO"]],"LBR":[["Liberia","LBR"]],"LBY":[["Libya","LBY"]],"LIE":[["Liechtenstein","LIE"]],"LTU":[["Lithuania","LTU"]],"LUX":[["Luxembourg","LUX"]],"MKD":[["Macedonia,Former Yugoslav Republic of","MKD"]],"MDG":[["Madagascar","MDG"]],"MWI":[["Malawi","MWI"]],"MYS":[["Johor","JH"],["Kedah","KD"],["Kelantan","KN"],["Kuala Lumpur","KL"],["Labuan","LB"],["Malacca","ML"],["Negeri Sembilan","NS"],["Pahang","PG"],["Perak","PK"],["Perlis","PS"],["Pulau Pinang","PH"],["Sabah","SB"],["Sarawak","SR"],["Selangor","SL"],["Terengganu","TR"]],"MDV":[["Maldives","MDV"]],"MLI":[["Mali","MLI"]],"MLT":[["Malta","MLT"]],"MHL":[["Marshall Islands","MHL"]],"MTQ":[["Martinique","MTQ"]],"MRT":[["Mauritania","MRT"]],"MUS":[["Mauritius","MUS"]],"MYT":[["Mayotte","MYT"]],"MEX":[["Mexico","MEX"]],"FSM":[["Micronesia","FSM"]],"MDA":[["Moldova","MDA"]],"MCO":[["Monaco","MCO"]],"MNG":[["Mongolia","MNG"]],"MSR":[["Montserrat","MSR"]],"MAR":[["Morocco","MAR"]],"MOZ":[["Mozambique","MOZ"]],"MMR":[["Myanmar","MMR"]],"NAM":[["Namibia","NAM"]],"NRU":[["Nauru","NRU"]],"NPL":[["Nepal","NPL"]],"NLD":[["Netherlands","NLD"]],"ANT":[["Netherlands Antilles","ANT"]],"NCL":[["New Caledonia","NCL"]],"NZL":[["New Zealand","NZL"]],"NIC":[["Nicaragua","NIC"]],"NER":[["Niger","NER"]],"NGA":[["Nigeria","NGA"]],"NIU":[["Niue","NIU"]],"NFK":[["Norfolk Island","NFK"]],"PRK":[["North Korea","PRK"]],"MNP":[["Northern Mariana Islands","MNP"]],"NOR":[["Norway","NOR"]],"OMN":[["Oman","OMN"]],"PAK":[["Pakistan","PAK"]],"PLW":[["Palau","PLW"]],"PSE":[["Palestinian Authority","PSE"]],"PAN":[["Panama","PAN"]],"PNG":[["Papua New Guinea","PNG"]],"PRY":[["Paraguay","PRY"]],"PER":[["Peru","PER"]],"PHL":[["Philippines","PHL"]],"PCN":[["Pitcairn Islands","PCN"]],"POL":[["Poland","POL"]],"PRT":[["Portugal","PRT"]],"PRI":[["Puerto Rico","PRI"]],"QAT":[["Qatar","QAT"]],"REU":[["Reunion","REU"]],"ROU":[["Romania","ROU"]],"RUS":[["Russia","RUS"]],"RWA":[["Rwanda","RWA"]],"WSM":[["Samoa","WSM"]],"SMR":[["San Marino","SMR"]],"STP":[["Sao Tome and Principe","STP"]],"SAU":[["Saudi Arabia","SAU"]],"SEN":[["Senegal","SEN"]],"SCG":[["Serbia,Montenegro","SCG"]],"SYC":[["Seychelles","SYC"]],"SLE":[["Sierra Leone","SLE"]],"SGP":[["Singapore","SGP"]],"SVK":[["Slovakia","SVK"]],"SVN":[["Slovenia","SVN"]],"SLB":[["Solomon Islands","SLB"]],"SOM":[["Somalia","SOM"]],"ZAF":[["South Africa","ZAF"]],"SGS":[["South Georgia and South Sandwich Islands","SGS"]],"ESP":[["Spain","ESP"]],"LKA":[["Sri Lanka","LKA"]],"SHN":[["St.Helena","SHN"]],"KNA":[["St.Kitts and Nevis","KNA"]],"LCA":[["St.Lucia","LCA"]],"SPM":[["St.Pierre and Miquelon","SPM"]],"VCT":[["St.Vincent and the Grenadines","VCT"]],"SDN":[["Sudan","SDN"]],"SUR":[["Suriname","SUR"]],"SJM":[["Svalbard and Jan Mayen","SJM"]],"SWZ":[["Swaziland","SWZ"]],"SWE":[["Sweden","SWE"]],"CHE":[["Switzerland","CHE"]],"SYR":[["Syria","SYR"]],"TJK":[["Tajikistan","TJK"]],"TZA":[["Tanzania","TZA"]],"THA":[["Thailand","THA"]],"TLS":[["Timor-Leste","TLS"]],"TGO":[["Togo","TGO"]],"TKL":[["Tokelau","TKL"]],"TON":[["Tonga","TON"]],"TTO":[["Trinidad and Tobago","TTO"]],"TAA":[["Tristan da Cunha","TAA"]],"TUN":[["Tunisia","TUN"]],"TUR":[["Turkey","TUR"]],"TKM":[["Turkmenistan","TKM"]],"TCA":[["Turks and Caicos Islands","TCA"]],"TUV":[["Tuvalu","TUV"]],"UGA":[["Uganda","UGA"]],"UKR":[["Ukraine","UKR"]],"ARE":[["United Arab Emirates","ARE"]],"GBR":[["England","ENG"],["Northern Ireland","NIR"],["Scotland","SCT"],["Wales","WLS"]],"USA":[["Alabama","AL"],["Alaska","AK"],["Arizona","AZ"],["Arkansas","AR"],["California","CA"],["Colorado","CO"],["Connecticut","CT"],["Delaware","DE"],["District of Columbia","DC"],["Florida","FL"],["Georgia","GA"],["Hawaii","HI"],["Idaho","ID"],["Illinois","IL"],["Indiana","IN"],["Iowa","IA"],["Kansas","KS"],["Kentucky","KY"],["Louisiana","LA"],["Maine","ME"],["Maryland","MD"],["Massachusetts","MA"],["Michigan","MI"],["Minnesota","MN"],["Mississippi","MS"],["Missouri","MO"],["Montana","MT"],["Nebraska","NE"],["Nevada","NV"],["New Hampshire","NH"],["New Jersey","NJ"],["New Mexico","NM"],["New York","NY"],["North Carolina","NC"],["North Dakota","ND"],["Ohio","OH"],["Oklahoma","OK"],["Oregon","OR"],["Pennsylvania","PA"],["Rhode Island","RI"],["South Carolina","SC"],["South Dakota","SD"],["Tennessee","TN"],["Texas","TX"],["Utah","UT"],["Vermont","VT"],["Virginia","VA"],["Washington","WA"],["West Virginia","WV"],["Wisconsin","WI"],["Wyoming","WY"]],"UMI":[["United States Minor Outlying Islands","UMI"]],"URY":[["Uruguay","URY"]],"UZB":[["Uzbekistan","UZB"]],"VUT":[["Vanuatu","VUT"]],"VAT":[["Vatican City","VAT"]],"VEN":[["Venezuela","VEN"]],"VNM":[["Vietnam","VNM"]],"VIR":[["Virgin Islands","VIR"]],"VGB":[["Virgin Islands,British","VGB"]],"WLF":[["Wallis and Futuna","WLF"]],"BLR":[["White Russia","BLR"]],"YEM":[["Yemen","YEM"]],"ZMB":[["Zambia","ZMB"]],"ZWE":[["Zimbabwe","ZWE"]],"SCN":[["Seacen Special City","SSC"]]};
var states_zh = {"1":[["北京","11"],["天津","12"],["河北","13"],["山西","14"],["内蒙古","15"],["辽宁","21"],["吉林","22"],["黑龙江","23"],["上海","31"],["江苏","32"],["浙江","33"],["安徽","34"],["福建","35"],["江西","36"],["山东","37"],["河南","41"],["湖北","42"],["湖南","43"],["广东","44"],["广西","45"],["海南","46"],["重庆","50"],["四川","51"],["贵州","52"],["云南","53"],["西藏","54"],["陕西","61"],["甘肃","62"],["青海","63"],["宁夏","64"],["新疆","65"],["台湾","71"],["香港","81"],["澳门","82"]],"ALB":[["阿尔巴尼亚","ALB"]],"DZA":[["阿尔及利亚","DZA"]],"AFG":[["阿富汗","AFG"]],"ARG":[["阿根廷","ARG"]],"ARE":[["阿拉伯联合酋长国","ARE"]],"ABW":[["阿鲁巴","ABW"]],"OMN":[["阿曼","OMN"]],"AZE":[["阿塞拜疆","AZE"]],"ASC":[["阿森松岛","ASC"]],"EGY":[["埃及","EGY"]],"ETH":[["埃塞俄比亚","ETH"]],"IRL":[["爱尔兰","IRL"]],"EST":[["爱沙尼亚","EST"]],"AND":[["安道尔","AND"]],"AGO":[["安哥拉","AGO"]],"AIA":[["安圭拉","AIA"]],"ATG":[["安提瓜岛和巴布达","ATG"]],"AUS":[["北部地区","NT"],["堪培拉","ACT"],["昆士兰","QLD"],["南澳大利亚","SA"],["塔斯马尼亚","TAS"],["维多利亚","VIC"],["西澳大利亚","WA"],["新南威尔士","NSW"]],"AUT":[["奥地利","AUT"]],"ALA":[["奥兰群岛","ALA"]],"BRB":[["巴巴多斯岛","BRB"]],"PNG":[["巴布亚新几内亚","PNG"]],"BHS":[["巴哈马","BHS"]],"PAK":[["巴基斯坦","PAK"]],"PRY":[["巴拉圭","PRY"]],"PSE":[["巴勒斯坦","PSE"]],"BHR":[["巴林","BHR"]],"PAN":[["巴拿马","PAN"]],"BRA":[["巴西","BRA"]],"BLR":[["白俄罗斯","BLR"]],"BMU":[["百慕大","BMU"]],"BGR":[["保加利亚","BGR"]],"MNP":[["北马里亚纳群岛","MNP"]],"BEN":[["贝宁","BEN"]],"BEL":[["比利时","BEL"]],"ISL":[["冰岛","ISL"]],"PRI":[["波多黎各","PRI"]],"POL":[["波兰","POL"]],"BOL":[["玻利维亚","BOL"]],"BIH":[["波斯尼亚和黑塞哥维那","BIH"]],"BWA":[["博茨瓦纳","BWA"]],"BLZ":[["伯利兹","BLZ"]],"BTN":[["不丹","BTN"]],"BFA":[["布基纳法索","BFA"]],"BDI":[["布隆迪","BDI"]],"BVT":[["布韦岛","BVT"]],"PRK":[["朝鲜","PRK"]],"DNK":[["丹麦","DNK"]],"DEU":[["德国","DEU"]],"TLS":[["东帝汶","TLS"]],"TGO":[["多哥","TGO"]],"DMA":[["多米尼加","DMA"]],"DOM":[["多米尼加共和国","DOM"]],"RUS":[["俄罗斯","RUS"]],"ECU":[["厄瓜多尔","ECU"]],"ERI":[["厄立特里亚","ERI"]],"FRA":[["法国","FRA"]],"FRO":[["法罗群岛","FRO"]],"PYF":[["法属波利尼西亚","PYF"]],"GUF":[["法属圭亚那","GUF"]],"ATF":[["法属南部领地","ATF"]],"VAT":[["梵蒂冈","VAT"]],"PHL":[["菲律宾","PHL"]],"FJI":[["斐济","FJI"]],"FIN":[["芬兰","FIN"]],"CPV":[["佛得角","CPV"]],"FLK":[["弗兰克群岛","FLK"]],"GMB":[["冈比亚","GMB"]],"COG":[["刚果","COG"]],"COD":[["刚果民主共和国","COD"]],"COL":[["哥伦比亚","COL"]],"CRI":[["哥斯达黎加","CRI"]],"GGY":[["格恩西岛","GGY"]],"GRD":[["格林纳达","GRD"]],"GRL":[["格陵兰","GRL"]],"CUB":[["古巴","CUB"]],"GLP":[["瓜德罗普","GLP"]],"GUM":[["关岛","GUM"]],"GUY":[["圭亚那","GUY"]],"KAZ":[["哈萨克斯坦","KAZ"]],"HTI":[["海地","HTI"]],"KOR":[["大邱","27"],["大田","30"],["釜山","26"],["光州","29"],["济州特别自治道","41"],["江原道","42"],["京畿道","49"],["庆尚北道","43"],["庆尚南道","44"],["全罗北道","47"],["全罗南道","48"],["仁川","28"],["首尔","11"],["蔚山","31"],["忠清北道","45"],["忠清南道","46"]],"NLD":[["荷兰","NLD"]],"ANT":[["荷属安地列斯","ANT"]],"HMD":[["赫德和麦克唐纳群岛","HMD"]],"HND":[["洪都拉斯","HND"]],"KIR":[["基里巴斯","KIR"]],"DJI":[["吉布提","DJI"]],"KGZ":[["吉尔吉斯斯坦","KGZ"]],"GIN":[["几内亚","GIN"]],"GNB":[["几内亚比绍","GNB"]],"CAN":[["加拿大","CAN"]],"GHA":[["加纳","GHA"]],"GAB":[["加蓬","GAB"]],"KHM":[["柬埔寨","KHM"]],"CZE":[["捷克共和国","CZE"]],"ZWE":[["津巴布韦","ZWE"]],"CMR":[["喀麦隆","CMR"]],"QAT":[["卡塔尔","QAT"]],"CYM":[["开曼群岛","CYM"]],"CCK":[["科科斯群岛","CCK"]],"COM":[["科摩罗","COM"]],"CIV":[["科特迪瓦","CIV"]],"KWT":[["科威特","KWT"]],"HRV":[["克罗地亚","HRV"]],"KEN":[["肯尼亚","KEN"]],"COK":[["库克群岛","COK"]],"LVA":[["拉脱维亚","LVA"]],"LSO":[["莱索托","LSO"]],"LAO":[["老挝","LAO"]],"LBN":[["黎巴嫩","LBN"]],"LBR":[["利比里亚","LBR"]],"LBY":[["利比亚","LBY"]],"LTU":[["立陶宛","LTU"]],"LIE":[["列支敦士登","LIE"]],"REU":[["留尼旺岛","REU"]],"LUX":[["卢森堡","LUX"]],"RWA":[["卢旺达","RWA"]],"ROU":[["罗马尼亚","ROU"]],"MDG":[["马达加斯加","MDG"]],"MDV":[["马尔代夫","MDV"]],"MLT":[["马耳他","MLT"]],"MWI":[["马拉维","MWI"]],"MYS":[["槟榔屿","PH"],["玻璃市","PS"],["丁加奴","TR"],["吉打","KD"],["吉兰丹","KN"],["吉隆坡","KL"],["马六甲","ML"],["纳闽","LB"],["彭亨","PG"],["霹雳","PK"],["柔佛","JH"],["森美兰","NS"],["沙巴","SB"],["沙捞越","SR"],["雪兰莪","SL"]],"MLI":[["马里","MLI"]],"MKD":[["马其顿","MKD"]],"MHL":[["马绍尔群岛","MHL"]],"MTQ":[["马提尼克","MTQ"]],"MYT":[["马约特岛","MYT"]],"IMN":[["曼岛","IMN"]],"MUS":[["毛里求斯","MUS"]],"MRT":[["毛里塔尼亚","MRT"]],"USA":[["阿肯色","AR"],["阿拉巴马","AL"],["阿拉斯加","AK"],["爱达荷","ID"],["爱荷华","IA"],["北达科他","ND"],["北卡罗来纳","NC"],["宾夕法尼亚","PA"],["德克萨斯","TX"],["俄亥俄","OH"],["俄克拉荷马","OK"],["俄勒冈","OR"],["佛罗里达","FL"],["佛蒙特","VT"],["哥伦比亚特区","DC"],["华盛顿","WA"],["怀俄明","WY"],["加利福尼亚","CA"],["堪萨斯","KS"],["康涅狄格","CT"],["科罗拉多","CO"],["肯塔基","KY"],["路易斯安那","LA"],["罗德岛","RI"],["马里兰","MD"],["马萨诸塞","MA"],["蒙大拿","MT"],["密苏里","MO"],["密西西比","MS"],["密歇根","MI"],["缅因","ME"],["明尼苏达","MN"],["南达科他","SD"],["南卡罗来纳","SC"],["内布拉斯加","NE"],["内华达","NV"],["纽约","NY"],["特拉华","DE"],["田纳西","TN"],["威斯康星","WI"],["维吉尼亚","VA"],["西佛吉尼亚","WV"],["夏威夷","HI"],["新罕布什尔","NH"],["新墨西哥","NM"],["新泽西","NJ"],["亚利桑那","AZ"],["伊利诺斯","IL"],["印第安那","IN"],["犹他","UT"],["佐治亚","GA"]],"ASM":[["美属萨摩亚","ASM"]],"UMI":[["美属外岛","UMI"]],"MNG":[["蒙古","MNG"]],"MSR":[["蒙特塞拉特","MSR"]],"BGD":[["孟加拉","BGD"]],"FSM":[["密克罗尼西亚","FSM"]],"PER":[["秘鲁","PER"]],"MMR":[["缅甸","MMR"]],"MDA":[["摩尔多瓦","MDA"]],"MAR":[["摩洛哥","MAR"]],"MCO":[["摩纳哥","MCO"]],"MOZ":[["莫桑比克","MOZ"]],"MEX":[["墨西哥","MEX"]],"NAM":[["纳米比亚","NAM"]],"ZAF":[["南非","ZAF"]],"ATA":[["南极洲","ATA"]],"SGS":[["南乔治亚和南桑德威奇群岛","SGS"]],"NRU":[["瑙鲁","NRU"]],"NPL":[["尼泊尔","NPL"]],"NIC":[["尼加拉瓜","NIC"]],"NER":[["尼日尔","NER"]],"NGA":[["尼日利亚","NGA"]],"NIU":[["纽埃","NIU"]],"NOR":[["挪威","NOR"]],"NFK":[["诺福克","NFK"]],"PLW":[["帕劳群岛","PLW"]],"PCN":[["皮特凯恩","PCN"]],"PRT":[["葡萄牙","PRT"]],"GEO":[["乔治亚","GEO"]],"JPN":[["日本","JPN"]],"SWE":[["瑞典","SWE"]],"CHE":[["瑞士","CHE"]],"SLV":[["萨尔瓦多","SLV"]],"WSM":[["萨摩亚","WSM"]],"SCG":[["塞尔维亚,黑山","SCG"]],"SLE":[["塞拉利昂","SLE"]],"SEN":[["塞内加尔","SEN"]],"CYP":[["塞浦路斯","CYP"]],"SYC":[["塞舌尔","SYC"]],"SAU":[["沙特阿拉伯","SAU"]],"CXR":[["圣诞岛","CXR"]],"STP":[["圣多美和普林西比","STP"]],"SHN":[["圣赫勒拿","SHN"]],"KNA":[["圣基茨和尼维斯","KNA"]],"LCA":[["圣卢西亚","LCA"]],"SMR":[["圣马力诺","SMR"]],"SPM":[["圣皮埃尔和米克隆群岛","SPM"]],"VCT":[["圣文森特和格林纳丁斯","VCT"]],"LKA":[["斯里兰卡","LKA"]],"SVK":[["斯洛伐克","SVK"]],"SVN":[["斯洛文尼亚","SVN"]],"SJM":[["斯瓦尔巴和扬马廷","SJM"]],"SWZ":[["斯威士兰","SWZ"]],"SDN":[["苏丹","SDN"]],"SUR":[["苏里南","SUR"]],"SLB":[["所罗门群岛","SLB"]],"SOM":[["索马里","SOM"]],"TJK":[["塔吉克斯坦","TJK"]],"THA":[["泰国","THA"]],"TZA":[["坦桑尼亚","TZA"]],"TON":[["汤加","TON"]],"TCA":[["特克斯和凯克特斯群岛","TCA"]],"TAA":[["特里斯坦达昆哈","TAA"]],"TTO":[["特立尼达和多巴哥","TTO"]],"TUN":[["突尼斯","TUN"]],"TUV":[["图瓦卢","TUV"]],"TUR":[["土耳其","TUR"]],"TKM":[["土库曼斯坦","TKM"]],"TKL":[["托克劳","TKL"]],"WLF":[["瓦利斯和福图纳","WLF"]],"VUT":[["瓦努阿图","VUT"]],"GTM":[["危地马拉","GTM"]],"VIR":[["维尔京群岛，美属","VIR"]],"VGB":[["维尔京群岛，英属","VGB"]],"VEN":[["委内瑞拉","VEN"]],"BRN":[["文莱","BRN"]],"UGA":[["乌干达","UGA"]],"UKR":[["乌克兰","UKR"]],"URY":[["乌拉圭","URY"]],"UZB":[["乌兹别克斯坦","UZB"]],"ESP":[["西班牙","ESP"]],"GRC":[["希腊","GRC"]],"SGP":[["新加坡","SGP"]],"NCL":[["新喀里多尼亚","NCL"]],"NZL":[["新西兰","NZL"]],"HUN":[["匈牙利","HUN"]],"SYR":[["叙利亚","SYR"]],"JAM":[["牙买加","JAM"]],"ARM":[["亚美尼亚","ARM"]],"YEM":[["也门","YEM"]],"IRQ":[["伊拉克","IRQ"]],"IRN":[["伊朗","IRN"]],"ISR":[["以色列","ISR"]],"ITA":[["意大利","ITA"]],"IND":[["印度","IND"]],"IDN":[["印度尼西亚","IDN"]],"GBR":[["北爱尔兰","NIR"],["苏格兰","SCT"],["威尔士","WLS"],["英格兰","ENG"]],"IOT":[["英属印度洋领地","IOT"]],"JOR":[["约旦","JOR"]],"VNM":[["越南","VNM"]],"ZMB":[["赞比亚","ZMB"]],"JEY":[["泽西岛","JEY"]],"TCD":[["乍得","TCD"]],"GIB":[["直布罗陀","GIB"]],"CHL":[["智利","CHL"]],"CAF":[["中非共和国","CAF"]],"SCN":[["喜岑特别市","SSC"]]};
var cities = {"AFG":{"AFG":[["Herat","HEA"],["Kabul","KBL"],["Kandahar","KDH"],["Mazar-i Sharif","MZR"]]},"ALA":{"ALA":[["Aland lslands","ALA"]]},"ALB":{"ALB":[["Berat","BR"],["Diber","DI"],["Durres","DR"],["Elbasan","EL"],["Fier","FR"],["Gjirokaster","GJ"],["Korce","KO"],["Kukes","KU"],["Lezhe","LE"],["Shkoder","SH"],["Tirane","TR"],["Vlore","VL"]]},"DZA":{"DZA":[["Adrar","ADR"],["Ain Defla","ADE"],["Ain Temouchent","ATE"],["Alger","ALG"],["Annaba","AAE"],["Batna","BAT"],["Bechar","BEC"],["Bejaia","BJA"],["Biskra","BIS"],["Blida","BLI"],["Bordj Bou Arreridj","BOR"],["Bouira","BOA"],["Boumerdes","BOU"],["Chlef","CHL"],["Constantine","CZL"],["Djelfa","DJE"],["El Bayadh","EBA"],["El Oued","EOU"],["El Tarf","ETA"],["Ghardaia","GHA"],["Guelma","GUE"],["Illizi","ILL"],["Jijel","JIJ"],["Khenchela","KHE"],["Laghouat","LAG"],["Mascara","MUA"],["Medea","MED"],["Mila","MIL"],["Mostaganem","MOS"],["Msila","MSI"],["Naama","NAA"],["Oran","ORA"],["Ouargla","OUA"],["Oum el Bouaghi","OEB"],["Relizane","REL"],["Saida","SAI"],["Setif","SET"],["Sidi Bel Abbes","SBA"],["Skikda","SKI"],["Souk Ahras","SAH"],["Tamanghasset","TAM"],["Tebessa","TEB"],["Tiaret","TIA"],["Tindouf","TIN"],["Tipaza","TIP"],["Tissemsilt","TIS"],["Tizi Ouzou","IOU"],["Tlemcen","TLE"]]},"ASM":{"ASM":[["Aana","AAN"],["Aigaile Tai","AIT"],["Atua","ATU"],["Faasaleleaga","FAA"],["Gagaemauga","GMG"],["Gagaifomauga","GFG"],["Palauli","PAL"],["Satupaitea","SAT"],["Savaii","SAV"],["Tuamasaga","TUA"],["Upolu","UPO"],["Vaao Fonoti","VAF"],["Vaisigano","VAI"]]},"AND":{"AND":[["Andorra la Vella","7"],["Canillo","2"],["Encamp","3"],["Escaldes-Engordany","8"],["La Massana","4"],["Ordino","5"],["Sant Julia de Laria","6"]]},"AGO":{"AGO":[["Bengo","BGO"],["Benguela","BGU"],["Bie","BIE"],["Cabinda","CAB"],["Cuando Cubango","CCU"],["Cuanza Norte","CNO"],["Cuanza Sul","CUS"],["Cunene","CNN"],["Huambo","HUA"],["Huila","HUI"],["Luanda","LUA"],["Lunda Norte","LNO"],["Lunda Sul","LSU"],["Malanje","MAL"],["Moxico","MOX"],["Namibe","NAM"],["Uige","UIG"],["Zaire","ZAI"]]},"AIA":{"AIA":[["Anguilla","AIA"]]},"ATA":{"ATA":[["Antarctica","ATA"]]},"ATG":{"ATG":[["Antigua and Barbuda","ATG"]]},"ARG":{"ARG":[["Bahia Blanca","BHI"],["Buenos Aires","BUE"],["Catamarca","CTC"],["Comodoro Rivadavia","CRD"],["Concordia","COC"],["Cordoba","COR"],["Corrientes","CNQ"],["Formosa","FMA"],["Jujuy","JUJ"],["La Plata","LPG"],["La Rioja","IRJ"],["Mar del Plata","MDQ"],["Mendoza","MDZ"],["Neuquen","NQN"],["Parana","PRA"],["Posadas","PSS"],["Rawson","RWO"],["Resistencia","RES"],["Rio Cuarto","RCU"],["Rio Gallegos","RGL"],["Rosario","ROS"],["Salta","SLA"],["San Juan","UAQ"],["San Miguel de Tucuman","SMC"],["San Nicolas","SNS"],["San Rafael","AFA"],["San Luis","LUQ"],["Santa Fe","SFN"],["Santa Rosa","RSA"],["Santiago del Estero","SDE"],["Trelew","REL"],["Ushuaia","USH"],["Viedma","VDM"],["Villa Krause","VLK"]]},"ARM":{"ARM":[["Aragacotn","AGT"],["Ararat","ARA"],["Armavir","ARM"],["Gelarkunik","GEG"],["Kotayk","KOT"],["Lorri","LOR"],["Shirak","SHI"],["Syunik","SYU"],["Tavus","TAV"],["VayocJor","VAY"],["Yerevan","EVN"]]},"ABW":{"ABW":[["Aruba","ABW"]]},"ASC":{"ASC":[["Ascension Island","ASC"]]},"AUS":{"ACT":[["Canberra","CBR"]],"NSW":[["Newcastle","NTL"],["Sydney","HBS"],["Wollongong","WOL"]],"NT":[["Darwin","DRW"],["Palmerston","PAL"]],"QLD":[["Brisbane","BNE"],["Cairns","CNS"],["Caloundra","CUD"],["Gold Coast","OOL"],["Toowoomba","TWB"],["Townsville","TSV"]],"SA":[["Adelaide","ADL"],["Mount Gambier","MGB"],["Murray Bridge","MYB"],["Port Augusta","PUG"],["Port Lincoln","PLO"],["Port Pirie","PPI"],["Victor Harbor","VHA"],["Whyalla","WAY"]],"TAS":[["Burnie","BWT"],["Devonport","DPO"],["Hobart","HBA"],["Launceston","LST"]],"VIC":[["Geelong","GEX"],["Melbourne","MEL"]],"WA":[["Albany","ALH"],["Bunbury","BUY"],["Fremantle","FRE"],["Geraldton","GET"],["Kalgoorlie","KGI"],["Mandurah","MDU"],["Perth","PER"]]},"AUT":{"AUT":[["Burgenland","BUR"],["Carinthia","CAT"],["Lower Austria","LAU"],["Salzburg","SZG"],["Styria","STY"],["Tyrol","TYR"],["Upper Austria","UAU"],["Vienna","VDD"],["Vorarlberg","VOR"]]},"AZE":{"AZE":[["Abseron","ABS"],["Ganca","GA"],["Kalbacar","KAL"],["Lankaran","LAN"],["Mil-Qarabax","MQA"],["Mugan-Salyan","MSA"],["Nagorni-Qarabax","NQA"],["Naxcivan","NX"],["Priaraks","PRI"],["Qazax","QAZ"],["Saki","SA"],["Sirvan","SIR"],["Sumqayit","SMC"],["Xacmaz","XAC"]]},"BHS":{"BHS":[["Bahamas","BHS"]]},"BHR":{"BHR":[["Al-Gharbiyah","10"],["Al-Hadd","1"],["Al-Manamah","3"],["Al-Muharraq","2"],["Al-Wusta","7"],["Ar-Rifa","9"],["Ash-Shamaliyah","5"],["Hammad","12"],["Isa","8"]]},"BGD":{"BGD":[["Chittagong","CGP"],["Dhaka","DAC"],["Khulna","KHL"]]},"BRB":{"BRB":[["Barbados","BRB"]]},"BEL":{"BEL":[["Antwerpen","VAN"],["Brabant-Wallone","WBR"],["Brussels","BRU"],["Hainaut","WHT"],["Liege","WLG"],["Limburg","VLI"],["Luxembourg","WLX"],["Namur","WNA"],["Oost-Vlaanderen","VOV"],["Vlaams-Brabant","VBR"],["West-Vlaanderen","VWV"]]},"BLZ":{"BLZ":[["Belize","BZ"],["Cayo","CY"],["Corozal","CR"],["Orange Walk","OW"],["Stann Creek","SC"],["Toledo","TO"]]},"BEN":{"BEN":[["Alibori","AL"],["Atakora","AK"],["Atlantique","AQ"],["Bohicon","BOH"],["Borgou","BO"],["Collines","CO"],["Donga","DO"],["Kouffo","KO"],["Littoral","LI"],["Mono","MO"],["Oueme","OU"],["Plateau","PL"],["Zou","ZO"]]},"BMU":{"BMU":[["Bermuda","BMU"]]},"BTN":{"BTN":[["Bhutan","BTN"]]},"BOL":{"BOL":[["Chuquisaca","CHU"],["Cochabamba","CBB"],["El Alto","ALT"],["El Beni","BEN"],["La Paz","LPB"],["Oruro","ORU"],["Pando","PAN"],["Potosi","POI"],["Quillacollo","QUI"],["Sacaba","SAC"],["Santa Cruz","SRZ"],["Tarija","TJA"]]},"BIH":{"BIH":[["Bosansko-Podrinjski","FBP"],["Hercegovacko-Bosanski","FHB"],["Hercegovacko-Neretvanski","FHN"],["Posavski","FPO"],["Sarajevo","FSA"],["Srednjo-Bosanski","FSB"],["Tomislavgrad","FTO"],["Tuzlanski-Podrinjski","FTU"],["Unsko-Sanski","FUS"],["Zapadno-Hercegovaki","FZH"],["Zenicko-Dobojski","FZE"]]},"BWA":{"BWA":[["Botswana","BWA"]]},"BVT":{"BVT":[["Bouvet Island","BVT"]]},"BRA":{"BRA":[["Acre","AC"],["Alagoas","AL"],["Amapa","AP"],["Amazonas","AM"],["Bahia","BA"],["Brasilia","BSB"],["Ceara","CE"],["Espirito Santo","ES"],["Goias","GO"],["Maranhao","MA"],["Mato Grosso","MT"],["Mato Grosso do Sul","MS"],["Minas Gerais","MG"],["Para","PA"],["Paraiba","PB"],["Parana","PR"],["Pernambuco","PE"],["Piaui","PI"],["Rio de Janeiro","RJ"],["Rio Grande do Norte","RN"],["Rio Grande do Sul","RS"],["Rondonia","RO"],["Roraima","RR"],["Santa Catarina","SC"],["Sao Paulo","SP"],["Sergipe","SE"],["Tocantins","TO"]]},"IOT":{"IOT":[["British Indian Ocean Territory","IOT"]]},"BRN":{"BRN":[["Brunei","BRN"]]},"BGR":{"BGR":[["Burgas","BOJ"],["Grad Sofiya","GSO"],["Khaskovo","KHO"],["Lovech","LVP"],["Montana","OZA"],["Plovdiv","PDV"],["Ruse","ROU"],["Sofiya","SOF"],["Varna","VAR"]]},"BFA":{"BFA":[["Bale","BAL"],["Bam","BAM"],["Banwa","BAN"],["Bazega","BAZ"],["Bougouriba","BOR"],["Boulgou","BLG"],["Boulkiemde","BOK"],["Comoe","COM"],["Ganzourgou","GAN"],["Gnagna","GNA"],["Gourma","GOU"],["Houet","HOU"],["Ioba","IOA"],["Kadiogo","KAD"],["Kenedougou","KEN"],["Komondjari","KOO"],["Kompienga","KOP"],["Kossi","KOS"],["Koulpelogo","KOL"],["Kouritenga","KOT"],["Kourweogo","KOW"],["Leraba","LER"],["Loroum","LOR"],["Mouhoun","MOU"],["Nahouri","NAH"],["Namentenga","NAM"],["Nayala","NAY"],["Noumbiel","NOU"],["Oubritenga","OUB"],["Oudalan","OUD"],["Passore","PAS"],["Poni","PON"],["Sanguie","SAG"],["Sanmatenga","SAM"],["Seno","SEN"],["Sissili","SIS"],["Soum","SOM"],["Sourou","SOR"],["Tapoa","TAP"],["Tuy","TUY"],["Yagha","YAG"],["Yatenga","YAT"],["Ziro","ZIR"],["Zondoma","ZOD"],["Zoundweogo","ZOW"]]},"BDI":{"BDI":[["Bubanza","BB"],["Bujumbura Mairie","BM"],["Bujumbura Rural","BU"],["Bururi","BR"],["Cankuzo","CA"],["Cibitoke","CI"],["Gitega","GI"],["Karuzi","KR"],["Kayanza","KY"],["Kirundo","KI"],["Makamba","MA"],["Muramvya","MU"],["Muyinga","MY"],["Mwaro","MW"],["Ngozi","NG"],["Rutana","RT"],["Ruyigi","RY"]]},"KHM":{"KHM":[["Banteay Mean Chey","BM"],["Bat Dambang","BA"],["Kampong Cham","KM"],["Kampong Chhnang","KZC"],["Kampong Spoe","KO"],["Kampong Thum","KZK"],["Kampot","KMT"],["Kandal","KL"],["Kaoh Kong","KKZ"],["Kracheh","KH"],["Krong Keb","KB"],["Krong Pailin","PL"],["Krong Preah","KA"],["Mondol Kiri","MWV"],["Otdar Mean Chey","OC"],["Phnum Penh","PNH"],["Pouthĭsat","PO"],["Preah Vihear","PR"],["Prey Veng","PG"],["Rotanak Kiri","RBE"],["Siem Reab","REP"],["Stoeng Treng","TNX"],["Svay Rieng","SVR"],["Takev","TK"]]},"CMR":{"CMR":[["Adamaoua","ADA"],["Centre","CEN"],["Est","EST"],["Extreme-Nord","EXN"],["Littoral","LIT"],["Nord","NOR"],["Nord-Oueste","NOT"],["Ouest","OUE"],["Sud","SUD"],["Sud-Oueste","SOU"]]},"CAN":{"CAN":[["Abbotsford","ABB"],["Barrie","BAR"],["Brampton","BRP"],["Calgary","CAL"],["Cape Breton","CBR"],["Charlottetown","CHA"],["Edmonton","EDM"],["Fredericton","FRE"],["Guelph","GLP"],["Halifax","HAL"],["Hamilton","HAM"],["Iqaluit","IQL"],["Kelowna","KWL"],["Kingston","KGN"],["London","LOD"],["Montreal","MTR"],["Oshawa","OSH"],["Ottawa","OTT"],["Quebec","QUE"],["Regina","REG"],["Saint-John's","SJB"],["Saskatoon","SAK"],["Sherbrooke","SBE"],["St. Catharines","SCA"],["Sudbury","SUD"],["Thunder Bay","THU"],["Toronto","TOR"],["Trois-Rivieres","TRR"],["Vancouver","VAN"],["Victoria","VIC"],["Whitehorse","YXY"],["Windsor","WDR"],["Winnipeg","WNP"],["Yellowknife","YZF"]]},"CPV":{"CPV":[["Boa Vista","BV"],["Brava","BR"],["Fogo","FO"],["Maio","MA"],["Mosteiros","MO"],["Paul","PA"],["Porto Novo","PN"],["Praia","PR"],["Ribeira Grande","RG"],["Sal","SL"],["Santa Catarina","CA"],["Santa Cruz","CR"],["Santiago","IA"],["Santo Antao","SA"],["Sao Domingos","SD"],["Sao Filipe","SF"],["Sao Miguel","SM"],["Sao Nicolau","SN"],["Sao Vicente","SV"],["Tarrafal","TA"]]},"CYM":{"CYM":[["Cayman Islands","CYM"]]},"CAF":{"CAF":[["Bamingui-Bangoran","BB"],["Bangui","BGF"],["Basse-Kotto","BK"],["Bimbo","BI"],["Haute-Kotto","HK"],["Haut-Mbomou","HM"],["Kemo","KG"],["Lobaye","LB"],["Mambere-Kadei","HS"],["Mbomou","MB"],["Nana-Gribizi","KB"],["Nana-Mambere","NM"],["Ombella-Mpoko","MP"],["Ouaka","UK"],["Ouham","AC"],["Ouham-Pende","OP"],["Sangha-Mbaere","SE"],["Vakaga","VK"]]},"TCD":{"TCD":[["Chad","TCD"]]},"CHL":{"CHL":[["Libertador","LI"],["Magallanes y Antartica Chilena","MA"],["Metropolitana de Santiago","RM"],["Region de Alsen del General Carlos Ibanez del","AI"],["Region de Antofagasta","AN"],["Region de Atacama","AT"],["Region de Coquimbo","CO"],["Region de la Araucania","AR"],["Region de los Lagos","LL"],["Region de Tarapaca","TA"],["Region de Valparaiso","VS"],["Region del Biobio","BI"],["Region del Maule","ML"]]},"1":{"34":[["Anqing","8"],["Bengbu","3"],["Bozhou","16"],["Chizhou","17"],["Chuzhou","11"],["Fuyang","12"],["Hefei","1"],["Huaibei","6"],["Huainan","4"],["Huangshan","10"],["Lu'an","15"],["Ma'anshan","5"],["Suzhou","13"],["Tongling","7"],["Wuhu","2"],["Xuancheng","18"]],"11":[["Changping","21"],["Chaoyang","5"],["Chongwen","3"],["Daxing","24"],["Dongcheng","1"],["Fangshan","11"],["Fengtai","6"],["Haidian","8"],["Huairou","27"],["Mentougou","9"],["Miyun","28"],["Pinggu","26"],["Shijingshan","7"],["Shunyi","13"],["Tongzhou","12"],["Xicheng","2"],["Yanqing","29"]],"50":[["Ba'nan","13"],["Beibei","9"],["Bishan","27"],["Changshou","21"],["Chengkou","29"],["Dadukou","4"],["Dazu","25"],["Dianjiang","31"],["Fengdu","30"],["Fengjie","36"],["Fuling","2"],["Hechuan","82"],["Jiangbei","5"],["Jiangjin","81"],["Jiulongpo","7"],["Kaixian","34"],["Kaixian","85"],["Liangping","28"],["Nan'an","8"],["Liangjiangxinqu","84"],["Pengshui Miao-Tujia Autonomous Country","43"],["Qianjiang","39"],["Qijiang","22"],["Rongchang","26"],["Shapingba","6"],["Shizhu Tujia Autonomous Country","40"],["Shuangqiao","11"],["Tongliang","24"],["Tongnan","23"],["Wansheng","10"],["Wanzhou","1"],["Wulong","32"],["Wushan","37"],["Wuxi","38"],["Xiushan Tujia-Miao Autonomous Country","41"],["Yongchuan","83"],["Youyang Tujia-Miao Autonomous Country","42"],["Yubei","12"],["Yunyang","35"],["Yuzhong","3"],["Zhongxian","33"]],"35":[["Fuzhou","1"],["Longyan","8"],["Nanping","7"],["Ningde","9"],["Putian","3"],["Quanzhou","5"],["Sanming","4"],["Xiamen","2"],["Zhangzhou","6"]],"62":[["Baiyin","3"],["Dingxi","11"],["Gannan Tibetan Autonomous Prefecture","30"],["Jiayuguan","5"],["Jinchang","2"],["Jiuquan","9"],["Lanzhou","1"],["Linxia Hui Autonomous Prefecture","29"],["Longnan","12"],["Pingliang","8"],["Qingyang","10"],["Tianshui","4"],["Wuwei","6"],["Zhangye","7"]],"44":[["Chaozhou","51"],["Dongguan","19"],["Foshan","6"],["Guangzhou","1"],["Heyuan","16"],["Huizhou","13"],["Jiangmen","7"],["Jieyang","52"],["Maoming","9"],["Meizhou","14"],["Qingyuan","18"],["Shantou","5"],["Shanwei","15"],["Shaoguan","2"],["Shenzhen","3"],["Yangjiang","17"],["Yunfu","53"],["Zhanjiang","8"],["Zhaoqing","12"],["Zhongshan","20"],["Zhuhai","4"]],"45":[["Baise","10"],["Beihai","5"],["Chongzuo","14"],["Fangchenggang","6"],["Guigang","8"],["Guilin","3"],["Hechi","12"],["Hezhou","11"],["Laibin","13"],["Liuzhou","2"],["Nanning","1"],["Qinzhou","7"],["Wuzhou","4"],["Yulin","9"]],"52":[["Anshun","4"],["Bijie","24"],["Guiyang","1"],["Liupanshui","2"],["Qiandongnan Miao-Dong Autonomous Prefecture","26"],["Qiannan Buyi Autonomous Prefecture","27"],["Qianxinan Buyi-Miao Autonomous Prefecture","23"],["Tongren","22"],["Zunyi","3"]],"46":[["Baisha Li Autonomous County","A30"],["Baoting Li-Miao Autonomous County","A35"],["Cengmai","A27"],["Danzhou","93"],["Ding'an","A25"],["Dongfang","97"],["Haikou","1"],["Jiang Li Autonomous County","A31"],["Ledong Li Autonomous County","A33"],["Lingao","A28"],["Lingshui Li Autonomous County","A34"],["Qionghai","92"],["Qiongzhong Li-Miao Autonomous County","A36"],["Shansha","3"],["Sanya","2"],["Tunchang","A26"],["Wanning","96"],["Wenchang","95"],["Wuzhishan","91"]],"13":[["Baoding","6"],["Cangzhou","9"],["Chengde","8"],["Handan","4"],["Hengshui","11"],["Langfang","10"],["Qinhuangdao","3"],["Shijiazhuang","1"],["Tangshan","2"],["Xingtai","5"],["Zhangjiakou","7"]],"23":[["Da Hinggan Ling","27"],["Daqing","6"],["Harbin","1"],["Hegang","4"],["Heihe","11"],["Jiamusi","8"],["Jixi","3"],["Mudanjiang","10"],["Qiqihar","2"],["Qitaihe","9"],["Shuangyashan","5"],["Suihua","12"],["Yichun","7"]],"41":[["Anyang","5"],["Hebi","6"],["Jiaozuo","8"],["Jiyuan","18"],["Kaifeng","2"],["Luohe","11"],["Luoyang","3"],["Nanyang","13"],["Pingdingshan","4"],["Puyang","9"],["Sanmenxia","12"],["Shangqiu","14"],["Xinxiang","7"],["Xinyang","15"],["Xuchang","10"],["Zhengzhou","1"],["Zhoukou","16"],["Zhumadian","17"]],"81":[["Hongkong SAR","81"]],"42":[["Enshi Tujia-Miao Autonomous Prefecture","28"],["Ezhou","7"],["Huanggang","11"],["Huangshi","2"],["Jingmen","8"],["Jingzhou","10"],["Qianjiang","95"],["Shennongjia","A21"],["Shiyan","3"],["Suizhou","13"],["Tianmen","96"],["Wuhan","1"],["Xiangyang","6"],["Xianning","12"],["Xiantao","94"],["Xiaogan","9"],["Yichang","5"]],"43":[["Changde","7"],["Changsha","1"],["Chenzhou","10"],["Hengyang","4"],["Huaihua","12"],["Loudi","13"],["Shaoyang","5"],["Xiangtan","3"],["Xiangxi Tujia-Miao Autonomous Prefecture","31"],["Yiyang","9"],["Yongzhou","11"],["Yueyang","6"],["Zhangjiajie","8"],["Zhuzhou","2"]],"15":[["Alxa","29"],["Baotou","2"],["Bayannur","8"],["Chifeng","4"],["Hohhot","1"],["Hulun Buir","7"],["Ordos","6"],["Tongliao","5"],["Ulan Qab","9"],["Wuhai","3"],["Xilin Gol","25"],["Xing'an","22"]],"32":[["Changzhou","4"],["Huai'an","8"],["Lianyungang","7"],["Nanjing","1"],["Nantong","6"],["Suqian","13"],["Suzhou","5"],["Taizhou","12"],["Wuxi","2"],["Xuzhou","3"],["Yancheng","9"],["Yangzhou","10"],["Zhenjiang","11"]],"36":[["Fuzhou","10"],["Ganzhou","7"],["Ji'an","8"],["Jingdezhen","2"],["Jiujiang","4"],["Nanchang","1"],["Pingxiang","3"],["Shangrao","11"],["Xinyu","5"],["Yichun","9"],["Yingtan","6"]],"22":[["Baicheng","8"],["Baishan","6"],["Changchun","1"],["Jilin","2"],["Liaoyuan","4"],["Siping","3"],["Songyuan","7"],["Tonghua","5"],["Yanbian Korean Autonomous Prefecture","24"]],"21":[["Anshan","3"],["Benxi","5"],["Chaoyang","13"],["Dalian","2"],["Dandong","6"],["Fushun","4"],["Fuxin","9"],["Huludao","14"],["Jinzhou","7"],["Liaoyang","10"],["Panjin","11"],["Shenyang","1"],["Tieling","12"],["Yingkou","8"]],"82":[["Macao SAR","82"]],"64":[["Guyuan","4"],["Shizuishan","2"],["Wuzhong","3"],["Yinchuan","1"],["Zhongwei","5"]],"63":[["Guoluo Tibetan Autonomous Prefecture","26"],["Haibei Tibetan Autonomous Prefecture","22"],["Haidong","21"],["Hainan Tibetan Autonomous Prefecture","25"],["Haixi Mongol-Tibetan Autonomous Prefecture","28"],["Huangnan Tibetan Autonomous Prefecture","23"],["Xining","1"],["Yushu Tibetan Autonomous Prefecture","27"]],"61":[["Ankang","9"],["Baoji","3"],["Hanzhong","7"],["Shangluo","10"],["Tongchuan","2"],["Weinan","5"],["Xi'an","1"],["Xianyang","4"],["Yan'an","6"],["Yulin","8"]],"37":[["Binzhou","16"],["Dezhou","14"],["Dongying","5"],["Heze","17"],["Jinan","1"],["Jining","8"],["Laiwu","12"],["Liaocheng","15"],["Linyi","13"],["Qingdao","2"],["Rizhao","11"],["Tai'an","9"],["Weifang","7"],["Weihai","10"],["Yantai","6"],["Zaozhuang","4"],["Zibo","3"]],"31":[["Baoshan","13"],["Changning","5"],["Chongming","30"],["Fengxian","26"],["Hongkou","9"],["Huangpu","1"],["Jiading","14"],["Jing'an","6"],["Jinshan","16"],["Luwan","3"],["Minhang","12"],["Pudong New Area","15"],["Putuo","7"],["Qingpu","29"],["Songjiang","17"],["Xuhui","4"],["Yangpu","11"],["Zhabei","8"]],"14":[["Changzhi","4"],["Datong","2"],["Jincheng","5"],["Jinzhong","7"],["Linfen","10"],["luliang","11"],["Shuozhou","6"],["Taiyuan","1"],["Xinzhou","9"],["Yangquan","3"],["Yuncheng","8"]],"51":[["Aba Tibetan-Qiang Autonomous Prefecture","32"],["Bazhong","19"],["Chengdu","1"],["Dazhou","17"],["Deyang","6"],["Garze Tibetan Autonomous Prefecture","33"],["Guang'an","16"],["Guangyuan","8"],["Leshan","11"],["Liangshan Yi Autonomous Prefecture","34"],["Luzhou","5"],["Meishan","14"],["Mianyang","7"],["Nanchong","13"],["Neijiang","10"],["Panzhihua","4"],["Suining","9"],["Ya'an","18"],["Yibin","15"],["Zigong","3"],["Ziyang","20"]],"71":[["Changhwa County","14"],["Chiayi City","7"],["Chiayi County","17"],["Hsinchu City","6"],["Hsinchu County","11"],["Hualian County","23"],["Ilan County","9"],["Kaohsiung City","2"],["Kaohsiung County","19"],["Keelung City","3"],["Miaoli County","12"],["Nantou County","15"],["Penghu County","21"],["Pingtung County","20"],["Taichung City","4"],["Taichung County","13"],["Tainan City","5"],["Tainan County","18"],["Taipei City","1"],["Taipei County","8"],["Taitung County","22"],["Taoyuan County","10"],["Yunnlin County","16"]],"12":[["Baodi","24"],["Beichen","13"],["Binghaixinqu","26"],["Dongli","10"],["Hebei","5"],["Hedong","2"],["Heping","1"],["Hexi","3"],["Hongqiao","6"],["Jinghai","23"],["Jinnan","12"],["Jixian","25"],["Nankai","4"],["Ninghe","21"],["Wuqing","22"],["Xiqing","11"]],"54":[["Lhasa","1"],["Nagqu","24"],["Ngari","25"],["Nyingchi","26"],["Qamdo","21"],["Shannan","22"],["Xigaze","23"]],"65":[["Aksu","29"],["Alar","92"],["Altay","43"],["Bayingolin Mongol Autonomous Prefecture","28"],["Beitun","95"],["Bortala Mongol Autonomous Prefecture","27"],["Changji Hui Autonomous Prefecture","23"],["Hami","22"],["Hotan","32"],["Ili Kazakh Autonomous Prefecture","40"],["Karamay","2"],["Kashi","31"],["Kizilsu Kirgiz Autonomous Prefecture","30"],["Shihezi","91"],["Tacheng","42"],["Tumsuk","93"],["Turpan","21"],["Urumqi","1"],["Wujiaqu","94"]],"53":[["Baoshan","5"],["Chuxiong Yi Autonomous Prefecture","23"],["Dali Bai Autonomous Prefecture","29"],["Dehong Dai-Jingpo Autonomous Prefecture","31"],["Diqing Tibetan Autonomous Prefecture","34"],["Honghe Hani-Yi Autonomous Prefecture","25"],["Kunming","1"],["Lijiang","7"],["Lincang","9"],["Nujiang Lisu Autonomous Prefecture","33"],["Pu'er","8"],["Qujing","3"],["Wenshan Zhuang-Miao Autonomous Prefecture","26"],["Xishuangbanna Dai Autonomous Prefecture","28"],["Yuxi","4"],["Zhaotong","6"]],"33":[["Hangzhou","1"],["Huzhou","5"],["Jiaxing","4"],["Jinhua","7"],["Lishui","11"],["Ningbo","2"],["Quzhou","8"],["Shaoxing","6"],["Taizhou","10"],["Wenzhou","3"],["Zhoushan","9"]]},"CXR":{"CXR":[["Christmas Island","CXR"]]},"CCK":{"CCK":[["Cocos(Keeling)Islands","CCK"]]},"COL":{"COL":[["Amazonas","AMZ"],["Antioquia","ANT"],["Arauca","ARA"],["Atlantico","ATL"],["Bogota","BDC"],["Bolivar","BOL"],["Boyaca","BOY"],["Caldas","CAL"],["Caqueta","CAQ"],["Casanare","CAS"],["Cauca","CAU"],["Cesar","CES"],["Choco","CHO"],["Cordoba","COR"],["Cundinamarca","CAM"],["Guainia","GNA"],["Guaviare","GVR"],["Huila","HUI"],["La Guajira","GJR"],["Magdalena","MAG"],["Meta","MET"],["Narino","NAR"],["Norte de Santander","NDS"],["Putumayo","PUT"],["Quindio","QUI"],["Risaralda","RIS"],["San Andres y Providencia","SAP"],["Santander","SAN"],["Sucre","SUC"],["Tolima","TOL"],["Valle del Cauca","VDC"],["Vaupes","VAU"],["Vichada","VIC"]]},"COM":{"COM":[["Comoros","COM"]]},"COG":{"COG":[["Congo","COG"]]},"COD":{"COD":[["Congo(DRC)","COD"]]},"COK":{"COK":[["Cook Islands","COK"]]},"CRI":{"CRI":[["Alajuela","A"],["Cartago","C"],["Guanacaste","G"],["Heredia","H"],["Limon","L"],["Puntarenas","P"],["San Jose","SJ"]]},"CIV":{"CIV":[["Agnebi","AG"],["Bafing","BF"],["Bas-Sassandra","BS"],["Denguele","DE"],["Fromager","FR"],["Haut-Sassandra","HT"],["Lacs","LC"],["Lagunes","LG"],["Marahoue","MR"],["Montagnes","DH"],["Moyen-Cavally","MV"],["Moyen-Comoe","MC"],["Nzi-Comoe","NC"],["Savanes","SV"],["Sud-Bandama","SB"],["Sud-Comoe","SC"],["Vallee du Bandama","VB"],["Worodougou","WR"],["Zanzan","ZA"]]},"HRV":{"HRV":[["Bjelovarsko-Bilogorska","7"],["Brodsko-Posavska","12"],["Dubrovacko-Neretvanska","19"],["Grad Zagreb","21"],["Istarska","18"],["Karlovacka","4"],["Koprivnicko-Krizevacka","6"],["Krapinsko-Zagorska","2"],["Licko-Senjska","9"],["Medimurska","20"],["Osjecko-Baranjska","14"],["Pozega-Slavonia","11"],["Primorsko-Goranska","8"],["Sibensko-Kninska","15"],["Sisacko-Moslavacka","3"],["Splitsko-Dalmatinska","17"],["Varazdinska","5"],["Viroviticko-Podravska","10"],["Vukovarsko-Srijemska","16"],["Zadarska","13"],["Zagrebacka","1"]]},"CUB":{"CUB":[["Camaguey","9"],["Ciego de Avila","8"],["Cienfuegos","6"],["Ciudad de la Habana","3"],["Granma","12"],["Guantanamo","14"],["Holguin","11"],["Isla de la Juventud","99"],["La Habana","2"],["Las Tunas","10"],["Manzanillo","MZO"],["Matanzas","4"],["Mayari","MAY"],["Pinar del Rio","1"],["Sancti Spiritus","7"],["Santiago de Cuba","13"],["Villa Clara","5"]]},"CYP":{"CYP":[["Famagusta","4"],["Kyrenia","6"],["Larnaca","3"],["Limassol","2"],["Nicosia","1"],["Pafos","5"]]},"CZE":{"CZE":[["Jihomoravsky","JC"],["Karlovarsky","KA"],["Kralovehradecky","KR"],["Liberecky","LI"],["Moravskoslezsky","MO"],["Olomoucky","OL"],["Pardubicky","PA"],["Plzensky","PL"],["Prague","PR"],["Stredocesky","ST"],["Ustecky","US"],["Vysocina","VY"],["Zlinsky","ZL"]]},"DNK":{"DNK":[["Aarhus","AR"],["Bornholm","BO"],["Copenhagen","CPH"],["Frederiksborg","FRE"],["Fyn","FY"],["Nordjylland","VSV"],["Ribe","RIB"],["Ringkoebing","RKG"],["Roskilde","RKE"],["Soenderjylland","VBI"],["Storstroem","ST"],["Vejle","VEJ"],["Vestsjaelland","VS"],["Viborg","VIB"]]},"DJI":{"DJI":[["Ali Sabih","S"],["Dikhil","K"],["Obock","O"],["Tadjoura","T"]]},"DMA":{"DMA":[["Dominica","DMA"]]},"DOM":{"DOM":[["Dominican Republic","DOM"]]},"ECU":{"ECU":[["Azuay","A"],["Bolivar","B"],["Canar","F"],["Carchi","C"],["Chimborazo","H"],["Cotopaxi","X"],["El Oro","O"],["Esmeraldas","E"],["Galapagos","W"],["Guayas","G"],["Imbabura","I"],["Loja","L"],["Los Rios","R"],["Manabi","M"],["Morona-Santiago","S"],["Napo, Orellana","D"],["Pastaza","Y"],["Pichincha","P"],["Sucumbios","U"],["Tungurahua","T"],["Zamora-Chinchipe","Z"]]},"EGY":{"EGY":[["Al Ghurdaqah","GBY"],["Alexandria","ALY"],["Aswan","ASW"],["Cairo","CAI"],["Shubra al Khaymah","SKH"]]},"SLV":{"SLV":[["Ahuachapan","AH"],["Apopa","APO"],["Cabanas","CA"],["Centro Sur","CS"],["Chalatenango","CH"],["Cuscatlan","CU"],["Delgado","DE"],["Ilopango","IL"],["Kie-Ntem","KN"],["La Libertad","LB"],["La Paz","PZ"],["La Union","UN"],["Litoral","LI"],["Mejicanos","MEJ"],["Morazan","MO"],["San Miguel","SM"],["San Salvador","SS"],["San Vicente","SV"],["Santa Ana","SA"],["Sonsonate","SO"],["Soyapango","SOY"],["Usulutan","US"],["Wele-Nzas","WN"]]},"ERI":{"ERI":[["Anseba","KE"],["Debub","DE"],["Debubawi Keyih Bahri","DK"],["Gash Barka","BR"],["Maekel","MA"],["Semenawi Keyih Bahri","SK"]]},"EST":{"EST":[["Harju","37"],["Hiiu","39"],["Ida-Viru","44"],["Jarva","51"],["Jogeva","49"],["Laane","57"],["Laane-Viru","59"],["Parnu","67"],["Polva","65"],["Rapla","70"],["Saare","74"],["Tartu","78"],["Valga","82"],["Viljandi","84"],["Voru","86"]]},"ETH":{"ETH":[["Adis abeba","AA"],["Afar","AF"],["Amara","AH"],["Binshangul Gumuz","BG"],["Dire Dawa","DD"],["Gambela Hizboch","GB"],["Hareri  Hizb","HR"],["Oromiya","OR"],["Sumale","SM"],["Tigray","TG"],["YeDebub Biheroch","SN"]]},"FLK":{"FLK":[["Falkland Islands","FLK"]]},"FRO":{"FRO":[["Faroe Islands","FRO"]]},"FJI":{"FJI":[["Fiji Islands","FJI"]]},"FIN":{"FIN":[["Espoo","ESP"],["Hameenlinna","HMY"],["Helsinki","HEL"],["Joensuu","JOE"],["Kajaani","KAJ"],["Kokkola","KOK"],["Kotka","KTK"],["Kuopio","KUO"],["Lahti","LHI"],["Lappeenranta","LPP"],["Mariehamn","MHQ"],["Mikkeli","MIK"],["Oulu","OLU"],["Pori","POR"],["Porvoo","PRV"],["Rovaniemi","RVN"],["Tampere","TMP"],["Turku","TKU"],["Vaasa","VAA"],["Vantaa","VAT"]]},"FRA":{"FRA":[["Aix-en-Provence","QXB"],["Ajaccio","AJA"],["Amiens","AMI"],["Arles","ARL"],["Besancon","BSN"],["Caen","CFR"],["Chalons-en-Champagne","CSM"],["Dijon","DIJ"],["Frejus","FRJ"],["Lille","LLE"],["Limoges","LIG"],["Lyon","LIO"],["Marseille","MRS"],["Metz","MZM"],["Montpellier","MPL"],["Nantes","NTE"],["Nice","NCE"],["Orleans","ORR"],["Paris","PAR"],["Rennes","RNS"],["Rouen","URO"],["Toulouse","TLS"],["Valence","VAA"]]},"PYF":{"PYF":[["Frech Polynesia","PYF"]]},"GUF":{"GUF":[["French Guiana","GUF"]]},"ATF":{"ATF":[["French Southern and Antarctic Lands","ATF"]]},"GAB":{"GAB":[["Estuaire","ES"],["Haut-Ogooue","HO"],["Moyen-Ogooue","MO"],["Ngounie","NG"],["Nyanga","NY"],["Ogooue-Ivindo","OI"],["Ogooue-Lolo","OL"],["Ogooue-Maritime","OM"],["Woleu-Ntem","WN"]]},"GMB":{"GMB":[["Gambia","GMB"]]},"GEO":{"GEO":[["Georgia","GEO"]]},"DEU":{"DEU":[["Ansbach","ANS"],["Arnsberg","ARN"],["Augsburg","AGB"],["Bayreuth","BYU"],["Berlin","BE"],["Bielefeld","BFE"],["Bochum","BOM"],["Bremen","HB"],["Brunswick","BRW"],["Chemnitz","CHE"],["Cologne","CGN"],["Darmstadt","DAR"],["Dessau","DES"],["Detmold","DET"],["Dresden","DRS"],["Dusseldorf","DUS"],["Erfurt","ERF"],["Frankfurt","FFO"],["Freiburg","FBG"],["GieBen","GBN"],["Halle","HAE"],["Hamburg","HH"],["Hannover","HAJ"],["Karlsruhe","KAE"],["Kassel","KAS"],["Kiel","KEL"],["Koblenz","KOB"],["Landshut","LDH"],["Leipzig","LEJ"],["Luneburg","LBG"],["Magdeburg","MAG"],["Mainz","MAI"],["Mannheim","MHG"],["Muenster","MUN"],["Munich","MUC"],["Nuremberg","NUE"],["Potsdam","POT"],["Schwerin","SWH"],["Stuttgart","STR"],["Trier","TRI"],["Wiesbaden","WIB"],["Wuerzburg","WUG"]]},"GHA":{"GHA":[["Ashanti","AS"],["Brong Ahafo","BA"],["Central","CE"],["Eastern","EA"],["Greater Accra","GA"],["Northern","NO"],["Obuasi","OBU"],["Upper East","UE"],["Upper West","UW"],["Volta","VO"],["Western","WE"]]},"GIB":{"GIB":[["Gibraltar","GIB"]]},"GRC":{"GRC":[["Athens","ATH"],["Chanion","CHQ"],["Cyclades","CY"],["Dodecanese","DO"],["Irakleiou","HER"],["Lasithiou","LST"],["Lesbos","LES"],["Peiraievs","PRI"],["Rethymnis","RET"],["Samos","SMI"]]},"GRL":{"GRL":[["Greenland","GRL"]]},"GRD":{"GRD":[["Grenada","GRD"]]},"GLP":{"GLP":[["Guadeloupe","GLP"]]},"GUM":{"GUM":[["Guam","GUM"]]},"GTM":{"GTM":[["Alta Verapaz","AV"],["Baja Verapaz","BV"],["Chimaltenango","CM"],["Chiquimula","CQ"],["El Progreso","PR"],["Escuintla","ES"],["Guatemala","GU"],["Huehuetenango","HU"],["Izabal","IZ"],["Jalapa","JA"],["Jutiapa","JU"],["Mixco","MIX"],["Peten","PE"],["Quetzaltenango","QZ"],["Quiche","QC"],["Retalhuleu","RE"],["Sacatepequez","ST"],["San Marcos","SM"],["Santa Rosa","SR"],["Solola","SO"],["Suchitepequez","SU"],["Totonicapan","TO"],["Villa Nueva","VIN"],["Zacapa","ZA"]]},"GGY":{"GGY":[["Guernsey","GGY"]]},"GIN":{"GIN":[["Boke","BOK"],["Conakry","CNK"],["Faranah","FRN"],["Kankan","KNK"],["Kindia","KND"],["Labe","LAB"],["Mamou","MAM"],["Nzerekore","NZR"]]},"GNB":{"GNB":[["Guinea-Bissau","GNB"]]},"GUY":{"GUY":[["Barima-Waini","BW"],["Cuyuni-Mazaruni","CM"],["Demerara-Mahaica","DM"],["East Berbice-Corentyne","EC"],["Essequibo Islands-West Demerara","EW"],["Mahaica-Berbice","MB"],["Pomeroon-Supenaam","PM"],["Potaro-Siparuni","PI"],["Upper Demerara-Berbice","UD"],["Upper Takutu-Upper Essequibo","UT"]]},"HTI":{"HTI":[["Haiti","HTI"]]},"HMD":{"HMD":[["Heard Island and McDonald Islands","HMD"]]},"HND":{"HND":[["Atlantida","AT"],["Choloma","CHO"],["Choluteca","CH"],["Colon","CL"],["Comayagua","CM"],["Copan","CP"],["Cortes","CR"],["El Paraiso","PA"],["Francisco Morazan","FM"],["Gracias a Dios","GD"],["Intibuca","IN"],["Islas de la Bahia","IB"],["La Paz","PZ"],["Lempira","LE"],["Ocotepeque","OC"],["Olancho","OL"],["Santa Barbara","SB"],["Valle","VA"],["Yoro","YO"]]},"HUN":{"HUN":[["Bacs-Kiskun","BK"],["Baranya","BA"],["Bekes","BE"],["Borsod-Abauj-Zemplen","BZ"],["Budapest","BU"],["Csongrad","CS"],["Fejer","FE"],["Gyor-Moson-Sopron","GS"],["Hajdu-Bihar","HB"],["Heves","HE"],["Jasz-Nagykun-Szolnok","JN"],["Komarom-Esztergom","KE"],["Nograd","NO"],["Pest","PE"],["Somogy","SO"],["Szabolcs-Szatmar-Bereg","SZ"],["Tolna","TO"],["Vas","VA"],["Veszprem","VE"],["Zala","ZA"]]},"ISL":{"ISL":[["Iceland","ISL"]]},"IND":{"IND":[["Aizawl","AJL"],["Bangalore","BLR"],["Bhopal","BHO"],["Bhubaneswar","BBI"],["Calcutta","CCU"],["Chandigarh","IXC"],["Chennai","MAA"],["Coimbatore","CJB"],["Daman","DAM"],["Diu","DIU"],["Gangtok","GTO"],["Imphal","IMF"],["Indore","IDR"],["Jabalpur","JLR"],["Jaipur","JAI"],["Jalandhar","JUC"],["Jodhpur","JDH"],["Karaikal","KRK"],["Kavaratti","KVA"],["Kohima","KOM"],["Madurai","IXM"],["Mahe","MAH"],["New Delhi","ICD"],["Pondicherry","PNY"],["Sambalpur","SLR"],["Shillong","SHL"],["Silvassa","SIL"],["Trivandrum","TRV"],["Udaipur","UDR"],["Yanam","SRV"]]},"IDN":{"IDN":[["Aceh","AC"],["Bali","BA"],["Banten","BT"],["Bengkulu","BE"],["Daerah Istimewa Yogyakarta","YO"],["Daerah Tingkat I Kalimantan Barat","KB"],["Irian Jaya","IJ"],["Jakarta Raya","JK"],["Jambi","JA"],["Java Barat","JB"],["Java Tengah","JT"],["Java Timur","JI"],["Kalimantan Selatan","KS"],["Kalimantan Tengah","KT"],["Kalimantan Timur","KI"],["Kepulauan Bangka Belitung","BB"],["Lampung","LA"],["Maluku","MA"],["Nusa Tenggara Barat","NB"],["Nusa Tenggara Timur","NT"],["Riau","RI"],["Sulawesi Selatan","SN"],["Sulawesi Tengah","ST"],["Sulawesi Tenggara","SG"],["Sulawesi Utara","SA"],["Sumatera Barat","SR"],["Sumatera Selatan","SS"],["Sumatera Utara","SU"]]},"IRN":{"IRN":[["Iran","IRN"]]},"IRQ":{"IRQ":[["Iraq","IRQ"]]},"IRL":{"IRL":[["Carlow","CW"],["Cavan","CV"],["Clare","CL"],["Cork","CK"],["Donegal","DG"],["Dublin","DB"],["Galway","GW"],["Kerry","KR"],["Kildare","KD"],["Kilkenny","KK"],["Laois","LA"],["Leitrim","LR"],["Limerick","LM"],["Longford","LF"],["Louth","LT"],["Mayo","MY"],["Meath","MT"],["Monaghan","MG"],["Offaly","OF"],["Roscommon","RC"],["Sligo","SL"],["Tipperary","TP"],["Waterford","WF"],["Westmeath","WM"],["Wexford","WX"],["Wicklow","WK"]]},"IMN":{"IMN":[["Isle of Man","IMN"]]},"ISR":{"ISR":[["Ashdod","ASH"],["Bat Yam","BAT"],["Beersheba","BEV"],["Haifa","HFA"],["Holon","HOL"],["Jerusalem","J"],["Netanya","NAT"],["Tel Aviv-Yafo","TLV"]]},"ITA":{"ITA":[["Alessandria","ALE"],["Ancona","AOI"],["Aosta","AOT"],["Ascoli Piceno","ASP"],["Asti","AST"],["Bari","BRI"],["Benevento","BEN"],["Bergamo","BGO"],["Biella","BIE"],["Bologna","BLQ"],["Brescia","BRC"],["Brindisi","BDS"],["Cagliari","CAG"],["Campobasso","COB"],["Caserta","CST"],["Catania","CTA"],["Catanzaro","QCZ"],["Como","CIY"],["Cosenza","QCS"],["Crotone","CRV"],["Cuneo","CUN"],["Ferrara","FRR"],["Firenze","FLR"],["Foggia","FOG"],["Genova","CAX"],["Isernia","ISE"],["L'Aquila","LAQ"],["La Spezia","SPE"],["Lecce","LCC"],["Lecco","LCO"],["Livorno","LIV"],["Massa-Carrara","MCR"],["Matera","MTR"],["Messina","MSN"],["Milano","MIL"],["Modena","MOD"],["Monza e Brianza","MZA"],["Naples","NAP"],["Novara","NVR"],["Nuoro","QNU"],["Olbia-Tempio","OLB"],["Oristano","QOS"],["Palermo","PMO"],["Parma","PMF"],["Pavia","PAV"],["Perugia","PEG"],["Pisa","PSA"],["Pordenone","PRD"],["Potenza","QPO"],["Reggio Calabria","REG"],["Reggio Emilia","RNE"],["Roma","ROM"],["Salerno","SAL"],["Sassari","QSS"],["Savona","SVN"],["Siena","SNA"],["Syracuse","SYR"],["Taranto","TAR"],["Trapani","TPS"],["Trento","TRT"],["Trieste","TRS"],["Turin","TRN"],["Udine","UDN"],["Venice","VCE"],["Vercelli","VRL"],["Viterbo","VIT"]]},"JAM":{"JAM":[["Clarendon","CLA"],["Hanover","HAN"],["Kingston","KIN"],["Manchester","MAN"],["Portland","POR"],["St. Andrews","AND"],["St. Ann","ANN"],["St. Catherine","CAT"],["St. Elizabeth","ELI"],["St. James","JAM"],["St. Mary","MAR"],["St. Thomas","THO"],["Trelawny","TRL"],["Westmoreland","WML"]]},"JPN":{"JPN":[["Aichi","23"],["Akita","5"],["Aomori","2"],["Chiba","12"],["Ehime","38"],["Fukui","18"],["Fukuoka","40"],["Fukushima","7"],["Gifu","21"],["Gunma","10"],["Hiroshima","34"],["Hokkaido","1"],["Hyogo","28"],["Ibaraki","8"],["Ishikawa","17"],["Iwate","3"],["Kagawa","37"],["Kagoshima","46"],["Kanagawa","14"],["Kochi","39"],["Kumamoto","43"],["Kyoto","26"],["Mie","24"],["Miyagi","4"],["Miyazaki","45"],["Nagano","20"],["Nagasaki","42"],["Nara","29"],["Niigata","15"],["Oita","44"],["Okayama","33"],["Okinawa","47"],["Osaka","27"],["Saga","41"],["Saitama","11"],["Shiga","25"],["Shimane","32"],["Shizuoka","22"],["Tochigi","9"],["Tokushima","36"],["Tokyo","13"],["Tottori","31"],["Toyama","16"],["Wakayama","30"],["Yamagata","6"],["Yamaguchi","35"],["Yamanashi","19"]]},"JEY":{"JEY":[["Jersey","JEY"]]},"JOR":{"JOR":[["Allun","AJ"],["Amman","AM"],["Aqaba","AQ"],["Balqa","BA"],["Irbid","IR"],["Jarash","JA"],["Karak","KA"],["Maan","MN"],["Madaba","MD"],["Mafraq","MF"],["Rusayfah","RU"],["Tafiela","TA"],["Zarqa","ZA"]]},"KAZ":{"KAZ":[["Aksu","AKS"],["Almaty","ALA"],["Aqmola","AKM"],["Aqtobe","AKT"],["Arkalyk","AYK"],["Arys","ARY"],["Astana","AST"],["Atyrau","ATY"],["Balkhash","BXH"],["Batys Qazaqstan","ZAP"],["Ekibastuz","EKB"],["Kapchagay","KAP"],["Karazhal","KZO"],["Kentau","KEN"],["Kurchatov","KUR"],["Leninogorsk","LEN"],["Lisakovsk","LKK"],["Mangghystau","MAN"],["Ongtustik Qazaqstan","KGT"],["Pavlodar","PAV"],["Qaraghandy","KAR"],["Qostanay","KST"],["Qyzylorda","KZY"],["Rudny","RUD"],["Saran","SAR"],["Semey","SEM"],["Shakhtinsk","SAK"],["Shyghys Qazaqstan","VOS"],["Soltustik Qazaqstan","SEV"],["Stepnogorsk","STE"],["Tekeli","TEK"],["Temirtau","TEM"],["Turkestan","TUR"],["Zhambyl","DMB"],["Zhanaozen","ZHA"],["Zhezkazgan","DZH"],["Zyryanovsk","ZYR"]]},"KEN":{"KEN":[["Baringo","BAR"],["Bomet","BOM"],["Bungoma","BUN"],["Busia","BUS"],["Central","CE"],["Elgeyo-Marakwet","EMA"],["Embu","EMB"],["Garissa","GAS"],["Homa Bay","HOB"],["Isiolo","ISI"],["Kajiado","KAJ"],["Kakamega","KAK"],["Kericho","KEY"],["Kiambu","KIA"],["Kilifi","KIL"],["Kirinyaga","KIR"],["Kisii","KII"],["Kisumu","KIS"],["Kitui","KIT"],["Kwale","KWA"],["Laikipia","LAI"],["Lamu","LAU"],["Machakos","MAC"],["Makueni","MAK"],["Mandera","MAN"],["Marsabit","RBT"],["Meru","MER"],["Migori","MIG"],["Mombasa","MOM"],["Muranga","MUR"],["Nairobi","NA"],["Nakuru","NUU"],["Nandi","NAN"],["Narok","NAR"],["Nithi","NIT"],["Nyamira","NYM"],["Nyandarua","NYN"],["Nyeri","NYE"],["Samburu","UAS"],["Siaya","SIA"],["Taita-Taveta","TTA"],["Tana River","TRI"],["Trans-Nzoia","TNZ"],["Turkana","TUR"],["Uasin Gishu","UGI"],["Vihiga","VIH"],["Wajir","WJR"],["West Pokot","WPO"]]},"KIR":{"KIR":[["Gilberts Islands","GIL"],["Line Islands","LIN"],["Phoenix Islands","PHO"]]},"KOR":{"26":[["Busan","26"]],"43":[["Andong","ADG"],["Bonghwa County","BHA"],["Cheongdo County","CDO"],["Cheongsong County","CSG"],["Chilgok County","CGK"],["Gimcheon","KMC"],["Goryeong County","GRG"],["Gumi","KUM"],["Gunwi County","GWI"],["Gyeongju","GJU"],["Gyeongsan","GYS"],["Mungyeong","MGG"],["Pohang","KPO"],["Sangju","SJU"],["Seongju County","SEJ"],["Uiseong County","USG"],["Uljin County","UJN"],["Ulleung County","ULG"],["Yecheon County","YEC"],["Yeongcheon","YCH"],["Yeongdeok County","YDK"],["Yeongju","YEJ"],["Yeongyang County","YYG"]],"44":[["Changnyeong County","CNG"],["Changwon","CHW"],["Geochang County","GCH"],["Geoje","KJE"],["Gimhae","KMH"],["Goseong County","GSO"],["Hadong County","HDG"],["Haman County","HAN"],["Hamyang County","HYG"],["Hapcheon County","HCE"],["Jinhae","CHF"],["Jinju","HIN"],["Masan","MAS"],["Miryang","MIR"],["Namhae County","NHE"],["Sacheon","SAH"],["Sancheong County","SCH"],["Tongyeong","TYG"],["Uiryeong County","URG"],["Yangsan","YSN"]],"27":[["Daegu","TAE"],["Dalseong-gun","DSG"],["Suseong-gu","SUS"]],"30":[["Daejeon","30"]],"42":[["Cheorwon County","CWN"],["Chuncheon","CHC"],["Donghae","TGH"],["Gangneung","KAG"],["Goseong County","GSG"],["Hoengseong County","HSG"],["Hongcheon County","HCN"],["Hwacheon County","HCH"],["Inje County","IJE"],["Jeongseon County","JSE"],["Pyeongchang County","POG"],["Samcheok","SUK"],["Sokcho","SHO"],["Taebaek","TBK"],["Wonju","WJU"],["Yanggu County","YGU"],["Yangyang County","YNY"],["Yeongwol County","YWL"]],"29":[["Gwangju","29"]],"41":[["Jeju-do","41"]],"47":[["Buan County","PUS"],["Gimje","GJE"],["Gochang County","GCG"],["Gunsan","KUV"],["Iksan","IKS"],["Imsil County","ISL"],["Jangsu County","JSU"],["Jeongeup","JEO"],["Jeonju","JNJ"],["Jinan County","JAN"],["Muju County","MJU"],["Namwon","NWN"],["Sunchang County","SCG"],["Wanju County","WAJ"]],"48":[["Boseong County","BSG"],["Damyang County","DYA"],["Gangjin County","GJN"],["Goheung County","GHG"],["Gokseong County","GSE"],["Gurye County","GRE"],["Gwangyang","KAN"],["Haenam County","HAE"],["Hampyeong County","HPG"],["Hwasun County","HSN"],["Jangheung County","JHG"],["Jangseong County","JSN"],["Jindo County","JDO"],["Mokpo","MOK"],["Muan County","MAN"],["Naju","NJU"],["Sinan County","SAN"],["Suncheon","SYS"],["Wando County","WND"],["Yeongam County","YAM"],["Yeonggwang County","YGG"],["Yeosu","YOS"]],"28":[["Incheon","28"]],"49":[["Ansan","ASN"],["Anseong","ASG"],["Anyang","ANY"],["Bucheon","BCN"],["Dongducheon","DDC"],["Gapyeong County","GPG"],["Gimpo","GMP"],["Goyang","GYG"],["Gunpo","GUN"],["Guri","GRI"],["Gwacheon","GCN"],["Gwangju","KWU"],["Gwangmyeong","GMG"],["Hanam","HNM"],["Hwaseong","HCH"],["Icheon","ICE"],["Namyangju","NYU"],["Osan","OSN"],["Paju","PJU"],["Pocheon","POC"],["Pyeongtaek","PTK"],["Seongnam","SEO"],["Siheung","SHE"],["Suwon","SUO"],["Uijeongbu","UIJ"],["Uiwang","UWN"],["Yangju","YYU"],["Yangpyeong County","YPG"],["Yeoju County","YJU"],["Yeoncheon County","YCN"],["Yongin","YNG"]],"45":[["Boeun County","BEN"],["Cheongju","CJJ"],["Cheongwon County","CWO"],["Chungju","CHU"],["Danyang County","DYG"],["Eumseong County","ESG"],["Goesan County","GSN"],["Jecheon","JCH"],["Jeungpyeong County","JYG"],["Jincheon County","JCN"],["Okcheon County","OCN"],["Yeongdong County","YDG"]],"46":[["Asan","ASA"],["Boryeong","BOR"],["Buyeo County","BYO"],["Cheonan","CHO"],["Cheongyang County","CYG"],["Dangjin County","TJI"],["Geumsan County","GSA"],["Gongju","GOJ"],["Gyeryong","GYE"],["Hongseong County","HSE"],["Nonsan","NSN"],["Seocheon County","SCE"],["Seosan","SSA"],["Taean County","TAN"],["Yeongi County","YGI"],["Yesan County","YOS"]],"11":[["Seoul","11"]],"31":[["Ulsan","31"]]},"KWT":{"KWT":[["Kuwait","KWT"]]},"KGZ":{"KGZ":[["Batken","B"],["Bishkek","GB"],["Chuy","C"],["Jalal-Abad","J"],["Kant","KAN"],["Karabalta","KBA"],["Kara-Kol","KKO"],["Kok-Jangak","KJ"],["Mailuu-Suu","MS"],["Naryn","N"],["Osh","O"],["Suluktu","SU"],["Talas","T"],["Tash-Kumyr","TK"],["Uzgen","UG"],["Ysyk-Kol","Y"]]},"LAO":{"LAO":[["Attapu","AT"],["Bokeo","BK"],["Bolikhamxai","BL"],["Champasak","CH"],["Houaphan","HO"],["Khammouan","KH"],["Louang Namtha","LM"],["Louangphrabang","LP"],["Oudomxai","OU"],["Phongsali","PH"],["Saravan","SL"],["Savannakhet","SV"],["Vientiane","VI"],["Xaignabouri","XA"],["Xaisomboun","XN"],["Xekong","XE"],["Xiangkhoang","XI"]]},"LVA":{"LVA":[["Aizkraukles","AIZ"],["Aluksnes","ALU"],["Balvu","BAL"],["Bauskas","BAU"],["Cesu","CES"],["Daugavpils","DGR"],["Dobeles","DOB"],["Gulbenes","GUL"],["Jekabpils","JEK"],["Jelgavas","JGR"],["Kraslavas","KRA"],["Kuldigas","KUL"],["Liepajas","LPK"],["Limbazu","LIM"],["Ludzas","LUD"],["Madonas","MAD"],["Ogres","OGR"],["Preilu","PRE"],["Rezeknes","RZR"],["Rigas","RGA"],["Saldus","SAL"],["Talsu","TAL"],["Tukuma","TUK"],["Valkas","VLK"],["Valmieras","VLM"],["Ventspils","VSL"]]},"LBN":{"LBN":[["Al-Biqa","BI"],["Al-Janub","JA"],["An-Nabatiyah","NA"],["Ash-Shamal","AS"],["Bayrut","BA"],["Jabal Lubnan","JL"]]},"LSO":{"LSO":[["Berea","D"],["Butha-Buthe","B"],["Leribe","C"],["Mafeteng","E"],["Maseru","A"],["Mohales Hoek","F"],["Mokhotlong","J"],["Qachas Nek","H"],["Quthing","G"],["Thaba-Tseka","K"]]},"LBR":{"LBR":[["Bomi","BM"],["Bong","BG"],["Bopolu","BOP"],["Fish Town","FT"],["Gbarpolu","GBA"],["Grand Bassa","GB"],["Grand Cape Mount","CM"],["Grand Gedeh","GG"],["Grand Kru","GK"],["Lofa","LO"],["Margibi","MG"],["Maryland","MY"],["Montserrado","MO"],["Nimba","NI"],["River Cess","RI"],["River Gee","RG"],["Sinoe","SI"]]},"LBY":{"LBY":[["Libya","LBY"]]},"LIE":{"LIE":[["Liechtenstein","LIE"]]},"LTU":{"LTU":[["Akmenes","AKM"],["Alytus","AL"],["Kaunas","KA"],["Klaipeda","KL"],["Marijampole","MA"],["Panevezys","PA"],["Siauliai","SI"],["Taurages","TA"],["Telsiu","TE"],["Utenos","UT"],["Vilnius","VI"]]},"LUX":{"LUX":[["Diekirch","DD"],["Grevenmacher","GG"],["Luxembourg","LL"]]},"MKD":{"MKD":[["Macedonia,Former Yugoslav Republic of","MKD"]]},"MDG":{"MDG":[["Antananarivo","AN"],["Antsiranana","AS"],["Fianarantsoa","FN"],["Mahajanga","MJ"],["Toamasina","TM"],["Toliary","TL"]]},"MWI":{"MWI":[["Central","C"],["Northern","N"],["Southern","S"]]},"MYS":{"JH":[["Batu Pahat","BAT"],["Johor Bahru","JHB"],["Kluang","KLA"],["Kota Tinggi","KTI"],["Mersing","MEP"],["Muar","MUA"],["Pontian","POW"],["Segamat","SGM"]],"KD":[["Baling","BLZ"],["Bandar Baharu","BMA"],["Kota Setar","KOR"],["Kuala Muda","KMU"],["Kubang Pasu","KPA"],["Kulim","KLM"],["Langkawi","LGK"],["Padang Terap","PGT"],["Pendang","PEN"]],"KN":[["Bachok","BAC"],["Gua Musang","GMU"],["Jeli","JEL"],["Kota Bharu","KBR"],["Kuala Krai","KUG"],["Machang","MAC"],["Pasir Mas","PMA"],["Pasir Putih","PPU"],["Tanah Merah","TMR"],["Tumpat","TUM"]],"KL":[["Kuala Lumpur","KUL"]],"LB":[["Labuan","LBU"],["Victoria","VIC"]],"ML":[["Alor Gajah","AOG"],["Jasin","JAS"],["Melaka","MEL"]],"NS":[["Jelebu","JEL"],["Jempol","JEP"],["Kuala Pilah","KPI"],["Port Dickson","PDI"],["Rembau","REM"],["Seremban","SRB"],["Tampin","TAI"]],"PG":[["Bentong","BEN"],["Bera","BER"],["Cameron Highlands","CAH"],["Jerantut","JER"],["Kuala Lipis","KUL"],["Kuantan","KUA"],["Maran","MAR"],["Pekan","PEK"],["Raub","RAU"],["Rompin","TOM"],["Temerloh","TEM"]],"PK":[["Batu Gajah","BGA"],["Ipoh","IPH"],["Kuala Kangsar","KAR"],["Lumut","LUM"],["Sungai Siput","SSP"],["Taiping","TPG"],["Tanjung Malim","TAM"],["Teluk Intan","TAS"]],"PS":[["Kangar","KGR"]],"PH":[["Bukit Mertajam","BMJ"],["Butterworth","BWH"],["George Town","PEN"],["Nibong Tebal","NTE"]],"SB":[["Beaufort","BEF"],["Beluran","BEL"],["Keningau","KEG"],["Kinabatangan","KBT"],["Kota Belud","KBD"],["Kota Kinabalu","BKI"],["Kota Marudu","KMU"],["Kuala Penyu","KPU"],["Kudat","KUD"],["Kunak","KUN"],["Lahad Datu","LDU"],["Nabawan","NAB"],["Papar","PAP"],["Penampang","PMP"],["Pitas","PIT"],["Ranau","RNU"],["Sandakan","SDK"],["Semporna","SMM"],["Sipitang","SPT"],["Tambunan","TAB"],["Tawau","TAW"],["Tenom","TEN"],["Tuaran","TUR"]],"SR":[["Betong","BTG"],["Bintulu","BTU"],["Kapit","KPI"],["Kuching","KCH"],["Limbang","LMN"],["Miri","MYY"],["Mukah","MKM"],["Samarahan","SMH"],["Sarikei","SAR"],["Sibu","SBW"],["Sri Aman","SAM"]],"SL":[["Gombak","GOM"],["Hulu Langat","HUL"],["Hulu Selangor","HUS"],["Kuala Langat","KLG"],["Kuala Selangor","KSL"],["Petaling","PJA"],["Sabak Bernam","SBM"],["Sepang","SEP"]],"TR":[["Besut","BES"],["Dungun","DGN"],["Hulu","HUL"],["Kemaman","KEM"],["Kuala Terengganu","TGG"],["Marang","MAR"],["Setiu","SET"]]},"MDV":{"MDV":[["Addu Atoll","ADD"],["Faadhippolhu","FAA"],["Felidhu Atoll","FEA"],["Foammulah","FMU"],["Hadhdhunmathi","HDH"],["Kolhumadulu","KLH"],["Male","MAL"],["Male Atoll","MAA"],["Mulakatholhu","MUA"],["North Ari Atoll","AAD"],["North Huvadhu Atoll","HAD"],["North Maalhosmadhulu","MAD"],["North Miladhunmadhulu","MLD"],["North Nilandhe Atoll","NAD"],["North Thiladhunmathi","THD"],["South Ari Atoll","AAU"],["South Huvadhu Atoll","HAU"],["South Maalhosmadulu","MAU"],["South Miladhunmadhulu","MLU"],["South Nilandhe Atoll","NAU"],["South Thiladhunmathi","THU"]]},"MLI":{"MLI":[["Bamako","CD"],["Gao","GA"],["Kayes","KY"],["Kidal","KD"],["Koulikoro","KL"],["Mopti","MP"],["Segou","SG"],["Sikasso","SK"],["Tombouctou","TB"]]},"MLT":{"MLT":[["Malta","MLT"]]},"MHL":{"MHL":[["Marshall Islands","MHL"]]},"MTQ":{"MTQ":[["Martinique","MTQ"]]},"MRT":{"MRT":[["Adrar","AD"],["Brakna","BR"],["Dakhlet Nouadhibou","DN"],["El-Acaba","AS"],["Gorgol","GO"],["Guidimaka","GM"],["Hodh ech-Chargui","HC"],["Hodh el-Gharbi","HG"],["Inchiri","IN"],["Nouakchott","NO"],["Tagant","TA"],["Tiris Zemmour","TZ"],["Trarza","TR"]]},"MUS":{"MUS":[["Mauritius","MUS"]]},"MYT":{"MYT":[["Mayotte","MYT"]]},"MEX":{"MEX":[["Acapulco","ACA"],["Aguascalientes","AGU"],["Benito Juare","BJU"],["Campeche","CAM"],["Carmen","CAR"],["Celaya","CLY"],["Cheturnal","CTM"],["Chihuahua","CHH"],["Chilpancingo","CHI"],["Coatzacoalcos","COA"],["Colima","COL"],["Cuernavaca","CVC"],["Culiacan","CUL"],["Durango","DUR"],["Ensenada","ESE"],["Guadalajara","GDL"],["Guanajuato","GUA"],["Hermosillo","HMO"],["Irapuato","IRP"],["Jalapa","JAL"],["Juarez","JUZ"],["La Paz","LAP"],["Leon","LEN"],["Los Mochis","LMM"],["Matamoros","MAM"],["Mazatlan","MZT"],["Merida","MID"],["Mexicali","MXL"],["Mexico City","MEX"],["Monclova","LOV"],["Monterrey","MTY"],["Morelia","MLM"],["Nogales","NOG"],["Nuevo Laredo","NLE"],["Oaxaca","OAX"],["Obregon","OBR"],["Orizaba","ORI"],["Pachuca","PAC"],["Poza Rica de Hidalgo","PRH"],["Puebla","PUE"],["Puerto Vallarta","PVR"],["Queretaro","QUE"],["Reynosa","REX"],["Saltillo","SLW"],["San Luis Potosi","SLP"],["Tampico","TAM"],["Tapachula","TAP"],["Tehuacan","TCN"],["Tepic","TPQ"],["Tijuana","TIJ"],["Tlaxcala","TLA"],["Toluca","TLC"],["Torreon","TRC"],["Tuxtla Gutierrez","TGZ"],["Uruapan","UPN"],["Valles","VHM"],["Veracruz","VER"],["Victoria","VIC"],["Villahermosa","VSA"],["Zacatecas","ZAC"]]},"FSM":{"FSM":[["Micronesia","FSM"]]},"MDA":{"MDA":[["Moldova","MDA"]]},"MCO":{"MCO":[["Monaco","MCO"]]},"MNG":{"MNG":[["Arhangay","73"],["Bayanhongor","69"],["Bayan-Ulgiy","71"],["Bulgan","67"],["Darhan-Uul","37"],["Dornod","61"],["Dornogovi","63"],["Dundgovi","59"],["Dzavhan","57"],["Govi-Altay","65"],["Govisumber","64"],["Hentiy","39"],["Hovd","43"],["Hovsgol","41"],["Orhon","35"],["Selenge","49"],["Suhbaatar","51"],["Tov","47"],["Ulaanbaatar hot","1"],["Umnogovi","UMN"],["Uvorhangay","UVO"],["Uvs","46"]]},"MSR":{"MSR":[["Montserrat","MSR"]]},"MAR":{"MAR":[["Casablanca","CBL"],["Fes","FES"],["Marrakech","MRK"],["Meknes","MKN"],["Oujda","OUJ"],["Rabat","RSA"],["Tangier","TGR"],["Tetouan","TET"],["Western Sahara","WSH"]]},"MOZ":{"MOZ":[["Mozambique","MOZ"]]},"MMR":{"MMR":[["Ayeyarwady","AY"],["Bago","BG"],["Chin","CH"],["Kachin","KC"],["Kayah","KH"],["Kayin","KN"],["Magway","MG"],["Mandalay","MD"],["Mon","MN"],["Rakhine","RK"],["Sagaing","SG"],["Shan","SH"],["Tanintharyi","TN"],["Yangon","YG"]]},"NAM":{"NAM":[["Caprivi","CA"],["Erongo","ER"],["Hardap","HA"],["Karas","KR"],["Khomas","KH"],["Kunene","KU"],["Ohangwena","OW"],["Okavango","KV"],["Omaheke","OK"],["Omusati","OT"],["Oshana","ON"],["Oshikoto","OO"],["Otjozondjupa","OJ"]]},"NRU":{"NRU":[["Nauru","NRU"]]},"NPL":{"NPL":[["Bagmati","BA"],["Bheri","BH"],["Dhawalagiri","DH"],["Gandaki","GA"],["Janakpur","JA"],["Karnali","KA"],["Kosi","KO"],["Lumbini","LU"],["Mahakali","MA"],["Mechi","ME"],["Narayani","NA"],["Rapti","RA"],["Seti","SE"],["Sogarmatha","SA"]]},"NLD":{"NLD":[["'s-Hertogenbosch","HTB"],["Almere","AER"],["Amersfoort","AME"],["Amsterdam","AMS"],["Apeldoorn","APE"],["Arnhem","ARN"],["Assen","ASS"],["Breda","BRD"],["Dordrecht","DOR"],["Ede","EDE"],["Eindhoven","EIN"],["Emmen","EMM"],["Enschede","ENS"],["Groningen","GRQ"],["Haarlem","HRA"],["Hague","HAG"],["Hoofddorp","HFD"],["Leeuwarden","LWR"],["Leiden","LID"],["Lelystad","LEY"],["Maastricht","MST"],["Middelburg","MDL"],["Nijmegen","NIJ"],["Rotterdam","RTM"],["Tilburg","TLB"],["Utrecht","UTC"],["Zoetermeer","ZTM"],["Zwolle","ZWO"]]},"ANT":{"ANT":[["Netherlands Antilles","ANT"]]},"NCL":{"NCL":[["New Caledonia","NCL"]]},"NZL":{"NZL":[["Auckland","AUK"],["Blenheim","BHE"],["Christchurch","CHC"],["Dunedin","DUD"],["Far North","FNR"],["Gisborne","GIS"],["Greymouth","GMN"],["Hamilton","HLZ"],["Hastings","HAS"],["Invercargill","IVC"],["Kaipara","KAI"],["Manukau","MNK"],["Napier","NPE"],["Nelson","NSN"],["New Plymouth","NPL"],["North Shore","NSH"],["Palmerston North","PMR"],["Richmond","RMD"],["Stratford","STR"],["Taumarunui","TAU"],["Waitakere","WAE"],["Wanganui","WAG"],["Whakatane","WHK"],["Whangarei","WRE"]]},"NIC":{"NIC":[["Atlantico Norte","AN"],["Atlantico Sur","AS"],["Boaco","BO"],["Carazo","CA"],["Chinandega","CD"],["Chontales","CT"],["Esteli","ES"],["Granada","GR"],["Jinotega","JI"],["Leon","LE"],["Madriz","MD"],["Managua","MN"],["Masaya","MS"],["Matagalpa","MT"],["Nueva Segovia","NS"],["Rio San Juan","SJ"],["Rivas","RV"]]},"NER":{"NER":[["Agadez","AJY"],["Diffa","DIF"],["Dosso","DSS"],["Maradi","MFQ"],["Niamey C.U.","NIM"],["Tahoua","THZ"],["Tillaberi","TIL"],["Zinder","ZND"]]},"NGA":{"NGA":[["Abuja","ABV"],["Ibadan","IBA"],["Kano","KAN"],["Lagos","LOS"],["Ogbomosho","OGB"]]},"NIU":{"NIU":[["Niue","NIU"]]},"NFK":{"NFK":[["Norfolk Island","NFK"]]},"PRK":{"PRK":[["Ch'ongjin","CHO"],["Haeju","HAE"],["Hamhung","HAM"],["Hyesan","HYE"],["Kaesong","KSN"],["Kanggye","KAN"],["Namp'o","NAM"],["Naseon","NAS"],["Pyongyang","FNJ"],["Sariwon","SAR"],["Sinuiju","SII"],["Wonsan","WON"]]},"MNP":{"MNP":[["Northern Mariana Islands","MNP"]]},"NOR":{"NOR":[["Akershus","2"],["Aust-Agder","9"],["Buskerud","6"],["Finnmark","20"],["Hedmark","4"],["Hordaland","12"],["More og Romsdal","15"],["Nordland","18"],["Nord-Trondelag","17"],["Oppland","5"],["Oslo","3"],["Ostfold","1"],["Rogaland","11"],["Sogn og Fjordane","14"],["Sor-Trondelag","16"],["Telemark","8"],["Troms","19"],["Vest-Agder","10"],["Vestfold","7"]]},"OMN":{"OMN":[["Ad-Dakhiliyah","DA"],["Al-Batinah","BA"],["Al-Wusta","WU"],["Ash-Sharqiyah","SH"],["Az-Zahirah","ZA"],["Masqat","MA"],["Musandam","MU"],["Zufar","ZU"]]},"PAK":{"PAK":[["Faisalabad","LYP"],["Gujranwala","GUJ"],["Hyderabad","HDD"],["Islamabad","ISB"],["Karachi","KCT"],["Lahore","LHE"],["Multan","MUX"],["Peshawar","PEW"],["Rawalpindi","RWP"]]},"PLW":{"PLW":[["Palau","PLW"]]},"PSE":{"PSE":[["Gaza Strip","GZ"],["West Bank","WE"]]},"PAN":{"PAN":[["Panama","PAN"]]},"PNG":{"PNG":[["Bougainville","BV"],["East New Britain","EB"],["East Sepik","ES"],["Eastern Highlands","EH"],["Enga","EN"],["Gulf","GU"],["Madang","MD"],["Manus","MN"],["Milne Bay","MB"],["Morobe","MR"],["New Ireland","NI"],["Northern","NO"],["Port Moresby","NC"],["Sandaun","SA"],["Simbu","SI"],["Southern Highlands","SH"],["West New Britain","WB"],["Western","WE"],["Western Highlands","WH"]]},"PRY":{"PRY":[["Alto Paraguay","AG"],["Alto Parana","AN"],["Amambay","AM"],["Asuncion","AS"],["Boqueron","BO"],["Caaguazu","CG"],["Caazapa","CZ"],["Canindeyu","CN"],["Central","CE"],["Concepcion","CC"],["Cordillera","CD"],["Guaira","GU"],["Itapua","IT"],["Misiones","MI"],["Neembucu","NE"],["Paraguari","PA"],["Presidente Hayes","PH"],["San Pedro","SP"]]},"PER":{"PER":[["Amazonas","AM"],["Ancash","AN"],["Apurimac","AP"],["Arequipa","AR"],["Ayacucho","AY"],["Cajamarca","CJ"],["Callao","CL"],["Chimbote","CHM"],["Chincha Alta","CHI"],["Cusco","CU"],["Huancavelica","HV"],["Huanuco","HO"],["Ica","IC"],["Juliaca","JUL"],["Junin","JU"],["La Libertad","LD"],["Lambayeque","LY"],["Lima","LI"],["Loreto","LO"],["Madre de Dios","MD"],["Moquegua","MO"],["Pasco","PA"],["Piura","PI"],["Puno","PU"],["San Martin","SM"],["Sullana","SUL"],["Tacna","TA"],["Tumbes","TU"],["Ucayali","UC"]]},"PHL":{"PHL":[["Caloocan","CAO"],["Cebu","CEB"],["Davao","DOR"],["Manila","MNL"]]},"PCN":{"PCN":[["Pitcairn Islands","PCN"]]},"POL":{"POL":[["Biała Podlaska","BAP"],["Białystok","BIA"],["Bydgoszcz","BZG"],["Bytom","BYT"],["Chełm","CHO"],["Chorzow","CHZ"],["Ciechanow","CIE"],["Dabrowa Gornicza","DAB"],["Elbląg","ELB"],["Gdansk","GDN"],["Gdynia","GDY"],["Gliwice","GWC"],["Gorzow Wlkp","GOW"],["Grudziadz","GRU"],["Jaworzno","JAW"],["Jelenia Gora","JEG"],["Kalisz","KAL"],["Katowice","KTW"],["Kielce","KLC"],["Konin","KON"],["Koszalin","OSZ"],["Krakow","KRK"],["Krosno","KRO"],["Legnica","LEG"],["Leszno","LEZ"],["Lodz","LOD"],["Lomza","QOY"],["Lublin","LUL"],["Mysłowice","MYL"],["Nowy Sacz","NOW"],["Olsztyn","OLS"],["Opole","OPO"],["Ostrołeka","OSS"],["Piła","PIL"],["Piotrkow","PIO"],["Plock","PLO"],["Poznan","POZ"],["Przemysl","PRZ"],["Radom","RDM"],["Ruda Sl","RDS"],["Rzeszow","RZE"],["Siedlce","SDC"],["Siemianowice Sl","SOW"],["Sieradz","SIR"],["Skierniewice","SKI"],["Slupsk","SLP"],["Sopot","SOP"],["Sosnowiec","SWC"],["Suwałki","SWL"],["Swietochłowice","SWT"],["Swinoujscie","SWI"],["Szczecin","SZZ"],["Tarnobrzeg","QEP"],["Tarnow","TAR"],["Torun","TOR"],["Tychy","TYY"],["Walbrzych","WZH"],["Warszawa","WAW"],["Wlocławek","WLO"],["Wroclaw","WRO"],["Zabrze","ZAB"],["Zamosc","ZAM"],["Zielona Gora","IEG"]]},"PRT":{"PRT":[["Alentejo Central","ALC"],["Alentejo Litoral","ALL"],["Alto Alentejo","AAT"],["Alto Tros-os-Montes","ATM"],["Ave","AES"],["Baixo Alentejo","BAL"],["Baixo Mondego","BMO"],["Baixo Vouga","BVO"],["Beira Interior Norte","BIN"],["Beira Interior Sul","BIS"],["Cavado","CAV"],["Cova da Beira","CLB"],["Douro","MDR"],["Entre Douro e Vouga","EDV"],["Faro","FAO"],["Funchal","FUN"],["Leziria do Tejo","LTE"],["Lisboa","LIS"],["Medio Tejo","MTE"],["Minho-Lima","MLI"],["Oeste","OES"],["Peninsula de Setubal","PSE"],["Pinhal Interior Norte","PIN"],["Pinhal Interior Sul","PIS"],["Pinhal Litoral","PLT"],["Ponta Delgada","PDL"],["Porto","VDP"],["Serra da Estrela","SES"],["Tamega","TAM"]]},"PRI":{"PRI":[["Puerto Rico","PRI"]]},"QAT":{"QAT":[["Ad Dawhah","DW"],["Al Ghuwariyah","GW"],["Al Jumaliyah","JM"],["Al Khawr","KR"],["Al Wakrah","WK"],["Ar Rayyan","RN"],["Jariyan al Batnah","JB"],["Madinat ach Shamal","MS"],["Umm Salal","UL"]]},"REU":{"REU":[["Reunion","REU"]]},"ROU":{"ROU":[["Alba Iulia","AL"],["Alexandria","AD"],["Arad","AR"],["Bacau","BA"],["Baia Mare","BM"],["Bistrita","BN"],["Botosani","BO"],["Braila","BL"],["Brasov","BS"],["Bucuresti","BC"],["Buzau","BZ"],["Calarasi","CR"],["Cluj-Napoca","CN"],["Constanta","CT"],["Craiova","DO"],["Deva","DE"],["Drobeta-Turnu Severin","DT"],["Focsani","FO"],["Galati","GL"],["Giurgiu","GG"],["Iasi","IS"],["Miercurea-Ciuc","MC"],["Oradea","OR"],["Piatra Neamt","PN"],["Pitesti","PI"],["Ploiesti","PL"],["Resita","RE"],["Satu Mare","SM"],["Sfantu-Gheorghe","SG"],["Sibiu","SO"],["Slatina","ST"],["Slobozia","SB"],["Suceava","SU"],["Targovişte","TA"],["Timisoara","TI"],["Tirgu Mures","TM"],["Tirgu-Jiu","TJ"],["Tulcea","TU"],["Vaslui","VA"],["XRimnicu Vilcea","VI"],["Zalau","ZA"]]},"RUS":{"RUS":[["Abakan","ABA"],["Aginskoye","AGI"],["Anadyr","DYR"],["Arkhangelsk","ARK"],["Astrakhan","AST"],["Barnaul","BAX"],["Belgorod","BEL"],["Birobidzan","BBZ"],["Blagoveshchensk","BQS"],["Bryansk","BRY"],["Chabarovsk","COK"],["Cheboksary","CSY"],["Chelyabinsk","CHE"],["Cherkessk","CKS"],["Chita","CHI"],["Elista","ESL"],["Gorno-Altajsk","GOA"],["Grozny","GRV"],["Irkutsk","IKT"],["Ivanovo","IVO"],["Izhevsk","IJK"],["Jakutsk","JAK"],["Jaroslavl","JAR"],["Jekaterinburg","JEK"],["Juzno-Sachalinsk","JSA"],["Kaliningrad","KGD"],["Kaluga","KLF"],["Kazan","KZN"],["Kemerovo","KEM"],["Khanty-Mansiysk","KHM"],["Kirov","KIR"],["Kostroma","KOS"],["Krasnodar","KRR"],["Krasnojarsk","KYA"],["Kudymkar","KUD"],["Kurgan","KRO"],["Kursk","URS"],["Kyzyl","KYZ"],["Lipeck","LIP"],["Magadan","MAG"],["Magas","IN"],["Makhachkala","MCX"],["Maykop","MAY"],["Moscow","MOW"],["Murmansk","MMK"],["Nalchik","NAL"],["Naryan-Mar","NNM"],["Niznij Novgorod","GOJ"],["Novosibirsk","NVS"],["Omsk","OMS"],["Orel","ORL"],["Orenburg","ORE"],["Palana","PAL"],["Penza","PNZ"],["Perm","PER"],["Petropavlovsk-Kamchatskiy","PKC"],["Petrozavodsk","PES"],["Pskov","PSK"],["Rostov-na-Donu","ROS"],["Ryazan","RYA"],["Salekhard","SLY"],["Samara","SAM"],["Saransk","SKX"],["Saratov","SAR"],["Smolensk","LNX"],["St. Peterburg","SPE"],["Stavropol","STA"],["Syktyvkar","SCW"],["Tambov","TAM"],["Tomsk","TOM"],["Tula","TUL"],["Tver","TVE"],["Tyumen","TYU"],["Ufa","UFA"],["Ulan-Ude","UUD"],["Uljanovsk","ULY"],["Ust-Ordynsky","UOB"],["Velikij Novgorod","VUS"],["Vladikavkaz","VLA"],["Vladimir","VMR"],["Vladivostok","VVO"],["Volgograd","VOG"],["Vologda","VLG"],["Voronezh","VOR"],["Yoshkar-Ola","YOL"]]},"RWA":{"RWA":[["Butare","BU"],["Byumba","BY"],["Cyangugu","CY"],["Gikongoro","GK"],["Gisenyi","GS"],["Gitarama","GT"],["Kabuga","KA"],["Kibungo","KG"],["Kibuye","KY"],["Kigali-Ngali","KR"],["Kigali-Ville","KV"],["Nyanza","NY"],["Ruhango","RH"],["Ruhengeri","RU"],["Rwamagana","RW"],["Umutara","UM"]]},"WSM":{"WSM":[["Samoa","WSM"]]},"SMR":{"SMR":[["San Marino","SMR"]]},"STP":{"STP":[["Sao Tome and Principe","STP"]]},"SAU":{"SAU":[["Abha","AHB"],["Al Bahah","BH"],["Al-Hufuf","HFF"],["Al-Jubayl","JBI"],["Al-Kharj","AKH"],["Al-Mubarraz","MBR"],["Arar","ARA"],["At Tarif","TAR"],["Buraydah","BUR"],["Dammam","DAM"],["Hafar al-Batin","HBT"],["Hail","HL"],["Jiddah","JED"],["Jizan","JZ"],["Khamis Mushayt","KMX"],["Makkah","ML"],["Medina","MED"],["Najran","NR"],["Riyad","RD"],["Sakaka","SAK"],["Tabuk","TB"],["Yanbu al-Bahr","YNB"]]},"SEN":{"SEN":[["Dakar","DA"],["Diourbel","DI"],["Fatick","FA"],["Kaolack","KA"],["Kolda","KO"],["Louga","LO"],["Matam","MA"],["Saint-Louis","SL"],["Tambacounda","TA"],["Thies","TH"],["Ziguinchor","ZI"]]},"SCG":{"SCG":[["Beograd","BEG"],["Kragujevac","KGV"],["Nis","INI"],["Novi Sad","NVS"],["Podgorica","POD"],["Pristina","PRN"],["Subotica","SUB"],["Zemun","ZEM"]]},"SYC":{"SYC":[["Seychelles","SYC"]]},"SLE":{"SLE":[["Eastern","E"],["Northern","N"],["Southern","S"],["Western","W"]]},"SGP":{"SGP":[["Singapore","SGP"]]},"SVK":{"SVK":[["Banskobystricky","BBY"],["Bratislavsky","BTS"],["Koricky","KOR"],["Nitriansky","NRA"],["Prerovsky","POV"],["Rilinsky","RIL"],["Trenriansky","TRE"],["Trnavsky","TNA"]]},"SVN":{"SVN":[["Dolenjska","DLJ"],["Gorenjska","GSZ"],["Goriska","GSK"],["Koroska","KOR"],["Notranjsko-kraska","NKR"],["Obalno-kraska","OKR"],["Osrednjeslovenska","OSR"],["Podravska","POD"],["Pomurska","POM"],["Savinjska","SAV"],["Spodnjeposavska","SPO"],["Zasavska","ZAS"]]},"SLB":{"SLB":[["Central Islands","CE"],["Choiseul","CH"],["Guadalcanal","GC"],["Honiara","HO"],["Isabel","IS"],["Makira","MK"],["Malaita","ML"],["Rennell and Bellona","RB"],["Temotu","TM"],["Western","WE"]]},"SOM":{"SOM":[["Somalia","SOM"]]},"ZAF":{"ZAF":[["Barkley East","BAE"],["Beaufort West","BEW"],["Bisho","BIY"],["Bloemfontein","BFN"],["Bredasdorp","BDD"],["Bronkhorstspruit","BHT"],["Cape Town","CPT"],["De Aar","DAA"],["Dundee","DUN"],["Durban","DUR"],["East London","ELS"],["George","GRJ"],["Giyani","GIY"],["Groblersdal","GBD"],["Ixopo","IXO"],["Johannesburg","JNB"],["Kimberley","KIM"],["Klerksdorp","KXE"],["Kuruman","KMH"],["Ladysmith","LAY"],["Middelburg","MDB"],["Mkuze","MZQ"],["Moorreesburg","MOO"],["Mount Ayliff","MAY"],["Nelspruit","NLP"],["Newcastle","NCS"],["Nylstroom","NYL"],["Pietermaritzburg","PZB"],["Pietersburg","PTG"],["Port Elizabeth","PLZ"],["Port Shepstone","PSS"],["Pretoria","PRY"],["Queenstown","UTW"],["Randfontein","RFT"],["Richards Bay","RCB"],["Rustenburg","RSB"],["Sasolburg","SAS"],["Secunda","ZEC"],["Springbok","SBU"],["Thohoyandou","THY"],["Thulamahashe","TLH"],["Trompsburg","TPB"],["Ulundi","ULD"],["Umtata","UTT"],["Upington","UTN"],["Vereeniging","VGG"],["Vryburg","VRU"],["Welkom","WEL"],["Witsieshoek","WSH"],["Worcester","WOR"]]},"SGS":{"SGS":[["South Georgia and South Sandwich Islands","SGS"]]},"ESP":{"ESP":[["Alava","ALA"],["Albacete","ALB"],["Alicante","ALC"],["Almeria","LEI"],["Asturias","AST"],["Avila","AVI"],["Badajoz","BJZ"],["Baleares","BLR"],["Barcelona","BCN"],["Burgos","BUR"],["Caceres","CCS"],["Cadiz","CAD"],["Castellon","CAS"],["Cludad Real","CIR"],["Cordoba","ODB"],["Cuenca","CUE"],["Gerona","GRO"],["Granada","GRX"],["Guadalajara","GUA"],["Guipuzcoa","GUI"],["Huelva","HUV"],["Huesca","HUC"],["Jaen","JAE"],["La Coruna","LCG"],["La Rioja","ARL"],["Las Palmas","LPA"],["Leon","LEN"],["Lleida","LLE"],["Madrid","MAD"],["Malaga","AGP"],["Murcia","MJV"],["Navarra","NVV"],["Orense","ORE"],["Palencia","PAC"],["Provincia de Lugo","LGO"],["Provincia de Pontevedra","PEV"],["Salamanca","SLM"],["Santa Cruz de Tenerife","SCT"],["Santander","SDR"],["Segovia","SEG"],["Sevilla","SVQ"],["Soria","SOR"],["Tarragona","TAR"],["Teruel","TER"],["Toledo","TOL"],["Valencia","VLC"],["Valladolid","VLL"],["Vizcaya","VSE"],["Zamora","ZMR"],["Zaragoza","ZAZ"]]},"LKA":{"LKA":[["Ampara","AMP"],["Anuradhapura","ADP"],["Badulla","BAD"],["Batticaloa","BTC"],["Colombo","CMB"],["Galle","GAL"],["Gampaha","GAM"],["Hambantota","HBA"],["Jaffna","JAF"],["Kalutara","KLT"],["Kandy","KAN"],["Kegalle","KEG"],["Kilinochchi","KIL"],["Kurunegala","KUR"],["Mannar","MAN"],["Matale","MAT"],["Matara","MAA"],["Monaragala","MON"],["Mullathivu","MUL"],["Nuwara Eliya","NUE"],["Polonnaruwa","POL"],["Puttalam","PUT"],["Ratnapura","RAT"],["Trincomalee","TRR"],["Vavuniya","VAV"]]},"SHN":{"SHN":[["St.Helena","SHN"]]},"KNA":{"KNA":[["St.Kitts and Nevis","KNA"]]},"LCA":{"LCA":[["St.Lucia","LCA"]]},"SPM":{"SPM":[["St.Pierre and Miquelon","SPM"]]},"VCT":{"VCT":[["St.Vincent and the Grenadines","VCT"]]},"SDN":{"SDN":[["Aali an-Nil","ANB"],["Al Wasta","WDH"],["Al-Istiwaiyah","SIS"],["Al-Khartum","KRT"],["Ash-Shamaliyah","ASH"],["Ash-Sharqiyah","SHA"],["Bahr al-Ghazal","SBG"],["Darfur","SDA"],["Kurdufan","GKU"]]},"SUR":{"SUR":[["Brokopondo","BR"],["Commewijne","CM"],["Coronie","CR"],["Marowijne","MA"],["Nickerie","NI"],["Para","PA"],["Paramaribo","PM"],["Saramacca","SA"],["Sipaliwini","SI"],["Wanica","WA"]]},"SJM":{"SJM":[["Svalbard and Jan Mayen","SJM"]]},"SWZ":{"SWZ":[["Swaziland","SWZ"]]},"SWE":{"SWE":[["Blekinge","K"],["Dalarnas","DLN"],["Gavleborgs","X"],["Gotlands","I"],["Hallands","N"],["Jamtlands","Z"],["Jonkopings","F"],["Kalmar","H"],["Kronobergs","G"],["Norrbottens","BD"],["Orebro","T"],["Skane","M"],["Sodermanlands","D"],["Stockholms","AB"],["Uppsala","C"],["Ustergotland","UGL"],["Varmlands","S"],["Vasterbottens","AC"],["Vasternorrlands","Y"],["Vastmanlands","U"],["Vastra Gotalands","O"]]},"CHE":{"CHE":[["Aargau","AG"],["Appenzell Ausserrhon","AR"],["Appenzell Innerrhodn","AI"],["Basel Landschaft","BL"],["Basel－Sstadt","BS"],["Bern","BE"],["Freiburg","FR"],["Geneve","GE"],["Glarus","GL"],["Graubünden","GR"],["Jura","JU"],["Lausanne","LA"],["Luzern","LU"],["Neuchatel","NE"],["Nidwalden","NW"],["Obwalden","OW"],["Schaffhausen","SH"],["Schwyz","SZ"],["Solothurn","SO"],["St.Gallen","SG"],["Thurgau","TG"],["Ticino","TI"],["Uri","UR"],["Vaud","VD"],["Wallis","VS"],["Zug","ZG"],["Zurich","ZH"]]},"SYR":{"SYR":[["Al Ghab","GH"],["Al Hasakah","HA"],["Al Ladhiqiyah","LA"],["Al Qunaytirah","QU"],["Al-Qamishli","QA"],["Ar Raqqah","RQ"],["As Suwayda","SU"],["Dara","DA"],["Dayr az Zawr","DZ"],["Halab","HL"],["Hamah","HM"],["Hims","HI"],["Idlib","ID"],["Madinat Dimashq","DI"],["Rif Dimashq","RD"],["Tartus","TA"]]},"TJK":{"TJK":[["Dushanbe","DYU"],["Isfara","ISF"],["Kanibadam","KAN"],["Khorugh","KHO"],["Khujand","KHU"],["Kofarnihon","KOF"],["Kulob","KLB"],["Kurgan-Tjube","KTJ"],["Nurek","NUR"],["Pendzhikent","PJK"],["Rogun","RGU"],["Sarband","SBA"],["Taboshar","TBS"],["Tursunzade","TSZ"],["Ura-Tjube","UTJ"]]},"TZA":{"TZA":[["Arusha","AR"],["Dar es Salaam","DS"],["Dodoma","DO"],["Iringa","IR"],["Kagera","KA"],["Kaskazini Pemba","PN"],["Kaskazini Unguja","UN"],["Kigoma","KI"],["Kilimanjaro","KJ"],["Kusini Pemba","PS"],["Kusini Unguja","US"],["Lindi","LN"],["Manyara","MY"],["Mara","MR"],["Mbeya","MB"],["Mjini Magharibi","MM"],["Morogoro","MO"],["Mtwara","MT"],["Mwanza","MW"],["Pwani","PW"],["Rukwa","RK"],["Ruvuma","RV"],["Shinyanga","SH"],["Singida","SI"],["Tabora","TB"],["Tanga","TN"],["Zanzibar","ZN"]]},"THA":{"THA":[["Amnat Charoen","37"],["Ang Thong","15"],["Bangkok","10"],["Buri Ram","31"],["Chachoengsao","24"],["Chai Nat","18"],["Chaiyaphum","36"],["Chanthaburi","22"],["Chiang Mai","50"],["Chiang Rai","57"],["Chon Buri","20"],["Chumphon","86"],["Kalasin","46"],["Kamphaeng Phet","62"],["Kanchanaburi","71"],["Khon Kaen","40"],["Krabi","81"],["Lamphun","51"],["Loei","42"],["Lop Buri","16"],["Mae Hong Son","58"],["Maha Sarakham","44"],["Mukdahan","49"],["Nakhon Nayok","26"],["Nakhon Pathom","73"],["Nakhon Phanom","48"],["Nakhon Sawan","60"],["Nakhon Si Thammarat","80"],["Nan","55"],["Narathiwat","96"],["Nong Bua Lamphu","39"],["Nong Khai","43"],["Nonthaburi","12"],["Pathum Thani","13"],["Pattani","94"],["Phangnga","82"],["Phatthalung","93"],["Phayao","56"],["Phetchabun","76"],["Phetchaburi","78"],["Phichit","66"],["Phitsanulok","65"],["Phra Nakhon Si Ayutthaya","14"],["Phrae","54"],["Phuket","83"],["Prachin Buri","25"],["Prachuap Khiri Khan","77"],["Ranong","85"],["Ratchaburi","70"],["Rayong","21"],["Roi Et","45"],["Sa Kaeo","27"],["Sakon Nakhon","47"],["Samut Prakan","11"],["Samut Sakhon","74"],["Samut Songkhram","75"],["Saraburi","19"],["Satun","91"],["Si sa ket","33"],["Sing Buri","17"],["Songkhla","90"],["Sukhothai","64"],["Suphan Buri","72"],["Surat Thani","84"],["Surin","32"],["Tak","63"],["Trang","92"],["Trat","23"],["Ubon Ratchathani","34"],["Udon Thani","41"],["Uthai Thani","61"],["Uttaradit","53"],["Yala","95"],["Yasothon","35"]]},"TLS":{"TLS":[["Aileu","AL"],["Ainaro","AN"],["Ambeno","AM"],["Baucau","BA"],["Bobonaro","BO"],["Dili","DI"],["Ermera","ER"],["Kovalima","KO"],["Lautem","LA"],["Liquica","LI"],["Manatuto","MT"],["Manofahi","MF"],["Viqueque","VI"]]},"TGO":{"TGO":[["Centre","C"],["Kara","K"],["Maritime","M"],["Plateaux","P"],["Savanes","S"]]},"TKL":{"TKL":[["Tokelau","TKL"]]},"TON":{"TON":[["Eua","E"],["Haapai","H"],["Niuas","N"],["Tongatapu","T"],["Vavau","V"]]},"TTO":{"TTO":[["Trinidad and Tobago","TTO"]]},"TAA":{"TAA":[["Tristan da Cunha","TAA"]]},"TUN":{"TUN":[["Ariana","AR"],["Beja","BJ"],["Ben Arous","BA"],["Bizerte","BI"],["Gabes","GB"],["Gafsa","GF"],["Jendouba","JE"],["Kairouan","KR"],["Kasserine","KS"],["Kebili","KB"],["Le Kef","LK"],["Mahdia","MH"],["Manouba","MN"],["Medenine","ME"],["Monastir","MO"],["Nabeul","NA"],["Sfax","SF"],["Sidi Bouzid","SD"],["Siliana","SL"],["Sousse","SO"],["Tataouine","TA"],["Tozeur","TO"],["Tunis","TU"],["Zaghouan","ZA"]]},"TUR":{"TUR":[["Adana","ADA"],["Adiyaman","ADI"],["Afyon","AFY"],["Agri","AGR"],["Aksaray","AKS"],["Amasya","AMA"],["Ankara","ANK"],["Antalya","ANT"],["Ardahan","ARD"],["Artvin","ART"],["Aydin","AYI"],["Balikesir","BAL"],["Bartin","BAR"],["Batman","BAT"],["Bayburt","BAY"],["Bilecik","BIL"],["Bingol","BIN"],["Bitlis","BIT"],["Bolu","BOL"],["Burdur","BRD"],["Bursa","BRS"],["Canakkale","CKL"],["Cankiri","CKR"],["Corum","COR"],["Denizli","DEN"],["Diyarbakir","DIY"],["Edirne","EDI"],["Elazig","ELA"],["Erzincan","EZC"],["Erzurum","EZR"],["Eskisehir","ESK"],["Gaziantep","GAZ"],["Giresun","GIR"],["Gumushane","GMS"],["Hakkari","HKR"],["Hatay","HTY"],["Icel","ICE"],["Igdir","IGD"],["Isparta","ISP"],["Istanbul","IST"],["Izmir","IZM"],["Kahraman Maras","KAH"],["Karabuk","KRB"],["Karaman","KRM"],["Kars","KRS"],["Kastamonu","KAS"],["Kayseri","KAY"],["Kilis","KLS"],["Kirikkale","KRK"],["Kirklareli","KLR"],["Kirsehir","KRH"],["Kocaeli","KOC"],["Konya","KON"],["Kutahya","KUT"],["Malatya","MAL"],["Manisa","MAN"],["Mardin","MAR"],["Mugla","MUG"],["Mus","MUS"],["Nevsehir","NEV"],["Nigde","NIG"],["Ordu","ORD"],["Rize","RIZ"],["Sakarya","SAK"],["Samsun","SAM"],["Siirt","SII"],["Sinop","SIN"],["Sirnak","SIR"],["Sivas","SIV"],["Tekirdag","TEL"],["Tokat","TOK"],["Trabzon","TRA"],["Tunceli","TUN"],["Urfa","URF"],["Usak","USK"],["Van","VAN"],["Yozgat","YOZ"],["Zonguldak","ZON"]]},"TKM":{"TKM":[["Ahal","A"],["Ashgabat","ASB"],["Balkan","B"],["Dashoguz","D"],["Lebap","L"],["Mary","M"],["Nebitdag","NEB"]]},"TCA":{"TCA":[["Turks and Caicos Islands","TCA"]]},"TUV":{"TUV":[["Tuvalu","TUV"]]},"UGA":{"UGA":[["Adjumani","ADJ"],["Apac","APC"],["Arua","ARU"],["Bugiri","BUG"],["Bundibugyo","BUN"],["Bushenyi","BSH"],["Busia","BUS"],["Gulu","GUL"],["Hoima","HOI"],["Iganga","IGA"],["Jinja","JIN"],["Kabale","KBL"],["Kabarole","KAR"],["Kaberamaido","KAB"],["Kalangala","KAL"],["Kampala","KMP"],["Kamuli","KML"],["Kamwenge","KAM"],["Kanungu","KAN"],["Kapchorwa","KPC"],["Kasese","KAS"],["Katakwi","KTK"],["Kayunga","KAY"],["Kibaale","KBA"],["Kiboga","KIB"],["Kisoro","KIS"],["Kitgum","KIT"],["Kotido","KOT"],["Kumi","KUM"],["Kyenjojo","KYE"],["Lira","LIR"],["Luwero","LUW"],["Masaka","MAS"],["Masindi","MSN"],["Mayuge","MAY"],["Mbale","MBA"],["Mbarara","MBR"],["Moroto","MRT"],["Moyo","MOY"],["Mpigi","MPI"],["Mubende","MUB"],["Mukono","MUK"],["Nakapiripirit","NAK"],["Nakasongola","NKS"],["Nebbi","NEB"],["Ntungamo","NTU"],["Pader","PAD"],["Pallisa","PAL"],["Rakai","RAK"],["Rukungiri","RUK"],["Sembabule","SEM"],["Sironko","SIR"],["Soroti","SOR"],["Tororo","TOR"],["Wakiso","WAK"],["Yumbe","YUM"]]},"UKR":{"UKR":[["Cherkasy","71"],["Chernihiv","74"],["Chernivtsi","77"],["Dnipropetrovsk","12"],["Donetsk","14"],["Ivano-Frankivsk","26"],["Kharkiv","63"],["Khersonsrka","65"],["Khmelnytsky","68"],["Kirovohrad","35"],["Kyiv","30"],["Luhansk","9"],["Lviv","46"],["Mykolayiv","48"],["Odessa","51"],["Poltava","53"],["Respublika Krym","43"],["Rivne","56"],["Sumy","59"],["Ternopil","61"],["Vinnytsya","5"],["Volyn","7"],["Zakarpatska","21"],["Zaporizhzhya","23"],["Zhytomyr","18"]]},"ARE":{"ARE":[["Abu Dhabi","AZ"],["Al l'Ayn","AL"],["Ash Shariqah","SH"],["Dubai","DU"]]},"GBR":{"ENG":[["Bath","BAS"],["Birmingham","BIR"],["Bradford","BRD"],["Brighton & Hove","BNH"],["Bristol","BST"],["Cambridge","CAM"],["Canterbury","CNG"],["Carlisle","CAX"],["Chester","CEG"],["Chichester","CST"],["Coventry","COV"],["Derby","DER"],["Durham","DUR"],["Ely","ELY"],["Exeter","EXE"],["Gloucester","GLO"],["Hereford","HAF"],["Kingston upon Hull","KUH"],["Lancaster","LAN"],["Leeds","LDS"],["Leicester","LCE"],["Lichfield","LHF"],["Lincoln","LCN"],["Liverpool","LIV"],["London","LND"],["Manchester","MAN"],["Newcastle","NCL"],["Norwich","NRW"],["Nottingham","NGM"],["Oxford","OXF"],["Peterborough","PTE"],["Plymouth","PLY"],["Portsmouth","POR"],["Preston","PRE"],["Ripon","RIP"],["Saint Albans","TBL"],["Salford","SLF"],["Salisbury","SLS"],["Sheffield","SHE"],["Southampton","STH"],["Stoke-on-Trent","SOT"],["Sunderland","SUN"],["Truro","TRU"],["Wakefield","WKF"],["Wells","WLS"],["Winchester","WNE"],["Wolverhampton","WOV"],["Worcester","WOR"],["York","YOR"]],"NIR":[["Belfast","BFS"],["Derry","DRY"],["Lisburn","LSB"],["Newry","NYM"]],"SCT":[["Aberdeen","ABD"],["Dundee","DND"],["Edinburgh","EDH"],["Glasgow","GLG"],["Inverness","INV"],["Stirling","STG"]],"WLS":[["Bangor","BAN"],["Cardiff","CDF"],["Newport","NWP"],["Swansea","SWA"]]},"USA":{"AL":[["Birmingham","BHM"],["Mobile","MOB"],["Montgomery","MGM"]],"AK":[["Anchorage","ANC"],["Fairbanks","FAI"],["Juneau","JNU"]],"AZ":[["Glendale","GDA"],["Mesa","MQA"],["Phoenix","PHX"],["Scottsdale","STZ"],["Tempe","TPE"],["Tucson","TUC"],["Yuma","YUM"]],"AR":[["Fayetteville","FYV"],["Fort Smith","FSM"],["Little Rock","LIT"]],"CA":[["Los Angeles","LAX"],["San Diego","SAN"],["San Francisco","SFO"],["San Jose","SJC"]],"CO":[["Aspen","ASE"],["Aurora","AUX"],["Boulder","WBU"],["Colorado Springs","COS"],["Denver","DEN"],["Fort Collins","FNL"],["Grand Junction","GJT"],["Vail","VAC"]],"CT":[["Bridgeport","BDR"],["Darien","DAQ"],["Greenwich","GRH"],["Hartford","HFD"],["Middletown","XIN"],["New Britain","NWT"],["New Haven","HVN"],["Waterbury","WAT"],["Westport","WPT"]],"DE":[["Dover","DOR"],["Newark","NWK"],["Wilmington","ILG"]],"DC":[["Washington D.C.","WAS"]],"FL":[["Cape Canaveral","CPV"],["Fort Lauderdale","FLL"],["Jacksonville","JAX"],["Key West","EYW"],["Miami","MIA"],["Orlando","ORL"],["St. Petersburg","PIE"],["Tallahassee","TLH"],["Tampa","TPA"]],"GA":[["Atlanta","TAT"],["Augusta","AUT"],["Columbus","CZX"],["Macon","MCN"],["Savannah","SAV"]],"HI":[["Hilo","ITO"],["Honolulu","HNL"],["Kailua","KHH"]],"ID":[["American Falls","YAF"],["Blackfoot","BLK"],["Boise","BOI"],["Coeur d'Alene","COE"],["Idaho Falls","IDA"],["Ketchum","QKM"],["Lewiston","LWS"],["Moscow","MJL"],["Murphy","ZMU"],["Nampa","NPA"],["Pocatello","PIH"],["Sun Valley","SVY"]],"IL":[["Alton","ALN"],["Aurora","AUZ"],["Bloomington","BLO"],["Carbondale","MDH"],["Centralia","CRA"],["Champaign-Urbana","CMI"],["Chicago","CHI"],["Danville","DVI"],["De Kalb","DEK"],["Decatur","DEC"],["East St Louis","ESL"],["Galesburg","GSU"],["Normal","NOM"],["Peoria","PLA"],["Rock Island","RKI"],["Rockford","RFD"],["Springfield","SPI"],["Waukegan","UGN"]],"IN":[["Evansville","EVV"],["Fort Wayne","FWA"],["Indianapolis","IND"]],"IA":[["Cedar Rapids","CID"],["Davenport","DVN"],["Des Moines","DSM"]],"KS":[["Abilene","ABZ"],["Hutchinson","HCH"],["Kansas City","KCK"],["Lawrence","LWC"],["Leavenworth","XIA"],["Manhattan","MHK"],["Overland Park","OVL"],["Topeka","TOP"],["Wichita","ICT"]],"KY":[["Lexington","LEX"],["Louisville","LUI"],["Owensboro","OWB"]],"LA":[["Baton Rouge","BTR"],["New Orleans","MSY"],["Shreveport","SHV"]],"ME":[["Bangor","BNQ"],["Lewiston","QLW"],["Portland","POL"]],"MD":[["Balitmore","BAL"],["Gaithersburg","GAI"],["Rockville","RKV"]],"MA":[["Boston","BZD"],["Springfield","SFY"],["Worcester","ORH"]],"MI":[["Ann Arbor","ARB"],["Battle Creek","BTL"],["Bay City","BCY"],["Dearborn","DEO"],["Detroit","DET"],["Flint","FNT"],["Grand Rapids","GRR"],["Kalamazoo","AZO"],["Lansing","LAN"],["Muskegon","MKG"],["Pontiac","PTK"],["Port Huron","PHN"],["Saginaw","SGM"],["Sault Ste Marie","SSM"],["Warren","WAM"],["Wyandotte","WYD"]],"MN":[["Minneapolis","MES"],["Rochester","RST"],["Saint Paul","STP"]],"MS":[["Biloxi","BIX"],["Greenville","GLH"],["Gulfport","GPT"],["Hattiesburg","HBG"],["Jackson","JAN"],["Meridian","MEI"],["Vicksburg","VKS"]],"MO":[["Columbia","COV"],["Jefferson City","JEF"],["Kansas City","MKC"],["Sanit Louis","STL"],["Springfield","SGF"]],"MT":[["Billings","BGS"],["Great Falls","GTF"],["Missoula","MSO"]],"NE":[["Bellevue","XDE"],["Lincoln","LNK"],["Omaha","OMA"]],"NV":[["Carson City","CSN"],["Elko","EKO"],["Henderson","HNZ"],["Las Vegas","LAS"],["North Las Vegas","NVS"],["Reno","RNO"],["Sparks","SPK"],["Virginia City","VGI"]],"NH":[["Concord","CON"],["Manchester","MHT"],["Nashua","ASH"]],"NJ":[["Jersey City","JEC"],["Newark","NRK"],["Paterson","PAT"]],"NM":[["Albuquerque","ABQ"],["Las Cruces","LRU"],["Roswell","ROW"],["Santa Fe","SAF"]],"NY":[["Buffalo","FFO"],["New York","QEE"],["Rochester","ROC"]],"NC":[["Asheville","AEV"],["Chapel Hill","CHE"],["Charlotte","CRQ"],["Durham","DHH"],["Greensboro","GBO"],["Raleigh","RAG"],["Raleigh-Durham","RDU"]],"ND":[["Bismarck","BIS"],["Fargo","FAR"],["Grand Forks","GFK"],["Minot","MOT"]],"OH":[["Cincinnati","CVG"],["Cleveland","CLE"],["Columbus","CZX"],["Dayton","DYT"],["Toledo","TOL"]],"OK":[["Norman","OUN"],["Oklahoma City","OKC"],["Tulsa","TUL"]],"OR":[["Bend","BZO"],["Coos Bay","COB"],["Corvallis","YCV"],["Crater Lake","CTR"],["Dallas","DAC"],["Eugene","EUG"],["Grant's Pass","XFX"],["Hood River","HDX"],["Medford","MFR"],["Portland","PDX"],["Salem","SLE"],["Springfield","SPY"],["St Helens","STH"],["The Dalles","DLS"],["Tillamook","TLM"]],"PA":[["Allentown","AEW"],["Philadephia","PHL"],["Pittsburgh","PIT"]],"RI":[["Cranston","CQH"],["Newport","NPO"],["Pawtucket","PAW"],["Providence","PVD"],["Warwick","UZO"],["Westerly","WST"],["Woonsocket","SFN"]],"SC":[["Charleston","CHS"],["Columbia","COV"],["North Charleston","NTS"]],"SD":[["Aberdeen","ABK"],["Rapid City","RAP"],["Sioux Falls","FSD"]],"TN":[["Bristol","BSJ"],["Chattanooga","CHA"],["Johnson City","JCY"],["Kingsport","TRI"],["Knoxville","TYS"],["Memphis","MEM"],["Nashville","BNA"],["Smyrna","MQY"],["Spring Hill","RGI"],["Tri-City Area","YTC"]],"TX":[["Austin","AUS"],["Corpus Christi","CRP"],["Dallas","DAL"],["El Paso","ELP"],["Galveston","GLS"],["Houston","HOU"],["Laredo","LRD"],["McAllen","TXC"],["San Antonio","SAT"]],"UT":[["Layton","LTJ"],["Ogden","OGD"],["Orem","OEU"],["Park City","PAC"],["Provo","PVU"],["Salt Lake City","SLC"],["St.George","SGU"],["West Valley City","WVC"]],"VT":[["Burlington","BTV"],["Rutland","RUT"],["South Burlington","ZBR"]],"VA":[["Chesapeake","HTW"],["Norfolk","ORF"],["Virginia Beach","VAB"]],"WA":[["Seattle","SEA"],["Spokane","GEG"],["Tacoma","TTW"]],"WV":[["Charleston","CRW"],["Huntington","HNU"],["Parkersburg","PKB"]],"WI":[["Appleton","ATW"],["Eau Claire","EAU"],["Green Bay","GBK"],["Kenosha","ENW"],["LaCrosse","LSE"],["Madison","QMD"],["Manitowoc","MTW"],["Milwaukee","MKE"],["Oshkosh","OSH"],["Racine","RAC"],["Sheboygan","SBM"],["Wausau","AUW"]],"WY":[["Casper","CPR"],["Cheyenne","CYS"],["Evanston","EVD"],["Laramie","LAR"],["Rock Springs","RKS"],["Sheridan","SHR"]]},"UMI":{"UMI":[["United States Minor Outlying Islands","UMI"]]},"URY":{"URY":[["Artigas","AR"],["Canelones","CA"],["Cerro Largo","CL"],["Colonia","CO"],["Durazno","DU"],["Flores","FS"],["Florida","FA"],["Lavalleja","LA"],["Maldonado","MA"],["Montevideo","MO"],["Paysandu","PA"],["Rio Negro","RN"],["Rivera","RV"],["Rocha","RO"],["Salto","SL"],["San Jose","SJ"],["Soriano","SO"],["Tacuarembo","TAW"],["Treinta y Tres","TT"]]},"UZB":{"UZB":[["Andijon","AN"],["Buxoro","BU"],["Fargona","FA"],["Jizzax","JI"],["Namangan","NG"],["Navoiy","NW"],["Qasqadaryo","QA"],["Qoraqalpogiston","QR"],["Samarqand","SA"],["Sirdaryo","SI"],["Surxondaryo","SU"],["Toshkent","TK"],["Toshkent Shahri","TO"],["Xorazm","XO"]]},"VUT":{"VUT":[["Malampa","MA"],["Penama","PE"],["Sanma","SA"],["Shefa","SH"],["Tafea","TA"],["Torba","TO"]]},"VAT":{"VAT":[["Vatican City","VAT"]]},"VEN":{"VEN":[["Amazonas","Z"],["Anzoategui","B"],["Apure","C"],["Aragua","D"],["Barinas","E"],["Bolivar","F"],["Carabobo","G"],["Caracas","A"],["Cojedes","H"],["Delta Amacuro","Y"],["Dependencias Federales","W"],["Estado Nueva Esparta","O"],["Falcon","I"],["Guarico","J"],["Lara","K"],["Merida","L"],["Miranda","M"],["Monagas","N"],["Portuguesa","P"],["Sucre","R"],["Tachira","S"],["Trujillo","T"],["Yaracuy","U"],["Zulia","V"]]},"VNM":{"VNM":[["Haiphong","HP"],["Hanoi","HI"],["Ho Chi Minh City","HC"]]},"VIR":{"VIR":[["Virgin Islands","VIR"]]},"VGB":{"VGB":[["Virgin Islands,British","VGB"]]},"WLF":{"WLF":[["Wallis and Futuna","WLF"]]},"BLR":{"BLR":[["Bresckaja","BR"],["Homelskaja","HO"],["Hrodzenskaja","HR"],["Mahileuskaja","MA"],["Minsk","MI"],["Vicebskaja","VI"]]},"YEM":{"YEM":[["Abyan","AB"],["Adan","AD"],["Ad-Dali","DA"],["Al-Bayda","BA"],["Al-Hudaydah","HU"],["Al-Jawf","JA"],["Al-Mahrah","MR"],["Al-Mahwit","MW"],["Amran Sana","AM"],["Ash-Shihr","ASR"],["Dhamar","DH"],["Hadramawt","HD"],["Hajjah","HJ"],["Ibb","IB"],["Lahij","LA"],["Marib","MA"],["Sadah","SD"],["Sana","SN"],["Seiyun","GXF"],["Shabwah","SH"],["Taizz","TA"]]},"ZMB":{"ZMB":[["Central","CE"],["Copperbelt","CB"],["Eastern","EA"],["Luapula","LP"],["Lusaka","LK"],["Northern","NO"],["North-Western","NW"],["Southern","SO"],["Western","WE"]]},"ZWE":{"ZWE":[["Bulawayo","BU"],["Harare","HA"],["Manicaland","ML"],["Mashonaland Central","MC"],["Mashonaland East","ME"],["Mashonaland West","MW"],["Masvingo","MV"],["Matabeleland North","MN"],["Matabeleland South","MS"],["Midlands","MD"]]},"SCN":{"SSC":[["Taeyeon District","TYD"]]}};
var cities_zh = {"1":{"11":[["东城","1"],["西城","2"],["朝阳","5"],["丰台","6"],["石景山","7"],["海淀","8"],["门头沟","9"],["房山","11"],["通州","12"],["顺义","13"],["昌平","21"],["大兴","24"],["平谷","26"],["怀柔","27"],["密云","28"],["延庆","29"]],"12":[["和平","1"],["河东","2"],["河西","3"],["南开","4"],["河北","5"],["红桥","6"],["滨海新区","26"],["东丽","10"],["西青","11"],["津南","12"],["北辰","13"],["宁河","21"],["武清","22"],["静海","23"],["宝坻","24"],["蓟县","25"]],"13":[["石家庄","1"],["唐山","2"],["秦皇岛","3"],["邯郸","4"],["邢台","5"],["保定","6"],["张家口","7"],["承德","8"],["沧州","9"],["廊坊","10"],["衡水","11"]],"14":[["太原","1"],["大同","2"],["阳泉","3"],["长治","4"],["晋城","5"],["朔州","6"],["晋中","7"],["运城","8"],["忻州","9"],["临汾","10"],["吕梁","11"]],"15":[["呼和浩特","1"],["包头","2"],["乌海","3"],["赤峰","4"],["通辽","5"],["鄂尔多斯","6"],["呼伦贝尔","7"],["巴彦淖尔","8"],["乌兰察布","9"],["兴安","22"],["锡林郭勒","25"],["阿拉善","29"]],"21":[["沈阳","1"],["大连","2"],["鞍山","3"],["抚顺","4"],["本溪","5"],["丹东","6"],["锦州","7"],["营口","8"],["阜新","9"],["辽阳","10"],["盘锦","11"],["铁岭","12"],["朝阳","13"],["葫芦岛","14"]],"22":[["长春","1"],["吉林","2"],["四平","3"],["辽源","4"],["通化","5"],["白山","6"],["松原","7"],["白城","8"],["延边","24"]],"23":[["哈尔滨","1"],["齐齐哈尔","2"],["鸡西","3"],["鹤岗","4"],["双鸭山","5"],["大庆","6"],["伊春","7"],["佳木斯","8"],["七台河","9"],["牡丹江","10"],["黑河","11"],["绥化","12"],["大兴安岭","27"]],"31":[["黄浦","1"],["卢湾","3"],["徐汇","4"],["长宁","5"],["静安","6"],["普陀","7"],["闸北","8"],["虹口","9"],["杨浦","11"],["闵行","12"],["宝山","13"],["嘉定","14"],["浦东新区","15"],["金山","16"],["松江","17"],["奉贤","26"],["青浦","29"],["崇明","30"]],"32":[["南京","1"],["无锡","2"],["徐州","3"],["常州","4"],["苏州","5"],["南通","6"],["连云港","7"],["淮安","8"],["盐城","9"],["扬州","10"],["镇江","11"],["泰州","12"],["宿迁","13"]],"33":[["杭州","1"],["宁波","2"],["温州","3"],["嘉兴","4"],["湖州","5"],["绍兴","6"],["金华","7"],["衢州","8"],["舟山","9"],["台州","10"],["丽水","11"]],"34":[["合肥","1"],["芜湖","2"],["蚌埠","3"],["淮南","4"],["马鞍山","5"],["淮北","6"],["铜陵","7"],["安庆","8"],["黄山","10"],["滁州","11"],["阜阳","12"],["宿州","13"],["六安","15"],["亳州","16"],["池州","17"],["宣城","18"]],"35":[["福州","1"],["厦门","2"],["莆田","3"],["三明","4"],["泉州","5"],["漳州","6"],["南平","7"],["龙岩","8"],["宁德","9"]],"36":[["南昌","1"],["景德镇","2"],["萍乡","3"],["九江","4"],["新余","5"],["鹰潭","6"],["赣州","7"],["吉安","8"],["宜春","9"],["抚州","10"],["上饶","11"]],"37":[["济南","1"],["青岛","2"],["淄博","3"],["枣庄","4"],["东营","5"],["烟台","6"],["潍坊","7"],["济宁","8"],["泰安","9"],["威海","10"],["日照","11"],["莱芜","12"],["临沂","13"],["德州","14"],["聊城","15"],["滨州","16"],["菏泽","17"]],"41":[["郑州","1"],["开封","2"],["洛阳","3"],["平顶山","4"],["安阳","5"],["鹤壁","6"],["新乡","7"],["焦作","8"],["濮阳","9"],["许昌","10"],["漯河","11"],["三门峡","12"],["南阳","13"],["商丘","14"],["信阳","15"],["周口","16"],["驻马店","17"],["济源","18"]],"42":[["武汉","1"],["黄石","2"],["十堰","3"],["宜昌","5"],["襄阳","6"],["鄂州","7"],["荆门","8"],["孝感","9"],["荆州","10"],["黄冈","11"],["咸宁","12"],["随州","13"],["恩施","28"],["仙桃","94"],["潜江","95"],["天门","96"],["神农架","A21"]],"43":[["长沙","1"],["株洲","2"],["湘潭","3"],["衡阳","4"],["邵阳","5"],["岳阳","6"],["常德","7"],["张家界","8"],["益阳","9"],["郴州","10"],["永州","11"],["怀化","12"],["娄底","13"],["湘西","31"]],"44":[["广州","1"],["韶关","2"],["深圳","3"],["珠海","4"],["汕头","5"],["佛山","6"],["江门","7"],["湛江","8"],["茂名","9"],["肇庆","12"],["惠州","13"],["梅州","14"],["汕尾","15"],["河源","16"],["阳江","17"],["清远","18"],["东莞","19"],["中山","20"],["潮州","51"],["揭阳","52"],["云浮","53"]],"45":[["南宁","1"],["柳州","2"],["桂林","3"],["梧州","4"],["北海","5"],["防城港","6"],["钦州","7"],["贵港","8"],["玉林","9"],["百色","10"],["贺州","11"],["河池","12"],["来宾","13"],["崇左","14"]],"46":[["海口","1"],["三亚","2"],["三沙","3"],["五指山","91"],["琼海","92"],["儋州","93"],["文昌","95"],["万宁","96"],["东方","97"],["定安","A25"],["屯昌","A26"],["澄迈","A27"],["临高","A28"],["白沙","A30"],["昌江","A31"],["乐东","A33"],["陵水","A34"],["保亭","A35"],["琼中","A36"]],"50":[["万州","1"],["涪陵","2"],["渝中","3"],["大渡口","4"],["江北","5"],["沙坪坝","6"],["九龙坡","7"],["南岸","8"],["北碚","9"],["两江新区","85"],["万盛","10"],["双桥","11"],["渝北","12"],["巴南","13"],["长寿","21"],["綦江","22"],["潼南","23"],["铜梁","24"],["大足","25"],["荣昌","26"],["璧山","27"],["梁平","28"],["城口","29"],["丰都","30"],["垫江","31"],["武隆","32"],["忠县","33"],["开县","34"],["云阳","35"],["奉节","36"],["巫山","37"],["巫溪","38"],["黔江","39"],["石柱","40"],["秀山","41"],["酉阳","42"],["彭水","43"],["江津","81"],["合川","82"],["永川","83"],["南川","84"]],"51":[["成都","1"],["自贡","3"],["攀枝花","4"],["泸州","5"],["德阳","6"],["绵阳","7"],["广元","8"],["遂宁","9"],["内江","10"],["乐山","11"],["南充","13"],["眉山","14"],["宜宾","15"],["广安","16"],["达州","17"],["雅安","18"],["巴中","19"],["资阳","20"],["阿坝","32"],["甘孜","33"],["凉山","34"]],"52":[["贵阳","1"],["六盘水","2"],["遵义","3"],["安顺","4"],["铜仁","22"],["黔西南","23"],["毕节","24"],["黔东南","26"],["黔南","27"]],"53":[["昆明","1"],["曲靖","3"],["玉溪","4"],["保山","5"],["昭通","6"],["丽江","7"],["普洱","8"],["临沧","9"],["楚雄","23"],["红河","25"],["文山","26"],["西双版纳","28"],["大理","29"],["德宏","31"],["怒江","33"],["迪庆","34"]],"54":[["拉萨","1"],["昌都","21"],["山南","22"],["日喀则","23"],["那曲","24"],["阿里","25"],["林芝","26"]],"61":[["西安","1"],["铜川","2"],["宝鸡","3"],["咸阳","4"],["渭南","5"],["延安","6"],["汉中","7"],["榆林","8"],["安康","9"],["商洛","10"]],"62":[["兰州市","1"],["嘉峪关","2"],["金昌","3"],["白银","4"],["天水","5"],["武威","6"],["张掖","7"],["平凉","8"],["酒泉","9"],["庆阳","10"],["定西","11"],["陇南","12"],["临夏","29"],["甘南","30"]],"63":[["西宁","1"],["海东","21"],["海北","22"],["黄南","23"],["海南","25"],["果洛","26"],["玉树","27"],["海西","28"]],"64":[["银川","1"],["石嘴山","2"],["吴忠","3"],["固原","4"],["中卫","5"]],"65":[["乌鲁木齐","1"],["克拉玛依","2"],["吐鲁番","21"],["哈密","22"],["昌吉","23"],["博尔塔拉","27"],["巴音郭楞","28"],["阿克苏","29"],["克孜勒苏","30"],["喀什","31"],["和田","32"],["伊犁","40"],["塔城","42"],["阿勒泰","43"],["石河子","91"],["阿拉尔","92"],["图木舒克","93"],["五家渠","94"],["北屯","95"]],"71":[["台北市","1"],["高雄市","2"],["基隆市","3"],["台中市","4"],["台南市","5"],["新竹市","6"],["嘉义市","7"],["台北县","8"],["宜兰县","9"],["桃园县","10"],["新竹县","11"],["苗栗县","12"],["台中县","13"],["彰化县","14"],["南投县","15"],["云林县","16"],["嘉义县","17"],["台南县","18"],["高雄县","19"],["屏东县","20"],["台东县","22"],["花莲县","23"],["澎湖县","21"]],"81":[["中西区","HCW"],["东区","HEA"],["九龙城区","KKC"],["观塘区","KKT"],["南区","HSO"],["深水埗区","KSS"],["黄大仙区","KWT"],["湾仔区","HWC"],["油尖旺区","KYT"],["离岛区","NIS"],["葵青区","NKT"],["北区","NNO"],["西贡区","NSK"],["沙田区","NST"],["屯门区","NTM"],["大埔区","NTP"],["荃湾区","NTW"],["元朗区","NYL"]],"82":[["花地玛堂区","OLF"],["圣安多尼堂区","ANT"],["大堂区","CAT"],["望德堂区","LAW"],["风顺堂区","LAZ"],["氹仔","TPA"],["路环","CLN"]]},"ALB":{"ALB":[["爱尔巴桑","EL"],["迪勃拉","DI"],["地拉那","TR"],["都拉斯","DR"],["发罗拉","VL"],["费里","FR"],["吉诺卡斯特","GJ"],["科尔察","KO"],["库克斯","KU"],["莱什","LE"],["培拉特","BR"],["斯库台","SH"]]},"DZA":{"DZA":[["阿德拉尔","ADR"],["阿尔及尔","ALG"],["艾因·德夫拉","ADE"],["艾因·蒂姆尚特","ATE"],["安纳巴","AAE"],["奥兰","ORA"],["巴特纳","BAT"],["贝贾亚","BJA"],["贝沙尔","BEC"],["贝伊德","EBA"],["比斯克拉","BIS"],["布尔吉·布阿雷里吉","BOR"],["布利达","BLI"],["布迈德斯","BOU"],["布依拉","BOA"],["蒂巴扎","TIP"],["蒂斯姆西勒特","TIS"],["盖尔达耶","GHA"],["盖尔马","GUE"],["罕西拉","KHE"],["赫利赞","REL"],["吉杰尔","JIJ"],["杰勒法","DJE"],["君士坦丁","CZL"],["拉格瓦特","LAG"],["马斯卡拉","MUA"],["麦迪亚","MED"],["密拉","MIL"],["莫斯塔加纳姆","MOS"],["姆西拉","MSI"],["纳阿马","NAA"],["塞蒂夫","SET"],["赛伊达","SAI"],["斯基克达","SKI"],["苏克·阿赫拉斯","SAH"],["塔里夫","ETA"],["塔曼拉塞特","TAM"],["特贝萨","TEB"],["特莱姆森","TLE"],["提济乌祖","IOU"],["提亚雷特","TIA"],["廷杜夫","TIN"],["瓦德","EOU"],["瓦尔格拉","OUA"],["乌姆布阿基","OEB"],["西迪贝勒阿贝斯","SBA"],["谢里夫","CHL"],["伊利齐","ILL"]]},"AFG":{"AFG":[["赫拉特","HEA"],["喀布尔","KBL"],["坎大哈","KDH"],["马扎里沙里夫","MZR"]]},"ARG":{"ARG":[["巴拉那","PRA"],["别德马","VDM"],["波萨达斯","PSS"],["布兰卡港","BHI"],["布宜诺斯艾利斯","BUE"],["福莫萨","FMA"],["胡胡伊","JUJ"],["卡塔马卡","CTC"],["科尔多瓦","COR"],["科连特斯","CNQ"],["克劳斯城","VLK"],["肯考迪娅","COC"],["拉里奥哈","IRJ"],["拉普拉塔","LPG"],["雷西斯滕匹亚","RES"],["里奥加耶戈斯","RGL"],["里奥夸尔托","RCU"],["里瓦达维亚海军准将城","CRD"],["罗萨里奥","ROS"],["罗森","RWO"],["马德普拉塔","MDQ"],["门多萨","MDZ"],["内乌肯","NQN"],["萨尔塔","SLA"],["圣地亚哥-德尔埃斯特罗","SDE"],["圣菲","SFN"],["圣胡安","UAQ"],["圣拉斐尔","AFA"],["圣路易斯","LUQ"],["圣罗莎","RSA"],["圣米格尔-德图库曼","SMC"],["圣尼古拉斯","SNS"],["特雷利乌","REL"],["乌斯怀亚","USH"]]},"ARE":{"ARE":[["阿布扎比","AZ"],["艾因","AL"],["迪拜","DU"],["沙迦","SH"]]},"ABW":{"ABW":[["阿鲁巴","ABW"]]},"OMN":{"OMN":[["巴提奈地区","BA"],["达希莱地区","ZA"],["东部地区","SH"],["马斯喀特省","MA"],["穆桑达姆省","MU"],["内地地区","DA"],["中部地区","WU"],["佐法尔省","ZU"]]},"AZE":{"AZE":[["阿布歇隆","ABS"],["哈奇马斯","XAC"],["卡尔巴卡尔","KAL"],["卡扎赫","QAZ"],["连科兰","LAN"],["密尔-卡拉巴赫","MQA"],["穆甘-萨连","MSA"],["纳戈尔诺－卡拉巴赫","NQA"],["纳希切万","NX"],["普利亚拉克斯","PRI"],["舍基","SA"],["苏姆盖特","SMC"],["锡尔万","SIR"],["占贾","GA"]]},"ASC":{"ASC":[["阿森松岛","ASC"]]},"EGY":{"EGY":[["阿斯旺","ASW"],["古尔代盖","GBY"],["开罗","CAI"],["苏布拉开马","SKH"],["亚历山大","ALY"]]},"ETH":{"ETH":[["阿法尔","AF"],["阿姆哈拉","AH"],["奥罗米亚","OR"],["宾香古尔","BG"],["德雷达瓦","DD"],["甘贝拉各族","GB"],["哈勒里民族","HR"],["南方各族","SN"],["索马里","SM"],["提格雷","TG"],["亚的斯亚贝巴","AA"]]},"IRL":{"IRL":[["奥法利","OF"],["蒂珀雷里","TP"],["都柏林","DB"],["多内加尔","DG"],["戈尔韦","GW"],["基尔代尔","KD"],["基尔肯尼","KK"],["卡范","CV"],["卡洛","CW"],["凯里","KR"],["科克","CK"],["克莱尔","CL"],["朗福德","LF"],["劳斯","LT"],["崂斯","LA"],["利默里克","LM"],["利特里姆","LR"],["罗斯康芒","RC"],["梅奥","MY"],["米斯","MT"],["莫内根","MG"],["斯莱戈","SL"],["威克洛","WK"],["韦克斯福德","WX"],["沃特福德","WF"],["西米斯","WM"]]},"EST":{"EST":[["贝尔瓦","65"],["哈留","37"],["拉普拉","70"],["里亚内","57"],["帕尔努","67"],["萨雷","74"],["塔尔图","78"],["瓦尔加","82"],["维良地","84"],["维鲁","59"],["沃鲁","86"],["希尤","39"],["耶尔韦","51"],["耶盖瓦","49"],["依达－维鲁","44"]]},"AND":{"AND":[["安道尔城","7"],["奥尔迪诺","5"],["恩坎普","3"],["卡尼略","2"],["莱塞斯卡尔德－恩戈尔达","8"],["马萨纳","4"],["圣胡利娅－德洛里亚","6"]]},"AGO":{"AGO":[["北宽扎","CNO"],["北隆达","LNO"],["本戈","BGO"],["本格拉","BGU"],["比耶","BIE"],["卡宾达","CAB"],["库内内","CNN"],["宽多库邦戈","CCU"],["罗安达","LUA"],["马兰热","MAL"],["莫希科","MOX"],["纳米贝","NAM"],["南宽扎","CUS"],["南隆达","LSU"],["万博","HUA"],["威拉","HUI"],["威热","UIG"],["扎伊尔","ZAI"]]},"AIA":{"AIA":[["安圭拉","AIA"]]},"ATG":{"ATG":[["安提瓜岛和巴布达","ATG"]]},"AUS":{"NT":[["北帕默斯顿","PAL"],["达尔文","DRW"]],"ACT":[["堪培拉","CBR"]],"QLD":[["布里斯班","BNE"],["黄金海岸","OOL"],["凯恩斯","CNS"],["日光海岸","CUD"],["汤斯维尔","TSV"],["图文巴","TWB"]],"SA":[["阿德莱德","ADL"],["奥古斯塔港","PUG"],["甘比亚山","MGB"],["怀阿拉","WAY"],["林肯港","PLO"],["默里布里奇","MYB"],["皮里港","PPI"],["维克托港","VHA"]],"TAS":[["伯尼港","BWT"],["德文波特","DPO"],["霍巴特","HBA"],["朗塞斯顿","LST"]],"VIC":[["吉朗","GEX"],["墨尔本","MEL"]],"WA":[["奥尔巴尼","ALH"],["班伯里","BUY"],["弗里曼特尔港","FRE"],["杰拉尔顿","GET"],["卡尔古利","KGI"],["曼哲拉","MDU"],["珀斯","PER"]],"NSW":[["纽卡斯尔","NTL"],["伍伦贡","WOL"],["悉尼","HBS"]]},"AUT":{"AUT":[["布尔根兰","BUR"],["蒂罗尔","TYR"],["福拉尔贝格","VOR"],["克恩顿","CAT"],["萨尔茨堡","SZG"],["上奥地利","UAU"],["施蒂利亚","STY"],["维也纳","VDD"],["下奥地利","LAU"]]},"ALA":{"ALA":[["奥兰群岛","ALA"]]},"BRB":{"BRB":[["巴巴多斯岛","BRB"]]},"PNG":{"PNG":[["北部","NO"],["布干维尔","BV"],["东部高地","EH"],["东塞皮克","ES"],["东新不列颠","EB"],["恩加","EN"],["海湾","GU"],["马当","MD"],["马努斯","MN"],["米尔恩湾","MB"],["莫尔兹比港","NC"],["莫罗贝","MR"],["南部高地","SH"],["钦布","SI"],["桑道恩","SA"],["西部","WE"],["西部高地","WH"],["西新不列颠","WB"],["新爱尔兰","NI"]]},"BHS":{"BHS":[["巴哈马","BHS"]]},"PAK":{"PAK":[["白沙瓦","PEW"],["费萨拉巴德","LYP"],["故吉软瓦拉","GUJ"],["海德拉巴","HDD"],["卡拉奇","KCT"],["拉合尔","LHE"],["拉瓦尔品第","RWP"],["木尔坦","MUX"],["伊斯兰堡","ISB"]]},"PRY":{"PRY":[["阿曼拜","AM"],["阿耶斯总统省","PH"],["巴拉瓜里","PA"],["博克龙","BO"],["瓜伊拉","GU"],["卡瓜苏","CG"],["卡嫩迪尤","CN"],["卡萨帕","CZ"],["康塞普西翁","CC"],["科迪勒拉","CD"],["米西奥内斯","MI"],["涅恩布库","NE"],["上巴拉圭","AG"],["上巴拉那","AN"],["圣佩德罗","SP"],["亚松森特别区","AS"],["伊塔普亚","IT"],["中央","CE"]]},"PSE":{"PSE":[["加沙地带","GZ"],["西岸","WE"]]},"BHR":{"BHR":[["北部","5"],["哈德","1"],["哈马德","12"],["里法","9"],["麦纳麦","3"],["穆哈拉格","2"],["西部","10"],["伊萨城","8"],["中部","7"]]},"PAN":{"PAN":[["巴拿马","PAN"]]},"BRA":{"BRA":[["阿克里","AC"],["阿拉戈斯","AL"],["阿马帕","AP"],["巴拉那","PR"],["巴西利亚","BSB"],["巴伊亚","BA"],["北里奥格兰德","RN"],["伯南布哥","PE"],["戈亚斯","GO"],["朗多尼亚","RO"],["里约热内卢","RJ"],["罗赖马","RR"],["马拉尼昂","MA"],["马托格罗索","MT"],["米纳斯吉拉斯","MG"],["南里奥格兰德","RS"],["南马托格罗索","MS"],["帕拉","PA"],["帕拉伊巴","PB"],["皮奥伊","PI"],["塞阿拉","CE"],["塞尔希培","SE"],["圣埃斯皮里图","ES"],["圣保罗","SP"],["圣卡塔琳娜","SC"],["托坎廷斯","TO"],["亚马孙","AM"]]},"BLR":{"BLR":[["布列斯特","BR"],["戈梅利","HO"],["格罗德诺","HR"],["明斯克市","MI"],["莫吉廖夫","MA"],["维捷布斯克","VI"]]},"BMU":{"BMU":[["百慕大","BMU"]]},"BGR":{"BGR":[["布尔加斯","BOJ"],["卡斯科伏","KHO"],["鲁塞","ROU"],["洛维奇","LVP"],["蒙塔纳","OZA"],["普罗夫迪夫","PDV"],["索非亚","SOF"],["索非亚市","GSO"],["瓦尔纳","VAR"]]},"MNP":{"MNP":[["北马里亚纳群岛","MNP"]]},"BEN":{"BEN":[["阿黎博里","AL"],["阿塔科拉","AK"],["滨海","LI"],["波希康市","BOH"],["博尔古","BO"],["大西洋","AQ"],["高原","PL"],["库福","KO"],["莫诺","MO"],["丘陵","CO"],["韦梅","OU"],["峡谷","DO"],["祖","ZO"]]},"BEL":{"BEL":[["埃诺","WHT"],["安特卫普","VAN"],["布拉班特-瓦隆","WBR"],["布鲁塞尔","BRU"],["东佛兰德","VOV"],["佛兰芒-布拉班特","VBR"],["列日","WLG"],["林堡","VLI"],["卢森堡","WLX"],["那慕尔","WNA"],["西佛兰德","VWV"]]},"ISL":{"ISL":[["冰岛","ISL"]]},"PRI":{"PRI":[["波多黎各","PRI"]]},"POL":{"POL":[["埃尔布隆格","ELB"],["奥尔什丁","OLS"],["奥斯特罗文卡","OSS"],["比得哥什","BZG"],["彼得库夫","PIO"],["比托姆","BYT"],["比亚瓦波德拉斯卡","BAP"],["比亚维斯托克","BIA"],["波莱","OPO"],["波兹南","POZ"],["达布罗瓦戈尼察","DAB"],["大波兰地区戈茹夫","GOW"],["弗罗茨瓦夫","WRO"],["弗沃茨瓦韦克","WLO"],["格但斯克","GDN"],["格丁尼亚","GDY"],["格利维采","GWC"],["格鲁琼兹","GRU"],["海乌姆","CHO"],["华沙","WAW"],["霍茹夫","CHZ"],["卡利什","KAL"],["卡托维兹","KTW"],["凯尔采","KLC"],["科宁","KON"],["科沙林","OSZ"],["克拉科夫","KRK"],["克罗斯诺","KRO"],["拉多姆","RDM"],["莱格尼察","LEG"],["莱什诺","LEZ"],["卢布林","LUL"],["鲁达","RDS"],["罗兹","LOD"],["绿山城","IEG"],["米什洛维采","MYL"],["皮瓦","PIL"],["普热梅希尔","PRZ"],["普沃茨克","PLO"],["切哈努夫","CIE"],["热舒夫","RZE"],["什切青","SZZ"],["斯凯尔涅维采","SKI"],["斯武普斯克","SLP"],["苏瓦乌基","SWL"],["索波特","SOP"],["索斯诺维茨","SWC"],["塔尔努夫","TAR"],["塔尔诺布热格","QEP"],["特切","TYY"],["托伦","TOR"],["瓦乌布日赫","WZH"],["沃姆扎","QOY"],["希米亚诺维采","SOW"],["希维诺乌伊希切","SWI"],["希维托赫洛维采","SWT"],["谢德尔采","SDC"],["谢拉兹","SIR"],["新松奇","NOW"],["雅沃兹诺","JAW"],["耶莱尼亚古拉","JEG"],["扎布热","ZAB"],["扎莫希奇","ZAM"]]},"BOL":{"BOL":[["奥尔托","ALT"],["奥鲁罗","ORU"],["贝尼","BEN"],["波多西","POI"],["基拉科洛","QUI"],["科恰班巴","CBB"],["拉巴斯","LPB"],["潘多","PAN"],["丘基萨卡","CHU"],["萨卡巴","SAC"],["圣克鲁斯","SRZ"],["塔里哈","TJA"]]},"BIH":{"BIH":[["波萨维纳","FPO"],["波斯尼亚－波德里涅","FBP"],["多米斯拉夫格勒","FTO"],["黑塞哥维那－涅雷特瓦","FHN"],["萨拉热窝","FSA"],["图兹拉－波德里涅","FTU"],["乌纳－萨纳","FUS"],["西波斯尼亚","FHB"],["西黑塞哥维那","FZH"],["泽尼察－多博伊","FZE"],["中波斯尼亚","FSB"]]},"BWA":{"BWA":[["博茨瓦纳","BWA"]]},"BLZ":{"BLZ":[["伯利兹","BZ"],["橘园","OW"],["卡约","CY"],["科罗萨尔","CR"],["斯坦港","SC"],["托莱多","TO"]]},"BTN":{"BTN":[["不丹","BTN"]]},"BFA":{"BFA":[["巴雷","BAL"],["巴姆","BAM"],["巴瓦","BAN"],["巴泽加","BAZ"],["波尼","PON"],["布尔古","BLG"],["布尔基恩德","BOK"],["布古里巴","BOR"],["冈祖尔古","GAN"],["古尔马","GOU"],["济罗","ZIR"],["卡焦戈","KAD"],["凯内杜古","KEN"],["科蒙加里","KOO"],["科莫埃","COM"],["孔皮恩加","KOP"],["孔西","KOS"],["库尔佩罗戈","KOL"],["库尔维奥戈","KOW"],["库里滕加","KOT"],["雷拉巴","LER"],["罗卢姆","LOR"],["穆翁","MOU"],["纳门滕加","NAM"],["纳乌里","NAH"],["纳亚拉","NAY"],["尼亚尼亚","GNA"],["努姆比埃尔","NOU"],["帕索雷","PAS"],["塞诺","SEN"],["桑吉","SAG"],["桑马滕加","SAM"],["苏鲁","SOR"],["苏姆","SOM"],["塔波阿","TAP"],["图伊","TUY"],["乌埃","HOU"],["乌布里滕加","OUB"],["乌达兰","OUD"],["锡西里","SIS"],["亚加","YAG"],["亚滕加","YAT"],["伊奥巴","IOA"],["宗德韦奥戈","ZOW"],["宗多马","ZOD"]]},"BDI":{"BDI":[["布班扎","BB"],["布鲁里","BR"],["布琼布拉城市","BM"],["布琼布拉乡村","BU"],["恩戈齐","NG"],["基龙多","KI"],["基特加","GI"],["卡鲁济","KR"],["卡扬扎","KY"],["坎库佐","CA"],["鲁塔纳","RT"],["鲁伊吉","RY"],["马坎巴","MA"],["穆拉姆维亚","MU"],["穆瓦洛","MW"],["穆因加","MY"],["锡比托凯","CI"]]},"BVT":{"BVT":[["布韦岛","BVT"]]},"PRK":{"PRK":[["海州","HAE"],["惠山","HYE"],["江界","KAN"],["开城","KSN"],["罗先","NAS"],["南浦","NAM"],["平壤","FNJ"],["清津","CHO"],["沙里院","SAR"],["咸兴","HAM"],["新义州","SII"],["元山","WON"]]},"DNK":{"DNK":[["奥胡斯","AR"],["北日德兰","VSV"],["博恩霍尔姆","BO"],["菲特烈堡","FRE"],["菲茵","FY"],["哥本哈根","CPH"],["里伯","RIB"],["灵克宾","RKG"],["罗斯基勒","RKE"],["南日德兰","VBI"],["斯多斯特姆","ST"],["维堡","VIB"],["维厄勒","VEJ"],["西希兰","VS"]]},"DEU":{"DEU":[["阿恩斯贝格","ARN"],["爱尔福特","ERF"],["安斯巴格","ANS"],["奥格斯堡","AGB"],["柏林","BE"],["拜伊罗特","BYU"],["比勒费尔德","BFE"],["波茨坦","POT"],["波鸿","BOM"],["不来梅","HB"],["不伦瑞克","BRW"],["达姆施塔特","DAR"],["代特莫尔特","DET"],["德累斯顿","DRS"],["德绍","DES"],["杜塞尔多夫","DUS"],["法兰克福","FFO"],["弗赖堡","FBG"],["哈雷","HAE"],["汉堡","HH"],["汉诺威","HAJ"],["基尔","KEL"],["吉森","GBN"],["卡尔斯鲁厄","KAE"],["卡塞尔","KAS"],["开姆尼斯","CHE"],["科布伦次","KOB"],["科隆","CGN"],["莱比锡","LEJ"],["兰茨胡特","LDH"],["吕讷堡","LBG"],["马格德堡","MAG"],["曼海姆","MHG"],["美因兹","MAI"],["明斯特","MUN"],["慕尼黑","MUC"],["纽伦堡","NUE"],["什未林","SWH"],["斯图加特","STR"],["特里尔","TRI"],["威斯巴登","WIB"],["维尔茨堡","WUG"]]},"TLS":{"TLS":[["阿伊莱乌","AL"],["阿伊纳罗","AN"],["埃尔梅拉","ER"],["安贝诺","AM"],["包考","BA"],["博博纳罗","BO"],["帝力","DI"],["科瓦利马","KO"],["劳滕","LA"],["利基卡","LI"],["马纳图托","MT"],["马努法伊","MF"],["维克克","VI"]]},"TGO":{"TGO":[["滨海区","M"],["草原区","S"],["高原区","P"],["卡拉区","K"],["中部区","C"]]},"DMA":{"DMA":[["多米尼加","DMA"]]},"DOM":{"DOM":[["多米尼加共和国","DOM"]]},"RUS":{"RUS":[["阿巴坎","ABA"],["阿尔汉格尔斯克","ARK"],["阿金斯科耶","AGI"],["阿纳德尔","DYR"],["阿斯特拉罕","AST"],["埃利斯塔","ESL"],["奥廖尔","ORL"],["奥伦堡","ORE"],["巴尔瑙尔","BAX"],["奔萨","PNZ"],["彼得罗巴甫洛夫斯克","PKC"],["彼得罗扎沃茨克","PES"],["彼尔姆","PER"],["比罗比詹","BBZ"],["别尔哥罗德","BEL"],["伯力","COK"],["布拉戈维申斯克","BQS"],["布良斯克","BRY"],["车里雅宾斯克","CHE"],["赤塔","CHI"],["顿河畔罗斯托夫","ROS"],["鄂木斯克","OMS"],["伏尔加格勒","VOG"],["弗拉基米尔","VMR"],["弗拉季高加索","VLA"],["戈尔诺－阿尔泰斯克","GOA"],["格罗兹尼","GRV"],["海参崴","VVO"],["汉特－曼西斯克","KHM"],["基洛夫","KIR"],["加里宁格勒","KGD"],["喀山","KZN"],["卡卢加","KLF"],["科斯特罗马","KOS"],["克拉斯诺达尔","KRR"],["克拉斯诺亚尔斯克","KYA"],["克麦罗沃","KEM"],["克孜勒","KYZ"],["库德姆卡尔","KUD"],["库尔干","KRO"],["库尔斯克","URS"],["利佩茨克","LIP"],["梁赞","RYA"],["马哈奇卡拉","MCX"],["马加丹","MAG"],["马加斯","IN"],["迈科普","MAY"],["摩尔曼斯克","MMK"],["莫斯科","MOW"],["纳尔奇克","NAL"],["纳里扬马尔","NNM"],["南萨哈林斯克","JSA"],["诺夫哥罗德","VUS"],["帕拉纳","PAL"],["普斯科夫","PSK"],["切博克萨雷","CSY"],["切尔克斯克","CKS"],["秋明","TYU"],["萨拉托夫","SAR"],["萨兰斯克","SKX"],["萨列哈尔德","SLY"],["萨马拉","SAM"],["瑟克特夫卡尔","SCW"],["圣彼得堡","SPE"],["斯摩棱斯克","LNX"],["斯塔夫罗波尔","STA"],["坦波夫","TAM"],["特维尔","TVE"],["图拉","TUL"],["托木斯克","TOM"],["沃罗涅什","VOR"],["沃洛格达","VLG"],["乌法","UFA"],["乌兰乌德","UUD"],["乌里扬诺夫斯克","ULY"],["乌斯季奥尔登斯基","UOB"],["下诺夫哥罗德","GOJ"],["新西伯利亚","NVS"],["雅库茨克","JAK"],["雅罗斯拉夫尔","JAR"],["叶卡捷林堡","JEK"],["伊尔库茨克","IKT"],["伊热夫斯克","IJK"],["伊万诺沃","IVO"],["约什卡尔奥拉","YOL"]]},"ECU":{"ECU":[["阿苏艾","A"],["埃尔奥罗","O"],["埃斯梅拉尔达斯","E"],["玻利瓦尔","B"],["瓜亚斯","G"],["加拉帕戈斯","W"],["卡尔奇","C"],["卡尼亚尔","F"],["科托帕希","X"],["洛哈","L"],["洛斯里奥斯","R"],["马纳比","M"],["莫罗纳－圣地亚哥","S"],["纳波，奥雷利亚纳","D"],["帕斯塔萨","Y"],["皮钦查","P"],["钦博拉索","H"],["萨莫拉－钦奇佩","Z"],["苏昆毕奥斯","U"],["通古拉瓦","T"],["因巴布拉","I"]]},"ERI":{"ERI":[["安塞巴","KE"],["北红海","SK"],["加什·巴尔卡","BR"],["南部","DE"],["南红海","DK"],["中部","MA"]]},"FRA":{"FRA":[["阿尔勒","ARL"],["阿雅克修","AJA"],["艾克斯","QXB"],["奥尔良","ORR"],["巴黎","PAR"],["贝桑松","BSN"],["第戎","DIJ"],["弗雷瑞斯","FRJ"],["卡昂","CFR"],["雷恩","RNS"],["里昂","LIO"],["里尔","LLE"],["利摩日","LIG"],["鲁昂","URO"],["马赛","MRS"],["梅斯","MZM"],["蒙彼利埃","MPL"],["南特","NTE"],["尼斯","NCE"],["沙隆","CSM"],["图卢兹","TLS"],["瓦朗斯","VAA"],["亚眠","AMI"]]},"FRO":{"FRO":[["法罗群岛","FRO"]]},"PYF":{"PYF":[["法属波利尼西亚","PYF"]]},"GUF":{"GUF":[["法属圭亚那","GUF"]]},"ATF":{"ATF":[["法属南部领地","ATF"]]},"VAT":{"VAT":[["梵蒂冈","VAT"]]},"PHL":{"PHL":[["达沃","DOR"],["卡卢坎","CAO"],["马尼拉","MNL"],["宿务","CEB"]]},"FJI":{"FJI":[["斐济","FJI"]]},"FIN":{"FIN":[["埃斯波","ESP"],["奥卢","OLU"],["波里","POR"],["博尔沃","PRV"],["海门林纳","HMY"],["赫尔辛基","HEL"],["卡亚尼","KAJ"],["科科拉","KOK"],["科特卡","KTK"],["库奥皮奥","KUO"],["拉赫蒂","LHI"],["拉彭兰塔","LPP"],["罗瓦涅米","RVN"],["玛丽港","MHQ"],["米凯利","MIK"],["坦佩雷","TMP"],["图尔库","TKU"],["瓦萨","VAA"],["万塔","VAT"],["约恩苏","JOE"]]},"CPV":{"CPV":[["保尔","PA"],["波多诺伏","PN"],["博阿维斯塔岛","BV"],["布拉瓦岛","BR"],["大里贝拉","RG"],["福古岛","FO"],["马尤岛","MA"],["莫斯特罗","MO"],["普拉亚","PR"],["萨尔岛","SL"],["圣安唐岛","SA"],["圣地亚哥岛","IA"],["圣多明戈","SD"],["圣菲利普","SF"],["圣卡塔琳娜","CA"],["圣克鲁斯","CR"],["圣米戈尔","SM"],["圣尼古拉岛","SN"],["圣维森特岛","SV"],["塔拉法尔","TA"]]},"FLK":{"FLK":[["弗兰克群岛","FLK"]]},"GMB":{"GMB":[["冈比亚","GMB"]]},"COG":{"COG":[["刚果","COG"]]},"COD":{"COD":[["刚果民主共和国","COD"]]},"COL":{"COL":[["阿劳卡","ARA"],["安提奥基亚","ANT"],["北桑坦德","NDS"],["波哥大首都区","BDC"],["博利瓦尔","BOL"],["博亚卡","BOY"],["大西洋","ATL"],["瓜维亚雷","GVR"],["瓜希拉","GJR"],["瓜伊尼亚","GNA"],["金迪奥","QUI"],["卡尔达斯","CAL"],["卡克塔","CAQ"],["卡萨纳雷","CAS"],["考卡","CAU"],["考卡山谷","VDC"],["科尔多巴","COR"],["昆迪纳马卡","CAM"],["利萨拉尔达","RIS"],["马格达雷那","MAG"],["梅塔","MET"],["纳里尼奥","NAR"],["普图马约","PUT"],["乔科","CHO"],["塞萨尔","CES"],["桑坦德","SAN"],["圣安德烈斯-普罗维登西亚","SAP"],["苏克雷","SUC"],["托利马","TOL"],["维查达","VIC"],["沃佩斯","VAU"],["乌伊拉","HUI"],["亚马孙","AMZ"]]},"CRI":{"CRI":[["阿拉胡埃拉","A"],["埃雷迪亚","H"],["瓜纳卡斯特","G"],["卡塔戈","C"],["利蒙","L"],["蓬塔雷纳斯","P"],["圣何塞","SJ"]]},"GGY":{"GGY":[["格恩西岛","GGY"]]},"GRD":{"GRD":[["格林纳达","GRD"]]},"GRL":{"GRL":[["格陵兰","GRL"]]},"CUB":{"CUB":[["奥尔金","11"],["比那尔德里奥","1"],["比亚克拉拉","5"],["格拉玛","12"],["关塔那摩","14"],["哈瓦那","2"],["哈瓦那城","3"],["卡马圭","9"],["拉斯图纳斯","10"],["马坦萨斯","4"],["马亚里","MAY"],["曼萨尼罗","MZO"],["青年岛特区","99"],["圣地亚哥","13"],["圣斯皮里图斯","7"],["西恩富戈斯","6"],["谢戈德阿维拉","8"]]},"GLP":{"GLP":[["瓜德罗普","GLP"]]},"GUM":{"GUM":[["关岛","GUM"]]},"GUY":{"GUY":[["埃塞奎博群岛-西德梅拉拉","EW"],["巴里马-瓦伊尼","BW"],["波默伦-苏佩纳姆","PM"],["波塔罗-锡帕鲁尼","PI"],["德梅拉拉-马海卡","DM"],["东伯比斯-科兰太因","EC"],["库尤尼-马扎鲁尼","CM"],["马海卡-伯比斯","MB"],["上德梅拉拉-伯比斯","UD"],["上塔库图-上埃塞奎博","UT"]]},"KAZ":{"KAZ":[["阿尔卡累克","AYK"],["阿克莫拉","AKM"],["阿克苏","AKS"],["阿克托别","AKT"],["阿拉木图","ALA"],["阿雷斯","ARY"],["阿斯塔纳市","AST"],["阿特劳","ATY"],["埃基巴斯图兹","EKB"],["巴尔喀什","BXH"],["巴甫洛达尔","PAV"],["北哈萨克斯坦","SEV"],["东哈萨克斯坦","VOS"],["济良诺夫斯克","ZYR"],["江布尔","DMB"],["杰兹卡兹甘","DZH"],["卡拉干达","KAR"],["卡拉扎尔","KZO"],["卡普恰盖","KAP"],["科斯塔奈","KST"],["克孜勒奥尔达","KZY"],["肯套","KEN"],["库尔恰托夫","KUR"],["利萨科夫斯克","LKK"],["列宁诺戈尔斯克","LEN"],["鲁德内","RUD"],["曼格斯套","MAN"],["南哈萨克斯坦","KGT"],["萨兰","SAR"],["塞梅伊","SEM"],["沙赫京斯克","SAK"],["斯捷普诺戈尔斯克","STE"],["铁克利","TEK"],["铁米尔套","TEM"],["突厥斯坦","TUR"],["西哈萨克斯坦","ZAP"],["扎纳奥津","ZHA"]]},"HTI":{"HTI":[["海地","HTI"]]},"KOR":{"27":[["达城郡","DSG"],["大邱","TAE"],["寿城区","SUS"]],"30":[["大田","30"]],"26":[["釜山","26"]],"29":[["光州","29"]],"41":[["济州特别自治道","41"]],"42":[["春川市","CHC"],["东海市","TGH"],["高城郡","GSG"],["横城郡","HSG"],["洪川郡","HCN"],["华川郡","HCH"],["江陵市","KAG"],["旌善郡","JSE"],["麟蹄郡","IJE"],["宁越郡","YWL"],["平昌郡","POG"],["三陟市","SUK"],["束草市","SHO"],["太白市","TBK"],["铁原郡","CWN"],["襄阳郡","YNY"],["杨口郡","YGU"],["原州市","WJU"]],"49":[["安城市","ASG"],["安山市","ASN"],["安养市","ANY"],["抱川市","POC"],["城南市","SEO"],["东豆川市","DDC"],["富川市","BCN"],["高阳市","GYG"],["光明市","GMG"],["广州市","KWU"],["果川市","GCN"],["河南市","HNM"],["华城市","HCH"],["加平郡","GPG"],["金浦市","GMP"],["九里市","GRI"],["军浦市","GUN"],["骊州郡","YJU"],["利川市","ICE"],["涟川郡","YCN"],["龙仁市","YNG"],["南杨州市","NYU"],["平泽市","PTK"],["坡州市","PJU"],["始兴市","SHE"],["水原市","SUO"],["乌山市","OSN"],["扬平郡","YPG"],["杨州市","YYU"],["仪旺市","UWN"],["议政府市","UIJ"]],"43":[["安东市","ADG"],["奉化郡","BHA"],["高灵郡","GRG"],["龟尾市","KUM"],["金泉市","KMC"],["军威郡","GWI"],["醴泉郡","YEC"],["浦项市","KPO"],["漆谷郡","CGK"],["淸道郡","CDO"],["靑松郡","CSG"],["庆山市","GYS"],["庆州市","GJU"],["荣州市","YEJ"],["尙州市","SJU"],["蔚珍郡","UJN"],["闻庆市","MGG"],["星州郡","SEJ"],["义城郡","USG"],["英阳郡","YYG"],["盈德郡","YDK"],["永川市","YCH"],["郁陵郡","ULG"]],"44":[["昌宁郡","CNG"],["昌原市","CHW"],["固城郡","GSO"],["河东郡","HDG"],["金海市","KMH"],["晋州市","HIN"],["居昌郡","GCH"],["巨济市","KJE"],["梁山市","YSN"],["马山市","MAS"],["密阳市","MIR"],["南海郡","NHE"],["山淸郡","SCH"],["泗川市","SAH"],["统营市","TYG"],["陜川郡","HCE"],["咸安郡","HAN"],["咸阳郡","HYG"],["宜宁郡","URG"],["鎭海市","CHF"]],"47":[["淳昌郡","SCG"],["扶安郡","PUS"],["高敞郡","GCG"],["金堤市","GJE"],["井邑市","JEO"],["茂朱郡","MJU"],["南原市","NWN"],["全州市","JNJ"],["群山市","KUV"],["任实郡","ISL"],["完州郡","WAJ"],["益山市","IKS"],["长水郡","JSU"],["鎭安郡","JAN"]],"48":[["宝城郡","BSG"],["高兴郡","GHG"],["谷城郡","GSE"],["莞岛郡","WND"],["光阳市","KAN"],["海南郡","HAE"],["和顺郡","HSN"],["康津郡","GJN"],["丽水市","YOS"],["灵光郡","YGG"],["灵岩郡","YAM"],["罗州市","NJU"],["木浦市","MOK"],["求礼郡","GRE"],["顺天市","SYS"],["潭阳郡","DYA"],["务安郡","MAN"],["咸平郡","HPG"],["新安郡","SAN"],["长城郡","JSN"],["长兴郡","JHG"],["珍岛郡","JDO"]],"28":[["仁川","28"]],"11":[["首尔","11"]],"31":[["蔚山","31"]],"45":[["报恩郡","BEN"],["曾坪郡","JYG"],["丹阳郡","DYG"],["堤川市","JCH"],["槐山郡","GSN"],["淸原郡","CWO"],["淸州市","CJJ"],["沃川郡","OCN"],["阴城郡","ESG"],["永同郡","YDG"],["鎭川郡","JCN"],["忠州市","CHU"]],"46":[["保宁市","BOR"],["扶余郡","BYO"],["公州市","GOJ"],["洪城郡","HSE"],["鸡龙市","GYE"],["锦山郡","GSA"],["礼山郡","YOS"],["论山市","NSN"],["青阳郡","CYG"],["瑞山市","SSA"],["舒川郡","SCE"],["泰安郡","TAN"],["唐津郡","TJI"],["天安市","CHO"],["牙山市","ASA"],["燕岐郡","YGI"]]},"NLD":{"NLD":[["阿尔梅勒","AER"],["阿默斯福特","AME"],["阿姆斯特丹","AMS"],["阿纳姆","ARN"],["阿珀尔多伦","APE"],["阿森","ASS"],["埃德","EDE"],["埃门","EMM"],["埃因霍芬","EIN"],["布雷达","BRD"],["蒂尔堡","TLB"],["多德雷赫特","DOR"],["恩斯赫德","ENS"],["格罗宁根","GRQ"],["哈勒姆","HRA"],["海牙","HAG"],["霍夫多尔普","HFD"],["莱顿","LID"],["莱利斯塔德","LEY"],["鹿特丹","RTM"],["吕伐登","LWR"],["马斯特里赫特","MST"],["米德尔堡","MDL"],["奈梅亨","NIJ"],["斯海尔托亨博思","HTB"],["乌得勒支","UTC"],["兹沃勒","ZWO"],["佐特尔梅","ZTM"]]},"ANT":{"ANT":[["荷属安地列斯","ANT"]]},"HMD":{"HMD":[["赫德和麦克唐纳群岛","HMD"]]},"HND":{"HND":[["阿特兰蒂达","AT"],["埃尔帕拉伊索","PA"],["奥科特佩克","OC"],["奥兰乔","OL"],["弗朗西斯科-莫拉桑","FM"],["格拉西亚斯-阿迪奥斯","GD"],["海湾群岛","IB"],["科尔特斯","CR"],["科隆","CL"],["科马亚瓜","CM"],["科潘","CP"],["拉巴斯","PZ"],["伦皮拉","LE"],["乔卢特卡","CH"],["乔罗马","CHO"],["山谷","VA"],["圣巴巴拉","SB"],["因蒂布卡","IN"],["约罗","YO"]]},"KIR":{"KIR":[["菲尼克斯群岛","PHO"],["吉尔伯特群岛","GIL"],["莱恩群岛","LIN"]]},"DJI":{"DJI":[["阿里萨比赫区","S"],["奥博克区","O"],["迪基勒区","K"],["塔朱拉区","T"]]},"KGZ":{"KGZ":[["奥什","O"],["巴特肯","B"],["比什凯克市","GB"],["楚河","C"],["贾拉拉巴德","J"],["卡拉巴尔塔","KBA"],["卡拉库尔","KKO"],["坎特","KAN"],["科克扬加克","KJ"],["迈利赛","MS"],["纳伦","N"],["苏卢克图","SU"],["塔拉斯","T"],["塔什库梅尔","TK"],["乌兹根","UG"],["伊塞克湖","Y"]]},"GIN":{"GIN":[["博凯","BOK"],["恩泽雷科雷","NZR"],["法拉纳","FRN"],["金迪亚","KND"],["康康","KNK"],["科纳克里","CNK"],["拉贝","LAB"],["玛木","MAM"]]},"GNB":{"GNB":[["几内亚比绍","GNB"]]},"CAN":{"CAN":[["阿伯茨福","ABB"],["埃德蒙顿","EDM"],["奥沙瓦","OSH"],["巴里","BAR"],["布列塔尼角","CBR"],["多伦多","TOR"],["弗雷德里顿","FRE"],["圭尔夫","GLP"],["哈利法克斯","HAL"],["哈密尔顿","HAM"],["怀特霍斯","YXY"],["基劳纳","KWL"],["基奇纳","BRP"],["金斯敦","KGN"],["卡里加里","CAL"],["魁北克","QUE"],["里贾纳","REG"],["伦敦","LOD"],["蒙特利尔","MTR"],["萨德伯里","SUD"],["萨斯卡通","SAK"],["三河城","TRR"],["桑德贝","THU"],["舍布鲁克","SBE"],["圣卡塔琳娜","SCA"],["圣约翰斯","SJB"],["维多利亚","VIC"],["温哥华","VAN"],["温尼伯","WNP"],["温莎","WDR"],["渥太华","OTT"],["夏洛特敦","CHA"],["耶洛奈夫","YZF"],["伊魁特","IQL"]]},"GHA":{"GHA":[["阿散蒂","AS"],["奥布阿西","OBU"],["北部","NO"],["布朗阿哈福","BA"],["大阿克拉","GA"],["东部","EA"],["上东部","UE"],["上西部","UW"],["沃尔特","VO"],["西部","WE"],["中部","CE"]]},"GAB":{"GAB":[["奥果韦-洛洛","OL"],["奥果韦-伊温多","OI"],["滨海奥果韦","OM"],["恩古涅","NG"],["河口","ES"],["尼扬加","NY"],["上奥果韦","HO"],["沃勒-恩特姆","WN"],["中奥果韦","MO"]]},"KHM":{"KHM":[["奥多棉吉","OC"],["白马市","KB"],["柏威夏","PR"],["拜林市","PL"],["班迭棉吉","BM"],["磅清扬","KZC"],["磅士卑","KO"],["磅同","KZK"],["磅湛","KM"],["波罗勉","PG"],["茶胶","TK"],["柴桢","SVR"],["干丹","KL"],["戈公","KKZ"],["贡布","KMT"],["金边市","PNH"],["桔井","KH"],["腊塔纳基里","RBE"],["马德望","BA"],["蒙多基里","MWV"],["菩萨","PO"],["上丁","TNX"],["西哈努克市","KA"],["暹粒","REP"]]},"CZE":{"CZE":[["奥洛穆茨","OL"],["比尔森","PL"],["布拉格直辖市","PR"],["赫拉德茨-克拉洛韦","KR"],["卡罗维发利","KA"],["利贝雷克","LI"],["摩拉维亚-西里西亚","MO"],["南摩拉维亚","JC"],["帕尔杜比采","PA"],["维索基纳","VY"],["乌斯季","US"],["中捷克","ST"],["兹林","ZL"]]},"ZWE":{"ZWE":[["北马塔贝莱兰","MN"],["布拉瓦约","BU"],["东马绍纳兰","ME"],["哈拉雷","HA"],["马尼卡兰","ML"],["马斯温戈","MV"],["南马塔贝莱兰","MS"],["西马绍纳兰","MW"],["中部","MD"],["中马绍纳兰","MC"]]},"CMR":{"CMR":[["阿达马瓦","ADA"],["北部","NOR"],["北端","EXN"],["滨海","LIT"],["东部","EST"],["南部","SUD"],["西北","NOT"],["西部","OUE"],["西南","SOU"],["中央","CEN"]]},"QAT":{"QAT":[["北部","MS"],["多哈","DW"],["古韦里耶","GW"],["豪尔","KR"],["杰里扬拜特奈","JB"],["赖扬","RN"],["沃克拉","WK"],["乌姆锡拉勒","UL"],["朱迈利耶","JM"]]},"CYM":{"CYM":[["开曼群岛","CYM"]]},"CCK":{"CCK":[["科科斯群岛","CCK"]]},"COM":{"COM":[["科摩罗","COM"]]},"CIV":{"CIV":[["阿涅比","AG"],["巴芬","BF"],["邦达马河谷","VB"],["登盖莱","DE"],["恩济－科莫埃","NC"],["弗罗马格尔","FR"],["湖泊","LC"],["马拉韦","MR"],["南邦达马","SB"],["南科莫埃","SC"],["萨桑德拉","HT"],["萨瓦纳","SV"],["山地","DH"],["沃罗杜古","WR"],["下萨桑德拉","BS"],["泻湖","LG"],["赞赞","ZA"],["中卡瓦利","MV"],["中科莫埃","MC"]]},"KWT":{"KWT":[["科威特","KWT"]]},"HRV":{"HRV":[["奥西耶克-巴拉尼亚","14"],["别洛瓦尔-比洛戈拉","7"],["滨海和山区","8"],["波热加-斯拉沃尼亚","11"],["布罗德-波萨维纳","12"],["杜布罗夫斯克-内雷特瓦","19"],["卡尔洛瓦茨","4"],["科普里夫尼察-克里热夫齐","6"],["克拉皮纳-扎戈列","2"],["利卡-塞尼","9"],["梅吉穆列","20"],["萨格勒布","1"],["萨格勒布市","21"],["斯普利特-达尔马提亚","17"],["瓦拉日丁","5"],["维罗维蒂察-波德拉维纳","10"],["武科瓦尔-斯里耶姆","16"],["希贝尼克-克宁","15"],["锡萨克-莫斯拉维纳","3"],["伊斯特拉","18"],["扎达尔","13"]]},"KEN":{"KEN":[["埃尔格约-马拉奎特","EMA"],["巴林戈","BAR"],["邦戈马","BUN"],["博美特","BOM"],["布希亚","BUS"],["恩布","EMB"],["霍马湾","HOB"],["基安布","KIA"],["基里菲","KIL"],["基里尼亚加","KIR"],["基苏木","KIS"],["基图伊","KIT"],["基西","KII"],["加里萨","GAS"],["卡卡梅加","KAK"],["卡耶亚多","KAJ"],["凯里乔","KEY"],["夸勒","KWA"],["拉木","LAU"],["莱基皮亚","LAI"],["马查科斯","MAC"],["马瓜尼","MAK"],["马萨布布","RBT"],["曼德拉","MAN"],["梅鲁","MER"],["蒙巴萨","MOM"],["米戈利","MIG"],["穆兰卡","MUR"],["纳库鲁","NUU"],["纳罗克","NAR"],["南迪","NAN"],["内罗毕","NA"],["尼蒂","NIT"],["尼亚米拉","NYM"],["年达鲁阿","NYN"],["涅里","NYE"],["桑布卢","UAS"],["塔纳河","TRI"],["泰塔塔维塔","TTA"],["特兰斯-恩佐亚","TNZ"],["图尔卡纳","TUR"],["瓦吉尔","WJR"],["瓦辛基苏","UGI"],["韦希加","VIH"],["西波克特","WPO"],["夏亚","SIA"],["伊希约洛","ISI"],["中央","CE"]]},"COK":{"COK":[["库克群岛","COK"]]},"LVA":{"LVA":[["阿卢克斯内","ALU"],["爱兹克劳克雷","AIZ"],["奥格雷","OGR"],["巴尔维","BAL"],["包斯卡","BAU"],["采西斯","CES"],["多贝莱","DOB"],["古尔贝内","GUL"],["杰卡布皮尔斯","JEK"],["克拉斯拉瓦","KRA"],["库尔迪加","KUL"],["雷泽克内","RZR"],["里加","RGA"],["利耶帕亚","LPK"],["林巴济","LIM"],["卢扎","LUD"],["马多纳","MAD"],["普雷利","PRE"],["萨尔杜斯","SAL"],["塔尔西","TAL"],["陶格夫皮尔斯","DGR"],["图库马","TUK"],["瓦尔加","VLK"],["瓦尔米耶拉","VLM"],["文茨皮尔斯","VSL"],["叶尔加瓦","JGR"]]},"LSO":{"LSO":[["伯里亚","D"],["布塔布泰","B"],["古廷","G"],["加查斯内克","H"],["莱里贝","C"],["马费滕","E"],["马塞卢","A"],["莫哈莱斯胡克","F"],["莫霍特隆","J"],["塔巴采卡","K"]]},"LAO":{"LAO":[["阿速坡","AT"],["波里坎赛","BL"],["博乔","BK"],["川圹","XI"],["丰沙里","PH"],["甘蒙","KH"],["华潘","HO"],["琅勃拉邦","LP"],["琅南塔","LM"],["赛宋本行政特区","XN"],["色贡","XE"],["沙拉湾","SL"],["沙湾拿吉","SV"],["沙耶武里","XA"],["万象","VI"],["乌多姆赛","OU"],["占巴塞","CH"]]},"LBN":{"LBN":[["北部","AS"],["贝卡","BI"],["贝鲁特","BA"],["黎巴嫩山","JL"],["奈拜提耶市","NA"],["南部","JA"]]},"LBR":{"LBR":[["巴波卢","GBA"],["邦","BG"],["博波卢","BOP"],["博米","BM"],["大巴萨","GB"],["大吉德","GG"],["大角山","CM"],["大克鲁","GK"],["菲什敦","FT"],["吉河","RG"],["里弗塞斯","RI"],["洛法","LO"],["马吉比","MG"],["马里兰","MY"],["蒙特塞拉多","MO"],["宁巴","NI"],["锡诺","SI"]]},"LBY":{"LBY":[["利比亚","LBY"]]},"LTU":{"LTU":[["阿利图斯","AL"],["考纳斯","KA"],["克莱佩达","KL"],["马里扬泊列","MA"],["帕涅韦日斯","PA"],["陶拉格","TA"],["特尔希艾","TE"],["维尔纽斯","VI"],["乌田纳","UT"],["希奥利艾","SI"],["亚克曼","AKM"]]},"LIE":{"LIE":[["列支敦士登","LIE"]]},"REU":{"REU":[["留尼旺岛","REU"]]},"LUX":{"LUX":[["迪基希","DD"],["格雷文马赫","GG"],["卢森堡","LL"]]},"RWA":{"RWA":[["比温巴","BY"],["布塔雷","BU"],["恩延扎","NY"],["基本古","KG"],["基布耶","KY"],["基加利-恩加利","KR"],["基加利市","KV"],["吉孔戈罗","GK"],["吉塞尼","GS"],["吉塔拉马","GT"],["卡布加","KA"],["卢瓦马加纳","RW"],["鲁汉戈","RH"],["鲁亨盖里","RU"],["尚古古","CY"],["乌姆塔拉","UM"]]},"ROU":{"ROU":[["阿尔巴尤利亚","AL"],["阿拉德","AR"],["奥拉迪亚","OR"],["巴克乌","BA"],["巴亚马雷","BM"],["比斯特里察","BN"],["博托沙尼","BO"],["布加勒斯特","BC"],["布拉索夫","BS"],["布勒伊拉","BL"],["布泽乌","BZ"],["德罗贝塔-塞维林堡","DT"],["德瓦","DE"],["蒂米什瓦拉","TI"],["福克沙尼","FO"],["加拉茨","GL"],["久尔久","GG"],["康斯坦察","CT"],["克拉约瓦","DO"],["克勒拉希","CR"],["克卢日纳波卡","CN"],["勒姆尼库沃尔恰","VI"],["雷希察","RE"],["梅尔库里亚丘克","MC"],["皮特什蒂","PI"],["皮亚特拉尼亚姆茨","PN"],["普洛耶什蒂","PL"],["萨图·马雷","SM"],["圣格奥尔基","SG"],["斯拉蒂纳","ST"],["斯洛博齐亚","SB"],["苏恰瓦","SU"],["特尔戈维什泰","TA"],["特尔古穆列什","TM"],["特尔古日乌","TJ"],["图尔恰","TU"],["瓦斯卢伊","VA"],["锡比乌","SO"],["雅西","IS"],["亚厉山德里亚","AD"],["扎勒乌","ZA"]]},"MDG":{"MDG":[["安齐拉纳纳","AS"],["菲亚纳兰楚阿","FN"],["马哈赞加","MJ"],["塔那那利佛","AN"],["图阿马西拉","TM"],["图利亚拉","TL"]]},"MDV":{"MDV":[["阿杜","ADD"],["北阿里","AAD"],["北蒂拉杜马蒂","THD"],["北马洛斯马杜卢","MAD"],["北米拉杜马杜卢","MLD"],["北尼兰杜","NAD"],["北苏瓦迪瓦","HAD"],["法迪福卢","FAA"],["费利杜","FEA"],["福阿穆拉库","FMU"],["哈杜马蒂","HDH"],["科卢马杜卢","KLH"],["马累","MAL"],["马累岛","MAA"],["穆拉库","MUA"],["南阿里","AAU"],["南蒂拉杜马蒂","THU"],["南马洛斯马杜卢","MAU"],["南米拉杜马杜卢","MLU"],["南尼兰杜","NAU"],["南苏瓦迪瓦","HAU"]]},"MLT":{"MLT":[["马耳他","MLT"]]},"MWI":{"MWI":[["北部区","N"],["南部区","S"],["中央区","C"]]},"MYS":{"PH":[["北海","BWH"],["槟城","PEN"],["大山脚","BMJ"],["高渊","NTE"]],"PS":[["加央","KGR"]],"TR":[["甘马挽","KEM"],["瓜拉丁加奴","TGG"],["龙运","DGN"],["马江","MAR"],["实兆","SET"],["乌鲁","HUL"],["勿述","BES"]],"KD":[["巴东得腊","PGT"],["笨筒","PEN"],["浮罗交怡","LGK"],["哥打士打","KOR"],["古邦巴素","KPA"],["瓜拉姆达","KMU"],["华玲","BLZ"],["居林","KLM"],["万拉峇鲁","BMA"]],"KN":[["巴西富地","PPU"],["巴西马","PMA"],["丹那美拉","TMR"],["道北","TUM"],["登卓","BAC"],["哥打巴鲁","KBR"],["瓜拉吉赖","KUG"],["话望生","GMU"],["马樟","MAC"],["日里","JEL"]],"KL":[["吉隆坡","KUL"]],"ML":[["马六甲市","MEL"],["亚罗牙也","AOG"],["野新","JAS"]],"LB":[["纳闽","LBU"],["维多利亚","VIC"]],"PG":[["百乐","BER"],["北根","PEK"],["淡马鲁","TEM"],["而连突","JER"],["关丹","KUA"],["金马仑高原","CAH"],["劳勿","RAU"],["立卑","KUL"],["马兰","MAR"],["文冬","BEN"],["云冰","TOM"]],"PK":[["安顺","TAS"],["丹绒马","TAM"],["和丰","SSP"],["紅土坎","LUM"],["华都牙也","BGA"],["江沙","KAR"],["太平","TPG"],["怡保","IPH"]],"JH":[["笨珍","POW"],["丰盛港","MEP"],["哥打丁宜","KTI"],["居銮","KLA"],["峇株巴辖","BAT"],["麻坡","MUA"],["昔加末","SGM"],["新山","JHB"]],"NS":[["波德申","PDI"],["淡边","TAI"],["芙蓉","SRB"],["瓜拉庇劳","KPI"],["林茂","REM"],["仁保","JEP"],["日叻务","JEL"]],"SB":[["吧巴","PAP"],["保佛","BEF"],["比鲁兰","BEL"],["必达士","PIT"],["兵南邦","PMP"],["担布南","TAB"],["丹南","TEN"],["斗湖","TAW"],["斗亚兰","TUR"],["哥打基纳巴鲁","BKI"],["哥打马鲁都","KMU"],["根地咬","KEG"],["古达","KUD"],["古打毛律","KBD"],["古纳","KUN"],["瓜拉班尤","KPU"],["京那巴登岸","KBT"],["兰脑","RNU"],["拿笃","LDU"],["纳巴湾","NAB"],["山打根","SDK"],["西比陶","SPT"],["仙本那","SMM"]],"SR":[["古晋","KCH"],["加帛","KPI"],["林梦","LMN"],["美里","MYY"],["民都鲁","BTU"],["木胶","MKM"],["木中","BTG"],["三马拉汉","SMH"],["斯里阿曼","SAM"],["泗里街","SAR"],["泗务","SBW"]],"SL":[["八打灵","PJA"],["鹅麦","GOM"],["瓜拉冷岳","KLG"],["瓜拉雪兰莪","KSL"],["沙白安南","SBM"],["乌鲁冷岳","HUL"],["乌鲁雪兰莪","HUS"],["雪邦","SEP"]]},"MLI":{"MLI":[["巴马科首都区","CD"],["基达尔","KD"],["加奥","GA"],["卡伊","KY"],["库利科罗","KL"],["莫普提","MP"],["塞古","SG"],["通布图","TB"],["锡卡索","SK"]]},"MKD":{"MKD":[["马其顿","MKD"]]},"MHL":{"MHL":[["马绍尔群岛","MHL"]]},"MTQ":{"MTQ":[["马提尼克","MTQ"]]},"MYT":{"MYT":[["马约特岛","MYT"]]},"IMN":{"IMN":[["曼岛","IMN"]]},"MUS":{"MUS":[["毛里求斯","MUS"]]},"MRT":{"MRT":[["阿德拉尔","AD"],["阿萨巴","AS"],["卜拉克纳","BR"],["东胡德","HG"],["戈尔戈勒","GO"],["吉迪马卡","GM"],["努瓦迪布湾","DN"],["努瓦克肖特特区","NO"],["塔甘特","TA"],["特拉扎","TR"],["提里斯-宰穆尔","TZ"],["西胡德","HC"],["因希里","IN"]]},"USA":{"AR":[["费耶特维尔","FYV"],["史密斯堡","FSM"],["小石城","LIT"]],"AL":[["伯明罕","BHM"],["蒙哥马利","MGM"],["莫比尔","MOB"]],"AK":[["安克雷奇","ANC"],["费尔班克斯","FAI"],["朱诺","JNU"]],"ID":[["爱达荷福尔斯","IDA"],["波卡特洛","PIH"],["博伊西","BOI"],["布莱克富特","BLK"],["科达伦","COE"],["刘易斯顿","LWS"],["莫斯科","MJL"],["墨菲","ZMU"],["楠帕","NPA"],["岂彻姆","QKM"],["森瓦利","SVY"],["亚美利加瀑布城","YAF"]],"IA":[["达文波特","DVN"],["得梅因","DSM"],["锡达拉皮兹","CID"]],"ND":[["俾斯麦","BIS"],["大福克斯","GFK"],["法戈","FAR"],["迈诺特","MOT"]],"NC":[["艾许维尔","AEV"],["杜罕","DHH"],["格林斯伯勒","GBO"],["教堂山","CHE"],["罗利","RAG"],["洛利杜罕都会区","RDU"],["夏洛特","CRQ"]],"PA":[["阿伦敦","AEW"],["费城","PHL"],["匹兹堡","PIT"]],"TX":[["埃尔帕索","ELP"],["奥斯汀","AUS"],["达拉斯","DAL"],["哥帕斯基斯蒂","CRP"],["交维斯顿","GLS"],["拉雷多","LRD"],["麦亚伦","TXC"],["圣安东尼奥","SAT"],["休斯敦","HOU"]],"OH":[["代顿","DYT"],["哥伦布","CZX"],["克利夫兰","CLE"],["托莱多","TOL"],["辛辛那提","CVG"]],"OK":[["俄克拉荷马城","OKC"],["诺曼","OUN"],["塔尔萨","TUL"]],"OR":[["本德","BZO"],["波特兰","PDX"],["达尔斯","DLS"],["达拉斯","DAC"],["蒂拉穆克","TLM"],["格兰茨帕斯","XFX"],["胡德里弗","HDX"],["火山口湖","CTR"],["科瓦利斯","YCV"],["库斯贝","COB"],["梅德福","MFR"],["塞勒姆","SLE"],["圣海伦斯","STH"],["斯普林菲尔德","SPY"],["尤金","EUG"]],"FL":[["奥兰多","ORL"],["基韦斯特","EYW"],["杰克逊维尔","JAX"],["卡纳维尔角","CPV"],["罗德岱堡","FLL"],["迈阿密","MIA"],["圣彼德斯堡市","PIE"],["塔拉哈西","TLH"],["坦帕","TPA"]],"VT":[["伯灵顿","BTV"],["拉特兰","RUT"],["南伯灵顿","ZBR"]],"DC":[["华盛顿哥伦比亚特区","WAS"]],"WA":[["斯波坎","GEG"],["塔科马","TTW"],["西雅图","SEA"]],"WY":[["埃文斯顿","EVD"],["卡斯珀","CPR"],["拉勒米","LAR"],["罗克斯普林斯","RKS"],["夏延","CYS"],["谢里登","SHR"]],"CA":[["旧金山","SFO"],["洛杉矶","LAX"],["圣迭戈","SAN"],["圣何塞","SJC"]],"KS":[["阿比林","ABZ"],["奥弗兰公园","OVL"],["哈钦森","HCH"],["堪萨斯城","KCK"],["莱文沃思","XIA"],["劳伦斯","LWC"],["曼哈顿","MHK"],["托皮卡","TOP"],["威奇托","ICT"]],"CT":[["布里奇波特","BDR"],["达里恩","DAQ"],["格林尼治","GRH"],["哈特福德","HFD"],["米德尔顿","XIN"],["纽黑文","HVN"],["韦斯特波特","WPT"],["沃特伯里","WAT"],["新不列颠","NWT"]],"CO":[["阿斯彭","ASE"],["奥罗拉","AUX"],["博尔德","WBU"],["大章克申","GJT"],["丹佛","DEN"],["柯林斯堡","FNL"],["科罗拉多斯普林斯","COS"],["韦尔","VAC"]],"KY":[["列克星敦","LEX"],["路易斯维尔","LUI"],["欧文斯伯勒","OWB"]],"LA":[["巴吞鲁日","BTR"],["什里夫波特","SHV"],["新奥尔良","MSY"]],"RI":[["波塔基特","PAW"],["克兰斯顿","CQH"],["纽波特","NPO"],["普罗维登斯","PVD"],["韦斯特利","WST"],["文索基特","SFN"],["沃威克","UZO"]],"MD":[["巴尔的摩","BAL"],["盖瑟斯堡","GAI"],["罗克维尔","RKV"]],"MA":[["波士顿","BZD"],["斯普林菲尔德","SFY"],["伍斯特","ORH"]],"MT":[["比灵斯","BGS"],["大瀑布村","GTF"],["米苏拉","MSO"]],"MO":[["哥伦比亚","COV"],["杰佛逊市","JEF"],["堪萨斯城","MKC"],["圣路易斯","STL"],["斯普林菲尔德","SGF"]],"MS":[["比洛克西","BIX"],["格尔夫波特","GPT"],["格林维尔","GLH"],["哈蒂斯堡","HBG"],["杰克逊","JAN"],["默里迪恩","MEI"],["维克斯堡","VKS"]],"MI":[["安娜堡","ARB"],["巴特尔克里克","BTL"],["贝城","BCY"],["大急流城","GRR"],["迪尔伯恩","DEO"],["底特律","DET"],["弗林特","FNT"],["怀恩多特","WYD"],["卡拉马袓","AZO"],["兰辛","LAN"],["马斯基根","MKG"],["庞菷亚克","PTK"],["萨吉诺","SGM"],["苏圣玛丽","SSM"],["沃伦","WAM"],["休伦港","PHN"]],"ME":[["班戈","BNQ"],["波特兰","POL"],["刘易斯顿","QLW"]],"MN":[["罗切斯特","RST"],["明尼阿波利斯","MES"],["圣保罗","STP"]],"SD":[["阿伯丁","ABK"],["拉皮德城","RAP"],["苏福尔斯","FSD"]],"SC":[["北查尔斯顿","NTS"],["查尔斯顿","CHS"],["哥伦比亚","COV"]],"NE":[["奥马哈","OMA"],["贝尔维尤","XDE"],["林肯","LNK"]],"NV":[["埃尔科","EKO"],["北拉斯维加斯","NVS"],["弗吉尼亚城","VGI"],["亨德森","HNZ"],["卡森城","CSN"],["拉斯维加斯","LAS"],["里诺","RNO"],["斯帕克斯","SPK"]],"NY":[["布法罗","FFO"],["罗切斯特","ROC"],["纽约市","QEE"]],"DE":[["多佛","DOR"],["纽瓦克","NWK"],["威明顿","ILG"]],"TN":[["布利斯托","BSJ"],["查塔努加","CHA"],["金斯波特","TRI"],["孟菲斯","MEM"],["纳什维尔","BNA"],["诺克斯维尔","TYS"],["三城区","YTC"],["士麦那","MQY"],["斯普林希尔","RGI"],["约翰逊城","JCY"]],"WI":[["阿普尓顿","ATW"],["奥什科什","OSH"],["格林贝","GBK"],["基诺沙","ENW"],["拉克罗斯","LSE"],["拉辛","RAC"],["马尼托沃克","MTW"],["迈迪逊","QMD"],["密尔沃基","MKE"],["欧克莱尓","EAU"],["沃索","AUW"],["希博伊根","SBM"]],"VA":[["弗吉尼亚比奇","VAB"],["诺福克","ORF"],["切萨皮克","HTW"]],"WV":[["查尔斯顿","CRW"],["亨廷顿","HNU"],["帕克斯堡","PKB"]],"HI":[["凯卢阿","KHH"],["檀香山","HNL"],["希洛","ITO"]],"NH":[["康科德","CON"],["曼彻斯特","MHT"],["纳舒厄","ASH"]],"NM":[["阿尔伯克基","ABQ"],["拉斯克鲁塞斯","LRU"],["罗斯韦尔","ROW"],["圣菲","SAF"]],"NJ":[["纽瓦克","NRK"],["帕特森","PAT"],["泽西城","JEC"]],"AZ":[["凤凰城","PHX"],["格兰代尔","GDA"],["梅萨","MQA"],["史卡兹代尔","STZ"],["坦普","TPE"],["图森","TUC"],["优玛","YUM"]],"IL":[["奥尔顿","ALN"],["奥罗拉","AUZ"],["布卢明顿","BLO"],["丹维尓","DVI"],["迪卡尔布","DEK"],["迪凯持","DEC"],["东圣路易斯","ESL"],["厄巴纳-香槟","CMI"],["盖尔斯堡","GSU"],["卡本代尔","MDH"],["罗克艾兰","RKI"],["罗克福德","RFD"],["诺黙尔","NOM"],["皮奥里亚","PLA"],["森特勒利亚","CRA"],["斯普林菲尔德","SPI"],["沃其根","UGN"],["芝加哥","CHI"]],"IN":[["埃文斯维尔","EVV"],["韦恩堡","FWA"],["印第安纳波利斯","IND"]],"UT":[["奥格登","OGD"],["雷登","LTJ"],["欧仁","OEU"],["帕克城","PAC"],["普罗沃","PVU"],["圣乔治","SGU"],["西瓦利城","WVC"],["盐湖城","SLC"]],"GA":[["奥古斯塔","AUT"],["哥伦布","CZX"],["梅肯","MCN"],["沙瓦纳","SAV"],["亚特兰大","TAT"]]},"ASM":{"ASM":[["阿纳","AAN"],["阿图阿","ATU"],["艾加伊勒泰","AIT"],["法塞莱莱阿加","FAA"],["加盖福毛加","GFG"],["加加埃毛加","GMG"],["帕劳利","PAL"],["萨图帕伊泰阿","SAT"],["萨瓦伊岛","SAV"],["图阿马萨加","TUA"],["瓦奥福诺蒂","VAF"],["韦西加诺","VAI"],["乌波卢岛","UPO"]]},"UMI":{"UMI":[["美属外岛","UMI"]]},"MNG":{"MNG":[["巴彦洪格尔","69"],["巴彦乌勒盖","71"],["布尔干","67"],["达尔汗乌勒","37"],["东方","61"],["东戈壁","63"],["鄂尔浑","35"],["戈壁阿尔泰","65"],["戈壁苏木贝尔","64"],["后杭爱","73"],["科布多","43"],["肯特","39"],["库苏古尔","41"],["南戈壁","UMN"],["前杭爱","UVO"],["色楞格","49"],["苏赫巴托尔","51"],["乌布苏","46"],["乌兰巴托市","1"],["扎布汗","57"],["中戈壁","59"],["中央","47"]]},"MSR":{"MSR":[["蒙特塞拉特","MSR"]]},"BGD":{"BGD":[["达卡","DAC"],["吉大港","CGP"],["库尔纳","KHL"]]},"FSM":{"FSM":[["密克罗尼西亚","FSM"]]},"PER":{"PER":[["阿雷基帕","AR"],["阿普里马克","AP"],["阿亚库乔","AY"],["安卡什","AN"],["胡利亚卡","JUL"],["胡宁","JU"],["卡哈马卡","CJ"],["卡亚俄","CL"],["库斯科","CU"],["拉利伯塔德","LD"],["兰巴耶克","LY"],["利马","LI"],["洛雷托","LO"],["马德雷德迪奥斯","MD"],["莫克瓜","MO"],["帕斯科","PA"],["皮乌拉","PI"],["普诺","PU"],["钦博特","CHM"],["钦查阿尔塔","CHI"],["圣马丁","SM"],["苏拉纳","SUL"],["塔克纳","TA"],["通贝斯","TU"],["瓦努科","HO"],["万卡维利卡","HV"],["乌卡亚利","UC"],["亚马孙","AM"],["伊卡","IC"]]},"MMR":{"MMR":[["勃固省","BG"],["掸邦","SH"],["德林达依省","TN"],["克伦邦","KN"],["克钦邦","KC"],["克耶邦","KH"],["马圭省","MG"],["曼德勒省","MD"],["孟邦","MN"],["钦邦","CH"],["若开邦","RK"],["实皆省","SG"],["仰光省","YG"],["伊洛瓦底省","AY"]]},"MDA":{"MDA":[["摩尔多瓦","MDA"]]},"MAR":{"MAR":[["丹吉尔","TGR"],["得土安","TET"],["非斯","FES"],["卡萨布兰卡","CBL"],["拉巴特","RSA"],["马拉喀什","MRK"],["梅克内斯","MKN"],["乌季达","OUJ"],["西撒哈拉","WSH"]]},"MCO":{"MCO":[["摩纳哥","MCO"]]},"MOZ":{"MOZ":[["莫桑比克","MOZ"]]},"MEX":{"MEX":[["阿瓜斯卡连斯特","AGU"],["阿卡普尔科","ACA"],["埃莫西约","HMO"],["埃佩切","CAM"],["奥夫雷贡城","OBR"],["奥里萨巴","ORI"],["巴利城","VHM"],["巴亚尔塔港","PVR"],["比利亚埃尔莫萨","VSA"],["波萨里卡","PRH"],["蒂华纳","TIJ"],["杜兰戈","DUR"],["恩塞纳达","ESE"],["瓜达拉哈拉","GDL"],["瓜纳华托","GUA"],["哈拉帕","JAL"],["华雷斯","JUZ"],["华雷斯港","BJU"],["卡门","CAR"],["科利马","COL"],["克雷塔罗","QUE"],["库埃纳瓦卡","CVC"],["库利阿坎","CUL"],["夸察夸拉克斯","COA"],["拉巴斯","LAP"],["莱昂","LEN"],["雷诺萨","REX"],["洛斯莫奇斯","LMM"],["马萨特兰","MZT"],["马塔莫罗斯","MAM"],["梅里达","MID"],["蒙克洛瓦","LOV"],["蒙特雷","MTY"],["莫雷利亚","MLM"],["墨西哥城","MEX"],["墨西卡利","MXL"],["诺加莱斯","NOG"],["帕丘卡","PAC"],["普埃布拉","PUE"],["奇尔潘辛戈","CHI"],["奇瓦瓦","CHH"],["切图马尔","CTM"],["萨尔蒂约","SLW"],["萨卡特卡斯","ZAC"],["塞拉亚","CLY"],["圣路易斯波托亚","SLP"],["塔帕丘拉","TAP"],["坦皮科","TAM"],["特拉斯卡拉","TLA"],["特皮克","TPQ"],["特瓦坎","TCN"],["图斯特拉-古铁雷斯","TGZ"],["托雷翁","TRC"],["托卢卡","TLC"],["瓦哈卡","OAX"],["维多利亚城","VIC"],["韦拉克鲁斯","VER"],["乌鲁阿潘","UPN"],["新拉雷多","NLE"],["伊拉普阿托","IRP"]]},"NAM":{"NAM":[["埃龙戈","ER"],["奥汉圭纳","OW"],["奥卡万戈","KV"],["奥马赫科","OK"],["奥姆沙蒂","OT"],["奥乔宗蒂约巴","OJ"],["奥沙纳","ON"],["奥希科托","OO"],["哈达普","HA"],["霍马斯","KH"],["卡拉斯","KR"],["卡普里维","CA"],["库内内","KU"]]},"ZAF":{"ZAF":[["阿平顿","UTN"],["艾利弗山","MAY"],["彼德马里茨堡","PZB"],["彼德斯堡","PTG"],["比勒陀利亚","PRY"],["比索","BIY"],["布雷达斯多普","BDD"],["布隆方丹","BFN"],["布隆克斯特斯普利特","BHT"],["德阿尔","DAA"],["德班","DUR"],["邓迪","DUN"],["东巴克利","BAE"],["东伦敦","ELS"],["弗雷堡","VRU"],["弗里尼欣","VGG"],["格罗布莱斯达尔","GBD"],["基雅尼","GIY"],["金伯利","KIM"],["开普敦","CPT"],["克莱克斯多普","KXE"],["库鲁曼","KMH"],["昆士敦","UTW"],["莱迪史密斯","LAY"],["兰德方丹","RFT"],["理查兹湾","RCB"],["利斯滕堡","RSB"],["米德尔堡","MDB"],["姆库泽","MZQ"],["穆里斯堡","MOO"],["内尔斯普雷特","NLP"],["尼尔斯特隆","NYL"],["纽卡斯尔","NCS"],["乔治","GRJ"],["萨索尔堡","SAS"],["瑟孔达","ZEC"],["特克索波","IXO"],["特隆普斯堡","TPB"],["跳羚","SBU"],["图拉马哈谢","TLH"],["托霍延杜","THY"],["韦茨肖克","WSH"],["韦尔科姆","WEL"],["乌伦迪","ULD"],["乌姆塔塔","UTT"],["伍斯特","WOR"],["西博福特","BEW"],["谢普斯通港","PSS"],["伊丽莎白港","PLZ"],["约翰内斯堡","JNB"]]},"ATA":{"ATA":[["南极洲","ATA"]]},"SGS":{"SGS":[["南乔治亚和南桑德威奇群岛","SGS"]]},"NRU":{"NRU":[["瑙鲁","NRU"]]},"NPL":{"NPL":[["巴格马蒂","BA"],["道拉吉里","DH"],["甘达基","GA"],["戈西","KO"],["格尔纳利","KA"],["贾纳克布尔","JA"],["拉布蒂","RA"],["蓝毗尼","LU"],["马哈卡利","MA"],["梅吉","ME"],["纳拉亚尼","NA"],["佩里","BH"],["萨加玛塔","SA"],["塞蒂","SE"]]},"NIC":{"NIC":[["埃斯特利","ES"],["北大西洋","AN"],["博阿科","BO"],["格拉纳达","GR"],["卡拉索","CA"],["莱昂","LE"],["里瓦斯","RV"],["马德里斯","MD"],["马那瓜","MN"],["马萨亚","MS"],["马塔加尔帕","MT"],["南大西洋","AS"],["奇南德加","CD"],["琼塔莱斯","CT"],["圣胡安河","SJ"],["希诺特加","JI"],["新塞哥维亚","NS"]]},"NER":{"NER":[["阿加德兹","AJY"],["迪法","DIF"],["蒂拉贝里","TIL"],["多索","DSS"],["津德尔","ZND"],["马拉迪","MFQ"],["尼亚美市","NIM"],["塔瓦","THZ"]]},"NGA":{"NGA":[["阿比亚","ABV"],["奥博莫绍","OGB"],["卡诺","KAN"],["拉各斯","LOS"],["伊巴丹","IBA"]]},"NIU":{"NIU":[["纽埃","NIU"]]},"NOR":{"NOR":[["阿克什胡斯","2"],["奥普兰","5"],["奥斯陆市","3"],["北特伦德拉格","17"],["布斯克吕","6"],["东阿格德尔","9"],["东福尔","1"],["芬马克","20"],["海德马克","4"],["霍达兰","12"],["罗加兰","11"],["默勒－鲁姆斯达尔","15"],["南特伦德拉格","16"],["诺尔兰","18"],["松恩－菲尤拉讷","14"],["泰勒马克","8"],["特罗姆斯","19"],["西阿格德尔","10"],["西福尔","7"]]},"NFK":{"NFK":[["诺福克","NFK"]]},"PLW":{"PLW":[["帕劳群岛","PLW"]]},"PCN":{"PCN":[["皮特凯恩","PCN"]]},"PRT":{"PRT":[["滨海阿连特茹","ALL"],["滨海皮尼亚尔","PLT"],["波尔图","VDP"],["杜罗","MDR"],["恩特拉杜罗伏日","EDV"],["法鲁","FAO"],["丰沙尔","FUN"],["卡瓦多","CAV"],["科瓦贝拉","CLB"],["里斯本","LIS"],["利巴特茹","LTE"],["梅地奥特茹","MTE"],["米尼奥-利马","MLI"],["内贝拉北","BIN"],["内贝拉南","BIS"],["内皮尼亚尔北","PIN"],["内皮尼亚尔南","PIS"],["蓬塔德尔加达","PDL"],["塞图巴尔半岛","PSE"],["山后","SES"],["上阿连特茹","AAT"],["上特拉斯山","ATM"],["塔梅加","TAM"],["万福","AES"],["西部","OES"],["下阿连特茹","BAL"],["下伏日","BVO"],["下蒙德古","BMO"],["中阿连特茹","ALC"]]},"GEO":{"GEO":[["乔治亚","GEO"]]},"JPN":{"JPN":[["爱媛","38"],["爱知","23"],["北海道","1"],["兵库","28"],["冲绳","47"],["茨城","8"],["大阪","27"],["大分","44"],["岛根","32"],["徳岛","36"],["东京","13"],["福岛","7"],["福冈","40"],["福井","18"],["富山","16"],["冈山","33"],["高知","39"],["宮城","4"],["宫崎","45"],["广岛","34"],["和歌山","30"],["京都","26"],["静冈","22"],["枥木","9"],["鹿儿岛","46"],["奈良","29"],["鸟取","31"],["岐阜","21"],["埼玉","11"],["千叶","12"],["青森","2"],["秋田","5"],["群马","10"],["三重","24"],["山口","35"],["山梨","19"],["山形","6"],["神奈川","14"],["石川","17"],["香川","37"],["新潟","15"],["熊本","43"],["岩手","3"],["长崎","42"],["长野","20"],["滋贺","25"],["佐贺","41"]]},"SWE":{"SWE":[["北博滕","BD"],["布莱金厄","K"],["达拉纳","DLN"],["东约特兰","UGL"],["厄勒布鲁","T"],["哥得兰","I"],["哈兰","N"],["卡尔马","H"],["克鲁努贝里","G"],["南曼兰","D"],["斯德哥尔摩","AB"],["斯科耐","M"],["韦姆兰","S"],["乌普萨拉","C"],["西博滕","AC"],["西曼兰","U"],["西诺尔兰","Y"],["西约特兰","O"],["延雪平","F"],["耶夫勒堡","X"],["耶姆特兰","Z"]]},"CHE":{"CHE":[["阿尔高","AG"],["巴塞尔城市","BS"],["巴塞尔乡村","BL"],["伯尔尼","BE"],["楚格","ZG"],["弗里堡","FR"],["格拉鲁斯","GL"],["格劳宾登","GR"],["卢塞恩","LU"],["洛桑","LA"],["纳沙泰尔","NE"],["内阿彭策尔","AI"],["日内瓦","GE"],["汝拉","JU"],["沙夫豪森","SH"],["上瓦尔登","OW"],["圣加仑","SG"],["施维茨","SZ"],["苏黎世","ZH"],["索洛图恩","SO"],["提契诺","TI"],["图尔高","TG"],["瓦莱","VS"],["外阿彭策尔","AR"],["沃","VD"],["乌里","UR"],["下瓦尔登","NW"]]},"SLV":{"SLV":[["阿波帕","APO"],["阿瓦查潘","AH"],["滨海","LI"],["查拉特南戈","CH"],["德尔加多","DE"],["基埃-恩特姆","KN"],["卡瓦尼亚斯","CA"],["库斯卡特兰","CU"],["拉巴斯","PZ"],["拉利伯塔德","LB"],["拉乌尼翁","UN"],["梅基卡诺斯","MEJ"],["莫拉桑","MO"],["圣安娜","SA"],["圣米格尔","SM"],["圣萨尔瓦多","SS"],["圣维森特","SV"],["松索纳特","SO"],["索亚潘戈","SOY"],["韦莱-恩萨斯","WN"],["乌苏卢坦","US"],["伊洛潘戈","IL"],["中南","CS"]]},"WSM":{"WSM":[["萨摩亚","WSM"]]},"SCG":{"SCG":[["贝尔格莱德","BEG"],["波德戈里察","POD"],["克拉古涅瓦茨","KGV"],["尼什","INI"],["诺维萨德","NVS"],["普里什蒂纳","PRN"],["苏博蒂察","SUB"],["泽蒙","ZEM"]]},"SLE":{"SLE":[["北部","N"],["东部","E"],["南部","S"],["西部区","W"]]},"SEN":{"SEN":[["达喀尔","DA"],["法蒂克","FA"],["济金绍尔","ZI"],["捷斯","TH"],["久尔贝勒","DI"],["考拉克","KA"],["科尔达","KO"],["卢加","LO"],["马塔姆","MA"],["圣路易","SL"],["坦巴昆达","TA"]]},"CYP":{"CYP":[["法马古斯塔","4"],["凯里尼亚","6"],["拉纳卡","3"],["利马索尔","2"],["尼科西亚","1"],["帕福斯","5"]]},"SYC":{"SYC":[["塞舌尔","SYC"]]},"SAU":{"SAU":[["阿尔阿尔","ARA"],["艾卜哈","AHB"],["巴哈","BH"],["布赖代","BUR"],["达曼","DAM"],["哈费尔巴廷","HBT"],["哈伊勒","HL"],["海米斯穆谢特","KMX"],["海耶","AKH"],["胡富夫","HFF"],["吉达","JED"],["吉赞","JZ"],["利雅得","RD"],["麦地那","MED"],["麦加","ML"],["姆巴拉兹","MBR"],["纳季兰","NR"],["塞卡卡","SAK"],["塔布克","TB"],["塔伊夫","TAR"],["延布","YNB"],["朱拜勒","JBI"]]},"CXR":{"CXR":[["圣诞岛","CXR"]]},"STP":{"STP":[["圣多美和普林西比","STP"]]},"SHN":{"SHN":[["圣赫勒拿","SHN"]]},"KNA":{"KNA":[["圣基茨和尼维斯","KNA"]]},"LCA":{"LCA":[["圣卢西亚","LCA"]]},"SMR":{"SMR":[["圣马力诺","SMR"]]},"SPM":{"SPM":[["圣皮埃尔和米克隆群岛","SPM"]]},"VCT":{"VCT":[["圣文森特和格林纳丁斯","VCT"]]},"LKA":{"LKA":[["阿努拉德普勒","ADP"],["安帕赖","AMP"],["巴杜勒","BAD"],["拜蒂克洛","BTC"],["波隆纳鲁沃","POL"],["汉班托特","HBA"],["基里诺奇","KIL"],["加勒","GAL"],["加姆珀哈","GAM"],["贾夫纳","JAF"],["卡卢特勒","KLT"],["凯格勒","KEG"],["康提","KAN"],["科伦坡","CMB"],["库鲁内格勒","KUR"],["拉特纳普勒","RAT"],["马纳尔","MAN"],["马特莱","MAT"],["马特勒","MAA"],["莫讷勒格勒","MON"],["穆莱蒂武","MUL"],["努沃勒埃利耶","NUE"],["普塔勒姆","PUT"],["亭可马里","TRR"],["瓦武尼亚","VAV"]]},"SVK":{"SVK":[["班斯卡-比斯特里察","BBY"],["布拉迪斯拉发","BTS"],["科希策","KOR"],["尼特拉","NRA"],["普雷绍夫","POV"],["日利纳","RIL"],["特尔纳瓦","TNA"],["特伦钦","TRE"]]},"SVN":{"SVN":[["奥巴尔诺-克拉","OKR"],["奥斯雷德涅斯洛文","OSR"],["波德拉夫","POD"],["波穆尔","POM"],["多雷尼","DLJ"],["戈雷尼","GSZ"],["戈里","GSK"],["科洛","KOR"],["诺特拉尼","NKR"],["萨维尼","SAV"],["斯波德涅波萨夫","SPO"],["扎萨夫","ZAS"]]},"SJM":{"SJM":[["斯瓦尔巴和扬马廷","SJM"]]},"SWZ":{"SWZ":[["斯威士兰","SWZ"]]},"SDN":{"SDN":[["北部","ASH"],["赤道","SIS"],["达尔富尔","SDA"],["东部","SHA"],["加扎勒河","SBG"],["喀土穆","KRT"],["科尔多凡","GKU"],["上尼罗","ANB"],["中部","WDH"]]},"SUR":{"SUR":[["布罗科蓬多","BR"],["科罗尼","CR"],["科默韦讷","CM"],["马罗韦讷","MA"],["尼克里","NI"],["帕拉","PA"],["帕拉马里博","PM"],["萨拉马卡","SA"],["瓦尼卡","WA"],["西帕里韦尼","SI"]]},"SLB":{"SLB":[["瓜达尔卡纳尔","GC"],["霍尼亚拉","HO"],["拉纳尔和贝罗纳","RB"],["马基拉","MK"],["马莱塔","ML"],["乔伊索","CH"],["泰莫图","TM"],["西部","WE"],["伊萨贝尔","IS"],["中部群岛","CE"]]},"SOM":{"SOM":[["索马里","SOM"]]},"TJK":{"TJK":[["杜尚别","DYU"],["霍罗格","KHO"],["卡尼巴达姆","KAN"],["科法尔尼洪","KOF"],["苦盏","KHU"],["库尔干-秋别","KTJ"],["库洛布","KLB"],["洛贡","RGU"],["努雷克","NUR"],["彭吉肯特","PJK"],["萨班特","SBA"],["塔博沙尔","TBS"],["图尔孙扎德","TSZ"],["乌拉秋别","UTJ"],["伊斯法拉","ISF"]]},"THA":{"THA":[["安纳乍能","37"],["巴蜀","77"],["巴吞他尼","13"],["巴真","25"],["北碧","71"],["北标","19"],["北大年","94"],["北揽","11"],["北榄坡","60"],["北柳","24"],["碧差汶","76"],["博达伦","93"],["猜那","18"],["猜也奔","36"],["程逸","53"],["春蓬","86"],["春武里","20"],["达","63"],["达叻","23"],["大城","14"],["董里","92"],["佛丕","78"],["佛统","73"],["甘烹碧","62"],["红统","15"],["华富里","16"],["加拉信","46"],["甲米","81"],["尖竹汶","22"],["孔敬","40"],["拉农","21"],["廊开","43"],["廊莫那浦","39"],["叻丕","70"],["黎","42"],["黎逸","45"],["龙仔厝","74"],["罗勇","85"],["洛坤","80"],["玛哈沙拉堪","44"],["曼谷","10"],["莫达汉","49"],["那空那育","26"],["那空帕农","48"],["难","55"],["南奔","51"],["暖武里","12"],["帕","54"],["帕尧","56"],["攀牙","82"],["彭世洛","65"],["披集","66"],["普吉","83"],["清莱","57"],["清迈","50"],["色军","47"],["沙敦","91"],["沙缴","27"],["四色菊","33"],["宋卡","90"],["素可泰","64"],["素叻","84"],["素林","32"],["素攀武里","72"],["陶公","96"],["乌隆","41"],["乌泰他尼","61"],["乌汶","34"],["武里南","31"],["信武里","17"],["耶梭通","35"],["也拉","95"],["夜丰颂","58"],["夜功","75"]]},"TZA":{"TZA":[["阿鲁沙","AR"],["奔巴北","PN"],["奔巴南","PS"],["滨海","PW"],["达累斯萨拉姆","DS"],["多多马","DO"],["基戈马","KI"],["卡盖拉","KA"],["林迪","LN"],["鲁夸","RK"],["鲁伍马","RV"],["马腊","MR"],["曼亚拉","MY"],["莫洛戈罗","MO"],["姆贝亚","MB"],["姆特瓦拉","MT"],["姆万扎","MW"],["乞力马扎罗","KJ"],["桑给巴尔","ZN"],["桑给巴尔北","UN"],["桑给巴尔南","US"],["桑给巴尔市和西","MM"],["塔波拉","TB"],["坦噶","TN"],["辛吉达","SI"],["欣延加","SH"],["伊林加","IR"]]},"TON":{"TON":[["埃瓦","E"],["哈派","H"],["纽阿斯","N"],["汤加塔布","T"],["瓦瓦乌","V"]]},"TCA":{"TCA":[["特克斯和凯克特斯群岛","TCA"]]},"TAA":{"TAA":[["特里斯坦达昆哈","TAA"]]},"TTO":{"TTO":[["特立尼达和多巴哥","TTO"]]},"TUN":{"TUN":[["艾尔亚奈","AR"],["巴杰","BJ"],["本阿鲁斯","BA"],["比塞大","BI"],["吉比利","KB"],["加贝斯","GB"],["加夫萨","GF"],["坚杜拜","JE"],["卡夫","LK"],["卡塞林","KS"],["凯鲁万","KR"],["马赫迪耶","MH"],["马努巴","MN"],["梅德宁","ME"],["莫纳斯提尔","MO"],["纳布勒","NA"],["斯法克斯","SF"],["苏塞","SO"],["泰塔温","TA"],["突尼斯","TU"],["托泽尔","TO"],["西迪布济德","SD"],["锡勒亚奈","SL"],["宰格万","ZA"]]},"TUV":{"TUV":[["图瓦卢","TUV"]]},"TUR":{"TUR":[["阿达纳","ADA"],["阿德亚曼","ADI"],["阿尔达罕","ARD"],["阿尔特温","ART"],["阿菲永","AFY"],["阿克萨赖","AKS"],["阿勒","AGR"],["阿马西亚","AMA"],["埃迪尔内","EDI"],["埃尔津詹","EZC"],["埃尔祖鲁姆","EZR"],["埃拉泽","ELA"],["埃斯基谢希尔","ESK"],["艾登","AYI"],["安卡拉","ANK"],["安塔利亚","ANT"],["奥尔杜","ORD"],["巴尔腾","BAR"],["巴勒克埃西尔","BAL"],["巴特曼","BAT"],["巴伊布尔特","BAY"],["比莱吉克","BIL"],["比特利斯","BIT"],["宾格尔","BIN"],["博卢","BOL"],["布尔杜尔","BRD"],["布尔萨","BRS"],["昌克勒","CKR"],["代尼兹利","DEN"],["迪亚巴克尔","DIY"],["凡","VAN"],["哈卡里","HKR"],["哈塔伊","HTY"],["基利斯","KLS"],["吉雷松","GIR"],["加济安泰普","GAZ"],["居米什哈内","GMS"],["卡尔斯","KRS"],["卡赫拉曼马拉什","KAH"],["卡拉比克","KRB"],["卡拉曼","KRM"],["卡斯塔莫努","KAS"],["开塞利","KAY"],["科贾埃利","KOC"],["柯克拉雷利","KLR"],["科尼亚","KON"],["克尔谢希尔","KRH"],["克勒克卡莱","KRK"],["拉飞","URF"],["里泽","RIZ"],["马尔丁","MAR"],["马拉蒂亚","MAL"],["马尼萨","MAN"],["穆拉","MUG"],["穆什","MUS"],["内夫谢希尔","NEV"],["尼代","NIG"],["恰纳卡莱","CKL"],["乔鲁姆","COR"],["屈塔希亚","KUT"],["萨卡里亚","SAK"],["萨姆松","SAM"],["泰基尔达","TEL"],["特拉布宗","TRA"],["通杰利","TUN"],["托卡特","TOK"],["乌萨克","USK"],["锡尔纳克","SIR"],["锡尔特","SII"],["锡诺普","SIN"],["锡瓦斯","SIV"],["伊迪尔","IGD"],["伊切尔","ICE"],["伊斯帕尔塔","ISP"],["伊斯坦布尔","IST"],["伊兹密尔","IZM"],["约兹加特","YOZ"],["宗古尔达克","ZON"]]},"TKM":{"TKM":[["阿哈尔","A"],["阿什哈巴德市","ASB"],["巴尔坎","B"],["达沙古兹","D"],["列巴普","L"],["马雷","M"],["涅比特达格","NEB"]]},"TKL":{"TKL":[["托克劳","TKL"]]},"WLF":{"WLF":[["瓦利斯和福图纳","WLF"]]},"VUT":{"VUT":[["马朗帕","MA"],["彭纳马","PE"],["桑马","SA"],["塔菲阿","TA"],["托尔巴","TO"],["谢法","SH"]]},"GTM":{"GTM":[["埃尔普罗格雷索","PR"],["埃斯昆特拉","ES"],["哈拉帕","JA"],["胡蒂亚帕","JU"],["基切","QC"],["克萨尔特南戈","QZ"],["雷塔卢莱乌","RE"],["米克斯科","MIX"],["佩滕","PE"],["奇基穆拉","CQ"],["奇马尔特南戈","CM"],["萨卡帕","ZA"],["萨卡特佩克斯","ST"],["上韦拉帕斯","AV"],["圣罗莎","SR"],["圣马科斯","SM"],["苏奇特佩克斯","SU"],["索洛拉","SO"],["托托尼卡潘","TO"],["危地马拉","GU"],["韦韦特南戈","HU"],["下韦拉帕斯","BV"],["新城","VIN"],["伊萨瓦尔","IZ"]]},"VIR":{"VIR":[["维尔京群岛，美属","VIR"]]},"VGB":{"VGB":[["维尔京群岛，英属","VGB"]]},"VEN":{"VEN":[["阿拉瓜","D"],["阿马库罗三角洲","Y"],["阿普雷","C"],["安索阿特吉","B"],["巴里纳斯","E"],["玻利瓦尔","F"],["波图格萨","P"],["法尔孔","I"],["瓜里科","J"],["加拉加斯","A"],["卡拉沃沃","G"],["科赫德斯","H"],["拉腊","K"],["联邦属地","W"],["梅里达","L"],["米兰达","M"],["莫纳加斯","N"],["苏克雷","R"],["苏利亚","V"],["塔奇拉","S"],["特鲁希略","T"],["新埃斯帕塔","O"],["亚拉奎","U"],["亚马孙","Z"]]},"BRN":{"BRN":[["文莱","BRN"]]},"UGA":{"UGA":[["阿鲁阿","ARU"],["阿帕克","APC"],["阿朱马尼","ADJ"],["本迪布焦","BUN"],["布吉里","BUG"],["布西亚","BUS"],["布谢尼","BSH"],["恩通加莫","NTU"],["古卢","GUL"],["霍伊马","HOI"],["基巴莱","KBA"],["基博加","KIB"],["基恩乔乔","KYE"],["基索罗","KIS"],["基特古姆","KIT"],["金贾","JIN"],["卡巴莱","KBL"],["卡巴罗莱","KAR"],["卡贝拉马伊多","KAB"],["卡兰加拉","KAL"],["卡姆文盖","KAM"],["卡穆利","KML"],["卡农古","KAN"],["卡普乔鲁瓦","KPC"],["卡塞塞","KAS"],["卡塔奎","KTK"],["卡永加","KAY"],["坎帕拉","KMP"],["科蒂多","KOT"],["库米","KUM"],["拉卡伊","RAK"],["利拉","LIR"],["卢韦罗","LUW"],["鲁昆吉里","RUK"],["马萨卡","MAS"],["马辛迪","MSN"],["马尤盖","MAY"],["莫罗托","MRT"],["莫约","MOY"],["姆巴拉拉","MBR"],["姆巴莱","MBA"],["姆皮吉","MPI"],["穆本德","MUB"],["穆科诺","MUK"],["纳卡皮里皮里特","NAK"],["纳卡松戈拉","NKS"],["内比","NEB"],["帕德尔","PAD"],["帕利萨","PAL"],["森巴布莱","SEM"],["索罗提","SOR"],["托罗罗","TOR"],["瓦基索","WAK"],["锡龙科","SIR"],["伊甘加","IGA"],["永贝","YUM"]]},"UKR":{"UKR":[["敖德萨","51"],["波尔塔瓦","53"],["第聂伯罗波得罗夫斯克","12"],["顿涅茨克","14"],["哈尔科夫","63"],["赫尔松州","65"],["赫梅利尼茨基","68"],["基辅","30"],["基洛夫格勒","35"],["捷尔诺波尔","61"],["克里米亚自治共和国","43"],["利沃夫","46"],["卢甘斯克","9"],["罗夫诺","56"],["尼古拉耶夫","48"],["切尔卡瑟","71"],["切尔尼戈夫","74"],["切尔诺夫策","77"],["日托米尔","18"],["苏梅","59"],["外喀尔巴阡","21"],["文尼察","5"],["沃伦","7"],["伊万－弗兰科夫州","26"],["扎波罗热","23"]]},"URY":{"URY":[["阿蒂加斯","AR"],["杜拉斯诺","DU"],["佛罗里达","FA"],["弗洛雷斯","FS"],["卡内洛内斯","CA"],["科洛尼亚","CO"],["拉瓦耶哈","LA"],["里韦拉","RV"],["罗恰","RO"],["马尔多纳多","MA"],["蒙得维的亚","MO"],["内格罗河","RN"],["派桑杜","PA"],["萨尔托","SL"],["塞罗拉尔戈","CL"],["三十三人","TT"],["圣何塞","SJ"],["索里亚诺","SO"],["塔夸伦博","TAW"]]},"UZB":{"UZB":[["安集延","AN"],["布哈拉","BU"],["费尔干纳","FA"],["花拉子模","XO"],["吉扎克","JI"],["卡拉卡尔帕克斯坦共和国","QR"],["卡什卡达里亚","QA"],["纳曼干","NG"],["纳沃伊","NW"],["撒马尔罕","SA"],["苏尔汉河","SU"],["塔什干","TK"],["塔什干市","TO"],["锡尔河","SI"]]},"ESP":{"ESP":[["阿尔梅里亚","LEI"],["阿尔瓦塞特","ALB"],["阿拉瓦","ALA"],["阿利坎特","ALC"],["阿斯图利亚斯","AST"],["阿维拉","AVI"],["奥伦塞","ORE"],["巴达霍斯","BJZ"],["巴利阿里","BLR"],["巴利亚多利德","VLL"],["巴伦西亚","VLC"],["巴塞罗那","BCN"],["比斯开","VSE"],["布尔戈斯","BUR"],["格拉纳达","GRX"],["瓜达拉哈拉","GUA"],["哈恩","JAE"],["赫罗纳","GRO"],["吉普斯夸","GUI"],["加的斯","CAD"],["卡塞雷斯","CCS"],["卡斯蒂利亚","CIR"],["卡斯特利翁","CAS"],["科尔多瓦","ODB"],["昆卡","CUE"],["拉科鲁尼亚","LCG"],["拉里奥哈","ARL"],["拉斯帕尔马斯","LPA"],["莱昂","LEN"],["莱里达","LLE"],["卢戈","LGO"],["马德里","MAD"],["马拉加","AGP"],["穆尔西亚","MJV"],["纳瓦拉","NVV"],["帕伦西亚","PAC"],["蓬特韦德拉","PEV"],["萨拉戈萨","ZAZ"],["萨拉曼卡","SLM"],["萨莫拉","ZMR"],["塞哥维亚","SEG"],["塞维利亚","SVQ"],["桑坦德","SDR"],["圣克鲁斯-德特内里费","SCT"],["索里亚","SOR"],["塔拉戈纳","TAR"],["特鲁埃尔","TER"],["托莱多","TOL"],["韦尔瓦","HUV"],["韦斯卡","HUC"]]},"GRC":{"GRC":[["比雷埃夫斯","PRI"],["多德卡尼斯","DO"],["干尼亚","CHQ"],["基克拉迪","CY"],["拉西锡","LST"],["莱斯博斯","LES"],["雷西姆农","RET"],["萨摩斯","SMI"],["雅典","ATH"],["伊拉克里翁","HER"]]},"SGP":{"SGP":[["新加坡","SGP"]]},"NCL":{"NCL":[["新喀里多尼亚","NCL"]]},"NZL":{"NZL":[["奥克兰","AUK"],["北岸","NSH"],["北帕默斯顿","PMR"],["北远","FNR"],["布莱尼姆","BHE"],["达尼丁","DUD"],["格雷茅斯","GMN"],["哈密尔顿","HLZ"],["黑斯廷斯","HAS"],["怀塔科拉","WAE"],["吉斯伯恩","GIS"],["凯帕拉","KAI"],["克赖斯特彻奇","CHC"],["里士满","RMD"],["马努考","MNK"],["纳尔逊","NSN"],["内皮尔","NPE"],["斯特拉特福德","STR"],["陶马鲁努伊","TAU"],["瓦卡塔尼","WHK"],["旺阿雷","WRE"],["旺格努伊","WAG"],["新普利茅斯","NPL"],["因弗卡吉尔","IVC"]]},"HUN":{"HUN":[["巴兰尼亚","BA"],["巴奇-基什孔","BK"],["包尔绍德-奥包乌伊-曾普伦","BZ"],["贝凯什","BE"],["布达佩斯","BU"],["费耶尔","FE"],["豪伊杜-比豪尔","HB"],["赫维什","HE"],["加兹-纳杰孔-索尔诺克","JN"],["杰尔-莫松-肖普朗","GS"],["科马罗姆","KE"],["诺格拉德","NO"],["佩斯","PE"],["琼格拉德","CS"],["绍莫吉","SO"],["索博尔奇-索特马尔-贝拉格","SZ"],["托尔瑙","TO"],["维斯普雷姆","VE"],["沃什","VA"],["佐洛","ZA"]]},"SYR":{"SYR":[["阿勒颇","HL"],["大马士革","RD"],["大马士革市","DI"],["代尔祖尔","DZ"],["德拉","DA"],["哈马","HM"],["哈塞克","HA"],["霍姆斯","HI"],["加布","GH"],["卡米什利","QA"],["库奈特拉","QU"],["拉卡","RQ"],["拉塔基亚","LA"],["苏韦达","SU"],["塔尔图斯","TA"],["伊德利卜","ID"]]},"JAM":{"JAM":[["波特兰","POR"],["汉诺威","HAN"],["金斯敦","KIN"],["克拉伦登","CLA"],["曼彻斯特","MAN"],["圣安德鲁斯","AND"],["圣安娜","ANN"],["圣凯瑟琳","CAT"],["圣玛丽","MAR"],["圣托马斯","THO"],["圣伊丽莎白","ELI"],["圣詹姆斯","JAM"],["特里洛尼","TRL"],["西摩兰","WML"]]},"ARM":{"ARM":[["阿尔马维尔","ARM"],["阿拉加措特恩","AGT"],["阿拉拉特","ARA"],["埃里温市","EVN"],["格加尔库尼克","GEG"],["科泰克","KOT"],["洛里","LOR"],["塔武什","TAV"],["瓦约茨·佐尔","VAY"],["希拉克","SHI"],["休尼克","SYU"]]},"YEM":{"YEM":[["阿比扬","AB"],["阿姆兰","AM"],["贝达","BA"],["达利","DA"],["哈德拉毛","HD"],["哈杰","HJ"],["荷台达","HU"],["焦夫","JA"],["拉赫季","LA"],["马里卜","MA"],["迈赫拉","MR"],["迈赫维特","MW"],["萨达","SD"],["萨那","SN"],["赛文","GXF"],["舍卜沃","SH"],["塔伊兹","TA"],["希赫尔","ASR"],["亚丁","AD"],["伊卜","IB"],["扎玛尔","DH"]]},"IRQ":{"IRQ":[["伊拉克","IRQ"]]},"IRN":{"IRN":[["伊朗","IRN"]]},"ISR":{"ISR":[["阿什杜德","ASH"],["贝尔谢巴","BEV"],["贝特雁","BAT"],["海法","HFA"],["霍隆","HOL"],["内坦亚","NAT"],["特拉维夫","TLV"],["耶路撒冷","J"]]},"ITA":{"ITA":[["阿斯蒂","AST"],["阿斯科利皮切诺","ASP"],["安科纳","AOI"],["奥尔比亚","OLB"],["奥里斯塔诺","QOS"],["奥斯塔","AOT"],["巴勒莫","PMO"],["巴里","BRI"],["贝加莫","BGO"],["贝内文托","BEN"],["比萨","PSA"],["波代诺内","PRD"],["波坦察","QPO"],["博洛尼亚","BLQ"],["布拉","BIE"],["布雷西亚","BRC"],["布林迪西","BDS"],["的里雅斯特","TRS"],["都灵","TRN"],["费拉拉","FRR"],["佛罗伦萨","FLR"],["福贾","FOG"],["卡利亚里","CAG"],["卡塞塔","CST"],["卡塔尼亚","CTA"],["卡坦扎罗","QCZ"],["坎波巴索","COB"],["科摩","CIY"],["科森扎","QCS"],["克罗托内","CRV"],["库内奥","CUN"],["拉奎拉","LAQ"],["拉斯佩齐亚","SPE"],["莱科","LCO"],["莱切","LCC"],["雷焦艾米利亚","RNE"],["雷焦卡拉布里亚","REG"],["里窝那","LIV"],["罗马","ROM"],["马萨","MCR"],["马泰拉","MTR"],["蒙扎","MZA"],["米兰","MIL"],["摩德纳","MOD"],["墨西拿","MSN"],["那不勒斯","NAP"],["努奥罗","QNU"],["诺瓦拉","NVR"],["帕尔马","PMF"],["帕维亚","PAV"],["佩鲁贾","PEG"],["热那亚","CAX"],["萨莱诺","SAL"],["萨萨里","QSS"],["萨沃纳","SVN"],["塔兰托","TAR"],["特拉帕尼","TPS"],["特伦托","TRT"],["威尼斯","VCE"],["韦尔切利","VRL"],["维泰博","VIT"],["乌迪内","UDN"],["锡拉库扎","SYR"],["锡耶纳","SNA"],["亚历山德里亚","ALE"],["伊塞尔尼亚","ISE"]]},"IND":{"IND":[["艾藻尔","AJL"],["班加罗尔","BLR"],["本地治里","PNY"],["博帕尔","BHO"],["布巴内斯瓦尔","BBI"],["昌迪加尔","IXC"],["达曼","DAM"],["第乌","DIU"],["甘托克","GTO"],["哥印拜陀","CJB"],["加尔各答","CCU"],["加里加尔","KRK"],["贾巴尔普尔","JLR"],["贾朗达尔","JUC"],["焦特布尔","JDH"],["金奈","MAA"],["卡瓦拉蒂","KVA"],["科希马","KOM"],["马埃","MAH"],["马杜赖","IXM"],["森伯尔布尔","SLR"],["特里凡得琅","TRV"],["乌代布尔","UDR"],["西隆","SHL"],["锡尔萨瓦","SIL"],["新德里","ICD"],["亚南","SRV"],["因帕尔","IMF"],["印多尔","IDR"],["斋普尔","JAI"]]},"IDN":{"IDN":[["巴厘","BA"],["邦加－勿里洞群岛","BB"],["北苏拉威西","SA"],["北苏门答腊","SU"],["大雅加达首都特区","KB"],["东加里曼丹","KI"],["东南苏拉威西","SG"],["东努沙登加拉","NT"],["东爪哇","JI"],["廖内","RI"],["马鲁古","MA"],["明古鲁","BE"],["楠榜","LA"],["南加里曼丹","KS"],["南苏拉威西","SN"],["南苏门答腊","SS"],["日惹特区","YO"],["万丹","BT"],["西努沙登加拉","NB"],["西苏门答腊","SR"],["西爪哇","JB"],["雅加达","JK"],["亚齐","AC"],["伊里安查亚","IJ"],["占碑","JA"],["中加里曼丹","KT"],["中苏拉威西","ST"],["中爪哇","JT"]]},"GBR":{"NIR":[["贝尔法斯特","BFS"],["德里","DRY"],["利斯本","LSB"],["纽里","NYM"]],"SCT":[["阿伯丁","ABD"],["爱丁堡","EDH"],["丹迪","DND"],["格拉斯哥","GLG"],["斯特灵","STG"],["因弗内斯","INV"]],"WLS":[["班戈","BAN"],["卡迪夫","CDF"],["纽波特","NWP"],["斯旺西","SWA"]],"ENG":[["埃克塞特","EXE"],["巴斯","BAS"],["彼得伯勒","PTE"],["伯明翰","BIR"],["布拉德福德","BRD"],["布莱顿与赫福","BNH"],["布里斯托尔","BST"],["德比","DER"],["德罕","DUR"],["格洛斯特","GLO"],["赫尔河畔京斯敦","KUH"],["赫里福德","HAF"],["剑桥","CAM"],["卡莱尔","CAX"],["坎特伯雷","CNG"],["考文垂","COV"],["兰开斯特","LAN"],["里彭","RIP"],["利奇菲尔德","LHF"],["利物浦","LIV"],["利茲","LDS"],["列斯特","LCE"],["林肯","LCN"],["伦敦","LND"],["曼彻斯特","MAN"],["南安普敦","STH"],["牛津","OXF"],["纽卡斯尔","NCL"],["诺丁汉","NGM"],["诺里奇","NRW"],["朴茨茅斯","POR"],["普雷斯顿","PRE"],["普利茅斯","PLY"],["奇切斯特","CST"],["切斯特","CEG"],["桑德兰","SUN"],["圣阿本斯","TBL"],["索尔斯堡","SLS"],["索福特","SLF"],["特鲁罗","TRU"],["特伦特河畔斯多克","SOT"],["威尔斯","WLS"],["韦克菲尔德","WKF"],["温彻斯特","WNE"],["伍尔弗汉普顿","WOV"],["伍斯特","WOR"],["谢菲尔德","SHE"],["伊利","ELY"],["约克","YOR"]]},"IOT":{"IOT":[["英属印度洋领地","IOT"]]},"JOR":{"JOR":[["阿吉隆","AJ"],["安曼","AM"],["拜勒加","BA"],["杰拉什","JA"],["卡拉克","KA"],["鲁赛法","RU"],["马安","MN"],["马德巴","MD"],["马夫拉克","MF"],["塔菲拉","TA"],["亚喀巴","AQ"],["伊尔比德","IR"],["扎尔卡","ZA"]]},"VNM":{"VNM":[["海防","HP"],["河内","HI"],["胡志明市","HC"]]},"ZMB":{"ZMB":[["北方","NO"],["东方","EA"],["卢阿普拉","LP"],["卢萨卡","LK"],["南方","SO"],["铜带","CB"],["西北","NW"],["西方","WE"],["中央","CE"]]},"JEY":{"JEY":[["泽西岛","JEY"]]},"TCD":{"TCD":[["乍得","TCD"]]},"GIB":{"GIB":[["直布罗陀","GIB"]]},"CHL":{"CHL":[["阿劳卡尼亚大区","AR"],["阿塔卡马大区","AT"],["安托法加斯塔大区","AN"],["比奥比奥大区","BI"],["复活节岛","LI"],["湖大区","LL"],["科金博大区","CO"],["马乌莱大区","ML"],["麦哲伦-智利南极大区","MA"],["圣地亚哥","RM"],["塔拉帕卡大区","TA"],["瓦尔帕莱索大区","VS"],["伊瓦涅斯将军的艾森大区","AI"]]},"CAF":{"CAF":[["巴明吉-班戈兰","BB"],["班吉直辖市","BGF"],["宾博","BI"],["凯莫","KG"],["洛巴伊","LB"],["曼贝雷-卡代","HS"],["姆博穆","MB"],["纳纳-格里比齐","KB"],["纳纳-曼贝雷","NM"],["桑加-姆巴埃雷","SE"],["上科托","HK"],["上姆博穆","HM"],["瓦卡","UK"],["瓦卡加","VK"],["瓦姆","AC"],["瓦姆-彭代","OP"],["翁贝拉-姆波科","MP"],["下科托","BK"]]},"SCN":{"SSC":[["泰妍区","TYD"]]}};

function populateCities(locale,countryElementId,stateElementId,curr_city) {
    var cityElementId = "user_city"

    var selectedCountryValue = document.getElementById(countryElementId).value;
    var selectedStateValue = document.getElementById(stateElementId).value;

    var cityElement = document.getElementById(cityElementId);

    cityElement.length = 0; // Fixed by Julian Woods

    if (locale == "en") {
      var city_arr = cities[selectedCountryValue][selectedStateValue];
    }
    else {
      var city_arr = cities_zh[selectedCountryValue][selectedStateValue];
    }

    for (var i = 0; i < city_arr.length; i++) {
        cityElement.options[cityElement.length] = new Option(city_arr[i][0], city_arr[i][1]);
    }

    cityElement.selectedIndex = -1;

    if (curr_city) {
      cityElement.value = curr_city;
    }
}

function populateStates(locale,countryElementId,curr_state,curr_city) {
    var stateElementId = "user_state"

    var selectedCountryValue = document.getElementById(countryElementId).value;

    var stateElement = document.getElementById(stateElementId);

    stateElement.length = 0; // Fixed by Julian Woods

    if (locale == "en") {
      var state_arr = states[selectedCountryValue];
    }
    else {
      var state_arr = states_zh[selectedCountryValue];
    }

    for (var i = 0; i < state_arr.length; i++) {
        stateElement.options[stateElement.length] = new Option(state_arr[i][0], state_arr[i][1]);
    }

    stateElement.selectedIndex = -1;

    if (curr_state) {
      stateElement.value = curr_state;
      populateCities(locale,countryElementId,stateElementId,curr_city);
    }

    stateElement.onchange = function () {
        populateCities(locale,countryElementId,stateElementId,curr_city);
    };
}

function populateCountries(locale,curr_country,curr_state,curr_city) {
    // given the id of the <select> tag as function argument, it inserts <option> tags
    var countryElementId = "user_country";

    var countryElement = document.getElementById(countryElementId);

    if (locale == "en") {
      var country_arr = countries;
    }
    else {
      var country_arr = countries_zh;
    }

    countryElement.length = 0;

    for (var i = 0; i < country_arr.length; i++) {
      countryElement.options[countryElement.length] = new Option(country_arr[i][0], country_arr[i][1]);
    }

    countryElement.selectedIndex = -1;

    if (curr_country) {
      countryElement.value = curr_country;
      populateStates(locale,countryElementId,curr_state,curr_city);
    }
    // Assigned all countries. Now assign event listener for the states.

    countryElement.onchange = function () {
        populateStates(locale,countryElementId,curr_state,curr_city);
    };
}
;
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




