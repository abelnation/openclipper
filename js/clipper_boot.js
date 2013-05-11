// e = window
// t = document

(function (win, doc) {
    
    // r = load_clipper_script
    // NOTE: this function was called r, and it's second parameter was called r
    function load_clipper_script(clip_script_url, onload_fn) {
        // i = script
        // e = clip_script_url
        // r = onload_fn

        var script = t.createElement("script");
        // s = sentinel
        var sentinel = !1;

        script.type = "text/javascript", 
        script.async = !0, 
        script.src = clip_script_url, 
        head.appendChild(script), 
        script.onload = script.onreadystatechange = function () {
            // e = readystate
            var readystate = !this.readyState || this.readyState === "loaded" || this.readyState === "complete";
            !sentinel && readystate && (
                sentinel = !0, 
                onload_fn(), 
                script.onload = script.onreadystatechange = null, 
                script.parentNode.removeChild(script)
            )
        }
    }

    // n = head
    var head = doc.getElementsByTagName("head")[0];
    head || (head = doc.createElement("head"), doc.documentElement.insertBefore(head, doc.body));

    // i = config
    var config = {
        "staticBaseUrl": "//d3r3jj4tch5va8.cloudfront.net",
        "baseUrl": "clipboard.com",
        "siteVersion": "3.4.6",
        "bookmarkletVersion": "2",
        "origin": "bookmarklet",
        "defer": false
    }, 

    // s = instanceId
    // o = origin
    // u = defer
    instanceId = config.instanceId || "_",
    origin = config.origin,
    defer = config.defer;

    try {
        win.CLIPBOARD.client.Clipper.instances[origin][instanceId].activate();
        return
    } catch (a) {}

    if (typeof win.clipboardClipperInit == "function" && win.clipboardClipperInit() === !1) { return; }

    // f = script_name
    var script_name = origin === "embed" ? "clipper_embed.js" : "clipper_main.js",

    // l = clipper
    var clipper = win.CLIPBOARD = win.CLIPBOARD || {};
        clipper.client = clipper.client || {}, 
        clipper.client.origins = clipper.client.origins || {}, 
        clipper.client.origins[instanceId] = origin, 
        clipper.config = clipper.config || {}, 
        clipper.config.staticBaseUrl = config.staticBaseUrl, 
        clipper.config.baseUrl = config.baseUrl;
    
    // c = base_url
    // h = instance_config
    var base_url = clipper.config.staticBaseUrl,
    var instance_config = {
            staticBaseUrl:      config.staticBaseUrl,
            baseUrl:            config.baseUrl,
            siteVersion:        config.siteVersion,
            bookmarkletVersion: config.bookmarkletVersion,
            instanceId:         instanceId,
            origin:             origin
        };

    var script_url = base_url + "/js/" + instance_config.siteVersion + "/" + script_name;
    load_clipper_script(script_url, function () {
        // e = client
        var client = clipper.client;
        client.debug = instance_config.debug = !1;
        if (defer) { return; }
        
        origin === "embed" && (
            instance_config.populateSelectorsThunk = function (t) {
                return {
                    element: new client.selectors.ElementSelector(t)
                }
            };
            instance_config.createUiThunk = function (t) {
                return new client.ui.EmbedUiController(t)
            };
            instance_config.allowedMetrics = {
                extract: 1,
                login: 1,
                reviewCancel: 1,
                sendFail: 1,
                sendSuccess: 1,
                sandbox: 1
            };
        ); 
        (new doc.Clipper(null, instance_config)).activate()
    });
})(window, document);