(function (e) {
    var t = e.CLIPBOARD = e.CLIPBOARD || {};
    t.JSON = t.JSON || {}, t.client = t.client || {}, t.client.origins = t.client.origins || {}, t.client.util = {}, t.client.ui = {}, t.client.selectors = {
        components: {}
    }, t.client.extractors = {}
})(window);
(function (e) {
    function t() {}
    t.prototype = {
        tweakPartially: function (e, t) {},
        tweakFully: function (e, t) {}
    }, e.CLIPBOARD.client.extractors.TagTweaker = t
})(window);
(function (e) {
    function t(e) {
        this.domain = e
    }
    t.prototype = {
        hack: function (e) {}
    }, e.CLIPBOARD.client.extractors.DomainHacker = t
})(window);
(function (e) {
    function t() {}
    t.prototype = {
        showLoadingMessage: function () {},
        show3rdPartyCookiesErrorMessage: function () {},
        hideNotification: function (e) {},
        showErrorNotification: function (e, t) {},
        enableClipping: function (e) {},
        disableClipping: function (e) {},
        showNotification: function (e, t) {},
        handleExtraction: function (e) {},
        setPreferences: function (e) {},
        setUserData: function (e) {},
        setLoginState: function (e) {},
        setNewNotificationContent: function (e) {},
        doFirstRun: function () {},
        updateBoards: function (e) {}
    }, e.CLIPBOARD.client.UiController = t
})(window);
(function (e) {
    function t() {}
    t.prototype = {
        name: null,
        select: function () {},
        getSelection: function () {
            return {
                startElement: null,
                endElement: null
            }
        },
        disableGlobalEvents: function () {},
        enableGlobalEvents: function () {},
        shouldUseAsDefault: function () {
            return !1
        },
        getExtractor: function () {
            return null
        },
        setPreferences: function (e) {},
        setUserData: function (e) {}
    }, t.failureStatus = {
        nowhereToZoom: "nowhereToZoom",
        noImages: "noImages"
    }, e.CLIPBOARD.client.Selector = t
})(window);
(function (e) {
    function t() {}
    t.prototype = {
        extract: function (e) {
            return ""
        }
    }, e.CLIPBOARD.client.Extractor = t
})(window);
(function (e) {
    function n() {}
    var t = e.CLIPBOARD.client;
    n.prototype = {
        handle: function (e, t) {
            var n = e.constructor,
                r = e.closest("[data-sc-track]").attr("data-sc-track"),
                i = n("<iframe/>").attr({
                    width: e.outerWidth(),
                    height: Math.max(166, e.outerHeight()),
                    scrolling: "no",
                    frameborder: "no",
                    src: "http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + r + "&show_artwork=false"
                });
            t.append(i)
        }
    }, t.extractors.SoundCloudEmbedHandler = n
})(window);
(function (e) {
    function n() {}
    var t = e.CLIPBOARD.client;
    n.prototype = new t.extractors.DomainHacker("www.screenr.com"), n.prototype.hack = function (e) {
        var t = e.constructor;
        e.find("object").each(function () {
            var e = t(this),
                n = e.find('param[name="flashvars"]').attr("value");
            if (!n) return;
            var r = (/[^|&](<iframe.+?<\/iframe>)/i.exec(n) || [])[1];
            if (!r) return;
            e.replaceWith(r)
        })
    }, t.extractors.ScreenrHacker = n
})(window);
(function (e) {
    function n(e, t) {
        var n = t.width(),
            r = t.height();
        return t.constructor("<iframe/>").attr({
            src: "http://www.youtube.com/embed/" + e + "?rel=0",
            frameborder: 0,
            width: n,
            height: r,
            allowfullscreen: !0
        })
    }
    function r() {}
    var t = e.CLIPBOARD.client;
    r.prototype = new t.extractors.DomainHacker("www.youtube.com"), r.prototype.hack = function (e) {
        var t = e.constructor;
        e.find("embed").each(function () {
            var e = t(this),
                r = /\bvideo_id=(.+?)[&|$]/,
                i = (r.exec(e.attr("flashvars")) || [])[1];
            if (!i) return;
            e.replaceWith(n(i, e))
        }), e.find("video").each(function () {
            var e = t(this),
                r = e.attr("data-youtube-id");
            if (!r) return;
            e.parent().siblings().remove().end().replaceWith(n(r, e))
        })
    }, t.extractors.YouTubeHacker = r
})(window);
(function (e) {
    function r() {}
    var t = e.CLIPBOARD.client,
        n = '<iframe id="dit-video-embed" width="640" height="360" src="http://static.discoverymedia.com/videos/components/tlc/{refId}/snag-it-player.html?auto=no" frameborder="0" scrolling="no" allowtransparency="true"></iframe>';
    r.prototype = new t.extractors.DomainHacker("tlc.discovery.com"), r.prototype.hack = function (e) {
        e.find('object[name="video-per-page-player"]').each(function () {
            var t = e.constructor(this),
                r = t.find('param[name="flashvars"]').attr("value").match(/clipRefId%22%3A%22(\w+?)%22/);
            if (!r) return;
            t.replaceWith(n.replace("{refId}", r[1]))
        })
    }, t.extractors.TlcDiscoveryHacker = r
})(window);
(function (e, t) {
    function s(e, t) {
        var n, r, i;
        e += "", t ? (t += "", n = t.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^:])/g, "$1")) : n = " \n\r	\f            ​\u2028\u2029　";
        for (i = 0, r = e.length; i < r; i++) if (n.indexOf(e.charAt(i)) === -1) {
                e = e.substring(i);
                break
            }
        for (i = e.length - 1; i >= 0; i--) if (n.indexOf(e.charAt(i)) === -1) {
                e = e.substring(0, i + 1);
                break
            }
        return n.indexOf(e.charAt(0)) === -1 ? e : ""
    }
    var n, r = "_clipboard_314159265",
        i = '.clipping_314159265 { font-family: times, serif; font-size: 16px; font-weight: normal; font-style: normal; color: black; line-height: normal; margin: 0; padding: 0;}.clipping_314159265 td { font-size: 16px;}.clipping_314159265 * { color: black; font: inherit; border: 0;}.clipping_314159265 a { text-decoration: none;}.clipping_314159265 html,.clipping_314159265 address,.clipping_314159265 blockquote,.clipping_314159265 body,.clipping_314159265 dd,.clipping_314159265 div,.clipping_314159265 dl,.clipping_314159265 dt,.clipping_314159265 fieldset,.clipping_314159265 form,.clipping_314159265 frame,.clipping_314159265 frameset,.clipping_314159265 h1,.clipping_314159265 h2,.clipping_314159265 h3,.clipping_314159265 h4,.clipping_314159265 h5,.clipping_314159265 h6,.clipping_314159265 noframes,.clipping_314159265 ol,.clipping_314159265 p,.clipping_314159265 ul,.clipping_314159265 center,.clipping_314159265 dir,.clipping_314159265 hr,.clipping_314159265 menu,.clipping_314159265 pre { display: block;}.clipping_314159265 div { text-align: left;}.clipping_314159265 li { display: list-item; list-style: none; list-style-type: none;}.clipping_314159265 head { display: none;}.clipping_314159265 table { display: table; table-layout: fixed;}.clipping_314159265 tr { display: table-row;}.clipping_314159265 thead { display: table-header-group;}.clipping_314159265 tbody { display: table-row-group;}.clipping_314159265 tfoot { display: table-footer-group;}.clipping_314159265 col { display: table-column;}.clipping_314159265 colgroup { display: table-column-group;}.clipping_314159265 td, .clipping_314159265 th { display: table-cell;}.clipping_314159265 caption { display: table-caption;}.clipping_314159265 th { font-weight: bolder; text-align: center;}.clipping_314159265 caption { text-align: center;}.clipping_314159265 h1 { font-size: 2em; margin: .67em 0;}.clipping_314159265 h2 { font-size: 1.5em; margin: .75em 0;}.clipping_314159265 h3 { font-size: 1.17em; margin: .83em 0;}.clipping_314159265 h4,.clipping_314159265 p,.clipping_314159265 blockquote,.clipping_314159265 ul,.clipping_314159265 fieldset,.clipping_314159265 form,.clipping_314159265 ol,.clipping_314159265 dl,.clipping_314159265 dir,.clipping_314159265 menu { margin: 1.12em 0;}.clipping_314159265 h5 { font-size: .83em; margin: 1.5em 0;}.clipping_314159265 h6 { font-size: .75em; margin: 1.67em 0;}.clipping_314159265 h1,.clipping_314159265 h2,.clipping_314159265 h3,.clipping_314159265 h4,.clipping_314159265 h5,.clipping_314159265 h6,.clipping_314159265 b,.clipping_314159265 strong { font-weight: bolder;}.clipping_314159265 blockquote { margin-left: 40px; margin-right: 40px;}.clipping_314159265 i,.clipping_314159265 cite,.clipping_314159265 em,.clipping_314159265 var,.clipping_314159265 address { font-style: italic; font-weight: normal;}.clipping_314159265 pre,.clipping_314159265 tt,.clipping_314159265 code,.clipping_314159265 kbd,.clipping_314159265 samp { font-family: monospace;}.clipping_314159265 pre { white-space: pre; background-color: transparent; margin: 0; padding: 0;}.clipping_314159265 button,.clipping_314159265 textarea,.clipping_314159265 input,.clipping_314159265 select { display: inline-block; padding: 0; margin: 0;}.clipping_314159265 big { font-size: 1.17em;}.clipping_314159265 small, .clipping_314159265 sub, .clipping_314159265 sup { font-size: .83em;}.clipping_314159265 sub { vertical-align: sub;}.clipping_314159265 sup { vertical-align: super;}.clipping_314159265 table { border-spacing: 2px;}.clipping_314159265 thead, .clipping_314159265 tbody, .clipping_314159265 tfoot { vertical-align: middle;}.clipping_314159265 td, .clipping_314159265 th, .clipping_314159265 tr { vertical-align: inherit;}.clipping_314159265 s, .clipping_314159265 strike, .clipping_314159265 del { text-decoration: line-through;}.clipping_314159265 hr { border: none;}.clipping_314159265 ol,.clipping_314159265 ul,.clipping_314159265 dir,.clipping_314159265 menu,.clipping_314159265 dd { margin-left: 40px;}.clipping_314159265 ol { list-style-type: decimal;}.clipping_314159265 ul, .clipping_314159265 ol { margin: 0; padding: 0;}.clipping_314159265 u, .clipping_314159265 ins { text-decoration: underline;}.clipping_314159265 br:before { content: "A"; white-space: pre-line;}.clipping_314159265 center { text-align: center;}.clipping_314159265 img { border: 0;}';
    e.CLIPBOARD.client.util = {
        idSuffix: r,
        rewriteClass: "node" + r,
        doNotClipAttributeName: "ignore" + r,
        stylesheetId: "inlined_stylesheet" + r,
        doNotClipAllAttributeName: "ignoreAll" + r,
        maxArea: Infinity,
        defaultWindowMode: "direct",
        clipContainerClass: "clipping_314159265",
        addSuffix: function (e) {
            return e + this.idSuffix
        },
        shouldClip: function (e) {
            return !e.attr(this.doNotClipAttributeName) && !e.attr(this.doNotClipAllAttributeName)
        },
        cullNodeAttributeFlag: "cullNode" + r,
        rgbToHex: function () {
            function e(e) {
                var t = e.toString(16);
                return t.length == 1 ? "0" + t : t
            }
            return function (t, n) {
                return "#" + (n && n !== 1 ? e(Math.floor(n * 255)) : "") + e(t[0]) + e(t[1]) + e(t[2])
            }
        }(),
        rectColors: {
            black: {
                startColor: [80, 80, 80],
                stopColor: [0, 0, 0]
            },
            gray: {
                startColor: [210, 210, 210],
                stopColor: [139, 139, 139]
            },
            blue: {
                startColor: [138, 194, 224],
                stopColor: [108, 150, 173]
            },
            teal: {
                startColor: [173, 255, 254],
                stopColor: [50, 170, 168]
            },
            green: {
                startColor: [156, 209, 142],
                stopColor: [57, 130, 53]
            },
            purple: {
                startColor: [227, 157, 226],
                stopColor: [153, 72, 153]
            },
            red: {
                startColor: [235, 179, 172],
                stopColor: [204, 85, 85]
            },
            orange: {
                startColor: [246, 230, 18],
                stopColor: [237, 144, 23]
            }
        },
        applyGradient: function (t, n, r) {
            var i = this.rectColors[n] || this.rectColors.blue,
                s = e.navigator.userAgent;
            r = r || .25;
            var o = "rgba(" + i.startColor.join(",") + ", " + r + ")",
                u = "rgba(" + i.stopColor.join(",") + ", " + r + ")",
                a = 'progid:DXImageTransform.Microsoft.gradient(startColorstr="' + this.rgbToHex(i.startColor, r) + '", ' + 'endColorstr="' + this.rgbToHex(i.stopColor, r) + '", ' + "GradientType=0)",
                f = "linear-gradient(top, " + o + " 0%, " + u + " 100%)";
            /Firefox/i.test(s) ? t.cssImportant("background-image", "-moz-" + f) : /Webkit/i.test(s) ? t.cssImportant("background-image", "-webkit-" + f) : /Opera/i.test(s) ? t.cssImportant("background-image", "-o-" + f) : /MSIE 10/i.test(s) ? t.cssImportant("background-image", "-ms-" + f) : /MSIE [89]/i.test(s) && t.cssImportant("filter", a);
            var l;
            if (/MSIE 8/i.test(s)) l = "rgb(" + i.stopColor.join(",") + ")";
            else {
                var c = this.rgbToHsl.apply(null, i.startColor);
                c[0] *= 360, c[1] = Math.min(1, Math.max(0, c[1] + .1)) * 100 + "%", c[2] = c[2] * 100 + "%", l = "hsla(" + c.join(",") + ", 0.5)"
            }
            t.cssImportant("border-color", l)
        },
        rgbToHsl: function (t, n, r) {
            t /= 255, n /= 255, r /= 255;
            var i = Math.max(t, n, r),
                s = Math.min(t, n, r),
                o, u, a = (i + s) / 2;
            if (i == s) o = u = 0;
            else {
                var f = i - s;
                u = a > .5 ? f / (2 - i - s) : f / (i + s);
                switch (i) {
                case t:
                    o = (n - r) / f + (n < r ? 6 : 0);
                    break;
                case n:
                    o = (r - t) / f + 2;
                    break;
                case r:
                    o = (t - n) / f + 4
                }
                o /= 6
            }
            return [o, u, a]
        },
        forEach: function (e, t) {
            for (var n in e) {
                if (!e.hasOwnProperty(n)) continue;
                t.call(null, e[n], n)
            }
        },
        getRangeData: function () {
            return e.getSelection ? function (t) {
                var n = e.getSelection(),
                    r, i = {
                        top: null,
                        left: null
                    };
                if (n.rangeCount > 0) try {
                        r = e.getSelection().getRangeAt(0);
                        var s = r.getBoundingClientRect();
                        i.top = s.top, i.left = s.left
                } catch (o) {
                    r = null
                }
                return {
                    fragment: r && r.cloneContents() || t.createDocumentFragment(),
                    text: r ? r.toString() : "",
                    offset: r ? i : {
                        top: 0,
                        left: 0
                    }
                }
            } : function (e) {
                var t = e.selection.createRange(),
                    n = e.createElement("div"),
                    r = {
                        top: t.boundingTop,
                        left: t.boundingLeft
                    };
                n.innerHTML = t.htmlText;
                var i = e.createDocumentFragment();
                for (var s = 0, o = n.childNodes.length; s < o; s++) i.appendChild(n.childNodes[s].cloneNode(!0));
                return n = null, {
                    fragment: i,
                    text: t.text,
                    offset: r
                }
            }
        }(),
        trim: s,
        safeClone: function (t) {
            var n = t.constructor,
                r = t[0].cloneNode(!1),
                i = [],
                s, o, u, a, f = e.CLIPBOARD.common.blobSanitization.unsafeAttributes,
                l = n.extend({
                    style: 1,
                    "class": 1,
                    width: 1,
                    height: 1
                }, f);
            for (var c in l) {
                if (!l.hasOwnProperty(c)) continue;
                r.removeAttribute(c)
            }
            this.removeOurAttributes(n(r)), o = r.attributes, u = o.length;
            for (a = 0; a < u; a++) s = o[a], /^on/.test(s.name) && i.push(s.name);
            while (s = i.pop()) r.removeAttribute(s);
            return n(r)
        },
        merge: function (e, n) {
            e = e || {};
            for (var r in n) {
                if (!n.hasOwnProperty(r) || n[r] === t) continue;
                e[r] = n[r]
            }
            return e
        },
        inherit: function (e) {
            var t = Array.prototype.slice.call(arguments);
            e = t.shift();
            for (var n = 0; n < t.length; n++) for (var r in t[n]) e.prototype[r] = t[n][r]
        },
        computeOverlap: function (e, t) {
            var n = {
                left: Math.max(t.left, e.left),
                right: Math.min(t.right, e.right),
                top: Math.max(t.top, e.top),
                bottom: Math.min(t.bottom, e.bottom)
            };
            return n.width = Math.max(n.right - n.left, 0), n.height = Math.max(n.bottom - n.top, 0), n.area = n.width * n.height, n
        },
        dirname: function (e) {
            return e.indexOf("#") !== -1 && (e = e.replace(/#.*$/, "")), /\/$/.test(e) ? e.replace(/\/*$/, "") : e.replace(/\\/g, "/").replace(/\/[^\/]*\/?$/, "")
        },
        normalizeUri: function (e, t) {
            return e = this.trim(e), e === "" && (e = t.uri), e.charAt(0) === "#" ? t.uri + e : /^(?:file|javascript):/i.test(e) ? "#" : /^[A-Za-z][\w+-\.]*:/.test(e) ? e : e.charAt(0) !== "/" ? t.relativeDir + "/" + e : e.charAt(1) === "/" ? (e = e.replace(/^\/+/, ""), t.protocol + "//" + e) : t.protocol + "//" + t.domainAndPort + e
        },
        assureFixedPositioning: function (t) {
            if (!t) return;
            var r = t.constructor,
                i = {
                    element: t[0],
                    scrollLeft: 0,
                    scrollTop: 0,
                    originalPosition: t.css("position"),
                    fixed: !1,
                    scrollTo: function (e, t) {
                        if (this.fixed) return;
                        var n = e - this.scrollLeft,
                            i = t - this.scrollTop;
                        this.scrollLeft = e, this.scrollTop = t;
                        var s = {};
                        s.top = parseInt(r(this.element).css("top")) + i;
                        var o = parseInt(r(this.element).css("left")) + n;
                        isNaN(o) || (s.left = o);
                        var u = parseInt(r(this.element).css("right")) - n;
                        isNaN(u) || (s.right = u), r(this.element).cssImportant(s)
                    }
                };
            t.cssImportant("position", "fixed"), i.fixed = t.css("position") === "fixed", i.fixed || (t.cssImportant("position", "absolute"), i.scrollTo(r(e).scrollLeft(), r(e).scrollTop())), n ? n.push(i) : (n = [i], r(e).bind("scroll.clipboard", function () {
                var t = r(e).scrollLeft(),
                    i = r(e).scrollTop();
                for (var s = 0; s < n.length; s++) n[s].scrollTo(t, i)
            }))
        },
        retireFixedPositioning: function (e) {
            if (!n || !e) return;
            for (var t = 0; t < n.length; t++) if (n[t].element === e[0]) {
                    e.cssImportant("position", n[t].originalPosition), n.splice(t, 1);
                    break
                }
        },
        disableAllFixies: function () {
            n = null
        },
        flagAsUnclippable: function (e) {
            e.attr(this.doNotClipAllAttributeName, !0)
        },
        getAttributes: function (e) {
            var t = {}, n = e.attributes;
            for (var r = 0, i = n.length; r < i; r++) {
                var s = n.item(r);
                t[s.nodeName] = s.nodeValue
            }
            return t
        },
        getDimensions: function (e) {
            var t = e.trueOffset();
            return t.width = e.outerWidth(), t.height = e.outerHeight(), t.right = t.left + t.width, t.bottom = t.top + t.height, t.area = t.width * t.height, t
        },
        getOuterDimensions: function (e) {
            var t = e.trueOffset(),
                n = {
                    left: t.left,
                    top: t.top
                }, r = parseFloat(e.css("margin-left")),
                i = parseFloat(e.css("margin-top"));
            return r > 0 && (n.left -= r), i > 0 && (n.top -= i), n.width = Math.max(0, e.outerWidth(!0)), n.height = Math.max(0, e.outerHeight(!0)), n.right = n.left + n.width, n.bottom = n.top + n.height, n.area = n.height * n.width, n
        },
        getBoundingDimensions: function (e, t) {
            var n = this.getOuterDimensions,
                r = n(e);
            if (!t || !t.length || e[0] === t[0]) return r;
            var i = n(t),
                s = {
                    top: Math.min(r.top, i.top),
                    left: Math.min(r.left, i.left),
                    bottom: Math.max(r.bottom, i.bottom),
                    right: Math.max(r.right, i.right)
                };
            return s.width = s.right - s.left, s.height = s.bottom - s.top, s.area = s.width * s.height, s
        },
        adjustOffsetForMargins: function (e, t) {
            var n = parseFloat(e.css("font-size")),
                r = this.convertUnitsOrPercentageToPixels(parseFloat(e.css("margin-left")), n, e.parent().width()),
                i = this.convertUnitsOrPercentageToPixels(parseFloat(e.css("margin-top")), n, e.parent().height());
            r > 0 && (t.left -= r), i > 0 && (t.top -= i)
        },
        convertUnitsToPixels: function (e, t, n) {
            var r;
            if (r = /^(?:-?[\d\.]+(px|em|cm|pt|in)?|0%?)$/.exec(e)) {
                r[1] || (r[1] = "px");
                if (r[1]) {
                    var i = parseFloat(e);
                    switch (r[1]) {
                    case "px":
                        return i;
                    case "em":
                        return i * t;
                    case "cm":
                        return i * n / 2.54;
                    case "in":
                        return i * n;
                    case "pt":
                        return i * n / 72
                    }
                }
                return 0
            }
            return !1
        },
        convertUnitsOrPercentageToPixels: function (e, t, n, r) {
            var i = this.convertUnitsToPixels(e, t, n);
            return i !== !1 ? i : parseFloat(e) / 100 * r
        },
        removeOurAttributes: function (e) {
            e.removeAttr(this.cullNodeAttributeFlag).removeTrueCoordinates()
        },
        strings: {
            error_unknown: "(╯°□°）╯︵ ┻━┻",
            error_noImages: "No interesting images :(",
            error_noReader: "Can't find article text :(",
            zoom_nowhereToZoom: "Nowhere to zoom :(",
            send_clipSaveTimedOut: "Error :/",
            send_invalidResponseSavingClip: "Error :\\",
            send_saveClipFail: "Error :(",
            send_validationError: "Error :[",
            save_default: "Saved!"
        },
        cloneableTags: {
            embed: 1,
            object: 1,
            param: 1,
            video: 1,
            table: 1,
            tbody: 1,
            thead: 1,
            th: 1,
            tr: 1,
            td: 1
        },
        semanticBlockTagNames: {
            article: 1,
            aside: 1,
            details: 1,
            figcaption: 1,
            figure: 1,
            footer: 1,
            header: 1,
            hgroup: 1,
            menu: 1,
            nav: 1,
            section: 1
        },
        tagsToConvertToDiv: {
            body: 1,
            center: 1,
            iframe: 1,
            html: 1,
            form: 1
        },
        isHiddenByAncestry: function () {
            function t(t, n) {
                return n.right + e < t.left || n.left + e > t.right || n.bottom + e < t.top || n.top + e > t.bottom
            }
            var e = 10;
            return function (e) {
                if (e.is("object,param,embed")) return !1;
                var n = this.getDimensions(e),
                    r = e.parents(),
                    i = e.constructor;
                for (var s = 0, o = r.length; s < o; s++) {
                    var u = i(r[s]);
                    if (u.css("visibility") == "hidden" || u.css("opacity") === 0 || u.attr(this.doNotClipAllAttributeName)) return !0;
                    if (u.css("overflow") === "hidden" && t(this.getDimensions(u), n)) return !0
                }
                return !1
            }
        }(),
        shouldInclude: function (e, t) {
            var n = {
                head: 1,
                script: 1,
                style: 1,
                noscript: 1,
                noembed: 1
            }, r = e[0].tagName.toLowerCase();
            if (r in n) return t.reason = "skipped tag", !1;
            if (r === "br") return !0;
            if (!this.shouldClip(e)) return t.reason = "should not clip", !1;
            if (e.css("position") === "fixed") return t.reason = "fixed position", !1;
            var i = e.outerWidth() * e.outerHeight();
            return i > this.maxArea ? (t.reason = "area too big", !1) : this.isHiddenByAncestry(e) ? (t.reason = "hidden by ancestry", !1) : !0
        },
        disableAutoplayForUrl: function (e, t) {
            var n = e.attr(t);
            return e.attr(t, n.replace(/(^|&|\?)(autoplay|autostart|isautoplay|config_settings_autoplay)=(?:true|1)($|&)/i, "$1$2=false$3")), n !== e.attr(t)
        },
        copyAttributeIfExists: function (e, n, r, i, s) {
            var o = e.attr(r);
            if (o === t) return !1;
            var u = i ? this.normalizeUri(o, s) : o;
            return n.attr(r, u), !0
        },
        copyAttributeAndNormalize: function (e, t, n, r) {
            return this.copyAttributeIfExists(e, t, n, !0, r)
        },
        compactCss: function (e) {
            function t(t, n) {
                var r;
                for (r = 0; r < t.length; r++) if (!(t[r] in e)) return;
                var i = [];
                for (r = 0; r < t.length; r++) i.push(e[t[r]]);
                e[n] = i.join(" ");
                for (r = 0; r < t.length; r++) delete e[t[r]]
            }
            function n(t, n) {
                var r;
                for (r = 0; r < t.length; r++) if (!(t[r] in e)) return;
                var i = e[t[0]];
                for (r = 1; r < t.length; r++) if (e[t[r]] != i) return;
                e[n] = i;
                for (r = 0; r < t.length; r++) delete e[t[r]]
            }
            function r() {
                if ("background-repeat" in e && e["background-repeat"].indexOf(" ") !== -1) {
                    var t = e["background-repeat"].split(" ");
                    t[0] === "repeat" ? t[1] === "repeat" ? e["background-repeat"] = "repeat" : e["background-repeat"] = "repeat-x" : t[1] === "repeat" ? e["background-repeat"] = "repeat-y" : e["background-repeat"] = "no-repeat"
                }
            }
            n(["margin-top", "margin-right", "margin-bottom", "margin-left"], "margin"), n(["padding-top", "padding-right", "padding-bottom", "padding-left"], "padding");
            var i = ["top", "right", "bottom", "left"],
                s, o;
            for (s = 0; s < i.length; s++) o = i[s], t(["border-" + o + "-width", "border-" + o + "-style", "border-" + o + "-color"], "border-" + o);
            var u = ["width", "style", "color"];
            for (s = 0; s < u.length; s++) o = u[s], n(["border-top-" + o, "border-right-" + o, "border-bottom-" + o, "border-left-" + o], "border-" + o);
            n(["border-top", "border-right", "border-bottom", "border-left"], "border");
            if ("background-position-x" in e || "background-position-y" in e) {
                var a = e["background-position-x"] || "0",
                    f = e["background-position-y"] || "0";
                e["background-position"] = a + " " + f, delete e["background-position-x"], delete e["background-position-y"]
            }
            var l = ["background-color", "background-image", "background-repeat", "background-attachment", "background-position"];
            r();
            for (s = 0; s < l.length; s++) e[l[s]] == "initial" && delete e[l[s]];
            t(["background-color", "background-image", "background-repeat", "background-attachment", "background-position"], "background"), t(["list-style-type", "list-style-position", "list-style-image"], "list-style"), t(["outline-width", "outline-style", "outline-color"], "outline");
            var c = ["", "-webkit-", "-moz-"];
            for (s = 0; s < c.length; s++) n([c[s] + "border-top-right-radius", c[s] + "border-top-left-radius", c[s] + "border-bottom-right-radius", c[s] + "border-bottom-left-radius"], c[s] + "border-radius");
            for (o in e) {
                if (!e.hasOwnProperty(o)) continue;
                e[o] === "auto" && !/^overflow/.test(o) && delete e[o]
            }
        },
        compactHtml: function (e) {
            var t = /(<[^<>]*)*(style=")([^"]*)(")/gi,
                n = t.exec(e),
                r = 0,
                i = [];
            while (n) {
                i.push(e.substring(r, n.index)), i.push(n[1]), i.push(n[2]);
                var s = n[3].replace(/&amp;/g, "&"),
                    o = {}, u = /\s*(.+?)\s*:\s*(.+?)\s*(?:;(?!base64,)|$)/g,
                    a = u.exec(s);
                while (a) o[a[1].toLowerCase()] = a[2], a = u.exec(s);
                this.compactCss(o);
                for (var f in o) {
                    if (!o.hasOwnProperty(f)) continue;
                    i.push(f + ":" + o[f] + ";")
                }
                i.push(n[4]), r = t.lastIndex, n = t.exec(e)
            }
            return i.push(e.substring(r)), i = i.join(""), i
        },
        getElementFromPoint: function () {
            return e.document.elementFromPoint ? function (e, t, n, r) {
                var i = r.elementFromPoint(e, t);
                if (!i) return null;
                var s = n(i),
                    o = s.offset(),
                    u = {
                        left: o.left,
                        top: o.top
                    };
                this.adjustOffsetForMargins(n(i), u);
                if (i.nodeName.toLowerCase() === "iframe") {
                    e -= u.left - n(r).scrollLeft(), t -= u.top - n(r).scrollTop();
                    try {
                        var a = this.getElementFromPoint(e, t, n, s.contents()[0]);
                        if (a) {
                            i = a;
                            var f = s.trueCoordinates();
                            u.left += f.left, u.top += f.top
                        }
                    } catch (l) {}
                }
                return this.shouldInclude(s, {}) || (i = null), i && s.trueCoordinates(u), i
            } : function () {
                return null
            }
        }(),
        rewritePageHtml: function (e, n, r) {
            function u(n) {
                if (n.hasClass(s)) return;
                if (n.attr(o.doNotClipAllAttributeName) !== t || n.attr(o.doNotClipAllAttributeName) !== t) return;
                var a = {
                    head: 1,
                    style: 1,
                    link: 1,
                    meta: 1,
                    title: 1,
                    base: 1,
                    basefont: 1,
                    isindex: 1,
                    textarea: 1,
                    button: 1,
                    script: 1
                }, f = n[0].childNodes,
                    l = n[0].tagName.toLowerCase(),
                    c, h, p, d;
                if (!(l in a) && e(f).is(function () {
                    return this.nodeType === 3
                })) for (c = 0; c < f.length; c++) {
                        d = f[c];
                        if (d.nodeType !== 3) continue;
                        var v = d.nodeValue;
                        if (v.replace(/\s*/, "").length <= 3) continue;
                        var m = f[c + 1];
                        e(d).remove();
                        var g;
                        if (r.regexSplit) g = v.split(/([\r\n]{2,})/);
                        else {
                            g = [];
                            var y = v;
                            while (y) {
                                var b = /^(.+?)([\r\n]{2,})/.exec(y);
                                if (!b) {
                                    g.push(y);
                                    break
                                }
                                g.push(b[1], b[2]), y = y.substring(b[0].length)
                            }
                        }
                        for (h = 0; h < g.length; h++) p = e("<" + i + "/>").addClass(s).text(g[h] + (g[++h] || "")), m ? p.insertBefore(m) : p.appendTo(n)
                }
                for (c = 0; c < f.length; c++) f[c].nodeType === 1 && u(e(f[c]))
            }
            if (e.htmlRewritten) return;
            var i = "node",
                s = this.rewriteClass;
            e.browser.msie && (!e.support.boxModel || e.browser.version === "8.0") && (i = "span");
            var o = this;
            if (e.support.htmlSerialize) {
                var a = {
                    transparent: 1,
                    opaque: 1
                };
                e("object").each(function () {
                    var t = e(this),
                        n = t.find('param[name="wmode"]'),
                        r = n.attr("value");
                    if (t.attr("classid") || r && !a[r]) n.remove(), t.append(e("<param/>").attr({
                            name: "wmode",
                            value: "transparent"
                        })).replaceWith(t.clone())
                }), e("embed").each(function () {
                    var t = e(this),
                        n = t.attr("wmode");
                    n && !a[n] && t.attr("wmode", "transparent").replaceWith(t.clone())
                })
            }
            e("br").wrap(e("<" + i + "/>").addClass(s)), u(e("body")), e("iframe").each(function () {
                try {
                    u(e(this).contents().find("body"))
                } catch (t) {}
            }), e.htmlRewritten = !0
        },
        createSandbox: function (t, n, r) {
            n = n || "body";
            var s, o = {
                    display: "block",
                    left: "-10000px",
                    top: "-10000px",
                    visibility: "hidden",
                    border: "none",
                    position: "absolute",
                    opacity: 0,
                    overflow: "hidden",
                    padding: 0
                }, u = !1,
                a = t("<style/>").attr("id", this.addSuffix("reset")).attr("type", "text/css");
            try {
                a.text(i)
            } catch (f) {
                a[0].text = i
            }
            try {
                s = t("<iframe/>").cssImportant(o).attr({
                    scrolling: "no",
                    frameborder: 0
                }).appendTo(n);
                var l = s.contents()[0];
                l.open(), l.write("<!doctype html>"), l.close();
                if (r) {
                    s.contents().find("head").html(r.head);
                    var c = s.contents().find("body");
                    c.append(r.body);
                    var h = r.attrs;
                    for (var p in h) h.hasOwnProperty(p) && c.attr(p, h[p])
                } else s.contents().find("head").append(a).end().find("body").css({
                        margin: 0
                    });
                u = !0
            } catch (f) {
                o.display = "block", s = t("<div/>").cssImportant(o).appendTo(n), t("#" + this.addSuffix("reset")).length || a.appendTo("head");
                if (r) {
                    var c = t("<body/>");
                    c.append(r.body);
                    var h = r.attrs;
                    for (var p in h) h.hasOwnProperty(p) && c.attr(p, h[p]);
                    s.append(c)
                }
            }
            this.flagAsUnclippable(s);
            var d = this;
            return {
                addSandboxCss: function (e, n) {
                    var r = d.addSuffix("clipText"),
                        i = t("<link/>").attr({
                            id: r,
                            rel: "stylesheet",
                            type: "text/css",
                            href: e + "/css/" + n + "/clipper_sandbox.css"
                        });
                    u ? this.$element.contents().find("head").append(i) : t("#" + r).length || i.appendTo("head")
                },
                $body: u ? s.contents().find("body") : s,
                getDimensions: function () {
                    return {
                        width: this.$body.outerWidth(!0),
                        height: this.$body.outerHeight(!0)
                    }
                },
                append: function () {
                    this.$body.append.apply(this.$body, arguments)
                },
                html: function (n) {
                    this.$body.html(n), t.browser.webkit && this.$body.find("img").each(function () {
                        var n = t(this),
                            r = n.attr("src");
                        n.attr("src", "about:blank"), e.setTimeout(function () {
                            n.attr("src", r)
                        }, 1)
                    })
                },
                empty: function () {
                    this.$body.empty()
                },
                $element: s,
                destroy: function () {
                    this.$element.remove()
                }
            }
        }
    }
})(window);
(function (e) {
    function n(e) {
        t.extractors.TagTweaker.call(this), this.baseData = e
    }
    function r(e, n) {
        n.attr("bgcolor") && (n.css("background-color", n.css("background-color")), n.removeAttr("bgcolor"));
        var r = n.attr("background");
        r && (n.removeAttr("background"), n.css("background-image", "url(" + t.util.normalizeUri(r, this.baseData) + ")"))
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.extractors.TagTweaker), n.prototype.tweakFully = r, n.prototype.tweakPartially = r, t.extractors.TableTweaker = n
})(window);
(function (e) {
    function n(e, n) {
        t.util.copyAttributeAndNormalize(e, n, "src", this.baseData), t.util.copyAttributeIfExists(e, n, "type")
    }
    function r(e) {
        t.extractors.TagTweaker.call(this), this.baseData = e
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(r, new t.extractors.TagTweaker), r.prototype.tweakFully = n, r.prototype.tweakPartially = n, t.extractors.SourceTweaker = r
})(window);
(function (e) {
    function n(e) {
        t.extractors.TagTweaker.call(this), this.baseData = e
    }
    function r(e, n) {
        t.util.copyAttributeAndNormalize(e, n, "src", this.baseData)
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.extractors.TagTweaker), n.prototype.tweakFully = function (e, n) {
        r.call(this, e, n), t.util.copyAttributeIfExists(e, n, "width"), t.util.copyAttributeIfExists(e, n, "height")
    }, n.prototype.tweakPartially = r, t.extractors.ImageTweaker = n
})(window);
(function (e) {
    function n(e, n) {
        e.attr("type") === "submit" ? n.attr("value", e.attr("value") || "Submit Query") : t.util.copyAttributeIfExists(e, n, "value")
    }
    function r() {
        t.extractors.TagTweaker.call(this)
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(r, new t.extractors.TagTweaker), r.prototype.tweakFully = n, r.prototype.tweakPartially = n, t.extractors.InputTweaker = r
})(window);
(function (e) {
    function n() {
        t.extractors.TagTweaker.call(this)
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.extractors.TagTweaker), n.prototype.tweakFully = function (e, t) {
        t.height(e.outerHeight()).width(e.outerWidth())
    }, t.extractors.ButtonTweaker = n
})(window);
(function (e) {
    function n(e) {
        t.extractors.TagTweaker.call(this), this.baseData = e
    }
    function r(e, n) {
        t.util.copyAttributeAndNormalize(e, n, "href", this.baseData)
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.extractors.TagTweaker), n.prototype.tweakFully = r, n.prototype.tweakPartially = r, t.extractors.AnchorTweaker = n
})(window);
(function (e) {
    function s(e) {
        var n = t(e),
            r = t("div");
        return n.each(function (e, n) {
            var r = t(n),
                i = r.find("p").length,
                s = r.find("img").length,
                o = r.find("li").length,
                u = r.find("a").length,
                a = r.text(),
                f = (a.match(/,/g) || []).length;
            f < 10 && (s > i || o > i || u > i || i == 0) && r.remove()
        }), n[0]
    }
    function o(e) {
        var n = /(<br\s*\/?>(\s|&nbsp;?)*){1,}/g,
            r = t(e);
        return r.html(r.html().replace(n, "<br />")), r[0]
    }
    function u(e) {
        function r(e) {
            var n = !1;
            return t("span", e).each(function (e, r) {
                var i = t(r),
                    s = i.children();
                s.length == 0 ? (i.replaceWith(i.text().replace("<", "&lt;").replace(">", "&gt;")), n = !0) : s.length == 1 && (i.replaceWith(s), n = !0)
            }), n
        }
        var n = t(e);
        while (r(n));
        return n[0]
    }
    function a(e) {
        function r(e) {
            var n = !1;
            return t("div", e).each(function (e, r) {
                var i = t(r),
                    s = i.children();
                if (s.length == 0) {
                    var o = i.text();
                    o = o.replace(/^\s+|\s+$/g, "");
                    var u = (o.match(/ /g) || []).length;
                    if (!o || !u) i.remove(), n = !0
                }
            }), n
        }
        var n = t(e);
        while (r(n));
        return n[0]
    }
    function f(e, n, r) {
        var i = t(e),
            s = i.find(n);
        return r = r || 1e6, s.each(function (e, n) {
            var i = t(n),
                s = i.text(),
                o = (s.match(/\s+/g) + 1 || []).length;
            o += i.find("img").length, o < r && i.remove()
        }), i[0]
    }
    function l(e) {
        var s = {
            applet: 1,
            area: 1,
            base: 1,
            basefont: 1,
            button: 1,
            embed: 1,
            form: 1,
            frame: 1,
            frameset: 1,
            head: 1,
            iframe: 1,
            input: 1,
            link: 1,
            map: 1,
            menu: 1,
            meta: 1,
            nav: 1,
            noframes: 1,
            noscript: 1,
            object: 1,
            option: 1,
            param: 1,
            script: 1,
            select: 1,
            style: 1,
            textarea: 1,
            "var": 1
        }, o = null;
        if (!e) return null;
        if (e.nodeType == 3) return n.createTextNode(t(e).text());
        if (e.nodeType == 1) {
            var u = e.nodeName.toLowerCase();
            if (u in s) return null;
            var a = t(e);
            if (a.css("display") === "none" || a.css("opacity") === 0) return null;
            var f = a.text();
            f = f ? f.replace(/^\s+|\s+$/g, "") : "";
            if (u === "img") {
                if (a.width() * a.height() < 76800) return null;
                o = t("<img />");
                for (var c in {
                    src: 1,
                    width: 1,
                    height: 1
                }) {
                    var h = a.attr(c);
                    h && (h = i.util.normalizeUri(h, r), o.attr(c, h))
                }
                return o ? o[0] : null
            }
            if (u === "a") {
                o = t("<a />");
                for (var c in {
                    href: 1
                }) {
                    var h = a.attr(c);
                    h && (h = i.util.normalizeUri(h, r), o.attr(c, h))
                }
            } else if (u === "node") o = t("<span />");
            else try {
                    o = t(n.createElement(u === "body" ? "div" : u))
            } catch (p) {
                o = t("<div />")
            }
            a.contents().each(function (e, t) {
                var n = l(t);
                n && o.append(n)
            })
        }
        return o ? o[0] : null
    }
    function c(e) {
        var n = /<br\/?>[ \r\n\s]*<br\/?>/gi,
            r = /<\/?font[^>]*>/gi,
            i = t(e).html();
        return i = i.replace(n, "</p><p>"), i = i.replace(r, ""), e = t("<div/>"), e.html(i), e[0]
    }
    function h(e) {
        var n = /(comment|meta|promo|gallery|disclaimer|copyright|(\\bad\\b)|footer|footnote|sharing|sharetools|share|menu|side|dsq)/i,
            r = /((^|\\s)(post|page|author|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)(\\s|$))/i,
            i = 0,
            s = null;
        return t(e).find("p").each(function (e, o) {
            var u = t(o),
                a = u.parent(),
                f = a.data("score");
            if (typeof f == "undefined") {
                f = 0;
                var l = a.attr("class");
                l && l.match(n) ? f -= 50 : l && l.match(r) && (f += 25);
                var c = a.attr("id");
                c && c.match(n) ? f -= 50 : c && c.match(r) && (f += 25)
            }
            var h = u.text();
            h.length > 10 && f++, f += (h.match(/,/g) || []).length, a.data("score", f), f > i && (i = f, s = a[0])
        }), s
    }
    function p(e) {
        var n = t(e);
        return n.find("img").wrap("<center />"), n[0]
    }
    function d() {
        var e = l(n.body);
        e = c(e), e = h(e);
        if (!e) return null;
        e = s(e), e = o(e), e = u(e), e = a(e), e = f(e, "li", 2), e = f(e, "ul", 5), e = f(e, "table", 250), e = f(e, "h1"), e = f(e, "h2"), e = p(e);
        var r = t(e).text().replace(/^\s+|\s+$/g, ""),
            i = (r.match(/ /g) || []).length;
        if (i < 200) return null;
        var d = t("title").text();
        return d && t("<h1>" + d + "</h1>").prependTo(e), e
    }
    function v(e, i, s) {
        return t = e, n = i, r = s, d()
    }
    var t, n, r, i = e.CLIPBOARD.client;
    e.CLIPBOARD.client.util.readerExtract = v
})(window);
(function (e) {
    function t() {
        this.events = {}
    }
    t.prototype = {
        on: function (e, t) {
            e = e.split(" ");
            for (var n = 0, r; n < e.length; n++) r = e[n], this.events[r] || (this.events[r] = []), this.events[r].push(t);
            return this
        },
        trigger: function (e, t) {
            var n = this.events[e] || [];
            if (!n.length) return this;
            var r = {
                name: e
            };
            for (var i = 0; i < n.length; i++) if (n[i].call(this, t, r) === !1) break;
            return this
        },
        bubble: function (e) {
            var t = this;
            return {
                to: function (n, r) {
                    return t.on(e, function (t, i) {
                        n.trigger(r || e, t)
                    }), t
                }
            }
        },
        clear: function (e) {
            if (!e) {
                this.events = {};
                return
            }
            this.events[e] = []
        }
    }, e.CLIPBOARD.client.EventEmitter = t
})(window);
(function (e, t) {
    function r(e) {
        n.extractors.TagTweaker.call(this), n.EventEmitter.call(this), this.baseData = e
    }
    var n = e.CLIPBOARD.client;
    n.util.inherit(r, new n.extractors.TagTweaker, new n.EventEmitter), r.prototype.tweakFully = function (e, r) {
        r.attr("src") && r.attr("src", n.util.normalizeUri(r.attr("src"), this.baseData)), r.attr("poster") && r.attr("poster", n.util.normalizeUri(r.attr("poster"), this.baseData)), r.attr("autoplay") !== t && (r.removeAttr("autoplay"), this.trigger("autoplayDisabled", {
            source: "video.autoplay"
        })), r.attr("controls", "controls")
    }, n.extractors.VideoTweaker = r
})(window);
(function (e) {
    function n(e, n) {
        var r = e.attr("name");
        if (!r) return;
        n.attr("name", r), r = r.toLowerCase();
        switch (r) {
        case "flashvars":
            n.attr("value", e.attr("value")), t.util.disableAutoplayForUrl(n, "value") && this.trigger("autoplayDisabled", {
                source: "param.flashvars"
            });
            break;
        case "play":
        case "autostart":
            n.attr("value") !== "false" && (n.attr("value", "false"), this.trigger("autoplayDisabled", {
                source: "param." + r
            }));
            break;
        case "movie":
        case "src":
            t.util.copyAttributeAndNormalize(e, n, "value", this.baseData);
            break;
        case "base":
            n.attr("value", this.baseData.relativeDir);
            break;
        case "wmode":
            n.attr("value", t.util.defaultWindowMode)
        }
    }
    function r(e) {
        t.extractors.TagTweaker.call(this), t.EventEmitter.call(this), this.baseData = e
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(r, new t.extractors.TagTweaker, new t.EventEmitter), r.prototype.tweakFully = n, r.prototype.tweakPartially = n, t.extractors.ParamTweaker = r
})(window);
(function (e) {
    function n(e) {
        this.baseData = e, t.extractors.TagTweaker.call(this), t.EventEmitter.call(this)
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.extractors.TagTweaker, new t.EventEmitter), n.prototype.tweakFully = function (e, n) {
        var r = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            i = "application/x-shockwave-flash";
        if (e.attr("classid") === r) {
            n.attr("type", i);
            var s = e.find('param[name="movie"]');
            s.length && n.attr("data", s.attr("value"))
        }
        n.removeAttr("classid"), t.util.copyAttributeAndNormalize(e, n, "data", this.baseData) && t.util.disableAutoplayForUrl(n, "data") && this.trigger("autoplayDisabled", {
            source: "object.data"
        })
    }, t.extractors.ObjectTweaker = n
})(window);
(function (e) {
    function n(e) {
        t.extractors.TagTweaker.call(this), t.EventEmitter.call(this), this.baseData = e
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.extractors.TagTweaker, new t.EventEmitter), n.prototype.tweakFully = function (e, n) {
        t.util.copyAttributeAndNormalize(e, n, "src", this.baseData) && (t.util.disableAutoplayForUrl(n, "src") ? this.trigger("autoplayDisabled", {
            source: "iframe.src"
        }) : n.attr("src") === "#" && n.attr("src", "about:blank")), t.util.copyAttributeIfExists(e, n, "scrolling"), t.util.copyAttributeIfExists(e, n, "frameborder"), t.util.copyAttributeIfExists(e, n, "webkitAllowFullScreen"), t.util.copyAttributeIfExists(e, n, "allowFullScreen");
        var r = n.attr("src");
        /^http:\/\/www\.youtube\.com\/embed\//.test(r) && (r.indexOf("wmode=") !== -1 ? r = r.replace(/\bwmode=.*?([&|$])/i, "wmode=transparent$1") : r += (r.indexOf("?") === -1 ? "?" : "&") + "wmode=transparent", n.attr("src", r))
    }, t.extractors.IframeTweaker = n
})(window);
(function (e) {
    function n(e) {
        t.extractors.TagTweaker.call(this), t.EventEmitter.call(this), this.baseData = e
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.extractors.TagTweaker, new t.EventEmitter), n.prototype.tweakFully = function (e, n) {
        t.util.copyAttributeAndNormalize(e, n, "src", this.baseData) && t.util.disableAutoplayForUrl(n, "src") && this.trigger("autoplayDisabled", {
            source: "embed.src"
        });
        if (t.util.copyAttributeIfExists(e, n, "flashvars")) if (t.util.disableAutoplayForUrl(n, "flashvars")) this.trigger("autoplayDisabled", {
                    source: "embed.flashvars"
                });
            else {
                var r = n.attr("flashvars");
                n.attr("flashvars", r + (r.length ? "&" : "") + "autoplay=false")
            }
        n.attr("base", this.baseData.relativeDir).attr("wmode", t.util.defaultWindowMode)
    }, t.extractors.EmbedTweaker = n
})(window);
(function (e) {
    function n() {
        t.Extractor.call(this)
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.Extractor), n.prototype.createTweakers = function (e) {
        var n = "autoplayDisabled",
            r = {
                a: new t.extractors.AnchorTweaker(this.baseData),
                button: new t.extractors.ButtonTweaker,
                embed: (new t.extractors.EmbedTweaker(this.baseData)).bubble(n).to(this),
                iframe: (new t.extractors.IframeTweaker(this.baseData)).bubble(n).to(this),
                img: new t.extractors.ImageTweaker(this.baseData),
                input: new t.extractors.InputTweaker(this.baseData),
                object: (new t.extractors.ObjectTweaker(this.baseData)).bubble(n).to(this),
                param: (new t.extractors.ParamTweaker(this.baseData)).bubble(n).to(this),
                source: new t.extractors.SourceTweaker(this.baseData),
                table: new t.extractors.TableTweaker(this.baseData),
                video: (new t.extractors.VideoTweaker(this.baseData)).bubble(n).to(this)
            };
        if (e) for (var i = 0; i < e.length; i++) r[e[i]] && (r[e[i]] = undefined);
        return r
    }, t.extractors.TweakableExtractor = n
})(window);
(function (e) {
    function s(e) {
        return e.props = {}, e.props[t.util.doNotClipAllAttributeName] = !0, new this.xdm.Socket(e)
    }
    function o(t) {
        return e.CLIPBOARD.JSON.stringify(t)
    }
    function u(t) {
        if (!t || !t.length) return {
                error: !0,
                message: "Empty response"
        };
        try {
            return e.CLIPBOARD.JSON.parse(t)
        } catch (n) {
            return {
                error: !0,
                message: "Invalid json"
            }
        }
    }
    function a() {
        var e = this,
            t = s.call(e, {
                remote: this.baseUri + "utils/xdm",
                onReady: function () {
                    t.postMessage(o({
                        action: i.fetchUserData
                    }))
                },
                onMessage: function (n) {
                    var r = u(n);
                    r.error && r.message && (r.error = r.message), e.trigger("userDataReceived", r), t.destroy()
                }
            })
    }
    function f(e) {
        return e.expiredSession ? r.expiredSession : e.expiredRequest ? r.expiredRequest : e.badRequest ? r.badRequest : e.unauthorized ? r.unauthorized : e.validationError ? r.validationError : r.unknown
    }
    function l(n) {
        var r = this,
            i = {};
        t.util.forEach(n, function (t, n) {
            typeof t == "object" ? i[n] = e.CLIPBOARD.JSON.stringify(t) : i[n] = t
        });
        var o = s.call(this, {
            remote: r.baseUri + "utils/xdm",
            onReady: function () {
                var t = {
                    APIpath: "/api/v1/users",
                    method: "PUT",
                    data: i
                }, n = e.CLIPBOARD.JSON.stringify(t);
                o.postMessage(n)
            },
            onMessage: function () {
                o.destroy()
            }
        })
    }
    function c(t) {
        this.trigger("sendingClip");
        var i = this,
            o = (new Date).getTime(),
            u = setTimeout(function () {
                i.trigger(n, {
                    reason: r.timeout
                })
            }, 3e4),
            a = s.call(this, {
                remote: i.baseUri + "utils/xdm",
                onReady: function () {
                    a.postMessage(e.CLIPBOARD.JSON.stringify({
                        APIpath: "/api/v1/clips",
                        method: "POST",
                        data: t
                    }))
                },
                onMessage: function (t, s) {
                    clearTimeout(u);
                    var l;
                    if (t && t.length > 0) try {
                            t = e.CLIPBOARD.JSON.parse(t), t.error ? l = f(t.error) : t.result || (l = r.emptyResult)
                    } catch (c) {
                        l = r.malformedResponse
                    } else l = r.invalidResponse;
                    l ? i.trigger(n, {
                        reason: l
                    }) : i.trigger("sendSucceeded", {
                        duration: (new Date).getTime() - o,
                        clipId: t.result.id,
                        blobId: t.result.blobId,
                        thumbnailId: t.result.thumbnailId
                    }), a.destroy()
                }
            })
    }
    function h(e, t, n) {
        var r = this;
        setTimeout(function () {
            r.sendAjaxRequest(r.baseUri + "api/v1/metrics/" + (n.guid || ""), {
                type: "GET",
                data: {
                    eventName: e,
                    sessionId: n.sessionId,
                    data: t || {}
                },
                dataType: "jsonp"
            })
        }, 20)
    }
    function p(t) {
        var n = this,
            r = s.call(this, {
                remote: n.baseUri + "utils/xdm",
                onReady: function () {
                    var n = e.CLIPBOARD.JSON.stringify({
                        APIpath: "/api/v1/clipper/read-notifications",
                        method: "POST",
                        data: {
                            userGuid: t
                        }
                    });
                    r.postMessage(n)
                },
                onMessage: function (t) {
                    if (t && t.length) try {
                            var i = e.CLIPBOARD.JSON.parse(t).error;
                            i ? n.trigger("updateNewNotificationStatusFailed", {
                                error: i
                            }) : n.trigger("notificationStatusUpdated")
                    } catch (s) {
                        n.trigger("updateNotificationStatusFailed", {
                            error: "invalidJsonResponse"
                        })
                    } else n.trigger("updateNotificationStatusFailed", {
                            error: "xdmFailed"
                        });
                    r.destroy()
                }
            })
    }
    function d(t, n) {
        var r = this,
            i = s.call(this, {
                remote: r.baseUri + "utils/xdm",
                onReady: function () {
                    var r = e.CLIPBOARD.JSON.stringify({
                        APIpath: "/api/v2/users/" + n + "/boards",
                        method: "POST",
                        data: t
                    });
                    i.postMessage(r)
                },
                onMessage: function (t) {
                    if (t && t.length) try {
                            var n = e.CLIPBOARD.JSON.parse(t);
                            n.error ? r.trigger("boardCreationFailed", {
                                error: n.error
                            }) : r.trigger("boardCreationSucceeded", n.result)
                    } catch (s) {
                        r.trigger("boardCreationFailed", {
                            error: "invalidJsonResponse"
                        })
                    } else r.trigger("boardCreationFailed", {
                            error: "xdmFailed"
                        });
                    i.destroy()
                }
            })
    }
    function v(e, n, r) {
        t.EventEmitter.call(this), this.baseUri = e, this.sendAjaxRequest = n, this.xdm = r
    }
    var t = e.CLIPBOARD.client,
        n = "sendFailed",
        r = {
            serverSideSave: "failedToSaveClipOrBlob",
            timeout: "savingClipTimedOut",
            malformedResponse: "malformedJsonInClipSaveResponse",
            invalidResponse: "invalidResponseSavingClip",
            expiredRequest: "expiredRequest",
            expiredSession: "expiredSession",
            unauthorized: "unauthorized",
            badRequest: "badRequest",
            emptyResult: "emptyResultSavingClip",
            validationError: "blobValidationError",
            unknown: "unknown"
        }, i = {
            fetchUserData: "fetchUserData"
        };
    v.sendFailureStatus = r, t.util.inherit(v, new t.EventEmitter), v.prototype.constructor = v, t.util.merge(v.prototype, {
        updatePreferences: l,
        sendClip: c,
        logMetric: h,
        fetchUserData: a,
        markNotificationRead: p,
        createBoard: d
    }), t.DataAccess = v
})(window);
(function (e) {
    function t() {
        this.controls = []
    }
    t.prototype = {
        activate: function () {
            this.trigger("activating"), this.doActivate();
            for (var e = 0; e < this.controls.length; e++) this.controls[e].activate();
            this.trigger("activated")
        },
        doActivate: function () {},
        deactivate: function () {
            this.trigger("deactivating");
            for (var e = 0; e < this.controls.length; e++) this.controls[e].deactivate();
            this.doDeactivate(), this.trigger("deactivated")
        },
        doDeactivate: function () {},
        removeControl: function (e) {
            if (!e) return;
            for (var t = 0; t < this.controls.length; t++) if (this.controls[t] === e) {
                    this.controls.splice(t, 1);
                    return
                }
        },
        setLoginState: function (e) {},
        getResources: function () {}
    }, e.CLIPBOARD.client.ActivatableControl = t
})(window);
(function (e) {
    function i(e) {
        t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e, this.$container = null
    }
    var t = e.CLIPBOARD.client,
        n = {
            opacity: .7,
            animationDelay: 500
        }, r = 200;
    t.util.inherit(i, new t.ActivatableControl, new t.EventEmitter), t.util.merge(i.prototype, {
        show: function (e) {
            if (this.$container) return;
            var r = this.$;
            e = r.extend({}, n, e || {}), this.$container = r("<div/>").applyBlockStyles().attr("id", "overlay" + t.util.idSuffix).cssImportant({
                top: 0,
                left: 0,
                position: "fixed"
            }).appendTo("body"), t.util.assureFixedPositioning(this.$container);
            var i = this;
            this.$container.animate({
                opacity: e.opacity
            }, e.animationDelay, function () {
                i.trigger("shown")
            })
        },
        hide: function () {
            if (!this.$container) return;
            var e = this;
            this.$container.fadeOut(r, function () {
                e.$container.remove(), e.$container = null, e.trigger("hidden")
            })
        },
        doDeactivate: function () {
            this.hide()
        }
    }), t.ui.Overlay = {
        getInstance: function () {
            var e;
            return function (t) {
                return e || (e = new i(t)), e
            }
        }()
    }
})(window);
(function (e) {
    function r(e) {
        var t = [];
        for (var n in e) {
            if (!e.hasOwnProperty(n)) continue;
            t.push(n + "=" + e[n])
        }
        return t.join(",")
    }
    function i(t, n, r) {
        var i = this.$,
            s, o;
        e.screenLeft === undefined ? (s = e.screenX, o = e.screenY) : (s = e.screenLeft, o = e.screenTop);
        var u = {
            left: s,
            top: o + 100
        };
        if (r) {
            var a = r.offset();
            u.left += a.left + r.outerWidth() / 2, u.top += a.top + r.outerHeight() / 2
        } else u.left += i(e).width() / 2, u.height += i(e).height() / 2;
        var f = Math.max(0, u.left - t / 2),
            l = Math.max(0, u.top - n / 2);
        return {
            left: f,
            top: l
        }
    }
    function s() {
        var t = this,
            n = e.setInterval(function () {
                t.window.closed && (t.alreadyClosed || t.trigger("closed", {
                    source: "manual"
                }), e.clearInterval(n), t.alreadyClosed = !1)
            }, 100)
    }
    function o(e, n, r) {
        t.EventEmitter.call(this), t.ActivatableControl.call(this), r = r || {}, this.$ = e.$, this.xdm = e.xdm, this.domain = e.domain, this.url = n, this.name = r.name || "popup_" + Math.round(Math.random() * 1e6), this.width = r.width || 640, this.height = r.height || 480
    }
    var t = e.CLIPBOARD.client,
        n = "clipboard_popup";
    t.util.inherit(o, new t.ActivatableControl, new t.EventEmitter), t.util.merge(o.prototype, {
        constructor: o,
        name: "",
        window: null,
        params: {
            location: "yes",
            resizable: "yes",
            alwaysRaised: "yes"
        },
        open: function (t) {
            if (this.isOpen()) return this.window.focus(), this.window;
            this.window && this.destroy();
            var o = this.$,
                u = o.extend({
                    width: this.width,
                    height: this.height
                }, this.params, i.call(this, this.width, this.height, t)),
                a = o('iframe[name="' + this.name + '"]');
            a.length || (a = o("<iframe/>").attr("src", "https://" + this.domain + "/utils/clipper-connect-iframe").attr("name", this.name).css({
                top: -1e4,
                left: -1e4,
                display: "none",
                position: "absolute"
            }).appendTo("body")), this.window = e.open(this.url, this.name + Math.round(Math.random() * 1e5), r(u)), s.call(this);
            var f = this;
            return o(e).on("message." + n, function (e) {
                var t = e.originalEvent,
                    n = "clipboard:";
                if (!t || t.origin !== "https://" + f.domain) return;
                if (t.data.indexOf(n) !== 0) return;
                f.trigger("externalWorkCompleted", {
                    status: t.data.substring(n.length)
                }), a.remove(), a = null
            }), this.trigger("opened", {
                window: this.window
            }), this.window
        },
        close: function (t, r) {
            if (!this.isOpen()) return;
            t !== "manual" && (this.alreadyClosed = !0), this.window.close(), this.$(e).off("message." + n), this.trigger("closed", {
                source: t || "programmatic",
                status: r
            })
        },
        destroy: function () {
            this.close(), this.window = null, this.trigger("destroyed")
        },
        isOpen: function () {
            return this.window ? !this.window.closed : !1
        },
        doDeactivate: function () {
            this.destroy()
        }
    }), o.getOrigin = function () {
        return e.location.href
    }, o.factory = function (e, t) {
        switch (e) {
        case "login":
            return new o(t, t.baseUri + "login?display=popup", {
                name: "clipboardLogin",
                width: 640,
                height: 400
            });
        case "register":
            return new o(t, t.baseUri + "register?source=" + t.origin + "&display=popup", {
                name: "clipboardRegister",
                width: 1024,
                height: 768
            });
        default:
            throw new Error("Unsupported popup window type")
        }
    }, t.ui.PopupWindow = o
})(window);
(function (e) {
    function n() {
        t.UiController.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this)
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, new t.UiController, new t.ActivatableControl, new t.EventEmitter), n.prototype.constructor = n, t.ui.NoOpUiController = n
})(window);
(function (e) {
    function s(e) {
        return "notification_" + e + t.util.idSuffix
    }
    function o(s) {
        var o = this.$,
            u = this,
            a = this.staticBaseUrl + "/images/" + this.siteVersion + "/2-color-logo-positive.png",
            f = o(e).width(),
            l = o(e).height();
        this.$container = o("<div/>").applyBlockStyles().attr("id", i.container).append(o("<div/>").applyBlockStyles().attr("id", i.header).append(o("<img/>").applyInlineStyles().attr({
            id: i.logo,
            src: a
        })).append(o("<div/>").applyBlockStyles().attr("id", i.closeButton).attr("title", "NOPE.").html("&times;").click(function () {
            u.close("closeButton")
        }).stopPropagation())).append(o("<div/>").applyBlockStyles().attr("id", i.content).html(s).find("div,p,h2").applyBlockStyles().end().find("li").applyListItemStyles().end().find("ol,ul").applyListStyles().end().find("a").applyLinkStyles().end().find("img,span,kbd").applyInlineStyles().end()).appendTo("body").cssImportant({
            top: Math.max(50, l / 2 - r / 2),
            left: Math.max(50, f / 2 - n / 2)
        }), t.util.assureFixedPositioning(this.$container)
    }
    function u(e) {
        t.EventEmitter.call(this), t.ActivatableControl.call(this), this.$ = e.$, this.overlay = t.ui.Overlay.getInstance(this.$), this.$container = null, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion, this.currentSlide = 0, this.controls = [this.overlay]
    }
    var t = e.CLIPBOARD.client,
        n = 540,
        r = 500,
        i = {
            container: s("container"),
            header: s("header"),
            content: s("content"),
            logo: s("logo"),
            closeButton: s("close")
        };
    t.util.inherit(u, new t.ActivatableControl, new t.EventEmitter), t.util.merge(u.prototype, {
        open: function (e) {
            if (this.$container || !e) return;
            this.overlay.show(), o.call(this, e), this.trigger("opened")
        },
        close: function () {
            var e = this;
            if (!this.$container) return;
            this.overlay.hide(), this.$container && this.$container.fadeOut("fast", function () {
                e.$container.remove(), e.$container = null, e.trigger("closed")
            })
        },
        doDeactivate: function () {
            this.close()
        }
    }), t.ui.NotificationDialog = u
})(window);
(function (e) {
    function s(e) {
        return "settings_" + e + t.util.idSuffix
    }
    function o(e, t) {
        return function () {
            var n = e.$(this),
                r = {};
            r[t] = n.is('input[type="checkbox"]') ? n.is(":checked") : n.val(), u.call(e, r)
        }
    }
    function u(e) {
        this.trigger("preferencesUpdated", {
            preferences: e
        })
    }
    function a(a) {
        function p(e, t) {
            var n = "preferences_" + e;
            f("<tr/>").applyTableRowStyles().append(f("<td/>").applyTableCellStyles().append(f("<input/>").applyInlineStyles().attr({
                type: "checkbox",
                id: s(n),
                checked: a.preferences[e]
            }).change(o(a, e))), f("<td/>").applyTableCellStyles().append(f("<label/>").applyInlineStyles().attr({
                "for": s(n)
            }).text(t))).appendTo(h)
        }
        var f = this.$,
            l = this,
            c = this.staticBaseUrl + "/images/" + this.siteVersion + "/2-color-logo-positive.png",
            h = f("<table/>").applyTableStyles().attr("id", i.basic);
        p("reviewClip", "Review clip before saving"), p("publishByDefault", "Publish clips by default"), p("showClipperAutocompleteTriggers", "Show autocomplete triggers"), p("closeClipperAfterSaving", "Close Clipper after saving"), p("showClipperHint", "Show clipping hints"), this.$container = f("<div/>").applyBlockStyles().attr("id", i.container).append(f("<div/>").applyBlockStyles().attr("id", i.title).append(f("<h1/>").applyBlockStyles().append("Clipper Settings")).append(f("<div/>").applyBlockStyles().attr("id", i.closeButton).attr("title", "close").html("&times;").click(function () {
            l.close("closeButton")
        }).stopPropagation())).append(f("<div/>").applyBlockStyles().attr("id", i.body).append(h).append(f("<div/>").applyBlockStyles().attr("id", i.mode).append(f("<label>").applyInlineStyles().append("Default clipping mode:")).append(f("<select/>").append(f("<option/>").attr("value", "clip").append("clip")).append(f("<option/>").attr("value", "page").append("page")).append(f("<option/>").attr("value", "image").append("image")).append(f("<option/>").attr("value", "text").append("text")).append(f("<option/>").attr("value", "reader").append("reader")).append(f("<option/>").attr("value", "off").append("off")).change(function () {
            var e = a.$(this).val();
            u.call(a, {
                defaultClipMode: e
            })
        }).val(a.preferences.defaultClipMode)))).appendTo("body");
        var d = f(e).width(),
            v = f(e).height();
        this.$container.cssImportant({
            top: Math.max(50, v / 2 - r / 2 - 100),
            left: Math.max(50, d / 2 - n / 2)
        }), t.util.assureFixedPositioning(this.$container)
    }
    function f(e, n) {
        t.EventEmitter.call(this), t.ActivatableControl.call(this), this.$ = e.$, this.fixedBar = n, this.overlay = t.ui.Overlay.getInstance(this.$), this.$container = null, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion, this.controls = [this.overlay]
    }
    var t = e.CLIPBOARD.client,
        n = 540,
        r = 500,
        i = {
            container: s("container"),
            title: s("title"),
            closeButton: s("close"),
            header: s("header"),
            body: s("body"),
            basic: s("basic"),
            mode: s("mode"),
            footer: s("footer")
        };
    t.util.inherit(f, new t.ActivatableControl, new t.EventEmitter), t.util.merge(f.prototype, {
        open: function (e) {
            this.overlay.show(), a.call(this, this.fixedBar), this.trigger("opened")
        },
        close: function (e) {
            var t = this;
            if (!this.$container) return;
            this.overlay.hide(), this.$container && this.$container.fadeOut("fast", function () {
                t.$container.remove(), t.$container = null, t.trigger("closed", {
                    whence: e
                })
            })
        },
        doDeactivate: function () {
            this.close()
        }
    }), t.ui.Settings = f
})(window);
(function (e) {
    function o(e) {
        return "tutorial_" + e + t.util.idSuffix
    }
    function u() {
        var o = this.$,
            u = this,
            f = this.staticBaseUrl + "/images/" + this.siteVersion + "/2-color-logo-positive.png";
        this.$container = o("<div/>").applyBlockStyles().attr("id", s.container).append(o("<div/>").applyBlockStyles().attr("id", s.header).append(o("<img/>").applyInlineStyles().attr({
            id: s.logo,
            src: f
        })).append(o("<div/>").applyBlockStyles().attr("id", s.closeButton).attr("title", "NOPE.").html("&times;").click(function () {
            u.close("closeButton")
        }).stopPropagation())).append(o("<div/>").applyBlockStyles().attr("id", s.slideContent).append(o("<h2/>").applyBlockStyles().attr("id", s.slideTitle).append("How to use the Clipper").append(o("<span/>").applyInlineStyles().attr("id", s.slideCount).append(o("<span/>").applyInlineStyles().attr("id", s.slideCountCurrent).text("1")).append(o("<em/>").applyInlineStyles().attr("id", s.slideCountOf).text(" of ")).append("" + n.length))).append(o("<div/>").applyBlockStyles().attr("id", s.slideImage).append(o("<img/>").applyInlineStyles().attr("alt", "demo"))).append(o("<div/>").applyBlockStyles().attr("id", s.slideDescription).append(o("<p/>").applyBlockStyles()))).append(o("<div/>").applyBlockStyles().attr("id", s.footer).append(o("<div/>").applyBlockStyles().attr("id", s.startClippingButton).text("Start clipping").click(function () {
            u.close("startClippingButton")
        }).stopPropagation()).append(o("<div/>").applyBlockStyles().attr("id", s.nextButton).text("Next").click(function () {
            a.call(u, u.currentSlide + 1)
        }).stopPropagation()).append(o("<div/>").applyBlockStyles().attr("id", s.prevButton).text("Prev").click(function () {
            a.call(u, u.currentSlide - 1)
        }).stopPropagation())).appendTo("body");
        var l = o(e).width(),
            c = o(e).height();
        this.$container.cssImportant({
            top: Math.max(50, c / 2 - i / 2),
            left: Math.max(50, l / 2 - r / 2)
        }), t.util.assureFixedPositioning(this.$container)
    }
    function a(e) {
        this.currentSlide = e;
        var t = this.$,
            r = n[this.currentSlide],
            i = this,
            o = this.staticBaseUrl + "/images/" + this.siteVersion + "/" + r.image;
        t("#" + s.slideImage + " img").attr("src", o), t("#" + s.slideCountCurrent).text(i.currentSlide + 1), t("#" + s.slideDescription + " p").text(r.description);
        var u = t("#" + s.nextButton).hide(),
            a = t("#" + s.prevButton).hide(),
            f = t("#" + s.startClippingButton).hide();
        i.currentSlide === n.length - 1 ? f.show() : u.show(), i.currentSlide > 0 && a.show(), this.trigger("slideLoaded", {
            index: i.currentSlide
        })
    }
    function f(e) {
        t.EventEmitter.call(this), t.ActivatableControl.call(this), this.$ = e.$, this.overlay = t.ui.Overlay.getInstance(this.$), this.$container = null, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion, this.currentSlide = 0, this.controls = [this.overlay]
    }
    var t = e.CLIPBOARD.client,
        n = [{
                image: "clipperTutorial_selecting.gif",
                description: "Hover over the part of the page you want to clip, and click to save it to your home page on clipboard.com."
            }, {
                image: "clipperTutorial_zooming.gif",
                description: "You can also hold shift and scroll your mousewheel to get a more precise selection."
            }, {
                image: "clipperTutorial_dragging.gif",
                description: "Click and drag to select multiple items. Release the mouse button to save."
            }
        ],
        r = 540,
        i = 500,
        s = {
            container: o("container"),
            header: o("slideHeader"),
            closeButton: o("close"),
            logo: o("logo"),
            slideContent: o("slideContent"),
            footer: o("slideFooter"),
            nextButton: o("next"),
            prevButton: o("prev"),
            startClippingButton: o("startClipping"),
            slideTitle: o("slideTitle"),
            slideCount: o("slideCount"),
            slideCountOf: o("slideCountOf"),
            slideCountCurrent: o("slideCountCurrent"),
            slideImage: o("slideImage"),
            slideDescription: o("slideDescription")
        };
    t.util.inherit(f, new t.ActivatableControl, new t.EventEmitter), t.util.merge(f.prototype, {
        open: function (e) {
            e = e || 0;
            if (this.$container || !n[e]) return;
            this.overlay.show(), u.call(this), a.call(this, e), this.trigger("opened")
        },
        close: function (e) {
            var t = this;
            if (!this.$container) return;
            this.overlay.hide(), this.$container && this.$container.fadeOut("fast", function () {
                t.$container.remove(), t.$container = null, t.trigger("closed", {
                    whence: e
                })
            })
        },
        doDeactivate: function () {
            this.close()
        }
    }), t.ui.Tutorial = f
})(window);
(function (e) {
    function n(e) {
        return "review_" + t.util.addSuffix(e)
    }
    function u(e, t, n) {
        e.trigger("confirmed", {
            method: n,
            clip: t.clip,
            reviewData: a.call(e)
        })
    }
    function a() {
        var e = this.$,
            r = e("#" + i),
            o = t.util.trim(r.val());
        o === r.attr("placeholder") && (o = "");
        var u = t.util.trim(e("#" + s).val()),
            a = e("#" + n("boardPicker")).boardPicker("getSelected") || [];
        return {
            title: u,
            tweet: this.clipAction.postToTwitter,
            postToFacebook: this.clipAction.postToFacebook,
            published: this.clipAction.publish,
            annotation: o,
            boards: e.map(a, function (e) {
                return e.id
            }).join(" ")
        }
    }
    function f(e, t) {
        e.trigger("canceled", {
            method: t
        })
    }
    function l(e) {
        var t = this.$,
            r = t("<div/>").attr("id", n("bookmarkTitle")).text(e.clip.title),
            i = t("<div/>").attr("id", n("bookmarkSubtitle")).text(e.clip.source),
            s = t("<div/>").attr("id", n("bookmarkImage")),
            o = t("<div/>").attr("id", n("bookmarkWrapper")).append(s, r, i);
        return t("<div/>").append(o).html()
    }
    function c(e) {
        var t = e === "Publish" ? "publish" : "postTo" + e;
        this.clipAction[t] = !this.clipAction[t], this.$("#" + n("actionMenuItem_" + e.toLowerCase())).toggleClass(n("actionMenuActive"))
    }
    function h(a) {
        function I(e) {
            return function () {
                var t = B.val(),
                    n = t.length ? " " : "",
                    r = t.length + n.length + e.length;
                B.val(t + n + e).caret(r, r), p.trigger("autocompleteTriggered", {
                    source: "clickTrigger",
                    type: e === "#" ? "tag" : "user"
                })
            }
        }
        function q(e) {
            var t = "autocompleteTrigger" + (e === "#" ? "Tag" : "User"),
                r = e === "#" ? "tags" : "connections";
            return h("<span/>").applyInlineStyles().attr("id", n(t)).attr("title", "Show " + r).text(e).click(I(e)).stopPropagation()
        }
        function R() {
            c.call(p, "Publish")
        }
        function U(e) {
            var t = e.toLowerCase();
            return function () {
                var i = h("#" + n("actionMenuItem_" + t));
                if (!p.clipAction[t]) {
                    var s = e === "Twitter" ? "connectedToTwitter" : "connectedToFbStream";
                    p.preferences[s] ? c.call(p, e) : (i.addClass(r), p[t + "Window"].open(i))
                } else p[t + "Window"].close()
            }
        }
        function z() {
            function e(e, t, r) {
                var i = n("actionMenuItem"),
                    s = e.toLowerCase(),
                    o = !1;
                t && (i += " " + n("actionMenuActive"));
                if (s === "facebook" || s === "twitter") o = !p.isLoggedIn;
                var u = h("<div/>").applyBlockStyles().addClass(i).attr("id", n("actionMenuItem_" + s)).append(h("<span/>").applyInlineStyles().attr("id", n("actionMenuIcon_" + s)).addClass(n("actionMenuIcon"))).append(h("<span/>").applyInlineStyles().addClass(n("actionMenuLabel")).text(e)).click(e === "Publish" ? R : U(e)).stopPropagation();
                return r && u.attr("title", p.modifier.toString() + " + " + r), o && u.hide(), u
            }
            var t = h("<div/>").applyBlockStyles().attr("id", n("actionMenu")).append(e("Publish", p.preferences.publishByDefault, "p"));
            return p.preferences.connectedToTimeline || t.append(e("Facebook")), t.append(e("Twitter"))
        }
        var h = this.$,
            p = this;
        p.trigger("opening");
        var d = h(e).width(),
            v = h(e).height(),
            m = 64,
            g = 89,
            y = m + g,
            b = 15,
            w = 1,
            E = a.clip.height + w * 2 + b * 2 + y,
            S, x, T = a.clip.width,
            N = a.clip.trueHeight ? a.clip.trueHeight : a.clip.height,
            C = a.rawHtml;
        this.browser === "IE8" && a.clip.type === "bookmark" ? (C = l.call(this, a), S = T = 640, N = 120, x = Math.min(v - 100, N + 2 + b * 2 + y)) : (S = Math.min(Math.max(600, a.clip.width + 50), d - 100), x = Math.min(E, v - 100)), this.$dialog = h("<div/>").applyBlockStyles().attr("id", n("dialog"));
        var k = n("quirksModeSuxWrapper"),
            L = h("<div/>").applyBlockStyles().attr("id", n("header")),
            A = h("<div/>").applyBlockStyles().addClass(k).appendTo(L);
        h("<input/>").applyTextInputStyles().attr({
            type: "text",
            id: s,
            placeholder: "Enter a title for your clip",
            value: t.util.trim(a.clip.title) || this.document.title
        }).stopPropagation().appendTo(A);
        var O = h("<div/>").applyBlockStyles().attr("id", n("contents")).cssImportant("height", x - y + "px"),
            M = h("<div/>").applyBlockStyles().attr("id", n("clipContents")).cssImportant({
                height: N
            }).appendTo(O),
            _ = h("<div/>").applyBlockStyles().attr("id", n("footer")),
            D = h("<div/>").applyBlockStyles().attr("id", n("inputContainer")).appendTo(_),
            P = t.util.trim(a.clip.annote || ""),
            H = h("<div/>").applyBlockStyles().addClass(k).attr("id", n("annotationWrapper")).appendTo(D),
            B = h("<input/>").applyTextInputStyles().attr({
                id: i,
                placeholder: "Enter annotation, #tags and @mentions",
                title: "Enter annotation, #tags and @mentions",
                spellcheck: "true",
                type: "text",
                value: P ? P + " " : ""
            }).on("keypress keydown keyup", function (e) {
                if (e.keyCode === 27 || e.keyCode === 13 || e.metaKey || e.ctrlKey || e.altKey) return;
                e.stopPropagation()
            }).autocompletify({
                fixed: !0,
                attach: H,
                setCss: function (e, t, n) {
                    e.cssImportant(t, n)
                },
                createElement: function (e) {
                    var t = h("<" + e + "/>");
                    return t.css("display") === "block" ? t.applyBlockStyles() : t.applyInlineStyles()
                }
            }).stopPropagation().appendTo(H);
        if (this.user.guid && (h.support.boxModel || !/^IE/.test(this.browser))) {
            var j = [];
            for (var F = 0; F < this.user.boards.length; F++) j[F] = h.extend({}, this.user.boards[F]);
            h("<div/>").applyBlockStyles().attr("id", n("boardPicker")).appendTo(D).boardPicker({
                setCss: function (e, t, n) {
                    e.cssImportant(t, n)
                },
                createElement: function (e, t) {
                    var n = h("<" + e + "/>");
                    t === undefined && (t = n.css("display") === "block" ? "block" : "inline");
                    switch (t) {
                    case "block":
                        n.applyBlockStyles();
                        break;
                    case "inline":
                        e === "input" ? n.applyTextInputStyles() : n.applyInlineStyles();
                        break;
                    case "list":
                        n.applyListStyles();
                        break;
                    case "list-item":
                        n.applyListItemStyles()
                    }
                    return n
                },
                boards: j,
                createAvatarUrl: function (t) {
                    var n = e.CLIPBOARD.common;
                    return n.isValidEmail(t) && (t = null), n.createAvatarUrl(e.CLIPBOARD.config, "s", t)
                },
                loggedInUsername: this.user.login,
                onBoardCreated: function (e) {
                    p.trigger("boardCreated", e)
                },
                onBoardSelected: function (e, t) {
                    p.trigger("boardSelected", {
                        board: e,
                        selected: t
                    })
                }
            })
        }
        this.preferences.showClipperAutocompleteTriggers && (!h.browser.msie || h.support.boxModel) && (B.cssImportant("padding-right", "35px"), h("<div/>").applyBlockStyles().attr("id", n("autocompleteTrigger")).append(q("#")).append(q("@")).appendTo(H)), z().appendTo(_);
        var W = h("<div/>").applyInlineStyles().attr({
            id: n("cancel")
        }).text("Cancel").click(function () {
            f(p, "cancelButton")
        }).stopPropagation(),
            X = h("<button/>").applyInlineStyles().attr({
                id: n("save")
            }).text("Save").click(function () {
                u(p, a, "saveButton")
            }).stopPropagation();
        h("<div/>").applyBlockStyles().attr("id", n("buttonWrapper")).append(W, X).appendTo(_), h.browser.msie && !h.support.boxModel && W.cssImportant({
            right: 75
        }), h("<div/>").applyBlockStyles().attr("id", n("wrapper")).append(L, O, _).appendTo(this.$dialog), this.$dialog.appendTo("body"), B.add(A.find("input")).placeholder(!0), S < 770 && H.width(S - 180), a.clip.type === "bookmark" && this.browser !== "IE8" ? this.sandbox = t.util.createSandbox(h, M, a.data) : (this.sandbox = t.util.createSandbox(h, M), this.sandbox.addSandboxCss(this.staticBaseUrl, this.siteVersion), this.sandbox.html('<div class="' + t.util.clipContainerClass + '">' + '<div style="position:relative;z-index:0;overflow:hidden;">' + '<div style="position:relative;z-index:-9999;background-color:#FFF;">' + C + "</div>" + "</div>" + "</div>")), this.sandbox.$element.cssImportant({
            visibility: "visible",
            left: "auto",
            top: "auto",
            position: "static",
            width: T,
            height: N,
            opacity: 1
        }), t.util.assureFixedPositioning(this.$dialog);
        var V = 0,
            $ = 0;
        !h.support.boxModel && h.browser.msie && h.browser.version === "8.0" && (V = h(e).scrollTop(), $ = h(e).scrollLeft()), this.overlay.show();
        var J = 4;
        this.$dialog.cssImportant({
            left: a.clip.left - h(e).scrollLeft() - b + J,
            top: a.clip.top - h(e).scrollTop() - m - b - w + J,
            width: S,
            opacity: 0
        }).animate({
            opacity: 1
        }, 500, "linear").delay(100).animate({
            left: .5 * (d - S) + $,
            top: .5 * (v - x) + V
        }, 700, "easeOutExpo", function () {
            h(this).cssImportant("filter", "none");
            var e = h(this).find("#" + i),
                t = e.val().length;
            e.focus().caret(t, t)
        }), h(this.document).on("keydown." + o, function (e) {
            if (e.keyCode === 27) {
                if (h(".boardPicker_memberForm_clipboard_314159265:visible").length) return;
                f(p, "escapeKey")
            } else e.keyCode === 13 ? e.target === W[0] ? f(p, "cancelButton") : e.target !== X[0] && u(p, a, "enterKey") : p.modifier.matches(e) && e.keyCode === 80 && (R(), e.preventDefault())
        }), this.trigger("opened")
    }
    function p() {
        if (!this.isOpen()) return;
        this.trigger("closing"), this.$("#" + i).autocompleteMe("destroy"), this.$("#" + n("boardPicker")).boardPicker("destroy");
        var e = this,
            t = this.$;
        this.overlay.hide(), this.$dialog.stop(!0, !1).fadeOut(200, function () {
            e.$dialog.remove(), e.$dialog = null, e.sandbox && (e.sandbox.destroy(), e.sandbox = null), e.trigger("closed")
        }), this.clipAction = {
            publish: this.preferences.publishByDefault,
            postToFacebook: !1,
            postToTwitter: !1
        }, t(this.document).off("." + o)
    }
    function d(e, t) {
        return function (n) {
            if (n.status !== "success") return;
            c.call(e, t);
            var r = e.preferences["connectedTo" + t];
            r || e.trigger("socialNetworkConnected", {
                network: t
            }), e[t.toLowerCase() + "Window"].close({
                source: "external"
            })
        }
    }
    function v(e, t) {
        return function () {
            e.$("#" + n("actionMenuItem_" + t)).removeClass(r)
        }
    }
    function m(n) {
        t.ActivatableControl.call(this), t.EventEmitter.call(this), this.baseUri = n.baseUri, this.staticBaseUrl = n.staticBaseUrl, this.siteVersion = n.siteVersion, this.$ = n.$, this.domain = n.domain, this.document = n.document, this.browser = n.browser, this.$dialog = null, this.preferences = {}, this.sandbox = null, this.modifier = n.modifier, this.clipAction = {
            publish: !1,
            postToFacebook: !1,
            postToTwitter: !1
        }, this.user = {}, this.facebookWindow = new t.ui.PopupWindow(n, "about:blank", {
            name: "facebookStream" + t.util.idSuffix,
            width: 650,
            height: 310
        });
        var r = "twitter" + t.util.idSuffix,
            i = "https://" + this.domain + "/oauth/twitter/?source=clipper&origin=" + e.encodeURIComponent(t.ui.PopupWindow.getOrigin()) + "&proxy=" + r;
        this.overlay = t.ui.Overlay.getInstance(this.$), this.twitterWindow = new t.ui.PopupWindow(n, i, {
            name: r,
            width: 550,
            height: 550
        }), this.twitterWindow.on("externalWorkCompleted", d(this, "Twitter")).on("closed", v(this, "twitter")), this.facebookWindow.on("externalWorkCompleted", d(this, "Facebook")).on("closed", v(this, "facebook")), this.controls = [this.facebookWindow, this.twitterWindow, this.overlay]
    }
    var t = e.CLIPBOARD.client,
        r = n("spinner"),
        i = n("annotate"),
        s = n("titleInput"),
        o = "clipboard_review";
    t.util.inherit(m, new t.ActivatableControl, new t.EventEmitter), m.prototype.close = p, m.prototype.open = h, m.prototype.constructor = m, m.prototype.isOpen = function () {
        return !!this.$dialog
    }, m.prototype.doDeactivate = function () {
        if (!this.isOpen()) return;
        this.close(), this.sandbox && (this.sandbox.destroy(), this.sandbox = null)
    }, m.prototype.setPreferences = function (e) {
        this.preferences = e, this.clipAction.publish = !! this.preferences.publishByDefault
    }, m.prototype.setUserData = function (e) {
        this.user = e
    }, m.prototype.setLoginState = function (r) {
        this.isLoggedIn = r;
        if (this.isLoggedIn) {
            var i = "https://" + this.domain + "/utils/clipper-connect?origin=" + t.ui.PopupWindow.getOrigin() + "&proxy=" + this.facebookWindow.name;
            this.facebookWindow.url = "http://www.facebook.com/dialog/oauth/?scope=email,publish_stream&client_id=" + e.CLIPBOARD.config.facebook.appId + "&redirect_uri=" + e.encodeURIComponent(i) + "&display=popup" + "&response_type=token"
        }
        if (this.isOpen()) {
            var s = this.isLoggedIn ? "fadeIn" : "fadeOut";
            this.$("#" + n("actionMenuIcon_facebook")).parent()[s]("slow"), this.$("#" + n("actionMenuIcon_twitter")).parent()[s]("slow")
        }
    }, m.prototype.updateBoards = function (e, t) {
        var r = this.$("#" + n("boardPicker"));
        if (e) {
            r.boardPicker("showError");
            return
        }
        this.user.boards = this.user.boards.concat(t);
        for (var i = 0, s; i < t.length; i++) s = this.$.extend({}, t[i]), s.selected = !0, s.invitations && (s.numMembers = s.invitations.length), r.boardPicker("addBoard", s);
        r.boardPicker("toggleAddBoardForm").boardPicker("hide")
    }, t.ui.Review = m
})(window);
(function (e, t) {
    function r(e) {
        return "fixedBar_" + n.util.addSuffix(e)
    }
    function m(e, t) {
        var n = t.split(" ");
        for (var r = 0; r < n.length; r++) if (/Active_clipboard_314159265$/.test(n[r])) return n[r];
        return ""
    }
    function g(e) {
        return function (t, n) {
            return r(e + "Active")
        }
    }
    function y(e) {
        return /Active_clipboard_314159265\b/.test(e[0].className)
    }
    function E(e) {
        return function (t) {
            if (t.which === 3) return;
            var n = /^fixedBar_(.+?)_clipboard/.exec(e.$(this).attr("id"))[1];
            e.trigger("navigated", {
                source: "clip_" + n,
                type: n,
                status: y(e.$(this)) ? "disabled" : "enabled"
            })
        }
    }
    function S(t) {
        function f(e) {
            return s("<div/>").applyBlockStyles().attr("id", e).addClass(d)
        }
        function l() {
            return s("<ul/>").applyListStyles().attr("id", r("userMenuList")).append(s("<li/>").applyListItemStyles().attr("id", r("menuUserProfile")).append(s("<a/>").applyLinkStyles().attr({
                target: "_blank"
            }).append(s("<span/>").attr("id", r("userName")).applyInlineStyles().addClass(a)).append(s("<span/>").applyInlineStyles().addClass(r("subtext")).append("View Your Profile")))).append(s("<li/>").applyListItemStyles().addClass(r("divider"))).append(s("<li/>").applyListItemStyles().attr("id", r("menuSettings")).click(function () {
                i.trigger("settingsLaunched")
            }).append(s("<span/>").applyInlineStyles().addClass(a).text("Settings"))).append(s("<li/>").applyListItemStyles().attr("id", r("menuHelp")).click(function () {
                i.trigger("tutorialLaunched")
            }).append(s("<span/>").applyInlineStyles().addClass(a).text("Tutorial")))
        }
        var i = this,
            s = this.$;
        this.$container = s("<div/>").applyBlockStyles().attr("id", r("container")).append(s("<div/>").applyBlockStyles().attr("id", r("innerWrap")).append(s("<a/>").applyLinkStyles().attr({
            target: "_blank",
            href: this.baseUri,
            title: "Go to " + this.baseUri.replace(/^https?:\/\//, "").replace(/\/+$/, ""),
            id: r("logo")
        })).append(s("<div/>").applyBlockStyles().text("News!").attr({
            id: w.notificationAlert,
            title: "Ooh! New stuff!"
        })).append(s("<div/>").applyBlockStyles().attr("id", r("loginForm")).append(s("<div/>").applyBlockStyles().attr("id", r("loginButton")).click(function () {
            i.trigger("loginClicked", {
                $element: s(this)
            })
        }).text("Login").stopPropagation()).append(s("<div/>").applyBlockStyles().attr("id", r("registerButton")).click(function () {
            i.trigger("registerClicked", {
                $element: s(this)
            })
        }).text("Register").stopPropagation())).append(s("<div/>").applyBlockStyles().hide().attr("id", r("menu")).append(s("<div/>").applyBlockStyles().addClass(r("waiting")).hide()).append(f(w.rectangle).append(s("<div/>").applyBlockStyles().addClass(o)).addClass(v).attr("title", "Clip section of page").append(s("<span/>").applyInlineStyles().addClass(u).text("Clip"))).append(f(w.bookmark).append(s("<div/>").applyBlockStyles().addClass(o)).addClass(v).attr("title", "Clip whole page (" + this.modifier.toString() + " + b)").append(s("<span/>").applyInlineStyles().addClass(u).text("Page"))).append(f(w.image).append(s("<div/>").applyBlockStyles().addClass(o)).addClass(v).attr("title", "Clip an image").append(s("<span/>").applyInlineStyles().addClass(u).text("Image"))).append(f(w.text).append(s("<div/>").applyBlockStyles().addClass(o)).addClass(v).attr("title", "Clip plain text").append(s("<span/>").applyInlineStyles().addClass(u).text("Text"))).append(f(w.reader).append(s("<div/>").applyBlockStyles().addClass(o)).addClass(v).attr("title", "Save page for reading").append(s("<span/>").applyInlineStyles().addClass(u).text("Reader")))).append(s("<div/>").applyBlockStyles().attr("id", r("userMenu")).hover(function () {
            x.call(this, s)
        }, function () {
            s(this).find("#" + r("userDropdown")).hide()
        }).append(s("<div/>").applyBlockStyles().addClass(r("waiting"))).append(s("<a/>").applyBlockStyles().attr({
            id: r("userLink"),
            target: "_blank"
        }).append(s("<img/>").applyInlineStyles().showPlaceholderOnError().attr({
            id: r("userAvatar"),
            src: e.CLIPBOARD.common.createAvatarUrl(e.CLIPBOARD.config, "s")
        })).append(s("<span/>").applyInlineStyles())).append(s("<div/>").applyBlockStyles().attr("id", r("userDropdown")).append(l))).append(s("<div/>").applyBlockStyles().attr("id", r("sep"))).append(s("<div/>").applyBlockStyles().attr({
            title: "close",
            id: r("close")
        }).append(s("<div/>").attr("id", r("closeSprite")))).append(s("<div/>").applyBlockStyles().attr("id", w.flyout).hide())).appendTo("body");
        var c = this.$message = s("<div/>").applyBlockStyles().attr("id", w.message).appendTo("body");
        n.util.flagAsUnclippable(this.$container), n.util.assureFixedPositioning(this.$container), n.util.flagAsUnclippable(c), n.util.assureFixedPositioning(c), this.browser === "IE8" && s("#" + r("userDropdown")).cssImportant("border", "1px solid #CCCCCC"), s("#" + w.notificationAlert).click(function (e) {
            if (e.which === 3) return;
            i.trigger("notificationAlertClicked")
        }), s("." + v).mousedown(E(i)).stopPropagation(), s("#" + w.close).click(function () {
            i.trigger("navigated", {
                source: "close"
            })
        }).stopPropagation(), T.call(this), this.notify(this.hasUnreadNotifications), n.util.assureFixedPositioning(this.$container), this.show(t)
    }
    function x(e) {
        e(this).find("a").is(":visible") && e(this).find("#" + r("userDropdown")).show()
    }
    function T() {
        var t = this.$,
            n = this,
            i = t("#" + r("userLink")),
            s = t("#" + r("userName")),
            o = i.siblings("." + r("waiting"));
        if (this.user.login) {
            o.hide(), i.show().attr("title", "Logged in as " + this.user.login).attr("href", this.baseUri + this.user.login).click(function () {
                n.trigger("menuBarNameClicked")
            }).find("span").text(" " + this.user.login + " ").end().find("#" + r("userAvatar")).attr("src", e.CLIPBOARD.common.createAvatarUrl(e.CLIPBOARD.config, "s", this.user.login));
            var u = this.user.name || this.user.login;
            s.text(u), t("#" + r("menuUserProfile") + " a").attr("href", this.baseUri + this.user.login)
        } else i.hide(), o.show()
    }
    function N() {
        this.$("#" + r("menu")).find("." + r("waiting")).hide().end().find("." + r("menuItem")).show()
    }
    function C(e) {
        n.ActivatableControl.call(this), n.EventEmitter.call(this), this.$container = null, this.$bookmark = null, this.baseUri = e.baseUri, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion, this.$ = e.$, this.modifier = e.modifier, this.activeTab = null, this.isLoggedIn = !1, this.browser = e.browser, this.hasUnreadNotifications = !1, this.user = {}, this.preferences = null
    }
    var n = e.CLIPBOARD.client,
        i = 35,
        s = r("inlineIcon"),
        o = r("sprite"),
        u = r("buttonLabel"),
        a = r("popupLabel"),
        f = r("preferencesBlock"),
        l = r("selectedTab"),
        c = r("helpBlock"),
        h = r("helpText"),
        p = r("helpTextLink"),
        d = r("menuItem"),
        v = r("selectorOption"),
        b = function () {
            function o(e) {
                var t = this.$;
                if (e.data) switch (e.text) {
                    case n.util.strings.save_default:
                        var i = t("<a/>").applyLinkStyles().attr({
                            id: r("savedMessage"),
                            href: e.data.clipUrl,
                            title: "View clip on clipboard.com",
                            target: "_blank"
                        }).append(t("<div/>").applyBlockStyles()).append(t("<span/>").applyInlineStyles().attr("id", r("savedText")).append(e.text).append(t("<span/>").applyInlineStyles().attr("id", r("savedAside")).text("Go to clip")));
                        return t("<div/>").append(i).html();
                    default:
                        return e.text
                }
                return e
            }
            function a(n, a, l) {
                var c = this.$,
                    h = c("#" + r("menu")).position();
                if (!h) return;
                var p = c("#" + w.message).removeClass().addClass(l).html(o.call(this, n)).height(0).show().mouseover(function () {
                    u = !0
                }).mouseout(function () {
                    u = !1
                });
                p.animate({
                    height: 37
                }, 100, "linear");
                var d = this,
                    v = a === t ? i : a;
                a === t || a >= 0 ? s = e.setTimeout(function () {
                    f.call(d)
                }, v) : s = 0
            }
            function f(t) {
                function o() {
                    i("#" + r("waiting")).hide(), i("#" + r("menu")).show(), n.animate({
                        height: 0
                    }, 250, "linear", function () {
                        n.hide(), t && t()
                    })
                }
                var n = this.$("#" + w.message),
                    i = this.$;
                s = e.clearTimeout(s), u ? n.one("mouseout", o) : o()
            }
            var i = 3e3,
                s, u = !1;
            return {
                showMessage: function (e, t) {
                    f.call(this, this.$.proxy(function () {
                        a.call(this, e, t, r("messageSuccess"))
                    }, this))
                },
                hideMessage: f,
                showErrorMessage: function (e, t) {
                    f.call(this, this.$.proxy(function () {
                        a.call(this, e, t, r("messageError"))
                    }, this))
                }
            }
        }(),
        w = {
            rectangle: r("rectangle"),
            home: r("home"),
            image: r("image"),
            reader: r("reader"),
            close: r("close"),
            bookmark: r("bookmark"),
            text: r("text"),
            help: r("help"),
            preferences: r("preferences"),
            message: r("message"),
            notificationAlert: r("notificationAlert"),
            flyout: r("flyout"),
            tutorialLauncher: r("tutorialLauncher")
        };
    n.util.inherit(C, new n.ActivatableControl, new n.EventEmitter), C.prototype.constructor = C, C.prototype.enableClipping = function (e) {
        this.$("." + v + "." + d).removeClass(m), this.$("#" + w[e]).addClass(g(e))
    }, C.prototype.disableClipping = function (e) {
        this.hideMessage(), this.$("." + v).removeClass(m)
    }, C.prototype.doActivate = function () {
        this.$container || S.call(this)
    }, C.prototype.doDeactivate = function () {
        this.hide(), this.activeTab = null
    }, C.prototype.show = function (e) {
        if (!this.$container) return;
        this.$container.cssImportant({
            bottom: -50,
            opacity: 0
        }).animate({
            bottom: 0,
            opacity: 1
        }, 200, e), this.$("#" + r("userMenu")).show(), this.$("#" + r("menu")).show()
    }, C.prototype.hide = function () {
        if (this.$container) {
            var e = this;
            this.$container.animate({
                height: 0
            }, 200, function () {
                e.$container.remove(), e.$container = null
            })
        }
    }, C.prototype.showMessage = function (e, t) {
        N.call(this), b.showMessage.call(this, e, t)
    }, C.prototype.hideMessage = function () {
        b.hideMessage.call(this)
    }, C.prototype.showErrorMessage = function (e, t) {
        N.call(this), b.showErrorMessage.call(this, e, t)
    }, C.prototype.showLoadingMessage = function () {
        var e = this.$("#" + r("menu"));
        e.find("." + r("waiting")).show(), e.find("." + r("menuItem")).hide()
    }, C.prototype.setPreferences = function (e) {
        var t = !this.preferences;
        this.preferences = e
    }, C.prototype.setUserData = function (e) {
        this.$("#" + r("userMenu")).show(), this.$("#" + r("menu")).show(), this.$("#" + r("loginForm")).hide(), this.user = e, T.call(this)
    }, C.prototype.setLoginState = function (e) {
        this.isLoggedIn = e, this.isLoggedIn || (this.$("#" + r("userMenu")).hide(), this.$("#" + r("menu")).hide(), this.$("#" + r("loginForm")).show())
    }, C.prototype.notify = function (e) {
        this.hasUnreadNotifications = e, this.$("#" + w.notificationAlert).toggle(e)
    }, n.ui.FixedBar = C
})(window);
(function (e) {
    function r(e) {
        return Math.floor(e + .5)
    }
    function i(e) {
        function t(t, n) {
            return function (i) {
                e.style(i.elem, t, Math.max(n, r(i.now)) + i.unit)
            }
        }
        if (e.fx.step.width.clipboarded) return;
        e.fx.step.width = t("width", 0), e.fx.step.height = t("height", 0), e.fx.step.left = t("left", -Infinity), e.fx.step.top = t("top", -Infinity), e.fx.step.width.clipboarded = !0
    }
    function s(e) {
        var n = this;
        if (!this.$hint) return;
        var r = 5e3;
        e && (r = 0), this.$hint.stop(!0, !1).delay(r).fadeOut(500, function () {
            t.util.retireFixedPositioning(n.$hint), n.$hint.remove(), n.$hint = null
        })
    }
    function o() {
        var e = "rgb(" + t.util.rectColors[this.preferences.rectangleColor].stopColor.join(",") + ")";
        this.getBoxes().cssImportant("background-color", e)
    }
    function u() {
        var t = [],
            r = this;
        this.$(e.document).on("keydown.easter", function (e) {
            t.push(e.keyCode);
            while (t.length > 10) t.shift();
            !n && t.toString() === "38,38,40,40,37,39,37,39,66,65" && (n = !0, f.call(r))
        })
    }
    function a() {
        this.$(e.document).off(".easter"), n = !1
    }
    function f() {
        var e = '<iframe src="https://www.youtube.com/embed/kxopViU98Xo?autoplay=1&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;modestbranding=1&amp;controls=0" frameborder="0"></iframe>',
            n = this.$("<div/>").applyBlockStyles().cssImportant({
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "100%"
            }).html(e).find("iframe").cssImportant({
                position: "absolute",
                top: 0,
                left: 0,
                opacity: .5,
                width: "100%",
                height: "100%"
            });
        t.util.flagAsUnclippable(n.children().andSelf()), this.$rect.append(n)
    }
    function l(e) {
        t.EventEmitter.call(this), t.ActivatableControl.call(this), this.$ = e.$, this.document = e.document, this.bodyOffset = e.bodyOffset, this.support = e.support, this.preferences = e.preferences, this.browser = e.browser, this.$rect = null, this.dimensions = {}, this.isBusy = !1, this.inverted = this.preferences.rectangleInverse, this.$top = null, this.$left = null, this.$right = null, this.$bottom = null, this.$hint = null, i(this.$)
    }
    var t = e.CLIPBOARD.client,
        n = !1;
    t.util.inherit(l, new t.ActivatableControl, new t.EventEmitter), l.prototype.constructor = l, l.prototype.doActivate = function () {
        if (this.$rect) return;
        u.call(this), this.$rect = this.$("<div/>").applyBlockStyles().attr("id", "zoom" + t.util.idSuffix).appendTo("body");
        if (!this.inverted) this.support.rgba ? this.$rect.cssImportant("opacity", 1) : this.$rect.cssImportant("opacity", .5), t.util.applyGradient(this.$rect, this.preferences.rectangleColor);
        else {
            this.$rect.addClass("zoomInverted" + t.util.idSuffix), this.$top = this.$("<div/>").applyBlockStyles().addClass("invertedBox" + t.util.idSuffix).appendTo("body"), this.$left = this.$top.clone().appendTo("body"), this.$right = this.$top.clone().appendTo("body"), this.$bottom = this.$top.clone().appendTo("body"), this.$top.cssImportant({
                left: 0,
                top: 0
            }), this.$left.add(this.$bottom).cssImportant({
                left: 0
            }), t.util.flagAsUnclippable(this.getBoxes()), o.call(this);
            var n = this.$(e).width(),
                r = this.$(e).height(),
                i = this.$(this.document),
                s = i.scrollTop(),
                a = i.scrollLeft(),
                f = i.width(),
                l = i.height();
            this.$top.cssImportant({
                height: r / 2 + s
            }), this.$left.add(this.$right).add(this.$bottom).cssImportant({
                top: r / 2 + s
            }), this.$left.cssImportant({
                width: n / 2 + a,
                height: 0
            }), this.$right.cssImportant({
                left: n / 2 + a,
                width: f - n / 2 - a,
                height: 0
            }), this.$bottom.cssImportant({
                height: l - r / 2 - s
            }), this.$top.add(this.$bottom).cssImportant({
                width: f
            }), this.$rect.cssImportant({
                left: n / 2 + a,
                top: n / 2 + s
            }), this.getBoxes().fadeTo(300, .6);
            if (this.preferences.showClipperHint) {
                var c = "shift";
                this.browser === "Chrome" && (c = "alt"), this.$hint = this.$("<div/>").applyBlockStyles().attr("id", "zoomHelp" + t.util.idSuffix).text("Click or drag to select, " + c + " + mousewheel to zoom").appendTo("body"), t.util.assureFixedPositioning(this.$hint), t.util.flagAsUnclippable(this.$hint)
            }
        }
        t.util.flagAsUnclippable(this.$rect)
    }, l.prototype.doDeactivate = function () {
        if (!this.$rect) return;
        a.call(this), s.call(this, !0);
        var n = this.$(this.document),
            r = this,
            i = this.$;
        this.inverted ? this.moveTo({
            left: n.scrollLeft(),
            top: n.scrollTop(),
            width: i(e).width(),
            height: i(e).height()
        }, null, function () {
            r.$rect.remove(), r.$rect = null, r.getBoxes().remove(), r.$top = r.$left = r.$right = r.$bottom = null
        }) : (this.stop(), this.$rect.animate({
            width: 0,
            height: 0,
            left: i(e).width() + n.scrollLeft() - 130,
            top: n.scrollTop() + 40,
            opacity: 0
        }, {
            duration: 350,
            easing: "easeInOutQuad",
            complete: function () {
                r.stop(), t.util.retireFixedPositioning(r.$rect), r.$rect.remove(), r.$rect = null
            }
        }))
    }, l.prototype.hide = function () {
        this.$rect && this.$rect.add(this.getBoxes()).hide()
    }, l.prototype.show = function () {
        this.$rect && this.$rect.add(this.getBoxes()).show()
    }, l.prototype.moveTo = function (e, n, i) {
        function l(e) {
            f.$rect.cssImportant({
                "border-top-width": e,
                "border-bottom-width": e,
                "border-right-width": e,
                "border-left-width": e
            })
        }
        n = n || "easeOutExpo";
        var o = this.$,
            u = this.inverted ? 0 : 2,
            a = 5,
            f = this;
        s.call(this), this.dimensions = e, e.left -= u + a + this.bodyOffset.left, e.top -= u + a + this.bodyOffset.top, e.width += 2 * (u + a), e.height += 2 * (u + a), t.util.retireFixedPositioning(this.$rect), this.getBoxes().each(function () {
            t.util.retireFixedPositioning(o(this))
        }), l(u), this.stop(), this.isBusy = !0;
        var c = o(this.document).width(),
            h = o(this.document).height(),
            p = n === "easeOutExpo" ? 400 : 250;
        this.$rect.animate(e, {
            duration: p,
            easing: n,
            complete: function () {
                f.stop(), i && i()
            },
            step: this.inverted ? function (e, t) {
                var n = r(e);
                f.$top.add(f.$bottom).width(c);
                switch (t.prop) {
                case "left":
                    f.$left.width(n);
                    break;
                case "top":
                    f.$top.height(n), f.$left.add(f.$right).cssImportant("top", n).height(f.$rect.height());
                    break;
                case "width":
                    var i = parseInt(f.$rect.css("left")),
                        s = i + n;
                    f.$right.cssImportant("left", s).width(c - s);
                    break;
                case "height":
                    var o = parseInt(f.$rect.css("top")),
                        u = o + n;
                    f.$bottom.cssImportant("top", u).height(h - u), f.$left.add(f.$right).height(n)
                }
            } : null
        })
    }, l.prototype.stop = function () {
        this.$rect.stop(!0, !1), this.isBusy = !1
    }, l.prototype.setPreferences = function (n) {
        this.preferences = n;
        if (!this.$rect) {
            this.inverted = this.preferences.rectangleInverse;
            return
        }
        if (this.inverted === this.preferences.rectangleInverse) this.inverted ? o.call(this) : t.util.applyGradient(this.$rect, this.preferences.rectangleColor);
        else {
            this.deactivate();
            var r = this;
            e.setTimeout(function () {
                r.inverted = r.preferences.rectangleInverse, r.activate()
            }, 500)
        }
    }, l.prototype.distanceFromCoordinates = function (e) {
        if (!this.dimensions.width) return Infinity;
        var t = e.clientX + this.$(this.document).scrollLeft(),
            n = e.clientY + this.$(this.document).scrollTop(),
            r = Math.max(this.dimensions.left, Math.min(t, this.dimensions.left + this.dimensions.width)),
            i = Math.max(this.dimensions.top, Math.min(n, this.dimensions.top + this.dimensions.height)),
            s = r - t,
            o = i - n;
        return Math.sqrt(s * s + o * o)
    }, l.prototype.getBoxes = function () {
        return this.inverted ? this.$top.add(this.$right).add(this.$left).add(this.$bottom) : this.$([])
    }, t.selectors.components.SelectionRectangle = l
})(window);
(function (e) {
    function r(e) {
        if (e.which === 3) return;
        this.state === u.state.idle && (this.state = u.state.potentialDrag, this.dragStart = {
            x: e.clientX,
            y: e.clientY
        })
    }
    function i(t) {
        function s(t, n) {
            var s = i("html,body"),
                o = "scroll" + t,
                u = s[t === "Left" ? "width" : "height"](),
                a = u * 3,
                f = {};
            return f[o] = (n < 0 ? "-=" : "+=") + u,
            function () {
                r.scrollable = !0, s.animate(f, a, "linear", function () {
                    r.scrollable = !1
                }), e.setInterval(function (t) {
                    r.scrollable || (s.stop(!0, !1), e.clearInterval(t))
                }, 20)
            }
        }
        t.preventDefault(), this.moveTimeoutId && e.clearTimeout(this.moveTimeoutId);
        var r = this,
            i = this.$,
            o = 50,
            a;
        t.clientX < o ? a = s("Left", -1) : t.clientX > i(e).width() - o ? a = s("Left", 1) : t.clientY < o ? a = s("Top", -1) : t.clientY > i(e).height() - o ? a = s("Top", 1) : r.scrollable = !1, this.moveTimeoutId = e.setTimeout(function () {
            r.state === u.state.potentialDrag && (r.state = u.state.dragging, r.trigger("dragStarted", {
                x: r.dragStart.x,
                y: r.dragStart.y
            })), r.state === u.state.dragging ? (r.trigger("dragged", {
                x: t.clientX,
                y: t.clientY
            }), a && a()) : r.trigger("mouseMoved", {
                x: t.clientX,
                y: t.clientY
            })
        }, n)
    }
    function s(e) {
        if (e.which === 3) return;
        this.scrollable = !1, this.trigger("selectionChosen", {
            state: this.state,
            x: e.clientX,
            y: e.clientY
        }), this.state = u.state.idle
    }
    function o(e, t, n, r) {
        if (this.state === u.state.dragging) return !0;
        if (!e.metaKey && !e.shiftKey && !e.altKey && !e.ctrlKey) return !0;
        var i = 1e3 / this.mouseWheelEventsPerSecond;
        return (new Date).getTime() - this.lastMouseWheelEvent < i ? !1 : (this.trigger("zoomed", {
            x: e.clientX,
            y: e.clientY,
            delta: {
                x: n,
                y: r
            }
        }), this.lastMouseWheelEvent = (new Date).getTime(), !1)
    }
    function u(e) {
        t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.state = u.state.idle, this.$element = null, this.moveTimeoutId = null, this.scrollable = !1, this.mouseWheelEventsPerSecond = 5, this.lastMouseWheelEvent = 0, this.dragStart = {
            x: null,
            y: null
        }
    }
    var t = e.CLIPBOARD.client,
        n = 50;
    u.state = {
        idle: "idle",
        potentialDrag: "potentialDrag",
        dragging: "dragging"
    }, t.util.inherit(u, new t.ActivatableControl, new t.EventEmitter), u.prototype.constructor = u, u.prototype.doActivate = function () {
        if (this.$element) return;
        var e = this.$;
        this.$element = e("<div/>").applyBlockStyles().attr("id", "canvas" + t.util.idSuffix).mousedown(e.proxy(r, this)).mousemove(e.proxy(i, this)).mouseup(e.proxy(s, this)).mousewheel(e.proxy(o, this)).stopPropagation().appendTo("body"), t.util.assureFixedPositioning(this.$element), t.util.flagAsUnclippable(this.$element)
    }, u.prototype.doDeactivate = function () {
        if (!this.$element) return;
        this.moveTimeoutId && (this.moveTimeoutId = e.clearTimeout(this.moveTimeoutId)), t.util.retireFixedPositioning(this.$element), this.$element.remove(), this.$element = null, this.state = u.state.idle, this.dragStart = {
            x: null,
            y: null
        }, this.scrollable = !1
    }, u.prototype.hide = function () {
        this.$element && this.$element.hide()
    }, u.prototype.show = function () {
        this.$element && this.$element.show()
    }, u.prototype.setCss = function (e) {
        this.$element && this.$element.cssImportant(e)
    }, t.selectors.components.SelectionCanvas = u
})(window);
(function (e) {
    function i(r) {
        function g() {
            v.remove(), s.remove(), m.remove(), d.remove()
        }
        var i = this.$,
            s = i("<div/>").css({
                position: "fixed",
                top: 0,
                left: 0,
                background: "#000000",
                zIndex: n,
                opacity: .5,
                width: "100%",
                height: "100%"
            }),
            o = "#faq-third-party-cookies",
            u = e.navigator.userAgent;
        /MSIE/i.test(u) ? o += "-ie" : /Firefox/i.test(u) ? o += "-firefox" : /Chrome/i.test(u) ? o += "-chrome" : /Safari/i.test(u) && (o += "-safari");
        var a = "";
        switch (r) {
        case "cookies":
            a = '<p style="">The clipper requires 3rd party cookies to be enabled. Head over to our <a target="_blank" href="' + this.baseUri + "help" + o + '" style="color: #469CB9">help page</a>' + " for instructions on how to enable them.</p>"
        }
        a += '<p style="position: absolute; bottom: 40px; margin: 0 auto; width: 90%">Click anywhere to dismiss this message.</p>';
        var f = 600,
            l = 440,
            c = "3px",
            h = "-3px 3px 10px rgba(0,0,0,0.75)",
            p = {
                top: "50%",
                left: "50%",
                display: "none",
                width: f,
                height: l,
                padding: "20px",
                "margin-left": -f / 2,
                "margin-top": -l / 2,
                position: "fixed"
            }, d = i("<div/>").css(i.extend({}, p, {
                background: "#eee",
                "z-index": n + 3
            })).appendTo("body"),
            v = i("<div/>").css(i.extend({}, p, {
                background: "transparent url(" + this.staticBaseUrl + "/images/" + this.siteVersion + "/logo1.png) no-repeat center center",
                opacity: .3,
                "z-index": n + 4
            })),
            m = i("<div/>");
        m.css(i.extend({}, p, {
            zIndex: n + 5,
            "-webkit-border-radius": c,
            "-moz-border-radius": c,
            "border-radius": c,
            "-webkit-box-shadow": h,
            "box-shadow": h,
            background: "transparent",
            color: "rgb(57,39,27)",
            "text-align": "center",
            "font-family": '"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
            "font-size": "22px"
        })).html(a), i.each([d, s, v, m], function () {
            this.appendTo("body").fadeIn().click(g)
        }), t.util.assureFixedPositioning(s)
    }
    function s(e) {
        return function () {
            f.call(e)
        }
    }
    function o(e) {
        return function () {
            a.call(e)
        }
    }
    function u(e) {
        return function (t) {
            e.trigger("reviewConfirmed", t), e.review.close();
            var n = t.clip;
            n.postToFacebook = t.reviewData.postToFacebook, n.tweet = t.reviewData.tweet, n.annotation = t.reviewData.annotation, n["private"] = !t.reviewData.published, n.title = t.reviewData.title || n.title, n.boards = t.reviewData.boards, e.trigger("clipConfirmed", {
                clip: n
            })
        }
    }
    function a() {
        this.$(this.document).on("keyup." + r, this.$.proxy(l, this))
    }
    function f() {
        this.$(this.document).off("." + r), this.$(e).off("." + r)
    }
    function l(e) {
        var t = 66;
        this.modifier.matches(e) && e.keyCode === t && (e.preventDefault(), e.stopImmediatePropagation(), this.trigger("bookmarked", {
            source: "keyboard"
        }))
    }
    function c(e) {
        return {
            review: new t.ui.Review(e),
            fixedBar: new t.ui.FixedBar(e)
        }
    }
    function h() {
        var e = this;
        a.call(this), this.review.on("opening", s(this)).on("closing", o(this)).on("confirmed", u(this)).on("canceled", function () {
            e.review.close()
        }).on("socialNetworkConnected", function (t) {
            var n = {
                preferences: {}
            };
            t.network === "Twitter" ? n.preferences.connectedToTwitter = !0 : t.network === "Facebook" && (n.preferences.connectedToFbStream = !0), e.trigger("preferencesUpdated", n)
        }).bubble("preferencesUpdated").to(this).bubble("autocompleteTriggered").to(this).bubble("boardCreated").to(this).bubble("boardSelected").to(this).bubble("closing").to(this, "reviewClosing").bubble("closed").to(this, "reviewClosed").bubble("opening").to(this, "reviewOpening").bubble("canceled").to(this, "reviewCanceled"), this.fixedBar.on("notificationAlertClicked", function () {
            e.notificationDialog.open(e.newNotificationContent), e.trigger("notificationRead")
        }).on("loginClicked", function (t) {
            e.loginWindow.open(t.$element)
        }).on("registerClicked", function (t) {
            e.registerWindow.open(t.$element)
        }).on("tutorialLaunched", function () {
            e.doFirstRun()
        }).on("settingsLaunched", function () {
            e.doSettings()
        }).on("menuBarNameClicked", function () {
            e.trigger("navigated", {
                source: "home",
                catalyst: "menu bar"
            })
        }).bubble("navigated").to(this).bubble("bookmarked").to(this).bubble("preferencesUpdated").to(this).bubble("displayed").to(this, "controlsDisplayed"), this.loginWindow.on("opened", function () {
            e.registerWindow.close()
        }).on("closed", function () {
            e.trigger("userDataRequested")
        }), this.registerWindow.on("opened", function () {
            e.loginWindow.close()
        }).on("closed", function () {
            e.trigger("userDataRequested")
        }), this.tutorial.bubble("slideLoaded").to(this, "tutorialSlideLoaded").on("closed", function (t) {
            e.trigger("firstRunCompleted", t)
        }), this.notificationDialog.bubble("opened").to(this, "newNotificationViewed")
    }
    function p(e, n) {
        t.UiController.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.baseUri = e.baseUri, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion, this.modifier = e.modifier, this.$ = e.$, this.document = e.document, this.shouldShowReview = e.preferences.reviewClip, n = t.util.merge(t.util.merge({}, c(e)), n), this.review = n.review, this.fixedBar = n.fixedBar, this.loginWindow = t.ui.PopupWindow.factory("login", e), this.registerWindow = t.ui.PopupWindow.factory("register", e), this.tutorial = new t.ui.Tutorial(e), this.settings = new t.ui.Settings(e, this.fixedBar), this.notificationDialog = new t.ui.NotificationDialog(e), this.controls = [this.review, this.fixedBar, this.loginWindow, this.registerWindow, this.tutorial, this.settings, this.notificationDialog], h.call(this)
    }
    var t = e.CLIPBOARD.client,
        n = 9999999,
        r = "clipboard_ui";
    t.util.inherit(p, t.UiController.prototype, t.ActivatableControl.prototype, t.EventEmitter.prototype), p.prototype.constructor = p, p.prototype.doDeactivate = function () {
        this.hideNotification()
    }, t.util.merge(p.prototype, {
        showLoadingMessage: function () {
            this.fixedBar.showLoadingMessage()
        },
        show3rdPartyCookiesErrorMessage: function () {
            i.call(this, "cookies")
        },
        showNotification: function (e, t) {
            this.fixedBar.showMessage(e, t)
        },
        hideNotification: function (e) {
            this.fixedBar.hideMessage(e)
        },
        showErrorNotification: function (e, t) {
            this.fixedBar.showErrorMessage(e, t)
        },
        enableClipping: function (e) {
            this.fixedBar.enableClipping(e)
        },
        disableClipping: function (e) {
            this.fixedBar.disableClipping(e)
        },
        handleExtraction: function (e) {
            this.shouldShowReview ? this.review.open(e) : this.trigger("clipConfirmed", e)
        },
        setPreferences: function (e) {
            this.shouldShowReview = !! e.reviewClip, this.fixedBar.setPreferences(e), this.review.setPreferences(e)
        },
        setUserData: function (e) {
            this.fixedBar.setUserData(e), this.review.setUserData(e)
        },
        setLoginState: function (e) {
            this.fixedBar.setLoginState(e), this.review.setLoginState(e)
        },
        setNewNotificationContent: function (e) {
            this.newNotificationContent = e, this.fixedBar.notify( !! this.newNotificationContent)
        },
        doFirstRun: function () {
            this.tutorial.open()
        },
        doSettings: function () {
            this.settings.open()
        },
        updateBoards: function (e, t) {
            this.review.updateBoards(e, t)
        }
    }), t.ui.FixedBarUiController = p
})(window);
(function (e) {
    function n(e) {
        t.Extractor.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.baseData = e.baseData, this.document = e.document, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion
    }
    function r() {
        return Date.now ? Date.now() : (new Date).valueOf()
    }
    var t = e.CLIPBOARD.client;
    n.prototype.constructor = n, t.util.inherit(n, t.Extractor.prototype, t.ActivatableControl.prototype, t.EventEmitter.prototype), n.prototype.extract = function (e, n) {
        var i = r(),
            s = this.$,
            o = this,
            u = t.util.normalizeUri(e.$element.attr("src"), this.baseData),
            a = s("<img/>").attr("src", u),
            f = s("<div/>").append(a).html();
        o.trigger("extracted", {
            elapsedTime: r() - i,
            html: f,
            text: e.text,
            dimensions: {
                width: e.width,
                height: e.height
            },
            clipType: n.clipType,
            selectionType: n.selectionType,
            left: n.left,
            top: n.top
        })
    }, n.prototype.type = "clip", t.extractors.ImageExtractor = n
})(window);
(function (e) {
    function n(e, n, r) {
        t.Selector.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.document = e.document, this.name = n, this.activated = !1, this.isNull = !0, this.getExtractor = function () {
            return new r(e)
        }
    }
    var t = e.CLIPBOARD.client;
    t.util.inherit(n, t.Selector.prototype, t.ActivatableControl.prototype, t.EventEmitter.prototype), n.prototype.constructor = n, n.prototype.doActivate = function () {
        if (this.activated) return;
        this.activated = !0, this.select()
    }, n.prototype.doDeactivate = function () {
        this.activated = !1
    }, n.prototype.getSelection = function () {
        return null
    }, n.prototype.select = function () {
        var e = this.getSelection();
        this.trigger("selectionEnded", {
            selectionType: this.name,
            clipType: this.name
        })
    }, t.selectors.NullSelector = n
})(window);
(function (e) {
    function u(e) {
        return function (t) {
            t.keyCode === 27 && e.trigger("canceled", {
                source: "escapeKey"
            })
        }
    }
    function a(e) {
        t.Selector.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.document = e.document, this.name = "image", this.activated = !1, this.$container = null, this.$overlay = null, this.getExtractor = function () {
            return new t.extractors.ImageExtractor(e)
        }
    }
    var t = e.CLIPBOARD.client,
        n = "imageSelector_overlay" + t.util.idSuffix,
        r = "imageSelector_container" + t.util.idSuffix,
        i = "imageSelector_image" + t.util.idSuffix,
        s = "imageSelector_selected" + t.util.idSuffix,
        o = "clipboard_image_selector";
    t.util.inherit(a, t.Selector.prototype, t.ActivatableControl.prototype, t.EventEmitter.prototype), a.prototype.constructor = a, a.prototype.doActivate = function () {
        function g(t) {
            var n = a(e).width(),
                r = a(e).height(),
                i = Math.random() < .5 ? -300 : n,
                s = Math.random() * r,
                o = t.data("left"),
                u = t.data("top");
            return o < n && u < r ? {
                left: i,
                top: s,
                anim: !0
            } : {
                left: o,
                top: u,
                anim: !1
            }
        }
        if (this.activated) return;
        this.activated = !0;
        var o = 750,
            u = 50,
            a = this.$,
            f = this,
            l = a("img").filter(function () {
                return a(this).width() >= u && a(this).height() >= u
            });
        if (l.length === 0) {
            this.deactivate(), this.trigger("selectionFailed", {
                reason: "noImages"
            });
            return
        }
        var c = this.$overlay = a("<div/>").attr("id", n).cssImportant("opacity", 0).appendTo("body").animate({
            opacity: .7
        }, o);
        t.util.assureFixedPositioning(c), t.util.flagAsUnclippable(c);
        var h = this.$container = a("<div/>").applyBlockStyles().attr("id", r).cssImportant("opacity", 0).click(function () {
            f.trigger("canceled", {
                source: "backgroundClick"
            })
        }),
            p = a("<div/>").applyBlockStyles().addClass(i).append(a("<img/>").applyInlineStyles());
        l.each(function () {
            var e = a(this).attr("src");
            if (!e) return;
            var t = p.clone().click(function (e) {
                return h.find("." + s).removeClass(s), a(this).find("img").addClass(s), f.select(), !1
            }),
                n = t.find("img").attr("src", e).data("source", a(this)).load(function () {
                    var e = a(this);
                    e.width() < u && e.height() < u && e.closest("." + i).fadeOut(500, function () {
                        e.remove()
                    })
                });
            h.append(t)
        }), h.appendTo("body"), t.util.assureFixedPositioning(h), t.util.flagAsUnclippable(h);
        var d = a(e).scrollLeft(),
            v = a(e).scrollTop(),
            m = h.find("." + i);
        m.each(function () {
            var e = a(this),
                t = e.offset(),
                n = t.left - d,
                r = t.top - v;
            e.data("left", n).data("top", r)
        }), m.each(function () {
            var e = a(this),
                t = g(e);
            e.cssImportant({
                position: "absolute",
                left: t.left,
                top: t.top
            })
        }), h.cssImportant("opacity", 1), m.each(function () {
            var e = a(this),
                t = e.data("left"),
                n = e.data("top");
            e.animate({
                top: n,
                left: t
            }, o, "easeInOutCubic", function () {
                a(this).cssImportant({
                    position: "relative",
                    left: "",
                    top: ""
                })
            })
        })
    }, a.prototype.doDeactivate = function () {
        this.activated = !1;
        var e = this;
        this.$container && (t.util.retireFixedPositioning(this.$container), this.$container.fadeOut(300, function () {
            e.$container.remove(), e.$container = null
        })), this.$overlay && (t.util.retireFixedPositioning(this.$overlay), this.$overlay.fadeOut(300, function () {
            e.$overlay.remove(), e.$overlay = null
        }))
    }, a.prototype.enableGlobalEvents = function () {
        this.$(this.document).on("keydown." + o, u(this))
    }, a.prototype.disableGlobalEvents = function () {
        this.$(this.document).off("." + o)
    }, a.prototype.getSelection = function () {
        var e = this.$container.find("." + s),
            t = e.length ? e.data("source") : null,
            n = t ? e.data("source").offset() : {
                top: null,
                left: null
            }, r = 1e4,
            i = e.css("max-width"),
            o = e.css("max-height");
        e.cssImportant({
            "max-width": r,
            "max-height": r
        });
        var u = e.width(),
            a = e.height();
        return e.cssImportant({
            "max-width": i,
            "max-height": o
        }), {
            $element: t,
            top: n.top,
            left: n.left,
            width: u,
            height: a
        }
    }, a.prototype.select = function () {
        var e = this.getSelection();
        this.trigger("selectionEnded", {
            clipType: "clip",
            selectionType: "image",
            selectionData: e,
            extractionContext: {
                top: e.top,
                left: e.left
            }
        })
    }, t.selectors.ImageSelector = a
})(window);
(function (e) {
    function r(r, i) {
        var s = (new Date).getTime(),
            o = t.util.readerExtract(this.$, this.document, this.baseData);
        if (!o) {
            this.trigger("noText");
            return
        }
        var u = this.$(o),
            a = u.html(),
            f = u.text();
        a = '<div class="' + t.util.clipContainerClass + '">' + '<div class="' + n + '">' + a + "</div></div>";
        var l = t.util.createSandbox(this.$),
            c = this.$("<div/>").attr("id", t.util.addSuffix("sandbox_readiness"));
        l.addSandboxCss(this.staticBaseUrl, this.siteVersion), l.html(a), l.append(c);
        var h = c.attr("id");
        c.attr("id", "foo").attr("id", h);
        var p = this,
            d = e.setInterval(function () {
                if (c.css("left") !== "-9123px") return;
                e.clearInterval(d), c.remove(), l.$body.width(790);
                var t = l.getDimensions();
                p.trigger("extracted", {
                    elapsedTime: (new Date).getTime() - s,
                    html: a,
                    text: "",
                    dimensions: t,
                    clipType: i.clipType,
                    selectionType: i.selectionType,
                    left: i.left,
                    top: i.top
                })
            }, 100)
    }
    function i(e) {
        t.Extractor.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.document = e.document, this.baseData = e.baseData, this.baseUri = e.baseUri, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion
    }
    var t = e.CLIPBOARD.client,
        n = "clipboard_reader_314159265";
    t.util.inherit(i, new t.Extractor, new t.ActivatableControl, new t.EventEmitter), t.util.merge(i.prototype, {
        constructor: i,
        extract: r,
        type: "reader"
    }), t.extractors.ReaderExtractor = i
})(window);
(function (e) {
    function u(e) {
        function f(e, u) {
            if (e.nodeType === 3) e.nodeValue.length > 0 && u.appendChild(e.cloneNode(!0));
            else if (e.nodeType === 1) {
                var l = e.nodeName.toLowerCase();
                if (o[l]) return;
                if (i[l]) {
                    u.appendChild(t.util.safeClone(r(e))[0]), u = u.lastChild;
                    var c = u.getAttribute("href");
                    c !== null && u.setAttribute("href", t.util.normalizeUri(c, n))
                } else s[l] && u.firstChild && (u.appendChild(a.createElement("br")), u.appendChild(a.createElement("br")));
                for (var h = 0, p = e.childNodes.length; h < p; h++) f(e.childNodes[h], u)
            }
        }
        var n = this.baseData,
            r = this.$,
            u = this.document.createDocumentFragment(),
            a = this.document;
        for (var l = 0, c = e.childNodes.length, h; l < c; l++) h = e.childNodes[l], f(h, u);
        return u
    }
    function a(e) {
        return '<blockquote class="' + n + '">' + '<p class="' + r + '">' + e + "</p>" + "</blockquote>"
    }
    function f(e) {
        var t = e.ownerDocument.createElement("div");
        t.appendChild(e);
        var n = t.innerHTML;
        return t = null, n
    }
    function l(e) {
        t.Extractor.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.baseData = e.baseData, this.document = e.document, this.staticBaseUrl = e.staticBaseUrl, this.siteVersion = e.siteVersion
    }
    var t = e.CLIPBOARD.client,
        n = "clipboard_blockquote_314159265",
        r = "clipboard_blockquote_text_314159265",
        i = {
            b: 1,
            strong: 1,
            em: 1,
            i: 1,
            code: 1,
            samp: 1,
            kbd: 1,
            tt: 1,
            "var": 1,
            a: 1,
            s: 1,
            del: 1,
            sup: 1,
            sub: 1,
            ins: 1,
            u: 1,
            abbr: 1,
            acronym: 1,
            small: 1,
            big: 1,
            dfn: 1,
            br: 1,
            q: 1,
            cite: 1
        }, s = {
            p: 1
        }, o = {
            script: 1,
            noscript: 1,
            noembed: 1,
            embed: 1,
            object: 1,
            meta: 1,
            base: 1,
            head: 1,
            style: 1,
            noframes: 1
        };
    l.prototype.constructor = l, t.util.inherit(l, new t.Extractor, new t.ActivatableControl, new t.EventEmitter), l.prototype.extract = function (n, r) {
        var i = (new Date).getTime(),
            s = u.call(this, n.fragment),
            o = a(f(s)),
            l = t.util.createSandbox(this.$),
            c = this.$("<div/>").attr("id", t.util.addSuffix("sandbox_readiness"));
        l.addSandboxCss(this.staticBaseUrl, this.siteVersion), l.html(o), l.append(c);
        var h = c.attr("id");
        c.attr("id", "foo").attr("id", h);
        var p = this,
            d = e.setInterval(function () {
                if (c.css("left") !== "-9123px") return;
                e.clearInterval(d), c.remove(), l.$body.width(570);
                var t = l.getDimensions();
                l.destroy(), p.trigger("extracted", {
                    elapsedTime: (new Date).getTime() - i,
                    html: o,
                    text: n.text,
                    dimensions: t,
                    clipType: r.clipType,
                    selectionType: r.selectionType,
                    left: r.left,
                    top: r.top
                })
            }, 100)
    }, l.prototype.type = "text", t.extractors.TextExtractor = l
})(window);
(function (e) {
    function r(e) {
        var n = this;
        if (!this.$hint) return;
        var r = 5e3;
        e && (r = 0), this.$hint.stop(!0, !1).delay(r).fadeOut(500, function () {
            t.util.retireFixedPositioning(n.$hint), n.$hint.remove(), n.$hint = null
        })
    }
    function i(e) {
        return function () {
            u.call(e)
        }
    }
    function s(e) {
        return function (t) {
            t.keyCode === 27 && (e.deactivate(), e.trigger("canceled", {
                source: "escapeKey"
            }))
        }
    }
    function o(e) {
        r.call(e, !1)
    }
    function u() {
        var e = t.util.getRangeData(this.document);
        if (e && e.text && e.text.replace(/\s/g, "").length) {
            var n = this.getSelection();
            this.trigger("selectionEnded", {
                clipType: "text",
                selectionType: "text",
                selectionData: n,
                extractionContext: {
                    top: n.top,
                    left: n.left
                }
            })
        }
    }
    function a(e) {
        t.Selector.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.context = e, this.name = "text", this.$hint = null, this.document = e.document, this.startCoordinates = {
            x: null,
            y: null
        }, this.activated = !1, this.getExtractor = function (n) {
            return new t.extractors.TextExtractor(e)
        }
    }
    var t = e.CLIPBOARD.client,
        n = "clipboard_text_selector";
    t.util.inherit(a, new t.Selector, new t.ActivatableControl, new t.EventEmitter), a.prototype.constructor = a, a.prototype.doActivate = function () {
        if (this.activated) return;
        if (this.context.preferences.showClipperHint) {
            var e = "shift";
            this.browser === "Chrome" && (e = "alt"), this.$hint = this.$("<div/>").applyBlockStyles().attr("id", "textHelp" + t.util.idSuffix).text("Drag mouse to select text").appendTo("body"), t.util.assureFixedPositioning(this.$hint), t.util.flagAsUnclippable(this.$hint)
        }
        this.activated = !0, this.startCoordinates.x = null, this.startCoordinates.y = null, this.enableGlobalEvents();
        var n = t.util.getRangeData(this.document);
        n && n.text && n.text.replace(/\s/g, "").length && this.select()
    }, a.prototype.doDeactivate = function () {
        this.disableGlobalEvents(), r.call(this, !0), this.activated = !1
    }, a.prototype.getSelection = function () {
        var e = t.util.getRangeData(this.document);
        return {
            fragment: e.fragment,
            text: t.util.trim(e.text),
            top: e.offset.top,
            left: e.offset.left
        }
    }, a.prototype.select = u, a.prototype.enableGlobalEvents = function () {
        this.$(this.document).on("mouseup." + n, i(this)).on("keydown." + n, s(this)).on("mousemove." + n, o(this))
    }, a.prototype.disableGlobalEvents = function () {
        this.$(this.document).off("." + n)
    }, a.prototype.shouldUseAsDefault = function () {
        return !!t.util.trim(this.getSelection().text)
    }, t.selectors.TextSelector = a
})(window);
(function (e) {
    function o(e, n, r) {
        function p(e) {
            e.setAttribute(t.util.cullNodeAttributeFlag, !0);
            var n = i(e).allParents().each(function () {
                this.setAttribute(t.util.cullNodeAttributeFlag, !0)
            });
            h.push(e), Array.prototype.push.apply(h, n.toArray())
        }
        function d(n) {
            var r = t.util.getOuterDimensions(n);
            return r.area > 0 && (r.left > e.right || r.right < e.left || r.top > e.bottom || r.bottom < e.top)
        }
        function v(e) {
            return e.css("display") !== "none" && e.css("visibility") !== "hidden" && e.css("opacity") !== "0"
        }
        function m(e) {
            var n = i(e);
            if (!n.hasClass(t.util.rewriteClass) && !v(n)) return;
            if (d(n)) {
                var r = !1;
                n.css("display") === "inline" && n.children().each(function () {
                    if (i(this).css("display") === "block") return r = !0, !1
                });
                if (!r) return
            }
            n.attr(t.util.cullNodeAttributeFlag, !0), h.push(e), n.children().each(function () {
                m(this)
            });
            if (e.nodeName.toLowerCase() === "iframe") try {
                    m(n.contents()[0].documentElement)
            } catch (s) {}
        }
        function g(e, t) {
            var n = e,
                r = t;
            while (n.length && r.length) {
                n = n.next();
                if (!n.length) {
                    n = t, r = e;
                    break
                }
                if (n[0] === t[0]) {
                    n = e, r = t;
                    break
                }
                r = r.next();
                if (r[0] === e[0]) {
                    n = t, r = e;
                    break
                }
                if (!r.length) {
                    n = e, r = t;
                    break
                }
            }
            var i = n;
            do {
                m(i[0]);
                if (i[0] === r[0]) break
            } while (i = i.next())
        }
        var i = this.$,
            s = this.document,
            o, u, a, f, l, c, h = [],
            y = !1;
        if (n[0] === s.documentElement || r[0] === s.documentElement) o = s.documentElement;
        else if (n[0] === r[0]) o = r[0];
        else {
            l = n.allParents().toArray(), c = r.allParents().toArray(), l.reverse(), c.reverse(), l.push(n[0]), c.push(r[0]);
            var b = Math.max(l.length, c.length);
            for (u = 0; u < b; u++) {
                var w = l[u],
                    E = c[u];
                if (w !== E) {
                    o = l[u - 1], a = i(w), f = i(E);
                    break
                }
            }
            if (!o) return [];
            y = !0
        }
        return p(o), y ? g(a, f) : m(o), h
    }
    function u(e, n, r) {
        var i = e.constructor;
        if (e.hasClass(t.util.rewriteClass)) {
            var s = e.contents(),
                o = 0;
            for (var u = 0; u < s.length; u++) r.firstIteration = !1, o = b.call(this, i(s[u]), n, r) || o;
            return o
        }
        return 0
    }
    function a(e) {
        var t = e.split(","),
            n = [];
        for (var r = 0, i, s; r < t.length; r++) {
            i = t[r], s = i.charAt(0);
            if (s === '"' && i.charAt(i.length - 1) === s) {
                if (i.indexOf("'") !== -1) continue;
                i = "'" + i.substring(1, i.length - 1) + "'"
            }
            n.push(i)
        }
        return n.join(",")
    }
    function f(e, t) {
        for (var n in t) {
            if (!t.hasOwnProperty(n)) continue;
            e.css(n) !== t[n] && e.css(n, t[n])
        }
    }
    function l(e, t) {
        var n = {}, r, i;
        for (r = 0; r < t.length; r++) {
            i = t[r];
            try {
                var s = e.css(i);
                i === "font-family" && (s = a(s)), n[i] = s
            } catch (o) {}
        }
        return n
    }
    function c(e, t) {
        function u(e, t) {
            return e !== "margin" ? !1 : o[e + t] < 0
        }
        function a(t) {
            o[t] === undefined && (o[t] = e.css(t));
            if (!o[t]) return;
            s[t] = o[t]
        }
        function f(e, t) {
            if (e === "border") {
                if (o[e + t + "Width"] === 0) return;
                n.each(["Style", "Width", "Color"], function (n, r) {
                    a(e + t + r)
                })
            } else a(e + t)
        }
        var n = e.constructor,
            r = e.trueOffset(),
            i = {}, s = {
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0
            }, o = {
                paddingLeft: parseFloat(e.css("padding-left")),
                paddingRight: parseFloat(e.css("padding-right")),
                paddingTop: parseFloat(e.css("padding-top")),
                paddingBottom: parseFloat(e.css("padding-bottom")),
                marginLeft: parseFloat(e.css("margin-left")),
                marginTop: parseFloat(e.css("margin-top")),
                marginRight: parseFloat(e.css("margin-right")),
                marginBottom: parseFloat(e.css("margin-bottom")),
                borderRightWidth: parseFloat(e.css("border-right-width")),
                borderLeftWidth: parseFloat(e.css("border-left-width")),
                borderTopWidth: parseFloat(e.css("border-top-width")),
                borderBottomWidth: parseFloat(e.css("border-bottom-width"))
            };
        return i.borderLeft = r.left, i.borderTop = r.top, i.paddingLeft = i.borderLeft + o.borderLeftWidth, i.paddingRight = i.paddingLeft + e.width() + o.paddingLeft + o.paddingRight, i.paddingTop = i.borderTop + o.borderTopWidth, i.paddingBottom = i.paddingTop + e.height() + o.paddingTop + o.paddingBottom, i.borderRight = i.paddingRight + o.borderRightWidth, i.borderBottom = i.paddingBottom + o.borderBottomWidth, i.marginLeft = i.borderLeft - o.marginLeft, i.marginTop = i.borderTop - o.marginTop, i.marginRight = i.borderRight + o.marginRight, i.marginBottom = i.borderBottom + o.marginBottom, n.each(["Left", "Right", "Top", "Bottom"], function (e, r) {
            var s = r === "Right" || r === "Bottom";
            n.each(["margin", "border", "padding"], function (e, n) {
                var o = i[n + r];
                s ? o <= t[r.toLowerCase()] && !u(n, r) && f(n, r) : o >= t[r.toLowerCase()] && !u(n, r) && f(n, r)
            })
        }), s
    }
    function h(e, t) {
        var n = l(e, ["background-clip", "background-color", "background-image", "background-origin", "background-repeat"]);
        return p(n, e, t), n
    }
    function p(e, n, r) {
        function s(e, r, s) {
            var o = t.util.convertUnitsToPixels(e, parseFloat(n.css("font-size")));
            if (o !== !1) return o;
            var u = e;
            switch (e) {
            case "left":
            case "top":
                return 0;
            case "right":
            case "bottom":
                e = "100%";
                break;
            case "center":
                e = "50%"
            }
            if (!/^-?[\d\.]+%$/.test(e)) return 0;
            var a = parseFloat(e),
                f = /url\(['"]?(.+?)['"]?\)/i.exec(r);
            r = f && f.length > 1 ? f[1] : null;
            if (!r) return 0;
            var l = i("<img/>").attr("src", r).css({
                left: "-100000px",
                position: "absolute"
            }).appendTo("body"),
                c = l.width(),
                h = l.height();
            l.remove(), l = null;
            var p = s === "horizontal" || u in {
                left: 1,
                right: 1
            } ? c : h,
                d = s === "horizontal" || u in {
                    left: 1,
                    right: 1
                } ? n.width() : n.height();
            return a / 100 * d - p * (a / 100)
        }
        var i = n.constructor,
            o = n.css("background-image");
        if (o === "none") return;
        var u = n.bgPosition().split(" ");
        typeof u[1] == "undefined" && (u[1] = "center");
        if (u.length >= 3) return;
        u[0] = s(u[0], o, "horizontal"), u[1] = s(u[1], o, "vertical");
        var a = t.util.getDimensions(n);
        if (a.top < r.top || a.left < r.left) u[0] -= r.left - a.left, u[1] -= r.top - a.top;
        u[0] += "px", u[1] += "px", e["background-image"] = o, e["background-position"] = u.join(" "), e["background-attachment"] = "scroll"
    }
    function d(e, t, n) {
        function f(e, r, o) {
            s[e] < n[e] && a[e] < n[e] ? t.css(e, 0) : a[e] >= n[e] && a[e] + o <= n[r] ? t.css(e, i[e]) : t.css(e, i[e] - (n[e] - a[e]))
        }
        if (e.is("param")) return;
        var r = e.css("position");
        if (r === "static" || r === "fixed") return;
        t.css("position", r);
        if (r === "relative") return;
        var i = e.position();
        if (r === "relative" && i.top === 0 && i.left === 0) return;
        var s = e.trueOffset(),
            o = e.width() - Math.max(0, s.left + e.width() - n.right);
        o = Math.min(n.width, o);
        var u = e.height() - Math.max(0, s.top + e.height() - n.bottom);
        u = Math.min(n.height, u), t.width(o), t.height(u);
        var a = e.offsetParent().offset();
        f("left", "right", e.width()), f("top", "bottom", e.height())
    }
    function v(e, n) {
        var i = t.util.getOuterDimensions(e),
            s = t.util.computeOverlap(i, n);
        return this.trigger("overlapCalculated", {
            overlap: s,
            sourceDimensions: i,
            ratio: i.area !== 0 ? s.area / i.area : 0
        }), i.area > 0 && s.area >= i.area * .95 ? "full" : e[0].nodeName.toLowerCase() in r ? "full" : e.css("clear") !== "none" && e.children().length === 0 && i.area === 0 ? "full" : "partial"
    }
    function m(e, n) {
        this.trigger("extractionStarted", {
            rect: n.rect,
            selection: e
        });
        var r = g.call(this, e, n.rect);
        e.startElement = e.endElement = null;
        if (!r) {
            this.trigger("nothingExtracted");
            return
        }
        var i = r.clip,
            s = t.util.compactHtml(i.html()),
            o = i.words(),
            u = this.sandbox.getDimensions();
        this.sandbox.empty(), this.trigger("extracted", {
            elapsedTime: r.elapsedTime,
            html: s,
            text: o,
            dimensions: u,
            top: n.rect.top,
            left: n.rect.left,
            clipType: n.clipType,
            selectionType: n.selectionType,
            clipData: n.clipData
        })
    }
    function g(e, r) {
        function d() {
            return i(this).css("float") !== "none"
        }
        var i = this.$,
            s = this.document,
            u = i(e.startElement),
            a = i(e.endElement),
            f = (new Date).getTime(),
            l = + !! i.browser.mozilla || + !! i.browser.msie,
            c = o.call(this, r, u, a);
        this.trigger("searchSpaceCulled", {
            elements: c
        }), this.sandbox.$element.css({
            width: r.width + l,
            height: r.height
        });
        var h = i("<div/>").addClass(n);
        this.sandbox.append(h);
        var p = {
            rect: r,
            firstIteration: !0
        };
        y.call(this, i(this.document.documentElement), h, p, !0), h.find(":last-child").each(function () {
            var e = i(this);
            if (e.css("display") === "inline" || e.is("p,ul,ol,dl,dt,table,tr,td,th,tbody,thead,tfoot,q")) return;
            var t = e.prev();
            t.length || (t = e), t.children().is(d) && e.append(i("<div/>").css("clear", "both"))
        });
        var v = this.domainHackers[s.domain];
        v && v.hack(h);
        for (var m = 0; m < c.length; ++m) c[m].removeAttribute(t.util.cullNodeAttributeFlag);
        return {
            clip: h,
            elapsedTime: (new Date).getTime() - f
        }
    }
    function y(e, n, r) {
        if (!e.attr(t.util.cullNodeAttributeFlag)) return this.trigger("elementExtracting", {
                element: e[0],
                method: "rect"
            }), this.trigger("elementIgnored", {
                reason: "not culled"
            }), !1;
        var i = t.util.getOuterDimensions(e),
            s = t.util.computeOverlap(i, r.rect),
            o = v.call(this, e, r.rect);
        this.trigger("elementExtracting", {
            element: e[0],
            method: "rect",
            sourceDimensions: i,
            overlap: s
        });
        var u;
        return o === "full" ? u = b.call(this, e, n, r) : u = w.call(this, e, n, r), u ? this.trigger("elementExtracted", {
            method: "rect"
        }) : this.trigger("elementIgnored", {
            reason: "extractFull or extractPart failed"
        }), u
    }
    function b(e, r, o) {
        this.trigger("elementExtracting", {
            method: "full",
            element: e[0]
        });
        var a = this.$;
        if (e[0].nodeType === 3) return r.append(this.document.createTextNode(e[0].nodeValue)), this.trigger("elementExtracted", {
                method: "full"
            }), !0;
        if (u.call(this, e, r, o)) return this.trigger("elementExtracted", {
                method: "full"
            }), !0;
        var c = {
            reason: null
        };
        if (!t.util.shouldInclude(e, c)) return this.trigger("elementIgnored", {
                reason: c.reason
            }), !1;
        if (this.handleElement(e, r)) return !0;
        var h = e[0].nodeName.toLowerCase();
        h = h in t.util.semanticBlockTagNames || h === "body" || h === "html" || h === "form" ? "div" : h;
        if (h === "style") return this.trigger("elementIgnored", {
                reason: "style tag"
            }), !1;
        if (e.css("position") == "fixed") return this.trigger("elementIgnored", {
                reason: "fixed position"
            }), !1;
        var p;
        if (h === "input") {
            var m = e.prop("type");
            if (m === "hidden") return this.trigger("elementIgnored", {
                    reason: "unsupported input: " + m
                }), !1;
            m === "submit" && (m = "button"), p = a("<" + h + "/>").attr("type", m)
        } else h in t.util.cloneableTags ? p = t.util.safeClone(e) : h === "canvas" ? p = a("<img/>").attr("src", e[0].toDataURL("image/png")).attr("alt", "image converted from <canvas>").attr("width", e.width()).attr("height", e.height()).css("display", "inline") : p = a("<" + h + "/>");
        s(e, p);
        var g = i.call(this, e);
        r.hasClass(n) && (g.position = "static"), r.append(p), f(p, g);
        var y = this.tweakers[h];
        y && y.tweakFully(e, p);
        if (h !== "iframe") {
            var E = e.contents();
            for (var S = 0, x; S < E.length; S++) x = a(E[S]), E[S].nodeType === 3 ? p.append(this.document.createTextNode(E[S].nodeValue)) : E[S].nodeType === 1 && (v.call(this, x, o.rect) === "full" ? b.call(this, x, p, o) : w.call(this, x, p, o))
        }
        return g = l(e, ["width", "height"]), f(p, g), d(e, p, o.rect), o.firstIteration = !1, this.trigger("elementExtracted", {
            method: "full"
        }), !0
    }
    function w(e, r, i) {
        this.trigger("elementExtracting", {
            method: "partial",
            element: e[0]
        });
        var s = this.$;
        if (e.attr(t.util.doNotClipAllAttributeName)) return this.trigger("elementIgnored", {
                reason: "do not clip attribute"
            }), !1;
        if (e[0].nodeType === 3) return r.append(document.createTextNode(e[0].nodeValue)), this.trigger("elementExtracted", {
                method: "partial"
            }), !0;
        if (u.call(this, e, r, i)) return this.trigger("elementExtracted", {
                method: "partial"
            }), !0;
        var o = {
            reason: null
        };
        if (!t.util.shouldInclude(e, o)) return this.trigger("elementIgnored", {
                reason: o.reason
            }), !1;
        var a = e[0].nodeName.toLowerCase();
        a = a in t.util.semanticBlockTagNames ? "div" : a;
        var p;
        a in t.util.cloneableTags ? (p = t.util.safeClone(e), p.text("")) : a in t.util.tagsToConvertToDiv ? p = s("<div/>") : p = s("<" + a + "/>"), r.append(p), r.hasClass(n) ? p.width(i.rect.width).height(i.rect.height) : a === "table" && p.attr({
            cellpadding: 0,
            cellspacing: 0,
            border: 0
        }).css("border-collapse", "collapse");
        var v = this.tweakers[a];
        v && v.tweakPartially(e, p), f(p, c(e, i.rect)), f(p, h(e, i.rect)), e.css("position") !== "fixed" && d(e, p, i.rect), f(p, l(e, ["display", "float", "clear", "font-size", "line-height", "font-family", "color", "text-align", "visibility", "white-space"]));
        var m = !1;
        if (a !== "iframe") {
            var g = e.contents();
            if (g.length) {
                function b(e) {
                    var n = e.attr(t.util.cullNodeAttributeFlag) || e.is("br") || e.hasClass(t.util.rewriteClass) && e.find("br").length;
                    return n ? !0 : t.util.getOuterDimensions(e).area === 0
                }
                for (var E = 0, S; E < g.length; E++) S = g.eq(E), S[0].nodeType === 1 ? b(S) && y.call(this, S, p, i) && (m = !0) : S[0].nodeType === 3 && (m = w.call(this, S, p, i) || m)
            }
        } else try {
                var x = s(e.contents()[0].documentElement);
                p.css("display", "inline-block"), m = y.call(this, x, p, i)
        } catch (T) {
            m = !1
        }
        return m ? this.trigger("elementExtracted", {
            method: "partial"
        }) : (this.trigger("elementIgnored", {
            reason: "no children were extracted"
        }), p.remove()), m
    }
    function E(e) {
        t.extractors.TweakableExtractor.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.$ = e.$, this.baseData = e.baseData, this.support = e.support, this.document = e.document, this.sandbox = null, this.tweakers = this.createTweakers(), this.domainHackers = {
            "tlc.discovery.com": new t.extractors.TlcDiscoveryHacker,
            "www.youtube.com": new t.extractors.YouTubeHacker,
            "www.screenr.com": new t.extractors.ScreenrHacker
        }
    }
    var t = e.CLIPBOARD.client,
        n = t.util.clipContainerClass,
        r = {
            embed: 1,
            param: 1,
            object: 1,
            video: 1,
            audio: 1,
            source: 1,
            br: 1,
            img: 1
        }, i = function () {
            var e = ["-moz-border-bottom-left-radius", "-moz-border-bottom-right-radius", "-moz-border-top-left-radius", "-moz-border-top-right-radius", "-moz-box-shadow", "-webkit-border-bottom-left-radius", "-webkit-border-bottom-right-radius", "-webkit-border-top-left-radius", "-webkit-border-top-right-radius", "-webkit-box-shadow", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-top-color", "border-top-style", "border-top-width", "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius", "border-spacing", "border-collapse", "box-shadow", "caption-side", "clear", "clip", "color", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "float", "font-family", "font-size", "font-style", "font-variant", "font-weight", "letter-spacing", "line-height", "list-style-image", "list-style-position", "list-style-type", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "max-height", "max-width", "min-height", "min-width", "opacity", "outline-color", "outline-style", "outline-width", "overflow-x", "overflow-y", "overflow", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "quotes", "table-layout", "text-align", "text-shadow", "text-decoration", "text-indent", "text-transform", "vertical-align", "visibility", "white-space", "word-spacing", "z-index"];
            return function (t) {
                var n = {}, r, i = this.document;
                for (var s = 0; s < e.length; s++) {
                    var o = e[s];
                    if (o === "line-height" && t[0].currentStyle) r = t[0].currentStyle.lineHeight;
                    else if (o === "margin-right" && i.defaultView && i.defaultView.getComputedStyle) r = i.defaultView.getComputedStyle(t[0], null).getPropertyValue("margin-right");
                    else if (o.indexOf("background-position") === 0) r = t.bgPosition();
                    else try {
                            r = t.css(o), o === "font-family" && (r = a(r))
                    } catch (u) {
                        r = null
                    }
                    r && (n[o] = r)
                }
                return n.display === "inline" && n.clip && delete n.clip, n
            }
        }(),
        s = function () {
            function e(e, t, n) {
                var r = e.attr(n);
                r && t.attr(n, r)
            }
            return function (t, n) {
                e(t, n, "title"), e(t, n, "alt"), e(t, n, "rel")
            }
        }();
    t.util.inherit(E, new t.extractors.TweakableExtractor, new t.ActivatableControl, new t.EventEmitter), t.util.merge(E.prototype, {
        constructor: E,
        domainHackers: {},
        extract: function (e, t) {
            this.activate(), m.call(this, e, t), this.deactivate()
        }
    }), E.prototype.doActivate = function () {
        if (this.sandbox) return;
        t.util.rewritePageHtml(this.$, this.baseData, this.support), this.sandbox = t.util.createSandbox(this.$), this.trigger("sandboxBuilt", {
            nodeName: this.sandbox.$element[0].nodeName.toLowerCase()
        })
    }, E.prototype.doDeactivate = function () {
        this.sandbox && (this.sandbox.destroy(), this.sandbox = null)
    }, E.prototype.handleElement = function (e, n) {
        switch (document.domain) {
        case "soundcloud.com":
            if (e.hasClass("container") && e.closest("[data-sc-track]").length) return (new t.extractors.SoundCloudEmbedHandler).handle(e, n), !0
        }
        return !1
    }, E.prototype.type = "clip", t.extractors.ElementExtractor = E
})(window);
(function (e) {
    function u(e) {
        var t = "rectangle " + this.selectionType;
        e.catalyst && (t += " " + e.catalyst), this.dragContext.reset(), this.trigger("selectionEnded", {
            selectionData: this.getSelection(),
            selectionType: t,
            clipType: "clip",
            extractionContext: {
                rect: this.selectionRect.dimensions
            }
        })
    }
    function a(e) {
        var t = this;
        if (e.delta.y === 0 || !t.selectionData.startElement) return;
        t.zoomContext.zooming || (t.zoomContext.start.clientX = e.x, t.zoomContext.start.clientY = e.y), this.selectionType = "zoom", e.delta.y < 0 ? t.zoomIn() : t.zoomOut()
    }
    function f(e) {
        if (!this.selecting) return;
        this.dragContext.reset();
        if (!this.zoomContext.zooming || h(this.zoomContext, e.x, e.y)) this.zoomContext.reset(), this.selectionType = "click", this.animateTo({
                clientX: e.x,
                clientY: e.y
            })
    }
    function l(e) {
        if (!this.selecting) return;
        this.selectionType = "drag", this.dragContext.current.x = e.x + this.$(this.document).scrollLeft(), this.dragContext.current.y = e.y + this.$(this.document).scrollTop(), this.animateTo({
            clientX: e.x,
            clientY: e.y
        })
    }
    function h(e, t, n) {
        var r = e.start.clientX - t,
            i = e.start.clientY - n,
            o = Math.sqrt(r * r + i * i);
        return o >= s
    }
    function p(t, n) {
        if (this.dragContext.dragging) return !0;
        var r = this.selectionRect.dimensions,
            i = t.height - r.height,
            s = t.width - r.width,
            o = this.$(e).width(),
            u = Math.max(800, o),
            a = this.$(e).height(),
            f = Math.max(400, Math.min(800, a));
        if (i > f && r.height < a) return this.trigger("invalidElementHovered", {
                type: "height",
                diff: i
            }), !1;
        if (s > u && r.width < o) return this.trigger("invalidElementHovered", {
                type: "width",
                diff: s
            }), !1;
        var l = this.$(e.document).width() * this.$(e.document).height(),
            c = t.width * t.height,
            h = o * a;
        return c / l > .8 && c > h ? (this.trigger("invalidElementHovered", {
            type: "area",
            diff: l - c
        }), !1) : !0
    }
    function d(t) {
        var n = 20,
            r = this.$(e);
        return t.clientX < n || t.clientX > r.width() - n || t.clientY < n || t.clientY > r.height() - n
    }
    function v(e) {
        var n = o;
        this.animationTimeoutId >= 0 && (this.animationTimeoutId = clearTimeout(this.animationTimeoutId));
        var r = null,
            i = this,
            s = this.$;
        if (typeof e.nodeType == "undefined") {
            var u = this.selectionRect.distanceFromCoordinates(e);
            n = Math.max(0, o - u), r || (r = function () {
                i.canvas.hide(), i.selectionRect.hide();
                var n = t.util.getElementFromPoint(e.clientX, e.clientY, i.$, i.document);
                i.canvas.show(), i.selectionRect.show();
                if (!n) return;
                var r = 1e3,
                    o = s(n).outerWidth() * s(n).outerHeight();
                while (o < r) {
                    n = n.parentNode;
                    if (!n) return;
                    o = s(n).outerWidth() * s(n).outerHeight()
                }
                m.call(i, n, e)
            })
        } else r = function () {
                if (!e) return;
                m.call(i, e, "easeOutQuad")
        };
        this.animationTimeoutId = setTimeout(r, n)
    }
    function m(e, n, r) {
        var i = this.selectionData.startElement,
            s = this.selectionData.endElement;
        if (i === e && s === e) return;
        if (this.dragContext.dragging) {
            this.selectionData.startElement || (i = e);
            if (this.selectionData.endElement === e) return;
            s = e
        } else i = e, s = e;
        var o = this.$,
            u = o(i),
            a = o(s),
            f = t.util.getOuterDimensions(u),
            l = t.util.getOuterDimensions(a),
            c = {
                top: Math.min(f.top, l.top),
                left: Math.min(f.left, l.left),
                bottom: Math.max(f.bottom, l.bottom),
                right: Math.max(f.right, l.right)
            };
        c.width = c.right - c.left, c.height = c.bottom - c.top, c.area = c.width * c.height;
        if (!this.zoomContext.zooming && !p.call(this, c, n)) return;
        this.selectionData.startElement = i, this.selectionData.endElement = s, this.selectionRect.moveTo(c, r)
    }
    function g(e) {
        t.Selector.call(this), t.ActivatableControl.call(this), t.EventEmitter.call(this), this.support = e.support, this.bodyOffset = e.bodyOffset, this.$ = e.$, this.staticBaseUrl = e.staticBaseUrl, this.selecting = !1, this.baseData = e.baseData, this.document = e.document, this.preferences = e.preferences, this.selectionType = "click", this.name = "rectangle", this.dragContext = {
            direction: "",
            start: {
                x: null,
                y: null
            },
            current: {
                x: null,
                y: null
            },
            dragging: !1,
            reset: function () {
                this.start.x = this.start.x = null, this.current.x = this.current.y = null, this.dragging = !1, this.direction = ""
            }
        }, this.getExtractor = function () {
            return new t.extractors.ElementExtractor(e)
        };
        var r = this,
            i = this.$(this.document);
        this.selectionRect = new n.SelectionRectangle(e), this.canvas = new n.SelectionCanvas(e), this.canvas.on("dragStarted", function (e) {
            r.dragContext.dragging = !0, r.dragContext.start.x = r.dragContext.current.x = e.x + i.scrollLeft(), r.dragContext.start.y = r.dragContext.current.y = e.y + i.scrollTop()
        }).on("dragged", this.$.proxy(l, this)).on("selectionChosen", this.$.proxy(u, this)).on("mouseMoved", this.$.proxy(f, this)).on("zoomed", this.$.proxy(a, this)), this.controls = [this.canvas, this.selectionRect], this.zoomContext = {
            zooming: !1,
            noZoomReason: "",
            lastZoom: 0,
            start: {
                clientX: 0,
                clientY: 0
            },
            path: null,
            current: -1,
            reset: function () {
                this.zooming = !1, this.lastZoom = 0, this.start.clientX = -1, this.start.clientY = -1, this.path = null, this.current = -1, this.noZoomReason = "", this.sentMetaEventToTracker = !1
            },
            sentMetaEventToTracker: !1
        }, this.selectionData = {
            startElement: null,
            endElement: null
        }, this.animationTimeoutId = 0
    }
    var t = e.CLIPBOARD.client,
        n = t.selectors.components,
        r = "rectangleSelector_" + t.util.idSuffix,
        i = 5,
        s = 15,
        o = 100,
        c = function () {
            function r(e) {
                var r = this.$;
                if (this.zoomContext.path === null) {
                    var s = !0,
                        o = r(this.selectionData.startElement),
                        u = o;
                    this.zoomContext.path = o.allParents().filter(function () {
                        return s = n(r(this), u), s === !0 && (u = r(this)), s === !0
                    }).map(function () {
                        return r(this)
                    }).toArray(), s === !0 && (s = t.Selector.failureStatus.nowhereToZoom), this.zoomContext.path.unshift(o), this.zoomContext.noZoomReason = s
                }
                var a;
                return e ? (a = this.zoomContext.path[this.zoomContext.current + 1], a ? (this.zoomContext.lastZoom = (new Date).getTime(), this.zoomContext.current++, a) : (this.zoomContext.lastZoom && (new Date).getTime() - this.zoomContext.lastZoom > 1e3 / i * 2 && this.trigger("selectionFailed", {
                    reason: this.zoomContext.noZoomReason
                }), this.zoomContext.lastZoom = (new Date).getTime(), [])) : (this.zoomContext.current = Math.max(0, this.zoomContext.current - 1), a = this.zoomContext.path[this.zoomContext.current], a || [])
            }
            var n = function () {
                function n(e, n) {
                    var r = t.util.getDimensions(e),
                        i = t.util.getDimensions(n);
                    if (r.area < .95 * i.area) return !1;
                    var s = t.util.computeOverlap(r, i);
                    return s.area >= .95 * i.area
                }
                return function (r, i) {
                    if (!r[0] || r[0].nodeType !== 1 || !n(r, i)) return t.Selector.failureStatus.nowhereToZoom;
                    if (!t.util.shouldInclude(r, {})) return t.Selector.failureStatus.nowhereToZoom;
                    var s = r.constructor,
                        o = s(e.document).width() * s(e.document).height(),
                        u = s(e).width() * s(e).height(),
                        a = r.outerWidth() * r.outerHeight();
                    return a / o > .8 && a > u ? t.Selector.failureStatus.nowhereToZoom : !0
                }
            }();
            return function (e) {
                var n = r.call(this, e);
                if (!n.length) return;
                this.zoomContext.zooming = !0, this.trigger("zooming", {
                    direction: e ? "in" : "out"
                });
                var i = n.trueOffset();
                t.util.adjustOffsetForMargins(n, i), n.trueCoordinates(i), this.animateTo(n[0])
            }
        }();
    t.util.inherit(g, new t.Selector, new t.ActivatableControl, new t.EventEmitter), g.prototype.constructor = g, g.prototype.doActivate = function () {
        if (this.selecting) return;
        this.selecting = !0;
        var e = this,
            n = e.$;
        t.util.rewritePageHtml(n, this.baseData, this.support), this.enableGlobalEvents(), this.select()
    }, g.prototype.doDeactivate = function () {
        this.selecting = !1, this.dragContext.reset(), this.selectionData.startElement = null, this.selectionData.endElement = null, this.animationTimeoutId && (this.animationTimeoutId = e.clearTimeout(this.animationTimeoutId)), this.disableGlobalEvents(), this.zoomContext.reset()
    }, g.prototype.disableGlobalEvents = function () {
        this.$(this.document).off("keydown." + r)
    }, g.prototype.enableGlobalEvents = function () {
        var e = this;
        this.$(this.document).on("keydown." + r, function (t) {
            t.keyCode === 27 && (t.preventDefault(), t.stopImmediatePropagation(), e.deactivate(), e.trigger("canceled", {
                source: "escapeKey"
            }))
        })
    }, g.prototype.zoomIn = function () {
        c.call(this, !0)
    }, g.prototype.zoomOut = function () {
        c.call(this, !1)
    }, g.prototype.animateTo = v, g.prototype.getSelection = function () {
        return {
            startElement: this.selectionData.startElement,
            endElement: this.selectionData.endElement
        }
    }, g.prototype.shouldUseAsDefault = function () {
        return !1
    }, g.prototype.setPreferences = function (e) {
        this.preferences = e, this.selectionRect.setPreferences(e)
    }, t.selectors.RectangleSelector = g
})(window);
(function (window) {
    function defaultSelectorType() {
        var e = {
            clip: "rectangle",
            page: "bookmark",
            image: "image",
            text: "text",
            reader: "reader"
        };
        return this.preferences && this.preferences.defaultClipMode ? e[this.preferences.defaultClipMode] : "rectangle"
    }
    function workAroundPrototype(e) {
        var t = e.getElementsByClassName;
        if (window.Prototype && window.Prototype.Version) {
            var n = window.Prototype.Version.replace(/_.*$/g, ""),
                r = n.split("."),
                i = parseInt(r[0]),
                s = parseInt(r[1]);
            if (i <= 1 && s <= 5) return e.getElementsByClassName = function (e) {
                    return $$("." + e)
            }, Array.prototype.shift = function () {
                var e = this[0];
                for (var t = 0; t < this.length - 1; t++) this[t] = this[t + 1];
                return this.length = Math.max(0, this.length - 1), e
            }, {
                getElementsByClassName: t,
                stupidFuckingPrototype: !0
            }
        }
        return {
            stupidFuckingPrototype: !1
        }
    }
    function logMetric(e, t, n) {
        if (!this.shouldLogMetric(e)) return;
        t = t || {}, t.origin = this.origin, t.browser = this.browser, t.domain = this.document.domain, this.dao.logMetric((n || "bookmarklet") + "_" + e, t, this.user)
    }
    function clipBegin(e, t) {
        e = e || defaultSelectorType.call(this), t && e === defaultSelectorType.call(this) ? this.setActiveSelectorByContext() : this.setActiveSelector(e), this.ui.enableClipping(this.activeSelector.name), this.activeSelector.activate()
    }
    function cancelClipping() {
        this.trigger("clippingCanceled"), this.activeSelector && (this.ui.disableClipping(this.activeSelector.type), this.activeSelector.deactivate())
    }
    function getSendFailureMessage(e) {
        var t = client.util.strings,
            n = client.DataAccess.sendFailureStatus;
        switch (e) {
        case n.validationError:
            return t.send_validationError;
        case n.serverSideSave:
            return t.send_saveClipFail;
        case n.timeout:
            return t.send_clipSaveTimedOut;
        case n.malformedResponse:
        case n.invalidResponse:
        case n.expiredRequest:
        case n.expiredSession:
        case n.unauthorized:
        case n.badRequest:
        case n.emptyResult:
            return t.send_invalidResponseSavingClip;
        case n.unknown:
        default:
            return t.error_unknown
        }
    }
    function getSelectionFailureMessage(e) {
        var t = client.util.strings,
            n = client.Selector.failureStatus;
        switch (e) {
        case n.nowhereToZoom:
            return t.zoom_nowhereToZoom;
        case n.noImages:
            return t.error_noImages;
        default:
            return t.error_unknown
        }
    }
    function updatePreferences(e) {
        this.dao.updatePreferences(e), propagatePreferences.call(this, e), logMetric.call(this, "updatePreferences", e)
    }
    function wireUpUi() {
        var e = this;
        this.ui.on("boardCreated", function (t) {
            var n = e.$.extend({
                source: "boardPicker (Clipper)"
            }, t);
            n.invitations && (n.invitations = window.CLIPBOARD.JSON.stringify(n.invitations)), e.dao.createBoard(n, e.user.guid)
        }).on("boardSelected", function (t) {
            logMetric.call(e, "selected", {
                selected: t.selected,
                visibility: t.board.visibility,
                numMembers: t.board.numMembers,
                hasAutoTags: !! t.board.autotags && !! t.board.autotags.length,
                source: "Clipper"
            }, "boardPicker")
        }).on("preferencesUpdated", function (t) {
            updatePreferences.call(e, t.preferences)
        }).on("autocompleteTriggered", function (t) {
            logMetric.call(e, "autocompleteTrigger", {
                source: t.source,
                type: t.type
            })
        }).on("embedButtonClicked", function (t) {
            if (!e.selectors.element) return;
            e.setActiveSelector("element"), e.activeSelector.setSelection(t.startElement, t.endElement, t.clipData), e.activeSelector.select()
        }).on("navigated", function (t) {
            logMetric.call(e, "navigate", {
                source: t.source,
                catalyst: t.catalyst
            }), t.source === "close" ? e.deactivate() : /^clip_/.test(t.source) ? t.status === "disabled" ? cancelClipping.call(e) : clipBegin.call(e, t.type) : cancelClipping.call(e)
        }).on("reviewConfirmed", function (t) {
            var n = t.reviewData.annotation || "";
            logMetric.call(e, "reviewSubmit", {
                method: t.method,
                published: t.reviewData.published,
                annotated: !! n,
                annotationLength: n.length,
                postToFacebook: t.reviewData.postToFacebook,
                tweet: t.reviewData.tweet,
                numBoards: t.reviewData.boards.split(" ").length
            })
        }).on("clipConfirmed", function (t) {
            e.ui.showLoadingMessage(), e.dao.sendClip(t.clip), e.activeSelector.deactivate(), e.ui.disableClipping(e.activeSelector.type)
        }).on("firstRunCompleted", function (t) {
            t && t.whence && logMetric.call(e, "firstRunCompletion", {
                whence: t.whence,
                virgin: e.preferences.showClipperFirstRun
            }), e.preferences.showClipperFirstRun && (updatePreferences.call(e, {
                showClipperFirstRun: !1
            }), clipBegin.call(e, defaultSelectorType.call(e), !0))
        }).on("notificationRead", function () {
            if (!e.currentNotification) return;
            var t = (new Date).getTime() - e.currentNotification.ctime;
            logMetric.call(e, "readNotification", {
                timeDiff: Math.round(t / 1e3)
            }), e.dao.markNotificationRead(e.user.guid)
        }).on("tutorialSlideLoaded", function (t) {
            logMetric.call(e, "tutorialSlideLoad", {
                index: t.index
            })
        }).on("reviewOpening", function () {
            e.activeSelector.disableGlobalEvents()
        }).on("reviewClosed", function () {
            e.activeSelector.enableGlobalEvents()
        }).on("reviewCanceled", function (t) {
            e.activeSelector && e.activeSelector.isNull && cancelClipping.call(e), logMetric.call(e, "reviewCancel", {
                method: t.method
            })
        }).on("userDataRequested", function () {
            e.dao.fetchUserData()
        })
    }
    function propagatePreferences(e) {
        client.util.merge(this.preferences, e), this.ui.setPreferences(this.preferences);
        var t = this;
        client.util.forEach(this.selectors, function (e) {
            e.setPreferences(t.preferences)
        })
    }
    function propagateUserData() {
        this.ui.setUserData(this.user);
        var e = this;
        client.util.forEach(this.selectors, function (t) {
            t.setUserData(e.preferences)
        })
    }
    function propagateLoginStatus(e) {
        for (var t = 0; t < this.controls.length; t++) this.controls[t].setLoginState(e)
    }
    function invokeExtractor(e, t) {
        wireUpExtractor.call(this, e);
        var n = this.$.extend({}, t.extractionContext, {
            clipType: t.clipType,
            selectionType: t.selectionType
        });
        e.extract(t.selectionData, n)
    }
    function onUserDataReceived(e) {
        var t = !1,
            n = 0;
        return function (r) {
            if (r.error) {
                logMetric.call(e, "fetchUserDataFail", {
                    error: r.error
                });
                return
            }
            n++, Clipper.checkedLoginStatus || logMetric.call(e, "launch", {
                status: r.loggedIn ? "loggedIn" : "loggedOut",
                version: e.bookmarkletVersion
            }), Clipper.checkedLoginStatus = !0, r.autocompleteDict && window.CLIPBOARD.autocomplete.setData(r.autocompleteDict);
            if (r.thirdPartyCookiesEnabled) {
                r.config && (window.CLIPBOARD.config = r.config), propagateLoginStatus.call(e, r.loggedIn);
                if (!r.loggedIn) {
                    t = !0;
                    return
                }
                t && n > 0 && logMetric.call(e, "login"), e.user.guid = r.guid, e.user.sessionId = r.sessionId, e.user.login = r.login, e.user.name = r.name, e.user.boards = r.boards || [], propagatePreferences.call(e, r.preferences), propagateUserData.call(e, e.user), shouldShowNotification.call(e, r.notification) && (e.currentNotification = r.notification, e.ui.setNewNotificationContent(e.currentNotification.content)), e.preferences.showClipperFirstRun ? e.ui.doFirstRun() : clipBegin.call(e, defaultSelectorType.call(e), !0)
            } else onCookiesDisabled.call(e), logMetric.call(e, "info", {
                    data: "3rdPartyCookiesDisabled"
                })
        }
    }
    function shouldShowNotification(e) {
        if (!e) return !1;
        if (e.browsers === "all") return !0;
        var t = e.browsers.split(","),
            n = this.browser.toLowerCase();
        for (var r = 0; r < t.length; r++) if (t[r] === n) return !0;
        return !1
    }
    function wireUpDao() {
        var e = this;
        this.dao.on("boardCreationFailed", function (t) {
            logMetric.call(e, "boardCreateFail", {
                reason: t.reason
            }), e.ui.updateBoards(!0)
        }).on("boardCreationSucceeded", function (t) {
            logMetric.call(e, "boardCreateSuccess", {
                userGuid: e.user.guid,
                numMembers: t.numMembers,
                visibility: t.visibility
            }), e.ui.updateBoards(!1, [t])
        }).on("sendFailed", function (t) {
            logMetric.call(e, "sendFail", {
                reason: t.reason
            }), t.reason === "expiredSession" ? (cancelClipping.call(e), e.dao.fetchUserData()) : e.ui.showErrorNotification(getSendFailureMessage(t.reason))
        }).on("sendSucceeded", function (t) {
            logMetric.call(e, "sendSuccess", {
                saveDuration: t.duration
            });
            var n = client.util.strings.save_default;
            if (t.clipId) {
                var r = "http://" + window.CLIPBOARD.config.baseUrl + "/clip/" + t.clipId;
                n = {
                    text: n,
                    data: {
                        clipUrl: r
                    }
                }
            }
            e.ui.showNotification(n, 8e3), e.preferences.closeClipperAfterSaving && e.deactivate()
        }).on("notificationStatusUpdated", function () {
            e.ui.setNewNotificationContent(null), e.currentNotification = null
        }).on("updateNotificationStatusFailed", function (t) {
            logMetric.call(e, "notificationStatusFail", {
                error: t.error
            })
        }).on("userDataReceived", onUserDataReceived(this))
    }
    function wireUpSelector(e) {
        var t = this;
        e.on("canceled", function (e) {
            t.ui.hideNotification(), logMetric.call(t, "cancelClipMode", {
                source: e.source
            }), cancelClipping.call(t)
        }).on("scrolled", function (e) {
            logMetric.call(t, "scrollDuringExtract", {
                source: e.source
            })
        }).on("selectionEnded", function (e) {
            var n = t.activeSelector.getExtractor(e.clipType);
            if (!n) {
                logMetric.call(this, "info", {
                    clipType: e.clipType,
                    selectionType: e.selectionType,
                    data: "invalidSelectionType"
                });
                return
            }
            invokeExtractor.call(t, n, e)
        }).on("selectionFailed", function (e) {
            logMetric.call(t, "selectionFail", {
                reason: e.reason
            }), t.ui.showErrorNotification(getSelectionFailureMessage(e.reason))
        })
    }
    function wireUpExtractor(e) {
        var t = this;
        e.on("autoplayDisabled", function (e) {
            logMetric.call(t, "autoplayDisable", {
                source: e.source
            })
        }).on("sandboxBuilt", function (e) {
            e.nodeName !== "iframe" && logMetric.call(t, "sandbox", {
                type: e.nodeName,
                host: window.location.hostname
            })
        }).on("noText", function (e) {
            t.ui.showErrorNotification("Can't find article text :(", 5e3)
        }).on("extracted", function (n) {
            var r = {
                width: n.dimensions.width,
                height: n.dimensions.height,
                html: n.html,
                type: e.type,
                text: n.text,
                top: n.top,
                left: n.left,
                version: n.version || "0.2"
            };
            n.dimensions.trueHeight !== n.dimensions.height && (r.trueHeight = n.dimensions.trueHeight);
            var i = t.createClip(client.util.merge(n.clipData, r));
            logMetric.call(t, "extract", {
                elapsedTime: n.elapsedTime,
                hasUnreadNotification: !! t.currentNotification,
                type: n.clipType,
                selectionType: n.selectionType,
                rectangleColor: t.preferences.rectangleColor,
                rectangleInverse: t.preferences.rectangleInverse,
                reviewClip: t.preferences.reviewClip,
                publishByDefault: t.preferences.publishByDefault,
                connectedToTimeline: t.preferences.connectedToTimeline,
                connectedToFbStream: t.preferences.connectedToFbStream,
                connectedToTwitter: t.preferences.connectedToTwitter,
                compatMode: t.document.compatMode,
                documentWidth: t.$(t.document).width(),
                documentHeight: t.$(t.document).height()
            }), t.ui.handleExtraction({
                clip: i,
                rawHtml: n.html,
                data: n
            }), t.activeSelector.type === "element" && t.activeSelector.deactivate()
        }), this.debug.extractor && this.debug.extractor(e)
    }
    function wireUpEvents() {
        wireUpUi.call(this), wireUpDao.call(this);
        var e;
        for (e in this.selectors) {
            if (!this.selectors.hasOwnProperty(e)) continue;
            wireUpSelector.call(this, this.selectors[e])
        }
        for (e in this.extractors) {
            if (!this.extractors.hasOwnProperty(e)) continue;
            wireUpExtractor.call(this, this.extractors[e])
        }
        this.on("activated", function () {
            Clipper.cookiesDisabled && onCookiesDisabled.call(this)
        })
    }
    function onCookiesDisabled() {
        Clipper.cookiesDisabled = !0, this.deactivate(), this.ui.show3rdPartyCookiesErrorMessage()
    }
    function getDocumentId(e) {
        if (documents.indexOf) return documents.indexOf(e);
        for (var t = 0; t < documents.length; t++) if (documents[t] === e) return t;
        return -1
    }
    function getBodyOffset(e) {
        var t = e("<div/>").applyBlockStyles().cssImportant({
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            "margin-top": 0,
            "margin-bottom": 0,
            "margin-left": 0,
            "margin-right": 0,
            "background-color": "transparent"
        }).appendTo("body"),
            n = t.offset();
        return t.remove(), n
    }
    function supportsRgba(e) {
        var t = e("<div>").css({
            width: 0,
            height: 0,
            display: "none",
            "background-color": "rgba(64, 128, 256, 0.25)"
        }).appendTo("body"),
            n = t.css("background-color");
        return t.remove(), /^rgba/.test(n)
    }
    function calculateDpi(e) {
        var t = e("<div/>").css({
            width: "1in",
            visibility: "hidden",
            position: "absolute",
            left: "-10000px",
            "padding-top": 0,
            "padding-bottom": 0,
            "padding-left": 0,
            "padding-right": 0
        }).appendTo("body"),
            n = t.width();
        return t.remove(), t = null, n
    }
    function getBaseData(e) {
        var t = e("head base:first").attr("href");
        t || (t = window.location.href.replace(/#.*$/, ""));
        var n = document.createElement("a");
        n.href = t;
        var r = {
            uri: t,
            protocol: n.protocol,
            host: n.hostname,
            port: n.port,
            query: n.search,
            domainAndPort: /^https?:\/\/([^\/]+)/.exec(n.href)[1],
            path: n.pathname.replace(/^([^\/])/, "/$1"),
            relative: (n.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1]
        };
        return r.relativeDir = r.protocol + "//" + r.domainAndPort + client.util.dirname(r.relative), n = null, r
    }
    function initializeForDocument() {
        var cache = perDocumentCache[this.documentId];
        if (cache.$) return this.$ = cache.$, this.bodyOffset = cache.bodyOffset, this.baseData = cache.baseData, this.xdm = cache.xdm, !1;
        (function () {
            (function (e, t) {
                function u(e) {
                    var t = o[e] = {}, n, r;
                    e = e.split(/\s+/);
                    for (n = 0, r = e.length; n < r; n++) t[e[n]] = !0;
                    return t
                }
                function c(e, n, r) {
                    if (r === t && e.nodeType === 1) {
                        var i = "data-" + n.replace(l, "-$1").toLowerCase();
                        r = e.getAttribute(i);
                        if (typeof r == "string") {
                            try {
                                r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : s.isNumeric(r) ? parseFloat(r) : f.test(r) ? s.parseJSON(r) : r
                            } catch (o) {}
                            s.data(e, n, r)
                        } else r = t
                    }
                    return r
                }
                function h(e) {
                    for (var t in e) {
                        if (t === "data" && s.isEmptyObject(e[t])) continue;
                        if (t !== "toJSON") return !1
                    }
                    return !0
                }
                function p(e, t, n) {
                    var r = t + "defer",
                        i = t + "queue",
                        o = t + "mark",
                        u = s._data(e, r);
                    u && (n === "queue" || !s._data(e, i)) && (n === "mark" || !s._data(e, o)) && setTimeout(function () {
                        !s._data(e, i) && !s._data(e, o) && (s.removeData(e, r, !0), u.fire())
                    }, 0)
                }
                function H() {
                    return !1
                }
                function B() {
                    return !0
                }
                function W(e) {
                    return !e || !e.parentNode || e.parentNode.nodeType === 11
                }
                function X(e, t, n) {
                    t = t || 0;
                    if (s.isFunction(t)) return s.grep(e, function (e, r) {
                            var i = !! t.call(e, r, e);
                            return i === n
                        });
                    if (t.nodeType) return s.grep(e, function (e, r) {
                            return e === t === n
                        });
                    if (typeof t == "string") {
                        var r = s.grep(e, function (e) {
                            return e.nodeType === 1
                        });
                        if (q.test(t)) return s.filter(t, r, !n);
                        t = s.filter(t, r)
                    }
                    return s.grep(e, function (e, r) {
                        return s.inArray(e, t) >= 0 === n
                    })
                }
                function V(e) {
                    var t = $.split("|"),
                        n = e.createDocumentFragment();
                    if (n.createElement) while (t.length) n.createElement(t.pop());
                    return n
                }
                function at(e, t) {
                    return s.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
                }
                function ft(e, t) {
                    if (t.nodeType !== 1 || !s.hasData(e)) return;
                    var n, r, i, o = s._data(e),
                        u = s._data(t, o),
                        a = o.events;
                    if (a) {
                        delete u.handle, u.events = {};
                        for (n in a) for (r = 0, i = a[n].length; r < i; r++) s.event.add(t, n + (a[n][r].namespace ? "." : "") + a[n][r].namespace, a[n][r], a[n][r].data)
                    }
                    u.data && (u.data = s.extend({}, u.data))
                }
                function lt(e, t) {
                    var n;
                    if (t.nodeType !== 1) return;
                    t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase();
                    if (n === "object") t.outerHTML = e.outerHTML, s.support.html5Clone && e.innerHTML && !s.trim(t.innerHTML) && (t.innerHTML = e.innerHTML);
                    else if (n !== "input" || e.type !== "checkbox" && e.type !== "radio") {
                        if (n === "option") t.selected = e.defaultSelected;
                        else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
                    } else e.checked && (t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value);
                    t.removeAttribute(s.expando)
                }
                function ct(e) {
                    return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
                }
                function ht(e) {
                    if (e.type === "checkbox" || e.type === "radio") e.defaultChecked = e.checked
                }
                function pt(e) {
                    var t = (e.nodeName || "").toLowerCase();
                    t === "input" ? ht(e) : t !== "script" && typeof e.getElementsByTagName != "undefined" && s.grep(e.getElementsByTagName("input"), ht)
                }
                function dt(e) {
                    var t = n.createElement("div");
                    return ut.appendChild(t), t.innerHTML = e.outerHTML, t.firstChild
                }
                function vt(e, t) {
                    t.src ? s.ajax({
                        url: t.src,
                        async: !1,
                        dataType: "script"
                    }) : s.globalEval((t.text || t.textContent || t.innerHTML || "").replace(st, "/*$0*/")), t.parentNode && t.parentNode.removeChild(t)
                }
                function Lt(e, t, n) {
                    var r = t === "width" ? e.offsetWidth : e.offsetHeight,
                        i = t === "width" ? xt : Tt,
                        o = 0,
                        u = i.length;
                    if (r > 0) {
                        if (n !== "border") for (; o < u; o++) n || (r -= parseFloat(s.css(e, "padding" + i[o])) || 0), n === "margin" ? r += parseFloat(s.css(e, n + i[o])) || 0 : r -= parseFloat(s.css(e, "border" + i[o] + "Width")) || 0;
                        return r + "px"
                    }
                    r = Nt(e, t, t);
                    if (r < 0 || r == null) r = e.style[t] || 0;
                    r = parseFloat(r) || 0;
                    if (n) for (; o < u; o++) r += parseFloat(s.css(e, "padding" + i[o])) || 0, n !== "padding" && (r += parseFloat(s.css(e, "border" + i[o] + "Width")) || 0), n === "margin" && (r += parseFloat(s.css(e, n + i[o])) || 0);
                    return r + "px"
                }
                function Gt(e) {
                    return function (t, n) {
                        typeof t != "string" && (n = t, t = "*");
                        if (s.isFunction(n)) {
                            var r = t.toLowerCase().split(Rt),
                                i = 0,
                                o = r.length,
                                u, a, f;
                            for (; i < o; i++) u = r[i], f = /^\+/.test(u), f && (u = u.substr(1) || "*"), a = e[u] = e[u] || [], a[f ? "unshift" : "push"](n)
                        }
                    }
                }
                function Yt(e, n, r, i, s, o) {
                    s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
                    var u = e[s],
                        a = 0,
                        f = u ? u.length : 0,
                        l = e === Xt,
                        c;
                    for (; a < f && (l || !c); a++) c = u[a](n, r, i), typeof c == "string" && (!l || o[c] ? c = t : (n.dataTypes.unshift(c), c = Yt(e, n, r, i, c, o)));
                    return (l || !c) && !o["*"] && (c = Yt(e, n, r, i, "*", o)), c
                }
                function Zt(e, n) {
                    var r, i, o = s.ajaxSettings.flatOptions || {};
                    for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
                    i && s.extend(!0, e, i)
                }
                function en(e, t, n, r) {
                    if (s.isArray(t)) s.each(t, function (t, i) {
                            n || Ot.test(e) ? r(e, i) : en(e + "[" + (typeof i == "object" || s.isArray(i) ? t : "") + "]", i, n, r)
                        });
                    else if (!n && t != null && typeof t == "object") for (var i in t) en(e + "[" + i + "]", t[i], n, r);
                    else r(e, t)
                }
                function tn(e, n, r) {
                    var i = e.contents,
                        s = e.dataTypes,
                        o = e.responseFields,
                        u, a, f, l;
                    for (a in o) a in r && (n[o[a]] = r[a]);
                    while (s[0] === "*") s.shift(), u === t && (u = e.mimeType || n.getResponseHeader("content-type"));
                    if (u) for (a in i) if (i[a] && i[a].test(u)) {
                                s.unshift(a);
                                break
                            }
                    if (s[0] in r) f = s[0];
                    else {
                        for (a in r) {
                            if (!s[0] || e.converters[a + " " + s[0]]) {
                                f = a;
                                break
                            }
                            l || (l = a)
                        }
                        f = f || l
                    } if (f) return f !== s[0] && s.unshift(f), r[f]
                }
                function nn(e, n) {
                    e.dataFilter && (n = e.dataFilter(n, e.dataType));
                    var r = e.dataTypes,
                        i = {}, o, u, a = r.length,
                        f, l = r[0],
                        c, h, p, d, v;
                    for (o = 1; o < a; o++) {
                        if (o === 1) for (u in e.converters) typeof u == "string" && (i[u.toLowerCase()] = e.converters[u]);
                        c = l, l = r[o];
                        if (l === "*") l = c;
                        else if (c !== "*" && c !== l) {
                            h = c + " " + l, p = i[h] || i["* " + l];
                            if (!p) {
                                v = t;
                                for (d in i) {
                                    f = d.split(" ");
                                    if (f[0] === c || f[0] === "*") {
                                        v = i[f[1] + " " + l];
                                        if (v) {
                                            d = i[d], d === !0 ? p = v : v === !0 && (p = d);
                                            break
                                        }
                                    }
                                }
                            }!p && !v && s.error("No conversion from " + h.replace(" ", " to ")), p !== !0 && (n = p ? p(n) : v(d(n)))
                        }
                    }
                    return n
                }
                function fn() {
                    try {
                        return new e.XMLHttpRequest
                    } catch (t) {}
                }
                function ln() {
                    try {
                        return new e.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (t) {}
                }
                function bn() {
                    return setTimeout(wn, 0), yn = s.now()
                }
                function wn() {
                    yn = t
                }
                function En(e, t) {
                    var n = {};
                    return s.each(gn.concat.apply([], gn.slice(0, t)), function () {
                        n[this] = e
                    }), n
                }
                function Sn(e) {
                    if (!cn[e]) {
                        var t = n.body,
                            r = s("<" + e + ">").appendTo(t),
                            i = r.css("display");
                        r.remove();
                        if (i === "none" || i === "") {
                            hn || (hn = n.createElement("iframe"), hn.frameBorder = hn.width = hn.height = 0), t.appendChild(hn);
                            if (!pn || !hn.createElement) pn = (hn.contentWindow || hn.contentDocument).document, pn.write((n.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), pn.close();
                            r = pn.createElement(e), pn.body.appendChild(r), i = s.css(r, "display"), t.removeChild(hn)
                        }
                        cn[e] = i
                    }
                    return cn[e]
                }
                function Nn(e) {
                    return s.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
                }
                var n = e.document,
                    r = e.navigator,
                    i = e.location,
                    s = function () {
                        function H() {
                            if (i.isReady) return;
                            try {
                                n.documentElement.doScroll("left")
                            } catch (e) {
                                setTimeout(H, 1);
                                return
                            }
                            i.ready()
                        }
                        var i = function (e, t) {
                            return new i.fn.init(e, t, u)
                        }, s = e.jQuery,
                            o = e.$,
                            u, a = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                            f = /\S/,
                            l = /^\s+/,
                            c = /\s+$/,
                            h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                            p = /^[\],:{}\s]*$/,
                            d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                            v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                            m = /(?:^|:|,)(?:\s*\[)+/g,
                            g = /(webkit)[ \/]([\w.]+)/,
                            y = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                            b = /(msie) ([\w.]+)/,
                            w = /(mozilla)(?:.*? rv:([\w.]+))?/,
                            E = /-([a-z]|[0-9])/ig,
                            S = /^-ms-/,
                            x = function (e, t) {
                                return (t + "").toUpperCase()
                            }, T = r.userAgent,
                            N, C, k, L = Object.prototype.toString,
                            A = Object.prototype.hasOwnProperty,
                            O = Array.prototype.push,
                            M = Array.prototype.slice,
                            _ = String.prototype.trim,
                            D = Array.prototype.indexOf,
                            P = {};
                        return i.fn = i.prototype = {
                            constructor: i,
                            init: function (e, r, s) {
                                var o, u, f, l;
                                if (!e) return this;
                                if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
                                if (e === "body" && !r && n.body) return this.context = n, this[0] = n.body, this.selector = e, this.length = 1, this;
                                if (typeof e == "string") {
                                    e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? o = [null, e, null] : o = a.exec(e);
                                    if (o && (o[1] || !r)) {
                                        if (o[1]) return r = r instanceof i ? r[0] : r, l = r ? r.ownerDocument || r : n, f = h.exec(e), f ? i.isPlainObject(r) ? (e = [n.createElement(f[1])], i.fn.attr.call(e, r, !0)) : e = [l.createElement(f[1])] : (f = i.buildFragment([o[1]], [l]), e = (f.cacheable ? i.clone(f.fragment) : f.fragment).childNodes), i.merge(this, e);
                                        u = n.getElementById(o[2]);
                                        if (u && u.parentNode) {
                                            if (u.id !== o[2]) return s.find(e);
                                            this.length = 1, this[0] = u
                                        }
                                        return this.context = n, this.selector = e, this
                                    }
                                    return !r || r.jquery ? (r || s).find(e) : this.constructor(r).find(e)
                                }
                                return i.isFunction(e) ? s.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), i.makeArray(e, this))
                            },
                            selector: "",
                            jquery: "1.7.1",
                            length: 0,
                            size: function () {
                                return this.length
                            },
                            toArray: function () {
                                return M.call(this, 0)
                            },
                            get: function (e) {
                                return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
                            },
                            pushStack: function (e, t, n) {
                                var r = this.constructor();
                                return i.isArray(e) ? O.apply(r, e) : i.merge(r, e), r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
                            },
                            each: function (e, t) {
                                return i.each(this, e, t)
                            },
                            ready: function (e) {
                                return i.bindReady(), C.add(e), this
                            },
                            eq: function (e) {
                                return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1)
                            },
                            first: function () {
                                return this.eq(0)
                            },
                            last: function () {
                                return this.eq(-1)
                            },
                            slice: function () {
                                return this.pushStack(M.apply(this, arguments), "slice", M.call(arguments).join(","))
                            },
                            map: function (e) {
                                return this.pushStack(i.map(this, function (t, n) {
                                    return e.call(t, n, t)
                                }))
                            },
                            end: function () {
                                return this.prevObject || this.constructor(null)
                            },
                            push: O,
                            sort: [].sort,
                            splice: [].splice
                        }, i.fn.init.prototype = i.fn, i.extend = i.fn.extend = function () {
                            var e, n, r, s, o, u, a = arguments[0] || {}, f = 1,
                                l = arguments.length,
                                c = !1;
                            typeof a == "boolean" && (c = a, a = arguments[1] || {}, f = 2), typeof a != "object" && !i.isFunction(a) && (a = {}), l === f && (a = this, --f);
                            for (; f < l; f++) if ((e = arguments[f]) != null) for (n in e) {
                                        if (!A.call(e, n)) continue;
                                        r = a[n], s = e[n];
                                        if (a === s) continue;
                                        c && s && (i.isPlainObject(s) || (o = i.isArray(s))) ? (o ? (o = !1, u = r && i.isArray(r) ? r : []) : u = r && i.isPlainObject(r) ? r : {}, a[n] = i.extend(c, u, s)) : s !== t && (a[n] = s)
                                }
                            return a
                        }, i.extend({
                            noConflict: function (t) {
                                return e.$ === i && (e.$ = o), t && e.jQuery === i && (e.jQuery = s), i
                            },
                            isReady: !1,
                            readyWait: 1,
                            holdReady: function (e) {
                                e ? i.readyWait++ : i.ready(!0)
                            },
                            ready: function (e) {
                                if (e === !0 && !--i.readyWait || e !== !0 && !i.isReady) {
                                    if (!n.body) return setTimeout(i.ready, 1);
                                    i.isReady = !0;
                                    if (e !== !0 && --i.readyWait > 0) return;
                                    C.fireWith(n, [i]), i.fn.trigger && i(n).trigger("ready").off("ready")
                                }
                            },
                            bindReady: function () {
                                if (C) return;
                                C = i.Callbacks("once memory");
                                if (n.readyState === "complete") return setTimeout(i.ready, 1);
                                if (n.addEventListener) n.addEventListener("DOMContentLoaded", k, !1), e.addEventListener("load", i.ready, !1);
                                else if (n.attachEvent) {
                                    n.attachEvent("onreadystatechange", k), e.attachEvent("onload", i.ready);
                                    var t = !1;
                                    try {
                                        t = e.frameElement == null
                                    } catch (r) {}
                                    n.documentElement.doScroll && t && H()
                                }
                            },
                            isFunction: function (e) {
                                return i.type(e) === "function"
                            },
                            isArray: Array.isArray || function (e) {
                                return i.type(e) === "array"
                            },
                            isWindow: function (e) {
                                return e && typeof e == "object" && "setInterval" in e
                            },
                            isNumeric: function (e) {
                                return !isNaN(parseFloat(e)) && isFinite(e)
                            },
                            type: function (e) {
                                return e == null ? String(e) : P[L.call(e)] || "object"
                            },
                            isPlainObject: function (e) {
                                if (!e || i.type(e) !== "object" || e.nodeType || i.isWindow(e)) return !1;
                                try {
                                    if (e.constructor && !A.call(e, "constructor") && !A.call(e.constructor.prototype, "isPrototypeOf")) return !1
                                } catch (n) {
                                    return !1
                                }
                                var r;
                                for (r in e);
                                return r === t || A.call(e, r)
                            },
                            isEmptyObject: function (e) {
                                for (var t in e) return !1;
                                return !0
                            },
                            error: function (e) {
                                throw new Error(e)
                            },
                            parseJSON: function (t) {
                                if (typeof t != "string" || !t) return null;
                                t = i.trim(t);
                                if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
                                if (p.test(t.replace(d, "@").replace(v, "]").replace(m, ""))) return (new Function("return " + t))();
                                i.error("Invalid JSON: " + t)
                            },
                            parseXML: function (n) {
                                var r, s;
                                try {
                                    e.DOMParser ? (s = new DOMParser, r = s.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
                                } catch (o) {
                                    r = t
                                }
                                return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + n), r
                            },
                            noop: function () {},
                            globalEval: function (t) {
                                t && f.test(t) && (e.execScript || function (t) {
                                    e.eval.call(e, t)
                                })(t)
                            },
                            camelCase: function (e) {
                                return e.replace(S, "ms-").replace(E, x)
                            },
                            nodeName: function (e, t) {
                                return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
                            },
                            each: function (e, n, r) {
                                var s, o = 0,
                                    u = e.length,
                                    a = u === t || i.isFunction(e);
                                if (r) {
                                    if (a) for (s in e) {
                                            if (!A.call(e, s)) continue;
                                            if (n.apply(e[s], r) === !1) break
                                    } else for (; o < u;) if (n.apply(e[o++], r) === !1) break
                                } else if (a) for (s in e) {
                                        if (!A.call(e, s)) continue;
                                        if (n.call(e[s], s, e[s]) === !1) break
                                } else for (; o < u;) if (n.call(e[o], o, e[o++]) === !1) break; return e
                            },
                            trim: _ ? function (e) {
                                return e == null ? "" : _.call(e)
                            } : function (e) {
                                return e == null ? "" : e.toString().replace(l, "").replace(c, "")
                            },
                            makeArray: function (e, t) {
                                var n = t || [];
                                if (e != null) {
                                    var r = i.type(e);
                                    e.length == null || r === "string" || r === "function" || r === "regexp" || i.isWindow(e) ? O.call(n, e) : i.merge(n, e)
                                }
                                return n
                            },
                            inArray: function (e, t, n) {
                                var r;
                                if (t) {
                                    if (D) return D.call(t, e, n);
                                    r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                                    for (; n < r; n++) if (n in t && t[n] === e) return n
                                }
                                return -1
                            },
                            merge: function (e, n) {
                                var r = e.length,
                                    i = 0;
                                if (typeof n.length == "number") for (var s = n.length; i < s; i++) e[r++] = n[i];
                                else while (n[i] !== t) e[r++] = n[i++];
                                return e.length = r, e
                            },
                            grep: function (e, t, n) {
                                var r = [],
                                    i;
                                n = !! n;
                                for (var s = 0, o = e.length; s < o; s++) i = !! t(e[s], s), n !== i && r.push(e[s]);
                                return r
                            },
                            map: function (e, n, r) {
                                var s, o, u = [],
                                    a = 0,
                                    f = e.length,
                                    l = e instanceof i || f !== t && typeof f == "number" && (f > 0 && e[0] && e[f - 1] || f === 0 || i.isArray(e));
                                if (l) for (; a < f; a++) s = n(e[a], a, r), s != null && (u[u.length] = s);
                                else for (o in e) s = n(e[o], o, r), s != null && (u[u.length] = s);
                                return u.concat.apply([], u)
                            },
                            guid: 1,
                            proxy: function (e, n) {
                                if (typeof n == "string") {
                                    var r = e[n];
                                    n = e, e = r
                                }
                                if (!i.isFunction(e)) return t;
                                var s = M.call(arguments, 2),
                                    o = function () {
                                        return e.apply(n, s.concat(M.call(arguments)))
                                    };
                                return o.guid = e.guid = e.guid || o.guid || i.guid++, o
                            },
                            access: function (e, n, r, s, o, u) {
                                var a = e.length;
                                if (typeof n == "object") {
                                    for (var f in n) i.access(e, f, n[f], s, o, r);
                                    return e
                                }
                                if (r !== t) {
                                    s = !u && s && i.isFunction(r);
                                    for (var l = 0; l < a; l++) o(e[l], n, s ? r.call(e[l], l, o(e[l], n)) : r, u);
                                    return e
                                }
                                return a ? o(e[0], n) : t
                            },
                            now: function () {
                                return (new Date).getTime()
                            },
                            uaMatch: function (e) {
                                e = e.toLowerCase();
                                var t = g.exec(e) || y.exec(e) || b.exec(e) || e.indexOf("compatible") < 0 && w.exec(e) || [];
                                return {
                                    browser: t[1] || "",
                                    version: t[2] || "0"
                                }
                            },
                            sub: function () {
                                function e(t, n) {
                                    return new e.fn.init(t, n)
                                }
                                i.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, s) {
                                    return s && s instanceof i && !(s instanceof e) && (s = e(s)), i.fn.init.call(this, r, s, t)
                                }, e.fn.init.prototype = e.fn;
                                var t = e(n);
                                return e
                            },
                            browser: {}
                        }), i.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
                            P["[object " + t + "]"] = t.toLowerCase()
                        }), N = i.uaMatch(T), N.browser && (i.browser[N.browser] = !0, i.browser.version = N.version), i.browser.webkit && (i.browser.safari = !0), f.test(" ") && (l = /^[\s\xA0]+/, c = /[\s\xA0]+$/), u = i(n), n.addEventListener ? k = function () {
                            n.removeEventListener("DOMContentLoaded", k, !1), i.ready()
                        } : n.attachEvent && (k = function () {
                            n.readyState === "complete" && (n.detachEvent("onreadystatechange", k), i.ready())
                        }), i
                    }(),
                    o = {};
                s.Callbacks = function (e) {
                    e = e ? o[e] || u(e) : {};
                    var n = [],
                        r = [],
                        i, a, f, l, c, h = function (t) {
                            var r, i, o, u, a;
                            for (r = 0, i = t.length; r < i; r++) o = t[r], u = s.type(o), u === "array" ? h(o) : u === "function" && (!e.unique || !d.has(o)) && n.push(o)
                        }, p = function (t, s) {
                            s = s || [], i = !e.memory || [t, s], a = !0, c = f || 0, f = 0, l = n.length;
                            for (; n && c < l; c++) if (n[c].apply(t, s) === !1 && e.stopOnFalse) {
                                    i = !0;
                                    break
                                }
                            a = !1, n && (e.once ? i === !0 ? d.disable() : n = [] : r && r.length && (i = r.shift(), d.fireWith(i[0], i[1])))
                        }, d = {
                            add: function () {
                                if (n) {
                                    var e = n.length;
                                    h(arguments), a ? l = n.length : i && i !== !0 && (f = e, p(i[0], i[1]))
                                }
                                return this
                            },
                            remove: function () {
                                if (n) {
                                    var t = arguments,
                                        r = 0,
                                        i = t.length;
                                    for (; r < i; r++) for (var s = 0; s < n.length; s++) if (t[r] === n[s]) {
                                                a && s <= l && (l--, s <= c && c--), n.splice(s--, 1);
                                                if (e.unique) break
                                            }
                                }
                                return this
                            },
                            has: function (e) {
                                if (n) {
                                    var t = 0,
                                        r = n.length;
                                    for (; t < r; t++) if (e === n[t]) return !0
                                }
                                return !1
                            },
                            empty: function () {
                                return n = [], this
                            },
                            disable: function () {
                                return n = r = i = t, this
                            },
                            disabled: function () {
                                return !n
                            },
                            lock: function () {
                                return r = t, (!i || i === !0) && d.disable(), this
                            },
                            locked: function () {
                                return !r
                            },
                            fireWith: function (t, n) {
                                return r && (a ? e.once || r.push([t, n]) : (!e.once || !i) && p(t, n)), this
                            },
                            fire: function () {
                                return d.fireWith(this, arguments), this
                            },
                            fired: function () {
                                return !!i
                            }
                        };
                    return d
                };
                var a = [].slice;
                s.extend({
                    Deferred: function (e) {
                        var t = s.Callbacks("once memory"),
                            n = s.Callbacks("once memory"),
                            r = s.Callbacks("memory"),
                            i = "pending",
                            o = {
                                resolve: t,
                                reject: n,
                                notify: r
                            }, u = {
                                done: t.add,
                                fail: n.add,
                                progress: r.add,
                                state: function () {
                                    return i
                                },
                                isResolved: t.fired,
                                isRejected: n.fired,
                                then: function (e, t, n) {
                                    return a.done(e).fail(t).progress(n), this
                                },
                                always: function () {
                                    return a.done.apply(a, arguments).fail.apply(a, arguments), this
                                },
                                pipe: function (e, t, n) {
                                    return s.Deferred(function (r) {
                                        s.each({
                                            done: [e, "resolve"],
                                            fail: [t, "reject"],
                                            progress: [n, "notify"]
                                        }, function (e, t) {
                                            var n = t[0],
                                                i = t[1],
                                                o;
                                            s.isFunction(n) ? a[e](function () {
                                                o = n.apply(this, arguments), o && s.isFunction(o.promise) ? o.promise().then(r.resolve, r.reject, r.notify) : r[i + "With"](this === a ? r : this, [o])
                                            }) : a[e](r[i])
                                        })
                                    }).promise()
                                },
                                promise: function (e) {
                                    if (e == null) e = u;
                                    else for (var t in u) e[t] = u[t];
                                    return e
                                }
                            }, a = u.promise({}),
                            f;
                        for (f in o) a[f] = o[f].fire, a[f + "With"] = o[f].fireWith;
                        return a.done(function () {
                            i = "resolved"
                        }, n.disable, r.lock).fail(function () {
                            i = "rejected"
                        }, t.disable, r.lock), e && e.call(a, a), a
                    },
                    when: function (e) {
                        function c(e) {
                            return function (n) {
                                t[e] = arguments.length > 1 ? a.call(arguments, 0) : n, --o || f.resolveWith(f, t)
                            }
                        }
                        function h(e) {
                            return function (t) {
                                i[e] = arguments.length > 1 ? a.call(arguments, 0) : t, f.notifyWith(l, i)
                            }
                        }
                        var t = a.call(arguments, 0),
                            n = 0,
                            r = t.length,
                            i = new Array(r),
                            o = r,
                            u = r,
                            f = r <= 1 && e && s.isFunction(e.promise) ? e : s.Deferred(),
                            l = f.promise();
                        if (r > 1) {
                            for (; n < r; n++) t[n] && t[n].promise && s.isFunction(t[n].promise) ? t[n].promise().then(c(n), f.reject, h(n)) : --o;
                            o || f.resolveWith(f, t)
                        } else f !== e && f.resolveWith(f, r ? [e] : []);
                        return l
                    }
                }), s.support = function () {
                    var t, r, i, o, u, a, f, l, c, h, p, d, v, m = n.createElement("div"),
                        g = n.documentElement;
                    m.setAttribute("className", "t"), m.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", r = m.getElementsByTagName("*"), i = m.getElementsByTagName("a")[0];
                    if (!r || !r.length || !i) return {};
                    o = n.createElement("select"), u = o.appendChild(n.createElement("option")), a = m.getElementsByTagName("input")[0], t = {
                        leadingWhitespace: m.firstChild.nodeType === 3,
                        tbody: !m.getElementsByTagName("tbody").length,
                        htmlSerialize: !! m.getElementsByTagName("link").length,
                        style: /top/.test(i.getAttribute("style")),
                        hrefNormalized: i.getAttribute("href") === "/a",
                        opacity: /^0.55/.test(i.style.opacity),
                        cssFloat: !! i.style.cssFloat,
                        checkOn: a.value === "on",
                        optSelected: u.selected,
                        getSetAttribute: m.className !== "t",
                        enctype: !! n.createElement("form").enctype,
                        html5Clone: n.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
                        submitBubbles: !0,
                        changeBubbles: !0,
                        focusinBubbles: !1,
                        deleteExpando: !0,
                        noCloneEvent: !0,
                        inlineBlockNeedsLayout: !1,
                        shrinkWrapBlocks: !1,
                        reliableMarginRight: !0
                    }, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !u.disabled;
                    try {
                        delete m.test
                    } catch (y) {
                        t.deleteExpando = !1
                    }!m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", function () {
                        t.noCloneEvent = !1
                    }), m.cloneNode(!0).fireEvent("onclick")), a = n.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = a.value === "t", a.setAttribute("checked", "checked"), m.appendChild(a), l = n.createDocumentFragment(), l.appendChild(m.lastChild), t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = a.checked, l.removeChild(a), l.appendChild(m), m.innerHTML = "", e.getComputedStyle && (f = n.createElement("div"), f.style.width = "0", f.style.marginRight = "0", m.style.width = "2px", m.appendChild(f), t.reliableMarginRight = (parseInt((e.getComputedStyle(f, null) || {
                        marginRight: 0
                    }).marginRight, 10) || 0) === 0);
                    if (m.attachEvent) for (d in {
                            submit: 1,
                            change: 1,
                            focusin: 1
                        }) p = "on" + d, v = p in m, v || (m.setAttribute(p, "return;"), v = typeof m[p] == "function"), t[d + "Bubbles"] = v;
                    return l.removeChild(m), l = o = u = f = m = a = null, s(function () {
                        var e, r, i, o, u, a, f, l, h, p, d, g = n.getElementsByTagName("body")[0];
                        if (!g) return;
                        f = 1, l = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", h = "visibility:hidden;border:0;", p = "style='" + l + "border:5px solid #000;padding:0;'", d = "<div " + p + "><div></div></div>" + "<table " + p + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", e = n.createElement("div"), e.style.cssText = h + "width:0;height:0;position:static;top:0;margin-top:" + f + "px", g.insertBefore(e, g.firstChild), m = n.createElement("div"), e.appendChild(m), m.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", c = m.getElementsByTagName("td"), v = c[0].offsetHeight === 0, c[0].style.display = "", c[1].style.display = "none", t.reliableHiddenOffsets = v && c[0].offsetHeight === 0, m.innerHTML = "", m.style.width = m.style.paddingLeft = "1px", s.boxModel = t.boxModel = m.offsetWidth === 2, typeof m.style.zoom != "undefined" && (m.style.display = "inline", m.style.zoom = 1, t.inlineBlockNeedsLayout = m.offsetWidth === 2, m.style.display = "", m.innerHTML = "<div style='width:4px;'></div>", t.shrinkWrapBlocks = m.offsetWidth !== 2), m.style.cssText = l + h, m.innerHTML = d, r = m.firstChild, i = r.firstChild, u = r.nextSibling.firstChild.firstChild, a = {
                            doesNotAddBorder: i.offsetTop !== 5,
                            doesAddBorderForTableAndCells: u.offsetTop === 5
                        }, i.style.position = "fixed", i.style.top = "20px", a.fixedPosition = i.offsetTop === 20 || i.offsetTop === 15, i.style.position = i.style.top = "", r.style.overflow = "hidden", r.style.position = "relative", a.subtractsBorderForOverflowNotVisible = i.offsetTop === -5, a.doesNotIncludeMarginInBodyOffset = g.offsetTop !== f, g.removeChild(e), m = e = null, s.extend(t, a)
                    }), t
                }();
                var f = /^(?:\{.*\}|\[.*\])$/,
                    l = /([A-Z])/g;
                s.extend({
                    cache: {},
                    uuid: 0,
                    expando: "jQuery" + (s.fn.jquery + Math.random()).replace(/\D/g, ""),
                    noData: {
                        embed: !0,
                        object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                        applet: !0
                    },
                    hasData: function (e) {
                        return e = e.nodeType ? s.cache[e[s.expando]] : e[s.expando], !! e && !h(e)
                    },
                    data: function (e, n, r, i) {
                        if (!s.acceptData(e)) return;
                        var o, u, a, f = s.expando,
                            l = typeof n == "string",
                            c = e.nodeType,
                            h = c ? s.cache : e,
                            p = c ? e[f] : e[f] && f,
                            d = n === "events";
                        if ((!p || !h[p] || !d && !i && !h[p].data) && l && r === t) return;
                        p || (c ? e[f] = p = ++s.uuid : p = f), h[p] || (h[p] = {}, c || (h[p].toJSON = s.noop));
                        if (typeof n == "object" || typeof n == "function") i ? h[p] = s.extend(h[p], n) : h[p].data = s.extend(h[p].data, n);
                        return o = u = h[p], i || (u.data || (u.data = {}), u = u.data), r !== t && (u[s.camelCase(n)] = r), d && !u[n] ? o.events : (l ? (a = u[n], a == null && (a = u[s.camelCase(n)])) : a = u, a)
                    },
                    removeData: function (e, t, n) {
                        if (!s.acceptData(e)) return;
                        var r, i, o, u = s.expando,
                            a = e.nodeType,
                            f = a ? s.cache : e,
                            l = a ? e[u] : u;
                        if (!f[l]) return;
                        if (t) {
                            r = n ? f[l] : f[l].data;
                            if (r) {
                                s.isArray(t) || (t in r ? t = [t] : (t = s.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                                for (i = 0, o = t.length; i < o; i++) delete r[t[i]];
                                if (!(n ? h : s.isEmptyObject)(r)) return
                            }
                        }
                        if (!n) {
                            delete f[l].data;
                            if (!h(f[l])) return
                        }
                        s.support.deleteExpando || !f.setInterval ? delete f[l] : f[l] = null, a && (s.support.deleteExpando ? delete e[u] : e.removeAttribute ? e.removeAttribute(u) : e[u] = null)
                    },
                    _data: function (e, t, n) {
                        return s.data(e, t, n, !0)
                    },
                    acceptData: function (e) {
                        if (e.nodeName) {
                            var t = s.noData[e.nodeName.toLowerCase()];
                            if (t) return t !== !0 && e.getAttribute("classid") === t
                        }
                        return !0
                    }
                }), s.fn.extend({
                    data: function (e, n) {
                        var r, i, o, u = null;
                        if (typeof e == "undefined") {
                            if (this.length) {
                                u = s.data(this[0]);
                                if (this[0].nodeType === 1 && !s._data(this[0], "parsedAttrs")) {
                                    i = this[0].attributes;
                                    for (var a = 0, f = i.length; a < f; a++) o = i[a].name, o.indexOf("data-") === 0 && (o = s.camelCase(o.substring(5)), c(this[0], o, u[o]));
                                    s._data(this[0], "parsedAttrs", !0)
                                }
                            }
                            return u
                        }
                        return typeof e == "object" ? this.each(function () {
                            s.data(this, e)
                        }) : (r = e.split("."), r[1] = r[1] ? "." + r[1] : "", n === t ? (u = this.triggerHandler("getData" + r[1] + "!", [r[0]]), u === t && this.length && (u = s.data(this[0], e), u = c(this[0], e, u)), u === t && r[1] ? this.data(r[0]) : u) : this.each(function () {
                            var t = s(this),
                                i = [r[0], n];
                            t.triggerHandler("setData" + r[1] + "!", i), s.data(this, e, n), t.triggerHandler("changeData" + r[1] + "!", i)
                        }))
                    },
                    removeData: function (e) {
                        return this.each(function () {
                            s.removeData(this, e)
                        })
                    }
                }), s.extend({
                    _mark: function (e, t) {
                        e && (t = (t || "fx") + "mark", s._data(e, t, (s._data(e, t) || 0) + 1))
                    },
                    _unmark: function (e, t, n) {
                        e !== !0 && (n = t, t = e, e = !1);
                        if (t) {
                            n = n || "fx";
                            var r = n + "mark",
                                i = e ? 0 : (s._data(t, r) || 1) - 1;
                            i ? s._data(t, r, i) : (s.removeData(t, r, !0), p(t, n, "mark"))
                        }
                    },
                    queue: function (e, t, n) {
                        var r;
                        if (e) return t = (t || "fx") + "queue", r = s._data(e, t), n && (!r || s.isArray(n) ? r = s._data(e, t, s.makeArray(n)) : r.push(n)), r || []
                    },
                    dequeue: function (e, t) {
                        t = t || "fx";
                        var n = s.queue(e, t),
                            r = n.shift(),
                            i = {};
                        r === "inprogress" && (r = n.shift()), r && (t === "fx" && n.unshift("inprogress"), s._data(e, t + ".run", i), r.call(e, function () {
                            s.dequeue(e, t)
                        }, i)), n.length || (s.removeData(e, t + "queue " + t + ".run", !0), p(e, t, "queue"))
                    }
                }), s.fn.extend({
                    queue: function (e, n) {
                        return typeof e != "string" && (n = e, e = "fx"), n === t ? s.queue(this[0], e) : this.each(function () {
                            var t = s.queue(this, e, n);
                            e === "fx" && t[0] !== "inprogress" && s.dequeue(this, e)
                        })
                    },
                    dequeue: function (e) {
                        return this.each(function () {
                            s.dequeue(this, e)
                        })
                    },
                    delay: function (e, t) {
                        return e = s.fx ? s.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                            var r = setTimeout(t, e);
                            n.stop = function () {
                                clearTimeout(r)
                            }
                        })
                    },
                    clearQueue: function (e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function (e, n) {
                        function h() {
                            --u || r.resolveWith(i, [i])
                        }
                        typeof e != "string" && (n = e, e = t), e = e || "fx";
                        var r = s.Deferred(),
                            i = this,
                            o = i.length,
                            u = 1,
                            a = e + "defer",
                            f = e + "queue",
                            l = e + "mark",
                            c;
                        while (o--) if (c = s.data(i[o], a, t, !0) || (s.data(i[o], f, t, !0) || s.data(i[o], l, t, !0)) && s.data(i[o], a, s.Callbacks("once memory"), !0)) u++, c.add(h);
                        return h(), r.promise()
                    }
                });
                var d = /[\n\t\r]/g,
                    v = /\s+/,
                    m = /\r/g,
                    g = /^(?:button|input)$/i,
                    y = /^(?:button|input|object|select|textarea)$/i,
                    b = /^a(?:rea)?$/i,
                    w = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
                    E = s.support.getSetAttribute,
                    S, x, T;
                s.fn.extend({
                    attr: function (e, t) {
                        return s.access(this, e, t, !0, s.attr)
                    },
                    removeAttr: function (e) {
                        return this.each(function () {
                            s.removeAttr(this, e)
                        })
                    },
                    prop: function (e, t) {
                        return s.access(this, e, t, !0, s.prop)
                    },
                    removeProp: function (e) {
                        return e = s.propFix[e] || e, this.each(function () {
                            try {
                                this[e] = t, delete this[e]
                            } catch (n) {}
                        })
                    },
                    addClass: function (e) {
                        var t, n, r, i, o, u, a;
                        if (s.isFunction(e)) return this.each(function (t) {
                                s(this).addClass(e.call(this, t, this.className))
                            });
                        if (e && typeof e == "string") {
                            t = e.split(v);
                            for (n = 0, r = this.length; n < r; n++) {
                                i = this[n];
                                if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;
                                    else {
                                        o = " " + i.className + " ";
                                        for (u = 0, a = t.length; u < a; u++)~ o.indexOf(" " + t[u] + " ") || (o += t[u] + " ");
                                        i.className = s.trim(o)
                                    }
                            }
                        }
                        return this
                    },
                    removeClass: function (e) {
                        var n, r, i, o, u, a, f;
                        if (s.isFunction(e)) return this.each(function (t) {
                                s(this).removeClass(e.call(this, t, this.className))
                            });
                        if (e && typeof e == "string" || e === t) {
                            n = (e || "").split(v);
                            for (r = 0, i = this.length; r < i; r++) {
                                o = this[r];
                                if (o.nodeType === 1 && o.className) if (e) {
                                        u = (" " + o.className + " ").replace(d, " ");
                                        for (a = 0, f = n.length; a < f; a++) u = u.replace(" " + n[a] + " ", " ");
                                        o.className = s.trim(u)
                                    } else o.className = ""
                            }
                        }
                        return this
                    },
                    toggleClass: function (e, t) {
                        var n = typeof e,
                            r = typeof t == "boolean";
                        return s.isFunction(e) ? this.each(function (n) {
                            s(this).toggleClass(e.call(this, n, this.className, t), t)
                        }) : this.each(function () {
                            if (n === "string") {
                                var i, o = 0,
                                    u = s(this),
                                    a = t,
                                    f = e.split(v);
                                while (i = f[o++]) a = r ? a : !u.hasClass(i), u[a ? "addClass" : "removeClass"](i)
                            } else if (n === "undefined" || n === "boolean") this.className && s._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : s._data(this, "__className__") || ""
                        })
                    },
                    hasClass: function (e) {
                        var t = " " + e + " ",
                            n = 0,
                            r = this.length;
                        for (; n < r; n++) if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(d, " ").indexOf(t) > -1) return !0;
                        return !1
                    },
                    val: function (e) {
                        var n, r, i, o = this[0];
                        if (!arguments.length) {
                            if (o) return n = s.valHooks[o.nodeName.toLowerCase()] || s.valHooks[o.type], n && "get" in n && (r = n.get(o, "value")) !== t ? r : (r = o.value, typeof r == "string" ? r.replace(m, "") : r == null ? "" : r);
                            return
                        }
                        return i = s.isFunction(e), this.each(function (r) {
                            var o = s(this),
                                u;
                            if (this.nodeType !== 1) return;
                            i ? u = e.call(this, r, o.val()) : u = e, u == null ? u = "" : typeof u == "number" ? u += "" : s.isArray(u) && (u = s.map(u, function (e) {
                                return e == null ? "" : e + ""
                            })), n = s.valHooks[this.nodeName.toLowerCase()] || s.valHooks[this.type];
                            if (!n || !("set" in n) || n.set(this, u, "value") === t) this.value = u
                        })
                    }
                }), s.extend({
                    valHooks: {
                        option: {
                            get: function (e) {
                                var t = e.attributes.value;
                                return !t || t.specified ? e.value : e.text
                            }
                        },
                        select: {
                            get: function (e) {
                                var t, n, r, i, o = e.selectedIndex,
                                    u = [],
                                    a = e.options,
                                    f = e.type === "select-one";
                                if (o < 0) return null;
                                n = f ? o : 0, r = f ? o + 1 : a.length;
                                for (; n < r; n++) {
                                    i = a[n];
                                    if (i.selected && (s.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !s.nodeName(i.parentNode, "optgroup"))) {
                                        t = s(i).val();
                                        if (f) return t;
                                        u.push(t)
                                    }
                                }
                                return f && !u.length && a.length ? s(a[o]).val() : u
                            },
                            set: function (e, t) {
                                var n = s.makeArray(t);
                                return s(e).find("option").each(function () {
                                    this.selected = s.inArray(s(this).val(), n) >= 0
                                }), n.length || (e.selectedIndex = -1), n
                            }
                        }
                    },
                    attrFn: {
                        val: !0,
                        css: !0,
                        html: !0,
                        text: !0,
                        data: !0,
                        width: !0,
                        height: !0,
                        offset: !0
                    },
                    attr: function (e, n, r, i) {
                        var o, u, a, f = e.nodeType;
                        if (!e || f === 3 || f === 8 || f === 2) return;
                        if (i && n in s.attrFn) return s(e)[n](r);
                        if (typeof e.getAttribute == "undefined") return s.prop(e, n, r);
                        a = f !== 1 || !s.isXMLDoc(e), a && (n = n.toLowerCase(), u = s.attrHooks[n] || (w.test(n) ? x : S));
                        if (r !== t) {
                            if (r === null) {
                                s.removeAttr(e, n);
                                return
                            }
                            return u && "set" in u && a && (o = u.set(e, r, n)) !== t ? o : (e.setAttribute(n, "" + r), r)
                        }
                        return u && "get" in u && a && (o = u.get(e, n)) !== null ? o : (o = e.getAttribute(n), o === null ? t : o)
                    },
                    removeAttr: function (e, t) {
                        var n, r, i, o, u = 0;
                        if (t && e.nodeType === 1) {
                            r = t.toLowerCase().split(v), o = r.length;
                            for (; u < o; u++) i = r[u], i && (n = s.propFix[i] || i, s.attr(e, i, ""), e.removeAttribute(E ? i : n), w.test(i) && n in e && (e[n] = !1))
                        }
                    },
                    attrHooks: {
                        type: {
                            set: function (e, t) {
                                if (g.test(e.nodeName) && e.parentNode) s.error("type property can't be changed");
                                else if (!s.support.radioValue && t === "radio" && s.nodeName(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t), n && (e.value = n), t
                                }
                            }
                        },
                        value: {
                            get: function (e, t) {
                                return S && s.nodeName(e, "button") ? S.get(e, t) : t in e ? e.value : null
                            },
                            set: function (e, t, n) {
                                if (S && s.nodeName(e, "button")) return S.set(e, t, n);
                                e.value = t
                            }
                        }
                    },
                    propFix: {
                        tabindex: "tabIndex",
                        readonly: "readOnly",
                        "for": "htmlFor",
                        "class": "className",
                        maxlength: "maxLength",
                        cellspacing: "cellSpacing",
                        cellpadding: "cellPadding",
                        rowspan: "rowSpan",
                        colspan: "colSpan",
                        usemap: "useMap",
                        frameborder: "frameBorder",
                        contenteditable: "contentEditable"
                    },
                    prop: function (e, n, r) {
                        var i, o, u, a = e.nodeType;
                        if (!e || a === 3 || a === 8 || a === 2) return;
                        return u = a !== 1 || !s.isXMLDoc(e), u && (n = s.propFix[n] || n, o = s.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && (i = o.get(e, n)) !== null ? i : e[n]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function (e) {
                                var n = e.getAttributeNode("tabindex");
                                return n && n.specified ? parseInt(n.value, 10) : y.test(e.nodeName) || b.test(e.nodeName) && e.href ? 0 : t
                            }
                        }
                    }
                }), s.attrHooks.tabindex = s.propHooks.tabIndex, x = {
                    get: function (e, n) {
                        var r, i = s.prop(e, n);
                        return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
                    },
                    set: function (e, t, n) {
                        var r;
                        return t === !1 ? s.removeAttr(e, n) : (r = s.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
                    }
                }, E || (T = {
                    name: !0,
                    id: !0
                }, S = s.valHooks.button = {
                    get: function (e, n) {
                        var r;
                        return r = e.getAttributeNode(n), r && (T[n] ? r.nodeValue !== "" : r.specified) ? r.nodeValue : t
                    },
                    set: function (e, t, r) {
                        var i = e.getAttributeNode(r);
                        return i || (i = n.createAttribute(r), e.setAttributeNode(i)), i.nodeValue = t + ""
                    }
                }, s.attrHooks.tabindex.set = S.set, s.each(["width", "height"], function (e, t) {
                    s.attrHooks[t] = s.extend(s.attrHooks[t], {
                        set: function (e, n) {
                            if (n === "") return e.setAttribute(t, "auto"), n
                        }
                    })
                }), s.attrHooks.contenteditable = {
                    get: S.get,
                    set: function (e, t, n) {
                        t === "" && (t = "false"), S.set(e, t, n)
                    }
                }), s.support.hrefNormalized || s.each(["href", "src", "width", "height"], function (e, n) {
                    s.attrHooks[n] = s.extend(s.attrHooks[n], {
                        get: function (e) {
                            var r = e.getAttribute(n, 2);
                            return r === null ? t : r
                        }
                    })
                }), s.support.style || (s.attrHooks.style = {
                    get: function (e) {
                        return e.style.cssText.toLowerCase() || t
                    },
                    set: function (e, t) {
                        return e.style.cssText = "" + t
                    }
                }), s.support.optSelected || (s.propHooks.selected = s.extend(s.propHooks.selected, {
                    get: function (e) {
                        var t = e.parentNode;
                        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
                    }
                })), s.support.enctype || (s.propFix.enctype = "encoding"), s.support.checkOn || s.each(["radio", "checkbox"], function () {
                    s.valHooks[this] = {
                        get: function (e) {
                            return e.getAttribute("value") === null ? "on" : e.value
                        }
                    }
                }), s.each(["radio", "checkbox"], function () {
                    s.valHooks[this] = s.extend(s.valHooks[this], {
                        set: function (e, t) {
                            if (s.isArray(t)) return e.checked = s.inArray(s(e).val(), t) >= 0
                        }
                    })
                });
                var N = /^(?:textarea|input|select)$/i,
                    C = /^([^\.]*)?(?:\.(.+))?$/,
                    k = /\bhover(\.\S+)?\b/,
                    L = /^key/,
                    A = /^(?:mouse|contextmenu)|click/,
                    O = /^(?:focusinfocus|focusoutblur)$/,
                    M = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
                    _ = function (e) {
                        var t = M.exec(e);
                        return t && (t[1] = (t[1] || "").toLowerCase(), t[3] = t[3] && new RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)")), t
                    }, D = function (e, t) {
                        var n = e.attributes || {};
                        return (!t[1] || e.nodeName.toLowerCase() === t[1]) && (!t[2] || (n.id || {}).value === t[2]) && (!t[3] || t[3].test((n["class"] || {}).value))
                    }, P = function (e) {
                        return s.event.special.hover ? e : e.replace(k, "mouseenter$1 mouseleave$1")
                    };
                s.event = {
                    add: function (e, n, r, i, o) {
                        var u, a, f, l, c, h, p, d, v, m, g, y;
                        if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(u = s._data(e))) return;
                        r.handler && (v = r, r = v.handler), r.guid || (r.guid = s.guid++), f = u.events, f || (u.events = f = {}), a = u.handle, a || (u.handle = a = function (e) {
                            return typeof s == "undefined" || !! e && s.event.triggered === e.type ? t : s.event.dispatch.apply(a.elem, arguments)
                        }, a.elem = e), n = s.trim(P(n)).split(" ");
                        for (l = 0; l < n.length; l++) {
                            c = C.exec(n[l]) || [], h = c[1], p = (c[2] || "").split(".").sort(), y = s.event.special[h] || {}, h = (o ? y.delegateType : y.bindType) || h, y = s.event.special[h] || {}, d = s.extend({
                                type: h,
                                origType: c[1],
                                data: i,
                                handler: r,
                                guid: r.guid,
                                selector: o,
                                quick: _(o),
                                namespace: p.join(".")
                            }, v), g = f[h];
                            if (!g) {
                                g = f[h] = [], g.delegateCount = 0;
                                if (!y.setup || y.setup.call(e, i, p, a) === !1) e.addEventListener ? e.addEventListener(h, a, !1) : e.attachEvent && e.attachEvent("on" + h, a)
                            }
                            y.add && (y.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), o ? g.splice(g.delegateCount++, 0, d) : g.push(d), s.event.global[h] = !0
                        }
                        e = null
                    },
                    global: {},
                    remove: function (e, t, n, r, i) {
                        var o = s.hasData(e) && s._data(e),
                            u, a, f, l, c, h, p, d, v, m, g, y;
                        if (!o || !(d = o.events)) return;
                        t = s.trim(P(t || "")).split(" ");
                        for (u = 0; u < t.length; u++) {
                            a = C.exec(t[u]) || [], f = l = a[1], c = a[2];
                            if (!f) {
                                for (f in d) {
                                    if (!d.hasOwnProperty(f)) continue;
                                    s.event.remove(e, f + t[u], n, r, !0)
                                }
                                continue
                            }
                            v = s.event.special[f] || {}, f = (r ? v.delegateType : v.bindType) || f, g = d[f] || [], h = g.length, c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                            for (p = 0; p < g.length; p++) y = g[p], (i || l === y.origType) && (!n || n.guid === y.guid) && (!c || c.test(y.namespace)) && (!r || r === y.selector || r === "**" && y.selector) && (g.splice(p--, 1), y.selector && g.delegateCount--, v.remove && v.remove.call(e, y));
                            g.length === 0 && h !== g.length && ((!v.teardown || v.teardown.call(e, c) === !1) && s.removeEvent(e, f, o.handle), delete d[f])
                        }
                        s.isEmptyObject(d) && (m = o.handle, m && (m.elem = null), s.removeData(e, ["events", "handle"], !0))
                    },
                    customEvent: {
                        getData: !0,
                        setData: !0,
                        changeData: !0
                    },
                    trigger: function (n, r, i, o) {
                        if (!i || i.nodeType !== 3 && i.nodeType !== 8) {
                            var u = n.type || n,
                                a = [],
                                f, l, c, h, p, d, v, m, g, y;
                            if (O.test(u + s.event.triggered)) return;
                            u.indexOf("!") >= 0 && (u = u.slice(0, -1), l = !0), u.indexOf(".") >= 0 && (a = u.split("."), u = a.shift(), a.sort());
                            if ((!i || s.event.customEvent[u]) && !s.event.global[u]) return;
                            n = typeof n == "object" ? n[s.expando] ? n : new s.Event(u, n) : new s.Event(u), n.type = u, n.isTrigger = !0, n.exclusive = l, n.namespace = a.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + a.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, d = u.indexOf(":") < 0 ? "on" + u : "";
                            if (!i) {
                                f = s.cache;
                                for (c in f) f[c].events && f[c].events[u] && s.event.trigger(n, r, f[c].handle.elem, !0);
                                return
                            }
                            n.result = t, n.target || (n.target = i), r = r != null ? s.makeArray(r) : [], r.unshift(n), v = s.event.special[u] || {};
                            if (v.trigger && v.trigger.apply(i, r) === !1) return;
                            g = [
                                [i, v.bindType || u]
                            ];
                            if (!o && !v.noBubble && !s.isWindow(i)) {
                                y = v.delegateType || u, h = O.test(y + u) ? i : i.parentNode, p = null;
                                for (; h; h = h.parentNode) g.push([h, y]), p = h;
                                p && p === i.ownerDocument && g.push([p.defaultView || p.parentWindow || e, y])
                            }
                            for (c = 0; c < g.length && !n.isPropagationStopped(); c++) h = g[c][0], n.type = g[c][1], m = (s._data(h, "events") || {})[n.type] && s._data(h, "handle"), m && m.apply(h, r), m = d && h[d], m && s.acceptData(h) && m.apply(h, r) === !1 && n.preventDefault();
                            return n.type = u, !o && !n.isDefaultPrevented() && (!v._default || v._default.apply(i.ownerDocument, r) === !1) && (u !== "click" || !s.nodeName(i, "a")) && s.acceptData(i) && d && i[u] && (u !== "focus" && u !== "blur" || n.target.offsetWidth !== 0) && !s.isWindow(i) && (p = i[d], p && (i[d] = null), s.event.triggered = u, i[u](), s.event.triggered = t, p && (i[d] = p)), n.result
                        }
                        return
                    },
                    dispatch: function (n) {
                        n = s.event.fix(n || e.event);
                        var r = (s._data(this, "events") || {})[n.type] || [],
                            i = r.delegateCount,
                            o = [].slice.call(arguments, 0),
                            u = !n.exclusive && !n.namespace,
                            a = [],
                            f, l, c, h, p, d, v, m, g, y, b;
                        o[0] = n, n.delegateTarget = this;
                        if (i && !n.target.disabled && (!n.button || n.type !== "click")) {
                            h = s(this), h.context = this.ownerDocument || this;
                            for (c = n.target; c != this; c = c.parentNode || this) {
                                d = {}, m = [], h[0] = c;
                                for (f = 0; f < i; f++) g = r[f], y = g.selector, d[y] === t && (d[y] = g.quick ? D(c, g.quick) : h.is(y)), d[y] && m.push(g);
                                m.length && a.push({
                                    elem: c,
                                    matches: m
                                })
                            }
                        }
                        r.length > i && a.push({
                            elem: this,
                            matches: r.slice(i)
                        });
                        for (f = 0; f < a.length && !n.isPropagationStopped(); f++) {
                            v = a[f], n.currentTarget = v.elem;
                            for (l = 0; l < v.matches.length && !n.isImmediatePropagationStopped(); l++) {
                                g = v.matches[l];
                                if (u || !n.namespace && !g.namespace || n.namespace_re && n.namespace_re.test(g.namespace)) n.data = g.data, n.handleObj = g, p = ((s.event.special[g.origType] || {}).handle || g.handler).apply(v.elem, o), p !== t && (n.result = p, p === !1 && (n.preventDefault(), n.stopPropagation()))
                            }
                        }
                        return n.result
                    },
                    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: "char charCode key keyCode".split(" "),
                        filter: function (e, t) {
                            return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function (e, r) {
                            var i, s, o, u = r.button,
                                a = r.fromElement;
                            return e.pageX == null && r.clientX != null && (i = e.target.ownerDocument || n, s = i.documentElement, o = i.body, e.pageX = r.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = r.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? r.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
                        }
                    },
                    fix: function (e) {
                        if (e[s.expando]) return e;
                        var r, i, o = e,
                            u = s.event.fixHooks[e.type] || {}, a = u.props ? this.props.concat(u.props) : this.props;
                        e = s.Event(o);
                        for (r = a.length; r;) i = a[--r], e[i] = o[i];
                        return e.target || (e.target = o.srcElement || n), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey === t && (e.metaKey = e.ctrlKey), u.filter ? u.filter(e, o) : e
                    },
                    special: {
                        ready: {
                            setup: s.bindReady
                        },
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            delegateType: "focusin"
                        },
                        blur: {
                            delegateType: "focusout"
                        },
                        beforeunload: {
                            setup: function (e, t, n) {
                                s.isWindow(this) && (this.onbeforeunload = n)
                            },
                            teardown: function (e, t) {
                                this.onbeforeunload === t && (this.onbeforeunload = null)
                            }
                        }
                    },
                    simulate: function (e, t, n, r) {
                        var i = s.extend(new s.Event, n, {
                            type: e,
                            isSimulated: !0,
                            originalEvent: {}
                        });
                        r ? s.event.trigger(i, null, t) : s.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
                    }
                }, s.event.handle = s.event.dispatch, s.removeEvent = n.removeEventListener ? function (e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n, !1)
                } : function (e, t, n) {
                    e.detachEvent && e.detachEvent("on" + t, n)
                }, s.Event = function (e, t) {
                    if (!(this instanceof s.Event)) return new s.Event(e, t);
                    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? B : H) : this.type = e, t && s.extend(this, t), this.timeStamp = e && e.timeStamp || s.now(), this[s.expando] = !0
                }, s.Event.prototype = {
                    preventDefault: function () {
                        this.isDefaultPrevented = B;
                        var e = this.originalEvent;
                        if (!e) return;
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1
                    },
                    stopPropagation: function () {
                        this.isPropagationStopped = B;
                        var e = this.originalEvent;
                        if (!e) return;
                        e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
                    },
                    stopImmediatePropagation: function () {
                        this.isImmediatePropagationStopped = B, this.stopPropagation()
                    },
                    isDefaultPrevented: H,
                    isPropagationStopped: H,
                    isImmediatePropagationStopped: H
                }, s.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                }, function (e, t) {
                    s.event.special[e] = {
                        delegateType: t,
                        bindType: t,
                        handle: function (e) {
                            var n = this,
                                r = e.relatedTarget,
                                i = e.handleObj,
                                o = i.selector,
                                u;
                            if (!r || r !== n && !s.contains(n, r)) e.type = i.origType, u = i.handler.apply(this, arguments), e.type = t;
                            return u
                        }
                    }
                }), s.support.submitBubbles || (s.event.special.submit = {
                    setup: function () {
                        if (s.nodeName(this, "form")) return !1;
                        s.event.add(this, "click._submit keypress._submit", function (e) {
                            var n = e.target,
                                r = s.nodeName(n, "input") || s.nodeName(n, "button") ? n.form : t;
                            r && !r._submit_attached && (s.event.add(r, "submit._submit", function (e) {
                                this.parentNode && !e.isTrigger && s.event.simulate("submit", this.parentNode, e, !0)
                            }), r._submit_attached = !0)
                        })
                    },
                    teardown: function () {
                        if (s.nodeName(this, "form")) return !1;
                        s.event.remove(this, "._submit")
                    }
                }), s.support.changeBubbles || (s.event.special.change = {
                    setup: function () {
                        if (N.test(this.nodeName)) {
                            if (this.type === "checkbox" || this.type === "radio") s.event.add(this, "propertychange._change", function (e) {
                                    e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                                }), s.event.add(this, "click._change", function (e) {
                                    this._just_changed && !e.isTrigger && (this._just_changed = !1, s.event.simulate("change", this, e, !0))
                                });
                            return !1
                        }
                        s.event.add(this, "beforeactivate._change", function (e) {
                            var t = e.target;
                            N.test(t.nodeName) && !t._change_attached && (s.event.add(t, "change._change", function (e) {
                                this.parentNode && !e.isSimulated && !e.isTrigger && s.event.simulate("change", this.parentNode, e, !0)
                            }), t._change_attached = !0)
                        })
                    },
                    handle: function (e) {
                        var t = e.target;
                        if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
                    },
                    teardown: function () {
                        return s.event.remove(this, "._change"), N.test(this.nodeName)
                    }
                }), s.support.focusinBubbles || s.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function (e, t) {
                    var r = 0,
                        i = function (e) {
                            s.event.simulate(t, e.target, s.event.fix(e), !0)
                        };
                    s.event.special[t] = {
                        setup: function () {
                            r++ === 0 && n.addEventListener(e, i, !0)
                        },
                        teardown: function () {
                            --r === 0 && n.removeEventListener(e, i, !0)
                        }
                    }
                }), s.fn.extend({
                    on: function (e, n, r, i, o) {
                        var u, a;
                        if (typeof e == "object") {
                            typeof n != "string" && (r = n, n = t);
                            for (a in e) this.on(a, n, r, e[a], o);
                            return this
                        }
                        r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
                        if (i === !1) i = H;
                        else if (!i) return this;
                        return o === 1 && (u = i, i = function (e) {
                            return s().off(e), u.apply(this, arguments)
                        }, i.guid = u.guid || (u.guid = s.guid++)), this.each(function () {
                            s.event.add(this, e, i, r, n)
                        })
                    },
                    one: function (e, t, n, r) {
                        return this.on.call(this, e, t, n, r, 1)
                    },
                    off: function (e, n, r) {
                        if (e && e.preventDefault && e.handleObj) {
                            var i = e.handleObj;
                            return s(e.delegateTarget).off(i.namespace ? i.type + "." + i.namespace : i.type, i.selector, i.handler), this
                        }
                        if (typeof e == "object") {
                            for (var o in e) this.off(o, n, e[o]);
                            return this
                        }
                        if (n === !1 || typeof n == "function") r = n, n = t;
                        return r === !1 && (r = H), this.each(function () {
                            s.event.remove(this, e, r, n)
                        })
                    },
                    bind: function (e, t, n) {
                        return this.on(e, null, t, n)
                    },
                    unbind: function (e, t) {
                        return this.off(e, null, t)
                    },
                    live: function (e, t, n) {
                        return s(this.context).on(e, this.selector, t, n), this
                    },
                    die: function (e, t) {
                        return s(this.context).off(e, this.selector || "**", t), this
                    },
                    delegate: function (e, t, n, r) {
                        return this.on(t, e, n, r)
                    },
                    undelegate: function (e, t, n) {
                        return arguments.length == 1 ? this.off(e, "**") : this.off(t, e, n)
                    },
                    trigger: function (e, t) {
                        return this.each(function () {
                            s.event.trigger(e, t, this)
                        })
                    },
                    triggerHandler: function (e, t) {
                        if (this[0]) return s.event.trigger(e, t, this[0], !0)
                    },
                    toggle: function (e) {
                        var t = arguments,
                            n = e.guid || s.guid++,
                            r = 0,
                            i = function (n) {
                                var i = (s._data(this, "lastToggle" + e.guid) || 0) % r;
                                return s._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
                            };
                        i.guid = n;
                        while (r < t.length) t[r++].guid = n;
                        return this.click(i)
                    },
                    hover: function (e, t) {
                        return this.mouseenter(e).mouseleave(t || e)
                    }
                }), s.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
                    s.fn[t] = function (e, n) {
                        return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                    }, s.attrFn && (s.attrFn[t] = !0), L.test(t) && (s.event.fixHooks[t] = s.event.keyHooks), A.test(t) && (s.event.fixHooks[t] = s.event.mouseHooks)
                }),
                function () {
                    function S(e, t, n, i, s, o) {
                        for (var u = 0, a = i.length; u < a; u++) {
                            var f = i[u];
                            if (f) {
                                var l = !1;
                                f = f[e];
                                while (f) {
                                    if (f[r] === n) {
                                        l = i[f.sizset];
                                        break
                                    }
                                    f.nodeType === 1 && !o && (f[r] = n, f.sizset = u);
                                    if (f.nodeName.toLowerCase() === t) {
                                        l = f;
                                        break
                                    }
                                    f = f[e]
                                }
                                i[u] = l
                            }
                        }
                    }
                    function x(e, t, n, i, s, o) {
                        for (var u = 0, a = i.length; u < a; u++) {
                            var f = i[u];
                            if (f) {
                                var l = !1;
                                f = f[e];
                                while (f) {
                                    if (f[r] === n) {
                                        l = i[f.sizset];
                                        break
                                    }
                                    if (f.nodeType === 1) {
                                        o || (f[r] = n, f.sizset = u);
                                        if (typeof t != "string") {
                                            if (f === t) {
                                                l = !0;
                                                break
                                            }
                                        } else if (h.filter(t, [f]).length > 0) {
                                            l = f;
                                            break
                                        }
                                    }
                                    f = f[e]
                                }
                                i[u] = l
                            }
                        }
                    }
                    var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                        r = "sizcache" + (Math.random() + "").replace(".", ""),
                        i = 0,
                        o = Object.prototype.toString,
                        u = !1,
                        a = !0,
                        f = /\\/g,
                        l = /\r\n/g,
                        c = /\W/;
                    [0, 0].sort(function () {
                        return a = !1, 0
                    });
                    var h = function (t, r, i, s) {
                        i = i || [], r = r || n;
                        var u = r;
                        if (r.nodeType !== 1 && r.nodeType !== 9) return [];
                        if (!t || typeof t != "string") return i;
                        var a, f, l, c, p, m, g, b, w = !0,
                            E = h.isXML(r),
                            S = [],
                            x = t;
                        do {
                            e.exec(""), a = e.exec(x);
                            if (a) {
                                x = a[3], S.push(a[1]);
                                if (a[2]) {
                                    c = a[3];
                                    break
                                }
                            }
                        } while (a);
                        if (S.length > 1 && v.exec(t)) if (S.length === 2 && d.relative[S[0]]) f = T(S[0] + S[1], r, s);
                            else {
                                f = d.relative[S[0]] ? [r] : h(S.shift(), r);
                                while (S.length) t = S.shift(), d.relative[t] && (t += S.shift()), f = T(t, f, s)
                            } else {
                                !s && S.length > 1 && r.nodeType === 9 && !E && d.match.ID.test(S[0]) && !d.match.ID.test(S[S.length - 1]) && (p = h.find(S.shift(), r, E), r = p.expr ? h.filter(p.expr, p.set)[0] : p.set[0]);
                                if (r) {
                                    p = s ? {
                                        expr: S.pop(),
                                        set: y(s)
                                    } : h.find(S.pop(), S.length !== 1 || S[0] !== "~" && S[0] !== "+" || !r.parentNode ? r : r.parentNode, E), f = p.expr ? h.filter(p.expr, p.set) : p.set, S.length > 0 ? l = y(f) : w = !1;
                                    while (S.length) m = S.pop(), g = m, d.relative[m] ? g = S.pop() : m = "", g == null && (g = r), d.relative[m](l, g, E)
                                } else l = S = []
                            }
                        l || (l = f), l || h.error(m || t);
                        if (o.call(l) === "[object Array]") if (!w) i.push.apply(i, l);
                            else if (r && r.nodeType === 1) for (b = 0; l[b] != null; b++) l[b] && (l[b] === !0 || l[b].nodeType === 1 && h.contains(r, l[b])) && i.push(f[b]);
                        else for (b = 0; l[b] != null; b++) l[b] && l[b].nodeType === 1 && i.push(f[b]);
                        else y(l, i);
                        return c && (h(c, u, i, s), h.uniqueSort(i)), i
                    };
                    h.uniqueSort = function (e) {
                        if (w) {
                            u = a, e.sort(w);
                            if (u) for (var t = 1; t < e.length; t++) e[t] === e[t - 1] && e.splice(t--, 1)
                        }
                        return e
                    }, h.matches = function (e, t) {
                        return h(e, null, null, t)
                    }, h.matchesSelector = function (e, t) {
                        return h(t, null, null, [e]).length > 0
                    }, h.find = function (e, t, n) {
                        var r, i, s, o, u, a;
                        if (!e) return [];
                        for (i = 0, s = d.order.length; i < s; i++) {
                            u = d.order[i];
                            if (o = d.leftMatch[u].exec(e)) {
                                a = o[1], o.splice(1, 1);
                                if (a.substr(a.length - 1) !== "\\") {
                                    o[1] = (o[1] || "").replace(f, ""), r = d.find[u](o, t, n);
                                    if (r != null) {
                                        e = e.replace(d.match[u], "");
                                        break
                                    }
                                }
                            }
                        }
                        return r || (r = typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName("*") : []), {
                            set: r,
                            expr: e
                        }
                    }, h.filter = function (e, n, r, i) {
                        var s, o, u, a, f, l, c, p, v, m = e,
                            g = [],
                            y = n,
                            b = n && n[0] && h.isXML(n[0]);
                        while (e && n.length) {
                            for (u in d.filter) if ((s = d.leftMatch[u].exec(e)) != null && s[2]) {
                                    l = d.filter[u], c = s[1], o = !1, s.splice(1, 1);
                                    if (c.substr(c.length - 1) === "\\") continue;
                                    y === g && (g = []);
                                    if (d.preFilter[u]) {
                                        s = d.preFilter[u](s, y, r, g, i, b);
                                        if (!s) o = a = !0;
                                        else if (s === !0) continue
                                    }
                                    if (s) for (p = 0;
                                        (f = y[p]) != null; p++) f && (a = l(f, s, p, y), v = i ^ a, r && a != null ? v ? o = !0 : y[p] = !1 : v && (g.push(f), o = !0));
                                    if (a !== t) {
                                        r || (y = g), e = e.replace(d.match[u], "");
                                        if (!o) return [];
                                        break
                                    }
                                }
                            if (e === m) {
                                if (o != null) break;
                                h.error(e)
                            }
                            m = e
                        }
                        return y
                    }, h.error = function (e) {
                        throw new Error("Syntax error, unrecognized expression: " + e)
                    };
                    var p = h.getText = function (e) {
                        var t, n, r = e.nodeType,
                            i = "";
                        if (r) {
                            if (r === 1 || r === 9) {
                                if (typeof e.textContent == "string") return e.textContent;
                                if (typeof e.innerText == "string") return e.innerText.replace(l, "");
                                for (e = e.firstChild; e; e = e.nextSibling) i += p(e)
                            } else if (r === 3 || r === 4) return e.nodeValue
                        } else for (t = 0; n = e[t]; t++) n.nodeType !== 8 && (i += p(n));
                        return i
                    }, d = h.selectors = {
                            order: ["ID", "NAME", "TAG"],
                            match: {
                                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                            },
                            leftMatch: {},
                            attrMap: {
                                "class": "className",
                                "for": "htmlFor"
                            },
                            attrHandle: {
                                href: function (e) {
                                    return e.getAttribute("href")
                                },
                                type: function (e) {
                                    return e.getAttribute("type")
                                }
                            },
                            relative: {
                                "+": function (e, t) {
                                    var n = typeof t == "string",
                                        r = n && !c.test(t),
                                        i = n && !r;
                                    r && (t = t.toLowerCase());
                                    for (var s = 0, o = e.length, u; s < o; s++) if (u = e[s]) {
                                            while ((u = u.previousSibling) && u.nodeType !== 1);
                                            e[s] = i || u && u.nodeName.toLowerCase() === t ? u || !1 : u === t
                                        }
                                    i && h.filter(t, e, !0)
                                },
                                ">": function (e, t) {
                                    var n, r = typeof t == "string",
                                        i = 0,
                                        s = e.length;
                                    if (r && !c.test(t)) {
                                        t = t.toLowerCase();
                                        for (; i < s; i++) {
                                            n = e[i];
                                            if (n) {
                                                var o = n.parentNode;
                                                e[i] = o.nodeName.toLowerCase() === t ? o : !1
                                            }
                                        }
                                    } else {
                                        for (; i < s; i++) n = e[i], n && (e[i] = r ? n.parentNode : n.parentNode === t);
                                        r && h.filter(t, e, !0)
                                    }
                                },
                                "": function (e, t, n) {
                                    var r, s = i++,
                                        o = x;
                                    typeof t == "string" && !c.test(t) && (t = t.toLowerCase(), r = t, o = S), o("parentNode", t, s, e, r, n)
                                },
                                "~": function (e, t, n) {
                                    var r, s = i++,
                                        o = x;
                                    typeof t == "string" && !c.test(t) && (t = t.toLowerCase(), r = t, o = S), o("previousSibling", t, s, e, r, n)
                                }
                            },
                            find: {
                                ID: function (e, t, n) {
                                    if (typeof t.getElementById != "undefined" && !n) {
                                        var r = t.getElementById(e[1]);
                                        return r && r.parentNode ? [r] : []
                                    }
                                },
                                NAME: function (e, t) {
                                    if (typeof t.getElementsByName != "undefined") {
                                        var n = [],
                                            r = t.getElementsByName(e[1]);
                                        for (var i = 0, s = r.length; i < s; i++) r[i].getAttribute("name") === e[1] && n.push(r[i]);
                                        return n.length === 0 ? null : n
                                    }
                                },
                                TAG: function (e, t) {
                                    if (typeof t.getElementsByTagName != "undefined") return t.getElementsByTagName(e[1])
                                }
                            },
                            preFilter: {
                                CLASS: function (e, t, n, r, i, s) {
                                    e = " " + e[1].replace(f, "") + " ";
                                    if (s) return e;
                                    for (var o = 0, u;
                                    (u = t[o]) != null; o++) u && (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o] = !1));
                                    return !1
                                },
                                ID: function (e) {
                                    return e[1].replace(f, "")
                                },
                                TAG: function (e, t) {
                                    return e[1].replace(f, "").toLowerCase()
                                },
                                CHILD: function (e) {
                                    if (e[1] === "nth") {
                                        e[2] || h.error(e[0]), e[2] = e[2].replace(/^\+|\s*/g, "");
                                        var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                                        e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
                                    } else e[2] && h.error(e[0]);
                                    return e[0] = i++, e
                                },
                                ATTR: function (e, t, n, r, i, s) {
                                    var o = e[1] = e[1].replace(f, "");
                                    return !s && d.attrMap[o] && (e[1] = d.attrMap[o]), e[4] = (e[4] || e[5] || "").replace(f, ""), e[2] === "~=" && (e[4] = " " + e[4] + " "), e
                                },
                                PSEUDO: function (t, n, r, i, s) {
                                    if (t[1] === "not") {
                                        if (!((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
                                            var o = h.filter(t[3], n, r, !0 ^ s);
                                            return r || i.push.apply(i, o), !1
                                        }
                                        t[3] = h(t[3], null, null, n)
                                    } else if (d.match.POS.test(t[0]) || d.match.CHILD.test(t[0])) return !0;
                                    return t
                                },
                                POS: function (e) {
                                    return e.unshift(!0), e
                                }
                            },
                            filters: {
                                enabled: function (e) {
                                    return e.disabled === !1 && e.type !== "hidden"
                                },
                                disabled: function (e) {
                                    return e.disabled === !0
                                },
                                checked: function (e) {
                                    return e.checked === !0
                                },
                                selected: function (e) {
                                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                                },
                                parent: function (e) {
                                    return !!e.firstChild
                                },
                                empty: function (e) {
                                    return !e.firstChild
                                },
                                has: function (e, t, n) {
                                    return !!h(n[3], e).length
                                },
                                header: function (e) {
                                    return /h\d/i.test(e.nodeName)
                                },
                                text: function (e) {
                                    var t = e.getAttribute("type"),
                                        n = e.type;
                                    return e.nodeName.toLowerCase() === "input" && "text" === n && (t === n || t === null)
                                },
                                radio: function (e) {
                                    return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                                },
                                checkbox: function (e) {
                                    return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                                },
                                file: function (e) {
                                    return e.nodeName.toLowerCase() === "input" && "file" === e.type
                                },
                                password: function (e) {
                                    return e.nodeName.toLowerCase() === "input" && "password" === e.type
                                },
                                submit: function (e) {
                                    var t = e.nodeName.toLowerCase();
                                    return (t === "input" || t === "button") && "submit" === e.type
                                },
                                image: function (e) {
                                    return e.nodeName.toLowerCase() === "input" && "image" === e.type
                                },
                                reset: function (e) {
                                    var t = e.nodeName.toLowerCase();
                                    return (t === "input" || t === "button") && "reset" === e.type
                                },
                                button: function (e) {
                                    var t = e.nodeName.toLowerCase();
                                    return t === "input" && "button" === e.type || t === "button"
                                },
                                input: function (e) {
                                    return /input|select|textarea|button/i.test(e.nodeName)
                                },
                                focus: function (e) {
                                    return e === e.ownerDocument.activeElement
                                }
                            },
                            setFilters: {
                                first: function (e, t) {
                                    return t === 0
                                },
                                last: function (e, t, n, r) {
                                    return t === r.length - 1
                                },
                                even: function (e, t) {
                                    return t % 2 === 0
                                },
                                odd: function (e, t) {
                                    return t % 2 === 1
                                },
                                lt: function (e, t, n) {
                                    return t < n[3] - 0
                                },
                                gt: function (e, t, n) {
                                    return t > n[3] - 0
                                },
                                nth: function (e, t, n) {
                                    return n[3] - 0 === t
                                },
                                eq: function (e, t, n) {
                                    return n[3] - 0 === t
                                }
                            },
                            filter: {
                                PSEUDO: function (e, t, n, r) {
                                    var i = t[1],
                                        s = d.filters[i];
                                    if (s) return s(e, n, t, r);
                                    if (i === "contains") return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
                                    if (i === "not") {
                                        var o = t[3];
                                        for (var u = 0, a = o.length; u < a; u++) if (o[u] === e) return !1;
                                        return !0
                                    }
                                    h.error(i)
                                },
                                CHILD: function (e, t) {
                                    var n, i, s, o, u, a, f, l = t[1],
                                        c = e;
                                    switch (l) {
                                    case "only":
                                    case "first":
                                        while (c = c.previousSibling) if (c.nodeType === 1) return !1;
                                        if (l === "first") return !0;
                                        c = e;
                                    case "last":
                                        while (c = c.nextSibling) if (c.nodeType === 1) return !1;
                                        return !0;
                                    case "nth":
                                        n = t[2], i = t[3];
                                        if (n === 1 && i === 0) return !0;
                                        s = t[0], o = e.parentNode;
                                        if (o && (o[r] !== s || !e.nodeIndex)) {
                                            a = 0;
                                            for (c = o.firstChild; c; c = c.nextSibling) c.nodeType === 1 && (c.nodeIndex = ++a);
                                            o[r] = s
                                        }
                                        return f = e.nodeIndex - i, n === 0 ? f === 0 : f % n === 0 && f / n >= 0
                                    }
                                },
                                ID: function (e, t) {
                                    return e.nodeType === 1 && e.getAttribute("id") === t
                                },
                                TAG: function (e, t) {
                                    return t === "*" && e.nodeType === 1 || !! e.nodeName && e.nodeName.toLowerCase() === t
                                },
                                CLASS: function (
                                    e, t) {
                                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                                },
                                ATTR: function (e, t) {
                                    var n = t[1],
                                        r = h.attr ? h.attr(e, n) : d.attrHandle[n] ? d.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n),
                                        i = r + "",
                                        s = t[2],
                                        o = t[4];
                                    return r == null ? s === "!=" : !s && h.attr ? r != null : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : !1 : i && r !== !1
                                },
                                POS: function (e, t, n, r) {
                                    var i = t[2],
                                        s = d.setFilters[i];
                                    if (s) return s(e, n, t, r)
                                }
                            }
                        }, v = d.match.POS,
                        m = function (e, t) {
                            return "\\" + (t - 0 + 1)
                        };
                    for (var g in d.match) d.match[g] = new RegExp(d.match[g].source + /(?![^\[]*\])(?![^\(]*\))/.source), d.leftMatch[g] = new RegExp(/(^(?:.|\r|\n)*?)/.source + d.match[g].source.replace(/\\(\d+)/g, m));
                    var y = function (e, t) {
                        return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
                    };
                    try {
                        Array.prototype.slice.call(n.documentElement.childNodes, 0)[0].nodeType
                    } catch (b) {
                        y = function (e, t) {
                            var n = 0,
                                r = t || [];
                            if (o.call(e) === "[object Array]") Array.prototype.push.apply(r, e);
                            else if (typeof e.length == "number") for (var i = e.length; n < i; n++) r.push(e[n]);
                            else for (; e[n]; n++) r.push(e[n]);
                            return r
                        }
                    }
                    var w, E;
                    n.documentElement.compareDocumentPosition ? w = function (e, t) {
                        return e === t ? (u = !0, 0) : !e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition ? -1 : 1 : e.compareDocumentPosition(t) & 4 ? -1 : 1
                    } : (w = function (e, t) {
                        if (e === t) return u = !0, 0;
                        if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                        var n, r, i = [],
                            s = [],
                            o = e.parentNode,
                            a = t.parentNode,
                            f = o;
                        if (o === a) return E(e, t);
                        if (!o) return -1;
                        if (!a) return 1;
                        while (f) i.unshift(f), f = f.parentNode;
                        f = a;
                        while (f) s.unshift(f), f = f.parentNode;
                        n = i.length, r = s.length;
                        for (var l = 0; l < n && l < r; l++) if (i[l] !== s[l]) return E(i[l], s[l]);
                        return l === n ? E(e, s[l], -1) : E(i[l], t, 1)
                    }, E = function (e, t, n) {
                        if (e === t) return n;
                        var r = e.nextSibling;
                        while (r) {
                            if (r === t) return -1;
                            r = r.nextSibling
                        }
                        return 1
                    }),
                    function () {
                        var e = n.createElement("div"),
                            r = "script" + (new Date).getTime(),
                            i = n.documentElement;
                        e.innerHTML = "<a name='" + r + "'/>", i.insertBefore(e, i.firstChild), n.getElementById(r) && (d.find.ID = function (e, n, r) {
                            if (typeof n.getElementById != "undefined" && !r) {
                                var i = n.getElementById(e[1]);
                                return i ? i.id === e[1] || typeof i.getAttributeNode != "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
                            }
                        }, d.filter.ID = function (e, t) {
                            var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                            return e.nodeType === 1 && n && n.nodeValue === t
                        }), i.removeChild(e), i = e = null
                    }(),
                    function () {
                        var e = n.createElement("div");
                        e.appendChild(n.createComment("")), e.getElementsByTagName("*").length > 0 && (d.find.TAG = function (e, t) {
                            var n = t.getElementsByTagName(e[1]);
                            if (e[1] === "*") {
                                var r = [];
                                for (var i = 0; n[i]; i++) n[i].nodeType === 1 && r.push(n[i]);
                                n = r
                            }
                            return n
                        }), e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (d.attrHandle.href = function (e) {
                            return e.getAttribute("href", 2)
                        }), e = null
                    }(), n.querySelectorAll && function () {
                        var e = h,
                            t = n.createElement("div"),
                            r = "__sizzle__";
                        t.innerHTML = "<p class='TEST'></p>";
                        if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) return;
                        h = function (t, i, s, o) {
                            i = i || n;
                            if (!o && !h.isXML(i)) {
                                var u = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
                                if (u && (i.nodeType === 1 || i.nodeType === 9)) {
                                    if (u[1]) return y(i.getElementsByTagName(t), s);
                                    if (u[2] && d.find.CLASS && i.getElementsByClassName) return y(i.getElementsByClassName(u[2]), s)
                                }
                                if (i.nodeType === 9) {
                                    if (t === "body" && i.body) return y([i.body], s);
                                    if (u && u[3]) {
                                        var a = i.getElementById(u[3]);
                                        if (!a || !a.parentNode) return y([], s);
                                        if (a.id === u[3]) return y([a], s)
                                    }
                                    try {
                                        return y(i.querySelectorAll(t), s)
                                    } catch (f) {}
                                } else if (i.nodeType === 1 && i.nodeName.toLowerCase() !== "object") {
                                    var l = i,
                                        c = i.getAttribute("id"),
                                        p = c || r,
                                        v = i.parentNode,
                                        m = /^\s*[+~]/.test(t);
                                    c ? p = p.replace(/'/g, "\\$&") : i.setAttribute("id", p), m && v && (i = i.parentNode);
                                    try {
                                        if (!m || v) return y(i.querySelectorAll("[id='" + p + "'] " + t), s)
                                    } catch (g) {} finally {
                                        c || l.removeAttribute("id")
                                    }
                                }
                            }
                            return e(t, i, s, o)
                        };
                        for (var i in e) h[i] = e[i];
                        t = null
                    }(),
                    function () {
                        var e = n.documentElement,
                            t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
                        if (t) {
                            var r = !t.call(n.createElement("div"), "div"),
                                i = !1;
                            try {
                                t.call(n.documentElement, "[test!='']:sizzle")
                            } catch (s) {
                                i = !0
                            }
                            h.matchesSelector = function (e, n) {
                                n = n.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                                if (!h.isXML(e)) try {
                                        if (i || !d.match.PSEUDO.test(n) && !/!=/.test(n)) {
                                            var s = t.call(e, n);
                                            if (s || !r || e.document && e.document.nodeType !== 11) return s
                                        }
                                } catch (o) {}
                                return h(n, null, null, [e]).length > 0
                            }
                        }
                    }(),
                    function () {
                        var e = n.createElement("div");
                        e.innerHTML = "<div class='test e'></div><div class='test'></div>";
                        if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) return;
                        e.lastChild.className = "e";
                        if (e.getElementsByClassName("e").length === 1) return;
                        d.order.splice(1, 0, "CLASS"), d.find.CLASS = function (e, t, n) {
                            if (typeof t.getElementsByClassName != "undefined" && !n) return t.getElementsByClassName(e[1])
                        }, e = null
                    }(), n.documentElement.contains ? h.contains = function (e, t) {
                        return e !== t && (e.contains ? e.contains(t) : !0)
                    } : n.documentElement.compareDocumentPosition ? h.contains = function (e, t) {
                        return !!(e.compareDocumentPosition(t) & 16)
                    } : h.contains = function () {
                        return !1
                    }, h.isXML = function (e) {
                        var t = (e ? e.ownerDocument || e : 0).documentElement;
                        return t ? t.nodeName !== "HTML" : !1
                    };
                    var T = function (e, t, n) {
                        var r, i = [],
                            s = "",
                            o = t.nodeType ? [t] : t;
                        while (r = d.match.PSEUDO.exec(e)) s += r[0], e = e.replace(d.match.PSEUDO, "");
                        e = d.relative[e] ? e + "*" : e;
                        for (var u = 0, a = o.length; u < a; u++) h(e, o[u], i, n);
                        return h.filter(s, i)
                    };
                    h.attr = s.attr, h.selectors.attrMap = {}, s.find = h, s.expr = h.selectors, s.expr[":"] = s.expr.filters, s.unique = h.uniqueSort, s.text = h.getText, s.isXMLDoc = h.isXML, s.contains = h.contains
                }();
                var j = /Until$/,
                    F = /^(?:parents|prevUntil|prevAll)/,
                    I = /,/,
                    q = /^.[^:#\[\.,]*$/,
                    R = Array.prototype.slice,
                    U = s.expr.match.POS,
                    z = {
                        children: !0,
                        contents: !0,
                        next: !0,
                        prev: !0
                    };
                s.fn.extend({
                    find: function (e) {
                        var t = this,
                            n, r;
                        if (typeof e != "string") return s(e).filter(function () {
                                for (n = 0, r = t.length; n < r; n++) if (s.contains(t[n], this)) return !0
                            });
                        var i = this.pushStack("", "find", e),
                            o, u, a;
                        for (n = 0, r = this.length; n < r; n++) {
                            o = i.length, s.find(e, this[n], i);
                            if (n > 0) for (u = o; u < i.length; u++) for (a = 0; a < o; a++) if (i[a] === i[u]) {
                                            i.splice(u--, 1);
                                            break
                                        }
                        }
                        return i
                    },
                    has: function (e) {
                        var t = s(e);
                        return this.filter(function () {
                            for (var e = 0, n = t.length; e < n; e++) if (s.contains(this, t[e])) return !0
                        })
                    },
                    not: function (e) {
                        return this.pushStack(X(this, e, !1), "not", e)
                    },
                    filter: function (e) {
                        return this.pushStack(X(this, e, !0), "filter", e)
                    },
                    is: function (e) {
                        return !!e && (typeof e == "string" ? U.test(e) ? s(e, this.context).index(this[0]) >= 0 : s.filter(e, this).length > 0 : this.filter(e).length > 0)
                    },
                    closest: function (e, t) {
                        var n = [],
                            r, i, o = this[0];
                        if (s.isArray(e)) {
                            var u = 1;
                            while (o && o.ownerDocument && o !== t) {
                                for (r = 0; r < e.length; r++) s(o).is(e[r]) && n.push({
                                        selector: e[r],
                                        elem: o,
                                        level: u
                                    });
                                o = o.parentNode, u++
                            }
                            return n
                        }
                        var a = U.test(e) || typeof e != "string" ? s(e, t || this.context) : 0;
                        for (r = 0, i = this.length; r < i; r++) {
                            o = this[r];
                            while (o) {
                                if (a ? a.index(o) > -1 : s.find.matchesSelector(o, e)) {
                                    n.push(o);
                                    break
                                }
                                o = o.parentNode;
                                if (!o || !o.ownerDocument || o === t || o.nodeType === 11) break
                            }
                        }
                        return n = n.length > 1 ? s.unique(n) : n, this.pushStack(n, "closest", e)
                    },
                    index: function (e) {
                        return e ? typeof e == "string" ? s.inArray(this[0], s(e)) : s.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
                    },
                    add: function (e, t) {
                        var n = typeof e == "string" ? s(e, t) : s.makeArray(e && e.nodeType ? [e] : e),
                            r = s.merge(this.get(), n);
                        return this.pushStack(W(n[0]) || W(r[0]) ? r : s.unique(r))
                    },
                    andSelf: function () {
                        return this.add(this.prevObject)
                    }
                }), s.each({
                    parent: function (e) {
                        var t = e.parentNode;
                        return t && t.nodeType !== 11 ? t : null
                    },
                    parents: function (e) {
                        return s.dir(e, "parentNode")
                    },
                    parentsUntil: function (e, t, n) {
                        return s.dir(e, "parentNode", n)
                    },
                    next: function (e) {
                        return s.nth(e, 2, "nextSibling")
                    },
                    prev: function (e) {
                        return s.nth(e, 2, "previousSibling")
                    },
                    nextAll: function (e) {
                        return s.dir(e, "nextSibling")
                    },
                    prevAll: function (e) {
                        return s.dir(e, "previousSibling")
                    },
                    nextUntil: function (e, t, n) {
                        return s.dir(e, "nextSibling", n)
                    },
                    prevUntil: function (e, t, n) {
                        return s.dir(e, "previousSibling", n)
                    },
                    siblings: function (e) {
                        return s.sibling(e.parentNode.firstChild, e)
                    },
                    children: function (e) {
                        return s.sibling(e.firstChild)
                    },
                    contents: function (e) {
                        return s.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : s.makeArray(e.childNodes)
                    }
                }, function (e, t) {
                    s.fn[e] = function (n, r) {
                        var i = s.map(this, t, n);
                        return j.test(e) || (r = n), r && typeof r == "string" && (i = s.filter(r, i)), i = this.length > 1 && !z[e] ? s.unique(i) : i, (this.length > 1 || I.test(r)) && F.test(e) && (i = i.reverse()), this.pushStack(i, e, R.call(arguments).join(","))
                    }
                }), s.extend({
                    filter: function (e, t, n) {
                        return n && (e = ":not(" + e + ")"), t.length === 1 ? s.find.matchesSelector(t[0], e) ? [t[0]] : [] : s.find.matches(e, t)
                    },
                    dir: function (e, n, r) {
                        var i = [],
                            o = e[n];
                        while (o && o.nodeType !== 9 && (r === t || o.nodeType !== 1 || !s(o).is(r))) o.nodeType === 1 && i.push(o), o = o[n];
                        return i
                    },
                    nth: function (e, t, n, r) {
                        t = t || 1;
                        var i = 0;
                        for (; e; e = e[n]) if (e.nodeType === 1 && ++i === t) break;
                        return e
                    },
                    sibling: function (e, t) {
                        var n = [];
                        for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
                        return n
                    }
                });
                var $ = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    J = / jQuery\d+="(?:\d+|null)"/g,
                    K = /^\s+/,
                    Q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
                    G = /<([\w:]+)/,
                    Y = /<tbody/i,
                    Z = /<|&#?\w+;/,
                    et = /<(?:script|style)/i,
                    tt = /<(?:script|object|embed|option|style)/i,
                    nt = new RegExp("<(?:" + $ + ")", "i"),
                    rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    it = /\/(java|ecma)script/i,
                    st = /^\s*<!(?:\[CDATA\[|\-\-)/,
                    ot = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        area: [1, "<map>", "</map>"],
                        _default: [0, "", ""]
                    }, ut = V(n);
                ot.optgroup = ot.option, ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead, ot.th = ot.td, s.support.htmlSerialize || (ot._default = [1, "div<div>", "</div>"]), s.fn.extend({
                    text: function (e) {
                        return s.isFunction(e) ? this.each(function (t) {
                            var n = s(this);
                            n.text(e.call(this, t, n.text()))
                        }) : typeof e != "object" && e !== t ? this.empty().append((this[0] && this[0].ownerDocument || n).createTextNode(e)) : s.text(this)
                    },
                    wrapAll: function (e) {
                        if (s.isFunction(e)) return this.each(function (t) {
                                s(this).wrapAll(e.call(this, t))
                            });
                        if (this[0]) {
                            var t = s(e, this[0].ownerDocument).eq(0).clone(!0);
                            this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                                var e = this;
                                while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                                return e
                            }).append(this)
                        }
                        return this
                    },
                    wrapInner: function (e) {
                        return s.isFunction(e) ? this.each(function (t) {
                            s(this).wrapInner(e.call(this, t))
                        }) : this.each(function () {
                            var t = s(this),
                                n = t.contents();
                            n.length ? n.wrapAll(e) : t.append(e)
                        })
                    },
                    wrap: function (e) {
                        var t = s.isFunction(e);
                        return this.each(function (n) {
                            s(this).wrapAll(t ? e.call(this, n) : e)
                        })
                    },
                    unwrap: function () {
                        return this.parent().each(function () {
                            s.nodeName(this, "body") || s(this).replaceWith(this.childNodes)
                        }).end()
                    },
                    append: function () {
                        return this.domManip(arguments, !0, function (e) {
                            this.nodeType === 1 && this.appendChild(e)
                        })
                    },
                    prepend: function () {
                        return this.domManip(arguments, !0, function (e) {
                            this.nodeType === 1 && this.insertBefore(e, this.firstChild)
                        })
                    },
                    before: function () {
                        if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (e) {
                                this.parentNode.insertBefore(e, this)
                            });
                        if (arguments.length) {
                            var e = s.clean(arguments);
                            return e.push.apply(e, this.toArray()), this.pushStack(e, "before", arguments)
                        }
                    },
                    after: function () {
                        if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (e) {
                                this.parentNode.insertBefore(e, this.nextSibling)
                            });
                        if (arguments.length) {
                            var e = this.pushStack(this, "after", arguments);
                            return e.push.apply(e, s.clean(arguments)), e
                        }
                    },
                    remove: function (e, t) {
                        for (var n = 0, r;
                        (r = this[n]) != null; n++) if (!e || s.filter(e, [r]).length)!t && r.nodeType === 1 && (s.cleanData(r.getElementsByTagName("*")), s.cleanData([r])), r.parentNode && r.parentNode.removeChild(r);
                        return this
                    },
                    empty: function () {
                        for (var e = 0, t;
                        (t = this[e]) != null; e++) {
                            t.nodeType === 1 && s.cleanData(t.getElementsByTagName("*"));
                            while (t.firstChild) t.removeChild(t.firstChild)
                        }
                        return this
                    },
                    clone: function (e, t) {
                        return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
                            return s.clone(this, e, t)
                        })
                    },
                    html: function (e) {
                        if (e === t) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(J, "") : null;
                        if (typeof e == "string" && !et.test(e) && (s.support.leadingWhitespace || !K.test(e)) && !ot[(G.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = e.replace(Q, "<$1></$2>");
                            try {
                                for (var n = 0, r = this.length; n < r; n++) this[n].nodeType === 1 && (s.cleanData(this[n].getElementsByTagName("*")), this[n].innerHTML = e)
                            } catch (i) {
                                this.empty().append(e)
                            }
                        } else s.isFunction(e) ? this.each(function (t) {
                                var n = s(this);
                                n.html(e.call(this, t, n.html()))
                            }) : this.empty().append(e);
                        return this
                    },
                    replaceWith: function (e) {
                        return this[0] && this[0].parentNode ? s.isFunction(e) ? this.each(function (t) {
                            var n = s(this),
                                r = n.html();
                            n.replaceWith(e.call(this, t, r))
                        }) : (typeof e != "string" && (e = s(e).detach()), this.each(function () {
                            var t = this.nextSibling,
                                n = this.parentNode;
                            s(this).remove(), t ? s(t).before(e) : s(n).append(e)
                        })) : this.length ? this.pushStack(s(s.isFunction(e) ? e() : e), "replaceWith", e) : this
                    },
                    detach: function (e) {
                        return this.remove(e, !0)
                    },
                    domManip: function (e, n, r) {
                        var i, o, u, a, f = e[0],
                            l = [];
                        if (!s.support.checkClone && arguments.length === 3 && typeof f == "string" && rt.test(f)) return this.each(function () {
                                s(this).domManip(e, n, r, !0)
                            });
                        if (s.isFunction(f)) return this.each(function (i) {
                                var o = s(this);
                                e[0] = f.call(this, i, n ? o.html() : t), o.domManip(e, n, r)
                            });
                        if (this[0]) {
                            a = f && f.parentNode, s.support.parentNode && a && a.nodeType === 11 && a.childNodes.length === this.length ? i = {
                                fragment: a
                            } : i = s.buildFragment(e, this, l), u = i.fragment, u.childNodes.length === 1 ? o = u = u.firstChild : o = u.firstChild;
                            if (o) {
                                n = n && s.nodeName(o, "tr");
                                for (var c = 0, h = this.length, p = h - 1; c < h; c++) r.call(n ? at(this[c], o) : this[c], i.cacheable || h > 1 && c < p ? s.clone(u, !0, !0) : u)
                            }
                            l.length && s.each(l, vt)
                        }
                        return this
                    }
                }), s.buildFragment = function (e, t, r) {
                    var i, o, u, a, f = e[0];
                    return t && t[0] && (a = t[0].ownerDocument || t[0]), a.createDocumentFragment || (a = n), e.length === 1 && typeof f == "string" && f.length < 512 && a === n && f.charAt(0) === "<" && !tt.test(f) && (s.support.checkClone || !rt.test(f)) && (s.support.html5Clone || !nt.test(f)) && (o = !0, u = s.fragments[f], u && u !== 1 && (i = u)), i || (i = a.createDocumentFragment(), s.clean(e, a, i, r)), o && (s.fragments[f] = u ? i : 1), {
                        fragment: i,
                        cacheable: o
                    }
                }, s.fragments = {}, s.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function (e, t) {
                    s.fn[e] = function (n) {
                        var r = [],
                            i = s(n),
                            o = this.length === 1 && this[0].parentNode;
                        if (o && o.nodeType === 11 && o.childNodes.length === 1 && i.length === 1) return i[t](this[0]), this;
                        for (var u = 0, a = i.length; u < a; u++) {
                            var f = (u > 0 ? this.clone(!0) : this).get();
                            s(i[u])[t](f), r = r.concat(f)
                        }
                        return this.pushStack(r, e, i.selector)
                    }
                }), s.extend({
                    clone: function (e, t, n) {
                        var r, i, o, u = s.support.html5Clone || !nt.test("<" + e.nodeName) ? e.cloneNode(!0) : dt(e);
                        if ((!s.support.noCloneEvent || !s.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !s.isXMLDoc(e)) {
                            lt(e, u), r = ct(e), i = ct(u);
                            for (o = 0; r[o]; ++o) i[o] && lt(r[o], i[o])
                        }
                        if (t) {
                            ft(e, u);
                            if (n) {
                                r = ct(e), i = ct(u);
                                for (o = 0; r[o]; ++o) ft(r[o], i[o])
                            }
                        }
                        return r = i = null, u
                    },
                    clean: function (e, t, r, i) {
                        var o;
                        t = t || n, typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || n);
                        var u = [],
                            a;
                        for (var f = 0, l;
                        (l = e[f]) != null; f++) {
                            typeof l == "number" && (l += "");
                            if (!l) continue;
                            if (typeof l == "string") if (!Z.test(l)) l = t.createTextNode(l);
                                else {
                                    l = l.replace(Q, "<$1></$2>");
                                    var c = (G.exec(l) || ["", ""])[1].toLowerCase(),
                                        h = ot[c] || ot._default,
                                        p = h[0],
                                        d = t.createElement("div");
                                    t === n ? ut.appendChild(d) : V(t).appendChild(d), d.innerHTML = h[1] + l + h[2];
                                    while (p--) d = d.lastChild;
                                    if (!s.support.tbody) {
                                        var v = Y.test(l),
                                            m = c === "table" && !v ? d.firstChild && d.firstChild.childNodes : h[1] === "<table>" && !v ? d.childNodes : [];
                                        for (a = m.length - 1; a >= 0; --a) s.nodeName(m[a], "tbody") && !m[a].childNodes.length && m[a].parentNode.removeChild(m[a])
                                    }!s.support.leadingWhitespace && K.test(l) && d.insertBefore(t.createTextNode(K.exec(l)[0]), d.firstChild), l = d.childNodes
                                }
                            var g;
                            if (!s.support.appendChecked) if (l[0] && typeof (g = l.length) == "number") for (a = 0; a < g; a++) pt(l[a]);
                                else pt(l);
                            l.nodeType ? u.push(l) : u = s.merge(u, l)
                        }
                        if (r) {
                            o = function (e) {
                                return !e.type || it.test(e.type)
                            };
                            for (f = 0; u[f]; f++) if (i && s.nodeName(u[f], "script") && (!u[f].type || u[f].type.toLowerCase() === "text/javascript")) i.push(u[f].parentNode ? u[f].parentNode.removeChild(u[f]) : u[f]);
                                else {
                                    if (u[f].nodeType === 1) {
                                        var y = s.grep(u[f].getElementsByTagName("script"), o);
                                        u.splice.apply(u, [f + 1, 0].concat(y))
                                    }
                                    r.appendChild(u[f])
                                }
                        }
                        return u
                    },
                    cleanData: function (e) {
                        var t, n, r = s.cache,
                            i = s.event.special,
                            o = s.support.deleteExpando;
                        for (var u = 0, a;
                        (a = e[u]) != null; u++) {
                            if (a.nodeName && s.noData[a.nodeName.toLowerCase()]) continue;
                            n = a[s.expando];
                            if (n) {
                                t = r[n];
                                if (t && t.events) {
                                    for (var f in t.events) {
                                        if (!t.events.hasOwnProperty(f)) continue;
                                        i[f] ? s.event.remove(a, f) : s.removeEvent(a, f, t.handle)
                                    }
                                    t.handle && (t.handle.elem = null)
                                }
                                o ? delete a[s.expando] : a.removeAttribute && a.removeAttribute(s.expando), delete r[n]
                            }
                        }
                    }
                });
                var mt = /alpha\([^)]*\)/i,
                    gt = /opacity=([^)]*)/,
                    yt = /([A-Z]|^ms)/g,
                    bt = /^-?\d+(?:px)?$/i,
                    wt = /^-?\d/,
                    Et = /^([\-+])=([\-+.\de]+)/,
                    St = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    }, xt = ["Left", "Right"],
                    Tt = ["Top", "Bottom"],
                    Nt, Ct, kt;
                s.fn.css = function (e, n, r) {
                    return arguments.length === 2 && n === t ? this : (typeof e == "object" && arguments.length === 2 && (r = !! n), s.access(this, e, n, !0, function (e, n, i) {
                        return i !== t ? s.style(e, n, i, {
                            notImportant: !r
                        }) : s.css(e, n)
                    }))
                }, s.extend({
                    cssHooks: {
                        opacity: {
                            get: function (e, t) {
                                if (t) {
                                    var n = Nt(e, "opacity", "opacity");
                                    return n === "" ? "1" : n
                                }
                                return e.style.opacity
                            }
                        }
                    },
                    cssNumber: {
                        fillOpacity: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {
                        "float": s.support.cssFloat ? "cssFloat" : "styleFloat"
                    },
                    style: function (e, n, r, i) {
                        if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
                        var o = n,
                            u, a, f = s.camelCase(n),
                            l = e.style,
                            c = s.cssHooks[f];
                        n = s.cssProps[f] || f;
                        if (r === t) return c && "get" in c && (u = c.get(e, !1, i)) !== t ? u : l[n];
                        a = typeof r, a === "string" && (u = Et.exec(r)) && (r = +(u[1] + 1) * +u[2] + parseFloat(s.css(e, n)), a = "number");
                        if (r == null || a === "number" && isNaN(r)) return;
                        a === "number" && !s.cssNumber[f] && (r += "px"), a === "number" && f === "opacity" && (r += "");
                        if (!c || !("set" in c) || (r = c.set(e, r)) !== t) try {
                                if (i && i.notImportant) {
                                    l[n] = r;
                                    return
                                }
                                if (l.setProperty) l.setProperty(o, r, "important");
                                else {
                                    o === "display" && !r && (r = Sn(e.nodeName));
                                    var h = new RegExp("((?:^|;)\\s*" + o + ")\\s*:\\s*.+?(?:\\s*!important)?(?:;|$)", "gi");
                                    h.test(l.cssText) ? l.cssText = l.cssText.replace(h, "$1: " + r + " !important;") : l.cssText += ";" + o + ": " + r + " !important;"
                                }
                        } catch (p) {}
                    },
                    css: function (e, n, r) {
                        var i, o;
                        n = s.camelCase(n), o = s.cssHooks[n], n = s.cssProps[n] || n, n === "cssFloat" && (n = "float");
                        if (o && "get" in o && (i = o.get(e, !0, r)) !== t) return i;
                        if (Nt) return Nt(e, n)
                    },
                    swap: function (e, t, n) {
                        var r = {};
                        for (var i in t) r[i] = e.style[i], e.style[i] = t[i];
                        n.call(e);
                        for (i in t) e.style[i] = r[i]
                    }
                }), s.curCSS = s.css, s.each(["height", "width"], function (e, t) {
                    s.cssHooks[t] = {
                        get: function (e, n, r) {
                            var i;
                            if (n) return e.offsetWidth !== 0 ? Lt(e, t, r) : (s.swap(e, St, function () {
                                    i = Lt(e, t, r)
                                }), i)
                        },
                        set: function (e, t) {
                            if (!bt.test(t)) return t;
                            t = parseFloat(t);
                            if (t >= 0) return t + "px"
                        }
                    }
                }), s.support.opacity || (s.cssHooks.opacity = {
                    get: function (e, t) {
                        return gt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
                    },
                    set: function (e, t) {
                        var n = e.style,
                            r = e.currentStyle,
                            i = s.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                            o = r && r.filter || n.filter || "";
                        n.zoom = 1;
                        if (t >= 1 && s.trim(o.replace(mt, "")) === "") {
                            n.removeAttribute("filter");
                            if (r && !r.filter) return
                        }
                        s.style(e, "filter", mt.test(o) ? o.replace(mt, i) : o + " " + i)
                    }
                }), s(function () {
                    s.support.reliableMarginRight || (s.cssHooks.marginRight = {
                        get: function (e, t) {
                            var n;
                            return s.swap(e, {
                                display: "inline-block"
                            }, function () {
                                t ? n = Nt(e, "margin-right", "marginRight") : n = e.style.marginRight
                            }), n
                        }
                    })
                }), n.defaultView && n.defaultView.getComputedStyle && (Ct = function (e, t) {
                    if (typeof t != "string") return;
                    var n, r, i;
                    return t = t.replace(yt, "-$1").toLowerCase(), (r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null)) && (n = i.getPropertyValue(t), n === "" && !s.contains(e.ownerDocument.documentElement, e) && (n = s.style(e, t))), n
                }), n.documentElement.currentStyle && (kt = function (e, t) {
                    var n, r, i, s = e.currentStyle && e.currentStyle[t],
                        o = e.style;
                    return s === null && o && (i = o[t]) && (s = i), !bt.test(s) && wt.test(s) && (n = o.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), o.left = t === "fontSize" ? "1em" : s || 0, s = o.pixelLeft + "px", o.left = n, r && (e.runtimeStyle.left = r)), s === "" ? "auto" : s
                }), Nt = Ct || kt, s.expr && s.expr.filters && (s.expr.filters.hidden = function (e) {
                    var t = e.offsetWidth,
                        n = e.offsetHeight;
                    return t === 0 && n === 0 || !s.support.reliableHiddenOffsets && (e.style && e.style.display || s.css(e, "display")) === "none"
                }, s.expr.filters.visible = function (e) {
                    return !s.expr.filters.hidden(e)
                });
                var At = /%20/g,
                    Ot = /\[\]$/,
                    Mt = /\r?\n/g,
                    _t = /#.*$/,
                    Dt = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
                    Pt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
                    Ht = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
                    Bt = /^(?:GET|HEAD)$/,
                    jt = /^\/\//,
                    Ft = /\?/,
                    It = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                    qt = /^(?:select|textarea)/i,
                    Rt = /\s+/,
                    Ut = /([?&])_=[^&]*/,
                    zt = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
                    Wt = s.fn.load,
                    Xt = {}, Vt = {}, $t, Jt, Kt = ["*/"] + ["*"];
                try {
                    $t = i.href
                } catch (Qt) {
                    $t = n.createElement("a"), $t.href = "", $t = $t.href
                }
                Jt = zt.exec($t.toLowerCase()) || [], s.fn.extend({
                    load: function (e, n, r) {
                        if (typeof e != "string" && Wt) return Wt.apply(this, arguments);
                        if (!this.length) return this;
                        var i = e.indexOf(" ");
                        if (i >= 0) {
                            var o = e.slice(i, e.length);
                            e = e.slice(0, i)
                        }
                        var u = "GET";
                        n && (s.isFunction(n) ? (r = n, n = t) : typeof n == "object" && (n = s.param(n, s.ajaxSettings.traditional), u = "POST"));
                        var a = this;
                        return s.ajax({
                            url: e,
                            type: u,
                            dataType: "html",
                            data: n,
                            complete: function (e, t, n) {
                                n = e.responseText, e.isResolved() && (e.done(function (e) {
                                    n = e
                                }), a.html(o ? s("<div>").append(n.replace(It, "")).find(o) : n)), r && a.each(r, [n, t, e])
                            }
                        }), this
                    },
                    serialize: function () {
                        return s.param(this.serializeArray())
                    },
                    serializeArray: function () {
                        return this.map(function () {
                            return this.elements ? s.makeArray(this.elements) : this
                        }).filter(function () {
                            return this.name && !this.disabled && (this.checked || qt.test(this.nodeName) || Pt.test(this.type))
                        }).map(function (e, t) {
                            var n = s(this).val();
                            return n == null ? null : s.isArray(n) ? s.map(n, function (e, n) {
                                return {
                                    name: t.name,
                                    value: e.replace(Mt, "\r\n")
                                }
                            }) : {
                                name: t.name,
                                value: n.replace(Mt, "\r\n")
                            }
                        }).get()
                    }
                }), s.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
                    s.fn[t] = function (e) {
                        return this.on(t, e)
                    }
                }), s.each(["get", "post"], function (e, n) {
                    s[n] = function (e, r, i, o) {
                        return s.isFunction(r) && (o = o || i, i = r, r = t), s.ajax({
                            type: n,
                            url: e,
                            data: r,
                            success: i,
                            dataType: o
                        })
                    }
                }), s.extend({
                    getScript: function (e, n) {
                        return s.get(e, t, n, "script")
                    },
                    getJSON: function (e, t, n) {
                        return s.get(e, t, n, "json")
                    },
                    ajaxSetup: function (e, t) {
                        return t ? Zt(e, s.ajaxSettings) : (t = e, e = s.ajaxSettings), Zt(e, t), e
                    },
                    ajaxSettings: {
                        url: $t,
                        isLocal: Ht.test(Jt[1]),
                        global: !0,
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded",
                        processData: !0,
                        async: !0,
                        accepts: {
                            xml: "application/xml, text/xml",
                            html: "text/html",
                            text: "text/plain",
                            json: "application/json, text/javascript",
                            "*": Kt
                        },
                        contents: {
                            xml: /xml/,
                            html: /html/,
                            json: /json/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText"
                        },
                        converters: {
                            "* text": e.String,
                            "text html": !0,
                            "text json": s.parseJSON,
                            "text xml": s.parseXML
                        },
                        flatOptions: {
                            context: !0,
                            url: !0
                        }
                    },
                    ajaxPrefilter: Gt(Xt),
                    ajaxTransport: Gt(Vt),
                    ajax: function (e, n) {
                        function S(e, n, c, h) {
                            if (y === 2) return;
                            y = 2, m && clearTimeout(m), v = t, p = h || "", E.readyState = e > 0 ? 4 : 0;
                            var d, g, w, S = n,
                                x = c ? tn(r, E, c) : t,
                                T, N;
                            if (e >= 200 && e < 300 || e === 304) {
                                if (r.ifModified) {
                                    if (T = E.getResponseHeader("Last-Modified")) s.lastModified[l] = T;
                                    if (N = E.getResponseHeader("Etag")) s.etag[l] = N
                                }
                                if (e === 304) S = "notmodified", d = !0;
                                else try {
                                        g = nn(r, x), S = "success", d = !0
                                } catch (C) {
                                    S = "parsererror", w = C
                                }
                            } else {
                                w = S;
                                if (!S || e) S = "error", e < 0 && (e = 0)
                            }
                            E.status = e, E.statusText = "" + (n || S), d ? u.resolveWith(i, [g, S, E]) : u.rejectWith(i, [E, S, w]), E.statusCode(f), f = t, b && o.trigger("ajax" + (d ? "Success" : "Error"), [E, r, d ? g : w]), a.fireWith(i, [E, S]), b && (o.trigger("ajaxComplete", [E, r]), --s.active || s.event.trigger("ajaxStop"))
                        }
                        typeof e == "object" && (n = e, e = t), n = n || {};
                        var r = s.ajaxSetup({}, n),
                            i = r.context || r,
                            o = i !== r && (i.nodeType || i instanceof s) ? s(i) : s.event,
                            u = s.Deferred(),
                            a = s.Callbacks("once memory"),
                            f = r.statusCode || {}, l, c = {}, h = {}, p, d, v, m, g, y = 0,
                            b, w, E = {
                                readyState: 0,
                                setRequestHeader: function (e, t) {
                                    if (!y) {
                                        var n = e.toLowerCase();
                                        e = h[n] = h[n] || e, c[e] = t
                                    }
                                    return this
                                },
                                getAllResponseHeaders: function () {
                                    return y === 2 ? p : null
                                },
                                getResponseHeader: function (e) {
                                    var n;
                                    if (y === 2) {
                                        if (!d) {
                                            d = {};
                                            while (n = Dt.exec(p)) d[n[1].toLowerCase()] = n[2]
                                        }
                                        n = d[e.toLowerCase()]
                                    }
                                    return n === t ? null : n
                                },
                                overrideMimeType: function (e) {
                                    return y || (r.mimeType = e), this
                                },
                                abort: function (e) {
                                    return e = e || "abort", v && v.abort(e), S(0, e), this
                                }
                            };
                        u.promise(E), E.success = E.done, E.error = E.fail, E.complete = a.add, E.statusCode = function (e) {
                            if (e) {
                                var t;
                                if (y < 2) for (t in e) f[t] = [f[t], e[t]];
                                else t = e[E.status], E.then(t, t)
                            }
                            return this
                        }, r.url = ((e || r.url) + "").replace(_t, "").replace(jt, Jt[1] + "//"), r.dataTypes = s.trim(r.dataType || "*").toLowerCase().split(Rt), r.crossDomain == null && (g = zt.exec(r.url.toLowerCase()), r.crossDomain = !(!g || g[1] == Jt[1] && g[2] == Jt[2] && (g[3] || (g[1] === "http:" ? 80 : 443)) == (Jt[3] || (Jt[1] === "http:" ? 80 : 443)))), r.data && r.processData && typeof r.data != "string" && (r.data = s.param(r.data, r.traditional)), Yt(Xt, r, n, E);
                        if (y === 2) return !1;
                        b = r.global, r.type = r.type.toUpperCase(), r.hasContent = !Bt.test(r.type), b && s.active++ === 0 && s.event.trigger("ajaxStart");
                        if (!r.hasContent) {
                            r.data && (r.url += (Ft.test(r.url) ? "&" : "?") + r.data, delete r.data), l = r.url;
                            if (r.cache === !1) {
                                var x = s.now(),
                                    T = r.url.replace(Ut, "$1_=" + x);
                                r.url = T + (T === r.url ? (Ft.test(r.url) ? "&" : "?") + "_=" + x : "")
                            }
                        }(r.data && r.hasContent && r.contentType !== !1 || n.contentType) && E.setRequestHeader("Content-Type", r.contentType), r.ifModified && (l = l || r.url, s.lastModified[l] && E.setRequestHeader("If-Modified-Since", s.lastModified[l]), s.etag[l] && E.setRequestHeader("If-None-Match", s.etag[l])), E.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + Kt + "; q=0.01" : "") : r.accepts["*"]);
                        for (w in r.headers) E.setRequestHeader(w, r.headers[w]);
                        if (!r.beforeSend || r.beforeSend.call(i, E, r) !== !1 && y !== 2) {
                            for (w in {
                                success: 1,
                                error: 1,
                                complete: 1
                            }) E[w](r[w]);
                            v = Yt(Vt, r, n, E);
                            if (!v) S(-1, "No Transport");
                            else {
                                E.readyState = 1, b && o.trigger("ajaxSend", [E, r]), r.async && r.timeout > 0 && (m = setTimeout(function () {
                                    E.abort("timeout")
                                }, r.timeout));
                                try {
                                    y = 1, v.send(c, S)
                                } catch (N) {
                                    if (!(y < 2)) throw N;
                                    S(-1, N)
                                }
                            }
                            return E
                        }
                        return E.abort(), !1
                    },
                    param: function (e, n) {
                        var r = [],
                            i = function (e, t) {
                                t = s.isFunction(t) ? t() : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                            };
                        n === t && (n = s.ajaxSettings.traditional);
                        if (s.isArray(e) || e.jquery && !s.isPlainObject(e)) s.each(e, function () {
                                i(this.name, this.value)
                            });
                        else for (var o in e) en(o, e[o], n, i);
                        return r.join("&").replace(At, "+")
                    }
                }), s.extend({
                    active: 0,
                    lastModified: {},
                    etag: {}
                });
                var rn = s.now(),
                    sn = /(\=)\?(&|$)|\?\?/i;
                s.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function () {
                        return s.expando + "_" + rn++
                    }
                }), s.ajaxPrefilter("json jsonp", function (t, n, r) {
                    var i = t.contentType === "application/x-www-form-urlencoded" && typeof t.data == "string";
                    if (t.dataTypes[0] === "jsonp" || t.jsonp !== !1 && (sn.test(t.url) || i && sn.test(t.data))) {
                        var o, u = t.jsonpCallback = s.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                            a = e[u],
                            f = t.url,
                            l = t.data,
                            c = "$1" + u + "$2";
                        return t.jsonp !== !1 && (f = f.replace(sn, c), t.url === f && (i && (l = l.replace(sn, c)), t.data === l && (f += (/\?/.test(f) ? "&" : "?") + t.jsonp + "=" + u))), t.url = f, t.data = l, e[u] = function (e) {
                            o = [e]
                        }, r.always(function () {
                            e[u] = a, o && s.isFunction(a) && e[u](o[0])
                        }), t.converters["script json"] = function () {
                            return o || s.error(u + " was not called"), o[0]
                        }, t.dataTypes[0] = "json", "script"
                    }
                }), s.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /javascript|ecmascript/
                    },
                    converters: {
                        "text script": function (e) {
                            return s.globalEval(e), e
                        }
                    }
                }), s.ajaxPrefilter("script", function (e) {
                    e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
                }), s.ajaxTransport("script", function (e) {
                    if (e.crossDomain) {
                        var r, i = n.head || n.getElementsByTagName("head")[0] || n.documentElement;
                        return {
                            send: function (s, o) {
                                r = n.createElement("script"), r.async = "async", e.scriptCharset && (r.charset = e.scriptCharset), r.src = e.url, r.onload = r.onreadystatechange = function (e, n) {
                                    if (n || !r.readyState || /loaded|complete/.test(r.readyState)) r.onload = r.onreadystatechange = null, i && r.parentNode && i.removeChild(r), r = t, n || o(200, "success")
                                }, i.insertBefore(r, i.firstChild)
                            },
                            abort: function () {
                                r && r.onload(0, 1)
                            }
                        }
                    }
                });
                var on = e.ActiveXObject ? function () {
                        for (var e in an) an[e](0, 1)
                    } : !1,
                    un = 0,
                    an;
                s.ajaxSettings.xhr = e.ActiveXObject ? function () {
                    return !this.isLocal && fn() || ln()
                } : fn,
                function (e) {
                    s.extend(s.support, {
                        ajax: !! e,
                        cors: !! e && "withCredentials" in e
                    })
                }(s.ajaxSettings.xhr()), s.support.ajax && s.ajaxTransport(function (n) {
                    if (!n.crossDomain || s.support.cors) {
                        var r;
                        return {
                            send: function (i, o) {
                                var u = n.xhr(),
                                    a, f;
                                n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async);
                                if (n.xhrFields) for (f in n.xhrFields) u[f] = n.xhrFields[f];
                                n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                                try {
                                    for (f in i) u.setRequestHeader(f, i[f])
                                } catch (l) {}
                                u.send(n.hasContent && n.data || null), r = function (e, i) {
                                    var f, l, c, h, p;
                                    try {
                                        if (r && (i || u.readyState === 4)) {
                                            r = t, a && (u.onreadystatechange = s.noop, on && delete an[a]);
                                            if (i) u.readyState !== 4 && u.abort();
                                            else {
                                                f = u.status, c = u.getAllResponseHeaders(), h = {}, p = u.responseXML, p && p.documentElement && (h.xml = p), h.text = u.responseText;
                                                try {
                                                    l = u.statusText
                                                } catch (d) {
                                                    l = ""
                                                }!f && n.isLocal && !n.crossDomain ? f = h.text ? 200 : 404 : f === 1223 && (f = 204)
                                            }
                                        }
                                    } catch (v) {
                                        i || o(-1, v)
                                    }
                                    h && o(f, l, h, c)
                                }, !n.async || u.readyState === 4 ? r() : (a = ++un, on && (an || (an = {}, s(e).unload(on)), an[a] = r), u.onreadystatechange = r)
                            },
                            abort: function () {
                                r && r(0, 1)
                            }
                        }
                    }
                });
                var cn = {}, hn, pn, dn = /^(?:toggle|show|hide)$/,
                    vn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
                    mn, gn = [
                        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
                        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
                        ["opacity"]
                    ],
                    yn;
                s.fn.extend({
                    show: function (e, t, n) {
                        var r, i;
                        if (e || e === 0) return this.animate(En("show", 3), e, t, n);
                        for (var o = 0, u = this.length; o < u; o++) r = this[o], r.style && (i = s.css(r, "display"), !s._data(r, "olddisplay") && i === "none" && (s.style(r, "display", ""), i = ""), i === "" && s.css(r, "display") === "none" && s._data(r, "olddisplay", Sn(r.nodeName)));
                        for (o = 0; o < u; o++) r = this[o], r.style && (i = s.css(r, "display"), (i === "" || i === "none") && s.style(r, "display", s._data(r, "olddisplay") || ""));
                        return this
                    },
                    hide: function (e, t, n) {
                        if (e || e === 0) return this.animate(En("hide", 3), e, t, n);
                        var r, i, o = 0,
                            u = this.length;
                        for (; o < u; o++) r = this[o], r.style && (i = s.css(r, "display"), i !== "none" && !s._data(r, "olddisplay") && s._data(r, "olddisplay", i));
                        for (o = 0; o < u; o++) this[o].style && s.style(this[o], "display", "none");
                        return this
                    },
                    _toggle: s.fn.toggle,
                    toggle: function (e, t, n) {
                        var r = typeof e == "boolean";
                        return s.isFunction(e) && s.isFunction(t) ? this._toggle.apply(this, arguments) : e == null || r ? this.each(function () {
                            var t = r ? e : s(this).is(":hidden");
                            s(this)[t ? "show" : "hide"]()
                        }) : this.animate(En("toggle", 3), e, t, n), this
                    },
                    fadeTo: function (e, t, n, r) {
                        return this.filter(":hidden").css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, r)
                    },
                    animate: function (e, t, n, r) {
                        function o() {
                            i.queue === !1 && s._mark(this);
                            var t = s.extend({}, i),
                                n = this.nodeType === 1,
                                r = n && s(this).is(":hidden"),
                                o, u, a, f, l, c, h, p, d;
                            t.animatedProperties = {};
                            for (a in e) {
                                o = s.camelCase(a), a !== o && (e[o] = e[a], delete e[a]), u = e[o], s.isArray(u) ? (t.animatedProperties[o] = u[1], u = e[o] = u[0]) : t.animatedProperties[o] = t.specialEasing && t.specialEasing[o] || t.easing || "swing";
                                if (u === "hide" && r || u === "show" && !r) return t.complete.call(this);
                                n && (o === "height" || o === "width") && (t.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], s.css(this, "display") === "inline" && s.css(this, "float") === "none" && (!s.support.inlineBlockNeedsLayout || Sn(this.nodeName) === "inline" ? s.style(this, "display", "inline-block") : s.style(this, "zoom", 1)))
                            }
                            t.overflow != null && s.style(this, "overflow", "hidden");
                            for (a in e) f = new s.fx(this, t, a), u = e[a], dn.test(u) ? (d = s._data(this, "toggle" + a) || (u === "toggle" ? r ? "show" : "hide" : 0), d ? (s._data(this, "toggle" + a, d === "show" ? "hide" : "show"), f[d]()) : f[u]()) : (l = vn.exec(u), c = f.cur(), l ? (h = parseFloat(l[2]), p = l[3] || (s.cssNumber[a] ? "" : "px"), p !== "px" && (s.style(this, a, (h || 1) + p), c = (h || 1) / f.cur() * c, s.style(this, a, c + p)), l[1] && (h = (l[1] === "-=" ? -1 : 1) * h + c), f.custom(c, h, p)) : f.custom(c, u, ""));
                            return !0
                        }
                        var i = s.speed(t, n, r);
                        return s.isEmptyObject(e) ? this.each(i.complete, [!1]) : (e = s.extend({}, e), i.queue === !1 ? this.each(o) : this.queue(i.queue, o))
                    },
                    stop: function (e, n, r) {
                        return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                            function u(e, t, n) {
                                var i = t[n];
                                s.removeData(e, n, !0), i.stop(r)
                            }
                            var t, n = !1,
                                i = s.timers,
                                o = s._data(this);
                            r || s._unmark(!0, this);
                            if (e == null) for (t in o) o[t] && o[t].stop && t
                                        .indexOf(".run") === t.length - 4 && u(this, o, t);
                            else o[t = e + ".run"] && o[t].stop && u(this, o, t);
                            for (t = i.length; t--;) i[t].elem === this && (e == null || i[t].queue === e) && (r ? i[t](!0) : i[t].saveState(), n = !0, i.splice(t, 1));
                            (!r || !n) && s.dequeue(this, e)
                        })
                    }
                }), s.each({
                    slideDown: En("show", 1),
                    slideUp: En("hide", 1),
                    slideToggle: En("toggle", 1),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function (e, t) {
                    s.fn[e] = function (e, n, r) {
                        return this.animate(t, e, n, r)
                    }
                }), s.extend({
                    speed: function (e, t, n) {
                        var r = e && typeof e == "object" ? s.extend({}, e) : {
                            complete: n || !n && t || s.isFunction(e) && e,
                            duration: e,
                            easing: n && t || t && !s.isFunction(t) && t
                        };
                        r.duration = s.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in s.fx.speeds ? s.fx.speeds[r.duration] : s.fx.speeds._default;
                        if (r.queue == null || r.queue === !0) r.queue = "fx";
                        return r.old = r.complete, r.complete = function (e) {
                            s.isFunction(r.old) && r.old.call(this), r.queue ? s.dequeue(this, r.queue) : e !== !1 && s._unmark(this)
                        }, r
                    },
                    easing: {
                        linear: function (e, t, n, r) {
                            return n + r * e
                        },
                        swing: function (e, t, n, r) {
                            return (-Math.cos(e * Math.PI) / 2 + .5) * r + n
                        }
                    },
                    timers: [],
                    fx: function (e, t, n) {
                        this.options = t, this.elem = e, this.prop = n, t.orig = t.orig || {}
                    }
                }), s.fx.prototype = {
                    update: function () {
                        this.options.step && this.options.step.call(this.elem, this.now, this), (s.fx.step[this.prop] || s.fx.step._default)(this)
                    },
                    cur: function () {
                        if (this.elem[this.prop] == null || !! this.elem.style && this.elem.style[this.prop] != null) {
                            var e, t = s.css(this.elem, this.prop);
                            return isNaN(e = parseFloat(t)) ? !t || t === "auto" ? 0 : t : e
                        }
                        return this.elem[this.prop]
                    },
                    custom: function (e, n, r) {
                        function u(e) {
                            return i.step(e)
                        }
                        var i = this,
                            o = s.fx;
                        this.startTime = yn || bn(), this.end = n, this.now = this.start = e, this.pos = this.state = 0, this.unit = r || this.unit || (s.cssNumber[this.prop] ? "" : "px"), u.queue = this.options.queue, u.elem = this.elem, u.saveState = function () {
                            i.options.hide && s._data(i.elem, "fxshow" + i.prop) === t && s._data(i.elem, "fxshow" + i.prop, i.start)
                        }, u() && s.timers.push(u) && !mn && (mn = setInterval(o.tick, o.interval))
                    },
                    show: function () {
                        var e = s._data(this.elem, "fxshow" + this.prop);
                        this.options.orig[this.prop] = e || s.style(this.elem, this.prop), this.options.show = !0, e !== t ? this.custom(this.cur(), e) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), s(this.elem).show()
                    },
                    hide: function () {
                        this.options.orig[this.prop] = s._data(this.elem, "fxshow" + this.prop) || s.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
                    },
                    step: function (e) {
                        var t, n, r, i = yn || bn(),
                            o = !0,
                            u = this.elem,
                            a = this.options;
                        if (e || i >= a.duration + this.startTime) {
                            this.now = this.end, this.pos = this.state = 1, this.update(), a.animatedProperties[this.prop] = !0;
                            for (t in a.animatedProperties) a.animatedProperties[t] !== !0 && (o = !1);
                            if (o) {
                                a.overflow != null && !s.support.shrinkWrapBlocks && s.each(["", "X", "Y"], function (e, t) {
                                    s.style(u, "overflow" + t, a.overflow[e])
                                }), a.hide && s(u).hide();
                                if (a.hide || a.show) for (t in a.animatedProperties) s.style(u, t, a.orig[t]), s.removeData(u, "fxshow" + t, !0), s.removeData(u, "toggle" + t, !0);
                                r = a.complete, r && (a.complete = !1, r.call(u))
                            }
                            return !1
                        }
                        return a.duration == Infinity ? this.now = i : (n = i - this.startTime, this.state = n / a.duration, this.pos = s.easing[a.animatedProperties[this.prop]](this.state, n, 0, 1, a.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
                    }
                }, s.extend(s.fx, {
                    tick: function () {
                        var e, t = s.timers,
                            n = 0;
                        for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
                        t.length || s.fx.stop()
                    },
                    interval: 13,
                    stop: function () {
                        clearInterval(mn), mn = null
                    },
                    speeds: {
                        slow: 600,
                        fast: 200,
                        _default: 400
                    },
                    step: {
                        opacity: function (e) {
                            s.style(e.elem, "opacity", e.now)
                        },
                        _default: function (e) {
                            e.elem.style && s.css(e.elem, e.prop) != null ? s.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                        }
                    }
                }), s.each(["width", "height"], function (e, t) {
                    s.fx.step[t] = function (e) {
                        s.style(e.elem, t, Math.max(0, e.now) + e.unit)
                    }
                }), s.expr && s.expr.filters && (s.expr.filters.animated = function (e) {
                    return s.grep(s.timers, function (t) {
                        return e === t.elem
                    }).length
                });
                var xn = /^t(?:able|d|h)$/i,
                    Tn = /^(?:body|html)$/i;
                "getBoundingClientRect" in n.documentElement ? s.fn.offset = function (e) {
                    var t = this[0],
                        n;
                    if (e) return this.each(function (t) {
                            s.offset.setOffset(this, e, t)
                        });
                    if (!t || !t.ownerDocument) return null;
                    if (t === t.ownerDocument.body) return s.offset.bodyOffset(t);
                    try {
                        n = t.getBoundingClientRect()
                    } catch (r) {}
                    var i = t.ownerDocument,
                        o = i.documentElement;
                    if (!n || !s.contains(o, t)) return n ? {
                            top: n.top,
                            left: n.left
                    }: {
                        top: 0,
                        left: 0
                    };
                    var u = i.body,
                        a = Nn(i),
                        f = o.clientTop || u.clientTop || 0,
                        l = o.clientLeft || u.clientLeft || 0,
                        c = a.pageYOffset || s.support.boxModel && o.scrollTop || u.scrollTop,
                        h = a.pageXOffset || s.support.boxModel && o.scrollLeft || u.scrollLeft,
                        p = n.top + c - f,
                        d = n.left + h - l;
                    return {
                        top: p,
                        left: d
                    }
                } : s.fn.offset = function (e) {
                    var t = this[0];
                    if (e) return this.each(function (t) {
                            s.offset.setOffset(this, e, t)
                        });
                    if (!t || !t.ownerDocument) return null;
                    if (t === t.ownerDocument.body) return s.offset.bodyOffset(t);
                    var n, r = t.offsetParent,
                        i = t,
                        o = t.ownerDocument,
                        u = o.documentElement,
                        a = o.body,
                        f = o.defaultView,
                        l = f ? f.getComputedStyle(t, null) : t.currentStyle,
                        c = t.offsetTop,
                        h = t.offsetLeft;
                    while ((t = t.parentNode) && t !== a && t !== u) {
                        if (s.support.fixedPosition && l.position === "fixed") break;
                        n = f ? f.getComputedStyle(t, null) : t.currentStyle, c -= t.scrollTop, h -= t.scrollLeft, t === r && (c += t.offsetTop, h += t.offsetLeft, s.support.doesNotAddBorder && (!s.support.doesAddBorderForTableAndCells || !xn.test(t.nodeName)) && (c += parseFloat(n.borderTopWidth) || 0, h += parseFloat(n.borderLeftWidth) || 0), i = r, r = t.offsetParent), s.support.subtractsBorderForOverflowNotVisible && n.overflow !== "visible" && (c += parseFloat(n.borderTopWidth) || 0, h += parseFloat(n.borderLeftWidth) || 0), l = n
                    }
                    if (l.position === "relative" || l.position === "static") c += a.offsetTop, h += a.offsetLeft;
                    return s.support.fixedPosition && l.position === "fixed" && (c += Math.max(u.scrollTop, a.scrollTop), h += Math.max(u.scrollLeft, a.scrollLeft)), {
                        top: c,
                        left: h
                    }
                }, s.offset = {
                    bodyOffset: function (e) {
                        var t = e.offsetTop,
                            n = e.offsetLeft;
                        return s.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(s.css(e, "marginTop")) || 0, n += parseFloat(s.css(e, "marginLeft")) || 0), {
                            top: t,
                            left: n
                        }
                    },
                    setOffset: function (e, t, n) {
                        var r = s.css(e, "position");
                        r === "static" && (e.style.position = "relative");
                        var i = s(e),
                            o = i.offset(),
                            u = s.css(e, "top"),
                            a = s.css(e, "left"),
                            f = (r === "absolute" || r === "fixed") && s.inArray("auto", [u, a]) > -1,
                            l = {}, c = {}, h, p;
                        f ? (c = i.position(), h = c.top, p = c.left) : (h = parseFloat(u) || 0, p = parseFloat(a) || 0), s.isFunction(t) && (t = t.call(e, n, o)), t.top != null && (l.top = t.top - o.top + h), t.left != null && (l.left = t.left - o.left + p), "using" in t ? t.using.call(e, l) : i.css(l)
                    }
                }, s.fn.extend({
                    position: function () {
                        if (!this[0]) return null;
                        var e = this[0],
                            t = this.offsetParent(),
                            n = this.offset(),
                            r = Tn.test(t[0].nodeName) ? {
                                top: 0,
                                left: 0
                            } : t.offset();
                        return n.top -= parseFloat(s.css(e, "marginTop")) || 0, n.left -= parseFloat(s.css(e, "marginLeft")) || 0, r.top += parseFloat(s.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(s.css(t[0], "borderLeftWidth")) || 0, {
                            top: n.top - r.top,
                            left: n.left - r.left
                        }
                    },
                    offsetParent: function () {
                        return this.map(function () {
                            var e = this.offsetParent || n.body;
                            while (e && !Tn.test(e.nodeName) && s.css(e, "position") === "static") e = e.offsetParent;
                            return e
                        })
                    }
                }), s.each(["Left", "Top"], function (e, n) {
                    var r = "scroll" + n;
                    s.fn[r] = function (n) {
                        var i, o;
                        return n === t ? (i = this[0], i ? (o = Nn(i), o ? "pageXOffset" in o ? o[e ? "pageYOffset" : "pageXOffset"] : s.support.boxModel && o.document.documentElement[r] || o.document.body[r] : i[r]) : null) : this.each(function () {
                            o = Nn(this), o ? o.scrollTo(e ? s(o).scrollLeft() : n, e ? n : s(o).scrollTop()) : this[r] = n
                        })
                    }
                }), s.each(["Height", "Width"], function (e, n) {
                    var r = n.toLowerCase();
                    s.fn["inner" + n] = function () {
                        var e = this[0];
                        return e ? e.style ? parseFloat(s.css(e, r, "padding")) : this[r]() : null
                    }, s.fn["outer" + n] = function (e) {
                        var t = this[0];
                        return t ? t.style ? parseFloat(s.css(t, r, e ? "margin" : "border")) : this[r]() : null
                    }, s.fn[r] = function (e) {
                        var i = this[0];
                        if (!i) return e == null ? null : this;
                        if (s.isFunction(e)) return this.each(function (t) {
                                var n = s(this);
                                n[r](e.call(this, t, n[r]()))
                            });
                        if (s.isWindow(i)) {
                            var o = i.document.documentElement["client" + n],
                                u = i.document.body;
                            return i.document.compatMode === "CSS1Compat" && o || u && u["client" + n] || o
                        }
                        if (i.nodeType === 9) return Math.max(i.documentElement["client" + n], i.body["scroll" + n], i.documentElement["scroll" + n], i.body["offset" + n], i.documentElement["offset" + n]);
                        if (e === t) {
                            var a = s.css(i, r),
                                f = parseFloat(a);
                            return s.isNumeric(f) ? f : a
                        }
                        return this.css(r, typeof e == "string" ? e : e + "px", !0)
                    }
                }), e.jQuery = e.$ = s, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
                    return s
                })
            })(window)
        })(), this.env.iHatePrototype.stupidFuckingPrototype && (this.document.getElementsByClassName = this.env.iHatePrototype.getElementsByClassName);
        var $, jQuery = $ = this.$ = cache.$ = window.jQuery.noConflict(!0);
        this.baseData = cache.baseData = getBaseData(this.$),
        function () {
            function utf8_encode(e) {
                var t = e + "",
                    n = "",
                    r, i, s = 0;
                r = i = 0, s = t.length;
                for (var o = 0; o < s; o++) {
                    var u = t.charCodeAt(o),
                        a = null;
                    u < 128 ? i++ : u > 127 && u < 2048 ? a = String.fromCharCode(u >> 6 | 192) + String.fromCharCode(u & 63 | 128) : a = String.fromCharCode(u >> 12 | 224) + String.fromCharCode(u >> 6 & 63 | 128) + String.fromCharCode(u & 63 | 128), a !== null && (i > r && (n += t.slice(r, i)), n += a, r = i = o + 1)
                }
                return i > r && (n += t.slice(r, s)), n
            }
            function sha1(e) {
                var t = function (e, t) {
                    var n = e << t | e >>> 32 - t;
                    return n
                }, n = function (e) {
                        var t = "",
                            n, r;
                        for (n = 7; n >= 0; n--) r = e >>> n * 4 & 15, t += r.toString(16);
                        return t
                    }, r, i, s, o = new Array(80),
                    u = 1732584193,
                    a = 4023233417,
                    f = 2562383102,
                    l = 271733878,
                    c = 3285377520,
                    h, p, d, v, m, g;
                e = this.utf8_encode(e);
                var y = e.length,
                    b = [];
                for (i = 0; i < y - 3; i += 4) s = e.charCodeAt(i) << 24 | e.charCodeAt(i + 1) << 16 | e.charCodeAt(i + 2) << 8 | e.charCodeAt(i + 3), b.push(s);
                switch (y % 4) {
                case 0:
                    i = 2147483648;
                    break;
                case 1:
                    i = e.charCodeAt(y - 1) << 24 | 8388608;
                    break;
                case 2:
                    i = e.charCodeAt(y - 2) << 24 | e.charCodeAt(y - 1) << 16 | 32768;
                    break;
                case 3:
                    i = e.charCodeAt(y - 3) << 24 | e.charCodeAt(y - 2) << 16 | e.charCodeAt(y - 1) << 8 | 128
                }
                b.push(i);
                while (b.length % 16 != 14) b.push(0);
                b.push(y >>> 29), b.push(y << 3 & 4294967295);
                for (r = 0; r < b.length; r += 16) {
                    for (i = 0; i < 16; i++) o[i] = b[r + i];
                    for (i = 16; i <= 79; i++) o[i] = t(o[i - 3] ^ o[i - 8] ^ o[i - 14] ^ o[i - 16], 1);
                    h = u, p = a, d = f, v = l, m = c;
                    for (i = 0; i <= 19; i++) g = t(h, 5) + (p & d | ~p & v) + m + o[i] + 1518500249 & 4294967295, m = v, v = d, d = t(p, 30), p = h, h = g;
                    for (i = 20; i <= 39; i++) g = t(h, 5) + (p ^ d ^ v) + m + o[i] + 1859775393 & 4294967295, m = v, v = d, d = t(p, 30), p = h, h = g;
                    for (i = 40; i <= 59; i++) g = t(h, 5) + (p & d | p & v | d & v) + m + o[i] + 2400959708 & 4294967295, m = v, v = d, d = t(p, 30), p = h, h = g;
                    for (i = 60; i <= 79; i++) g = t(h, 5) + (p ^ d ^ v) + m + o[i] + 3395469782 & 4294967295, m = v, v = d, d = t(p, 30), p = h, h = g;
                    u = u + h & 4294967295, a = a + p & 4294967295, f = f + d & 4294967295, l = l + v & 4294967295, c = c + m & 4294967295
                }
                return g = n(u) + n(a) + n(f) + n(l) + n(c), g.toLowerCase()
            }(function (e) {
                var t, n = !1;
                e || (t = window.CLIPBOARD = window.CLIPBOARD || {}, e = t.common = t.common || {}, n = !0), e.pad = function (e, t, n) {
                    if (!e.length || !t) return e;
                    var r = n - e.length,
                        i = "";
                    for (var s = 0; s < r; ++s) i += t;
                    return i + e
                }, e.guid = function (e) {
                    function t() {
                        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
                    }
                    var n = t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
                    return e && (n = n.replace(/-/g, "")), n
                }, e.randInt = function (e, t) {
                    return Math.floor(Math.random() * (t - e) + e)
                }, e.caseInsensitiveCompare = function (e, t) {
                    var n = e.toLowerCase(),
                        r = t.toLowerCase();
                    return n < r ? -1 : n > r ? 1 : 0
                }, e.isValidUsername = function (t) {
                    return t && t.match(/^[A-Za-z]\w{1,19}$/) && !(t.toLowerCase() in e.loginBlacklist)
                }, e.isValidEmail = function (e) {
                    return !e || e.length > 100 ? !1 : e.match(/^[a-z0-9.\-_+%]+@[a-z0-9-_+%]+\.[a-z0-9.\-_+%]+$/i)
                }, e.followKeyType = {
                    UNKNOWN: -1,
                    DOMAIN: "d",
                    HASHTAG: "h",
                    BOARD: "l",
                    USER: "u",
                    CATEGORY: "c"
                }, e.boardPermissions = {
                    OWNER: "owner",
                    ADMIN: "admin",
                    WRITER: "writer",
                    READER: "reader",
                    INVITED: "invited"
                }, e.boardVisibility = {
                    PRIVATE: "private",
                    MIXED: "mixed",
                    PUBLIC: "public"
                }, e.loginBlacklist = {
                    about: 1,
                    account: 1,
                    activate: 1,
                    activity: 1,
                    add: 1,
                    addons: 1,
                    admin: 1,
                    administrator: 1,
                    all: 1,
                    api: 1,
                    app: 1,
                    apps: 1,
                    archive: 1,
                    archives: 1,
                    avatar: 1,
                    avatarupload: 1,
                    auth: 1,
                    better: 1,
                    blob: 1,
                    blobloader: 1,
                    block: 1,
                    blog: 1,
                    board: 1,
                    boardinviteaccept: 1,
                    boards: 1,
                    cache: 1,
                    cancel: 1,
                    careers: 1,
                    cart: 1,
                    cat: 1,
                    cats: 1,
                    category: 1,
                    categories: 1,
                    changelog: 1,
                    checkout: 1,
                    chrome: 1,
                    chromeapp: 1,
                    chromeextversion: 1,
                    codereview: 1,
                    clip: 1,
                    clipper: 1,
                    clips: 1,
                    common: 1,
                    compare: 1,
                    config: 1,
                    configuration: 1,
                    connect: 1,
                    contact: 1,
                    create: 1,
                    css: 1,
                    "delete": 1,
                    direct_messages: 1,
                    documentation: 1,
                    download: 1,
                    downloads: 1,
                    edit: 1,
                    editor: 1,
                    email: 1,
                    emailverify: 1,
                    embed: 1,
                    employment: 1,
                    enterprise: 1,
                    error: 1,
                    extension: 1,
                    extensions: 1,
                    facebook: 1,
                    faq: 1,
                    favorites: 1,
                    feed: 1,
                    feedback: 1,
                    feeds: 1,
                    file: 1,
                    fileviewer: 1,
                    files: 1,
                    fleet: 1,
                    fleets: 1,
                    follow: 1,
                    followers: 1,
                    following: 1,
                    friend: 1,
                    friends: 1,
                    gist: 1,
                    group: 1,
                    groups: 1,
                    help: 1,
                    home: 1,
                    hosting: 1,
                    hostmaster: 1,
                    idea: 1,
                    ideas: 1,
                    index: 1,
                    info: 1,
                    invitations: 1,
                    invite: 1,
                    is: 1,
                    it: 1,
                    job: 1,
                    jobs: 1,
                    js: 1,
                    json: 1,
                    landing: 1,
                    lib: 1,
                    lists: 1,
                    login: 1,
                    logout: 1,
                    logoutredirect: 1,
                    log: 1,
                    logs: 1,
                    mail: 1,
                    manage: 1,
                    map: 1,
                    maps: 1,
                    mention: 1,
                    mentions: 1,
                    mine: 1,
                    mis: 1,
                    news: 1,
                    notification: 1,
                    notifications: 1,
                    oauth: 1,
                    oauth_clients: 1,
                    offers: 1,
                    openid: 1,
                    order: 1,
                    orders: 1,
                    organizations: 1,
                    pass: 1,
                    people: 1,
                    plans: 1,
                    popular: 1,
                    post: 1,
                    privacy: 1,
                    profile: 1,
                    projects: 1,
                    put: 1,
                    recruitment: 1,
                    redeem: 1,
                    register: 1,
                    remove: 1,
                    replies: 1,
                    root: 1,
                    rss: 1,
                    sales: 1,
                    save: 1,
                    search: 1,
                    security: 1,
                    session: 1,
                    sessions: 1,
                    settings: 1,
                    shared: 1,
                    site: 1,
                    sitemap: 1,
                    sitemaps: 1,
                    sites: 1,
                    shop: 1,
                    signup: 1,
                    sitemap: 1,
                    socialclipper: 1,
                    ssl: 1,
                    ssladmin: 1,
                    ssladministrator: 1,
                    sslwebmaster: 1,
                    start: 1,
                    "static": 1,
                    status: 1,
                    stories: 1,
                    styleguide: 1,
                    subscribe: 1,
                    subscriptions: 1,
                    support: 1,
                    sysadmin: 1,
                    sysadministrator: 1,
                    tag: 1,
                    tags: 1,
                    terms: 1,
                    token: 1,
                    tools: 1,
                    tour: 1,
                    translations: 1,
                    trends: 1,
                    twitter: 1,
                    twittr: 1,
                    unfollow: 1,
                    unsubscribe: 1,
                    update: 1,
                    url: 1,
                    user: 1,
                    users: 1,
                    utils: 1,
                    verifyemail: 1,
                    viewer: 1,
                    w3c: 1,
                    weather: 1,
                    welcome: 1,
                    widget: 1,
                    widgets: 1,
                    wiki: 1,
                    ww: 1,
                    www: 1,
                    wwww: 1,
                    xfn: 1,
                    xml: 1,
                    xmpp: 1,
                    yaml: 1,
                    yml: 1
                }, e.merge = function (e, t, n) {
                    if (!t) return e;
                    for (var r in t) {
                        if (!t.hasOwnProperty(r)) continue;
                        if (!n && e.hasOwnProperty(r)) continue;
                        e[r] = t[r]
                    }
                    return e
                }, e.createAvatarUrl = function (e, t, n) {
                    return n ? e.cdnUser + encodeURIComponent(n) + "_" + t : e.staticBaseUrl + "/images/missing-avatar.jpg"
                }, e.getBestThumbnailPath = function (t, n, r, i) {
                    var s = t.width || t.get("width"),
                        o = t.height || t.get("height"),
                        u = t.type || t.get("type");
                    u === "help" && (s = 165, o = 100);
                    var a = n / r,
                        f = s / o,
                        l = Math.max(s, o),
                        c = Math.ceil(e.logBase(l, 2)),
                        h, p, d, v, m, g, y = 1.5;
                    switch (i) {
                    case "width":
                        var b = n,
                            w = n / f;
                        g = w > r, p = Math.max(8, Math.min(c, Math.ceil(e.logBase(Math.max(b, w), 2))));
                        var E = s / Math.pow(2, c - p),
                            S = o / Math.pow(2, c - p);
                        d = n / E, d > y && (p = Math.min(c, p + 1), E *= 2, S *= 2, d = n / E), v = E, m = S;
                        var x = f < 1 / 7,
                            T = f < 1 / 3;
                        x && r <= E * d * 7 && (h = 7), T && r <= E * d * 3 && (h = 3), h && (m = E * h);
                        break;
                    case "height":
                        var b = r * f,
                            w = r;
                        g = b > n, p = Math.max(8, Math.min(c, Math.ceil(e.logBase(Math.max(b, w), 2))));
                        var E = s / Math.pow(2, c - p),
                            S = o / Math.pow(2, c - p);
                        d = r / S, d > y && (p = Math.min(c, p + 1), E *= 2, S *= 2, d = r / S), v = E, m = S;
                        var x = f > 7,
                            T = f > 3;
                        x && n <= S * d * 7 && (h = 7), T && n <= S * d * 3 && (h = 3), h && (v = S * h);
                        break;
                    default:
                        var l = Math.max(s, o),
                            c = Math.ceil(e.logBase(l, 2)),
                            N = Math.max(n, r),
                            C = Math.ceil(e.logBase(N, 2)),
                            k = l / Math.pow(2, c - C),
                            p = Math.max(8, C);
                        return N / k > 1.15 && (p = Math.min(p + 1, c)), {
                            path: e.getThumbnailPathForLevel(t, p)
                        }
                    }
                    return h && (p += "_mar" + h), {
                        path: e.getThumbnailPathForLevel(t, p),
                        width: v,
                        height: m,
                        cropLevel: h,
                        wasCropped: g,
                        viewportScaleFactor: d
                    }
                }, e.getMaxThumbnailLevel = function (t, n) {
                    var r = Math.max(t, n);
                    return Math.ceil(e.logBase(r, 2))
                }, e.getThumbnailId = function (e) {
                    var t = e.thumbnailId || e.get && e.get("thumbnailId");
                    return t ? t : e.blob || e.get && e.get("blob")
                }, e.getThumbnailPathForLevel = function (t, n) {
                    var r = e.getThumbnailId(t);
                    return r ? r + "_" + n : null
                }, e.logBase = function (e, t) {
                    return Math.log(e) / Math.log(t)
                }, e.inviteTypes = {
                    Facebook: "Facebook",
                    Twitter: "Twitter",
                    Linkedin: "Linkedin",
                    Email: "Email"
                }, e.arrayRemove = function (e, t, n) {
                    var r = e.slice((n || t) + 1 || e.length);
                    e.length = t < 0 ? e.length + t : t, e.push.apply(e, r)
                }, e.arrayRemoveByVal = function (e) {
                    for (var t = 1; t < arguments.length; ++t) {
                        var n;
                        while ((n = e.indexOf(arguments[t])) >= 0) e.splice(n, 1)
                    }
                }, e.arrayInsertIfUnique = function (e) {
                    for (var t = 1; t < arguments.length; ++t) e.indexOf(arguments[t]) < 0 && e.push(arguments[t])
                }, e.validateInt = function (e, t, n, r) {
                    var i = parseInt(e);
                    return isFinite(i) ? n == null && r == null ? i : (n == null && (n = -Infinity), r == null && (r = Infinity), Math.max(n, Math.min(r, i))) : t
                }, e.validateBoolean = function (e, t) {
                    var n = typeof e;
                    if (n === "boolean") return e;
                    if (n === "number") return e !== 0;
                    if (n === "string") {
                        var r = e.toLowerCase();
                        return r === "true" ? !0 : r === "false" ? !1 : t
                    }
                    return t
                }, e.trim = function (e) {
                    return e ? e.replace(/^\s+|\s+$/g, "") : ""
                }, e.htmlEncode = function () {
                    var e;
                    return n || (e = (new require("node-html-encoder")).Encoder("entity")),
                    function (t) {
                        return n ? $("<div/>").text(t ? t : "").html() : e.htmlEncode(t)
                    }
                }(), e.linkify = function (t, n) {
                    function a(e) {
                        for (var t = 0; t < r.length; ++t) if (e.start < r[t].start + r[t].len && e.start + e.len > r[t].start) return;
                        r.push(e)
                    }
                    t = e.htmlEncode(t);
                    var r = [],
                        o, u;
                    while (o = i.exec(t)) u = o[1] ? o[0] : "http://" + o[0], a({
                            start: o.index,
                            len: o[0].length,
                            text: '<a rel="nofollow" target="_blank" href="' + u + '">' + o[0] + "</a>"
                        });
                    while (o = s.exec(t)) {
                        var f, l = o[1];
                        if (l[0] == "#") u = n.getTagUrl(l.substring(1)), f = 'class="clipTag"';
                        else {
                            if (l[0] != "@") continue;
                            u = n.getUserUrl(o[1].substring(1)), f = 'class="mention"'
                        }
                        a({
                            start: o.index + o[0].indexOf(o[1]),
                            len: l.length,
                            text: '<a href="' + u + '" ' + f + ">" + l + "</a>"
                        })
                    }
                    r.sort(function (e, t) {
                        return t.start - e.start
                    });
                    for (var c = 0; c < r.length; ++c) o = r[c], t = t.substr(0, o.start) + o.text + t.substr(o.start + o.len);
                    return t
                }, e.formatTime = function (t, n) {
                    n = n || new Date;
                    var r = (n.getTime() - t.getTime()) / 1e3;
                    if (r < 60) return "1 minute ago";
                    var i = Math.floor(r / 60);
                    if (i < 60) return i + (i > 1 ? " minutes" : " minute") + " ago";
                    var s = Math.floor(r / 3600);
                    if (s < 24) return s + (s > 1 ? " hours" : " hour") + " ago";
                    if (s < 48) return "Yesterday";
                    var o = Math.floor(r / 86400);
                    if (o < 7) return o + " days ago";
                    if (o < 14) return "Last week";
                    var u = Math.floor(o / 7);
                    if (u <= 4) return u + " weeks ago";
                    var a = e.months[t.getMonth()],
                        f = t.getFullYear(),
                        l = a + " " + t.getDate() + (f != n.getFullYear() ? ", " + f : "");
                    s = t.getHours(), i = e.pad(t.getMinutes().toString(), "0", 2);
                    var c = "am";
                    s > 12 && (s -= 12, c = "pm");
                    var h = s + ":" + i + c;
                    return l + " at " + h
                }, e.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], e.abbrMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], e.formatFileSize = function (e, t) {
                    if (!e || e === 1) return "0MB";
                    var n = -1,
                        r = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
                    do e /= 1024, n++; while (e > 1024);
                    var i = 1;
                    return t === 0 ? i = 0 : t && (i = t), Math.max(e, .1).toFixed(i) + r[n]
                }, e.getBrowser = function (e) {
                    var t = {
                        mac: e.indexOf("Mac OS") !== -1,
                        windows: e.indexOf("Windows") !== -1,
                        linux: e.indexOf("Linux") !== -1,
                        chrome: e.indexOf("Chrome") !== -1,
                        opera: e.indexOf("Opera") !== -1,
                        ie: e.indexOf("MSIE") !== -1,
                        firefox: e.indexOf("Firefox") !== -1,
                        safari: e.indexOf("Safari") !== -1,
                        isIe8: !1,
                        isIe9: !1,
                        version: !1
                    };
                    if (t.ie) t.version = (/MSIE ([\d+\.]+)/.exec(e) || [])[1] || !1, t.isIe8 = /^8/.test(t.version), t.isIe9 = /^9/.test(t.version);
                    else if (t.firefox) t.version = (/Firefox\/([\d\.]+)/.exec(e) || [])[1] || !1;
                    else if (t.chrome) t.version = (/Chrome\/([\d\.]+)/.exec(e) || [])[1] || !1;
                    else if (t.safari || t.opera) t.version = (/Version\/([\d\.]+)/.exec(e) || [])[1] || !1;
                    return t
                }, e.mimeTypeToFileName = function (e, t) {
                    var n = t ? "_square" : "";
                    e = (e || "").toLowerCase();
                    switch (e) {
                    case "application/vnd.ms-excel":
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        return "excelfileicon" + n + ".png";
                    case "application/x-iwork-pages-sffpages":
                        return "pagesfileicon" + n + ".png";
                    case "application/pdf":
                        return "pdffileicon" + n + ".png";
                    case "application/vnd.ms-powerpoint":
                    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                        return "pptfileicon" + n + ".png";
                    case "application/msword":
                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        return "wordfileicon" + n + ".png";
                    case "application/zip":
                    case "application/x-rar-compressed":
                        return "zipfileicon" + n + ".png";
                    case "image/vnd.adobe.photoshop":
                        return "psdfileicon" + n + ".png";
                    default:
                        return /^image\//i.test(e) ? "imagefileicon" + n + ".png" : /^video\//i.test(e) ? "videofileicon" + n + ".png" : "genericfileicon" + n + ".png"
                    }
                }, e.mimeTypeSupportedByGoogleViewer = function (e) {
                    var t = {
                        "video/webm": !0,
                        "video/quicktime": !0,
                        "video-x-ms-wmv": !0,
                        "video/x-flv": !0,
                        "text/plain": !0,
                        "text/css": !0,
                        "text/html": !0,
                        "text/x-c": !0,
                        "application/javascript": !0,
                        "application/msword": !0,
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": !0,
                        "application/vnd.ms-excel": !0,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": !0,
                        "application/vnd.ms-powerpoint": !0,
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation": !0,
                        "application/pdf": !0,
                        "application/x-iwork-pages-sffpages": !0,
                        "application/postscript": !0,
                        "image/vnd.adobe.photoshop": !0,
                        "image/vnd.dxf": !0,
                        "image/svg+xml": !0,
                        "application/x-font-ttf": !0,
                        "application/vnd.ms-xpsdocument": !0,
                        "application/zip": !0,
                        "application/x-rar-compressed": !0
                    };
                    return t[e] != null
                };
                var r = e.ExportStatus = {
                    none: "none",
                    in_progress: "in_progress",
                    failed: "failed",
                    succeeded: "succeeded"
                }, i = /\b(?:(https?:\/\/)|(?:www\.))(?:[-\w+&@#/%=~_|$?!:,.]+\.)+[\w?&@#/%=~_|$-]*/gi,
                    s = /(?:[^\w@#]|^)((?:#\w+)(?=(?:[^\w@#]|$))|(?:@\w+)(?=(?:[^\w@#\/]|$)))/gi
            })(typeof process == "undefined" || !process.versions ? null : exports),
            function (e) {
                var t;
                e || (t = window.CLIPBOARD = window.CLIPBOARD || {}, t.common = t.common || {}, e = t.common.blobSanitization = {});
                var n = e.tagCloseType = {
                    normal: 1,
                    selfClosing: 2
                };
                e.unsafeTags = {
                    base: n.selfClosing,
                    basefont: n.selfClosing,
                    body: n.normal,
                    form: n.normal,
                    frame: n.normal,
                    frameset: n.normal,
                    head: n.normal,
                    html: n.normal,
                    isindex: n.normal,
                    link: n.selfClosing,
                    meta: n.selfClosing,
                    script: n.normal,
                    title: n.normal
                }, e.unsafeAttributes = {
                    id: 1,
                    hidden: 1
                }
            }(typeof process == "undefined" || !process.versions ? null : exports),
            function (e) {
                function r(e) {
                    for (var t = 0; t < n.length; t++) e = e.replace(n[t].letters, n[t].base);
                    return e
                }
                var t;
                e || (t = window.CLIPBOARD = window.CLIPBOARD || {}, e = t.slug = t.slug || {}), e.sanitize = function (t) {
                    return e.create(t)
                }, e.create = function (e) {
                    e = e || "";
                    var t = "-",
                        n = r(e.replace(/^\s+|\s+$/g, "")).replace("'", "").replace(/\W/g, t).replace(new RegExp(t + "{2,}", "g"), t).toLowerCase();
                    return n.charAt(0) === "-" && (n = n.substring(1)), n.charAt(n.length - 1) === "-" && (n = n.substring(0, n.length - 1)), n
                };
                var n = [{
                        base: "A",
                        letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
                    }, {
                        base: "AA",
                        letters: /[\uA732]/g
                    }, {
                        base: "AE",
                        letters: /[\u00C6\u01FC\u01E2]/g
                    }, {
                        base: "AO",
                        letters: /[\uA734]/g
                    }, {
                        base: "AU",
                        letters: /[\uA736]/g
                    }, {
                        base: "AV",
                        letters: /[\uA738\uA73A]/g
                    }, {
                        base: "AY",
                        letters: /[\uA73C]/g
                    }, {
                        base: "B",
                        letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
                    }, {
                        base: "C",
                        letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
                    }, {
                        base: "D",
                        letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
                    }, {
                        base: "DZ",
                        letters: /[\u01F1\u01C4]/g
                    }, {
                        base: "Dz",
                        letters: /[\u01F2\u01C5]/g
                    }, {
                        base: "E",
                        letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
                    }, {
                        base: "F",
                        letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
                    }, {
                        base: "G",
                        letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
                    }, {
                        base: "H",
                        letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
                    }, {
                        base: "I",
                        letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
                    }, {
                        base: "J",
                        letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
                    }, {
                        base: "K",
                        letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
                    }, {
                        base: "L",
                        letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
                    }, {
                        base: "LJ",
                        letters: /[\u01C7]/g
                    }, {
                        base: "Lj",
                        letters: /[\u01C8]/g
                    }, {
                        base: "M",
                        letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
                    }, {
                        base: "N",
                        letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
                    }, {
                        base: "NJ",
                        letters: /[\u01CA]/g
                    }, {
                        base: "Nj",
                        letters: /[\u01CB]/g
                    }, {
                        base: "O",
                        letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
                    }, {
                        base: "OI",
                        letters: /[\u01A2]/g
                    }, {
                        base: "OO",
                        letters: /[\uA74E]/g
                    }, {
                        base: "OU",
                        letters: /[\u0222]/g
                    }, {
                        base: "P",
                        letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
                    }, {
                        base: "Q",
                        letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
                    }, {
                        base: "R",
                        letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
                    }, {
                        base: "S",
                        letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
                    }, {
                        base: "T",
                        letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
                    }, {
                        base: "TZ",
                        letters: /[\uA728]/g
                    }, {
                        base: "U",
                        letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
                    }, {
                        base: "V",
                        letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
                    }, {
                        base: "VY",
                        letters: /[\uA760]/g
                    }, {
                        base: "W",
                        letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
                    }, {
                        base: "X",
                        letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
                    }, {
                        base: "Y",
                        letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
                    }, {
                        base: "Z",
                        letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
                    }, {
                        base: "a",
                        letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
                    }, {
                        base: "aa",
                        letters: /[\uA733]/g
                    }, {
                        base: "ae",
                        letters: /[\u00E6\u01FD\u01E3]/g
                    }, {
                        base: "ao",
                        letters: /[\uA735]/g
                    }, {
                        base: "au",
                        letters: /[\uA737]/g
                    }, {
                        base: "av",
                        letters: /[\uA739\uA73B]/g
                    }, {
                        base: "ay",
                        letters: /[\uA73D]/g
                    }, {
                        base: "b",
                        letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
                    }, {
                        base: "c",
                        letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
                    }, {
                        base: "d",
                        letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
                    }, {
                        base: "dz",
                        letters: /[\u01F3\u01C6]/g
                    }, {
                        base: "e",
                        letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
                    }, {
                        base: "f",
                        letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
                    }, {
                        base: "g",
                        letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
                    }, {
                        base: "h",
                        letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
                    }, {
                        base: "hv",
                        letters: /[\u0195]/g
                    }, {
                        base: "i",
                        letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
                    }, {
                        base: "j",
                        letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
                    }, {
                        base: "k",
                        letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
                    }, {
                        base: "l",
                        letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
                    }, {
                        base: "lj",
                        letters: /[\u01C9]/g
                    }, {
                        base: "m",
                        letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
                    }, {
                        base: "n",
                        letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
                    }, {
                        base: "nj",
                        letters: /[\u01CC]/g
                    }, {
                        base: "o",
                        letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
                    }, {
                        base: "oi",
                        letters: /[\u01A3]/g
                    }, {
                        base: "ou",
                        letters: /[\u0223]/g
                    }, {
                        base: "oo",
                        letters: /[\uA74F]/g
                    }, {
                        base: "p",
                        letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
                    }, {
                        base: "q",
                        letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
                    }, {
                        base: "r",
                        letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
                    }, {
                        base: "s",
                        letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
                    }, {
                        base: "t",
                        letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
                    }, {
                        base: "tz",
                        letters: /[\uA729]/g
                    }, {
                        base: "u",
                        letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
                    }, {
                        base: "v",
                        letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
                    }, {
                        base: "vy",
                        letters: /[\uA761]/g
                    }, {
                        base: "w",
                        letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
                    }, {
                        base: "x",
                        letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
                    }, {
                        base: "y",
                        letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
                    }, {
                        base: "z",
                        letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
                    }
                ]
            }(typeof process == "undefined" || !process.versions ? null : exports),
            function (e, t, n) {
                function u(e, t) {
                    var r = n("<" + e + "/>");
                    return r.applyBlockStyles && (t === "block" ? r.applyBlockStyles() : r.applyInlineStyles()), r
                }
                var r = e.CLIPBOARD,
                    i = r.common = r.common || {};
                r.autocomplete = {};
                var s = null,
                    o = "autocomplete-me-value";
                r.autocomplete.setData = function (e) {
                    function t(e) {
                        return u("li", "block").data(o, e).text(e)
                    }
                    function a(e) {
                        return u("li", "block").addClass("autocomplete_board_314159265").data(o, e).append(u("i", "inline").addClass("clpbrd-image-shared-board-icon-dark")).append(u("div", "block").text(e))
                    }
                    function f(e) {
                        var t = i.createAvatarUrl(r.config, "s", e.login);
                        return function () {
                            return u("li", "block").addClass("autocomplete_user_314159265").data(o, "@" + e.login).append(u("img", "inline").attr({
                                src: t
                            }).showPlaceholderOnError()).append(u("div", "block").append("@" + e.login, u("span", "inline").addClass("autocomplete_userRealName_314159265").text(e.name || "")))
                        }
                    }
                    function l(e) {
                        var t = n.map(e.split(""), function (e) {
                            return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
                        });
                        return new RegExp("^" + t.join("[\\w\\s]*?"), "i")
                    }
                    function c(e) {
                        return function (t) {
                            if (t.charAt(0) !== "#") return 0;
                            if (t === "#") return 100;
                            var n = l(t.substring(1)).exec(e);
                            return n ? 100 - n[0].length : 0
                        }
                    }
                    function h(e) {
                        return function (t) {
                            if (t.charAt(0) !== "@") return 0;
                            var n = l(t.substring(1)).exec(e);
                            return n ? 100 - n[0].length : 0
                        }
                    }
                    function p(e) {
                        return function (t) {
                            function r(e, r) {
                                var i = n.exec(e),
                                    s = 0;
                                return i && (s = r - i[0].length, i[0].toLowerCase() === t && (s += 1e4)), s
                            }
                            if (t.charAt(0) !== "@") return 0;
                            t = t.substring(1).toLowerCase();
                            var n = l(t),
                                i = r(e.login, 1e3);
                            if (e.name) {
                                var s = e.name.split(" "),
                                    o = s[0],
                                    u = s.length > 1 ? s[s.length - 1] : "";
                                i += r(o, 100), u && (i += r(u, 50))
                            }
                            return i
                        }
                    }
                    s = {
                        items: []
                    };
                    for (var d in e.tags) {
                        if (!e.tags.hasOwnProperty(d)) continue;
                        s.items.push({
                            name: "#" + e.tags[d],
                            matches: c(d),
                            render: t,
                            type: "tag"
                        })
                    }
                    for (var v in e.boards) {
                        if (!e.boards.hasOwnProperty(v)) continue;
                        s.items.push({
                            name: "@" + e.boards[v],
                            matches: h(v),
                            render: a,
                            type: "board"
                        })
                    }
                    for (var m in e.users) {
                        if (!e.users.hasOwnProperty(m)) continue;
                        var g = e.users[m];
                        s.items.push({
                            name: "@" + g.login,
                            matches: p(g),
                            render: f(g),
                            type: "user"
                        })
                    }
                }, n.fn.autocompletify = function (e) {
                    e = e || {};
                    var t = e.fields || {
                        tag: 1,
                        board: 1,
                        user: 1
                    };
                    return delete e.fields, e = n.extend({}, {
                        trigger: "[#@\\w]",
                        maxResults: 8
                    }, e), this.autocompleteMe(function () {
                        if (!s) return {
                                items: []
                        };
                        var e = s.items,
                            n = [];
                        for (var r = 0, i = e.length; r < i; r++) e[r].type in t && n.push(e[r]);
                        return {
                            items: n
                        }
                    }, e)
                }
            }(window, document, jQuery),
            function (e, t, n) {
                function l() {
                    function e() {
                        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
                    }
                    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
                }
                function c(e, t, r) {
                    var i = t.createElement;
                    return r = r || "body", o = i("div").addClass(a + "wrapper" + t.classSuffix).data("target", e.attr("id")).append(i("ul")).hide().appendTo(r).on("mouseover", "li", function () {
                        n(this).addClass(a + "selected" + t.classSuffix).siblings().removeClass(a + "selected" + t.classSuffix)
                    }).on("click", "li", function () {
                        var n = E(e);
                        n == "insert" && t.clickCommit && t.clickCommit()
                    }), t.setCss(o, "position", t.fixed ? "fixed" : "absolute"), o
                }
                function h(e, t) {
                    return i[e.attr("id")][t]
                }
                function p(e, t, n) {
                    i[e.attr("id")][t] = n
                }
                function d(e) {
                    var t = e.val().substring(0, e.caret().end),
                        n = h(e, "options").trigger,
                        r = h(e, "options").matcher,
                        i = ((new RegExp(n + r + "*$")).exec(t) || [])[0];
                    return i || ""
                }
                function v(e) {
                    var t = e.val();
                    return t || ""
                }
                function m() {
                    return o && o.is(":visible")
                }
                function g(t, s, o) {
                    function f(e) {
                        for (var t in r) if (r.hasOwnProperty(t) && e === r[t]) return !0;
                        return !1
                    }
                    function c(e) {
                        e.preventDefault(), e.stopImmediatePropagation()
                    }
                    function g(e) {
                        return !e.ctrlKey && !e.altKey && e.shiftKey
                    }
                    function L() {
                        p(t, "shouldHide", !0);
                        var n = e.setTimeout(function () {
                            h(t, "shouldHide") && T(t), p(t, "shouldHide", !0)
                        }, 250);
                        p(t, "timeoutId", n)
                    }
                    function A(e, t) {
                        var n = h(e, "data"),
                            r = e.val();
                        typeof n == "function" && (n = n(), p(e, "data", n));
                        var i = n && n.hoverItems && n.hoverItems.length,
                            s = n && n.alternates && n.alternates.length;
                        return t || i && !r || s && r
                    }
                    function O() {
                        h(t, "shouldHide") && p(t, "shouldHide", !1);
                        var e = d(t),
                            n = v(t);
                        if (!A(t, e)) return;
                        x(t, e, 0, n)
                    }
                    var C = t.attr("id");
                    C || (C = a + l(), t.attr("id", C)), i[C] = {
                        options: o,
                        data: s,
                        attach: o.attach || t,
                        anchor: o.anchor || "body",
                        hover: o.hover || null,
                        query: "",
                        shouldHide: !0,
                        hasFocus: !1,
                        timeoutId: null
                    };
                    var k = o.scrollContainer || e;
                    t.on("keyup." + u, function (e) {
                        if (g(e)) return;
                        var n = e.which;
                        if (f(n)) {
                            if (!m()) return;
                            if (n === r.ENTER || n === r.TAB) {
                                var i = n === r.ENTER && o.enterCommits,
                                    s = E(t);
                                (s == "insert" && !i || s == "action") && c(e);
                                return
                            }
                            c(e);
                            if (n === r.ESC) {
                                T(t);
                                return
                            }
                            if (n === r.UP || n === r.DOWN) return
                        }
                        o.allowPropagation || e.stopPropagation();
                        var u = d(t),
                            a = h(t, "data"),
                            l = v(t);
                        if (!u && !(a.alternates && a.alternates.length && l)) {
                            T(t);
                            return
                        }
                        x(t, u, 0, l)
                    }), t.on("keydown." + u, function (e) {
                        if (!m()) return;
                        var n = e.keyCode;
                        if (n === r.UP || n === r.DOWN) {
                            var i = y(t),
                                s = w(t).length;
                            if (s === 0) return;
                            if (i === null) {
                                S(t, n === r.UP ? s - 1 : 0);
                                return
                            }
                            var o = i + (n === r.UP ? -1 : 1);
                            o = (o + s) % s, S(t, o)
                        }
                    }), t.on("keydown." + u + " keypress." + u, function (e) {
                        var n = e.which || e.keyCode;
                        if (m() && !g(e) && f(n)) {
                            if (n === r.ENTER && !b(t).length && !h(t, "options").autocompleteIfUnselected) return;
                            if (n === r.ENTER && o.enterCommits) return;
                            c(e)
                        }
                    }), t.on("blur." + u, function () {
                        p(t, "hasFocus", !1), L()
                    }), t.on("focus." + u, function () {
                        p(t, "hasFocus", !0), O()
                    });
                    var M = 0;
                    o.hover && n(o.hover).on("mouseenter." + u, function () {
                        M = e.setTimeout(function () {
                            O(), M = 0
                        }, o.appearDelay)
                    }).on("mouseleave." + u, function () {
                        M ? (e.clearTimeout(M), M = 0) : h(t, "hasFocus") || L()
                    }), n(e).on("resize." + u + C, function () {
                        if (!m()) return;
                        N(t)
                    }), n(k).on("scroll." + u + C, function () {
                        if (!m()) return;
                        N(t)
                    })
                }
                function y(e) {
                    var t = h(e, "options").classSuffix,
                        r = null;
                    return w(e).each(function (e, i) {
                        if (n(i).hasClass(a + "selected" + t)) return r = e, !1
                    }), r
                }
                function b(e) {
                    var t = h(e, "options").classSuffix,
                        n = h(e, "options").autocompleteIfUnselected,
                        r = w(e).filter("li." + a + "selected" + t);
                    return !r.length && n ? o.hasClass(a + "inverted") ? w(e).last() : w(e).first() : r
                }
                function w(e) {
                    return o && o.data("target") === e.attr("id") ? o.find("li") : []
                }
                function E(e) {
                    var t = !1;
                    if (!m()) return !1;
                    var n = b(e);
                    if (!n.length) return !1;
                    var r = h(e, "query"),
                        i = e.val(),
                        s = e.caret(),
                        o = n.data(a + "value"),
                        u = s.start - r.length,
                        f = i.substring(0, u) + o + " " + i.substring(s.start),
                        l = n.data("action"),
                        c = h(e, "actions");
                    if (l && c && l in c) c[l](f, r, i), t = "action";
                    else {
                        e.val(f);
                        var p = u + o.length + 1;
                        e.caret(p, p), t = "insert"
                    }
                    return T(e), t
                }
                function S(e, t) {
                    var n = w(e);
                    if (!m() || n.length <= 0 || t >= n.length) return;
                    var r = h(e, "options").classSuffix;
                    n.removeClass(a + "selected" + r), n.eq(t).addClass(a + "selected" + r)
                }
                function x(r, i, u, a) {
                    u || (u = h(r, "options").maxResults);
                    var d = h(r, "data");
                    typeof d == "function" && (d = d(), p(r, "data", d));
                    if (!d) return;
                    d.filter || C(d, h(r, "options").sort);
                    var v = [],
                        g = d.alternates;
                    i && (v = d.filter(i, u));
                    if (!v.length) {
                        var y = d.hoverItems && d.hoverItems.length;
                        if (y && !r.val()) v = d.hoverItems;
                        else if (!(a && g && g.length)) {
                            T(r);
                            return
                        }
                    }
                    var b = h(r, "anchor");
                    o || c(r, h(r, "options"), b);
                    var w = o.find("ul"),
                        E = h(r, "attach"),
                        x = E.offset(),
                        k = x.top - n(t).scrollTop() + E.outerHeight() + s;
                    m() || (k >= n(e).height() ? !o.hasClass(f) && x.top - n(t).scrollTop() > s && o.addClass(f) : o.removeClass(f)), w.empty();
                    var L = o.hasClass(f),
                        A = {}, O, M, _;
                    if (a && g && g.length) for (O = 0, M; O < g.length; O++) {
                            M = L ? g.length - 1 - O : O, _ = n(g[M].render(a));
                            if (g[M].action) {
                                var D = l();
                                _.data("action", D), A[D] = g[M].action
                            }
                            w.append(_)
                    }
                    for (O = 0, M; O < v.length; O++) {
                        M = L ? v.length - 1 - O : O;
                        if (!v[M] || !v[M].name) continue;
                        _ = n(v[M].render(v[M].name, i));
                        if (v[M].action) {
                            var D = l();
                            _.data("action", D), A[D] = v[M].action
                        }
                        w.append(_)
                    }
                    p(r, "actions", A), p(r, "query", i), N(r), a && h(r, "options").autoSelect && S(r, L ? v.length - 1 : 0)
                }
                function T(e) {
                    o && o.remove(), o = null
                }
                function N(e) {
                    if (w(e).length === 0) return;
                    var r = h(e, "attach"),
                        i = h(e, "anchor"),
                        s = h(e, "options"),
                        u = r.offset();
                    s.fixed && (u.top -= n(t).scrollTop(), u.left -= n(t).scrollLeft()), o || c(e, h(e, "options"), i);
                    var a;
                    m() ? a = o.outerHeight() : (o.css("visibility", "hidden").show(), a = o.outerHeight(), o.hide().css("visibility", "visible")), s.setCss(o, "left", u.left), s.setCss(o, "top", u.top + (o.hasClass(f) ? -a : r.outerHeight())), s.setCss(o, "width", r.outerWidth()), s.fadeMS ? o.fadeIn(s.fadeMS) : o.show()
                }
                function C(e, t) {
                    e.filter = function (n, r) {
                        var i = {}, s = {}, o = 0;
                        for (var u = 0, a; u < e.items.length; u++) {
                            a = e.items[u];
                            var f = a.matches(n),
                                l = a.type ? a.type : "undefined";
                            f && (l in i || (i[l] = [], s[l] = 0, o++), i[l].push({
                                name: a.name,
                                render: a.render,
                                action: a.action,
                                score: f
                            }))
                        }
                        if (t) for (l in i) {
                                if (!i.hasOwnProperty(l)) continue;
                                i[l].sort(function (e, t) {
                                    if (e.score === t.score) {
                                        var n = e.name.toLowerCase(),
                                            r = t.name.toLowerCase();
                                        return n === r ? 0 : n < r ? -1 : 1
                                    }
                                    return e.score > t.score ? -1 : 1
                                })
                        }
                        while (r) {
                            var c = r,
                                h = Math.max(Math.floor(r / o), 1);
                            for (l in i) {
                                if (!i.hasOwnProperty(l)) continue;
                                var p = i[l].length - s[l];
                                p = Math.min(p, h), s[l] += p, r -= p;
                                if (!r) break
                            }
                            if (c == r) break
                        }
                        var d = [];
                        for (l in i) d = d.concat(i[l].slice(0, s[l]));
                        return d
                    }
                }
                var r = {
                    TAB: 9,
                    ENTER: 13,
                    ESC: 27,
                    UP: 38,
                    DOWN: 40
                }, i = {}, s = 360,
                    o, u = "autocomplete-me",
                    a = u + "-",
                    f = a + "inverted";
                n.fn.autocompleteMe = function () {
                    var t = {
                        classSuffix: "",
                        maxResults: 10,
                        allowPropagation: !1,
                        fadeMS: 0,
                        autocompleteIfUnselected: !0,
                        autoSelect: !1,
                        attach: null,
                        anchor: "body",
                        hover: null,
                        trigger: "\\w",
                        matcher: "[^\\s]",
                        fixed: !1,
                        clickCommit: null,
                        enterCommits: !1,
                        appearDelay: 0,
                        setCss: function (e, t, n) {
                            e.css(t, n)
                        },
                        createElement: function (e) {
                            return n("<" + e + "/>")
                        }
                    };
                    return function (r, s) {
                        if (typeof r == "string") {
                            var o = this.attr("id"),
                                a = i[o];
                            if (!a) return this;
                            switch (r) {
                            case "destroy":
                                var f = a.timeoutId;
                                f && e.clearTimeout(f), T(n(this)), i[o] = null, this.off("." + u), n(e).off("." + u + o);
                                break;
                            case "hide":
                                T(n(this))
                            }
                            return this
                        }
                        return s = n.extend(!0, {}, t, s), this.filter("input,textarea").each(function () {
                            g(n(this), r, s)
                        }), this
                    }
                }()
            }(window, document, jQuery),
            function (e, t) {
                t.fn.showPlaceholderOnError = function (n) {
                    var r = e.CLIPBOARD,
                        i = r.common,
                        s = i.createAvatarUrl(r.config, n);
                    return t(this).error(function () {
                        if (t(this).attr("src") === s) return;
                        t(this).attr("src", s)
                    }), this
                }
            }(window, jQuery),
            function (e, t) {
                function n(e) {
                    return e >= 46 && e <= 90 || e >= 96 && e <= 111 || e >= 186 && e <= 222
                }
                t.fn.placeholder = function (e, r) {
                    return this.each(function () {
                        var i = t(this),
                            s = i.attr("placeholder");
                        if (!s) return;
                        i.removeAttr("placeholder");
                        var o = i.attr("id") || i.attr("name");
                        o || (o = "input_" + Math.round(Math.random() * 1e5), i.attr("id", o));
                        var u = i.position(),
                            a = e ? "cssImportant" : "css",
                            f = t("<label/>");
                        e && f.applyInlineStyles(), f[a](t.extend({
                            position: "absolute",
                            left: u.left + parseInt(i.css("padding-left")) + 4,
                            top: u.top + parseInt(i.css("padding-top")) + 1,
                            "font-size": i.css("font-size"),
                            "font-family": i.css("font-family"),
                            "line-height": i.css("line-height"),
                            color: i.css("color")
                        }, r || {})).attr({
                            "for": o,
                            tabindex: -1
                        }).text(s), t.support.opacity ? f[a]("opacity", .5) : f[a]("color", "#999999"), i.val() && f.hide(), f.insertAfter(i), i.keydown(function (e) {
                            n(e.which) && f.hide()
                        }).keyup(function () {
                            f[i.val() === "" ? "show" : "hide"]()
                        }).focus(function () {
                            i.val() !== "" && f.hide()
                        })
                    }), this
                }
            }(window, jQuery),
            function (e, t, n) {
                function s(e) {
                    return "visibilityPicker_" + (e ? e + "_" : "") + "clipboard_314159265"
                }
                function o(e, t) {
                    this.$container = e.addClass(s()), this.options = t, this.value = this.options.value, this.$button = null, this.$title = null, this.$flyout = null, this.build()
                }
                var r = "visibilityPicker",
                    i = {
                        createElement: function (e, t) {
                            return n("<" + e + "/>")
                        },
                        value: "private",
                        values: ["private", "public", "mixed"],
                        onChange: function () {},
                        labels: {
                            "private": "Private",
                            "public": "Public",
                            mixed: "Mixed"
                        },
                        tooltips: {
                            "private": "Clips are viewable only by those who have the clip shared with them",
                            "public": "Clips are viewable by everyone",
                            mixed: 'Clips are viewable based on their individual "published" status'
                        }
                    };
                o.prototype = {
                    show: function () {
                        this.$flyout && this.$flyout.show()
                    },
                    hide: function () {
                        this.$flyout && this.$flyout.hide()
                    },
                    build: function () {
                        function i(e) {
                            return function () {
                                n.fn.tooltip && n(this).tooltip("hide"), t.select(e)
                            }
                        }
                        var e = this.options.createElement,
                            t = this;
                        this.$button = e("div", "block").addClass(s("button")).click(function () {
                            t.$flyout.toggle()
                        }), this.$title = e("span", "inline").addClass(s("title")).text(this.options.value).appendTo(this.$button), e("span", "inline").addClass(s("caret")).appendTo(this.$button), this.$flyout = e("div", "block").addClass(s("flyout"));
                        var r = e("ul", "list").addClass(s("list")).appendTo(this.$flyout),
                            o = e("li", "list-item"),
                            u = ["private", "public", "mixed"];
                        for (var a = 0; a < u.length; a++) o.clone().attr({
                                title: this.options.tooltips[u[a]],
                                rel: "tooltip"
                            }).text(this.options.labels[u[a]]).click(i(u[a])).appendTo(r);
                        this.$container.append(this.$button, this.$flyout), this.select(this.options.value), n.fn.tooltip && this.$container.find('[rel="tooltip"]').tooltip({
                            placement: "left"
                        })
                    },
                    select: function (e) {
                        var t = this.value;
                        this.value = e, this.$title.text(this.options.labels[e]), this.$flyout.hide(), t !== this.value && this.options.onChange(this.value, t)
                    },
                    getValue: function () {
                        return this.value
                    },
                    destroy: function () {
                        this.$container.removeClass(s()).data(r, null), this.$button && this.$button.remove() && (this.$button = null), this.$flyout && this.$flyout.remove() && (this.$flyout = null), this.$title = null, this.value = this.options.value
                    }
                };
                var u = function () {
                    var e = !1;
                    return function () {
                        if (e) return;
                        e = !0, n(t).click(function (e) {
                            var t = n(e.target).closest("." + s());
                            t.length || n("." + s()).boardVisibilityPicker("hide")
                        })
                    }
                }();
                n.fn.boardVisibilityPicker = function (e) {
                    u();
                    var t = Array.prototype.slice.call(arguments, 1),
                        s;
                    return this.each(function () {
                        var u = n(this).data(r);
                        if (typeof e == "string") {
                            if (!u) return;
                            s = u[e] && u[e].apply(u, t);
                            if (s) return !1;
                            return
                        }
                        u || (e = n.extend({}, i, e || {}), u = new o(n(this), e), n(this).data(r, u))
                    }), s || this
                }
            }(window, document, jQuery),
            function (e, t, n) {
                function o(e) {
                    return "boardPicker_" + (e ? e + "_" : "") + "clipboard_314159265"
                }
                function u(e, t) {
                    var n = e.name.toLowerCase(),
                        r = t.name.toLowerCase();
                    return n === r ? 0 : n < r ? -1 : 1
                }
                function a(e) {
                    e.preventDefault(), e.stopPropagation()
                }
                function f() {
                    if (!this.searchQuery) return;
                    e.clearTimeout(this.hudTimeout);
                    var t = this.$hud.show().stop(!0, !1).find("span").text(this.searchQuery).end();
                    this.options.setCss(t, "opacity", "0.8"), this.hudTimeout = e.setTimeout(function () {
                        t.fadeOut(500)
                    }, 500);
                    var n = this.searchQuery.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"),
                        r = new RegExp("^" + n, "i");
                    for (var i = 0; i < this.boards.length; i++) {
                        var s = this.boards[i];
                        if (r.test(s.name)) {
                            this.$list.find("." + o("highlighted")).removeClass(o("highlighted"));
                            var u = s.$element.last().addClass(o("highlighted"));
                            this.scrollItemIntoView(u);
                            break
                        }
                    }
                }
                function l(e) {
                    if (!this.$flyout.is(":visible")) return;
                    switch (e.keyCode) {
                    case 38:
                    case 40:
                        a(e), this.highlightNext(e.keyCode - 39);
                        break;
                    case 9:
                        this.hide();
                        break;
                    case 8:
                        a(e), this.searchQuery = this.searchQuery.substring(0, this.searchQuery.length - 1), f.call(this);
                        break;
                    case 32:
                        a(e), this.searchQuery.length < this.searchQueryMaxLength && (this.searchQuery += " ", f.call(this));
                        break;
                    case 13:
                    case 27:
                        a(e)
                    }
                }
                function c(e) {
                    if (!this.$flyout.is(":visible")) return;
                    !e.metaKey && !e.ctrlKey && !e.altKey && e.which >= 32 && e.which <= 126 && (a(e), this.searchQuery.length < this.searchQueryMaxLength && (this.searchQuery += String.fromCharCode(e.which), f.call(this)))
                }
                function h(e) {
                    if (!this.$flyout.is(":visible")) return;
                    switch (e.keyCode) {
                    case 32:
                        a(e);
                        break;
                    case 27:
                        this.hide(), a(e);
                        break;
                    case 13:
                        a(e);
                        var t = this.$list.find("." + o("highlighted")).data("board");
                        if (!t) return;
                        var n = this.isSelected(t);
                        n ? this.deselect(t) : this.select(t);
                        var r = this.options.onBoardSelected;
                        r && r(t, !n, e);
                        break;
                    default:
                        a(e)
                    }
                }
                function p(e, t) {
                    this.$container = e, this.options = t, this.selectedBoards = [], this.boards = [], this.$picker = this.options.createElement("div", "block").addClass(o()).appendTo(this.$container), this.$flyout = null, this.$form = null, this.$memberForm = null, this.$list = null, this.$button = null, this.$hud = null, this.hudTimeout = null, this.searchQuery = "", this.searchQueryMaxLength = 15, this.options.boards && this.options.boards.length && this.build(this.options.boards)
                }
                var r = e.CLIPBOARD.slug,
                    i = "boardPicker",
                    s = {
                        createAvatarUrl: null,
                        loggedInUsername: "",
                        title: "Select a board",
                        onBoardCreated: null,
                        createElement: function (e, t) {
                            return n("<" + e + "/>")
                        },
                        setCss: function (e, t, n) {
                            e.css(t, n)
                        }
                    };
                p.prototype = {
                    built: function () {
                        return !!this.$flyout
                    },
                    show: function () {
                        if (!this.built()) return;
                        if (this.$flyout.is(":visible")) return;
                        var t = this.options.setCss;
                        this.$flyout.show().scrollTop(0), t(this.$flyout, "visibility", "hidden");
                        var r = this.$flyout.outerHeight(),
                            i = this.$container.offset().top + this.$container.outerHeight(),
                            s = 29;
                        i + r > n(e).height() && (s = -r - 1), t(this.$flyout, "top", s), t(this.$flyout, "visibility", "visible"), t(this.$hud, "top", s + r / 2 - 20), this.boards.length || this.toggleAddBoardForm()
                    },
                    hide: function () {
                        if (!this.built()) return;
                        this.$form.is(":visible") && this.toggleAddBoardForm(), this.searchQuery = "", this.$flyout.hide(), this.$list.find("." + o("highlighted")).removeClass(o("highlighted"))
                    },
                    toggle: function () {
                        if (!this.built()) return;
                        this.$flyout.is(":visible") ? this.hide() : (this.$button.focus(), this.show())
                    },
                    getSelected: function () {
                        return n.extend({}, this.selectedBoards)
                    },
                    isSelected: function (e) {
                        for (var t = 0; t < this.selectedBoards.length; t++) if (this.selectedBoards[t].id === e.id) return !0;
                        return !1
                    },
                    createBoard: function (e) {
                        var n = this.options.onBoardSelected,
                            r = this.options.createElement,
                            i = this,
                            s = r("li", "list-item").addClass(o("selectable")).data("board", e).append(t.createTextNode(e.name)).click(function (t) {
                                var r = i.isSelected(e);
                                r ? i.deselect(e) : i.select(e), !t.ctrlKey && !t.metaKey && !t.altKey && i.hide(), n && n(e, !r, t)
                            });
                        e.$element = e.$element ? e.$element.add(s) : s, e.visibility !== "public" && r("i", "inline").addClass(o("icon") + " " + o("private")).appendTo(s);
                        var u = e.name + " [" + e.visibility;
                        if (e.autotags) {
                            var a = e.autotags.split(" ");
                            for (var f = 0; f < a.length; ++f) u += " #" + a[f]
                        }
                        return u += "]", e.numMembers > 0 && (u += " - owned by @" + e.ownerLogin, r("i", "inline").addClass(o("sharedIcon")).appendTo(s)), s.attr("title", u), e.selected && this.select(e), s
                    },
                    addBoard: function (e, t) {
                        if (!this.built()) return;
                        var r = this.createBoard(e);
                        this.boards.push(e);
                        if (t) this.$list.append(r);
                        else {
                            var i = !1,
                                s = this.$list.find("li." + o("listHeader") + ":eq(1)").nextAll("li");
                            s.each(function () {
                                var t = n(this).data("board");
                                if (!t) return;
                                var s = u(e, t);
                                if (s <= 0) return r.insertBefore(this), i = !0, !1
                            }), i || this.$list.append(r)
                        }
                    },
                    toggleAddBoardForm: function () {
                        if (!this.built()) return;
                        this.$form.find('input[type="text"]').val("").removeClass(o("validationError")).end().find("." + o("saveButton")).removeAttr("disabled").text("Save").end().find("." + o("visibility")).boardVisibilityPicker("select", "private"), this.$form.is(":visible") ? (this.$form.hide(), this.$list.show(), this.$flyout.removeClass(o("flyoutForm"))) : (this.$list.hide(), this.$form.show().find('input[type="text"]:first').focus().end().find("." + o("cancelButton")).toggleClass(o("hide"), !this.boards.length), this.$flyout.addClass(o("flyoutForm")))
                    },
                    toggleAddMemberForm: function (e) {
                        if (!this.built()) return;
                        if (e === !0 || this.$memberForm.is(":visible")) this.$memberForm.hide(), n("." + o("memberOverlay")).remove(), this.$memberForm.find("." + o("memberFormError")).hide();
                        else {
                            var t = this;
                            this.options.createElement("div", "block").addClass(o("memberOverlay")).click(function (e) {
                                e.stopImmediatePropagation(), t.toggleAddMemberForm()
                            }).appendTo("body"), this.$memberForm.show().find('input[type="text"]:first').focus()
                        }
                    },
                    updateTitle: function () {
                        if (!this.built()) return;
                        var e = this.options.title;
                        this.selectedBoards.length && (e = this.selectedBoards[0].name, this.selectedBoards.length > 1 && (e += " +" + (this.selectedBoards.length - 1))), this.$title.text(e)
                    },
                    selectByIds: function (e) {
                        if (!e) return;
                        var t;
                        for (t = 0; t < this.selectedBoards.length; t++) n.inArray(this.selectedBoards[t].id, e) === -1 && this.deselect(this.selectedBoards[t]);
                        for (t = 0; t < e.length; t++) for (var r = 0; r < this.boards.length; ++r) if (this.boards[r].id === e[t]) {
                                    this.select(this.boards[r]);
                                    break
                                }
                    },
                    select: function (e) {
                        if (!this.built()) return;
                        e.$element.hasClass(o("selected")) || e.$element.addClass(o("selected"));
                        if (this.isSelected(e)) return;
                        this.selectedBoards.push(e), this.updateTitle()
                    },
                    deselect: function (e) {
                        if (!this.built()) return;
                        for (var t = 0; t < this.selectedBoards.length; t++) if (this.selectedBoards[t].id === e.id) {
                                this.selectedBoards.splice(t, 1);
                                break
                            }
                        this.updateTitle(), e.$element.removeClass(o("selected"))
                    },
                    scrollItemIntoView: function (e) {
                        var t = e.position().top,
                            n = e.outerHeight(),
                            r = this.$flyout.outerHeight(),
                            i = this.$flyout.scrollTop(),
                            s = 5;
                        t + n > r ? this.$flyout.scrollTop(i + t - r + n + s) : t < 0 && this.$flyout.scrollTop(i + t - s)
                    },
                    highlightNext: function (e) {
                        function n() {
                            return t.$list.find("." + i + ":" + (e < 0 ? "last" : "first"))
                        }
                        if (!this.built() || !this.$flyout.is(":visible")) return;
                        if (!this.$list.find("." + o("selectable")).length) return;
                        var t = this,
                            r = o("highlighted"),
                            i = o("selectable"),
                            s = this.$list.find("." + r);
                        s.length ? (s.removeClass(r), s = s[e < 0 ? "prevAll" : "nextAll"]("." + i + ":first"), s.length || (s = n())) : s = n(), s.addClass(r), this.scrollItemIntoView(s)
                    },
                    build: function (e) {
                        var t = this.options.createElement,
                            r = this;
                        if (!this.$title) {
                            var i = !1,
                                s = t("input", "inline").addClass(o("focusable")).attr({
                                    type: "text"
                                }).blur(function () {
                                    i = !1
                                }).keyup(n.proxy(h, this)).keydown(n.proxy(l, this)).keypress(n.proxy(c, this));
                            this.$button = t("button", "block").addClass(o("button")).click(function () {
                                i || (r.toggle(), s.focus()), i = !1
                            }).focus(function () {
                                i = !0, r.show(), this.blur(), s.focus()
                            }).append(s).append(t("i", "inline").addClass(o("caret"))).appendTo(this.$picker), this.$title = t("span", "inline").addClass(o("title")).text(this.options.title).appendTo(this.$button), this.$hud = t("div", "block").addClass(o("hud")).append(t("span", "inline")).hide().appendTo(this.$picker)
                        }
                        this.$flyout && this.$flyout.remove(), this.selectedBoards = [], this.$flyout = t("div", "block").addClass(o("flyout")).hide(), this.$list = t("ul", "list").addClass(o("list"));
                        var a = t("li", "list-item").addClass(o("separator"));
                        t("li", "list-item").addClass(o("addBoard")).attr("title", "Create a new board").text("New Board").append(t("i", "inline").addClass(o("icon"))).click(n.proxy(this.toggleAddBoardForm, this)).appendTo(this.$list), this.$list.append(a.clone());
                        if (e.length > 10) {
                            t("li", "list-item").addClass(o("listHeader")).text("Recent boards").appendTo(this.$list), e.sort(function (e, t) {
                                return e.mtime === t.mtime ? 0 : e.mtime < t.mtime ? 1 : -1
                            });
                            var f = Math.min(e.length, 5);
                            for (var p = 0; p < f; p++) this.createBoard(e[p]).appendTo(this.$list);
                            this.$list.append(a.clone())
                        }
                        var d = "ctrl";
                        /Macintosh/i.test(navigator.userAgent) && (d = String.fromCharCode(8984)), t("li", "list-item").addClass(o("listHeader")).text(d + "+click to select multiple").appendTo(this.$list), e.sort(u);
                        for (p = 0; p < e.length; p++) this.addBoard(e[p], !0);
                        this.$flyout.append(this.$list), this.$picker.append(this.$flyout), this.buildAddBoardForm()
                    },
                    buildAddBoardForm: function () {
                        function p() {
                            if (h.attr("disabled")) return;
                            u.removeClass(o("validationError"));
                            var e = n.trim(u.val() || "");
                            if (!r.sanitize(e)) {
                                u.focus().addClass(o("validationError"));
                                return
                            }
                            var i = {
                                name: e,
                                visibility: f.boardVisibilityPicker("getValue"),
                                invitations: t.$memberForm.data("invitations")
                            };
                            h.attr("disabled", "disabled").text("Saving" + String.fromCharCode(8230)), c && c(i)
                        }
                        if (!this.built()) return;
                        var e = this.options.createElement,
                            t = this;
                        this.$form = e("div", "block").addClass(o("addBoardForm")).hide();
                        var i = e("label", "block"),
                            s = e("div", "block").addClass(o("helpIcon")).attr({
                                title: "Who can view clips in this board",
                                rel: "tooltip"
                            });
                        i.clone().text("Name").appendTo(this.$form);
                        var u = e("input", "inline").addClass(o("newBoardName")).attr({
                            type: "text",
                            placeholder: "Enter a name for the board"
                        }).keydown(function (e) {
                            e.keyCode === 13 && a(e)
                        }).keyup(function (e) {
                            e.keyCode === 13 && p(), a(e)
                        }).appendTo(this.$form);
                        i.clone().text("Clip Visibility").append(s).appendTo(this.$form), n.fn.tooltip && s.tooltip({
                            placement: "top"
                        });
                        var f = e("div", "block").addClass(o("visibility")).boardVisibilityPicker({
                            createElement: e
                        }).appendTo(this.$form);
                        i.clone().text("Who can clip?").appendTo(this.$form), e("p", "block").addClass(o("addMemberLink")).text("Add members").attr({
                            title: "Share this board with others"
                        }).click(n.proxy(this.toggleAddMemberForm, this)).appendTo(this.$form), e("div", "block").addClass(o("separator")).appendTo(this.$form);
                        var l = e("div", "block").addClass(o("buttonContainer")).appendTo(this.$form);
                        e("div", "block").addClass(o("cancelButton")).text("Cancel").click(n.proxy(t.toggleAddBoardForm, t)).appendTo(l);
                        var c = this.options.onBoardCreated,
                            h = e("div", "block").addClass(o("saveButton")).text("Save").appendTo(l).click(p);
                        this.$flyout.append(this.$form), this.buildAddMemberForm()
                    },
                    buildAddMemberForm: function () {
                        function d(i, u) {
                            function a(e) {
                                s.text(e).show(), l.focus()
                            }
                            i = n.trim(i || ""), i = i.charAt(0) === "@" ? i.substring(1) : i;
                            if (!i) {
                                a("Please enter an email address or a username");
                                return
                            }
                            if (p[i]) {
                                a("This person has already been invited to this board");
                                return
                            }
                            s.hide(), p[i] = 1;
                            var f = e("li", "list-item"),
                                c = r && r(i);
                            e("div", "block").addClass(o("userDetails")).append(e("img", "inline").addClass(o("avatar")).showPlaceholderOnError().attr("src", c), e("span", "inline").addClass(o("username")).text(i)).appendTo(f);
                            var d = e("div", "block").addClass(o("status"));
                            if (u) {
                                t.push({
                                    loginOrEmail: i,
                                    permission: "writer"
                                });
                                var v = t.length - 1;
                                d.text("Pending invite").addClass(o("pendingInvite")).click(function (e) {
                                    t.splice(v, 1), f.remove(), p[i] = 0, e.stopPropagation()
                                }), f.hover(function () {
                                    d.text("Delete invite")
                                }, function () {
                                    d.text("Pending invite")
                                })
                            } else d.text("Owner");
                            f.append(d).appendTo(h), l.val("")
                        }
                        var e = this.options.createElement,
                            t = [],
                            r = this.options.createAvatarUrl,
                            i = this;
                        this.$memberForm = e("div", "block").addClass(o("memberForm")).hide().data("invitations", t), e("h2", "block").text("Who can clip?").appendTo(this.$memberForm);
                        var s = e("div", "block").addClass(o("memberFormError")).appendTo(this.$memberForm).hide(),
                            u = e("div", "block").addClass(o("formBlock")),
                            f = u.clone(),
                            l = e("input", "inline").addClass(o("memberInput")).attr({
                                type: "text",
                                placeholder: "Search e.g. @frank or enter email"
                            }).autocompletify({
                                createElement: e,
                                trigger: "[@\\w]",
                                fields: {
                                    user: 1
                                },
                                setCss: function (e, t, r) {
                                    n.fn.cssImportant ? e.cssImportant(t, r) : e.css(t, r)
                                }
                            }).keyup(function (e) {
                                e.keyCode === 13 && (d(l.val(), !0), a(e))
                            }).keydown(function (e) {
                                e.keyCode === 13 && a(e)
                            }).appendTo(f);
                        e("button", "inline").addClass(o("inviteButton")).appendTo(f).text("Send Invite").click(function () {
                            d(l.val(), !0)
                        });
                        var c = u.clone().addClass(o("memberList")),
                            h = e("ul", "list").appendTo(c),
                            p = {};
                        d(this.options.loggedInUsername, !1);
                        var v = u.clone().addClass(o("footer"));
                        e("div", "block").addClass(o("closeButton")).text("Close").click(function () {
                            i.toggleAddMemberForm()
                        }).appendTo(v), this.$memberForm.append(f, c, v).appendTo("body")
                    },
                    showError: function () {
                        if (!this.built()) return;
                        if (!this.$form.is(":visible")) return;
                        var t = this.$form.find("." + o("saveButton")).attr("disabled", "disabled").addClass(o("errorButton")).text("Error");
                        e.setTimeout(function () {
                            t.removeClass(o("errorButton")).removeAttr("disabled").text("Save")
                        }, 2e3)
                    },
                    destroy: function () {
                        this.$picker && this.$picker.remove(), this.$memberForm && this.$memberForm.remove(), n("." + o("memberOverlay")).remove(), this.$picker = null, this.$container.data(i, null)
                    }
                };
                var d = function () {
                    var e = !1;
                    return function () {
                        if (e) return;
                        e = !0, n(t).click(function (e) {
                            var t = n(e.target).closest("." + o("memberForm")),
                                r = n(e.target).closest(".autocomplete-me-wrapper");
                            if (!t.length && !r.length) {
                                var i = n(e.target).closest("." + o())[0];
                                n("." + o()).filter(function () {
                                    return this !== i
                                }).parent().boardPicker("hide")
                            }
                        }).keyup(function (e) {
                            e.keyCode === 27 && n("." + o()).parent().each(function () {
                                var t = n(this).data(i);
                                t && t.$memberForm.is(":visible") && (t.toggleAddMemberForm(), e.stopImmediatePropagation())
                            })
                        })
                    }
                }();
                n.fn.boardPicker = function (e) {
                    var t = Array.prototype.slice.call(arguments, 1),
                        r;
                    return this.each(function () {
                        var o = n(this).data(i);
                        if (typeof e == "string") {
                            if (!o) return;
                            r = o[e] && o[e].apply(o, t);
                            if (r) return !1;
                            return
                        }
                        o || (d(), e = n.extend({}, s, e || {}), o = new p(n(this), e), n(this).data(i, o))
                    }), r || this
                }
            }(window, document, jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
                def: "easeOutQuad",
                swing: function (e, t, n, r, i) {
                    return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
                },
                easeInQuad: function (e, t, n, r, i) {
                    return r * (t /= i) * t + n
                },
                easeOutQuad: function (e, t, n, r, i) {
                    return -r * (t /= i) * (t - 2) + n
                },
                easeInOutQuad: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
                },
                easeInCubic: function (e, t, n, r, i) {
                    return r * (t /= i) * t * t + n
                },
                easeOutCubic: function (e, t, n, r, i) {
                    return r * ((t = t / i - 1) * t * t + 1) + n
                },
                easeInOutCubic: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
                },
                easeInQuart: function (e, t, n, r, i) {
                    return r * (t /= i) * t * t * t + n
                },
                easeOutQuart: function (e, t, n, r, i) {
                    return -r * ((t = t / i - 1) * t * t * t - 1) + n
                },
                easeInOutQuart: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
                },
                easeInQuint: function (e, t, n, r, i) {
                    return r * (t /= i) * t * t * t * t + n
                },
                easeOutQuint: function (e, t, n, r, i) {
                    return r * ((t = t / i - 1) * t * t * t * t + 1) + n
                },
                easeInOutQuint: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
                },
                easeInSine: function (e, t, n, r, i) {
                    return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
                },
                easeOutSine: function (e, t, n, r, i) {
                    return r * Math.sin(t / i * (Math.PI / 2)) + n
                },
                easeInOutSine: function (e, t, n, r, i) {
                    return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
                },
                easeInExpo: function (e, t, n, r, i) {
                    return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
                },
                easeOutExpo: function (e, t, n, r, i) {
                    return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
                },
                easeInOutExpo: function (e, t, n, r, i) {
                    return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
                },
                easeInCirc: function (e, t, n, r, i) {
                    return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
                },
                easeOutCirc: function (e, t, n, r, i) {
                    return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
                },
                easeInOutCirc: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
                },
                easeInElastic: function (e, t, n, r, i) {
                    var s = 1.70158,
                        o = 0,
                        u = r;
                    if (t == 0) return n;
                    if ((t /= i) == 1) return n + r;
                    o || (o = i * .3);
                    if (u < Math.abs(r)) {
                        u = r;
                        var s = o / 4
                    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
                    return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
                },
                easeOutElastic: function (e, t, n, r, i) {
                    var s = 1.70158,
                        o = 0,
                        u = r;
                    if (t == 0) return n;
                    if ((t /= i) == 1) return n + r;
                    o || (o = i * .3);
                    if (u < Math.abs(r)) {
                        u = r;
                        var s = o / 4
                    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
                    return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
                },
                easeInOutElastic: function (e, t, n, r, i) {
                    var s = 1.70158,
                        o = 0,
                        u = r;
                    if (t == 0) return n;
                    if ((t /= i / 2) == 2) return n + r;
                    o || (o = i * .3 * 1.5);
                    if (u < Math.abs(r)) {
                        u = r;
                        var s = o / 4
                    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
                    return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n : u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
                },
                easeInBack: function (e, t, n, r, i, s) {
                    return s == undefined && (s = 1.70158), r * (t /= i) * t * ((s + 1) * t - s) + n
                },
                easeOutBack: function (e, t, n, r, i, s) {
                    return s == undefined && (s = 1.70158), r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
                },
                easeInOutBack: function (e, t, n, r, i, s) {
                    return s == undefined && (s = 1.70158), (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n : r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
                },
                easeInBounce: function (e, t, n, r, i) {
                    return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
                },
                easeOutBounce: function (e, t, n, r, i) {
                    return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
                },
                easeInOutBounce: function (e, t, n, r, i) {
                    return t < i / 2 ? jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n : jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
                }
            }),
            function (e) {
                function r(t) {
                    var n = t || window.event,
                        r = [].slice.call(arguments, 1),
                        i = 0,
                        s = !0,
                        o = 0,
                        u = 0;
                    return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
                }
                var t = ["DOMMouseScroll", "mousewheel"];
                if (e.event.fixHooks) for (var n = t.length; n;) e.event.fixHooks[t[--n]] = e.event.mouseHooks;
                e.event.special.mousewheel = {
                    setup: function () {
                        if (this.addEventListener) for (var e = t.length; e;) this.addEventListener(t[--e], r, !1);
                        else this.onmousewheel = r
                    },
                    teardown: function () {
                        if (this.removeEventListener) for (var e = t.length; e;) this.removeEventListener(t[--e], r, !1);
                        else this.onmousewheel = null
                    }
                }, e.fn.extend({
                    mousewheel: function (e) {
                        return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
                    },
                    unmousewheel: function (e) {
                        return this.unbind("mousewheel", e)
                    }
                })
            }(jQuery),
            function (e, t, n, r, i, s) {
                function w(e, t) {
                    var n = typeof e[t];
                    return n == "function" || n == "object" && !! e[t] || n == "unknown"
                }
                function E(e, t) {
                    return typeof e[t] == "object" && !! e[t]
                }
                function S(e) {
                    return Object.prototype.toString.call(e) === "[object Array]"
                }
                function x() {
                    try {
                        var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        return y = Array.prototype.slice.call(e.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1), b = parseInt(y[0], 10) > 9 && parseInt(y[1], 10) > 0, e = null, !0
                    } catch (t) {
                        return !1
                    }
                }
                function A() {
                    if (C) return;
                    C = !0;
                    for (var e = 0; e < k.length; e++) k[e]();
                    k.length = 0
                }
                function M(e, t) {
                    if (C) {
                        e.call(t);
                        return
                    }
                    k.push(function () {
                        e.call(t)
                    })
                }
                function _() {
                    var e = parent;
                    if (h !== "") for (var t = 0, n = h.split("."); t < n.length; t++) e = e[n[t]];
                    return e.easyXDM
                }
                function D(t) {
                    return e.easyXDM = d, h = t, h && (v = "easyXDM_" + h.replace(".", "_") + "_"), p
                }
                function P(e) {
                    return e.match(f)[3]
                }
                function H(e) {
                    return e.match(f)[4] || ""
                }
                function B(e) {
                    var t = e.toLowerCase().match(f),
                        n = t[2],
                        r = t[3],
                        i = t[4] || "";
                    if (n == "http:" && i == ":80" || n == "https:" && i == ":443") i = "";
                    return n + "//" + r + i
                }
                function j(e) {
                    e = e.replace(c, "$1/");
                    if (!e.match(/^(http||https):\/\//)) {
                        var t = e.substring(0, 1) === "/" ? "" : n.pathname;
                        t.substring(t.length - 1) !== "/" && (t = t.substring(0, t.lastIndexOf("/") + 1)), e = n.protocol + "//" + n.host + t + e
                    }
                    while (l.test(e)) e = e.replace(l, "");
                    return e
                }
                function F(e, t) {
                    var n = "",
                        r = e.indexOf("#");
                    r !== -1 && (n = e.substring(r), e = e.substring(0, r));
                    var i = [];
                    for (var o in t) t.hasOwnProperty(o) && i.push(o + "=" + s(t[o]));
                    return e + (g ? "#" : e.indexOf("?") == -1 ? "?" : "&") + i.join("&") + n
                }
                function q(e) {
                    return typeof e == "undefined"
                }
                function U(e, t, n) {
                    var r;
                    for (var i in t) t.hasOwnProperty(i) && (i in e ? (r = t[i], typeof r == "object" ? U(e[i], r, n) : n || (e[i] = t[i])) : e[i] = t[i]);
                    return e
                }
                function z() {
                    var e = t.body.appendChild(t.createElement("form")),
                        n = e.appendChild(t.createElement("input"));
                    n.name = v + "TEST" + u, m = n !== e.elements[n.name], t.body.removeChild(e)
                }
                function W(e) {
                    q(m) && z();
                    var n;
                    m ? n = t.createElement('<iframe name="' + e.props.name + '"/>') : (n = t.createElement("IFRAME"), n.name = e.props.name), n.id = n.name = e.props.name, delete e.props.name, e.onLoad && T(n, "load", e.onLoad), typeof e.container == "string" && (e.container = t.getElementById(e.container)), e.container || (U(n.style, {
                        position: "absolute",
                        top: "-2000px"
                    }), e.container = t.body);
                    var r = e.props.src;
                    return delete e.props.src, U(n, e.props), n.border = n.frameBorder = 0, n.allowTransparency = !0, e.container.appendChild(n), n.src = r, e.props.src = r, n
                }
                function X(e, t) {
                    typeof e == "string" && (e = [e]);
                    var n, r = e.length;
                    while (r--) {
                        n = e[r], n = new RegExp(n.substr(0, 1) == "^" ? n : "^" + n.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$");
                        if (n.test(t)) return !0
                    }
                    return !1
                }
                function V(r) {
                    var i = r.protocol,
                        s;
                    r.isHost = r.isHost || q(I.xdm_p), g = r.hash || !1, r.props || (r.props = {});
                    if (!r.isHost) {
                        r.channel = I.xdm_c, r.secret = I.xdm_s, r.remote = I.xdm_e, i = I.xdm_p;
                        if (r.acl && !X(r.acl, r.remote)) throw new Error("Access denied for " + r.remote)
                    } else r.remote = j(r.remote), r.channel = r.channel || "default" + u++, r.secret = Math.random().toString(16).substring(2), q(i) && (B(n.href) == B(r.remote) ? i = "4" : w(e, "postMessage") || w(t, "postMessage") ? i = "1" : r.swf && w(e, "ActiveXObject") && x() ? i = "6" : navigator.product === "Gecko" && "frameElement" in e && navigator.userAgent.indexOf("WebKit") == -1 ? i = "5" : r.remoteHelper ? (r.remoteHelper = j(r.remoteHelper), i = "2") : i = "0");
                    r.protocol = i;
                    switch (i) {
                    case "0":
                        U(r, {
                            interval: 100,
                            delay: 2e3,
                            useResize: !0,
                            useParent: !1,
                            usePolling: !1
                        }, !0);
                        if (r.isHost) {
                            if (!r.local) {
                                var o = n.protocol + "//" + n.host,
                                    a = t.body.getElementsByTagName("img"),
                                    f, l = a.length;
                                while (l--) {
                                    f = a[l];
                                    if (f.src.substring(0, o.length) === o) {
                                        r.local = f.src;
                                        break
                                    }
                                }
                                r.local || (r.local = e)
                            }
                            var c = {
                                xdm_c: r.channel,
                                xdm_p: 0
                            };
                            r.local === e ? (r.usePolling = !0, r.useParent = !0, r.local = n.protocol + "//" + n.host + n.pathname + n.search, c.xdm_e = r.local, c.xdm_pa = 1) : c.xdm_e = j(r.local), r.container && (r.useResize = !1, c.xdm_po = 1), r.remote = F(r.remote, c)
                        } else U(r, {
                                channel: I.xdm_c,
                                remote: I.xdm_e,
                                useParent: !q(I.xdm_pa),
                                usePolling: !q(I.xdm_po),
                                useResize: r.useParent ? !1 : r.useResize
                            });
                        s = [new p.stack.HashTransport(r), new p.stack.ReliableBehavior({}), new p.stack.QueueBehavior({
                                encode: !0,
                                maxLength: 4e3 - r.remote.length
                            }), new p.stack.VerifyBehavior({
                                initiate: r.isHost
                            })];
                        break;
                    case "1":
                        s = [new p.stack.PostMessageTransport(r)];
                        break;
                    case "2":
                        s = [new p.stack.NameTransport(r), new p.stack.QueueBehavior, new p.stack.VerifyBehavior({
                                initiate: r.isHost
                            })];
                        break;
                    case "3":
                        s = [new p.stack.NixTransport(r)];
                        break;
                    case "4":
                        s = [new p.stack.SameOriginTransport(r)];
                        break;
                    case "5":
                        s = [new p.stack.FrameElementTransport(r)];
                        break;
                    case "6":
                        y || x(), s = [new p.stack.FlashTransport(r)]
                    }
                    return s.push(new p.stack.QueueBehavior({
                        lazy: r.lazy,
                        remove: !0
                    })), s
                }
                function $(e) {
                    var t, n = {
                            incoming: function (e, t) {
                                this.up.incoming(e, t)
                            },
                            outgoing: function (e, t) {
                                this.down.outgoing(e, t)
                            },
                            callback: function (e) {
                                this.up.callback(e)
                            },
                            init: function () {
                                this.down.init()
                            },
                            destroy: function () {
                                this.down.destroy()
                            }
                        };
                    for (var r = 0, i = e.length; r < i; r++) t = e[r], U(t, n, !0), r !== 0 && (t.down = e[r - 1]), r !== i - 1 && (t.up = e[r + 1]);
                    return t
                }
                function J(e) {
                    e.up.down = e.down, e.down.up = e.up, e.up = e.down = null
                }
                var o = this,
                    u = Math.floor(Math.random() * 1e4),
                    a = Function.prototype,
                    f = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,
                    l = /[\-\w]+\/\.\.\//,
                    c = /([^:])\/\//g,
                    h = "",
                    p = {}, d = e.easyXDM,
                    v = "easyXDM_",
                    m, g = !1,
                    y, b, T, N;
                if (w(e, "addEventListener")) T = function (e, t, n) {
                        e.addEventListener(t, n, !1)
                }, N = function (e, t, n) {
                    e.removeEventListener(t, n, !1)
                };
                else {
                    if (!w(e, "attachEvent")) throw new Error("Browser not supported");
                    T = function (e, t, n) {
                        e.attachEvent("on" + t, n)
                    }, N = function (e, t, n) {
                        e.detachEvent("on" + t, n)
                    }
                }
                var C = !1,
                    k = [],
                    L;
                "readyState" in t ? (L = t.readyState, C = L == "complete" || ~navigator.userAgent.indexOf("AppleWebKit/") && (L == "loaded" || L == "interactive")) : C = !! t.body;
                if (!C) {
                    if (w(e, "addEventListener")) T(t, "DOMContentLoaded", A);
                    else {
                        T(t, "readystatechange", function () {
                            t.readyState == "complete" && A()
                        });
                        if (t.documentElement.doScroll && e === top) {
                            var O = function () {
                                if (C) return;
                                try {
                                    t.documentElement.doScroll("left")
                                } catch (e) {
                                    r(O, 1);
                                    return
                                }
                                A()
                            };
                            O()
                        }
                    }
                    T(e, "load", A)
                }
                var I = function (e) {
                    e = e.substring(1).split("&");
                    var t = {}, n, r = e.length;
                    while (r--) n = e[r].split("="), t[n[0]] = i(n[1]);
                    return t
                }(/xdm_e=/.test(n.search) ? n.search : n.hash),
                    R = function () {
                        var e = {}, t = {
                                a: [1, 2, 3]
                            }, n = '{"a":[1,2,3]}';
                        return typeof JSON != "undefined" && typeof JSON.stringify == "function" && JSON.stringify(t).replace(/\s/g, "") === n ? JSON : (Object.toJSON && Object.toJSON(t).replace(/\s/g, "") === n && (e.stringify = Object.toJSON), typeof String.prototype.evalJSON == "function" && (t = n.evalJSON(), t.a && t.a.length === 3 && t.a[2] === 3 && (e.parse = function (e) {
                            return e.evalJSON()
                        })), e.stringify && e.parse ? (R = function () {
                            return e
                        }, e) : null)
                    };
                U(p, {
                    version: "2.4.15.118",
                    query: I,
                    stack: {},
                    apply: U,
                    getJSONObject: R,
                    whenReady: M,
                    noConflict: D
                }), p.DomHelper = {
                    on: T,
                    un: N,
                    requiresJSON: function (n) {
                        E(e, "JSON") || t.write('<script type="text/javascript" src="' + n + '"><' + "/script>")
                    }
                },
                function () {
                    var e = {};
                    p.Fn = {
                        set: function (t, n) {
                            e[t] = n
                        },
                        get: function (t, n) {
                            var r = e[t];
                            return n && delete e[t], r
                        }
                    }
                }(), p.Socket = function (e) {
                    var t = $(V(e).concat([{
                            incoming: function (t, n) {
                                e.onMessage(t, n)
                            },
                            callback: function (t) {
                                e.onReady && e.onReady(t)
                            }
                        }
                    ])),
                        n = B(e.remote);
                    this.origin = B(e.remote), this.destroy = function () {
                        t.destroy()
                    }, this.postMessage = function (e) {
                        t.outgoing(e, n)
                    }, t.init()
                }, p.Rpc = function (e, t) {
                    if (t.local) for (var n in t.local) if (t.local.hasOwnProperty(n)) {
                                var r = t.local[n];
                                typeof r == "function" && (t.local[n] = {
                                    method: r
                                })
                            }
                    var i = $(V(e).concat([new p.stack.RpcBehavior(this, t), {
                            callback: function (t) {
                                e.onReady && e.onReady(t)
                            }
                        }
                    ]));
                    this.origin = B(e.remote), this.destroy = function () {
                        i.destroy()
                    }, i.init()
                }, p.stack.SameOriginTransport = function (e) {
                    var t, i, s, o;
                    return t = {
                        outgoing: function (e, t, n) {
                            s(e), n && n()
                        },
                        destroy: function () {
                            i && (i.parentNode.removeChild(i), i = null)
                        },
                        onDOMReady: function () {
                            o = B(e.remote), e.isHost ? (U(e.props, {
                                src: F(e.remote, {
                                    xdm_e: n.protocol + "//" + n.host + n.pathname,
                                    xdm_c: e.channel,
                                    xdm_p: 4
                                }),
                                name: v + e.channel + "_provider"
                            }), i = W(e), p.Fn.set(e.channel, function (e) {
                                return s = e, r(function () {
                                    t.up.callback(!0)
                                }, 0),
                                function (e) {
                                    t.up.incoming(e, o)
                                }
                            })) : (s = _().Fn.get(e.channel, !0)(function (e) {
                                t.up.incoming(e, o)
                            }), r(function () {
                                t.up.callback(!0)
                            }, 0))
                        },
                        init: function () {
                            M(t.onDOMReady, t)
                        }
                    }
                }, p.stack.FlashTransport = function (e) {
                    function c(e, t) {
                        r(function () {
                            i.up.incoming(e, a)
                        }, 0)
                    }
                    function d(n) {
                        var r = e.swf + "?host=" + e.isHost,
                            i = "easyXDM_swf_" + Math.floor(Math.random() * 1e4);
                        p.Fn.set("flash_loaded" + n.replace(/[\-.]/g, "_"), function () {
                            p.stack.FlashTransport[n].swf = f = l.firstChild;
                            var e = p.stack.FlashTransport[n].queue;
                            for (var t = 0; t < e.length; t++) e[t]();
                            e.length = 0
                        }), e.swfContainer ? l = typeof e.swfContainer == "string" ? t.getElementById(e.swfContainer) : e.swfContainer : (l = t.createElement("div"), U(l.style, b && e.swfNoThrottle ? {
                            height: "20px",
                            width: "20px",
                            position: "fixed",
                            right: 0,
                            top: 0
                        } : {
                            height: "1px",
                            width: "1px",
                            position: "absolute",
                            overflow: "hidden",
                            right: 0,
                            top: 0
                        }), t.body.appendChild(l));
                        var s = "callback=flash_loaded" + n.replace(/[\-.]/g, "_") + "&proto=" + o.location.protocol + "&domain=" + P(o.location.href) + "&port=" + H(o.location.href) + "&ns=" + h;
                        l.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + i + "' data='" + r + "'>" + "<param name='allowScriptAccess' value='always'></param>" + "<param name='wmode' value='transparent'>" + "<param name='movie' value='" + r + "'></param>" + "<param name='flashvars' value='" + s + "'></param>" + "<embed type='application/x-shockwave-flash' FlashVars='" + s + "' allowScriptAccess='always' wmode='transparent' src='" + r + "' height='1' width='1'></embed>" + "</object>"
                    }
                    var i, s, u, a, f, l;
                    return i = {
                        outgoing: function (t, n, r) {
                            f.postMessage(e.channel, t.toString()), r && r()
                        },
                        destroy: function () {
                            try {
                                f.destroyChannel(e.channel)
                            } catch (t) {}
                            f = null, s && (s.parentNode.removeChild(s), s = null)
                        },
                        onDOMReady: function () {
                            a = e.remote, p.Fn.set("flash_" + e.channel + "_init", function () {
                                r(function () {
                                    i.up.callback(!0)
                                })
                            }), p.Fn.set("flash_" + e.channel + "_onMessage", c), e.swf = j(e.swf);
                            var t = P(e.swf),
                                o = function () {
                                    p.stack.FlashTransport[t].init = !0, f = p.stack.FlashTransport[t].swf, f.createChannel(e.channel, e.secret, B(e.remote), e.isHost), e.isHost && (b && e.swfNoThrottle && U(e.props, {
                                        position: "fixed",
                                        right: 0,
                                        top: 0,
                                        height: "20px",
                                        width: "20px"
                                    }), U(e.props, {
                                        src: F(e.remote, {
                                            xdm_e: B(n.href),
                                            xdm_c: e.channel,
                                            xdm_p: 6,
                                            xdm_s: e.secret
                                        }),
                                        name: v + e.channel + "_provider"
                                    }), s = W(e))
                                };
                            p.stack.FlashTransport[t] && p.stack.FlashTransport[t].init ? o() : p.stack.FlashTransport[t] ? p.stack.FlashTransport[t].queue.push(o) : (p.stack.FlashTransport[t] = {
                                queue: [o]
                            }, d(t))
                        },
                        init: function () {
                            M(i.onDOMReady, i)
                        }
                    }
                }, p.stack.PostMessageTransport = function (t) {
                    function a(e) {
                        if (e.origin) return B(e.origin);
                        if (e.uri) return B(e.uri);
                        if (e.domain) return n.protocol + "//" + e.domain;
                        throw "Unable to retrieve the origin of the event"
                    }
                    function f(e) {
                        var n = a(e);
                        n == u && e.data.substring(0, t.channel.length + 1) == t.channel + " " && i.up.incoming(e.data.substring(t.channel.length + 1), n)
                    }
                    var i, s, o, u;
                    return i = {
                        outgoing: function (e, n, r) {
                            o.postMessage(t.channel + " " + e, n || u), r && r()
                        },
                        destroy: function () {
                            N(e, "message", f), s && (o = null, s.parentNode.removeChild(s), s = null)
                        },
                        onDOMReady: function () {
                            u = B(t.remote);
                            if (t.isHost) {
                                var a = function (n) {
                                    n.data == t.channel + "-ready" && (o = "postMessage" in s.contentWindow ? s.contentWindow : s.contentWindow.document, N(e, "message", a), T(e, "message", f), r(function () {
                                        i.up.callback(!0)
                                    }, 0))
                                };
                                T(e, "message", a), U(t.props, {
                                    src: F(t.remote, {
                                        xdm_e: B(n.href),
                                        xdm_c: t.channel,
                                        xdm_p: 1
                                    }),
                                    name: v + t.channel + "_provider"
                                }), s = W(t)
                            } else T(e, "message", f), o = "postMessage" in e.parent ? e.parent : e.parent.document, o.postMessage(t.channel + "-ready", u), r(function () {
                                    i.up.callback(!0)
                                }, 0)
                        },
                        init: function () {
                            M(i.onDOMReady, i)
                        }
                    }
                }, p.stack.FrameElementTransport = function (i) {
                    var s, o, u, a;
                    return s = {
                        outgoing: function (e, t, n) {
                            u.call(this, e), n && n()
                        },
                        destroy: function () {
                            o && (o.parentNode.removeChild(o), o = null)
                        },
                        onDOMReady: function () {
                            a = B(i.remote), i.isHost ? (U(i.props, {
                                src: F(i.remote, {
                                    xdm_e: B(n.href),
                                    xdm_c: i.channel,
                                    xdm_p: 5
                                }),
                                name: v + i.channel + "_provider"
                            }), o = W(i), o.fn = function (e) {
                                return delete o.fn, u = e, r(function () {
                                    s.up.callback(!0)
                                }, 0),
                                function (e) {
                                    s.up.incoming(e, a)
                                }
                            }) : (t.referrer && B(t.referrer) != I.xdm_e && (e.top.location = I.xdm_e), u = e.frameElement.fn(function (e) {
                                s.up.incoming(e, a)
                            }), s.up.callback(!0))
                        },
                        init: function () {
                            M(s.onDOMReady, s)
                        }
                    }
                }, p.stack.NameTransport = function (e) {
                    function l(t) {
                        var r = e.remoteHelper + (n ? "#_3" : "#_2") + e.channel;
                        i.contentWindow.sendMessage(t, r)
                    }
                    function c() {
                        n ? (++o === 2 || !n) && t.up.callback(!0) : (l("ready"), t.up.callback(!0))
                    }
                    function h(e) {
                        t.up.incoming(e, a)
                    }
                    function d() {
                        u && r(function () {
                            u(!0)
                        }, 0)
                    }
                    var t, n, i, s, o, u, a, f;
                    return t = {
                        outgoing: function (e, t, n) {
                            u = n, l(e)
                        },
                        destroy: function () {
                            i.parentNode.removeChild(i), i = null, n && (s.parentNode.removeChild(s), s = null)
                        },
                        onDOMReady: function () {
                            n = e.isHost, o = 0, a = B(e.remote), e.local = j(e.local), n ? (p.Fn.set(e.channel, function (t) {
                                n && t === "ready" && (p.Fn.set(e.channel, h), c())
                            }), f = F(e.remote, {
                                xdm_e: e.local,
                                xdm_c: e.channel,
                                xdm_p: 2
                            }), U(e.props, {
                                src: f + "#" + e.channel,
                                name: v + e.channel + "_provider"
                            }), s = W(e)) : (e.remoteHelper = e.remote, p.Fn.set(e.channel, h)), i = W({
                                props: {
                                    src: e.local + "#_4" + e.channel
                                },
                                onLoad: function t() {
                                    var n = i || this;
                                    N(n, "load", t), p.Fn.set(e.channel + "_load", d),
                                    function s() {
                                        typeof n.contentWindow.sendMessage == "function" ? c() : r(s, 50)
                                    }()
                                }
                            })
                        },
                        init: function () {
                            M(t.onDOMReady, t)
                        }
                    }
                }, p.stack.HashTransport = function (t) {
                    function d(e) {
                        if (!c) return;
                        var n = t.remote + "#" + f+++"_" + e;
                        (s || !h ? c.contentWindow : c).location = n
                    }
                    function m(e) {
                        a = e, n.up.incoming(a.substring(a.indexOf("_") + 1), p)
                    }
                    function g() {
                        if (!l) return;
                        var e = l.location.href,
                            t = "",
                            n = e.indexOf("#");
                        n != -1 && (t = e.substring(n)), t && t != a && m(t)
                    }
                    function y() {
                        o = setInterval(g, u)
                    }
                    var n, i = this,
                        s, o, u, a, f, l, c, h, p;
                    return n = {
                        outgoing: function (e, t) {
                            d(e)
                        },
                        destroy: function () {
                            e.clearInterval(o), (s || !h) && c.parentNode.removeChild(c), c = null
                        },
                        onDOMReady: function () {
                            s = t.isHost, u = t.interval, a = "#" + t.channel, f = 0, h = t.useParent, p = B(t.remote);
                            if (s) {
                                t.props = {
                                    src: t.remote,
                                    name: v + t.channel + "_provider"
                                };
                                if (h) t.onLoad = function () {
                                        l = e, y(), n.up.callback(!0)
                                };
                                else {
                                    var i = 0,
                                        o = t.delay / 50;
                                    (function d() {
                                        if (++i > o) throw new Error("Unable to reference listenerwindow");
                                        try {
                                            l = c.contentWindow.frames[v + t.channel + "_consumer"]
                                        } catch (e) {}
                                        l ? (y(), n.up.callback(!0)) : r(d, 50)
                                    })()
                                }
                                c = W(t)
                            } else l = e, y(), h ? (c = parent, n.up.callback(!0)) : (U(t, {
                                    props: {
                                        src: t.remote + "#" + t.channel + new Date,
                                        name: v + t.channel + "_consumer"
                                    },
                                    onLoad: function () {
                                        n.up.callback(!0)
                                    }
                                }), c = W(t))
                        },
                        init: function () {
                            M(n.onDOMReady, n)
                        }
                    }
                }, p.stack.ReliableBehavior = function (e) {
                    var t, n, r = 0,
                        i = 0,
                        s = "";
                    return t = {
                        incoming: function (e, o) {
                            var u = e.indexOf("_"),
                                a = e.substring(0, u).split(",");
                            e = e.substring(u + 1), a[0] == r && (s = "", n && n(!0)), e.length > 0 && (t.down.outgoing(a[1] + "," + r + "_" + s, o), i != a[1] && (i = a[1], t.up.incoming(e, o)))
                        },
                        outgoing: function (e, o, u) {
                            s = e, n = u, t.down.outgoing(i + "," + ++r + "_" + e, o)
                        }
                    }
                }, p.stack.QueueBehavior = function (e) {
                    function h() {
                        if (e.remove && n.length === 0) {
                            J(t);
                            return
                        }
                        if (o || n.length === 0 || a) return;
                        o = !0;
                        var i = n.shift();
                        t.down.outgoing(i.data, i.origin, function (e) {
                            o = !1, i.callback && r(function () {
                                i.callback(e)
                            }, 0), h()
                        })
                    }
                    var t, n = [],
                        o = !0,
                        u = "",
                        a, f = 0,
                        l = !1,
                        c = !1;
                    return t = {
                        init: function () {
                            q(e) && (e = {}), e.maxLength && (f = e.maxLength, c = !0), e.lazy ? l = !0 : t.down.init()
                        },
                        callback: function (e) {
                            o = !1;
                            var n = t.up;
                            h(), n.callback(e)
                        },
                        incoming: function (n, r) {
                            if (c) {
                                var s = n.indexOf("_"),
                                    o = parseInt(n.substring(0, s), 10);
                                u += n.substring(s + 1), o === 0 && (e.encode && (u = i(u)), t.up.incoming(u, r), u = "")
                            } else t.up.incoming(n, r)
                        },
                        outgoing: function (r, i, o) {
                            e.encode && (r = s(r));
                            var u = [],
                                a;
                            if (c) {
                                while (r.length !== 0) a = r.substring(0, f), r = r.substring(a.length), u.push(a);
                                while (a = u.shift()) n.push({
                                        data: u.length + "_" + a,
                                        origin: i,
                                        callback: u.length === 0 ? o : null
                                    })
                            } else n.push({
                                    data: r,
                                    origin: i,
                                    callback: o
                                });
                            l ? t.down.init() : h()
                        },
                        destroy: function () {
                            a = !0, t.down.destroy()
                        }
                    }
                }, p.stack.VerifyBehavior = function (e) {
                    function s() {
                        n = Math.random().toString(16).substring(2), t.down.outgoing(n)
                    }
                    var t, n, r, i = !1;
                    return t = {
                        incoming: function (i, o) {
                            var u = i.indexOf("_");
                            u === -1 ? i === n ? t.up.callback(!0) : r || (r = i, e.initiate || s(), t.down.outgoing(i)) : i.substring(0, u) === r && t.up.incoming(i.substring(u + 1), o)
                        },
                        outgoing: function (e, r, i) {
                            t.down.outgoing(n + "_" + e, r, i)
                        },
                        callback: function (t) {
                            e.initiate && s()
                        }
                    }
                }, p.stack.RpcBehavior = function (e, t) {
                    function o(e) {
                        e.jsonrpc = "2.0", n.down.outgoing(r.stringify(e))
                    }
                    function u(e, t) {
                        var n = Array.prototype.slice;
                        return function () {
                            var r = arguments.length,
                                u, a = {
                                    method: t
                                };
                            r > 0 && typeof arguments[r - 1] == "function" ? (r > 1 && typeof arguments[r - 2] == "function" ? (u = {
                                success: arguments[r - 2],
                                error: arguments[r - 1]
                            }, a.params = n.call(arguments, 0, r - 2)) : (u = {
                                success: arguments[r - 1]
                            }, a.params = n.call(arguments, 0, r - 1)), s["" + ++i] = u, a.id = i) : a.params = n.call(arguments, 0), e.namedParams && a.params.length === 1 && (a.params = a.params[0]), o(a)
                        }
                    }
                    function f(e, t, n, r) {
                        if (!n) {
                            t && o({
                                id: t,
                                error: {
                                    code: -32601,
                                    message: "Procedure not found."
                                }
                            });
                            return
                        }
                        var i, s;
                        t ? (i = function (e) {
                            i = a, o({
                                id: t,
                                result: e
                            })
                        }, s = function (e, n) {
                            s = a;
                            var r = {
                                id: t,
                                error: {
                                    code: -32099,
                                    message: e
                                }
                            };
                            n && (r.error.data = n), o(r)
                        }) : i = s = a, S(r) || (r = [r]);
                        try {
                            var u = n.method.apply(n.scope, r.concat([i, s]));
                            q(u) || i(u)
                        } catch (f) {
                            s(f.message)
                        }
                    }
                    var n, r = t.serializer || R(),
                        i = 0,
                        s = {};
                    return n = {
                        incoming: function (e, n) {
                            var i = r.parse(e);
                            if (i.method) t.handle ? t.handle(i, o) : f(i.method, i.id, t.local[i.method], i.params);
                            else {
                                var u = s[i.id];
                                i.error ? u.error && u.error(i.error) : u.success && u.success(i.result), delete s[i.id]
                            }
                        },
                        init: function () {
                            if (t.remote) for (var r in t.remote) t.remote.hasOwnProperty(r) && (e[r] = u(t.remote[r], r));
                            n.down.init()
                        },
                        destroy: function () {
                            for (var r in t.remote) t.remote.hasOwnProperty(r) && e.hasOwnProperty(r) && delete e[r];
                            n.down.destroy()
                        }
                    }
                }, o.easyXDM = p
            }(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent),
            function (e, t, n, r) {
                e.fn.caret = function (i, s) {
                    var o, u, a = this[0],
                        f = e.browser.msie;
                    if (typeof i == "object" && typeof i.start == "number" && typeof i.end == "number") o = i.start, u = i.end;
                    else if (typeof i == "number" && typeof s == "number") o = i, u = s;
                    else if (typeof i == "string")(o = a.value.indexOf(i)) > -1 ? u = o + i[t] : o = null;
                    else if (Object.prototype.toString.call(i) === "[object RegExp]") {
                        var l = i.exec(a.value);
                        l != null && (o = l.index, u = o + l[0][t])
                    }
                    if (typeof o != "undefined") {
                        if (f) {
                            var c = this[0].createTextRange();
                            c.collapse(!0), c.moveStart("character", o), c.moveEnd("character", u - o), c.select()
                        } else this[0].selectionStart = o, this[0].selectionEnd = u;
                        return this[0].focus(), this
                    }
                    if (f) {
                        var h = document.selection,
                            p, d, v, m;
                        if (this[0].tagName.toLowerCase() != "textarea") {
                            var g = this.val();
                            p = h[n]()[r](), p.moveEnd("character", g[t]), v = p.text == "" ? g[t] : g.lastIndexOf(p.text), p = h[n]()[r](), p.moveStart("character", -g[t]), m = p.text[t]
                        } else p = h[n](), d = p[r](), d.moveToElementText(this[0]), d.setEndPoint("EndToEnd", p), v = d.text[t] - p.text[t], m = v + p.text[t]
                    } else v = a.selectionStart, m = a.selectionEnd;
                    var y = a.value.substring(v, m);
                    return {
                        start: v,
                        end: m,
                        text: y,
                        replace: function (e) {
                            return a.value.substring(0, v) + e + a.value.substring(m, a.value[t])
                        }
                    }
                }
            }(jQuery, "length", "createRange", "duplicate"),
            function (e, t) {
                e.fn.allParents = function () {
                    if (!this.length) return e([]);
                    var n = e(this[0]),
                        r = n.parents(),
                        i = n[0].ownerDocument;
                    while (i !== t) {
                        var s = i.parentWindow || i.defaultView,
                            o = s.frameElement;
                        r.push(o), Array.prototype.push.apply(r, e(o).parents().toArray()), i = o.ownerDocument
                    }
                    return r
                }
            }(jQuery, document),
            function (e, t) {
                e.fn.bgPosition = function () {
                    return t.defaultView && t.defaultView.getComputedStyle ? this.css("background-position") : !this[0] || !this[0].currentStyle ? "0 0" : this[0].currentStyle.backgroundPositionX + " " + this[0].currentStyle.backgroundPositionY
                }
            }(jQuery, document),
            function (e, t) {
                t.htmlEncode = function (e) {
                    return t("<div/>").text(e || "").html()
                }, t.htmlDecode = function (e) {
                    return t("<div/>").html(e || "").text()
                }
            }(window, jQuery),
            function (e) {
                function t(e) {
                    return function (t) {
                        e ? t.stopImmediatePropagation() : t.stopPropagation()
                    }
                }
                var n = ["click", "mouseup", "mousedown", "dblclick"];
                e.fn.stopPropagation = function (e, r) {
                    var i = t( !! e),
                        s = (r || []).concat(n);
                    return this.on(s.join(" "), i)
                }
            }(jQuery),
            function (e) {
                var t = "clipboard_left",
                    n = "clipboard_top";
                e.fn.trueCoordinates = function (e) {
                    return e ? (this.attr(t, e.left).attr(n, e.top), this) : {
                        left: parseFloat(this.attr(t)),
                        top: parseFloat(this.attr(n))
                    }
                }, e.fn.removeTrueCoordinates = function () {
                    return this.removeAttr(t).removeAttr(n)
                }
            }(jQuery),
            function (e, t) {
                e.fn.trueOffset = function () {
                    function r(t) {
                        var n = e(t.documentElement).scrollTop(),
                            r = e(t.documentElement).scrollLeft();
                        if (n || r) return {
                                top: n,
                                left: r
                        };
                        var i = e(t.body).scrollTop(),
                            s = e(t.body).scrollLeft();
                        return i || s ? {
                            top: i,
                            left: s
                        } : {
                            top: e(t).scrollTop(),
                            left: e(t).scrollLeft()
                        }
                    }
                    var n = this.offset(),
                        i = this[0].ownerDocument;
                    while (i !== t) {
                        var s = r(i);
                        n.left -= s.left, n.top -= s.top;
                        var o = i.parentWindow || i.defaultView,
                            u = o.frameElement,
                            a = e(u).offset();
                        n.left += a.left, n.top += a.top, i = u.ownerDocument
                    }
                    return n
                }
            }(jQuery, document),
            function (e, t) {
                var n = e.CLIPBOARD || (e.CLIPBOARD = {});
                n.cssReset = {
                    shared: {
                        "background-image": "none",
                        "background-origin": "padding-box",
                        "background-size": "auto",
                        "border-spacing": "0",
                        border: "0 solid black",
                        "border-image": "none",
                        bottom: "auto",
                        clear: "none",
                        color: "#444444",
                        content: "normal",
                        crop: "auto",
                        cursor: "auto",
                        direction: "ltr",
                        "float": "none",
                        "font-family": '"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        "font-size": "14px",
                        "font-size-adjust": "none",
                        "font-stretch": "normal",
                        "font-style": "normal",
                        "font-variant": "normal",
                        "font-weight": "normal",
                        height: "auto",
                        left: "auto",
                        "letter-spacing": "normal",
                        "line-break": "auto",
                        "line-height": "normal",
                        "margin-bottom": "0",
                        "margin-left": "0",
                        "margin-right": "0",
                        "margin-top": "0",
                        "max-height": "none",
                        "max-width": "none",
                        "min-height": "0",
                        "min-width": "0",
                        "outline-color": "invert",
                        "outline-style": "none",
                        "outline-width": "medium",
                        "overflow-wrap": "normal",
                        "padding-bottom": "0",
                        "padding-left": "0",
                        "padding-right": "0",
                        "padding-top": "0",
                        position: "static",
                        quotes: "none",
                        right: "auto",
                        "text-autospace": "none",
                        "text-decoration": "none",
                        "text-indent": "0",
                        "text-outline": "none",
                        "text-overflow": "clip",
                        "text-shadow": "none",
                        "text-transform": "none",
                        "text-wrap": "none",
                        top: "auto",
                        "unicode-bidi": "normal",
                        visibility: "visible",
                        "white-space": "normal",
                        width: "auto",
                        "word-break": "normal",
                        "word-spacing": "normal",
                        "z-index": "auto"
                    },
                    block: {
                        display: "block",
                        overflow: "visible",
                        "overflow-clip": "auto",
                        "overflow-style": "auto",
                        "overflow-x": "visible",
                        "overflow-y": "visible",
                        "text-align": "left",
                        widows: "2"
                    },
                    inline: {
                        display: "inline",
                        "vertical-align": "baseline"
                    },
                    table: {
                        "border-collapse": "separate",
                        "table-layout": "auto",
                        display: "table"
                    },
                    tableCell: {
                        "empty-cells": "show",
                        "vertical-align": "baseline",
                        display: "table-cell"
                    },
                    tableRow: {
                        display: "table-row"
                    },
                    list: {
                        "list-style-image": "none",
                        "list-style-position": "outside",
                        "list-style-type": "disc"
                    },
                    link: {
                        cursor: "pointer"
                    },
                    listItem: {
                        display: "list-item"
                    },
                    select: {
                        display: "inline-block",
                        border: "1px solid inherit",
                        color: "black",
                        "background-color": "white",
                        cursor: "default",
                        "border-radius": "5px",
                        "font-size": "13px",
                        outline: "none",
                        "vertical-align": "baseline",
                        "font-family": "inherit",
                        "font-style": "inherit"
                    },
                    textInput: {
                        cursor: "text"
                    }
                };
                var r = ["moz", "webkit", "o", "ms"],
                    i = {
                        "border-top-left-radius": 0,
                        "border-top-right-radius": 0,
                        "border-bottom-left-radius": 0,
                        "border-bottom-right-radius": 0,
                        "box-shadow": "none",
                        "box-sizing": "content-box"
                    };
                for (var s in i) {
                    n.cssReset.shared[s] = i[s];
                    for (var o = 0; o < r.length; o++) {
                        if (!i.hasOwnProperty(s)) continue;
                        n.cssReset.shared["-" + r[o] + "-" + s] = i[s]
                    }
                }
                var u = typeof t.documentElement.style.opacity != "undefined";
                u && (n.cssReset.shared.opacity = "1", n.cssReset.shared["background-color"] = "transparent", n.cssReset.shared["background-attachment"] = "scroll", n.cssReset.shared["background-position"] = "0 0", n.cssReset.shared["background-image"] = "none", n.cssReset.shared["background-repeat"] = "repeat")
            }(window, document),
            function (e, t) {
                function r(e, t, n) {
                    var r = e.constructor,
                        i = {
                            notImportant: !n
                        };
                    for (var s = 0; s < e.length; s++) for (var o in t) {
                            if (!t.hasOwnProperty(o)) continue;
                            r.style(e[s], o, t[o], i)
                    }
                }
                var n = e.CLIPBOARD.cssReset;
                t.fn.applyBlockStyles = function () {
                    var e = t.extend({}, n.shared, n.block);
                    return r(this, e, !1), this
                }, t.fn.applyInlineStyles = function () {
                    var e = t.extend({}, n.shared, n.inline);
                    return r(this, e, !1), this
                }, t.fn.applyTableStyles = function () {
                    return this.applyBlockStyles(), r(this, n.table, !1), this
                }, t.fn.applyTableCellStyles = function () {
                    return this.applyBlockStyles(), r(this, n.tableCell, !1), this
                }, t.fn.applyTableRowStyles = function () {
                    return this.applyBlockStyles(), r(this, n.tableRow, !1), this
                }, t.fn.applyListStyles = function () {
                    return this.applyBlockStyles(), r(this, n.list, !1), this
                }, t.fn.applyLinkStyles = function () {
                    return this.applyInlineStyles(), r(this, n.link, !1), this
                }, t.fn.applyListItemStyles = function () {
                    return this.applyBlockStyles(), r(this, n.listItem, !1), this
                }, t.fn.applyTextInputStyles = function () {
                    return this.applyInlineStyles(), r(this, n.textInput, !1), this
                }, t.fn.applySelectStyles = function () {
                    return this.applyInlineStyles(), r(this, n.select, !1), this
                }, t.fn.cssImportant = function (e, t) {
                    return this.css(e, t, !0)
                }
            }(window, jQuery),
            function (e) {
                e.fn.words = function () {
                    var t = [];
                    return this.each(function () {
                        if (this.nodeType === 3) t.push(this.nodeValue.replace(/\s+/g, " "));
                        else if (this.nodeType === 1) {
                            var n = {
                                style: 1,
                                script: 1,
                                embbed: 1
                            };
                            if (this.nodeName.toLowerCase() in n) return "";
                            var r = this.childNodes;
                            if (r && r.length) for (var i = 0, s = r.length; i < s; i++) {
                                    var o = r[i];
                                    if (!o) continue;
                                    t.push(" " + e(o).words())
                            }
                        }
                    }), t.join("").replace(/\s+/g, " ")
                }
            }(jQuery),
            function () {
                function f(e) {
                    return e < 10 ? "0" + e : e
                }
                function quote(e) {
                    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                        var t = meta[e];
                        return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + e + '"'
                }
                function str(e, t) {
                    var n, r, i, s, o = gap,
                        u, a = t[e];
                    a && typeof a == "object" && typeof a.toJSON == "function" && Object.prototype.toString.apply(a) !== "[object Array]" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
                    switch (typeof a) {
                    case "string":
                        return quote(a);
                    case "number":
                        return isFinite(a) ? String(a) : "null";
                    case "boolean":
                    case "null":
                        return String(a);
                    case "object":
                        if (!a) return "null";
                        gap += indent, u = [];
                        if (Object.prototype.toString.apply(a) === "[object Array]") {
                            s = a.length;
                            for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                            return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                        }
                        if (rep && typeof rep == "object") {
                            s = rep.length;
                            for (n = 0; n < s; n += 1) r = rep[n], typeof r == "string" && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                        } else for (r in a) Object.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                        return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
                    }
                }
                typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
                    return this.valueOf()
                });
                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    gap, indent, meta = {
                        "\b": "\\b",
                        "	": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    }, rep;
                typeof window.CLIPBOARD.JSON.stringify != "function" && (window.CLIPBOARD.JSON.stringify = function (e, t, n) {
                    var r;
                    gap = "", indent = "";
                    if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " ";
                    else typeof n == "string" && (indent = n);
                    rep = t;
                    if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                            "": e
                        });
                    throw new Error("JSON.stringify")
                }), typeof window.CLIPBOARD.JSON.parse != "function" && (window.CLIPBOARD.JSON.parse = function (text, reviver) {
                    function walk(e, t) {
                        var n, r, i = e[t];
                        if (i && typeof i == "object") for (n in i) Object.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                        return reviver.call(e, t, i)
                    }
                    var j;
                    text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }));
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                            "": j
                        }, "") : j;
                    throw new SyntaxError("JSON.parse")
                })
            }()
        }(), this.bodyOffset = cache.bodyOffset = getBodyOffset(this.$), this.xdm = cache.xdm = window.easyXDM, this.domain !== window.location.host && (this.xdm = this.xdm.noConflict(client.util.idSuffix));
        var inlinedCss = ".clearfix {\n  *zoom: 1;\n}\n.clearfix:before,\n.clearfix:after {\n  display: table;\n  content: \"\";\n  line-height: 0;\n}\n.clearfix:after {\n  clear: both;\n}\n.hide-text {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.input-block-level {\n  display: block;\n  width: 100%;\n  min-height: 30px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(##STATICBASEURL##/images/opensans-bold-2.woff) format('woff');\n}\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Open Sans Light'), local('OpenSans-Light'), url(##STATICBASEURL##/images/opensans-light-2.woff) format('woff');\n}\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 600;\n  src: local('Open Sans Semibold'), local('OpenSans-Semibold'), url(##STATICBASEURL##/images/opensans-semibold-2.woff) format('woff');\n}\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Open Sans'), local('OpenSans'), url(##STATICBASEURL##/images/opensans-2.woff) format('woff');\n}\n.autocomplete-me-wrapper {\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  z-index: 2147483647 !important;\n  border: 1px solid #CCCCCC !important;\n  border-bottom-left-radius: 5px !important;\n  border-bottom-right-radius: 5px !important;\n  overflow: hidden !important;\n  -webkit-box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3) !important;\n  -moz-box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3) !important;\n  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3) !important;\n  background-color: white !important;\n}\n.autocomplete-me-wrapper ul {\n  list-style: none !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n.autocomplete-me-wrapper li {\n  color: #459cb9 !important;\n  padding: 5px !important;\n  cursor: pointer !important;\n  font-size: 14px !important;\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n}\n.autocomplete-me-wrapper li.autocomplete-me-selected {\n  background-color: #cccccc !important;\n  background-image: -moz-linear-gradient(top, #cccccc, #a6a6a6) !important;\n  background-image: -webkit-linear-gradient(top, #cccccc, #a6a6a6) !important;\n  background-image: linear-gradient(top, #cccccc, #a6a6a6) !important;\n  color: #fafafa !important;\n  text-shadow: 1px 1px 2px rgba(98, 98, 98, 0.71) !important;\n}\n.autocomplete-me-inverted {\n  border-radius: 5px 5px 0 0 !important;\n  -webkit-box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.3) !important;\n  -moz-box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.3) !important;\n  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.3) !important;\n}\n.autocomplete_user_314159265 img,\n.autocomplete_board_314159265 img,\n.autocomplete_user_314159265 i,\n.autocomplete_board_314159265 i {\n  float: left !important;\n  width: 30px !important;\n  height: 30px !important;\n  cursor: pointer !important;\n}\n.autocomplete_user_314159265 div,\n.autocomplete_board_314159265 div {\n  line-height: 30px !important;\n  margin-left: 35px !important;\n  color: #459cb9 !important;\n}\n.autocomplete_user_314159265 .autocomplete_userRealName_314159265,\n.autocomplete_board_314159265 .autocomplete_userRealName_314159265 {\n  color: #666666 !important;\n  margin-left: 5px !important;\n}\n.autocomplete_user_314159265.autocomplete-me-selected div,\n.autocomplete_board_314159265.autocomplete-me-selected div,\n.autocomplete_user_314159265.autocomplete-me-selected .autocomplete_userRealName_314159265,\n.autocomplete_board_314159265.autocomplete-me-selected .autocomplete_userRealName_314159265 {\n  color: #fafafa !important;\n  text-shadow: 1px 1px 2px rgba(98, 98, 98, 0.71) !important;\n  cursor: pointer !important;\n}\n.clipping_314159265 {\n  font-family: times, serif;\n  font-size: 16px;\n  font-weight: normal;\n  font-style: normal;\n  color: black;\n  line-height: normal;\n  margin: 0;\n  padding: 0;\n}\n.clipping_314159265 td {\n  font-size: 16px;\n}\n.clipping_314159265 * {\n  color: black;\n  font: inherit;\n  border: 0;\n}\n.clipping_314159265 a {\n  text-decoration: none;\n}\n.clipping_314159265 html,\n.clipping_314159265 address,\n.clipping_314159265 blockquote,\n.clipping_314159265 body,\n.clipping_314159265 dd,\n.clipping_314159265 div,\n.clipping_314159265 dl,\n.clipping_314159265 dt,\n.clipping_314159265 fieldset,\n.clipping_314159265 form,\n.clipping_314159265 frame,\n.clipping_314159265 frameset,\n.clipping_314159265 h1,\n.clipping_314159265 h2,\n.clipping_314159265 h3,\n.clipping_314159265 h4,\n.clipping_314159265 h5,\n.clipping_314159265 h6,\n.clipping_314159265 noframes,\n.clipping_314159265 ol,\n.clipping_314159265 p,\n.clipping_314159265 ul,\n.clipping_314159265 center,\n.clipping_314159265 dir,\n.clipping_314159265 hr,\n.clipping_314159265 menu,\n.clipping_314159265 pre {\n  display: block;\n}\n.clipping_314159265 div {\n  text-align: left;\n}\n.clipping_314159265 li {\n  display: list-item;\n  list-style: none;\n  list-style-type: none;\n}\n.clipping_314159265 head {\n  display: none;\n}\n.clipping_314159265 table {\n  display: table;\n  table-layout: fixed;\n}\n.clipping_314159265 tr {\n  display: table-row;\n}\n.clipping_314159265 thead {\n  display: table-header-group;\n}\n.clipping_314159265 tbody {\n  display: table-row-group;\n}\n.clipping_314159265 tfoot {\n  display: table-footer-group;\n}\n.clipping_314159265 col {\n  display: table-column;\n}\n.clipping_314159265 colgroup {\n  display: table-column-group;\n}\n.clipping_314159265 td,\n.clipping_314159265 th {\n  display: table-cell;\n}\n.clipping_314159265 caption {\n  display: table-caption;\n}\n.clipping_314159265 th {\n  font-weight: bolder;\n  text-align: center;\n}\n.clipping_314159265 caption {\n  text-align: center;\n}\n.clipping_314159265 h1 {\n  font-size: 2em;\n  margin: .67em 0;\n}\n.clipping_314159265 h2 {\n  font-size: 1.5em;\n  margin: .75em 0;\n}\n.clipping_314159265 h3 {\n  font-size: 1.17em;\n  margin: .83em 0;\n}\n.clipping_314159265 h4,\n.clipping_314159265 p,\n.clipping_314159265 blockquote,\n.clipping_314159265 ul,\n.clipping_314159265 fieldset,\n.clipping_314159265 form,\n.clipping_314159265 ol,\n.clipping_314159265 dl,\n.clipping_314159265 dir,\n.clipping_314159265 menu {\n  margin: 1.12em 0;\n}\n.clipping_314159265 h5 {\n  font-size: .83em;\n  margin: 1.5em 0;\n}\n.clipping_314159265 h6 {\n  font-size: .75em;\n  margin: 1.67em 0;\n}\n.clipping_314159265 h1,\n.clipping_314159265 h2,\n.clipping_314159265 h3,\n.clipping_314159265 h4,\n.clipping_314159265 h5,\n.clipping_314159265 h6,\n.clipping_314159265 b,\n.clipping_314159265 strong {\n  font-weight: bolder;\n}\n.clipping_314159265 blockquote {\n  margin-left: 40px;\n  margin-right: 40px;\n}\n.clipping_314159265 i,\n.clipping_314159265 cite,\n.clipping_314159265 em,\n.clipping_314159265 var,\n.clipping_314159265 address {\n  font-style: italic;\n  font-weight: normal;\n}\n.clipping_314159265 pre,\n.clipping_314159265 tt,\n.clipping_314159265 code,\n.clipping_314159265 kbd,\n.clipping_314159265 samp {\n  font-family: monospace;\n}\n.clipping_314159265 pre {\n  white-space: pre;\n  background-color: transparent;\n  margin: 0;\n  padding: 0;\n}\n.clipping_314159265 button,\n.clipping_314159265 textarea,\n.clipping_314159265 input,\n.clipping_314159265 select {\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n}\n.clipping_314159265 big {\n  font-size: 1.17em;\n}\n.clipping_314159265 small,\n.clipping_314159265 sub,\n.clipping_314159265 sup {\n  font-size: .83em;\n}\n.clipping_314159265 sub {\n  vertical-align: sub;\n}\n.clipping_314159265 sup {\n  vertical-align: super;\n}\n.clipping_314159265 table {\n  border-spacing: 2px;\n}\n.clipping_314159265 thead,\n.clipping_314159265 tbody,\n.clipping_314159265 tfoot {\n  vertical-align: middle;\n}\n.clipping_314159265 td,\n.clipping_314159265 th,\n.clipping_314159265 tr {\n  vertical-align: inherit;\n}\n.clipping_314159265 s,\n.clipping_314159265 strike,\n.clipping_314159265 del {\n  text-decoration: line-through;\n}\n.clipping_314159265 hr {\n  border: none;\n}\n.clipping_314159265 ol,\n.clipping_314159265 ul,\n.clipping_314159265 dir,\n.clipping_314159265 menu,\n.clipping_314159265 dd {\n  margin-left: 40px;\n}\n.clipping_314159265 ol {\n  list-style-type: decimal;\n}\n.clipping_314159265 ul,\n.clipping_314159265 ol {\n  margin: 0;\n  padding: 0;\n}\n.clipping_314159265 u,\n.clipping_314159265 ins {\n  text-decoration: underline;\n}\n.clipping_314159265 br:before {\n  content: \"\\A\";\n  white-space: pre-line;\n}\n.clipping_314159265 center {\n  text-align: center;\n}\n.clipping_314159265 img {\n  border: 0;\n}\n.boardPicker_clipboard_314159265 {\n  position: relative !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_caret_clipboard_314159265 {\n  border-left: 4px solid transparent !important;\n  border-right: 4px solid transparent !important;\n  border-top: 4px solid #000000 !important;\n  content: \"\" !important;\n  display: inline-block !important;\n  height: 0 !important;\n  vertical-align: top !important;\n  width: 0 !important;\n  position: absolute !important;\n  top: 13px !important;\n  right: 7px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #333333 !important;\n  text-shadow: 0 1px 0 #e7e6e3 !important;\n  background-color: #eeeeee !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eeeeee), color-stop(100%, #c3c3c3)) !important;\n  background-image: -webkit-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -o-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  border-color: #c3c3c3 #c3c3c3 #9d9d9d !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  height: 28px !important;\n  width: 135px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265:hover,\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265:active,\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265.active,\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265.disabled,\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265[disabled] {\n  color: #333333 !important;\n  background-color: #c3c3c3 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265:active,\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265.active {\n  background-color: #aaaaaa  !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265 span {\n  width: 100px !important;\n  display: inline-block !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n  white-space: nowrap !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265 span,\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265 i {\n  cursor: pointer !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_button_clipboard_314159265 .boardPicker_focusable_clipboard_314159265 {\n  position: absolute !important;\n  left: -999999px !important;\n  padding: 0 !important;\n  margin: 0 !important;\n  border: none !important;\n  background-color: transparent !important;\n  background-image: none !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_flyout_clipboard_314159265 {\n  position: absolute !important;\n  padding: 5px !important;\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  border: 1px solid rgba(0, 0, 0, 0.2) !important;\n  background-color: #ffffff !important;\n  color: #444444 !important;\n  font-size: 13px !important;\n  width: 190px !important;\n  -webkit-border-radius: 2px !important;\n  -moz-border-radius: 2px !important;\n  border-radius: 2px !important;\n  top: 29px !important;\n  right: 0 !important;\n  height: 225px !important;\n  overflow: auto !important;\n  z-index: 1 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_hud_clipboard_314159265 {\n  position: absolute !important;\n  left: -53px !important;\n  text-align: center !important;\n  width: 171px !important;\n  margin: 0 auto !important;\n  z-index: 2 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_hud_clipboard_314159265 span {\n  color: white !important;\n  text-shadow: 1px 1px 2px rgba(128, 128, 128, 0.5) !important;\n  font-size: 16px !important;\n  padding: 5px 10px !important;\n  background-color: black !important;\n  border-radius: 3px !important;\n  display: inline-block !important;\n  white-space: pre !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_flyoutForm_clipboard_314159265 {\n  overflow: visible !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 {\n  list-style: none !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li {\n  position: relative !important;\n  cursor: pointer !important;\n  padding: 3px 25px !important;\n  border: 1px solid transparent !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n  white-space: nowrap !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li.boardPicker_selectable_clipboard_314159265.boardPicker_selected_clipboard_314159265 {\n  background-color: #c6e2f0 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li.boardPicker_selectable_clipboard_314159265.boardPicker_highlighted_clipboard_314159265,\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li.boardPicker_selectable_clipboard_314159265:hover {\n  border-color: #e7983b !important;\n  background-color: #f2c896 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li .boardPicker_icon_clipboard_314159265,\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li .boardPicker_sharedIcon_clipboard_314159265 {\n  position: absolute !important;\n  top: 3px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li .boardPicker_icon_clipboard_314159265 {\n  left: 5px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 li .boardPicker_sharedIcon_clipboard_314159265 {\n  right: 5px !important;\n  top: 6px !important;\n  display: inline-block !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/image-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -671px 0 !important;\n  width: 16px !important;\n  height: 11px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 .boardPicker_addBoard_clipboard_314159265 {\n  padding-top: 5px !important;\n  padding-bottom: 5px !important;\n  color: #459cb9 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 .boardPicker_addBoard_clipboard_314159265:hover {\n  background-color: transparent !important;\n  text-decoration: underline !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 .boardPicker_addBoard_clipboard_314159265 .boardPicker_icon_clipboard_314159265 {\n  display: inline-block !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/image-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  top: 8px !important;\n  background-position: -598px 0 !important;\n  width: 17px !important;\n  height: 13px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 .boardPicker_private_clipboard_314159265 {\n  display: inline-block !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/image-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -51px -69px !important;\n  width: 12px !important;\n  height: 17px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 .boardPicker_listHeader_clipboard_314159265 {\n  cursor: default !important;\n  font-size: 11px !important;\n  color: #b3b3b3 !important;\n  padding-left: 5px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_list_clipboard_314159265 .boardPicker_listHeader_clipboard_314159265:hover {\n  background-color: transparent !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_separator_clipboard_314159265 {\n  border-bottom: 1px dashed #cccccc !important;\n  padding: 0 !important;\n  margin: 2px 0 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_helpIcon_clipboard_314159265 {\n  position: relative !important;\n  top: 2px !important;\n  margin-left: 5px !important;\n  cursor: help !important;\n  display: inline-block !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/image-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -181px -20px !important;\n  width: 15px !important;\n  height: 15px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 label {\n  display: block !important;\n  color: #888888 !important;\n  margin: 18px 0 5px 0 !important;\n  cursor: default !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 label:first-child {\n  margin-top: 0 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 input[type=\"text\"] {\n  width: 100% !important;\n  height: auto !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  margin: 0 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_addMemberLink_clipboard_314159265 {\n  margin: 0 5px 5px 5px !important;\n  color: #459cb9 !important;\n  cursor: pointer !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_addMemberLink_clipboard_314159265:hover {\n  text-decoration: underline !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_newBoardName_clipboard_314159265 {\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  background-color: #FFFFFF !important;\n  border: 1px solid #cccccc !important;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset !important;\n  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset !important;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset !important;\n  -webkit-border-radius: 3px !important;\n  -moz-border-radius: 3px !important;\n  border-radius: 3px !important;\n  padding: 4px 6px !important;\n  font-size: 13px !important;\n  margin-bottom: 0 !important;\n  height: 18px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_newBoardName_clipboard_314159265:hover,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_newBoardName_clipboard_314159265:focus {\n  border-color: rgba(82, 168, 236, 0.8) !important;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6) !important;\n  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6) !important;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6) !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_newBoardName_clipboard_314159265:-moz-placeholder {\n  color: #aaaaaa !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_newBoardName_clipboard_314159265::-webkit-input-placeholder {\n  color: #aaaaaa !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_validationError_clipboard_314159265,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_validationError_clipboard_314159265.boardPicker_newBoardName_clipboard_314159265:hover,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_validationError_clipboard_314159265.boardPicker_newBoardName_clipboard_314159265:focus,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_validationError_clipboard_314159265.boardPicker_newBoardName_clipboard_314159265:active {\n  border-color: #c94928 !important;\n  -webkit-box-shadow: 0 0 5px #c94928 !important;\n  -moz-box-shadow: 0 0 5px #c94928 !important;\n  box-shadow: 0 0 5px #c94928 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 {\n  position: absolute !important;\n  bottom: 10px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_cancelButton_clipboard_314159265 {\n  width: 60px !important;\n  text-align: center !important;\n  float: left !important;\n  padding: 4px 14px !important;\n  color: #888888 !important;\n  cursor: pointer !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_cancelButton_clipboard_314159265:hover {\n  color: #f26531 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_cancelButton_clipboard_314159265.boardPicker_hide_clipboard_314159265 {\n  visibility: hidden !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #ffffff !important;\n  text-shadow: 0 -1px 0 #4e810f !important;\n  background-color: #ace066 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ace066), color-stop(100%, #6ba326)) !important;\n  background-image: -webkit-linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  background-image: -o-linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  background-image: linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ace066', endColorstr='#6ba326',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ace066', endColorstr='#6ba326',GradientType=0); !important;\n  border-color: #6ba326 #6ba326 #426518 !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  margin-left: 10px !important;\n  float: left !important;\n  width: 60px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265:hover,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265:active,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265.active,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265.disabled,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265[disabled] {\n  color: #ffffff !important;\n  background-color: #6ba326 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265:active,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_saveButton_clipboard_314159265.active {\n  background-color: #507a1c  !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #ffffff !important;\n  text-shadow: 0 -1px 0 #b85119 !important;\n  background-color: #eaa452 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eaa452), color-stop(100%, #d26718)) !important;\n  background-image: -webkit-linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  background-image: -o-linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  background-image: linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eaa452', endColorstr='#d26718',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eaa452', endColorstr='#d26718',GradientType=0); !important;\n  border-color: #d26718 #d26718 #8d4510 !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265:hover,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265:active,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265.active,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265.disabled,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265[disabled] {\n  color: #ffffff !important;\n  background-color: #d26718 !important;\n}\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265:active,\n.boardPicker_clipboard_314159265 .boardPicker_addBoardForm_clipboard_314159265 .boardPicker_buttonContainer_clipboard_314159265 .boardPicker_errorButton_clipboard_314159265.active {\n  background-color: #a45113  !important;\n}\n.boardPicker_memberForm_clipboard_314159265 {\n  position: fixed !important;\n  top: 50% !important;\n  margin-top: -200px !important;\n  left: 50% !important;\n  margin-left: -300px !important;\n  width: 550px !important;\n  background-color: #fcfcfc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #fcfcfc 0%, #f0f0ee 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fcfcfc), color-stop(100%, #f0f0ee)) !important;\n  background-image: -webkit-linear-gradient(top, #fcfcfc 0%, #f0f0ee 100%) !important;\n  background-image: -o-linear-gradient(top, #fcfcfc 0%, #f0f0ee 100%) !important;\n  background-image: linear-gradient(top, #fcfcfc 0%, #f0f0ee 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#f0f0ee',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#f0f0ee',GradientType=0); !important;\n  border: 1px solid #cccccc !important;\n  border-top: 1px solid white !important;\n  border-bottom: 1px solid #b3b3b3 !important;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5) !important;\n  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5) !important;\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5) !important;\n  color: #444444 !important;\n  z-index: 214748367 !important;\n  padding: 10px 25px !important;\n  -webkit-border-radius: 3px !important;\n  -moz-border-radius: 3px !important;\n  border-radius: 3px !important;\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n  font-size: 13px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_formBlock_clipboard_314159265 {\n  clear: both !important;\n}\n.boardPicker_memberForm_clipboard_314159265 h2 {\n  margin: 0 0 10px 0 !important;\n  font-size: 24px !important;\n  font-weight: 600 !important;\n  line-height: 40px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 img {\n  vertical-align: middle !important;\n}\n.boardPicker_memberForm_clipboard_314159265 ul {\n  list-style: none !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n.boardPicker_memberForm_clipboard_314159265 ul li {\n  padding: 8px !important;\n  line-height: 18px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 ul li:after {\n  clear: both !important;\n  content: \"\" !important;\n  display: block !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberFormError_clipboard_314159265 {\n  position: absolute !important;\n  right: 25px !important;\n  width: 350px !important;\n  top: 16px !important;\n  padding: 5px 10px !important;\n  color: #c94928 !important;\n  background-color: #fdf5f3 !important;\n  border: 1px solid #c94928 !important;\n  overflow: hidden !important;\n  text-align: center !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_avatar_clipboard_314159265 {\n  -webkit-border-radius: 2px !important;\n  -moz-border-radius: 2px !important;\n  border-radius: 2px !important;\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  max-height: 32px !important;\n  max-width: 32px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 {\n  max-height: 325px !important;\n  overflow: auto !important;\n  padding-top: 10px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover {\n  background-color: #eeeeee !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #eeeeee 0%, #dddddd 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eeeeee), color-stop(100%, #dddddd)) !important;\n  background-image: -webkit-linear-gradient(top, #eeeeee 0%, #dddddd 100%) !important;\n  background-image: -o-linear-gradient(top, #eeeeee 0%, #dddddd 100%) !important;\n  background-image: linear-gradient(top, #eeeeee 0%, #dddddd 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd',GradientType=0); !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #ffffff !important;\n  text-shadow: 0 -1px 0 #b85119 !important;\n  background-color: #eaa452 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eaa452), color-stop(100%, #d26718)) !important;\n  background-image: -webkit-linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  background-image: -o-linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  background-image: linear-gradient(top, #eaa452 0%, #d26718 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eaa452', endColorstr='#d26718',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eaa452', endColorstr='#d26718',GradientType=0); !important;\n  border-color: #d26718 #d26718 #8d4510 !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265:hover,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265:active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265.active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265.disabled,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265[disabled] {\n  color: #ffffff !important;\n  background-color: #d26718 !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265:active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberList_clipboard_314159265 li:hover .boardPicker_pendingInvite_clipboard_314159265.active {\n  background-color: #a45113  !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #333333 !important;\n  text-shadow: 0 1px 0 #e7e6e3 !important;\n  background-color: #eeeeee !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eeeeee), color-stop(100%, #c3c3c3)) !important;\n  background-image: -webkit-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -o-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  border-color: #c3c3c3 #c3c3c3 #9d9d9d !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265:hover,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265:active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265.active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265.disabled,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265[disabled] {\n  color: #333333 !important;\n  background-color: #c3c3c3 !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265:active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265.active {\n  background-color: #aaaaaa  !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_username_clipboard_314159265 {\n  margin-left: 5px !important;\n  display: inline-block !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n  white-space: nowrap !important;\n  max-width: 375px !important;\n  position: relative !important;\n  top: 5px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 {\n  border-top: 1px dashed #cccccc !important;\n  padding-top: 10px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265:after {\n  display: block !important;\n  content: \"\" !important;\n  clear: both !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #ffffff !important;\n  text-shadow: 0 -1px 0 #296898 !important;\n  background-color: #86c4e0 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #86c4e0), color-stop(100%, #3174a8)) !important;\n  background-image: -webkit-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: -o-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#86c4e0', endColorstr='#3174a8',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#86c4e0', endColorstr='#3174a8',GradientType=0); !important;\n  border-color: #3174a8 #3174a8 #204b6d !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  float: right !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265:hover,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265:active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265.active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265.disabled,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265[disabled] {\n  color: #ffffff !important;\n  background-color: #3174a8 !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265:active,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_footer_clipboard_314159265 .boardPicker_closeButton_clipboard_314159265.active {\n  background-color: #255981  !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_status_clipboard_314159265 {\n  margin-top: 2px !important;\n  padding: 4px 14px !important;\n  display: inline-block !important;\n  border: 1px solid transparent !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_userDetails_clipboard_314159265,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberInput_clipboard_314159265 {\n  float: left !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberInput_clipboard_314159265 {\n  background-color: #FFFFFF !important;\n  border: 1px solid #cccccc !important;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset !important;\n  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset !important;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset !important;\n  -webkit-border-radius: 3px !important;\n  -moz-border-radius: 3px !important;\n  border-radius: 3px !important;\n  padding: 4px 6px !important;\n  font-size: 13px !important;\n  margin-bottom: 0 !important;\n  height: 18px !important;\n  width: 428px !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberInput_clipboard_314159265:hover,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberInput_clipboard_314159265:focus {\n  border-color: rgba(82, 168, 236, 0.8) !important;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6) !important;\n  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6) !important;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6) !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberInput_clipboard_314159265:-moz-placeholder {\n  color: #aaaaaa !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_memberInput_clipboard_314159265::-webkit-input-placeholder {\n  color: #aaaaaa !important;\n}\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_inviteButton_clipboard_314159265,\n.boardPicker_memberForm_clipboard_314159265 .boardPicker_status_clipboard_314159265 {\n  float: right !important;\n}\n.boardPicker_memberOverlay_clipboard_314159265 {\n  z-index: 214748366 !important;\n  background-color: #000000 !important;\n  position: fixed !important;\n  left: 0 !important;\n  right: 0 !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  opacity: 0.5 !important;\n  filter: alpha(opacity=50) !important;\n}\n.visibilityPicker_clipboard_314159265 {\n  position: relative !important;\n  z-index: 1000 !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #333333 !important;\n  text-shadow: 0 1px 0 #e7e6e3 !important;\n  background-color: #eeeeee !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eeeeee), color-stop(100%, #c3c3c3)) !important;\n  background-image: -webkit-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -o-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  border-color: #c3c3c3 #c3c3c3 #9d9d9d !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  position: relative !important;\n  width: 80px !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265:hover,\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265:active,\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265.active,\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265.disabled,\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265[disabled] {\n  color: #333333 !important;\n  background-color: #c3c3c3 !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265:active,\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265.active {\n  background-color: #aaaaaa  !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265 span,\n.visibilityPicker_clipboard_314159265 .visibilityPicker_button_clipboard_314159265 i {\n  cursor: pointer !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_flyout_clipboard_314159265 {\n  position: absolute !important;\n  top: 29px !important;\n  min-width: 160px !important;\n  background-color: #ffffff !important;\n  border: 1px solid rgba(0, 0, 0, 0.2) !important;\n  -webkit-box-shadow: 0 5px 10px rgba(0,0,0,.2) !important;\n  -moz-box-shadow: 0 5px 10px rgba(0,0,0,.2) !important;\n  box-shadow: 0 5px 10px rgba(0,0,0,.2) !important;\n  padding: 5px 0 !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_caret_clipboard_314159265 {\n  border-left: 4px solid transparent !important;\n  border-right: 4px solid transparent !important;\n  border-top: 4px solid #000000 !important;\n  content: \"\" !important;\n  display: inline-block !important;\n  height: 0 !important;\n  vertical-align: top !important;\n  width: 0 !important;\n  position: absolute !important;\n  top: 13px !important;\n  right: 7px !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_list_clipboard_314159265 {\n  list-style: none !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_list_clipboard_314159265 li {\n  width: 100% !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  padding: 4px 14px !important;\n  cursor: pointer !important;\n}\n.visibilityPicker_clipboard_314159265 .visibilityPicker_list_clipboard_314159265 li:hover {\n  color: #ffffff !important;\n  background-color: #8ac2e0 !important;\n}\n.boardCreatePage .visibilityPicker_button_clipboard_314159265,\n.boardSettingsPage .visibilityPicker_button_clipboard_314159265 {\n  width: 67px !important;\n}\n.boardCreatePage .visibilityPicker_flyout_clipboard_314159265,\n.boardSettingsPage .visibilityPicker_flyout_clipboard_314159265 {\n  width: 100px !important;\n  min-width: 100px !important;\n}\n#fixedBar_container_clipboard_314159265 {\n  position: fixed !important;\n  opacity: 0 !important;\n  bottom: -500px !important;\n  width: 800px !important;\n  left: 50% !important;\n  margin-left: -401px !important;\n  z-index: 214748365 !important;\n}\n#fixedBar_innerWrap_clipboard_314159265 {\n  position: relative !important;\n  width: 100% !important;\n  height: 40px !important;\n  background-color: #ececec !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #ececec 0%, #b9b9b9 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ececec), color-stop(100%, #b9b9b9)) !important;\n  background-image: -webkit-linear-gradient(top, #ececec 0%, #b9b9b9 100%) !important;\n  background-image: -o-linear-gradient(top, #ececec 0%, #b9b9b9 100%) !important;\n  background-image: linear-gradient(top, #ececec 0%, #b9b9b9 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ececec', endColorstr='#b9b9b9',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ececec', endColorstr='#b9b9b9',GradientType=0); !important;\n  border: 1px solid #aaa !important;\n  border-bottom: none !important;\n  border-top-left-radius: 8px !important;\n  border-top-right-radius: 8px !important;\n  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5) !important;\n  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5) !important;\n  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5) !important;\n}\n#fixedBar_notificationAlert_clipboard_314159265 {\n  padding: 3px 7px !important;\n  left: 130px !important;\n  top: 9px !important;\n  font-size: 11px !important;\n  background-color: #c84828 !important;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25) !important;\n  position: absolute !important;\n  display: none !important;\n  color: #fafafa !important;\n  text-align: center !important;\n  border-radius: 3px !important;\n  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) !important;\n  -moz-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) !important;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) !important;\n  cursor: pointer !important;\n}\n#fixedBar_logo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-sprite.png) !important;\n  background-position: 0px -54px !important;\n  width: 111px !important;\n  height: 19px !important;\n  position: absolute !important;\n  top: 11px !important;\n  left: 13px !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_logo_clipboard_314159265:hover,\n#fixedBar_logo_clipboard_314159265active {\n  opacity: 1 !important;\n}\n.fixedBar_inlineIcon_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-sprite.png) !important;\n  width: 18px !important;\n  height: 18px !important;\n  display: inline-block !important;\n  float: left !important;\n  font-size: 13px !important;\n}\n.fixedBar_sprite_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-sprite.png) !important;\n  width: 18px !important;\n  height: 18px !important;\n  display: inline-block !important;\n  font-size: 13px !important;\n  cursor: pointer !important;\n}\n.fixedBar_buttonLabel_clipboard_314159265 {\n  webkit-user-select: none !important;\n  -khtml-user-select: none !important;\n  -moz-user-select: none !important;\n  -o-user-select: none !important;\n  user-select: none !important;\n  color: #888 !important;\n  font-size: 14px !important;\n  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) !important;\n  padding-left: 4px !important;\n  position: relative !important;\n  top: -4px !important;\n  cursor: pointer !important;\n}\n.activeButtonLabel {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n.hoverButtonLabel {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n.activeMenuItem {\n  background-color: #cbcbcb !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbcbcb), color-stop(100%, #979797)) !important;\n  background-image: -webkit-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -o-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -webkit-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  -moz-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n}\n.hoverMenuItem {\n  background-color: #bcbcbc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #bcbcbc), color-stop(100%, #a9a9a9)) !important;\n  background-image: -webkit-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -o-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n}\n#fixedBar_rectangle_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: 0 -18px !important;\n}\n#fixedBar_rectangle_clipboard_314159265:active,\n.fixedBar_rectangle_clipboard_314159265:active,\n#fixedBar_rectangle_clipboard_314159265.fixedBar_rectangleActive_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265.fixedBar_rectangleActive_clipboard_314159265 {\n  background-color: #cbcbcb !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbcbcb), color-stop(100%, #979797)) !important;\n  background-image: -webkit-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -o-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -webkit-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  -moz-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n}\n#fixedBar_rectangle_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n#fixedBar_rectangle_clipboard_314159265.fixedBar_rectangleActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265.fixedBar_rectangleActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_rectangle_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n#fixedBar_rectangle_clipboard_314159265.fixedBar_rectangleActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265.fixedBar_rectangleActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: 0 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_rectangle_clipboard_314159265:hover,\n.fixedBar_rectangle_clipboard_314159265:hover {\n  background-color: #bcbcbc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #bcbcbc), color-stop(100%, #a9a9a9)) !important;\n  background-image: -webkit-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -o-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n}\n#fixedBar_rectangle_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_rectangle_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265,\n.fixedBar_rectangle_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265 {\n  background-position: 0 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_bookmark_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -18px -18px !important;\n}\n#fixedBar_bookmark_clipboard_314159265:active,\n.fixedBar_bookmark_clipboard_314159265:active,\n#fixedBar_bookmark_clipboard_314159265.fixedBar_bookmarkActive_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265.fixedBar_bookmarkActive_clipboard_314159265 {\n  background-color: #cbcbcb !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbcbcb), color-stop(100%, #979797)) !important;\n  background-image: -webkit-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -o-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -webkit-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  -moz-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n}\n#fixedBar_bookmark_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n#fixedBar_bookmark_clipboard_314159265.fixedBar_bookmarkActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265.fixedBar_bookmarkActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_bookmark_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n#fixedBar_bookmark_clipboard_314159265.fixedBar_bookmarkActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265.fixedBar_bookmarkActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -18px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_bookmark_clipboard_314159265:hover,\n.fixedBar_bookmark_clipboard_314159265:hover {\n  background-color: #bcbcbc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #bcbcbc), color-stop(100%, #a9a9a9)) !important;\n  background-image: -webkit-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -o-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n}\n#fixedBar_bookmark_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_bookmark_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265,\n.fixedBar_bookmark_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265 {\n  background-position: -18px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_image_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_image_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -36px -18px !important;\n}\n#fixedBar_image_clipboard_314159265:active,\n.fixedBar_image_clipboard_314159265:active,\n#fixedBar_image_clipboard_314159265.fixedBar_imageActive_clipboard_314159265,\n.fixedBar_image_clipboard_314159265.fixedBar_imageActive_clipboard_314159265 {\n  background-color: #cbcbcb !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbcbcb), color-stop(100%, #979797)) !important;\n  background-image: -webkit-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -o-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -webkit-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  -moz-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n}\n#fixedBar_image_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_image_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n#fixedBar_image_clipboard_314159265.fixedBar_imageActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_image_clipboard_314159265.fixedBar_imageActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_image_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n.fixedBar_image_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n#fixedBar_image_clipboard_314159265.fixedBar_imageActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_image_clipboard_314159265.fixedBar_imageActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -36px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_image_clipboard_314159265:hover,\n.fixedBar_image_clipboard_314159265:hover {\n  background-color: #bcbcbc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #bcbcbc), color-stop(100%, #a9a9a9)) !important;\n  background-image: -webkit-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -o-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n}\n#fixedBar_image_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_image_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_image_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265,\n.fixedBar_image_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265 {\n  background-position: -36px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_reader_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -72px -18px !important;\n}\n#fixedBar_reader_clipboard_314159265:active,\n.fixedBar_reader_clipboard_314159265:active,\n#fixedBar_reader_clipboard_314159265.fixedBar_readerActive_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265.fixedBar_readerActive_clipboard_314159265 {\n  background-color: #cbcbcb !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbcbcb), color-stop(100%, #979797)) !important;\n  background-image: -webkit-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -o-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -webkit-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  -moz-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n}\n#fixedBar_reader_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n#fixedBar_reader_clipboard_314159265.fixedBar_readerActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265.fixedBar_readerActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_reader_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n#fixedBar_reader_clipboard_314159265.fixedBar_readerActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265.fixedBar_readerActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -72px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_reader_clipboard_314159265:hover,\n.fixedBar_reader_clipboard_314159265:hover {\n  background-color: #bcbcbc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #bcbcbc), color-stop(100%, #a9a9a9)) !important;\n  background-image: -webkit-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -o-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n}\n#fixedBar_reader_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_reader_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265,\n.fixedBar_reader_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265 {\n  background-position: -72px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_text_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_text_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -54px -18px !important;\n}\n#fixedBar_text_clipboard_314159265:active,\n.fixedBar_text_clipboard_314159265:active,\n#fixedBar_text_clipboard_314159265.fixedBar_textActive_clipboard_314159265,\n.fixedBar_text_clipboard_314159265.fixedBar_textActive_clipboard_314159265 {\n  background-color: #cbcbcb !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbcbcb), color-stop(100%, #979797)) !important;\n  background-image: -webkit-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -o-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -webkit-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  -moz-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n}\n#fixedBar_text_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_text_clipboard_314159265:active .fixedBar_buttonLabel_clipboard_314159265,\n#fixedBar_text_clipboard_314159265.fixedBar_textActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_text_clipboard_314159265.fixedBar_textActive_clipboard_314159265 .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_text_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n.fixedBar_text_clipboard_314159265:active .fixedBar_sprite_clipboard_314159265,\n#fixedBar_text_clipboard_314159265.fixedBar_textActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265,\n.fixedBar_text_clipboard_314159265.fixedBar_textActive_clipboard_314159265 .fixedBar_sprite_clipboard_314159265 {\n  background-position: -54px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_text_clipboard_314159265:hover,\n.fixedBar_text_clipboard_314159265:hover {\n  background-color: #bcbcbc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #bcbcbc), color-stop(100%, #a9a9a9)) !important;\n  background-image: -webkit-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: -o-linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  background-image: linear-gradient(top, #bcbcbc 0%, #a9a9a9 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bcbcbc', endColorstr='#a9a9a9',GradientType=0); !important;\n}\n#fixedBar_text_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265,\n.fixedBar_text_clipboard_314159265:hover .fixedBar_buttonLabel_clipboard_314159265 {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_text_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265,\n.fixedBar_text_clipboard_314159265:hover .fixedBar_sprite_clipboard_314159265 {\n  background-position: -54px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_preferences_clipboard_314159265,\n.fixedBar_preferences_clipboard_314159265 {\n  width: 32px !important;\n  background-position: -108px -18px !important;\n}\n#fixedBar_preferences_clipboard_314159265:hover,\n.fixedBar_preferences_clipboard_314159265:hover,\n#fixedBar_preferences_clipboard_314159265:active,\n.fixedBar_preferences_clipboard_314159265:active,\n#fixedBar_preferences_clipboard_314159265.fixedBar_preferencesActive_clipboard_314159265,\n.fixedBar_preferences_clipboard_314159265.fixedBar_preferencesActive_clipboard_314159265 {\n  background-position: -108px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_help_clipboard_314159265,\n.fixedBar_help_clipboard_314159265 {\n  width: 24px !important;\n  background-position: -140px -18px !important;\n}\n#fixedBar_help_clipboard_314159265:hover,\n.fixedBar_help_clipboard_314159265:hover,\n#fixedBar_help_clipboard_314159265:active,\n.fixedBar_help_clipboard_314159265:active,\n#fixedBar_help_clipboard_314159265.fixedBar_helpActive_clipboard_314159265,\n.fixedBar_help_clipboard_314159265.fixedBar_helpActive_clipboard_314159265 {\n  background-position: -140px 0 !important;\n  opacity: 0.75 !important;\n}\n#fixedBar_home_clipboard_314159265,\n.fixedBar_home_clipboard_314159265 {\n  width: 35px !important;\n  background-position: -164px -18px !important;\n}\n#fixedBar_home_clipboard_314159265:hover,\n.fixedBar_home_clipboard_314159265:hover,\n#fixedBar_home_clipboard_314159265:active,\n.fixedBar_home_clipboard_314159265:active,\n#fixedBar_home_clipboard_314159265.fixedBar_homeActive_clipboard_314159265,\n.fixedBar_home_clipboard_314159265.fixedBar_homeActive_clipboard_314159265 {\n  background-position: -164px 0 !important;\n  opacity: 0.75 !important;\n}\n.fixedBar_savedIcon_clipboard_314159265 {\n  width: 26px !important;\n  height: 23px !important;\n  background-position: 0 -72px !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-sprite.png) !important;\n  display: inline-block !important;\n}\n#fixedBar_menu_clipboard_314159265 {\n  padding: 0 !important;\n  position: absolute !important;\n  height: 40px !important;\n  left: 200px !important;\n  right: 200px !important;\n  text-align: center !important;\n}\n#fixedBar_menu_clipboard_314159265 .fixedBar_menuItem_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 10px !important;\n  cursor: pointer !important;\n}\n#fixedBar_bookmarkImage_clipboard_314159265 {\n  top: 35px !important;\n  width: 50px !important;\n  height: 100px !important;\n  padding: 0 !important;\n  margin: 0 !important;\n  border: none !important;\n  z-index: 214748365 !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/image-sprite.png) !important;\n  background-position: 0 0 !important;\n  width: 49px !important;\n  height: 102px !important;\n}\n#fixedBar_rectangleColorList_clipboard_314159265 {\n  list-style: none !important;\n}\n#fixedBar_rectangleColorList_clipboard_314159265 .fixedBar_rectangleColorListItem_clipboard_314159265 {\n  display: block !important;\n  width: 40px !important;\n  height: 24px !important;\n  font-size: 24px !important;\n  float: left !important;\n  margin: 0 6px 6px 0 !important;\n  cursor: pointer !important;\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2) !important;\n  -moz-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2) !important;\n  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2) !important;\n  opacity: .75 !important;\n}\n#fixedBar_rectangleColorList_clipboard_314159265 .fixedBar_rectangleColorListItem_clipboard_314159265#fixedBar_rectangleColorActive_clipboard_314159265 {\n  opacity: 1 !important;\n  width: 54px !important;\n  height: 54px !important;\n  font-size: 24px !important;\n  cursor: default !important;\n}\n#fixedBar_rectangleColorList_clipboard_314159265 .fixedBar_rectangleColorListItem_clipboard_314159265:hover {\n  opacity: 1 !important;\n}\n.fixedBar_waiting_clipboard_314159265 {\n  width: 50px !important;\n  height: 10px !important;\n  top: 50% !important;\n  left: 50% !important;\n  margin-top: -5px !important;\n  margin-left: -25px !important;\n  display: none;\n  position: absolute !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/spinner.gif) !important;\n  background-repeat: none !important;\n}\n#fixedBar_userMenu_clipboard_314159265 {\n  position: absolute !important;\n  height: 40px !important;\n  right: 40px !important;\n  min-width: 80px !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userDropdown_clipboard_314159265 ul li.fixedBar_divider_clipboard_314159265 {\n  height: 1px !important;\n  margin: 8px 1px !important;\n  overflow: hidden !important;\n  background-color: #e5e5e5 !important;\n  border-bottom: 1px solid #fff !important;\n  padding: 0 !important;\n}\n#fixedBar_userMenu_clipboard_314159265 .fixedBar_subtext_clipboard_314159265 {\n  white-space: nowrap !important;\n  font-size: 11px !important;\n  line-height: 18px !important;\n  color: #888 !important;\n  text-shadow: none !important;\n  cursor: pointer !important;\n  display: block !important;\n}\n#fixedBar_userMenu_clipboard_314159265:hover {\n  background-color: #cbcbcb !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbcbcb), color-stop(100%, #979797)) !important;\n  background-image: -webkit-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: -o-linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  background-image: linear-gradient(top, #cbcbcb 0%, #979797 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cbcbcb', endColorstr='#979797',GradientType=0); !important;\n  -webkit-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  -moz-box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n  box-shadow: inset 0px 1px 4px rgba(0,0,0,0.3) !important;\n}\n#fixedBar_userMenu_clipboard_314159265:hover #fixedBar_userLink_clipboard_314159265 span {\n  color: #fff !important;\n  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3) !important;\n}\n#fixedBar_userMenu_clipboard_314159265:hover #fixedBar_userLink_clipboard_314159265 span:after {\n  border-bottom: 4px solid #fff !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userLink_clipboard_314159265 {\n  line-height: 20px !important;\n  height: 20px !important;\n  display: block !important;\n  padding: 7.5px 15px !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userLink_clipboard_314159265:hover {\n  text-decoration: none !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userLink_clipboard_314159265 span {\n  cursor: pointer !important;\n  color: #888 !important;\n  font-size: 13px !important;\n  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) !important;\n  font-weight: 300 !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userLink_clipboard_314159265 span:after {\n  display: inline-block !important;\n  width: 0 !important;\n  height: 0 !important;\n  vertical-align: top !important;\n  margin-top: 8px !important;\n  margin-left: 2px !important;\n  border-bottom: 4px solid #888 !important;\n  border-right: 4px solid transparent !important;\n  border-left: 4px solid transparent !important;\n  content: \"\" !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userLink_clipboard_314159265 #fixedBar_userAvatar_clipboard_314159265 {\n  width: 23px !important;\n  height: 23px !important;\n  margin-right: 4px !important;\n  margin-top: 0px !important;\n  vertical-align: middle !important;\n  -webkit-border-radius: 2px !important;\n  -moz-border-radius: 2px !important;\n  border-radius: 2px !important;\n  -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.25) !important;\n  -moz-box-shadow: 1px 1px 1px rgba(0,0,0,0.25) !important;\n  box-shadow: 1px 1px 1px rgba(0,0,0,0.25) !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userDropdown_clipboard_314159265 {\n  display: none !important;\n  position: absolute !important;\n  background-color: transparent !important;\n  bottom: 37px !important;\n  right: 1px !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userDropdown_clipboard_314159265 ul {\n  border: 1px solid rgba(0, 0, 0, 0.2) !important;\n  border-bottom: none !important;\n  background-color: #fff !important;\n  list-style: none !important;\n  min-width: 120px !important;\n  padding: 5px 0 !important;\n  margin-bottom: 4px !important;\n  -webkit-box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.5) !important;\n  -moz-box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.5) !important;\n  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.5) !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userDropdown_clipboard_314159265 ul li {\n  white-space: nowrap !important;\n  cursor: pointer !important;\n  padding: 3px 20px !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userDropdown_clipboard_314159265 ul li .fixedBar_popupLabel_clipboard_314159265 {\n  text-shadow: none !important;\n  color: #333 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  cursor: pointer !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_userDropdown_clipboard_314159265 ul:after {\n  content: \"\" !important;\n  width: 0 !important;\n  height: 0 !important;\n  display: inline-block !important;\n  border-left: 7px solid transparent !important;\n  border-right: 7px solid transparent !important;\n  border-top: 7px solid #fff !important;\n  position: absolute !important;\n  bottom: -3px !important;\n  right: 11px !important;\n}\n#fixedBar_userMenu_clipboard_314159265 .activePopupLabel {\n  color: #fff !important;\n  background: #7CBCE0 !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuSettings_clipboard_314159265:hover,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuSettings_clipboard_314159265:active {\n  background: #7CBCE0 !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuSettings_clipboard_314159265:hover .fixedBar_popupLabel_clipboard_314159265,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuSettings_clipboard_314159265:active .fixedBar_popupLabel_clipboard_314159265 {\n  color: #fff !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuHelp_clipboard_314159265:hover,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuHelp_clipboard_314159265:active {\n  background: #7CBCE0 !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuHelp_clipboard_314159265:hover .fixedBar_popupLabel_clipboard_314159265,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuHelp_clipboard_314159265:active .fixedBar_popupLabel_clipboard_314159265 {\n  color: #fff !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuUserProfile_clipboard_314159265:hover,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuUserProfile_clipboard_314159265:active {\n  background: #7CBCE0 !important;\n}\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuUserProfile_clipboard_314159265:hover .fixedBar_popupLabel_clipboard_314159265,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuUserProfile_clipboard_314159265:active .fixedBar_popupLabel_clipboard_314159265,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuUserProfile_clipboard_314159265:hover .fixedBar_subtext_clipboard_314159265,\n#fixedBar_userMenu_clipboard_314159265 #fixedBar_menuUserProfile_clipboard_314159265:active .fixedBar_subtext_clipboard_314159265 {\n  color: #fff !important;\n}\n#fixedBar_loginForm_clipboard_314159265 {\n  display: none !important;\n  margin-top: 4px !important;\n  position: absolute !important;\n  left: 50% !important;\n  margin-left: -110px !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #ffffff !important;\n  text-shadow: 0 -1px 0 #296898 !important;\n  background-color: #86c4e0 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #86c4e0), color-stop(100%, #3174a8)) !important;\n  background-image: -webkit-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: -o-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#86c4e0', endColorstr='#3174a8',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#86c4e0', endColorstr='#3174a8',GradientType=0); !important;\n  border-color: #3174a8 #3174a8 #204b6d !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265:hover,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265:active,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265.active,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265.disabled,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265[disabled] {\n  color: #ffffff !important;\n  background-color: #3174a8 !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265:active,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265.active {\n  background-color: #255981  !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #ffffff !important;\n  text-shadow: 0 -1px 0 #4e810f !important;\n  background-color: #ace066 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ace066), color-stop(100%, #6ba326)) !important;\n  background-image: -webkit-linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  background-image: -o-linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  background-image: linear-gradient(top, #ace066 0%, #6ba326 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ace066', endColorstr='#6ba326',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ace066', endColorstr='#6ba326',GradientType=0); !important;\n  border-color: #6ba326 #6ba326 #426518 !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265:hover,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265:active,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265.active,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265.disabled,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265[disabled] {\n  color: #ffffff !important;\n  background-color: #6ba326 !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265:active,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265.active {\n  background-color: #507a1c  !important;\n}\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_loginButton_clipboard_314159265,\n#fixedBar_loginForm_clipboard_314159265 #fixedBar_registerButton_clipboard_314159265 {\n  display: inline-block !important;\n  width: 100px !important;\n  font-size: 18px !important;\n  height: 18px !important;\n  line-height: 100% !important;\n  padding: 6px !important;\n  position: relative !important;\n  margin-right: 10px !important;\n  left: 5px !important;\n}\n#fixedBar_close_clipboard_314159265 {\n  position: absolute !important;\n  top: 0 !important;\n  right: 0 !important;\n  height: 40px !important;\n  padding: 11px !important;\n  border-top-right-radius: 8px !important;\n}\n#fixedBar_close_clipboard_314159265:hover #fixedBar_closeSprite_clipboard_314159265 {\n  opacity: 1 !important;\n}\n#fixedBar_closeSprite_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-sprite.png) !important;\n  background-position: -162px -18px;\n  width: 18px !important;\n  height: 18px !important;\n  display: inline-block !important;\n  opacity: 0.5 !important;\n}\n#fixedBar_sep_clipboard_314159265 {\n  position: absolute !important;\n  top: 0 !important;\n  right: 40px !important;\n  height: 40px !important;\n  border-right: 1px solid #dbdbdb !important;\n  border-left: 1px solid #acacac !important;\n}\n#fixedBar_message_clipboard_314159265 {\n  position: fixed !important;\n  left: 50% !important;\n  bottom: 40px !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  width: 160px !important;\n  height: 36px !important;\n  margin-left: -80px !important;\n  font-size: 12px !important;\n  border: 1px solid transparent !important;\n  -webkit-border-radius: 4px 4px 0 0 !important;\n  -moz-border-radius: 4px 4px 0 0 !important;\n  border-radius: 4px 4px 0 0 !important;\n  display: none !important;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4) !important;\n  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5) !important;\n  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5) !important;\n  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5) !important;\n  z-index: 214748364 !important;\n  color: #fafafa !important;\n  text-align: center !important;\n  overflow: hidden !important;\n  padding-top: 8px !important;\n}\n#fixedBar_message_clipboard_314159265 #fixedBar_savedMessage_clipboard_314159265 {\n  cursor: pointer !important;\n  display: inline-block !important;\n  height: 18px !important;\n  color: inherit !important;\n  text-decoration: none !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n}\n#fixedBar_message_clipboard_314159265 #fixedBar_savedMessage_clipboard_314159265:hover {\n  text-decoration: none !important;\n}\n#fixedBar_message_clipboard_314159265 #fixedBar_savedMessage_clipboard_314159265 #fixedBar_savedText_clipboard_314159265 {\n  cursor: pointer !important;\n  font-weight: 300 !important;\n  line-height: 13px !important;\n  color: #fafafa !important;\n  display: inline-block !important;\n}\n#fixedBar_message_clipboard_314159265 #fixedBar_savedMessage_clipboard_314159265 #fixedBar_savedText_clipboard_314159265 #fixedBar_savedAside_clipboard_314159265 {\n  margin-left: 10px !important;\n  cursor: pointer !important;\n  color: #4f682b !important;\n  font-size: 11px !important;\n}\n#fixedBar_message_clipboard_314159265.fixedBar_messageError_clipboard_314159265 {\n  font-size: 11px !important;\n  border-color: #742a17 !important;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAiUlEQVQImT3EWw7BQAAF0LuUdsyjayj60jG6SSIiFZUQj5CoeEQTVnV9oOfj4F0ExKsIiGZkiMYZ4ukM8Rhq4u4McbOauFpNXKwi6lwTtdXEOVfEaSCJ4zdFHDJF7DNJ7FJJbFNJbJIOsW5bxYKoYkEso3+LSBBlXxDznv9r1jbt+sQk9Ihx6PED/K9LWEKDS8cAAAAASUVORK5CYII=) !important;\n  background-color: #9f3a20 !important;\n}\n#fixedBar_message_clipboard_314159265.fixedBar_messageSuccess_clipboard_314159265 {\n  border-color: #5d7a32 !important;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAoUlEQVQImS3E2QoBAQAF0PtrFBJZiogoS5ZQvJHdRIRMTMQDxhpjaQYNfu56cR4OFt8CMf/kidk7R8z0LDHVM4T0ShPSK0VMnkli/EgQohYnRC1GiGqUGKkRYngPE4Nb6F//GiR6lwDRVfxEV/ERnbOXaJ88/4SjmxCOLqJ1cBLNvYNo7O1EfWcjalsrUd1YiYpsISqymSivTURpZSSKSwN/HllbzrviDd8AAAAASUVORK5CYII=) !important;\n  background-color: #789e41 !important;\n}\n#review_overlay_clipboard_314159265 {\n  opacity: 0 !important;\n  filter: alpha(opacity=0) !important;\n  width: 150% !important;\n  height: 100% !important;\n  z-index: 214748365 !important;\n  background-color: #000000 !important;\n}\n#review_contents_clipboard_314159265 {\n  background: #FFFFFF !important;\n  overflow-y: auto !important;\n  overflow-x: hidden !important;\n  border-bottom: 1px dashed #BBBBBB !important;\n  border-top: 1px dashed #BBBBBB !important;\n  position: relative;\n}\n#review_header_clipboard_314159265 {\n  padding: 10px !important;\n  position: relative !important;\n}\n#review_title_clipboard_314159265 {\n  font-size: 24px !important;\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n}\n#review_dialog_clipboard_314159265 {\n  opacity: 0 !important;\n  filter: alpha(opacity=0) !important;\n  background: #e7e6e3 !important;\n  -webkit-box-shadow: 0 10px 20px #000000 !important;\n  -moz-box-shadow: 0 10px 20px #000000 !important;\n  box-shadow: 0 10px 20px #000000 !important;\n  -webkit-border-radius: 2pxpx !important;\n  -moz-border-radius: 2pxpx !important;\n  border-radius: 2pxpx !important;\n  z-index: 214748366 !important;\n}\n#review_publishWrapper_clipboard_314159265 {\n  margin-left: 5px !important;\n}\n#review_publishWrapper_clipboard_314159265:hover #review_publishControl_clipboard_314159265,\n#review_publishWrapper_clipboard_314159265:active #review_publishControl_clipboard_314159265 {\n  background-position: -130px 0px !important;\n}\n#review_publishWrapper_clipboard_314159265:hover #review_publishText_clipboard_314159265,\n#review_publishWrapper_clipboard_314159265:active #review_publishText_clipboard_314159265 {\n  text-decoration: underline !important;\n}\n#review_publishText_clipboard_314159265 {\n  padding-left: 7px !important;\n  color: #544741 !important;\n  white-space: nowrap !important;\n  cursor: pointer !important;\n  position: relative !important;\n  top: 1px !important;\n}\n#review_footer_clipboard_314159265 {\n  position: relative !important;\n  text-align: left !important;\n  padding: 10px !important;\n}\n#review_footer_clipboard_314159265:after {\n  content: \"\" !important;\n  clear: both !important;\n  display: block !important;\n}\n#review_inputContainer_clipboard_314159265 {\n  position: relative !important;\n}\n.review_quirksModeSuxWrapper_clipboard_314159265 {\n  padding: 6px !important;\n  background-color: #FFFFFF !important;\n  border: 1px solid #BBBBBB !important;\n  -webkit-border-radius: 3px !important;\n  -moz-border-radius: 3px !important;\n  border-radius: 3px !important;\n  position: relative !important;\n}\n.review_quirksModeSuxWrapper_clipboard_314159265:focus,\n.review_quirksModeSuxWrapper_clipboard_314159265:hover {\n  border: 1px solid #459cb9 !important;\n  -webkit-box-shadow: 0 0px 3px #459cb9 !important;\n  -moz-box-shadow: 0 0px 3px #459cb9 !important;\n  box-shadow: 0 0px 3px #459cb9 !important;\n}\n#review_annotate_clipboard_314159265,\n#review_titleInput_clipboard_314159265 {\n  width: 100% !important;\n  padding: 0 !important;\n  background-color: #FFFFFF !important;\n  border: none !important;\n  color: #111111 !important;\n  margin: 0 !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n}\n#review_annotationWrapper_clipboard_314159265 {\n  float: left !important;\n  width: 420px !important;\n}\n#review_boardPicker_clipboard_314159265 {\n  float: left !important;\n  margin-left: 10px !important;\n  margin-top: 1px !important;\n}\n#review_annotate_clipboard_314159265 {\n  font-size: 14px !important;\n}\n#review_autocompleteTrigger_clipboard_314159265 {\n  position: absolute !important;\n  right: 2px !important;\n  top: 2px !important;\n}\n#review_autocompleteTrigger_clipboard_314159265 span {\n  color: #459cb9 !important;\n  display: inline-block !important;\n  cursor: pointer !important;\n  padding: 4px !important;\n  font-size: 16px !important;\n  font-weight: bold !important;\n}\n#review_reviewClipLabel_clipboard_314159265,\n#review_fbStreamClipLabel_clipboard_314159265,\n#review_tweetClipLabel_clipboard_314159265 {\n  width: auto !important;\n  margin-left: 5px !important;\n  color: #544741 !important;\n  cursor: pointer !important;\n}\n#review_buttonWrapper_clipboard_314159265 {\n  float: right !important;\n  margin-top: 3px !important;\n  position: relative !important;\n}\n#review_cancel_clipboard_314159265,\n#review_save_clipboard_314159265 {\n  position: absolute !important;\n}\n#review_cancel_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  cursor: pointer !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #333333 !important;\n  text-shadow: 0 1px 0 #e7e6e3 !important;\n  background-color: #eeeeee !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eeeeee), color-stop(100%, #c3c3c3)) !important;\n  background-image: -webkit-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: -o-linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  background-image: linear-gradient(top, #eeeeee 0%, #c3c3c3 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#c3c3c3',GradientType=0); !important;\n  border-color: #c3c3c3 #c3c3c3 #9d9d9d !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  right: 95px !important;\n}\n#review_cancel_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n#review_cancel_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n#review_cancel_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n#review_cancel_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n#review_cancel_clipboard_314159265:hover,\n#review_cancel_clipboard_314159265:active,\n#review_cancel_clipboard_314159265.active,\n#review_cancel_clipboard_314159265.disabled,\n#review_cancel_clipboard_314159265[disabled] {\n  color: #333333 !important;\n  background-color: #c3c3c3 !important;\n}\n#review_cancel_clipboard_314159265:active,\n#review_cancel_clipboard_314159265.active {\n  background-color: #aaaaaa  !important;\n}\n#review_save_clipboard_314159265 {\n  display: inline-block !important;\n  padding: 4px 14px !important;\n  margin-bottom: 0 !important;\n  font-size: 13px !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  vertical-align: middle !important;\n  border: 1px solid #8c8c8c !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  -webkit-border-radius: 4px !important;\n  -moz-border-radius: 4px !important;\n  border-radius: 4px !important;\n  color: #ffffff !important;\n  text-shadow: 0 -1px 0 #296898 !important;\n  background-color: #86c4e0 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #86c4e0), color-stop(100%, #3174a8)) !important;\n  background-image: -webkit-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: -o-linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  background-image: linear-gradient(top, #86c4e0 0%, #3174a8 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#86c4e0', endColorstr='#3174a8',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#86c4e0', endColorstr='#3174a8',GradientType=0); !important;\n  border-color: #3174a8 #3174a8 #204b6d !important;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false) !important;\n  -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.6) !important;\n  top: 0 !important;\n  right: 0 !important;\n  cursor: pointer !important;\n  width: 60px !important;\n}\n#review_save_clipboard_314159265:hover {\n  color: #333333 !important;\n  text-decoration: none !important;\n  background-color: #e6e6e6 !important;\n  background-position: 0 -15px !important;\n  -webkit-transition: background-position 0.1s linear !important;\n  -moz-transition: background-position 0.1s linear !important;\n  -o-transition: background-position 0.1s linear !important;\n  transition: background-position 0.1s linear !important;\n}\n#review_save_clipboard_314159265:focus {\n  outline: thin dotted #333 !important;\n  outline: 5px auto -webkit-focus-ring-color !important;\n  outline-offset: -2px !important;\n}\n#review_save_clipboard_314159265:active {\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  outline: 0 !important;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n  box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) !important;\n}\n#review_save_clipboard_314159265[disabled] {\n  cursor: default !important;\n  background-color: #e6e6e6 !important;\n  background-image: none !important;\n  opacity: 0.65 !important;\n  filter: alpha(opacity=65) !important;\n  -webkit-box-shadow: none !important;\n  -moz-box-shadow: none !important;\n  box-shadow: none !important;\n}\n#review_save_clipboard_314159265:hover,\n#review_save_clipboard_314159265:active,\n#review_save_clipboard_314159265.active,\n#review_save_clipboard_314159265.disabled,\n#review_save_clipboard_314159265[disabled] {\n  color: #ffffff !important;\n  background-color: #3174a8 !important;\n}\n#review_save_clipboard_314159265:active,\n#review_save_clipboard_314159265.active {\n  background-color: #255981  !important;\n}\n#review_wrapper_clipboard_314159265 {\n  -webkit-border-radius: 2pxpx !important;\n  -moz-border-radius: 2pxpx !important;\n  border-radius: 2pxpx !important;\n  background-color: transparent !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n#review_actionMenu_clipboard_314159265,\n#review_buttonWrapper_clipboard_314159265 {\n  margin-top: 7px !important;\n}\n#review_actionMenuIcon_publish_clipboard_314159265 {\n  background-position: 0 0 !important;\n}\n#review_actionMenuIcon_facebook_clipboard_314159265 {\n  background-position: -25px 0 !important;\n}\n#review_actionMenuIcon_twitter_clipboard_314159265 {\n  background-position: -50px 0 !important;\n}\n#review_actionMenu_clipboard_314159265 {\n  float: left !important;\n  position: relative !important;\n  clear: both !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265 {\n  border: 1px solid transparent !important;\n  -webkit-border-radius: 3px !important;\n  -moz-border-radius: 3px !important;\n  border-radius: 3px !important;\n  float: none !important;\n  display: inline-block !important;\n  cursor: pointer !important;\n  margin-right: 10px !important;\n  position: relative !important;\n  padding-right: 5px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265 .review_actionMenuIcon_clipboard_314159265 {\n  display: inline-block !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-review-actionMenuSprite.png) !important;\n  width: 25px !important;\n  height: 25px !important;\n  position: relative !important;\n  top: 2px !important;\n  cursor: pointer !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265 .review_actionMenuLabel_clipboard_314159265 {\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n  font-size: 14px !important;\n  font-weight: 400 !important;\n  color: #444444 !important;\n  cursor: pointer !important;\n  position: relative !important;\n  top: -5px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:before,\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:after {\n  content: \"\" !important;\n  display: none !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:hover {\n  border: 1px solid #cccccc !important;\n  opacity: 0.6 !important;\n  filter: alpha(opacity=60) !important;\n  background-color: #dbdad5 !important;\n  -webkit-box-shadow: inset 0 1px 0 #FFFFFF, 0 1px 1px #FEFEFE !important;\n  -moz-box-shadow: inset 0 1px 0 #FFFFFF, 0 1px 1px #FEFEFE !important;\n  box-shadow: inset 0 1px 0 #FFFFFF, 0 1px 1px #FEFEFE !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:hover .review_actionMenuLabel_clipboard_314159265 {\n  color: #111111 !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:hover #review_actionMenuIcon_publish_clipboard_314159265 {\n  background-position: 0 -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:hover #review_actionMenuIcon_facebook_clipboard_314159265 {\n  background-position: -25px -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:hover #review_actionMenuIcon_twitter_clipboard_314159265 {\n  background-position: -50px -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:active {\n  border: 1px solid #cccccc !important;\n  opacity: 1 !important;\n  filter: alpha(opacity=100) !important;\n  background-color: #cccccc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cccccc), color-stop(100%, #dddddd)) !important;\n  background-image: -webkit-linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  background-image: -o-linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  background-image: linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cccccc', endColorstr='#dddddd',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cccccc', endColorstr='#dddddd',GradientType=0); !important;\n  -webkit-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px #FEFEFE !important;\n  -moz-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px #FEFEFE !important;\n  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px #FEFEFE !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:active .review_actionMenuLabel_clipboard_314159265 {\n  color: #111111 !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:active #review_actionMenuIcon_publish_clipboard_314159265 {\n  background-position: 0 -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:active #review_actionMenuIcon_facebook_clipboard_314159265 {\n  background-position: -25px -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuItem_clipboard_314159265:active #review_actionMenuIcon_twitter_clipboard_314159265 {\n  background-position: -50px -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_spinner_clipboard_314159265 {\n  color: transparent !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/spinner-light.gif) !important;\n  background-position: 27px center !important;\n  background-repeat: no-repeat !important;\n}\n#review_actionMenu_clipboard_314159265 .review_spinner_clipboard_314159265 .review_actionMenuLabel_clipboard_314159265 {\n  visibility: hidden !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265,\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265:hover {\n  border: 1px solid #cccccc !important;\n  opacity: 1 !important;\n  filter: alpha(opacity=100) !important;\n  background-color: #cccccc !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cccccc), color-stop(100%, #dddddd)) !important;\n  background-image: -webkit-linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  background-image: -o-linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  background-image: linear-gradient(top, #cccccc 0%, #dddddd 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cccccc', endColorstr='#dddddd',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cccccc', endColorstr='#dddddd',GradientType=0); !important;\n  -webkit-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px #FEFEFE !important;\n  -moz-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px #FEFEFE !important;\n  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px #FEFEFE !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265 .review_actionMenuLabel_clipboard_314159265,\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265:hover .review_actionMenuLabel_clipboard_314159265 {\n  color: #111111 !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265 #review_actionMenuIcon_publish_clipboard_314159265,\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265:hover #review_actionMenuIcon_publish_clipboard_314159265 {\n  background-position: 0 -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265 #review_actionMenuIcon_facebook_clipboard_314159265,\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265:hover #review_actionMenuIcon_facebook_clipboard_314159265 {\n  background-position: -25px -25px !important;\n}\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265 #review_actionMenuIcon_twitter_clipboard_314159265,\n#review_actionMenu_clipboard_314159265 .review_actionMenuActive_clipboard_314159265:hover #review_actionMenuIcon_twitter_clipboard_314159265 {\n  background-position: -50px -25px !important;\n}\n#review_actionMenuItem_twitter_clipboard_314159265 .review_actionMenuLabel_clipboard_314159265,\n#review_actionMenuItem_publish_clipboard_314159265 .review_actionMenuLabel_clipboard_314159265 {\n  padding-left: 3px !important;\n}\n#review_clipContents_clipboard_314159265 {\n  padding: 15px !important;\n  font-size: 16px !important;\n  font-family: Times !important;\n}\n[class^=\"clpbrd-image-\"],\n[class*=\" clpbrd-image-\"] {\n  display: inline-block !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/image-sprite.png) !important;\n  background-repeat: no-repeat !important;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: \"3/2\"), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5), only screen and (min-device-width: 768px) and (max-device-width: 1024px) {\n  [class^=\"clpbrd-image-\"],\n  [class*=\" clpbrd-image-\"] {\n    background-image: url(##STATICBASEURL##/images/3.4.6/image-sprite@2x.png);\n    -webkit-background-size: 778px 102px;\n    -moz-background-size: 778px 102px;\n    -o-background-size: 778px 102px;\n    background-size: 778px 102px;\n  }\n}\n.clpbrd-image-shared-board-icon-dark {\n  background-position: -304px -24px !important;\n  width: 30px !important;\n  height: 30px !important;\n}\n.clpbrd-image-tag-icon-dark {\n  background-position: -152px -57px !important;\n  width: 30px !important;\n  height: 30px !important;\n}\n.embed_hover_clipboard_314159265 {\n  position: absolute !important;\n  border: 2px solid transparent !important;\n  z-index: 214748363 !important;\n  -webkit-box-shadow: 0 0 5px rgba(128, 128, 128, 0.5) !important;\n  -moz-box-shadow: 0 0 5px rgba(128, 128, 128, 0.5) !important;\n  box-shadow: 0 0 5px rgba(128, 128, 128, 0.5) !important;\n  display: none !important;\n}\n.embed_button_clipboard_314159265 {\n  cursor: pointer !important;\n  width: 25px !important;\n  height: 25px !important;\n  position: relative !important;\n  -webkit-border-radius: 3px !important;\n  -moz-border-radius: 3px !important;\n  border-radius: 3px !important;\n  border: 1px solid transparent !important;\n}\n.embed_button_clipboard_314159265 .embed_logo_clipboard_314159265 {\n  cursor: pointer !important;\n  position: absolute !important;\n  top: 50% !important;\n  left: 50% !important;\n}\n.embed_iconOnly_default_clipboard_314159265 {\n  width: 25px !important;\n  height: 25px !important;\n}\n.embed_iconOnly_default_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: 0 0 !important;\n  width: 17px !important;\n  height: 15px !important;\n  margin-left: -8.5px !important;\n  margin-top: -7.5px !important;\n}\n.embed_iconOnly_default_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -51px 0 !important;\n  width: 17px !important;\n  height: 15px !important;\n  margin-left: -8.5px !important;\n  margin-top: -7.5px !important;\n}\n.embed_iconOnly_dark_clipboard_314159265 {\n  width: 25px !important;\n  height: 25px !important;\n}\n.embed_iconOnly_dark_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -34px 0 !important;\n  width: 17px !important;\n  height: 15px !important;\n  margin-left: -8.5px !important;\n  margin-top: -7.5px !important;\n}\n.embed_iconOnly_dark_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -85px 0 !important;\n  width: 17px !important;\n  height: 15px !important;\n  margin-left: -8.5px !important;\n  margin-top: -7.5px !important;\n}\n.embed_iconOnly_light_clipboard_314159265 {\n  width: 25px !important;\n  height: 25px !important;\n}\n.embed_iconOnly_light_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -17px 0 !important;\n  width: 17px !important;\n  height: 15px !important;\n  margin-left: -8.5px !important;\n  margin-top: -7.5px !important;\n}\n.embed_iconOnly_light_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -68px 0 !important;\n  width: 17px !important;\n  height: 15px !important;\n  margin-left: -8.5px !important;\n  margin-top: -7.5px !important;\n}\n.embed_shortLabel_default_clipboard_314159265 {\n  width: 46px !important;\n  height: 17px !important;\n}\n.embed_shortLabel_default_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-position: 0 NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: 0 -15px !important;\n  width: 38px !important;\n  height: 13px !important;\n  margin-left: -19px !important;\n  margin-top: -6.5px !important;\n}\n.embed_shortLabel_default_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -144px 0 !important;\n  width: 14px !important;\n  height: 13px !important;\n  margin-left: -7px !important;\n  margin-top: -6.5px !important;\n}\n.embed_shortLabel_dark_clipboard_314159265 {\n  width: 46px !important;\n  height: 17px !important;\n}\n.embed_shortLabel_dark_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-position: 0 NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: 0 -41px !important;\n  width: 38px !important;\n  height: 13px !important;\n  margin-left: -19px !important;\n  margin-top: -6.5px !important;\n}\n.embed_shortLabel_dark_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -172px 0 !important;\n  width: 14px !important;\n  height: 13px !important;\n  margin-left: -7px !important;\n  margin-top: -6.5px !important;\n}\n.embed_shortLabel_light_clipboard_314159265 {\n  width: 46px !important;\n  height: 17px !important;\n}\n.embed_shortLabel_light_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-position: 0 NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: 0 -28px !important;\n  width: 38px !important;\n  height: 13px !important;\n  margin-left: -19px !important;\n  margin-top: -6.5px !important;\n}\n.embed_shortLabel_light_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -158px 0 !important;\n  width: 14px !important;\n  height: 13px !important;\n  margin-left: -7px !important;\n  margin-top: -6.5px !important;\n}\n.embed_longLabel_default_clipboard_314159265 {\n  width: 128px !important;\n  height: 17px !important;\n}\n.embed_longLabel_default_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-position: -38px NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -38px -15px !important;\n  width: 118px !important;\n  height: 13px !important;\n  margin-left: -59px !important;\n  margin-top: -6.5px !important;\n}\n.embed_longLabel_default_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-position: -156px NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -156px -15px !important;\n  width: 92px !important;\n  height: 13px !important;\n  margin-left: -46px !important;\n  margin-top: -6.5px !important;\n}\n.embed_longLabel_dark_clipboard_314159265 {\n  width: 128px !important;\n  height: 17px !important;\n}\n.embed_longLabel_dark_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-position: -38px NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -38px -41px !important;\n  width: 118px !important;\n  height: 13px !important;\n  margin-left: -59px !important;\n  margin-top: -6.5px !important;\n}\n.embed_longLabel_dark_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-position: -156px NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -156px -41px !important;\n  width: 92px !important;\n  height: 13px !important;\n  margin-left: -46px !important;\n  margin-top: -6.5px !important;\n}\n.embed_longLabel_light_clipboard_314159265 {\n  width: 128px !important;\n  height: 17px !important;\n}\n.embed_longLabel_light_clipboard_314159265 .embed_clipLogo_clipboard_314159265 {\n  background-position: -38px NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -38px -28px !important;\n  width: 118px !important;\n  height: 13px !important;\n  margin-left: -59px !important;\n  margin-top: -6.5px !important;\n}\n.embed_longLabel_light_clipboard_314159265 .embed_viewerLogo_clipboard_314159265 {\n  background-position: -156px NaN !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/clipper-embed-sprite.png) !important;\n  background-repeat: no-repeat !important;\n  background-position: -156px -28px !important;\n  width: 92px !important;\n  height: 13px !important;\n  margin-left: -46px !important;\n  margin-top: -6.5px !important;\n}\n.embed_theme_light_clipboard_314159265 {\n  background-color: #fefefe !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #fefefe 0%, #dfdfdf 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fefefe), color-stop(100%, #dfdfdf)) !important;\n  background-image: -webkit-linear-gradient(top, #fefefe 0%, #dfdfdf 100%) !important;\n  background-image: -o-linear-gradient(top, #fefefe 0%, #dfdfdf 100%) !important;\n  background-image: linear-gradient(top, #fefefe 0%, #dfdfdf 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fefefe', endColorstr='#dfdfdf',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fefefe', endColorstr='#dfdfdf',GradientType=0); !important;\n  border-color: #e5e5e5 #cbcbcb #c6c6c6 #cbcbcb !important;\n}\n.embed_theme_light_clipboard_314159265:hover {\n  background-color: #fefefe !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #fefefe 0%, #dfdfdf 80%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fefefe), color-stop(80%, #dfdfdf)) !important;\n  background-image: -webkit-linear-gradient(top, #fefefe 0%, #dfdfdf 80%) !important;\n  background-image: -o-linear-gradient(top, #fefefe 0%, #dfdfdf 80%) !important;\n  background-image: linear-gradient(top, #fefefe 0%, #dfdfdf 80%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fefefe', endColorstr='#dfdfdf',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fefefe', endColorstr='#dfdfdf',GradientType=0); !important;\n  -moz-box-shadow: inset 0 0 2px #fefefe !important;\n  -webkit-box-shadow: inset 0 0 2px #fefefe !important;\n  box-shadow: inset 0 0 2px #fefefe !important;\n}\n.embed_theme_light_clipboard_314159265:active {\n  background-color: #d2d2d2 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #d2d2d2 0%, #f1f1f1 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #d2d2d2), color-stop(100%, #f1f1f1)) !important;\n  background-image: -webkit-linear-gradient(top, #d2d2d2 0%, #f1f1f1 100%) !important;\n  background-image: -o-linear-gradient(top, #d2d2d2 0%, #f1f1f1 100%) !important;\n  background-image: linear-gradient(top, #d2d2d2 0%, #f1f1f1 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d2d2d2', endColorstr='#f1f1f1',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d2d2d2', endColorstr='#f1f1f1',GradientType=0); !important;\n  border-top-color: #c6c6c6 !important;\n  border-bottom-color: #e5e5e5 !important;\n}\n.embed_theme_dark_clipboard_314159265 {\n  background-color: #6d5d57 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #6d5d57 0%, #57433d 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #6d5d57), color-stop(100%, #57433d)) !important;\n  background-image: -webkit-linear-gradient(top, #6d5d57 0%, #57433d 100%) !important;\n  background-image: -o-linear-gradient(top, #6d5d57 0%, #57433d 100%) !important;\n  background-image: linear-gradient(top, #6d5d57 0%, #57433d 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#6d5d57', endColorstr='#57433d',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#6d5d57', endColorstr='#57433d',GradientType=0); !important;\n  border-color: #514540 #342d2a #392c28 #342d2a !important;\n}\n.embed_theme_dark_clipboard_314159265:hover {\n  background-color: #6d5d57 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #6d5d57 0%, #57433d 80%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #6d5d57), color-stop(80%, #57433d)) !important;\n  background-image: -webkit-linear-gradient(top, #6d5d57 0%, #57433d 80%) !important;\n  background-image: -o-linear-gradient(top, #6d5d57 0%, #57433d 80%) !important;\n  background-image: linear-gradient(top, #6d5d57 0%, #57433d 80%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#6d5d57', endColorstr='#57433d',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#6d5d57', endColorstr='#57433d',GradientType=0); !important;\n  -moz-box-shadow: inset 0 0 2px #6d5d57 !important;\n  -webkit-box-shadow: inset 0 0 2px #6d5d57 !important;\n  box-shadow: inset 0 0 2px #6d5d57 !important;\n}\n.embed_theme_dark_clipboard_314159265:active {\n  background-color: #483732 !important;\n  background-repeat: repeat-x !important;\n  background-image: -moz-linear-gradient(top, #483732 0%, #5f514c 100%) !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #483732), color-stop(100%, #5f514c)) !important;\n  background-image: -webkit-linear-gradient(top, #483732 0%, #5f514c 100%) !important;\n  background-image: -o-linear-gradient(top, #483732 0%, #5f514c 100%) !important;\n  background-image: linear-gradient(top, #483732 0%, #5f514c 100%) !important;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#483732', endColorstr='#5f514c',GradientType=0); !important;\n  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#483732', endColorstr='#5f514c',GradientType=0); !important;\n  border-top-color: #392c28 !important;\n  border-bottom-color: #514540 !important;\n}\n.embed_virtualButton_clipboard_314159265 {\n  z-index: 214748364 !important;\n  position: absolute !important;\n  display: none !important;\n}\n#tutorial_container_clipboard_314159265 {\n  z-index: 214748365 !important;\n  width: 540px !important;\n  background-color: #e7e6e3 !important;\n  -webkit-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n  -moz-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideHeader_clipboard_314159265 {\n  position: relative !important;\n  text-align: center !important;\n  padding: 10px !important;\n  border-bottom: 1px dashed #888888 !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideHeader_clipboard_314159265 #tutorial_logo_clipboard_314159265 {\n  height: 30px !important;\n  width: 184px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideHeader_clipboard_314159265 #tutorial_close_clipboard_314159265 {\n  position: absolute !important;\n  cursor: pointer !important;\n  color: #888888 !important;\n  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.6) !important;\n  font-size: 22px !important;\n  font-weight: bold !important;\n  top: 10px !important;\n  right: 15px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideHeader_clipboard_314159265 #tutorial_close_clipboard_314159265:hover {\n  color: #f26531 !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 {\n  padding: 10px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideTitle_clipboard_314159265 {\n  color: #444444 !important;\n  text-align: center !important;\n  font-size: 24px !important;\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n  padding: 10px !important;\n  margin: 0 0 10px 0 !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideTitle_clipboard_314159265 #tutorial_slideCount_clipboard_314159265 {\n  color: #888888 !important;\n  margin-left: 10px !important;\n  display: inline-block !important;\n  font-size: inherit !important;\n  font-family: inherit !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideTitle_clipboard_314159265 #tutorial_slideCount_clipboard_314159265 #tutorial_slideCountOf_clipboard_314159265 {\n  font-style: italic !important;\n  font-size: 19px !important;\n  font-family: inherit !important;\n  padding: 0 5px !important;\n  color: inherit !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideTitle_clipboard_314159265 #tutorial_slideCount_clipboard_314159265 #tutorial_slideCountCurrent_clipboard_314159265 {\n  font-size: inherit !important;\n  font-family: inherit !important;\n  color: inherit !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideImage_clipboard_314159265 {\n  text-align: center !important;\n  height: 250px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideImage_clipboard_314159265 img {\n  width: 345px !important;\n  height: 250px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideDescription_clipboard_314159265 {\n  margin-top: 20px !important;\n  height: 50px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideContent_clipboard_314159265 #tutorial_slideDescription_clipboard_314159265 p {\n  text-align: center !important;\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n  font-size: 16px !important;\n  color: #444444 !important;\n  line-height: 18px !important;\n  margin: 10px 5px 5px 5px !important;\n  padding: 0 !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_slideFooter_clipboard_314159265 {\n  padding: 10px !important;\n  height: 36px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_next_clipboard_314159265,\n#tutorial_container_clipboard_314159265 #tutorial_prev_clipboard_314159265,\n#tutorial_container_clipboard_314159265 #tutorial_startClipping_clipboard_314159265 {\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n  width: 155px !important;\n  height: 38px !important;\n  line-height: 32px !important;\n  text-align: center !important;\n  font-size: 18px !important;\n  cursor: pointer !important;\n  background-image: url(##STATICBASEURL##/images/3.4.6/registration-sprite.png) !important;\n  background-repeat: no-repeat !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_next_clipboard_314159265,\n#tutorial_container_clipboard_314159265 #tutorial_startClipping_clipboard_314159265 {\n  float: right !important;\n  color: #e7e6e3 !important;\n  background-position: 0 0 !important;\n  text-shadow: 1px 1px 1px rgba(124, 124, 124, 0.69) !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_next_clipboard_314159265:hover,\n#tutorial_container_clipboard_314159265 #tutorial_startClipping_clipboard_314159265:hover {\n  background-position: -156px 0 !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_next_clipboard_314159265:active,\n#tutorial_container_clipboard_314159265 #tutorial_startClipping_clipboard_314159265:active {\n  background-position: -312px 0 !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_prev_clipboard_314159265 {\n  color: #444444 !important;\n  float: left !important;\n  background-position: 0 -39px !important;\n  text-shadow: 1px 1px 1px #D6D6D6 !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_prev_clipboard_314159265:hover {\n  background-position: -156px -39px !important;\n}\n#tutorial_container_clipboard_314159265 #tutorial_prev_clipboard_314159265:active {\n  background-position: -312px -39px !important;\n}\n#settings_container_clipboard_314159265 {\n  z-index: 214748365 !important;\n  width: 540px !important;\n  background-color: #e7e6e3 !important;\n  -webkit-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n  -moz-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n}\n#settings_container_clipboard_314159265 #settings_title_clipboard_314159265 {\n  position: relative !important;\n  padding: 10px 20px !important;\n  border-bottom: 1px dashed #888888 !important;\n}\n#settings_container_clipboard_314159265 #settings_title_clipboard_314159265 h1 {\n  width: 100% !important;\n  font-size: 24px !important;\n}\n#settings_container_clipboard_314159265 #settings_title_clipboard_314159265 #settings_close_clipboard_314159265 {\n  position: absolute !important;\n  cursor: pointer !important;\n  color: #888888 !important;\n  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.6) !important;\n  font-size: 22px !important;\n  font-weight: bold !important;\n  top: 10px !important;\n  right: 15px !important;\n}\n#settings_container_clipboard_314159265 #settings_title_clipboard_314159265 #settings_close_clipboard_314159265:hover {\n  color: #f26531 !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_mode_clipboard_314159265 {\n  margin: 5px 0 20px 5px !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_mode_clipboard_314159265 label {\n  padding: 10px 5px 10px 20px !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_mode_clipboard_314159265 select {\n  font-size: 16px !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_basic_clipboard_314159265 {\n  margin: 20px !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_basic_clipboard_314159265 td {\n  padding: 3px !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_basic_clipboard_314159265 td input,\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_basic_clipboard_314159265 td label {\n  cursor: pointer !important;\n  color: #666 !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_basic_clipboard_314159265 td input:hover,\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_basic_clipboard_314159265 td label:hover {\n  color: #000 !important;\n}\n#settings_container_clipboard_314159265 #settings_body_clipboard_314159265 #settings_basic_clipboard_314159265 tr:hover {\n  background: #ddd !important;\n}\n#settings_container_clipboard_314159265 .settings_preferencesBlock_clipboard_314159265 {\n  padding: 4px 8px !important;\n}\n#settings_container_clipboard_314159265 .settings_helpBlock_clipboard_314159265 {\n  padding: 0 5px !important;\n  margin: 5px 0 !important;\n}\n#settings_container_clipboard_314159265 .settings_helpBlock_clipboard_314159265 h4 {\n  position: relative !important;\n  top: 6px !important;\n}\n#settings_container_clipboard_314159265 .settings_helpBlock_clipboard_314159265 .settings_helpText_clipboard_314159265 {\n  clear: left !important;\n}\n#settings_container_clipboard_314159265 .settings_helpTextLink_clipboard_314159265 {\n  color: #459cb9 !important;\n  text-decoration: underline !important;\n  cursor: pointer !important;\n}\n#settings_container_clipboard_314159265 .settings_divider_clipboard_314159265 {\n  height: 0px !important;\n  width: 100% !important;\n  border-bottom: 1px dashed #cccccc !important;\n  font-size: 0 !important;\n  margin: 3px 0 !important;\n}\n#notification_container_clipboard_314159265 {\n  z-index: 214748365 !important;\n  width: 540px !important;\n  min-height: 300px !important;\n  background-color: #e7e6e3 !important;\n  -webkit-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n  -moz-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5) !important;\n}\n#notification_container_clipboard_314159265 #notification_header_clipboard_314159265 {\n  position: relative !important;\n  text-align: center !important;\n  padding: 10px !important;\n  border-bottom: 1px dashed #888888 !important;\n}\n#notification_container_clipboard_314159265 #notification_header_clipboard_314159265 #notification_logo_clipboard_314159265 {\n  height: 30px !important;\n  width: 184px !important;\n}\n#notification_container_clipboard_314159265 #notification_header_clipboard_314159265 #notification_close_clipboard_314159265 {\n  position: absolute !important;\n  cursor: pointer !important;\n  color: #888888 !important;\n  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.6) !important;\n  font-size: 22px !important;\n  font-weight: bold !important;\n  top: 10px !important;\n  right: 15px !important;\n}\n#notification_container_clipboard_314159265 #notification_header_clipboard_314159265 #notification_close_clipboard_314159265:hover {\n  color: #f26531 !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 {\n  padding: 30px !important;\n  padding-top: 10px !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 a,\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 a:visited,\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 a:active,\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 a:focus,\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 a:hover {\n  color: #459cb9 !important;\n  text-decoration: underline !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 p,\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 h2 {\n  margin: 0 0 10px 0 !important;\n  padding: 3px !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 ul,\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 ol {\n  margin-left: 40px !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 li {\n  padding: 2px 0 !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 kbd {\n  -webkit-border-radius: 5px !important;\n  -moz-border-radius: 5px !important;\n  border-radius: 5px !important;\n  border-style: solid !important;\n  border-width: 2px !important;\n  display: inline-block !important;\n  font-weight: bold !important;\n  margin: auto 2px !important;\n  padding: 1px 5px !important;\n  cursor: default !important;\n  background-color: #555555 !important;\n  border-color: #888888 #444444 #444444 #888888 !important;\n  color: #cccccc !important;\n  -webkit-box-shadow: 0 0 10px #939393 inset !important;\n  -moz-box-shadow: 0 0 10px #939393 inset !important;\n  box-shadow: 0 0 10px #939393 inset !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 kbd.mac_clipboard_314159265 {\n  background-color: #f8f8f8 !important;\n  border-color: #dddddd #aaaaaa #aaaaaa #dddddd !important;\n  color: #aaaaaa !important;\n  -webkit-box-shadow: 0 0 10px #dddddd inset !important;\n  -moz-box-shadow: 0 0 10px #dddddd inset !important;\n  box-shadow: 0 0 10px #dddddd inset !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 h2 {\n  font-size: 24px !important;\n  line-height: 36px !important;\n  font-weight: bold !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 .imageContainer_clipboard_314159265 {\n  text-align: center !important;\n  margin: 5px 0 !important;\n}\n#notification_container_clipboard_314159265 #notification_content_clipboard_314159265 .imageContainer_clipboard_314159265 img {\n  -webkit-border-radius: 2px !important;\n  -moz-border-radius: 2px !important;\n  border-radius: 2px !important;\n  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4) !important;\n  -moz-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4) !important;\n  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4) !important;\n}\n#imageSelector_container_clipboard_314159265 {\n  padding: 10px 10px 60px 10px !important;\n  position: fixed !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  right: 0 !important;\n  left: 0 !important;\n  overflow-y: auto !important;\n  overflow-x: hidden !important;\n  z-index: 214748364 !important;\n  vertical-align: top !important;\n  text-align: center !important;\n  line-height: 230px !important;\n}\n#imageSelector_container_clipboard_314159265 .imageSelector_image_clipboard_314159265 {\n  display: inline-block !important;\n  width: 200px !important;\n  height: 200px !important;\n  line-height: 200px !important;\n  overflow: hidden !important;\n  margin: 0 20px 10px 0 !important;\n  border: 5px solid #ffffff !important;\n  cursor: pointer !important;\n  background-color: #ddd !important;\n  text-align: center !important;\n  position: relative !important;\n  vertical-align: top !important;\n  -webkit-transition: background-color 0.3s ease-out;\n  -moz-transition: background-color 0.3s ease-out;\n  -o-transition: background-color 0.3s ease-out;\n  transition: background-color 0.3s ease-out;\n}\n#imageSelector_container_clipboard_314159265 .imageSelector_image_clipboard_314159265:hover {\n  background-color: #aaa !important;\n}\n#imageSelector_container_clipboard_314159265 .imageSelector_image_clipboard_314159265:hover:before {\n  content: \"Clip Image\" !important;\n  font-size: 20px !important;\n  text-shadow: 0px 0px 10px #000 !important;\n  color: #fff !important;\n  display: block  !important;\n  position: absolute !important;\n  pointer-events: none !important;\n  width: 100% !important;\n}\n#imageSelector_container_clipboard_314159265 .imageSelector_image_clipboard_314159265:hover img {\n  opacity: 1.0 !important;\n}\n#imageSelector_container_clipboard_314159265 .imageSelector_image_clipboard_314159265:after {\n  content: \"\\FEFF\" !important;\n}\n#imageSelector_container_clipboard_314159265 .imageSelector_image_clipboard_314159265 img {\n  opacity: 0.9 !important;\n  max-width: 200px !important;\n  max-height: 200px !important;\n  display: inline-block !important;\n  cursor: pointer !important;\n  vertical-align: middle !important;\n}\n#imageSelector_overlay_clipboard_314159265 {\n  position: fixed !important;\n  width: 100% !important;\n  height: 100% !important;\n  background-color: #000 !important;\n  opacity: 0. !important;\n  z-index: 214748363 !important;\n  top: 0 !important;\n  left: 0 !important;\n}\n#zoom_clipboard_314159265 {\n  position: absolute !important;\n  opacity: 0 !important;\n  filter: alpha(opacity=0) !important;\n  -webkit-box-shadow: -3px 3px 10px rgba(0, 0, 0, 0.4) !important;\n  -moz-box-shadow: -3px 3px 10px rgba(0, 0, 0, 0.4) !important;\n  box-shadow: -3px 3px 10px rgba(0, 0, 0, 0.4) !important;\n  border-style: solid !important;\n  -webkit-border-radius: 2px !important;\n  -moz-border-radius: 2px !important;\n  border-radius: 2px !important;\n  z-index: 214748363 !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n}\n#zoom_clipboard_314159265.zoomInverted_clipboard_314159265 {\n  opacity: 1 !important;\n  filter: alpha(opacity=100) !important;\n  -webkit-box-shadow: 0 0 5px #fff !important;\n  -moz-box-shadow: 0 0 5px #fff !important;\n  box-shadow: 0 0 5px #fff !important;\n  background-color: transparent !important;\n  border-width: 0 !important;\n}\n#zoomHelp_clipboard_314159265,\n#textHelp_clipboard_314159265 {\n  left: 50% !important;\n  margin-left: -225px !important;\n  width: 450px !important;\n  top: 20px !important;\n  color: white !important;\n  font-size: 18px !important;\n  font-family: 'open sans', \"Helvetica Neue\", Helvetica, Arial, sans-serif !important;\n  z-index: 214748364 !important;\n  padding: 15px !important;\n  background-color: #000000 !important;\n  text-align: center !important;\n  -webkit-border-radius: 5px !important;\n  -moz-border-radius: 5px !important;\n  border-radius: 5px !important;\n  -webkit-box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  opacity: 0.8 !important;\n}\n.invertedBox_clipboard_314159265 {\n  position: absolute !important;\n  display: none !important;\n  background-color: #000000 !important;\n}\n.invertedBox_clipboard_314159265 {\n  z-index: 214748362 !important;\n}\n#canvas_clipboard_314159265 {\n  position: fixed;\n  top: 0 !important;\n  left: 0 !important;\n  opacity: 0 !important;\n  filter: alpha(opacity=0) !important;\n  z-index: 214748364 !important;\n  width: 100% !important;\n  height: 100% !important;\n  background: #000000 !important;\n}\n#overlay_clipboard_314159265 {\n  opacity: 0 !important;\n  filter: alpha(opacity=0) !important;\n  width: 150% !important;\n  height: 100% !important;\n  z-index: 214748365 !important;\n  background-color: #000000 !important;\n}\n#viewer_clipboard_314159265 {\n  background-color: #e7e6e3 !important;\n  z-index: 214748365 !important;\n  -webkit-box-shadow: 0 10px 20px rgb(0,0,0) !important;\n  -moz-box-shadow: 0 10px 20px rgb(0,0,0) !important;\n  box-shadow: 0 10px 20px rgb(0,0,0) !important;\n}\n";
        inlinedCss = inlinedCss.replace(/##STATICBASEURL##/g, this.staticBaseUrl);
        if (document.createStyleSheet) try {
                document.createStyleSheet().cssText = inlinedCss
        } catch (a) {
            document.styleSheets[0] && (document.styleSheets[0].cssText += inlinedCss)
        } else this.$("head").append(this.$("<style/>").attr({
                id: client.util.stylesheetId,
                type: "text/css"
            }).text(inlinedCss));
        return this.trigger("initialized"), !0
    }
    function initializeForRequest() {
        perRequestCache.support || (perRequestCache.support = {
            rgba: supportsRgba(this.$),
            dpi: calculateDpi(this.$),
            regexSplit: "x y".split(/(\s)/).length === 3
        });
        if (!perRequestCache.browser) {
            var e = window.navigator.userAgent.toString(),
                t, n;
            (t = /MSIE (\d+)/.exec(e)) ? n = "IE" + t[1] : (t = /(Chrome|Safari|Opera|Firefox)/.exec(e)) ? n = t[1] : n = e, perRequestCache.browser = n
        }
        if (!perRequestCache.modifier) {
            var r = /Macintosh/i.test(window.navigator.userAgent.toString());
            perRequestCache.modifier = {
                matches: r ? function (e) {
                    return e.ctrlKey
                } : function (e) {
                    return e.shiftKey && e.altKey
                },
                toString: r ? function () {
                    return "ctrl"
                } : function () {
                    return "shift + alt"
                }
            }
        }
        return this.browser = perRequestCache.browser, this.modifier = perRequestCache.modifier, this.support = perRequestCache.support, !0
    }
    function Clipper(e, t) {
        client.EventEmitter.call(this), client.ActivatableControl.call(this), t = client.util.merge(client.util.merge({}, defaultOptions), t);
        var n = t.baseUrl;
        this.scope = e || window.document.documentElement, this.document = this.scope.ownerDocument, this.documentId = getDocumentId(this.document), this.preferences = {}, this.allowedMetrics = t.allowedMetrics, this.baseUri = window.location.protocol + "//" + n + "/", this.staticBaseUrl = t.staticBaseUrl, this.siteVersion = t.siteVersion, this.domain = n, this.instanceId = t.instanceId, this.origin = t.origin || "default", this.bookmarkletVersion = t.bookmarkletVersion, this.currentNotification = null, this.debug = t.debug || {}, this.documentId < 0 && (documents.push(this.document), this.documentId = documents.length - 1), this.user = {
            guid: "",
            sessionId: ""
        };
        var r;
        if (r = /^(https?):\/\/www\.clipboard\.com\//.exec(this.baseUri)) this.baseUri = r[1] + "://clipboard.com/";
        /^http/.test(this.staticBaseUrl) || (this.staticBaseUrl = window.location.protocol + this.staticBaseUrl), perDocumentCache[this.documentId] || (perDocumentCache[this.documentId] = {
            env: {
                iHatePrototype: workAroundPrototype(this.document)
            },
            baseData: {},
            $: null,
            bodyOffset: {}
        }), this.$ = perDocumentCache[this.documentId].$, this.env = perDocumentCache[this.documentId].env, this.baseData = perDocumentCache[this.documentId].baseData, this.defaultTitle = client.util.trim(this.document.title) || this.document.location.href, initializeForDocument.call(this), initializeForRequest.call(this);
        var i = this.createControlContext();
        this.ui = t.createUiThunk(i), this.dao = new client.DataAccess(this.baseUri, this.$.ajax, this.xdm), this.controls = [this.ui], this.selectors = t.populateSelectorsThunk(i), wireUpEvents.call(this), this.on("activated", function () {
            this.activeSelector ? clipBegin.call(this, this.activeSelector.type, !0) : this.dao.fetchUserData()
        }), this.env.iHatePrototype.stupidFuckingPrototype && logMetric.call(this, "info", {
            data: "badPrototypeVersion"
        }), Clipper.instances[this.origin] || (Clipper.instances[this.origin] = {}), Clipper.instances[this.origin][this.instanceId] = this
    }
    var perRequestCache = {}, perDocumentCache = {}, documents = [],
        client = window.CLIPBOARD.client,
        defaultOptions = {
            populateSelectorsThunk: function (e) {
                return {
                    text: new client.selectors.TextSelector(e),
                    rectangle: new client.selectors.RectangleSelector(e),
                    image: new client.selectors.ImageSelector(e),
                    bookmark: new client.selectors.NullSelector(e, "bookmark", client.extractors.BookmarkExtractor),
                    reader: new client.selectors.NullSelector(e, "reader", client.extractors.ReaderExtractor)
                }
            },
            createUiThunk: function (e) {
                return new client.ui.FixedBarUiController(e)
            },
            allowedMetrics: null
        };
    Clipper.instances = {}, Clipper.checkedLoginStatus = !1, client.util.inherit(Clipper, new client.ActivatableControl, new client.EventEmitter), Clipper.prototype.constructor = Clipper, Clipper.prototype.createClip = function () {
        var e = {
            source: window.location.href,
            date: (new Date).toString(),
            type: "clip",
            version: "0.2",
            title: "",
            html: "",
            text: "",
            annotation: "",
            client: "clipper",
            width: 0,
            height: 0,
            top: null,
            left: null,
            "private": !0,
            blobSchemaVersion: "0.2"
        };
        return function (t) {
            return client.util.merge(client.util.merge({}, client.util.merge(e, {
                title: this.defaultTitle
            })), t)
        }
    }(), Clipper.prototype.shouldLogMetric = function (e) {
        return !this.allowedMetrics || this.allowedMetrics[e]
    }, Clipper.prototype.setActiveSelectorByContext = function () {
        for (var e in this.selectors) {
            if (!this.selectors.hasOwnProperty(e)) continue;
            if (!this.selectors[e].shouldUseAsDefault()) continue;
            this.setActiveSelector(e);
            return
        }
        this.setActiveSelector(defaultSelectorType.call(this))
    }, Clipper.prototype.setActiveSelector = function (e) {
        if (!this.selectors[e]) return;
        if (this.activeSelector === this.selectors[e]) return;
        this.activeSelector && (this.activeSelector.deactivate(), this.removeControl(this.activeSelector)), this.activeSelector = this.selectors[e], this.controls.push(this.activeSelector)
    }, Clipper.prototype.doActivate = function () {
        var e = !0;
        return function () {
            e ? e = !1 : this.trigger("reloaded")
        }
    }(), Clipper.prototype.createControlContext = function () {
        return {
            $: this.$,
            xdm: this.xdm,
            document: this.document,
            baseUri: this.baseUri,
            baseData: this.baseData,
            bodyOffset: this.bodyOffset,
            support: this.support,
            preferences: this.preferences,
            staticBaseUrl: this.staticBaseUrl,
            domain: this.domain,
            origin: this.origin,
            siteVersion: this.siteVersion,
            browser: this.browser,
            modifier: this.modifier
        }
    }, client.Clipper = Clipper
})(window);
(function (e) {
    var t;
    e || (t = window.CLIPBOARD = window.CLIPBOARD || {}, e = t.thumbnailer = t.thumbnailer || {}), e.maxArea = 24e6
})(typeof process == "undefined" || !process.versions ? null : exports);
(function (e) {
    function r(e) {
        var t = e.doctype;
        return !t || !t.name ? "" : "<!DOCTYPE " + t.name + (t.publicId ? ' PUBLIC "' + t.publicId + '"' : "") + (!t.publicId && t.systemId ? " SYSTEM" : "") + (t.systemId ? ' "' + t.systemId + '"' : "") + ">"
    }
    function i() {
        var e = this.$,
            n = this.document,
            i = {
                html: "",
                text: ""
            };
        if (!n.implementation || !n.implementation.createHTMLDocument) return i;
        var s = n.implementation.createHTMLDocument(""),
            o = s.createElement("div");
        o.appendChild(s.importNode(n.documentElement, !0));
        var u = e(o),
            a = u[0].getElementsByTagName("*"),
            f = n.getElementsByTagName("*");
        if (a.length === f.length) for (var l = 0; l < f.length; l++) {
                var c = (/url\(['"]?(.+?)['"]?\)/.exec(e(f[l]).css("background-image")) || [])[1];
                if (c) {
                    var h = t.util.normalizeUri(c, this.baseData),
                        p = a[l].getAttribute("style");
                    p = (p ? p + ";" : "") + "background-image: url(" + h + ")", a[l].setAttribute("style", p)
                }
        }
        return u.find("[" + t.util.doNotClipAllAttributeName + "]").remove().end().find("[" + t.util.doNotClipAttributeName + "]").remove().end().find("#" + t.util.stylesheetId).remove().end().find("meta").remove().end().find('link[href^="' + this.staticBaseUrl + '"]').remove().end().find("script").remove().end().find("." + t.util.rewriteClass).each(function () {
            var t = e(this),
                r = t.children();
            if (r.length === 0) {
                var i = t.text();
                i ? t.replaceWith(n.createTextNode(i)) : t.remove()
            } else r.length > 0 ? t.replaceWith(t.contents()) : t.removeAttr("class")
        }), t.util.forEach(this.tweakers, function (t, n) {
            if (!t) return;
            u.find(n).each(function () {
                t.tweakFully(e(this), e(this))
            })
        }), i.attrs = t.util.getAttributes(u.find("body")[0]), i.body = u.find("body").html(), i.head = u.find("head").html(), i.html = r(this.document) + "\n" + u.html(), i.text = u.words(), i
    }
    function s(t, r) {
        var s = i.call(this),
            o = s.html ? null : "0.1",
            u = 1280,
            a = 1024;
        if (s.html) {
            a = Math.min(this.$(this.document).height(), Math.max(this.$(e).height(), Math.round(n / u)));
            var f = this.$(this.document).height()
        }
        this.trigger("extracted", {
            elapsedTime: 0,
            attrs: s.attrs,
            html: s.html,
            text: s.text,
            body: s.body,
            head: s.head,
            compressedHtml: s.html,
            dimensions: {
                width: u,
                height: a,
                trueHeight: f
            },
            top: 0,
            left: 0,
            clipType: r.clipType,
            selectionType: r.selectionType,
            version: o
        })
    }
    function o(e) {
        t.ActivatableControl.call(this), t.EventEmitter.call(this), t.extractors.TweakableExtractor.call(this), this.$ = e.$, this.document = e.document, this.baseData = e.baseData, this.baseUri = e.baseUri, this.staticBaseUrl = e.staticBaseUrl, this.tweakers = this.createTweakers(["button", "table", "input"]), this.tweakers.link = this.tweakers.a
    }
    var t = e.CLIPBOARD.client,
        n = e.CLIPBOARD.thumbnailer.maxArea;
    t.util.inherit(o, new t.extractors.TweakableExtractor, new t.ActivatableControl, new t.EventEmitter), t.util.merge(o.prototype, {
        constructor: o,
        extract: s,
        type: "bookmark"
    }), t.extractors.BookmarkExtractor = o
})(window);;