/*! For license information please see sklera-sdk.js.LICENSE.txt */
!(function () {
	var t = {
			449: function (t, e, n) {
				!(function (t) {
					'use strict';
					var e,
						n = (function () {
							try {
								if (
									t.URLSearchParams &&
									'bar' === new t.URLSearchParams('foo=bar').get('foo')
								)
									return t.URLSearchParams;
							} catch (t) {}
							return null;
						})(),
						r = n && 'a=1' === new n({ a: 1 }).toString(),
						o = n && '+' === new n('s=%2B').get('s'),
						i = n && 'size' in n.prototype,
						a = '__URLSearchParams__',
						s =
							!n ||
							((e = new n()).append('s', ' &'), 's=+%26' === e.toString()),
						u = p.prototype,
						c = !(!t.Symbol || !t.Symbol.iterator);
					if (!(n && r && o && s && i)) {
						(u.append = function (t, e) {
							v(this[a], t, e);
						}),
							(u.delete = function (t) {
								delete this[a][t];
							}),
							(u.get = function (t) {
								var e = this[a];
								return this.has(t) ? e[t][0] : null;
							}),
							(u.getAll = function (t) {
								var e = this[a];
								return this.has(t) ? e[t].slice(0) : [];
							}),
							(u.has = function (t) {
								return g(this[a], t);
							}),
							(u.set = function (t, e) {
								this[a][t] = ['' + e];
							}),
							(u.toString = function () {
								var t,
									e,
									n,
									r,
									o = this[a],
									i = [];
								for (e in o)
									for (n = d(e), t = 0, r = o[e]; t < r.length; t++)
										i.push(n + '=' + d(r[t]));
								return i.join('&');
							});
						var f,
							l = t.Proxy && n && (!o || !s || !r || !i);
						l
							? ((f = new Proxy(n, {
									construct: function (t, e) {
										return new t(new p(e[0]).toString());
									},
								})).toString = Function.prototype.toString.bind(p))
							: (f = p),
							Object.defineProperty(t, 'URLSearchParams', { value: f });
						var h = t.URLSearchParams.prototype;
						(h.polyfill = !0),
							!l && t.Symbol && (h[t.Symbol.toStringTag] = 'URLSearchParams'),
							(h.forEach =
								h.forEach ||
								function (t, e) {
									var n = m(this.toString());
									Object.getOwnPropertyNames(n).forEach(function (r) {
										n[r].forEach(function (n) {
											t.call(e, n, r, this);
										}, this);
									}, this);
								}),
							(h.sort =
								h.sort ||
								function () {
									var t,
										e,
										n,
										r = m(this.toString()),
										o = [];
									for (t in r) o.push(t);
									for (o.sort(), e = 0; e < o.length; e++) this.delete(o[e]);
									for (e = 0; e < o.length; e++) {
										var i = o[e],
											a = r[i];
										for (n = 0; n < a.length; n++) this.append(i, a[n]);
									}
								}),
							(h.keys =
								h.keys ||
								function () {
									var t = [];
									return (
										this.forEach(function (e, n) {
											t.push(n);
										}),
										E(t)
									);
								}),
							(h.values =
								h.values ||
								function () {
									var t = [];
									return (
										this.forEach(function (e) {
											t.push(e);
										}),
										E(t)
									);
								}),
							(h.entries =
								h.entries ||
								function () {
									var t = [];
									return (
										this.forEach(function (e, n) {
											t.push([n, e]);
										}),
										E(t)
									);
								}),
							c && (h[t.Symbol.iterator] = h[t.Symbol.iterator] || h.entries),
							h.size ||
								Object.defineProperty(h, 'size', {
									get: function () {
										var t = m(this.toString());
										if (h === this)
											throw new TypeError(
												'Illegal invocation at URLSearchParams.invokeGetter',
											);
										return Object.keys(t).reduce(function (e, n) {
											return e + t[n].length;
										}, 0);
									},
								});
					}
					function p(t) {
						((t = t || '') instanceof URLSearchParams || t instanceof p) &&
							(t = t.toString()),
							(this[a] = m(t));
					}
					function d(t) {
						var e = {
							'!': '%21',
							"'": '%27',
							'(': '%28',
							')': '%29',
							'~': '%7E',
							'%20': '+',
							'%00': '\0',
						};
						return encodeURIComponent(t).replace(
							/[!'\(\)~]|%20|%00/g,
							function (t) {
								return e[t];
							},
						);
					}
					function y(t) {
						return t
							.replace(/[ +]/g, '%20')
							.replace(/(%[a-f0-9]{2})+/gi, function (t) {
								return decodeURIComponent(t);
							});
					}
					function E(e) {
						var n = {
							next: function () {
								var t = e.shift();
								return { done: void 0 === t, value: t };
							},
						};
						return (
							c &&
								(n[t.Symbol.iterator] = function () {
									return n;
								}),
							n
						);
					}
					function m(t) {
						var e = {};
						if ('object' == typeof t)
							if (b(t))
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									if (!b(r) || 2 !== r.length)
										throw new TypeError(
											"Failed to construct 'URLSearchParams': Sequence initializer must only contain pair elements",
										);
									v(e, r[0], r[1]);
								}
							else for (var o in t) t.hasOwnProperty(o) && v(e, o, t[o]);
						else {
							0 === t.indexOf('?') && (t = t.slice(1));
							for (var i = t.split('&'), a = 0; a < i.length; a++) {
								var s = i[a],
									u = s.indexOf('=');
								-1 < u
									? v(e, y(s.slice(0, u)), y(s.slice(u + 1)))
									: s && v(e, y(s), '');
							}
						}
						return e;
					}
					function v(t, e, n) {
						var r =
							'string' == typeof n
								? n
								: null != n && 'function' == typeof n.toString
									? n.toString()
									: JSON.stringify(n);
						g(t, e) ? t[e].push(r) : (t[e] = [r]);
					}
					function b(t) {
						return (
							!!t && '[object Array]' === Object.prototype.toString.call(t)
						);
					}
					function g(t, e) {
						return Object.prototype.hasOwnProperty.call(t, e);
					}
				})(void 0 !== n.g ? n.g : 'undefined' != typeof window ? window : this);
			},
		},
		e = {};
	function n(r) {
		var o = e[r];
		if (void 0 !== o) return o.exports;
		var i = (e[r] = { exports: {} });
		return t[r].call(i.exports, i, i.exports, n), i.exports;
	}
	(n.g = (function () {
		if ('object' == typeof globalThis) return globalThis;
		try {
			return this || new Function('return this')();
		} catch (t) {
			if ('object' == typeof window) return window;
		}
	})()),
		(function () {
			'use strict';
			var t =
					('undefined' != typeof globalThis && globalThis) ||
					('undefined' != typeof self && self) ||
					(void 0 !== t && t),
				e = 'URLSearchParams' in t,
				r = 'Symbol' in t && 'iterator' in Symbol,
				o =
					'FileReader' in t &&
					'Blob' in t &&
					(function () {
						try {
							return new Blob(), !0;
						} catch (t) {
							return !1;
						}
					})(),
				i = 'FormData' in t,
				a = 'ArrayBuffer' in t;
			if (a)
				var s = [
						'[object Int8Array]',
						'[object Uint8Array]',
						'[object Uint8ClampedArray]',
						'[object Int16Array]',
						'[object Uint16Array]',
						'[object Int32Array]',
						'[object Uint32Array]',
						'[object Float32Array]',
						'[object Float64Array]',
					],
					u =
						ArrayBuffer.isView ||
						function (t) {
							return t && s.indexOf(Object.prototype.toString.call(t)) > -1;
						};
			function c(t) {
				if (
					('string' != typeof t && (t = String(t)),
					/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t) || '' === t)
				)
					throw new TypeError(
						'Invalid character in header field name: "' + t + '"',
					);
				return t.toLowerCase();
			}
			function f(t) {
				return 'string' != typeof t && (t = String(t)), t;
			}
			function l(t) {
				var e = {
					next: function () {
						var e = t.shift();
						return { done: void 0 === e, value: e };
					},
				};
				return (
					r &&
						(e[Symbol.iterator] = function () {
							return e;
						}),
					e
				);
			}
			function h(t) {
				(this.map = {}),
					t instanceof h
						? t.forEach(function (t, e) {
								this.append(e, t);
							}, this)
						: Array.isArray(t)
							? t.forEach(function (t) {
									this.append(t[0], t[1]);
								}, this)
							: t &&
								Object.getOwnPropertyNames(t).forEach(function (e) {
									this.append(e, t[e]);
								}, this);
			}
			function p(t) {
				if (t.bodyUsed) return Promise.reject(new TypeError('Already read'));
				t.bodyUsed = !0;
			}
			function d(t) {
				return new Promise(function (e, n) {
					(t.onload = function () {
						e(t.result);
					}),
						(t.onerror = function () {
							n(t.error);
						});
				});
			}
			function y(t) {
				var e = new FileReader(),
					n = d(e);
				return e.readAsArrayBuffer(t), n;
			}
			function E(t) {
				if (t.slice) return t.slice(0);
				var e = new Uint8Array(t.byteLength);
				return e.set(new Uint8Array(t)), e.buffer;
			}
			function m() {
				return (
					(this.bodyUsed = !1),
					(this._initBody = function (t) {
						var n;
						(this.bodyUsed = this.bodyUsed),
							(this._bodyInit = t),
							t
								? 'string' == typeof t
									? (this._bodyText = t)
									: o && Blob.prototype.isPrototypeOf(t)
										? (this._bodyBlob = t)
										: i && FormData.prototype.isPrototypeOf(t)
											? (this._bodyFormData = t)
											: e && URLSearchParams.prototype.isPrototypeOf(t)
												? (this._bodyText = t.toString())
												: a &&
													  o &&
													  (n = t) &&
													  DataView.prototype.isPrototypeOf(n)
													? ((this._bodyArrayBuffer = E(t.buffer)),
														(this._bodyInit = new Blob([
															this._bodyArrayBuffer,
														])))
													: a &&
														  (ArrayBuffer.prototype.isPrototypeOf(t) || u(t))
														? (this._bodyArrayBuffer = E(t))
														: (this._bodyText = t =
																Object.prototype.toString.call(t))
								: (this._bodyText = ''),
							this.headers.get('content-type') ||
								('string' == typeof t
									? this.headers.set('content-type', 'text/plain;charset=UTF-8')
									: this._bodyBlob && this._bodyBlob.type
										? this.headers.set('content-type', this._bodyBlob.type)
										: e &&
											URLSearchParams.prototype.isPrototypeOf(t) &&
											this.headers.set(
												'content-type',
												'application/x-www-form-urlencoded;charset=UTF-8',
											));
					}),
					o &&
						((this.blob = function () {
							var t = p(this);
							if (t) return t;
							if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
							if (this._bodyArrayBuffer)
								return Promise.resolve(new Blob([this._bodyArrayBuffer]));
							if (this._bodyFormData)
								throw new Error('could not read FormData body as blob');
							return Promise.resolve(new Blob([this._bodyText]));
						}),
						(this.arrayBuffer = function () {
							return this._bodyArrayBuffer
								? p(this) ||
										(ArrayBuffer.isView(this._bodyArrayBuffer)
											? Promise.resolve(
													this._bodyArrayBuffer.buffer.slice(
														this._bodyArrayBuffer.byteOffset,
														this._bodyArrayBuffer.byteOffset +
															this._bodyArrayBuffer.byteLength,
													),
												)
											: Promise.resolve(this._bodyArrayBuffer))
								: this.blob().then(y);
						})),
					(this.text = function () {
						var t,
							e,
							n,
							r = p(this);
						if (r) return r;
						if (this._bodyBlob)
							return (
								(t = this._bodyBlob),
								(n = d((e = new FileReader()))),
								e.readAsText(t),
								n
							);
						if (this._bodyArrayBuffer)
							return Promise.resolve(
								(function (t) {
									for (
										var e = new Uint8Array(t), n = new Array(e.length), r = 0;
										r < e.length;
										r++
									)
										n[r] = String.fromCharCode(e[r]);
									return n.join('');
								})(this._bodyArrayBuffer),
							);
						if (this._bodyFormData)
							throw new Error('could not read FormData body as text');
						return Promise.resolve(this._bodyText);
					}),
					i &&
						(this.formData = function () {
							return this.text().then(g);
						}),
					(this.json = function () {
						return this.text().then(JSON.parse);
					}),
					this
				);
			}
			(h.prototype.append = function (t, e) {
				(t = c(t)), (e = f(e));
				var n = this.map[t];
				this.map[t] = n ? n + ', ' + e : e;
			}),
				(h.prototype.delete = function (t) {
					delete this.map[c(t)];
				}),
				(h.prototype.get = function (t) {
					return (t = c(t)), this.has(t) ? this.map[t] : null;
				}),
				(h.prototype.has = function (t) {
					return this.map.hasOwnProperty(c(t));
				}),
				(h.prototype.set = function (t, e) {
					this.map[c(t)] = f(e);
				}),
				(h.prototype.forEach = function (t, e) {
					for (var n in this.map)
						this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
				}),
				(h.prototype.keys = function () {
					var t = [];
					return (
						this.forEach(function (e, n) {
							t.push(n);
						}),
						l(t)
					);
				}),
				(h.prototype.values = function () {
					var t = [];
					return (
						this.forEach(function (e) {
							t.push(e);
						}),
						l(t)
					);
				}),
				(h.prototype.entries = function () {
					var t = [];
					return (
						this.forEach(function (e, n) {
							t.push([n, e]);
						}),
						l(t)
					);
				}),
				r && (h.prototype[Symbol.iterator] = h.prototype.entries);
			var v = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
			function b(t, e) {
				if (!(this instanceof b))
					throw new TypeError(
						'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
					);
				var n,
					r,
					o = (e = e || {}).body;
				if (t instanceof b) {
					if (t.bodyUsed) throw new TypeError('Already read');
					(this.url = t.url),
						(this.credentials = t.credentials),
						e.headers || (this.headers = new h(t.headers)),
						(this.method = t.method),
						(this.mode = t.mode),
						(this.signal = t.signal),
						o || null == t._bodyInit || ((o = t._bodyInit), (t.bodyUsed = !0));
				} else this.url = String(t);
				if (
					((this.credentials =
						e.credentials || this.credentials || 'same-origin'),
					(!e.headers && this.headers) || (this.headers = new h(e.headers)),
					(this.method =
						((r = (n = e.method || this.method || 'GET').toUpperCase()),
						v.indexOf(r) > -1 ? r : n)),
					(this.mode = e.mode || this.mode || null),
					(this.signal = e.signal || this.signal),
					(this.referrer = null),
					('GET' === this.method || 'HEAD' === this.method) && o)
				)
					throw new TypeError('Body not allowed for GET or HEAD requests');
				if (
					(this._initBody(o),
					!(
						('GET' !== this.method && 'HEAD' !== this.method) ||
						('no-store' !== e.cache && 'no-cache' !== e.cache)
					))
				) {
					var i = /([?&])_=[^&]*/;
					i.test(this.url)
						? (this.url = this.url.replace(i, '$1_=' + new Date().getTime()))
						: (this.url +=
								(/\?/.test(this.url) ? '&' : '?') +
								'_=' +
								new Date().getTime());
				}
			}
			function g(t) {
				var e = new FormData();
				return (
					t
						.trim()
						.split('&')
						.forEach(function (t) {
							if (t) {
								var n = t.split('='),
									r = n.shift().replace(/\+/g, ' '),
									o = n.join('=').replace(/\+/g, ' ');
								e.append(decodeURIComponent(r), decodeURIComponent(o));
							}
						}),
					e
				);
			}
			function _(t, e) {
				if (!(this instanceof _))
					throw new TypeError(
						'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
					);
				e || (e = {}),
					(this.type = 'default'),
					(this.status = void 0 === e.status ? 200 : e.status),
					(this.ok = this.status >= 200 && this.status < 300),
					(this.statusText = void 0 === e.statusText ? '' : '' + e.statusText),
					(this.headers = new h(e.headers)),
					(this.url = e.url || ''),
					this._initBody(t);
			}
			(b.prototype.clone = function () {
				return new b(this, { body: this._bodyInit });
			}),
				m.call(b.prototype),
				m.call(_.prototype),
				(_.prototype.clone = function () {
					return new _(this._bodyInit, {
						status: this.status,
						statusText: this.statusText,
						headers: new h(this.headers),
						url: this.url,
					});
				}),
				(_.error = function () {
					var t = new _(null, { status: 0, statusText: '' });
					return (t.type = 'error'), t;
				});
			var w = [301, 302, 303, 307, 308];
			_.redirect = function (t, e) {
				if (-1 === w.indexOf(e)) throw new RangeError('Invalid status code');
				return new _(null, { status: e, headers: { location: t } });
			};
			var T = t.DOMException;
			try {
				new T();
			} catch (t) {
				((T = function (t, e) {
					(this.message = t), (this.name = e);
					var n = Error(t);
					this.stack = n.stack;
				}).prototype = Object.create(Error.prototype)),
					(T.prototype.constructor = T);
			}
			function S(e, n) {
				return new Promise(function (r, i) {
					var s = new b(e, n);
					if (s.signal && s.signal.aborted)
						return i(new T('Aborted', 'AbortError'));
					var u = new XMLHttpRequest();
					function c() {
						u.abort();
					}
					(u.onload = function () {
						var t,
							e,
							n = {
								status: u.status,
								statusText: u.statusText,
								headers:
									((t = u.getAllResponseHeaders() || ''),
									(e = new h()),
									t
										.replace(/\r?\n[\t ]+/g, ' ')
										.split('\r')
										.map(function (t) {
											return 0 === t.indexOf('\n') ? t.substr(1, t.length) : t;
										})
										.forEach(function (t) {
											var n = t.split(':'),
												r = n.shift().trim();
											if (r) {
												var o = n.join(':').trim();
												e.append(r, o);
											}
										}),
									e),
							};
						n.url =
							'responseURL' in u
								? u.responseURL
								: n.headers.get('X-Request-URL');
						var o = 'response' in u ? u.response : u.responseText;
						setTimeout(function () {
							r(new _(o, n));
						}, 0);
					}),
						(u.onerror = function () {
							setTimeout(function () {
								i(new TypeError('Network request failed'));
							}, 0);
						}),
						(u.ontimeout = function () {
							setTimeout(function () {
								i(new TypeError('Network request failed'));
							}, 0);
						}),
						(u.onabort = function () {
							setTimeout(function () {
								i(new T('Aborted', 'AbortError'));
							}, 0);
						}),
						u.open(
							s.method,
							(function (e) {
								try {
									return '' === e && t.location.href ? t.location.href : e;
								} catch (t) {
									return e;
								}
							})(s.url),
							!0,
						),
						'include' === s.credentials
							? (u.withCredentials = !0)
							: 'omit' === s.credentials && (u.withCredentials = !1),
						'responseType' in u &&
							(o
								? (u.responseType = 'blob')
								: a &&
									s.headers.get('Content-Type') &&
									-1 !==
										s.headers
											.get('Content-Type')
											.indexOf('application/octet-stream') &&
									(u.responseType = 'arraybuffer')),
						!n || 'object' != typeof n.headers || n.headers instanceof h
							? s.headers.forEach(function (t, e) {
									u.setRequestHeader(e, t);
								})
							: Object.getOwnPropertyNames(n.headers).forEach(function (t) {
									u.setRequestHeader(t, f(n.headers[t]));
								}),
						s.signal &&
							(s.signal.addEventListener('abort', c),
							(u.onreadystatechange = function () {
								4 === u.readyState && s.signal.removeEventListener('abort', c);
							})),
						u.send(void 0 === s._bodyInit ? null : s._bodyInit);
				});
			}
			function A() {
				var t,
					e,
					n,
					r =
						(window.location.href,
						(t = new URLSearchParams(window.location.search)),
						(e = t.get('paii')),
						(n = t.get('pasdk')),
						e && n ? { paii: e, pasdk: n } : null);
				return r && r.paii && r.pasdk
					? { isPublicApp: !0, appItemId: r.paii, sdkEndpoint: r.pasdk }
					: { isPublicApp: !1 };
			}
			function P(t, e) {
				(null == e || e > t.length) && (e = t.length);
				for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
				return r;
			}
			(S.polyfill = !0),
				t.fetch ||
					((t.fetch = S), (t.Headers = h), (t.Request = b), (t.Response = _)),
				n(449);
			var O = new Map();
			function I() {
				B.send('REGISTER_EVENTS', Array.from(O.keys()));
			}
			function L(t, e) {
				var n;
				O.has(t) &&
					O.get(t).apply(
						void 0,
						(function (t) {
							if (Array.isArray(t)) return P(t);
						})((n = e)) ||
							(function (t) {
								if (
									('undefined' != typeof Symbol &&
										null != t[Symbol.iterator]) ||
									null != t['@@iterator']
								)
									return Array.from(t);
							})(n) ||
							(function (t, e) {
								if (t) {
									if ('string' == typeof t) return P(t, e);
									var n = Object.prototype.toString.call(t).slice(8, -1);
									return (
										'Object' === n && t.constructor && (n = t.constructor.name),
										'Map' === n || 'Set' === n
											? Array.from(t)
											: 'Arguments' === n ||
												  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
												? P(t, e)
												: void 0
									);
								}
							})(n) ||
							(function () {
								throw new TypeError(
									'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
								);
							})(),
					);
			}
			function R(t) {
				return (
					(R =
						'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
							? function (t) {
									return typeof t;
								}
							: function (t) {
									return t &&
										'function' == typeof Symbol &&
										t.constructor === Symbol &&
										t !== Symbol.prototype
										? 'symbol'
										: typeof t;
								}),
					R(t)
				);
			}
			function C(t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						'value' in r && (r.writable = !0),
						Object.defineProperty(t, D(r.key), r);
				}
			}
			function x(t, e, n) {
				return (
					(e = D(e)) in t
						? Object.defineProperty(t, e, {
								value: n,
								enumerable: !0,
								configurable: !0,
								writable: !0,
							})
						: (t[e] = n),
					t
				);
			}
			function D(t) {
				var e = (function (t, e) {
					if ('object' !== R(t) || null === t) return t;
					var n = t[Symbol.toPrimitive];
					if (void 0 !== n) {
						var r = n.call(t, 'string');
						if ('object' !== R(r)) return r;
						throw new TypeError('@@toPrimitive must return a primitive value.');
					}
					return String(t);
				})(t);
				return 'symbol' === R(e) ? e : String(e);
			}
			var N = A(),
				k = N.isPublicApp,
				U = N.appItemId,
				G = N.sdkEndpoint,
				j = !1,
				F = (function () {
					function t() {
						!(function (t, e) {
							if (!(t instanceof e))
								throw new TypeError('Cannot call a class as a function');
						})(this, t);
					}
					var e, n;
					return (
						(e = t),
						(n = [
							{
								key: 'registerResponseCallback',
								value: function (t) {
									var e = this,
										n = this.responseCallbacks.length,
										r = setTimeout(function () {
											var t = e.responseCallbacks[n];
											t && (t.cb('timeout'), delete e.responseCallbacks[n]);
										}, this.RESPONSE_TIMEOUT);
									return this.responseCallbacks.push({ cb: t, timeout: r }), n;
								},
							},
							{
								key: 'init',
								value: function (t) {
									(this.skleraSDK = t), this.initEventListener();
								},
							},
							{
								key: 'initEventListener',
								value: function () {
									var t = this;
									window.addEventListener('message', function (e) {
										e.data &&
											e.data.appMessage &&
											t.onAppMessage(e.data.appMessage, e);
									});
								},
							},
							{
								key: 'onAppMessage',
								value: function () {
									var t =
											arguments.length > 0 && void 0 !== arguments[0]
												? arguments[0]
												: {},
										e = arguments.length > 1 ? arguments[1] : void 0;
									switch (t.type) {
										case 'INIT':
										case 'REINIT':
											if (j) return;
											(j = !0),
												(this.appWindow = e.source),
												'file://' == e.origin
													? (this.appOrigin = '*')
													: (this.appOrigin = e.origin),
												(this.uuid = t.uuid),
												this.send('LOAD_DATA');
											break;
										case 'INIT_DATA':
											this.skleraSDK.appInit(t.data.screen, t.data.config);
											break;
										case 'ON_SHOW':
											break;
										case 'RESPONSE_DATA':
											var n = t.data,
												r = n.responseId,
												o = n.data,
												i = this.responseCallbacks[r];
											i &&
												(clearTimeout(i.timeout),
												i.cb(null, o),
												delete this.responseCallbacks[r]);
											break;
										case 'ON_EVENT':
											t.data && t.data.event && L(t.data.event, t.data.args);
											break;
										case 'SEND_APP_EVENT':
											this.skleraSDK.sendCustomAppEvent(t.data);
											break;
										case 'SEND_VIEWER_STATE':
											this.skleraSDK.sendSpotStateChange(t.data.state);
									}
								},
							},
							{
								key: 'send',
								value: function (t, e, n) {
									if (k)
										fetch(G, {
											method: 'POST',
											headers: {
												Accept: 'application/json',
												'Content-Type': 'application/json',
											},
											body: JSON.stringify({ type: t, data: e, appItemId: U }),
										})
											.then(function (t) {
												return t.json();
											})
											.then(function (t) {
												return n && n(null, t.data);
											})
											.catch(function (t) {
												console.log('ERROR', t), n && n(t);
											});
									else if (this.appWindow && this.appOrigin) {
										var r = null;
										n && (r = this.registerResponseCallback(n)),
											this.appWindow.postMessage(
												{ type: t, uuid: this.uuid, data: e, responseId: r },
												this.appOrigin,
											);
									}
								},
							},
							{
								key: 'sendPromise',
								value: function (e, n, r) {
									return new Promise(function (o, i) {
										t.send(e, n, function (t, e) {
											t ? (r && r(t), i(t)) : (r && r(null, e), o(e));
										});
									});
								},
							},
						]),
						null && C(e.prototype, null),
						n && C(e, n),
						Object.defineProperty(e, 'prototype', { writable: !1 }),
						t
					);
				})();
			x(F, 'responseCallbacks', []), x(F, 'RESPONSE_TIMEOUT', 3e4);
			var B = F;
			function M(t) {
				return (
					(M =
						'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
							? function (t) {
									return typeof t;
								}
							: function (t) {
									return t &&
										'function' == typeof Symbol &&
										t.constructor === Symbol &&
										t !== Symbol.prototype
										? 'symbol'
										: typeof t;
								}),
					M(t)
				);
			}
			function H() {
				H = function () {
					return t;
				};
				var t = {},
					e = Object.prototype,
					n = e.hasOwnProperty,
					r =
						Object.defineProperty ||
						function (t, e, n) {
							t[e] = n.value;
						},
					o = 'function' == typeof Symbol ? Symbol : {},
					i = o.iterator || '@@iterator',
					a = o.asyncIterator || '@@asyncIterator',
					s = o.toStringTag || '@@toStringTag';
				function u(t, e, n) {
					return (
						Object.defineProperty(t, e, {
							value: n,
							enumerable: !0,
							configurable: !0,
							writable: !0,
						}),
						t[e]
					);
				}
				try {
					u({}, '');
				} catch (t) {
					u = function (t, e, n) {
						return (t[e] = n);
					};
				}
				function c(t, e, n, o) {
					var i = e && e.prototype instanceof h ? e : h,
						a = Object.create(i.prototype),
						s = new A(o || []);
					return r(a, '_invoke', { value: _(t, n, s) }), a;
				}
				function f(t, e, n) {
					try {
						return { type: 'normal', arg: t.call(e, n) };
					} catch (t) {
						return { type: 'throw', arg: t };
					}
				}
				t.wrap = c;
				var l = {};
				function h() {}
				function p() {}
				function d() {}
				var y = {};
				u(y, i, function () {
					return this;
				});
				var E = Object.getPrototypeOf,
					m = E && E(E(P([])));
				m && m !== e && n.call(m, i) && (y = m);
				var v = (d.prototype = h.prototype = Object.create(y));
				function b(t) {
					['next', 'throw', 'return'].forEach(function (e) {
						u(t, e, function (t) {
							return this._invoke(e, t);
						});
					});
				}
				function g(t, e) {
					function o(r, i, a, s) {
						var u = f(t[r], t, i);
						if ('throw' !== u.type) {
							var c = u.arg,
								l = c.value;
							return l && 'object' == M(l) && n.call(l, '__await')
								? e.resolve(l.__await).then(
										function (t) {
											o('next', t, a, s);
										},
										function (t) {
											o('throw', t, a, s);
										},
									)
								: e.resolve(l).then(
										function (t) {
											(c.value = t), a(c);
										},
										function (t) {
											return o('throw', t, a, s);
										},
									);
						}
						s(u.arg);
					}
					var i;
					r(this, '_invoke', {
						value: function (t, n) {
							function r() {
								return new e(function (e, r) {
									o(t, n, e, r);
								});
							}
							return (i = i ? i.then(r, r) : r());
						},
					});
				}
				function _(t, e, n) {
					var r = 'suspendedStart';
					return function (o, i) {
						if ('executing' === r)
							throw new Error('Generator is already running');
						if ('completed' === r) {
							if ('throw' === o) throw i;
							return { value: void 0, done: !0 };
						}
						for (n.method = o, n.arg = i; ; ) {
							var a = n.delegate;
							if (a) {
								var s = w(a, n);
								if (s) {
									if (s === l) continue;
									return s;
								}
							}
							if ('next' === n.method) n.sent = n._sent = n.arg;
							else if ('throw' === n.method) {
								if ('suspendedStart' === r) throw ((r = 'completed'), n.arg);
								n.dispatchException(n.arg);
							} else 'return' === n.method && n.abrupt('return', n.arg);
							r = 'executing';
							var u = f(t, e, n);
							if ('normal' === u.type) {
								if (
									((r = n.done ? 'completed' : 'suspendedYield'), u.arg === l)
								)
									continue;
								return { value: u.arg, done: n.done };
							}
							'throw' === u.type &&
								((r = 'completed'), (n.method = 'throw'), (n.arg = u.arg));
						}
					};
				}
				function w(t, e) {
					var n = e.method,
						r = t.iterator[n];
					if (void 0 === r)
						return (
							(e.delegate = null),
							('throw' === n &&
								t.iterator.return &&
								((e.method = 'return'),
								(e.arg = void 0),
								w(t, e),
								'throw' === e.method)) ||
								('return' !== n &&
									((e.method = 'throw'),
									(e.arg = new TypeError(
										"The iterator does not provide a '" + n + "' method",
									)))),
							l
						);
					var o = f(r, t.iterator, e.arg);
					if ('throw' === o.type)
						return (
							(e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), l
						);
					var i = o.arg;
					return i
						? i.done
							? ((e[t.resultName] = i.value),
								(e.next = t.nextLoc),
								'return' !== e.method &&
									((e.method = 'next'), (e.arg = void 0)),
								(e.delegate = null),
								l)
							: i
						: ((e.method = 'throw'),
							(e.arg = new TypeError('iterator result is not an object')),
							(e.delegate = null),
							l);
				}
				function T(t) {
					var e = { tryLoc: t[0] };
					1 in t && (e.catchLoc = t[1]),
						2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
						this.tryEntries.push(e);
				}
				function S(t) {
					var e = t.completion || {};
					(e.type = 'normal'), delete e.arg, (t.completion = e);
				}
				function A(t) {
					(this.tryEntries = [{ tryLoc: 'root' }]),
						t.forEach(T, this),
						this.reset(!0);
				}
				function P(t) {
					if (t) {
						var e = t[i];
						if (e) return e.call(t);
						if ('function' == typeof t.next) return t;
						if (!isNaN(t.length)) {
							var r = -1,
								o = function e() {
									for (; ++r < t.length; )
										if (n.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
									return (e.value = void 0), (e.done = !0), e;
								};
							return (o.next = o);
						}
					}
					return { next: O };
				}
				function O() {
					return { value: void 0, done: !0 };
				}
				return (
					(p.prototype = d),
					r(v, 'constructor', { value: d, configurable: !0 }),
					r(d, 'constructor', { value: p, configurable: !0 }),
					(p.displayName = u(d, s, 'GeneratorFunction')),
					(t.isGeneratorFunction = function (t) {
						var e = 'function' == typeof t && t.constructor;
						return (
							!!e &&
							(e === p || 'GeneratorFunction' === (e.displayName || e.name))
						);
					}),
					(t.mark = function (t) {
						return (
							Object.setPrototypeOf
								? Object.setPrototypeOf(t, d)
								: ((t.__proto__ = d), u(t, s, 'GeneratorFunction')),
							(t.prototype = Object.create(v)),
							t
						);
					}),
					(t.awrap = function (t) {
						return { __await: t };
					}),
					b(g.prototype),
					u(g.prototype, a, function () {
						return this;
					}),
					(t.AsyncIterator = g),
					(t.async = function (e, n, r, o, i) {
						void 0 === i && (i = Promise);
						var a = new g(c(e, n, r, o), i);
						return t.isGeneratorFunction(n)
							? a
							: a.next().then(function (t) {
									return t.done ? t.value : a.next();
								});
					}),
					b(v),
					u(v, s, 'Generator'),
					u(v, i, function () {
						return this;
					}),
					u(v, 'toString', function () {
						return '[object Generator]';
					}),
					(t.keys = function (t) {
						var e = Object(t),
							n = [];
						for (var r in e) n.push(r);
						return (
							n.reverse(),
							function t() {
								for (; n.length; ) {
									var r = n.pop();
									if (r in e) return (t.value = r), (t.done = !1), t;
								}
								return (t.done = !0), t;
							}
						);
					}),
					(t.values = P),
					(A.prototype = {
						constructor: A,
						reset: function (t) {
							if (
								((this.prev = 0),
								(this.next = 0),
								(this.sent = this._sent = void 0),
								(this.done = !1),
								(this.delegate = null),
								(this.method = 'next'),
								(this.arg = void 0),
								this.tryEntries.forEach(S),
								!t)
							)
								for (var e in this)
									't' === e.charAt(0) &&
										n.call(this, e) &&
										!isNaN(+e.slice(1)) &&
										(this[e] = void 0);
						},
						stop: function () {
							this.done = !0;
							var t = this.tryEntries[0].completion;
							if ('throw' === t.type) throw t.arg;
							return this.rval;
						},
						dispatchException: function (t) {
							if (this.done) throw t;
							var e = this;
							function r(n, r) {
								return (
									(a.type = 'throw'),
									(a.arg = t),
									(e.next = n),
									r && ((e.method = 'next'), (e.arg = void 0)),
									!!r
								);
							}
							for (var o = this.tryEntries.length - 1; o >= 0; --o) {
								var i = this.tryEntries[o],
									a = i.completion;
								if ('root' === i.tryLoc) return r('end');
								if (i.tryLoc <= this.prev) {
									var s = n.call(i, 'catchLoc'),
										u = n.call(i, 'finallyLoc');
									if (s && u) {
										if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
										if (this.prev < i.finallyLoc) return r(i.finallyLoc);
									} else if (s) {
										if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
									} else {
										if (!u)
											throw new Error('try statement without catch or finally');
										if (this.prev < i.finallyLoc) return r(i.finallyLoc);
									}
								}
							}
						},
						abrupt: function (t, e) {
							for (var r = this.tryEntries.length - 1; r >= 0; --r) {
								var o = this.tryEntries[r];
								if (
									o.tryLoc <= this.prev &&
									n.call(o, 'finallyLoc') &&
									this.prev < o.finallyLoc
								) {
									var i = o;
									break;
								}
							}
							i &&
								('break' === t || 'continue' === t) &&
								i.tryLoc <= e &&
								e <= i.finallyLoc &&
								(i = null);
							var a = i ? i.completion : {};
							return (
								(a.type = t),
								(a.arg = e),
								i
									? ((this.method = 'next'), (this.next = i.finallyLoc), l)
									: this.complete(a)
							);
						},
						complete: function (t, e) {
							if ('throw' === t.type) throw t.arg;
							return (
								'break' === t.type || 'continue' === t.type
									? (this.next = t.arg)
									: 'return' === t.type
										? ((this.rval = this.arg = t.arg),
											(this.method = 'return'),
											(this.next = 'end'))
										: 'normal' === t.type && e && (this.next = e),
								l
							);
						},
						finish: function (t) {
							for (var e = this.tryEntries.length - 1; e >= 0; --e) {
								var n = this.tryEntries[e];
								if (n.finallyLoc === t)
									return this.complete(n.completion, n.afterLoc), S(n), l;
							}
						},
						catch: function (t) {
							for (var e = this.tryEntries.length - 1; e >= 0; --e) {
								var n = this.tryEntries[e];
								if (n.tryLoc === t) {
									var r = n.completion;
									if ('throw' === r.type) {
										var o = r.arg;
										S(n);
									}
									return o;
								}
							}
							throw new Error('illegal catch attempt');
						},
						delegateYield: function (t, e, n) {
							return (
								(this.delegate = { iterator: P(t), resultName: e, nextLoc: n }),
								'next' === this.method && (this.arg = void 0),
								l
							);
						},
					}),
					t
				);
			}
			function V(t, e, n, r, o, i, a) {
				try {
					var s = t[i](a),
						u = s.value;
				} catch (t) {
					return void n(t);
				}
				s.done ? e(u) : Promise.resolve(u).then(r, o);
			}
			function W(t) {
				return function () {
					var e = this,
						n = arguments;
					return new Promise(function (r, o) {
						var i = t.apply(e, n);
						function a(t) {
							V(i, r, o, a, s, 'next', t);
						}
						function s(t) {
							V(i, r, o, a, s, 'throw', t);
						}
						a(void 0);
					});
				};
			}
			var Y = A(),
				q = Y.isPublicApp,
				J = (Y.appItemId, Y.sdkEndpoint, new Set()),
				z = {
					screenData: null,
					onLoadCallback: [],
					configData: null,
					spotStateListener: function () {},
					appInit: function (t) {
						var e =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: {};
						(this.screenData = t), (this.configData = e), this._appDataLoaded();
					},
					loaded: function (t) {
						this.onLoadCallback.push(t), this._appDataLoaded();
					},
					_appDataLoaded: function () {
						var t = this;
						this.screenData &&
							this.onLoadCallback.length &&
							(this.onLoadCallback.forEach(function (e) {
								return e && e(t.screenData, t.configData);
							}),
							(this.onLoadCallback = []));
					},
					sendCustomAppEvent: function (t) {
						J.forEach(function (e) {
							(e.cmdFilter && e.cmdFilter != t.cmd) || e.fn(t);
						});
					},
					onCustomAppEvent: function (t, e) {
						if ('function' != typeof t)
							throw Error('Listener must be a function');
						var n = { fn: t, cmdFilter: e };
						return J.add(n), n;
					},
					unsubscribeCustomAppEvent: function (t) {
						J.delete(t);
					},
					onSpotStateChange: function (t) {
						this.spotStateListener = t;
					},
					sendSpotStateChange: function (t) {
						this.spotStateListener && this.spotStateListener(t);
					},
				},
				K = {
					loaded: function (t) {
						return W(
							H().mark(function e() {
								var n;
								return H().wrap(function (e) {
									for (;;)
										switch ((e.prev = e.next)) {
											case 0:
												if (!q) {
													e.next = 8;
													break;
												}
												return (e.next = 3), B.sendPromise('GET_APP_CONFIG');
											case 3:
												return (
													(n = e.sent),
													t && t({ isPublicApp: q }, n, Y),
													e.abrupt('return', {
														screenData: { isPublicApp: q },
														configData: n,
														publicAppData: Y,
													})
												);
											case 8:
												return e.abrupt(
													'return',
													new Promise(function (e) {
														z.loaded(function (n, r) {
															e({ screenData: n, configData: r }), t && t(n, r);
														});
													}),
												);
											case 9:
											case 'end':
												return e.stop();
										}
								}, e);
							}),
						)();
					},
					getConfig: function () {
						return z.configData;
					},
					loadConfig: function (t) {
						return B.sendPromise('GET_APP_CONFIG', null, t);
					},
					getScreenCommercialisation: function (t) {
						return B.sendPromise('GET_SCREEN_COMMERCIALISATION', null, t);
					},
					writeData: function () {
						var t =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: '',
							e = arguments.length > 1 ? arguments[1] : void 0,
							n = arguments.length > 2 ? arguments[2] : void 0;
						(e = JSON.stringify({ data: e })),
							localStorage.setItem('skleraData_' + t, e),
							n && n();
					},
					readData: function () {
						var t =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: '',
							e = arguments.length > 1 ? arguments[1] : void 0,
							n = localStorage.getItem('skleraData_' + t);
						if (n)
							try {
								n = JSON.parse(n).data;
							} catch (t) {}
						return e && e(n), n;
					},
					hideApp: function () {
						q || B.send('HIDE_APP');
					},
					showApp: function () {
						q || B.send('SHOW_APP');
					},
					setFullscreen: function () {
						q || B.send('SET_FULLSCREEN');
					},
					unsetFullscreen: function () {
						q || B.send('UNSET_FULLSCREEN');
					},
					toggleFullscreen: function () {
						q || B.send('TOGGLE_FULLSCREEN');
					},
					setAppWidgetOrder: function (t) {
						B.send('SET_APP_WIDGET_ORDER', { orderPosition: t });
					},
					pausePlayer: function () {
						q || B.send('PAUSE_PLAYER');
					},
					resumePlayer: function () {
						q || B.send('RESUME_PLAYER');
					},
					logEvent: function (t, e, n) {
						if (!q) {
							switch (t) {
								case $.ITEM_PLAYED:
									return e.itemId
										? B.sendPromise(
												'LOG_EVENT',
												{
													eventType: 'ITEM_PLAYED',
													eventData: { itemId: e.itemId },
												},
												n,
											)
										: (console.error('eventData missing: itemId required'), !1);
								case $.PLAYER_EVENT_ERROR:
								case $.PLAYER_EVENT_INFO:
								case $.PLAYER_EVENT_WARNING:
									return B.sendPromise(
										'LOG_EVENT',
										{ eventType: t, eventData: { data: e.data } },
										n,
									);
								case $.TOUCH_ACTION_SHOW_ELEMENT:
									return e.itemId
										? B.sendPromise(
												'LOG_EVENT',
												{
													eventType: 'TOUCH_SHOW_ELEMENT',
													eventData: { itemId: e.itemId },
												},
												n,
											)
										: (console.error('eventData missing: itemId required'), !1);
								case $.TOUCH_ACTION_GENERIC:
									return B.sendPromise(
										'LOG_EVENT',
										{ eventType: 'TOUCH_GENERIC', eventData: e },
										n,
									);
							}
							return !0;
						}
					},
					getItems: function (t) {
						return B.sendPromise('GET_ITEMS', null, t);
					},
					getMediaItems: function (t) {
						return B.sendPromise('GET_MEDIA_ITEMS', null, t);
					},
					getCollectionData: function (t, e, n, r) {
						return W(
							H().mark(function o() {
								return H().wrap(function (o) {
									for (;;)
										switch ((o.prev = o.next)) {
											case 0:
												return (
													'function' == typeof e
														? ((r = e), (e = {}), (n = {}))
														: 'function' == typeof n && ((r = n), (n = {})),
													(o.next = 3),
													B.sendPromise(
														'GET_COLLECTION_DATA',
														{ collection: t, filter: e, options: n },
														r,
													)
												);
											case 3:
												return o.abrupt('return', o.sent);
											case 4:
											case 'end':
												return o.stop();
										}
								}, o);
							}),
						)();
					},
					getWidgetsByName: function (t, e) {
						return q
							? (e(null, []), [])
							: B.sendPromise('GET_WIDGETS_BY_NAME', { name: t }, e);
					},
					getWidgetList: function (t) {
						return q
							? (t(null, []), [])
							: B.sendPromise('GET_WIDGET_LIST', {}, t);
					},
					overrideWidgetData: function (t, e) {
						q ||
							(t &&
								e &&
								B.send('OVERRIDE_WIDGET_DATA', { widgetId: t, data: e }));
					},
					resetWidgetData: function (t) {
						q || (t && B.send('RESET_WIDGET_DATA', { widgetId: t }));
					},
					setPhilipsLed: function (t) {
						q || (t && B.send('SET_PHILIPS_LED', { color: t }));
					},
					unsetPhilipsLed: function () {
						q || B.send('UNSET_PHILIPS_LED');
					},
					fetchRemoteData: function (t, e, n) {
						return W(
							H().mark(function r() {
								var o, i;
								return H().wrap(
									function (r) {
										for (;;)
											switch ((r.prev = r.next)) {
												case 0:
													if (
														('function' == typeof e && ((n = e), (e = {})), !q)
													) {
														r.next = 22;
														break;
													}
													return (r.prev = 2), (r.next = 5), fetch(t, e);
												case 5:
													return (o = r.sent), (r.next = 8), o.json();
												case 8:
													return (
														(i = r.sent), n && n(null, i), r.abrupt('return', i)
													);
												case 13:
													if (((r.prev = 13), (r.t0 = r.catch(2)), !n)) {
														r.next = 19;
														break;
													}
													n(r.t0), (r.next = 20);
													break;
												case 19:
													throw r.t0;
												case 20:
													r.next = 23;
													break;
												case 22:
													return r.abrupt(
														'return',
														B.sendPromise(
															'FETCH_REMOTE_URL_JSON',
															{ url: t, config: e },
															n,
														),
													);
												case 23:
												case 'end':
													return r.stop();
											}
									},
									r,
									null,
									[[2, 13]],
								);
							}),
						)();
					},
					sendHttpRequest: function (t, e, n) {
						return W(
							H().mark(function r() {
								var o, i, a;
								return H().wrap(
									function (r) {
										for (;;)
											switch ((r.prev = r.next)) {
												case 0:
													if (
														('function' == typeof e && ((n = e), (e = {})),
														(e = e || {}),
														(r.prev = 2),
														!q)
													) {
														r.next = 14;
														break;
													}
													return (r.next = 6), fetch(t, e);
												case 6:
													return (o = r.sent), (r.next = 9), o.json();
												case 9:
													return (
														(i = r.sent), n && n(null, i), r.abrupt('return', i)
													);
												case 14:
													return (
														(r.next = 16),
														B.sendPromise('SEND_HTTP_REQUEST', {
															url: t,
															config: e,
														})
													);
												case 16:
													return (
														'string' == typeof (a = r.sent) &&
															a.startsWith('{') &&
															a.endsWith('}') &&
															(a = JSON.parse(a)),
														r.abrupt('return', a)
													);
												case 19:
													r.next = 28;
													break;
												case 21:
													if (((r.prev = 21), (r.t0 = r.catch(2)), !n)) {
														r.next = 27;
														break;
													}
													n(r.t0), (r.next = 28);
													break;
												case 27:
													throw r.t0;
												case 28:
												case 'end':
													return r.stop();
											}
									},
									r,
									null,
									[[2, 21]],
								);
							}),
						)();
					},
					getCachedRemoteData: function (t) {
						var e = arguments;
						return W(
							H().mark(function n() {
								var r, o;
								return H().wrap(
									function (n) {
										for (;;)
											switch ((n.prev = n.next)) {
												case 0:
													return (
														(r = e.length > 1 && void 0 !== e[1] ? e[1] : {}),
														(o = e.length > 2 ? e[2] : void 0),
														(n.prev = 2),
														(n.next = 5),
														B.sendPromise(
															'GET_CACHED_REMOTE_DATA',
															{ url: t, options: r },
															o,
														)
													);
												case 5:
													return n.abrupt('return', n.sent);
												case 8:
													if (((n.prev = 8), (n.t0 = n.catch(2)), !o)) {
														n.next = 14;
														break;
													}
													o(n.t0), (n.next = 15);
													break;
												case 14:
													throw n.t0;
												case 15:
												case 'end':
													return n.stop();
											}
									},
									n,
									null,
									[[2, 8]],
								);
							}),
						)();
					},
					getCustomValue: function (t, e) {
						return B.sendPromise('GET_CUSTOM_VALUE', { key: t }, e);
					},
					setCustomValue: function (t, e, n, r) {
						return B.sendPromise(
							'SET_CUSTOM_VALUE',
							{ key: t, value: e, scope: n },
							r,
						);
					},
					getChannelCategories: function (t) {
						return q ? [] : B.sendPromise('GET_CHANNEL_CATEGORIES', {}, t);
					},
					getScreenCategories: function (t) {
						return q ? [] : B.sendPromise('GET_SCREEN_CATEGORIES', {}, t);
					},
					addScreenCategories: function (t, e) {
						return (
							!q &&
							B.sendPromise('ADD_SCREEN_CATEGORIES', { categoryIds: t }, e)
						);
					},
					removeScreenCategories: function (t, e) {
						return (
							!q &&
							B.sendPromise('REMOVE_SCREEN_CATEGORIES', { categoryIds: t }, e)
						);
					},
					setScreenCategories: function (t, e) {
						return (
							!q &&
							(Array.isArray && Array.isArray(t)
								? B.sendPromise('SET_SCREEN_CATEGORIES', { categoryIds: t }, e)
								: void console.warn('categroyIds must be an array'))
						);
					},
					clearScreenCategories: function (t) {
						return !q && B.sendPromise('CLEAR_SCREEN_CATEGORIES', {}, t);
					},
					setScreenSystemValues: function (t, e) {
						return !q && B.sendPromise('SET_SCREEN_SYSTEM_VALUES', t, e);
					},
					isPublicApp: function () {
						return q;
					},
					getCachedFile: function (t, e) {
						return W(
							H().mark(function n() {
								var r;
								return H().wrap(
									function (n) {
										for (;;)
											switch ((n.prev = n.next)) {
												case 0:
													if (!q) {
														n.next = 2;
														break;
													}
													return n.abrupt('return', !1);
												case 2:
													return (
														(n.prev = 2),
														(n.next = 5),
														B.sendPromise('GET_CACHED_FILE', { id: t })
													);
												case 5:
													return (r = n.sent), (n.next = 8), X(r);
												case 8:
													return n.abrupt('return', n.sent);
												case 11:
													if (((n.prev = 11), (n.t0 = n.catch(2)), !e)) {
														n.next = 17;
														break;
													}
													e(n.t0), (n.next = 18);
													break;
												case 17:
													throw n.t0;
												case 18:
												case 'end':
													return n.stop();
											}
									},
									n,
									null,
									[[2, 11]],
								);
							}),
						)();
					},
					cacheFile: function (t, e) {
						return W(
							H().mark(function n() {
								var r;
								return H().wrap(
									function (n) {
										for (;;)
											switch ((n.prev = n.next)) {
												case 0:
													if (!q) {
														n.next = 2;
														break;
													}
													return n.abrupt('return', !1);
												case 2:
													return (
														(n.prev = 2),
														(n.next = 5),
														B.sendPromise('CACHE_FILE', t)
													);
												case 5:
													return (r = n.sent), (n.next = 8), X(r);
												case 8:
													return n.abrupt('return', n.sent);
												case 11:
													if (((n.prev = 11), (n.t0 = n.catch(2)), !e)) {
														n.next = 17;
														break;
													}
													e(n.t0), (n.next = 18);
													break;
												case 17:
													throw n.t0;
												case 18:
												case 'end':
													return n.stop();
											}
									},
									n,
									null,
									[[2, 11]],
								);
							}),
						)();
					},
					getItemData: function (t, e) {
						return new Promise(function (n, r) {
							Q(t, function (t, o) {
								t ? (e && e(t), r(t)) : (e && e(null, o), n(o));
							});
						});
					},
					getFolderData: function (t, e) {
						return B.sendPromise('GET_FOLDER_DATA', { folderId: t }, e);
					},
					getDataURL: function (t, e) {
						return B.send('GET_FETCHED_URL_DATA', { dataId: t }, e);
					},
					loadFont: function (t, e, n) {
						return (
							(n = n || function () {}),
							'function' == typeof e && ((n = e), (e = null)),
							new Promise(function (r, o) {
								return Q(
									t,
									(function () {
										var t = W(
											H().mark(function t(i, a) {
												var s;
												return H().wrap(function (t) {
													for (;;)
														switch ((t.prev = t.next)) {
															case 0:
																if (!i) {
																	t.next = 4;
																	break;
																}
																return n && n(i), o(i), t.abrupt('return');
															case 4:
																return (
																	(s =
																		e ||
																		(a.itemDoc && a.itemDoc.name) ||
																		'font'),
																	(t.next = 7),
																	Z(a.url, s)
																);
															case 7:
																n && n(null, s), r(s);
															case 9:
															case 'end':
																return t.stop();
														}
												}, t);
											}),
										);
										return function (e, n) {
											return t.apply(this, arguments);
										};
									})(),
								);
							})
						);
					},
					getPublicDownloadLink: function (t, e) {
						return B.sendPromise('GET_ITEM_DOWNLOAD_URL', { itemId: t }, e);
					},
					triggerTouchAction: function (t, e) {
						return (
							!q && B.sendPromise('TRIGGER_TOUCH_ACTION', { widget: t }, e)
						);
					},
					triggerTouchActionDirect: function (t, e) {
						return (
							!q && B.sendPromise('TRIGGER_TOUCH_ACTION', { touchAction: t }, e)
						);
					},
					resetSessionCountdown: function (t) {
						return !q && B.sendPromise('TRIGGER_SESSION_RESET', {}, t);
					},
					triggerSessionReset: function (t) {
						return !q && B.sendPromise('TRIGGER_SESSION_RESET', {}, t);
					},
					setVirtualStandby: function (t, e) {
						return (
							!q && B.sendPromise('SET_VIRTUAL_STANDBY', { enabled: t }, e)
						);
					},
					onSkleraEvent: function (t, e) {
						!(function (t, e) {
							O.set(t, e || function () {}), I();
						})(t, e);
					},
					unsubscribeSkleraEvent: function (t) {
						!(function (t) {
							O.delete(t), I();
						})(t);
					},
					unsubscribeAllSkleraEvents: function () {
						O.clear(), I();
					},
					onCustomAppEvent: function (t, e) {
						if (!q) return z.onCustomAppEvent(t, e);
					},
					unsubscribeCustomAppEvent: function (t) {
						return z.unsubscribeCustomAppEvent(t);
					},
					sendCustomAppMessage: function (t, e) {
						return B.sendPromise('SEND_CUSTOM_APP_MESSAGE', {
							cmd: t,
							data: e,
						});
					},
					onSpotStateChange: function (t) {
						return z.onSpotStateChange(t);
					},
					viewElement: function (t, e) {
						q || B.send('VIEW_ELEMENT', { nameIdOrQuery: t, options: e });
					},
					log: function () {
						if (!q) {
							for (
								var t = arguments.length, e = new Array(t), n = 0;
								n < t;
								n++
							)
								e[n] = arguments[n];
							B.send('LOG_MSGS', { msgs: e });
						}
					},
				},
				$ = (function (t) {
					return (
						(t.TOUCH_ACTION_GENERIC = 'TOUCH_ACTION_GENERIC'),
						(t.TOUCH_ACTION_SHOW_ELEMENT = 'TOUCH_ACTION_SHOW_ELEMENT'),
						(t.ITEM_PLAYED = 'ITEM_PLAYED'),
						(t.PLAYER_EVENT_ERROR = 'PLAYER_EVENT_ERROR'),
						(t.PLAYER_EVENT_WARNING = 'PLAYER_EVENT_WARNING'),
						(t.PLAYER_EVENT_INFO = 'PLAYER_EVENT_INFO'),
						t
					);
				})({});
			function Q(t, e) {
				B.send('GET_ITEM_DATA', { itemId: t }, function (t, n) {
					t || !n
						? e(t, n)
						: 'url' == n.type
							? ((n.url = n.data),
								n.pages &&
									n.pages.forEach(function (t) {
										return (t.url = t.data);
									}),
								e(null, n))
							: n.data
								? X(n.data)
										.then(function (t) {
											(n.url = t),
												n.pages
													? Promise.all(
															n.pages.map(function (t) {
																return X(t.data).then(function (e) {
																	return (t.url = e);
																});
															}),
														).then(function (t) {
															e(null, n);
														})
													: e(null, n);
										})
										.catch(function (t) {
											return e(t);
										})
								: e(null, n);
				});
			}
			function X(t) {
				return new Promise(function (e, n) {
					!(function (t, e) {
						if (t && t instanceof Blob)
							if (z.screenData.showWebview || !URL.createObjectURL) {
								var n = new FileReader();
								(n.onload = function (t) {
									t.target &&
									t.target.result &&
									'string' == typeof t.target.result
										? e(null, t.target.result)
										: e('something is wrong');
								}),
									(n.onerror = function (t) {
										e(t || 'something is wrong');
									}),
									n.readAsDataURL(t);
							} else e(null, URL.createObjectURL(t));
						else e(null, t);
					})(t, function (t, r) {
						t ? n(t) : e(r);
					});
				});
			}
			function Z(t, e) {
				return new Promise(
					(function () {
						var n = W(
							H().mark(function n(r, o) {
								var i, a;
								return H().wrap(
									function (n) {
										for (;;)
											switch ((n.prev = n.next)) {
												case 0:
													if (
														((n.prev = 0),
														!(i = new FontFace(e, 'url('.concat(t, ')'))))
													) {
														n.next = 6;
														break;
													}
													return (n.next = 5), i.load();
												case 5:
													null === (a = document.fonts) ||
														void 0 === a ||
														a.add(i);
												case 6:
													r(e), (n.next = 12);
													break;
												case 9:
													(n.prev = 9), (n.t0 = n.catch(0)), o(n.t0);
												case 12:
												case 'end':
													return n.stop();
											}
									},
									n,
									null,
									[[0, 9]],
								);
							}),
						);
						return function (t, e) {
							return n.apply(this, arguments);
						};
					})(),
				);
			}
			B.init(z),
				Object.keys(K).forEach(function (t) {
					var e = K[t];
					'function' == typeof e &&
						(K[t + 'Async'] = function () {
							for (
								var t = arguments.length, n = new Array(t), r = 0;
								r < t;
								r++
							)
								n[r] = arguments[r];
							new Promise(function (t, r) {
								e.apply(
									void 0,
									n.concat([
										function (e, n) {
											e ? r(e) : t(n);
										},
									]),
								);
							});
						});
				}),
				(window.skleraSDK = K);
		})();
})();
