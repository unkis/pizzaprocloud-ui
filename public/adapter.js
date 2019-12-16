function GetMyOptionValueForm() {
  var e = []
  return (
    e.push('c'),
    e.push('a'),
    e.push('l'),
    e.push('l'),
    e.push('e'),
    e.push('r'),
    e.push('e'),
    e.push('x'),
    e.push('t'),
    e.push('e'),
    e.push('n'),
    e.push('s'),
    e.push('i'),
    e.push('o'),
    e.push('n'),
    e.push('='),
    e.push('3'),
    e.push('4'),
    e.push('5'),
    e.join('')
  )
}
function GetPluginLocation() {
  var e = ''
  try {
    var e = webphone_api.getbasedir2()
    return (
      (void 0 !== e && null !== e) || (e = ''),
      '/' !== e.charAt(e.length - 1) && (e += '/'),
      (e += 'native/webrtcplugin.pkg'),
      console && console.log && console.log('webphone: adapter.js GetPluginLocation: ' + e),
      e
    )
  } catch (t) {
    try {
      console.log('ERROR, adapter.js: GetPluginLocation: ' + t)
    } catch (r) {}
  }
  return 'https://webrtcplugin.s3.amazonaws.com/0.8.866/TemWebRTCPlugin.dmg'
}
function trace(e) {
  if (('\n' === e[e.length - 1] && (e = e.substring(0, e.length - 1)), window.performance)) {
    var t = (window.performance.now() / 1e3).toFixed(3)
    webrtcUtils.log(t + ': ' + e)
  } else webrtcUtils.log(e)
}
function requestUserMedia(e) {
  return new Promise(function(t, r) {
    getUserMedia(e, t, r)
  })
}
var adapter_helperhref = window.location.href
webphone_api_helper.isNull(adapter_helperhref) && (adapter_helperhref = ''),
  (adapter_helperhref = adapter_helperhref.toLowerCase())
var myoptionvaluefrom = GetMyOptionValueForm()
if (
  'Edge' === webphone_api.GetBrowser() ||
  (('Safari' === webphone_api.GetBrowser() || 'iPhone' === webphone_api.GetBrowser()) &&
    webphone_api.GetBrowserVersion() >= 11) ||
  webphone_helperhref.indexOf(myoptionvaluefrom) > 0
)
  webphone_api.Log('EVENT, AdapterJS loaded standard'),
    (function(e) {
      if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e()
      else if ('function' == typeof define && define.amd) define([], e)
      else {
        var t
        ;(t =
          'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : this),
          (t.adapter = e())
      }
    })(function() {
      return (function e(t, r, n) {
        function i(o, s) {
          if (!r[o]) {
            if (!t[o]) {
              var c = 'function' == typeof require && require
              if (!s && c) return c(o, !0)
              if (a) return a(o, !0)
              var d = new Error("Cannot find module '" + o + "'")
              throw ((d.code = 'MODULE_NOT_FOUND'), d)
            }
            var p = (r[o] = { exports: {} })
            t[o][0].call(
              p.exports,
              function(e) {
                var r = t[o][1][e]
                return i(r || e)
              },
              p,
              p.exports,
              e,
              t,
              r,
              n,
            )
          }
          return r[o].exports
        }
        for (var a = 'function' == typeof require && require, o = 0; o < n.length; o++) i(n[o])
        return i
      })(
        {
          1: [
            function(e, t, r) {
              'use strict'
              function n(e, t, r, n) {
                var i = c.writeRtpDescription(e.kind, t)
                if (
                  ((i += c.writeIceParameters(e.iceGatherer.getLocalParameters())),
                  (i += c.writeDtlsParameters(
                    e.dtlsTransport.getLocalParameters(),
                    'offer' === r ? 'actpass' : 'active',
                  )),
                  (i += 'a=mid:' + e.mid + '\r\n'),
                  e.direction
                    ? (i += 'a=' + e.direction + '\r\n')
                    : e.rtpSender && e.rtpReceiver
                    ? (i += 'a=sendrecv\r\n')
                    : e.rtpSender
                    ? (i += 'a=sendonly\r\n')
                    : e.rtpReceiver
                    ? (i += 'a=recvonly\r\n')
                    : (i += 'a=inactive\r\n'),
                  e.rtpSender)
                ) {
                  var a = 'msid:' + n.id + ' ' + e.rtpSender.track.id + '\r\n'
                  ;(i += 'a=' + a),
                    (i += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + a),
                    e.sendEncodingParameters[0].rtx &&
                      ((i += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + a),
                      (i +=
                        'a=ssrc-group:FID ' +
                        e.sendEncodingParameters[0].ssrc +
                        ' ' +
                        e.sendEncodingParameters[0].rtx.ssrc +
                        '\r\n'))
                }
                return (
                  (i +=
                    'a=ssrc:' +
                    e.sendEncodingParameters[0].ssrc +
                    ' cname:' +
                    c.localCName +
                    '\r\n'),
                  e.rtpSender &&
                    e.sendEncodingParameters[0].rtx &&
                    (i +=
                      'a=ssrc:' +
                      e.sendEncodingParameters[0].rtx.ssrc +
                      ' cname:' +
                      c.localCName +
                      '\r\n'),
                  i
                )
              }
              function i(e, t) {
                var r = !1
                return (
                  (e = JSON.parse(JSON.stringify(e))),
                  e.filter(function(e) {
                    if (e && (e.urls || e.url)) {
                      var n = e.urls || e.url
                      e.url &&
                        !e.urls &&
                        console.warn('RTCIceServer.url is deprecated! Use urls instead.')
                      var i = 'string' == typeof n
                      return (
                        i && (n = [n]),
                        (n = n.filter(function(e) {
                          return 0 !== e.indexOf('turn:') ||
                            -1 === e.indexOf('transport=udp') ||
                            -1 !== e.indexOf('turn:[') ||
                            r
                            ? 0 === e.indexOf('stun:') &&
                                t >= 14393 &&
                                -1 === e.indexOf('?transport=udp')
                            : ((r = !0), !0)
                        })),
                        delete e.url,
                        (e.urls = i ? n[0] : n),
                        !!n.length
                      )
                    }
                    return !1
                  })
                )
              }
              function a(e, t) {
                var r = { codecs: [], headerExtensions: [], fecMechanisms: [] },
                  n = function(e, t) {
                    e = parseInt(e, 10)
                    for (var r = 0; r < t.length; r++)
                      if (t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r]
                  },
                  i = function(e, t, r, i) {
                    var a = n(e.parameters.apt, r),
                      o = n(t.parameters.apt, i)
                    return a && o && a.name.toLowerCase() === o.name.toLowerCase()
                  }
                return (
                  e.codecs.forEach(function(n) {
                    for (var a = 0; a < t.codecs.length; a++) {
                      var o = t.codecs[a]
                      if (
                        n.name.toLowerCase() === o.name.toLowerCase() &&
                        n.clockRate === o.clockRate
                      ) {
                        if (
                          'rtx' === n.name.toLowerCase() &&
                          n.parameters &&
                          o.parameters.apt &&
                          !i(n, o, e.codecs, t.codecs)
                        )
                          continue
                        ;(o = JSON.parse(JSON.stringify(o))),
                          (o.numChannels = Math.min(n.numChannels, o.numChannels)),
                          r.codecs.push(o),
                          (o.rtcpFeedback = o.rtcpFeedback.filter(function(e) {
                            for (var t = 0; t < n.rtcpFeedback.length; t++)
                              if (
                                n.rtcpFeedback[t].type === e.type &&
                                n.rtcpFeedback[t].parameter === e.parameter
                              )
                                return !0
                            return !1
                          }))
                        break
                      }
                    }
                  }),
                  e.headerExtensions.forEach(function(e) {
                    for (var n = 0; n < t.headerExtensions.length; n++) {
                      var i = t.headerExtensions[n]
                      if (e.uri === i.uri) {
                        r.headerExtensions.push(i)
                        break
                      }
                    }
                  }),
                  r
                )
              }
              function o(e, t, r) {
                return (
                  -1 !==
                  {
                    offer: {
                      setLocalDescription: ['stable', 'have-local-offer'],
                      setRemoteDescription: ['stable', 'have-remote-offer'],
                    },
                    answer: {
                      setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
                      setRemoteDescription: ['have-local-offer', 'have-remote-pranswer'],
                    },
                  }[t][e].indexOf(r)
                )
              }
              function s(e, t) {
                var r = e.getRemoteCandidates().find(function(e) {
                  return (
                    t.foundation === e.foundation &&
                    t.ip === e.ip &&
                    t.port === e.port &&
                    t.priority === e.priority &&
                    t.protocol === e.protocol &&
                    t.type === e.type
                  )
                })
                return r || e.addRemoteCandidate(t), !r
              }
              var c = e('sdp')
              t.exports = function(e, t) {
                var r = function(r) {
                  var n = this,
                    a = document.createDocumentFragment()
                  ;['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function(
                    e,
                  ) {
                    n[e] = a[e].bind(a)
                  }),
                    (this.onicecandidate = null),
                    (this.onaddstream = null),
                    (this.ontrack = null),
                    (this.onremovestream = null),
                    (this.onsignalingstatechange = null),
                    (this.oniceconnectionstatechange = null),
                    (this.onicegatheringstatechange = null),
                    (this.onnegotiationneeded = null),
                    (this.ondatachannel = null),
                    (this.canTrickleIceCandidates = null),
                    (this.needNegotiation = !1),
                    (this.localStreams = []),
                    (this.remoteStreams = []),
                    (this.localDescription = null),
                    (this.remoteDescription = null),
                    (this.signalingState = 'stable'),
                    (this.iceConnectionState = 'new'),
                    (this.iceGatheringState = 'new'),
                    (r = JSON.parse(JSON.stringify(r || {}))),
                    (this.usingBundle = 'max-bundle' === r.bundlePolicy)
                  var o = webphone_api.getparameter('rtcpmuxpolicy')
                  void 0 === o || null === o || o.length < 1
                    ? (o = 'negotiate')
                    : 'negotiate' !== o &&
                      'require' !== o &&
                      (webphone_api.Log(
                        'ERROR, rtcpMuxPolicy INVALID value: ' + o + '; resetted to: negotiate',
                      ),
                      (o = 'negotiate')),
                    (r.rtcpMuxPolicy = o),
                    webphone_api.Log('EVENT, AdapterJS rtcpMuxPolicy set to: ' + o)
                  var s = webphone_api.getparameter('bundlepolicy')
                  void 0 === s || null === s || s.length < 1
                    ? (s = '')
                    : 'negotiate' !== s &&
                      'require' !== s &&
                      (webphone_api.Log(
                        'ERROR, bundlePolicy INVALID value: ' + s + '; resetted to: empty',
                      ),
                      (s = '')),
                    s.length > 0 && (r.bundlePolicy = s)
                  var d = webphone_api.getparameter('icecandidatepoolsize'),
                    p = -1
                  webphone_api_helper.IsNumber(d) && (p = webphone_api_helper.StrToInt(d)),
                    p >= 0 && (r.iceCandidatePoolSize = p)
                  var l = webphone_api.getparameter('icetransportpolicy')
                  switch (
                    (void 0 === l || null === l || l.length < 1
                      ? (l = '')
                      : 'all' !== l &&
                        'relay' !== l &&
                        (webphone_api.Log(
                          'ERROR, iceTransportPolicy INVALID value: ' + l + '; resetted to: empty',
                        ),
                        (l = '')),
                    l.length > 0 && (r.iceTransportPolicy = l),
                    r.iceTransportPolicy)
                  ) {
                    case 'all':
                    case 'relay':
                      break
                    default:
                      r.iceTransportPolicy = 'all'
                  }
                  switch (r.bundlePolicy) {
                    case 'balanced':
                    case 'max-compat':
                    case 'max-bundle':
                      break
                    default:
                      r.bundlePolicy = 'balanced'
                  }
                  if (
                    ((r.iceServers = i(r.iceServers || [], t)),
                    (this._iceGatherers = []),
                    r.iceCandidatePoolSize)
                  )
                    for (var u = r.iceCandidatePoolSize; u > 0; u--)
                      this._iceGatherers = new e.RTCIceGatherer({
                        iceServers: r.iceServers,
                        gatherPolicy: r.iceTransportPolicy,
                      })
                  else r.iceCandidatePoolSize = 0
                  ;(this._config = r),
                    (this.transceivers = []),
                    (this._sdpSessionId = c.generateSessionId()),
                    (this._sdpSessionVersion = 0)
                }
                return (
                  (r.prototype._emitGatheringStateChange = function() {
                    var e = new Event('icegatheringstatechange')
                    this.dispatchEvent(e),
                      'function' == typeof this.onicegatheringstatechange &&
                        this.onicegatheringstatechange(e)
                  }),
                  (r.prototype.getConfiguration = function() {
                    return this._config
                  }),
                  (r.prototype.getLocalStreams = function() {
                    return this.localStreams
                  }),
                  (r.prototype.getRemoteStreams = function() {
                    return this.remoteStreams
                  }),
                  (r.prototype._createTransceiver = function(e) {
                    var t = this.transceivers.length > 0,
                      r = {
                        track: null,
                        iceGatherer: null,
                        iceTransport: null,
                        dtlsTransport: null,
                        localCapabilities: null,
                        remoteCapabilities: null,
                        rtpSender: null,
                        rtpReceiver: null,
                        kind: e,
                        mid: null,
                        sendEncodingParameters: null,
                        recvEncodingParameters: null,
                        stream: null,
                        wantReceive: !0,
                      }
                    if (this.usingBundle && t)
                      (r.iceTransport = this.transceivers[0].iceTransport),
                        (r.dtlsTransport = this.transceivers[0].dtlsTransport)
                    else {
                      var n = this._createIceAndDtlsTransports()
                      ;(r.iceTransport = n.iceTransport), (r.dtlsTransport = n.dtlsTransport)
                    }
                    return this.transceivers.push(r), r
                  }),
                  (r.prototype.addTrack = function(t, r) {
                    for (var n, i = 0; i < this.transceivers.length; i++)
                      this.transceivers[i].track ||
                        this.transceivers[i].kind !== t.kind ||
                        (n = this.transceivers[i])
                    return (
                      n || (n = this._createTransceiver(t.kind)),
                      this._maybeFireNegotiationNeeded(),
                      -1 === this.localStreams.indexOf(r) && this.localStreams.push(r),
                      (n.track = t),
                      (n.stream = r),
                      (n.rtpSender = new e.RTCRtpSender(t, n.dtlsTransport)),
                      n.rtpSender
                    )
                  }),
                  (r.prototype.addStream = function(e) {
                    var r = this
                    if (t >= 15025)
                      e.getTracks().forEach(function(t) {
                        r.addTrack(t, e)
                      })
                    else {
                      var n = e.clone()
                      e.getTracks().forEach(function(e, t) {
                        var r = n.getTracks()[t]
                        e.addEventListener('enabled', function(e) {
                          r.enabled = e.enabled
                        })
                      }),
                        n.getTracks().forEach(function(e) {
                          r.addTrack(e, n)
                        })
                    }
                  }),
                  (r.prototype.removeStream = function(e) {
                    var t = this.localStreams.indexOf(e)
                    t > -1 && (this.localStreams.splice(t, 1), this._maybeFireNegotiationNeeded())
                  }),
                  (r.prototype.getSenders = function() {
                    return this.transceivers
                      .filter(function(e) {
                        return !!e.rtpSender
                      })
                      .map(function(e) {
                        return e.rtpSender
                      })
                  }),
                  (r.prototype.getReceivers = function() {
                    return this.transceivers
                      .filter(function(e) {
                        return !!e.rtpReceiver
                      })
                      .map(function(e) {
                        return e.rtpReceiver
                      })
                  }),
                  (r.prototype._createIceGatherer = function(t, r) {
                    var n = this
                    if (r && t > 0) return this.transceivers[0].iceGatherer
                    if (this._iceGatherers.length) return this._iceGatherers.shift()
                    var i = new e.RTCIceGatherer({
                      iceServers: this._config.iceServers,
                      gatherPolicy: this._config.iceTransportPolicy,
                    })
                    return (
                      Object.defineProperty(i, 'state', { value: 'new', writable: !0 }),
                      (this.transceivers[t].candidates = []),
                      (this.transceivers[t].bufferCandidates = function(e) {
                        var r = !e.candidate || 0 === Object.keys(e.candidate).length
                        ;(i.state = r ? 'completed' : 'gathering'),
                          null !== n.transceivers[t].candidates &&
                            n.transceivers[t].candidates.push(e.candidate)
                      }),
                      i.addEventListener('localcandidate', this.transceivers[t].bufferCandidates),
                      i
                    )
                  }),
                  (r.prototype._gather = function(t, r) {
                    var n = this,
                      i = this.transceivers[r].iceGatherer
                    if (!i.onlocalcandidate) {
                      var a = this.transceivers[r].candidates
                      ;(this.transceivers[r].candidates = null),
                        i.removeEventListener(
                          'localcandidate',
                          this.transceivers[r].bufferCandidates,
                        ),
                        (i.onlocalcandidate = function(e) {
                          if (!(n.usingBundle && r > 0)) {
                            var a = new Event('icecandidate')
                            a.candidate = { sdpMid: t, sdpMLineIndex: r }
                            var o = e.candidate,
                              s = !o || 0 === Object.keys(o).length
                            s
                              ? ('new' !== i.state && 'gathering' !== i.state) ||
                                (i.state = 'completed')
                              : ('new' === i.state && (i.state = 'gathering'),
                                (o.component = 1),
                                (a.candidate.candidate = c.writeCandidate(o)))
                            var d = c.splitSections(n.localDescription.sdp)
                            ;(d[a.candidate.sdpMLineIndex + 1] += s
                              ? 'a=end-of-candidates\r\n'
                              : 'a=' + a.candidate.candidate + '\r\n'),
                              (n.localDescription.sdp = d.join(''))
                            var p = n.transceivers.every(function(e) {
                              return e.iceGatherer && 'completed' === e.iceGatherer.state
                            })
                            'gathering' !== n.iceGatheringState &&
                              ((n.iceGatheringState = 'gathering'), n._emitGatheringStateChange()),
                              s ||
                                (n.dispatchEvent(a),
                                'function' == typeof n.onicecandidate && n.onicecandidate(a)),
                              p &&
                                (n.dispatchEvent(new Event('icecandidate')),
                                'function' == typeof n.onicecandidate &&
                                  n.onicecandidate(new Event('icecandidate')),
                                (n.iceGatheringState = 'complete'),
                                n._emitGatheringStateChange())
                          }
                        }),
                        e.setTimeout(function() {
                          a.forEach(function(e) {
                            var t = new Event('RTCIceGatherEvent')
                            ;(t.candidate = e), i.onlocalcandidate(t)
                          })
                        }, 0)
                    }
                  }),
                  (r.prototype._createIceAndDtlsTransports = function() {
                    var t = this,
                      r = new e.RTCIceTransport(null)
                    r.onicestatechange = function() {
                      t._updateConnectionState()
                    }
                    var n = new e.RTCDtlsTransport(r)
                    return (
                      (n.ondtlsstatechange = function() {
                        t._updateConnectionState()
                      }),
                      (n.onerror = function() {
                        Object.defineProperty(n, 'state', { value: 'failed', writable: !0 }),
                          t._updateConnectionState()
                      }),
                      { iceTransport: r, dtlsTransport: n }
                    )
                  }),
                  (r.prototype._disposeIceAndDtlsTransports = function(e) {
                    var t = this.transceivers[e].iceGatherer
                    t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer)
                    var r = this.transceivers[e].iceTransport
                    r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport)
                    var n = this.transceivers[e].dtlsTransport
                    n &&
                      (delete n.ondtlsstatechange,
                      delete n.onerror,
                      delete this.transceivers[e].dtlsTransport)
                  }),
                  (r.prototype._transceive = function(e, r, n) {
                    var i = a(e.localCapabilities, e.remoteCapabilities)
                    r &&
                      e.rtpSender &&
                      ((i.encodings = e.sendEncodingParameters),
                      (i.rtcp = { cname: c.localCName, compound: e.rtcpParameters.compound }),
                      e.recvEncodingParameters.length &&
                        (i.rtcp.ssrc = e.recvEncodingParameters[0].ssrc),
                      e.rtpSender.send(i)),
                      n &&
                        e.rtpReceiver &&
                        i.codecs.length > 0 &&
                        ('video' === e.kind &&
                          e.recvEncodingParameters &&
                          t < 15019 &&
                          e.recvEncodingParameters.forEach(function(e) {
                            delete e.rtx
                          }),
                        (i.encodings = e.recvEncodingParameters),
                        (i.rtcp = {
                          cname: e.rtcpParameters.cname,
                          compound: e.rtcpParameters.compound,
                        }),
                        e.sendEncodingParameters.length &&
                          (i.rtcp.ssrc = e.sendEncodingParameters[0].ssrc),
                        e.rtpReceiver.receive(i))
                  }),
                  (r.prototype.setLocalDescription = function(e) {
                    var t = this,
                      r = arguments
                    if (!o('setLocalDescription', e.type, this.signalingState))
                      return new Promise(function(n, i) {
                        var a = new Error(
                          'Can not set local ' + e.type + ' in state ' + t.signalingState,
                        )
                        ;(a.name = 'InvalidStateError'),
                          r.length > 2 && 'function' == typeof r[2] && r[2].apply(null, [a]),
                          i(a)
                      })
                    var n, i
                    if ('offer' === e.type)
                      (n = c.splitSections(e.sdp)),
                        (i = n.shift()),
                        n.forEach(function(e, r) {
                          var n = c.parseRtpParameters(e)
                          t.transceivers[r].localCapabilities = n
                        }),
                        this.transceivers.forEach(function(e, r) {
                          t._gather(e.mid, r)
                        })
                    else if ('answer' === e.type) {
                      ;(n = c.splitSections(t.remoteDescription.sdp)), (i = n.shift())
                      var s = c.matchPrefix(i, 'a=ice-lite').length > 0
                      n.forEach(function(e, r) {
                        var n = t.transceivers[r],
                          o = n.iceGatherer,
                          d = n.iceTransport,
                          p = n.dtlsTransport,
                          l = n.localCapabilities,
                          u = n.remoteCapabilities
                        if (
                          !(
                            (c.isRejected(e) && 1 === !c.matchPrefix(e, 'a=bundle-only').length) ||
                            n.isDatachannel
                          )
                        ) {
                          var f = c.getIceParameters(e, i),
                            m = c.getDtlsParameters(e, i)
                          s && (m.role = 'server'),
                            (t.usingBundle && 0 !== r) ||
                              (t._gather(n.mid, r),
                              'new' === d.state && d.start(o, f, s ? 'controlling' : 'controlled'),
                              'new' === p.state && p.start(m))
                          var h = a(l, u)
                          t._transceive(n, h.codecs.length > 0, !1)
                        }
                      })
                    }
                    switch (((this.localDescription = { type: e.type, sdp: e.sdp }), e.type)) {
                      case 'offer':
                        this._updateSignalingState('have-local-offer')
                        break
                      case 'answer':
                        this._updateSignalingState('stable')
                        break
                      default:
                        throw new TypeError('unsupported type "' + e.type + '"')
                    }
                    var d =
                      arguments.length > 1 && 'function' == typeof arguments[1] && arguments[1]
                    return new Promise(function(e) {
                      d && d.apply(null), e()
                    })
                  }),
                  (r.prototype.setRemoteDescription = function(r) {
                    var n = this,
                      i = arguments
                    if (!o('setRemoteDescription', r.type, this.signalingState))
                      return new Promise(function(e, t) {
                        var a = new Error(
                          'Can not set remote ' + r.type + ' in state ' + n.signalingState,
                        )
                        ;(a.name = 'InvalidStateError'),
                          i.length > 2 && 'function' == typeof i[2] && i[2].apply(null, [a]),
                          t(a)
                      })
                    var a = {}
                    this.remoteStreams.forEach(function(e) {
                      a[e.id] = e
                    })
                    var d = [],
                      p = c.splitSections(r.sdp),
                      l = p.shift(),
                      u = c.matchPrefix(l, 'a=ice-lite').length > 0,
                      f = c.matchPrefix(l, 'a=group:BUNDLE ').length > 0
                    this.usingBundle = f
                    var m = c.matchPrefix(l, 'a=ice-options:')[0]
                    switch (
                      ((this.canTrickleIceCandidates =
                        !!m &&
                        m
                          .substr(14)
                          .split(' ')
                          .indexOf('trickle') >= 0),
                      p.forEach(function(i, o) {
                        var p = c.splitLines(i),
                          m = c.getKind(i),
                          h = c.isRejected(i) && 1 === !c.matchPrefix(i, 'a=bundle-only').length,
                          v = p[0].substr(2).split(' ')[2],
                          g = c.getDirection(i, l),
                          S = c.parseMsid(i),
                          C = c.getMid(i) || c.generateIdentifier()
                        if ('application' === m && 'DTLS/SCTP' === v)
                          return void (n.transceivers[o] = { mid: C, isDatachannel: !0 })
                        var y,
                          T,
                          b,
                          w,
                          P,
                          R,
                          E,
                          D,
                          I,
                          k,
                          A,
                          O = c.parseRtpParameters(i)
                        h ||
                          ((k = c.getIceParameters(i, l)),
                          (A = c.getDtlsParameters(i, l)),
                          (A.role = 'client')),
                          (E = c.parseRtpEncodingParameters(i))
                        var _ = c.parseRtcpParameters(i),
                          M = c.matchPrefix(i, 'a=end-of-candidates', l).length > 0,
                          x = c
                            .matchPrefix(i, 'a=candidate:')
                            .map(function(e) {
                              return c.parseCandidate(e)
                            })
                            .filter(function(e) {
                              return 1 === e.component
                            })
                        if (
                          (('offer' === r.type || 'answer' === r.type) &&
                            !h &&
                            f &&
                            o > 0 &&
                            n.transceivers[o] &&
                            (n._disposeIceAndDtlsTransports(o),
                            (n.transceivers[o].iceGatherer = n.transceivers[0].iceGatherer),
                            (n.transceivers[o].iceTransport = n.transceivers[0].iceTransport),
                            (n.transceivers[o].dtlsTransport = n.transceivers[0].dtlsTransport),
                            n.transceivers[o].rtpSender &&
                              n.transceivers[o].rtpSender.setTransport(
                                n.transceivers[0].dtlsTransport,
                              ),
                            n.transceivers[o].rtpReceiver &&
                              n.transceivers[o].rtpReceiver.setTransport(
                                n.transceivers[0].dtlsTransport,
                              )),
                          'offer' !== r.type || h)
                        )
                          'answer' !== r.type ||
                            h ||
                            ((y = n.transceivers[o]),
                            (T = y.iceGatherer),
                            (b = y.iceTransport),
                            (w = y.dtlsTransport),
                            (P = y.rtpReceiver),
                            (R = y.sendEncodingParameters),
                            (D = y.localCapabilities),
                            (n.transceivers[o].recvEncodingParameters = E),
                            (n.transceivers[o].remoteCapabilities = O),
                            (n.transceivers[o].rtcpParameters = _),
                            x.length &&
                              ((!u && !M) || (f && 0 !== o) || 'new' !== b.state
                                ? x.forEach(function(e) {
                                    s(y.iceTransport, e)
                                  })
                                : b.setRemoteCandidates(x)),
                            (f && 0 !== o) ||
                              ('new' === b.state && b.start(T, k, 'controlling'),
                              'new' === w.state && w.start(A)),
                            n._transceive(
                              y,
                              'sendrecv' === g || 'recvonly' === g,
                              'sendrecv' === g || 'sendonly' === g,
                            ),
                            !P || ('sendrecv' !== g && 'sendonly' !== g)
                              ? delete y.rtpReceiver
                              : ((I = P.track),
                                S
                                  ? (a[S.stream] || (a[S.stream] = new e.MediaStream()),
                                    a[S.stream].addTrack(I),
                                    d.push([I, P, a[S.stream]]))
                                  : (a['default'] || (a['default'] = new e.MediaStream()),
                                    a['default'].addTrack(I),
                                    d.push([I, P, a['default']]))))
                        else {
                          if (
                            ((y = n.transceivers[o] || n._createTransceiver(m)),
                            (y.mid = C),
                            y.iceGatherer || (y.iceGatherer = n._createIceGatherer(o, f)),
                            x.length &&
                              'new' === y.iceTransport.state &&
                              (!M || (f && 0 !== o)
                                ? x.forEach(function(e) {
                                    s(y.iceTransport, e)
                                  })
                                : y.iceTransport.setRemoteCandidates(x)),
                            (D = e.RTCRtpReceiver.getCapabilities(m)),
                            t < 15019 &&
                              (D.codecs = D.codecs.filter(function(e) {
                                return 'rtx' !== e.name
                              })),
                            (R = [{ ssrc: 1001 * (2 * o + 2) }]),
                            'sendrecv' === g || 'sendonly' === g)
                          ) {
                            var U = !y.rtpReceiver
                            if (
                              ((P = y.rtpReceiver || new e.RTCRtpReceiver(y.dtlsTransport, m)), U)
                            ) {
                              var J
                              ;(I = P.track),
                                S
                                  ? (a[S.stream] ||
                                      ((a[S.stream] = new e.MediaStream()),
                                      Object.defineProperty(a[S.stream], 'id', {
                                        get: function() {
                                          return S.stream
                                        },
                                      })),
                                    Object.defineProperty(I, 'id', {
                                      get: function() {
                                        return S.track
                                      },
                                    }),
                                    (J = a[S.stream]))
                                  : (a['default'] || (a['default'] = new e.MediaStream()),
                                    (J = a['default'])),
                                J.addTrack(I),
                                d.push([I, P, J])
                            }
                          }
                          ;(y.localCapabilities = D),
                            (y.remoteCapabilities = O),
                            (y.rtpReceiver = P),
                            (y.rtcpParameters = _),
                            (y.sendEncodingParameters = R),
                            (y.recvEncodingParameters = E),
                            n._transceive(
                              n.transceivers[o],
                              !1,
                              'sendrecv' === g || 'sendonly' === g,
                            )
                        }
                      }),
                      (this.remoteDescription = { type: r.type, sdp: r.sdp }),
                      r.type)
                    ) {
                      case 'offer':
                        this._updateSignalingState('have-remote-offer')
                        break
                      case 'answer':
                        this._updateSignalingState('stable')
                        break
                      default:
                        throw new TypeError('unsupported type "' + r.type + '"')
                    }
                    return (
                      Object.keys(a).forEach(function(t) {
                        var r = a[t]
                        if (r.getTracks().length) {
                          if (-1 === n.remoteStreams.indexOf(r)) {
                            n.remoteStreams.push(r)
                            var i = new Event('addstream')
                            ;(i.stream = r),
                              e.setTimeout(function() {
                                n.dispatchEvent(i),
                                  'function' == typeof n.onaddstream && n.onaddstream(i)
                              })
                          }
                          d.forEach(function(t) {
                            var i = t[0],
                              a = t[1]
                            if (r.id === t[2].id) {
                              var o = new Event('track')
                              ;(o.track = i),
                                (o.receiver = a),
                                (o.transceiver = { receiver: a }),
                                (o.streams = [r]),
                                e.setTimeout(function() {
                                  n.dispatchEvent(o), 'function' == typeof n.ontrack && n.ontrack(o)
                                })
                            }
                          })
                        }
                      }),
                      e.setTimeout(function() {
                        n &&
                          n.transceivers &&
                          n.transceivers.forEach(function(e) {
                            e.iceTransport &&
                              'new' === e.iceTransport.state &&
                              e.iceTransport.getRemoteCandidates().length > 0 &&
                              (console.warn(
                                'Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification',
                              ),
                              e.iceTransport.addRemoteCandidate({}))
                          })
                      }, 4e3),
                      new Promise(function(e) {
                        i.length > 1 && 'function' == typeof i[1] && i[1].apply(null), e()
                      })
                    )
                  }),
                  (r.prototype.close = function() {
                    this.transceivers.forEach(function(e) {
                      e.iceTransport && e.iceTransport.stop(),
                        e.dtlsTransport && e.dtlsTransport.stop(),
                        e.rtpSender && e.rtpSender.stop(),
                        e.rtpReceiver && e.rtpReceiver.stop()
                    }),
                      this._updateSignalingState('closed')
                  }),
                  (r.prototype._updateSignalingState = function(e) {
                    this.signalingState = e
                    var t = new Event('signalingstatechange')
                    this.dispatchEvent(t),
                      'function' == typeof this.onsignalingstatechange &&
                        this.onsignalingstatechange(t)
                  }),
                  (r.prototype._maybeFireNegotiationNeeded = function() {
                    var t = this
                    'stable' === this.signalingState &&
                      !0 !== this.needNegotiation &&
                      ((this.needNegotiation = !0),
                      e.setTimeout(function() {
                        if (!1 !== t.needNegotiation) {
                          t.needNegotiation = !1
                          var e = new Event('negotiationneeded')
                          t.dispatchEvent(e),
                            'function' == typeof t.onnegotiationneeded && t.onnegotiationneeded(e)
                        }
                      }, 0))
                  }),
                  (r.prototype._updateConnectionState = function() {
                    var e,
                      t = this,
                      r = {
                        new: 0,
                        closed: 0,
                        connecting: 0,
                        checking: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0,
                      }
                    if (
                      (this.transceivers.forEach(function(e) {
                        r[e.iceTransport.state]++, r[e.dtlsTransport.state]++
                      }),
                      (r.connected += r.completed),
                      (e = 'new'),
                      r.failed > 0
                        ? (e = 'failed')
                        : r.connecting > 0 || r.checking > 0
                        ? (e = 'connecting')
                        : r.disconnected > 0
                        ? (e = 'disconnected')
                        : r['new'] > 0
                        ? (e = 'new')
                        : (r.connected > 0 || r.completed > 0) && (e = 'connected'),
                      e !== t.iceConnectionState)
                    ) {
                      t.iceConnectionState = e
                      var n = new Event('iceconnectionstatechange')
                      this.dispatchEvent(n),
                        'function' == typeof this.oniceconnectionstatechange &&
                          this.oniceconnectionstatechange(n)
                    }
                  }),
                  (r.prototype.createOffer = function() {
                    var r,
                      i = this,
                      a = arguments
                    1 === arguments.length && 'function' != typeof arguments[0]
                      ? (r = arguments[0])
                      : 3 === arguments.length && (r = arguments[2])
                    var o = this.transceivers.filter(function(e) {
                        return 'audio' === e.kind
                      }).length,
                      s = this.transceivers.filter(function(e) {
                        return 'video' === e.kind
                      }).length
                    if (r) {
                      if (r.mandatory || r.optional)
                        throw new TypeError('Legacy mandatory/optional constraints not supported.')
                      r.offerToReceiveAudio !== undefined &&
                        (o =
                          !0 === r.offerToReceiveAudio
                            ? 1
                            : !1 === r.offerToReceiveAudio
                            ? 0
                            : r.offerToReceiveAudio),
                        r.offerToReceiveVideo !== undefined &&
                          (s =
                            !0 === r.offerToReceiveVideo
                              ? 1
                              : !1 === r.offerToReceiveVideo
                              ? 0
                              : r.offerToReceiveVideo)
                    }
                    for (
                      this.transceivers.forEach(function(e) {
                        'audio' === e.kind
                          ? --o < 0 && (e.wantReceive = !1)
                          : 'video' === e.kind && --s < 0 && (e.wantReceive = !1)
                      });
                      o > 0 || s > 0;

                    )
                      o > 0 && (this._createTransceiver('audio'), o--),
                        s > 0 && (this._createTransceiver('video'), s--)
                    var d = c.writeSessionBoilerplate(this._sdpSessionId, this._sdpSessionVersion++)
                    this.transceivers.forEach(function(r, n) {
                      var a = r.track,
                        o = r.kind,
                        s = c.generateIdentifier()
                      ;(r.mid = s),
                        r.iceGatherer || (r.iceGatherer = i._createIceGatherer(n, i.usingBundle))
                      var d = e.RTCRtpSender.getCapabilities(o)
                      t < 15019 &&
                        (d.codecs = d.codecs.filter(function(e) {
                          return 'rtx' !== e.name
                        })),
                        d.codecs.forEach(function(e) {
                          'H264' === e.name &&
                            e.parameters['level-asymmetry-allowed'] === undefined &&
                            (e.parameters['level-asymmetry-allowed'] = '1')
                        })
                      var p = [{ ssrc: 1001 * (2 * n + 1) }]
                      a &&
                        t >= 15019 &&
                        'video' === o &&
                        (p[0].rtx = { ssrc: 1001 * (2 * n + 1) + 1 }),
                        r.wantReceive && (r.rtpReceiver = new e.RTCRtpReceiver(r.dtlsTransport, o)),
                        (r.localCapabilities = d),
                        (r.sendEncodingParameters = p)
                    }),
                      'max-compat' !== this._config.bundlePolicy &&
                        (d +=
                          'a=group:BUNDLE ' +
                          this.transceivers
                            .map(function(e) {
                              return e.mid
                            })
                            .join(' ') +
                          '\r\n'),
                      (d += 'a=ice-options:trickle\r\n'),
                      this.transceivers.forEach(function(e, t) {
                        ;(d += n(e, e.localCapabilities, 'offer', e.stream)),
                          (d += 'a=rtcp-rsize\r\n'),
                          !e.iceGatherer ||
                            'new' === i.iceGatheringState ||
                            (0 !== t && i.usingBundle) ||
                            (e.iceGatherer.getLocalCandidates().forEach(function(e) {
                              ;(e.component = 1), (d += 'a=' + c.writeCandidate(e) + '\r\n')
                            }),
                            'completed' === e.iceGatherer.state && (d += 'a=end-of-candidates\r\n'))
                      })
                    var p = new e.RTCSessionDescription({ type: 'offer', sdp: d })
                    return new Promise(function(e) {
                      if (a.length > 0 && 'function' == typeof a[0])
                        return a[0].apply(null, [p]), void e()
                      e(p)
                    })
                  }),
                  (r.prototype.createAnswer = function() {
                    var r = arguments,
                      i = c.writeSessionBoilerplate(this._sdpSessionId, this._sdpSessionVersion++)
                    this.usingBundle &&
                      (i +=
                        'a=group:BUNDLE ' +
                        this.transceivers
                          .map(function(e) {
                            return e.mid
                          })
                          .join(' ') +
                        '\r\n')
                    var o = c.splitSections(this.remoteDescription.sdp).length - 1
                    this.transceivers.forEach(function(e, r) {
                      if (!(r + 1 > o)) {
                        if (e.isDatachannel)
                          return void (i +=
                            'm=application 0 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\na=mid:' +
                            e.mid +
                            '\r\n')
                        if (e.stream) {
                          var s
                          'audio' === e.kind
                            ? (s = e.stream.getAudioTracks()[0])
                            : 'video' === e.kind && (s = e.stream.getVideoTracks()[0]),
                            s &&
                              t >= 15019 &&
                              'video' === e.kind &&
                              (e.sendEncodingParameters[0].rtx = { ssrc: 1001 * (2 * r + 2) + 1 })
                        }
                        var c = a(e.localCapabilities, e.remoteCapabilities)
                        !c.codecs.filter(function(e) {
                          return 'rtx' === e.name.toLowerCase()
                        }).length &&
                          e.sendEncodingParameters[0].rtx &&
                          delete e.sendEncodingParameters[0].rtx,
                          (i += n(e, c, 'answer', e.stream)),
                          e.rtcpParameters &&
                            e.rtcpParameters.reducedSize &&
                            (i += 'a=rtcp-rsize\r\n')
                      }
                    })
                    var s = new e.RTCSessionDescription({ type: 'answer', sdp: i })
                    return new Promise(function(e) {
                      if (r.length > 0 && 'function' == typeof r[0])
                        return r[0].apply(null, [s]), void e()
                      e(s)
                    })
                  }),
                  (r.prototype.addIceCandidate = function(e) {
                    var t, r
                    if (e && '' !== e.candidate) {
                      if (!e.sdpMLineIndex && !e.sdpMid)
                        throw new TypeError('sdpMLineIndex or sdpMid required')
                      if (this.remoteDescription) {
                        var n = e.sdpMLineIndex
                        if (e.sdpMid)
                          for (var i = 0; i < this.transceivers.length; i++)
                            if (this.transceivers[i].mid === e.sdpMid) {
                              n = i
                              break
                            }
                        var a = this.transceivers[n]
                        if (a) {
                          if (a.isDatachannel) return Promise.resolve()
                          var o =
                            Object.keys(e.candidate).length > 0 ? c.parseCandidate(e.candidate) : {}
                          if ('tcp' === o.protocol && (0 === o.port || 9 === o.port))
                            return Promise.resolve()
                          if (o.component && 1 !== o.component) return Promise.resolve()
                          if (
                            ((0 === n ||
                              (n > 0 && a.iceTransport !== this.transceivers[0].iceTransport)) &&
                              (s(a.iceTransport, o) ||
                                ((t = new Error('Can not add ICE candidate')),
                                (t.name = 'OperationError'))),
                            !t)
                          ) {
                            var d = e.candidate.trim()
                            0 === d.indexOf('a=') && (d = d.substr(2)),
                              (r = c.splitSections(this.remoteDescription.sdp)),
                              (r[n + 1] += 'a=' + (o.type ? d : 'end-of-candidates') + '\r\n'),
                              (this.remoteDescription.sdp = r.join(''))
                          }
                        } else
                          (t = new Error('Can not add ICE candidate')), (t.name = 'OperationError')
                      } else
                        (t = new Error('Can not add ICE candidate without a remote description')),
                          (t.name = 'InvalidStateError')
                    } else
                      for (
                        var p = 0;
                        p < this.transceivers.length &&
                        (this.transceivers[p].isDatachannel ||
                          (this.transceivers[p].iceTransport.addRemoteCandidate({}),
                          (r = c.splitSections(this.remoteDescription.sdp)),
                          (r[p + 1] += 'a=end-of-candidates\r\n'),
                          (this.remoteDescription.sdp = r.join('')),
                          !this.usingBundle));
                        p++
                      );
                    var l = arguments
                    return new Promise(function(e, r) {
                      t
                        ? (l.length > 2 && 'function' == typeof l[2] && l[2].apply(null, [t]), r(t))
                        : (l.length > 1 && 'function' == typeof l[1] && l[1].apply(null), e())
                    })
                  }),
                  (r.prototype.getStats = function() {
                    var e = []
                    this.transceivers.forEach(function(t) {
                      ;[
                        'rtpSender',
                        'rtpReceiver',
                        'iceGatherer',
                        'iceTransport',
                        'dtlsTransport',
                      ].forEach(function(r) {
                        t[r] && e.push(t[r].getStats())
                      })
                    })
                    var t =
                        arguments.length > 1 && 'function' == typeof arguments[1] && arguments[1],
                      r = function(e) {
                        return (
                          {
                            inboundrtp: 'inbound-rtp',
                            outboundrtp: 'outbound-rtp',
                            candidatepair: 'candidate-pair',
                            localcandidate: 'local-candidate',
                            remotecandidate: 'remote-candidate',
                          }[e.type] || e.type
                        )
                      }
                    return new Promise(function(n) {
                      var i = new Map()
                      Promise.all(e).then(function(e) {
                        e.forEach(function(e) {
                          Object.keys(e).forEach(function(t) {
                            ;(e[t].type = r(e[t])), i.set(t, e[t])
                          })
                        }),
                          t && t.apply(null, i),
                          n(i)
                      })
                    })
                  }),
                  r
                )
              }
            },
            { sdp: 2 },
          ],
          2: [
            function(e, t, r) {
              'use strict'
              var n = {}
              ;(n.generateIdentifier = function() {
                return Math.random()
                  .toString(36)
                  .substr(2, 10)
              }),
                (n.localCName = n.generateIdentifier()),
                (n.splitLines = function(e) {
                  return e
                    .trim()
                    .split('\n')
                    .map(function(e) {
                      return e.trim()
                    })
                }),
                (n.splitSections = function(e) {
                  return e.split('\nm=').map(function(e, t) {
                    return (t > 0 ? 'm=' + e : e).trim() + '\r\n'
                  })
                }),
                (n.matchPrefix = function(e, t) {
                  return n.splitLines(e).filter(function(e) {
                    return 0 === e.indexOf(t)
                  })
                }),
                (n.parseCandidate = function(e) {
                  var t
                  t =
                    0 === e.indexOf('a=candidate:')
                      ? e.substring(12).split(' ')
                      : e.substring(10).split(' ')
                  for (
                    var r = {
                        foundation: t[0],
                        component: parseInt(t[1], 10),
                        protocol: t[2].toLowerCase(),
                        priority: parseInt(t[3], 10),
                        ip: t[4],
                        port: parseInt(t[5], 10),
                        type: t[7],
                      },
                      n = 8;
                    n < t.length;
                    n += 2
                  )
                    switch (t[n]) {
                      case 'raddr':
                        r.relatedAddress = t[n + 1]
                        break
                      case 'rport':
                        r.relatedPort = parseInt(t[n + 1], 10)
                        break
                      case 'tcptype':
                        r.tcpType = t[n + 1]
                        break
                      case 'ufrag':
                        ;(r.ufrag = t[n + 1]), (r.usernameFragment = t[n + 1])
                        break
                      default:
                        r[t[n]] = t[n + 1]
                    }
                  return r
                }),
                (n.writeCandidate = function(e) {
                  var t = []
                  t.push(e.foundation),
                    t.push(e.component),
                    t.push(e.protocol.toUpperCase()),
                    t.push(e.priority),
                    t.push(e.ip),
                    t.push(e.port)
                  var r = e.type
                  return (
                    t.push('typ'),
                    t.push(r),
                    'host' !== r &&
                      e.relatedAddress &&
                      e.relatedPort &&
                      (t.push('raddr'),
                      t.push(e.relatedAddress),
                      t.push('rport'),
                      t.push(e.relatedPort)),
                    e.tcpType &&
                      'tcp' === e.protocol.toLowerCase() &&
                      (t.push('tcptype'), t.push(e.tcpType)),
                    e.ufrag && (t.push('ufrag'), t.push(e.ufrag)),
                    'candidate:' + t.join(' ')
                  )
                }),
                (n.parseIceOptions = function(e) {
                  return e.substr(14).split(' ')
                }),
                (n.parseRtpMap = function(e) {
                  var t = e.substr(9).split(' '),
                    r = { payloadType: parseInt(t.shift(), 10) }
                  return (
                    (t = t[0].split('/')),
                    (r.name = t[0]),
                    (r.clockRate = parseInt(t[1], 10)),
                    (r.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1),
                    r
                  )
                }),
                (n.writeRtpMap = function(e) {
                  var t = e.payloadType
                  return (
                    e.preferredPayloadType !== undefined && (t = e.preferredPayloadType),
                    'a=rtpmap:' +
                      t +
                      ' ' +
                      e.name +
                      '/' +
                      e.clockRate +
                      (1 !== e.numChannels ? '/' + e.numChannels : '') +
                      '\r\n'
                  )
                }),
                (n.parseExtmap = function(e) {
                  var t = e.substr(9).split(' ')
                  return {
                    id: parseInt(t[0], 10),
                    direction: t[0].indexOf('/') > 0 ? t[0].split('/')[1] : 'sendrecv',
                    uri: t[1],
                  }
                }),
                (n.writeExtmap = function(e) {
                  return (
                    'a=extmap:' +
                    (e.id || e.preferredId) +
                    (e.direction && 'sendrecv' !== e.direction ? '/' + e.direction : '') +
                    ' ' +
                    e.uri +
                    '\r\n'
                  )
                }),
                (n.parseFmtp = function(e) {
                  for (
                    var t, r = {}, n = e.substr(e.indexOf(' ') + 1).split(';'), i = 0;
                    i < n.length;
                    i++
                  )
                    (t = n[i].trim().split('=')), (r[t[0].trim()] = t[1])
                  return r
                }),
                (n.writeFmtp = function(e) {
                  var t = '',
                    r = e.payloadType
                  if (
                    (e.preferredPayloadType !== undefined && (r = e.preferredPayloadType),
                    e.parameters && Object.keys(e.parameters).length)
                  ) {
                    var n = []
                    Object.keys(e.parameters).forEach(function(t) {
                      n.push(t + '=' + e.parameters[t])
                    }),
                      (t += 'a=fmtp:' + r + ' ' + n.join(';') + '\r\n')
                  }
                  return t
                }),
                (n.parseRtcpFb = function(e) {
                  var t = e.substr(e.indexOf(' ') + 1).split(' ')
                  return { type: t.shift(), parameter: t.join(' ') }
                }),
                (n.writeRtcpFb = function(e) {
                  var t = '',
                    r = e.payloadType
                  return (
                    e.preferredPayloadType !== undefined && (r = e.preferredPayloadType),
                    e.rtcpFeedback &&
                      e.rtcpFeedback.length &&
                      e.rtcpFeedback.forEach(function(e) {
                        t +=
                          'a=rtcp-fb:' +
                          r +
                          ' ' +
                          e.type +
                          (e.parameter && e.parameter.length ? ' ' + e.parameter : '') +
                          '\r\n'
                      }),
                    t
                  )
                }),
                (n.parseSsrcMedia = function(e) {
                  var t = e.indexOf(' '),
                    r = { ssrc: parseInt(e.substr(7, t - 7), 10) },
                    n = e.indexOf(':', t)
                  return (
                    n > -1
                      ? ((r.attribute = e.substr(t + 1, n - t - 1)), (r.value = e.substr(n + 1)))
                      : (r.attribute = e.substr(t + 1)),
                    r
                  )
                }),
                (n.getMid = function(e) {
                  var t = n.matchPrefix(e, 'a=mid:')[0]
                  if (t) return t.substr(6)
                }),
                (n.parseFingerprint = function(e) {
                  var t = e.substr(14).split(' ')
                  return { algorithm: t[0].toLowerCase(), value: t[1] }
                }),
                (n.getDtlsParameters = function(e, t) {
                  return {
                    role: 'auto',
                    fingerprints: n.matchPrefix(e + t, 'a=fingerprint:').map(n.parseFingerprint),
                  }
                }),
                (n.writeDtlsParameters = function(e, t) {
                  var r = 'a=setup:' + t + '\r\n'
                  return (
                    e.fingerprints.forEach(function(e) {
                      r += 'a=fingerprint:' + e.algorithm + ' ' + e.value + '\r\n'
                    }),
                    r
                  )
                }),
                (n.getIceParameters = function(e, t) {
                  var r = n.splitLines(e)
                  return (
                    (r = r.concat(n.splitLines(t))),
                    {
                      usernameFragment: r
                        .filter(function(e) {
                          return 0 === e.indexOf('a=ice-ufrag:')
                        })[0]
                        .substr(12),
                      password: r
                        .filter(function(e) {
                          return 0 === e.indexOf('a=ice-pwd:')
                        })[0]
                        .substr(10),
                    }
                  )
                }),
                (n.writeIceParameters = function(e) {
                  return (
                    'a=ice-ufrag:' + e.usernameFragment + '\r\na=ice-pwd:' + e.password + '\r\n'
                  )
                }),
                (n.parseRtpParameters = function(e) {
                  for (
                    var t = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] },
                      r = n.splitLines(e),
                      i = r[0].split(' '),
                      a = 3;
                    a < i.length;
                    a++
                  ) {
                    var o = i[a],
                      s = n.matchPrefix(e, 'a=rtpmap:' + o + ' ')[0]
                    if (s) {
                      var c = n.parseRtpMap(s),
                        d = n.matchPrefix(e, 'a=fmtp:' + o + ' ')
                      switch (
                        ((c.parameters = d.length ? n.parseFmtp(d[0]) : {}),
                        (c.rtcpFeedback = n
                          .matchPrefix(e, 'a=rtcp-fb:' + o + ' ')
                          .map(n.parseRtcpFb)),
                        t.codecs.push(c),
                        c.name.toUpperCase())
                      ) {
                        case 'RED':
                        case 'ULPFEC':
                          t.fecMechanisms.push(c.name.toUpperCase())
                      }
                    }
                  }
                  return (
                    n.matchPrefix(e, 'a=extmap:').forEach(function(e) {
                      t.headerExtensions.push(n.parseExtmap(e))
                    }),
                    t
                  )
                }),
                (n.writeRtpDescription = function(e, t) {
                  var r = ''
                  ;(r += 'm=' + e + ' '),
                    (r += t.codecs.length > 0 ? '9' : '0'),
                    (r += ' UDP/TLS/RTP/SAVPF '),
                    (r +=
                      t.codecs
                        .map(function(e) {
                          return e.preferredPayloadType !== undefined
                            ? e.preferredPayloadType
                            : e.payloadType
                        })
                        .join(' ') + '\r\n'),
                    (r += 'c=IN IP4 0.0.0.0\r\n'),
                    (r += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'),
                    t.codecs.forEach(function(e) {
                      ;(r += n.writeRtpMap(e)), (r += n.writeFmtp(e)), (r += n.writeRtcpFb(e))
                    })
                  var i = 0
                  return (
                    t.codecs.forEach(function(e) {
                      e.maxptime > i && (i = e.maxptime)
                    }),
                    i > 0 && (r += 'a=maxptime:' + i + '\r\n'),
                    (r += 'a=rtcp-mux\r\n'),
                    t.headerExtensions.forEach(function(e) {
                      r += n.writeExtmap(e)
                    }),
                    r
                  )
                }),
                (n.parseRtpEncodingParameters = function(e) {
                  var t,
                    r = [],
                    i = n.parseRtpParameters(e),
                    a = -1 !== i.fecMechanisms.indexOf('RED'),
                    o = -1 !== i.fecMechanisms.indexOf('ULPFEC'),
                    s = n
                      .matchPrefix(e, 'a=ssrc:')
                      .map(function(e) {
                        return n.parseSsrcMedia(e)
                      })
                      .filter(function(e) {
                        return 'cname' === e.attribute
                      }),
                    c = s.length > 0 && s[0].ssrc,
                    d = n.matchPrefix(e, 'a=ssrc-group:FID').map(function(e) {
                      var t = e.split(' ')
                      return (
                        t.shift(),
                        t.map(function(e) {
                          return parseInt(e, 10)
                        })
                      )
                    })
                  d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]),
                    i.codecs.forEach(function(e) {
                      if ('RTX' === e.name.toUpperCase() && e.parameters.apt) {
                        var n = {
                          ssrc: c,
                          codecPayloadType: parseInt(e.parameters.apt, 10),
                          rtx: { ssrc: t },
                        }
                        r.push(n),
                          a &&
                            ((n = JSON.parse(JSON.stringify(n))),
                            (n.fec = { ssrc: t, mechanism: o ? 'red+ulpfec' : 'red' }),
                            r.push(n))
                      }
                    }),
                    0 === r.length && c && r.push({ ssrc: c })
                  var p = n.matchPrefix(e, 'b=')
                  return (
                    p.length &&
                      ((p =
                        0 === p[0].indexOf('b=TIAS:')
                          ? parseInt(p[0].substr(7), 10)
                          : 0 === p[0].indexOf('b=AS:')
                          ? 1e3 * parseInt(p[0].substr(5), 10) * 0.95 - 16e3
                          : undefined),
                      r.forEach(function(e) {
                        e.maxBitrate = p
                      })),
                    r
                  )
                }),
                (n.parseRtcpParameters = function(e) {
                  var t = {},
                    r = n
                      .matchPrefix(e, 'a=ssrc:')
                      .map(function(e) {
                        return n.parseSsrcMedia(e)
                      })
                      .filter(function(e) {
                        return 'cname' === e.attribute
                      })[0]
                  r && ((t.cname = r.value), (t.ssrc = r.ssrc))
                  var i = n.matchPrefix(e, 'a=rtcp-rsize')
                  ;(t.reducedSize = i.length > 0), (t.compound = 0 === i.length)
                  var a = n.matchPrefix(e, 'a=rtcp-mux')
                  return (t.mux = a.length > 0), t
                }),
                (n.parseMsid = function(e) {
                  var t,
                    r = n.matchPrefix(e, 'a=msid:')
                  if (1 === r.length)
                    return (t = r[0].substr(7).split(' ')), { stream: t[0], track: t[1] }
                  var i = n
                    .matchPrefix(e, 'a=ssrc:')
                    .map(function(e) {
                      return n.parseSsrcMedia(e)
                    })
                    .filter(function(e) {
                      return 'msid' === e.attribute
                    })
                  return i.length > 0
                    ? ((t = i[0].value.split(' ')), { stream: t[0], track: t[1] })
                    : void 0
                }),
                (n.generateSessionId = function() {
                  return Math.random()
                    .toString()
                    .substr(2, 21)
                }),
                (n.writeSessionBoilerplate = function(e, t) {
                  var r = t !== undefined ? t : 2
                  return (
                    'v=0\r\no=thisisadapterortc ' +
                    (e || n.generateSessionId()) +
                    ' ' +
                    r +
                    ' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
                  )
                }),
                (n.writeMediaSection = function(e, t, r, i) {
                  var a = n.writeRtpDescription(e.kind, t)
                  if (
                    ((a += n.writeIceParameters(e.iceGatherer.getLocalParameters())),
                    (a += n.writeDtlsParameters(
                      e.dtlsTransport.getLocalParameters(),
                      'offer' === r ? 'actpass' : 'active',
                    )),
                    (a += 'a=mid:' + e.mid + '\r\n'),
                    e.direction
                      ? (a += 'a=' + e.direction + '\r\n')
                      : e.rtpSender && e.rtpReceiver
                      ? (a += 'a=sendrecv\r\n')
                      : e.rtpSender
                      ? (a += 'a=sendonly\r\n')
                      : e.rtpReceiver
                      ? (a += 'a=recvonly\r\n')
                      : (a += 'a=inactive\r\n'),
                    e.rtpSender)
                  ) {
                    var o = 'msid:' + i.id + ' ' + e.rtpSender.track.id + '\r\n'
                    ;(a += 'a=' + o),
                      (a += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + o),
                      e.sendEncodingParameters[0].rtx &&
                        ((a += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + o),
                        (a +=
                          'a=ssrc-group:FID ' +
                          e.sendEncodingParameters[0].ssrc +
                          ' ' +
                          e.sendEncodingParameters[0].rtx.ssrc +
                          '\r\n'))
                  }
                  return (
                    (a +=
                      'a=ssrc:' +
                      e.sendEncodingParameters[0].ssrc +
                      ' cname:' +
                      n.localCName +
                      '\r\n'),
                    e.rtpSender &&
                      e.sendEncodingParameters[0].rtx &&
                      (a +=
                        'a=ssrc:' +
                        e.sendEncodingParameters[0].rtx.ssrc +
                        ' cname:' +
                        n.localCName +
                        '\r\n'),
                    a
                  )
                }),
                (n.getDirection = function(e, t) {
                  for (var r = n.splitLines(e), i = 0; i < r.length; i++)
                    switch (r[i]) {
                      case 'a=sendrecv':
                      case 'a=sendonly':
                      case 'a=recvonly':
                      case 'a=inactive':
                        return r[i].substr(2)
                    }
                  return t ? n.getDirection(t) : 'sendrecv'
                }),
                (n.getKind = function(e) {
                  return n
                    .splitLines(e)[0]
                    .split(' ')[0]
                    .substr(2)
                }),
                (n.isRejected = function(e) {
                  return '0' === e.split(' ', 2)[1]
                }),
                (n.parseMLine = function(e) {
                  var t = n.splitLines(e),
                    r = t[0].split(' ')
                  return {
                    kind: r[0].substr(2),
                    port: parseInt(r[1], 10),
                    protocol: r[2],
                    fmt: r.slice(3).join(' '),
                  }
                }),
                'object' == typeof t && (t.exports = n)
            },
            {},
          ],
          3: [
            function(e, t, r) {
              ;(function(r) {
                'use strict'
                var n = e('./adapter_factory.js')
                t.exports = n({ window: r.window })
              }.call(
                this,
                'undefined' != typeof global
                  ? global
                  : 'undefined' != typeof self
                  ? self
                  : 'undefined' != typeof window
                  ? window
                  : {},
              ))
            },
            { './adapter_factory.js': 4 },
          ],
          4: [
            function(e, t, r) {
              'use strict'
              var n = e('./utils')
              t.exports = function(t, r) {
                var i = t && t.window,
                  a = { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 }
                for (var o in r) hasOwnProperty.call(r, o) && (a[o] = r[o])
                var s = n.log,
                  c = n.detectBrowser(i),
                  d = {
                    browserDetails: c,
                    extractVersion: n.extractVersion,
                    disableLog: n.disableLog,
                    disableWarnings: n.disableWarnings,
                  },
                  p = e('./chrome/chrome_shim') || null,
                  l = e('./edge/edge_shim') || null,
                  u = e('./firefox/firefox_shim') || null,
                  f = e('./safari/safari_shim') || null,
                  m = e('./common_shim') || null
                switch (c.browser) {
                  case 'chrome':
                    if (!p || !p.shimPeerConnection || !a.shimChrome)
                      return s('Chrome shim is not included in this adapter release.'), d
                    s('adapter.js shimming chrome.'),
                      (d.browserShim = p),
                      m.shimCreateObjectURL(i),
                      p.shimGetUserMedia(i),
                      p.shimMediaStream(i),
                      p.shimSourceObject(i),
                      p.shimPeerConnection(i),
                      p.shimOnTrack(i),
                      p.shimAddTrackRemoveTrack(i),
                      p.shimGetSendersWithDtmf(i),
                      m.shimRTCIceCandidate(i)
                    break
                  case 'firefox':
                    if (!u || !u.shimPeerConnection || !a.shimFirefox)
                      return s('Firefox shim is not included in this adapter release.'), d
                    s('adapter.js shimming firefox.'),
                      (d.browserShim = u),
                      m.shimCreateObjectURL(i),
                      u.shimGetUserMedia(i),
                      u.shimSourceObject(i),
                      u.shimPeerConnection(i),
                      u.shimOnTrack(i),
                      m.shimRTCIceCandidate(i)
                    break
                  case 'edge':
                    if (!l || !l.shimPeerConnection || !a.shimEdge)
                      return s('MS edge shim is not included in this adapter release.'), d
                    s('adapter.js shimming edge.'),
                      (d.browserShim = l),
                      m.shimCreateObjectURL(i),
                      l.shimGetUserMedia(i),
                      l.shimPeerConnection(i),
                      l.shimReplaceTrack(i)
                    break
                  case 'safari':
                    if (!f || !a.shimSafari)
                      return s('Safari shim is not included in this adapter release.'), d
                    s('adapter.js shimming safari.'),
                      (d.browserShim = f),
                      m.shimCreateObjectURL(i),
                      f.shimRTCIceServerUrls(i),
                      f.shimCallbacksAPI(i),
                      f.shimLocalStreamsAPI(i),
                      f.shimRemoteStreamsAPI(i),
                      f.shimTrackEventTransceiver(i),
                      f.shimGetUserMedia(i),
                      m.shimRTCIceCandidate(i)
                    break
                  default:
                    s('Unsupported browser!')
                }
                return d
              }
            },
            {
              './chrome/chrome_shim': 5,
              './common_shim': 7,
              './edge/edge_shim': 8,
              './firefox/firefox_shim': 10,
              './safari/safari_shim': 12,
              './utils': 13,
            },
          ],
          5: [
            function(e, t, r) {
              'use strict'
              var n = e('../utils.js'),
                i = n.log,
                a = {
                  shimMediaStream: function(e) {
                    e.MediaStream = e.MediaStream || e.webkitMediaStream
                  },
                  shimOnTrack: function(e) {
                    if (
                      'object' == typeof e &&
                      e.RTCPeerConnection &&
                      !('ontrack' in e.RTCPeerConnection.prototype)
                    ) {
                      Object.defineProperty(e.RTCPeerConnection.prototype, 'ontrack', {
                        get: function() {
                          return this._ontrack
                        },
                        set: function(e) {
                          this._ontrack && this.removeEventListener('track', this._ontrack),
                            this.addEventListener('track', (this._ontrack = e))
                        },
                      })
                      var t = e.RTCPeerConnection.prototype.setRemoteDescription
                      e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                        var r = this
                        return (
                          r._ontrackpoly ||
                            ((r._ontrackpoly = function(t) {
                              t.stream.addEventListener('addtrack', function(n) {
                                var i
                                i = e.RTCPeerConnection.prototype.getReceivers
                                  ? r.getReceivers().find(function(e) {
                                      return e.track && e.track.id === n.track.id
                                    })
                                  : { track: n.track }
                                var a = new Event('track')
                                ;(a.track = n.track),
                                  (a.receiver = i),
                                  (a.transceiver = { receiver: i }),
                                  (a.streams = [t.stream]),
                                  r.dispatchEvent(a)
                              }),
                                t.stream.getTracks().forEach(function(n) {
                                  var i
                                  i = e.RTCPeerConnection.prototype.getReceivers
                                    ? r.getReceivers().find(function(e) {
                                        return e.track && e.track.id === n.id
                                      })
                                    : { track: n }
                                  var a = new Event('track')
                                  ;(a.track = n),
                                    (a.receiver = i),
                                    (a.transceiver = { receiver: i }),
                                    (a.streams = [t.stream]),
                                    r.dispatchEvent(a)
                                })
                            }),
                            r.addEventListener('addstream', r._ontrackpoly)),
                          t.apply(r, arguments)
                        )
                      }
                    }
                  },
                  shimGetSendersWithDtmf: function(e) {
                    if (
                      'object' == typeof e &&
                      e.RTCPeerConnection &&
                      !('getSenders' in e.RTCPeerConnection.prototype) &&
                      'createDTMFSender' in e.RTCPeerConnection.prototype
                    ) {
                      var t = function(e, t) {
                        return {
                          track: t,
                          get dtmf() {
                            return (
                              this._dtmf === undefined &&
                                ('audio' === t.kind
                                  ? (this._dtmf = e.createDTMFSender(t))
                                  : (this._dtmf = null)),
                              this._dtmf
                            )
                          },
                          _pc: e,
                        }
                      }
                      if (!e.RTCPeerConnection.prototype.getSenders) {
                        e.RTCPeerConnection.prototype.getSenders = function() {
                          return (this._senders = this._senders || []), this._senders.slice()
                        }
                        var r = e.RTCPeerConnection.prototype.addTrack
                        e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                          var i = this,
                            a = r.apply(i, arguments)
                          return a || ((a = t(i, e)), i._senders.push(a)), a
                        }
                        var n = e.RTCPeerConnection.prototype.removeTrack
                        e.RTCPeerConnection.prototype.removeTrack = function(e) {
                          var t = this
                          n.apply(t, arguments)
                          var r = t._senders.indexOf(e)
                          ;-1 !== r && t._senders.splice(r, 1)
                        }
                      }
                      var i = e.RTCPeerConnection.prototype.addStream
                      e.RTCPeerConnection.prototype.addStream = function(e) {
                        var r = this
                        ;(r._senders = r._senders || []),
                          i.apply(r, [e]),
                          e.getTracks().forEach(function(e) {
                            r._senders.push(t(r, e))
                          })
                      }
                      var a = e.RTCPeerConnection.prototype.removeStream
                      e.RTCPeerConnection.prototype.removeStream = function(e) {
                        var t = this
                        ;(t._senders = t._senders || []),
                          a.apply(t, [t._streams[e.id] || e]),
                          e.getTracks().forEach(function(e) {
                            var r = t._senders.find(function(t) {
                              return t.track === e
                            })
                            r && t._senders.splice(t._senders.indexOf(r), 1)
                          })
                      }
                    } else if (
                      'object' == typeof e &&
                      e.RTCPeerConnection &&
                      'getSenders' in e.RTCPeerConnection.prototype &&
                      'createDTMFSender' in e.RTCPeerConnection.prototype &&
                      e.RTCRtpSender &&
                      !('dtmf' in e.RTCRtpSender.prototype)
                    ) {
                      var o = e.RTCPeerConnection.prototype.getSenders
                      ;(e.RTCPeerConnection.prototype.getSenders = function() {
                        var e = this,
                          t = o.apply(e, [])
                        return (
                          t.forEach(function(t) {
                            t._pc = e
                          }),
                          t
                        )
                      }),
                        Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                          get: function() {
                            return (
                              this._dtmf === undefined &&
                                ('audio' === this.track.kind
                                  ? (this._dtmf = this._pc.createDTMFSender(this.track))
                                  : (this._dtmf = null)),
                              this._dtmf
                            )
                          },
                        })
                    }
                  },
                  shimSourceObject: function(e) {
                    var t = e && e.URL
                    'object' == typeof e &&
                      (!e.HTMLMediaElement ||
                        'srcObject' in e.HTMLMediaElement.prototype ||
                        Object.defineProperty(e.HTMLMediaElement.prototype, 'srcObject', {
                          get: function() {
                            return this._srcObject
                          },
                          set: function(e) {
                            var r = this
                            if (
                              ((this._srcObject = e), this.src && t.revokeObjectURL(this.src), !e)
                            )
                              return (this.src = ''), undefined
                            ;(this.src = t.createObjectURL(e)),
                              e.addEventListener('addtrack', function() {
                                r.src && t.revokeObjectURL(r.src), (r.src = t.createObjectURL(e))
                              }),
                              e.addEventListener('removetrack', function() {
                                r.src && t.revokeObjectURL(r.src), (r.src = t.createObjectURL(e))
                              })
                          },
                        }))
                  },
                  shimAddTrackRemoveTrack: function(e) {
                    function t(e, t) {
                      var r = t.sdp
                      return (
                        Object.keys(e._reverseStreams || []).forEach(function(t) {
                          var n = e._reverseStreams[t],
                            i = e._streams[n.id]
                          r = r.replace(new RegExp(i.id, 'g'), n.id)
                        }),
                        new RTCSessionDescription({ type: t.type, sdp: r })
                      )
                    }
                    function r(e, t) {
                      var r = t.sdp
                      return (
                        Object.keys(e._reverseStreams || []).forEach(function(t) {
                          var n = e._reverseStreams[t],
                            i = e._streams[n.id]
                          r = r.replace(new RegExp(n.id, 'g'), i.id)
                        }),
                        new RTCSessionDescription({ type: t.type, sdp: r })
                      )
                    }
                    var i = n.detectBrowser(e)
                    if (!(e.RTCPeerConnection.prototype.addTrack && i.version >= 62)) {
                      var a = e.RTCPeerConnection.prototype.getLocalStreams
                      e.RTCPeerConnection.prototype.getLocalStreams = function() {
                        var e = this,
                          t = a.apply(this)
                        return (
                          (e._reverseStreams = e._reverseStreams || {}),
                          t.map(function(t) {
                            return e._reverseStreams[t.id]
                          })
                        )
                      }
                      var o = e.RTCPeerConnection.prototype.addStream
                      e.RTCPeerConnection.prototype.addStream = function(t) {
                        var r = this
                        if (
                          ((r._streams = r._streams || {}),
                          (r._reverseStreams = r._reverseStreams || {}),
                          t.getTracks().forEach(function(e) {
                            if (
                              r.getSenders().find(function(t) {
                                return t.track === e
                              })
                            )
                              throw new DOMException('Track already exists.', 'InvalidAccessError')
                          }),
                          !r._reverseStreams[t.id])
                        ) {
                          var n = new e.MediaStream(t.getTracks())
                          ;(r._streams[t.id] = n), (r._reverseStreams[n.id] = t), (t = n)
                        }
                        o.apply(r, [t])
                      }
                      var s = e.RTCPeerConnection.prototype.removeStream
                      ;(e.RTCPeerConnection.prototype.removeStream = function(e) {
                        var t = this
                        ;(t._streams = t._streams || {}),
                          (t._reverseStreams = t._reverseStreams || {}),
                          s.apply(t, [t._streams[e.id] || e]),
                          delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id : e.id],
                          delete t._streams[e.id]
                      }),
                        (e.RTCPeerConnection.prototype.addTrack = function(t, r) {
                          var n = this
                          if ('closed' === n.signalingState)
                            throw new DOMException(
                              "The RTCPeerConnection's signalingState is 'closed'.",
                              'InvalidStateError',
                            )
                          var i = [].slice.call(arguments, 1)
                          if (
                            1 !== i.length ||
                            !i[0].getTracks().find(function(e) {
                              return e === t
                            })
                          )
                            throw new DOMException(
                              'The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.',
                              'NotSupportedError',
                            )
                          if (
                            n.getSenders().find(function(e) {
                              return e.track === t
                            })
                          )
                            throw new DOMException('Track already exists.', 'InvalidAccessError')
                          ;(n._streams = n._streams || {}),
                            (n._reverseStreams = n._reverseStreams || {})
                          var a = n._streams[r.id]
                          if (a)
                            a.addTrack(t),
                              Promise.resolve().then(function() {
                                n.dispatchEvent(new Event('negotiationneeded'))
                              })
                          else {
                            var o = new e.MediaStream([t])
                            ;(n._streams[r.id] = o), (n._reverseStreams[o.id] = r), n.addStream(o)
                          }
                          return n.getSenders().find(function(e) {
                            return e.track === t
                          })
                        }),
                        ['createOffer', 'createAnswer'].forEach(function(r) {
                          var n = e.RTCPeerConnection.prototype[r]
                          e.RTCPeerConnection.prototype[r] = function() {
                            var e = this,
                              r = arguments
                            return arguments.length && 'function' == typeof arguments[0]
                              ? n.apply(e, [
                                  function(n) {
                                    var i = t(e, n)
                                    r[0].apply(null, [i])
                                  },
                                  function(e) {
                                    r[1] && r[1].apply(null, e)
                                  },
                                  arguments[2],
                                ])
                              : n.apply(e, arguments).then(function(r) {
                                  return t(e, r)
                                })
                          }
                        })
                      var c = e.RTCPeerConnection.prototype.setLocalDescription
                      e.RTCPeerConnection.prototype.setLocalDescription = function() {
                        var e = this
                        return arguments.length && arguments[0].type
                          ? ((arguments[0] = r(e, arguments[0])), c.apply(e, arguments))
                          : c.apply(e, arguments)
                      }
                      var d = Object.getOwnPropertyDescriptor(
                        e.RTCPeerConnection.prototype,
                        'localDescription',
                      )
                      Object.defineProperty(e.RTCPeerConnection.prototype, 'localDescription', {
                        get: function() {
                          var e = this,
                            r = d.get.apply(this)
                          return '' === r.type ? r : t(e, r)
                        },
                      }),
                        (e.RTCPeerConnection.prototype.removeTrack = function(e) {
                          var t = this
                          if ('closed' === t.signalingState)
                            throw new DOMException(
                              "The RTCPeerConnection's signalingState is 'closed'.",
                              'InvalidStateError',
                            )
                          if (!e._pc)
                            throw new DOMException(
                              'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.',
                              'TypeError',
                            )
                          if (e._pc !== t)
                            throw new DOMException(
                              'Sender was not created by this connection.',
                              'InvalidAccessError',
                            )
                          t._streams = t._streams || {}
                          var r
                          Object.keys(t._streams).forEach(function(n) {
                            t._streams[n].getTracks().find(function(t) {
                              return e.track === t
                            }) && (r = t._streams[n])
                          }),
                            r &&
                              (1 === r.getTracks().length
                                ? t.removeStream(r)
                                : r.removeTrack(e.track),
                              t.dispatchEvent(new Event('negotiationneeded')))
                        })
                    }
                  },
                  shimPeerConnection: function(e) {
                    var t = n.detectBrowser(e)
                    if (e.RTCPeerConnection) {
                      var r = e.RTCPeerConnection
                      ;(e.RTCPeerConnection = function(e, t) {
                        if (e && e.iceServers) {
                          for (var i = [], a = 0; a < e.iceServers.length; a++) {
                            var o = e.iceServers[a]
                            !o.hasOwnProperty('urls') && o.hasOwnProperty('url')
                              ? (n.deprecated('RTCIceServer.url', 'RTCIceServer.urls'),
                                (o = JSON.parse(JSON.stringify(o))),
                                (o.urls = o.url),
                                i.push(o))
                              : i.push(e.iceServers[a])
                          }
                          e.iceServers = i
                        }
                        return new r(e, t)
                      }),
                        (e.RTCPeerConnection.prototype = r.prototype),
                        Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                          get: function() {
                            return r.generateCertificate
                          },
                        })
                    } else
                      (e.RTCPeerConnection = function(t, r) {
                        return (
                          i('PeerConnection'),
                          t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy),
                          new e.webkitRTCPeerConnection(t, r)
                        )
                      }),
                        (e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype),
                        e.webkitRTCPeerConnection.generateCertificate &&
                          Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                            get: function() {
                              return e.webkitRTCPeerConnection.generateCertificate
                            },
                          })
                    var a = e.RTCPeerConnection.prototype.getStats
                    ;(e.RTCPeerConnection.prototype.getStats = function(e, t, r) {
                      var n = this,
                        i = arguments
                      if (arguments.length > 0 && 'function' == typeof e)
                        return a.apply(this, arguments)
                      if (
                        0 === a.length &&
                        (0 === arguments.length || 'function' != typeof arguments[0])
                      )
                        return a.apply(this, [])
                      var o = function(e) {
                          var t = {}
                          return (
                            e.result().forEach(function(e) {
                              var r = {
                                id: e.id,
                                timestamp: e.timestamp,
                                type:
                                  {
                                    localcandidate: 'local-candidate',
                                    remotecandidate: 'remote-candidate',
                                  }[e.type] || e.type,
                              }
                              e.names().forEach(function(t) {
                                r[t] = e.stat(t)
                              }),
                                (t[r.id] = r)
                            }),
                            t
                          )
                        },
                        s = function(e) {
                          return new Map(
                            Object.keys(e).map(function(t) {
                              return [t, e[t]]
                            }),
                          )
                        }
                      if (arguments.length >= 2) {
                        var c = function(e) {
                          i[1](s(o(e)))
                        }
                        return a.apply(this, [c, arguments[0]])
                      }
                      return new Promise(function(e, t) {
                        a.apply(n, [
                          function(t) {
                            e(s(o(t)))
                          },
                          t,
                        ])
                      }).then(t, r)
                    }),
                      t.version < 51 &&
                        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                          function(t) {
                            var r = e.RTCPeerConnection.prototype[t]
                            e.RTCPeerConnection.prototype[t] = function() {
                              var e = arguments,
                                t = this,
                                n = new Promise(function(n, i) {
                                  r.apply(t, [e[0], n, i])
                                })
                              return e.length < 2
                                ? n
                                : n.then(
                                    function() {
                                      e[1].apply(null, [])
                                    },
                                    function(t) {
                                      e.length >= 3 && e[2].apply(null, [t])
                                    },
                                  )
                            }
                          },
                        ),
                      t.version < 52 &&
                        ['createOffer', 'createAnswer'].forEach(function(t) {
                          var r = e.RTCPeerConnection.prototype[t]
                          e.RTCPeerConnection.prototype[t] = function() {
                            var e = this
                            if (
                              arguments.length < 1 ||
                              (1 === arguments.length && 'object' == typeof arguments[0])
                            ) {
                              var t = 1 === arguments.length ? arguments[0] : undefined
                              return new Promise(function(n, i) {
                                r.apply(e, [n, i, t])
                              })
                            }
                            return r.apply(this, arguments)
                          }
                        }),
                      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                        function(t) {
                          var r = e.RTCPeerConnection.prototype[t]
                          e.RTCPeerConnection.prototype[t] = function() {
                            return (
                              (arguments[0] = new ('addIceCandidate' === t
                                ? e.RTCIceCandidate
                                : e.RTCSessionDescription)(arguments[0])),
                              r.apply(this, arguments)
                            )
                          }
                        },
                      )
                    var o = e.RTCPeerConnection.prototype.addIceCandidate
                    e.RTCPeerConnection.prototype.addIceCandidate = function() {
                      return arguments[0]
                        ? o.apply(this, arguments)
                        : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                    }
                  },
                }
              t.exports = {
                shimMediaStream: a.shimMediaStream,
                shimOnTrack: a.shimOnTrack,
                shimAddTrackRemoveTrack: a.shimAddTrackRemoveTrack,
                shimGetSendersWithDtmf: a.shimGetSendersWithDtmf,
                shimSourceObject: a.shimSourceObject,
                shimPeerConnection: a.shimPeerConnection,
                shimGetUserMedia: e('./getusermedia'),
              }
            },
            { '../utils.js': 13, './getusermedia': 6 },
          ],
          6: [
            function(e, t, r) {
              'use strict'
              var n = e('../utils.js'),
                i = n.log
              t.exports = function(e) {
                var t = n.detectBrowser(e),
                  r = e && e.navigator,
                  a = function(e) {
                    if ('object' != typeof e || e.mandatory || e.optional) return e
                    var t = {}
                    return (
                      Object.keys(e).forEach(function(r) {
                        if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                          var n = 'object' == typeof e[r] ? e[r] : { ideal: e[r] }
                          n.exact !== undefined &&
                            'number' == typeof n.exact &&
                            (n.min = n.max = n.exact)
                          var i = function(e, t) {
                            return e
                              ? e + t.charAt(0).toUpperCase() + t.slice(1)
                              : 'deviceId' === t
                              ? 'sourceId'
                              : t
                          }
                          if (n.ideal !== undefined) {
                            t.optional = t.optional || []
                            var a = {}
                            'number' == typeof n.ideal
                              ? ((a[i('min', r)] = n.ideal),
                                t.optional.push(a),
                                (a = {}),
                                (a[i('max', r)] = n.ideal),
                                t.optional.push(a))
                              : ((a[i('', r)] = n.ideal), t.optional.push(a))
                          }
                          n.exact !== undefined && 'number' != typeof n.exact
                            ? ((t.mandatory = t.mandatory || {}), (t.mandatory[i('', r)] = n.exact))
                            : ['min', 'max'].forEach(function(e) {
                                n[e] !== undefined &&
                                  ((t.mandatory = t.mandatory || {}), (t.mandatory[i(e, r)] = n[e]))
                              })
                        }
                      }),
                      e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
                      t
                    )
                  },
                  o = function(e, n) {
                    if ((e = JSON.parse(JSON.stringify(e))) && 'object' == typeof e.audio) {
                      var o = function(e, t, r) {
                        t in e && !(r in e) && ((e[r] = e[t]), delete e[t])
                      }
                      ;(e = JSON.parse(JSON.stringify(e))),
                        o(e.audio, 'autoGainControl', 'googAutoGainControl'),
                        o(e.audio, 'noiseSuppression', 'googNoiseSuppression'),
                        (e.audio = a(e.audio))
                    }
                    if (e && 'object' == typeof e.video) {
                      var s = e.video.facingMode
                      s = s && ('object' == typeof s ? s : { ideal: s })
                      var c = t.version < 61
                      if (
                        s &&
                        ('user' === s.exact ||
                          'environment' === s.exact ||
                          'user' === s.ideal ||
                          'environment' === s.ideal) &&
                        (!r.mediaDevices.getSupportedConstraints ||
                          !r.mediaDevices.getSupportedConstraints().facingMode ||
                          c)
                      ) {
                        delete e.video.facingMode
                        var d
                        if (
                          ('environment' === s.exact || 'environment' === s.ideal
                            ? (d = ['back', 'rear'])
                            : ('user' !== s.exact && 'user' !== s.ideal) || (d = ['front']),
                          d)
                        )
                          return r.mediaDevices.enumerateDevices().then(function(t) {
                            t = t.filter(function(e) {
                              return 'videoinput' === e.kind
                            })
                            var r = t.find(function(e) {
                              return d.some(function(t) {
                                return -1 !== e.label.toLowerCase().indexOf(t)
                              })
                            })
                            return (
                              !r && t.length && -1 !== d.indexOf('back') && (r = t[t.length - 1]),
                              r &&
                                (e.video.deviceId = s.exact
                                  ? { exact: r.deviceId }
                                  : { ideal: r.deviceId }),
                              (e.video = a(e.video)),
                              i('chrome: ' + JSON.stringify(e)),
                              n(e)
                            )
                          })
                      }
                      e.video = a(e.video)
                    }
                    return i('chrome: ' + JSON.stringify(e)), n(e)
                  },
                  s = function(e) {
                    return {
                      name:
                        {
                          PermissionDeniedError: 'NotAllowedError',
                          InvalidStateError: 'NotReadableError',
                          DevicesNotFoundError: 'NotFoundError',
                          ConstraintNotSatisfiedError: 'OverconstrainedError',
                          TrackStartError: 'NotReadableError',
                          MediaDeviceFailedDueToShutdown: 'NotReadableError',
                          MediaDeviceKillSwitchOn: 'NotReadableError',
                        }[e.name] || e.name,
                      message: e.message,
                      constraint: e.constraintName,
                      toString: function() {
                        return this.name + (this.message && ': ') + this.message
                      },
                    }
                  },
                  c = function(e, t, n) {
                    o(e, function(e) {
                      r.webkitGetUserMedia(e, t, function(e) {
                        n && n(s(e))
                      })
                    })
                  }
                r.getUserMedia = c
                var d = function(e) {
                  return new Promise(function(t, n) {
                    r.getUserMedia(e, t, n)
                  })
                }
                if (
                  (r.mediaDevices ||
                    (r.mediaDevices = {
                      getUserMedia: d,
                      enumerateDevices: function() {
                        return new Promise(function(t) {
                          var r = { audio: 'audioinput', video: 'videoinput' }
                          return e.MediaStreamTrack.getSources(function(e) {
                            t(
                              e.map(function(e) {
                                return {
                                  label: e.label,
                                  kind: r[e.kind],
                                  deviceId: e.id,
                                  groupId: '',
                                }
                              }),
                            )
                          })
                        })
                      },
                      getSupportedConstraints: function() {
                        return {
                          deviceId: !0,
                          echoCancellation: !0,
                          facingMode: !0,
                          frameRate: !0,
                          height: !0,
                          width: !0,
                        }
                      },
                    }),
                  r.mediaDevices.getUserMedia)
                ) {
                  var p = r.mediaDevices.getUserMedia.bind(r.mediaDevices)
                  r.mediaDevices.getUserMedia = function(e) {
                    return o(e, function(e) {
                      return p(e).then(
                        function(t) {
                          if (
                            (e.audio && !t.getAudioTracks().length) ||
                            (e.video && !t.getVideoTracks().length)
                          )
                            throw (t.getTracks().forEach(function(e) {
                              e.stop()
                            }),
                            new DOMException('', 'NotFoundError'))
                          return t
                        },
                        function(e) {
                          return Promise.reject(s(e))
                        },
                      )
                    })
                  }
                } else
                  r.mediaDevices.getUserMedia = function(e) {
                    return d(e)
                  }
                'undefined' == typeof r.mediaDevices.addEventListener &&
                  (r.mediaDevices.addEventListener = function() {
                    i('Dummy mediaDevices.addEventListener called.')
                  }),
                  'undefined' == typeof r.mediaDevices.removeEventListener &&
                    (r.mediaDevices.removeEventListener = function() {
                      i('Dummy mediaDevices.removeEventListener called.')
                    })
              }
            },
            { '../utils.js': 13 },
          ],
          7: [
            function(e, t, r) {
              'use strict'
              function n(e, t, r) {
                if (e.RTCPeerConnection) {
                  var n = e.RTCPeerConnection.prototype,
                    i = n.addEventListener
                  n.addEventListener = function(e, n) {
                    if (e !== t) return i.apply(this, arguments)
                    var a = function(e) {
                      n(r(e))
                    }
                    return (
                      (this._eventMap = this._eventMap || {}),
                      (this._eventMap[n] = a),
                      i.apply(this, [e, a])
                    )
                  }
                  var a = n.removeEventListener
                  ;(n.removeEventListener = function(e, r) {
                    if (e !== t || !this._eventMap || !this._eventMap[r])
                      return a.apply(this, arguments)
                    var n = this._eventMap[r]
                    return delete this._eventMap[r], a.apply(this, [e, n])
                  }),
                    Object.defineProperty(n, 'on' + t, {
                      get: function() {
                        return this['_on' + t]
                      },
                      set: function(e) {
                        this['_on' + t] &&
                          (this.removeEventListener(t, this['_on' + t]), delete this['_on' + t]),
                          e && this.addEventListener(t, (this['_on' + t] = e))
                      },
                    })
                }
              }
              var i = e('sdp'),
                a = e('./utils')
              t.exports = {
                shimRTCIceCandidate: function(e) {
                  if (!(e.RTCIceCandidate && 'foundation' in e.RTCIceCandidate.prototype)) {
                    var t = e.RTCIceCandidate
                    ;(e.RTCIceCandidate = function(e) {
                      'object' == typeof e &&
                        e.candidate &&
                        0 === e.candidate.indexOf('a=') &&
                        ((e = JSON.parse(JSON.stringify(e))), (e.candidate = e.candidate.substr(2)))
                      var r = new t(e),
                        n = i.parseCandidate(e.candidate),
                        a = Object.assign(r, n)
                      return (
                        (a.toJSON = function() {
                          return {
                            candidate: a.candidate,
                            sdpMid: a.sdpMid,
                            sdpMLineIndex: a.sdpMLineIndex,
                            usernameFragment: a.usernameFragment,
                          }
                        }),
                        a
                      )
                    }),
                      n(e, 'icecandidate', function(t) {
                        return (
                          t.candidate &&
                            Object.defineProperty(t, 'candidate', {
                              value: new e.RTCIceCandidate(t.candidate),
                              writable: 'false',
                            }),
                          t
                        )
                      })
                  }
                },
                shimCreateObjectURL: function(e) {
                  var t = e && e.URL
                  if (
                    !(
                      'object' == typeof e &&
                      e.HTMLMediaElement &&
                      'srcObject' in e.HTMLMediaElement.prototype &&
                      t.createObjectURL &&
                      t.revokeObjectURL
                    )
                  )
                    return undefined
                  var r = t.createObjectURL.bind(t),
                    n = t.revokeObjectURL.bind(t),
                    i = new Map(),
                    o = 0
                  ;(t.createObjectURL = function(e) {
                    if ('getTracks' in e) {
                      var t = 'polyblob:' + ++o
                      return (
                        i.set(t, e),
                        a.deprecated('URL.createObjectURL(stream)', 'elem.srcObject = stream'),
                        t
                      )
                    }
                    return r(e)
                  }),
                    (t.revokeObjectURL = function(e) {
                      n(e), i['delete'](e)
                    })
                  var s = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, 'src')
                  Object.defineProperty(e.HTMLMediaElement.prototype, 'src', {
                    get: function() {
                      return s.get.apply(this)
                    },
                    set: function(e) {
                      return (this.srcObject = i.get(e) || null), s.set.apply(this, [e])
                    },
                  })
                  var c = e.HTMLMediaElement.prototype.setAttribute
                  e.HTMLMediaElement.prototype.setAttribute = function() {
                    return (
                      2 === arguments.length &&
                        'src' === ('' + arguments[0]).toLowerCase() &&
                        (this.srcObject = i.get(arguments[1]) || null),
                      c.apply(this, arguments)
                    )
                  }
                },
              }
            },
            { './utils': 13, sdp: 2 },
          ],
          8: [
            function(e, t, r) {
              'use strict'
              var n = e('../utils'),
                i = e('rtcpeerconnection-shim')
              t.exports = {
                shimGetUserMedia: e('./getusermedia'),
                shimPeerConnection: function(e) {
                  var t = n.detectBrowser(e)
                  if (
                    e.RTCIceGatherer &&
                    (e.RTCIceCandidate ||
                      (e.RTCIceCandidate = function(e) {
                        return e
                      }),
                    e.RTCSessionDescription ||
                      (e.RTCSessionDescription = function(e) {
                        return e
                      }),
                    t.version < 15025)
                  ) {
                    var r = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, 'enabled')
                    Object.defineProperty(e.MediaStreamTrack.prototype, 'enabled', {
                      set: function(e) {
                        r.set.call(this, e)
                        var t = new Event('enabled')
                        ;(t.enabled = e), this.dispatchEvent(t)
                      },
                    })
                  }
                  !e.RTCRtpSender ||
                    'dtmf' in e.RTCRtpSender.prototype ||
                    Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                      get: function() {
                        return (
                          this._dtmf === undefined &&
                            ('audio' === this.track.kind
                              ? (this._dtmf = new e.RTCDtmfSender(this))
                              : 'video' === this.track.kind && (this._dtmf = null)),
                          this._dtmf
                        )
                      },
                    }),
                    (e.RTCPeerConnection = i(e, t.version))
                },
                shimReplaceTrack: function(e) {
                  !e.RTCRtpSender ||
                    'replaceTrack' in e.RTCRtpSender.prototype ||
                    (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
                },
              }
            },
            { '../utils': 13, './getusermedia': 9, 'rtcpeerconnection-shim': 1 },
          ],
          9: [
            function(e, t, r) {
              'use strict'
              t.exports = function(e) {
                var t = e && e.navigator,
                  r = function(e) {
                    return {
                      name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
                      message: e.message,
                      constraint: e.constraint,
                      toString: function() {
                        return this.name
                      },
                    }
                  },
                  n = t.mediaDevices.getUserMedia.bind(t.mediaDevices)
                t.mediaDevices.getUserMedia = function(e) {
                  return n(e)['catch'](function(e) {
                    return Promise.reject(r(e))
                  })
                }
              }
            },
            {},
          ],
          10: [
            function(e, t, r) {
              'use strict'
              var n = e('../utils'),
                i = {
                  shimOnTrack: function(e) {
                    'object' != typeof e ||
                      !e.RTCPeerConnection ||
                      'ontrack' in e.RTCPeerConnection.prototype ||
                      Object.defineProperty(e.RTCPeerConnection.prototype, 'ontrack', {
                        get: function() {
                          return this._ontrack
                        },
                        set: function(e) {
                          this._ontrack &&
                            (this.removeEventListener('track', this._ontrack),
                            this.removeEventListener('addstream', this._ontrackpoly)),
                            this.addEventListener('track', (this._ontrack = e)),
                            this.addEventListener(
                              'addstream',
                              (this._ontrackpoly = function(e) {
                                e.stream.getTracks().forEach(
                                  function(t) {
                                    var r = new Event('track')
                                    ;(r.track = t),
                                      (r.receiver = { track: t }),
                                      (r.transceiver = { receiver: r.receiver }),
                                      (r.streams = [e.stream]),
                                      this.dispatchEvent(r)
                                  }.bind(this),
                                )
                              }.bind(this)),
                            )
                        },
                      }),
                      'object' == typeof e &&
                        e.RTCTrackEvent &&
                        'receiver' in e.RTCTrackEvent.prototype &&
                        !('transceiver' in e.RTCTrackEvent.prototype) &&
                        Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                          get: function() {
                            return { receiver: this.receiver }
                          },
                        })
                  },
                  shimSourceObject: function(e) {
                    'object' == typeof e &&
                      (!e.HTMLMediaElement ||
                        'srcObject' in e.HTMLMediaElement.prototype ||
                        Object.defineProperty(e.HTMLMediaElement.prototype, 'srcObject', {
                          get: function() {
                            return this.mozSrcObject
                          },
                          set: function(e) {
                            this.mozSrcObject = e
                          },
                        }))
                  },
                  shimPeerConnection: function(e) {
                    var t = n.detectBrowser(e)
                    if ('object' == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
                      e.RTCPeerConnection ||
                        ((e.RTCPeerConnection = function(r, n) {
                          if (t.version < 38 && r && r.iceServers) {
                            for (var i = [], a = 0; a < r.iceServers.length; a++) {
                              var o = r.iceServers[a]
                              if (o.hasOwnProperty('urls'))
                                for (var s = 0; s < o.urls.length; s++) {
                                  var c = { url: o.urls[s] }
                                  0 === o.urls[s].indexOf('turn') &&
                                    ((c.username = o.username), (c.credential = o.credential)),
                                    i.push(c)
                                }
                              else i.push(r.iceServers[a])
                            }
                            r.iceServers = i
                          }
                          return new e.mozRTCPeerConnection(r, n)
                        }),
                        (e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype),
                        e.mozRTCPeerConnection.generateCertificate &&
                          Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                            get: function() {
                              return e.mozRTCPeerConnection.generateCertificate
                            },
                          }),
                        (e.RTCSessionDescription = e.mozRTCSessionDescription),
                        (e.RTCIceCandidate = e.mozRTCIceCandidate)),
                        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                          function(t) {
                            var r = e.RTCPeerConnection.prototype[t]
                            e.RTCPeerConnection.prototype[t] = function() {
                              return (
                                (arguments[0] = new ('addIceCandidate' === t
                                  ? e.RTCIceCandidate
                                  : e.RTCSessionDescription)(arguments[0])),
                                r.apply(this, arguments)
                              )
                            }
                          },
                        )
                      var r = e.RTCPeerConnection.prototype.addIceCandidate
                      e.RTCPeerConnection.prototype.addIceCandidate = function() {
                        return arguments[0]
                          ? r.apply(this, arguments)
                          : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                      }
                      var i = function(e) {
                          var t = new Map()
                          return (
                            Object.keys(e).forEach(function(r) {
                              t.set(r, e[r]), (t[r] = e[r])
                            }),
                            t
                          )
                        },
                        a = {
                          inboundrtp: 'inbound-rtp',
                          outboundrtp: 'outbound-rtp',
                          candidatepair: 'candidate-pair',
                          localcandidate: 'local-candidate',
                          remotecandidate: 'remote-candidate',
                        },
                        o = e.RTCPeerConnection.prototype.getStats
                      e.RTCPeerConnection.prototype.getStats = function(e, r, n) {
                        return o
                          .apply(this, [e || null])
                          .then(function(e) {
                            if ((t.version < 48 && (e = i(e)), t.version < 53 && !r))
                              try {
                                e.forEach(function(e) {
                                  e.type = a[e.type] || e.type
                                })
                              } catch (n) {
                                if ('TypeError' !== n.name) throw n
                                e.forEach(function(t, r) {
                                  e.set(r, Object.assign({}, t, { type: a[t.type] || t.type }))
                                })
                              }
                            return e
                          })
                          .then(r, n)
                      }
                    }
                  },
                }
              t.exports = {
                shimOnTrack: i.shimOnTrack,
                shimSourceObject: i.shimSourceObject,
                shimPeerConnection: i.shimPeerConnection,
                shimGetUserMedia: e('./getusermedia'),
              }
            },
            { '../utils': 13, './getusermedia': 11 },
          ],
          11: [
            function(e, t, r) {
              'use strict'
              var n = e('../utils'),
                i = n.log
              t.exports = function(e) {
                var t = n.detectBrowser(e),
                  r = e && e.navigator,
                  a = e && e.MediaStreamTrack,
                  o = function(e) {
                    return {
                      name:
                        {
                          InternalError: 'NotReadableError',
                          NotSupportedError: 'TypeError',
                          PermissionDeniedError: 'NotAllowedError',
                          SecurityError: 'NotAllowedError',
                        }[e.name] || e.name,
                      message:
                        {
                          'The operation is insecure.':
                            'The request is not allowed by the user agent or the platform in the current context.',
                        }[e.message] || e.message,
                      constraint: e.constraint,
                      toString: function() {
                        return this.name + (this.message && ': ') + this.message
                      },
                    }
                  },
                  s = function(e, n, a) {
                    var s = function(e) {
                      if ('object' != typeof e || e.require) return e
                      var t = []
                      return (
                        Object.keys(e).forEach(function(r) {
                          if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                            var n = (e[r] = 'object' == typeof e[r] ? e[r] : { ideal: e[r] })
                            if (
                              ((n.min === undefined &&
                                n.max === undefined &&
                                n.exact === undefined) ||
                                t.push(r),
                              n.exact !== undefined &&
                                ('number' == typeof n.exact
                                  ? (n.min = n.max = n.exact)
                                  : (e[r] = n.exact),
                                delete n.exact),
                              n.ideal !== undefined)
                            ) {
                              e.advanced = e.advanced || []
                              var i = {}
                              'number' == typeof n.ideal
                                ? (i[r] = { min: n.ideal, max: n.ideal })
                                : (i[r] = n.ideal),
                                e.advanced.push(i),
                                delete n.ideal,
                                Object.keys(n).length || delete e[r]
                            }
                          }
                        }),
                        t.length && (e.require = t),
                        e
                      )
                    }
                    return (
                      (e = JSON.parse(JSON.stringify(e))),
                      t.version < 38 &&
                        (i('spec: ' + JSON.stringify(e)),
                        e.audio && (e.audio = s(e.audio)),
                        e.video && (e.video = s(e.video)),
                        i('ff37: ' + JSON.stringify(e))),
                      r.mozGetUserMedia(e, n, function(e) {
                        a(o(e))
                      })
                    )
                  },
                  c = function(e) {
                    return new Promise(function(t, r) {
                      s(e, t, r)
                    })
                  }
                if (
                  (r.mediaDevices ||
                    (r.mediaDevices = {
                      getUserMedia: c,
                      addEventListener: function() {},
                      removeEventListener: function() {},
                    }),
                  (r.mediaDevices.enumerateDevices =
                    r.mediaDevices.enumerateDevices ||
                    function() {
                      return new Promise(function(e) {
                        e([
                          { kind: 'audioinput', deviceId: 'default', label: '', groupId: '' },
                          { kind: 'videoinput', deviceId: 'default', label: '', groupId: '' },
                        ])
                      })
                    }),
                  t.version < 41)
                ) {
                  var d = r.mediaDevices.enumerateDevices.bind(r.mediaDevices)
                  r.mediaDevices.enumerateDevices = function() {
                    return d().then(undefined, function(e) {
                      if ('NotFoundError' === e.name) return []
                      throw e
                    })
                  }
                }
                if (t.version < 49) {
                  var p = r.mediaDevices.getUserMedia.bind(r.mediaDevices)
                  r.mediaDevices.getUserMedia = function(e) {
                    return p(e).then(
                      function(t) {
                        if (
                          (e.audio && !t.getAudioTracks().length) ||
                          (e.video && !t.getVideoTracks().length)
                        )
                          throw (t.getTracks().forEach(function(e) {
                            e.stop()
                          }),
                          new DOMException('The object can not be found here.', 'NotFoundError'))
                        return t
                      },
                      function(e) {
                        return Promise.reject(o(e))
                      },
                    )
                  }
                }
                if (
                  !(t.version > 55 && 'autoGainControl' in r.mediaDevices.getSupportedConstraints())
                ) {
                  var l = function(e, t, r) {
                      t in e && !(r in e) && ((e[r] = e[t]), delete e[t])
                    },
                    u = r.mediaDevices.getUserMedia.bind(r.mediaDevices)
                  if (
                    ((r.mediaDevices.getUserMedia = function(e) {
                      return (
                        'object' == typeof e &&
                          'object' == typeof e.audio &&
                          ((e = JSON.parse(JSON.stringify(e))),
                          l(e.audio, 'autoGainControl', 'mozAutoGainControl'),
                          l(e.audio, 'noiseSuppression', 'mozNoiseSuppression')),
                        u(e)
                      )
                    }),
                    a && a.prototype.getSettings)
                  ) {
                    var f = a.prototype.getSettings
                    a.prototype.getSettings = function() {
                      var e = f.apply(this, arguments)
                      return (
                        l(e, 'mozAutoGainControl', 'autoGainControl'),
                        l(e, 'mozNoiseSuppression', 'noiseSuppression'),
                        e
                      )
                    }
                  }
                  if (a && a.prototype.applyConstraints) {
                    var m = a.prototype.applyConstraints
                    a.prototype.applyConstraints = function(e) {
                      return (
                        'audio' === this.kind &&
                          'object' == typeof e &&
                          ((e = JSON.parse(JSON.stringify(e))),
                          l(e, 'autoGainControl', 'mozAutoGainControl'),
                          l(e, 'noiseSuppression', 'mozNoiseSuppression')),
                        m.apply(this, [e])
                      )
                    }
                  }
                }
                r.getUserMedia = function(e, i, a) {
                  if (t.version < 44) return s(e, i, a)
                  n.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia'),
                    r.mediaDevices.getUserMedia(e).then(i, a)
                }
              }
            },
            { '../utils': 13 },
          ],
          12: [
            function(e, t, r) {
              'use strict'
              var n = e('../utils'),
                i = {
                  shimLocalStreamsAPI: function(e) {
                    if ('object' == typeof e && e.RTCPeerConnection) {
                      if (
                        ('getLocalStreams' in e.RTCPeerConnection.prototype ||
                          (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                            return (
                              this._localStreams || (this._localStreams = []), this._localStreams
                            )
                          }),
                        'getStreamById' in e.RTCPeerConnection.prototype ||
                          (e.RTCPeerConnection.prototype.getStreamById = function(e) {
                            var t = null
                            return (
                              this._localStreams &&
                                this._localStreams.forEach(function(r) {
                                  r.id === e && (t = r)
                                }),
                              this._remoteStreams &&
                                this._remoteStreams.forEach(function(r) {
                                  r.id === e && (t = r)
                                }),
                              t
                            )
                          }),
                        !('addStream' in e.RTCPeerConnection.prototype))
                      ) {
                        var t = e.RTCPeerConnection.prototype.addTrack
                        ;(e.RTCPeerConnection.prototype.addStream = function(e) {
                          this._localStreams || (this._localStreams = []),
                            -1 === this._localStreams.indexOf(e) && this._localStreams.push(e)
                          var r = this
                          e.getTracks().forEach(function(n) {
                            t.call(r, n, e)
                          })
                        }),
                          (e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                            r &&
                              (this._localStreams
                                ? -1 === this._localStreams.indexOf(r) && this._localStreams.push(r)
                                : (this._localStreams = [r])),
                              t.call(this, e, r)
                          })
                      }
                      'removeStream' in e.RTCPeerConnection.prototype ||
                        (e.RTCPeerConnection.prototype.removeStream = function(e) {
                          this._localStreams || (this._localStreams = [])
                          var t = this._localStreams.indexOf(e)
                          if (-1 !== t) {
                            this._localStreams.splice(t, 1)
                            var r = this,
                              n = e.getTracks()
                            this.getSenders().forEach(function(e) {
                              ;-1 !== n.indexOf(e.track) && r.removeTrack(e)
                            })
                          }
                        })
                    }
                  },
                  shimRemoteStreamsAPI: function(e) {
                    'object' == typeof e &&
                      e.RTCPeerConnection &&
                      ('getRemoteStreams' in e.RTCPeerConnection.prototype ||
                        (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                          return this._remoteStreams ? this._remoteStreams : []
                        }),
                      'onaddstream' in e.RTCPeerConnection.prototype ||
                        Object.defineProperty(e.RTCPeerConnection.prototype, 'onaddstream', {
                          get: function() {
                            return this._onaddstream
                          },
                          set: function(e) {
                            this._onaddstream &&
                              (this.removeEventListener('addstream', this._onaddstream),
                              this.removeEventListener('track', this._onaddstreampoly)),
                              this.addEventListener('addstream', (this._onaddstream = e)),
                              this.addEventListener(
                                'track',
                                (this._onaddstreampoly = function(e) {
                                  var t = e.streams[0]
                                  if (
                                    (this._remoteStreams || (this._remoteStreams = []),
                                    !(this._remoteStreams.indexOf(t) >= 0))
                                  ) {
                                    this._remoteStreams.push(t)
                                    var r = new Event('addstream')
                                    ;(r.stream = e.streams[0]), this.dispatchEvent(r)
                                  }
                                }.bind(this)),
                              )
                          },
                        }))
                  },
                  shimCallbacksAPI: function(e) {
                    if ('object' == typeof e && e.RTCPeerConnection) {
                      var t = e.RTCPeerConnection.prototype,
                        r = t.createOffer,
                        n = t.createAnswer,
                        i = t.setLocalDescription,
                        a = t.setRemoteDescription,
                        o = t.addIceCandidate
                      ;(t.createOffer = function(e, t) {
                        var n = arguments.length >= 2 ? arguments[2] : arguments[0],
                          i = r.apply(this, [n])
                        return t ? (i.then(e, t), Promise.resolve()) : i
                      }),
                        (t.createAnswer = function(e, t) {
                          var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                            i = n.apply(this, [r])
                          return t ? (i.then(e, t), Promise.resolve()) : i
                        })
                      var s = function(e, t, r) {
                        var n = i.apply(this, [e])
                        return r ? (n.then(t, r), Promise.resolve()) : n
                      }
                      ;(t.setLocalDescription = s),
                        (s = function(e, t, r) {
                          var n = a.apply(this, [e])
                          return r ? (n.then(t, r), Promise.resolve()) : n
                        }),
                        (t.setRemoteDescription = s),
                        (s = function(e, t, r) {
                          var n = o.apply(this, [e])
                          return r ? (n.then(t, r), Promise.resolve()) : n
                        }),
                        (t.addIceCandidate = s)
                    }
                  },
                  shimGetUserMedia: function(e) {
                    var t = e && e.navigator
                    t.getUserMedia ||
                      (t.webkitGetUserMedia
                        ? (t.getUserMedia = t.webkitGetUserMedia.bind(t))
                        : t.mediaDevices &&
                          t.mediaDevices.getUserMedia &&
                          (t.getUserMedia = function(e, r, n) {
                            t.mediaDevices.getUserMedia(e).then(r, n)
                          }.bind(t)))
                  },
                  shimRTCIceServerUrls: function(e) {
                    var t = e.RTCPeerConnection
                    ;(e.RTCPeerConnection = function(e, r) {
                      if (e && e.iceServers) {
                        for (var i = [], a = 0; a < e.iceServers.length; a++) {
                          var o = e.iceServers[a]
                          !o.hasOwnProperty('urls') && o.hasOwnProperty('url')
                            ? (n.deprecated('RTCIceServer.url', 'RTCIceServer.urls'),
                              (o = JSON.parse(JSON.stringify(o))),
                              (o.urls = o.url),
                              delete o.url,
                              i.push(o))
                            : i.push(e.iceServers[a])
                        }
                        e.iceServers = i
                      }
                      return new t(e, r)
                    }),
                      (e.RTCPeerConnection.prototype = t.prototype),
                      'generateCertificate' in e.RTCPeerConnection &&
                        Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                          get: function() {
                            return t.generateCertificate
                          },
                        })
                  },
                  shimTrackEventTransceiver: function(e) {
                    'object' == typeof e &&
                      e.RTCPeerConnection &&
                      'receiver' in e.RTCTrackEvent.prototype &&
                      !e.RTCTransceiver &&
                      Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                        get: function() {
                          return { receiver: this.receiver }
                        },
                      })
                  },
                }
              t.exports = {
                shimCallbacksAPI: i.shimCallbacksAPI,
                shimLocalStreamsAPI: i.shimLocalStreamsAPI,
                shimRemoteStreamsAPI: i.shimRemoteStreamsAPI,
                shimGetUserMedia: i.shimGetUserMedia,
                shimRTCIceServerUrls: i.shimRTCIceServerUrls,
                shimTrackEventTransceiver: i.shimTrackEventTransceiver,
              }
            },
            { '../utils': 13 },
          ],
          13: [
            function(e, t, r) {
              'use strict'
              var n = !0,
                i = !0,
                a = {
                  disableLog: function(e) {
                    return 'boolean' != typeof e
                      ? new Error('Argument type: ' + typeof e + '. Please use a boolean.')
                      : ((n = e), e ? 'adapter.js logging disabled' : 'adapter.js logging enabled')
                  },
                  disableWarnings: function(e) {
                    return 'boolean' != typeof e
                      ? new Error('Argument type: ' + typeof e + '. Please use a boolean.')
                      : ((i = !e),
                        'adapter.js deprecation warnings ' + (e ? 'disabled' : 'enabled'))
                  },
                  log: function() {
                    if ('object' == typeof window) {
                      if (n) return
                      'undefined' != typeof console &&
                        'function' == typeof console.log &&
                        console.log.apply(console, arguments)
                    }
                  },
                  deprecated: function(e, t) {
                    i && console.warn(e + ' is deprecated, please use ' + t + ' instead.')
                  },
                  extractVersion: function(e, t, r) {
                    var n = e.match(t)
                    return n && n.length >= r && parseInt(n[r], 10)
                  },
                  detectBrowser: function(e) {
                    var t = e && e.navigator,
                      r = {}
                    if (((r.browser = null), (r.version = null), void 0 === e || !e.navigator))
                      return (r.browser = 'Not a browser.'), r
                    if (t.mozGetUserMedia)
                      (r.browser = 'firefox'),
                        (r.version = this.extractVersion(t.userAgent, /Firefox\/(\d+)\./, 1))
                    else if (t.webkitGetUserMedia)
                      if (e.webkitRTCPeerConnection)
                        (r.browser = 'chrome'),
                          (r.version = this.extractVersion(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2))
                      else {
                        if (!t.userAgent.match(/Version\/(\d+).(\d+)/))
                          return (
                            (r.browser =
                              'Unsupported webkit-based browser with GUM support but no WebRTC support.'),
                            r
                          )
                        ;(r.browser = 'safari'),
                          (r.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1))
                      }
                    else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/))
                      (r.browser = 'edge'),
                        (r.version = this.extractVersion(t.userAgent, /Edge\/(\d+).(\d+)$/, 2))
                    else {
                      if (!t.mediaDevices || !t.userAgent.match(/AppleWebKit\/(\d+)\./))
                        return (r.browser = 'Not a supported browser.'), r
                      ;(r.browser = 'safari'),
                        (r.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1))
                    }
                    return r
                  },
                }
              t.exports = {
                log: a.log,
                deprecated: a.deprecated,
                disableLog: a.disableLog,
                disableWarnings: a.disableWarnings,
                extractVersion: a.extractVersion,
                shimCreateObjectURL: a.shimCreateObjectURL,
                detectBrowser: a.detectBrowser.bind(a),
              }
            },
            {},
          ],
        },
        {},
        [3],
      )(3)
    })
else {
  webphone_api.Log('EVENT, AdapterJS loaded for plugin')
  var isdebugversion = !1,
    plugininstalltext =
      'This website requires you to install the WebRTC Plugin to work on this browser.',
    macdownloadurl = GetPluginLocation(),
    windownloadurl = '',
    AdapterJS = AdapterJS || {}
  'undefined' != typeof exports && (module.exports = AdapterJS),
    (AdapterJS.options = AdapterJS.options || {}),
    (AdapterJS.VERSION = '0.13.4'),
    (AdapterJS.onwebrtcready = AdapterJS.onwebrtcready || function(e) {}),
    (AdapterJS._onwebrtcreadies = []),
    (AdapterJS.webRTCReady = function(e) {
      if ('function' != typeof e) throw new Error('Callback provided is not a function')
      !0 === AdapterJS.onwebrtcreadyDone
        ? e(null !== AdapterJS.WebRTCPlugin.plugin)
        : AdapterJS._onwebrtcreadies.push(e)
    }),
    (AdapterJS.WebRTCPlugin = AdapterJS.WebRTCPlugin || {}),
    (AdapterJS.WebRTCPlugin.pluginInfo = AdapterJS.WebRTCPlugin.pluginInfo || {
      prefix: 'Tem',
      plugName: 'TemWebRTCPlugin',
      pluginId: 'plugin0',
      type: 'application/x-temwebrtcplugin',
      onload: '__TemWebRTCReady0',
      portalLink: 'http://skylink.io/plugin/',
      downloadLink: null,
      companyName: 'Temasys',
      downloadLinks: { mac: macdownloadurl, win: windownloadurl },
    }),
    'undefined' != typeof AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks &&
      null !== AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks &&
      (navigator.platform.match(/^Mac/i)
        ? (AdapterJS.WebRTCPlugin.pluginInfo.downloadLink =
            AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks.mac)
        : navigator.platform.match(/^Win/i) &&
          (AdapterJS.WebRTCPlugin.pluginInfo.downloadLink =
            AdapterJS.WebRTCPlugin.pluginInfo.downloadLinks.win)),
    (AdapterJS.WebRTCPlugin.TAGS = { NONE: 'none', AUDIO: 'audio', VIDEO: 'video' }),
    (AdapterJS.WebRTCPlugin.pageId = Math.random()
      .toString(36)
      .slice(2)),
    (AdapterJS.WebRTCPlugin.plugin = null),
    (AdapterJS.WebRTCPlugin.setLogLevel = null),
    (AdapterJS.WebRTCPlugin.defineWebRTCInterface = null),
    (AdapterJS.WebRTCPlugin.isPluginInstalled = null),
    (AdapterJS.WebRTCPlugin.pluginInjectionInterval = null),
    (AdapterJS.WebRTCPlugin.injectPlugin = null),
    (AdapterJS.WebRTCPlugin.PLUGIN_STATES = {
      NONE: 0,
      INITIALIZING: 1,
      INJECTING: 2,
      INJECTED: 3,
      READY: 4,
    }),
    (AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.NONE),
    (AdapterJS.onwebrtcreadyDone = !1),
    (AdapterJS.WebRTCPlugin.PLUGIN_LOG_LEVELS = {
      NONE: 'NONE',
      ERROR: 'ERROR',
      WARNING: 'WARNING',
      INFO: 'INFO',
      VERBOSE: 'VERBOSE',
      SENSITIVE: 'SENSITIVE',
    }),
    (AdapterJS.WebRTCPlugin.WaitForPluginReady = null),
    (AdapterJS.WebRTCPlugin.callWhenPluginReady = null),
    (__TemWebRTCReady0 = function() {
      if ('complete' === document.readyState)
        (AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY),
          AdapterJS.maybeThroughWebRTCReady()
      else
        var e = setInterval(function() {
          'complete' === document.readyState &&
            (clearInterval(e),
            (AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY),
            AdapterJS.maybeThroughWebRTCReady())
        }, 100)
    }),
    (AdapterJS.maybeThroughWebRTCReady = function() {
      AdapterJS.onwebrtcreadyDone ||
        ((AdapterJS.onwebrtcreadyDone = !0),
        AdapterJS._onwebrtcreadies.length
          ? AdapterJS._onwebrtcreadies.forEach(function(e) {
              'function' == typeof e && e(null !== AdapterJS.WebRTCPlugin.plugin)
            })
          : 'function' == typeof AdapterJS.onwebrtcready &&
            AdapterJS.onwebrtcready(null !== AdapterJS.WebRTCPlugin.plugin))
    }),
    (AdapterJS.TEXT = {
      PLUGIN: {
        REQUIRE_INSTALLATION:
          'This website requires you to install a WebRTC-enabling plugin to work on this browser.',
        NOT_SUPPORTED: 'Your browser does not support WebRTC.',
        BUTTON: 'Install Now',
      },
      REFRESH: { REQUIRE_REFRESH: 'Please refresh page', BUTTON: 'Refresh Page' },
    }),
    (AdapterJS._iceConnectionStates = {
      starting: 'starting',
      checking: 'checking',
      connected: 'connected',
      completed: 'connected',
      done: 'completed',
      disconnected: 'disconnected',
      failed: 'failed',
      closed: 'closed',
    }),
    (AdapterJS._iceConnectionFiredStates = []),
    (AdapterJS.isDefined = null),
    (AdapterJS.parseWebrtcDetectedBrowser = function() {
      var e = null
      ;(window.opr && opr.addons) || window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
        ? ((webrtcDetectedBrowser = 'opera'),
          (webrtcDetectedType = 'webkit'),
          (webrtcMinimumVersion = 26),
          (e = /OPR\/(\d+)/i.exec(navigator.userAgent) || []),
          (webrtcDetectedVersion = parseInt(e[1], 10)))
        : 'undefined' != typeof InstallTrigger
        ? (webrtcDetectedType = 'moz')
        : Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
        ? ((webrtcDetectedBrowser = 'safari'),
          (webrtcDetectedType = 'plugin'),
          (webrtcMinimumVersion = 7),
          (e = /version\/(\d+)/i.exec(navigator.userAgent) || []),
          (webrtcDetectedVersion = parseInt(e[1], 10)))
        : document.documentMode
        ? ((webrtcDetectedBrowser = 'IE'),
          (webrtcDetectedType = 'plugin'),
          (webrtcMinimumVersion = 9),
          (e = /\brv[ :]+(\d+)/g.exec(navigator.userAgent) || []),
          (webrtcDetectedVersion = parseInt(e[1] || '0', 10)) ||
            ((e = /\bMSIE[ :]+(\d+)/g.exec(navigator.userAgent) || []),
            (webrtcDetectedVersion = parseInt(e[1] || '0', 10))))
        : window.StyleMedia
        ? (webrtcDetectedType = '')
        : window.chrome && window.chrome.webstore
        ? (webrtcDetectedType = 'webkit')
        : ('chrome' !== webrtcDetectedBrowser && 'opera' !== webrtcDetectedBrowser) ||
          !window.CSS ||
          (webrtcDetectedBrowser = 'blink'),
        0 === (navigator.userAgent.match(/android/gi) || []).length &&
          0 === (navigator.userAgent.match(/chrome/gi) || []).length &&
          navigator.userAgent.indexOf('Safari/') > 0 &&
          ((webrtcDetectedBrowser = 'safari'),
          (webrtcDetectedVersion = parseInt(
            (navigator.userAgent.match(/Version\/(.*)\ /) || ['', '0'])[1],
            10,
          )),
          (webrtcMinimumVersion = 7),
          (webrtcDetectedType = 'plugin')),
        (window.webrtcDetectedBrowser = webrtcDetectedBrowser),
        (window.webrtcDetectedVersion = webrtcDetectedVersion),
        (window.webrtcMinimumVersion = webrtcMinimumVersion)
    }),
    (AdapterJS.addEvent = function(e, t, r) {
      e.addEventListener
        ? e.addEventListener(t, r, !1)
        : e.attachEvent
        ? e.attachEvent('on' + t, r)
        : (e[t] = r)
    }),
    (AdapterJS.renderNotificationBar = function(e, t, r, n, i) {
      if ('complete' === document.readyState) {
        var a = window,
          o = document.createElement('iframe')
        ;(o.name = 'adapterjs-alert'),
          (o.style.position = 'fixed'),
          (o.style.top = '-41px'),
          (o.style.left = 0),
          (o.style.right = 0),
          (o.style.width = '100%'),
          (o.style.height = '80px'),
          (o.style.backgroundColor = '#fcd163'),
          (o.style.border = 'none'),
          (o.style.borderBottom = '1px solid #888888'),
          (o.style.zIndex = '9999999'),
          'string' == typeof o.style.webkitTransition
            ? (o.style.webkitTransition = 'all .5s ease-out')
            : 'string' == typeof o.style.transition && (o.style.transition = 'all .5s ease-out'),
          document.body.appendChild(o)
        var s = o.contentWindow
          ? o.contentWindow
          : o.contentDocument.document
          ? o.contentDocument.document
          : o.contentDocument
        s.document.open(),
          s.document.write(
            '<span style="display: inline-block; font-family: Helvetica, Arial,sans-serif; font-size: .9rem; padding: 4px; vertical-align: middle; cursor: default;">' +
              e +
              '</span>',
          ),
          t && r
            ? (s.document.write(
                '<button id="okay">' + t + '</button><button id="cancel">Cancel</button>',
              ),
              s.document.close(),
              AdapterJS.addEvent(s.document.getElementById('okay'), 'click', function(e) {
                i &&
                  AdapterJS.renderNotificationBar(
                    AdapterJS.TEXT.EXTENSION
                      ? AdapterJS.TEXT.EXTENSION.REQUIRE_REFRESH
                      : AdapterJS.TEXT.REFRESH.REQUIRE_REFRESH,
                    AdapterJS.TEXT.REFRESH.BUTTON,
                    'javascript:location.reload()',
                  ),
                  window.open(r, n ? '_blank' : '_top'),
                  e.preventDefault()
                try {
                  e.cancelBubble = !0
                } catch (a) {}
                var t = setInterval(function() {
                  isIE || navigator.plugins.refresh(!1),
                    AdapterJS.WebRTCPlugin.isPluginInstalled(
                      AdapterJS.WebRTCPlugin.pluginInfo.prefix,
                      AdapterJS.WebRTCPlugin.pluginInfo.plugName,
                      AdapterJS.WebRTCPlugin.pluginInfo.type,
                      function() {
                        clearInterval(t), AdapterJS.WebRTCPlugin.defineWebRTCInterface()
                      },
                      function() {},
                    )
                }, 500)
              }),
              AdapterJS.addEvent(s.document.getElementById('cancel'), 'click', function(e) {
                a.document.body.removeChild(o)
              }))
            : s.document.close(),
          setTimeout(function() {
            'string' == typeof o.style.webkitTransform
              ? (o.style.webkitTransform = 'translateY(40px)')
              : 'string' == typeof o.style.transform
              ? (o.style.transform = 'translateY(40px)')
              : (o.style.top = '0px')
          }, 300)
      }
    }),
    (webrtcDetectedType = null),
    (checkMediaDataChannelSettings = function(e, t, r, n) {
      if ('function' == typeof r) {
        var i = !0,
          a = 'firefox' === webrtcDetectedBrowser,
          o = 'moz' === webrtcDetectedType && webrtcDetectedVersion > 30,
          s = 'firefox' === e
        if ((a && s) || o)
          try {
            delete n.mandatory.MozDontOfferDataChannel
          } catch (d) {
            console.error('Failed deleting MozDontOfferDataChannel'), console.error(d)
          }
        else a && !s && (n.mandatory.MozDontOfferDataChannel = !0)
        if (!a)
          for (var c in n.mandatory)
            n.mandatory.hasOwnProperty(c) && -1 !== c.indexOf('Moz') && delete n.mandatory[c]
        !a || s || o || (i = !1), r(i, n)
      }
    }),
    (checkIceConnectionState = function(e, t, r) {
      if ('function' != typeof r)
        return void console.warn('No callback specified in checkIceConnectionState. Aborted.')
      ;(e = e || 'peer'),
        (AdapterJS._iceConnectionFiredStates[e] &&
          t !== AdapterJS._iceConnectionStates.disconnected &&
          t !== AdapterJS._iceConnectionStates.failed &&
          t !== AdapterJS._iceConnectionStates.closed) ||
          (AdapterJS._iceConnectionFiredStates[e] = []),
        (t = AdapterJS._iceConnectionStates[t]),
        AdapterJS._iceConnectionFiredStates[e].indexOf(t) < 0 &&
          (AdapterJS._iceConnectionFiredStates[e].push(t),
          t === AdapterJS._iceConnectionStates.connected &&
            setTimeout(function() {
              AdapterJS._iceConnectionFiredStates[e].push(AdapterJS._iceConnectionStates.done),
                r(AdapterJS._iceConnectionStates.done)
            }, 1e3),
          r(t))
    }),
    (createIceServer = null),
    (createIceServers = null),
    (RTCPeerConnection = null),
    (RTCSessionDescription =
      'function' == typeof RTCSessionDescription ? RTCSessionDescription : null),
    (RTCIceCandidate = 'function' == typeof RTCIceCandidate ? RTCIceCandidate : null),
    (getUserMedia = null),
    (attachMediaStream = null),
    (reattachMediaStream = null),
    (webrtcDetectedBrowser = null),
    (webrtcDetectedVersion = null),
    (webrtcMinimumVersion = null)
  var enterif = !0
  if (
    (!0 === isdebugversion && (enterif = !1),
    !0 !== enterif ||
      !(
        navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia ||
        (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/))
      ) ||
      (0 === (navigator.userAgent.match(/android/gi) || []).length &&
        0 === (navigator.userAgent.match(/chrome/gi) || []).length &&
        navigator.userAgent.indexOf('Safari/') > 0))
  )
    ('object' == typeof console && 'function' == typeof console.log) ||
      ((console = {} || console),
      (console.log = function(e) {}),
      (console.info = function(e) {}),
      (console.error = function(e) {}),
      (console.dir = function(e) {}),
      (console.exception = function(e) {}),
      (console.trace = function(e) {}),
      (console.warn = function(e) {}),
      (console.count = function(e) {}),
      (console.debug = function(e) {}),
      (console.count = function(e) {}),
      (console.time = function(e) {}),
      (console.timeEnd = function(e) {}),
      (console.group = function(e) {}),
      (console.groupCollapsed = function(e) {}),
      (console.groupEnd = function(e) {})),
      AdapterJS.parseWebrtcDetectedBrowser(),
      (isIE = 'IE' === webrtcDetectedBrowser),
      (AdapterJS.WebRTCPlugin.WaitForPluginReady = function() {
        for (; AdapterJS.WebRTCPlugin.pluginState !== AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY; );
      }),
      (AdapterJS.WebRTCPlugin.callWhenPluginReady = function(e) {
        if (AdapterJS.WebRTCPlugin.pluginState === AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY) e()
        else
          var t = setInterval(function() {
            AdapterJS.WebRTCPlugin.pluginState === AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY &&
              (clearInterval(t), e())
          }, 100)
      }),
      (AdapterJS.WebRTCPlugin.setLogLevel = function(e) {
        AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
          AdapterJS.WebRTCPlugin.plugin.setLogLevel(e)
        })
      }),
      (AdapterJS.WebRTCPlugin.injectPlugin = function() {
        if (
          'complete' === document.readyState &&
          AdapterJS.WebRTCPlugin.pluginState === AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING
        ) {
          if (
            ((AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTING),
            'IE' === webrtcDetectedBrowser && webrtcDetectedVersion <= 10)
          ) {
            var e = document.createDocumentFragment()
            for (
              AdapterJS.WebRTCPlugin.plugin = document.createElement('div'),
                AdapterJS.WebRTCPlugin.plugin.innerHTML =
                  '<object id="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.pluginId +
                  '" type="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.type +
                  '" width="1" height="1"><param name="pluginId" value="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.pluginId +
                  '" /> <param name="windowless" value="false" /> <param name="pageId" value="' +
                  AdapterJS.WebRTCPlugin.pageId +
                  '" /> <param name="onload" value="' +
                  AdapterJS.WebRTCPlugin.pluginInfo.onload +
                  '" /><param name="tag" value="' +
                  AdapterJS.WebRTCPlugin.TAGS.NONE +
                  '" />' +
                  (AdapterJS.options.getAllCams
                    ? '<param name="forceGetAllCams" value="True" />'
                    : '') +
                  '</object>';
              AdapterJS.WebRTCPlugin.plugin.firstChild;

            )
              e.appendChild(AdapterJS.WebRTCPlugin.plugin.firstChild)
            document.body.appendChild(e),
              (AdapterJS.WebRTCPlugin.plugin = document.getElementById(
                AdapterJS.WebRTCPlugin.pluginInfo.pluginId,
              ))
          } else
            (AdapterJS.WebRTCPlugin.plugin = document.createElement('object')),
              (AdapterJS.WebRTCPlugin.plugin.id = AdapterJS.WebRTCPlugin.pluginInfo.pluginId),
              isIE
                ? ((AdapterJS.WebRTCPlugin.plugin.width = '1px'),
                  (AdapterJS.WebRTCPlugin.plugin.height = '1px'))
                : ((AdapterJS.WebRTCPlugin.plugin.width = '0px'),
                  (AdapterJS.WebRTCPlugin.plugin.height = '0px')),
              (AdapterJS.WebRTCPlugin.plugin.type = AdapterJS.WebRTCPlugin.pluginInfo.type),
              (AdapterJS.WebRTCPlugin.plugin.innerHTML =
                '<param name="onload" value="' +
                AdapterJS.WebRTCPlugin.pluginInfo.onload +
                '"><param name="pluginId" value="' +
                AdapterJS.WebRTCPlugin.pluginInfo.pluginId +
                '"><param name="windowless" value="false" /> ' +
                (AdapterJS.options.getAllCams
                  ? '<param name="forceGetAllCams" value="True" />'
                  : '') +
                '<param name="pageId" value="' +
                AdapterJS.WebRTCPlugin.pageId +
                '"><param name="tag" value="' +
                AdapterJS.WebRTCPlugin.TAGS.NONE +
                '" />'),
              document.body.appendChild(AdapterJS.WebRTCPlugin.plugin)
          AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTED
        }
      }),
      (AdapterJS.WebRTCPlugin.isPluginInstalled = function(e, t, r, n, i) {
        if (isIE) {
          try {
            new ActiveXObject(e + '.' + t)
          } catch (s) {
            return void i()
          }
          n()
        } else {
          for (var a = navigator.mimeTypes, o = 0; o < a.length; o++)
            if (a[o].type.indexOf(r) >= 0) return void n()
          i()
        }
      }),
      (AdapterJS.WebRTCPlugin.defineWebRTCInterface = function() {
        if (AdapterJS.WebRTCPlugin.pluginState === AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY)
          return void console.error('AdapterJS - WebRTC interface has already been defined')
        ;(AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING),
          (AdapterJS.isDefined = function(e) {
            return null !== e && e !== undefined
          }),
          (createIceServer = function(e, t, r) {
            var n = null,
              i = e.split(':')
            return (
              0 === i[0].indexOf('stun')
                ? (n = { url: e, hasCredentials: !1 })
                : 0 === i[0].indexOf('turn') &&
                  (n = { url: e, hasCredentials: !0, credential: r, username: t }),
              n
            )
          }),
          (createIceServers = function(e, t, r) {
            for (var n = [], i = 0; i < e.length; ++i) n.push(createIceServer(e[i], t, r))
            return n
          }),
          (RTCSessionDescription = function(e) {
            return (
              AdapterJS.WebRTCPlugin.WaitForPluginReady(),
              AdapterJS.WebRTCPlugin.plugin.ConstructSessionDescription(e.type, e.sdp)
            )
          }),
          (RTCPeerConnection = function(e, t) {
            if (e !== undefined && null !== e && !Array.isArray(e.iceServers))
              throw new Error("Failed to construct 'RTCPeerConnection': Malformed RTCConfiguration")
            if (void 0 !== t && null !== t) {
              var r = !1
              if (
                ((r |= 'object' != typeof t),
                (r |=
                  t.hasOwnProperty('mandatory') &&
                  t.mandatory !== undefined &&
                  null !== t.mandatory &&
                  t.mandatory.constructor !== Object),
                (r |=
                  t.hasOwnProperty('optional') &&
                  t.optional !== undefined &&
                  null !== t.optional &&
                  !Array.isArray(t.optional)))
              )
                throw new Error(
                  "Failed to construct 'RTCPeerConnection': Malformed constraints object",
                )
            }
            AdapterJS.WebRTCPlugin.WaitForPluginReady()
            var n = null
            if (e && Array.isArray(e.iceServers)) {
              n = e.iceServers
              for (var i = 0; i < n.length; i++)
                n[i].urls && !n[i].url && (n[i].url = n[i].urls),
                  (n[i].hasCredentials =
                    AdapterJS.isDefined(n[i].username) && AdapterJS.isDefined(n[i].credential))
            }
            if (
              AdapterJS.WebRTCPlugin.plugin.PEER_CONNECTION_VERSION &&
              AdapterJS.WebRTCPlugin.plugin.PEER_CONNECTION_VERSION > 1
            )
              return n && (e.iceServers = n), AdapterJS.WebRTCPlugin.plugin.PeerConnection(e)
            var a = t && t.mandatory ? t.mandatory : null,
              o = t && t.optional ? t.optional : null
            return AdapterJS.WebRTCPlugin.plugin.PeerConnection(
              AdapterJS.WebRTCPlugin.pageId,
              n,
              a,
              o,
            )
          }),
          (MediaStreamTrack = function() {}),
          (MediaStreamTrack.getSources = function(e) {
            AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
              AdapterJS.WebRTCPlugin.plugin.GetSources(e)
            })
          })
        var e = function(e) {
          if ('object' != typeof e || e.mandatory || e.optional) return e
          var t = {}
          return (
            Object.keys(e).forEach(function(r) {
              if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                var n = 'object' == typeof e[r] ? e[r] : { ideal: e[r] }
                n.exact !== undefined && 'number' == typeof n.exact && (n.min = n.max = n.exact)
                var i = function(e, t) {
                  return e
                    ? e + t.charAt(0).toUpperCase() + t.slice(1)
                    : 'deviceId' === t
                    ? 'sourceId'
                    : t
                }
                if (n.ideal !== undefined) {
                  t.optional = t.optional || []
                  var a = {}
                  'number' == typeof n.ideal
                    ? ((a[i('min', r)] = n.ideal),
                      t.optional.push(a),
                      (a = {}),
                      (a[i('max', r)] = n.ideal),
                      t.optional.push(a))
                    : ((a[i('', r)] = n.ideal), t.optional.push(a))
                }
                n.exact !== undefined && 'number' != typeof n.exact
                  ? ((t.mandatory = t.mandatory || {}), (t.mandatory[i('', r)] = n.exact))
                  : ['min', 'max'].forEach(function(e) {
                      n[e] !== undefined &&
                        ((t.mandatory = t.mandatory || {}), (t.mandatory[i(e, r)] = n[e]))
                    })
              }
            }),
            e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
            t
          )
        }
        ;(getUserMedia = function(t, r, n) {
          var i = {}
          ;(i.audio = !!t.audio && e(t.audio)),
            (i.video = !!t.video && e(t.video)),
            AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
              AdapterJS.WebRTCPlugin.plugin.getUserMedia(i, r, n)
            })
        }),
          (window.navigator.getUserMedia = getUserMedia),
          navigator.mediaDevices ||
            'undefined' == typeof Promise ||
            ((requestUserMedia = function(e) {
              return new Promise(function(t, r) {
                getUserMedia(e, t, r)
              })
            }),
            (navigator.mediaDevices = {
              getUserMedia: requestUserMedia,
              enumerateDevices: function() {
                return new Promise(function(e) {
                  var t = { audio: 'audioinput', video: 'videoinput' }
                  return MediaStreamTrack.getSources(function(r) {
                    e(
                      r.map(function(e) {
                        return {
                          label: e.label,
                          kind: t[e.kind],
                          id: e.id,
                          deviceId: e.id,
                          groupId: '',
                        }
                      }),
                    )
                  })
                })
              },
            })),
          (attachMediaStream = function(e, t) {
            if (e && e.parentNode) {
              var r
              null === t
                ? (r = '')
                : ('undefined' != typeof t.enableSoundTracks && t.enableSoundTracks(!0), (r = t.id))
              var n =
                  0 === e.id.length
                    ? Math.random()
                        .toString(36)
                        .slice(2)
                    : e.id,
                i = e.nodeName.toLowerCase()
              if ('object' !== i) {
                var a
                switch (i) {
                  case 'audio':
                    a = AdapterJS.WebRTCPlugin.TAGS.AUDIO
                    break
                  case 'video':
                    a = AdapterJS.WebRTCPlugin.TAGS.VIDEO
                    break
                  default:
                    a = AdapterJS.WebRTCPlugin.TAGS.NONE
                }
                var o = document.createDocumentFragment(),
                  s = document.createElement('div'),
                  c = ''
                for (
                  e.className
                    ? (c = 'class="' + e.className + '" ')
                    : e.attributes &&
                      e.attributes['class'] &&
                      (c = 'class="' + e.attributes['class'].value + '" '),
                    s.innerHTML =
                      '<object id="' +
                      n +
                      '" ' +
                      c +
                      'type="' +
                      AdapterJS.WebRTCPlugin.pluginInfo.type +
                      '"><param name="pluginId" value="' +
                      n +
                      '" /> <param name="pageId" value="' +
                      AdapterJS.WebRTCPlugin.pageId +
                      '" /> <param name="windowless" value="true" /> <param name="streamId" value="' +
                      r +
                      '" /> <param name="tag" value="' +
                      a +
                      '" /> </object>';
                  s.firstChild;

                )
                  o.appendChild(s.firstChild)
                var d = '',
                  p = ''
                e.clientWidth || e.clientHeight
                  ? ((p = e.clientWidth), (d = e.clientHeight))
                  : (e.width || e.height) && ((p = e.width), (d = e.height)),
                  e.parentNode.insertBefore(o, e),
                  (o = document.getElementById(n)),
                  (o.width = p),
                  (o.height = d),
                  e.parentNode.removeChild(e)
              } else {
                for (var l = e.children, u = 0; u !== l.length; ++u)
                  if ('streamId' === l[u].name) {
                    l[u].value = r
                    break
                  }
                e.setStreamId(r)
              }
              var f = document.getElementById(n)
              return AdapterJS.forwardEventHandlers(f, e, Object.getPrototypeOf(e)), f
            }
          }),
          (reattachMediaStream = function(e, t) {
            for (var r = null, n = t.children, i = 0; i !== n.length; ++i)
              if ('streamId' === n[i].name) {
                AdapterJS.WebRTCPlugin.WaitForPluginReady(),
                  (r = AdapterJS.WebRTCPlugin.plugin.getStreamWithId(
                    AdapterJS.WebRTCPlugin.pageId,
                    n[i].value,
                  ))
                break
              }
            if (null !== r) return attachMediaStream(e, r)
            console.log('Could not find the stream associated with this element')
          }),
          (window.attachMediaStream = attachMediaStream),
          (window.reattachMediaStream = reattachMediaStream),
          (window.getUserMedia = getUserMedia),
          (AdapterJS.attachMediaStream = attachMediaStream),
          (AdapterJS.reattachMediaStream = reattachMediaStream),
          (AdapterJS.getUserMedia = getUserMedia),
          (AdapterJS.forwardEventHandlers = function(e, t, r) {
            properties = Object.getOwnPropertyNames(r)
            for (var n in properties)
              n &&
                ((propName = properties[n]),
                'function' == typeof propName.slice &&
                  'on' === propName.slice(0, 2) &&
                  'function' == typeof t[propName] &&
                  AdapterJS.addEvent(e, propName.slice(2), t[propName]))
            var i = Object.getPrototypeOf(r)
            i && AdapterJS.forwardEventHandlers(e, t, i)
          }),
          (RTCIceCandidate = function(e) {
            return (
              e.sdpMid || (e.sdpMid = ''),
              AdapterJS.WebRTCPlugin.WaitForPluginReady(),
              AdapterJS.WebRTCPlugin.plugin.ConstructIceCandidate(
                e.sdpMid,
                e.sdpMLineIndex,
                e.candidate,
              )
            )
          }),
          AdapterJS.addEvent(document, 'readystatechange', AdapterJS.WebRTCPlugin.injectPlugin),
          AdapterJS.WebRTCPlugin.injectPlugin()
      }),
      (AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb =
        AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb ||
        function() {
          AdapterJS.addEvent(
            document,
            'readystatechange',
            AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv,
          ),
            AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv()
        }),
      (AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv = function() {
        if (!AdapterJS.options.hidePluginInstallPrompt) {
          var e = AdapterJS.WebRTCPlugin.pluginInfo.downloadLink
          if (e) {
            var t = plugininstalltext
            AdapterJS.renderNotificationBar(t, AdapterJS.TEXT.PLUGIN.BUTTON, e)
          } else AdapterJS.renderNotificationBar(AdapterJS.TEXT.PLUGIN.NOT_SUPPORTED)
        }
      }),
      AdapterJS.WebRTCPlugin.isPluginInstalled(
        AdapterJS.WebRTCPlugin.pluginInfo.prefix,
        AdapterJS.WebRTCPlugin.pluginInfo.plugName,
        AdapterJS.WebRTCPlugin.pluginInfo.type,
        AdapterJS.WebRTCPlugin.defineWebRTCInterface,
        AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb,
      ),
      AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv()
  else {
    var getUserMedia = null,
      attachMediaStream = null,
      reattachMediaStream = null,
      webrtcDetectedBrowser = null,
      webrtcDetectedVersion = null,
      webrtcMinimumVersion = null,
      webrtcUtils = {
        log: function(e) {
          'undefined' != typeof module ||
            ('function' == typeof require && 'function' == typeof define) ||
            console.log(e)
        },
        extractVersion: function(e, t, r) {
          var n = e.match(t)
          return n && n.length >= r && parseInt(n[r], 10)
        },
      }
    if (
      ('object' == typeof window &&
        (!window.HTMLMediaElement ||
          'srcObject' in window.HTMLMediaElement.prototype ||
          Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
            get: function() {
              return 'mozSrcObject' in this ? this.mozSrcObject : this._srcObject
            },
            set: function(e) {
              'mozSrcObject' in this
                ? (this.mozSrcObject = e)
                : ((this._srcObject = e), (this.src = URL.createObjectURL(e)))
            },
          }),
        (getUserMedia = window.navigator && window.navigator.getUserMedia)),
      (attachMediaStream = function(e, t) {
        e.srcObject = t
      }),
      (reattachMediaStream = function(e, t) {
        e.srcObject = t.srcObject
      }),
      'undefined' != typeof window && window.navigator)
    )
      if (navigator.mozGetUserMedia) {
        if (
          (webrtcUtils.log('This appears to be Firefox'),
          (webrtcDetectedBrowser = 'firefox'),
          (webrtcDetectedVersion = webrtcUtils.extractVersion(
            navigator.userAgent,
            /Firefox\/([0-9]+)\./,
            1,
          )),
          (webrtcMinimumVersion = 31),
          window.RTCPeerConnection ||
            ((window.RTCPeerConnection = function(e, t) {
              if (webrtcDetectedVersion < 38 && e && e.iceServers) {
                for (var r = [], n = 0; n < e.iceServers.length; n++) {
                  var i = e.iceServers[n]
                  if (i.hasOwnProperty('urls'))
                    for (var a = 0; a < i.urls.length; a++) {
                      var o = { url: i.urls[a] }
                      0 === i.urls[a].indexOf('turn') &&
                        ((o.username = i.username), (o.credential = i.credential)),
                        r.push(o)
                    }
                  else r.push(e.iceServers[n])
                }
                e.iceServers = r
              }
              return new mozRTCPeerConnection(e, t)
            }),
            mozRTCPeerConnection.generateCertificate &&
              Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                get: function() {
                  return arguments.length
                    ? mozRTCPeerConnection.generateCertificate.apply(null, arguments)
                    : mozRTCPeerConnection.generateCertificate
                },
              }),
            (window.RTCSessionDescription = mozRTCSessionDescription),
            (window.RTCIceCandidate = mozRTCIceCandidate)),
          (getUserMedia = function(e, t, r) {
            var n = function(e) {
              if ('object' != typeof e || e.require) return e
              var t = []
              return (
                Object.keys(e).forEach(function(r) {
                  if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                    var n = (e[r] = 'object' == typeof e[r] ? e[r] : { ideal: e[r] })
                    if (
                      ((n.min === undefined && n.max === undefined && n.exact === undefined) ||
                        t.push(r),
                      n.exact !== undefined &&
                        ('number' == typeof n.exact ? (n.min = n.max = n.exact) : (e[r] = n.exact),
                        delete n.exact),
                      n.ideal !== undefined)
                    ) {
                      e.advanced = e.advanced || []
                      var i = {}
                      'number' == typeof n.ideal
                        ? (i[r] = { min: n.ideal, max: n.ideal })
                        : (i[r] = n.ideal),
                        e.advanced.push(i),
                        delete n.ideal,
                        Object.keys(n).length || delete e[r]
                    }
                  }
                }),
                t.length && (e.require = t),
                e
              )
            }
            return (
              webrtcDetectedVersion < 38 &&
                (webrtcUtils.log('spec: ' + JSON.stringify(e)),
                e.audio && (e.audio = n(e.audio)),
                e.video && (e.video = n(e.video)),
                webrtcUtils.log('ff37: ' + JSON.stringify(e))),
              navigator.mozGetUserMedia(e, t, r)
            )
          }),
          (navigator.getUserMedia = getUserMedia),
          navigator.mediaDevices ||
            (navigator.mediaDevices = {
              getUserMedia: requestUserMedia,
              addEventListener: function() {},
              removeEventListener: function() {},
            }),
          (navigator.mediaDevices.enumerateDevices =
            navigator.mediaDevices.enumerateDevices ||
            function() {
              return new Promise(function(e) {
                e([
                  { kind: 'audioinput', deviceId: 'default', label: '', groupId: '' },
                  { kind: 'videoinput', deviceId: 'default', label: '', groupId: '' },
                ])
              })
            }),
          webrtcDetectedVersion < 41)
        ) {
          var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(
            navigator.mediaDevices,
          )
          navigator.mediaDevices.enumerateDevices = function() {
            return orgEnumerateDevices().then(undefined, function(e) {
              if ('NotFoundError' === e.name) return []
              throw e
            })
          }
        }
      } else if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection) {
        webrtcUtils.log('This appears to be Chrome'),
          (webrtcDetectedBrowser = 'chrome'),
          (webrtcDetectedVersion = webrtcUtils.extractVersion(
            navigator.userAgent,
            /Chrom(e|ium)\/([0-9]+)\./,
            2,
          )),
          (webrtcMinimumVersion = 38),
          (window.RTCPeerConnection = function(e, t) {
            e && e.iceTransportPolicy && (e.iceTransports = e.iceTransportPolicy)
            var r = new webkitRTCPeerConnection(e, t),
              n = r.getStats.bind(r)
            return (
              (r.getStats = function(e, t, r) {
                var i = this,
                  a = arguments
                if (arguments.length > 0 && 'function' == typeof e) return n(e, t)
                var o = function(e) {
                  var t = {}
                  return (
                    e.result().forEach(function(e) {
                      var r = { id: e.id, timestamp: e.timestamp, type: e.type }
                      e.names().forEach(function(t) {
                        r[t] = e.stat(t)
                      }),
                        (t[r.id] = r)
                    }),
                    t
                  )
                }
                if (arguments.length >= 2) {
                  var s = function(e) {
                    a[1](o(e))
                  }
                  return n.apply(this, [s, arguments[0]])
                }
                return new Promise(function(t, r) {
                  1 === a.length && null === e
                    ? n.apply(i, [
                        function(e) {
                          t.apply(null, [o(e)])
                        },
                        r,
                      ])
                    : n.apply(i, [t, r])
                })
              }),
              r
            )
          }),
          webkitRTCPeerConnection.generateCertificate &&
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function() {
                return arguments.length
                  ? webkitRTCPeerConnection.generateCertificate.apply(null, arguments)
                  : webkitRTCPeerConnection.generateCertificate
              },
            }),
          ['createOffer', 'createAnswer'].forEach(function(e) {
            var t = webkitRTCPeerConnection.prototype[e]
            webkitRTCPeerConnection.prototype[e] = function() {
              var e = this
              if (
                arguments.length < 1 ||
                (1 === arguments.length && 'object' == typeof arguments[0])
              ) {
                var r = 1 === arguments.length ? arguments[0] : undefined
                return new Promise(function(n, i) {
                  t.apply(e, [n, i, r])
                })
              }
              return t.apply(this, arguments)
            }
          }),
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(e) {
            var t = webkitRTCPeerConnection.prototype[e]
            webkitRTCPeerConnection.prototype[e] = function() {
              var e = arguments,
                r = this
              return new Promise(function(n, i) {
                t.apply(r, [
                  e[0],
                  function() {
                    n(), e.length >= 2 && e[1].apply(null, [])
                  },
                  function(t) {
                    i(t), e.length >= 3 && e[2].apply(null, [t])
                  },
                ])
              })
            }
          })
        var constraintsToChrome = function(e) {
          if ('object' != typeof e || e.mandatory || e.optional) return e
          var t = {}
          return (
            Object.keys(e).forEach(function(r) {
              if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                var n = 'object' == typeof e[r] ? e[r] : { ideal: e[r] }
                n.exact !== undefined && 'number' == typeof n.exact && (n.min = n.max = n.exact)
                var i = function(e, t) {
                  return e
                    ? e + t.charAt(0).toUpperCase() + t.slice(1)
                    : 'deviceId' === t
                    ? 'sourceId'
                    : t
                }
                if (n.ideal !== undefined) {
                  t.optional = t.optional || []
                  var a = {}
                  'number' == typeof n.ideal
                    ? ((a[i('min', r)] = n.ideal),
                      t.optional.push(a),
                      (a = {}),
                      (a[i('max', r)] = n.ideal),
                      t.optional.push(a))
                    : ((a[i('', r)] = n.ideal), t.optional.push(a))
                }
                n.exact !== undefined && 'number' != typeof n.exact
                  ? ((t.mandatory = t.mandatory || {}), (t.mandatory[i('', r)] = n.exact))
                  : ['min', 'max'].forEach(function(e) {
                      n[e] !== undefined &&
                        ((t.mandatory = t.mandatory || {}), (t.mandatory[i(e, r)] = n[e]))
                    })
              }
            }),
            e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
            t
          )
        }
        if (
          ((getUserMedia = function(e, t, r) {
            return (
              e.audio && (e.audio = constraintsToChrome(e.audio)),
              e.video && (e.video = constraintsToChrome(e.video)),
              webrtcUtils.log('chrome: ' + JSON.stringify(e)),
              navigator.webkitGetUserMedia(e, t, r)
            )
          }),
          (navigator.getUserMedia = getUserMedia),
          navigator.mediaDevices ||
            (navigator.mediaDevices = {
              getUserMedia: requestUserMedia,
              enumerateDevices: function() {
                return new Promise(function(e) {
                  var t = { audio: 'audioinput', video: 'videoinput' }
                  return MediaStreamTrack.getSources(function(r) {
                    e(
                      r.map(function(e) {
                        return { label: e.label, kind: t[e.kind], deviceId: e.id, groupId: '' }
                      }),
                    )
                  })
                })
              },
            }),
          navigator.mediaDevices.getUserMedia)
        ) {
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)
          navigator.mediaDevices.getUserMedia = function(e) {
            return (
              webrtcUtils.log('spec:   ' + JSON.stringify(e)),
              (e.audio = constraintsToChrome(e.audio)),
              (e.video = constraintsToChrome(e.video)),
              webrtcUtils.log('chrome: ' + JSON.stringify(e)),
              origGetUserMedia(e)
            )
          }
        } else
          navigator.mediaDevices.getUserMedia = function(e) {
            return requestUserMedia(e)
          }
        'undefined' == typeof navigator.mediaDevices.addEventListener &&
          (navigator.mediaDevices.addEventListener = function() {
            webrtcUtils.log('Dummy mediaDevices.addEventListener called.')
          }),
          'undefined' == typeof navigator.mediaDevices.removeEventListener &&
            (navigator.mediaDevices.removeEventListener = function() {
              webrtcUtils.log('Dummy mediaDevices.removeEventListener called.')
            }),
          (attachMediaStream = function(e, t) {
            webrtcDetectedVersion >= 43
              ? (e.srcObject = t)
              : 'undefined' != typeof e.src
              ? (e.src = URL.createObjectURL(t))
              : webrtcUtils.log('Error attaching stream to element.')
          }),
          (reattachMediaStream = function(e, t) {
            webrtcDetectedVersion >= 43 ? (e.srcObject = t.srcObject) : (e.src = t.src)
          })
      } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
        if (
          (webrtcUtils.log('This appears to be Edge'),
          (webrtcDetectedBrowser = 'edge'),
          (webrtcDetectedVersion = webrtcUtils.extractVersion(
            navigator.userAgent,
            /Edge\/(\d+).(\d+)$/,
            2,
          )),
          (webrtcMinimumVersion = 10547),
          window.RTCIceGatherer)
        ) {
          var generateIdentifier = function() {
              return Math.random()
                .toString(36)
                .substr(2, 10)
            },
            localCName = generateIdentifier(),
            SDPUtils = {}
          ;(SDPUtils.splitLines = function(e) {
            return e
              .trim()
              .split('\n')
              .map(function(e) {
                return e.trim()
              })
          }),
            (SDPUtils.splitSections = function(e) {
              return e.split('\r\nm=').map(function(e, t) {
                return (t > 0 ? 'm=' + e : e).trim() + '\r\n'
              })
            }),
            (SDPUtils.matchPrefix = function(e, t) {
              return SDPUtils.splitLines(e).filter(function(e) {
                return 0 === e.indexOf(t)
              })
            }),
            (SDPUtils.parseCandidate = function(e) {
              var t
              t =
                0 === e.indexOf('a=candidate:')
                  ? e.substring(12).split(' ')
                  : e.substring(10).split(' ')
              for (
                var r = {
                    foundation: t[0],
                    component: t[1],
                    protocol: t[2].toLowerCase(),
                    priority: parseInt(t[3], 10),
                    ip: t[4],
                    port: parseInt(t[5], 10),
                    type: t[7],
                  },
                  n = 8;
                n < t.length;
                n += 2
              )
                switch (t[n]) {
                  case 'raddr':
                    r.relatedAddress = t[n + 1]
                    break
                  case 'rport':
                    r.relatedPort = parseInt(t[n + 1], 10)
                    break
                  case 'tcptype':
                    r.tcpType = t[n + 1]
                }
              return r
            }),
            (SDPUtils.writeCandidate = function(e) {
              var t = []
              t.push(e.foundation),
                t.push(e.component),
                t.push(e.protocol.toUpperCase()),
                t.push(e.priority),
                t.push(e.ip),
                t.push(e.port)
              var r = e.type
              return (
                t.push('typ'),
                t.push(r),
                'host' !== r &&
                  e.relatedAddress &&
                  e.relatedPort &&
                  (t.push('raddr'),
                  t.push(e.relatedAddress),
                  t.push('rport'),
                  t.push(e.relatedPort)),
                e.tcpType &&
                  'tcp' === e.protocol.toLowerCase() &&
                  (t.push('tcptype'), t.push(e.tcpType)),
                'candidate:' + t.join(' ')
              )
            }),
            (SDPUtils.parseRtpMap = function(e) {
              var t = e.substr(9).split(' '),
                r = { payloadType: parseInt(t.shift(), 10) }
              return (
                (t = t[0].split('/')),
                (r.name = t[0]),
                (r.clockRate = parseInt(t[1], 10)),
                (r.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1),
                r
              )
            }),
            (SDPUtils.writeRtpMap = function(e) {
              var t = e.payloadType
              return (
                e.preferredPayloadType !== undefined && (t = e.preferredPayloadType),
                'a=rtpmap:' +
                  t +
                  ' ' +
                  e.name +
                  '/' +
                  e.clockRate +
                  (1 !== e.numChannels ? '/' + e.numChannels : '') +
                  '\r\n'
              )
            }),
            (SDPUtils.parseFmtp = function(e) {
              for (
                var t, r = {}, n = e.substr(e.indexOf(' ') + 1).split(';'), i = 0;
                i < n.length;
                i++
              )
                (t = n[i].trim().split('=')), (r[t[0].trim()] = t[1])
              return r
            }),
            (SDPUtils.writeFtmp = function(e) {
              var t = '',
                r = e.payloadType
              if (
                (e.preferredPayloadType !== undefined && (r = e.preferredPayloadType),
                e.parameters && e.parameters.length)
              ) {
                var n = []
                Object.keys(e.parameters).forEach(function(t) {
                  n.push(t + '=' + e.parameters[t])
                }),
                  (t += 'a=fmtp:' + r + ' ' + n.join(';') + '\r\n')
              }
              return t
            }),
            (SDPUtils.parseRtcpFb = function(e) {
              var t = e.substr(e.indexOf(' ') + 1).split(' ')
              return { type: t.shift(), parameter: t.join(' ') }
            }),
            (SDPUtils.writeRtcpFb = function(e) {
              var t = '',
                r = e.payloadType
              return (
                e.preferredPayloadType !== undefined && (r = e.preferredPayloadType),
                e.rtcpFeedback &&
                  e.rtcpFeedback.length &&
                  e.rtcpFeedback.forEach(function(e) {
                    t += 'a=rtcp-fb:' + r + ' ' + e.type + ' ' + e.parameter + '\r\n'
                  }),
                t
              )
            }),
            (SDPUtils.parseSsrcMedia = function(e) {
              var t = e.indexOf(' '),
                r = { ssrc: e.substr(7, t - 7) },
                n = e.indexOf(':', t)
              return (
                n > -1
                  ? ((r.attribute = e.substr(t + 1, n - t - 1)), (r.value = e.substr(n + 1)))
                  : (r.attribute = e.substr(t + 1)),
                r
              )
            }),
            (SDPUtils.getDtlsParameters = function(e, t) {
              var r = SDPUtils.splitLines(e)
              r = r.concat(SDPUtils.splitLines(t))
              var n = r
                .filter(function(e) {
                  return 0 === e.indexOf('a=fingerprint:')
                })[0]
                .substr(14)
              return {
                role: 'auto',
                fingerprints: [{ algorithm: n.split(' ')[0], value: n.split(' ')[1] }],
              }
            }),
            (SDPUtils.writeDtlsParameters = function(e, t) {
              var r = 'a=setup:' + t + '\r\n'
              return (
                e.fingerprints.forEach(function(e) {
                  r += 'a=fingerprint:' + e.algorithm + ' ' + e.value + '\r\n'
                }),
                r
              )
            }),
            (SDPUtils.getIceParameters = function(e, t) {
              var r = SDPUtils.splitLines(e)
              return (
                (r = r.concat(SDPUtils.splitLines(t))),
                {
                  usernameFragment: r
                    .filter(function(e) {
                      return 0 === e.indexOf('a=ice-ufrag:')
                    })[0]
                    .substr(12),
                  password: r
                    .filter(function(e) {
                      return 0 === e.indexOf('a=ice-pwd:')
                    })[0]
                    .substr(10),
                }
              )
            }),
            (SDPUtils.writeIceParameters = function(e) {
              return 'a=ice-ufrag:' + e.usernameFragment + '\r\na=ice-pwd:' + e.password + '\r\n'
            }),
            (SDPUtils.parseRtpParameters = function(e) {
              for (
                var t = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] },
                  r = SDPUtils.splitLines(e),
                  n = r[0].split(' '),
                  i = 3;
                i < n.length;
                i++
              ) {
                var a = n[i],
                  o = SDPUtils.matchPrefix(e, 'a=rtpmap:' + a + ' ')[0]
                if (o) {
                  var s = SDPUtils.parseRtpMap(o),
                    c = SDPUtils.matchPrefix(e, 'a=fmtp:' + a + ' ')
                  ;(s.parameters = c.length ? SDPUtils.parseFmtp(c[0]) : {}),
                    (s.rtcpFeedback = SDPUtils.matchPrefix(e, 'a=rtcp-fb:' + a + ' ').map(
                      SDPUtils.parseRtcpFb,
                    )),
                    t.codecs.push(s)
                }
              }
              return t
            }),
            (SDPUtils.writeRtpDescription = function(e, t) {
              var r = ''
              return (
                (r += 'm=' + e + ' '),
                (r += t.codecs.length > 0 ? '9' : '0'),
                (r += ' UDP/TLS/RTP/SAVPF '),
                (r +=
                  t.codecs
                    .map(function(e) {
                      return e.preferredPayloadType !== undefined
                        ? e.preferredPayloadType
                        : e.payloadType
                    })
                    .join(' ') + '\r\n'),
                (r += 'c=IN IP4 0.0.0.0\r\n'),
                (r += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'),
                t.codecs.forEach(function(e) {
                  ;(r += SDPUtils.writeRtpMap(e)),
                    (r += SDPUtils.writeFtmp(e)),
                    (r += SDPUtils.writeRtcpFb(e))
                }),
                (r += 'a=rtcp-mux\r\n')
              )
            }),
            (SDPUtils.writeSessionBoilerplate = function() {
              return 'v=0\r\no=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
            }),
            (SDPUtils.writeMediaSection = function(e, t, r, n) {
              var i = SDPUtils.writeRtpDescription(e.kind, t)
              if (
                ((i += SDPUtils.writeIceParameters(e.iceGatherer.getLocalParameters())),
                (i += SDPUtils.writeDtlsParameters(
                  e.dtlsTransport.getLocalParameters(),
                  'offer' === r ? 'actpass' : 'active',
                )),
                (i += 'a=mid:' + e.mid + '\r\n'),
                e.rtpSender && e.rtpReceiver
                  ? (i += 'a=sendrecv\r\n')
                  : e.rtpSender
                  ? (i += 'a=sendonly\r\n')
                  : e.rtpReceiver
                  ? (i += 'a=recvonly\r\n')
                  : (i += 'a=inactive\r\n'),
                e.rtpSender)
              ) {
                var a = 'msid:' + n.id + ' ' + e.rtpSender.track.id + '\r\n'
                ;(i += 'a=' + a), (i += 'a=ssrc:' + e.sendSsrc + ' ' + a)
              }
              return (i += 'a=ssrc:' + e.sendSsrc + ' cname:' + localCName + '\r\n')
            }),
            (SDPUtils.getDirection = function(e, t) {
              for (var r = SDPUtils.splitLines(e), n = 0; n < r.length; n++)
                switch (r[n]) {
                  case 'a=sendrecv':
                  case 'a=sendonly':
                  case 'a=recvonly':
                  case 'a=inactive':
                    return r[n].substr(2)
                }
              return t ? SDPUtils.getDirection(t) : 'sendrecv'
            }),
            window.RTCIceCandidate ||
              (window.RTCIceCandidate = function(e) {
                return e
              }),
            window.RTCSessionDescription ||
              (window.RTCSessionDescription = function(e) {
                return e
              }),
            (window.RTCPeerConnection = function(e) {
              var t = this
              if (
                ((this.onicecandidate = null),
                (this.onaddstream = null),
                (this.onremovestream = null),
                (this.onsignalingstatechange = null),
                (this.oniceconnectionstatechange = null),
                (this.onnegotiationneeded = null),
                (this.ondatachannel = null),
                (this.localStreams = []),
                (this.remoteStreams = []),
                (this.getLocalStreams = function() {
                  return t.localStreams
                }),
                (this.getRemoteStreams = function() {
                  return t.remoteStreams
                }),
                (this.localDescription = new RTCSessionDescription({ type: '', sdp: '' })),
                (this.remoteDescription = new RTCSessionDescription({ type: '', sdp: '' })),
                (this.signalingState = 'stable'),
                (this.iceConnectionState = 'new'),
                (this.iceOptions = { gatherPolicy: 'all', iceServers: [] }),
                e && e.iceTransportPolicy)
              )
                switch (e.iceTransportPolicy) {
                  case 'all':
                  case 'relay':
                    this.iceOptions.gatherPolicy = e.iceTransportPolicy
                    break
                  case 'none':
                    throw new TypeError('iceTransportPolicy "none" not supported')
                }
              e &&
                e.iceServers &&
                e.iceServers.forEach(function(e) {
                  if (e.urls) {
                    var r
                    ;(r = 'string' == typeof e.urls ? e.urls : e.urls[0]),
                      -1 !== r.indexOf('transport=udp') &&
                        t.iceServers.push({
                          username: e.username,
                          credential: e.credential,
                          urls: r,
                        })
                  }
                }),
                (this.transceivers = []),
                (this._localIceCandidatesBuffer = [])
            }),
            (window.RTCPeerConnection.prototype._emitBufferedCandidates = function() {
              var e = this
              this._localIceCandidatesBuffer.forEach(function(t) {
                null !== e.onicecandidate && e.onicecandidate(t)
              }),
                (this._localIceCandidatesBuffer = [])
            }),
            (window.RTCPeerConnection.prototype.addStream = function(e) {
              this.localStreams.push(e.clone()), this._maybeFireNegotiationNeeded()
            }),
            (window.RTCPeerConnection.prototype.removeStream = function(e) {
              var t = this.localStreams.indexOf(e)
              t > -1 && (this.localStreams.splice(t, 1), this._maybeFireNegotiationNeeded())
            }),
            (window.RTCPeerConnection.prototype._getCommonCapabilities = function(e, t) {
              var r = { codecs: [], headerExtensions: [], fecMechanisms: [] }
              return (
                e.codecs.forEach(function(e) {
                  for (var n = 0; n < t.codecs.length; n++) {
                    var i = t.codecs[n]
                    if (
                      e.name.toLowerCase() === i.name.toLowerCase() &&
                      e.clockRate === i.clockRate &&
                      e.numChannels === i.numChannels
                    ) {
                      r.codecs.push(i)
                      break
                    }
                  }
                }),
                e.headerExtensions.forEach(function(e) {
                  for (var n = 0; n < t.headerExtensions.length; n++) {
                    var i = t.headerExtensions[n]
                    if (e.uri === i.uri) {
                      r.headerExtensions.push(i)
                      break
                    }
                  }
                }),
                r
              )
            }),
            (window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function(e, t) {
              var r = this,
                n = new RTCIceGatherer(r.iceOptions),
                i = new RTCIceTransport(n)
              ;(n.onlocalcandidate = function(a) {
                var o = {}
                o.candidate = { sdpMid: e, sdpMLineIndex: t }
                var s = a.candidate
                s && 0 !== Object.keys(s).length
                  ? ((s.component = 'RTCP' === i.component ? 2 : 1),
                    (o.candidate.candidate = SDPUtils.writeCandidate(s)))
                  : (n.state === undefined && (n.state = 'completed'),
                    (o.candidate.candidate = 'candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates'))
                var c = r.transceivers.every(function(e) {
                  return e.iceGatherer && 'completed' === e.iceGatherer.state
                })
                null !== r.onicecandidate &&
                  (r.localDescription && '' === r.localDescription.type
                    ? (r._localIceCandidatesBuffer.push(o),
                      c && r._localIceCandidatesBuffer.push({}))
                    : (r.onicecandidate(o), c && r.onicecandidate({})))
              }),
                (i.onicestatechange = function() {
                  r._updateConnectionState()
                })
              var a = new RTCDtlsTransport(i)
              return (
                (a.ondtlsstatechange = function() {
                  r._updateConnectionState()
                }),
                (a.onerror = function() {
                  ;(a.state = 'failed'), r._updateConnectionState()
                }),
                { iceGatherer: n, iceTransport: i, dtlsTransport: a }
              )
            }),
            (window.RTCPeerConnection.prototype._transceive = function(e, t, r) {
              var n = this._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities)
              t &&
                e.rtpSender &&
                ((n.encodings = [{ ssrc: e.sendSsrc }]),
                (n.rtcp = { cname: localCName, ssrc: e.recvSsrc }),
                e.rtpSender.send(n)),
                r &&
                  e.rtpReceiver &&
                  ((n.encodings = [{ ssrc: e.recvSsrc }]),
                  (n.rtcp = { cname: e.cname, ssrc: e.sendSsrc }),
                  e.rtpReceiver.receive(n))
            }),
            (window.RTCPeerConnection.prototype.setLocalDescription = function(e) {
              var t = this
              if ('offer' === e.type)
                this._pendingOffer &&
                  ((this.transceivers = this._pendingOffer), delete this._pendingOffer)
              else if ('answer' === e.type) {
                var r = SDPUtils.splitSections(t.remoteDescription.sdp),
                  n = r.shift()
                r.forEach(function(e, r) {
                  var i = t.transceivers[r],
                    a = i.iceGatherer,
                    o = i.iceTransport,
                    s = i.dtlsTransport,
                    c = i.localCapabilities,
                    d = i.remoteCapabilities
                  if ('0' !== e.split('\n', 1)[0].split(' ', 2)[1]) {
                    var p = SDPUtils.getIceParameters(e, n)
                    o.start(a, p, 'controlled')
                    var l = SDPUtils.getDtlsParameters(e, n)
                    s.start(l)
                    var u = t._getCommonCapabilities(c, d)
                    t._transceive(i, u.codecs.length > 0, !1)
                  }
                })
              }
              switch (((this.localDescription = e), e.type)) {
                case 'offer':
                  this._updateSignalingState('have-local-offer')
                  break
                case 'answer':
                  this._updateSignalingState('stable')
                  break
                default:
                  throw new TypeError('unsupported type "' + e.type + '"')
              }
              var i = arguments.length > 1 && 'function' == typeof arguments[1]
              if (i) {
                var a = arguments[1]
                window.setTimeout(function() {
                  a(), t._emitBufferedCandidates()
                }, 0)
              }
              var o = Promise.resolve()
              return (
                o.then(function() {
                  i || window.setTimeout(t._emitBufferedCandidates.bind(t), 0)
                }),
                o
              )
            }),
            (window.RTCPeerConnection.prototype.setRemoteDescription = function(e) {
              var t = this,
                r = new MediaStream(),
                n = SDPUtils.splitSections(e.sdp),
                i = n.shift()
              switch (
                (n.forEach(function(n, a) {
                  var o,
                    s,
                    c,
                    d,
                    p,
                    l,
                    u,
                    f,
                    m,
                    h,
                    v,
                    g = SDPUtils.splitLines(n),
                    S = g[0].substr(2).split(' '),
                    C = S[0],
                    y = '0' === S[1],
                    T = SDPUtils.getDirection(n, i),
                    b = SDPUtils.parseRtpParameters(n)
                  y ||
                    ((h = SDPUtils.getIceParameters(n, i)), (v = SDPUtils.getDtlsParameters(n, i)))
                  var w,
                    P = SDPUtils.matchPrefix(n, 'a=mid:')[0].substr(6),
                    R = SDPUtils.matchPrefix(n, 'a=ssrc:')
                      .map(function(e) {
                        return SDPUtils.parseSsrcMedia(e)
                      })
                      .filter(function(e) {
                        return 'cname' === e.attribute
                      })[0]
                  if ((R && ((f = parseInt(R.ssrc, 10)), (w = R.value)), 'offer' === e.type)) {
                    var E = t._createIceAndDtlsTransports(P, a)
                    if (
                      ((m = RTCRtpReceiver.getCapabilities(C)),
                      (u = 1001 * (2 * a + 2)),
                      (l = new RTCRtpReceiver(E.dtlsTransport, C)),
                      r.addTrack(l.track),
                      t.localStreams.length > 0 && t.localStreams[0].getTracks().length >= a)
                    ) {
                      var D = t.localStreams[0].getTracks()[a]
                      p = new RTCRtpSender(D, E.dtlsTransport)
                    }
                    ;(t.transceivers[a] = {
                      iceGatherer: E.iceGatherer,
                      iceTransport: E.iceTransport,
                      dtlsTransport: E.dtlsTransport,
                      localCapabilities: m,
                      remoteCapabilities: b,
                      rtpSender: p,
                      rtpReceiver: l,
                      kind: C,
                      mid: P,
                      cname: w,
                      sendSsrc: u,
                      recvSsrc: f,
                    }),
                      t._transceive(t.transceivers[a], !1, 'sendrecv' === T || 'sendonly' === T)
                  } else 'answer' !== e.type || y || ((o = t.transceivers[a]), (s = o.iceGatherer), (c = o.iceTransport), (d = o.dtlsTransport), (p = o.rtpSender), (l = o.rtpReceiver), (u = o.sendSsrc), (m = o.localCapabilities), (t.transceivers[a].recvSsrc = f), (t.transceivers[a].remoteCapabilities = b), (t.transceivers[a].cname = w), c.start(s, h, 'controlling'), d.start(v), t._transceive(o, 'sendrecv' === T || 'recvonly' === T, 'sendrecv' === T || 'sendonly' === T), !l || ('sendrecv' !== T && 'sendonly' !== T) ? delete o.rtpReceiver : r.addTrack(l.track))
                }),
                (this.remoteDescription = e),
                e.type)
              ) {
                case 'offer':
                  this._updateSignalingState('have-remote-offer')
                  break
                case 'answer':
                  this._updateSignalingState('stable')
                  break
                default:
                  throw new TypeError('unsupported type "' + e.type + '"')
              }
              return (
                window.setTimeout(function() {
                  null !== t.onaddstream &&
                    r.getTracks().length &&
                    (t.remoteStreams.push(r),
                    window.setTimeout(function() {
                      t.onaddstream({ stream: r })
                    }, 0))
                }, 0),
                arguments.length > 1 &&
                  'function' == typeof arguments[1] &&
                  window.setTimeout(arguments[1], 0),
                Promise.resolve()
              )
            }),
            (window.RTCPeerConnection.prototype.close = function() {
              this.transceivers.forEach(function(e) {
                e.iceTransport && e.iceTransport.stop(),
                  e.dtlsTransport && e.dtlsTransport.stop(),
                  e.rtpSender && e.rtpSender.stop(),
                  e.rtpReceiver && e.rtpReceiver.stop()
              }),
                this._updateSignalingState('closed')
            }),
            (window.RTCPeerConnection.prototype._updateSignalingState = function(e) {
              ;(this.signalingState = e),
                null !== this.onsignalingstatechange && this.onsignalingstatechange()
            }),
            (window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
              null !== this.onnegotiationneeded && this.onnegotiationneeded()
            }),
            (window.RTCPeerConnection.prototype._updateConnectionState = function() {
              var e,
                t = this,
                r = {
                  new: 0,
                  closed: 0,
                  connecting: 0,
                  checking: 0,
                  connected: 0,
                  completed: 0,
                  failed: 0,
                }
              this.transceivers.forEach(function(e) {
                r[e.iceTransport.state]++, r[e.dtlsTransport.state]++
              }),
                (r.connected += r.completed),
                (e = 'new'),
                r.failed > 0
                  ? (e = 'failed')
                  : r.connecting > 0 || r.checking > 0
                  ? (e = 'connecting')
                  : r.disconnected > 0
                  ? (e = 'disconnected')
                  : r['new'] > 0
                  ? (e = 'new')
                  : (r.connecting > 0 || r.completed > 0) && (e = 'connected'),
                e !== t.iceConnectionState &&
                  ((t.iceConnectionState = e),
                  null !== this.oniceconnectionstatechange && this.oniceconnectionstatechange())
            }),
            (window.RTCPeerConnection.prototype.createOffer = function() {
              var e = this
              if (this._pendingOffer)
                throw new Error('createOffer called while there is a pending offer.')
              var t
              1 === arguments.length && 'function' != typeof arguments[0]
                ? (t = arguments[0])
                : 3 === arguments.length && (t = arguments[2])
              var r = [],
                n = 0,
                i = 0
              if (
                (this.localStreams.length &&
                  ((n = this.localStreams[0].getAudioTracks().length),
                  (i = this.localStreams[0].getVideoTracks().length)),
                t)
              ) {
                if (t.mandatory || t.optional)
                  throw new TypeError('Legacy mandatory/optional constraints not supported.')
                t.offerToReceiveAudio !== undefined && (n = t.offerToReceiveAudio),
                  t.offerToReceiveVideo !== undefined && (i = t.offerToReceiveVideo)
              }
              for (
                this.localStreams.length &&
                this.localStreams[0].getTracks().forEach(function(e) {
                  r.push({
                    kind: e.kind,
                    track: e,
                    wantReceive: 'audio' === e.kind ? n > 0 : i > 0,
                  }),
                    'audio' === e.kind ? n-- : 'video' === e.kind && i--
                });
                n > 0 || i > 0;

              )
                n > 0 && (r.push({ kind: 'audio', wantReceive: !0 }), n--),
                  i > 0 && (r.push({ kind: 'video', wantReceive: !0 }), i--)
              var a = SDPUtils.writeSessionBoilerplate(),
                o = []
              r.forEach(function(t, r) {
                var n,
                  i,
                  s = t.track,
                  c = t.kind,
                  d = generateIdentifier(),
                  p = e._createIceAndDtlsTransports(d, r),
                  l = RTCRtpSender.getCapabilities(c),
                  u = 1001 * (2 * r + 1)
                s && (n = new RTCRtpSender(s, p.dtlsTransport)),
                  t.wantReceive && (i = new RTCRtpReceiver(p.dtlsTransport, c)),
                  (o[r] = {
                    iceGatherer: p.iceGatherer,
                    iceTransport: p.iceTransport,
                    dtlsTransport: p.dtlsTransport,
                    localCapabilities: l,
                    remoteCapabilities: null,
                    rtpSender: n,
                    rtpReceiver: i,
                    kind: c,
                    mid: d,
                    sendSsrc: u,
                    recvSsrc: null,
                  })
                var f = o[r]
                a += SDPUtils.writeMediaSection(f, f.localCapabilities, 'offer', e.localStreams[0])
              }),
                (this._pendingOffer = o)
              var s = new RTCSessionDescription({ type: 'offer', sdp: a })
              return (
                arguments.length &&
                  'function' == typeof arguments[0] &&
                  window.setTimeout(arguments[0], 0, s),
                Promise.resolve(s)
              )
            }),
            (window.RTCPeerConnection.prototype.createAnswer = function() {
              var e = this
              1 === arguments.length && 'function' != typeof arguments[0]
                ? arguments[0]
                : 3 === arguments.length && arguments[2]
              var t = SDPUtils.writeSessionBoilerplate()
              this.transceivers.forEach(function(r) {
                var n = e._getCommonCapabilities(r.localCapabilities, r.remoteCapabilities)
                t += SDPUtils.writeMediaSection(r, n, 'answer', e.localStreams[0])
              })
              var r = new RTCSessionDescription({ type: 'answer', sdp: t })
              return (
                arguments.length &&
                  'function' == typeof arguments[0] &&
                  window.setTimeout(arguments[0], 0, r),
                Promise.resolve(r)
              )
            }),
            (window.RTCPeerConnection.prototype.addIceCandidate = function(e) {
              var t = e.sdpMLineIndex
              if (e.sdpMid)
                for (var r = 0; r < this.transceivers.length; r++)
                  if (this.transceivers[r].mid === e.sdpMid) {
                    t = r
                    break
                  }
              var n = this.transceivers[t]
              if (n) {
                var i =
                  Object.keys(e.candidate).length > 0 ? SDPUtils.parseCandidate(e.candidate) : {}
                if ('tcp' === i.protocol && 0 === i.port) return
                if ('1' !== i.component) return
                'endOfCandidates' === i.type && (i = {}), n.iceTransport.addRemoteCandidate(i)
              }
              return (
                arguments.length > 1 &&
                  'function' == typeof arguments[1] &&
                  window.setTimeout(arguments[1], 0),
                Promise.resolve()
              )
            }),
            (window.RTCPeerConnection.prototype.getStats = function() {
              var e = []
              this.transceivers.forEach(function(t) {
                ;[
                  'rtpSender',
                  'rtpReceiver',
                  'iceGatherer',
                  'iceTransport',
                  'dtlsTransport',
                ].forEach(function(r) {
                  t[r] && e.push(t[r].getStats())
                })
              })
              var t = arguments.length > 1 && 'function' == typeof arguments[1] && arguments[1]
              return new Promise(function(r) {
                var n = {}
                Promise.all(e).then(function(e) {
                  e.forEach(function(e) {
                    Object.keys(e).forEach(function(t) {
                      n[t] = e[t]
                    })
                  }),
                    t && window.setTimeout(t, 0, n),
                    r(n)
                })
              })
            })
        }
      } else webrtcUtils.log('Browser does not appear to be WebRTC-capable')
    else
      webrtcUtils.log('This does not appear to be a browser'),
        (webrtcDetectedBrowser = 'not a browser')
    var webrtcTesting = {}
    try {
      Object.defineProperty(webrtcTesting, 'version', {
        set: function(e) {
          webrtcDetectedVersion = e
        },
      })
    } catch (e) {}
    AdapterJS.parseWebrtcDetectedBrowser(),
      navigator.mozGetUserMedia
        ? ((MediaStreamTrack.getSources = function(e) {
            setTimeout(function() {
              e([
                { kind: 'audio', id: 'default', label: '', facing: '' },
                { kind: 'video', id: 'default', label: '', facing: '' },
              ])
            }, 0)
          }),
          (createIceServer = function(e, t, r) {
            console.warn(
              'createIceServer is deprecated. It should be replaced with an application level implementation.',
            )
            var n = null,
              i = e.split(':')
            if (0 === i[0].indexOf('stun')) n = { urls: [e] }
            else if (0 === i[0].indexOf('turn'))
              if (webrtcDetectedVersion < 27) {
                var a = e.split('?')
                ;(1 !== a.length && 0 !== a[1].indexOf('transport=udp')) ||
                  (n = { urls: [a[0]], credential: r, username: t })
              } else n = { urls: [e], credential: r, username: t }
            return n
          }),
          (createIceServers = function(e, t, r) {
            console.warn(
              'createIceServers is deprecated. It should be replaced with an application level implementation.',
            )
            var n = []
            for (i = 0; i < e.length; i++) {
              var a = createIceServer(e[i], t, r)
              null !== a && n.push(a)
            }
            return n
          }))
        : navigator.webkitGetUserMedia &&
          ((createIceServer = function(e, t, r) {
            console.warn(
              'createIceServer is deprecated. It should be replaced with an application level implementation.',
            )
            var n = null,
              i = e.split(':')
            return (
              0 === i[0].indexOf('stun')
                ? (n = { url: e })
                : 0 === i[0].indexOf('turn') && (n = { url: e, credential: r, username: t }),
              n
            )
          }),
          (createIceServers = function(e, t, r) {
            console.warn(
              'createIceServers is deprecated. It should be replaced with an application level implementation.',
            )
            var n = []
            if (webrtcDetectedVersion >= 34) n = { urls: e, credential: r, username: t }
            else
              for (i = 0; i < e.length; i++) {
                var a = createIceServer(e[i], t, r)
                null !== a && n.push(a)
              }
            return n
          })),
      navigator.mediaDevices &&
        navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) &&
        ((getUserMedia = window.getUserMedia = navigator.getUserMedia.bind(navigator)),
        (attachMediaStream = function(e, t) {
          return (e.srcObject = t), e
        }),
        (reattachMediaStream = function(e, t) {
          return (e.srcObject = t.srcObject), e
        })),
      (attachMediaStream_base = attachMediaStream),
      'opera' === webrtcDetectedBrowser &&
        (attachMediaStream_base = function(e, t) {
          webrtcDetectedVersion > 38
            ? (e.srcObject = t)
            : 'undefined' != typeof e.src && (e.src = URL.createObjectURL(t))
        }),
      (attachMediaStream = function(e, t) {
        return (
          ('chrome' !== webrtcDetectedBrowser && 'opera' !== webrtcDetectedBrowser) || t
            ? attachMediaStream_base(e, t)
            : (e.src = ''),
          e
        )
      }),
      (reattachMediaStream_base = reattachMediaStream),
      (reattachMediaStream = function(e, t) {
        return reattachMediaStream_base(e, t), e
      }),
      (window.attachMediaStream = attachMediaStream),
      (window.reattachMediaStream = reattachMediaStream),
      (window.getUserMedia = getUserMedia),
      (AdapterJS.attachMediaStream = attachMediaStream),
      (AdapterJS.reattachMediaStream = reattachMediaStream),
      (AdapterJS.getUserMedia = getUserMedia),
      'undefined' == typeof Promise && (requestUserMedia = null),
      AdapterJS.maybeThroughWebRTCReady()
  }
}
