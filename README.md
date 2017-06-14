# jQuery Custom Caret

A jQuery plugin to let you custom your caret (text cursor) using CSS.

![](demo.gif)

## Tutorial

See `example/example.html` for a full example.

1. Make a `contenteditable` element like a `<div>` or `<span>`:

	```
	<div id="demo" contenteditable="true"></div>
	```
	
2. Apply custom caret on it:

	```
	$("#demo").customCaret();
	```
	
3. Ajust CSS:

	```
	#demo {
		/* Set text color to transparent to hide the default caret */
		color: transparent;

		/* Use text-shadow to make text visible */
		text-shadow: 0 0 white;
	}
	
	/* Custom the look of your caret */
	#caret {
		border-right: 0.5em solid white;
		margin-right: -0.5em;
		animation: blink-animation 1s steps(2, start) infinite;
	}
	@keyframes blink-animation {
		to {
			visibility: hidden;
		}
	}
	```
	
## Usage

	$("yourContentEditableElement").customCaret({
		caretID: _yourCaretID_,
		callback: _yourCallbackFunction_
	});
	
A `<span id= _caretID_ ></span>` element will be insert into text as your custom caret. You can adjust the look of it using CSS.

The default ID of that `<span>` is `#caret`. You can give it your own ID:

	$("#demo").customCaret({caretID: "myCaret"});

## Limit

- Does not handle text selection well
- Does not handle line break