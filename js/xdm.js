var USTORE = function () {
    var e, t, n, r, i, s, o, u, a, f = {
            setValue: function (i, s, u) {
                e ? u && t ? sessionStorage.setItem(i, s) : localStorage.setItem(i, s) : n && (u ? (o.setAttribute(i, s), o.save(a)) : (r.setAttribute(i, s), r.save(ieDb)))
            },
            getValue: function (i, s) {
                var u = "";
                return e ? s && t ? u = sessionStorage.getItem(i) : u = localStorage.getItem(i) : n && (s ? (o.load(a), u = o.getAttribute(i)) : (r.load(ieDb), u = r.getAttribute(i))), u
            },
            deleteValue: function (t, i) {
                e ? this.setValue(t, null, i) : n && (i ? (o.removeAttribute(t), o.save(a)) : (r.removeAttribute(t), r.save(ieDb)))
            },
            clearDB: function (t) {
                e ? t ? sessionStorage.clear() : localStorage.clear() : n && l.clearDB(t)
            }
        }, l = {
            detectIE: function () {
                if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                    var e = new Number(RegExp.$1);
                    if (e >= 5.5 && e <= 8) return !0
                }
                return !1
            },
            init: function () {
                var e = document.createElement("meta");
                e.name = "save", e.content = "userdata", document.getElementsByTagName("head").item(0).appendChild(e);
                var t = (new Date).getTime(),
                    n = document.createElement("div");
                i = "ie-db-" + t, ieDb = "userStorage", n.setAttribute("id", i);
                var s = document.getElementsByTagName("body")[0];
                s.appendChild(n), r = document.getElementById(i), r.style.behavior = "url('#default#userData')", r.style.display = "none";
                if (window.name === null || window.name === undefined || window.name === "") window.name = "ie-sesh-db-" + t;
                u = window.name, a = u, n = document.createElement("div"), n.setAttribute("id", u), r.appendChild(n), o = document.getElementById(u), o.style.behavior = "url('#default#userData')", o.style.display = "none"
            },
            clearDB: function (e) {
                var t = (new Date).getTime(),
                    n = document.createElement("div"),
                    i = e ? o : r,
                    s = e ? a : ieDb,
                    u = i.xmlDocument,
                    f = u.firstChild.attributes,
                    l, c = f.length;
                while (0 <= --c) l = f[c], i.removeAttribute(l.nodeName);
                i.save(s)
            }
        };
    return {
        init: function () {
            if (typeof window.localStorage == "object") {
                e = !0;
                try {
                    typeof window.sessionStorage == "object" && (t = !0)
                } catch (r) {
                    t = !1
                }
            } else l.detectIE() && (n = !0, l.init())
        },
        setValue: function (e, t) {
            f.setValue(e, t, !1)
        },
        setSessionValue: function (e, t) {
            f.setValue(e, t, !0)
        },
        getValue: function (e) {
            return f.getValue(e, !1)
        },
        getSessionValue: function (e) {
            return f.getValue(e, !0)
        },
        deleteValue: function (e) {
            f.deleteValue(e, !1)
        },
        deleteSessionValue: function (e) {
            f.deleteValue(e, !0)
        },
        clearLocalStorage: function () {
            f.clearDB(!1)
        },
        clearSessionStorage: function () {
            f.clearDB(!0)
        },
        clearDOMStorage: function () {
            f.clearDB(!1), f.clearDB(!0)
        }
    }
}();
(function (e) {
    var t = e.CLIPBOARD = e.CLIPBOARD || {}, n = t.store = t.store || {}, r = t.tracker,
        i = !1;
    try {
        USTORE.init(), i = !0
    } catch (s) {
        r && r.track && r.track(r.events.ustoreFail, {
            error: s.toString()
        })
    }
    n.get = function (e) {
        if (!i) return null;
        var t = USTORE.getValue(e);
        return t == null || t == "" || t == "null" ? null : t
    }, n.set = function (e, t) {
        i && USTORE.setValue(e, t)
    }, n.del = function (e) {
        i && USTORE.deleteValue(e)
    }
})(window);

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
};
this.JSON || (this.JSON = {}),
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
        a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
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
    typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
        var r;
        gap = "", indent = "";
        if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " ";
        else typeof n == "string" && (indent = n);
        rep = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                "": e
            });
        throw new Error("JSON.stringify")
    }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
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
}();
(function (e, t, n, r) {
    function l(e) {
        var t = [];
        return n.each(e, function (e, n) {
            t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
        }), t.sort().join("&")
    }
    function h(e, t) {
        var r = e.sign || !1,
            o = e.verb || null,
            u = e.path || null,
            l = e.cache || !1,
            c = e.raw || null,
            h = e.jsonp || !1,
            p = e.jsonpCallbackName || null;
        if (!o || !u) return;
        if (h && o != "GET") return;
        var d = "";
        /^\/\//.test(u) ? d = u : d = a + u;
        var v = (new Date).getTime() + f,
            m = function (e, n, r) {
                t && t(e.error, e.result, e.requestBody)
            }, g = function (e, n, r) {
                if (!t) return;
                e.status >= 500 ? t({
                    noConnection: !0,
                    statusCode: e.status
                }, null) : t({
                    unknown: !0,
                    statusCode: e.status
                }, null)
            }, y = o === "GET",
            b, w, E;
        i.log && i.log.net(u);
        if (y) {
            r && s.guid() && s.secret() && (b = s.guid(), w = s.secret(), E = s.signMessage(d, null, v, b, w), d.indexOf("?") === -1 ? d += "?" + E.msg : d += "&" + E.msg);
            if (h) {
                var S = {
                    type: o,
                    dataType: "jsonp",
                    url: d,
                    cache: l,
                    async: !0,
                    success: m,
                    error: g
                };
                p && (S.jsonp = !1, S.jsonpCallback = p), n.ajax(S)
            } else n.ajax({
                    type: o,
                    url: d,
                    cache: l,
                    async: !0,
                    success: m,
                    error: g
                })
        } else {
            var x = c;
            r && (b = s.guid(), w = s.secret(), E = s.signMessage(d, c, v, b, w), x = E.msg), n.ajax({
                type: o,
                url: d,
                data: x,
                cache: l,
                async: !0,
                success: m,
                error: g
            })
        }
    }
    var i = e.CLIPBOARD = e.CLIPBOARD || {}, s = i.data = i.data || {}, o = i.store = i.store || {}, u = e.location,
        a = u.protocol + "//" + u.host,
        f = parseInt(e.CLIPBOARD.time) - (new Date).getTime(),
        c = 0;
    s.signMessage = function (e, t, r, i, s) {
        var o = l(n.extend({
            hmac_url: encodeURIComponent(e),
            hmac_time: encodeURIComponent(r),
            hmac_guid: encodeURIComponent(i),
            hmac_nonce: sha1(e + (new Date).getTime() + s + ++c)
        }, t)),
            u = sha1(o + s);
        return {
            msg: o + "&hmac_sig=" + u,
            sig: u
        }
    };
    var p = s.localSignPost = function (e, t, n) {
        h({
            sign: !0,
            verb: "POST",
            path: e,
            raw: t
        }, n)
    }, d = s.localPost = function (e, t, n) {
            h({
                verb: "POST",
                path: e,
                raw: t
            }, n)
        }, v = s.localSignPut = function (e, t, n) {
            h({
                sign: !0,
                verb: "PUT",
                path: e,
                raw: t
            }, n)
        }, m = s.localSignGet = function (e, t) {
            h({
                sign: !0,
                verb: "GET",
                path: e
            }, t)
        }, g = s.localGet = function (e, t, n) {
            h({
                verb: "GET",
                path: e,
                cache: t
            }, n)
        }, y = s.localSignDelete = function (e, t, n) {
            h({
                sign: !0,
                verb: "DELETE",
                path: e,
                raw: t
            }, n)
        }, b = function (e, t, n, r) {
            h({
                verb: "GET",
                path: e,
                cache: t,
                jsonp: !0,
                jsonpCallbackName: n
            }, r)
        };
    s.secret = function () {
        return o.get("secret")
    }, s.login = function () {
        return o.get("login")
    }, s.guid = function () {
        return o.get("guid")
    }, s.tabCounts = function (e, t) {
        p("/api/v1/tabCounts", e, function (e, n) {
            t.apply(this, arguments)
        })
    }, s.getTrackingId = function () {
        return o.get("trackingId") != null ? o.get("trackingId") : mixpanel && mixpanel.get_property ? mixpanel.get_property("distinct_id") : null
    }, s.searchPrivate = function (e, t, n, r, i) {
        var s = {
            scope: JSON.stringify(e)
        };
        t && (s.query = t), n && (s.beforeTime = n), r && (s.rows = r), p("/api/v1/searchPrivate", s, function (e, t) {
            i.apply(this, arguments)
        })
    }, s.searchPublic = function (e, t, n, r, i, s) {
        var o = {
            scope: JSON.stringify(e)
        };
        t && (o.query = t), n && (o.beforeTime = n), r && (o.rows = r), i && (o.invite = i), p("/api/v1/searchPublic", o, s)
    }, s.searchUsers = function (e, t, n, r) {
        m("/api/v1/users/search?q=" + e + "&start=" + t + "&rows=" + n, r)
    }, s.getPopularUsers = function (e) {
        m("/api/v1/users/popular", e)
    }, s.getClip = function (e, t) {
        g("/api/v1/clips/" + e, !1, function (e, n) {
            t(e, n)
        })
    }, s.getTop = function (e, t, n) {
        g("/api/v1/top/" + e + "/" + t, !1, n)
    }, s.getRecommendedTags = function (e) {
        g("/api/v1/recommendedTags", !0, e)
    };
    var w = {};
    s.getBlob = function (e, t) {
        var n, r;
        n = "/api/v2/blobs/" + e, i.config.staticBaseUrl ? (r = "getBlobJsonPCallback_" + e, w[r] ? w[r].push(t) : (w[r] = [t], n = i.config.staticBaseUrl + n + "/" + r, b(n, !0, r, function (e, t) {
            var n, i;
            i = w[r];
            for (n = 0; n < i.length; ++n) i[n](e, t);
            delete w[r]
        }))) : g(n, !0, function (e, n) {
            t(e, n)
        })
    }, s.setClipAsPublic = function (e, t, n) {
        v("/api/v1/clips/" + e, {
            isPrivate: !t
        }, function (e, t) {
            n(e)
        })
    }, s.setNoteHTML = function (e, t, n) {
        p("/api/v2/blobs/" + e, t, n)
    }, s.setClipAnnotation = function (e, t, n) {
        v("/api/v1/clips/" + e, {
            annote: t
        }, function (e, t) {
            n(e)
        })
    }, s.setClipTitle = function (e, t, n) {
        v("/api/v1/clips/" + e, {
            title: t
        }, function (e, t) {
            n(e)
        })
    }, s.reclip = function (e, t, n) {
        typeof t == "function" && (n = t, t = {});
        var r = {
            reclip: !0
        };
        r.title = t.title, r.annote = t.annote, r.boards = t.boards, r["private"] = t["private"], p("/api/v1/clips/" + e, r, function (e, t) {
            n(e)
        })
    }, s.getLikedClips = function (e, t, n, r) {
        !r && typeof n == "function" && (r = n, n = null), n ? g("/api/v1/likes/clips?start=" + e + "&rows=" + t + "&user=" + n, !1, r) : m("/api/v1/likes/clips?start=" + e + "&rows=" + t, r)
    }, s.like = function (e, t, n) {
        v("/api/v1/likes/" + e, {
            addOrRemove: t
        }, function (e, t) {
            n(e)
        })
    }, s.addOpenAction = function (e, t) {
        d("/api/v1/actions/open/" + e, t)
    }, s.getActions = function (e, t, n) {
        if (!e || e.length <= 0) {
            n("need at least one clip id to fetch actions for");
            return
        }
        var r = "";
        typeof e == "string" ? r = e : e.join && (r = e.join(","));
        var i = "/api/v1/actions/" + r;
        t ? m(i, n) : g(i, !1, function (e, t) {
            n && n(e, t)
        })
    }, s.getHotClips = function (e, t, n, r) {
        m("/api/v1/hot?start=" + e + "&rows=" + t + "&type=" + n, r)
    }, s.getComments = function (e, t) {
        if (!e || e.length <= 0) {
            t("need at least one clip id to fetch comments for");
            return
        }
        var n = "";
        typeof e == "string" ? n = e : e.join && (n = e.join(",")), g("/api/v1/comments/" + n, !1, function (e, n) {
            t(e, n)
        })
    }, s.addComment = function (e, t, n) {
        v("/api/v1/comments/" + e, {
            text: t
        }, function (e, t) {
            n(e, t)
        })
    }, s.deleteComment = function (e, t, n) {
        y("/api/v1/comments/" + e, {
            clipId: t
        }, function (e, t) {
            n(e, t)
        })
    }, s.getCounts = function (e, t) {
        var n = "/api/v1/users/" + e + "/counts";
        m(n, function (e, n) {
            t(e, n)
        })
    }, s.getMessage = function (e) {
        var t = "/api/v1/message";
        g(t, !1, function (t, n) {
            e(t, n)
        })
    }, s.updateUserProfile = function (e, t) {
        v("/api/v1/users/", e, t)
    }, s.emailClip = function (e, t, n) {
        p("/api/v1/share/emailClip", {
            clipId: e,
            toEmail: t
        }, n)
    }, s.getFacebookFriendList = function (e) {
        m("/api/v1/secure/fb/friendsList", e)
    }, s.getEmailContacts = function (e) {
        m("/api/v1/secure/emailContacts", e)
    }, s.addEmailContacts = function (e, t) {
        p("/api/v1/secure/emailContacts", {
            contacts: JSON.stringify(e)
        }, t)
    }, s.connectFacebookAccount = function (e, t, n, r) {
        p("/api/v1/secure/fb/connect/", {
            fbId: e,
            fbAccessToken: t,
            fetchAvatar: n
        }, r)
    }, s.disconnectFacebookAccount = function (e) {
        y("/api/v1/secure/fb/connect/", {}, e)
    }, s.disconnectFbTimeline = function (e) {
        y("/api/v1/fb/timeline/", {}, e)
    }, s.disconnectFbStream = function (e) {
        y("/api/v1/fb/stream/", {}, e)
    }, s.connectGoogleAccount = function (e, t) {
        p("/api/v1/secure/google/connect", {
            code: e
        }, t)
    }, s.connectYahooAccount = function (e, t, n, r) {
        p("/api/v1/secure/yahoo/connect", {
            token: e,
            tokenSecret: t,
            verifier: n
        }, r)
    }, s.connectTwitterAccount = function (e, t, n, r) {
        p("/api/v1/secure/twitter/connect", {
            token: e,
            tokenSecret: t,
            verifier: n
        }, r)
    }, s.disconnectTwitterAccount = function (e) {
        y("/api/v1/secure/twitter/connect/", {}, e)
    }, s.getTwitterFriends = function (e) {
        m("/api/v1/secure/twitter/friends", e)
    }, s.getTwitterIds = function (e, t) {
        p("/api/v1/secure/twitter/ids", {
            method: e
        }, t)
    }, s.getTwitterData = function (e, t) {
        p("/api/v1/secure/twitter/data", {
            ids: e
        }, t)
    }, s.postTweet = function (e, t) {
        p("/api/v1/secure/twitter/tweet", {
            tweet: e
        }, t)
    }, s.connectLinkedinAccount = function (e, t, n, r) {
        p("/api/v1/secure/linkedin/connect", {
            token: e,
            tokenSecret: t,
            verifier: n
        }, r)
    }, s.disconnectLinkedinAccount = function (e) {
        y("/api/v1/secure/linkedin/connect", {}, e)
    }, s.getLinkedinContacts = function (e) {
        m("/api/v1/secure/linkedin/contacts", e)
    }, s.sendLinkedinMessage = function (e, t, n, r) {
        p("/api/v1/secure/linkedin/sendmessage", {
            msgSubject: e,
            msgBody: t,
            personUrl: n
        }, r)
    }, s.lookupUser = function (e, t) {
        g("/api/v1/users/lookup?" + l(e), !1, t)
    }, s.getConnections = function (e, t) {
        typeof e == "function" && !t && (t = e, e = r);
        var n = e ? "?refreshIfOlderThan=" + e : "";
        m("/api/v1/connections" + n, t)
    }, s.getAutocompleteDict = function (e) {
        s.localSignGet("/api/v1/autocomplete", function (t, n) {
            e && e(t, n)
        })
    }, s.getNotifications = function (e) {
        m("/api/v2/notifications?markRead=1", e)
    }, s.getNotificationsPublic = function (e, t) {
        g("/api/v1/notifications/public/" + e, !1, t)
    }, s.getUnreadNotificationCount = function (e) {
        m("/api/v1/notifications/unreadCount", e)
    }, s.sendInvite = function (e, t) {
        p("/api/v1/invites/sendInvite", {
            email: e
        }, t)
    }, s.trackInvite = function (e, t, n) {
        var r = {
            type: e,
            to: t
        };
        n && (r.fbRequestId = n), p("/api/v1/invites/trackInvite", r)
    }, s.sendFeedback = function (e, t) {
        p("/api/v1/feedback", {
            message: e
        }, function (e, n) {
            t(e)
        })
    }, s.addFollow = function (e, t) {
        p("/api/v1/follow", {
            item: e
        }, function (e, n) {
            t(e)
        })
    }, s.deleteFollow = function (e, t) {
        y("/api/v1/follow/" + encodeURIComponent(encodeURIComponent(e)), {}, function (e, n) {
            t(e)
        })
    }, s.testFollow = function (e, t) {
        m("/api/v1/follows/" + e.join(","), function (e, n) {
            t(e, n)
        })
    }, s.getFollowers = function (e, t) {
        g("/api/v1/followers/" + e, !0, function (e, n) {
            t(e, n)
        })
    }, s.getFollowing = function (e, t) {
        g("/api/v1/following/" + e, !0, function (e, n) {
            t(e, n)
        })
    }, s.updateBoard = function (e, t, n, r) {
        v("/api/v1/users/" + e + "/boards/" + encodeURIComponent(encodeURIComponent(t)), {
            description: n
        }, function (e, t) {
            r(e)
        })
    }, s.getBoard = function (e, t, n) {
        m("/api/v1/users/" + e + "/boards/" + encodeURIComponent(encodeURIComponent(t)), function (e, t) {
            n(e, t)
        })
    }, s.getSession = function (e) {
        m("/api/v1/sessions", function (t, n) {
            e(t, n)
        })
    }, s.requestEmailVerification = function (e, t) {
        var n = "/api/v1/validateemail";
        t && (n += "/" + t), p(n, {}, function (t, n) {
            e(t, n)
        })
    }, s.getEmailVerification = function (e) {
        var t = "/api/v1/validateemail";
        m(t, function (t, n) {
            e(t, n)
        })
    }, s.uploadAvatar = function (e, t) {
        p("/api/v1/secure/users/avatar", {
            facebookId: e
        }, t)
    }, s.flagAsInappropriate = function (e, t, n) {
        p("/api/v1/inappropriate", {
            clipId: e,
            reason: t || "[none]"
        }, n)
    }, s.getMobileHTMLFeaturedUsers = function (e, t, n) {
        m("/api/v1/clients/mobilehtml-featuredUsers?start=" + e + "&rows=" + t, n)
    }, s.checkExportStatus = function (e) {
        m("/api/v1/export/checkStatus", e)
    }, s.beginExport = function (e) {
        p("/api/v1/export/beginExport", null, e)
    }
})(window, document, jQuery);
(function (e, t, n, r, i, s) {
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
})(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent);
(function (e) {
    e.cookie = function (t, n, r) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(n)) || n === null || n === undefined)) {
            r = e.extend({}, r);
            if (n === null || n === undefined) r.expires = -1;
            if (typeof r.expires == "number") {
                var i = r.expires,
                    s = r.expires = new Date;
                s.setDate(s.getDate() + i)
            }
            return n = String(n), document.cookie = [encodeURIComponent(t), "=", r.raw ? n : encodeURIComponent(n), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join("")
        }
        r = n || {};
        var o = r.raw ? function (e) {
                return e
            } : decodeURIComponent,
            u = document.cookie.split("; ");
        for (var a = 0, f; f = u[a] && u[a].split("="); a++) if (o(f[0]) === t) return o(f[1] || "");
        return null
    }
})(jQuery);
(function (e, t, n) {
    function i(e, t) {
        var n = {
            error: !0,
            message: "badly formed request",
            request: e ? e.data : null
        };
        u(n, t)
    }
    function s(e, t) {
        return function (e, n) {
            u({
                error: e,
                result: n
            }, t)
        }
    }
    function o() {
        n.cookie("cookiesEnabled", !0);
        var e = !! n.cookie("cookiesEnabled");
        return n.cookie("cookiesEnabled", null), e
    }
    function u(e, t) {
        var n;
        try {
            n = JSON.stringify(e)
        } catch (r) {
            n = JSON.stringify({
                error: {
                    invalidPacket: !0
                }
            })
        }
        t.postMessage(n)
    }
    var r = e.CLIPBOARD,
        a = {
            fetchUserData: function (e, t) {
                var i = {
                    config: r.config,
                    sid: n.cookie("sid"),
                    loggedIn: !1,
                    login: "",
                    thirdPartyCookiesEnabled: o(),
                    preferences: {}
                };
                if (!i.thirdPartyCookiesEnabled) {
                    u(i, t);
                    return
                }
                var s = r.data.guid(),
                    a = r.data.secret();
                if (!s || !a) {
                    u(i, t);
                    return
                }
                r.data.localSignGet("/api/v1/clipper/userData", function (e, r) {
                    u(n.extend(i, r || {}), t)
                })
            },
            handleApiCall: function () {
                function e(e) {
                    if (!e || !e.APIpath || !e.data) return null;
                    switch (e.method) {
                    case "POST":
                        return "localSignPost";
                    case "PUT":
                        return "localSignPut";
                    case "DELETE":
                        return "localSignDelete";
                    default:
                        return null
                    }
                }
                return function (t, n) {
                    var o = r.data[e(t)];
                    if (!o) {
                        i(t, n);
                        return
                    }
                    o(t.APIpath, t.data, s(t, n))
                }
            }()
        };
    n(t).ready(function () {
        var e = new easyXDM.Socket({
            onMessage: function (t, n) {
                var r, s;
                try {
                    r = JSON.parse(t), s = a[r.action] || a.handleApiCall, s(r, e)
                } catch (o) {
                    i(r, e)
                }
            }
        })
    })
})(window, document, jQuery);