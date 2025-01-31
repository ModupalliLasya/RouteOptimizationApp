/*! UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */ ! function(t) {
    if ("function" == typeof define && define.amd && define("uikit", function() {
            var i = window.UIkit || t(window, window.jQuery, window.document);
            return i.load = function(t, e, n, o) {
                var s, a = t.split(","),
                    r = [],
                    l = (o.config && o.config.uikit && o.config.uikit.base ? o.config.uikit.base : "").replace(/\/+$/g, "");
                if (!l) throw new Error("Please define base path to UIkit in the requirejs config.");
                for (s = 0; s < a.length; s += 1) {
                    var c = a[s].replace(/\./g, "/");
                    r.push(l + "/components/" + c)
                }
                e(r, function() {
                    n(i)
                })
            }, i
        }), !window.jQuery) throw new Error("UIkit requires jQuery");
    window && window.jQuery && t(window, window.jQuery, window.document)
}(function(t, i, e) {
    "use strict";
    var n = {},
        o = t.UIkit ? Object.create(t.UIkit) : void 0;
    if (n.version = "2.27.2", n.noConflict = function() {
            return o && (t.UIkit = o, i.UIkit = o, i.fn.uk = o.fn), n
        }, n.prefix = function(t) {
            return t
        }, n.$ = i, n.$doc = n.$(document), n.$win = n.$(window), n.$html = n.$("html"), n.support = {}, n.support.transition = function() {
            var t = function() {
                var t, i = e.body || e.documentElement,
                    n = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (t in n)
                    if (void 0 !== i.style[t]) return n[t]
            }();
            return t && {
                end: t
            }
        }(), n.support.animation = function() {
            var t = function() {
                var t, i = e.body || e.documentElement,
                    n = {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd oanimationend",
                        animation: "animationend"
                    };
                for (t in n)
                    if (void 0 !== i.style[t]) return n[t]
            }();
            return t && {
                end: t
            }
        }(), function() {
            Date.now = Date.now || function() {
                return (new Date).getTime()
            };
            for (var t = ["webkit", "moz"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) {
                var e = t[i];
                window.requestAnimationFrame = window[e + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var n = 0;
                window.requestAnimationFrame = function(t) {
                    var i = Date.now(),
                        e = Math.max(n + 16, i);
                    return setTimeout(function() {
                        t(n = e)
                    }, e - i)
                }, window.cancelAnimationFrame = clearTimeout
            }
        }(), n.support.touch = "ontouchstart" in document || t.DocumentTouch && document instanceof t.DocumentTouch || t.navigator.msPointerEnabled && t.navigator.msMaxTouchPoints > 0 || t.navigator.pointerEnabled && t.navigator.maxTouchPoints > 0 || !1, n.support.mutationobserver = t.MutationObserver || t.WebKitMutationObserver || null, n.Utils = {}, n.Utils.isFullscreen = function() {
            return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || !1
        }, n.Utils.str2json = function(t, i) {
            try {
                return i ? JSON.parse(t.replace(/([\$\w]+)\s*:/g, function(t, i) {
                    return '"' + i + '":'
                }).replace(/'([^']+)'/g, function(t, i) {
                    return '"' + i + '"'
                })) : new Function("", "var json = " + t + "; return JSON.parse(JSON.stringify(json));")()
            } catch (e) {
                return !1
            }
        }, n.Utils.debounce = function(t, i, e) {
            var n;
            return function() {
                var o = this,
                    s = arguments,
                    a = function() {
                        n = null, e || t.apply(o, s)
                    },
                    r = e && !n;
                clearTimeout(n), n = setTimeout(a, i), r && t.apply(o, s)
            }
        }, n.Utils.throttle = function(t, i) {
            var e = !1;
            return function() {
                e || (t.call(), e = !0, setTimeout(function() {
                    e = !1
                }, i))
            }
        }, n.Utils.removeCssRules = function(t) {
            var i, e, n, o, s, a, r, l, c, u;
            t && setTimeout(function() {
                try {
                    for (u = document.styleSheets, o = 0, r = u.length; r > o; o++) {
                        for (n = u[o], e = [], n.cssRules = n.cssRules, i = s = 0, l = n.cssRules.length; l > s; i = ++s) n.cssRules[i].type === CSSRule.STYLE_RULE && t.test(n.cssRules[i].selectorText) && e.unshift(i);
                        for (a = 0, c = e.length; c > a; a++) n.deleteRule(e[a])
                    }
                } catch (d) {}
            }, 0)
        }, n.Utils.isInView = function(t, e) {
            var o = i(t);
            if (!o.is(":visible")) return !1;
            var s = n.$win.scrollLeft(),
                a = n.$win.scrollTop(),
                r = o.offset(),
                l = r.left,
                c = r.top;
            return e = i.extend({
                topoffset: 0,
                leftoffset: 0
            }, e), c + o.height() >= a && c - e.topoffset <= a + n.$win.height() && l + o.width() >= s && l - e.leftoffset <= s + n.$win.width() ? !0 : !1
        }, n.Utils.checkDisplay = function(t, e) {
            var o = n.$("[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]", t || document);
            return t && !o.length && (o = i(t)), o.trigger("display.uk.check"), e && ("string" != typeof e && (e = '[class*="uk-animation-"]'), o.find(e).each(function() {
                var t = n.$(this),
                    i = t.attr("class"),
                    e = i.match(/uk-animation-(.+)/);
                t.removeClass(e[0]).width(), t.addClass(e[0])
            })), o
        }, n.Utils.options = function(t) {
            if ("string" != i.type(t)) return t; - 1 != t.indexOf(":") && "}" != t.trim().substr(-1) && (t = "{" + t + "}");
            var e = t ? t.indexOf("{") : -1,
                o = {};
            if (-1 != e) try {
                o = n.Utils.str2json(t.substr(e))
            } catch (s) {}
            return o
        }, n.Utils.animate = function(t, e) {
            var o = i.Deferred();
            return t = n.$(t), t.css("display", "none").addClass(e).one(n.support.animation.end, function() {
                t.removeClass(e), o.resolve()
            }), t.css("display", ""), o.promise()
        }, n.Utils.uid = function(t) {
            return (t || "id") + (new Date).getTime() + "RAND" + Math.ceil(1e5 * Math.random())
        }, n.Utils.template = function(t, i) {
            for (var e, n, o, s, a = t.replace(/\n/g, "\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g), r = 0, l = [], c = 0; r < a.length;) {
                if (e = a[r], e.match(/\{\{\s*(.+?)\s*\}\}/)) switch (r += 1, e = a[r], n = e[0], o = e.substring(e.match(/^(\^|\#|\!|\~|\:)/) ? 1 : 0), n) {
                    case "~":
                        l.push("for(var $i=0;$i<" + o + ".length;$i++) { var $item = " + o + "[$i];"), c++;
                        break;
                    case ":":
                        l.push("for(var $key in " + o + ") { var $val = " + o + "[$key];"), c++;
                        break;
                    case "#":
                        l.push("if(" + o + ") {"), c++;
                        break;
                    case "^":
                        l.push("if(!" + o + ") {"), c++;
                        break;
                    case "/":
                        l.push("}"), c--;
                        break;
                    case "!":
                        l.push("__ret.push(" + o + ");");
                        break;
                    default:
                        l.push("__ret.push(escape(" + o + "));")
                } else l.push("__ret.push('" + e.replace(/\'/g, "\\'") + "');");
                r += 1
            }
            return s = new Function("$data", ["var __ret = [];", "try {", "with($data){", c ? '__ret = ["Not all blocks are closed correctly."]' : l.join(""), "};", "}catch(e){__ret = [e.message];}", 'return __ret.join("").replace(/\\n\\n/g, "\\n");', "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n")), i ? s(i) : s
        }, n.Utils.focus = function(t, e) {
            if (t = i(t), !t.length) return t;
            var n, o = t.find("[autofocus]:first");
            return o.length ? o.focus() : (o = t.find(":input" + (e && "," + e || "")).first(), o.length ? o.focus() : (t.attr("tabindex") || (n = 1e3, t.attr("tabindex", n)), t[0].focus(), n && t.attr("tabindex", ""), t))
        }, n.Utils.events = {}, n.Utils.events.click = n.support.touch ? "tap" : "click", t.UIkit = n, n.fn = function(t, e) {
            var o = arguments,
                s = t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),
                a = s[1],
                r = s[2];
            return n[a] ? this.each(function() {
                var t = i(this),
                    s = t.data(a);
                s || t.data(a, s = n[a](this, r ? void 0 : e)), r && s[r].apply(s, Array.prototype.slice.call(o, 1))
            }) : (i.error("UIkit component [" + a + "] does not exist."), this)
        }, i.UIkit = n, i.fn.uk = n.fn, n.langdirection = "rtl" == n.$html.attr("dir") ? "right" : "left", n.components = {}, n.component = function(t, e) {
            var o = function(e, s) {
                var a = this;
                return this.UIkit = n, this.element = e ? n.$(e) : null, this.options = i.extend(!0, {}, this.defaults, s), this.plugins = {}, this.element && this.element.data(t, this), this.init(), (this.options.plugins.length ? this.options.plugins : Object.keys(o.plugins)).forEach(function(t) {
                    o.plugins[t].init && (o.plugins[t].init(a), a.plugins[t] = !0)
                }), this.trigger("init.uk.component", [t, this]), this
            };
            return o.plugins = {}, i.extend(!0, o.prototype, {
                defaults: {
                    plugins: []
                },
                boot: function() {},
                init: function() {},
                on: function(t, i, e) {
                    return n.$(this.element || this).on(t, i, e)
                },
                one: function(t, i, e) {
                    return n.$(this.element || this).one(t, i, e)
                },
                off: function(t) {
                    return n.$(this.element || this).off(t)
                },
                trigger: function(t, i) {
                    return n.$(this.element || this).trigger(t, i)
                },
                find: function(t) {
                    return n.$(this.element ? this.element : []).find(t)
                },
                proxy: function(t, i) {
                    var e = this;
                    i.split(" ").forEach(function(i) {
                        e[i] || (e[i] = function() {
                            return t[i].apply(t, arguments)
                        })
                    })
                },
                mixin: function(t, i) {
                    var e = this;
                    i.split(" ").forEach(function(i) {
                        e[i] || (e[i] = t[i].bind(e))
                    })
                },
                option: function() {
                    return 1 == arguments.length ? this.options[arguments[0]] || void 0 : (2 == arguments.length && (this.options[arguments[0]] = arguments[1]), void 0)
                }
            }, e), this.components[t] = o, this[t] = function() {
                var e, o;
                if (arguments.length) switch (arguments.length) {
                    case 1:
                        "string" == typeof arguments[0] || arguments[0].nodeType || arguments[0] instanceof jQuery ? e = i(arguments[0]) : o = arguments[0];
                        break;
                    case 2:
                        e = i(arguments[0]), o = arguments[1]
                }
                return e && e.data(t) ? e.data(t) : new n.components[t](e, o)
            }, n.domready && n.component.boot(t), o
        }, n.plugin = function(t, i, e) {
            this.components[t].plugins[i] = e
        }, n.component.boot = function(t) {
            n.components[t].prototype && n.components[t].prototype.boot && !n.components[t].booted && (n.components[t].prototype.boot.apply(n, []), n.components[t].booted = !0)
        }, n.component.bootComponents = function() {
            for (var t in n.components) n.component.boot(t)
        }, n.domObservers = [], n.domready = !1, n.ready = function(t) {
            n.domObservers.push(t), n.domready && t(document)
        }, n.on = function(t, i, e) {
            return t && t.indexOf("ready.uk.dom") > -1 && n.domready && i.apply(n.$doc), n.$doc.on(t, i, e)
        }, n.one = function(t, i, e) {
            return t && t.indexOf("ready.uk.dom") > -1 && n.domready ? (i.apply(n.$doc), n.$doc) : n.$doc.one(t, i, e)
        }, n.trigger = function(t, i) {
            return n.$doc.trigger(t, i)
        }, n.domObserve = function(t, i) {
            n.support.mutationobserver && (i = i || function() {}, n.$(t).each(function() {
                var t = this,
                    e = n.$(t);
                if (!e.data("observer")) try {
                    var o = new n.support.mutationobserver(n.Utils.debounce(function() {
                        i.apply(t, [e]), e.trigger("changed.uk.dom")
                    }, 50), {
                        childList: !0,
                        subtree: !0
                    });
                    o.observe(t, {
                        childList: !0,
                        subtree: !0
                    }), e.data("observer", o)
                } catch (s) {}
            }))
        }, n.init = function(t) {
            t = t || document, n.domObservers.forEach(function(i) {
                i(t)
            })
        }, n.on("domready.uk.dom", function() {
            n.init(), n.domready && n.Utils.checkDisplay()
        }), document.addEventListener("DOMContentLoaded", function() {
            var t = function() {
                n.$body = n.$("body"), n.trigger("beforeready.uk.dom"), n.component.bootComponents();
                var t = requestAnimationFrame(function() {
                    var i = {
                            dir: {
                                x: 0,
                                y: 0
                            },
                            x: window.pageXOffset,
                            y: window.pageYOffset
                        },
                        e = function() {
                            var o = window.pageXOffset,
                                s = window.pageYOffset;
                            (i.x != o || i.y != s) && (i.dir.x = o != i.x ? o > i.x ? 1 : -1 : 0, i.dir.y = s != i.y ? s > i.y ? 1 : -1 : 0, i.x = o, i.y = s, n.$doc.trigger("scrolling.uk.document", [{
                                dir: {
                                    x: i.dir.x,
                                    y: i.dir.y
                                },
                                x: o,
                                y: s
                            }])), cancelAnimationFrame(t), t = requestAnimationFrame(e)
                        };
                    return n.support.touch && n.$html.on("touchmove touchend MSPointerMove MSPointerUp pointermove pointerup", e), (i.x || i.y) && e(), e
                }());
                if (n.trigger("domready.uk.dom"), n.support.touch && navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && n.$win.on("load orientationchange resize", n.Utils.debounce(function() {
                        var t = function() {
                            return i(".uk-height-viewport").css("height", window.innerHeight), t
                        };
                        return t()
                    }(), 100)), n.trigger("afterready.uk.dom"), n.domready = !0, n.support.mutationobserver) {
                    var e = n.Utils.debounce(function() {
                        requestAnimationFrame(function() {
                            n.init(document.body)
                        })
                    }, 10);
                    new n.support.mutationobserver(function(t) {
                        var i = !1;
                        t.every(function(t) {
                            if ("childList" != t.type) return !0;
                            for (var e, n = 0; n < t.addedNodes.length; ++n)
                                if (e = t.addedNodes[n], e.outerHTML && -1 !== e.outerHTML.indexOf("data-uk-")) return (i = !0) && !1;
                            return !0
                        }), i && e()
                    }).observe(document.body, {
                        childList: !0,
                        subtree: !0
                    })
                }
            };
            return ("complete" == document.readyState || "interactive" == document.readyState) && setTimeout(t), t
        }()), n.$html.addClass(n.support.touch ? "uk-touch" : "uk-notouch"), n.support.touch) {
        var s, a = !1,
            r = "uk-hover",
            l = ".uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover";
        n.$html.on("mouseenter touchstart MSPointerDown pointerdown", l, function() {
            a && i("." + r).removeClass(r), a = i(this).addClass(r)
        }).on("mouseleave touchend MSPointerUp pointerup", function(t) {
            s = i(t.target).parents(l), a && a.not(s).removeClass(r)
        })
    }
    return n
}),
function(t) {
    function i(t, i, e, n) {
        return Math.abs(t - i) >= Math.abs(e - n) ? t - i > 0 ? "Left" : "Right" : e - n > 0 ? "Up" : "Down"
    }

    function e() {
        c = null, d.last && (void 0 !== d.el && d.el.trigger("longTap"), d = {})
    }

    function n() {
        c && clearTimeout(c), c = null
    }

    function o() {
        a && clearTimeout(a), r && clearTimeout(r), l && clearTimeout(l), c && clearTimeout(c), a = r = l = c = null, d = {}
    }

    function s(t) {
        return t.pointerType == t.MSPOINTER_TYPE_TOUCH && t.isPrimary
    }
    if (!t.fn.swipeLeft) {
        var a, r, l, c, u, d = {},
            h = 750;
        t(function() {
            var p, f, m, g = 0,
                v = 0;
            "MSGesture" in window && (u = new MSGesture, u.target = document.body), t(document).on("MSGestureEnd gestureend", function(t) {
                var i = t.originalEvent.velocityX > 1 ? "Right" : t.originalEvent.velocityX < -1 ? "Left" : t.originalEvent.velocityY > 1 ? "Down" : t.originalEvent.velocityY < -1 ? "Up" : null;
                i && void 0 !== d.el && (d.el.trigger("swipe"), d.el.trigger("swipe" + i))
            }).on("touchstart MSPointerDown pointerdown", function(i) {
                ("MSPointerDown" != i.type || s(i.originalEvent)) && (m = "MSPointerDown" == i.type || "pointerdown" == i.type ? i : i.originalEvent.touches[0], p = Date.now(), f = p - (d.last || p), d.el = t("tagName" in m.target ? m.target : m.target.parentNode), a && clearTimeout(a), d.x1 = m.pageX, d.y1 = m.pageY, f > 0 && 250 >= f && (d.isDoubleTap = !0), d.last = p, c = setTimeout(e, h), i.originalEvent && i.originalEvent.pointerId && u && ("MSPointerDown" == i.type || "pointerdown" == i.type || "touchstart" == i.type) && u.addPointer(i.originalEvent.pointerId))
            }).on("touchmove MSPointerMove pointermove", function(t) {
                ("MSPointerMove" != t.type || s(t.originalEvent)) && (m = "MSPointerMove" == t.type || "pointermove" == t.type ? t : t.originalEvent.touches[0], n(), d.x2 = m.pageX, d.y2 = m.pageY, g += Math.abs(d.x1 - d.x2), v += Math.abs(d.y1 - d.y2))
            }).on("touchend MSPointerUp pointerup", function(e) {
                ("MSPointerUp" != e.type || s(e.originalEvent)) && (n(), d.x2 && Math.abs(d.x1 - d.x2) > 30 || d.y2 && Math.abs(d.y1 - d.y2) > 30 ? l = setTimeout(function() {
                    void 0 !== d.el && (d.el.trigger("swipe"), d.el.trigger("swipe" + i(d.x1, d.x2, d.y1, d.y2))), d = {}
                }, 0) : "last" in d && (isNaN(g) || 30 > g && 30 > v ? r = setTimeout(function() {
                    var i = t.Event("tap");
                    i.cancelTouch = o, void 0 !== d.el && d.el.trigger(i), d.isDoubleTap ? (void 0 !== d.el && d.el.trigger("doubleTap"), d = {}) : a = setTimeout(function() {
                        a = null, void 0 !== d.el && d.el.trigger("singleTap"), d = {}
                    }, 250)
                }, 0) : d = {}, g = v = 0))
            }).on("touchcancel MSPointerCancel pointercancel", o), t(window).on("scroll", o)
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(i) {
            t.fn[i] = function(e) {
                return t(this).on(i, e)
            }
        })
    }
}(jQuery),
function(t) {
    "use strict";
    var i = [];
    t.component("stackMargin", {
            defaults: {
                cls: "uk-margin-small-top",
                rowfirst: !1,
                observe: !1
            },
            boot: function() {
                t.ready(function(i) {
                    t.$("[data-uk-margin]", i).each(function() {
                        var i = t.$(this);
                        i.data("stackMargin") || t.stackMargin(i, t.Utils.options(i.attr("data-uk-margin")))
                    })
                })
            },
            init: function() {
                var e = this;
                t.$win.on("resize orientationchange", function() {
                    var i = function() {
                        e.process()
                    };
                    return t.$(function() {
                        i(), t.$win.on("load", i)
                    }), t.Utils.debounce(i, 20)
                }()), this.on("display.uk.check", function() {
                    this.element.is(":visible") && this.process()
                }.bind(this)), this.options.observe && t.domObserve(this.element, function() {
                    e.element.is(":visible") && e.process()
                }), i.push(this)
            },
            process: function() {
                var i = this.element.children();
                if (t.Utils.stackMargin(i, this.options), !this.options.rowfirst || !i.length) return this;
                var e = {},
                    n = !1;
                return i.removeClass(this.options.rowfirst).each(function(i, o) {
                    o = t.$(this), "none" != this.style.display && (i = o.offset().left, ((e[i] = e[i] || []) && e[i]).push(this), n = n === !1 ? i : Math.min(n, i))
                }), t.$(e[n]).addClass(this.options.rowfirst), this
            }
        }),
        function() {
            var i = [],
                e = function(t) {
                    if (t.is(":visible")) {
                        var i = t.parent().width(),
                            e = t.data("width"),
                            n = i / e,
                            o = Math.floor(n * t.data("height"));
                        t.css({
                            height: e > i ? o : t.data("height")
                        })
                    }
                };
            t.component("responsiveElement", {
                defaults: {},
                boot: function() {
                    t.ready(function(i) {
                        t.$("iframe.uk-responsive-width, [data-uk-responsive]", i).each(function() {
                            var i, e = t.$(this);
                            e.data("responsiveElement") || (i = t.responsiveElement(e, {}))
                        })
                    })
                },
                init: function() {
                    var t = this.element;
                    t.attr("width") && t.attr("height") && (t.data({
                        width: t.attr("width"),
                        height: t.attr("height")
                    }).on("display.uk.check", function() {
                        e(t)
                    }), e(t), i.push(t))
                }
            }), t.$win.on("resize load", t.Utils.debounce(function() {
                i.forEach(function(t) {
                    e(t)
                })
            }, 15))
        }(), t.Utils.stackMargin = function(i, e) {
            e = t.$.extend({
                cls: "uk-margin-small-top"
            }, e), i = t.$(i).removeClass(e.cls);
            var n = !1;
            i.each(function(i, e, o, s) {
                s = t.$(this), "none" != s.css("display") && (i = s.offset(), e = s.outerHeight(), o = i.top + e, s.data({
                    ukMarginPos: o,
                    ukMarginTop: i.top
                }), (n === !1 || i.top < n.top) && (n = {
                    top: i.top,
                    left: i.left,
                    pos: o
                }))
            }).each(function(i) {
                i = t.$(this), "none" != i.css("display") && i.data("ukMarginTop") > n.top && i.data("ukMarginPos") > n.pos && i.addClass(e.cls)
            })
        }, t.Utils.matchHeights = function(i, e) {
            i = t.$(i).css("min-height", ""), e = t.$.extend({
                row: !0
            }, e);
            var n = function(i) {
                if (!(i.length < 2)) {
                    var e = 0;
                    i.each(function() {
                        e = Math.max(e, t.$(this).outerHeight())
                    }).each(function() {
                        var i = t.$(this),
                            n = e - ("border-box" == i.css("box-sizing") ? 0 : i.outerHeight() - i.height());
                        i.css("min-height", n + "px")
                    })
                }
            };
            e.row ? (i.first().width(), setTimeout(function() {
                var e = !1,
                    o = [];
                i.each(function() {
                    var i = t.$(this),
                        s = i.offset().top;
                    s != e && o.length && (n(t.$(o)), o = [], s = i.offset().top), o.push(i), e = s
                }), o.length && n(t.$(o))
            }, 0)) : n(i)
        },
        function(i) {
            t.Utils.inlineSvg = function(e, n) {
                t.$(e || 'img[src$=".svg"]', n || document).each(function() {
                    var e = t.$(this),
                        n = e.attr("src");
                    if (!i[n]) {
                        var o = t.$.Deferred();
                        t.$.get(n, {
                            nc: Math.random()
                        }, function(i) {
                            o.resolve(t.$(i).find("svg"))
                        }), i[n] = o.promise()
                    }
                    i[n].then(function(i) {
                        var n = t.$(i).clone();
                        e.attr("id") && n.attr("id", e.attr("id")), e.attr("class") && n.attr("class", e.attr("class")), e.attr("style") && n.attr("style", e.attr("style")), e.attr("width") && (n.attr("width", e.attr("width")), e.attr("height") || n.removeAttr("height")), e.attr("height") && (n.attr("height", e.attr("height")), e.attr("width") || n.removeAttr("width")), e.replaceWith(n)
                    })
                })
            }, t.ready(function(i) {
                t.Utils.inlineSvg("[data-uk-svg]", i)
            })
        }({}), t.Utils.getCssVar = function(t) {
            var i, e = document.documentElement,
                n = e.appendChild(document.createElement("div"));
            n.classList.add("var-" + t);
            try {
                i = JSON.parse(i = getComputedStyle(n, ":before").content.replace(/^["'](.*)["']$/, "$1"))
            } catch (o) {
                i = void 0
            }
            return e.removeChild(n), i
        }
}(UIkit),
function(t) {
    "use strict";

    function i(i, e) {
        e = t.$.extend({
            duration: 1e3,
            transition: "easeOutExpo",
            offset: 0,
            complete: function() {}
        }, e);
        var n = i.offset().top - e.offset,
            o = t.$doc.height(),
            s = window.innerHeight;
        n + s > o && (n = o - s), t.$("html,body").stop().animate({
            scrollTop: n
        }, e.duration, e.transition).promise().done(e.complete)
    }
    t.component("smoothScroll", {
        boot: function() {
            t.$html.on("click.smooth-scroll.uikit", "[data-uk-smooth-scroll]", function() {
                var i = t.$(this);
                if (!i.data("smoothScroll")) {
                    {
                        t.smoothScroll(i, t.Utils.options(i.attr("data-uk-smooth-scroll")))
                    }
                    i.trigger("click")
                }
                return !1
            })
        },
        init: function() {
            var e = this;
            this.on("click", function(n) {
                n.preventDefault(), i(t.$(this.hash).length ? t.$(this.hash) : t.$("body"), e.options)
            })
        }
    }), t.Utils.scrollToElement = i, t.$.easing.easeOutExpo || (t.$.easing.easeOutExpo = function(t, i, e, n, o) {
        return i == o ? e + n : n * (-Math.pow(2, -10 * i / o) + 1) + e
    })
}(UIkit),
function(t) {
    "use strict";
    var i = t.$win,
        e = t.$doc,
        n = [],
        o = function() {
            for (var t = 0; t < n.length; t++) window.requestAnimationFrame.apply(window, [n[t].check])
        };
    t.component("scrollspy", {
        defaults: {
            target: !1,
            cls: "uk-scrollspy-inview",
            initcls: "uk-scrollspy-init-inview",
            topoffset: 0,
            leftoffset: 0,
            repeat: !1,
            delay: 0
        },
        boot: function() {
            e.on("scrolling.uk.document", o), i.on("load resize orientationchange", t.Utils.debounce(o, 50)), t.ready(function(i) {
                t.$("[data-uk-scrollspy]", i).each(function() {
                    var i = t.$(this);
                    if (!i.data("scrollspy")) {
                        t.scrollspy(i, t.Utils.options(i.attr("data-uk-scrollspy")))
                    }
                })
            })
        },
        init: function() {
            var i, e = this,
                o = this.options.cls.split(/,/),
                s = function() {
                    var n = e.options.target ? e.element.find(e.options.target) : e.element,
                        s = 1 === n.length ? 1 : 0,
                        a = 0;
                    n.each(function() {
                        var n = t.$(this),
                            r = n.data("inviewstate"),
                            l = t.Utils.isInView(n, e.options),
                            c = n.data("ukScrollspyCls") || o[a].trim();
                        !l || r || n.data("scrollspy-idle") || (i || (n.addClass(e.options.initcls), e.offset = n.offset(), i = !0, n.trigger("init.uk.scrollspy")), n.data("scrollspy-idle", setTimeout(function() {
                            n.addClass("uk-scrollspy-inview").toggleClass(c).width(), n.trigger("inview.uk.scrollspy"), n.data("scrollspy-idle", !1), n.data("inviewstate", !0)
                        }, e.options.delay * s)), s++), !l && r && e.options.repeat && (n.data("scrollspy-idle") && (clearTimeout(n.data("scrollspy-idle")), n.data("scrollspy-idle", !1)), n.removeClass("uk-scrollspy-inview").toggleClass(c), n.data("inviewstate", !1), n.trigger("outview.uk.scrollspy")), a = o[a + 1] ? a + 1 : 0
                    })
                };
            s(), this.check = s, n.push(this)
        }
    });
    var s = [],
        a = function() {
            for (var t = 0; t < s.length; t++) window.requestAnimationFrame.apply(window, [s[t].check])
        };
    t.component("scrollspynav", {
        defaults: {
            cls: "uk-active",
            closest: !1,
            topoffset: 0,
            leftoffset: 0,
            smoothscroll: !1
        },
        boot: function() {
            e.on("scrolling.uk.document", a), i.on("resize orientationchange", t.Utils.debounce(a, 50)), t.ready(function(i) {
                t.$("[data-uk-scrollspy-nav]", i).each(function() {
                    var i = t.$(this);
                    if (!i.data("scrollspynav")) {
                        t.scrollspynav(i, t.Utils.options(i.attr("data-uk-scrollspy-nav")))
                    }
                })
            })
        },
        init: function() {
            var e, n = [],
                o = this.find("a[href^='#']").each(function() {
                    "#" !== this.getAttribute("href").trim() && n.push(this.getAttribute("href"))
                }),
                a = t.$(n.join(",")),
                r = this.options.cls,
                l = this.options.closest || this.options.closest,
                c = this,
                u = function() {
                    e = [];
                    for (var n = 0; n < a.length; n++) t.Utils.isInView(a.eq(n), c.options) && e.push(a.eq(n));
                    if (e.length) {
                        var s, u = i.scrollTop(),
                            d = function() {
                                for (var t = 0; t < e.length; t++)
                                    if (e[t].offset().top - c.options.topoffset >= u) return e[t]
                            }();
                        if (!d) return;
                        c.options.closest ? (o.blur().closest(l).removeClass(r), s = o.filter("a[href='#" + d.attr("id") + "']").closest(l).addClass(r)) : s = o.removeClass(r).filter("a[href='#" + d.attr("id") + "']").addClass(r), c.element.trigger("inview.uk.scrollspynav", [d, s])
                    }
                };
            this.options.smoothscroll && t.smoothScroll && o.each(function() {
                t.smoothScroll(this, c.options.smoothscroll)
            }), u(), this.element.data("scrollspynav", this), this.check = u, s.push(this)
        }
    })
}(UIkit),
function(t) {
    "use strict";
    var i = [];
    t.component("toggle", {
        defaults: {
            target: !1,
            cls: "uk-hidden",
            animation: !1,
            duration: 200
        },
        boot: function() {
            t.ready(function(e) {
                t.$("[data-uk-toggle]", e).each(function() {
                    var i = t.$(this);
                    if (!i.data("toggle")) {
                        t.toggle(i, t.Utils.options(i.attr("data-uk-toggle")))
                    }
                }), setTimeout(function() {
                    i.forEach(function(t) {
                        t.getToggles()
                    })
                }, 0)
            })
        },
        init: function() {
            var t = this;
            this.aria = -1 !== this.options.cls.indexOf("uk-hidden"), this.on("click", function(i) {
                t.element.is('a[href="#"]') && i.preventDefault(), t.toggle()
            }), i.push(this)
        },
        toggle: function() {
            if (this.getToggles(), this.totoggle.length) {
                if (this.options.animation && t.support.animation) {
                    var i = this,
                        e = this.options.animation.split(",");
                    1 == e.length && (e[1] = e[0]), e[0] = e[0].trim(), e[1] = e[1].trim(), this.totoggle.css("animation-duration", this.options.duration + "ms"), this.totoggle.each(function() {
                        var n = t.$(this);
                        n.hasClass(i.options.cls) ? (n.toggleClass(i.options.cls), t.Utils.animate(n, e[0]).then(function() {
                            n.css("animation-duration", ""), t.Utils.checkDisplay(n)
                        })) : t.Utils.animate(this, e[1] + " uk-animation-reverse").then(function() {
                            n.toggleClass(i.options.cls).css("animation-duration", ""), t.Utils.checkDisplay(n)
                        })
                    })
                } else this.totoggle.toggleClass(this.options.cls), t.Utils.checkDisplay(this.totoggle);
                this.updateAria()
            }
        },
        getToggles: function() {
            this.totoggle = this.options.target ? t.$(this.options.target) : [], this.updateAria()
        },
        updateAria: function() {
            this.aria && this.totoggle.length && this.totoggle.not("[aria-hidden]").each(function() {
                t.$(this).attr("aria-hidden", t.$(this).hasClass("uk-hidden"))
            })
        }
    })
}(UIkit),
function(t) {
    "use strict";
    t.component("alert", {
        defaults: {
            fade: !0,
            duration: 200,
            trigger: ".uk-alert-close"
        },
        boot: function() {
            t.$html.on("click.alert.uikit", "[data-uk-alert]", function(i) {
                var e = t.$(this);
                if (!e.data("alert")) {
                    var n = t.alert(e, t.Utils.options(e.attr("data-uk-alert")));
                    t.$(i.target).is(n.options.trigger) && (i.preventDefault(), n.close())
                }
            })
        },
        init: function() {
            var t = this;
            this.on("click", this.options.trigger, function(i) {
                i.preventDefault(), t.close()
            })
        },
        close: function() {
            var t = this.trigger("close.uk.alert"),
                i = function() {
                    this.trigger("closed.uk.alert").remove()
                }.bind(this);
            this.options.fade ? t.css("overflow", "hidden").css("max-height", t.height()).animate({
                height: 0,
                opacity: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
            }, this.options.duration, i) : i()
        }
    })
}(UIkit),
function(t) {
    "use strict";
    t.component("buttonRadio", {
        defaults: {
            activeClass: "uk-active",
            target: ".uk-button"
        },
        boot: function() {
            t.$html.on("click.buttonradio.uikit", "[data-uk-button-radio]", function(i) {
                var e = t.$(this);
                if (!e.data("buttonRadio")) {
                    var n = t.buttonRadio(e, t.Utils.options(e.attr("data-uk-button-radio"))),
                        o = t.$(i.target);
                    o.is(n.options.target) && o.trigger("click")
                }
            })
        },
        init: function() {
            var i = this;
            this.find(i.options.target).attr("aria-checked", "false").filter("." + i.options.activeClass).attr("aria-checked", "true"), this.on("click", this.options.target, function(e) {
                var n = t.$(this);
                n.is('a[href="#"]') && e.preventDefault(), i.find(i.options.target).not(n).removeClass(i.options.activeClass).blur(), n.addClass(i.options.activeClass), i.find(i.options.target).not(n).attr("aria-checked", "false"), n.attr("aria-checked", "true"), i.trigger("change.uk.button", [n])
            })
        },
        getSelected: function() {
            return this.find("." + this.options.activeClass)
        }
    }), t.component("buttonCheckbox", {
        defaults: {
            activeClass: "uk-active",
            target: ".uk-button"
        },
        boot: function() {
            t.$html.on("click.buttoncheckbox.uikit", "[data-uk-button-checkbox]", function(i) {
                var e = t.$(this);
                if (!e.data("buttonCheckbox")) {
                    var n = t.buttonCheckbox(e, t.Utils.options(e.attr("data-uk-button-checkbox"))),
                        o = t.$(i.target);
                    o.is(n.options.target) && o.trigger("click")
                }
            })
        },
        init: function() {
            var i = this;
            this.find(i.options.target).attr("aria-checked", "false").filter("." + i.options.activeClass).attr("aria-checked", "true"), this.on("click", this.options.target, function(e) {
                var n = t.$(this);
                n.is('a[href="#"]') && e.preventDefault(), n.toggleClass(i.options.activeClass).blur(), n.attr("aria-checked", n.hasClass(i.options.activeClass)), i.trigger("change.uk.button", [n])
            })
        },
        getSelected: function() {
            return this.find("." + this.options.activeClass)
        }
    }), t.component("button", {
        defaults: {},
        boot: function() {
            t.$html.on("click.button.uikit", "[data-uk-button]", function() {
                var i = t.$(this);
                if (!i.data("button")) {
                    {
                        t.button(i, t.Utils.options(i.attr("data-uk-button")))
                    }
                    i.trigger("click")
                }
            })
        },
        init: function() {
            var t = this;
            this.element.attr("aria-pressed", this.element.hasClass("uk-active")), this.on("click", function(i) {
                t.element.is('a[href="#"]') && i.preventDefault(), t.toggle(), t.trigger("change.uk.button", [t.element.blur().hasClass("uk-active")])
            })
        },
        toggle: function() {
            this.element.toggleClass("uk-active"), this.element.attr("aria-pressed", this.element.hasClass("uk-active"))
        }
    })
}(UIkit),
function(t) {
    "use strict";

    function i(i, e, n, o) {
        if (i = t.$(i), e = t.$(e), n = n || window.innerWidth, o = o || i.offset(), e.length) {
            var s = e.outerWidth();
            if (i.css("min-width", s), "right" == t.langdirection) {
                var a = n - (e.offset().left + s),
                    r = n - (i.offset().left + i.outerWidth());
                i.css("margin-right", a - r)
            } else i.css("margin-left", e.offset().left - o.left)
        }
    }
    var e, n = !1,
        o = {
            x: {
                "bottom-left": "bottom-right",
                "bottom-right": "bottom-left",
                "bottom-center": "bottom-center",
                "top-left": "top-right",
                "top-right": "top-left",
                "top-center": "top-center",
                "left-top": "right-top",
                "left-bottom": "right-bottom",
                "left-center": "right-center",
                "right-top": "left-top",
                "right-bottom": "left-bottom",
                "right-center": "left-center"
            },
            y: {
                "bottom-left": "top-left",
                "bottom-right": "top-right",
                "bottom-center": "top-center",
                "top-left": "bottom-left",
                "top-right": "bottom-right",
                "top-center": "bottom-center",
                "left-top": "left-bottom",
                "left-bottom": "left-top",
                "left-center": "left-center",
                "right-top": "right-bottom",
                "right-bottom": "right-top",
                "right-center": "right-center"
            },
            xy: {
                "bottom-left": "top-right",
                "bottom-right": "top-left",
                "bottom-center": "top-center",
                "top-left": "bottom-right",
                "top-right": "bottom-left",
                "top-center": "bottom-center",
                "left-top": "right-bottom",
                "left-bottom": "right-top",
                "left-center": "right-center",
                "right-top": "left-bottom",
                "right-bottom": "left-top",
                "right-center": "left-center"
            }
        };
    t.component("dropdown", {
        defaults: {
            mode: "hover",
            pos: "bottom-left",
            offset: 0,
            remaintime: 800,
            justify: !1,
            boundary: t.$win,
            delay: 0,
            dropdownSelector: ".uk-dropdown,.uk-dropdown-blank",
            hoverDelayIdle: 250,
            preventflip: !1
        },
        remainIdle: !1,
        boot: function() {
            var i = t.support.touch ? "click" : "mouseenter";
            t.$html.on(i + ".dropdown.uikit focus pointerdown", "[data-uk-dropdown]", function(e) {
                var n = t.$(this);
                if (!n.data("dropdown")) {
                    var o = t.dropdown(n, t.Utils.options(n.attr("data-uk-dropdown")));
                    ("click" == e.type || "mouseenter" == e.type && "hover" == o.options.mode) && o.element.trigger(i), o.dropdown.length && e.preventDefault()
                }
            })
        },
        init: function() {
            var i = this;
            this.dropdown = this.find(this.options.dropdownSelector), this.offsetParent = this.dropdown.parents().filter(function() {
                return -1 !== t.$.inArray(t.$(this).css("position"), ["relative", "fixed", "absolute"])
            }).slice(0, 1), this.offsetParent.length || (this.offsetParent = this.element), this.centered = this.dropdown.hasClass("uk-dropdown-center"), this.justified = this.options.justify ? t.$(this.options.justify) : !1, this.boundary = t.$(this.options.boundary), this.boundary.length || (this.boundary = t.$win), this.dropdown.hasClass("uk-dropdown-up") && (this.options.pos = "top-left"), this.dropdown.hasClass("uk-dropdown-flip") && (this.options.pos = this.options.pos.replace("left", "right")), this.dropdown.hasClass("uk-dropdown-center") && (this.options.pos = this.options.pos.replace(/(left|right)/, "center")), this.element.attr("aria-haspopup", "true"), this.element.attr("aria-expanded", this.element.hasClass("uk-open")), this.dropdown.attr("aria-hidden", "true"), "click" == this.options.mode || t.support.touch ? this.on("click.uk.dropdown", function(e) {
                var n = t.$(e.target);
                n.parents(i.options.dropdownSelector).length || ((n.is("a[href='#']") || n.parent().is("a[href='#']") || i.dropdown.length && !i.dropdown.is(":visible")) && e.preventDefault(), n.blur()), i.element.hasClass("uk-open") ? (!i.dropdown.find(e.target).length || n.is(".uk-dropdown-close") || n.parents(".uk-dropdown-close").length) && i.hide() : i.show()
            }) : this.on("mouseenter", function() {
                i.trigger("pointerenter.uk.dropdown", [i]), i.remainIdle && clearTimeout(i.remainIdle), e && clearTimeout(e), n && n == i || (e = n && n != i ? setTimeout(function() {
                    e = setTimeout(i.show.bind(i), i.options.delay)
                }, i.options.hoverDelayIdle) : setTimeout(i.show.bind(i), i.options.delay))
            }).on("mouseleave", function() {
                e && clearTimeout(e), i.remainIdle = setTimeout(function() {
                    n && n == i && i.hide()
                }, i.options.remaintime), i.trigger("pointerleave.uk.dropdown", [i])
            }).on("click", function(e) {
                var o = t.$(e.target);
                return i.remainIdle && clearTimeout(i.remainIdle), n && n == i ? ((!i.dropdown.find(e.target).length || o.is(".uk-dropdown-close") || o.parents(".uk-dropdown-close").length) && i.hide(), void 0) : ((o.is("a[href='#']") || o.parent().is("a[href='#']")) && e.preventDefault(), i.show(), void 0)
            })
        },
        show: function() {
            t.$html.off("click.outer.dropdown"), n && n != this && n.hide(!0), e && clearTimeout(e), this.trigger("beforeshow.uk.dropdown", [this]), this.checkDimensions(), this.element.addClass("uk-open"), this.element.attr("aria-expanded", "true"), this.dropdown.attr("aria-hidden", "false"), this.trigger("show.uk.dropdown", [this]), t.Utils.checkDisplay(this.dropdown, !0), t.Utils.focus(this.dropdown), n = this, this.registerOuterClick()
        },
        hide: function(t) {
            this.trigger("beforehide.uk.dropdown", [this, t]), this.element.removeClass("uk-open"), this.remainIdle && clearTimeout(this.remainIdle), this.remainIdle = !1, this.element.attr("aria-expanded", "false"), this.dropdown.attr("aria-hidden", "true"), this.trigger("hide.uk.dropdown", [this, t]), n == this && (n = !1)
        },
        registerOuterClick: function() {
            var i = this;
            t.$html.off("click.outer.dropdown"), setTimeout(function() {
                t.$html.on("click.outer.dropdown", function(o) {
                    e && clearTimeout(e);
                    t.$(o.target);
                    n != i || i.element.find(o.target).length || (i.hide(!0), t.$html.off("click.outer.dropdown"))
                })
            }, 10)
        },
        checkDimensions: function() {
            if (this.dropdown.length) {
                this.dropdown.removeClass("uk-dropdown-top uk-dropdown-bottom uk-dropdown-left uk-dropdown-right uk-dropdown-stack uk-dropdown-autoflip").css({
                    topLeft: "",
                    left: "",
                    marginLeft: "",
                    marginRight: ""
                }), this.justified && this.justified.length && this.dropdown.css("min-width", "");
                var e, n = t.$.extend({}, this.offsetParent.offset(), {
                        width: this.offsetParent[0].offsetWidth,
                        height: this.offsetParent[0].offsetHeight
                    }),
                    s = this.options.offset,
                    a = this.dropdown,
                    r = (a.show().offset() || {
                        left: 0,
                        top: 0
                    }, a.outerWidth()),
                    l = a.outerHeight(),
                    c = this.boundary.width(),
                    u = (this.boundary[0] !== window && this.boundary.offset() ? this.boundary.offset() : {
                        top: 0,
                        left: 0
                    }, this.options.pos),
                    d = {
                        "bottom-left": {
                            top: 0 + n.height + s,
                            left: 0
                        },
                        "bottom-right": {
                            top: 0 + n.height + s,
                            left: 0 + n.width - r
                        },
                        "bottom-center": {
                            top: 0 + n.height + s,
                            left: 0 + n.width / 2 - r / 2
                        },
                        "top-left": {
                            top: 0 - l - s,
                            left: 0
                        },
                        "top-right": {
                            top: 0 - l - s,
                            left: 0 + n.width - r
                        },
                        "top-center": {
                            top: 0 - l - s,
                            left: 0 + n.width / 2 - r / 2
                        },
                        "left-top": {
                            top: 0,
                            left: 0 - r - s
                        },
                        "left-bottom": {
                            top: 0 + n.height - l,
                            left: 0 - r - s
                        },
                        "left-center": {
                            top: 0 + n.height / 2 - l / 2,
                            left: 0 - r - s
                        },
                        "right-top": {
                            top: 0,
                            left: 0 + n.width + s
                        },
                        "right-bottom": {
                            top: 0 + n.height - l,
                            left: 0 + n.width + s
                        },
                        "right-center": {
                            top: 0 + n.height / 2 - l / 2,
                            left: 0 + n.width + s
                        }
                    },
                    h = {};
                if (e = u.split("-"), h = d[u] ? d[u] : d["bottom-left"], this.justified && this.justified.length) i(a.css({
                    left: 0
                }), this.justified, c);
                else if (this.options.preventflip !== !0) {
                    var p;
                    switch (this.checkBoundary(n.left + h.left, n.top + h.top, r, l, c)) {
                        case "x":
                            "x" !== this.options.preventflip && (p = o.x[u] || "right-top");
                            break;
                        case "y":
                            "y" !== this.options.preventflip && (p = o.y[u] || "top-left");
                            break;
                        case "xy":
                            this.options.preventflip || (p = o.xy[u] || "right-bottom")
                    }
                    p && (e = p.split("-"), h = d[p] ? d[p] : d["bottom-left"], a.addClass("uk-dropdown-autoflip"), this.checkBoundary(n.left + h.left, n.top + h.top, r, l, c) && (e = u.split("-"), h = d[u] ? d[u] : d["bottom-left"]))
                }
                r > c && (a.addClass("uk-dropdown-stack"), this.trigger("stack.uk.dropdown", [this])), a.css(h).css("display", "").addClass("uk-dropdown-" + e[0])
            }
        },
        checkBoundary: function(i, e, n, o, s) {
            var a = "";
            return (0 > i || i - t.$win.scrollLeft() + n > s) && (a += "x"), (e - t.$win.scrollTop() < 0 || e - t.$win.scrollTop() + o > window.innerHeight) && (a += "y"), a
        }
    }), t.component("dropdownOverlay", {
        defaults: {
            justify: !1,
            cls: "",
            duration: 200
        },
        boot: function() {
            t.ready(function(i) {
                t.$("[data-uk-dropdown-overlay]", i).each(function() {
                    var i = t.$(this);
                    i.data("dropdownOverlay") || t.dropdownOverlay(i, t.Utils.options(i.attr("data-uk-dropdown-overlay")))
                })
            })
        },
        init: function() {
            var e = this;
            this.justified = this.options.justify ? t.$(this.options.justify) : !1, this.overlay = this.element.find("uk-dropdown-overlay"), this.overlay.length || (this.overlay = t.$('<div class="uk-dropdown-overlay"></div>').appendTo(this.element)), this.overlay.addClass(this.options.cls), this.on({
                "beforeshow.uk.dropdown": function(t, n) {
                    e.dropdown = n, e.justified && e.justified.length && i(e.overlay.css({
                        display: "block",
                        marginLeft: "",
                        marginRight: ""
                    }), e.justified, e.justified.outerWidth())
                },
                "show.uk.dropdown": function() {
                    var i = e.dropdown.dropdown.outerHeight(!0);
                    e.dropdown.element.removeClass("uk-open"), e.overlay.stop().css("display", "block").animate({
                        height: i
                    }, e.options.duration, function() {
                        e.dropdown.dropdown.css("visibility", ""), e.dropdown.element.addClass("uk-open"), t.Utils.checkDisplay(e.dropdown.dropdown, !0)
                    }), e.pointerleave = !1
                },
                "hide.uk.dropdown": function() {
                    e.overlay.stop().animate({
                        height: 0
                    }, e.options.duration)
                },
                "pointerenter.uk.dropdown": function() {
                    clearTimeout(e.remainIdle)
                },
                "pointerleave.uk.dropdown": function() {
                    e.pointerleave = !0
                }
            }), this.overlay.on({
                mouseenter: function() {
                    e.remainIdle && (clearTimeout(e.dropdown.remainIdle), clearTimeout(e.remainIdle))
                },
                mouseleave: function() {
                    e.pointerleave && n && (e.remainIdle = setTimeout(function() {
                        n && n.hide()
                    }, n.options.remaintime))
                }
            })
        }
    })
}(UIkit),
function(t) {
    "use strict";
    var i = [];
    t.component("gridMatchHeight", {
        defaults: {
            target: !1,
            row: !0,
            ignorestacked: !1,
            observe: !1
        },
        boot: function() {
            t.ready(function(i) {
                t.$("[data-uk-grid-match]", i).each(function() {
                    var i, e = t.$(this);
                    e.data("gridMatchHeight") || (i = t.gridMatchHeight(e, t.Utils.options(e.attr("data-uk-grid-match"))))
                })
            })
        },
        init: function() {
            var e = this;
            this.columns = this.element.children(), this.elements = this.options.target ? this.find(this.options.target) : this.columns, this.columns.length && (t.$win.on("load resize orientationchange", function() {
                var i = function() {
                    e.element.is(":visible") && e.match()
                };
                return t.$(function() {
                    i()
                }), t.Utils.debounce(i, 50)
            }()), this.options.observe && t.domObserve(this.element, function() {
                e.element.is(":visible") && e.match()
            }), this.on("display.uk.check", function() {
                this.element.is(":visible") && this.match()
            }.bind(this)), i.push(this))
        },
        match: function() {
            var i = this.columns.filter(":visible:first");
            if (i.length) {
                var e = Math.ceil(100 * parseFloat(i.css("width")) / parseFloat(i.parent().css("width"))) >= 100;
                return e && !this.options.ignorestacked ? this.revert() : t.Utils.matchHeights(this.elements, this.options), this
            }
        },
        revert: function() {
            return this.elements.css("min-height", ""), this
        }
    }), t.component("gridMargin", {
        defaults: {
            cls: "uk-grid-margin",
            rowfirst: "uk-row-first"
        },
        boot: function() {
            t.ready(function(i) {
                t.$("[data-uk-grid-margin]", i).each(function() {
                    var i, e = t.$(this);
                    e.data("gridMargin") || (i = t.gridMargin(e, t.Utils.options(e.attr("data-uk-grid-margin"))))
                })
            })
        },
        init: function() {
            t.stackMargin(this.element, this.options)
        }
    })
}(UIkit),
function(t) {
    "use strict";

    function i(i, e) {
        return e ? ("object" == typeof i ? (i = i instanceof jQuery ? i : t.$(i), i.parent().length && (e.persist = i, e.persist.data("modalPersistParent", i.parent()))) : i = "string" == typeof i || "number" == typeof i ? t.$("<div></div>").html(i) : t.$("<div></div>").html("UIkit.modal Error: Unsupported data type: " + typeof i), i.appendTo(e.element.find(".uk-modal-dialog")), e) : void 0
    }
    var e, n = !1,
        o = 0,
        s = t.$html;
    t.$win.on("resize orientationchange", t.Utils.debounce(function() {
        t.$(".uk-modal.uk-open").each(function() {
            return t.$(this).data("modal") && t.$(this).data("modal").resize()
        })
    }, 150)), t.component("modal", {
        defaults: {
            keyboard: !0,
            bgclose: !0,
            minScrollHeight: 150,
            center: !1,
            modal: !0
        },
        scrollable: !1,
        transition: !1,
        hasTransitioned: !0,
        init: function() {
            if (e || (e = t.$("body")), this.element.length) {
                var i = this;
                this.paddingdir = "padding-" + ("left" == t.langdirection ? "right" : "left"), this.dialog = this.find(".uk-modal-dialog"), this.active = !1, this.element.attr("aria-hidden", this.element.hasClass("uk-open")), this.on("click", ".uk-modal-close", function(t) {
                    t.preventDefault(), i.hide()
                }).on("click", function(e) {
                    var n = t.$(e.target);
                    n[0] == i.element[0] && i.options.bgclose && i.hide()
                }), t.domObserve(this.element, function() {
                    i.resize()
                })
            }
        },
        toggle: function() {
            return this[this.isActive() ? "hide" : "show"]()
        },
        show: function() {
            if (this.element.length) {
                var i = this;
                if (!this.isActive()) return this.options.modal && n && n.hide(!0), this.element.removeClass("uk-open").show(), this.resize(!0), this.options.modal && (n = this), this.active = !0, o++, t.support.transition ? (this.hasTransitioned = !1, this.element.one(t.support.transition.end, function() {
                    i.hasTransitioned = !0, t.Utils.focus(i.dialog, "a[href]")
                }).addClass("uk-open")) : (this.element.addClass("uk-open"), t.Utils.focus(this.dialog, "a[href]")), s.addClass("uk-modal-page").height(), this.element.attr("aria-hidden", "false"), this.element.trigger("show.uk.modal"), t.Utils.checkDisplay(this.dialog, !0), this
            }
        },
        hide: function(i) {
            if (!i && t.support.transition && this.hasTransitioned) {
                var e = this;
                this.one(t.support.transition.end, function() {
                    e._hide()
                }).removeClass("uk-open")
            } else this._hide();
            return this
        },
        resize: function(t) {
            if (this.isActive() || t) {
                var i = e.width();
                if (this.scrollbarwidth = window.innerWidth - i, e.css(this.paddingdir, this.scrollbarwidth), this.element.css("overflow-y", this.scrollbarwidth ? "scroll" : "auto"), !this.updateScrollable() && this.options.center) {
                    var n = this.dialog.outerHeight(),
                        o = parseInt(this.dialog.css("margin-top"), 10) + parseInt(this.dialog.css("margin-bottom"), 10);
                    n + o < window.innerHeight ? this.dialog.css({
                        top: window.innerHeight / 2 - n / 2 - o
                    }) : this.dialog.css({
                        top: ""
                    })
                }
            }
        },
        updateScrollable: function() {
            var t = this.dialog.find(".uk-overflow-container:visible:first");
            if (t.length) {
                t.css("height", 0);
                var i = Math.abs(parseInt(this.dialog.css("margin-top"), 10)),
                    e = this.dialog.outerHeight(),
                    n = window.innerHeight,
                    o = n - 2 * (20 > i ? 20 : i) - e;
                return t.css({
                    maxHeight: o < this.options.minScrollHeight ? "" : o,
                    height: ""
                }), !0
            }
            return !1
        },
        _hide: function() {
            this.active = !1, o > 0 ? o-- : o = 0, this.element.hide().removeClass("uk-open"), this.element.attr("aria-hidden", "true"), o || (s.removeClass("uk-modal-page"), e.css(this.paddingdir, "")), n === this && (n = !1), this.trigger("hide.uk.modal")
        },
        isActive: function() {
            return this.element.hasClass("uk-open")
        }
    }), t.component("modalTrigger", {
        boot: function() {
            t.$html.on("click.modal.uikit", "[data-uk-modal]", function(i) {
                var e = t.$(this);
                if (e.is("a") && i.preventDefault(), !e.data("modalTrigger")) {
                    var n = t.modalTrigger(e, t.Utils.options(e.attr("data-uk-modal")));
                    n.show()
                }
            }), t.$html.on("keydown.modal.uikit", function(t) {
                n && 27 === t.keyCode && n.options.keyboard && (t.preventDefault(), n.hide())
            })
        },
        init: function() {
            var i = this;
            this.options = t.$.extend({
                target: i.element.is("a") ? i.element.attr("href") : !1
            }, this.options), this.modal = t.modal(this.options.target, this.options), this.on("click", function(t) {
                t.preventDefault(), i.show()
            }), this.proxy(this.modal, "show hide isActive")
        }
    }), t.modal.dialog = function(e, n) {
        var o = t.modal(t.$(t.modal.dialog.template).appendTo("body"), n);
        return o.on("hide.uk.modal", function() {
            o.persist && (o.persist.appendTo(o.persist.data("modalPersistParent")), o.persist = !1), o.element.remove()
        }), i(e, o), o
    }, t.modal.dialog.template = '<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>', t.modal.alert = function(i, e) {
        e = t.$.extend(!0, {
            bgclose: !1,
            keyboard: !1,
            modal: !1,
            labels: t.modal.labels
        }, e);
        var n = t.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(i) + "</div>", '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">' + e.labels.Ok + "</button></div>"].join(""), e);
        return n.on("show.uk.modal", function() {
            setTimeout(function() {
                n.element.find("button:first").focus()
            }, 50)
        }), n.show()
    }, t.modal.confirm = function(i, e, n) {
        var o = arguments.length > 1 && arguments[arguments.length - 1] ? arguments[arguments.length - 1] : {};
        e = t.$.isFunction(e) ? e : function() {}, n = t.$.isFunction(n) ? n : function() {}, o = t.$.extend(!0, {
            bgclose: !1,
            keyboard: !1,
            modal: !1,
            labels: t.modal.labels
        }, t.$.isFunction(o) ? {} : o);
        var s = t.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(i) + "</div>", '<div class="uk-modal-footer uk-text-right"><button class="uk-button js-modal-confirm-cancel">' + o.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-confirm">' + o.labels.Ok + "</button></div>"].join(""), o);
        return s.element.find(".js-modal-confirm, .js-modal-confirm-cancel").on("click", function() {
            t.$(this).is(".js-modal-confirm") ? e() : n(), s.hide()
        }), s.on("show.uk.modal", function() {
            setTimeout(function() {
                s.element.find(".js-modal-confirm").focus()
            }, 50)
        }), s.show()
    }, t.modal.prompt = function(i, e, n, o) {
        n = t.$.isFunction(n) ? n : function() {}, o = t.$.extend(!0, {
            bgclose: !1,
            keyboard: !1,
            modal: !1,
            labels: t.modal.labels
        }, o);
        var s = t.modal.dialog([i ? '<div class="uk-modal-content uk-form">' + String(i) + "</div>" : "", '<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>', '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-modal-close">' + o.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-ok">' + o.labels.Ok + "</button></div>"].join(""), o),
            a = s.element.find("input[type='text']").val(e || "").on("keyup", function(t) {
                13 == t.keyCode && s.element.find(".js-modal-ok").trigger("click")
            });
        return s.element.find(".js-modal-ok").on("click", function() {
            n(a.val()) !== !1 && s.hide()
        }), s.show()
    }, t.modal.blockUI = function(i, e) {
        var n = t.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(i || '<div class="uk-text-center">...</div>') + "</div>"].join(""), t.$.extend({
            bgclose: !1,
            keyboard: !1,
            modal: !1
        }, e));
        return n.content = n.element.find(".uk-modal-content:first"), n.show()
    }, t.modal.labels = {
        Ok: "Ok",
        Cancel: "Cancel"
    }
}(UIkit),
function(t) {
    "use strict";

    function i(i) {
        var e = t.$(i),
            n = "auto";
        if (e.is(":visible")) n = e.outerHeight();
        else {
            var o = {
                position: e.css("position"),
                visibility: e.css("visibility"),
                display: e.css("display")
            };
            n = e.css({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }).outerHeight(), e.css(o)
        }
        return n
    }
    t.component("nav", {
        defaults: {
            toggle: '>li.uk-parent > a[href="#"]',
            lists: ">li.uk-parent > ul",
            multiple: !1
        },
        boot: function() {
            t.ready(function(i) {
                t.$("[data-uk-nav]", i).each(function() {
                    var i = t.$(this);
                    if (!i.data("nav")) {
                        t.nav(i, t.Utils.options(i.attr("data-uk-nav")))
                    }
                })
            })
        },
        init: function() {
            var i = this;
            this.on("click.uk.nav", this.options.toggle, function(e) {
                e.preventDefault();
                var n = t.$(this);
                i.open(n.parent()[0] == i.element[0] ? n : n.parent("li"))
            }), this.update(), t.domObserve(this.element, function() {
                i.element.find(i.options.lists).not("[role]").length && i.update()
            })
        },
        update: function() {
            var i = this;
            this.find(this.options.lists).each(function() {
                var e = t.$(this).attr("role", "menu"),
                    n = e.closest("li"),
                    o = n.hasClass("uk-active");
                n.data("list-container") || (e.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'), n.data("list-container", e.parent()[o ? "removeClass" : "addClass"]("uk-hidden"))), n.attr("aria-expanded", n.hasClass("uk-open")), o && i.open(n, !0)
            })
        },
        open: function(e, n) {
            var o = this,
                s = this.element,
                a = t.$(e),
                r = a.data("list-container");
            this.options.multiple || s.children(".uk-open").not(e).each(function() {
                var i = t.$(this);
                i.data("list-container") && i.data("list-container").stop().animate({
                    height: 0
                }, function() {
                    t.$(this).parent().removeClass("uk-open").end().addClass("uk-hidden")
                })
            }), a.toggleClass("uk-open"), a.attr("aria-expanded", a.hasClass("uk-open")), r && (a.hasClass("uk-open") && r.removeClass("uk-hidden"), n ? (r.stop().height(a.hasClass("uk-open") ? "auto" : 0), a.hasClass("uk-open") || r.addClass("uk-hidden"), this.trigger("display.uk.check")) : r.stop().animate({
                height: a.hasClass("uk-open") ? i(r.find("ul:first")) : 0
            }, function() {
                a.hasClass("uk-open") ? r.css("height", "") : r.addClass("uk-hidden"), o.trigger("display.uk.check")
            }))
        }
    })
}(UIkit),
function(t) {
    "use strict";
    var i = {
            x: window.scrollX,
            y: window.scrollY
        },
        e = (t.$win, t.$doc, t.$html),
        n = {
            show: function(n, o) {
                if (n = t.$(n), n.length) {
                    o = t.$.extend({
                        mode: "push"
                    }, o);
                    var s = t.$("body"),
                        a = n.find(".uk-offcanvas-bar:first"),
                        r = "right" == t.langdirection,
                        l = a.hasClass("uk-offcanvas-bar-flip") ? -1 : 1,
                        c = l * (r ? -1 : 1),
                        u = window.innerWidth - s.width();
                    i = {
                        x: window.pageXOffset,
                        y: window.pageYOffset
                    }, a.attr("mode", o.mode), n.addClass("uk-active"), s.css({
                        width: window.innerWidth - u,
                        height: window.innerHeight
                    }).addClass("uk-offcanvas-page"), ("push" == o.mode || "reveal" == o.mode) && s.css(r ? "margin-right" : "margin-left", (r ? -1 : 1) * a.outerWidth() * c), "reveal" == o.mode && a.css("clip", "rect(0, " + a.outerWidth() + "px, 100vh, 0)"), e.css("margin-top", -1 * i.y).width(), a.addClass("uk-offcanvas-bar-show"), this._initElement(n), a.trigger("show.uk.offcanvas", [n, a]), n.attr("aria-hidden", "false")
                }
            },
            hide: function(n) {
                var o = t.$("body"),
                    s = t.$(".uk-offcanvas.uk-active"),
                    a = "right" == t.langdirection,
                    r = s.find(".uk-offcanvas-bar:first"),
                    l = function() {
                        o.removeClass("uk-offcanvas-page").css({
                            width: "",
                            height: "",
                            marginLeft: "",
                            marginRight: ""
                        }), s.removeClass("uk-active"), r.removeClass("uk-offcanvas-bar-show"), e.css("margin-top", ""), window.scrollTo(i.x, i.y), r.trigger("hide.uk.offcanvas", [s, r]), s.attr("aria-hidden", "true")
                    };
                s.length && ("none" == r.attr("mode") && (n = !0), t.support.transition && !n ? (o.one(t.support.transition.end, function() {
                    l()
                }).css(a ? "margin-right" : "margin-left", ""), "reveal" == r.attr("mode") && r.css("clip", ""), setTimeout(function() {
                    r.removeClass("uk-offcanvas-bar-show")
                }, 0)) : l())
            },
            _initElement: function(i) {
                i.data("OffcanvasInit") || (i.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas", function(i) {
                    var e = t.$(i.target);
                    if (!i.type.match(/swipe/) && !e.hasClass("uk-offcanvas-close")) {
                        if (e.hasClass("uk-offcanvas-bar")) return;
                        if (e.parents(".uk-offcanvas-bar:first").length) return
                    }
                    i.stopImmediatePropagation(), n.hide()
                }), i.on("click", 'a[href*="#"]', function() {
                    var i = t.$(this),
                        e = i.attr("href");
                    "#" != e && (t.$doc.one("hide.uk.offcanvas", function() {
                        var n;
                        try {
                            n = t.$(i[0].hash)
                        } catch (o) {
                            n = ""
                        }
                        n.length || (n = t.$('[name="' + i[0].hash.replace("#", "") + '"]')), n.length && t.Utils.scrollToElement ? t.Utils.scrollToElement(n, t.Utils.options(i.attr("data-uk-smooth-scroll") || "{}")) : window.location.href = e
                    }), n.hide())
                }), i.data("OffcanvasInit", !0))
            }
        };
    t.component("offcanvasTrigger", {
        boot: function() {
            e.on("click.offcanvas.uikit", "[data-uk-offcanvas]", function(i) {
                i.preventDefault();
                var e = t.$(this);
                if (!e.data("offcanvasTrigger")) {
                    {
                        t.offcanvasTrigger(e, t.Utils.options(e.attr("data-uk-offcanvas")))
                    }
                    e.trigger("click")
                }
            }), e.on("keydown.uk.offcanvas", function(t) {
                27 === t.keyCode && n.hide()
            })
        },
        init: function() {
            var i = this;
            this.options = t.$.extend({
                target: i.element.is("a") ? i.element.attr("href") : !1,
                mode: "push"
            }, this.options), this.on("click", function(t) {
                t.preventDefault(), n.show(i.options.target, i.options)
            })
        }
    }), t.offcanvas = n
}(UIkit),
function(t) {
    "use strict";

    function i(i, e, n) {
        var o, s = t.$.Deferred(),
            a = i,
            r = i;
        return n[0] === e[0] ? (s.resolve(), s.promise()) : ("object" == typeof i && (a = i[0], r = i[1] || i[0]), t.$body.css("overflow-x", "hidden"), o = function() {
            e && e.hide().removeClass("uk-active " + r + " uk-animation-reverse"), n.addClass(a).one(t.support.animation.end, function() {
                setTimeout(function() {
                    n.removeClass("" + a).css({
                        opacity: "",
                        display: ""
                    })
                }, 0), s.resolve(), t.$body.css("overflow-x", ""), e && e.css({
                    opacity: "",
                    display: ""
                })
            }.bind(this)).show()
        }, n.css("animation-duration", this.options.duration + "ms"), e && e.length ? (e.css("animation-duration", this.options.duration + "ms"), e.css("display", "none").addClass(r + " uk-animation-reverse").one(t.support.animation.end, function() {
            o()
        }.bind(this)).css("display", "")) : (n.addClass("uk-active"), o()), s.promise())
    }
    var e;
    t.component("switcher", {
        defaults: {
            connect: !1,
            toggle: ">*",
            active: 0,
            animation: !1,
            duration: 200,
            swiping: !0
        },
        animating: !1,
        boot: function() {
            t.ready(function(i) {
                t.$("[data-uk-switcher]", i).each(function() {
                    var i = t.$(this);
                    if (!i.data("switcher")) {
                        t.switcher(i, t.Utils.options(i.attr("data-uk-switcher")))
                    }
                })
            })
        },
        init: function() {
            var i = this;
            this.on("click.uk.switcher", this.options.toggle, function(t) {
                t.preventDefault(), i.show(this)
            }), this.options.connect && (this.connect = t.$(this.options.connect), this.connect.length && (this.connect.on("click.uk.switcher", "[data-uk-switcher-item]", function(e) {
                e.preventDefault();
                var n = t.$(this).attr("data-uk-switcher-item");
                if (i.index != n) switch (n) {
                    case "next":
                    case "previous":
                        i.show(i.index + ("next" == n ? 1 : -1));
                        break;
                    default:
                        i.show(parseInt(n, 10))
                }
            }), this.options.swiping && this.connect.on("swipeRight swipeLeft", function(t) {
                t.preventDefault(), window.getSelection().toString() || i.show(i.index + ("swipeLeft" == t.type ? 1 : -1))
            }), this.update()))
        },
        update: function() {
            this.connect.children().removeClass("uk-active").attr("aria-hidden", "true");
            var t = this.find(this.options.toggle),
                i = t.filter(".uk-active");
            if (i.length) this.show(i, !1);
            else {
                if (this.options.active === !1) return;
                i = t.eq(this.options.active), this.show(i.length ? i : t.eq(0), !1)
            }
            t.not(i).attr("aria-expanded", "false"), i.attr("aria-expanded", "true")
        },
        show: function(n, o) {
            if (!this.animating) {
                var s = this.find(this.options.toggle);
                isNaN(n) ? n = t.$(n) : (n = 0 > n ? s.length - 1 : n, n = s.eq(s[n] ? n : 0));
                var a = this,
                    r = t.$(n),
                    l = e[this.options.animation] || function(t, n) {
                        if (!a.options.animation) return e.none.apply(a);
                        var o = a.options.animation.split(",");
                        return 1 == o.length && (o[1] = o[0]), o[0] = o[0].trim(), o[1] = o[1].trim(), i.apply(a, [o, t, n])
                    };
                o !== !1 && t.support.animation || (l = e.none), r.hasClass("uk-disabled") || (s.attr("aria-expanded", "false"), r.attr("aria-expanded", "true"), s.filter(".uk-active").removeClass("uk-active"), r.addClass("uk-active"), this.options.connect && this.connect.length && (this.index = this.find(this.options.toggle).index(r), -1 == this.index && (this.index = 0), this.connect.each(function() {
                    var i = t.$(this),
                        e = t.$(i.children()),
                        n = t.$(e.filter(".uk-active")),
                        o = t.$(e.eq(a.index));
                    a.animating = !0, l.apply(a, [n, o]).then(function() {
                        n.removeClass("uk-active"), o.addClass("uk-active"), n.attr("aria-hidden", "true"), o.attr("aria-hidden", "false"), t.Utils.checkDisplay(o, !0), a.animating = !1
                    })
                })), this.trigger("show.uk.switcher", [r]))
            }
        }
    }), e = {
        none: function() {
            var i = t.$.Deferred();
            return i.resolve(), i.promise()
        },
        fade: function(t, e) {
            return i.apply(this, ["uk-animation-fade", t, e])
        },
        "slide-bottom": function(t, e) {
            return i.apply(this, ["uk-animation-slide-bottom", t, e])
        },
        "slide-top": function(t, e) {
            return i.apply(this, ["uk-animation-slide-top", t, e])
        },
        "slide-vertical": function(t, e) {
            var n = ["uk-animation-slide-top", "uk-animation-slide-bottom"];
            return t && t.index() > e.index() && n.reverse(), i.apply(this, [n, t, e])
        },
        "slide-left": function(t, e) {
            return i.apply(this, ["uk-animation-slide-left", t, e])
        },
        "slide-right": function(t, e) {
            return i.apply(this, ["uk-animation-slide-right", t, e])
        },
        "slide-horizontal": function(t, e) {
            var n = ["uk-animation-slide-right", "uk-animation-slide-left"];
            return t && t.index() > e.index() && n.reverse(), i.apply(this, [n, t, e])
        },
        scale: function(t, e) {
            return i.apply(this, ["uk-animation-scale-up", t, e])
        }
    }, t.switcher.animations = e
}(UIkit),
function(t) {
    "use strict";
    t.component("tab", {
        defaults: {
            target: ">li:not(.uk-tab-responsive, .uk-disabled)",
            connect: !1,
            active: 0,
            animation: !1,
            duration: 200,
            swiping: !0
        },
        boot: function() {
            t.ready(function(i) {
                t.$("[data-uk-tab]", i).each(function() {
                    var i = t.$(this);
                    if (!i.data("tab")) {
                        t.tab(i, t.Utils.options(i.attr("data-uk-tab")))
                    }
                })
            })
        },
        init: function() {
            var i = this;
            this.current = !1, this.on("click.uk.tab", this.options.target, function(e) {
                if (e.preventDefault(), !i.switcher || !i.switcher.animating) {
                    var n = i.find(i.options.target).not(this);
                    n.removeClass("uk-active").blur(), i.trigger("change.uk.tab", [t.$(this).addClass("uk-active"), i.current]), i.current = t.$(this), i.options.connect || (n.attr("aria-expanded", "false"), t.$(this).attr("aria-expanded", "true"))
                }
            }), this.options.connect && (this.connect = t.$(this.options.connect)), this.responsivetab = t.$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>'), this.responsivetab.dropdown = this.responsivetab.find(".uk-dropdown"), this.responsivetab.lst = this.responsivetab.dropdown.find("ul"), this.responsivetab.caption = this.responsivetab.find("a:first"), this.element.hasClass("uk-tab-bottom") && this.responsivetab.dropdown.addClass("uk-dropdown-up"), this.responsivetab.lst.on("click.uk.tab", "a", function(e) {
                e.preventDefault(), e.stopPropagation();
                var n = t.$(this);
                i.element.children("li:not(.uk-tab-responsive)").eq(n.data("index")).trigger("click")
            }), this.on("show.uk.switcher change.uk.tab", function(t, e) {
                i.responsivetab.caption.html(e.text())
            }), this.element.append(this.responsivetab), this.options.connect && (this.switcher = t.switcher(this.element, {
                toggle: ">li:not(.uk-tab-responsive)",
                connect: this.options.connect,
                active: this.options.active,
                animation: this.options.animation,
                duration: this.options.duration,
                swiping: this.options.swiping
            })), t.dropdown(this.responsivetab, {
                mode: "click",
                preventflip: "y"
            }), i.trigger("change.uk.tab", [this.element.find(this.options.target).not(".uk-tab-responsive").filter(".uk-active")]), this.check(), t.$win.on("resize orientationchange", t.Utils.debounce(function() {
                i.element.is(":visible") && i.check()
            }, 100)), this.on("display.uk.check", function() {
                i.element.is(":visible") && i.check()
            })
        },
        check: function() {
            var i = this.element.children("li:not(.uk-tab-responsive)").removeClass("uk-hidden");
            if (!i.length) return this.responsivetab.addClass("uk-hidden"), void 0;
            var e, n, o, s = i.eq(0).offset().top + Math.ceil(i.eq(0).height() / 2),
                a = !1;
            if (this.responsivetab.lst.empty(), i.each(function() {
                    t.$(this).offset().top > s && (a = !0)
                }), a)
                for (var r = 0; r < i.length; r++) e = t.$(i.eq(r)), n = e.find("a"), "none" == e.css("float") || e.attr("uk-dropdown") || (e.hasClass("uk-disabled") || (o = t.$(e[0].outerHTML), o.find("a").data("index", r), this.responsivetab.lst.append(o)), e.addClass("uk-hidden"));
            this.responsivetab[this.responsivetab.lst.children("li").length ? "removeClass" : "addClass"]("uk-hidden")
        }
    })
}(UIkit),
function(t) {
    "use strict";
    t.component("cover", {
        defaults: {
            automute: !0
        },
        boot: function() {
            t.ready(function(i) {
                t.$("[data-uk-cover]", i).each(function() {
                    var i = t.$(this);
                    if (!i.data("cover")) {
                        t.cover(i, t.Utils.options(i.attr("data-uk-cover")))
                    }
                })
            })
        },
        init: function() {
            if (this.parent = this.element.parent(), t.$win.on("load resize orientationchange", t.Utils.debounce(function() {
                    this.check()
                }.bind(this), 100)), this.on("display.uk.check", function() {
                    this.element.is(":visible") && this.check()
                }.bind(this)), this.check(), this.element.is("iframe") && this.options.automute) {
                var i = this.element.attr("src");
                this.element.attr("src", "").on("load", function() {
                    this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', "*")
                }).attr("src", [i, i.indexOf("?") > -1 ? "&" : "?", "enablejsapi=1&api=1"].join(""))
            }
        },
        check: function() {
            this.element.css({
                width: "",
                height: ""
            }), this.dimension = {
                w: this.element.width(),
                h: this.element.height()
            }, this.element.attr("width") && !isNaN(this.element.attr("width")) && (this.dimension.w = this.element.attr("width")), this.element.attr("height") && !isNaN(this.element.attr("height")) && (this.dimension.h = this.element.attr("height")), this.ratio = this.dimension.w / this.dimension.h;
            var t, i, e = this.parent.width(),
                n = this.parent.height();
            e / this.ratio < n ? (t = Math.ceil(n * this.ratio), i = n) : (t = e, i = Math.ceil(e / this.ratio)), this.element.css({
                width: t,
                height: i
            })
        }
    })
}(UIkit);
/*! SLIDER UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
! function(t) {
    var e;
    window.UIkit && (e = t(UIkit)), "function" == typeof define && define.amd && define("uikit-slider", ["uikit"], function() {
        return e || t(UIkit)
    })
}(function(t) {
    "use strict";
    var e, i, s, n, a = {};
    return t.component("slider", {
        defaults: {
            center: !1,
            threshold: 10,
            infinite: !0,
            autoplay: !1,
            autoplayInterval: 7e3,
            pauseOnHover: !0,
            activecls: "uk-active"
        },
        boot: function() {
            t.ready(function(e) {
                setTimeout(function() {
                    t.$("[data-uk-slider]", e).each(function() {
                        var e = t.$(this);
                        e.data("slider") || t.slider(e, t.Utils.options(e.attr("data-uk-slider")))
                    })
                }, 0)
            })
        },
        init: function() {
            var o = this;
            this.container = this.element.find(".uk-slider"), this.focus = 0, t.$win.on("resize load", t.Utils.debounce(function() {
                o.update(!0)
            }, 100)), this.on("click.uk.slider", "[data-uk-slider-item]", function(e) {
                e.preventDefault();
                var i = t.$(this).attr("data-uk-slider-item");
                if (o.focus != i) switch (o.stop(), i) {
                    case "next":
                    case "previous":
                        o["next" == i ? "next" : "previous"]();
                        break;
                    default:
                        o.updateFocus(parseInt(i, 10))
                }
            }), this.container.on({
                "touchstart mousedown": function(h) {
                    h.originalEvent && h.originalEvent.touches && (h = h.originalEvent.touches[0]), h.button && 2 == h.button || !o.active || (o.stop(), s = t.$(h.target).is("a") ? t.$(h.target) : t.$(h.target).parents("a:first"), n = !1, s.length && s.one("click", function(t) {
                        n && t.preventDefault()
                    }), i = function(t) {
                        n = !0, e = o, a = {
                            touchx: parseInt(t.pageX, 10),
                            dir: 1,
                            focus: o.focus,
                            base: o.options.center ? "center" : "area"
                        }, t.originalEvent && t.originalEvent.touches && (t = t.originalEvent.touches[0]), e.element.data({
                            "pointer-start": {
                                x: parseInt(t.pageX, 10),
                                y: parseInt(t.pageY, 10)
                            },
                            "pointer-pos-start": o.pos
                        }), o.container.addClass("uk-drag"), i = !1
                    }, i.x = parseInt(h.pageX, 10), i.threshold = o.options.threshold)
                },
                mouseenter: function() {
                    o.options.pauseOnHover && (o.hovering = !0)
                },
                mouseleave: function() {
                    o.hovering = !1
                }
            }), this.update(!0), this.on("display.uk.check", function() {
                o.element.is(":visible") && o.update(!0)
            }), this.element.find("a,img").attr("draggable", "false"), this.options.autoplay && this.start(), t.domObserve(this.element, function() {
                o.element.children(":not([data-slider-slide])").length && o.update(!0)
            })
        },
        update: function(e) {
            var i, s, n, a, o = this,
                h = 0,
                r = 0;
            return this.items = this.container.children().filter(":visible"), this.vp = this.element[0].getBoundingClientRect().width, this.container.css({
                "min-width": "",
                "min-height": ""
            }), this.items.each(function(e) {
                i = t.$(this).attr("data-slider-slide", e), a = i.css({
                    left: "",
                    width: ""
                })[0].getBoundingClientRect(), s = a.width, n = i.width(), r = Math.max(r, a.height), i.css({
                    left: h,
                    width: s
                }).data({
                    idx: e,
                    left: h,
                    width: s,
                    cwidth: n,
                    area: h + s,
                    center: h - (o.vp / 2 - n / 2)
                }), h += s
            }), this.container.css({
                "min-width": h,
                "min-height": r
            }), this.options.infinite && (h <= 2 * this.vp || this.items.length < 5) && !this.itemsResized ? (this.container.children().each(function(t) {
                o.container.append(o.items.eq(t).clone(!0).attr("id", ""))
            }).each(function(t) {
                o.container.append(o.items.eq(t).clone(!0).attr("id", ""))
            }), this.itemsResized = !0, this.update()) : (this.cw = h, this.pos = 0, this.active = h >= this.vp, this.container.css({
                "-ms-transform": "",
                "-webkit-transform": "",
                transform: ""
            }), e && this.updateFocus(this.focus), void 0)
        },
        updatePos: function(t) {
            this.pos = t, this.container.css({
                "-ms-transform": "translateX(" + t + "px)",
                "-webkit-transform": "translateX(" + t + "px)",
                transform: "translateX(" + t + "px)"
            })
        },
        updateFocus: function(e, i) {
            if (this.active) {
                i = i || (e > this.focus ? 1 : -1);
                var s, n, a = this.items.eq(e);
                if (this.options.infinite && this.infinite(e, i), this.options.center) this.updatePos(-1 * a.data("center")), this.items.filter("." + this.options.activecls).removeClass(this.options.activecls), a.addClass(this.options.activecls);
                else if (this.options.infinite) this.updatePos(-1 * a.data("left"));
                else {
                    for (s = 0, n = e; n < this.items.length; n++) s += this.items.eq(n).data("width");
                    if (s > this.vp) this.updatePos(-1 * a.data("left"));
                    else if (1 == i) {
                        for (s = 0, n = this.items.length - 1; n >= 0; n--) {
                            if (s += this.items.eq(n).data("width"), s == this.vp) {
                                e = n;
                                break
                            }
                            if (s > this.vp) {
                                e = n < this.items.length - 1 ? n + 1 : n;
                                break
                            }
                        }
                        s > this.vp ? this.updatePos(-1 * (this.container.width() - this.vp)) : this.updatePos(-1 * this.items.eq(e).data("left"))
                    }
                }
                var o = this.items.eq(e).data("left");
                this.items.removeClass("uk-slide-before uk-slide-after").each(function(i) {
                    i !== e && t.$(this).addClass(t.$(this).data("left") < o ? "uk-slide-before" : "uk-slide-after")
                }), this.focus = e, this.trigger("focusitem.uk.slider", [e, this.items.eq(e), this])
            }
        },
        next: function() {
            var t = this.items[this.focus + 1] ? this.focus + 1 : this.options.infinite ? 0 : this.focus;
            this.updateFocus(t, 1)
        },
        previous: function() {
            var t = this.items[this.focus - 1] ? this.focus - 1 : this.options.infinite ? this.items[this.focus - 1] ? this.items - 1 : this.items.length - 1 : this.focus;
            this.updateFocus(t, -1)
        },
        start: function() {
            this.stop();
            var t = this;
            this.interval = setInterval(function() {
                t.hovering || t.next()
            }, this.options.autoplayInterval)
        },
        stop: function() {
            this.interval && clearInterval(this.interval)
        },
        infinite: function(t, e) {
            var i, s = this,
                n = this.items.eq(t),
                a = t,
                o = [],
                h = 0;
            if (1 == e) {
                for (i = 0; i < this.items.length && (a != t && (h += this.items.eq(a).data("width"), o.push(this.items.eq(a))), !(h > this.vp)); i++) a = a + 1 == this.items.length ? 0 : a + 1;
                o.length && o.forEach(function(t) {
                    var e = n.data("area");
                    t.css({
                        left: e
                    }).data({
                        left: e,
                        area: e + t.data("width"),
                        center: e - (s.vp / 2 - t.data("cwidth") / 2)
                    }), n = t
                })
            } else {
                for (i = this.items.length - 1; i > -1 && (h += this.items.eq(a).data("width"), a != t && o.push(this.items.eq(a)), !(h > this.vp)); i--) a = a - 1 == -1 ? this.items.length - 1 : a - 1;
                o.length && o.forEach(function(t) {
                    var e = n.data("left") - t.data("width");
                    t.css({
                        left: e
                    }).data({
                        left: e,
                        area: e + t.data("width"),
                        center: e - (s.vp / 2 - t.data("cwidth") / 2)
                    }), n = t
                })
            }
        }
    }), t.$doc.on("mousemove.uk.slider touchmove.uk.slider", function(t) {
        if (t.originalEvent && t.originalEvent.touches && (t = t.originalEvent.touches[0]), i && Math.abs(t.pageX - i.x) > i.threshold && (window.getSelection().toString() ? e = i = !1 : i(t)), e) {
            var s, n, o, h, r, c, d, u, f, l;
            if (t.clientX || t.clientY ? s = t.clientX : (t.pageX || t.pageY) && (s = t.pageX - document.body.scrollLeft - document.documentElement.scrollLeft), r = a.focus, n = s - e.element.data("pointer-start").x, o = e.element.data("pointer-pos-start") + n, h = s > e.element.data("pointer-start").x ? -1 : 1, c = e.items.eq(a.focus), 1 == h)
                for (d = c.data("left") + Math.abs(n), u = 0, f = a.focus; u < e.items.length; u++) {
                    if (l = e.items.eq(f), f != a.focus && l.data("left") < d && l.data("area") > d) {
                        r = f;
                        break
                    }
                    f = f + 1 == e.items.length ? 0 : f + 1
                } else
                    for (d = c.data("left") - Math.abs(n), u = 0, f = a.focus; u < e.items.length; u++) {
                        if (l = e.items.eq(f), f != a.focus && l.data("area") <= c.data("left") && l.data("center") < d) {
                            r = f;
                            break
                        }
                        f = f - 1 == -1 ? e.items.length - 1 : f - 1
                    }
            e.options.infinite && r != a._focus && e.infinite(r, h), e.updatePos(o), a.dir = h, a._focus = r, a.touchx = parseInt(t.pageX, 10), a.diff = d
        }
    }), t.$doc.on("mouseup.uk.slider touchend.uk.slider", function() {
        if (e) {
            e.container.removeClass("uk-drag"), e.items.eq(a.focus);
            var t, s, n, o = !1;
            if (1 == a.dir) {
                for (s = 0, n = a.focus; s < e.items.length; s++) {
                    if (t = e.items.eq(n), n != a.focus && t.data("left") > a.diff) {
                        o = n;
                        break
                    }
                    n = n + 1 == e.items.length ? 0 : n + 1
                }
                e.options.infinite || o || (o = e.items.length)
            } else {
                for (s = 0, n = a.focus; s < e.items.length; s++) {
                    if (t = e.items.eq(n), n != a.focus && t.data("left") < a.diff) {
                        o = n;
                        break
                    }
                    n = n - 1 == -1 ? e.items.length - 1 : n - 1
                }
                e.options.infinite || o || (o = 0)
            }
            e.updateFocus(o !== !1 ? o : a._focus)
        }
        e = i = !1
    }), t.slider
});
/*! STICKY UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
! function(t) {
    var i;
    window.UIkit && (i = t(UIkit)), "function" == typeof define && define.amd && define("uikit-sticky", ["uikit"], function() {
        return i || t(UIkit)
    })
}(function(t) {
    "use strict";

    function i() {
        var i = arguments.length ? arguments : n;
        if (i.length && !(e.scrollTop() < 0))
            for (var o, a, r, h, p = e.scrollTop(), c = s.height(), l = e.height(), m = c - l, d = p > m ? m - p : 0, u = 0; u < i.length; u++)
                if (h = i[u], h.element.is(":visible") && !h.animate) {
                    if (h.check()) {
                        if (h.top < 0 ? o = 0 : (r = h.element.outerHeight(), o = c - r - h.top - h.options.bottom - p - d, o = 0 > o ? o + h.top : h.top), h.boundary && h.boundary.length) {
                            var f = h.boundary.offset().top;
                            a = h.boundtoparent ? c - (f + h.boundary.outerHeight()) + parseInt(h.boundary.css("padding-bottom")) : c - f, o = p + r > c - a - (h.top < 0 ? 0 : h.top) ? c - a - (p + r) : o
                        }
                        if (h.currentTop != o) {
                            if (h.element.css({
                                    position: "fixed",
                                    top: o,
                                    width: h.getWidthFrom.length ? h.getWidthFrom.width() : h.element.width()
                                }), !h.init && (h.element.addClass(h.options.clsinit), location.hash && p > 0 && h.options.target)) {
                                var g = t.$(location.hash);
                                g.length && setTimeout(function(t, i) {
                                    return function() {
                                        i.element.width();
                                        var e = t.offset(),
                                            s = e.top + t.outerHeight(),
                                            n = i.element.offset(),
                                            o = i.element.outerHeight(),
                                            a = n.top + o;
                                        n.top < s && e.top < a && (p = e.top - o - i.options.target, window.scrollTo(0, p))
                                    }
                                }(g, h), 0)
                            }
                            h.element.addClass(h.options.clsactive).removeClass(h.options.clsinactive), h.element.trigger("active.uk.sticky"), h.element.css("margin", ""), h.options.animation && h.init && !t.Utils.isInView(h.wrapper) && h.element.addClass(h.options.animation), h.currentTop = o
                        }
                    } else null !== h.currentTop && h.reset();
                    h.init = !0
                }
    }
    var e = t.$win,
        s = t.$doc,
        n = [],
        o = 1;
    return t.component("sticky", {
        defaults: {
            top: 0,
            bottom: 0,
            animation: "",
            clsinit: "uk-sticky-init",
            clsactive: "uk-active",
            clsinactive: "",
            getWidthFrom: "",
            showup: !1,
            boundary: !1,
            media: !1,
            target: !1,
            disabled: !1
        },
        boot: function() {
            t.$doc.on("scrolling.uk.document", function(t, e) {
                e && e.dir && (o = e.dir.y, i())
            }), t.$win.on("resize orientationchange", t.Utils.debounce(function() {
                if (n.length) {
                    for (var t = 0; t < n.length; t++) n[t].reset(!0), n[t].self.computeWrapper();
                    i()
                }
            }, 100)), t.ready(function(e) {
                setTimeout(function() {
                    t.$("[data-uk-sticky]", e).each(function() {
                        var i = t.$(this);
                        i.data("sticky") || t.sticky(i, t.Utils.options(i.attr("data-uk-sticky")))
                    }), i()
                }, 0)
            })
        },
        init: function() {
            var i, a = this.options.boundary;
            this.wrapper = this.element.wrap('<div class="uk-sticky-placeholder"></div>').parent(), this.computeWrapper(), this.wrapper.css({
                "margin-top": this.element.css("margin-top"),
                "margin-bottom": this.element.css("margin-bottom"),
                "margin-left": this.element.css("margin-left"),
                "margin-right": this.element.css("margin-right")
            }), this.element.css("margin", 0), a && (a === !0 || "!" === a[0] ? (a = a === !0 ? this.wrapper.parent() : this.wrapper.closest(a.substr(1)), i = !0) : "string" == typeof a && (a = t.$(a))), this.sticky = {
                self: this,
                options: this.options,
                element: this.element,
                currentTop: null,
                wrapper: this.wrapper,
                init: !1,
                getWidthFrom: t.$(this.options.getWidthFrom || this.wrapper),
                boundary: a,
                boundtoparent: i,
                top: 0,
                calcTop: function() {
                    var i = this.options.top;
                    if (this.options.top && "string" == typeof this.options.top)
                        if (this.options.top.match(/^(-|)(\d+)vh$/)) i = window.innerHeight * parseInt(this.options.top, 10) / 100;
                        else {
                            var e = t.$(this.options.top).first();
                            e.length && e.is(":visible") && (i = -1 * (e.offset().top + e.outerHeight() - this.wrapper.offset().top))
                        }
                    this.top = i
                },
                reset: function(i) {
                    this.calcTop();
                    var e = function() {
                        this.element.css({
                            position: "",
                            top: "",
                            width: "",
                            left: "",
                            margin: "0"
                        }), this.element.removeClass([this.options.animation, "uk-animation-reverse", this.options.clsactive].join(" ")), this.element.addClass(this.options.clsinactive), this.element.trigger("inactive.uk.sticky"), this.currentTop = null, this.animate = !1
                    }.bind(this);
                    !i && this.options.animation && t.support.animation && !t.Utils.isInView(this.wrapper) ? (this.animate = !0, this.element.removeClass(this.options.animation).one(t.support.animation.end, function() {
                        e()
                    }).width(), this.element.addClass(this.options.animation + " uk-animation-reverse")) : e()
                },
                check: function() {
                    if (this.options.disabled) return !1;
                    if (this.options.media) switch (typeof this.options.media) {
                        case "number":
                            if (window.innerWidth < this.options.media) return !1;
                            break;
                        case "string":
                            if (window.matchMedia && !window.matchMedia(this.options.media).matches) return !1
                    }
                    var i = e.scrollTop(),
                        n = s.height(),
                        a = n - window.innerHeight,
                        r = i > a ? a - i : 0,
                        h = this.wrapper.offset().top,
                        p = h - this.top - r,
                        c = i >= p;
                    return c && this.options.showup && (1 == o && (c = !1), -1 == o && !this.element.hasClass(this.options.clsactive) && t.Utils.isInView(this.wrapper) && (c = !1)), c
                }
            }, this.sticky.calcTop(), n.push(this.sticky)
        },
        update: function() {
            i(this.sticky)
        },
        enable: function() {
            this.options.disabled = !1, this.update()
        },
        disable: function(t) {
            this.options.disabled = !0, this.sticky.reset(t)
        },
        computeWrapper: function() {
            this.wrapper.css({
                height: -1 == ["absolute", "fixed"].indexOf(this.element.css("position")) ? this.element.outerHeight() : "",
                "float": "none" != this.element.css("float") ? this.element.css("float") : ""
            }), "fixed" == this.element.css("position") && this.element.css({
                width: this.sticky.getWidthFrom.length ? this.sticky.getWidthFrom.width() : this.element.width()
            })
        }
    }), t.sticky
});
/*! LIGHTBOX UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
! function(i) {
    var t;
    window.UIkit && (t = i(UIkit)), "function" == typeof define && define.amd && define("uikit-lightbox", ["uikit"], function() {
        return t || i(UIkit)
    })
}(function(i) {
    "use strict";

    function t(t) {
        if (e) return e.lightbox = t, e;
        e = i.$(['<div class="uk-modal">', '<div class="uk-modal-dialog uk-modal-dialog-lightbox uk-slidenav-position" style="margin-left:auto;margin-right:auto;width:200px;height:200px;top:' + Math.abs(window.innerHeight / 2 - 200) + 'px;">', '<a href="#" class="uk-modal-close uk-close uk-close-alt"></a>', '<div class="uk-lightbox-content"></div>', '<div class="uk-modal-spinner uk-hidden"></div>', "</div>", "</div>"].join("")).appendTo("body"), e.dialog = e.find(".uk-modal-dialog:first"), e.content = e.find(".uk-lightbox-content:first"), e.loader = e.find(".uk-modal-spinner:first"), e.closer = e.find(".uk-close.uk-close-alt"), e.modal = i.modal(e, {
            modal: !1
        }), e.on("swipeRight swipeLeft", function(i) {
            e.lightbox["swipeLeft" == i.type ? "next" : "previous"]()
        }).on("click", "[data-lightbox-previous], [data-lightbox-next]", function(t) {
            t.preventDefault(), e.lightbox[i.$(this).is("[data-lightbox-next]") ? "next" : "previous"]()
        }), e.on("hide.uk.modal", function() {
            e.content.html("")
        });
        var o = {
            w: window.innerWidth,
            h: window.innerHeight
        };
        return i.$win.on("load resize orientationchange", i.Utils.debounce(function() {
            o.w !== window.innerWidth && e.is(":visible") && !i.Utils.isFullscreen() && e.lightbox.fitSize(), o = {
                w: window.innerWidth,
                h: window.innerHeight
            }
        }, 100)), e.lightbox = t, e
    }
    var e, o = {};
    return i.component("lightbox", {
        defaults: {
            allowfullscreen: !0,
            duration: 400,
            group: !1,
            keyboard: !0
        },
        index: 0,
        items: !1,
        boot: function() {
            i.$html.on("click", "[data-uk-lightbox]", function(t) {
                t.preventDefault();
                var e = i.$(this);
                e.data("lightbox") || i.lightbox(e, i.Utils.options(e.attr("data-uk-lightbox"))), e.data("lightbox").show(e)
            }), i.$doc.on("keyup", function(i) {
                if (e && e.is(":visible") && e.lightbox.options.keyboard) switch (i.preventDefault(), i.keyCode) {
                    case 37:
                        e.lightbox.previous();
                        break;
                    case 39:
                        e.lightbox.next()
                }
            })
        },
        init: function() {
            var t = [];
            if (this.index = 0, this.siblings = [], this.element && this.element.length) {
                var e = this.options.group ? i.$('[data-uk-lightbox*="' + this.options.group + '"]') : this.element;
                e.each(function() {
                    var e = i.$(this);
                    t.push({
                        source: e.attr("href"),
                        title: e.attr("data-title") || e.attr("title"),
                        type: e.attr("data-lightbox-type") || "auto",
                        link: e
                    })
                }), this.index = e.index(this.element), this.siblings = t
            } else this.options.group && this.options.group.length && (this.siblings = this.options.group);
            this.trigger("lightbox-init", [this])
        },
        show: function(e) {
            this.modal = t(this), this.modal.dialog.stop(), this.modal.content.stop();
            var o, n, s = this,
                h = i.$.Deferred();
            e = e || 0, "object" == typeof e && this.siblings.forEach(function(i, t) {
                e[0] === i.link[0] && (e = t)
            }), 0 > e ? e = this.siblings.length - e : this.siblings[e] || (e = 0), n = this.siblings[e], o = {
                lightbox: s,
                source: n.source,
                type: n.type,
                index: e,
                promise: h,
                title: n.title,
                item: n,
                meta: {
                    content: "",
                    width: null,
                    height: null
                }
            }, this.index = e, this.modal.content.empty(), this.modal.is(":visible") || (this.modal.content.css({
                width: "",
                height: ""
            }).empty(), this.modal.modal.show()), this.modal.loader.removeClass("uk-hidden"), h.promise().done(function() {
                s.data = o, s.fitSize(o)
            }).fail(function() {
                o.meta.content = '<div class="uk-position-cover uk-flex uk-flex-middle uk-flex-center"><strong>Loading resource failed!</strong></div>', o.meta.width = 400, o.meta.height = 300, s.data = o, s.fitSize(o)
            }), s.trigger("showitem.uk.lightbox", [o])
        },
        fitSize: function() {
            var t = this,
                e = this.data,
                o = this.modal.dialog.outerWidth() - this.modal.dialog.width(),
                n = parseInt(this.modal.dialog.css("margin-top"), 10),
                s = parseInt(this.modal.dialog.css("margin-bottom"), 10),
                h = n + s,
                a = e.meta.content,
                l = t.options.duration;
            this.siblings.length > 1 && (a = [a, '<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-previous uk-hidden-touch" data-lightbox-previous></a>', '<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-next uk-hidden-touch" data-lightbox-next></a>'].join(""));
            var d, r, u = i.$("<div>&nbsp;</div>").css({
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    maxWidth: t.modal.dialog.css("max-width"),
                    padding: t.modal.dialog.css("padding"),
                    margin: t.modal.dialog.css("margin")
                }),
                c = e.meta.width,
                g = e.meta.height;
            u.appendTo("body").width(), d = u.width(), r = window.innerHeight - h, u.remove(), this.modal.dialog.find(".uk-modal-caption").remove(), e.title && (this.modal.dialog.append('<div class="uk-modal-caption">' + e.title + "</div>"), r -= this.modal.dialog.find(".uk-modal-caption").outerHeight()), d < e.meta.width && (g = Math.floor(g * (d / c)), c = d), g > r && (g = Math.floor(r), c = Math.ceil(e.meta.width * (r / e.meta.height))), this.modal.content.css("opacity", 0).width(c).html(a), "iframe" == e.type && this.modal.content.find("iframe:first").height(g);
            var m = g + o,
                p = Math.floor(window.innerHeight / 2 - m / 2) - h;
            0 > p && (p = 0), this.modal.closer.addClass("uk-hidden"), t.modal.data("mwidth") == c && t.modal.data("mheight") == g && (l = 0), this.modal.dialog.animate({
                width: c + o,
                height: g + o,
                top: p
            }, l, "swing", function() {
                t.modal.loader.addClass("uk-hidden"), t.modal.content.css({
                    width: ""
                }).animate({
                    opacity: 1
                }, function() {
                    t.modal.closer.removeClass("uk-hidden")
                }), t.modal.data({
                    mwidth: c,
                    mheight: g
                })
            })
        },
        next: function() {
            this.show(this.siblings[this.index + 1] ? this.index + 1 : 0)
        },
        previous: function() {
            this.show(this.siblings[this.index - 1] ? this.index - 1 : this.siblings.length - 1)
        }
    }), i.plugin("lightbox", "image", {
        init: function(i) {
            i.on("showitem.uk.lightbox", function(i, t) {
                if ("image" == t.type || t.source && t.source.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
                    var e = function(i, e, o) {
                        t.meta = {
                            content: '<img class="uk-responsive-width" width="' + e + '" height="' + o + '" src ="' + i + '">',
                            width: e,
                            height: o
                        }, t.type = "image", t.promise.resolve()
                    };
                    if (o[t.source]) e(t.source, o[t.source].width, o[t.source].height);
                    else {
                        var n = new Image;
                        n.onerror = function() {
                            t.promise.reject("Loading image failed")
                        }, n.onload = function() {
                            o[t.source] = {
                                width: n.width,
                                height: n.height
                            }, e(t.source, o[t.source].width, o[t.source].height)
                        }, n.src = t.source
                    }
                }
            })
        }
    }), i.plugin("lightbox", "youtube", {
        init: function(i) {
            var t = /(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/,
                n = /youtu\.be\/(.*)/;
            i.on("showitem.uk.lightbox", function(i, s) {
                var h, a, l = function(i, t, o) {
                    s.meta = {
                        content: '<iframe src="//www.youtube.com/embed/' + i + '" width="' + t + '" height="' + o + '" style="max-width:100%;"' + (e.lightbox.options.allowfullscreen ? " allowfullscreen" : "") + "></iframe>",
                        width: t,
                        height: o
                    }, s.type = "iframe", s.promise.resolve()
                };
                if ((a = s.source.match(t)) && (h = a[2]), (a = s.source.match(n)) && (h = a[1]), h) {
                    if (o[h]) l(h, o[h].width, o[h].height);
                    else {
                        var d = new Image,
                            r = !1;
                        d.onerror = function() {
                            o[h] = {
                                width: 640,
                                height: 320
                            }, l(h, o[h].width, o[h].height)
                        }, d.onload = function() {
                            120 == d.width && 90 == d.height ? r ? (o[h] = {
                                width: 640,
                                height: 320
                            }, l(h, o[h].width, o[h].height)) : (r = !0, d.src = "//img.youtube.com/vi/" + h + "/0.jpg") : (o[h] = {
                                width: d.width,
                                height: d.height
                            }, l(h, d.width, d.height))
                        }, d.src = "//img.youtube.com/vi/" + h + "/maxresdefault.jpg"
                    }
                    i.stopImmediatePropagation()
                }
            })
        }
    }), i.plugin("lightbox", "vimeo", {
        init: function(t) {
            var n, s = /(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/;
            t.on("showitem.uk.lightbox", function(t, h) {
                var a, l = function(i, t, o) {
                    h.meta = {
                        content: '<iframe src="//player.vimeo.com/video/' + i + '" width="' + t + '" height="' + o + '" style="width:100%;box-sizing:border-box;"' + (e.lightbox.options.allowfullscreen ? " allowfullscreen" : "") + "></iframe>",
                        width: t,
                        height: o
                    }, h.type = "iframe", h.promise.resolve()
                };
                (n = h.source.match(s)) && (a = n[2], o[a] ? l(a, o[a].width, o[a].height) : i.$.ajax({
                    type: "GET",
                    url: "//vimeo.com/api/oembed.json?url=" + encodeURI(h.source),
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function(i) {
                        o[a] = {
                            width: i.width,
                            height: i.height
                        }, l(a, o[a].width, o[a].height)
                    }
                }), t.stopImmediatePropagation())
            })
        }
    }), i.plugin("lightbox", "video", {
        init: function(t) {
            t.on("showitem.uk.lightbox", function(t, e) {
                var n = function(i, t, o) {
                    e.meta = {
                        content: '<video class="uk-responsive-width" src="' + i + '" width="' + t + '" height="' + o + '" controls></video>',
                        width: t,
                        height: o
                    }, e.type = "video", e.promise.resolve()
                };
                if ("video" == e.type || e.source.match(/\.(mp4|webm|ogv)$/i))
                    if (o[e.source]) n(e.source, o[e.source].width, o[e.source].height);
                    else var s = i.$('<video style="position:fixed;visibility:hidden;top:-10000px;"></video>').attr("src", e.source).appendTo("body"),
                        h = setInterval(function() {
                            s[0].videoWidth && (clearInterval(h), o[e.source] = {
                                width: s[0].videoWidth,
                                height: s[0].videoHeight
                            }, n(e.source, o[e.source].width, o[e.source].height), s.remove())
                        }, 20)
            })
        }
    }), UIkit.plugin("lightbox", "iframe", {
        init: function(i) {
            i.on("showitem.uk.lightbox", function(t, o) {
                var n = function(i, t, n) {
                    o.meta = {
                        content: '<iframe class="uk-responsive-width" src="' + i + '" width="' + t + '" height="' + n + '"' + (e.lightbox.options.allowfullscreen ? " allowfullscreen" : "") + "></iframe>",
                        width: t,
                        height: n
                    }, o.type = "iframe", o.promise.resolve()
                };
                ("iframe" === o.type || o.source.match(/\.(html|php)$/)) && n(o.source, i.options.width || 800, i.options.height || 600)
            })
        }
    }), i.lightbox.create = function(t, e) {
        if (t) {
            var o, n = [];
            return t.forEach(function(t) {
                n.push(i.$.extend({
                    source: "",
                    title: "",
                    type: "auto",
                    link: !1
                }, "string" == typeof t ? {
                    source: t
                } : t))
            }), o = i.lightbox(i.$.extend({}, e, {
                group: n
            }))
        }
    }, i.lightbox
});
/*! NOTIFY UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
! function(t) {
    var e;
    window.UIkit && (e = t(UIkit)), "function" == typeof define && define.amd && define("uikit-notify", ["uikit"], function() {
        return e || t(UIkit)
    })
}(function(t) {
    "use strict";
    var e = {},
        i = {},
        s = function(e) {
            return "string" == t.$.type(e) && (e = {
                message: e
            }), arguments[1] && (e = t.$.extend(e, "string" == t.$.type(arguments[1]) ? {
                status: arguments[1]
            } : arguments[1])), new n(e).show()
        },
        o = function(t, e) {
            var s;
            if (t)
                for (s in i) t === i[s].group && i[s].close(e);
            else
                for (s in i) i[s].close(e)
        },
        n = function(s) {
            this.options = t.$.extend({}, n.defaults, s), this.uuid = t.Utils.uid("notifymsg"), this.element = t.$(['<div class="uk-notify-message">', '<a class="uk-close"></a>', "<div></div>", "</div>"].join("")).data("notifyMessage", this), this.content(this.options.message), this.options.status && (this.element.addClass("uk-notify-message-" + this.options.status), this.currentstatus = this.options.status), this.group = this.options.group, i[this.uuid] = this, e[this.options.pos] || (e[this.options.pos] = t.$('<div class="uk-notify uk-notify-' + this.options.pos + '"></div>').appendTo("body").on("click", ".uk-notify-message", function() {
                var e = t.$(this).data("notifyMessage");
                e.element.trigger("manualclose.uk.notify", [e]), e.close()
            }))
        };
    return t.$.extend(n.prototype, {
        uuid: !1,
        element: !1,
        timout: !1,
        currentstatus: "",
        group: !1,
        show: function() {
            if (!this.element.is(":visible")) {
                var t = this;
                e[this.options.pos].show().prepend(this.element);
                var i = parseInt(this.element.css("margin-bottom"), 10);
                return this.element.css({
                    opacity: 0,
                    marginTop: -1 * this.element.outerHeight(),
                    marginBottom: 0
                }).animate({
                    opacity: 1,
                    marginTop: 0,
                    marginBottom: i
                }, function() {
                    if (t.options.timeout) {
                        var e = function() {
                            t.close()
                        };
                        t.timeout = setTimeout(e, t.options.timeout), t.element.hover(function() {
                            clearTimeout(t.timeout)
                        }, function() {
                            t.timeout = setTimeout(e, t.options.timeout)
                        })
                    }
                }), this
            }
        },
        close: function(t) {
            var s = this,
                o = function() {
                    s.element.remove(), e[s.options.pos].children().length || e[s.options.pos].hide(), s.options.onClose.apply(s, []), s.element.trigger("close.uk.notify", [s]), delete i[s.uuid]
                };
            this.timeout && clearTimeout(this.timeout), t ? o() : this.element.animate({
                opacity: 0,
                marginTop: -1 * this.element.outerHeight(),
                marginBottom: 0
            }, function() {
                o()
            })
        },
        content: function(t) {
            var e = this.element.find(">div");
            return t ? (e.html(t), this) : e.html()
        },
        status: function(t) {
            return t ? (this.element.removeClass("uk-notify-message-" + this.currentstatus).addClass("uk-notify-message-" + t), this.currentstatus = t, this) : this.currentstatus
        }
    }), n.defaults = {
        message: "",
        status: "",
        timeout: 5e3,
        group: null,
        pos: "top-center",
        onClose: function() {}
    }, t.notify = s, t.notify.message = n, t.notify.closeAll = o, s
});

function toggle(obj) {
    var el = document.getElementById(obj);
    if (el.style.display != 'none') {
        el.style.display = 'none'
    } else {
        el.style.display = ''
    }
}
$(function() {
    $("#helpButton").on("click", function(e) {
        $("#helpButton").addClass("open");
        e.stopPropagation()
    });
    $(document).on("click", function(e) {
        if ($(e.target).is("#helpButton") === !1) {
            $("#helpButton").removeClass("open")
        }
    })
});
$(document).ready(function() {
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=graphhopper.com"
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ""
    }

    function checkCookie() {
        var acceptcookies = getCookie("acceptCookies");
        if (acceptcookies != "") {
            $('#cookieNotification').hide()
        } else {
            $('#cookieNotification').css("display", "block")
        }
    }
    checkCookie();
    $('#cookieOk').on("click", function() {
        setCookie("acceptCookies", "yes", 365);
        var cookievalue = getCookie("acceptCookies");
        checkCookie()
    });

    function pkCookie() {
        var $_GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "))
            }
            $_GET[decode(arguments[1])] = decode(arguments[2])
        });
        var pk_cookie = getCookie("pk_source");
        if (pk_cookie != "") {} else {
            if ($_GET.pk_source != "" && $_GET.pk_source != null) {
                var pk_source = $_GET.pk_source;
                console.log('pksource not empty')
            } else {
                var ref = document.referrer;
                if (!document.referrer) {
                    pk_source = "no referrer"
                } else {
                    pk_source = ref
                }
            }
            var pk_keyword = $_GET.pk_keyword;
            var pk_campaign = $_GET.pk_campaign;
            setCookie("pk_source", pk_source, 60);
            setCookie("pk_keyword", pk_keyword, 60);
            setCookie("pk_campaign", pk_campaign, 60)
        }
    }
    pkCookie()
})