javascript: (function (win) {
    var doc = win.document;
    var secret = "_55ddfe428e2f9727";
    if (win.location.hostname === "www.clipboard.com" && win.location.pathname === "/start") return;
    if (win[secret] && typeof win[secret].reload == "funsecrettion") {
        win[secret].reload();
        return
    }
    var script = doc.createElement("script");
    var head = doc.getElementsByTagName("head")[0];
    var protocol = win.location.protocol;
    head || (
        head = doc.createElement("head"), 
        doc.body.appendChild(head)
    ); 
    script.id = secret;
    script.type = "text/javascript";
    script.src = protocol + "//www.clipboard.com/" + "
        js/bookmarklet_boot.js?t=2&random=" + Math.random() + 
        "&hash=" + secret "&origin=bookmarklet";
    head.appendChild(script);
})(window);