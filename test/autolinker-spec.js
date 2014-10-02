(function() {
    var content = document.getElementById("content");
    describe("autolink", function() {
        var tests = [
            {
                input:  "<p>Foo Bar</p>",
                desc:   "does not alter an element with no URL present"
            },
            {
                input:  "<p>http://example.org</p>",
                output: '<p><a href="http://example.org">http://example.org</a></p>',
                desc:   "adds a link to a simple URL"
            },
            {
                input:  "<p>http://example.org <span>https://example.org</span></p>",
                output: '<p><a href="http://example.org">http://example.org</a> <span><a href="https://example.org">https://example.org</a></span></p>',
                desc:   "adds links to a multiple URLs in nested elements"
            },
            {
                input:  '<p><a href="http://example.org">http://example.com/</a></p>',
                desc:   "does not alter existing links"
            },
            {
                input:  '<p><textarea>http://example.com/</textarea></p>',
                desc:   "does not alter existing URLs in textareas"
            },
            {
                input:  '<p>http://example.com/</p>',
                options: {attributes: {rel:'nofollow'}},
                output:  '<p><a rel="nofollow" href="http://example.com/">http://example.com/</a></p>',
                desc:   "takes into account additional attributes in options"
            },
        ];
        function runTest(n) {
            return function() {
                var options = tests[n].options || {};
                var output = tests[n].output || tests[n].input;
                var autolink = new Autolinker(options);
                content.innerHTML = tests[n].input;
                autolink.linkify(content);
                var res = expect(output).toEqual(content.innerHTML);
                content.innerHTML = "";
                return res;
            };
        }

        for (var i = 0; i < tests.length; i++) {
            it(tests[i].desc, runTest(i));
        }
    });
}).call(this);