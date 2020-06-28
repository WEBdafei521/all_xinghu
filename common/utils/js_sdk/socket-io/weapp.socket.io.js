function t(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function e(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function r(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t, e) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : o(exports)) && "object" == ("undefined" == typeof module ? "undefined" : o(module))) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var r = e();
        for (var n in r) ("object" == ("undefined" == typeof exports ? "undefined" : o(exports)) ? exports : t)[n] = r[n];
    }
}(window, function() {
    return function(t) {
        function e(n) {
            if (r[n]) return r[n].exports;
            var o = r[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
        }
        var r = {};
        return e.m = t, e.c = r, e.d = function(t, r, n) {
            e.o(t, r) || Object.defineProperty(t, r, {
                enumerable: !0,
                get: n
            });
        }, e.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            });
        }, e.t = function(t, r) {
            if (1 & r && (t = e(t)), 8 & r) return t;
            if (4 & r && "object" == (void 0 === t ? "undefined" : o(t)) && t && t.__esModule) return t;
            var n = Object.create(null);
            if (e.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & r && "string" != typeof t) for (var i in t) e.d(n, i, function(e) {
                return t[e];
            }.bind(null, i));
            return n;
        }, e.n = function(t) {
            var r = t && t.__esModule ? function() {
                return t.default;
            } : function() {
                return t;
            };
            return e.d(r, "a", r), r;
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, e.p = "", e(e.s = 24);
    }([ function(t, e) {
        t.exports = function() {
            return function() {};
        };
    }, function(t, e) {
        var r;
        r = function() {
            return this;
        }();
        try {
            r = r || Function("return this")() || (0, eval)("this");
        } catch (t) {
            "object" == ("undefined" == typeof window ? "undefined" : o(window)) && (r = window);
        }
        t.exports = r;
    }, function(t, e) {
        var r = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == r.call(t);
        };
    }, function(t, e, r) {
        function n(t) {
            if (t) return function(t) {
                for (var e in n.prototype) t[e] = n.prototype[e];
                return t;
            }(t);
        }
        t.exports = n, n.prototype.on = n.prototype.addEventListener = function(t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), 
            this;
        }, n.prototype.once = function(t, e) {
            function r() {
                this.off(t, r), e.apply(this, arguments);
            }
            return r.fn = e, this.on(t, r), this;
        }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
            this;
            var r, n = this._callbacks["$" + t];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + t], this;
            for (var o = 0; o < n.length; o++) if ((r = n[o]) === e || r.fn === e) {
                n.splice(o, 1);
                break;
            }
            return this;
        }, n.prototype.emit = function(t) {
            this._callbacks = this._callbacks || {};
            var e = [].slice.call(arguments, 1), r = this._callbacks["$" + t];
            if (r) for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, e);
            return this;
        }, n.prototype.listeners = function(t) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
        }, n.prototype.hasListeners = function(t) {
            return !!this.listeners(t).length;
        };
    }, function(t, e, r) {
        function n() {}
        function o(t) {
            var r = "" + t.type;
            if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (r += t.attachments + "-"), 
            t.nsp && "/" !== t.nsp && (r += t.nsp + ","), null != t.id && (r += t.id), null != t.data) {
                var n = function(t) {
                    try {
                        return JSON.stringify(t);
                    } catch (t) {
                        return !1;
                    }
                }(t.data);
                if (!1 === n) return l;
                r += n;
            }
            return u("encoded %j as %s", t, r), r;
        }
        function i() {
            this.reconstructor = null;
        }
        function s(t) {
            this.reconPack = t, this.buffers = [];
        }
        function a(t) {
            return {
                type: e.ERROR,
                data: "parser error: " + t
            };
        }
        var u = r(0)("socket.io-parser"), c = r(3), f = r(20), h = r(2), p = r(9);
        e.protocol = 4, e.types = [ "CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK" ], 
        e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, 
        e.BINARY_ACK = 6, e.Encoder = n, e.Decoder = i;
        var l = e.ERROR + '"encode error"';
        n.prototype.encode = function(t, r) {
            u("encoding packet %j", t), e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type ? function(t, e) {
                f.removeBlobs(t, function(t) {
                    var r = f.deconstructPacket(t), n = o(r.packet), i = r.buffers;
                    i.unshift(n), e(i);
                });
            }(t, r) : r([ o(t) ]);
        }, c(i.prototype), i.prototype.add = function(t) {
            var r;
            if ("string" == typeof t) r = function(t) {
                var r = 0, n = {
                    type: Number(t.charAt(0))
                };
                if (null == e.types[n.type]) return a("unknown packet type " + n.type);
                if (e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type) {
                    for (var o = ""; "-" !== t.charAt(++r) && (o += t.charAt(r), r != t.length); ) ;
                    if (o != Number(o) || "-" !== t.charAt(r)) throw new Error("Illegal attachments");
                    n.attachments = Number(o);
                }
                if ("/" === t.charAt(r + 1)) for (n.nsp = ""; ++r && "," !== (s = t.charAt(r)) && (n.nsp += s, 
                r !== t.length); ) ; else n.nsp = "/";
                var i = t.charAt(r + 1);
                if ("" !== i && Number(i) == i) {
                    for (n.id = ""; ++r; ) {
                        var s = t.charAt(r);
                        if (null == s || Number(s) != s) {
                            --r;
                            break;
                        }
                        if (n.id += t.charAt(r), r === t.length) break;
                    }
                    n.id = Number(n.id);
                }
                if (t.charAt(++r)) {
                    var c = function(t) {
                        try {
                            return JSON.parse(t);
                        } catch (t) {
                            return !1;
                        }
                    }(t.substr(r));
                    if (!(!1 !== c && (n.type === e.ERROR || h(c)))) return a("invalid payload");
                    n.data = c;
                }
                return u("decoded %s as %j", t, n), n;
            }(t), e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type ? (this.reconstructor = new s(r), 
            0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r)) : this.emit("decoded", r); else {
                if (!p(t) && !t.base64) throw new Error("Unknown type: " + t);
                if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                (r = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", r));
            }
        }, i.prototype.destroy = function() {
            this.reconstructor && this.reconstructor.finishedReconstruction();
        }, s.prototype.takeBinaryData = function(t) {
            if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
                var e = f.reconstructPacket(this.reconPack, this.buffers);
                return this.finishedReconstruction(), e;
            }
            return null;
        }, s.prototype.finishedReconstruction = function() {
            this.reconPack = null, this.buffers = [];
        };
    }, function(t, e) {
        var r = [].slice;
        t.exports = function(t, e) {
            if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
            var n = r.call(arguments, 2);
            return function() {
                return e.apply(t, n.concat(r.call(arguments)));
            };
        };
    }, function(t, e) {
        t.exports = function(t, e, r) {
            return t.on(e, r), {
                destroy: function() {
                    t.removeListener(e, r);
                }
            };
        };
    }, function(t, e, r) {
        function n(t, e, r) {
            this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], 
            this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, 
            r && r.query && (this.query = r.query), this.io.autoConnect && this.open();
        }
        var i = r(4), s = r(3), a = r(18), u = r(6), c = r(5), f = r(0)("socket.io-client:socket"), h = r(17), p = r(16);
        t.exports = n;
        var l = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        }, d = s.prototype.emit;
        s(n.prototype), n.prototype.subEvents = function() {
            if (!this.subs) {
                var t = this.io;
                this.subs = [ u(t, "open", c(this, "onopen")), u(t, "packet", c(this, "onpacket")), u(t, "close", c(this, "onclose")) ];
            }
        }, n.prototype.open = n.prototype.connect = function() {
            return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), 
            this.emit("connecting"), this);
        }, n.prototype.send = function() {
            var t = a(arguments);
            return t.unshift("message"), this.emit.apply(this, t), this;
        }, n.prototype.emit = function(t) {
            if (l.hasOwnProperty(t)) return d.apply(this, arguments), this;
            var e = a(arguments), r = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : p(e)) ? i.BINARY_EVENT : i.EVENT,
                data: e,
                options: {}
            };
            return r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (f("emitting packet with ack id %d", this.ids), 
            this.acks[this.ids] = e.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), 
            this.flags = {}, this;
        }, n.prototype.packet = function(t) {
            t.nsp = this.nsp, this.io.packet(t);
        }, n.prototype.onopen = function() {
            if (f("transport is open - connecting"), "/" !== this.nsp) if (this.query) {
                var t = "object" == o(this.query) ? h.encode(this.query) : this.query;
                f("sending connect packet with query %s", t), this.packet({
                    type: i.CONNECT,
                    query: t
                });
            } else this.packet({
                type: i.CONNECT
            });
        }, n.prototype.onclose = function(t) {
            f("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, 
            this.emit("disconnect", t);
        }, n.prototype.onpacket = function(t) {
            var e = t.nsp === this.nsp, r = t.type === i.ERROR && "/" === t.nsp;
            if (e || r) switch (t.type) {
              case i.CONNECT:
                this.onconnect();
                break;

              case i.EVENT:
              case i.BINARY_EVENT:
                this.onevent(t);
                break;

              case i.ACK:
              case i.BINARY_ACK:
                this.onack(t);
                break;

              case i.DISCONNECT:
                this.ondisconnect();
                break;

              case i.ERROR:
                this.emit("error", t.data);
            }
        }, n.prototype.onevent = function(t) {
            var e = t.data || [];
            f("emitting event %j", e), null != t.id && (f("attaching ack callback to event"), 
            e.push(this.ack(t.id))), this.connected ? d.apply(this, e) : this.receiveBuffer.push(e);
        }, n.prototype.ack = function(t) {
            var e = this, r = !1;
            return function() {
                if (!r) {
                    r = !0;
                    var n = a(arguments);
                    f("sending ack %j", n), e.packet({
                        type: p(n) ? i.BINARY_ACK : i.ACK,
                        id: t,
                        data: n
                    });
                }
            };
        }, n.prototype.onack = function(t) {
            var e = this.acks[t.id];
            "function" == typeof e ? (f("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), 
            delete this.acks[t.id]) : f("bad ack %s", t.id);
        }, n.prototype.onconnect = function() {
            this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();
        }, n.prototype.emitBuffered = function() {
            var t;
            for (t = 0; t < this.receiveBuffer.length; t++) d.apply(this, this.receiveBuffer[t]);
            for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
            this.sendBuffer = [];
        }, n.prototype.ondisconnect = function() {
            f("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
        }, n.prototype.destroy = function() {
            if (this.subs) {
                for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                this.subs = null;
            }
            this.io.destroy(this);
        }, n.prototype.close = n.prototype.disconnect = function() {
            return this.connected && (f("performing disconnect (%s)", this.nsp), this.packet({
                type: i.DISCONNECT
            })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
        }, n.prototype.compress = function(t) {
            return this.flags.compress = t, this;
        }, n.prototype.binary = function(t) {
            return this.flags.binary = t, this;
        };
    }, function(t, e, r) {
        function n(t, e) {
            if (!(this instanceof n)) return new n(t, e);
            t && "object" == (void 0 === t ? "undefined" : o(t)) && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", 
            this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(!1 !== e.reconnection), 
            this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), 
            this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), 
            this.backoff = new l({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", 
            this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
            var r = e.parser || u;
            this.encoder = new r.Encoder(), this.decoder = new r.Decoder(), this.autoConnect = !1 !== e.autoConnect, 
            this.autoConnect && this.open();
        }
        var i = r(19), s = r(7), a = r(3), u = r(4), c = r(6), f = r(5), h = r(0)("socket.io-client:manager"), p = r(11), l = r(10), d = Object.prototype.hasOwnProperty;
        t.exports = n, n.prototype.emitAll = function() {
            for (var t in this.emit.apply(this, arguments), this.nsps) d.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);
        }, n.prototype.updateSocketIds = function() {
            for (var t in this.nsps) d.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));
        }, n.prototype.generateId = function(t) {
            return ("/" === t ? "" : t + "#") + this.engine.id;
        }, a(n.prototype), n.prototype.reconnection = function(t) {
            return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
        }, n.prototype.reconnectionAttempts = function(t) {
            return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts;
        }, n.prototype.reconnectionDelay = function(t) {
            return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), 
            this) : this._reconnectionDelay;
        }, n.prototype.randomizationFactor = function(t) {
            return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), 
            this) : this._randomizationFactor;
        }, n.prototype.reconnectionDelayMax = function(t) {
            return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), 
            this) : this._reconnectionDelayMax;
        }, n.prototype.timeout = function(t) {
            return arguments.length ? (this._timeout = t, this) : this._timeout;
        }, n.prototype.maybeReconnectOnOpen = function() {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
        }, n.prototype.open = n.prototype.connect = function(t, e) {
            if (h("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
            h("opening %s", this.uri), this.engine = i(this.uri, this.opts);
            var r = this.engine, n = this;
            this.readyState = "opening", this.skipReconnect = !1;
            var o = c(r, "open", function() {
                n.onopen(), t && t();
            }), s = c(r, "error", function(e) {
                if (h("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", e), 
                t) {
                    var r = new Error("Connection error");
                    r.data = e, t(r);
                } else n.maybeReconnectOnOpen();
            });
            if (!1 !== this._timeout) {
                var a = this._timeout;
                h("connect attempt will timeout after %d", a);
                var u = setTimeout(function() {
                    h("connect attempt timed out after %d", a), o.destroy(), r.close(), r.emit("error", "timeout"), 
                    n.emitAll("connect_timeout", a);
                }, a);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(u);
                    }
                });
            }
            return this.subs.push(o), this.subs.push(s), this;
        }, n.prototype.onopen = function() {
            h("open"), this.cleanup(), this.readyState = "open", this.emit("open");
            var t = this.engine;
            this.subs.push(c(t, "data", f(this, "ondata"))), this.subs.push(c(t, "ping", f(this, "onping"))), 
            this.subs.push(c(t, "pong", f(this, "onpong"))), this.subs.push(c(t, "error", f(this, "onerror"))), 
            this.subs.push(c(t, "close", f(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", f(this, "ondecoded")));
        }, n.prototype.onping = function() {
            this.lastPing = new Date(), this.emitAll("ping");
        }, n.prototype.onpong = function() {
            this.emitAll("pong", new Date() - this.lastPing);
        }, n.prototype.ondata = function(t) {
            this.decoder.add(t);
        }, n.prototype.ondecoded = function(t) {
            this.emit("packet", t);
        }, n.prototype.onerror = function(t) {
            h("error", t), this.emitAll("error", t);
        }, n.prototype.socket = function(t, e) {
            function r() {
                ~p(o.connecting, n) || o.connecting.push(n);
            }
            var n = this.nsps[t];
            if (!n) {
                n = new s(this, t, e), this.nsps[t] = n;
                var o = this;
                n.on("connecting", r), n.on("connect", function() {
                    n.id = o.generateId(t);
                }), this.autoConnect && r();
            }
            return n;
        }, n.prototype.destroy = function(t) {
            var e = p(this.connecting, t);
            ~e && this.connecting.splice(e, 1), this.connecting.length || this.close();
        }, n.prototype.packet = function(t) {
            h("writing packet %j", t);
            var e = this;
            t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, 
            this.encoder.encode(t, function(r) {
                for (var n = 0; n < r.length; n++) e.engine.write(r[n], t.options);
                e.encoding = !1, e.processPacketQueue();
            }));
        }, n.prototype.processPacketQueue = function() {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var t = this.packetBuffer.shift();
                this.packet(t);
            }
        }, n.prototype.cleanup = function() {
            h("cleanup");
            for (var t = this.subs.length, e = 0; e < t; e++) this.subs.shift().destroy();
            this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();
        }, n.prototype.close = n.prototype.disconnect = function() {
            h("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), 
            this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
        }, n.prototype.onclose = function(t) {
            h("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", 
            this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect();
        }, n.prototype.reconnect = function() {
            if (this.reconnecting || this.skipReconnect) return this;
            var t = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) h("reconnect failed"), 
            this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
                var e = this.backoff.duration();
                h("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
                var r = setTimeout(function() {
                    t.skipReconnect || (h("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), 
                    t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function(e) {
                        e ? (h("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (h("reconnect success"), 
                        t.onreconnect());
                    }));
                }, e);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(r);
                    }
                });
            }
        }, n.prototype.onreconnect = function() {
            var t = this.backoff.attempts;
            this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t);
        };
    }, function(t, e, r) {
        (function(e) {
            t.exports = function(t) {
                return r && e.Buffer.isBuffer(t) || n && (t instanceof e.ArrayBuffer || o(t));
            };
            var r = "function" == typeof e.Buffer && "function" == typeof e.Buffer.isBuffer, n = "function" == typeof e.ArrayBuffer, o = n && "function" == typeof e.ArrayBuffer.isView ? e.ArrayBuffer.isView : function(t) {
                return t.buffer instanceof e.ArrayBuffer;
            };
        }).call(this, r(1));
    }, function(t, e) {
        function r(t) {
            t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, 
            this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
        }
        t.exports = r, r.prototype.duration = function() {
            var t = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var e = Math.random(), r = Math.floor(e * this.jitter * t);
                t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r;
            }
            return 0 | Math.min(t, this.max);
        }, r.prototype.reset = function() {
            this.attempts = 0;
        }, r.prototype.setMin = function(t) {
            this.ms = t;
        }, r.prototype.setMax = function(t) {
            this.max = t;
        }, r.prototype.setJitter = function(t) {
            this.jitter = t;
        };
    }, function(t, e) {
        var r = [].indexOf;
        t.exports = function(t, e) {
            if (r) return t.indexOf(e);
            for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
            return -1;
        };
    }, function(t, e) {
        var r = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == r.call(t);
        };
    }, function(t, e) {
        e.read = function(t, e, r, n, o) {
            var i, s, a = 8 * o - n - 1, u = (1 << a) - 1, c = u >> 1, f = -7, h = r ? o - 1 : 0, p = r ? -1 : 1, l = t[e + h];
            for (h += p, i = l & (1 << -f) - 1, l >>= -f, f += a; f > 0; i = 256 * i + t[e + h], 
            h += p, f -= 8) ;
            for (s = i & (1 << -f) - 1, i >>= -f, f += n; f > 0; s = 256 * s + t[e + h], h += p, 
            f -= 8) ;
            if (0 === i) i = 1 - c; else {
                if (i === u) return s ? NaN : 1 / 0 * (l ? -1 : 1);
                s += Math.pow(2, n), i -= c;
            }
            return (l ? -1 : 1) * s * Math.pow(2, i - n);
        }, e.write = function(t, e, r, n, o, i) {
            var s, a, u, c = 8 * i - o - 1, f = (1 << c) - 1, h = f >> 1, p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : i - 1, d = n ? 1 : -1, y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = f) : (s = Math.floor(Math.log(e) / Math.LN2), 
            e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (e += s + h >= 1 ? p / u : p * Math.pow(2, 1 - h)) * u >= 2 && (s++, 
            u /= 2), s + h >= f ? (a = 0, s = f) : s + h >= 1 ? (a = (e * u - 1) * Math.pow(2, o), 
            s += h) : (a = e * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); o >= 8; t[r + l] = 255 & a, 
            l += d, a /= 256, o -= 8) ;
            for (s = s << o | a, c += o; c > 0; t[r + l] = 255 & s, l += d, s /= 256, c -= 8) ;
            t[r + l - d] |= 128 * y;
        };
    }, function(t, e, r) {
        function n(t) {
            var e = t.length;
            if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var r = t.indexOf("=");
            return -1 === r && (r = e), [ r, r === e ? 0 : 4 - r % 4 ];
        }
        function o(t, e, r) {
            for (var n, o, s = [], a = e; a < r; a += 3) n = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), 
            s.push(i[(o = n) >> 18 & 63] + i[o >> 12 & 63] + i[o >> 6 & 63] + i[63 & o]);
            return s.join("");
        }
        e.byteLength = function(t) {
            var e = n(t), r = e[0], o = e[1];
            return 3 * (r + o) / 4 - o;
        }, e.toByteArray = function(t) {
            for (var e, r = n(t), o = r[0], i = r[1], u = new a(function(t, e, r) {
                return 3 * (o + r) / 4 - r;
            }(0, 0, i)), c = 0, f = i > 0 ? o - 4 : o, h = 0; h < f; h += 4) e = s[t.charCodeAt(h)] << 18 | s[t.charCodeAt(h + 1)] << 12 | s[t.charCodeAt(h + 2)] << 6 | s[t.charCodeAt(h + 3)], 
            u[c++] = e >> 16 & 255, u[c++] = e >> 8 & 255, u[c++] = 255 & e;
            return 2 === i && (e = s[t.charCodeAt(h)] << 2 | s[t.charCodeAt(h + 1)] >> 4, u[c++] = 255 & e), 
            1 === i && (e = s[t.charCodeAt(h)] << 10 | s[t.charCodeAt(h + 1)] << 4 | s[t.charCodeAt(h + 2)] >> 2, 
            u[c++] = e >> 8 & 255, u[c++] = 255 & e), u;
        }, e.fromByteArray = function(t) {
            for (var e, r = t.length, n = r % 3, s = [], a = 0, u = r - n; a < u; a += 16383) s.push(o(t, a, a + 16383 > u ? u : a + 16383));
            return 1 === n ? (e = t[r - 1], s.push(i[e >> 2] + i[e << 4 & 63] + "==")) : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], 
            s.push(i[e >> 10] + i[e >> 4 & 63] + i[e << 2 & 63] + "=")), s.join("");
        };
        for (var i = [], s = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, f = u.length; c < f; ++c) i[c] = u[c], 
        s[u.charCodeAt(c)] = c;
        s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63;
    }, function(t, e, r) {
        (function(t) {
            function n() {
                return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function o(t, e) {
                if (n() < e) throw new RangeError("Invalid typed array length");
                return i.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = i.prototype : (null === t && (t = new i(e)), 
                t.length = e), t;
            }
            function i(t, e, r) {
                if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(t, e, r);
                if ("number" == typeof t) {
                    if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                    return u(this, t);
                }
                return s(this, t, e, r);
            }
            function s(t, e, r, n) {
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, n) {
                    if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                    return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n), 
                    i.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = i.prototype : t = c(t, e), t;
                }(t, e, r, n) : "string" == typeof e ? function(t, e, r) {
                    if ("string" == typeof r && "" !== r || (r = "utf8"), !i.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                    var n = 0 | h(e, r), s = (t = o(t, n)).write(e, r);
                    return s !== n && (t = t.slice(0, s)), t;
                }(t, e, r) : function(t, e) {
                    if (i.isBuffer(e)) {
                        var r = 0 | f(e.length);
                        return 0 === (t = o(t, r)).length ? t : (e.copy(t, 0, 0, r), t);
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (n = e.length) != n ? o(t, 0) : c(t, e);
                        if ("Buffer" === e.type && D(e.data)) return c(t, e.data);
                    }
                    var n;
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                }(t, e);
            }
            function a(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                if (t < 0) throw new RangeError('"size" argument must not be negative');
            }
            function u(t, e) {
                if (a(e), t = o(t, e < 0 ? 0 : 0 | f(e)), !i.TYPED_ARRAY_SUPPORT) for (var r = 0; r < e; ++r) t[r] = 0;
                return t;
            }
            function c(t, e) {
                var r = e.length < 0 ? 0 : 0 | f(e.length);
                t = o(t, r);
                for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
                return t;
            }
            function f(t) {
                if (t >= n()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n().toString(16) + " bytes");
                return 0 | t;
            }
            function h(t, e) {
                if (i.isBuffer(t)) return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var r = t.length;
                if (0 === r) return 0;
                for (var n = !1; ;) switch (e) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return r;

                  case "utf8":
                  case "utf-8":
                  case void 0:
                    return I(t).length;

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * r;

                  case "hex":
                    return r >>> 1;

                  case "base64":
                    return N(t).length;

                  default:
                    if (n) return I(t).length;
                    e = ("" + e).toLowerCase(), n = !0;
                }
            }
            function p(t, e, r) {
                var n = t[e];
                t[e] = t[r], t[r] = n;
            }
            function l(t, e, r, n, o) {
                if (0 === t.length) return -1;
                if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), 
                r = +r, isNaN(r) && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                    if (o) return -1;
                    r = t.length - 1;
                } else if (r < 0) {
                    if (!o) return -1;
                    r = 0;
                }
                if ("string" == typeof e && (e = i.from(e, n)), i.isBuffer(e)) return 0 === e.length ? -1 : d(t, e, r, n, o);
                if ("number" == typeof e) return e &= 255, i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : d(t, [ e ], r, n, o);
                throw new TypeError("val must be string, number or Buffer");
            }
            function d(t, e, r, n, o) {
                function i(t, e) {
                    return 1 === a ? t[e] : t.readUInt16BE(e * a);
                }
                var s, a = 1, u = t.length, c = e.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (t.length < 2 || e.length < 2) return -1;
                    a = 2, u /= 2, c /= 2, r /= 2;
                }
                if (o) {
                    var f = -1;
                    for (s = r; s < u; s++) if (i(t, s) === i(e, -1 === f ? 0 : s - f)) {
                        if (-1 === f && (f = s), s - f + 1 === c) return f * a;
                    } else -1 !== f && (s -= s - f), f = -1;
                } else for (r + c > u && (r = u - c), s = r; s >= 0; s--) {
                    for (var h = !0, p = 0; p < c; p++) if (i(t, s + p) !== i(e, p)) {
                        h = !1;
                        break;
                    }
                    if (h) return s;
                }
                return -1;
            }
            function y(t, e, r, n) {
                r = Number(r) || 0;
                var o = t.length - r;
                n ? (n = Number(n)) > o && (n = o) : n = o;
                var i = e.length;
                if (i % 2 != 0) throw new TypeError("Invalid hex string");
                n > i / 2 && (n = i / 2);
                for (var s = 0; s < n; ++s) {
                    var a = parseInt(e.substr(2 * s, 2), 16);
                    if (isNaN(a)) return s;
                    t[r + s] = a;
                }
                return s;
            }
            function g(t, e, r, n) {
                return M(I(e, t.length - r), t, r, n);
            }
            function v(t, e, r, n) {
                return M(function(t) {
                    for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                    return e;
                }(e), t, r, n);
            }
            function b(t, e, r, n) {
                return v(t, e, r, n);
            }
            function m(t, e, r, n) {
                return M(N(e), t, r, n);
            }
            function w(t, e, r, n) {
                return M(function(t, e) {
                    for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) n = (r = t.charCodeAt(s)) >> 8, 
                    o = r % 256, i.push(o), i.push(n);
                    return i;
                }(e, t.length - r), t, r, n);
            }
            function A(t, e, r) {
                return 0 === e && r === t.length ? j.fromByteArray(t) : j.fromByteArray(t.slice(e, r));
            }
            function _(t, e, r) {
                r = Math.min(t.length, r);
                for (var n = [], o = e; o < r; ) {
                    var i, s, a, u, c = t[o], f = null, h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                    if (o + h <= r) switch (h) {
                      case 1:
                        c < 128 && (f = c);
                        break;

                      case 2:
                        128 == (192 & (i = t[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (f = u);
                        break;

                      case 3:
                        i = t[o + 1], s = t[o + 2], 128 == (192 & i) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (f = u);
                        break;

                      case 4:
                        i = t[o + 1], s = t[o + 2], a = t[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (f = u);
                    }
                    null === f ? (f = 65533, h = 1) : f > 65535 && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), 
                    f = 56320 | 1023 & f), n.push(f), o += h;
                }
                return function(t) {
                    var e = t.length;
                    if (e <= q) return String.fromCharCode.apply(String, t);
                    for (var r = "", n = 0; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, n += q));
                    return r;
                }(n);
            }
            function E(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);
                for (var o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
                return n;
            }
            function k(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);
                for (var o = e; o < r; ++o) n += String.fromCharCode(t[o]);
                return n;
            }
            function B(t, e, r) {
                var n = t.length;
                (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
                for (var o = "", i = e; i < r; ++i) o += L(t[i]);
                return o;
            }
            function R(t, e, r) {
                for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return o;
            }
            function P(t, e, r) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
            }
            function S(t, e, r, n, o, s) {
                if (!i.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > o || e < s) throw new RangeError('"value" argument is out of bounds');
                if (r + n > t.length) throw new RangeError("Index out of range");
            }
            function T(t, e, r, n) {
                e < 0 && (e = 65535 + e + 1);
                for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o) t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o);
            }
            function O(t, e, r, n) {
                e < 0 && (e = 4294967295 + e + 1);
                for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o) t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255;
            }
            function x(t, e, r, n, o, i) {
                if (r + n > t.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range");
            }
            function C(t, e, r, n, o) {
                return o || x(t, 0, r, 4), Y.write(t, e, r, n, 23, 4), r + 4;
            }
            function U(t, e, r, n, o) {
                return o || x(t, 0, r, 8), Y.write(t, e, r, n, 52, 8), r + 8;
            }
            function L(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16);
            }
            function I(t, e) {
                var r;
                e = e || 1 / 0;
                for (var n = t.length, o = null, i = [], s = 0; s < n; ++s) {
                    if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                        if (!o) {
                            if (r > 56319) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue;
                            }
                            if (s + 1 === n) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue;
                            }
                            o = r;
                            continue;
                        }
                        if (r < 56320) {
                            (e -= 3) > -1 && i.push(239, 191, 189), o = r;
                            continue;
                        }
                        r = 65536 + (o - 55296 << 10 | r - 56320);
                    } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                    if (o = null, r < 128) {
                        if ((e -= 1) < 0) break;
                        i.push(r);
                    } else if (r < 2048) {
                        if ((e -= 2) < 0) break;
                        i.push(r >> 6 | 192, 63 & r | 128);
                    } else if (r < 65536) {
                        if ((e -= 3) < 0) break;
                        i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((e -= 4) < 0) break;
                        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
                    }
                }
                return i;
            }
            function N(t) {
                return j.toByteArray(function(t) {
                    if ((t = function(t) {
                        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
                    }(t).replace(F, "")).length < 2) return "";
                    for (;t.length % 4 != 0; ) t += "=";
                    return t;
                }(t));
            }
            function M(t, e, r, n) {
                for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) e[o + r] = t[o];
                return o;
            }
            var j = r(14), Y = r(13), D = r(12);
            e.Buffer = i, e.SlowBuffer = function(t) {
                return +t != t && (t = 0), i.alloc(+t);
            }, e.INSPECT_MAX_BYTES = 50, i.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42;
                        }
                    }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
                } catch (t) {
                    return !1;
                }
            }(), e.kMaxLength = n(), i.poolSize = 8192, i._augment = function(t) {
                return t.__proto__ = i.prototype, t;
            }, i.from = function(t, e, r) {
                return s(null, t, e, r);
            }, i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, 
            "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
                value: null,
                configurable: !0
            })), i.alloc = function(t, e, r) {
                return function(t, e, r, n) {
                    return a(e), e <= 0 ? o(t, e) : void 0 !== r ? "string" == typeof n ? o(t, e).fill(r, n) : o(t, e).fill(r) : o(t, e);
                }(null, t, e, r);
            }, i.allocUnsafe = function(t) {
                return u(null, t);
            }, i.allocUnsafeSlow = function(t) {
                return u(null, t);
            }, i.isBuffer = function(t) {
                return !(null == t || !t._isBuffer);
            }, i.compare = function(t, e) {
                if (!i.isBuffer(t) || !i.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;
                for (var r = t.length, n = e.length, o = 0, s = Math.min(r, n); o < s; ++o) if (t[o] !== e[o]) {
                    r = t[o], n = e[o];
                    break;
                }
                return r < n ? -1 : n < r ? 1 : 0;
            }, i.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;

                  default:
                    return !1;
                }
            }, i.concat = function(t, e) {
                if (!D(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return i.alloc(0);
                var r;
                if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
                var n = i.allocUnsafe(e), o = 0;
                for (r = 0; r < t.length; ++r) {
                    var s = t[r];
                    if (!i.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                    s.copy(n, o), o += s.length;
                }
                return n;
            }, i.byteLength = h, i.prototype._isBuffer = !0, i.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var e = 0; e < t; e += 2) p(this, e, e + 1);
                return this;
            }, i.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var e = 0; e < t; e += 4) p(this, e, e + 3), p(this, e + 1, e + 2);
                return this;
            }, i.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var e = 0; e < t; e += 8) p(this, e, e + 7), p(this, e + 1, e + 6), p(this, e + 2, e + 5), 
                p(this, e + 3, e + 4);
                return this;
            }, i.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? _(this, 0, t) : function(t, e, r) {
                    var n = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8"); ;) switch (t) {
                      case "hex":
                        return B(this, e, r);

                      case "utf8":
                      case "utf-8":
                        return _(this, e, r);

                      case "ascii":
                        return E(this, e, r);

                      case "latin1":
                      case "binary":
                        return k(this, e, r);

                      case "base64":
                        return A(this, e, r);

                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return R(this, e, r);

                      default:
                        if (n) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), n = !0;
                    }
                }.apply(this, arguments);
            }, i.prototype.equals = function(t) {
                if (!i.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === i.compare(this, t);
            }, i.prototype.inspect = function() {
                var t = "", r = e.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), 
                this.length > r && (t += " ... ")), "<Buffer " + t + ">";
            }, i.prototype.compare = function(t, e, r, n, o) {
                if (!i.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), 
                void 0 === o && (o = this.length), e < 0 || r > t.length || n < 0 || o > this.length) throw new RangeError("out of range index");
                if (n >= o && e >= r) return 0;
                if (n >= o) return -1;
                if (e >= r) return 1;
                if (e >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === t) return 0;
                for (var s = o - n, a = r - e, u = Math.min(s, a), c = this.slice(n, o), f = t.slice(e, r), h = 0; h < u; ++h) if (c[h] !== f[h]) {
                    s = c[h], a = f[h];
                    break;
                }
                return s < a ? -1 : a < s ? 1 : 0;
            }, i.prototype.includes = function(t, e, r) {
                return -1 !== this.indexOf(t, e, r);
            }, i.prototype.indexOf = function(t, e, r) {
                return l(this, t, e, r, !0);
            }, i.prototype.lastIndexOf = function(t, e, r) {
                return l(this, t, e, r, !1);
            }, i.prototype.write = function(t, e, r, n) {
                if (void 0 === e) n = "utf8", r = this.length, e = 0; else if (void 0 === r && "string" == typeof e) n = e, 
                r = this.length, e = 0; else {
                    if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
                }
                var o = this.length - e;
                if ((void 0 === r || r > o) && (r = o), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var i = !1; ;) switch (n) {
                  case "hex":
                    return y(this, t, e, r);

                  case "utf8":
                  case "utf-8":
                    return g(this, t, e, r);

                  case "ascii":
                    return v(this, t, e, r);

                  case "latin1":
                  case "binary":
                    return b(this, t, e, r);

                  case "base64":
                    return m(this, t, e, r);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return w(this, t, e, r);

                  default:
                    if (i) throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(), i = !0;
                }
            }, i.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            var q = 4096;
            i.prototype.slice = function(t, e) {
                var r, n = this.length;
                if (t = ~~t, e = void 0 === e ? n : ~~e, t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), 
                e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t), i.TYPED_ARRAY_SUPPORT) (r = this.subarray(t, e)).__proto__ = i.prototype; else {
                    var o = e - t;
                    r = new i(o, void 0);
                    for (var s = 0; s < o; ++s) r[s] = this[s + t];
                }
                return r;
            }, i.prototype.readUIntLE = function(t, e, r) {
                t |= 0, e |= 0, r || P(t, e, this.length);
                for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); ) n += this[t + i] * o;
                return n;
            }, i.prototype.readUIntBE = function(t, e, r) {
                t |= 0, e |= 0, r || P(t, e, this.length);
                for (var n = this[t + --e], o = 1; e > 0 && (o *= 256); ) n += this[t + --e] * o;
                return n;
            }, i.prototype.readUInt8 = function(t, e) {
                return e || P(t, 1, this.length), this[t];
            }, i.prototype.readUInt16LE = function(t, e) {
                return e || P(t, 2, this.length), this[t] | this[t + 1] << 8;
            }, i.prototype.readUInt16BE = function(t, e) {
                return e || P(t, 2, this.length), this[t] << 8 | this[t + 1];
            }, i.prototype.readUInt32LE = function(t, e) {
                return e || P(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
            }, i.prototype.readUInt32BE = function(t, e) {
                return e || P(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
            }, i.prototype.readIntLE = function(t, e, r) {
                t |= 0, e |= 0, r || P(t, e, this.length);
                for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); ) n += this[t + i] * o;
                return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)), n;
            }, i.prototype.readIntBE = function(t, e, r) {
                t |= 0, e |= 0, r || P(t, e, this.length);
                for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256); ) i += this[t + --n] * o;
                return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
            }, i.prototype.readInt8 = function(t, e) {
                return e || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
            }, i.prototype.readInt16LE = function(t, e) {
                e || P(t, 2, this.length);
                var r = this[t] | this[t + 1] << 8;
                return 32768 & r ? 4294901760 | r : r;
            }, i.prototype.readInt16BE = function(t, e) {
                e || P(t, 2, this.length);
                var r = this[t + 1] | this[t] << 8;
                return 32768 & r ? 4294901760 | r : r;
            }, i.prototype.readInt32LE = function(t, e) {
                return e || P(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
            }, i.prototype.readInt32BE = function(t, e) {
                return e || P(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
            }, i.prototype.readFloatLE = function(t, e) {
                return e || P(t, 4, this.length), Y.read(this, t, !0, 23, 4);
            }, i.prototype.readFloatBE = function(t, e) {
                return e || P(t, 4, this.length), Y.read(this, t, !1, 23, 4);
            }, i.prototype.readDoubleLE = function(t, e) {
                return e || P(t, 8, this.length), Y.read(this, t, !0, 52, 8);
            }, i.prototype.readDoubleBE = function(t, e) {
                return e || P(t, 8, this.length), Y.read(this, t, !1, 52, 8);
            }, i.prototype.writeUIntLE = function(t, e, r, n) {
                t = +t, e |= 0, r |= 0, n || S(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var o = 1, i = 0;
                for (this[e] = 255 & t; ++i < r && (o *= 256); ) this[e + i] = t / o & 255;
                return e + r;
            }, i.prototype.writeUIntBE = function(t, e, r, n) {
                t = +t, e |= 0, r |= 0, n || S(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var o = r - 1, i = 1;
                for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); ) this[e + o] = t / i & 255;
                return e + r;
            }, i.prototype.writeUInt8 = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 
                this[e] = 255 & t, e + 1;
            }, i.prototype.writeUInt16LE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, 
                this[e + 1] = t >>> 8) : T(this, t, e, !0), e + 2;
            }, i.prototype.writeUInt16BE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, 
                this[e + 1] = 255 & t) : T(this, t, e, !1), e + 2;
            }, i.prototype.writeUInt32LE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, 
                this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : O(this, t, e, !0), 
                e + 4;
            }, i.prototype.writeUInt32BE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, 
                this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), 
                e + 4;
            }, i.prototype.writeIntLE = function(t, e, r, n) {
                if (t = +t, e |= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    S(this, t, e, r, o - 1, -o);
                }
                var i = 0, s = 1, a = 0;
                for (this[e] = 255 & t; ++i < r && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1), 
                this[e + i] = (t / s >> 0) - a & 255;
                return e + r;
            }, i.prototype.writeIntBE = function(t, e, r, n) {
                if (t = +t, e |= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    S(this, t, e, r, o - 1, -o);
                }
                var i = r - 1, s = 1, a = 0;
                for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1), 
                this[e + i] = (t / s >> 0) - a & 255;
                return e + r;
            }, i.prototype.writeInt8 = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 
                t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
            }, i.prototype.writeInt16LE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, 
                this[e + 1] = t >>> 8) : T(this, t, e, !0), e + 2;
            }, i.prototype.writeInt16BE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, 
                this[e + 1] = 255 & t) : T(this, t, e, !1), e + 2;
            }, i.prototype.writeInt32LE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, 
                this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : O(this, t, e, !0), 
                e + 4;
            }, i.prototype.writeInt32BE = function(t, e, r) {
                return t = +t, e |= 0, r || S(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), 
                i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, 
                this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4;
            }, i.prototype.writeFloatLE = function(t, e, r) {
                return C(this, t, e, !0, r);
            }, i.prototype.writeFloatBE = function(t, e, r) {
                return C(this, t, e, !1, r);
            }, i.prototype.writeDoubleLE = function(t, e, r) {
                return U(this, t, e, !0, r);
            }, i.prototype.writeDoubleBE = function(t, e, r) {
                return U(this, t, e, !1, r);
            }, i.prototype.copy = function(t, e, r, n) {
                if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), 
                e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
                var o, s = n - r;
                if (this === t && r < e && e < n) for (o = s - 1; o >= 0; --o) t[o + e] = this[o + r]; else if (s < 1e3 || !i.TYPED_ARRAY_SUPPORT) for (o = 0; o < s; ++o) t[o + e] = this[o + r]; else Uint8Array.prototype.set.call(t, this.subarray(r, r + s), e);
                return s;
            }, i.prototype.fill = function(t, e, r, n) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, 
                    r = this.length), 1 === t.length) {
                        var o = t.charCodeAt(0);
                        o < 256 && (t = o);
                    }
                    if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !i.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                } else "number" == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
                if (r <= e) return this;
                var s;
                if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t) for (s = e; s < r; ++s) this[s] = t; else {
                    var a = i.isBuffer(t) ? t : I(new i(t, n).toString()), u = a.length;
                    for (s = 0; s < r - e; ++s) this[s + e] = a[s % u];
                }
                return this;
            };
            var F = /[^+\/0-9A-Za-z-_]/g;
        }).call(this, r(1));
    }, function(t, e, r) {
        (function(e) {
            var n = r(2), i = Object.prototype.toString, s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob), a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
            t.exports = function t(r) {
                if (!r || "object" != (void 0 === r ? "undefined" : o(r))) return !1;
                if (n(r)) {
                    for (var i = 0, u = r.length; i < u; i++) if (t(r[i])) return !0;
                    return !1;
                }
                if ("function" == typeof e && e.isBuffer && e.isBuffer(r) || "function" == typeof ArrayBuffer && r instanceof ArrayBuffer || s && r instanceof Blob || a && r instanceof File) return !0;
                if (r.toJSON && "function" == typeof r.toJSON && 1 === arguments.length) return t(r.toJSON(), !0);
                for (var c in r) if (Object.prototype.hasOwnProperty.call(r, c) && t(r[c])) return !0;
                return !1;
            };
        }).call(this, r(15).Buffer);
    }, function(t, e) {
        e.encode = function(t) {
            var e = "";
            for (var r in t) t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
            return e;
        }, e.decode = function(t) {
            for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
                var i = r[n].split("=");
                e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
            }
            return e;
        };
    }, function(t, e) {
        t.exports = function(t, e) {
            for (var r = [], n = (e = e || 0) || 0; n < t.length; n++) r[n - e] = t[n];
            return r;
        };
    }, function(i, s, a) {
        window, i.exports = function(t) {
            function e(n) {
                if (r[n]) return r[n].exports;
                var o = r[n] = {
                    i: n,
                    l: !1,
                    exports: {}
                };
                return t[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
            }
            var r = {};
            return e.m = t, e.c = r, e.d = function(t, r, n) {
                e.o(t, r) || Object.defineProperty(t, r, {
                    enumerable: !0,
                    get: n
                });
            }, e.r = function(t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(t, "__esModule", {
                    value: !0
                });
            }, e.t = function(t, r) {
                if (1 & r && (t = e(t)), 8 & r) return t;
                if (4 & r && "object" == (void 0 === t ? "undefined" : o(t)) && t && t.__esModule) return t;
                var n = Object.create(null);
                if (e.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & r && "string" != typeof t) for (var i in t) e.d(n, i, function(e) {
                    return t[e];
                }.bind(null, i));
                return n;
            }, e.n = function(t) {
                var r = t && t.__esModule ? function() {
                    return t.default;
                } : function() {
                    return t;
                };
                return e.d(r, "a", r), r;
            }, e.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }, e.p = "", e(e.s = 29);
        }([ function(t, e) {
            var r;
            r = function() {
                return this;
            }();
            try {
                r = r || Function("return this")() || (0, eval)("this");
            } catch (t) {
                "object" == ("undefined" == typeof window ? "undefined" : o(window)) && (r = window);
            }
            t.exports = r;
        }, function(t, e, r) {
            (function(t) {
                function n(t, e, r) {
                    for (var n = new Array(t.length), o = u(t.length, r), i = 0; i < t.length; i++) !function(t, r, o) {
                        e(r, function(e, r) {
                            n[t] = r, o(e, n);
                        });
                    }(i, t[i], o);
                }
                var o, i = r(26), s = r(25), a = r(19), u = r(18), c = r(17);
                t && t.ArrayBuffer && (o = r(15));
                var f = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), h = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), p = f || h;
                e.protocol = 3;
                var l = e.packets = {
                    open: 0,
                    close: 1,
                    ping: 2,
                    pong: 3,
                    message: 4,
                    upgrade: 5,
                    noop: 6
                }, d = i(l), y = {
                    type: "error",
                    data: "parser error"
                }, g = r(14);
                e.encodePacket = function(r, n, o, i) {
                    "function" == typeof n && (i = n, n = !1), "function" == typeof o && (i = o, o = null);
                    var s = void 0 === r.data ? void 0 : r.data.buffer || r.data;
                    if (t.ArrayBuffer && s instanceof ArrayBuffer) return function(t, r, n) {
                        if (!r) return e.encodeBase64Packet(t, n);
                        var o = t.data, i = new Uint8Array(o), s = new Uint8Array(1 + o.byteLength);
                        s[0] = l[t.type];
                        for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
                        return n(s.buffer);
                    }(r, n, i);
                    if (g && s instanceof t.Blob) return function(t, r, n) {
                        if (!r) return e.encodeBase64Packet(t, n);
                        if (p) return function(t, r, n) {
                            if (!r) return e.encodeBase64Packet(t, n);
                            var o = new FileReader();
                            return o.onload = function() {
                                t.data = o.result, e.encodePacket(t, r, !0, n);
                            }, o.readAsArrayBuffer(t.data);
                        }(t, r, n);
                        var o = new Uint8Array(1);
                        return o[0] = l[t.type], n(new g([ o.buffer, t.data ]));
                    }(r, n, i);
                    if (s && s.base64) return function(t, r) {
                        return i("b" + e.packets[t.type] + t.data.data);
                    }(r);
                    var a = l[r.type];
                    return void 0 !== r.data && (a += o ? c.encode(String(r.data), {
                        strict: !1
                    }) : String(r.data)), i("" + a);
                }, e.encodeBase64Packet = function(r, n) {
                    var o, i = "b" + e.packets[r.type];
                    if (g && r.data instanceof t.Blob) {
                        var s = new FileReader();
                        return s.onload = function() {
                            var t = s.result.split(",")[1];
                            n(i + t);
                        }, s.readAsDataURL(r.data);
                    }
                    try {
                        o = String.fromCharCode.apply(null, new Uint8Array(r.data));
                    } catch (t) {
                        for (var a = new Uint8Array(r.data), u = new Array(a.length), c = 0; c < a.length; c++) u[c] = a[c];
                        o = String.fromCharCode.apply(null, u);
                    }
                    return i += t.btoa(o), n(i);
                }, e.decodePacket = function(t, r, n) {
                    if (void 0 === t) return y;
                    if ("string" == typeof t) {
                        if ("b" === t.charAt(0)) return e.decodeBase64Packet(t.substr(1), r);
                        if (n && !1 === (t = function(t) {
                            try {
                                t = c.decode(t, {
                                    strict: !1
                                });
                            } catch (t) {
                                return !1;
                            }
                            return t;
                        }(t))) return y;
                        var o = t.charAt(0);
                        return Number(o) == o && d[o] ? t.length > 1 ? {
                            type: d[o],
                            data: t.substring(1)
                        } : {
                            type: d[o]
                        } : y;
                    }
                    o = new Uint8Array(t)[0];
                    var i = a(t, 1);
                    return g && "blob" === r && (i = new g([ i ])), {
                        type: d[o],
                        data: i
                    };
                }, e.decodeBase64Packet = function(t, e) {
                    var r = d[t.charAt(0)];
                    if (!o) return {
                        type: r,
                        data: {
                            base64: !0,
                            data: t.substr(1)
                        }
                    };
                    var n = o.decode(t.substr(1));
                    return "blob" === e && g && (n = new g([ n ])), {
                        type: r,
                        data: n
                    };
                }, e.encodePayload = function(t, r, o) {
                    "function" == typeof r && (o = r, r = null);
                    var i = s(t);
                    return r && i ? g && !p ? e.encodePayloadAsBlob(t, o) : e.encodePayloadAsArrayBuffer(t, o) : t.length ? void n(t, function(t, n) {
                        e.encodePacket(t, !!i && r, !1, function(t) {
                            n(null, function(t) {
                                return t.length + ":" + t;
                            }(t));
                        });
                    }, function(t, e) {
                        return o(e.join(""));
                    }) : o("0:");
                }, e.decodePayload = function(t, r, n) {
                    if ("string" != typeof t) return e.decodePayloadAsBinary(t, r, n);
                    var o;
                    if ("function" == typeof r && (n = r, r = null), "" === t) return n(y, 0, 1);
                    for (var i, s, a = "", u = 0, c = t.length; u < c; u++) {
                        var f = t.charAt(u);
                        if (":" === f) {
                            if ("" === a || a != (i = Number(a))) return n(y, 0, 1);
                            if (a != (s = t.substr(u + 1, i)).length) return n(y, 0, 1);
                            if (s.length) {
                                if (o = e.decodePacket(s, r, !1), y.type === o.type && y.data === o.data) return n(y, 0, 1);
                                if (!1 === n(o, u + i, c)) return;
                            }
                            u += i, a = "";
                        } else a += f;
                    }
                    return "" !== a ? n(y, 0, 1) : void 0;
                }, e.encodePayloadAsArrayBuffer = function(t, r) {
                    if (!t.length) return r(new ArrayBuffer(0));
                    n(t, function(t, r) {
                        e.encodePacket(t, !0, !0, function(t) {
                            return r(null, t);
                        });
                    }, function(t, e) {
                        var n = e.reduce(function(t, e) {
                            var r;
                            return t + (r = "string" == typeof e ? e.length : e.byteLength).toString().length + r + 2;
                        }, 0), o = new Uint8Array(n), i = 0;
                        return e.forEach(function(t) {
                            var e = "string" == typeof t, r = t;
                            if (e) {
                                for (var n = new Uint8Array(t.length), s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
                                r = n.buffer;
                            }
                            o[i++] = e ? 0 : 1;
                            var a = r.byteLength.toString();
                            for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                            for (o[i++] = 255, n = new Uint8Array(r), s = 0; s < n.length; s++) o[i++] = n[s];
                        }), r(o.buffer);
                    });
                }, e.encodePayloadAsBlob = function(t, r) {
                    n(t, function(t, r) {
                        e.encodePacket(t, !0, !0, function(t) {
                            var e = new Uint8Array(1);
                            if (e[0] = 1, "string" == typeof t) {
                                for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
                                t = n.buffer, e[0] = 0;
                            }
                            var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(), s = new Uint8Array(i.length + 1);
                            for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                            if (s[i.length] = 255, g) {
                                var a = new g([ e.buffer, s.buffer, t ]);
                                r(null, a);
                            }
                        });
                    }, function(t, e) {
                        return r(new g(e));
                    });
                }, e.decodePayloadAsBinary = function(t, r, n) {
                    "function" == typeof r && (n = r, r = null);
                    for (var o = t, i = []; o.byteLength > 0; ) {
                        for (var s = new Uint8Array(o), u = 0 === s[0], c = "", f = 1; 255 !== s[f]; f++) {
                            if (c.length > 310) return n(y, 0, 1);
                            c += s[f];
                        }
                        o = a(o, 2 + c.length), c = parseInt(c);
                        var h = a(o, 0, c);
                        if (u) try {
                            h = String.fromCharCode.apply(null, new Uint8Array(h));
                        } catch (t) {
                            var p = new Uint8Array(h);
                            for (h = "", f = 0; f < p.length; f++) h += String.fromCharCode(p[f]);
                        }
                        i.push(h), o = a(o, c);
                    }
                    var l = i.length;
                    i.forEach(function(t, o) {
                        n(e.decodePacket(t, r, !0), o, l);
                    });
                };
            }).call(this, r(0));
        }, function(t, e) {
            t.exports = function() {
                return function() {};
            };
        }, function(t, e) {
            e.encode = function(t) {
                var e = "";
                for (var r in t) t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
                return e;
            }, e.decode = function(t) {
                for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
                    var i = r[n].split("=");
                    e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
                }
                return e;
            };
        }, function(t, e, r) {
            function n(t) {
                if (t) return function(t) {
                    for (var e in n.prototype) t[e] = n.prototype[e];
                    return t;
                }(t);
            }
            t.exports = n, n.prototype.on = n.prototype.addEventListener = function(t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), 
                this;
            }, n.prototype.once = function(t, e) {
                function r() {
                    this.off(t, r), e.apply(this, arguments);
                }
                return r.fn = e, this.on(t, r), this;
            }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
                this;
                var r, n = this._callbacks["$" + t];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks["$" + t], this;
                for (var o = 0; o < n.length; o++) if ((r = n[o]) === e || r.fn === e) {
                    n.splice(o, 1);
                    break;
                }
                return this;
            }, n.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1), r = this._callbacks["$" + t];
                if (r) for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, e);
                return this;
            }, n.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
            }, n.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length;
            };
        }, function(t, e, r) {
            function n(t) {
                this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, 
                this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, 
                this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, 
                this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, 
                this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, 
                this.forceNode = t.forceNode, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress;
            }
            var o = r(1), i = r(4);
            t.exports = n, i(n.prototype), n.prototype.onError = function(t, e) {
                var r = new Error(t);
                return r.type = "TransportError", r.description = e, this.emit("error", r), this;
            }, n.prototype.open = function() {
                return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", 
                this.doOpen()), this;
            }, n.prototype.close = function() {
                return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), 
                this.onClose()), this;
            }, n.prototype.send = function(t) {
                if ("open" !== this.readyState) throw new Error("Transport not open");
                this.write(t);
            }, n.prototype.onOpen = function() {
                this.readyState = "open", this.writable = !0, this.emit("open");
            }, n.prototype.onData = function(t) {
                var e = o.decodePacket(t, this.socket.binaryType);
                this.onPacket(e);
            }, n.prototype.onPacket = function(t) {
                this.emit("packet", t);
            }, n.prototype.onClose = function() {
                this.readyState = "closed", this.emit("close");
            };
        }, function(t, e, r) {
            var n = r(27);
            e.websocket = n;
        }, function(t, e) {
            var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, n = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
            t.exports = function(t) {
                var e = t, o = t.indexOf("["), i = t.indexOf("]");
                -1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(i, t.length));
                for (var s = r.exec(t || ""), a = {}, u = 14; u--; ) a[n[u]] = s[u] || "";
                return -1 != o && -1 != i && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), 
                a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
                a.ipv6uri = !0), a;
            };
        }, function(t, e) {
            var r = [].indexOf;
            t.exports = function(t, e) {
                if (r) return t.indexOf(e);
                for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
                return -1;
            };
        }, function(n, o, i) {
            var s = function t(e, n) {
                r(this, t), this.target = n, this.type = e;
            }, a = function(n) {
                function o(e, n) {
                    var i;
                    return r(this, o), i = t(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, "message", n)), 
                    i.data = e, i;
                }
                return e(o, s), o;
            }(), u = function(n) {
                function o(e, n, i) {
                    var s;
                    return r(this, o), s = t(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, "close", i)), 
                    s.wasClean = i._closeFrameReceived && i._closeFrameSent, s.reason = n, s.code = e, 
                    s;
                }
                return e(o, s), o;
            }(), c = function(n) {
                function o(e) {
                    return r(this, o), t(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, "open", e));
                }
                return e(o, s), o;
            }(), f = function(n) {
                function o(e, n) {
                    var i;
                    return r(this, o), i = t(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, "error", n)), 
                    i.message = e.message, i.error = e, i;
                }
                return e(o, s), o;
            }(), h = {
                addEventListener: function(t, e) {
                    function r(t) {
                        e.call(this, new a(t, this));
                    }
                    function n(t, r) {
                        e.call(this, new u(t, r, this));
                    }
                    function o(t) {
                        e.call(this, new f(t, this));
                    }
                    function i() {
                        e.call(this, new c(this));
                    }
                    "function" == typeof e && ("message" === t ? (r._listener = e, this.on(t, r)) : "close" === t ? (n._listener = e, 
                    this.on(t, n)) : "error" === t ? (o._listener = e, this.on(t, o)) : "open" === t ? (i._listener = e, 
                    this.on(t, i)) : this.on(t, e));
                },
                removeEventListener: function(t, e) {
                    for (var r = this.listeners(t), n = 0; n < r.length; n++) r[n] !== e && r[n]._listener !== e || this.removeListener(t, r[n]);
                }
            };
            n.exports = h;
        }, function(t, e) {
            function r() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
            }
            function n(t) {
                return "function" == typeof t;
            }
            function i(t) {
                return "object" == (void 0 === t ? "undefined" : o(t)) && null !== t;
            }
            function s(t) {
                return void 0 === t;
            }
            t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, 
            r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(t) {
                if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
                return this._maxListeners = t, this;
            }, r.prototype.emit = function(t) {
                var e, r, o, a, u, c;
                if (this._events || (this._events = {}), "error" === t && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
                    if ((e = arguments[1]) instanceof Error) throw e;
                    var f = new Error('Uncaught, unspecified "error" event. (' + e + ")");
                    throw f.context = e, f;
                }
                if (s(r = this._events[t])) return !1;
                if (n(r)) switch (arguments.length) {
                  case 1:
                    r.call(this);
                    break;

                  case 2:
                    r.call(this, arguments[1]);
                    break;

                  case 3:
                    r.call(this, arguments[1], arguments[2]);
                    break;

                  default:
                    a = Array.prototype.slice.call(arguments, 1), r.apply(this, a);
                } else if (i(r)) for (a = Array.prototype.slice.call(arguments, 1), o = (c = r.slice()).length, 
                u = 0; u < o; u++) c[u].apply(this, a);
                return !0;
            }, r.prototype.addListener = function(t, e) {
                var o;
                if (!n(e)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, n(e.listener) ? e.listener : e), 
                this._events[t] ? i(this._events[t]) ? this._events[t].push(e) : this._events[t] = [ this._events[t], e ] : this._events[t] = e, 
                i(this._events[t]) && !this._events[t].warned && (o = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[t].length > o && (this._events[t].warned = !0, 
                console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), 
                "function" == typeof console.trace && console.trace()), this;
            }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(t, e) {
                function r() {
                    this.removeListener(t, r), o || (o = !0, e.apply(this, arguments));
                }
                if (!n(e)) throw TypeError("listener must be a function");
                var o = !1;
                return r.listener = e, this.on(t, r), this;
            }, r.prototype.removeListener = function(t, e) {
                var r, o, s, a;
                if (!n(e)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[t]) return this;
                if (s = (r = this._events[t]).length, o = -1, r === e || n(r.listener) && r.listener === e) delete this._events[t], 
                this._events.removeListener && this.emit("removeListener", t, e); else if (i(r)) {
                    for (a = s; a-- > 0; ) if (r[a] === e || r[a].listener && r[a].listener === e) {
                        o = a;
                        break;
                    }
                    if (o < 0) return this;
                    1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(o, 1), this._events.removeListener && this.emit("removeListener", t, e);
                }
                return this;
            }, r.prototype.removeAllListeners = function(t) {
                var e, r;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], 
                this;
                if (0 === arguments.length) {
                    for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                    return this.removeAllListeners("removeListener"), this._events = {}, this;
                }
                if (n(r = this._events[t])) this.removeListener(t, r); else if (r) for (;r.length; ) this.removeListener(t, r[r.length - 1]);
                return delete this._events[t], this;
            }, r.prototype.listeners = function(t) {
                return this._events && this._events[t] ? n(this._events[t]) ? [ this._events[t] ] : this._events[t].slice() : [];
            }, r.prototype.listenerCount = function(t) {
                if (this._events) {
                    var e = this._events[t];
                    if (n(e)) return 1;
                    if (e) return e.length;
                }
                return 0;
            }, r.listenerCount = function(t, e) {
                return t.listenerCount(e);
            };
        }, function(i, s, a) {
            var u = a(10), c = a(9), f = a(2)("weapp-socket:"), h = [ "CONNECTING", "OPEN", "CLOSING", "CLOSED" ], p = function(i) {
                function s(e, n, i) {
                    var a;
                    return r(this, s), a = t(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this)), 
                    a.readyState = s.CONNECTING, a.protocol = "", a._socket = null, null !== e && (Array.isArray(n) ? n = n.join(", ") : "object" == (void 0 === n ? "undefined" : o(n)) && null !== n && (i = n, 
                    n = void 0), function(t, e, r) {
                        Object.assign(r, {
                            url: t,
                            header: {
                                "content-type": "application/json"
                            },
                            protocols: e,
                            method: "GET"
                        }), this._socket = function(t) {
                            var e = wx.connectSocket(t);
                            return f("socketTask: ", e), e || {
                                onClose: wx.onSocketClose,
                                onOpen: wx.onSocketOpen,
                                onError: wx.onSocketError,
                                onMessage: wx.onSocketMessage,
                                send: wx.sendSocketMessage,
                                close: wx.closeSocket
                            };
                        }(r), this.addSocketEventListeners();
                    }.call(a, e, n, i)), a;
                }
                return e(s, u), n(s, [ {
                    key: "addSocketEventListeners",
                    value: function() {
                        var t = this;
                        this._socket.onOpen(function() {
                            t.readyState = s.OPEN, t.onopen();
                        }), this._socket.onClose(function(e) {
                            f("onclose: ", e), t.readyState = s.CLOSED, t.onclose(e.code, e.reason);
                        }), this._socket.onError(function(e) {
                            f("onerror: ", e), t.onerror(e);
                        }), this._socket.onMessage(function(e) {
                            t.onmessage(e);
                        });
                    }
                }, {
                    key: "send",
                    value: function(t) {
                        f("send data: ", t, this.readyState), this.readyState === s.OPEN && this._socket.send({
                            data: t
                        });
                    }
                }, {
                    key: "close",
                    value: function(t, e) {
                        f("close socket: ", t, e), this.readyState = s.CLOSING, this._socket.close({
                            code: t,
                            reason: e
                        });
                    }
                }, {
                    key: "CONNECTING",
                    get: function() {
                        return s.CONNECTING;
                    }
                }, {
                    key: "CLOSING",
                    get: function() {
                        return s.CLOSING;
                    }
                }, {
                    key: "CLOSED",
                    get: function() {
                        return s.CLOSED;
                    }
                }, {
                    key: "OPEN",
                    get: function() {
                        return s.OPEN;
                    }
                } ]), s;
            }();
            h.forEach(function(t, e) {
                p[h[e]] = e;
            }), [ "open", "error", "close", "message" ].forEach(function(t) {
                Object.defineProperty(p.prototype, "on" + t, {
                    get: function() {
                        for (var e = this.listeners(t), r = 0; r < e.length; r++) if (e[r]._listener) return e[r]._listener;
                    },
                    set: function(e) {
                        for (var r = this.listeners(t), n = 0; n < r.length; n++) r[n]._listener && this.removeListener(t, r[n]);
                        this.addEventListener(t, e);
                    }
                });
            }), p.prototype.addEventListener = c.addEventListener, p.prototype.removeEventListener = c.removeEventListener, 
            i.exports = p;
        }, function(t, e, r) {
            function n(t) {
                var e = "";
                do {
                    e = s[t % a] + e, t = Math.floor(t / a);
                } while (t > 0);
                return e;
            }
            function o() {
                var t = n(+new Date());
                return t !== i ? (c = 0, i = t) : t + "." + n(c++);
            }
            for (var i, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, u = {}, c = 0, f = 0; f < a; f++) u[s[f]] = f;
            o.encode = n, o.decode = function(t) {
                var e = 0;
                for (f = 0; f < t.length; f++) e = e * a + u[t.charAt(f)];
                return e;
            }, t.exports = o;
        }, function(t, e) {
            t.exports = function(t, e) {
                var r = function() {};
                r.prototype = e.prototype, t.prototype = new r(), t.prototype.constructor = t;
            };
        }, function(t, e, r) {
            (function(e) {
                function r(t) {
                    for (var e = 0; e < t.length; e++) {
                        var r = t[e];
                        if (r.buffer instanceof ArrayBuffer) {
                            var n = r.buffer;
                            if (r.byteLength !== n.byteLength) {
                                var o = new Uint8Array(r.byteLength);
                                o.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = o.buffer;
                            }
                            t[e] = n;
                        }
                    }
                }
                var n = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder, o = function() {
                    try {
                        return 2 === new Blob([ "hi" ]).size;
                    } catch (t) {
                        return !1;
                    }
                }(), i = o && function() {
                    try {
                        return 2 === new Blob([ new Uint8Array([ 1, 2 ]) ]).size;
                    } catch (t) {
                        return !1;
                    }
                }(), s = n && n.prototype.append && n.prototype.getBlob;
                t.exports = o ? i ? e.Blob : function(t, e) {
                    return r(t), new Blob(t, e || {});
                } : s ? function(t, e) {
                    e = e || {};
                    var o = new n();
                    r(t);
                    for (var i = 0; i < t.length; i++) o.append(t[i]);
                    return e.type ? o.getBlob(e.type) : o.getBlob();
                } : void 0;
            }).call(this, r(0));
        }, function(t, e) {
            !function() {
                for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n < t.length; n++) r[t.charCodeAt(n)] = n;
                e.encode = function(e) {
                    var r, n = new Uint8Array(e), o = n.length, i = "";
                    for (r = 0; r < o; r += 3) i += t[n[r] >> 2], i += t[(3 & n[r]) << 4 | n[r + 1] >> 4], 
                    i += t[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], i += t[63 & n[r + 2]];
                    return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), 
                    i;
                }, e.decode = function(t) {
                    var e, n, o, i, s, a = .75 * t.length, u = t.length, c = 0;
                    "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
                    var f = new ArrayBuffer(a), h = new Uint8Array(f);
                    for (e = 0; e < u; e += 4) n = r[t.charCodeAt(e)], o = r[t.charCodeAt(e + 1)], i = r[t.charCodeAt(e + 2)], 
                    s = r[t.charCodeAt(e + 3)], h[c++] = n << 2 | o >> 4, h[c++] = (15 & o) << 4 | i >> 2, 
                    h[c++] = (3 & i) << 6 | 63 & s;
                    return f;
                };
            }();
        }, function(t, e) {
            t.exports = function(t) {
                return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), 
                Object.defineProperty(t, "loaded", {
                    enumerable: !0,
                    get: function() {
                        return t.l;
                    }
                }), Object.defineProperty(t, "id", {
                    enumerable: !0,
                    get: function() {
                        return t.i;
                    }
                }), t.webpackPolyfill = 1), t;
            };
        }, function(t, e, r) {
            (function(t, n) {
                var i;
                !function(s) {
                    function a(t) {
                        for (var e, r, n = [], o = 0, i = t.length; o < i; ) (e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i ? 56320 == (64512 & (r = t.charCodeAt(o++))) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), 
                        o--) : n.push(e);
                        return n;
                    }
                    function u(t, e) {
                        if (t >= 55296 && t <= 57343) {
                            if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
                            return !1;
                        }
                        return !0;
                    }
                    function c(t, e) {
                        return g(t >> e & 63 | 128);
                    }
                    function f(t, e) {
                        if (0 == (4294967168 & t)) return g(t);
                        var r = "";
                        return 0 == (4294965248 & t) ? r = g(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (u(t, e) || (t = 65533), 
                        r = g(t >> 12 & 15 | 224), r += c(t, 6)) : 0 == (4292870144 & t) && (r = g(t >> 18 & 7 | 240), 
                        r += c(t, 12), r += c(t, 6)), r += g(63 & t | 128);
                    }
                    function h() {
                        if (y >= d) throw Error("Invalid byte index");
                        var t = 255 & l[y];
                        if (y++, 128 == (192 & t)) return 63 & t;
                        throw Error("Invalid continuation byte");
                    }
                    function p(t) {
                        var e, r;
                        if (y > d) throw Error("Invalid byte index");
                        if (y == d) return !1;
                        if (e = 255 & l[y], y++, 0 == (128 & e)) return e;
                        if (192 == (224 & e)) {
                            if ((r = (31 & e) << 6 | h()) >= 128) return r;
                            throw Error("Invalid continuation byte");
                        }
                        if (224 == (240 & e)) {
                            if ((r = (15 & e) << 12 | h() << 6 | h()) >= 2048) return u(r, t) ? r : 65533;
                            throw Error("Invalid continuation byte");
                        }
                        if (240 == (248 & e) && (r = (7 & e) << 18 | h() << 12 | h() << 6 | h()) >= 65536 && r <= 1114111) return r;
                        throw Error("Invalid UTF-8 detected");
                    }
                    "object" == (void 0 === t ? "undefined" : o(t)) && t && t.exports, void 0 === n || o(n);
                    var l, d, y, g = String.fromCharCode, v = {
                        version: "2.1.2",
                        encode: function(t, e) {
                            for (var r = !1 !== (e = e || {}).strict, n = a(t), o = n.length, i = -1, s = ""; ++i < o; ) s += f(n[i], r);
                            return s;
                        },
                        decode: function(t, e) {
                            var r = !1 !== (e = e || {}).strict;
                            l = a(t), d = l.length, y = 0;
                            for (var n, o = []; !1 !== (n = p(r)); ) o.push(n);
                            return function(t) {
                                for (var e, r = t.length, n = -1, o = ""; ++n < r; ) (e = t[n]) > 65535 && (o += g((e -= 65536) >>> 10 & 1023 | 55296), 
                                e = 56320 | 1023 & e), o += g(e);
                                return o;
                            }(o);
                        }
                    };
                    void 0 === (i = function() {
                        return v;
                    }.call(e, r, e, t)) || (t.exports = i);
                }();
            }).call(this, r(16)(t), r(0));
        }, function(t, e) {
            function r() {}
            t.exports = function(t, e, n) {
                function o(t, r) {
                    if (o.count <= 0) throw new Error("after called too many times");
                    --o.count, t ? (i = !0, e(t), e = n) : 0 !== o.count || i || e(null, r);
                }
                var i = !1;
                return n = n || r, o.count = t, 0 === t ? e() : o;
            };
        }, function(t, e) {
            t.exports = function(t, e, r) {
                var n = t.byteLength;
                if (e = e || 0, r = r || n, t.slice) return t.slice(e, r);
                if (e < 0 && (e += n), r < 0 && (r += n), r > n && (r = n), e >= n || e >= r || 0 === n) return new ArrayBuffer(0);
                for (var o = new Uint8Array(t), i = new Uint8Array(r - e), s = e, a = 0; s < r; s++, 
                a++) i[a] = o[s];
                return i.buffer;
            };
        }, function(t, e) {
            var r = {}.toString;
            t.exports = Array.isArray || function(t) {
                return "[object Array]" == r.call(t);
            };
        }, function(t, e) {
            var r = {}.toString;
            t.exports = Array.isArray || function(t) {
                return "[object Array]" == r.call(t);
            };
        }, function(t, e) {
            e.read = function(t, e, r, n, o) {
                var i, s, a = 8 * o - n - 1, u = (1 << a) - 1, c = u >> 1, f = -7, h = r ? o - 1 : 0, p = r ? -1 : 1, l = t[e + h];
                for (h += p, i = l & (1 << -f) - 1, l >>= -f, f += a; f > 0; i = 256 * i + t[e + h], 
                h += p, f -= 8) ;
                for (s = i & (1 << -f) - 1, i >>= -f, f += n; f > 0; s = 256 * s + t[e + h], h += p, 
                f -= 8) ;
                if (0 === i) i = 1 - c; else {
                    if (i === u) return s ? NaN : 1 / 0 * (l ? -1 : 1);
                    s += Math.pow(2, n), i -= c;
                }
                return (l ? -1 : 1) * s * Math.pow(2, i - n);
            }, e.write = function(t, e, r, n, o, i) {
                var s, a, u, c = 8 * i - o - 1, f = (1 << c) - 1, h = f >> 1, p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : i - 1, d = n ? 1 : -1, y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = f) : (s = Math.floor(Math.log(e) / Math.LN2), 
                e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (e += s + h >= 1 ? p / u : p * Math.pow(2, 1 - h)) * u >= 2 && (s++, 
                u /= 2), s + h >= f ? (a = 0, s = f) : s + h >= 1 ? (a = (e * u - 1) * Math.pow(2, o), 
                s += h) : (a = e * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); o >= 8; t[r + l] = 255 & a, 
                l += d, a /= 256, o -= 8) ;
                for (s = s << o | a, c += o; c > 0; t[r + l] = 255 & s, l += d, s /= 256, c -= 8) ;
                t[r + l - d] |= 128 * y;
            };
        }, function(t, e, r) {
            function n(t) {
                var e = t.length;
                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var r = t.indexOf("=");
                return -1 === r && (r = e), [ r, r === e ? 0 : 4 - r % 4 ];
            }
            function o(t, e, r) {
                for (var n, o, s = [], a = e; a < r; a += 3) n = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), 
                s.push(i[(o = n) >> 18 & 63] + i[o >> 12 & 63] + i[o >> 6 & 63] + i[63 & o]);
                return s.join("");
            }
            e.byteLength = function(t) {
                var e = n(t), r = e[0], o = e[1];
                return 3 * (r + o) / 4 - o;
            }, e.toByteArray = function(t) {
                for (var e, r = n(t), o = r[0], i = r[1], u = new a(NaN), c = 0, f = i > 0 ? o - 4 : o, h = 0; h < f; h += 4) e = s[t.charCodeAt(h)] << 18 | s[t.charCodeAt(h + 1)] << 12 | s[t.charCodeAt(h + 2)] << 6 | s[t.charCodeAt(h + 3)], 
                u[c++] = e >> 16 & 255, u[c++] = e >> 8 & 255, u[c++] = 255 & e;
                return 2 === i && (e = s[t.charCodeAt(h)] << 2 | s[t.charCodeAt(h + 1)] >> 4, u[c++] = 255 & e), 
                1 === i && (e = s[t.charCodeAt(h)] << 10 | s[t.charCodeAt(h + 1)] << 4 | s[t.charCodeAt(h + 2)] >> 2, 
                u[c++] = e >> 8 & 255, u[c++] = 255 & e), u;
            }, e.fromByteArray = function(t) {
                for (var e, r = t.length, n = r % 3, s = [], a = 0, u = r - n; a < u; a += 16383) s.push(o(t, a, a + 16383 > u ? u : a + 16383));
                return 1 === n ? (e = t[r - 1], s.push(i[e >> 2] + i[e << 4 & 63] + "==")) : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], 
                s.push(i[e >> 10] + i[e >> 4 & 63] + i[e << 2 & 63] + "=")), s.join("");
            };
            for (var i = [], s = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, f = u.length; c < f; ++c) i[c] = u[c], 
            s[u.charCodeAt(c)] = c;
            s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63;
        }, function(t, e, r) {
            (function(t) {
                function n() {
                    return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
                }
                function o(t, e) {
                    if (n() < e) throw new RangeError("Invalid typed array length");
                    return i.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = i.prototype : (null === t && (t = new i(e)), 
                    t.length = e), t;
                }
                function i(t, e, r) {
                    if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(t, e, r);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return u(this, t);
                    }
                    return s(this, t, e, r);
                }
                function s(t, e, r, n) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, n) {
                        if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
                        if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                        return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n), 
                        i.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = i.prototype : t = c(t, e), t;
                    }(t, e, r, n) : "string" == typeof e ? function(t, e, r) {
                        if ("string" == typeof r && "" !== r || (r = "utf8"), !i.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                        var n = 0 | h(e, r), s = (t = o(t, n)).write(e, r);
                        return s !== n && (t = t.slice(0, s)), t;
                    }(t, e, r) : function(t, e) {
                        if (i.isBuffer(e)) {
                            var r = 0 | f(e.length);
                            return 0 === (t = o(t, r)).length ? t : (e.copy(t, 0, 0, r), t);
                        }
                        if (e) {
                            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (n = e.length) != n ? o(t, 0) : c(t, e);
                            if ("Buffer" === e.type && D(e.data)) return c(t, e.data);
                        }
                        var n;
                        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                    }(t, e);
                }
                function a(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative');
                }
                function u(t, e) {
                    if (a(e), t = o(t, e < 0 ? 0 : 0 | f(e)), !i.TYPED_ARRAY_SUPPORT) for (var r = 0; r < e; ++r) t[r] = 0;
                    return t;
                }
                function c(t, e) {
                    var r = e.length < 0 ? 0 : 0 | f(e.length);
                    t = o(t, r);
                    for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
                    return t;
                }
                function f(t) {
                    if (t >= n()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n().toString(16) + " bytes");
                    return 0 | t;
                }
                function h(t, e) {
                    if (i.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var r = t.length;
                    if (0 === r) return 0;
                    for (var n = !1; ;) switch (e) {
                      case "ascii":
                      case "latin1":
                      case "binary":
                        return r;

                      case "utf8":
                      case "utf-8":
                      case void 0:
                        return I(t).length;

                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return 2 * r;

                      case "hex":
                        return r >>> 1;

                      case "base64":
                        return N(t).length;

                      default:
                        if (n) return I(t).length;
                        e = ("" + e).toLowerCase(), n = !0;
                    }
                }
                function p(t, e, r) {
                    var n = t[e];
                    t[e] = t[r], t[r] = n;
                }
                function l(t, e, r, n, o) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), 
                    r = +r, isNaN(r) && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                        if (o) return -1;
                        r = t.length - 1;
                    } else if (r < 0) {
                        if (!o) return -1;
                        r = 0;
                    }
                    if ("string" == typeof e && (e = i.from(e, n)), i.isBuffer(e)) return 0 === e.length ? -1 : d(t, e, r, n, o);
                    if ("number" == typeof e) return e &= 255, i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : d(t, [ e ], r, n, o);
                    throw new TypeError("val must be string, number or Buffer");
                }
                function d(t, e, r, n, o) {
                    function i(t, e) {
                        return 1 === a ? t[e] : t.readUInt16BE(e * a);
                    }
                    var s, a = 1, u = t.length, c = e.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        a = 2, u /= 2, c /= 2, r /= 2;
                    }
                    if (o) {
                        var f = -1;
                        for (s = r; s < u; s++) if (i(t, s) === i(e, -1 === f ? 0 : s - f)) {
                            if (-1 === f && (f = s), s - f + 1 === c) return f * a;
                        } else -1 !== f && (s -= s - f), f = -1;
                    } else for (r + c > u && (r = u - c), s = r; s >= 0; s--) {
                        for (var h = !0, p = 0; p < c; p++) if (i(t, s + p) !== i(e, p)) {
                            h = !1;
                            break;
                        }
                        if (h) return s;
                    }
                    return -1;
                }
                function y(t, e, r, n) {
                    r = Number(r) || 0;
                    var o = t.length - r;
                    n ? (n = Number(n)) > o && (n = o) : n = o;
                    var i = e.length;
                    if (i % 2 != 0) throw new TypeError("Invalid hex string");
                    n > i / 2 && (n = i / 2);
                    for (var s = 0; s < n; ++s) {
                        var a = parseInt(e.substr(2 * s, 2), 16);
                        if (isNaN(a)) return s;
                        t[r + s] = a;
                    }
                    return s;
                }
                function g(t, e, r, n) {
                    return M(I(e, t.length - r), t, r, n);
                }
                function v(t, e, r, n) {
                    return M(function(t) {
                        for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                        return e;
                    }(e), t, r, n);
                }
                function b(t, e, r, n) {
                    return v(t, e, r, n);
                }
                function m(t, e, r, n) {
                    return M(N(e), t, r, n);
                }
                function w(t, e, r, n) {
                    return M(function(t, e) {
                        for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) n = (r = t.charCodeAt(s)) >> 8, 
                        o = r % 256, i.push(o), i.push(n);
                        return i;
                    }(e, t.length - r), t, r, n);
                }
                function A(t, e, r) {
                    return 0 === e && r === t.length ? j.fromByteArray(t) : j.fromByteArray(t.slice(e, r));
                }
                function _(t, e, r) {
                    r = Math.min(t.length, r);
                    for (var n = [], o = e; o < r; ) {
                        var i, s, a, u, c = t[o], f = null, h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                        if (o + h <= r) switch (h) {
                          case 1:
                            c < 128 && (f = c);
                            break;

                          case 2:
                            128 == (192 & (i = t[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (f = u);
                            break;

                          case 3:
                            i = t[o + 1], s = t[o + 2], 128 == (192 & i) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (f = u);
                            break;

                          case 4:
                            i = t[o + 1], s = t[o + 2], a = t[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (f = u);
                        }
                        null === f ? (f = 65533, h = 1) : f > 65535 && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), 
                        f = 56320 | 1023 & f), n.push(f), o += h;
                    }
                    return function(t) {
                        var e = t.length;
                        if (e <= q) return String.fromCharCode.apply(String, t);
                        for (var r = "", n = 0; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, n += q));
                        return r;
                    }(n);
                }
                function E(t, e, r) {
                    var n = "";
                    r = Math.min(t.length, r);
                    for (var o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
                    return n;
                }
                function k(t, e, r) {
                    var n = "";
                    r = Math.min(t.length, r);
                    for (var o = e; o < r; ++o) n += String.fromCharCode(t[o]);
                    return n;
                }
                function B(t, e, r) {
                    var n = t.length;
                    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
                    for (var o = "", i = e; i < r; ++i) o += L(t[i]);
                    return o;
                }
                function R(t, e, r) {
                    for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                    return o;
                }
                function P(t, e, r) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
                }
                function S(t, e, r, n, o, s) {
                    if (!i.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > o || e < s) throw new RangeError('"value" argument is out of bounds');
                    if (r + n > t.length) throw new RangeError("Index out of range");
                }
                function T(t, e, r, n) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o) t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o);
                }
                function O(t, e, r, n) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o) t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255;
                }
                function x(t, e, r, n, o, i) {
                    if (r + n > t.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range");
                }
                function C(t, e, r, n, o) {
                    return o || x(t, 0, r, 4), Y.write(t, e, r, n, 23, 4), r + 4;
                }
                function U(t, e, r, n, o) {
                    return o || x(t, 0, r, 8), Y.write(t, e, r, n, 52, 8), r + 8;
                }
                function L(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16);
                }
                function I(t, e) {
                    var r;
                    e = e || 1 / 0;
                    for (var n = t.length, o = null, i = [], s = 0; s < n; ++s) {
                        if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                            if (!o) {
                                if (r > 56319) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue;
                                }
                                if (s + 1 === n) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue;
                                }
                                o = r;
                                continue;
                            }
                            if (r < 56320) {
                                (e -= 3) > -1 && i.push(239, 191, 189), o = r;
                                continue;
                            }
                            r = 65536 + (o - 55296 << 10 | r - 56320);
                        } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                        if (o = null, r < 128) {
                            if ((e -= 1) < 0) break;
                            i.push(r);
                        } else if (r < 2048) {
                            if ((e -= 2) < 0) break;
                            i.push(r >> 6 | 192, 63 & r | 128);
                        } else if (r < 65536) {
                            if ((e -= 3) < 0) break;
                            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
                        }
                    }
                    return i;
                }
                function N(t) {
                    return j.toByteArray(function(t) {
                        if ((t = function(t) {
                            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
                        }(t).replace(F, "")).length < 2) return "";
                        for (;t.length % 4 != 0; ) t += "=";
                        return t;
                    }(t));
                }
                function M(t, e, r, n) {
                    for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) e[o + r] = t[o];
                    return o;
                }
                var j = r(23), Y = r(22), D = r(21);
                e.Buffer = i, e.SlowBuffer = function(t) {
                    return +t != t && (t = 0), i.alloc(+t);
                }, e.INSPECT_MAX_BYTES = 50, i.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42;
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
                    } catch (t) {
                        return !1;
                    }
                }(), e.kMaxLength = n(), i.poolSize = 8192, i._augment = function(t) {
                    return t.__proto__ = i.prototype, t;
                }, i.from = function(t, e, r) {
                    return s(null, t, e, r);
                }, i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, 
                "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
                    value: null,
                    configurable: !0
                })), i.alloc = function(t, e, r) {
                    return function(t, e, r, n) {
                        return a(e), e <= 0 ? o(t, e) : void 0 !== r ? "string" == typeof n ? o(t, e).fill(r, n) : o(t, e).fill(r) : o(t, e);
                    }(null, t, e, r);
                }, i.allocUnsafe = function(t) {
                    return u(null, t);
                }, i.allocUnsafeSlow = function(t) {
                    return u(null, t);
                }, i.isBuffer = function(t) {
                    return !(null == t || !t._isBuffer);
                }, i.compare = function(t, e) {
                    if (!i.isBuffer(t) || !i.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var r = t.length, n = e.length, o = 0, s = Math.min(r, n); o < s; ++o) if (t[o] !== e[o]) {
                        r = t[o], n = e[o];
                        break;
                    }
                    return r < n ? -1 : n < r ? 1 : 0;
                }, i.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                      case "hex":
                      case "utf8":
                      case "utf-8":
                      case "ascii":
                      case "latin1":
                      case "binary":
                      case "base64":
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return !0;

                      default:
                        return !1;
                    }
                }, i.concat = function(t, e) {
                    if (!D(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return i.alloc(0);
                    var r;
                    if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
                    var n = i.allocUnsafe(e), o = 0;
                    for (r = 0; r < t.length; ++r) {
                        var s = t[r];
                        if (!i.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                        s.copy(n, o), o += s.length;
                    }
                    return n;
                }, i.byteLength = h, i.prototype._isBuffer = !0, i.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) p(this, e, e + 1);
                    return this;
                }, i.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) p(this, e, e + 3), p(this, e + 1, e + 2);
                    return this;
                }, i.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) p(this, e, e + 7), p(this, e + 1, e + 6), p(this, e + 2, e + 5), 
                    p(this, e + 3, e + 4);
                    return this;
                }, i.prototype.toString = function() {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? _(this, 0, t) : function(t, e, r) {
                        var n = !1;
                        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                        if ((r >>>= 0) <= (e >>>= 0)) return "";
                        for (t || (t = "utf8"); ;) switch (t) {
                          case "hex":
                            return B(this, e, r);

                          case "utf8":
                          case "utf-8":
                            return _(this, e, r);

                          case "ascii":
                            return E(this, e, r);

                          case "latin1":
                          case "binary":
                            return k(this, e, r);

                          case "base64":
                            return A(this, e, r);

                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                            return R(this, e, r);

                          default:
                            if (n) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), n = !0;
                        }
                    }.apply(this, arguments);
                }, i.prototype.equals = function(t) {
                    if (!i.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === i.compare(this, t);
                }, i.prototype.inspect = function() {
                    var t = "", r = e.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), 
                    this.length > r && (t += " ... ")), "<Buffer " + t + ">";
                }, i.prototype.compare = function(t, e, r, n, o) {
                    if (!i.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), 
                    void 0 === o && (o = this.length), e < 0 || r > t.length || n < 0 || o > this.length) throw new RangeError("out of range index");
                    if (n >= o && e >= r) return 0;
                    if (n >= o) return -1;
                    if (e >= r) return 1;
                    if (e >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === t) return 0;
                    for (var s = o - n, a = r - e, u = Math.min(s, a), c = this.slice(n, o), f = t.slice(e, r), h = 0; h < u; ++h) if (c[h] !== f[h]) {
                        s = c[h], a = f[h];
                        break;
                    }
                    return s < a ? -1 : a < s ? 1 : 0;
                }, i.prototype.includes = function(t, e, r) {
                    return -1 !== this.indexOf(t, e, r);
                }, i.prototype.indexOf = function(t, e, r) {
                    return l(this, t, e, r, !0);
                }, i.prototype.lastIndexOf = function(t, e, r) {
                    return l(this, t, e, r, !1);
                }, i.prototype.write = function(t, e, r, n) {
                    if (void 0 === e) n = "utf8", r = this.length, e = 0; else if (void 0 === r && "string" == typeof e) n = e, 
                    r = this.length, e = 0; else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
                    }
                    var o = this.length - e;
                    if ((void 0 === r || r > o) && (r = o), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var i = !1; ;) switch (n) {
                      case "hex":
                        return y(this, t, e, r);

                      case "utf8":
                      case "utf-8":
                        return g(this, t, e, r);

                      case "ascii":
                        return v(this, t, e, r);

                      case "latin1":
                      case "binary":
                        return b(this, t, e, r);

                      case "base64":
                        return m(this, t, e, r);

                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return w(this, t, e, r);

                      default:
                        if (i) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), i = !0;
                    }
                }, i.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    };
                };
                var q = 4096;
                i.prototype.slice = function(t, e) {
                    var r, n = this.length;
                    if (t = ~~t, e = void 0 === e ? n : ~~e, t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), 
                    e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t), i.TYPED_ARRAY_SUPPORT) (r = this.subarray(t, e)).__proto__ = i.prototype; else {
                        var o = e - t;
                        r = new i(o, void 0);
                        for (var s = 0; s < o; ++s) r[s] = this[s + t];
                    }
                    return r;
                }, i.prototype.readUIntLE = function(t, e, r) {
                    t |= 0, e |= 0, r || P(t, e, this.length);
                    for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); ) n += this[t + i] * o;
                    return n;
                }, i.prototype.readUIntBE = function(t, e, r) {
                    t |= 0, e |= 0, r || P(t, e, this.length);
                    for (var n = this[t + --e], o = 1; e > 0 && (o *= 256); ) n += this[t + --e] * o;
                    return n;
                }, i.prototype.readUInt8 = function(t, e) {
                    return e || P(t, 1, this.length), this[t];
                }, i.prototype.readUInt16LE = function(t, e) {
                    return e || P(t, 2, this.length), this[t] | this[t + 1] << 8;
                }, i.prototype.readUInt16BE = function(t, e) {
                    return e || P(t, 2, this.length), this[t] << 8 | this[t + 1];
                }, i.prototype.readUInt32LE = function(t, e) {
                    return e || P(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
                }, i.prototype.readUInt32BE = function(t, e) {
                    return e || P(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
                }, i.prototype.readIntLE = function(t, e, r) {
                    t |= 0, e |= 0, r || P(t, e, this.length);
                    for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); ) n += this[t + i] * o;
                    return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)), n;
                }, i.prototype.readIntBE = function(t, e, r) {
                    t |= 0, e |= 0, r || P(t, e, this.length);
                    for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256); ) i += this[t + --n] * o;
                    return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
                }, i.prototype.readInt8 = function(t, e) {
                    return e || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
                }, i.prototype.readInt16LE = function(t, e) {
                    e || P(t, 2, this.length);
                    var r = this[t] | this[t + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r;
                }, i.prototype.readInt16BE = function(t, e) {
                    e || P(t, 2, this.length);
                    var r = this[t + 1] | this[t] << 8;
                    return 32768 & r ? 4294901760 | r : r;
                }, i.prototype.readInt32LE = function(t, e) {
                    return e || P(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
                }, i.prototype.readInt32BE = function(t, e) {
                    return e || P(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
                }, i.prototype.readFloatLE = function(t, e) {
                    return e || P(t, 4, this.length), Y.read(this, t, !0, 23, 4);
                }, i.prototype.readFloatBE = function(t, e) {
                    return e || P(t, 4, this.length), Y.read(this, t, !1, 23, 4);
                }, i.prototype.readDoubleLE = function(t, e) {
                    return e || P(t, 8, this.length), Y.read(this, t, !0, 52, 8);
                }, i.prototype.readDoubleBE = function(t, e) {
                    return e || P(t, 8, this.length), Y.read(this, t, !1, 52, 8);
                }, i.prototype.writeUIntLE = function(t, e, r, n) {
                    t = +t, e |= 0, r |= 0, n || S(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                    var o = 1, i = 0;
                    for (this[e] = 255 & t; ++i < r && (o *= 256); ) this[e + i] = t / o & 255;
                    return e + r;
                }, i.prototype.writeUIntBE = function(t, e, r, n) {
                    t = +t, e |= 0, r |= 0, n || S(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                    var o = r - 1, i = 1;
                    for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); ) this[e + o] = t / i & 255;
                    return e + r;
                }, i.prototype.writeUInt8 = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 
                    this[e] = 255 & t, e + 1;
                }, i.prototype.writeUInt16LE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, 
                    this[e + 1] = t >>> 8) : T(this, t, e, !0), e + 2;
                }, i.prototype.writeUInt16BE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, 
                    this[e + 1] = 255 & t) : T(this, t, e, !1), e + 2;
                }, i.prototype.writeUInt32LE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, 
                    this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : O(this, t, e, !0), 
                    e + 4;
                }, i.prototype.writeUInt32BE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, 
                    this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), 
                    e + 4;
                }, i.prototype.writeIntLE = function(t, e, r, n) {
                    if (t = +t, e |= 0, !n) {
                        var o = Math.pow(2, 8 * r - 1);
                        S(this, t, e, r, o - 1, -o);
                    }
                    var i = 0, s = 1, a = 0;
                    for (this[e] = 255 & t; ++i < r && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1), 
                    this[e + i] = (t / s >> 0) - a & 255;
                    return e + r;
                }, i.prototype.writeIntBE = function(t, e, r, n) {
                    if (t = +t, e |= 0, !n) {
                        var o = Math.pow(2, 8 * r - 1);
                        S(this, t, e, r, o - 1, -o);
                    }
                    var i = r - 1, s = 1, a = 0;
                    for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1), 
                    this[e + i] = (t / s >> 0) - a & 255;
                    return e + r;
                }, i.prototype.writeInt8 = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 
                    t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
                }, i.prototype.writeInt16LE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, 
                    this[e + 1] = t >>> 8) : T(this, t, e, !0), e + 2;
                }, i.prototype.writeInt16BE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, 
                    this[e + 1] = 255 & t) : T(this, t, e, !1), e + 2;
                }, i.prototype.writeInt32LE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, 
                    this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : O(this, t, e, !0), 
                    e + 4;
                }, i.prototype.writeInt32BE = function(t, e, r) {
                    return t = +t, e |= 0, r || S(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), 
                    i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, 
                    this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4;
                }, i.prototype.writeFloatLE = function(t, e, r) {
                    return C(this, t, e, !0, r);
                }, i.prototype.writeFloatBE = function(t, e, r) {
                    return C(this, t, e, !1, r);
                }, i.prototype.writeDoubleLE = function(t, e, r) {
                    return U(this, t, e, !0, r);
                }, i.prototype.writeDoubleBE = function(t, e, r) {
                    return U(this, t, e, !1, r);
                }, i.prototype.copy = function(t, e, r, n) {
                    if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), 
                    e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (n < 0) throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
                    var o, s = n - r;
                    if (this === t && r < e && e < n) for (o = s - 1; o >= 0; --o) t[o + e] = this[o + r]; else if (s < 1e3 || !i.TYPED_ARRAY_SUPPORT) for (o = 0; o < s; ++o) t[o + e] = this[o + r]; else Uint8Array.prototype.set.call(t, this.subarray(r, r + s), e);
                    return s;
                }, i.prototype.fill = function(t, e, r, n) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, 
                        r = this.length), 1 === t.length) {
                            var o = t.charCodeAt(0);
                            o < 256 && (t = o);
                        }
                        if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !i.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                    } else "number" == typeof t && (t &= 255);
                    if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
                    if (r <= e) return this;
                    var s;
                    if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t) for (s = e; s < r; ++s) this[s] = t; else {
                        var a = i.isBuffer(t) ? t : I(new i(t, n).toString()), u = a.length;
                        for (s = 0; s < r - e; ++s) this[s + e] = a[s % u];
                    }
                    return this;
                };
                var F = /[^+\/0-9A-Za-z-_]/g;
            }).call(this, r(0));
        }, function(t, e, r) {
            (function(e) {
                var n = r(20), i = Object.prototype.toString, s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob), a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
                t.exports = function t(r) {
                    if (!r || "object" != (void 0 === r ? "undefined" : o(r))) return !1;
                    if (n(r)) {
                        for (var i = 0, u = r.length; i < u; i++) if (t(r[i])) return !0;
                        return !1;
                    }
                    if ("function" == typeof e && e.isBuffer && e.isBuffer(r) || "function" == typeof ArrayBuffer && r instanceof ArrayBuffer || s && r instanceof Blob || a && r instanceof File) return !0;
                    if (r.toJSON && "function" == typeof r.toJSON && 1 === arguments.length) return t(r.toJSON(), !0);
                    for (var c in r) if (Object.prototype.hasOwnProperty.call(r, c) && t(r[c])) return !0;
                    return !1;
                };
            }).call(this, r(24).Buffer);
        }, function(t, e) {
            t.exports = Object.keys || function(t) {
                var e = [], r = Object.prototype.hasOwnProperty;
                for (var n in t) r.call(t, n) && e.push(n);
                return e;
            };
        }, function(t, e, r) {
            (function(e) {
                function n(t) {
                    t && t.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, 
                    this.usingBrowserWebSocket = h && !t.forceNode, this.protocols = t.protocols, this.usingBrowserWebSocket || (p = o), 
                    i.call(this, t);
                }
                var o, i = r(5), s = r(1), a = r(3), u = r(13), c = r(12), f = r(2)("engine.io-client:websocket"), h = e.WebSocket || e.MozWebSocket;
                if ("undefined" == typeof window) try {
                    o = r(11);
                } catch (t) {
                    f("require error: ", t);
                }
                var p = h;
                p || "undefined" != typeof window || (p = o), t.exports = n, u(n, i), n.prototype.name = "websocket", 
                n.prototype.supportsBinary = !0, n.prototype.doOpen = function() {
                    if (f("wesocket do open: ", this.protocols), this.check()) {
                        var t = this.uri(), e = this.protocols, r = {
                            agent: this.agent,
                            perMessageDeflate: this.perMessageDeflate
                        };
                        r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, 
                        r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, 
                        this.extraHeaders && (r.headers = this.extraHeaders), this.localAddress && (r.localAddress = this.localAddress);
                        try {
                            this.ws = this.usingBrowserWebSocket ? e ? new p(t, e) : new p(t) : new p(t, e, r);
                        } catch (t) {
                            return this.emit("error", t);
                        }
                        void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, 
                        this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
                    }
                }, n.prototype.addEventListeners = function() {
                    var t = this;
                    this.ws.onopen = function() {
                        t.onOpen();
                    }, this.ws.onclose = function() {
                        t.onClose();
                    }, this.ws.onmessage = function(e) {
                        t.onData(e.data);
                    }, this.ws.onerror = function(e) {
                        t.onError("websocket error", e);
                    };
                }, n.prototype.write = function(t) {
                    var e = this;
                    this.writable = !1;
                    for (var r, n = t.length, o = 0, i = n; o < i; o++) r = t[o], s.encodePacket(r, e.supportsBinary, function(t) {
                        try {
                            e.ws.send(t);
                        } catch (t) {}
                        --n || (e.emit("flush"), setTimeout(function() {
                            e.writable = !0, e.emit("drain");
                        }, 0));
                    });
                }, n.prototype.onClose = function() {
                    i.prototype.onClose.call(this);
                }, n.prototype.doClose = function() {
                    void 0 !== this.ws && this.ws.close();
                }, n.prototype.uri = function() {
                    var t = this.query || {}, e = this.secure ? "wss" : "ws", r = "";
                    return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (r = ":" + this.port), 
                    this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), 
                    (t = a.encode(t)).length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t;
                }, n.prototype.check = function() {
                    return !(!p || "__initialize" in p && this.name === n.prototype.name);
                };
            }).call(this, r(0));
        }, function(t, e, r) {
            (function(e) {
                function n(t, r) {
                    if (!(this instanceof n)) return new n(t, r);
                    r = r || {}, t && "object" == (void 0 === t ? "undefined" : o(t)) && (r = t, t = null), 
                    t ? (t = f(t), r.hostname = t.host, r.secure = "https" === t.protocol || "wss" === t.protocol, 
                    r.port = t.port, t.query && (r.query = t.query)) : r.host && (r.hostname = f(r.host).host), 
                    this.secure = null != r.secure ? r.secure : e.location && "https:" === location.protocol, 
                    r.hostname && !r.port && (r.port = this.secure ? "443" : "80"), this.agent = r.agent || !1, 
                    this.hostname = r.hostname || (e.location ? location.hostname : "localhost"), this.port = r.port || (e.location && location.port ? location.port : this.secure ? 443 : 80), 
                    this.query = r.query || {}, "string" == typeof this.query && (this.query = h.decode(this.query)), 
                    this.upgrade = !1 !== r.upgrade, this.path = (r.path || "/engine.io").replace(/\/$/, "") + "/", 
                    this.forceJSONP = !!r.forceJSONP, this.jsonp = !1 !== r.jsonp, this.forceBase64 = !!r.forceBase64, 
                    this.enablesXDR = !!r.enablesXDR, this.timestampParam = r.timestampParam || "t", 
                    this.timestampRequests = r.timestampRequests, this.transports = r.transports || [ "websocket" ], 
                    this.transportOptions = r.transportOptions || {}, this.readyState = "", this.writeBuffer = [], 
                    this.prevBufferLen = 0, this.policyPort = r.policyPort || 843, this.rememberUpgrade = r.rememberUpgrade || !1, 
                    this.binaryType = null, this.onlyBinaryUpgrades = r.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== r.perMessageDeflate && (r.perMessageDeflate || {}), 
                    !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), 
                    this.pfx = r.pfx || null, this.key = r.key || null, this.passphrase = r.passphrase || null, 
                    this.cert = r.cert || null, this.ca = r.ca || null, this.ciphers = r.ciphers || null, 
                    this.rejectUnauthorized = void 0 === r.rejectUnauthorized || r.rejectUnauthorized, 
                    this.forceNode = !!r.forceNode;
                    var i = "object" == (void 0 === e ? "undefined" : o(e)) && e;
                    i.global === i && (r.extraHeaders && Object.keys(r.extraHeaders).length > 0 && (this.extraHeaders = r.extraHeaders), 
                    r.localAddress && (this.localAddress = r.localAddress)), this.id = null, this.upgrades = null, 
                    this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, 
                    this.pingTimeoutTimer = null, this.open();
                }
                var i = r(6), s = r(4), a = r(2)("engine.io-client:socket"), u = r(8), c = r(1), f = r(7), h = r(3);
                t.exports = n, n.priorWebsocketSuccess = !1, s(n.prototype), n.protocol = c.protocol, 
                n.Socket = n, n.Transport = r(5), n.transports = r(6), n.parser = r(1), n.prototype.createTransport = function(t) {
                    a('creating transport "%s"', t);
                    var e = function(t) {
                        var e = {};
                        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                        return e;
                    }(this.query);
                    e.EIO = c.protocol, e.transport = t;
                    var r = this.transportOptions[t] || {};
                    this.id && (e.sid = this.id);
                    var n = new i[t]({
                        query: e,
                        socket: this,
                        agent: r.agent || this.agent,
                        hostname: r.hostname || this.hostname,
                        port: r.port || this.port,
                        secure: r.secure || this.secure,
                        path: r.path || this.path,
                        forceJSONP: r.forceJSONP || this.forceJSONP,
                        jsonp: r.jsonp || this.jsonp,
                        forceBase64: r.forceBase64 || this.forceBase64,
                        enablesXDR: r.enablesXDR || this.enablesXDR,
                        timestampRequests: r.timestampRequests || this.timestampRequests,
                        timestampParam: r.timestampParam || this.timestampParam,
                        policyPort: r.policyPort || this.policyPort,
                        pfx: r.pfx || this.pfx,
                        key: r.key || this.key,
                        passphrase: r.passphrase || this.passphrase,
                        cert: r.cert || this.cert,
                        ca: r.ca || this.ca,
                        ciphers: r.ciphers || this.ciphers,
                        rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
                        perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
                        extraHeaders: r.extraHeaders || this.extraHeaders,
                        forceNode: r.forceNode || this.forceNode,
                        localAddress: r.localAddress || this.localAddress,
                        requestTimeout: r.requestTimeout || this.requestTimeout,
                        protocols: r.protocols || void 0
                    });
                    return a("transport: ", n), n;
                }, n.prototype.open = function() {
                    var t;
                    if (this.rememberUpgrade && n.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket"; else {
                        if (0 === this.transports.length) {
                            var e = this;
                            return void setTimeout(function() {
                                e.emit("error", "No transports available");
                            }, 0);
                        }
                        t = this.transports[0];
                    }
                    this.readyState = "opening";
                    try {
                        t = this.createTransport(t);
                    } catch (t) {
                        return this.transports.shift(), void this.open();
                    }
                    t.open(), this.setTransport(t);
                }, n.prototype.setTransport = function(t) {
                    a("setting transport %s", t.name);
                    var e = this;
                    this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), 
                    this.transport = t, t.on("drain", function() {
                        e.onDrain();
                    }).on("packet", function(t) {
                        e.onPacket(t);
                    }).on("error", function(t) {
                        e.onError(t);
                    }).on("close", function() {
                        e.onClose("transport close");
                    });
                }, n.prototype.probe = function(t) {
                    function e() {
                        if (p.onlyBinaryUpgrades) {
                            var e = !this.supportsBinary && p.transport.supportsBinary;
                            h = h || e;
                        }
                        h || (a('probe transport "%s" opened', t), f.send([ {
                            type: "ping",
                            data: "probe"
                        } ]), f.once("packet", function(e) {
                            if (!h) if ("pong" === e.type && "probe" === e.data) {
                                if (a('probe transport "%s" pong', t), p.upgrading = !0, p.emit("upgrading", f), 
                                !f) return;
                                n.priorWebsocketSuccess = "websocket" === f.name, a('pausing current transport "%s"', p.transport.name), 
                                p.transport.pause(function() {
                                    h || "closed" !== p.readyState && (a("changing transport and sending upgrade packet"), 
                                    c(), p.setTransport(f), f.send([ {
                                        type: "upgrade"
                                    } ]), p.emit("upgrade", f), f = null, p.upgrading = !1, p.flush());
                                });
                            } else {
                                a('probe transport "%s" failed', t);
                                var r = new Error("probe error");
                                r.transport = f.name, p.emit("upgradeError", r);
                            }
                        }));
                    }
                    function r() {
                        h || (h = !0, c(), f.close(), f = null);
                    }
                    function o(e) {
                        var n = new Error("probe error: " + e);
                        n.transport = f.name, r(), a('probe transport "%s" failed because of error: %s', t, e), 
                        p.emit("upgradeError", n);
                    }
                    function i() {
                        o("transport closed");
                    }
                    function s() {
                        o("socket closed");
                    }
                    function u(t) {
                        f && t.name !== f.name && (a('"%s" works - aborting "%s"', t.name, f.name), r());
                    }
                    function c() {
                        f.removeListener("open", e), f.removeListener("error", o), f.removeListener("close", i), 
                        p.removeListener("close", s), p.removeListener("upgrading", u);
                    }
                    a('probing transport "%s"', t);
                    var f = this.createTransport(t, {
                        probe: 1
                    }), h = !1, p = this;
                    n.priorWebsocketSuccess = !1, f.once("open", e), f.once("error", o), f.once("close", i), 
                    this.once("close", s), this.once("upgrading", u), f.open();
                }, n.prototype.onOpen = function() {
                    if (a("socket open"), this.readyState = "open", n.priorWebsocketSuccess = "websocket" === this.transport.name, 
                    this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
                        a("starting upgrade probes");
                        for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t]);
                    }
                }, n.prototype.onPacket = function(t) {
                    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (a('socket receive: type "%s", data "%s"', t.type, t.data), 
                    this.emit("packet", t), this.emit("heartbeat"), t.type) {
                      case "open":
                        this.onHandshake(JSON.parse(t.data));
                        break;

                      case "pong":
                        this.setPing(), this.emit("pong");
                        break;

                      case "error":
                        var e = new Error("server error");
                        e.code = t.data, this.onError(e);
                        break;

                      case "message":
                        this.emit("data", t.data), this.emit("message", t.data);
                    } else a('packet received with socket readyState "%s"', this.readyState);
                }, n.prototype.onHandshake = function(t) {
                    this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), 
                    this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), 
                    "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), 
                    this.on("heartbeat", this.onHeartbeat));
                }, n.prototype.onHeartbeat = function(t) {
                    clearTimeout(this.pingTimeoutTimer);
                    var e = this;
                    e.pingTimeoutTimer = setTimeout(function() {
                        "closed" !== e.readyState && e.onClose("ping timeout");
                    }, t || e.pingInterval + e.pingTimeout);
                }, n.prototype.setPing = function() {
                    var t = this;
                    clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                        a("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), 
                        t.onHeartbeat(t.pingTimeout);
                    }, t.pingInterval);
                }, n.prototype.ping = function() {
                    var t = this;
                    this.sendPacket("ping", function() {
                        t.emit("ping");
                    });
                }, n.prototype.onDrain = function() {
                    this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
                }, n.prototype.flush = function() {
                    "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), 
                    this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, 
                    this.emit("flush"));
                }, n.prototype.write = n.prototype.send = function(t, e, r) {
                    return this.sendPacket("message", t, e, r), this;
                }, n.prototype.sendPacket = function(t, e, r, n) {
                    if ("function" == typeof e && (n = e, e = void 0), "function" == typeof r && (n = r, 
                    r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                        (r = r || {}).compress = !1 !== r.compress;
                        var o = {
                            type: t,
                            data: e,
                            options: r
                        };
                        this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), 
                        this.flush();
                    }
                }, n.prototype.close = function() {
                    function t() {
                        n.onClose("forced close"), a("socket closing - telling transport to close"), n.transport.close();
                    }
                    function e() {
                        n.removeListener("upgrade", e), n.removeListener("upgradeError", e), t();
                    }
                    function r() {
                        n.once("upgrade", e), n.once("upgradeError", e);
                    }
                    if ("opening" === this.readyState || "open" === this.readyState) {
                        this.readyState = "closing";
                        var n = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? r() : t();
                        }) : this.upgrading ? r() : t();
                    }
                    return this;
                }, n.prototype.onError = function(t) {
                    a("socket error %j", t), n.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t);
                }, n.prototype.onClose = function(t, e) {
                    "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (a('socket close with reason: "%s"', t), 
                    clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), 
                    this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", 
                    this.id = null, this.emit("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0);
                }, n.prototype.filterUpgrades = function(t) {
                    for (var e = [], r = 0, n = t.length; r < n; r++) ~u(this.transports, t[r]) && e.push(t[r]);
                    return e;
                };
            }).call(this, r(0));
        }, function(t, e, r) {
            t.exports = r(28), t.exports.parser = r(1);
        } ]);
    }, function(t, e, r) {
        (function(t) {
            var n = r(2), i = r(9), s = Object.prototype.toString, a = "function" == typeof t.Blob || "[object BlobConstructor]" === s.call(t.Blob), u = "function" == typeof t.File || "[object FileConstructor]" === s.call(t.File);
            e.deconstructPacket = function(t) {
                var e = [], r = t.data, s = t;
                return s.data = function t(e, r) {
                    if (!e) return e;
                    if (i(e)) {
                        var s = {
                            _placeholder: !0,
                            num: r.length
                        };
                        return r.push(e), s;
                    }
                    if (n(e)) {
                        for (var a = new Array(e.length), u = 0; u < e.length; u++) a[u] = t(e[u], r);
                        return a;
                    }
                    if ("object" == (void 0 === e ? "undefined" : o(e)) && !(e instanceof Date)) {
                        a = {};
                        for (var c in e) a[c] = t(e[c], r);
                        return a;
                    }
                    return e;
                }(r, e), s.attachments = e.length, {
                    packet: s,
                    buffers: e
                };
            }, e.reconstructPacket = function(t, e) {
                return t.data = function t(e, r) {
                    if (!e) return e;
                    if (e && e._placeholder) return r[e.num];
                    if (n(e)) for (var i = 0; i < e.length; i++) e[i] = t(e[i], r); else if ("object" == (void 0 === e ? "undefined" : o(e))) for (var s in e) e[s] = t(e[s], r);
                    return e;
                }(t.data, e), t.attachments = void 0, t;
            }, e.removeBlobs = function(t, e) {
                var r = 0, s = t;
                !function t(c, f, h) {
                    if (!c) return c;
                    if (a && c instanceof Blob || u && c instanceof File) {
                        r++;
                        var p = new FileReader();
                        p.onload = function() {
                            h ? h[f] = this.result : s = this.result, --r || e(s);
                        }, p.readAsArrayBuffer(c);
                    } else if (n(c)) for (var l = 0; l < c.length; l++) t(c[l], l, c); else if ("object" == (void 0 === c ? "undefined" : o(c)) && !i(c)) for (var d in c) t(c[d], d, c);
                }(s), r || e(s);
            };
        }).call(this, r(1));
    }, function(t, e) {
        var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, n = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
        t.exports = function(t) {
            var e = t, o = t.indexOf("["), i = t.indexOf("]");
            -1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(i, t.length));
            for (var s = r.exec(t || ""), a = {}, u = 14; u--; ) a[n[u]] = s[u] || "";
            return -1 != o && -1 != i && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), 
            a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
            a.ipv6uri = !0), a;
        };
    }, function(t, e, r) {
        (function(e) {
            var n = r(21), o = r(0)("socket.io-client:url");
            t.exports = function(t, r) {
                var i = t;
                r = r || e.location, null == t && (t = r.protocol + "//" + r.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t), 
                /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), t = void 0 !== r ? r.protocol + "//" + t : "https://" + t), 
                o("parse %s", t), i = n(t)), i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443")), 
                i.path = i.path || "/";
                var s = -1 !== i.host.indexOf(":") ? "[" + i.host + "]" : i.host;
                return i.id = i.protocol + "://" + s + ":" + i.port, i.href = i.protocol + "://" + s + (r && r.port === i.port ? "" : ":" + i.port), 
                i;
            };
        }).call(this, r(1));
    }, function(t, e, r) {
        function n(t, e) {
            "object" == (void 0 === t ? "undefined" : o(t)) && (e = t, t = void 0), e = e || {};
            var r, n = i(t), s = n.source, f = n.id, h = n.path, p = c[f] && h in c[f].nsps;
            return e.forceNew || e["force new connection"] || !1 === e.multiplex || p ? (u("ignoring socket cache for %s", s), 
            r = a(s, e)) : (c[f] || (u("new io instance for %s", s), c[f] = a(s, e)), r = c[f]), 
            n.query && !e.query && (e.query = n.query), r.socket(n.path, e);
        }
        var i = r(22), s = r(4), a = r(8), u = r(0)("socket.io-client");
        t.exports = e = n;
        var c = e.managers = {};
        e.protocol = s.protocol, e.connect = n, e.Manager = r(8), e.Socket = r(7);
    }, function(t, e, r) {
        t.exports = r(23);
    } ]);
});