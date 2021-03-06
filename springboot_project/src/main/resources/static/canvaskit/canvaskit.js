var CanvasKitInit = (function () {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
    return (
        function (CanvasKitInit) {
            CanvasKitInit = CanvasKitInit || {};


            null;
            var r;
            r || (r = typeof CanvasKitInit !== 'undefined' ? CanvasKitInit : {});
            var ca, ea;
            r.ready = new Promise(function (a, b) {
                ca = a;
                ea = b
            });
            (function (a) {
                a.Ud = a.Ud || [];
                a.Ud.push(function () {
                    a.MakeSWCanvasSurface = function (b) {
                        var c = b;
                        if ("CANVAS" !== c.tagName && (c = document.getElementById(b), !c)) throw"Canvas with id " + b + " was not found";
                        if (b = a.MakeSurface(c.width, c.height)) b.Ld = c;
                        return b
                    };
                    a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
                    a.MakeSurface = function (b, c) {
                        var f = {
                            width: b,
                            height: c,
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: a.AlphaType.Unpremul,
                            colorSpace: a.ColorSpace.SRGB
                        }, h = b * c * 4, l = a._malloc(h);
                        if (f = a.Surface._makeRasterDirect(f,
                            l, 4 * b)) f.Ld = null, f.zf = b, f.wf = c, f.yf = h, f.$e = l, f.getCanvas().clear(a.TRANSPARENT);
                        return f
                    };
                    a.MakeRasterDirectSurface = function (b, c, f) {
                        return a.Surface._makeRasterDirect(b, c.byteOffset, f)
                    };
                    a.Surface.prototype.flush = function (b) {
                        a.Nd(this.Md);
                        this._flush();
                        if (this.Ld) {
                            var c = new Uint8ClampedArray(a.HEAPU8.buffer, this.$e, this.yf);
                            c = new ImageData(c, this.zf, this.wf);
                            b ? this.Ld.getContext("2d").putImageData(c, 0, 0, b[0], b[1], b[2] - b[0], b[3] - b[1]) : this.Ld.getContext("2d").putImageData(c, 0, 0)
                        }
                    };
                    a.Surface.prototype.dispose =
                        function () {
                            this.$e && a._free(this.$e);
                            this.delete()
                        };
                    a.Nd = a.Nd || function () {
                    }
                })
            })(r);
            (function (a) {
                a.Ud = a.Ud || [];
                a.Ud.push(function () {
                    function b(c, f, h) {
                        return c && c.hasOwnProperty(f) ? c[f] : h
                    }

                    a.GetWebGLContext = function (c, f) {
                        if (!c) throw"null canvas passed into makeWebGLContext";
                        var h = {
                            alpha: b(f, "alpha", 1),
                            depth: b(f, "depth", 1),
                            stencil: b(f, "stencil", 8),
                            antialias: b(f, "antialias", 0),
                            premultipliedAlpha: b(f, "premultipliedAlpha", 1),
                            preserveDrawingBuffer: b(f, "preserveDrawingBuffer", 0),
                            preferLowPowerToHighPerformance: b(f, "preferLowPowerToHighPerformance", 0),
                            failIfMajorPerformanceCaveat: b(f, "failIfMajorPerformanceCaveat",
                                0),
                            enableExtensionsByDefault: b(f, "enableExtensionsByDefault", 1),
                            explicitSwapControl: b(f, "explicitSwapControl", 0),
                            renderViaOffscreenBackBuffer: b(f, "renderViaOffscreenBackBuffer", 0)
                        };
                        h.majorVersion = f && f.majorVersion ? f.majorVersion : "undefined" !== typeof WebGL2RenderingContext ? 2 : 1;
                        if (h.explicitSwapControl) throw"explicitSwapControl is not supported";
                        c = ha(c, h);
                        if (!c) return 0;
                        ia(c);
                        return c
                    };
                    a.deleteContext = function (c) {
                        v === ma[c] && (v = null);
                        "object" === typeof JSEvents && JSEvents.Eg(ma[c].le.canvas);
                        ma[c] && ma[c].le.canvas &&
                        (ma[c].le.canvas.uf = void 0);
                        ma[c] = null
                    };
                    a._setTextureCleanup({
                        deleteTexture: function (c, f) {
                            var h = na[f];
                            h && ma[c].le.deleteTexture(h);
                            na[f] = null
                        }
                    });
                    a.MakeGrContext = function (c) {
                        if (!this.Nd(c)) return null;
                        var f = this._MakeGrContext();
                        if (!f) return null;
                        f.Md = c;
                        return f
                    };
                    a.MakeOnScreenGLSurface = function (c, f, h, l) {
                        f = this._MakeOnScreenGLSurface(c, f, h, l);
                        if (!f) return null;
                        f.Md = c.Md;
                        return f
                    };
                    a.MakeRenderTarget = function (c, f, h) {
                        f = this._MakeRenderTargetWH(c, f, h);
                        if (!f) return null;
                        f.Md = c.Md;
                        return f
                    };
                    a.MakeRenderTarget =
                        function (c, f) {
                            f = this._MakeRenderTargetII(c, f);
                            if (!f) return null;
                            f.Md = c.Md;
                            return f
                        };
                    a.MakeWebGLCanvasSurface = function (c, f, h) {
                        f = f || null;
                        var l = c, q = "undefined" !== typeof OffscreenCanvas && l instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && l instanceof HTMLCanvasElement || q || (l = document.getElementById(c), l))) throw"Canvas with id " + c + " was not found";
                        c = this.GetWebGLContext(l, h);
                        if (!c || 0 > c) throw"failed to create webgl context: err " + c;
                        c = this.MakeGrContext(c);
                        f = this.MakeOnScreenGLSurface(c,
                            l.width, l.height, f);
                        return f ? f : (f = l.cloneNode(!0), l.parentNode.replaceChild(f, l), f.classList.add("ck-replaced"), a.MakeSWCanvasSurface(f))
                    };
                    a.MakeCanvasSurface = a.MakeWebGLCanvasSurface;
                    a.Surface.prototype.makeImageFromTexture = function (c, f) {
                        f.colorSpace || (f.colorSpace = a.ColorSpace.SRGB);
                        var h = na.length;
                        h || (na.push(null), h = 1);
                        na.push(c);
                        return this._makeImageFromTexture(v.Rf, h, f)
                    };
                    a.Surface.prototype.makeImageFromTextureSource = function (c, f, h) {
                        h = h || c.naturalHeight || c.videoHeight || c.height;
                        f = f || c.naturalWidth ||
                            c.videoWidth || c.width;
                        a.Nd(this.Md);
                        var l = v.le, q = l.createTexture();
                        l.bindTexture(l.TEXTURE_2D, q);
                        2 === v.version ? l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, f, h, 0, l.RGBA, l.UNSIGNED_BYTE, c) : l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, l.RGBA, l.UNSIGNED_BYTE, c);
                        l.bindTexture(l.TEXTURE_2D, null);
                        return this.makeImageFromTexture(q, {
                            height: h,
                            width: f,
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: a.AlphaType.Unpremul,
                            colorSpace: a.ColorSpace.SRGB
                        })
                    };
                    a.Nd = function (c) {
                        return c ? ia(c) : !1
                    }
                })
            })(r);
            (function (a) {
                function b(e, d, g, m, p) {
                    for (var x = 0; x < e.length; x++) d[x * g + (x * p + m + g) % g] = e[x];
                    return d
                }

                function c(e) {
                    for (var d = e * e, g = Array(d); d--;) g[d] = 0 === d % (e + 1) ? 1 : 0;
                    return g
                }

                function f(e) {
                    return e ? e.constructor === Float32Array && 4 === e.length : !1
                }

                function h(e) {
                    return (u(255 * e[3]) << 24 | u(255 * e[0]) << 16 | u(255 * e[1]) << 8 | u(255 * e[2]) << 0) >>> 0
                }

                function l(e) {
                    if (e && e._ck) return e;
                    if (e instanceof Float32Array) {
                        for (var d = Math.floor(e.length / 4), g = new Uint32Array(d), m = 0; m < d; m++) g[m] = h(e.slice(4 * m, 4 * (m + 1)));
                        return g
                    }
                    if (e instanceof
                        Uint32Array) return e;
                    if (e instanceof Array && e[0] instanceof Float32Array) return e.map(h)
                }

                function q(e) {
                    if (void 0 === e) return 1;
                    var d = parseFloat(e);
                    return e && -1 !== e.indexOf("%") ? d / 100 : d
                }

                function u(e) {
                    return Math.round(Math.max(0, Math.min(e || 0, 255)))
                }

                function y(e, d) {
                    d && d._ck || a._free(e)
                }

                function w(e, d, g) {
                    if (!e || !e.length) return S;
                    if (e && e._ck) return e.byteOffset;
                    var m = a[d].BYTES_PER_ELEMENT;
                    g || (g = a._malloc(e.length * m));
                    a[d].set(e, g / m);
                    return g
                }

                function H(e) {
                    var d = {be: S, count: e.length, Je: a.ColorType.RGBA_F32};
                    if (e instanceof Float32Array) d.be = w(e, "HEAPF32"), d.count = e.length / 4; else if (e instanceof Uint32Array) d.be = w(e, "HEAPU32"), d.Je = a.ColorType.RGBA_8888; else if (e instanceof Array) {
                        if (e && e.length) {
                            for (var g = a._malloc(16 * e.length), m = 0, p = g / 4, x = 0; x < e.length; x++) for (var D = 0; 4 > D; D++) a.HEAPF32[p + m] = e[x][D], m++;
                            e = g
                        } else e = S;
                        d.be = e
                    } else throw"Invalid argument to copyFlexibleColorArray, Not a color array " + typeof e;
                    return d
                }

                function K(e) {
                    if (!e) return S;
                    if (e.length) {
                        if (6 === e.length || 9 === e.length) return w(e, "HEAPF32",
                            Na), 6 === e.length && a.HEAPF32.set(Fd, 6 + Na / 4), Na;
                        if (16 === e.length) {
                            var d = Bb.toTypedArray();
                            d[0] = e[0];
                            d[1] = e[1];
                            d[2] = e[3];
                            d[3] = e[4];
                            d[4] = e[5];
                            d[5] = e[7];
                            d[6] = e[12];
                            d[7] = e[13];
                            d[8] = e[15];
                            return Na
                        }
                        throw"invalid matrix size";
                    }
                    d = Bb.toTypedArray();
                    d[0] = e.m11;
                    d[1] = e.m21;
                    d[2] = e.m41;
                    d[3] = e.m12;
                    d[4] = e.m22;
                    d[5] = e.m42;
                    d[6] = e.m14;
                    d[7] = e.m24;
                    d[8] = e.m44;
                    return Na
                }

                function O(e) {
                    if (!e) return S;
                    var d = ec.toTypedArray();
                    if (e.length) {
                        if (16 !== e.length && 6 !== e.length && 9 !== e.length) throw"invalid matrix size";
                        if (16 === e.length) return w(e,
                            "HEAPF32", Oa);
                        d.fill(0);
                        d[0] = e[0];
                        d[1] = e[1];
                        d[3] = e[2];
                        d[4] = e[3];
                        d[5] = e[4];
                        d[7] = e[5];
                        d[12] = e[6];
                        d[13] = e[7];
                        d[15] = e[8];
                        6 === e.length && (d[12] = 0, d[13] = 0, d[15] = 1);
                        return Oa
                    }
                    d[0] = e.m11;
                    d[1] = e.m21;
                    d[2] = e.m31;
                    d[3] = e.m41;
                    d[4] = e.m12;
                    d[5] = e.m22;
                    d[6] = e.m32;
                    d[7] = e.m42;
                    d[8] = e.m13;
                    d[9] = e.m23;
                    d[10] = e.m33;
                    d[11] = e.m43;
                    d[12] = e.m14;
                    d[13] = e.m24;
                    d[14] = e.m34;
                    d[15] = e.m44;
                    return Oa
                }

                function A(e) {
                    for (var d = Array(16), g = 0; 16 > g; g++) d[g] = a.HEAPF32[e / 4 + g];
                    return d
                }

                function M(e, d) {
                    return w(e, "HEAPF32", d || hb)
                }

                function X(e, d, g, m) {
                    var p =
                        fc.toTypedArray();
                    p[0] = e;
                    p[1] = d;
                    p[2] = g;
                    p[3] = m;
                    return hb
                }

                function da(e) {
                    for (var d = new Float32Array(4), g = 0; 4 > g; g++) d[g] = a.HEAPF32[e / 4 + g];
                    return d
                }

                function ba(e, d) {
                    return w(e, "HEAPF32", d || ja)
                }

                function pa(e, d) {
                    return w(e, "HEAPF32", d || hc)
                }

                function ib() {
                    for (var e = 0, d = 0; d < arguments.length - 1; d += 2) e += arguments[d] * arguments[d + 1];
                    return e
                }

                function jb(e, d, g) {
                    for (var m = Array(e.length), p = 0; p < g; p++) for (var x = 0; x < g; x++) {
                        for (var D = 0, J = 0; J < g; J++) D += e[g * p + J] * d[g * J + x];
                        m[p * g + x] = D
                    }
                    return m
                }

                function Lc(e, d) {
                    for (var g = jb(d[0],
                        d[1], e), m = 2; m < d.length;) g = jb(g, d[m], e), m++;
                    return g
                }

                a.Color = function (e, d, g, m) {
                    void 0 === m && (m = 1);
                    return a.Color4f(u(e) / 255, u(d) / 255, u(g) / 255, m)
                };
                a.ColorAsInt = function (e, d, g, m) {
                    void 0 === m && (m = 255);
                    return (u(m) << 24 | u(e) << 16 | u(d) << 8 | u(g) << 0 & 268435455) >>> 0
                };
                a.Color4f = function (e, d, g, m) {
                    void 0 === m && (m = 1);
                    return Float32Array.of(e, d, g, m)
                };
                Object.defineProperty(a, "TRANSPARENT", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 0)
                    }
                });
                Object.defineProperty(a, "BLACK", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 1)
                    }
                });
                Object.defineProperty(a,
                    "WHITE", {
                        get: function () {
                            return a.Color4f(1, 1, 1, 1)
                        }
                    });
                Object.defineProperty(a, "RED", {
                    get: function () {
                        return a.Color4f(1, 0, 0, 1)
                    }
                });
                Object.defineProperty(a, "GREEN", {
                    get: function () {
                        return a.Color4f(0, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "BLUE", {
                    get: function () {
                        return a.Color4f(0, 0, 1, 1)
                    }
                });
                Object.defineProperty(a, "YELLOW", {
                    get: function () {
                        return a.Color4f(1, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "CYAN", {
                    get: function () {
                        return a.Color4f(0, 1, 1, 1)
                    }
                });
                Object.defineProperty(a, "MAGENTA", {
                    get: function () {
                        return a.Color4f(1,
                            0, 1, 1)
                    }
                });
                a.getColorComponents = function (e) {
                    return [Math.floor(255 * e[0]), Math.floor(255 * e[1]), Math.floor(255 * e[2]), e[3]]
                };
                a.parseColorString = function (e, d) {
                    e = e.toLowerCase();
                    if (e.startsWith("#")) {
                        d = 255;
                        switch (e.length) {
                            case 9:
                                d = parseInt(e.slice(7, 9), 16);
                            case 7:
                                var g = parseInt(e.slice(1, 3), 16);
                                var m = parseInt(e.slice(3, 5), 16);
                                var p = parseInt(e.slice(5, 7), 16);
                                break;
                            case 5:
                                d = 17 * parseInt(e.slice(4, 5), 16);
                            case 4:
                                g = 17 * parseInt(e.slice(1, 2), 16), m = 17 * parseInt(e.slice(2, 3), 16), p = 17 * parseInt(e.slice(3, 4), 16)
                        }
                        return a.Color(g,
                            m, p, d / 255)
                    }
                    return e.startsWith("rgba") ? (e = e.slice(5, -1), e = e.split(","), a.Color(+e[0], +e[1], +e[2], q(e[3]))) : e.startsWith("rgb") ? (e = e.slice(4, -1), e = e.split(","), a.Color(+e[0], +e[1], +e[2], q(e[3]))) : e.startsWith("gray(") || e.startsWith("hsl") || !d || (e = d[e], void 0 === e) ? a.BLACK : e
                };
                a.multiplyByAlpha = function (e, d) {
                    e = e.slice();
                    e[3] = Math.max(0, Math.min(e[3] * d, 1));
                    return e
                };
                a.Malloc = function (e, d) {
                    var g = a._malloc(d * e.BYTES_PER_ELEMENT);
                    return {
                        _ck: !0, length: d, byteOffset: g, ne: null, subarray: function (m, p) {
                            m = this.toTypedArray().subarray(m,
                                p);
                            m._ck = !0;
                            return m
                        }, toTypedArray: function () {
                            if (this.ne && this.ne.length) return this.ne;
                            this.ne = new e(a.HEAPU8.buffer, g, d);
                            this.ne._ck = !0;
                            return this.ne
                        }
                    }
                };
                a.Free = function (e) {
                    a._free(e.byteOffset);
                    e.byteOffset = S;
                    e.toTypedArray = null;
                    e.ne = null
                };
                var Na = S, Bb, Oa = S, ec, hb = S, fc, Ha, ja = S, Mc, Va = S, Nc, ic = S, Oc, jc = S, Pc, kc = S, Qc,
                    hc = S, Rc, Sc = S, Fd = Float32Array.of(0, 0, 1), S = 0;
                a.onRuntimeInitialized = function () {
                    function e(d, g, m, p, x, D) {
                        D || (D = 4 * p.width, p.colorType === a.ColorType.RGBA_F16 ? D *= 2 : p.colorType === a.ColorType.RGBA_F32 &&
                            (D *= 4));
                        var J = D * p.height;
                        var N = x ? x.byteOffset : a._malloc(J);
                        if (!d._readPixels(p, N, D, g, m)) return x || a._free(N), null;
                        if (x) return x.toTypedArray();
                        switch (p.colorType) {
                            case a.ColorType.RGBA_8888:
                            case a.ColorType.RGBA_F16:
                                d = (new Uint8Array(a.HEAPU8.buffer, N, J)).slice();
                                break;
                            case a.ColorType.RGBA_F32:
                                d = (new Float32Array(a.HEAPU8.buffer, N, J)).slice();
                                break;
                            default:
                                return null
                        }
                        a._free(N);
                        return d
                    }

                    fc = a.Malloc(Float32Array, 4);
                    hb = fc.byteOffset;
                    ec = a.Malloc(Float32Array, 16);
                    Oa = ec.byteOffset;
                    Bb = a.Malloc(Float32Array,
                        9);
                    Na = Bb.byteOffset;
                    Qc = a.Malloc(Float32Array, 12);
                    hc = Qc.byteOffset;
                    Rc = a.Malloc(Float32Array, 12);
                    Sc = Rc.byteOffset;
                    Ha = a.Malloc(Float32Array, 4);
                    ja = Ha.byteOffset;
                    Mc = a.Malloc(Float32Array, 4);
                    Va = Mc.byteOffset;
                    Nc = a.Malloc(Float32Array, 3);
                    ic = Nc.byteOffset;
                    Oc = a.Malloc(Float32Array, 3);
                    jc = Oc.byteOffset;
                    Pc = a.Malloc(Int32Array, 4);
                    kc = Pc.byteOffset;
                    a.ColorSpace.SRGB = a.ColorSpace._MakeSRGB();
                    a.ColorSpace.DISPLAY_P3 = a.ColorSpace._MakeDisplayP3();
                    a.ColorSpace.ADOBE_RGB = a.ColorSpace._MakeAdobeRGB();
                    a.GlyphRunFlags = {IsWhiteSpace: a._GlyphRunFlags_isWhiteSpace};
                    a.Path.MakeFromCmds = function (d) {
                        var g = w(d, "HEAPF32"), m = a.Path._MakeFromCmds(g, d.length);
                        y(g, d);
                        return m
                    };
                    a.Path.MakeFromVerbsPointsWeights = function (d, g, m) {
                        var p = w(d, "HEAPU8"), x = w(g, "HEAPF32"), D = w(m, "HEAPF32"),
                            J = a.Path._MakeFromVerbsPointsWeights(p, d.length, x, g.length, D, m && m.length || 0);
                        y(p, d);
                        y(x, g);
                        y(D, m);
                        return J
                    };
                    a.Path.prototype.addArc = function (d, g, m) {
                        d = ba(d);
                        this._addArc(d, g, m);
                        return this
                    };
                    a.Path.prototype.addOval = function (d, g, m) {
                        void 0 === m && (m = 1);
                        d = ba(d);
                        this._addOval(d, !!g, m);
                        return this
                    };
                    a.Path.prototype.addPath = function () {
                        var d = Array.prototype.slice.call(arguments), g = d[0], m = !1;
                        "boolean" === typeof d[d.length - 1] && (m = d.pop());
                        if (1 === d.length) this._addPath(g, 1, 0, 0, 0, 1, 0, 0, 0, 1, m); else if (2 === d.length) d = d[1], this._addPath(g, d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1, m); else if (7 === d.length || 10 === d.length) this._addPath(g, d[1], d[2], d[3], d[4], d[5], d[6], d[7] || 0, d[8] || 0, d[9] || 1, m); else return null;
                        return this
                    };
                    a.Path.prototype.addPoly = function (d, g) {
                        var m = w(d, "HEAPF32");
                        this._addPoly(m,
                            d.length / 2, g);
                        y(m, d);
                        return this
                    };
                    a.Path.prototype.addRect = function (d, g) {
                        d = ba(d);
                        this._addRect(d, !!g);
                        return this
                    };
                    a.Path.prototype.addRRect = function (d, g) {
                        d = pa(d);
                        this._addRRect(d, !!g);
                        return this
                    };
                    a.Path.prototype.addVerbsPointsWeights = function (d, g, m) {
                        var p = w(d, "HEAPU8"), x = w(g, "HEAPF32"), D = w(m, "HEAPF32");
                        this._addVerbsPointsWeights(p, d.length, x, g.length, D, m && m.length || 0);
                        y(p, d);
                        y(x, g);
                        y(D, m)
                    };
                    a.Path.prototype.arc = function (d, g, m, p, x, D) {
                        d = a.LTRBRect(d - m, g - m, d + m, g + m);
                        x = (x - p) / Math.PI * 180 - 360 * !!D;
                        D = new a.Path;
                        D.addArc(d, p / Math.PI * 180, x);
                        this.addPath(D, !0);
                        D.delete();
                        return this
                    };
                    a.Path.prototype.arcToOval = function (d, g, m, p) {
                        d = ba(d);
                        this._arcToOval(d, g, m, p);
                        return this
                    };
                    a.Path.prototype.arcToRotated = function (d, g, m, p, x, D, J) {
                        this._arcToRotated(d, g, m, !!p, !!x, D, J);
                        return this
                    };
                    a.Path.prototype.arcToTangent = function (d, g, m, p, x) {
                        this._arcToTangent(d, g, m, p, x);
                        return this
                    };
                    a.Path.prototype.close = function () {
                        this._close();
                        return this
                    };
                    a.Path.prototype.conicTo = function (d, g, m, p, x) {
                        this._conicTo(d, g, m, p, x);
                        return this
                    };
                    a.Path.prototype.computeTightBounds = function (d) {
                        this._computeTightBounds(ja);
                        var g = Ha.toTypedArray();
                        return d ? (d.set(g), d) : g.slice()
                    };
                    a.Path.prototype.cubicTo = function (d, g, m, p, x, D) {
                        this._cubicTo(d, g, m, p, x, D);
                        return this
                    };
                    a.Path.prototype.dash = function (d, g, m) {
                        return this._dash(d, g, m) ? this : null
                    };
                    a.Path.prototype.getBounds = function (d) {
                        this._getBounds(ja);
                        var g = Ha.toTypedArray();
                        return d ? (d.set(g), d) : g.slice()
                    };
                    a.Path.prototype.lineTo = function (d, g) {
                        this._lineTo(d, g);
                        return this
                    };
                    a.Path.prototype.moveTo =
                        function (d, g) {
                            this._moveTo(d, g);
                            return this
                        };
                    a.Path.prototype.offset = function (d, g) {
                        this._transform(1, 0, d, 0, 1, g, 0, 0, 1);
                        return this
                    };
                    a.Path.prototype.quadTo = function (d, g, m, p) {
                        this._quadTo(d, g, m, p);
                        return this
                    };
                    a.Path.prototype.rArcTo = function (d, g, m, p, x, D, J) {
                        this._rArcTo(d, g, m, p, x, D, J);
                        return this
                    };
                    a.Path.prototype.rConicTo = function (d, g, m, p, x) {
                        this._rConicTo(d, g, m, p, x);
                        return this
                    };
                    a.Path.prototype.rCubicTo = function (d, g, m, p, x, D) {
                        this._rCubicTo(d, g, m, p, x, D);
                        return this
                    };
                    a.Path.prototype.rLineTo = function (d,
                                                         g) {
                        this._rLineTo(d, g);
                        return this
                    };
                    a.Path.prototype.rMoveTo = function (d, g) {
                        this._rMoveTo(d, g);
                        return this
                    };
                    a.Path.prototype.rQuadTo = function (d, g, m, p) {
                        this._rQuadTo(d, g, m, p);
                        return this
                    };
                    a.Path.prototype.stroke = function (d) {
                        d = d || {};
                        d.width = d.width || 1;
                        d.miter_limit = d.miter_limit || 4;
                        d.cap = d.cap || a.StrokeCap.Butt;
                        d.join = d.join || a.StrokeJoin.Miter;
                        d.precision = d.precision || 1;
                        return this._stroke(d) ? this : null
                    };
                    a.Path.prototype.transform = function () {
                        if (1 === arguments.length) {
                            var d = arguments[0];
                            this._transform(d[0],
                                d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1)
                        } else if (6 === arguments.length || 9 === arguments.length) d = arguments, this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1); else throw"transform expected to take 1 or 9 arguments. Got " + arguments.length;
                        return this
                    };
                    a.Path.prototype.trim = function (d, g, m) {
                        return this._trim(d, g, !!m) ? this : null
                    };
                    a.Image.prototype.makeShaderCubic = function (d, g, m, p, x) {
                        x = K(x);
                        return this._makeShaderCubic(d, g, m, p, x)
                    };
                    a.Image.prototype.makeShaderOptions = function (d,
                                                                    g, m, p, x) {
                        x = K(x);
                        return this._makeShaderOptions(d, g, m, p, x)
                    };
                    a.Image.prototype.readPixels = function (d, g, m, p, x) {
                        return e(this, d, g, m, p, x)
                    };
                    a.Canvas.prototype.clear = function (d) {
                        a.Nd(this.Md);
                        d = M(d);
                        this._clear(d)
                    };
                    a.Canvas.prototype.clipRRect = function (d, g, m) {
                        a.Nd(this.Md);
                        d = pa(d);
                        this._clipRRect(d, g, m)
                    };
                    a.Canvas.prototype.clipRect = function (d, g, m) {
                        a.Nd(this.Md);
                        d = ba(d);
                        this._clipRect(d, g, m)
                    };
                    a.Canvas.prototype.concat = function (d) {
                        a.Nd(this.Md);
                        d = O(d);
                        this._concat(d)
                    };
                    a.Canvas.prototype.drawArc = function (d,
                                                           g, m, p, x) {
                        a.Nd(this.Md);
                        d = ba(d);
                        this._drawArc(d, g, m, p, x)
                    };
                    a.Canvas.prototype.drawAtlas = function (d, g, m, p, x, D, J) {
                        if (d && p && g && m && g.length === m.length) {
                            a.Nd(this.Md);
                            x || (x = a.BlendMode.SrcOver);
                            var N = w(g, "HEAPF32"), Q = w(m, "HEAPF32"), T = m.length / 4, t = w(l(D), "HEAPU32");
                            if (J && "B" in J && "C" in J) this._drawAtlasCubic(d, Q, N, t, T, x, J.B, J.C, p); else {
                                let I = a.FilterMode.Linear, R = a.MipmapMode.None;
                                J && (I = J.filter, "mipmap" in J && (R = J.mipmap));
                                this._drawAtlasOptions(d, Q, N, t, T, x, I, R, p)
                            }
                            y(N, g);
                            y(Q, m);
                            y(t, D)
                        }
                    };
                    a.Canvas.prototype.drawCircle =
                        function (d, g, m, p) {
                            a.Nd(this.Md);
                            this._drawCircle(d, g, m, p)
                        };
                    a.Canvas.prototype.drawColor = function (d, g) {
                        a.Nd(this.Md);
                        d = M(d);
                        void 0 !== g ? this._drawColor(d, g) : this._drawColor(d)
                    };
                    a.Canvas.prototype.drawColorInt = function (d, g) {
                        a.Nd(this.Md);
                        this._drawColorInt(d, g || a.BlendMode.SrcOver)
                    };
                    a.Canvas.prototype.drawColorComponents = function (d, g, m, p, x) {
                        a.Nd(this.Md);
                        d = X(d, g, m, p);
                        void 0 !== x ? this._drawColor(d, x) : this._drawColor(d)
                    };
                    a.Canvas.prototype.drawDRRect = function (d, g, m) {
                        a.Nd(this.Md);
                        d = pa(d, hc);
                        g = pa(g, Sc);
                        this._drawDRRect(d, g, m)
                    };
                    a.Canvas.prototype.drawGlyphs = function (d, g, m, p, x, D) {
                        if (!(2 * d.length <= g.length)) throw"Not enough positions for the array of gyphs";
                        a.Nd(this.Md);
                        const J = w(d, "HEAPU16"), N = w(g, "HEAPF32");
                        this._drawGlyphs(d.length, J, N, m, p, x, D);
                        y(N, g);
                        y(J, d)
                    };
                    a.Canvas.prototype.drawImage = function (d, g, m, p) {
                        a.Nd(this.Md);
                        this._drawImage(d, g, m, p || null)
                    };
                    a.Canvas.prototype.drawImageCubic = function (d, g, m, p, x, D) {
                        a.Nd(this.Md);
                        this._drawImageCubic(d, g, m, p, x, D || null)
                    };
                    a.Canvas.prototype.drawImageOptions =
                        function (d, g, m, p, x, D) {
                            a.Nd(this.Md);
                            this._drawImageOptions(d, g, m, p, x, D || null)
                        };
                    a.Canvas.prototype.drawImageNine = function (d, g, m, p, x) {
                        a.Nd(this.Md);
                        g = w(g, "HEAP32", kc);
                        m = ba(m);
                        this._drawImageNine(d, g, m, p, x || null)
                    };
                    a.Canvas.prototype.drawImageRect = function (d, g, m, p, x) {
                        a.Nd(this.Md);
                        ba(g, ja);
                        ba(m, Va);
                        this._drawImageRect(d, ja, Va, p, !!x)
                    };
                    a.Canvas.prototype.drawImageRectCubic = function (d, g, m, p, x, D) {
                        a.Nd(this.Md);
                        ba(g, ja);
                        ba(m, Va);
                        this._drawImageRectCubic(d, ja, Va, p, x, D || null)
                    };
                    a.Canvas.prototype.drawImageRectOptions =
                        function (d, g, m, p, x, D) {
                            a.Nd(this.Md);
                            ba(g, ja);
                            ba(m, Va);
                            this._drawImageRectOptions(d, ja, Va, p, x, D || null)
                        };
                    a.Canvas.prototype.drawLine = function (d, g, m, p, x) {
                        a.Nd(this.Md);
                        this._drawLine(d, g, m, p, x)
                    };
                    a.Canvas.prototype.drawOval = function (d, g) {
                        a.Nd(this.Md);
                        d = ba(d);
                        this._drawOval(d, g)
                    };
                    a.Canvas.prototype.drawPaint = function (d) {
                        a.Nd(this.Md);
                        this._drawPaint(d)
                    };
                    a.Canvas.prototype.drawParagraph = function (d, g, m) {
                        a.Nd(this.Md);
                        this._drawParagraph(d, g, m)
                    };
                    a.Canvas.prototype.drawPatch = function (d, g, m, p, x) {
                        if (24 > d.length) throw"Need 12 cubic points";
                        if (g && 4 > g.length) throw"Need 4 colors";
                        if (m && 8 > m.length) throw"Need 4 shader coordinates";
                        a.Nd(this.Md);
                        const D = w(d, "HEAPF32"), J = g ? w(l(g), "HEAPU32") : S, N = m ? w(m, "HEAPF32") : S;
                        p || (p = a.BlendMode.Modulate);
                        this._drawPatch(D, J, N, p, x);
                        y(N, m);
                        y(J, g);
                        y(D, d)
                    };
                    a.Canvas.prototype.drawPath = function (d, g) {
                        a.Nd(this.Md);
                        this._drawPath(d, g)
                    };
                    a.Canvas.prototype.drawPicture = function (d) {
                        a.Nd(this.Md);
                        this._drawPicture(d)
                    };
                    a.Canvas.prototype.drawPoints = function (d, g, m) {
                        a.Nd(this.Md);
                        var p = w(g, "HEAPF32");
                        this._drawPoints(d,
                            p, g.length / 2, m);
                        y(p, g)
                    };
                    a.Canvas.prototype.drawRRect = function (d, g) {
                        a.Nd(this.Md);
                        d = pa(d);
                        this._drawRRect(d, g)
                    };
                    a.Canvas.prototype.drawRect = function (d, g) {
                        a.Nd(this.Md);
                        d = ba(d);
                        this._drawRect(d, g)
                    };
                    a.Canvas.prototype.drawRect4f = function (d, g, m, p, x) {
                        a.Nd(this.Md);
                        this._drawRect4f(d, g, m, p, x)
                    };
                    a.Canvas.prototype.drawShadow = function (d, g, m, p, x, D, J) {
                        a.Nd(this.Md);
                        var N = w(x, "HEAPF32"), Q = w(D, "HEAPF32");
                        g = w(g, "HEAPF32", ic);
                        m = w(m, "HEAPF32", jc);
                        this._drawShadow(d, g, m, p, N, Q, J);
                        y(N, x);
                        y(Q, D)
                    };
                    a.getShadowLocalBounds =
                        function (d, g, m, p, x, D, J) {
                            d = K(d);
                            m = w(m, "HEAPF32", ic);
                            p = w(p, "HEAPF32", jc);
                            if (!this._getShadowLocalBounds(d, g, m, p, x, D, ja)) return null;
                            g = Ha.toTypedArray();
                            return J ? (J.set(g), J) : g.slice()
                        };
                    a.Canvas.prototype.drawTextBlob = function (d, g, m, p) {
                        a.Nd(this.Md);
                        this._drawTextBlob(d, g, m, p)
                    };
                    a.Canvas.prototype.drawVertices = function (d, g, m) {
                        a.Nd(this.Md);
                        this._drawVertices(d, g, m)
                    };
                    a.Canvas.prototype.getLocalToDevice = function () {
                        this._getLocalToDevice(Oa);
                        return A(Oa)
                    };
                    a.Canvas.prototype.findMarkedCTM = function (d) {
                        return this._findMarkedCTM(d,
                            Oa) ? A(Oa) : null
                    };
                    a.Canvas.prototype.getTotalMatrix = function () {
                        this._getTotalMatrix(Na);
                        for (var d = Array(9), g = 0; 9 > g; g++) d[g] = a.HEAPF32[Na / 4 + g];
                        return d
                    };
                    a.Canvas.prototype.makeSurface = function (d) {
                        d = this._makeSurface(d);
                        d.Md = this.Md;
                        return d
                    };
                    a.Canvas.prototype.readPixels = function (d, g, m, p, x) {
                        a.Nd(this.Md);
                        return e(this, d, g, m, p, x)
                    };
                    a.Canvas.prototype.saveLayer = function (d, g, m, p) {
                        g = ba(g);
                        return this._saveLayer(d || null, g, m || null, p || 0)
                    };
                    a.Canvas.prototype.writePixels = function (d, g, m, p, x, D, J, N) {
                        if (d.byteLength %
                            (g * m)) throw"pixels length must be a multiple of the srcWidth * srcHeight";
                        a.Nd(this.Md);
                        var Q = d.byteLength / (g * m);
                        D = D || a.AlphaType.Unpremul;
                        J = J || a.ColorType.RGBA_8888;
                        N = N || a.ColorSpace.SRGB;
                        var T = Q * g;
                        Q = w(d, "HEAPU8");
                        g = this._writePixels({
                            width: g,
                            height: m,
                            colorType: J,
                            alphaType: D,
                            colorSpace: N
                        }, Q, T, p, x);
                        y(Q, d);
                        return g
                    };
                    a.ColorFilter.MakeBlend = function (d, g) {
                        d = M(d);
                        return a.ColorFilter._MakeBlend(d, g)
                    };
                    a.ColorFilter.MakeMatrix = function (d) {
                        if (!d || 20 !== d.length) throw"invalid color matrix";
                        var g = w(d, "HEAPF32"),
                            m = a.ColorFilter._makeMatrix(g);
                        y(g, d);
                        return m
                    };
                    a.ContourMeasure.prototype.getPosTan = function (d, g) {
                        this._getPosTan(d, ja);
                        d = Ha.toTypedArray();
                        return g ? (g.set(d), g) : d.slice()
                    };
                    a.ImageFilter.MakeMatrixTransform = function (d, g, m) {
                        d = K(d);
                        if ("B" in g && "C" in g) return a.ImageFilter._MakeMatrixTransformCubic(d, g.xg, g.yg, m);
                        const p = g.filter;
                        let x = a.MipmapMode.None;
                        "mipmap" in g && (x = g.mipmap);
                        return a.ImageFilter._MakeMatrixTransformOptions(d, p, x, m)
                    };
                    a.Paint.prototype.getColor = function () {
                        this._getColor(hb);
                        return da(hb)
                    };
                    a.Paint.prototype.setColor = function (d, g) {
                        g = g || null;
                        d = M(d);
                        this._setColor(d, g)
                    };
                    a.Paint.prototype.setColorComponents = function (d, g, m, p, x) {
                        x = x || null;
                        d = X(d, g, m, p);
                        this._setColor(d, x)
                    };
                    a.Path.prototype.getPoint = function (d, g) {
                        this._getPoint(d, ja);
                        d = Ha.toTypedArray();
                        return g ? (g[0] = d[0], g[1] = d[1], g) : d.slice(0, 2)
                    };
                    a.PictureRecorder.prototype.beginRecording = function (d) {
                        d = ba(d);
                        return this._beginRecording(d)
                    };
                    a.Surface.prototype.getCanvas = function () {
                        var d = this._getCanvas();
                        d.Md = this.Md;
                        return d
                    };
                    a.Surface.prototype.makeImageSnapshot =
                        function (d) {
                            d = w(d, "HEAP32", kc);
                            return this._makeImageSnapshot(d)
                        };
                    a.Surface.prototype.makeSurface = function (d) {
                        d = this._makeSurface(d);
                        d.Md = this.Md;
                        return d
                    };
                    a.Surface.prototype.requestAnimationFrame = function (d, g) {
                        this.Fe || (this.Fe = this.getCanvas());
                        requestAnimationFrame(function () {
                            a.Nd(this.Md);
                            d(this.Fe);
                            this.flush(g)
                        }.bind(this))
                    };
                    a.Surface.prototype.drawOnce = function (d, g) {
                        this.Fe || (this.Fe = this.getCanvas());
                        requestAnimationFrame(function () {
                            a.Nd(this.Md);
                            d(this.Fe);
                            this.flush(g);
                            this.dispose()
                        }.bind(this))
                    };
                    a.PathEffect.MakeDash = function (d, g) {
                        g || (g = 0);
                        if (!d.length || 1 === d.length % 2) throw"Intervals array must have even length";
                        var m = w(d, "HEAPF32");
                        g = a.PathEffect._MakeDash(m, d.length, g);
                        y(m, d);
                        return g
                    };
                    a.Shader.MakeColor = function (d, g) {
                        g = g || null;
                        d = M(d);
                        return a.Shader._MakeColor(d, g)
                    };
                    a.Shader.Blend = a.Shader.MakeBlend;
                    a.Shader.Color = a.Shader.MakeColor;
                    a.Shader.MakeLinearGradient = function (d, g, m, p, x, D, J, N) {
                        N = N || null;
                        var Q = H(m), T = w(p, "HEAPF32");
                        J = J || 0;
                        D = K(D);
                        var t = Ha.toTypedArray();
                        t.set(d);
                        t.set(g, 2);
                        d = a.Shader._MakeLinearGradient(ja,
                            Q.be, Q.Je, T, Q.count, x, J, D, N);
                        y(Q.be, m);
                        p && y(T, p);
                        return d
                    };
                    a.Shader.MakeRadialGradient = function (d, g, m, p, x, D, J, N) {
                        N = N || null;
                        var Q = H(m), T = w(p, "HEAPF32");
                        J = J || 0;
                        D = K(D);
                        d = a.Shader._MakeRadialGradient(d[0], d[1], g, Q.be, Q.Je, T, Q.count, x, J, D, N);
                        y(Q.be, m);
                        p && y(T, p);
                        return d
                    };
                    a.Shader.MakeSweepGradient = function (d, g, m, p, x, D, J, N, Q, T) {
                        T = T || null;
                        var t = H(m), I = w(p, "HEAPF32");
                        J = J || 0;
                        N = N || 0;
                        Q = Q || 360;
                        D = K(D);
                        d = a.Shader._MakeSweepGradient(d, g, t.be, t.Je, I, t.count, x, N, Q, J, D, T);
                        y(t.be, m);
                        p && y(I, p);
                        return d
                    };
                    a.Shader.MakeTwoPointConicalGradient =
                        function (d, g, m, p, x, D, J, N, Q, T) {
                            T = T || null;
                            var t = H(x), I = w(D, "HEAPF32");
                            Q = Q || 0;
                            N = K(N);
                            var R = Ha.toTypedArray();
                            R.set(d);
                            R.set(m, 2);
                            d = a.Shader._MakeTwoPointConicalGradient(ja, g, p, t.be, t.Je, I, t.count, J, Q, N, T);
                            y(t.be, x);
                            D && y(I, D);
                            return d
                        };
                    a.Vertices.prototype.bounds = function (d) {
                        this._bounds(ja);
                        var g = Ha.toTypedArray();
                        return d ? (d.set(g), d) : g.slice()
                    };
                    a.Ud && a.Ud.forEach(function (d) {
                        d()
                    })
                };
                a.computeTonalColors = function (e) {
                    var d = w(e.ambient, "HEAPF32"), g = w(e.spot, "HEAPF32");
                    this._computeTonalColors(d, g);
                    var m =
                        {ambient: da(d), spot: da(g)};
                    y(d, e.ambient);
                    y(g, e.spot);
                    return m
                };
                a.LTRBRect = function (e, d, g, m) {
                    return Float32Array.of(e, d, g, m)
                };
                a.XYWHRect = function (e, d, g, m) {
                    return Float32Array.of(e, d, e + g, d + m)
                };
                a.LTRBiRect = function (e, d, g, m) {
                    return Int32Array.of(e, d, g, m)
                };
                a.XYWHiRect = function (e, d, g, m) {
                    return Int32Array.of(e, d, e + g, d + m)
                };
                a.RRectXY = function (e, d, g) {
                    return Float32Array.of(e[0], e[1], e[2], e[3], d, g, d, g, d, g, d, g)
                };
                a.MakeAnimatedImageFromEncoded = function (e) {
                    e = new Uint8Array(e);
                    var d = a._malloc(e.byteLength);
                    a.HEAPU8.set(e,
                        d);
                    return (e = a._decodeAnimatedImage(d, e.byteLength)) ? e : null
                };
                a.MakeImageFromEncoded = function (e) {
                    e = new Uint8Array(e);
                    var d = a._malloc(e.byteLength);
                    a.HEAPU8.set(e, d);
                    return (e = a._decodeImage(d, e.byteLength)) ? e : null
                };
                var kb = null;
                a.MakeImageFromCanvasImageSource = function (e) {
                    var d = e.width, g = e.height;
                    kb || (kb = document.createElement("canvas"));
                    kb.width = d;
                    kb.height = g;
                    var m = kb.getContext("2d");
                    m.drawImage(e, 0, 0);
                    e = m.getImageData(0, 0, d, g);
                    return a.MakeImage({
                        width: d, height: g, alphaType: a.AlphaType.Unpremul, colorType: a.ColorType.RGBA_8888,
                        colorSpace: a.ColorSpace.SRGB
                    }, e.data, 4 * d)
                };
                a.MakeImage = function (e, d, g) {
                    var m = a._malloc(d.length);
                    a.HEAPU8.set(d, m);
                    return a._MakeImage(e, m, d.length, g)
                };
                a.MakeVertices = function (e, d, g, m, p, x) {
                    var D = p && p.length || 0, J = 0;
                    g && g.length && (J |= 1);
                    m && m.length && (J |= 2);
                    void 0 === x || x || (J |= 4);
                    e = new a._VerticesBuilder(e, d.length / 2, D, J);
                    w(d, "HEAPF32", e.positions());
                    e.texCoords() && w(g, "HEAPF32", e.texCoords());
                    e.colors() && w(l(m), "HEAPU32", e.colors());
                    e.indices() && w(p, "HEAPU16", e.indices());
                    return e.detach()
                };
                a.Matrix =
                    {};
                a.Matrix.identity = function () {
                    return c(3)
                };
                a.Matrix.invert = function (e) {
                    var d = e[0] * e[4] * e[8] + e[1] * e[5] * e[6] + e[2] * e[3] * e[7] - e[2] * e[4] * e[6] - e[1] * e[3] * e[8] - e[0] * e[5] * e[7];
                    return d ? [(e[4] * e[8] - e[5] * e[7]) / d, (e[2] * e[7] - e[1] * e[8]) / d, (e[1] * e[5] - e[2] * e[4]) / d, (e[5] * e[6] - e[3] * e[8]) / d, (e[0] * e[8] - e[2] * e[6]) / d, (e[2] * e[3] - e[0] * e[5]) / d, (e[3] * e[7] - e[4] * e[6]) / d, (e[1] * e[6] - e[0] * e[7]) / d, (e[0] * e[4] - e[1] * e[3]) / d] : null
                };
                a.Matrix.mapPoints = function (e, d) {
                    for (var g = 0; g < d.length; g += 2) {
                        var m = d[g], p = d[g + 1], x = e[6] * m + e[7] * p + e[8],
                            D = e[3] * m + e[4] * p + e[5];
                        d[g] = (e[0] * m + e[1] * p + e[2]) / x;
                        d[g + 1] = D / x
                    }
                    return d
                };
                a.Matrix.multiply = function () {
                    return Lc(3, arguments)
                };
                a.Matrix.rotated = function (e, d, g) {
                    d = d || 0;
                    g = g || 0;
                    var m = Math.sin(e);
                    e = Math.cos(e);
                    return [e, -m, ib(m, g, 1 - e, d), m, e, ib(-m, d, 1 - e, g), 0, 0, 1]
                };
                a.Matrix.scaled = function (e, d, g, m) {
                    g = g || 0;
                    m = m || 0;
                    var p = b([e, d], c(3), 3, 0, 1);
                    return b([g - e * g, m - d * m], p, 3, 2, 0)
                };
                a.Matrix.skewed = function (e, d, g, m) {
                    g = g || 0;
                    m = m || 0;
                    var p = b([e, d], c(3), 3, 1, -1);
                    return b([-e * g, -d * m], p, 3, 2, 0)
                };
                a.Matrix.translated = function (e, d) {
                    return b(arguments,
                        c(3), 3, 2, 0)
                };
                a.Vector = {};
                a.Vector.dot = function (e, d) {
                    return e.map(function (g, m) {
                        return g * d[m]
                    }).reduce(function (g, m) {
                        return g + m
                    })
                };
                a.Vector.lengthSquared = function (e) {
                    return a.Vector.dot(e, e)
                };
                a.Vector.length = function (e) {
                    return Math.sqrt(a.Vector.lengthSquared(e))
                };
                a.Vector.mulScalar = function (e, d) {
                    return e.map(function (g) {
                        return g * d
                    })
                };
                a.Vector.add = function (e, d) {
                    return e.map(function (g, m) {
                        return g + d[m]
                    })
                };
                a.Vector.sub = function (e, d) {
                    return e.map(function (g, m) {
                        return g - d[m]
                    })
                };
                a.Vector.dist = function (e,
                                          d) {
                    return a.Vector.length(a.Vector.sub(e, d))
                };
                a.Vector.normalize = function (e) {
                    return a.Vector.mulScalar(e, 1 / a.Vector.length(e))
                };
                a.Vector.cross = function (e, d) {
                    return [e[1] * d[2] - e[2] * d[1], e[2] * d[0] - e[0] * d[2], e[0] * d[1] - e[1] * d[0]]
                };
                a.M44 = {};
                a.M44.identity = function () {
                    return c(4)
                };
                a.M44.translated = function (e) {
                    return b(e, c(4), 4, 3, 0)
                };
                a.M44.scaled = function (e) {
                    return b(e, c(4), 4, 0, 1)
                };
                a.M44.rotated = function (e, d) {
                    return a.M44.rotatedUnitSinCos(a.Vector.normalize(e), Math.sin(d), Math.cos(d))
                };
                a.M44.rotatedUnitSinCos =
                    function (e, d, g) {
                        var m = e[0], p = e[1];
                        e = e[2];
                        var x = 1 - g;
                        return [x * m * m + g, x * m * p - d * e, x * m * e + d * p, 0, x * m * p + d * e, x * p * p + g, x * p * e - d * m, 0, x * m * e - d * p, x * p * e + d * m, x * e * e + g, 0, 0, 0, 0, 1]
                    };
                a.M44.lookat = function (e, d, g) {
                    d = a.Vector.normalize(a.Vector.sub(d, e));
                    g = a.Vector.normalize(g);
                    g = a.Vector.normalize(a.Vector.cross(d, g));
                    var m = a.M44.identity();
                    b(g, m, 4, 0, 0);
                    b(a.Vector.cross(g, d), m, 4, 1, 0);
                    b(a.Vector.mulScalar(d, -1), m, 4, 2, 0);
                    b(e, m, 4, 3, 0);
                    e = a.M44.invert(m);
                    return null === e ? a.M44.identity() : e
                };
                a.M44.perspective = function (e, d, g) {
                    var m =
                        1 / (d - e);
                    g /= 2;
                    g = Math.cos(g) / Math.sin(g);
                    return [g, 0, 0, 0, 0, g, 0, 0, 0, 0, (d + e) * m, 2 * d * e * m, 0, 0, -1, 1]
                };
                a.M44.rc = function (e, d, g) {
                    return e[4 * d + g]
                };
                a.M44.multiply = function () {
                    return Lc(4, arguments)
                };
                a.M44.invert = function (e) {
                    var d = e[0], g = e[4], m = e[8], p = e[12], x = e[1], D = e[5], J = e[9], N = e[13], Q = e[2],
                        T = e[6], t = e[10], I = e[14], R = e[3], aa = e[7], ka = e[11];
                    e = e[15];
                    var ua = d * D - g * x, va = d * J - m * x, la = d * N - p * x, F = g * J - m * D,
                        k = g * N - p * D, n = m * N - p * J, z = Q * aa - T * R, B = Q * ka - t * R, C = Q * e - I * R,
                        E = T * ka - t * aa, L = T * e - I * aa, Y = t * e - I * ka,
                        qa = ua * Y - va * L + la * E + F * C - k * B + n * z, fa = 1 /
                            qa;
                    if (0 === qa || Infinity === fa) return null;
                    ua *= fa;
                    va *= fa;
                    la *= fa;
                    F *= fa;
                    k *= fa;
                    n *= fa;
                    z *= fa;
                    B *= fa;
                    C *= fa;
                    E *= fa;
                    L *= fa;
                    Y *= fa;
                    d = [D * Y - J * L + N * E, J * C - x * Y - N * B, x * L - D * C + N * z, D * B - x * E - J * z, m * L - g * Y - p * E, d * Y - m * C + p * B, g * C - d * L - p * z, d * E - g * B + m * z, aa * n - ka * k + e * F, ka * la - R * n - e * va, R * k - aa * la + e * ua, aa * va - R * F - ka * ua, t * k - T * n - I * F, Q * n - t * la + I * va, T * la - Q * k - I * ua, Q * F - T * va + t * ua];
                    return d.every(function (Ia) {
                        return !isNaN(Ia) && Infinity !== Ia && -Infinity !== Ia
                    }) ? d : null
                };
                a.M44.transpose = function (e) {
                    return [e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6],
                        e[10], e[14], e[3], e[7], e[11], e[15]]
                };
                a.M44.mustInvert = function (e) {
                    e = a.M44.invert(e);
                    if (null === e) throw"Matrix not invertible";
                    return e
                };
                a.M44.setupCamera = function (e, d, g) {
                    var m = a.M44.lookat(g.eye, g.coa, g.up);
                    g = a.M44.perspective(g.near, g.far, g.angle);
                    d = [(e[2] - e[0]) / 2, (e[3] - e[1]) / 2, d];
                    e = a.M44.multiply(a.M44.translated([(e[0] + e[2]) / 2, (e[1] + e[3]) / 2, 0]), a.M44.scaled(d));
                    return a.M44.multiply(e, g, m, a.M44.mustInvert(e))
                };
                a.ColorMatrix = {};
                a.ColorMatrix.identity = function () {
                    var e = new Float32Array(20);
                    e[0] = 1;
                    e[6] =
                        1;
                    e[12] = 1;
                    e[18] = 1;
                    return e
                };
                a.ColorMatrix.scaled = function (e, d, g, m) {
                    var p = new Float32Array(20);
                    p[0] = e;
                    p[6] = d;
                    p[12] = g;
                    p[18] = m;
                    return p
                };
                var Gd = [[6, 7, 11, 12], [0, 10, 2, 12], [0, 1, 5, 6]];
                a.ColorMatrix.rotated = function (e, d, g) {
                    var m = a.ColorMatrix.identity();
                    e = Gd[e];
                    m[e[0]] = g;
                    m[e[1]] = d;
                    m[e[2]] = -d;
                    m[e[3]] = g;
                    return m
                };
                a.ColorMatrix.postTranslate = function (e, d, g, m, p) {
                    e[4] += d;
                    e[9] += g;
                    e[14] += m;
                    e[19] += p;
                    return e
                };
                a.ColorMatrix.concat = function (e, d) {
                    for (var g = new Float32Array(20), m = 0, p = 0; 20 > p; p += 5) {
                        for (var x = 0; 4 > x; x++) g[m++] =
                            e[p] * d[x] + e[p + 1] * d[x + 5] + e[p + 2] * d[x + 10] + e[p + 3] * d[x + 15];
                        g[m++] = e[p] * d[4] + e[p + 1] * d[9] + e[p + 2] * d[14] + e[p + 3] * d[19] + e[p + 4]
                    }
                    return g
                };
                (function (e) {
                    e.Ud = e.Ud || [];
                    e.Ud.push(function () {
                        function d(t) {
                            if (!t || !t.length) return [];
                            for (var I = [], R = 0; R < t.length; R += 5) {
                                var aa = e.LTRBRect(t[R], t[R + 1], t[R + 2], t[R + 3]);
                                aa.direction = 0 === t[R + 4] ? e.TextDirection.RTL : e.TextDirection.LTR;
                                I.push(aa)
                            }
                            e._free(t.byteOffset);
                            return I
                        }

                        function g(t) {
                            t = t || {};
                            void 0 === t.weight && (t.weight = e.FontWeight.Normal);
                            t.width = t.width || e.FontWidth.Normal;
                            t.slant = t.slant || e.FontSlant.Upright;
                            return t
                        }

                        function m(t) {
                            if (!t || !t.length) return S;
                            for (var I = [], R = 0; R < t.length; R++) {
                                var aa = p(t[R]);
                                I.push(aa)
                            }
                            return w(I, "HEAPU32")
                        }

                        function p(t) {
                            if (J[t]) return J[t];
                            var I = oa(t) + 1, R = e._malloc(I);
                            ra(t, G, R, I);
                            return J[t] = R
                        }

                        function x(t) {
                            t._colorPtr = M(t.color);
                            t._foregroundColorPtr = S;
                            t._backgroundColorPtr = S;
                            t._decorationColorPtr = S;
                            t.foregroundColor && (t._foregroundColorPtr = M(t.foregroundColor, N));
                            t.backgroundColor && (t._backgroundColorPtr = M(t.backgroundColor, Q));
                            t.decorationColor &&
                            (t._decorationColorPtr = M(t.decorationColor, T));
                            Array.isArray(t.fontFamilies) && t.fontFamilies.length ? (t._fontFamiliesPtr = m(t.fontFamilies), t._fontFamiliesLen = t.fontFamilies.length) : (t._fontFamiliesPtr = S, t._fontFamiliesLen = 0);
                            if (t.locale) {
                                var I = t.locale;
                                t._localePtr = p(I);
                                t._localeLen = oa(I) + 1
                            } else t._localePtr = S, t._localeLen = 0;
                            if (Array.isArray(t.shadows) && t.shadows.length) {
                                I = t.shadows;
                                var R = I.map(function (F) {
                                    return F.color || e.BLACK
                                }), aa = I.map(function (F) {
                                    return F.blurRadius || 0
                                });
                                t._shadowLen = I.length;
                                for (var ka = e._malloc(8 * I.length), ua = ka / 4, va = 0; va < I.length; va++) {
                                    var la = I[va].offset || [0, 0];
                                    e.HEAPF32[ua] = la[0];
                                    e.HEAPF32[ua + 1] = la[1];
                                    ua += 2
                                }
                                t._shadowColorsPtr = H(R).be;
                                t._shadowOffsetsPtr = ka;
                                t._shadowBlurRadiiPtr = w(aa, "HEAPF32")
                            } else t._shadowLen = 0, t._shadowColorsPtr = S, t._shadowOffsetsPtr = S, t._shadowBlurRadiiPtr = S;
                            Array.isArray(t.fontFeatures) && t.fontFeatures.length ? (I = t.fontFeatures, R = I.map(function (F) {
                                return F.name
                            }), aa = I.map(function (F) {
                                return F.value
                            }), t._fontFeatureLen = I.length, t._fontFeatureNamesPtr =
                                m(R), t._fontFeatureValuesPtr = w(aa, "HEAPU32")) : (t._fontFeatureLen = 0, t._fontFeatureNamesPtr = S, t._fontFeatureValuesPtr = S)
                        }

                        function D(t) {
                            e._free(t._fontFamiliesPtr);
                            e._free(t._localePtr);
                            e._free(t._shadowColorsPtr);
                            e._free(t._shadowOffsetsPtr);
                            e._free(t._shadowBlurRadiiPtr);
                            e._free(t._fontFeatureNamesPtr);
                            e._free(t._fontFeatureValuesPtr)
                        }

                        e.Paragraph.prototype.getRectsForRange = function (t, I, R, aa) {
                            t = this._getRectsForRange(t, I, R, aa);
                            return d(t)
                        };
                        e.Paragraph.prototype.getRectsForPlaceholders = function () {
                            var t =
                                this._getRectsForPlaceholders();
                            return d(t)
                        };
                        e.TypefaceFontProvider.prototype.registerFont = function (t, I) {
                            t = e.FontMgr.RefDefault().MakeTypefaceFromData(t);
                            if (!t) return null;
                            I = p(I);
                            this._registerFont(t, I)
                        };
                        e.ParagraphStyle = function (t) {
                            t.disableHinting = t.disableHinting || !1;
                            if (t.ellipsis) {
                                var I = t.ellipsis;
                                t._ellipsisPtr = p(I);
                                t._ellipsisLen = oa(I) + 1
                            } else t._ellipsisPtr = S, t._ellipsisLen = 0;
                            t.heightMultiplier = t.heightMultiplier || 0;
                            t.maxLines = t.maxLines || 0;
                            I = (I = t.strutStyle) || {};
                            I.strutEnabled = I.strutEnabled ||
                                !1;
                            I.strutEnabled && Array.isArray(I.fontFamilies) && I.fontFamilies.length ? (I._fontFamiliesPtr = m(I.fontFamilies), I._fontFamiliesLen = I.fontFamilies.length) : (I._fontFamiliesPtr = S, I._fontFamiliesLen = 0);
                            I.fontStyle = g(I.fontStyle);
                            I.fontSize = I.fontSize || 0;
                            I.heightMultiplier = I.heightMultiplier || 0;
                            I.halfLeading = I.halfLeading || !1;
                            I.leading = I.leading || 0;
                            I.forceStrutHeight = I.forceStrutHeight || !1;
                            t.strutStyle = I;
                            t.textAlign = t.textAlign || e.TextAlign.Start;
                            t.textDirection = t.textDirection || e.TextDirection.LTR;
                            t.textHeightBehavior =
                                t.textHeightBehavior || e.TextHeightBehavior.All;
                            t.textStyle = e.TextStyle(t.textStyle);
                            return t
                        };
                        e.TextStyle = function (t) {
                            t.color || (t.color = e.BLACK);
                            t.decoration = t.decoration || 0;
                            t.decorationThickness = t.decorationThickness || 0;
                            t.decorationStyle = t.decorationStyle || e.DecorationStyle.Solid;
                            t.textBaseline = t.textBaseline || e.TextBaseline.Alphabetic;
                            t.fontSize = t.fontSize || 0;
                            t.letterSpacing = t.letterSpacing || 0;
                            t.wordSpacing = t.wordSpacing || 0;
                            t.heightMultiplier = t.heightMultiplier || 0;
                            t.halfLeading = t.halfLeading || !1;
                            t.fontStyle = g(t.fontStyle);
                            return t
                        };
                        var J = {}, N = e._malloc(16), Q = e._malloc(16), T = e._malloc(16);
                        e.ParagraphBuilder.Make = function (t, I) {
                            x(t.textStyle);
                            I = e.ParagraphBuilder._Make(t, I);
                            D(t.textStyle);
                            return I
                        };
                        e.ParagraphBuilder.MakeFromFontProvider = function (t, I) {
                            x(t.textStyle);
                            I = e.ParagraphBuilder._MakeFromFontProvider(t, I);
                            D(t.textStyle);
                            return I
                        };
                        e.ParagraphBuilder.ShapeText = function (t, I, R) {
                            let aa = 0;
                            for (const ka of I) aa += ka.length;
                            if (aa !== t.length) throw"Accumulated block lengths must equal text.length";
                            return e.ParagraphBuilder._ShapeText(t, I, R)
                        };
                        e.ParagraphBuilder.prototype.pushStyle = function (t) {
                            x(t);
                            this._pushStyle(t);
                            D(t)
                        };
                        e.ParagraphBuilder.prototype.pushPaintStyle = function (t, I, R) {
                            x(t);
                            this._pushPaintStyle(t, I, R);
                            D(t)
                        };
                        e.ParagraphBuilder.prototype.addPlaceholder = function (t, I, R, aa, ka) {
                            R = R || e.PlaceholderAlignment.Baseline;
                            aa = aa || e.TextBaseline.Alphabetic;
                            this._addPlaceholder(t || 0, I || 0, R, aa, ka || 0)
                        }
                    })
                })(r);
                a.Ud = a.Ud || [];
                a.Ud.push(function () {
                    a.Path.prototype.op = function (e, d) {
                        return this._op(e, d) ?
                            this : null
                    };
                    a.Path.prototype.simplify = function () {
                        return this._simplify() ? this : null
                    }
                });
                a.Ud = a.Ud || [];
                a.Ud.push(function () {
                    a.Canvas.prototype.drawText = function (e, d, g, m, p) {
                        var x = oa(e), D = a._malloc(x + 1);
                        ra(e, G, D, x + 1);
                        this._drawSimpleText(D, x, d, g, p, m);
                        a._free(D)
                    };
                    a.Font.prototype.getGlyphBounds = function (e, d, g) {
                        var m = w(e, "HEAPU16"), p = a._malloc(16 * e.length);
                        this._getGlyphWidthBounds(m, e.length, S, p, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, p, 4 * e.length);
                        y(m, e);
                        if (g) return g.set(d), a._free(p), g;
                        e = Float32Array.from(d);
                        a._free(p);
                        return e
                    };
                    a.Font.prototype.getGlyphIDs = function (e, d, g) {
                        d || (d = e.length);
                        var m = oa(e) + 1, p = a._malloc(m);
                        ra(e, G, p, m);
                        e = a._malloc(2 * d);
                        d = this._getGlyphIDs(p, m - 1, d, e);
                        a._free(p);
                        if (0 > d) return a._free(e), null;
                        p = new Uint16Array(a.HEAPU8.buffer, e, d);
                        if (g) return g.set(p), a._free(e), g;
                        g = Uint16Array.from(p);
                        a._free(e);
                        return g
                    };
                    a.Font.prototype.getGlyphIntercepts = function (e, d, g, m) {
                        var p = w(e, "HEAPU16"), x = w(d, "HEAPF32");
                        return this._getGlyphIntercepts(p, e.length, !(e && e._ck), x, d.length, !(d && d._ck), g, m)
                    };
                    a.Font.prototype.getGlyphWidths = function (e, d, g) {
                        var m = w(e, "HEAPU16"), p = a._malloc(4 * e.length);
                        this._getGlyphWidthBounds(m, e.length, p, S, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, p, e.length);
                        y(m, e);
                        if (g) return g.set(d), a._free(p), g;
                        e = Float32Array.from(d);
                        a._free(p);
                        return e
                    };
                    a.FontMgr.FromData = function () {
                        if (!arguments.length) return null;
                        var e = arguments;
                        1 === e.length && Array.isArray(e[0]) && (e = arguments[0]);
                        if (!e.length) return null;
                        for (var d = [], g = [], m = 0; m < e.length; m++) {
                            var p = new Uint8Array(e[m]), x = w(p,
                                "HEAPU8");
                            d.push(x);
                            g.push(p.byteLength)
                        }
                        d = w(d, "HEAPU32");
                        g = w(g, "HEAPU32");
                        e = a.FontMgr._fromData(d, g, e.length);
                        a._free(d);
                        a._free(g);
                        return e
                    };
                    a.FontMgr.prototype.MakeTypefaceFromData = function (e) {
                        e = new Uint8Array(e);
                        var d = w(e, "HEAPU8");
                        return (e = this._makeTypefaceFromData(d, e.byteLength)) ? e : null
                    };
                    a.Typeface.MakeFreeTypeFaceFromData = function (e) {
                        e = new Uint8Array(e);
                        var d = w(e, "HEAPU8");
                        return (e = a.Typeface._MakeFreeTypeFaceFromData(d, e.byteLength)) ? e : null
                    };
                    a.Typeface.prototype.getGlyphIDs = function (e, d,
                                                                 g) {
                        d || (d = e.length);
                        var m = oa(e) + 1, p = a._malloc(m);
                        ra(e, G, p, m);
                        e = a._malloc(2 * d);
                        d = this._getGlyphIDs(p, m - 1, d, e);
                        a._free(p);
                        if (0 > d) return a._free(e), null;
                        p = new Uint16Array(a.HEAPU8.buffer, e, d);
                        if (g) return g.set(p), a._free(e), g;
                        g = Uint16Array.from(p);
                        a._free(e);
                        return g
                    };
                    a.TextBlob.MakeOnPath = function (e, d, g, m) {
                        if (e && e.length && d && d.countPoints()) {
                            if (1 === d.countPoints()) return this.MakeFromText(e, g);
                            m || (m = 0);
                            var p = g.getGlyphIDs(e);
                            p = g.getGlyphWidths(p);
                            var x = [];
                            d = new a.ContourMeasureIter(d, !1, 1);
                            for (var D =
                                d.next(), J = new Float32Array(4), N = 0; N < e.length && D; N++) {
                                var Q = p[N];
                                m += Q / 2;
                                if (m > D.length()) {
                                    D.delete();
                                    D = d.next();
                                    if (!D) {
                                        e = e.substring(0, N);
                                        break
                                    }
                                    m = Q / 2
                                }
                                D.getPosTan(m, J);
                                var T = J[2], t = J[3];
                                x.push(T, t, J[0] - Q / 2 * T, J[1] - Q / 2 * t);
                                m += Q / 2
                            }
                            e = this.MakeFromRSXform(e, x, g);
                            D && D.delete();
                            d.delete();
                            return e
                        }
                    };
                    a.TextBlob.MakeFromRSXform = function (e, d, g) {
                        var m = oa(e) + 1, p = a._malloc(m);
                        ra(e, G, p, m);
                        e = w(d, "HEAPF32");
                        g = a.TextBlob._MakeFromRSXform(p, m - 1, e, g);
                        a._free(p);
                        return g ? g : null
                    };
                    a.TextBlob.MakeFromRSXformGlyphs = function (e,
                                                                 d, g) {
                        var m = w(e, "HEAPU16");
                        d = w(d, "HEAPF32");
                        g = a.TextBlob._MakeFromRSXformGlyphs(m, 2 * e.length, d, g);
                        y(m, e);
                        return g ? g : null
                    };
                    a.TextBlob.MakeFromGlyphs = function (e, d) {
                        var g = w(e, "HEAPU16");
                        d = a.TextBlob._MakeFromGlyphs(g, 2 * e.length, d);
                        y(g, e);
                        return d ? d : null
                    };
                    a.TextBlob.MakeFromText = function (e, d) {
                        var g = oa(e) + 1, m = a._malloc(g);
                        ra(e, G, m, g);
                        e = a.TextBlob._MakeFromText(m, g - 1, d);
                        a._free(m);
                        return e ? e : null
                    };
                    a.MallocGlyphIDs = function (e) {
                        return a.Malloc(Uint16Array, e)
                    }
                });
                a.Ud = a.Ud || [];
                a.Ud.push(function () {
                    a.MakePicture =
                        function (e) {
                            e = new Uint8Array(e);
                            var d = a._malloc(e.byteLength);
                            a.HEAPU8.set(e, d);
                            return (e = a._MakePicture(d, e.byteLength)) ? e : null
                        }
                });
                (function () {
                    function e(F) {
                        for (var k = 0; k < F.length; k++) if (void 0 !== F[k] && !Number.isFinite(F[k])) return !1;
                        return !0
                    }

                    function d(F) {
                        var k = a.getColorComponents(F);
                        F = k[0];
                        var n = k[1], z = k[2];
                        k = k[3];
                        if (1 === k) return F = F.toString(16).toLowerCase(), n = n.toString(16).toLowerCase(), z = z.toString(16).toLowerCase(), F = 1 === F.length ? "0" + F : F, n = 1 === n.length ? "0" + n : n, z = 1 === z.length ? "0" + z : z, "#" +
                        F + n + z;
                        k = 0 === k || 1 === k ? k : k.toFixed(8);
                        return "rgba(" + F + ", " + n + ", " + z + ", " + k + ")"
                    }

                    function g(F) {
                        return a.parseColorString(F, ua)
                    }

                    function m(F) {
                        F = va.exec(F);
                        if (!F) return null;
                        var k = parseFloat(F[4]), n = 16;
                        switch (F[5]) {
                            case "em":
                            case "rem":
                                n = 16 * k;
                                break;
                            case "pt":
                                n = 4 * k / 3;
                                break;
                            case "px":
                                n = k;
                                break;
                            case "pc":
                                n = 16 * k;
                                break;
                            case "in":
                                n = 96 * k;
                                break;
                            case "cm":
                                n = 96 * k / 2.54;
                                break;
                            case "mm":
                                n = 96 / 25.4 * k;
                                break;
                            case "q":
                                n = 96 / 25.4 / 4 * k;
                                break;
                            case "%":
                                n = 16 / 75 * k
                        }
                        return {style: F[1], variant: F[2], weight: F[3], sizePx: n, family: F[6].trim()}
                    }

                    function p(F) {
                        this.Ld = F;
                        this.Pd = new a.Paint;
                        this.Pd.setAntiAlias(!0);
                        this.Pd.setStrokeMiter(10);
                        this.Pd.setStrokeCap(a.StrokeCap.Butt);
                        this.Pd.setStrokeJoin(a.StrokeJoin.Miter);
                        this.Oe = "10px monospace";
                        this.qe = new a.Font(null, 10);
                        this.qe.setSubpixel(!0);
                        this.ae = this.ge = a.BLACK;
                        this.te = 0;
                        this.He = a.TRANSPARENT;
                        this.ve = this.ue = 0;
                        this.Ie = this.ie = 1;
                        this.Ge = 0;
                        this.se = [];
                        this.Od = a.BlendMode.SrcOver;
                        this.Pd.setStrokeWidth(this.Ie);
                        this.Pd.setBlendMode(this.Od);
                        this.Sd = new a.Path;
                        this.Td = a.Matrix.identity();
                        this.jf = [];
                        this.ze = [];
                        this.ke = function () {
                            this.Sd.delete();
                            this.Pd.delete();
                            this.qe.delete();
                            this.ze.forEach(function (k) {
                                k.ke()
                            })
                        };
                        Object.defineProperty(this, "currentTransform", {
                            enumerable: !0, get: function () {
                                return {
                                    a: this.Td[0],
                                    c: this.Td[1],
                                    e: this.Td[2],
                                    b: this.Td[3],
                                    d: this.Td[4],
                                    f: this.Td[5]
                                }
                            }, set: function (k) {
                                k.a && this.setTransform(k.a, k.b, k.c, k.d, k.e, k.f)
                            }
                        });
                        Object.defineProperty(this, "fillStyle", {
                            enumerable: !0, get: function () {
                                return f(this.ae) ? d(this.ae) : this.ae
                            }, set: function (k) {
                                "string" === typeof k ?
                                    this.ae = g(k) : k.re && (this.ae = k)
                            }
                        });
                        Object.defineProperty(this, "font", {
                            enumerable: !0, get: function () {
                                return this.Oe
                            }, set: function (k) {
                                var n = m(k), z = n.family;
                                n.typeface = la[z] ? la[z][(n.style || "normal") + "|" + (n.variant || "normal") + "|" + (n.weight || "normal")] || la[z]["*"] : null;
                                n && (this.qe.setSize(n.sizePx), this.qe.setTypeface(n.typeface), this.Oe = k)
                            }
                        });
                        Object.defineProperty(this, "globalAlpha", {
                            enumerable: !0, get: function () {
                                return this.ie
                            }, set: function (k) {
                                !isFinite(k) || 0 > k || 1 < k || (this.ie = k)
                            }
                        });
                        Object.defineProperty(this,
                            "globalCompositeOperation", {
                                enumerable: !0, get: function () {
                                    switch (this.Od) {
                                        case a.BlendMode.SrcOver:
                                            return "source-over";
                                        case a.BlendMode.DstOver:
                                            return "destination-over";
                                        case a.BlendMode.Src:
                                            return "copy";
                                        case a.BlendMode.Dst:
                                            return "destination";
                                        case a.BlendMode.Clear:
                                            return "clear";
                                        case a.BlendMode.SrcIn:
                                            return "source-in";
                                        case a.BlendMode.DstIn:
                                            return "destination-in";
                                        case a.BlendMode.SrcOut:
                                            return "source-out";
                                        case a.BlendMode.DstOut:
                                            return "destination-out";
                                        case a.BlendMode.SrcATop:
                                            return "source-atop";
                                        case a.BlendMode.DstATop:
                                            return "destination-atop";
                                        case a.BlendMode.Xor:
                                            return "xor";
                                        case a.BlendMode.Plus:
                                            return "lighter";
                                        case a.BlendMode.Multiply:
                                            return "multiply";
                                        case a.BlendMode.Screen:
                                            return "screen";
                                        case a.BlendMode.Overlay:
                                            return "overlay";
                                        case a.BlendMode.Darken:
                                            return "darken";
                                        case a.BlendMode.Lighten:
                                            return "lighten";
                                        case a.BlendMode.ColorDodge:
                                            return "color-dodge";
                                        case a.BlendMode.ColorBurn:
                                            return "color-burn";
                                        case a.BlendMode.HardLight:
                                            return "hard-light";
                                        case a.BlendMode.SoftLight:
                                            return "soft-light";
                                        case a.BlendMode.Difference:
                                            return "difference";
                                        case a.BlendMode.Exclusion:
                                            return "exclusion";
                                        case a.BlendMode.Hue:
                                            return "hue";
                                        case a.BlendMode.Saturation:
                                            return "saturation";
                                        case a.BlendMode.Color:
                                            return "color";
                                        case a.BlendMode.Luminosity:
                                            return "luminosity"
                                    }
                                }, set: function (k) {
                                    switch (k) {
                                        case "source-over":
                                            this.Od = a.BlendMode.SrcOver;
                                            break;
                                        case "destination-over":
                                            this.Od = a.BlendMode.DstOver;
                                            break;
                                        case "copy":
                                            this.Od = a.BlendMode.Src;
                                            break;
                                        case "destination":
                                            this.Od = a.BlendMode.Dst;
                                            break;
                                        case "clear":
                                            this.Od =
                                                a.BlendMode.Clear;
                                            break;
                                        case "source-in":
                                            this.Od = a.BlendMode.SrcIn;
                                            break;
                                        case "destination-in":
                                            this.Od = a.BlendMode.DstIn;
                                            break;
                                        case "source-out":
                                            this.Od = a.BlendMode.SrcOut;
                                            break;
                                        case "destination-out":
                                            this.Od = a.BlendMode.DstOut;
                                            break;
                                        case "source-atop":
                                            this.Od = a.BlendMode.SrcATop;
                                            break;
                                        case "destination-atop":
                                            this.Od = a.BlendMode.DstATop;
                                            break;
                                        case "xor":
                                            this.Od = a.BlendMode.Xor;
                                            break;
                                        case "lighter":
                                            this.Od = a.BlendMode.Plus;
                                            break;
                                        case "plus-lighter":
                                            this.Od = a.BlendMode.Plus;
                                            break;
                                        case "plus-darker":
                                            throw"plus-darker is not supported";
                                        case "multiply":
                                            this.Od = a.BlendMode.Multiply;
                                            break;
                                        case "screen":
                                            this.Od = a.BlendMode.Screen;
                                            break;
                                        case "overlay":
                                            this.Od = a.BlendMode.Overlay;
                                            break;
                                        case "darken":
                                            this.Od = a.BlendMode.Darken;
                                            break;
                                        case "lighten":
                                            this.Od = a.BlendMode.Lighten;
                                            break;
                                        case "color-dodge":
                                            this.Od = a.BlendMode.ColorDodge;
                                            break;
                                        case "color-burn":
                                            this.Od = a.BlendMode.ColorBurn;
                                            break;
                                        case "hard-light":
                                            this.Od = a.BlendMode.HardLight;
                                            break;
                                        case "soft-light":
                                            this.Od = a.BlendMode.SoftLight;
                                            break;
                                        case "difference":
                                            this.Od = a.BlendMode.Difference;
                                            break;
                                        case "exclusion":
                                            this.Od = a.BlendMode.Exclusion;
                                            break;
                                        case "hue":
                                            this.Od = a.BlendMode.Hue;
                                            break;
                                        case "saturation":
                                            this.Od = a.BlendMode.Saturation;
                                            break;
                                        case "color":
                                            this.Od = a.BlendMode.Color;
                                            break;
                                        case "luminosity":
                                            this.Od = a.BlendMode.Luminosity;
                                            break;
                                        default:
                                            return
                                    }
                                    this.Pd.setBlendMode(this.Od)
                                }
                            });
                        Object.defineProperty(this, "imageSmoothingEnabled", {
                            enumerable: !0, get: function () {
                                return !0
                            }, set: function () {
                            }
                        });
                        Object.defineProperty(this, "imageSmoothingQuality", {
                            enumerable: !0, get: function () {
                                return "high"
                            },
                            set: function () {
                            }
                        });
                        Object.defineProperty(this, "lineCap", {
                            enumerable: !0, get: function () {
                                switch (this.Pd.getStrokeCap()) {
                                    case a.StrokeCap.Butt:
                                        return "butt";
                                    case a.StrokeCap.Round:
                                        return "round";
                                    case a.StrokeCap.Square:
                                        return "square"
                                }
                            }, set: function (k) {
                                switch (k) {
                                    case "butt":
                                        this.Pd.setStrokeCap(a.StrokeCap.Butt);
                                        break;
                                    case "round":
                                        this.Pd.setStrokeCap(a.StrokeCap.Round);
                                        break;
                                    case "square":
                                        this.Pd.setStrokeCap(a.StrokeCap.Square)
                                }
                            }
                        });
                        Object.defineProperty(this, "lineDashOffset", {
                            enumerable: !0, get: function () {
                                return this.Ge
                            },
                            set: function (k) {
                                isFinite(k) && (this.Ge = k)
                            }
                        });
                        Object.defineProperty(this, "lineJoin", {
                            enumerable: !0, get: function () {
                                switch (this.Pd.getStrokeJoin()) {
                                    case a.StrokeJoin.Miter:
                                        return "miter";
                                    case a.StrokeJoin.Round:
                                        return "round";
                                    case a.StrokeJoin.Bevel:
                                        return "bevel"
                                }
                            }, set: function (k) {
                                switch (k) {
                                    case "miter":
                                        this.Pd.setStrokeJoin(a.StrokeJoin.Miter);
                                        break;
                                    case "round":
                                        this.Pd.setStrokeJoin(a.StrokeJoin.Round);
                                        break;
                                    case "bevel":
                                        this.Pd.setStrokeJoin(a.StrokeJoin.Bevel)
                                }
                            }
                        });
                        Object.defineProperty(this, "lineWidth",
                            {
                                enumerable: !0, get: function () {
                                    return this.Pd.getStrokeWidth()
                                }, set: function (k) {
                                    0 >= k || !k || (this.Ie = k, this.Pd.setStrokeWidth(k))
                                }
                            });
                        Object.defineProperty(this, "miterLimit", {
                            enumerable: !0, get: function () {
                                return this.Pd.getStrokeMiter()
                            }, set: function (k) {
                                0 >= k || !k || this.Pd.setStrokeMiter(k)
                            }
                        });
                        Object.defineProperty(this, "shadowBlur", {
                            enumerable: !0, get: function () {
                                return this.te
                            }, set: function (k) {
                                0 > k || !isFinite(k) || (this.te = k)
                            }
                        });
                        Object.defineProperty(this, "shadowColor", {
                            enumerable: !0, get: function () {
                                return d(this.He)
                            },
                            set: function (k) {
                                this.He = g(k)
                            }
                        });
                        Object.defineProperty(this, "shadowOffsetX", {
                            enumerable: !0, get: function () {
                                return this.ue
                            }, set: function (k) {
                                isFinite(k) && (this.ue = k)
                            }
                        });
                        Object.defineProperty(this, "shadowOffsetY", {
                            enumerable: !0, get: function () {
                                return this.ve
                            }, set: function (k) {
                                isFinite(k) && (this.ve = k)
                            }
                        });
                        Object.defineProperty(this, "strokeStyle", {
                            enumerable: !0, get: function () {
                                return d(this.ge)
                            }, set: function (k) {
                                "string" === typeof k ? this.ge = g(k) : k.re && (this.ge = k)
                            }
                        });
                        this.arc = function (k, n, z, B, C, E) {
                            t(this.Sd, k,
                                n, z, z, 0, B, C, E)
                        };
                        this.arcTo = function (k, n, z, B, C) {
                            N(this.Sd, k, n, z, B, C)
                        };
                        this.beginPath = function () {
                            this.Sd.delete();
                            this.Sd = new a.Path
                        };
                        this.bezierCurveTo = function (k, n, z, B, C, E) {
                            var L = this.Sd;
                            e([k, n, z, B, C, E]) && (L.isEmpty() && L.moveTo(k, n), L.cubicTo(k, n, z, B, C, E))
                        };
                        this.clearRect = function (k, n, z, B) {
                            this.Pd.setStyle(a.PaintStyle.Fill);
                            this.Pd.setBlendMode(a.BlendMode.Clear);
                            this.Ld.drawRect(a.XYWHRect(k, n, z, B), this.Pd);
                            this.Pd.setBlendMode(this.Od)
                        };
                        this.clip = function (k, n) {
                            "string" === typeof k ? (n = k, k = this.Sd) :
                                k && k.Ze && (k = k.Vd);
                            k || (k = this.Sd);
                            k = k.copy();
                            n && "evenodd" === n.toLowerCase() ? k.setFillType(a.FillType.EvenOdd) : k.setFillType(a.FillType.Winding);
                            this.Ld.clipPath(k, a.ClipOp.Intersect, !0);
                            k.delete()
                        };
                        this.closePath = function () {
                            Q(this.Sd)
                        };
                        this.createImageData = function () {
                            if (1 === arguments.length) {
                                var k = arguments[0];
                                return new D(new Uint8ClampedArray(4 * k.width * k.height), k.width, k.height)
                            }
                            if (2 === arguments.length) {
                                k = arguments[0];
                                var n = arguments[1];
                                return new D(new Uint8ClampedArray(4 * k * n), k, n)
                            }
                            throw"createImageData expects 1 or 2 arguments, got " +
                            arguments.length;
                        };
                        this.createLinearGradient = function (k, n, z, B) {
                            if (e(arguments)) {
                                var C = new J(k, n, z, B);
                                this.ze.push(C);
                                return C
                            }
                        };
                        this.createPattern = function (k, n) {
                            k = new aa(k, n);
                            this.ze.push(k);
                            return k
                        };
                        this.createRadialGradient = function (k, n, z, B, C, E) {
                            if (e(arguments)) {
                                var L = new ka(k, n, z, B, C, E);
                                this.ze.push(L);
                                return L
                            }
                        };
                        this.drawImage = function (k) {
                            var n = this.Ne();
                            if (3 === arguments.length || 5 === arguments.length) var z = a.XYWHRect(arguments[1], arguments[2], arguments[3] || k.width(), arguments[4] || k.height()),
                                B = a.XYWHRect(0, 0, k.width(), k.height()); else if (9 === arguments.length) z = a.XYWHRect(arguments[5], arguments[6], arguments[7], arguments[8]), B = a.XYWHRect(arguments[1], arguments[2], arguments[3], arguments[4]); else throw"invalid number of args for drawImage, need 3, 5, or 9; got " + arguments.length;
                            this.Ld.drawImageRect(k, B, z, n, !1);
                            n.dispose()
                        };
                        this.ellipse = function (k, n, z, B, C, E, L, Y) {
                            t(this.Sd, k, n, z, B, C, E, L, Y)
                        };
                        this.Ne = function () {
                            var k = this.Pd.copy();
                            k.setStyle(a.PaintStyle.Fill);
                            if (f(this.ae)) {
                                var n = a.multiplyByAlpha(this.ae,
                                    this.ie);
                                k.setColor(n)
                            } else n = this.ae.re(this.Td), k.setColor(a.Color(0, 0, 0, this.ie)), k.setShader(n);
                            k.dispose = function () {
                                this.delete()
                            };
                            return k
                        };
                        this.fill = function (k, n) {
                            "string" === typeof k ? (n = k, k = this.Sd) : k && k.Ze && (k = k.Vd);
                            if ("evenodd" === n) this.Sd.setFillType(a.FillType.EvenOdd); else {
                                if ("nonzero" !== n && n) throw"invalid fill rule";
                                this.Sd.setFillType(a.FillType.Winding)
                            }
                            k || (k = this.Sd);
                            n = this.Ne();
                            var z = this.we(n);
                            z && (this.Ld.save(), this.oe(), this.Ld.drawPath(k, z), this.Ld.restore(), z.dispose());
                            this.Ld.drawPath(k,
                                n);
                            n.dispose()
                        };
                        this.fillRect = function (k, n, z, B) {
                            var C = this.Ne(), E = this.we(C);
                            E && (this.Ld.save(), this.oe(), this.Ld.drawRect(a.XYWHRect(k, n, z, B), E), this.Ld.restore(), E.dispose());
                            this.Ld.drawRect(a.XYWHRect(k, n, z, B), C);
                            C.dispose()
                        };
                        this.fillText = function (k, n, z) {
                            var B = this.Ne();
                            k = a.TextBlob.MakeFromText(k, this.qe);
                            var C = this.we(B);
                            C && (this.Ld.save(), this.oe(), this.Ld.drawTextBlob(k, n, z, C), this.Ld.restore(), C.dispose());
                            this.Ld.drawTextBlob(k, n, z, B);
                            k.delete();
                            B.dispose()
                        };
                        this.getImageData = function (k,
                                                      n, z, B) {
                            return (k = this.Ld.readPixels(k, n, {
                                width: z,
                                height: B,
                                colorType: a.ColorType.RGBA_8888,
                                alphaType: a.AlphaType.Unpremul,
                                colorSpace: a.ColorSpace.SRGB
                            })) ? new D(new Uint8ClampedArray(k.buffer), z, B) : null
                        };
                        this.getLineDash = function () {
                            return this.se.slice()
                        };
                        this.kf = function (k) {
                            var n = a.Matrix.invert(this.Td);
                            a.Matrix.mapPoints(n, k);
                            return k
                        };
                        this.isPointInPath = function (k, n, z) {
                            var B = arguments;
                            if (3 === B.length) var C = this.Sd; else if (4 === B.length) C = B[0], k = B[1], n = B[2], z = B[3]; else throw"invalid arg count, need 3 or 4, got " +
                            B.length;
                            if (!isFinite(k) || !isFinite(n)) return !1;
                            z = z || "nonzero";
                            if ("nonzero" !== z && "evenodd" !== z) return !1;
                            B = this.kf([k, n]);
                            k = B[0];
                            n = B[1];
                            C.setFillType("nonzero" === z ? a.FillType.Winding : a.FillType.EvenOdd);
                            return C.contains(k, n)
                        };
                        this.isPointInStroke = function (k, n) {
                            var z = arguments;
                            if (2 === z.length) var B = this.Sd; else if (3 === z.length) B = z[0], k = z[1], n = z[2]; else throw"invalid arg count, need 2 or 3, got " + z.length;
                            if (!isFinite(k) || !isFinite(n)) return !1;
                            z = this.kf([k, n]);
                            k = z[0];
                            n = z[1];
                            B = B.copy();
                            B.setFillType(a.FillType.Winding);
                            B.stroke({
                                width: this.lineWidth,
                                miter_limit: this.miterLimit,
                                cap: this.Pd.getStrokeCap(),
                                join: this.Pd.getStrokeJoin(),
                                precision: .3
                            });
                            z = B.contains(k, n);
                            B.delete();
                            return z
                        };
                        this.lineTo = function (k, n) {
                            I(this.Sd, k, n)
                        };
                        this.measureText = function () {
                            throw Error("Clients wishing to properly measure text should use the Paragraph API");
                        };
                        this.moveTo = function (k, n) {
                            var z = this.Sd;
                            e([k, n]) && z.moveTo(k, n)
                        };
                        this.putImageData = function (k, n, z, B, C, E, L) {
                            if (e([n, z, B, C, E, L])) if (void 0 === B) this.Ld.writePixels(k.data, k.width,
                                k.height, n, z); else if (B = B || 0, C = C || 0, E = E || k.width, L = L || k.height, 0 > E && (B += E, E = Math.abs(E)), 0 > L && (C += L, L = Math.abs(L)), 0 > B && (E += B, B = 0), 0 > C && (L += C, C = 0), !(0 >= E || 0 >= L)) {
                                k = a.MakeImage({
                                    width: k.width,
                                    height: k.height,
                                    alphaType: a.AlphaType.Unpremul,
                                    colorType: a.ColorType.RGBA_8888,
                                    colorSpace: a.ColorSpace.SRGB
                                }, k.data, 4 * k.width);
                                var Y = a.XYWHRect(B, C, E, L);
                                n = a.XYWHRect(n + B, z + C, E, L);
                                z = a.Matrix.invert(this.Td);
                                this.Ld.save();
                                this.Ld.concat(z);
                                this.Ld.drawImageRect(k, Y, n, null, !1);
                                this.Ld.restore();
                                k.delete()
                            }
                        };
                        this.quadraticCurveTo =
                            function (k, n, z, B) {
                                var C = this.Sd;
                                e([k, n, z, B]) && (C.isEmpty() && C.moveTo(k, n), C.quadTo(k, n, z, B))
                            };
                        this.rect = function (k, n, z, B) {
                            var C = this.Sd;
                            k = a.XYWHRect(k, n, z, B);
                            e(k) && C.addRect(k)
                        };
                        this.resetTransform = function () {
                            this.Sd.transform(this.Td);
                            var k = a.Matrix.invert(this.Td);
                            this.Ld.concat(k);
                            this.Td = this.Ld.getTotalMatrix()
                        };
                        this.restore = function () {
                            var k = this.jf.pop();
                            if (k) {
                                var n = a.Matrix.multiply(this.Td, a.Matrix.invert(k.Cf));
                                this.Sd.transform(n);
                                this.Pd.delete();
                                this.Pd = k.$f;
                                this.se = k.Wf;
                                this.Ie = k.rg;
                                this.ge = k.qg;
                                this.ae = k.fs;
                                this.ue = k.og;
                                this.ve = k.pg;
                                this.te = k.dg;
                                this.He = k.ng;
                                this.ie = k.Jf;
                                this.Od = k.Kf;
                                this.Ge = k.Xf;
                                this.Oe = k.If;
                                this.Ld.restore();
                                this.Td = this.Ld.getTotalMatrix()
                            }
                        };
                        this.rotate = function (k) {
                            if (isFinite(k)) {
                                var n = a.Matrix.rotated(-k);
                                this.Sd.transform(n);
                                this.Ld.rotate(k / Math.PI * 180, 0, 0);
                                this.Td = this.Ld.getTotalMatrix()
                            }
                        };
                        this.save = function () {
                            if (this.ae.pe) {
                                var k = this.ae.pe();
                                this.ze.push(k)
                            } else k = this.ae;
                            if (this.ge.pe) {
                                var n = this.ge.pe();
                                this.ze.push(n)
                            } else n = this.ge;
                            this.jf.push({
                                Cf: this.Td.slice(),
                                Wf: this.se.slice(),
                                rg: this.Ie,
                                qg: n,
                                fs: k,
                                og: this.ue,
                                pg: this.ve,
                                dg: this.te,
                                ng: this.He,
                                Jf: this.ie,
                                Xf: this.Ge,
                                Kf: this.Od,
                                $f: this.Pd.copy(),
                                If: this.Oe
                            });
                            this.Ld.save()
                        };
                        this.scale = function (k, n) {
                            if (e(arguments)) {
                                var z = a.Matrix.scaled(1 / k, 1 / n);
                                this.Sd.transform(z);
                                this.Ld.scale(k, n);
                                this.Td = this.Ld.getTotalMatrix()
                            }
                        };
                        this.setLineDash = function (k) {
                            for (var n = 0; n < k.length; n++) if (!isFinite(k[n]) || 0 > k[n]) return;
                            1 === k.length % 2 && Array.prototype.push.apply(k, k);
                            this.se = k
                        };
                        this.setTransform = function (k, n, z, B, C, E) {
                            e(arguments) &&
                            (this.resetTransform(), this.transform(k, n, z, B, C, E))
                        };
                        this.oe = function () {
                            var k = a.Matrix.invert(this.Td);
                            this.Ld.concat(k);
                            this.Ld.concat(a.Matrix.translated(this.ue, this.ve));
                            this.Ld.concat(this.Td)
                        };
                        this.we = function (k) {
                            var n = a.multiplyByAlpha(this.He, this.ie);
                            if (!a.getColorComponents(n)[3] || !(this.te || this.ve || this.ue)) return null;
                            k = k.copy();
                            k.setColor(n);
                            var z = a.MaskFilter.MakeBlur(a.BlurStyle.Normal, this.te / 2, !1);
                            k.setMaskFilter(z);
                            k.dispose = function () {
                                z.delete();
                                this.delete()
                            };
                            return k
                        };
                        this.af =
                            function () {
                                var k = this.Pd.copy();
                                k.setStyle(a.PaintStyle.Stroke);
                                if (f(this.ge)) {
                                    var n = a.multiplyByAlpha(this.ge, this.ie);
                                    k.setColor(n)
                                } else n = this.ge.re(this.Td), k.setColor(a.Color(0, 0, 0, this.ie)), k.setShader(n);
                                k.setStrokeWidth(this.Ie);
                                if (this.se.length) {
                                    var z = a.PathEffect.MakeDash(this.se, this.Ge);
                                    k.setPathEffect(z)
                                }
                                k.dispose = function () {
                                    z && z.delete();
                                    this.delete()
                                };
                                return k
                            };
                        this.stroke = function (k) {
                            k = k ? k.Vd : this.Sd;
                            var n = this.af(), z = this.we(n);
                            z && (this.Ld.save(), this.oe(), this.Ld.drawPath(k, z),
                                this.Ld.restore(), z.dispose());
                            this.Ld.drawPath(k, n);
                            n.dispose()
                        };
                        this.strokeRect = function (k, n, z, B) {
                            var C = this.af(), E = this.we(C);
                            E && (this.Ld.save(), this.oe(), this.Ld.drawRect(a.XYWHRect(k, n, z, B), E), this.Ld.restore(), E.dispose());
                            this.Ld.drawRect(a.XYWHRect(k, n, z, B), C);
                            C.dispose()
                        };
                        this.strokeText = function (k, n, z) {
                            var B = this.af();
                            k = a.TextBlob.MakeFromText(k, this.qe);
                            var C = this.we(B);
                            C && (this.Ld.save(), this.oe(), this.Ld.drawTextBlob(k, n, z, C), this.Ld.restore(), C.dispose());
                            this.Ld.drawTextBlob(k, n, z,
                                B);
                            k.delete();
                            B.dispose()
                        };
                        this.translate = function (k, n) {
                            if (e(arguments)) {
                                var z = a.Matrix.translated(-k, -n);
                                this.Sd.transform(z);
                                this.Ld.translate(k, n);
                                this.Td = this.Ld.getTotalMatrix()
                            }
                        };
                        this.transform = function (k, n, z, B, C, E) {
                            k = [k, z, C, n, B, E, 0, 0, 1];
                            n = a.Matrix.invert(k);
                            this.Sd.transform(n);
                            this.Ld.concat(k);
                            this.Td = this.Ld.getTotalMatrix()
                        };
                        this.addHitRegion = function () {
                        };
                        this.clearHitRegions = function () {
                        };
                        this.drawFocusIfNeeded = function () {
                        };
                        this.removeHitRegion = function () {
                        };
                        this.scrollPathIntoView = function () {
                        };
                        Object.defineProperty(this, "canvas", {value: null, writable: !1})
                    }

                    function x(F) {
                        this.bf = F;
                        this.Md = new p(F.getCanvas());
                        this.Pe = [];
                        this.vf = a.FontMgr.RefDefault();
                        this.decodeImage = function (k) {
                            k = a.MakeImageFromEncoded(k);
                            if (!k) throw"Invalid input";
                            this.Pe.push(k);
                            return k
                        };
                        this.loadFont = function (k, n) {
                            k = this.vf.MakeTypefaceFromData(k);
                            if (!k) return null;
                            this.Pe.push(k);
                            var z = (n.style || "normal") + "|" + (n.variant || "normal") + "|" + (n.weight || "normal");
                            n = n.family;
                            la[n] || (la[n] = {"*": k});
                            la[n][z] = k
                        };
                        this.makePath2D =
                            function (k) {
                                k = new R(k);
                                this.Pe.push(k.Vd);
                                return k
                            };
                        this.getContext = function (k) {
                            return "2d" === k ? this.Md : null
                        };
                        this.toDataURL = function (k, n) {
                            this.bf.flush();
                            var z = this.bf.makeImageSnapshot();
                            if (z) {
                                k = k || "image/png";
                                var B = a.ImageFormat.PNG;
                                "image/jpeg" === k && (B = a.ImageFormat.JPEG);
                                if (n = z.encodeToBytes(B, n || .92)) {
                                    z.delete();
                                    k = "data:" + k + ";base64,";
                                    if ("undefined" !== typeof Buffer) n = Buffer.from(n).toString("base64"); else {
                                        z = 0;
                                        B = n.length;
                                        for (var C = "", E; z < B;) E = n.slice(z, Math.min(z + 32768, B)), C += String.fromCharCode.apply(null,
                                            E), z += 32768;
                                        n = btoa(C)
                                    }
                                    return k + n
                                }
                            }
                        };
                        this.dispose = function () {
                            this.Md.ke();
                            this.Pe.forEach(function (k) {
                                k.delete()
                            });
                            this.bf.dispose()
                        }
                    }

                    function D(F, k, n) {
                        if (!k || 0 === n) throw"invalid dimensions, width and height must be non-zero";
                        if (F.length % 4) throw"arr must be a multiple of 4";
                        n = n || F.length / (4 * k);
                        Object.defineProperty(this, "data", {value: F, writable: !1});
                        Object.defineProperty(this, "height", {value: n, writable: !1});
                        Object.defineProperty(this, "width", {value: k, writable: !1})
                    }

                    function J(F, k, n, z) {
                        this.Xd = null;
                        this.de = [];
                        this.Zd = [];
                        this.addColorStop = function (B, C) {
                            if (0 > B || 1 < B || !isFinite(B)) throw"offset must be between 0 and 1 inclusively";
                            C = g(C);
                            var E = this.Zd.indexOf(B);
                            if (-1 !== E) this.de[E] = C; else {
                                for (E = 0; E < this.Zd.length && !(this.Zd[E] > B); E++) ;
                                this.Zd.splice(E, 0, B);
                                this.de.splice(E, 0, C)
                            }
                        };
                        this.pe = function () {
                            var B = new J(F, k, n, z);
                            B.de = this.de.slice();
                            B.Zd = this.Zd.slice();
                            return B
                        };
                        this.ke = function () {
                            this.Xd && (this.Xd.delete(), this.Xd = null)
                        };
                        this.re = function (B) {
                            var C = [F, k, n, z];
                            a.Matrix.mapPoints(B, C);
                            B = C[0];
                            var E = C[1], L = C[2];
                            C = C[3];
                            this.ke();
                            return this.Xd = a.Shader.MakeLinearGradient([B, E], [L, C], this.de, this.Zd, a.TileMode.Clamp)
                        }
                    }

                    function N(F, k, n, z, B, C) {
                        if (e([k, n, z, B, C])) {
                            if (0 > C) throw"radii cannot be negative";
                            F.isEmpty() && F.moveTo(k, n);
                            F.arcToTangent(k, n, z, B, C)
                        }
                    }

                    function Q(F) {
                        if (!F.isEmpty()) {
                            var k = F.getBounds();
                            (k[3] - k[1] || k[2] - k[0]) && F.close()
                        }
                    }

                    function T(F, k, n, z, B, C, E) {
                        E = (E - C) / Math.PI * 180;
                        C = C / Math.PI * 180;
                        k = a.LTRBRect(k - z, n - B, k + z, n + B);
                        1E-5 > Math.abs(Math.abs(E) - 360) ? (n = E / 2, F.arcToOval(k, C, n, !1), F.arcToOval(k,
                            C + n, n, !1)) : F.arcToOval(k, C, E, !1)
                    }

                    function t(F, k, n, z, B, C, E, L, Y) {
                        if (e([k, n, z, B, C, E, L])) {
                            if (0 > z || 0 > B) throw"radii cannot be negative";
                            var qa = 2 * Math.PI, fa = E % qa;
                            0 > fa && (fa += qa);
                            var Ia = fa - E;
                            E = fa;
                            L += Ia;
                            !Y && L - E >= qa ? L = E + qa : Y && E - L >= qa ? L = E - qa : !Y && E > L ? L = E + (qa - (E - L) % qa) : Y && E < L && (L = E - (qa - (L - E) % qa));
                            C ? (Y = a.Matrix.rotated(C, k, n), C = a.Matrix.rotated(-C, k, n), F.transform(C), T(F, k, n, z, B, E, L), F.transform(Y)) : T(F, k, n, z, B, E, L)
                        }
                    }

                    function I(F, k, n) {
                        e([k, n]) && (F.isEmpty() && F.moveTo(k, n), F.lineTo(k, n))
                    }

                    function R(F) {
                        this.Vd = null;
                        this.Vd = "string" === typeof F ? a.Path.MakeFromSVGString(F) : F && F.Ze ? F.Vd.copy() : new a.Path;
                        this.Ze = function () {
                            return this.Vd
                        };
                        this.addPath = function (k, n) {
                            n || (n = {a: 1, c: 0, e: 0, b: 0, d: 1, f: 0});
                            this.Vd.addPath(k.Vd, [n.a, n.c, n.e, n.b, n.d, n.f])
                        };
                        this.arc = function (k, n, z, B, C, E) {
                            t(this.Vd, k, n, z, z, 0, B, C, E)
                        };
                        this.arcTo = function (k, n, z, B, C) {
                            N(this.Vd, k, n, z, B, C)
                        };
                        this.bezierCurveTo = function (k, n, z, B, C, E) {
                            var L = this.Vd;
                            e([k, n, z, B, C, E]) && (L.isEmpty() && L.moveTo(k, n), L.cubicTo(k, n, z, B, C, E))
                        };
                        this.closePath = function () {
                            Q(this.Vd)
                        };
                        this.ellipse = function (k, n, z, B, C, E, L, Y) {
                            t(this.Vd, k, n, z, B, C, E, L, Y)
                        };
                        this.lineTo = function (k, n) {
                            I(this.Vd, k, n)
                        };
                        this.moveTo = function (k, n) {
                            var z = this.Vd;
                            e([k, n]) && z.moveTo(k, n)
                        };
                        this.quadraticCurveTo = function (k, n, z, B) {
                            var C = this.Vd;
                            e([k, n, z, B]) && (C.isEmpty() && C.moveTo(k, n), C.quadTo(k, n, z, B))
                        };
                        this.rect = function (k, n, z, B) {
                            var C = this.Vd;
                            k = a.XYWHRect(k, n, z, B);
                            e(k) && C.addRect(k)
                        }
                    }

                    function aa(F, k) {
                        this.Xd = null;
                        this.xf = F;
                        this._transform = a.Matrix.identity();
                        "" === k && (k = "repeat");
                        switch (k) {
                            case "repeat-x":
                                this.xe =
                                    a.TileMode.Repeat;
                                this.ye = a.TileMode.Decal;
                                break;
                            case "repeat-y":
                                this.xe = a.TileMode.Decal;
                                this.ye = a.TileMode.Repeat;
                                break;
                            case "repeat":
                                this.ye = this.xe = a.TileMode.Repeat;
                                break;
                            case "no-repeat":
                                this.ye = this.xe = a.TileMode.Decal;
                                break;
                            default:
                                throw"invalid repetition mode " + k;
                        }
                        this.setTransform = function (n) {
                            n = [n.a, n.c, n.e, n.b, n.d, n.f, 0, 0, 1];
                            e(n) && (this._transform = n)
                        };
                        this.pe = function () {
                            var n = new aa;
                            n.xe = this.xe;
                            n.ye = this.ye;
                            return n
                        };
                        this.ke = function () {
                            this.Xd && (this.Xd.delete(), this.Xd = null)
                        };
                        this.re =
                            function () {
                                this.ke();
                                return this.Xd = this.xf.makeShaderCubic(this.xe, this.ye, 1 / 3, 1 / 3, this._transform)
                            }
                    }

                    function ka(F, k, n, z, B, C) {
                        this.Xd = null;
                        this.de = [];
                        this.Zd = [];
                        this.addColorStop = function (E, L) {
                            if (0 > E || 1 < E || !isFinite(E)) throw"offset must be between 0 and 1 inclusively";
                            L = g(L);
                            var Y = this.Zd.indexOf(E);
                            if (-1 !== Y) this.de[Y] = L; else {
                                for (Y = 0; Y < this.Zd.length && !(this.Zd[Y] > E); Y++) ;
                                this.Zd.splice(Y, 0, E);
                                this.de.splice(Y, 0, L)
                            }
                        };
                        this.pe = function () {
                            var E = new ka(F, k, n, z, B, C);
                            E.de = this.de.slice();
                            E.Zd = this.Zd.slice();
                            return E
                        };
                        this.ke = function () {
                            this.Xd && (this.Xd.delete(), this.Xd = null)
                        };
                        this.re = function (E) {
                            var L = [F, k, z, B];
                            a.Matrix.mapPoints(E, L);
                            var Y = L[0], qa = L[1], fa = L[2];
                            L = L[3];
                            var Ia = (Math.abs(E[0]) + Math.abs(E[4])) / 2;
                            E = n * Ia;
                            Ia *= C;
                            this.ke();
                            return this.Xd = a.Shader.MakeTwoPointConicalGradient([Y, qa], E, [fa, L], Ia, this.de, this.Zd, a.TileMode.Clamp)
                        }
                    }

                    a._testing = {};
                    var ua = {
                        aliceblue: Float32Array.of(.941, .973, 1, 1),
                        antiquewhite: Float32Array.of(.98, .922, .843, 1),
                        aqua: Float32Array.of(0, 1, 1, 1),
                        aquamarine: Float32Array.of(.498,
                            1, .831, 1),
                        azure: Float32Array.of(.941, 1, 1, 1),
                        beige: Float32Array.of(.961, .961, .863, 1),
                        bisque: Float32Array.of(1, .894, .769, 1),
                        black: Float32Array.of(0, 0, 0, 1),
                        blanchedalmond: Float32Array.of(1, .922, .804, 1),
                        blue: Float32Array.of(0, 0, 1, 1),
                        blueviolet: Float32Array.of(.541, .169, .886, 1),
                        brown: Float32Array.of(.647, .165, .165, 1),
                        burlywood: Float32Array.of(.871, .722, .529, 1),
                        cadetblue: Float32Array.of(.373, .62, .627, 1),
                        chartreuse: Float32Array.of(.498, 1, 0, 1),
                        chocolate: Float32Array.of(.824, .412, .118, 1),
                        coral: Float32Array.of(1,
                            .498, .314, 1),
                        cornflowerblue: Float32Array.of(.392, .584, .929, 1),
                        cornsilk: Float32Array.of(1, .973, .863, 1),
                        crimson: Float32Array.of(.863, .078, .235, 1),
                        cyan: Float32Array.of(0, 1, 1, 1),
                        darkblue: Float32Array.of(0, 0, .545, 1),
                        darkcyan: Float32Array.of(0, .545, .545, 1),
                        darkgoldenrod: Float32Array.of(.722, .525, .043, 1),
                        darkgray: Float32Array.of(.663, .663, .663, 1),
                        darkgreen: Float32Array.of(0, .392, 0, 1),
                        darkgrey: Float32Array.of(.663, .663, .663, 1),
                        darkkhaki: Float32Array.of(.741, .718, .42, 1),
                        darkmagenta: Float32Array.of(.545, 0,
                            .545, 1),
                        darkolivegreen: Float32Array.of(.333, .42, .184, 1),
                        darkorange: Float32Array.of(1, .549, 0, 1),
                        darkorchid: Float32Array.of(.6, .196, .8, 1),
                        darkred: Float32Array.of(.545, 0, 0, 1),
                        darksalmon: Float32Array.of(.914, .588, .478, 1),
                        darkseagreen: Float32Array.of(.561, .737, .561, 1),
                        darkslateblue: Float32Array.of(.282, .239, .545, 1),
                        darkslategray: Float32Array.of(.184, .31, .31, 1),
                        darkslategrey: Float32Array.of(.184, .31, .31, 1),
                        darkturquoise: Float32Array.of(0, .808, .82, 1),
                        darkviolet: Float32Array.of(.58, 0, .827, 1),
                        deeppink: Float32Array.of(1,
                            .078, .576, 1),
                        deepskyblue: Float32Array.of(0, .749, 1, 1),
                        dimgray: Float32Array.of(.412, .412, .412, 1),
                        dimgrey: Float32Array.of(.412, .412, .412, 1),
                        dodgerblue: Float32Array.of(.118, .565, 1, 1),
                        firebrick: Float32Array.of(.698, .133, .133, 1),
                        floralwhite: Float32Array.of(1, .98, .941, 1),
                        forestgreen: Float32Array.of(.133, .545, .133, 1),
                        fuchsia: Float32Array.of(1, 0, 1, 1),
                        gainsboro: Float32Array.of(.863, .863, .863, 1),
                        ghostwhite: Float32Array.of(.973, .973, 1, 1),
                        gold: Float32Array.of(1, .843, 0, 1),
                        goldenrod: Float32Array.of(.855, .647, .125,
                            1),
                        gray: Float32Array.of(.502, .502, .502, 1),
                        green: Float32Array.of(0, .502, 0, 1),
                        greenyellow: Float32Array.of(.678, 1, .184, 1),
                        grey: Float32Array.of(.502, .502, .502, 1),
                        honeydew: Float32Array.of(.941, 1, .941, 1),
                        hotpink: Float32Array.of(1, .412, .706, 1),
                        indianred: Float32Array.of(.804, .361, .361, 1),
                        indigo: Float32Array.of(.294, 0, .51, 1),
                        ivory: Float32Array.of(1, 1, .941, 1),
                        khaki: Float32Array.of(.941, .902, .549, 1),
                        lavender: Float32Array.of(.902, .902, .98, 1),
                        lavenderblush: Float32Array.of(1, .941, .961, 1),
                        lawngreen: Float32Array.of(.486,
                            .988, 0, 1),
                        lemonchiffon: Float32Array.of(1, .98, .804, 1),
                        lightblue: Float32Array.of(.678, .847, .902, 1),
                        lightcoral: Float32Array.of(.941, .502, .502, 1),
                        lightcyan: Float32Array.of(.878, 1, 1, 1),
                        lightgoldenrodyellow: Float32Array.of(.98, .98, .824, 1),
                        lightgray: Float32Array.of(.827, .827, .827, 1),
                        lightgreen: Float32Array.of(.565, .933, .565, 1),
                        lightgrey: Float32Array.of(.827, .827, .827, 1),
                        lightpink: Float32Array.of(1, .714, .757, 1),
                        lightsalmon: Float32Array.of(1, .627, .478, 1),
                        lightseagreen: Float32Array.of(.125, .698, .667, 1),
                        lightskyblue: Float32Array.of(.529,
                            .808, .98, 1),
                        lightslategray: Float32Array.of(.467, .533, .6, 1),
                        lightslategrey: Float32Array.of(.467, .533, .6, 1),
                        lightsteelblue: Float32Array.of(.69, .769, .871, 1),
                        lightyellow: Float32Array.of(1, 1, .878, 1),
                        lime: Float32Array.of(0, 1, 0, 1),
                        limegreen: Float32Array.of(.196, .804, .196, 1),
                        linen: Float32Array.of(.98, .941, .902, 1),
                        magenta: Float32Array.of(1, 0, 1, 1),
                        maroon: Float32Array.of(.502, 0, 0, 1),
                        mediumaquamarine: Float32Array.of(.4, .804, .667, 1),
                        mediumblue: Float32Array.of(0, 0, .804, 1),
                        mediumorchid: Float32Array.of(.729, .333,
                            .827, 1),
                        mediumpurple: Float32Array.of(.576, .439, .859, 1),
                        mediumseagreen: Float32Array.of(.235, .702, .443, 1),
                        mediumslateblue: Float32Array.of(.482, .408, .933, 1),
                        mediumspringgreen: Float32Array.of(0, .98, .604, 1),
                        mediumturquoise: Float32Array.of(.282, .82, .8, 1),
                        mediumvioletred: Float32Array.of(.78, .082, .522, 1),
                        midnightblue: Float32Array.of(.098, .098, .439, 1),
                        mintcream: Float32Array.of(.961, 1, .98, 1),
                        mistyrose: Float32Array.of(1, .894, .882, 1),
                        moccasin: Float32Array.of(1, .894, .71, 1),
                        navajowhite: Float32Array.of(1, .871, .678,
                            1),
                        navy: Float32Array.of(0, 0, .502, 1),
                        oldlace: Float32Array.of(.992, .961, .902, 1),
                        olive: Float32Array.of(.502, .502, 0, 1),
                        olivedrab: Float32Array.of(.42, .557, .137, 1),
                        orange: Float32Array.of(1, .647, 0, 1),
                        orangered: Float32Array.of(1, .271, 0, 1),
                        orchid: Float32Array.of(.855, .439, .839, 1),
                        palegoldenrod: Float32Array.of(.933, .91, .667, 1),
                        palegreen: Float32Array.of(.596, .984, .596, 1),
                        paleturquoise: Float32Array.of(.686, .933, .933, 1),
                        palevioletred: Float32Array.of(.859, .439, .576, 1),
                        papayawhip: Float32Array.of(1, .937, .835, 1),
                        peachpuff: Float32Array.of(1, .855, .725, 1),
                        peru: Float32Array.of(.804, .522, .247, 1),
                        pink: Float32Array.of(1, .753, .796, 1),
                        plum: Float32Array.of(.867, .627, .867, 1),
                        powderblue: Float32Array.of(.69, .878, .902, 1),
                        purple: Float32Array.of(.502, 0, .502, 1),
                        rebeccapurple: Float32Array.of(.4, .2, .6, 1),
                        red: Float32Array.of(1, 0, 0, 1),
                        rosybrown: Float32Array.of(.737, .561, .561, 1),
                        royalblue: Float32Array.of(.255, .412, .882, 1),
                        saddlebrown: Float32Array.of(.545, .271, .075, 1),
                        salmon: Float32Array.of(.98, .502, .447, 1),
                        sandybrown: Float32Array.of(.957,
                            .643, .376, 1),
                        seagreen: Float32Array.of(.18, .545, .341, 1),
                        seashell: Float32Array.of(1, .961, .933, 1),
                        sienna: Float32Array.of(.627, .322, .176, 1),
                        silver: Float32Array.of(.753, .753, .753, 1),
                        skyblue: Float32Array.of(.529, .808, .922, 1),
                        slateblue: Float32Array.of(.416, .353, .804, 1),
                        slategray: Float32Array.of(.439, .502, .565, 1),
                        slategrey: Float32Array.of(.439, .502, .565, 1),
                        snow: Float32Array.of(1, .98, .98, 1),
                        springgreen: Float32Array.of(0, 1, .498, 1),
                        steelblue: Float32Array.of(.275, .51, .706, 1),
                        tan: Float32Array.of(.824, .706, .549,
                            1),
                        teal: Float32Array.of(0, .502, .502, 1),
                        thistle: Float32Array.of(.847, .749, .847, 1),
                        tomato: Float32Array.of(1, .388, .278, 1),
                        transparent: Float32Array.of(0, 0, 0, 0),
                        turquoise: Float32Array.of(.251, .878, .816, 1),
                        violet: Float32Array.of(.933, .51, .933, 1),
                        wheat: Float32Array.of(.961, .871, .702, 1),
                        white: Float32Array.of(1, 1, 1, 1),
                        whitesmoke: Float32Array.of(.961, .961, .961, 1),
                        yellow: Float32Array.of(1, 1, 0, 1),
                        yellowgreen: Float32Array.of(.604, .804, .196, 1)
                    };
                    a._testing.parseColor = g;
                    a._testing.colorToString = d;
                    var va = /(italic|oblique|normal|)\s*(small-caps|normal|)\s*(bold|bolder|lighter|[1-9]00|normal|)\s*([\d\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)(.+)/,
                        la = {"Noto Mono": {"*": null}, monospace: {"*": null}};
                    a._testing.parseFontString = m;
                    a.MakeCanvas = function (F, k) {
                        return (F = a.MakeSurface(F, k)) ? new x(F) : null
                    };
                    a.ImageData = function () {
                        if (2 === arguments.length) {
                            var F = arguments[0], k = arguments[1];
                            return new D(new Uint8ClampedArray(4 * F * k), F, k)
                        }
                        if (3 === arguments.length) {
                            var n = arguments[0];
                            if (n.prototype.constructor !== Uint8ClampedArray) throw"bytes must be given as a Uint8ClampedArray";
                            F = arguments[1];
                            k = arguments[2];
                            if (n % 4) throw"bytes must be given in a multiple of 4";
                            if (n % F) throw"bytes must divide evenly by width";
                            if (k && k !== n / (4 * F)) throw"invalid height given";
                            return new D(n, F, n / (4 * F))
                        }
                        throw"invalid number of arguments - takes 2 or 3, saw " + arguments.length;
                    }
                })()
            })(r);
            var sa = {}, ta;
            for (ta in r) r.hasOwnProperty(ta) && (sa[ta] = r[ta]);
            var wa = "./this.program";

            function xa(a, b) {
                throw b;
            }

            var ya = !1, za = !1, Aa = !1, Ba = !1;
            ya = "object" === typeof window;
            za = "function" === typeof importScripts;
            Aa = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
            Ba = !ya && !Aa && !za;
            var Ca = "", Da, Ea, Fa, Ga, Ja;
            if (Aa) Ca = za ? require("path").dirname(Ca) + "/" : __dirname + "/", Da = function (a, b) {
                Ga || (Ga = require("fs"));
                Ja || (Ja = require("path"));
                a = Ja.normalize(a);
                return Ga.readFileSync(a, b ? null : "utf8")
            }, Fa = function (a) {
                a = Da(a, !0);
                a.buffer || (a = new Uint8Array(a));
                assert(a.buffer);
                return a
            }, 1 < process.argv.length && (wa = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), process.on("uncaughtException", function (a) {
                if (!(a instanceof Ka)) throw a;
            }), process.on("unhandledRejection", La), xa = function (a) {
                process.exit(a)
            }, r.inspect =
                function () {
                    return "[Emscripten Module object]"
                }; else if (Ba) "undefined" != typeof read && (Da = function (a) {
                return read(a)
            }), Fa = function (a) {
                if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(a));
                a = read(a, "binary");
                assert("object" === typeof a);
                return a
            }, "function" === typeof quit && (xa = function (a) {
                quit(a)
            }), "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print); else if (ya || za) za ? Ca = self.location.href :
                "undefined" !== typeof document && document.currentScript && (Ca = document.currentScript.src), _scriptDir && (Ca = _scriptDir), 0 !== Ca.indexOf("blob:") ? Ca = Ca.substr(0, Ca.lastIndexOf("/") + 1) : Ca = "", Da = function (a) {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.send(null);
                return b.responseText
            }, za && (Fa = function (a) {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }), Ea = function (a, b, c) {
                var f = new XMLHttpRequest;
                f.open("GET", a, !0);
                f.responseType = "arraybuffer";
                f.onload = function () {
                    200 == f.status || 0 == f.status && f.response ? b(f.response) : c()
                };
                f.onerror = c;
                f.send(null)
            };
            var Ma = r.print || console.log.bind(console), Pa = r.printErr || console.warn.bind(console);
            for (ta in sa) sa.hasOwnProperty(ta) && (r[ta] = sa[ta]);
            sa = null;
            r.thisProgram && (wa = r.thisProgram);
            r.quit && (xa = r.quit);
            var Qa = 0, Ra;
            r.wasmBinary && (Ra = r.wasmBinary);
            var noExitRuntime = r.noExitRuntime || !0;
            "object" !== typeof WebAssembly && La("no native wasm support detected");
            var Sa, Ta = !1;

            function assert(a, b) {
                a || La("Assertion failed: " + b)
            }

            var Ua = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

            function Wa(a, b, c) {
                var f = b + c;
                for (c = b; a[c] && !(c >= f);) ++c;
                if (16 < c - b && a.subarray && Ua) return Ua.decode(a.subarray(b, c));
                for (f = ""; b < c;) {
                    var h = a[b++];
                    if (h & 128) {
                        var l = a[b++] & 63;
                        if (192 == (h & 224)) f += String.fromCharCode((h & 31) << 6 | l); else {
                            var q = a[b++] & 63;
                            h = 224 == (h & 240) ? (h & 15) << 12 | l << 6 | q : (h & 7) << 18 | l << 12 | q << 6 | a[b++] & 63;
                            65536 > h ? f += String.fromCharCode(h) : (h -= 65536, f += String.fromCharCode(55296 | h >> 10, 56320 | h & 1023))
                        }
                    } else f += String.fromCharCode(h)
                }
                return f
            }

            function Xa(a, b) {
                return a ? Wa(G, a, b) : ""
            }

            function ra(a, b, c, f) {
                if (!(0 < f)) return 0;
                var h = c;
                f = c + f - 1;
                for (var l = 0; l < a.length; ++l) {
                    var q = a.charCodeAt(l);
                    if (55296 <= q && 57343 >= q) {
                        var u = a.charCodeAt(++l);
                        q = 65536 + ((q & 1023) << 10) | u & 1023
                    }
                    if (127 >= q) {
                        if (c >= f) break;
                        b[c++] = q
                    } else {
                        if (2047 >= q) {
                            if (c + 1 >= f) break;
                            b[c++] = 192 | q >> 6
                        } else {
                            if (65535 >= q) {
                                if (c + 2 >= f) break;
                                b[c++] = 224 | q >> 12
                            } else {
                                if (c + 3 >= f) break;
                                b[c++] = 240 | q >> 18;
                                b[c++] = 128 | q >> 12 & 63
                            }
                            b[c++] = 128 | q >> 6 & 63
                        }
                        b[c++] = 128 | q & 63
                    }
                }
                b[c] = 0;
                return c - h
            }

            function oa(a) {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var f = a.charCodeAt(c);
                    55296 <= f && 57343 >= f && (f = 65536 + ((f & 1023) << 10) | a.charCodeAt(++c) & 1023);
                    127 >= f ? ++b : b = 2047 >= f ? b + 2 : 65535 >= f ? b + 3 : b + 4
                }
                return b
            }

            var Ya = "undefined" !== typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;

            function Za(a, b) {
                var c = a >> 1;
                for (var f = c + b / 2; !(c >= f) && $a[c];) ++c;
                c <<= 1;
                if (32 < c - a && Ya) return Ya.decode(G.subarray(a, c));
                c = "";
                for (f = 0; !(f >= b / 2); ++f) {
                    var h = ab[a + 2 * f >> 1];
                    if (0 == h) break;
                    c += String.fromCharCode(h)
                }
                return c
            }

            function bb(a, b, c) {
                void 0 === c && (c = 2147483647);
                if (2 > c) return 0;
                c -= 2;
                var f = b;
                c = c < 2 * a.length ? c / 2 : a.length;
                for (var h = 0; h < c; ++h) ab[b >> 1] = a.charCodeAt(h), b += 2;
                ab[b >> 1] = 0;
                return b - f
            }

            function cb(a) {
                return 2 * a.length
            }

            function db(a, b) {
                for (var c = 0, f = ""; !(c >= b / 4);) {
                    var h = P[a + 4 * c >> 2];
                    if (0 == h) break;
                    ++c;
                    65536 <= h ? (h -= 65536, f += String.fromCharCode(55296 | h >> 10, 56320 | h & 1023)) : f += String.fromCharCode(h)
                }
                return f
            }

            function eb(a, b, c) {
                void 0 === c && (c = 2147483647);
                if (4 > c) return 0;
                var f = b;
                c = f + c - 4;
                for (var h = 0; h < a.length; ++h) {
                    var l = a.charCodeAt(h);
                    if (55296 <= l && 57343 >= l) {
                        var q = a.charCodeAt(++h);
                        l = 65536 + ((l & 1023) << 10) | q & 1023
                    }
                    P[b >> 2] = l;
                    b += 4;
                    if (b + 4 > c) break
                }
                P[b >> 2] = 0;
                return b - f
            }

            function fb(a) {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var f = a.charCodeAt(c);
                    55296 <= f && 57343 >= f && ++c;
                    b += 4
                }
                return b
            }

            var gb, lb, G, ab, $a, P, mb, U, nb;

            function ob() {
                var a = Sa.buffer;
                gb = a;
                r.HEAP8 = lb = new Int8Array(a);
                r.HEAP16 = ab = new Int16Array(a);
                r.HEAP32 = P = new Int32Array(a);
                r.HEAPU8 = G = new Uint8Array(a);
                r.HEAPU16 = $a = new Uint16Array(a);
                r.HEAPU32 = mb = new Uint32Array(a);
                r.HEAPF32 = U = new Float32Array(a);
                r.HEAPF64 = nb = new Float64Array(a)
            }

            var pb, qb = [], rb = [], sb = [];

            function tb() {
                var a = r.preRun.shift();
                qb.unshift(a)
            }

            var ub = 0, vb = null, wb = null;
            r.preloadedImages = {};
            r.preloadedAudios = {};

            function La(a) {
                if (r.onAbort) r.onAbort(a);
                Pa(a);
                Ta = !0;
                a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
                ea(a);
                throw a;
            }

            function xb() {
                return yb.startsWith("data:application/octet-stream;base64,")
            }

            var yb = "canvaskit.wasm";
            if (!xb()) {
                var zb = yb;
                yb = r.locateFile ? r.locateFile(zb, Ca) : Ca + zb
            }

            function Ab() {
                var a = yb;
                try {
                    if (a == yb && Ra) return new Uint8Array(Ra);
                    if (Fa) return Fa(a);
                    throw"both async and sync fetching of the wasm failed";
                } catch (b) {
                    La(b)
                }
            }

            function Cb() {
                if (!Ra && (ya || za)) {
                    if ("function" === typeof fetch && !yb.startsWith("file://")) return fetch(yb, {credentials: "same-origin"}).then(function (a) {
                        if (!a.ok) throw"failed to load wasm binary file at '" + yb + "'";
                        return a.arrayBuffer()
                    }).catch(function () {
                        return Ab()
                    });
                    if (Ea) return new Promise(function (a, b) {
                        Ea(yb, function (c) {
                            a(new Uint8Array(c))
                        }, b)
                    })
                }
                return Promise.resolve().then(function () {
                    return Ab()
                })
            }

            function Db(a) {
                for (; 0 < a.length;) {
                    var b = a.shift();
                    if ("function" == typeof b) b(r); else {
                        var c = b.Ag;
                        "number" === typeof c ? void 0 === b.cf ? pb.get(c)() : pb.get(c)(b.cf) : c(void 0 === b.cf ? null : b.cf)
                    }
                }
            }

            function Eb(a) {
                this.Qd = a - 16;
                this.ig = function (b) {
                    P[this.Qd + 8 >> 2] = b
                };
                this.fg = function (b) {
                    P[this.Qd + 0 >> 2] = b
                };
                this.gg = function () {
                    P[this.Qd + 4 >> 2] = 0
                };
                this.eg = function () {
                    lb[this.Qd + 12 >> 0] = 0
                };
                this.hg = function () {
                    lb[this.Qd + 13 >> 0] = 0
                };
                this.Tf = function (b, c) {
                    this.ig(b);
                    this.fg(c);
                    this.gg();
                    this.eg();
                    this.hg()
                }
            }

            var Fb = 0, Gb = {}, Hb = [null, [], []], Ib = {}, Jb = {};

            function Kb(a) {
                for (; a.length;) {
                    var b = a.pop();
                    a.pop()(b)
                }
            }

            function Lb(a) {
                return this.fromWireType(mb[a >> 2])
            }

            var Mb = {}, Nb = {}, Ob = {};

            function Pb(a) {
                if (void 0 === a) return "_unknown";
                a = a.replace(/[^a-zA-Z0-9_]/g, "$");
                var b = a.charCodeAt(0);
                return 48 <= b && 57 >= b ? "_" + a : a
            }

            function Qb(a, b) {
                a = Pb(a);
                return (new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b)
            }

            function Rb(a) {
                var b = Error, c = Qb(a, function (f) {
                    this.name = a;
                    this.message = f;
                    f = Error(f).stack;
                    void 0 !== f && (this.stack = this.toString() + "\n" + f.replace(/^Error(:[^\n]*)?\n/, ""))
                });
                c.prototype = Object.create(b.prototype);
                c.prototype.constructor = c;
                c.prototype.toString = function () {
                    return void 0 === this.message ? this.name : this.name + ": " + this.message
                };
                return c
            }

            var Sb = void 0;

            function Tb(a) {
                throw new Sb(a);
            }

            function Ub(a, b, c) {
                function f(u) {
                    u = c(u);
                    u.length !== a.length && Tb("Mismatched type converter count");
                    for (var y = 0; y < a.length; ++y) Vb(a[y], u[y])
                }

                a.forEach(function (u) {
                    Ob[u] = b
                });
                var h = Array(b.length), l = [], q = 0;
                b.forEach(function (u, y) {
                    Nb.hasOwnProperty(u) ? h[y] = Nb[u] : (l.push(u), Mb.hasOwnProperty(u) || (Mb[u] = []), Mb[u].push(function () {
                        h[y] = Nb[u];
                        ++q;
                        q === l.length && f(h)
                    }))
                });
                0 === l.length && f(h)
            }

            function Wb(a) {
                switch (a) {
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                    case 4:
                        return 2;
                    case 8:
                        return 3;
                    default:
                        throw new TypeError("Unknown type size: " + a);
                }
            }

            var Xb = void 0;

            function Yb(a) {
                for (var b = ""; G[a];) b += Xb[G[a++]];
                return b
            }

            var Zb = void 0;

            function V(a) {
                throw new Zb(a);
            }

            function Vb(a, b, c) {
                c = c || {};
                if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
                var f = b.name;
                a || V('type "' + f + '" must have a positive integer typeid pointer');
                if (Nb.hasOwnProperty(a)) {
                    if (c.Sf) return;
                    V("Cannot register type '" + f + "' twice")
                }
                Nb[a] = b;
                delete Ob[a];
                Mb.hasOwnProperty(a) && (b = Mb[a], delete Mb[a], b.forEach(function (h) {
                    h()
                }))
            }

            function $b(a) {
                V(a.Kd.Wd.Rd.name + " instance already deleted")
            }

            var ac = !1;

            function bc() {
            }

            function cc(a) {
                --a.count.value;
                0 === a.count.value && (a.ce ? a.fe.je(a.ce) : a.Wd.Rd.je(a.Qd))
            }

            function dc(a) {
                if ("undefined" === typeof FinalizationGroup) return dc = function (b) {
                    return b
                }, a;
                ac = new FinalizationGroup(function (b) {
                    for (var c = b.next(); !c.done; c = b.next()) c = c.value, c.Qd ? cc(c) : console.warn("object already deleted: " + c.Qd)
                });
                dc = function (b) {
                    ac.register(b, b.Kd, b.Kd);
                    return b
                };
                bc = function (b) {
                    ac.unregister(b.Kd)
                };
                return dc(a)
            }

            var lc = void 0, mc = [];

            function nc() {
                for (; mc.length;) {
                    var a = mc.pop();
                    a.Kd.Ce = !1;
                    a["delete"]()
                }
            }

            function oc() {
            }

            var pc = {};

            function qc(a, b, c) {
                if (void 0 === a[b].Yd) {
                    var f = a[b];
                    a[b] = function () {
                        a[b].Yd.hasOwnProperty(arguments.length) || V("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].Yd + ")!");
                        return a[b].Yd[arguments.length].apply(this, arguments)
                    };
                    a[b].Yd = [];
                    a[b].Yd[f.Ae] = f
                }
            }

            function rc(a, b, c) {
                r.hasOwnProperty(a) ? ((void 0 === c || void 0 !== r[a].Yd && void 0 !== r[a].Yd[c]) && V("Cannot register public name '" + a + "' twice"), qc(r, a, a), r.hasOwnProperty(c) && V("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), r[a].Yd[c] = b) : (r[a] = b, void 0 !== c && (r[a].Cg = c))
            }

            function sc(a, b, c, f, h, l, q, u) {
                this.name = a;
                this.constructor = b;
                this.De = c;
                this.je = f;
                this.he = h;
                this.Lf = l;
                this.Me = q;
                this.Ff = u;
                this.bg = []
            }

            function tc(a, b, c) {
                for (; b !== c;) b.Me || V("Expected null or instance of " + c.name + ", got an instance of " + b.name), a = b.Me(a), b = b.he;
                return a
            }

            function uc(a, b) {
                if (null === b) return this.ef && V("null is not a valid " + this.name), 0;
                b.Kd || V('Cannot pass "' + vc(b) + '" as a ' + this.name);
                b.Kd.Qd || V("Cannot pass deleted object as a pointer of type " + this.name);
                return tc(b.Kd.Qd, b.Kd.Wd.Rd, this.Rd)
            }

            function wc(a, b) {
                if (null === b) {
                    this.ef && V("null is not a valid " + this.name);
                    if (this.Re) {
                        var c = this.ff();
                        null !== a && a.push(this.je, c);
                        return c
                    }
                    return 0
                }
                b.Kd || V('Cannot pass "' + vc(b) + '" as a ' + this.name);
                b.Kd.Qd || V("Cannot pass deleted object as a pointer of type " + this.name);
                !this.Qe && b.Kd.Wd.Qe && V("Cannot convert argument of type " + (b.Kd.fe ? b.Kd.fe.name : b.Kd.Wd.name) + " to parameter type " + this.name);
                c = tc(b.Kd.Qd, b.Kd.Wd.Rd, this.Rd);
                if (this.Re) switch (void 0 === b.Kd.ce && V("Passing raw pointer to smart pointer is illegal"),
                    this.mg) {
                    case 0:
                        b.Kd.fe === this ? c = b.Kd.ce : V("Cannot convert argument of type " + (b.Kd.fe ? b.Kd.fe.name : b.Kd.Wd.name) + " to parameter type " + this.name);
                        break;
                    case 1:
                        c = b.Kd.ce;
                        break;
                    case 2:
                        if (b.Kd.fe === this) c = b.Kd.ce; else {
                            var f = b.clone();
                            c = this.cg(c, xc(function () {
                                f["delete"]()
                            }));
                            null !== a && a.push(this.je, c)
                        }
                        break;
                    default:
                        V("Unsupporting sharing policy")
                }
                return c
            }

            function yc(a, b) {
                if (null === b) return this.ef && V("null is not a valid " + this.name), 0;
                b.Kd || V('Cannot pass "' + vc(b) + '" as a ' + this.name);
                b.Kd.Qd || V("Cannot pass deleted object as a pointer of type " + this.name);
                b.Kd.Wd.Qe && V("Cannot convert argument of type " + b.Kd.Wd.name + " to parameter type " + this.name);
                return tc(b.Kd.Qd, b.Kd.Wd.Rd, this.Rd)
            }

            function zc(a, b, c) {
                if (b === c) return a;
                if (void 0 === c.he) return null;
                a = zc(a, b, c.he);
                return null === a ? null : c.Ff(a)
            }

            var Ac = {};

            function Bc(a, b) {
                for (void 0 === b && V("ptr should not be undefined"); a.he;) b = a.Me(b), a = a.he;
                return Ac[b]
            }

            function Cc(a, b) {
                b.Wd && b.Qd || Tb("makeClassHandle requires ptr and ptrType");
                !!b.fe !== !!b.ce && Tb("Both smartPtrType and smartPtr must be specified");
                b.count = {value: 1};
                return dc(Object.create(a, {Kd: {value: b}}))
            }

            function Dc(a, b, c, f, h, l, q, u, y, w, H) {
                this.name = a;
                this.Rd = b;
                this.ef = c;
                this.Qe = f;
                this.Re = h;
                this.ag = l;
                this.mg = q;
                this.sf = u;
                this.ff = y;
                this.cg = w;
                this.je = H;
                h || void 0 !== b.he ? this.toWireType = wc : (this.toWireType = f ? uc : yc, this.ee = null)
            }

            function Ec(a, b, c) {
                r.hasOwnProperty(a) || Tb("Replacing nonexistant public symbol");
                void 0 !== r[a].Yd && void 0 !== c ? r[a].Yd[c] = b : (r[a] = b, r[a].Ae = c)
            }

            function Fc(a, b) {
                var c = [];
                return function () {
                    c.length = arguments.length;
                    for (var f = 0; f < arguments.length; f++) c[f] = arguments[f];
                    a.includes("j") ? (f = r["dynCall_" + a], f = c && c.length ? f.apply(null, [b].concat(c)) : f.call(null, b)) : f = pb.get(b).apply(null, c);
                    return f
                }
            }

            function Gc(a, b) {
                a = Yb(a);
                var c = a.includes("j") ? Fc(a, b) : pb.get(b);
                "function" !== typeof c && V("unknown function pointer with signature " + a + ": " + b);
                return c
            }

            var Hc = void 0;

            function Ic(a) {
                a = Jc(a);
                var b = Yb(a);
                Kc(a);
                return b
            }

            function Tc(a, b) {
                function c(l) {
                    h[l] || Nb[l] || (Ob[l] ? Ob[l].forEach(c) : (f.push(l), h[l] = !0))
                }

                var f = [], h = {};
                b.forEach(c);
                throw new Hc(a + ": " + f.map(Ic).join([", "]));
            }

            function Uc(a) {
                var b = Function;
                if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
                var c = Qb(b.name || "unknownFunctionName", function () {
                });
                c.prototype = b.prototype;
                c = new c;
                a = b.apply(c, a);
                return a instanceof Object ? a : c
            }

            function Vc(a, b, c, f, h) {
                var l = b.length;
                2 > l && V("argTypes array size mismatch! Must at least get return value and 'this' types!");
                var q = null !== b[1] && null !== c, u = !1;
                for (c = 1; c < b.length; ++c) if (null !== b[c] && void 0 === b[c].ee) {
                    u = !0;
                    break
                }
                var y = "void" !== b[0].name, w = "", H = "";
                for (c = 0; c < l - 2; ++c) w += (0 !== c ? ", " : "") + "arg" + c, H += (0 !== c ? ", " : "") + "arg" + c + "Wired";
                a = "return function " + Pb(a) + "(" + w + ") {\nif (arguments.length !== " + (l - 2) + ") {\nthrowBindingError('function " + a + " called with ' + arguments.length + ' arguments, expected " +
                    (l - 2) + " args!');\n}\n";
                u && (a += "var destructors = [];\n");
                var K = u ? "destructors" : "null";
                w = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
                f = [V, f, h, Kb, b[0], b[1]];
                q && (a += "var thisWired = classParam.toWireType(" + K + ", this);\n");
                for (c = 0; c < l - 2; ++c) a += "var arg" + c + "Wired = argType" + c + ".toWireType(" + K + ", arg" + c + "); // " + b[c + 2].name + "\n", w.push("argType" + c), f.push(b[c + 2]);
                q && (H = "thisWired" + (0 < H.length ? ", " : "") + H);
                a += (y ? "var rv = " : "") + "invoker(fn" + (0 < H.length ? ", " : "") + H + ");\n";
                if (u) a +=
                    "runDestructors(destructors);\n"; else for (c = q ? 1 : 2; c < b.length; ++c) l = 1 === c ? "thisWired" : "arg" + (c - 2) + "Wired", null !== b[c].ee && (a += l + "_dtor(" + l + "); // " + b[c].name + "\n", w.push(l + "_dtor"), f.push(b[c].ee));
                y && (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
                w.push(a + "}\n");
                return Uc(w).apply(null, f)
            }

            function Wc(a, b) {
                for (var c = [], f = 0; f < a; f++) c.push(P[(b >> 2) + f]);
                return c
            }

            var Xc = [], Yc = [{}, {value: void 0}, {value: null}, {value: !0}, {value: !1}];

            function Zc(a) {
                4 < a && 0 === --Yc[a].gf && (Yc[a] = void 0, Xc.push(a))
            }

            function xc(a) {
                switch (a) {
                    case void 0:
                        return 1;
                    case null:
                        return 2;
                    case !0:
                        return 3;
                    case !1:
                        return 4;
                    default:
                        var b = Xc.length ? Xc.pop() : Yc.length;
                        Yc[b] = {gf: 1, value: a};
                        return b
                }
            }

            function $c(a, b, c) {
                switch (b) {
                    case 0:
                        return function (f) {
                            return this.fromWireType((c ? lb : G)[f])
                        };
                    case 1:
                        return function (f) {
                            return this.fromWireType((c ? ab : $a)[f >> 1])
                        };
                    case 2:
                        return function (f) {
                            return this.fromWireType((c ? P : mb)[f >> 2])
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            function ad(a, b) {
                var c = Nb[a];
                void 0 === c && V(b + " has unknown type " + Ic(a));
                return c
            }

            function vc(a) {
                if (null === a) return "null";
                var b = typeof a;
                return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
            }

            function bd(a, b) {
                switch (b) {
                    case 2:
                        return function (c) {
                            return this.fromWireType(U[c >> 2])
                        };
                    case 3:
                        return function (c) {
                            return this.fromWireType(nb[c >> 3])
                        };
                    default:
                        throw new TypeError("Unknown float type: " + a);
                }
            }

            function cd(a, b, c) {
                switch (b) {
                    case 0:
                        return c ? function (f) {
                            return lb[f]
                        } : function (f) {
                            return G[f]
                        };
                    case 1:
                        return c ? function (f) {
                            return ab[f >> 1]
                        } : function (f) {
                            return $a[f >> 1]
                        };
                    case 2:
                        return c ? function (f) {
                            return P[f >> 2]
                        } : function (f) {
                            return mb[f >> 2]
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            function dd(a) {
                a || V("Cannot use deleted val. handle = " + a);
                return Yc[a].value
            }

            var ed = {};

            function fd(a) {
                var b = ed[a];
                return void 0 === b ? Yb(a) : b
            }

            var gd = [];

            function hd() {
                return "object" === typeof globalThis ? globalThis : Function("return this")()
            }

            function jd(a) {
                var b = gd.length;
                gd.push(a);
                return b
            }

            function kd(a, b) {
                for (var c = Array(a), f = 0; f < a; ++f) c[f] = ad(P[(b >> 2) + f], "parameter " + f);
                return c
            }

            var ld = {}, md;
            Aa ? md = function () {
                var a = process.hrtime();
                return 1E3 * a[0] + a[1] / 1E6
            } : "undefined" !== typeof dateNow ? md = dateNow : md = function () {
                return performance.now()
            };

            function nd(a) {
                var b = a.getExtension("ANGLE_instanced_arrays");
                b && (a.vertexAttribDivisor = function (c, f) {
                    b.vertexAttribDivisorANGLE(c, f)
                }, a.drawArraysInstanced = function (c, f, h, l) {
                    b.drawArraysInstancedANGLE(c, f, h, l)
                }, a.drawElementsInstanced = function (c, f, h, l, q) {
                    b.drawElementsInstancedANGLE(c, f, h, l, q)
                })
            }

            function od(a) {
                var b = a.getExtension("OES_vertex_array_object");
                b && (a.createVertexArray = function () {
                    return b.createVertexArrayOES()
                }, a.deleteVertexArray = function (c) {
                    b.deleteVertexArrayOES(c)
                }, a.bindVertexArray = function (c) {
                    b.bindVertexArrayOES(c)
                }, a.isVertexArray = function (c) {
                    return b.isVertexArrayOES(c)
                })
            }

            function pd(a) {
                var b = a.getExtension("WEBGL_draw_buffers");
                b && (a.drawBuffers = function (c, f) {
                    b.drawBuffersWEBGL(c, f)
                })
            }

            var qd = 1, rd = [], sd = [], td = [], ud = [], na = [], vd = [], wd = [], ma = [], xd = [], yd = [],
                zd = {}, Ad = {}, Bd = 4;

            function Cd(a) {
                Dd || (Dd = a)
            }

            function Ed(a) {
                for (var b = qd++, c = a.length; c < b; c++) a[c] = null;
                return b
            }

            function ha(a, b) {
                a.qf || (a.qf = a.getContext, a.getContext = function (f, h) {
                    h = a.qf(f, h);
                    return "webgl" == f == h instanceof WebGLRenderingContext ? h : null
                });
                var c = 1 < b.majorVersion ? a.getContext("webgl2", b) : a.getContext("webgl", b);
                return c ? Hd(c, b) : 0
            }

            function Hd(a, b) {
                var c = Ed(ma), f = {Rf: c, attributes: b, version: b.majorVersion, le: a};
                a.canvas && (a.canvas.uf = f);
                ma[c] = f;
                ("undefined" === typeof b.Gf || b.Gf) && Id(f);
                return c
            }

            function ia(a) {
                v = ma[a];
                r.zg = W = v && v.le;
                return !(a && !W)
            }

            function Id(a) {
                a || (a = v);
                if (!a.Uf) {
                    a.Uf = !0;
                    var b = a.le;
                    nd(b);
                    od(b);
                    pd(b);
                    b.mf = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
                    b.rf = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
                    2 <= a.version && (b.nf = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                    if (2 > a.version || !b.nf) b.nf = b.getExtension("EXT_disjoint_timer_query");
                    b.Bg = b.getExtension("WEBGL_multi_draw");
                    (b.getSupportedExtensions() || []).forEach(function (c) {
                        c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                    })
                }
            }

            var v, Dd, Jd = [];

            function Kd(a, b, c, f) {
                for (var h = 0; h < a; h++) {
                    var l = W[c](), q = l && Ed(f);
                    l ? (l.name = q, f[q] = l) : Cd(1282);
                    P[b + 4 * h >> 2] = q
                }
            }

            function Ld(a, b) {
                if (b) {
                    var c = void 0;
                    switch (a) {
                        case 36346:
                            c = 1;
                            break;
                        case 36344:
                            return;
                        case 34814:
                        case 36345:
                            c = 0;
                            break;
                        case 34466:
                            var f = W.getParameter(34467);
                            c = f ? f.length : 0;
                            break;
                        case 33309:
                            if (2 > v.version) {
                                Cd(1282);
                                return
                            }
                            c = 2 * (W.getSupportedExtensions() || []).length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > v.version) {
                                Cd(1280);
                                return
                            }
                            c = 33307 == a ? 3 : 0
                    }
                    if (void 0 === c) switch (f = W.getParameter(a), typeof f) {
                        case "number":
                            c = f;
                            break;
                        case "boolean":
                            c = f ? 1 : 0;
                            break;
                        case "string":
                            Cd(1280);
                            return;
                        case "object":
                            if (null === f) switch (a) {
                                case 34964:
                                case 35725:
                                case 34965:
                                case 36006:
                                case 36007:
                                case 32873:
                                case 34229:
                                case 36662:
                                case 36663:
                                case 35053:
                                case 35055:
                                case 36010:
                                case 35097:
                                case 35869:
                                case 32874:
                                case 36389:
                                case 35983:
                                case 35368:
                                case 34068:
                                    c =
                                        0;
                                    break;
                                default:
                                    Cd(1280);
                                    return
                            } else {
                                if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                                    for (a = 0; a < f.length; ++a) P[b + 4 * a >> 2] = f[a];
                                    return
                                }
                                try {
                                    c = f.name | 0
                                } catch (h) {
                                    Cd(1280);
                                    Pa("GL_INVALID_ENUM in glGet0v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + h + ")");
                                    return
                                }
                            }
                            break;
                        default:
                            Cd(1280);
                            Pa("GL_INVALID_ENUM in glGet0v: Native code calling glGet0v(" + a + ") and it returns " + f + " of type " + typeof f + "!");
                            return
                    }
                    P[b >> 2] = c
                } else Cd(1281)
            }

            function Md(a) {
                var b = oa(a) + 1, c = Nd(b);
                ra(a, G, c, b);
                return c
            }

            function Od(a) {
                a -= 5120;
                return 0 == a ? lb : 1 == a ? G : 2 == a ? ab : 4 == a ? P : 6 == a ? U : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? mb : $a
            }

            function Pd(a, b, c, f, h) {
                a = Od(a);
                var l = 31 - Math.clz32(a.BYTES_PER_ELEMENT), q = Bd;
                return a.subarray(h >> l, h + f * (c * ({
                    5: 3,
                    6: 4,
                    8: 2,
                    29502: 3,
                    29504: 4,
                    26917: 2,
                    26918: 2,
                    29846: 3,
                    29847: 4
                }[b - 6402] || 1) * (1 << l) + q - 1 & -q) >> l)
            }

            function Z(a) {
                var b = W.Df, c = b.Ye[a];
                0 <= c && (b.Ye[a] = c = W.getUniformLocation(b, b.tf[a] + (0 < c ? "[" + c + "]" : "")));
                return c
            }

            var Qd = [], Rd = [], Sd = {};

            function Td() {
                if (!Ud) {
                    var a = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: wa || "./this.program"
                    }, b;
                    for (b in Sd) a[b] = Sd[b];
                    var c = [];
                    for (b in a) c.push(b + "=" + a[b]);
                    Ud = c
                }
                return Ud
            }

            var Ud;

            function Vd(a) {
                return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
            }

            function Wd(a, b) {
                for (var c = 0, f = 0; f <= b; c += a[f++]) ;
                return c
            }

            var Xd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                Yd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function Zd(a, b) {
                for (a = new Date(a.getTime()); 0 < b;) {
                    var c = a.getMonth(), f = (Vd(a.getFullYear()) ? Xd : Yd)[c];
                    if (b > f - a.getDate()) b -= f - a.getDate() + 1, a.setDate(1), 11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1)); else {
                        a.setDate(a.getDate() + b);
                        break
                    }
                }
                return a
            }

            function $d(a, b, c, f) {
                function h(A, M, X) {
                    for (A = "number" === typeof A ? A.toString() : A || ""; A.length < M;) A = X[0] + A;
                    return A
                }

                function l(A, M) {
                    return h(A, M, "0")
                }

                function q(A, M) {
                    function X(ba) {
                        return 0 > ba ? -1 : 0 < ba ? 1 : 0
                    }

                    var da;
                    0 === (da = X(A.getFullYear() - M.getFullYear())) && 0 === (da = X(A.getMonth() - M.getMonth())) && (da = X(A.getDate() - M.getDate()));
                    return da
                }

                function u(A) {
                    switch (A.getDay()) {
                        case 0:
                            return new Date(A.getFullYear() - 1, 11, 29);
                        case 1:
                            return A;
                        case 2:
                            return new Date(A.getFullYear(), 0, 3);
                        case 3:
                            return new Date(A.getFullYear(),
                                0, 2);
                        case 4:
                            return new Date(A.getFullYear(), 0, 1);
                        case 5:
                            return new Date(A.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(A.getFullYear() - 1, 11, 30)
                    }
                }

                function y(A) {
                    A = Zd(new Date(A.$d + 1900, 0, 1), A.Xe);
                    var M = new Date(A.getFullYear() + 1, 0, 4), X = u(new Date(A.getFullYear(), 0, 4));
                    M = u(M);
                    return 0 >= q(X, A) ? 0 >= q(M, A) ? A.getFullYear() + 1 : A.getFullYear() : A.getFullYear() - 1
                }

                var w = P[f + 40 >> 2];
                f = {
                    ug: P[f >> 2],
                    tg: P[f + 4 >> 2],
                    Ve: P[f + 8 >> 2],
                    Le: P[f + 12 >> 2],
                    Ee: P[f + 16 >> 2],
                    $d: P[f + 20 >> 2],
                    We: P[f + 24 >> 2],
                    Xe: P[f + 28 >> 2],
                    Fg: P[f + 32 >> 2],
                    sg: P[f +
                    36 >> 2],
                    vg: w ? Xa(w) : ""
                };
                c = Xa(c);
                w = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y"
                };
                for (var H in w) c = c.replace(new RegExp(H, "g"), w[H]);
                var K = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    O = "January February March April May June July August September October November December".split(" ");
                w = {
                    "%a": function (A) {
                        return K[A.We].substring(0, 3)
                    }, "%A": function (A) {
                        return K[A.We]
                    }, "%b": function (A) {
                        return O[A.Ee].substring(0, 3)
                    }, "%B": function (A) {
                        return O[A.Ee]
                    }, "%C": function (A) {
                        return l((A.$d + 1900) / 100 | 0, 2)
                    }, "%d": function (A) {
                        return l(A.Le, 2)
                    }, "%e": function (A) {
                        return h(A.Le, 2, " ")
                    }, "%g": function (A) {
                        return y(A).toString().substring(2)
                    }, "%G": function (A) {
                        return y(A)
                    }, "%H": function (A) {
                        return l(A.Ve,
                            2)
                    }, "%I": function (A) {
                        A = A.Ve;
                        0 == A ? A = 12 : 12 < A && (A -= 12);
                        return l(A, 2)
                    }, "%j": function (A) {
                        return l(A.Le + Wd(Vd(A.$d + 1900) ? Xd : Yd, A.Ee - 1), 3)
                    }, "%m": function (A) {
                        return l(A.Ee + 1, 2)
                    }, "%M": function (A) {
                        return l(A.tg, 2)
                    }, "%n": function () {
                        return "\n"
                    }, "%p": function (A) {
                        return 0 <= A.Ve && 12 > A.Ve ? "AM" : "PM"
                    }, "%S": function (A) {
                        return l(A.ug, 2)
                    }, "%t": function () {
                        return "\t"
                    }, "%u": function (A) {
                        return A.We || 7
                    }, "%U": function (A) {
                        var M = new Date(A.$d + 1900, 0, 1), X = 0 === M.getDay() ? M : Zd(M, 7 - M.getDay());
                        A = new Date(A.$d + 1900, A.Ee, A.Le);
                        return 0 >
                        q(X, A) ? l(Math.ceil((31 - X.getDate() + (Wd(Vd(A.getFullYear()) ? Xd : Yd, A.getMonth() - 1) - 31) + A.getDate()) / 7), 2) : 0 === q(X, M) ? "01" : "00"
                    }, "%V": function (A) {
                        var M = new Date(A.$d + 1901, 0, 4), X = u(new Date(A.$d + 1900, 0, 4));
                        M = u(M);
                        var da = Zd(new Date(A.$d + 1900, 0, 1), A.Xe);
                        return 0 > q(da, X) ? "53" : 0 >= q(M, da) ? "01" : l(Math.ceil((X.getFullYear() < A.$d + 1900 ? A.Xe + 32 - X.getDate() : A.Xe + 1 - X.getDate()) / 7), 2)
                    }, "%w": function (A) {
                        return A.We
                    }, "%W": function (A) {
                        var M = new Date(A.$d, 0, 1),
                            X = 1 === M.getDay() ? M : Zd(M, 0 === M.getDay() ? 1 : 7 - M.getDay() + 1);
                        A = new Date(A.$d + 1900, A.Ee, A.Le);
                        return 0 > q(X, A) ? l(Math.ceil((31 - X.getDate() + (Wd(Vd(A.getFullYear()) ? Xd : Yd, A.getMonth() - 1) - 31) + A.getDate()) / 7), 2) : 0 === q(X, M) ? "01" : "00"
                    }, "%y": function (A) {
                        return (A.$d + 1900).toString().substring(2)
                    }, "%Y": function (A) {
                        return A.$d + 1900
                    }, "%z": function (A) {
                        A = A.sg;
                        var M = 0 <= A;
                        A = Math.abs(A) / 60;
                        return (M ? "+" : "-") + String("0000" + (A / 60 * 100 + A % 60)).slice(-4)
                    }, "%Z": function (A) {
                        return A.vg
                    }, "%%": function () {
                        return "%"
                    }
                };
                for (H in w) c.includes(H) && (c = c.replace(new RegExp(H, "g"), w[H](f)));
                H =
                    ae(c);
                if (H.length > b) return 0;
                lb.set(H, a);
                return H.length - 1
            }

            Sb = r.InternalError = Rb("InternalError");
            for (var be = Array(256), ce = 0; 256 > ce; ++ce) be[ce] = String.fromCharCode(ce);
            Xb = be;
            Zb = r.BindingError = Rb("BindingError");
            oc.prototype.isAliasOf = function (a) {
                if (!(this instanceof oc && a instanceof oc)) return !1;
                var b = this.Kd.Wd.Rd, c = this.Kd.Qd, f = a.Kd.Wd.Rd;
                for (a = a.Kd.Qd; b.he;) c = b.Me(c), b = b.he;
                for (; f.he;) a = f.Me(a), f = f.he;
                return b === f && c === a
            };
            oc.prototype.clone = function () {
                this.Kd.Qd || $b(this);
                if (this.Kd.Ke) return this.Kd.count.value += 1, this;
                var a = dc, b = Object, c = b.create, f = Object.getPrototypeOf(this), h = this.Kd;
                a = a(c.call(b, f, {
                    Kd: {
                        value: {
                            count: h.count,
                            Ce: h.Ce,
                            Ke: h.Ke,
                            Qd: h.Qd,
                            Wd: h.Wd,
                            ce: h.ce,
                            fe: h.fe
                        }
                    }
                }));
                a.Kd.count.value += 1;
                a.Kd.Ce = !1;
                return a
            };
            oc.prototype["delete"] = function () {
                this.Kd.Qd || $b(this);
                this.Kd.Ce && !this.Kd.Ke && V("Object already scheduled for deletion");
                bc(this);
                cc(this.Kd);
                this.Kd.Ke || (this.Kd.ce = void 0, this.Kd.Qd = void 0)
            };
            oc.prototype.isDeleted = function () {
                return !this.Kd.Qd
            };
            oc.prototype.deleteLater = function () {
                this.Kd.Qd || $b(this);
                this.Kd.Ce && !this.Kd.Ke && V("Object already scheduled for deletion");
                mc.push(this);
                1 === mc.length && lc && lc(nc);
                this.Kd.Ce = !0;
                return this
            };
            Dc.prototype.Mf = function (a) {
                this.sf && (a = this.sf(a));
                return a
            };
            Dc.prototype.lf = function (a) {
                this.je && this.je(a)
            };
            Dc.prototype.argPackAdvance = 8;
            Dc.prototype.readValueFromPointer = Lb;
            Dc.prototype.deleteObject = function (a) {
                if (null !== a) a["delete"]()
            };
            Dc.prototype.fromWireType = function (a) {
                function b() {
                    return this.Re ? Cc(this.Rd.De, {Wd: this.ag, Qd: c, fe: this, ce: a}) : Cc(this.Rd.De, {
                        Wd: this,
                        Qd: a
                    })
                }

                var c = this.Mf(a);
                if (!c) return this.lf(a), null;
                var f = Bc(this.Rd, c);
                if (void 0 !== f) {
                    if (0 === f.Kd.count.value) return f.Kd.Qd = c, f.Kd.ce = a, f.clone();
                    f = f.clone();
                    this.lf(a);
                    return f
                }
                f = this.Rd.Lf(c);
                f = pc[f];
                if (!f) return b.call(this);
                f = this.Qe ? f.Bf : f.pointerType;
                var h = zc(c, this.Rd, f.Rd);
                return null === h ? b.call(this) : this.Re ? Cc(f.Rd.De, {Wd: f, Qd: h, fe: this, ce: a}) : Cc(f.Rd.De,
                    {Wd: f, Qd: h})
            };
            r.getInheritedInstanceCount = function () {
                return Object.keys(Ac).length
            };
            r.getLiveInheritedInstances = function () {
                var a = [], b;
                for (b in Ac) Ac.hasOwnProperty(b) && a.push(Ac[b]);
                return a
            };
            r.flushPendingDeletes = nc;
            r.setDelayFunction = function (a) {
                lc = a;
                mc.length && lc && lc(nc)
            };
            Hc = r.UnboundTypeError = Rb("UnboundTypeError");
            r.count_emval_handles = function () {
                for (var a = 0, b = 5; b < Yc.length; ++b) void 0 !== Yc[b] && ++a;
                return a
            };
            r.get_first_emval = function () {
                for (var a = 5; a < Yc.length; ++a) if (void 0 !== Yc[a]) return Yc[a];
                return null
            };
            for (var W, de = 0; 32 > de; ++de) Jd.push(Array(de));
            var ee = new Float32Array(288);
            for (de = 0; 288 > de; ++de) Qd[de] = ee.subarray(0, de + 1);
            var fe = new Int32Array(288);
            for (de = 0; 288 > de; ++de) Rd[de] = fe.subarray(0, de + 1);

            function ae(a) {
                var b = Array(oa(a) + 1);
                ra(a, b, 0, b.length);
                return b
            }

            var ze = {
                Kb: function (a) {
                    return Nd(a + 16) + 16
                },
                Db: function (a, b, c) {
                    (new Eb(a)).Tf(b, c);
                    Fb++;
                    throw a;
                },
                N: function () {
                    return 0
                },
                Bb: function () {
                },
                xb: function () {
                    return 0
                },
                yb: function (a, b, c, f, h, l) {
                    l <<= 12;
                    0 !== (f & 16) && 0 !== a % 65536 ? b = -28 : 0 !== (f & 32) ? (a = ge(65536, b)) ? (he(a, 0, b), Gb[a] = {
                        Zf: a,
                        Yf: b,
                        Af: !0,
                        fd: h,
                        Dg: c,
                        flags: f,
                        offset: l
                    }, b = a) : b = -48 : b = -52;
                    return b
                },
                zb: function (a, b) {
                    if (-1 === (a | 0) || 0 === b) a = -28; else {
                        var c = Gb[a];
                        c && b === c.Yf && (Gb[a] = null, c.Af && Kc(c.Zf));
                        a = 0
                    }
                    return a
                },
                Q: function () {
                },
                P: function () {
                },
                y: function (a) {
                    var b =
                        Jb[a];
                    delete Jb[a];
                    var c = b.ff, f = b.je, h = b.pf, l = h.map(function (q) {
                        return q.Qf
                    }).concat(h.map(function (q) {
                        return q.kg
                    }));
                    Ub([a], l, function (q) {
                        var u = {};
                        h.forEach(function (y, w) {
                            var H = q[w], K = y.Of, O = y.Pf, A = q[w + h.length], M = y.jg, X = y.lg;
                            u[y.Hf] = {
                                read: function (da) {
                                    return H.fromWireType(K(O, da))
                                }, write: function (da, ba) {
                                    var pa = [];
                                    M(X, da, A.toWireType(pa, ba));
                                    Kb(pa)
                                }
                            }
                        });
                        return [{
                            name: b.name, fromWireType: function (y) {
                                var w = {}, H;
                                for (H in u) w[H] = u[H].read(y);
                                f(y);
                                return w
                            }, toWireType: function (y, w) {
                                for (var H in u) if (!(H in
                                    w)) throw new TypeError('Missing field:  "' + H + '"');
                                var K = c();
                                for (H in u) u[H].write(K, w[H]);
                                null !== y && y.push(f, K);
                                return K
                            }, argPackAdvance: 8, readValueFromPointer: Lb, ee: f
                        }]
                    })
                },
                ob: function () {
                },
                Eb: function (a, b, c, f, h) {
                    var l = Wb(c);
                    b = Yb(b);
                    Vb(a, {
                        name: b, fromWireType: function (q) {
                            return !!q
                        }, toWireType: function (q, u) {
                            return u ? f : h
                        }, argPackAdvance: 8, readValueFromPointer: function (q) {
                            if (1 === c) var u = lb; else if (2 === c) u = ab; else if (4 === c) u = P; else throw new TypeError("Unknown boolean type size: " + b);
                            return this.fromWireType(u[q >>
                            l])
                        }, ee: null
                    })
                },
                m: function (a, b, c, f, h, l, q, u, y, w, H, K, O) {
                    H = Yb(H);
                    l = Gc(h, l);
                    u && (u = Gc(q, u));
                    w && (w = Gc(y, w));
                    O = Gc(K, O);
                    var A = Pb(H);
                    rc(A, function () {
                        Tc("Cannot construct " + H + " due to unbound types", [f])
                    });
                    Ub([a, b, c], f ? [f] : [], function (M) {
                        M = M[0];
                        if (f) {
                            var X = M.Rd;
                            var da = X.De
                        } else da = oc.prototype;
                        M = Qb(A, function () {
                            if (Object.getPrototypeOf(this) !== ba) throw new Zb("Use 'new' to construct " + H);
                            if (void 0 === pa.me) throw new Zb(H + " has no accessible constructor");
                            var jb = pa.me[arguments.length];
                            if (void 0 === jb) throw new Zb("Tried to invoke ctor of " +
                                H + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(pa.me).toString() + ") parameters instead!");
                            return jb.apply(this, arguments)
                        });
                        var ba = Object.create(da, {constructor: {value: M}});
                        M.prototype = ba;
                        var pa = new sc(H, M, ba, O, X, l, u, w);
                        X = new Dc(H, pa, !0, !1, !1);
                        da = new Dc(H + "*", pa, !1, !1, !1);
                        var ib = new Dc(H + " const*", pa, !1, !0, !1);
                        pc[a] = {pointerType: da, Bf: ib};
                        Ec(A, M);
                        return [X, da, ib]
                    })
                },
                f: function (a, b, c, f, h, l, q) {
                    var u = Wc(c, f);
                    b = Yb(b);
                    l = Gc(h, l);
                    Ub([], [a], function (y) {
                        function w() {
                            Tc("Cannot call " +
                                H + " due to unbound types", u)
                        }

                        y = y[0];
                        var H = y.name + "." + b, K = y.Rd.constructor;
                        void 0 === K[b] ? (w.Ae = c - 1, K[b] = w) : (qc(K, b, H), K[b].Yd[c - 1] = w);
                        Ub([], u, function (O) {
                            O = [O[0], null].concat(O.slice(1));
                            O = Vc(H, O, null, l, q);
                            void 0 === K[b].Yd ? (O.Ae = c - 1, K[b] = O) : K[b].Yd[c - 1] = O;
                            return []
                        });
                        return []
                    })
                },
                v: function (a, b, c, f, h, l) {
                    assert(0 < b);
                    var q = Wc(b, c);
                    h = Gc(f, h);
                    var u = [l], y = [];
                    Ub([], [a], function (w) {
                        w = w[0];
                        var H = "constructor " + w.name;
                        void 0 === w.Rd.me && (w.Rd.me = []);
                        if (void 0 !== w.Rd.me[b - 1]) throw new Zb("Cannot register multiple constructors with identical number of parameters (" +
                            (b - 1) + ") for class '" + w.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
                        w.Rd.me[b - 1] = function () {
                            Tc("Cannot construct " + w.name + " due to unbound types", q)
                        };
                        Ub([], q, function (K) {
                            w.Rd.me[b - 1] = function () {
                                arguments.length !== b - 1 && V(H + " called with " + arguments.length + " arguments, expected " + (b - 1));
                                y.length = 0;
                                u.length = b;
                                for (var O = 1; O < b; ++O) u[O] = K[O].toWireType(y, arguments[O - 1]);
                                O = h.apply(null, u);
                                Kb(y);
                                return K[0].fromWireType(O)
                            };
                            return []
                        });
                        return []
                    })
                },
                c: function (a, b, c, f, h, l, q, u) {
                    var y = Wc(c, f);
                    b = Yb(b);
                    l = Gc(h, l);
                    Ub([], [a], function (w) {
                        function H() {
                            Tc("Cannot call " + K + " due to unbound types", y)
                        }

                        w = w[0];
                        var K = w.name + "." + b;
                        u && w.Rd.bg.push(b);
                        var O = w.Rd.De, A = O[b];
                        void 0 === A || void 0 === A.Yd && A.className !== w.name && A.Ae === c - 2 ? (H.Ae = c - 2, H.className = w.name, O[b] = H) : (qc(O, b, K), O[b].Yd[c - 2] = H);
                        Ub([], y, function (M) {
                            M = Vc(K, M, w, l, q);
                            void 0 === O[b].Yd ? (M.Ae = c - 2, O[b] = M) : O[b].Yd[c - 2] = M;
                            return []
                        });
                        return []
                    })
                },
                W: function (a, b, c) {
                    a = Yb(a);
                    Ub([], [b], function (f) {
                        f = f[0];
                        r[a] =
                            f.fromWireType(c);
                        return []
                    })
                },
                Cb: function (a, b) {
                    b = Yb(b);
                    Vb(a, {
                        name: b, fromWireType: function (c) {
                            var f = Yc[c].value;
                            Zc(c);
                            return f
                        }, toWireType: function (c, f) {
                            return xc(f)
                        }, argPackAdvance: 8, readValueFromPointer: Lb, ee: null
                    })
                },
                k: function (a, b, c, f) {
                    function h() {
                    }

                    c = Wb(c);
                    b = Yb(b);
                    h.values = {};
                    Vb(a, {
                        name: b, constructor: h, fromWireType: function (l) {
                            return this.constructor.values[l]
                        }, toWireType: function (l, q) {
                            return q.value
                        }, argPackAdvance: 8, readValueFromPointer: $c(b, c, f), ee: null
                    });
                    rc(b, h)
                },
                j: function (a, b, c) {
                    var f = ad(a,
                        "enum");
                    b = Yb(b);
                    a = f.constructor;
                    f = Object.create(f.constructor.prototype, {
                        value: {value: c},
                        constructor: {
                            value: Qb(f.name + "_" + b, function () {
                            })
                        }
                    });
                    a.values[c] = f;
                    a[b] = f
                },
                R: function (a, b, c) {
                    c = Wb(c);
                    b = Yb(b);
                    Vb(a, {
                        name: b, fromWireType: function (f) {
                            return f
                        }, toWireType: function (f, h) {
                            if ("number" !== typeof h && "boolean" !== typeof h) throw new TypeError('Cannot convert "' + vc(h) + '" to ' + this.name);
                            return h
                        }, argPackAdvance: 8, readValueFromPointer: bd(b, c), ee: null
                    })
                },
                t: function (a, b, c, f, h, l) {
                    var q = Wc(b, c);
                    a = Yb(a);
                    h = Gc(f, h);
                    rc(a, function () {
                        Tc("Cannot call " + a + " due to unbound types", q)
                    }, b - 1);
                    Ub([], q, function (u) {
                        u = [u[0], null].concat(u.slice(1));
                        Ec(a, Vc(a, u, null, h, l), b - 1);
                        return []
                    })
                },
                x: function (a, b, c, f, h) {
                    function l(w) {
                        return w
                    }

                    b = Yb(b);
                    -1 === h && (h = 4294967295);
                    var q = Wb(c);
                    if (0 === f) {
                        var u = 32 - 8 * c;
                        l = function (w) {
                            return w << u >>> u
                        }
                    }
                    var y = b.includes("unsigned");
                    Vb(a, {
                        name: b, fromWireType: l, toWireType: function (w, H) {
                            if ("number" !== typeof H && "boolean" !== typeof H) throw new TypeError('Cannot convert "' + vc(H) + '" to ' + this.name);
                            if (H < f ||
                                H > h) throw new TypeError('Passing a number "' + vc(H) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + f + ", " + h + "]!");
                            return y ? H >>> 0 : H | 0
                        }, argPackAdvance: 8, readValueFromPointer: cd(b, q, 0 !== f), ee: null
                    })
                },
                u: function (a, b, c) {
                    function f(l) {
                        l >>= 2;
                        var q = mb;
                        return new h(gb, q[l + 1], q[l])
                    }

                    var h = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
                    c = Yb(c);
                    Vb(a, {name: c, fromWireType: f, argPackAdvance: 8, readValueFromPointer: f},
                        {Sf: !0})
                },
                p: function (a, b, c, f, h, l, q, u, y, w, H, K) {
                    c = Yb(c);
                    l = Gc(h, l);
                    u = Gc(q, u);
                    w = Gc(y, w);
                    K = Gc(H, K);
                    Ub([a], [b], function (O) {
                        O = O[0];
                        return [new Dc(c, O.Rd, !1, !1, !0, O, f, l, u, w, K)]
                    })
                },
                S: function (a, b) {
                    b = Yb(b);
                    var c = "std::string" === b;
                    Vb(a, {
                        name: b, fromWireType: function (f) {
                            var h = mb[f >> 2];
                            if (c) for (var l = f + 4, q = 0; q <= h; ++q) {
                                var u = f + 4 + q;
                                if (q == h || 0 == G[u]) {
                                    l = Xa(l, u - l);
                                    if (void 0 === y) var y = l; else y += String.fromCharCode(0), y += l;
                                    l = u + 1
                                }
                            } else {
                                y = Array(h);
                                for (q = 0; q < h; ++q) y[q] = String.fromCharCode(G[f + 4 + q]);
                                y = y.join("")
                            }
                            Kc(f);
                            return y
                        },
                        toWireType: function (f, h) {
                            h instanceof ArrayBuffer && (h = new Uint8Array(h));
                            var l = "string" === typeof h;
                            l || h instanceof Uint8Array || h instanceof Uint8ClampedArray || h instanceof Int8Array || V("Cannot pass non-string to std::string");
                            var q = (c && l ? function () {
                                return oa(h)
                            } : function () {
                                return h.length
                            })(), u = Nd(4 + q + 1);
                            mb[u >> 2] = q;
                            if (c && l) ra(h, G, u + 4, q + 1); else if (l) for (l = 0; l < q; ++l) {
                                var y = h.charCodeAt(l);
                                255 < y && (Kc(u), V("String has UTF-16 code units that do not fit in 8 bits"));
                                G[u + 4 + l] = y
                            } else for (l = 0; l < q; ++l) G[u +
                            4 + l] = h[l];
                            null !== f && f.push(Kc, u);
                            return u
                        }, argPackAdvance: 8, readValueFromPointer: Lb, ee: function (f) {
                            Kc(f)
                        }
                    })
                },
                H: function (a, b, c) {
                    c = Yb(c);
                    if (2 === b) {
                        var f = Za;
                        var h = bb;
                        var l = cb;
                        var q = function () {
                            return $a
                        };
                        var u = 1
                    } else 4 === b && (f = db, h = eb, l = fb, q = function () {
                        return mb
                    }, u = 2);
                    Vb(a, {
                        name: c, fromWireType: function (y) {
                            for (var w = mb[y >> 2], H = q(), K, O = y + 4, A = 0; A <= w; ++A) {
                                var M = y + 4 + A * b;
                                if (A == w || 0 == H[M >> u]) O = f(O, M - O), void 0 === K ? K = O : (K += String.fromCharCode(0), K += O), O = M + b
                            }
                            Kc(y);
                            return K
                        }, toWireType: function (y, w) {
                            "string" !==
                            typeof w && V("Cannot pass non-string to C++ string type " + c);
                            var H = l(w), K = Nd(4 + H + b);
                            mb[K >> 2] = H >> u;
                            h(w, K + 4, H + b);
                            null !== y && y.push(Kc, K);
                            return K
                        }, argPackAdvance: 8, readValueFromPointer: Lb, ee: function (y) {
                            Kc(y)
                        }
                    })
                },
                z: function (a, b, c, f, h, l) {
                    Jb[a] = {name: Yb(b), ff: Gc(c, f), je: Gc(h, l), pf: []}
                },
                h: function (a, b, c, f, h, l, q, u, y, w) {
                    Jb[a].pf.push({Hf: Yb(b), Qf: c, Of: Gc(f, h), Pf: l, kg: q, jg: Gc(u, y), lg: w})
                },
                Fb: function (a, b) {
                    b = Yb(b);
                    Vb(a, {
                        Vf: !0, name: b, argPackAdvance: 0, fromWireType: function () {
                        }, toWireType: function () {
                        }
                    })
                },
                A: function (a,
                             b, c) {
                    a = dd(a);
                    b = ad(b, "emval::as");
                    var f = [], h = xc(f);
                    P[c >> 2] = h;
                    return b.toWireType(f, a)
                },
                lb: function (a, b, c, f, h) {
                    a = gd[a];
                    b = dd(b);
                    c = fd(c);
                    var l = [];
                    P[f >> 2] = xc(l);
                    return a(b, c, l, h)
                },
                F: function (a, b, c, f) {
                    a = gd[a];
                    b = dd(b);
                    c = fd(c);
                    a(b, c, null, f)
                },
                D: Zc,
                Ab: function (a) {
                    if (0 === a) return xc(hd());
                    a = fd(a);
                    return xc(hd()[a])
                },
                B: function (a, b) {
                    b = kd(a, b);
                    for (var c = b[0], f = c.name + "_$" + b.slice(1).map(function (w) {
                        return w.name
                    }).join("_") + "$", h = ["retType"], l = [c], q = "", u = 0; u < a - 1; ++u) q += (0 !== u ? ", " : "") + "arg" + u, h.push("argType" +
                        u), l.push(b[1 + u]);
                    f = "return function " + Pb("methodCaller_" + f) + "(handle, name, destructors, args) {\n";
                    var y = 0;
                    for (u = 0; u < a - 1; ++u) f += "    var arg" + u + " = argType" + u + ".readValueFromPointer(args" + (y ? "+" + y : "") + ");\n", y += b[u + 1].argPackAdvance;
                    f += "    var rv = handle[name](" + q + ");\n";
                    for (u = 0; u < a - 1; ++u) b[u + 1].deleteObject && (f += "    argType" + u + ".deleteObject(arg" + u + ");\n");
                    c.Vf || (f += "    return retType.toWireType(destructors, rv);\n");
                    h.push(f + "};\n");
                    a = Uc(h).apply(null, l);
                    return jd(a)
                },
                J: function (a, b) {
                    a = dd(a);
                    b = dd(b);
                    return xc(a[b])
                },
                L: function (a) {
                    4 < a && (Yc[a].gf += 1)
                },
                rb: function (a, b, c, f) {
                    a = dd(a);
                    var h = ld[b];
                    if (!h) {
                        h = "";
                        for (var l = 0; l < b; ++l) h += (0 !== l ? ", " : "") + "arg" + l;
                        var q = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";
                        for (l = 0; l < b; ++l) q += "var argType" + l + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + l + '], "parameter ' + l + '");\nvar arg' + l + " = argType" + l + ".readValueFromPointer(args);\nargs += argType" + l + "['argPackAdvance'];\n";
                        h = (new Function("requireRegisteredType",
                            "Module", "__emval_register", q + ("var obj = new constructor(" + h + ");\nreturn __emval_register(obj);\n}\n")))(ad, r, xc);
                        ld[b] = h
                    }
                    return h(a, c, f)
                },
                ib: function () {
                    return xc([])
                },
                La: function (a) {
                    return xc(fd(a))
                },
                jb: function () {
                    return xc({})
                },
                hb: function (a) {
                    a = dd(a);
                    return !a
                },
                kb: function (a) {
                    Kb(Yc[a].value);
                    Zc(a)
                },
                w: function (a, b, c) {
                    a = dd(a);
                    b = dd(b);
                    c = dd(c);
                    a[b] = c
                },
                s: function (a, b) {
                    a = ad(a, "_emval_take_value");
                    a = a.readValueFromPointer(b);
                    return xc(a)
                },
                d: function () {
                    La()
                },
                qb: function (a, b) {
                    if (0 === a) a = Date.now(); else if (1 ===
                        a || 4 === a) a = md(); else return P[ie() >> 2] = 28, -1;
                    P[b >> 2] = a / 1E3 | 0;
                    P[b + 4 >> 2] = a % 1E3 * 1E6 | 0;
                    return 0
                },
                Zc: function (a) {
                    W.activeTexture(a)
                },
                _c: function (a, b) {
                    W.attachShader(sd[a], vd[b])
                },
                Z: function (a, b, c) {
                    W.bindAttribLocation(sd[a], b, Xa(c))
                },
                _: function (a, b) {
                    35051 == a ? W.df = b : 35052 == a && (W.Be = b);
                    W.bindBuffer(a, rd[b])
                },
                Y: function (a, b) {
                    W.bindFramebuffer(a, td[b])
                },
                bc: function (a, b) {
                    W.bindRenderbuffer(a, ud[b])
                },
                Pb: function (a, b) {
                    W.bindSampler(a, xd[b])
                },
                $: function (a, b) {
                    W.bindTexture(a, na[b])
                },
                vc: function (a) {
                    W.bindVertexArray(wd[a])
                },
                yc: function (a) {
                    W.bindVertexArray(wd[a])
                },
                aa: function (a, b, c, f) {
                    W.blendColor(a, b, c, f)
                },
                ba: function (a) {
                    W.blendEquation(a)
                },
                ca: function (a, b) {
                    W.blendFunc(a, b)
                },
                Wb: function (a, b, c, f, h, l, q, u, y, w) {
                    W.blitFramebuffer(a, b, c, f, h, l, q, u, y, w)
                },
                da: function (a, b, c, f) {
                    2 <= v.version ? c ? W.bufferData(a, G, f, c, b) : W.bufferData(a, b, f) : W.bufferData(a, c ? G.subarray(c, c + b) : b, f)
                },
                ea: function (a, b, c, f) {
                    2 <= v.version ? W.bufferSubData(a, b, G, f, c) : W.bufferSubData(a, b, G.subarray(f, f + c))
                },
                cc: function (a) {
                    return W.checkFramebufferStatus(a)
                },
                K: function (a) {
                    W.clear(a)
                },
                X: function (a, b, c, f) {
                    W.clearColor(a, b, c, f)
                },
                O: function (a) {
                    W.clearStencil(a)
                },
                fb: function (a, b, c, f) {
                    return W.clientWaitSync(yd[a], b, (c >>> 0) + 4294967296 * f)
                },
                fa: function (a, b, c, f) {
                    W.colorMask(!!a, !!b, !!c, !!f)
                },
                ga: function (a) {
                    W.compileShader(vd[a])
                },
                ha: function (a, b, c, f, h, l, q, u) {
                    2 <= v.version ? W.Be ? W.compressedTexImage2D(a, b, c, f, h, l, q, u) : W.compressedTexImage2D(a, b, c, f, h, l, G, u, q) : W.compressedTexImage2D(a, b, c, f, h, l, u ? G.subarray(u, u + q) : null)
                },
                ia: function (a, b, c, f, h, l, q, u, y) {
                    2 <= v.version ?
                        W.Be ? W.compressedTexSubImage2D(a, b, c, f, h, l, q, u, y) : W.compressedTexSubImage2D(a, b, c, f, h, l, q, G, y, u) : W.compressedTexSubImage2D(a, b, c, f, h, l, q, y ? G.subarray(y, y + u) : null)
                },
                ja: function (a, b, c, f, h, l, q, u) {
                    W.copyTexSubImage2D(a, b, c, f, h, l, q, u)
                },
                ka: function () {
                    var a = Ed(sd), b = W.createProgram();
                    b.name = a;
                    b.Ue = b.Se = b.Te = 0;
                    b.hf = 1;
                    sd[a] = b;
                    return a
                },
                la: function (a) {
                    var b = Ed(vd);
                    vd[b] = W.createShader(a);
                    return b
                },
                ma: function (a) {
                    W.cullFace(a)
                },
                na: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = P[b + 4 * c >> 2], h = rd[f];
                        h && (W.deleteBuffer(h),
                            h.name = 0, rd[f] = null, f == W.df && (W.df = 0), f == W.Be && (W.Be = 0))
                    }
                },
                dc: function (a, b) {
                    for (var c = 0; c < a; ++c) {
                        var f = P[b + 4 * c >> 2], h = td[f];
                        h && (W.deleteFramebuffer(h), h.name = 0, td[f] = null)
                    }
                },
                oa: function (a) {
                    if (a) {
                        var b = sd[a];
                        b ? (W.deleteProgram(b), b.name = 0, sd[a] = null) : Cd(1281)
                    }
                },
                ec: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = P[b + 4 * c >> 2], h = ud[f];
                        h && (W.deleteRenderbuffer(h), h.name = 0, ud[f] = null)
                    }
                },
                Qb: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = P[b + 4 * c >> 2], h = xd[f];
                        h && (W.deleteSampler(h), h.name = 0, xd[f] = null)
                    }
                },
                pa: function (a) {
                    if (a) {
                        var b =
                            vd[a];
                        b ? (W.deleteShader(b), vd[a] = null) : Cd(1281)
                    }
                },
                Yb: function (a) {
                    if (a) {
                        var b = yd[a];
                        b ? (W.deleteSync(b), b.name = 0, yd[a] = null) : Cd(1281)
                    }
                },
                qa: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = P[b + 4 * c >> 2], h = na[f];
                        h && (W.deleteTexture(h), h.name = 0, na[f] = null)
                    }
                },
                wc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = P[b + 4 * c >> 2];
                        W.deleteVertexArray(wd[f]);
                        wd[f] = null
                    }
                },
                zc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var f = P[b + 4 * c >> 2];
                        W.deleteVertexArray(wd[f]);
                        wd[f] = null
                    }
                },
                ra: function (a) {
                    W.depthMask(!!a)
                },
                sa: function (a) {
                    W.disable(a)
                },
                ta: function (a) {
                    W.disableVertexAttribArray(a)
                },
                ua: function (a, b, c) {
                    W.drawArrays(a, b, c)
                },
                tc: function (a, b, c, f) {
                    W.drawArraysInstanced(a, b, c, f)
                },
                rc: function (a, b, c, f, h) {
                    W.mf.drawArraysInstancedBaseInstanceWEBGL(a, b, c, f, h)
                },
                pc: function (a, b) {
                    for (var c = Jd[a], f = 0; f < a; f++) c[f] = P[b + 4 * f >> 2];
                    W.drawBuffers(c)
                },
                va: function (a, b, c, f) {
                    W.drawElements(a, b, c, f)
                },
                uc: function (a, b, c, f, h) {
                    W.drawElementsInstanced(a, b, c, f, h)
                },
                sc: function (a, b, c, f, h, l, q) {
                    W.mf.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, f, h, l, q)
                },
                jc: function (a, b, c, f, h, l) {
                    W.drawElements(a, f, h, l)
                },
                wa: function (a) {
                    W.enable(a)
                },
                xa: function (a) {
                    W.enableVertexAttribArray(a)
                },
                Ub: function (a, b) {
                    return (a = W.fenceSync(a, b)) ? (b = Ed(yd), a.name = b, yd[b] = a, b) : 0
                },
                ya: function () {
                    W.finish()
                },
                za: function () {
                    W.flush()
                },
                fc: function (a, b, c, f) {
                    W.framebufferRenderbuffer(a, b, c, ud[f])
                },
                gc: function (a, b, c, f, h) {
                    W.framebufferTexture2D(a, b, c, na[f], h)
                },
                Aa: function (a) {
                    W.frontFace(a)
                },
                Ba: function (a, b) {
                    Kd(a, b, "createBuffer", rd)
                },
                hc: function (a, b) {
                    Kd(a, b, "createFramebuffer", td)
                },
                ic: function (a, b) {
                    Kd(a, b, "createRenderbuffer", ud)
                },
                Rb: function (a,
                              b) {
                    Kd(a, b, "createSampler", xd)
                },
                Ca: function (a, b) {
                    Kd(a, b, "createTexture", na)
                },
                xc: function (a, b) {
                    Kd(a, b, "createVertexArray", wd)
                },
                Ac: function (a, b) {
                    Kd(a, b, "createVertexArray", wd)
                },
                Zb: function (a) {
                    W.generateMipmap(a)
                },
                Da: function (a, b, c) {
                    c ? P[c >> 2] = W.getBufferParameter(a, b) : Cd(1281)
                },
                Ea: function () {
                    var a = W.getError() || Dd;
                    Dd = 0;
                    return a
                },
                _b: function (a, b, c, f) {
                    a = W.getFramebufferAttachmentParameter(a, b, c);
                    if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
                    P[f >> 2] = a
                },
                E: function (a, b) {
                    Ld(a, b)
                },
                Fa: function (a, b, c, f) {
                    a = W.getProgramInfoLog(sd[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && f ? ra(a, G, f, b) : 0;
                    c && (P[c >> 2] = b)
                },
                Ga: function (a, b, c) {
                    if (c) if (a >= qd) Cd(1281); else if (a = sd[a], 35716 == b) a = W.getProgramInfoLog(a), null === a && (a = "(unknown error)"), P[c >> 2] = a.length + 1; else if (35719 == b) {
                        if (!a.Ue) for (b = 0; b < W.getProgramParameter(a, 35718); ++b) a.Ue = Math.max(a.Ue, W.getActiveUniform(a, b).name.length + 1);
                        P[c >> 2] = a.Ue
                    } else if (35722 == b) {
                        if (!a.Se) for (b = 0; b < W.getProgramParameter(a, 35721); ++b) a.Se = Math.max(a.Se, W.getActiveAttrib(a,
                            b).name.length + 1);
                        P[c >> 2] = a.Se
                    } else if (35381 == b) {
                        if (!a.Te) for (b = 0; b < W.getProgramParameter(a, 35382); ++b) a.Te = Math.max(a.Te, W.getActiveUniformBlockName(a, b).length + 1);
                        P[c >> 2] = a.Te
                    } else P[c >> 2] = W.getProgramParameter(a, b); else Cd(1281)
                },
                $b: function (a, b, c) {
                    c ? P[c >> 2] = W.getRenderbufferParameter(a, b) : Cd(1281)
                },
                Ha: function (a, b, c, f) {
                    a = W.getShaderInfoLog(vd[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && f ? ra(a, G, f, b) : 0;
                    c && (P[c >> 2] = b)
                },
                Mb: function (a, b, c, f) {
                    a = W.getShaderPrecisionFormat(a, b);
                    P[c >> 2] = a.rangeMin;
                    P[c +
                    4 >> 2] = a.rangeMax;
                    P[f >> 2] = a.precision
                },
                Ia: function (a, b, c) {
                    c ? 35716 == b ? (a = W.getShaderInfoLog(vd[a]), null === a && (a = "(unknown error)"), P[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = W.getShaderSource(vd[a]), P[c >> 2] = a ? a.length + 1 : 0) : P[c >> 2] = W.getShaderParameter(vd[a], b) : Cd(1281)
                },
                I: function (a) {
                    var b = zd[a];
                    if (!b) {
                        switch (a) {
                            case 7939:
                                b = W.getSupportedExtensions() || [];
                                b = b.concat(b.map(function (f) {
                                    return "GL_" + f
                                }));
                                b = Md(b.join(" "));
                                break;
                            case 7936:
                            case 7937:
                            case 37445:
                            case 37446:
                                (b = W.getParameter(a)) || Cd(1280);
                                b = b && Md(b);
                                break;
                            case 7938:
                                b = W.getParameter(7938);
                                b = 2 <= v.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
                                b = Md(b);
                                break;
                            case 35724:
                                b = W.getParameter(35724);
                                var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                                null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                                b = Md(b);
                                break;
                            default:
                                Cd(1280)
                        }
                        zd[a] = b
                    }
                    return b
                },
                eb: function (a, b) {
                    if (2 > v.version) return Cd(1282), 0;
                    var c = Ad[a];
                    if (c) return 0 > b || b >= c.length ? (Cd(1281), 0) : c[b];
                    switch (a) {
                        case 7939:
                            return c = W.getSupportedExtensions() ||
                                [], c = c.concat(c.map(function (f) {
                                return "GL_" + f
                            })), c = c.map(function (f) {
                                return Md(f)
                            }), c = Ad[a] = c, 0 > b || b >= c.length ? (Cd(1281), 0) : c[b];
                        default:
                            return Cd(1280), 0
                    }
                },
                Ja: function (a, b) {
                    function c(A) {
                        return "]" == A.slice(-1) && A.lastIndexOf("[")
                    }

                    b = Xa(b);
                    a = sd[a];
                    var f = a.Ye, h = a.wg, l, q = 0, u = b, y = c(b);
                    if (!f) for (a.Ye = f = {}, a.tf = {}, l = 0; l < W.getProgramParameter(a, 35718); ++l) {
                        var w = W.getActiveUniform(a, l);
                        var H = w.name;
                        w = w.size;
                        var K = c(H);
                        K = 0 < K ? H.slice(0, K) : H;
                        var O = a.hf;
                        a.hf += w;
                        h[K] = [w, O];
                        for (H = 0; H < w; ++H) f[O] = H, a.tf[O++] = K
                    }
                    0 <
                    y && (q = parseInt(b.slice(y + 1)) >>> 0, u = b.slice(0, y));
                    return (h = h[u]) && q < h[0] && (q += h[1], f[q] = f[q] || W.getUniformLocation(a, b)) ? q : -1
                },
                Nb: function (a, b, c) {
                    for (var f = Jd[b], h = 0; h < b; h++) f[h] = P[c + 4 * h >> 2];
                    W.invalidateFramebuffer(a, f)
                },
                Ob: function (a, b, c, f, h, l, q) {
                    for (var u = Jd[b], y = 0; y < b; y++) u[y] = P[c + 4 * y >> 2];
                    W.invalidateSubFramebuffer(a, u, f, h, l, q)
                },
                Vb: function (a) {
                    return W.isSync(yd[a])
                },
                Ka: function (a) {
                    return (a = na[a]) ? W.isTexture(a) : 0
                },
                Ma: function (a) {
                    W.lineWidth(a)
                },
                Na: function (a) {
                    a = sd[a];
                    W.linkProgram(a);
                    a.Ye = 0;
                    a.wg =
                        {}
                },
                nc: function (a, b, c, f, h, l) {
                    W.rf.multiDrawArraysInstancedBaseInstanceWEBGL(a, P, b >> 2, P, c >> 2, P, f >> 2, mb, h >> 2, l)
                },
                oc: function (a, b, c, f, h, l, q, u) {
                    W.rf.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, P, b >> 2, c, P, f >> 2, P, h >> 2, P, l >> 2, mb, q >> 2, u)
                },
                Oa: function (a, b) {
                    3317 == a && (Bd = b);
                    W.pixelStorei(a, b)
                },
                qc: function (a) {
                    W.readBuffer(a)
                },
                Pa: function (a, b, c, f, h, l, q) {
                    if (2 <= v.version) if (W.df) W.readPixels(a, b, c, f, h, l, q); else {
                        var u = Od(l);
                        W.readPixels(a, b, c, f, h, l, u, q >> 31 - Math.clz32(u.BYTES_PER_ELEMENT))
                    } else (q = Pd(l,
                        h, c, f, q)) ? W.readPixels(a, b, c, f, h, l, q) : Cd(1280)
                },
                ac: function (a, b, c, f) {
                    W.renderbufferStorage(a, b, c, f)
                },
                Xb: function (a, b, c, f, h) {
                    W.renderbufferStorageMultisample(a, b, c, f, h)
                },
                Sb: function (a, b, c) {
                    W.samplerParameteri(xd[a], b, c)
                },
                Tb: function (a, b, c) {
                    W.samplerParameteri(xd[a], b, P[c >> 2])
                },
                Qa: function (a, b, c, f) {
                    W.scissor(a, b, c, f)
                },
                Ra: function (a, b, c, f) {
                    for (var h = "", l = 0; l < b; ++l) {
                        var q = f ? P[f + 4 * l >> 2] : -1;
                        h += Xa(P[c + 4 * l >> 2], 0 > q ? void 0 : q)
                    }
                    W.shaderSource(vd[a], h)
                },
                Sa: function (a, b, c) {
                    W.stencilFunc(a, b, c)
                },
                Ta: function (a, b,
                              c, f) {
                    W.stencilFuncSeparate(a, b, c, f)
                },
                Ua: function (a) {
                    W.stencilMask(a)
                },
                Va: function (a, b) {
                    W.stencilMaskSeparate(a, b)
                },
                Wa: function (a, b, c) {
                    W.stencilOp(a, b, c)
                },
                Xa: function (a, b, c, f) {
                    W.stencilOpSeparate(a, b, c, f)
                },
                Ya: function (a, b, c, f, h, l, q, u, y) {
                    if (2 <= v.version) if (W.Be) W.texImage2D(a, b, c, f, h, l, q, u, y); else if (y) {
                        var w = Od(u);
                        W.texImage2D(a, b, c, f, h, l, q, u, w, y >> 31 - Math.clz32(w.BYTES_PER_ELEMENT))
                    } else W.texImage2D(a, b, c, f, h, l, q, u, null); else W.texImage2D(a, b, c, f, h, l, q, u, y ? Pd(u, q, f, h, y) : null)
                },
                Za: function (a, b, c) {
                    W.texParameterf(a,
                        b, c)
                },
                _a: function (a, b, c) {
                    W.texParameterf(a, b, U[c >> 2])
                },
                $a: function (a, b, c) {
                    W.texParameteri(a, b, c)
                },
                ab: function (a, b, c) {
                    W.texParameteri(a, b, P[c >> 2])
                },
                kc: function (a, b, c, f, h) {
                    W.texStorage2D(a, b, c, f, h)
                },
                bb: function (a, b, c, f, h, l, q, u, y) {
                    if (2 <= v.version) if (W.Be) W.texSubImage2D(a, b, c, f, h, l, q, u, y); else if (y) {
                        var w = Od(u);
                        W.texSubImage2D(a, b, c, f, h, l, q, u, w, y >> 31 - Math.clz32(w.BYTES_PER_ELEMENT))
                    } else W.texSubImage2D(a, b, c, f, h, l, q, u, null); else w = null, y && (w = Pd(u, q, h, l, y)), W.texSubImage2D(a, b, c, f, h, l, q, u, w)
                },
                cb: function (a,
                              b) {
                    W.uniform1f(Z(a), b)
                },
                db: function (a, b, c) {
                    if (2 <= v.version) W.uniform1fv(Z(a), U, c >> 2, b); else {
                        if (288 >= b) for (var f = Qd[b - 1], h = 0; h < b; ++h) f[h] = U[c + 4 * h >> 2]; else f = U.subarray(c >> 2, c + 4 * b >> 2);
                        W.uniform1fv(Z(a), f)
                    }
                },
                Vc: function (a, b) {
                    W.uniform1i(Z(a), b)
                },
                Wc: function (a, b, c) {
                    if (2 <= v.version) W.uniform1iv(Z(a), P, c >> 2, b); else {
                        if (288 >= b) for (var f = Rd[b - 1], h = 0; h < b; ++h) f[h] = P[c + 4 * h >> 2]; else f = P.subarray(c >> 2, c + 4 * b >> 2);
                        W.uniform1iv(Z(a), f)
                    }
                },
                Xc: function (a, b, c) {
                    W.uniform2f(Z(a), b, c)
                },
                Yc: function (a, b, c) {
                    if (2 <= v.version) W.uniform2fv(Z(a),
                        U, c >> 2, 2 * b); else {
                        if (144 >= b) for (var f = Qd[2 * b - 1], h = 0; h < 2 * b; h += 2) f[h] = U[c + 4 * h >> 2], f[h + 1] = U[c + (4 * h + 4) >> 2]; else f = U.subarray(c >> 2, c + 8 * b >> 2);
                        W.uniform2fv(Z(a), f)
                    }
                },
                Uc: function (a, b, c) {
                    W.uniform2i(Z(a), b, c)
                },
                Tc: function (a, b, c) {
                    if (2 <= v.version) W.uniform2iv(Z(a), P, c >> 2, 2 * b); else {
                        if (144 >= b) for (var f = Rd[2 * b - 1], h = 0; h < 2 * b; h += 2) f[h] = P[c + 4 * h >> 2], f[h + 1] = P[c + (4 * h + 4) >> 2]; else f = P.subarray(c >> 2, c + 8 * b >> 2);
                        W.uniform2iv(Z(a), f)
                    }
                },
                Sc: function (a, b, c, f) {
                    W.uniform3f(Z(a), b, c, f)
                },
                Rc: function (a, b, c) {
                    if (2 <= v.version) W.uniform3fv(Z(a),
                        U, c >> 2, 3 * b); else {
                        if (96 >= b) for (var f = Qd[3 * b - 1], h = 0; h < 3 * b; h += 3) f[h] = U[c + 4 * h >> 2], f[h + 1] = U[c + (4 * h + 4) >> 2], f[h + 2] = U[c + (4 * h + 8) >> 2]; else f = U.subarray(c >> 2, c + 12 * b >> 2);
                        W.uniform3fv(Z(a), f)
                    }
                },
                Qc: function (a, b, c, f) {
                    W.uniform3i(Z(a), b, c, f)
                },
                Pc: function (a, b, c) {
                    if (2 <= v.version) W.uniform3iv(Z(a), P, c >> 2, 3 * b); else {
                        if (96 >= b) for (var f = Rd[3 * b - 1], h = 0; h < 3 * b; h += 3) f[h] = P[c + 4 * h >> 2], f[h + 1] = P[c + (4 * h + 4) >> 2], f[h + 2] = P[c + (4 * h + 8) >> 2]; else f = P.subarray(c >> 2, c + 12 * b >> 2);
                        W.uniform3iv(Z(a), f)
                    }
                },
                Oc: function (a, b, c, f, h) {
                    W.uniform4f(Z(a),
                        b, c, f, h)
                },
                Nc: function (a, b, c) {
                    if (2 <= v.version) W.uniform4fv(Z(a), U, c >> 2, 4 * b); else {
                        if (72 >= b) {
                            var f = Qd[4 * b - 1], h = U;
                            c >>= 2;
                            for (var l = 0; l < 4 * b; l += 4) {
                                var q = c + l;
                                f[l] = h[q];
                                f[l + 1] = h[q + 1];
                                f[l + 2] = h[q + 2];
                                f[l + 3] = h[q + 3]
                            }
                        } else f = U.subarray(c >> 2, c + 16 * b >> 2);
                        W.uniform4fv(Z(a), f)
                    }
                },
                Bc: function (a, b, c, f, h) {
                    W.uniform4i(Z(a), b, c, f, h)
                },
                Cc: function (a, b, c) {
                    if (2 <= v.version) W.uniform4iv(Z(a), P, c >> 2, 4 * b); else {
                        if (72 >= b) for (var f = Rd[4 * b - 1], h = 0; h < 4 * b; h += 4) f[h] = P[c + 4 * h >> 2], f[h + 1] = P[c + (4 * h + 4) >> 2], f[h + 2] = P[c + (4 * h + 8) >> 2], f[h + 3] = P[c + (4 *
                            h + 12) >> 2]; else f = P.subarray(c >> 2, c + 16 * b >> 2);
                        W.uniform4iv(Z(a), f)
                    }
                },
                Dc: function (a, b, c, f) {
                    if (2 <= v.version) W.uniformMatrix2fv(Z(a), !!c, U, f >> 2, 4 * b); else {
                        if (72 >= b) for (var h = Qd[4 * b - 1], l = 0; l < 4 * b; l += 4) h[l] = U[f + 4 * l >> 2], h[l + 1] = U[f + (4 * l + 4) >> 2], h[l + 2] = U[f + (4 * l + 8) >> 2], h[l + 3] = U[f + (4 * l + 12) >> 2]; else h = U.subarray(f >> 2, f + 16 * b >> 2);
                        W.uniformMatrix2fv(Z(a), !!c, h)
                    }
                },
                Ec: function (a, b, c, f) {
                    if (2 <= v.version) W.uniformMatrix3fv(Z(a), !!c, U, f >> 2, 9 * b); else {
                        if (32 >= b) for (var h = Qd[9 * b - 1], l = 0; l < 9 * b; l += 9) h[l] = U[f + 4 * l >> 2], h[l + 1] = U[f +
                        (4 * l + 4) >> 2], h[l + 2] = U[f + (4 * l + 8) >> 2], h[l + 3] = U[f + (4 * l + 12) >> 2], h[l + 4] = U[f + (4 * l + 16) >> 2], h[l + 5] = U[f + (4 * l + 20) >> 2], h[l + 6] = U[f + (4 * l + 24) >> 2], h[l + 7] = U[f + (4 * l + 28) >> 2], h[l + 8] = U[f + (4 * l + 32) >> 2]; else h = U.subarray(f >> 2, f + 36 * b >> 2);
                        W.uniformMatrix3fv(Z(a), !!c, h)
                    }
                },
                Fc: function (a, b, c, f) {
                    if (2 <= v.version) W.uniformMatrix4fv(Z(a), !!c, U, f >> 2, 16 * b); else {
                        if (18 >= b) {
                            var h = Qd[16 * b - 1], l = U;
                            f >>= 2;
                            for (var q = 0; q < 16 * b; q += 16) {
                                var u = f + q;
                                h[q] = l[u];
                                h[q + 1] = l[u + 1];
                                h[q + 2] = l[u + 2];
                                h[q + 3] = l[u + 3];
                                h[q + 4] = l[u + 4];
                                h[q + 5] = l[u + 5];
                                h[q + 6] = l[u + 6];
                                h[q + 7] =
                                    l[u + 7];
                                h[q + 8] = l[u + 8];
                                h[q + 9] = l[u + 9];
                                h[q + 10] = l[u + 10];
                                h[q + 11] = l[u + 11];
                                h[q + 12] = l[u + 12];
                                h[q + 13] = l[u + 13];
                                h[q + 14] = l[u + 14];
                                h[q + 15] = l[u + 15]
                            }
                        } else h = U.subarray(f >> 2, f + 64 * b >> 2);
                        W.uniformMatrix4fv(Z(a), !!c, h)
                    }
                },
                Gc: function (a) {
                    a = sd[a];
                    W.useProgram(a);
                    W.Df = a
                },
                Hc: function (a, b) {
                    W.vertexAttrib1f(a, b)
                },
                Ic: function (a, b) {
                    W.vertexAttrib2f(a, U[b >> 2], U[b + 4 >> 2])
                },
                Jc: function (a, b) {
                    W.vertexAttrib3f(a, U[b >> 2], U[b + 4 >> 2], U[b + 8 >> 2])
                },
                Kc: function (a, b) {
                    W.vertexAttrib4f(a, U[b >> 2], U[b + 4 >> 2], U[b + 8 >> 2], U[b + 12 >> 2])
                },
                lc: function (a, b) {
                    W.vertexAttribDivisor(a,
                        b)
                },
                mc: function (a, b, c, f, h) {
                    W.vertexAttribIPointer(a, b, c, f, h)
                },
                Lc: function (a, b, c, f, h, l) {
                    W.vertexAttribPointer(a, b, c, !!f, h, l)
                },
                Mc: function (a, b, c, f) {
                    W.viewport(a, b, c, f)
                },
                gb: function (a, b, c, f) {
                    W.waitSync(yd[a], b, (c >>> 0) + 4294967296 * f)
                },
                e: function (a, b) {
                    je(a, b || 1);
                    throw"longjmp";
                },
                pb: function (a) {
                    var b = G.length;
                    a >>>= 0;
                    if (2147483648 < a) return !1;
                    for (var c = 1; 4 >= c; c *= 2) {
                        var f = b * (1 + .2 / c);
                        f = Math.min(f, a + 100663296);
                        f = Math.max(a, f);
                        0 < f % 65536 && (f += 65536 - f % 65536);
                        a:{
                            try {
                                Sa.grow(Math.min(2147483648, f) - gb.byteLength + 65535 >>>
                                    16);
                                ob();
                                var h = 1;
                                break a
                            } catch (l) {
                            }
                            h = void 0
                        }
                        if (h) return !0
                    }
                    return !1
                },
                ub: function (a, b) {
                    var c = 0;
                    Td().forEach(function (f, h) {
                        var l = b + c;
                        h = P[a + 4 * h >> 2] = l;
                        for (l = 0; l < f.length; ++l) lb[h++ >> 0] = f.charCodeAt(l);
                        lb[h >> 0] = 0;
                        c += f.length + 1
                    });
                    return 0
                },
                vb: function (a, b) {
                    var c = Td();
                    P[a >> 2] = c.length;
                    var f = 0;
                    c.forEach(function (h) {
                        f += h.length + 1
                    });
                    P[b >> 2] = f;
                    return 0
                },
                Gb: function (a) {
                    if (!noExitRuntime) {
                        if (r.onExit) r.onExit(a);
                        Ta = !0
                    }
                    xa(a, new Ka(a))
                },
                G: function () {
                    return 0
                },
                tb: function (a, b) {
                    a = 1 == a || 2 == a ? 2 : La();
                    lb[b >> 0] = a;
                    return 0
                },
                nb: function (a, b, c, f, h, l) {
                    a = Ib.Nf(a);
                    b = Ib.Ef(a, b, c, f);
                    P[l >> 2] = b;
                    return 0
                },
                wb: function (a, b, c, f) {
                    a = Ib.Nf(a);
                    b = Ib.Ef(a, b, c);
                    P[f >> 2] = b;
                    return 0
                },
                mb: function () {
                },
                M: function (a, b, c, f) {
                    for (var h = 0, l = 0; l < c; l++) {
                        for (var q = P[b + 8 * l >> 2], u = P[b + (8 * l + 4) >> 2], y = 0; y < u; y++) {
                            var w = G[q + y], H = Hb[a];
                            0 === w || 10 === w ? ((1 === a ? Ma : Pa)(Wa(H, 0)), H.length = 0) : H.push(w)
                        }
                        h += u
                    }
                    P[f >> 2] = h;
                    return 0
                },
                a: function () {
                    return Qa
                },
                l: ke,
                o: le,
                g: me,
                C: ne,
                Lb: oe,
                V: pe,
                U: qe,
                T: re,
                n: se,
                r: te,
                i: ue,
                q: ve,
                Jb: we,
                Hb: xe,
                Ib: ye,
                b: function (a) {
                    Qa = a
                },
                sb: function (a, b, c,
                              f) {
                    return $d(a, b, c, f)
                }
            };
            (function () {
                function a(h) {
                    r.asm = h.exports;
                    Sa = r.asm.$c;
                    ob();
                    pb = r.asm.cd;
                    rb.unshift(r.asm.ad);
                    ub--;
                    r.monitorRunDependencies && r.monitorRunDependencies(ub);
                    0 == ub && (null !== vb && (clearInterval(vb), vb = null), wb && (h = wb, wb = null, h()))
                }

                function b(h) {
                    a(h.instance)
                }

                function c(h) {
                    return Cb().then(function (l) {
                        return WebAssembly.instantiate(l, f)
                    }).then(h, function (l) {
                        Pa("failed to asynchronously prepare wasm: " + l);
                        La(l)
                    })
                }

                var f = {a: ze};
                ub++;
                r.monitorRunDependencies && r.monitorRunDependencies(ub);
                if (r.instantiateWasm) try {
                    return r.instantiateWasm(f,
                        a)
                } catch (h) {
                    return Pa("Module.instantiateWasm callback failed with error: " + h), !1
                }
                (function () {
                    return Ra || "function" !== typeof WebAssembly.instantiateStreaming || xb() || yb.startsWith("file://") || "function" !== typeof fetch ? c(b) : fetch(yb, {credentials: "same-origin"}).then(function (h) {
                        return WebAssembly.instantiateStreaming(h, f).then(b, function (l) {
                            Pa("wasm streaming compile failed: " + l);
                            Pa("falling back to ArrayBuffer instantiation");
                            return c(b)
                        })
                    })
                })().catch(ea);
                return {}
            })();
            r.___wasm_call_ctors = function () {
                return (r.___wasm_call_ctors = r.asm.ad).apply(null, arguments)
            };
            var he = r._memset = function () {
                return (he = r._memset = r.asm.bd).apply(null, arguments)
            }, Nd = r._malloc = function () {
                return (Nd = r._malloc = r.asm.dd).apply(null, arguments)
            }, Kc = r._free = function () {
                return (Kc = r._free = r.asm.ed).apply(null, arguments)
            }, ie = r.___errno_location = function () {
                return (ie = r.___errno_location = r.asm.fd).apply(null, arguments)
            }, Jc = r.___getTypeName = function () {
                return (Jc = r.___getTypeName = r.asm.gd).apply(null, arguments)
            };
            r.___embind_register_native_and_builtin_types = function () {
                return (r.___embind_register_native_and_builtin_types = r.asm.hd).apply(null, arguments)
            };
            var Ae = r.stackSave = function () {
                return (Ae = r.stackSave = r.asm.id).apply(null, arguments)
            }, Be = r.stackRestore = function () {
                return (Be = r.stackRestore = r.asm.jd).apply(null, arguments)
            }, je = r._setThrew = function () {
                return (je = r._setThrew = r.asm.kd).apply(null, arguments)
            }, ge = r._memalign = function () {
                return (ge = r._memalign = r.asm.ld).apply(null, arguments)
            };
            r.dynCall_iiiji = function () {
                return (r.dynCall_iiiji = r.asm.md).apply(null, arguments)
            };
            r.dynCall_ji = function () {
                return (r.dynCall_ji = r.asm.nd).apply(null, arguments)
            };
            r.dynCall_iiji = function () {
                return (r.dynCall_iiji = r.asm.od).apply(null, arguments)
            };
            r.dynCall_iijjiii = function () {
                return (r.dynCall_iijjiii = r.asm.pd).apply(null, arguments)
            };
            r.dynCall_iij = function () {
                return (r.dynCall_iij = r.asm.qd).apply(null, arguments)
            };
            r.dynCall_vijjjii = function () {
                return (r.dynCall_vijjjii = r.asm.rd).apply(null, arguments)
            };
            r.dynCall_viji = function () {
                return (r.dynCall_viji = r.asm.sd).apply(null, arguments)
            };
            r.dynCall_vijiii = function () {
                return (r.dynCall_vijiii = r.asm.td).apply(null, arguments)
            };
            r.dynCall_viiiiij = function () {
                return (r.dynCall_viiiiij = r.asm.ud).apply(null, arguments)
            };
            r.dynCall_viijii = function () {
                return (r.dynCall_viijii = r.asm.vd).apply(null, arguments)
            };
            r.dynCall_jii = function () {
                return (r.dynCall_jii = r.asm.wd).apply(null, arguments)
            };
            r.dynCall_iiij = function () {
                return (r.dynCall_iiij = r.asm.xd).apply(null, arguments)
            };
            r.dynCall_iiiij = function () {
                return (r.dynCall_iiiij = r.asm.yd).apply(null, arguments)
            };
            r.dynCall_viij = function () {
                return (r.dynCall_viij = r.asm.zd).apply(null, arguments)
            };
            r.dynCall_viiij = function () {
                return (r.dynCall_viiij = r.asm.Ad).apply(null, arguments)
            };
            r.dynCall_vij = function () {
                return (r.dynCall_vij = r.asm.Bd).apply(null, arguments)
            };
            r.dynCall_jiiii = function () {
                return (r.dynCall_jiiii = r.asm.Cd).apply(null, arguments)
            };
            r.dynCall_jiiiiii = function () {
                return (r.dynCall_jiiiiii = r.asm.Dd).apply(null, arguments)
            };
            r.dynCall_jiiiiji = function () {
                return (r.dynCall_jiiiiji = r.asm.Ed).apply(null, arguments)
            };
            r.dynCall_iijj = function () {
                return (r.dynCall_iijj = r.asm.Fd).apply(null, arguments)
            };
            r.dynCall_jiji = function () {
                return (r.dynCall_jiji = r.asm.Gd).apply(null, arguments)
            };
            r.dynCall_iiiiij = function () {
                return (r.dynCall_iiiiij = r.asm.Hd).apply(null, arguments)
            };
            r.dynCall_iiiiijj = function () {
                return (r.dynCall_iiiiijj = r.asm.Id).apply(null, arguments)
            };
            r.dynCall_iiiiiijj = function () {
                return (r.dynCall_iiiiiijj = r.asm.Jd).apply(null, arguments)
            };

            function ke(a, b) {
                var c = Ae();
                try {
                    return pb.get(a)(b)
                } catch (f) {
                    Be(c);
                    if (f !== f + 0 && "longjmp" !== f) throw f;
                    je(1, 0)
                }
            }

            function le(a, b, c) {
                var f = Ae();
                try {
                    return pb.get(a)(b, c)
                } catch (h) {
                    Be(f);
                    if (h !== h + 0 && "longjmp" !== h) throw h;
                    je(1, 0)
                }
            }

            function ue(a, b, c, f) {
                var h = Ae();
                try {
                    pb.get(a)(b, c, f)
                } catch (l) {
                    Be(h);
                    if (l !== l + 0 && "longjmp" !== l) throw l;
                    je(1, 0)
                }
            }

            function me(a, b, c, f) {
                var h = Ae();
                try {
                    return pb.get(a)(b, c, f)
                } catch (l) {
                    Be(h);
                    if (l !== l + 0 && "longjmp" !== l) throw l;
                    je(1, 0)
                }
            }

            function se(a, b) {
                var c = Ae();
                try {
                    pb.get(a)(b)
                } catch (f) {
                    Be(c);
                    if (f !== f + 0 && "longjmp" !== f) throw f;
                    je(1, 0)
                }
            }

            function te(a, b, c) {
                var f = Ae();
                try {
                    pb.get(a)(b, c)
                } catch (h) {
                    Be(f);
                    if (h !== h + 0 && "longjmp" !== h) throw h;
                    je(1, 0)
                }
            }

            function oe(a, b, c, f, h, l) {
                var q = Ae();
                try {
                    return pb.get(a)(b, c, f, h, l)
                } catch (u) {
                    Be(q);
                    if (u !== u + 0 && "longjmp" !== u) throw u;
                    je(1, 0)
                }
            }

            function ve(a, b, c, f, h) {
                var l = Ae();
                try {
                    pb.get(a)(b, c, f, h)
                } catch (q) {
                    Be(l);
                    if (q !== q + 0 && "longjmp" !== q) throw q;
                    je(1, 0)
                }
            }

            function pe(a, b, c, f, h, l, q) {
                var u = Ae();
                try {
                    return pb.get(a)(b, c, f, h, l, q)
                } catch (y) {
                    Be(u);
                    if (y !== y + 0 && "longjmp" !== y) throw y;
                    je(1, 0)
                }
            }

            function ne(a, b, c, f, h) {
                var l = Ae();
                try {
                    return pb.get(a)(b, c, f, h)
                } catch (q) {
                    Be(l);
                    if (q !== q + 0 && "longjmp" !== q) throw q;
                    je(1, 0)
                }
            }

            function we(a, b, c, f, h, l) {
                var q = Ae();
                try {
                    pb.get(a)(b, c, f, h, l)
                } catch (u) {
                    Be(q);
                    if (u !== u + 0 && "longjmp" !== u) throw u;
                    je(1, 0)
                }
            }

            function ye(a, b, c, f, h, l, q, u, y, w) {
                var H = Ae();
                try {
                    pb.get(a)(b, c, f, h, l, q, u, y, w)
                } catch (K) {
                    Be(H);
                    if (K !== K + 0 && "longjmp" !== K) throw K;
                    je(1, 0)
                }
            }

            function xe(a, b, c, f, h, l, q) {
                var u = Ae();
                try {
                    pb.get(a)(b, c, f, h, l, q)
                } catch (y) {
                    Be(u);
                    if (y !== y + 0 && "longjmp" !== y) throw y;
                    je(1, 0)
                }
            }

            function qe(a, b, c, f, h, l, q, u, y, w) {
                var H = Ae();
                try {
                    return pb.get(a)(b, c, f, h, l, q, u, y, w)
                } catch (K) {
                    Be(H);
                    if (K !== K + 0 && "longjmp" !== K) throw K;
                    je(1, 0)
                }
            }

            function re(a) {
                var b = Ae();
                try {
                    pb.get(a)()
                } catch (c) {
                    Be(b);
                    if (c !== c + 0 && "longjmp" !== c) throw c;
                    je(1, 0)
                }
            }

            var Ce;

            function Ka(a) {
                this.name = "ExitStatus";
                this.message = "Program terminated with exit(" + a + ")";
                this.status = a
            }

            wb = function De() {
                Ce || Ee();
                Ce || (wb = De)
            };

            function Ee() {
                function a() {
                    if (!Ce && (Ce = !0, r.calledRun = !0, !Ta)) {
                        Db(rb);
                        ca(r);
                        if (r.onRuntimeInitialized) r.onRuntimeInitialized();
                        if (r.postRun) for ("function" == typeof r.postRun && (r.postRun = [r.postRun]); r.postRun.length;) {
                            var b = r.postRun.shift();
                            sb.unshift(b)
                        }
                        Db(sb)
                    }
                }

                if (!(0 < ub)) {
                    if (r.preRun) for ("function" == typeof r.preRun && (r.preRun = [r.preRun]); r.preRun.length;) tb();
                    Db(qb);
                    0 < ub || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function () {
                        setTimeout(function () {
                            r.setStatus("")
                        }, 1);
                        a()
                    }, 1)) : a())
                }
            }

            r.run = Ee;
            if (r.preInit) for ("function" == typeof r.preInit && (r.preInit = [r.preInit]); 0 < r.preInit.length;) r.preInit.pop()();
            Ee();


            return CanvasKitInit.ready
        }
    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = CanvasKitInit;
else if (typeof define === 'function' && define['amd'])
    define([], function () {
        return CanvasKitInit;
    });
else if (typeof exports === 'object')
    exports["CanvasKitInit"] = CanvasKitInit;
