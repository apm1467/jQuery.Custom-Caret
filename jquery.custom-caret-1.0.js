(function ($) {

    $.fn.customCaret = function(options) {
    
        var settings = $.extend({
            caretID: 'caret',
            callback: null
        }, options);
        
        function getCaretPosition(element) {
            var caretPosition = 0;
            var doc = element.ownerDocument || element.document;
            var win = doc.defaultView || doc.parentWindow;
            var sel;
        
            if (typeof win.getSelection != "undefined") {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {
                    var range = win.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretPosition = preCaretRange.toString().length;
                }
            } else if ( (sel = doc.selection) && sel.type != "Control") {
                var textRange = sel.createRange();
                var preCaretTextRange = doc.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                caretPosition = preCaretTextRange.text.length;
            }
            return caretPosition;
        }


        return this.each(function() {
            $(this).on("keydown keyup click focus", function() {
                var caret = "<span id='" + settings.caretID + "'></span>";
                
                if ($(this).html() == "") {
                    $(this).html(caret);
                } else {
                    var caretPosition = getCaretPosition($(this).get(0));
                    var content = $(this).text();
                    var output = content.substr(0, caretPosition) + caret + content.substr(caretPosition);
                    $(this).html(output);

                    var sel = window.getSelection();
                    var range = document.createRange();
                    range.setStart($(this).get(0).childNodes[0], caretPosition);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            });

            if ($.isFunction(settings.callback)) {
                settings.callback.call(this);
            }
        });

    };

}(jQuery));