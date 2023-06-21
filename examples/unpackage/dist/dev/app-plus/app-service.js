if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  class MessageContentType {
    // signal
  }
  MessageContentType.unknown = 0;
  MessageContentType.text = 1;
  MessageContentType.image = 2;
  MessageContentType.cmd = 99;
  MessageContentType.signalMessage = 21e3;
  var lookup$1 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    62,
    0,
    62,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    63,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ];
  function base64Decode(source, target) {
    var sourceLength = source.length;
    var paddingLength = source[sourceLength - 2] === "=" ? 2 : source[sourceLength - 1] === "=" ? 1 : 0;
    var tmp;
    var byteIndex = 0;
    var baseLength = sourceLength - paddingLength & 4294967292;
    for (var i2 = 0; i2 < baseLength; i2 += 4) {
      tmp = lookup$1[source.charCodeAt(i2)] << 18 | lookup$1[source.charCodeAt(i2 + 1)] << 12 | lookup$1[source.charCodeAt(i2 + 2)] << 6 | lookup$1[source.charCodeAt(i2 + 3)];
      target[byteIndex++] = tmp >> 16 & 255;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 1) {
      tmp = lookup$1[source.charCodeAt(i2)] << 10 | lookup$1[source.charCodeAt(i2 + 1)] << 4 | lookup$1[source.charCodeAt(i2 + 2)] >> 2;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 2) {
      tmp = lookup$1[source.charCodeAt(i2)] << 2 | lookup$1[source.charCodeAt(i2 + 1)] >> 4;
      target[byteIndex++] = tmp & 255;
    }
  }
  const $inject_window_crypto = {
    getRandomValues(arr) {
      if (!(arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Uint8ClampedArray)) {
        throw new Error("Expected an integer array");
      }
      if (arr.byteLength > 65536) {
        throw new Error("Can only request a maximum of 65536 bytes");
      }
      var crypto = requireNativePlugin("DCloud-Crypto");
      base64Decode(crypto.getRandomValues(arr.byteLength), new Uint8Array(
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      ));
      return arr;
    }
  };
  var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
  function clone(configObject) {
    var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
      prefix: "",
      groupSize: 3,
      secondaryGroupSize: 0,
      groupSeparator: ",",
      decimalSeparator: ".",
      fractionGroupSize: 0,
      fractionGroupSeparator: " ",
      // non-breaking space
      suffix: ""
    }, ALPHABET2 = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
    function BigNumber2(v, b) {
      var alphabet, c, caseChanged, e, i2, isNum, len2, str, x = this;
      if (!(x instanceof BigNumber2))
        return new BigNumber2(v, b);
      if (b == null) {
        if (v && v._isBigNumber === true) {
          x.s = v.s;
          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }
          return;
        }
        if ((isNum = typeof v == "number") && v * 0 == 0) {
          x.s = 1 / v < 0 ? (v = -v, -1) : 1;
          if (v === ~~v) {
            for (e = 0, i2 = v; i2 >= 10; i2 /= 10, e++)
              ;
            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }
            return;
          }
          str = String(v);
        } else {
          if (!isNumeric.test(str = String(v)))
            return parseNumeric(x, str, isNum);
          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }
        if ((e = str.indexOf(".")) > -1)
          str = str.replace(".", "");
        if ((i2 = str.search(/e/i)) > 0) {
          if (e < 0)
            e = i2;
          e += +str.slice(i2 + 1);
          str = str.substring(0, i2);
        } else if (e < 0) {
          e = str.length;
        }
      } else {
        intCheck(b, 2, ALPHABET2.length, "Base");
        if (b == 10 && alphabetHasNormalDecimalDigits) {
          x = new BigNumber2(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }
        str = String(v);
        if (isNum = typeof v == "number") {
          if (v * 0 != 0)
            return parseNumeric(x, str, isNum, b);
          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
          if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
            throw Error(tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }
        alphabet = ALPHABET2.slice(0, b);
        e = i2 = 0;
        for (len2 = str.length; i2 < len2; i2++) {
          if (alphabet.indexOf(c = str.charAt(i2)) < 0) {
            if (c == ".") {
              if (i2 > e) {
                e = len2;
                continue;
              }
            } else if (!caseChanged) {
              if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i2 = -1;
                e = 0;
                continue;
              }
            }
            return parseNumeric(x, String(v), isNum, b);
          }
        }
        isNum = false;
        str = convertBase(str, b, 10, x.s);
        if ((e = str.indexOf(".")) > -1)
          str = str.replace(".", "");
        else
          e = str.length;
      }
      for (i2 = 0; str.charCodeAt(i2) === 48; i2++)
        ;
      for (len2 = str.length; str.charCodeAt(--len2) === 48; )
        ;
      if (str = str.slice(i2, ++len2)) {
        len2 -= i2;
        if (isNum && BigNumber2.DEBUG && len2 > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
          throw Error(tooManyDigits + x.s * v);
        }
        if ((e = e - i2 - 1) > MAX_EXP) {
          x.c = x.e = null;
        } else if (e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];
          i2 = (e + 1) % LOG_BASE;
          if (e < 0)
            i2 += LOG_BASE;
          if (i2 < len2) {
            if (i2)
              x.c.push(+str.slice(0, i2));
            for (len2 -= LOG_BASE; i2 < len2; ) {
              x.c.push(+str.slice(i2, i2 += LOG_BASE));
            }
            i2 = LOG_BASE - (str = str.slice(i2)).length;
          } else {
            i2 -= len2;
          }
          for (; i2--; str += "0")
            ;
          x.c.push(+str);
        }
      } else {
        x.c = [x.e = 0];
      }
    }
    BigNumber2.clone = clone;
    BigNumber2.ROUND_UP = 0;
    BigNumber2.ROUND_DOWN = 1;
    BigNumber2.ROUND_CEIL = 2;
    BigNumber2.ROUND_FLOOR = 3;
    BigNumber2.ROUND_HALF_UP = 4;
    BigNumber2.ROUND_HALF_DOWN = 5;
    BigNumber2.ROUND_HALF_EVEN = 6;
    BigNumber2.ROUND_HALF_CEIL = 7;
    BigNumber2.ROUND_HALF_FLOOR = 8;
    BigNumber2.EUCLID = 9;
    BigNumber2.config = BigNumber2.set = function(obj) {
      var p, v;
      if (obj != null) {
        if (typeof obj == "object") {
          if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }
          if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }
          if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }
          if (obj.hasOwnProperty(p = "RANGE")) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error(bignumberError + p + " cannot be zero: " + v);
              }
            }
          }
          if (obj.hasOwnProperty(p = "CRYPTO")) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof $inject_window_crypto != "undefined" && $inject_window_crypto && ($inject_window_crypto.getRandomValues || $inject_window_crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error(bignumberError + "crypto unavailable");
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error(bignumberError + p + " not true or false: " + v);
            }
          }
          if (obj.hasOwnProperty(p = "MODULO_MODE")) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }
          if (obj.hasOwnProperty(p = "POW_PRECISION")) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }
          if (obj.hasOwnProperty(p = "FORMAT")) {
            v = obj[p];
            if (typeof v == "object")
              FORMAT = v;
            else
              throw Error(bignumberError + p + " not an object: " + v);
          }
          if (obj.hasOwnProperty(p = "ALPHABET")) {
            v = obj[p];
            if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
              alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
              ALPHABET2 = v;
            } else {
              throw Error(bignumberError + p + " invalid: " + v);
            }
          }
        } else {
          throw Error(bignumberError + "Object expected: " + obj);
        }
      }
      return {
        DECIMAL_PLACES,
        ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO,
        MODULO_MODE,
        POW_PRECISION,
        FORMAT,
        ALPHABET: ALPHABET2
      };
    };
    BigNumber2.isBigNumber = function(v) {
      if (!v || v._isBigNumber !== true)
        return false;
      if (!BigNumber2.DEBUG)
        return true;
      var i2, n, c = v.c, e = v.e, s = v.s;
      out:
        if ({}.toString.call(c) == "[object Array]") {
          if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
            if (c[0] === 0) {
              if (e === 0 && c.length === 1)
                return true;
              break out;
            }
            i2 = (e + 1) % LOG_BASE;
            if (i2 < 1)
              i2 += LOG_BASE;
            if (String(c[0]).length == i2) {
              for (i2 = 0; i2 < c.length; i2++) {
                n = c[i2];
                if (n < 0 || n >= BASE || n !== mathfloor(n))
                  break out;
              }
              if (n !== 0)
                return true;
            }
          }
        } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
          return true;
        }
      throw Error(bignumberError + "Invalid BigNumber: " + v);
    };
    BigNumber2.maximum = BigNumber2.max = function() {
      return maxOrMin(arguments, P.lt);
    };
    BigNumber2.minimum = BigNumber2.min = function() {
      return maxOrMin(arguments, P.gt);
    };
    BigNumber2.random = function() {
      var pow2_53 = 9007199254740992;
      var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
        return mathfloor(Math.random() * pow2_53);
      } : function() {
        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
      };
      return function(dp) {
        var a, b, e, k, v, i2 = 0, c = [], rand = new BigNumber2(ONE);
        if (dp == null)
          dp = DECIMAL_PLACES;
        else
          intCheck(dp, 0, MAX);
        k = mathceil(dp / LOG_BASE);
        if (CRYPTO) {
          if ($inject_window_crypto.getRandomValues) {
            a = $inject_window_crypto.getRandomValues(new Uint32Array(k *= 2));
            for (; i2 < k; ) {
              v = a[i2] * 131072 + (a[i2 + 1] >>> 11);
              if (v >= 9e15) {
                b = $inject_window_crypto.getRandomValues(new Uint32Array(2));
                a[i2] = b[0];
                a[i2 + 1] = b[1];
              } else {
                c.push(v % 1e14);
                i2 += 2;
              }
            }
            i2 = k / 2;
          } else if ($inject_window_crypto.randomBytes) {
            a = $inject_window_crypto.randomBytes(k *= 7);
            for (; i2 < k; ) {
              v = (a[i2] & 31) * 281474976710656 + a[i2 + 1] * 1099511627776 + a[i2 + 2] * 4294967296 + a[i2 + 3] * 16777216 + (a[i2 + 4] << 16) + (a[i2 + 5] << 8) + a[i2 + 6];
              if (v >= 9e15) {
                $inject_window_crypto.randomBytes(7).copy(a, i2);
              } else {
                c.push(v % 1e14);
                i2 += 7;
              }
            }
            i2 = k / 7;
          } else {
            CRYPTO = false;
            throw Error(bignumberError + "crypto unavailable");
          }
        }
        if (!CRYPTO) {
          for (; i2 < k; ) {
            v = random53bitInt();
            if (v < 9e15)
              c[i2++] = v % 1e14;
          }
        }
        k = c[--i2];
        dp %= LOG_BASE;
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i2] = mathfloor(k / v) * v;
        }
        for (; c[i2] === 0; c.pop(), i2--)
          ;
        if (i2 < 0) {
          c = [e = 0];
        } else {
          for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE)
            ;
          for (i2 = 1, v = c[0]; v >= 10; v /= 10, i2++)
            ;
          if (i2 < LOG_BASE)
            e -= LOG_BASE - i2;
        }
        rand.e = e;
        rand.c = c;
        return rand;
      };
    }();
    BigNumber2.sum = function() {
      var i2 = 1, args = arguments, sum = new BigNumber2(args[0]);
      for (; i2 < args.length; )
        sum = sum.plus(args[i2++]);
      return sum;
    };
    convertBase = function() {
      var decimal = "0123456789";
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j, arr = [0], arrL, i2 = 0, len2 = str.length;
        for (; i2 < len2; ) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
            ;
          arr[0] += alphabet.indexOf(str.charAt(i2++));
          for (j = 0; j < arr.length; j++) {
            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null)
                arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }
        return arr.reverse();
      }
      return function(str, baseIn, baseOut, sign2, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y, i2 = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
        if (i2 >= 0) {
          k = POW_PRECISION;
          POW_PRECISION = 0;
          str = str.replace(".", "");
          y = new BigNumber2(baseIn);
          x = y.pow(str.length - i2);
          POW_PRECISION = k;
          y.c = toBaseOut(
            toFixedPoint(coeffToString(x.c), x.e, "0"),
            10,
            baseOut,
            decimal
          );
          y.e = y.c.length;
        }
        xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET2, decimal) : (alphabet = decimal, ALPHABET2));
        e = k = xc.length;
        for (; xc[--k] == 0; xc.pop())
          ;
        if (!xc[0])
          return alphabet.charAt(0);
        if (i2 < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;
          x.s = sign2;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }
        d = e + dp + 1;
        i2 = xc[d];
        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;
        r = rm < 4 ? (i2 != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i2 > k || i2 == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
        if (d < 1 || !xc[0]) {
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {
          xc.length = d;
          if (r) {
            for (--baseOut; ++xc[--d] > baseOut; ) {
              xc[d] = 0;
              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }
          for (k = xc.length; !xc[--k]; )
            ;
          for (i2 = 0, str = ""; i2 <= k; str += alphabet.charAt(xc[i2++]))
            ;
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }
        return str;
      };
    }();
    div = function() {
      function multiply(x, k, base) {
        var m, temp, xlo, xhi, carry = 0, i2 = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
        for (x = x.slice(); i2--; ) {
          xlo = x[i2] % SQRT_BASE;
          xhi = x[i2] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i2] = temp % base;
        }
        if (carry)
          x = [carry].concat(x);
        return x;
      }
      function compare2(a, b, aL, bL) {
        var i2, cmp;
        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {
          for (i2 = cmp = 0; i2 < aL; i2++) {
            if (a[i2] != b[i2]) {
              cmp = a[i2] > b[i2] ? 1 : -1;
              break;
            }
          }
        }
        return cmp;
      }
      function subtract(a, b, aL, base) {
        var i2 = 0;
        for (; aL--; ) {
          a[aL] -= i2;
          i2 = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i2 * base + a[aL] - b[aL];
        }
        for (; !a[0] && a.length > 1; a.splice(0, 1))
          ;
      }
      return function(x, y, dp, rm, base) {
        var cmp, e, i2, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
        if (!xc || !xc[0] || !yc || !yc[0]) {
          return new BigNumber2(
            // Return NaN if either NaN, or both Infinity or 0.
            !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
              // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
              xc && xc[0] == 0 || !yc ? s * 0 : s / 0
            )
          );
        }
        q = new BigNumber2(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;
        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }
        for (i2 = 0; yc[i2] == (xc[i2] || 0); i2++)
          ;
        if (yc[i2] > (xc[i2] || 0))
          e--;
        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i2 = 0;
          s += 2;
          n = mathfloor(base / (yc[0] + 1));
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }
          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;
          for (; remL < yL; rem[remL++] = 0)
            ;
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2)
            yc0++;
          do {
            n = 0;
            cmp = compare2(yc, rem, yL, remL);
            if (cmp < 0) {
              rem0 = rem[0];
              if (yL != remL)
                rem0 = rem0 * base + (rem[1] || 0);
              n = mathfloor(rem0 / yc0);
              if (n > 1) {
                if (n >= base)
                  n = base - 1;
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;
                while (compare2(prod, rem, prodL, remL) == 1) {
                  n--;
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {
                if (n == 0) {
                  cmp = n = 1;
                }
                prod = yc.slice();
                prodL = prod.length;
              }
              if (prodL < remL)
                prod = [0].concat(prod);
              subtract(rem, prod, remL, base);
              remL = rem.length;
              if (cmp == -1) {
                while (compare2(yc, rem, yL, remL) < 1) {
                  n++;
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            }
            qc[i2++] = n;
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);
          more = rem[0] != null;
          if (!qc[0])
            qc.splice(0, 1);
        }
        if (base == BASE) {
          for (i2 = 1, s = qc[0]; s >= 10; s /= 10, i2++)
            ;
          round(q, dp + (q.e = i2 + e * LOG_BASE - 1) + 1, rm, more);
        } else {
          q.e = e;
          q.r = +more;
        }
        return q;
      };
    }();
    function format(n, i2, rm, id) {
      var c0, e, ne, len2, str;
      if (rm == null)
        rm = ROUNDING_MODE;
      else
        intCheck(rm, 0, 8);
      if (!n.c)
        return n.toString();
      c0 = n.c[0];
      ne = n.e;
      if (i2 == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
      } else {
        n = round(new BigNumber2(n), i2, rm);
        e = n.e;
        str = coeffToString(n.c);
        len2 = str.length;
        if (id == 1 || id == 2 && (i2 <= e || e <= TO_EXP_NEG)) {
          for (; len2 < i2; str += "0", len2++)
            ;
          str = toExponential(str, e);
        } else {
          i2 -= ne;
          str = toFixedPoint(str, e, "0");
          if (e + 1 > len2) {
            if (--i2 > 0)
              for (str += "."; i2--; str += "0")
                ;
          } else {
            i2 += e - len2;
            if (i2 > 0) {
              if (e + 1 == len2)
                str += ".";
              for (; i2--; str += "0")
                ;
            }
          }
        }
      }
      return n.s < 0 && c0 ? "-" + str : str;
    }
    function maxOrMin(args, method) {
      var n, i2 = 1, m = new BigNumber2(args[0]);
      for (; i2 < args.length; i2++) {
        n = new BigNumber2(args[i2]);
        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }
      return m;
    }
    function normalise(n, c, e) {
      var i2 = 1, j = c.length;
      for (; !c[--j]; c.pop())
        ;
      for (j = c[0]; j >= 10; j /= 10, i2++)
        ;
      if ((e = i2 + e * LOG_BASE - 1) > MAX_EXP) {
        n.c = n.e = null;
      } else if (e < MIN_EXP) {
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }
      return n;
    }
    parseNumeric = function() {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function(x, str, isNum, b) {
        var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {
            s = s.replace(basePrefix, function(m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
              return !b || b == base ? p1 : m;
            });
            if (b) {
              base = b;
              s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
            }
            if (str != s)
              return new BigNumber2(s, base);
          }
          if (BigNumber2.DEBUG) {
            throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
          }
          x.s = null;
        }
        x.c = x.e = null;
      };
    }();
    function round(x, sd, rm, r) {
      var d, i2, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
      if (xc) {
        out: {
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++)
            ;
          i2 = sd - d;
          if (i2 < 0) {
            i2 += LOG_BASE;
            j = sd;
            n = xc[ni = 0];
            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i2 + 1) / LOG_BASE);
            if (ni >= xc.length) {
              if (r) {
                for (; xc.length <= ni; xc.push(0))
                  ;
                n = rd = 0;
                d = 1;
                i2 %= LOG_BASE;
                j = i2 - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];
              for (d = 1; k >= 10; k /= 10, d++)
                ;
              i2 %= LOG_BASE;
              j = i2 - LOG_BASE + d;
              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }
          r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
          xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
          r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
          (i2 > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
          if (sd < 1 || !xc[0]) {
            xc.length = 0;
            if (r) {
              sd -= x.e + 1;
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {
              xc[0] = x.e = 0;
            }
            return x;
          }
          if (i2 == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i2];
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }
          if (r) {
            for (; ; ) {
              if (ni == 0) {
                for (i2 = 1, j = xc[0]; j >= 10; j /= 10, i2++)
                  ;
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++)
                  ;
                if (i2 != k) {
                  x.e++;
                  if (xc[0] == BASE)
                    xc[0] = 1;
                }
                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE)
                  break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }
          for (i2 = xc.length; xc[--i2] === 0; xc.pop())
            ;
        }
        if (x.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }
      return x;
    }
    function valueOf(n) {
      var str, e = n.e;
      if (e === null)
        return n.toString();
      str = coeffToString(n.c);
      str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
      return n.s < 0 ? "-" + str : str;
    }
    P.absoluteValue = P.abs = function() {
      var x = new BigNumber2(this);
      if (x.s < 0)
        x.s = 1;
      return x;
    };
    P.comparedTo = function(y, b) {
      return compare(this, new BigNumber2(y, b));
    };
    P.decimalPlaces = P.dp = function(dp, rm) {
      var c, n, v, x = this;
      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null)
          rm = ROUNDING_MODE;
        else
          intCheck(rm, 0, 8);
        return round(new BigNumber2(x), dp + x.e + 1, rm);
      }
      if (!(c = x.c))
        return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
      if (v = c[v])
        for (; v % 10 == 0; v /= 10, n--)
          ;
      if (n < 0)
        n = 0;
      return n;
    };
    P.dividedBy = P.div = function(y, b) {
      return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };
    P.dividedToIntegerBy = P.idiv = function(y, b) {
      return div(this, new BigNumber2(y, b), 0, 1);
    };
    P.exponentiatedBy = P.pow = function(n, m) {
      var half, isModExp, i2, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
      n = new BigNumber2(n);
      if (n.c && !n.isInteger()) {
        throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
      }
      if (m != null)
        m = new BigNumber2(m);
      nIsBig = n.e > 14;
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
        y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }
      nIsNeg = n.s < 0;
      if (m) {
        if (m.c ? !m.c[0] : !m.s)
          return new BigNumber2(NaN);
        isModExp = !nIsNeg && x.isInteger() && m.isInteger();
        if (isModExp)
          x = x.mod(m);
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
        k = x.s < 0 && isOdd(n) ? -0 : 0;
        if (x.e > -1)
          k = 1 / k;
        return new BigNumber2(nIsNeg ? 1 / k : k);
      } else if (POW_PRECISION) {
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }
      if (nIsBig) {
        half = new BigNumber2(0.5);
        if (nIsNeg)
          n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i2 = Math.abs(+valueOf(n));
        nIsOdd = i2 % 2;
      }
      y = new BigNumber2(ONE);
      for (; ; ) {
        if (nIsOdd) {
          y = y.times(x);
          if (!y.c)
            break;
          if (k) {
            if (y.c.length > k)
              y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);
          }
        }
        if (i2) {
          i2 = mathfloor(i2 / 2);
          if (i2 === 0)
            break;
          nIsOdd = i2 % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);
          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i2 = +valueOf(n);
            if (i2 === 0)
              break;
            nIsOdd = i2 % 2;
          }
        }
        x = x.times(x);
        if (k) {
          if (x.c && x.c.length > k)
            x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);
        }
      }
      if (isModExp)
        return y;
      if (nIsNeg)
        y = ONE.div(y);
      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };
    P.integerValue = function(rm) {
      var n = new BigNumber2(this);
      if (rm == null)
        rm = ROUNDING_MODE;
      else
        intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };
    P.isEqualTo = P.eq = function(y, b) {
      return compare(this, new BigNumber2(y, b)) === 0;
    };
    P.isFinite = function() {
      return !!this.c;
    };
    P.isGreaterThan = P.gt = function(y, b) {
      return compare(this, new BigNumber2(y, b)) > 0;
    };
    P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
      return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
    };
    P.isInteger = function() {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };
    P.isLessThan = P.lt = function(y, b) {
      return compare(this, new BigNumber2(y, b)) < 0;
    };
    P.isLessThanOrEqualTo = P.lte = function(y, b) {
      return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
    };
    P.isNaN = function() {
      return !this.s;
    };
    P.isNegative = function() {
      return this.s < 0;
    };
    P.isPositive = function() {
      return this.s > 0;
    };
    P.isZero = function() {
      return !!this.c && this.c[0] == 0;
    };
    P.minus = function(y, b) {
      var i2, j, t, xLTy, x = this, a = x.s;
      y = new BigNumber2(y, b);
      b = y.s;
      if (!a || !b)
        return new BigNumber2(NaN);
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }
      var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
      if (!xe || !ye) {
        if (!xc || !yc)
          return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
        if (!xc[0] || !yc[0]) {
          return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
            // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
            ROUNDING_MODE == 3 ? -0 : 0
          ));
        }
      }
      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();
      if (a = xe - ye) {
        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }
        t.reverse();
        for (b = a; b--; t.push(0))
          ;
        t.reverse();
      } else {
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
        for (a = b = 0; b < j; b++) {
          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }
      if (xLTy)
        t = xc, xc = yc, yc = t, y.s = -y.s;
      b = (j = yc.length) - (i2 = xc.length);
      if (b > 0)
        for (; b--; xc[i2++] = 0)
          ;
      b = BASE - 1;
      for (; j > a; ) {
        if (xc[--j] < yc[j]) {
          for (i2 = j; i2 && !xc[--i2]; xc[i2] = b)
            ;
          --xc[i2];
          xc[j] += BASE;
        }
        xc[j] -= yc[j];
      }
      for (; xc[0] == 0; xc.splice(0, 1), --ye)
        ;
      if (!xc[0]) {
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }
      return normalise(y, xc, ye);
    };
    P.modulo = P.mod = function(y, b) {
      var q, s, x = this;
      y = new BigNumber2(y, b);
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber2(NaN);
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber2(x);
      }
      if (MODULO_MODE == 9) {
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }
      y = x.minus(q.times(y));
      if (!y.c[0] && MODULO_MODE == 1)
        y.s = x.s;
      return y;
    };
    P.multipliedBy = P.times = function(y, b) {
      var c, e, i2, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
      if (!xc || !yc || !xc[0] || !yc[0]) {
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;
          if (!xc || !yc) {
            y.c = y.e = null;
          } else {
            y.c = [0];
            y.e = 0;
          }
        }
        return y;
      }
      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;
      if (xcL < ycL)
        zc = xc, xc = yc, yc = zc, i2 = xcL, xcL = ycL, ycL = i2;
      for (i2 = xcL + ycL, zc = []; i2--; zc.push(0))
        ;
      base = BASE;
      sqrtBase = SQRT_BASE;
      for (i2 = ycL; --i2 >= 0; ) {
        c = 0;
        ylo = yc[i2] % sqrtBase;
        yhi = yc[i2] / sqrtBase | 0;
        for (k = xcL, j = i2 + k; j > i2; ) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }
        zc[j] = c;
      }
      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }
      return normalise(y, zc, e);
    };
    P.negated = function() {
      var x = new BigNumber2(this);
      x.s = -x.s || null;
      return x;
    };
    P.plus = function(y, b) {
      var t, x = this, a = x.s;
      y = new BigNumber2(y, b);
      b = y.s;
      if (!a || !b)
        return new BigNumber2(NaN);
      if (a != b) {
        y.s = -b;
        return x.minus(y);
      }
      var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
      if (!xe || !ye) {
        if (!xc || !yc)
          return new BigNumber2(a / 0);
        if (!xc[0] || !yc[0])
          return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
      }
      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }
        t.reverse();
        for (; a--; t.push(0))
          ;
        t.reverse();
      }
      a = xc.length;
      b = yc.length;
      if (a - b < 0)
        t = yc, yc = xc, xc = t, b = a;
      for (a = 0; b; ) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }
      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }
      return normalise(y, xc, ye);
    };
    P.precision = P.sd = function(sd, rm) {
      var c, n, v, x = this;
      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null)
          rm = ROUNDING_MODE;
        else
          intCheck(rm, 0, 8);
        return round(new BigNumber2(x), sd, rm);
      }
      if (!(c = x.c))
        return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;
      if (v = c[v]) {
        for (; v % 10 == 0; v /= 10, n--)
          ;
        for (v = c[0]; v >= 10; v /= 10, n++)
          ;
      }
      if (sd && x.e + 1 > n)
        n = x.e + 1;
      return n;
    };
    P.shiftedBy = function(k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times("1e" + k);
    };
    P.squareRoot = P.sqrt = function() {
      var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }
      s = Math.sqrt(+valueOf(x));
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0)
          n += "0";
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
        if (s == 1 / 0) {
          n = "5e" + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf("e") + 1) + e;
        }
        r = new BigNumber2(n);
      } else {
        r = new BigNumber2(s + "");
      }
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3)
          s = 0;
        for (; ; ) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));
          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
            if (r.e < e)
              --s;
            n = n.slice(s - 3, s + 1);
            if (n == "9999" || !rep && n == "4999") {
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);
                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }
              dp += 4;
              s += 4;
              rep = 1;
            } else {
              if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }
              break;
            }
          }
        }
      }
      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };
    P.toExponential = function(dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };
    P.toFixed = function(dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };
    P.toFormat = function(dp, rm, format2) {
      var str, x = this;
      if (format2 == null) {
        if (dp != null && rm && typeof rm == "object") {
          format2 = rm;
          rm = null;
        } else if (dp && typeof dp == "object") {
          format2 = dp;
          dp = rm = null;
        } else {
          format2 = FORMAT;
        }
      } else if (typeof format2 != "object") {
        throw Error(bignumberError + "Argument not an object: " + format2);
      }
      str = x.toFixed(dp, rm);
      if (x.c) {
        var i2, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len2 = intDigits.length;
        if (g2)
          i2 = g1, g1 = g2, g2 = i2, len2 -= i2;
        if (g1 > 0 && len2 > 0) {
          i2 = len2 % g1 || g1;
          intPart = intDigits.substr(0, i2);
          for (; i2 < len2; i2 += g1)
            intPart += groupSeparator + intDigits.substr(i2, g1);
          if (g2 > 0)
            intPart += groupSeparator + intDigits.slice(i2);
          if (isNeg)
            intPart = "-" + intPart;
        }
        str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
          new RegExp("\\d{" + g2 + "}\\B", "g"),
          "$&" + (format2.fractionGroupSeparator || "")
        ) : fractionPart) : intPart;
      }
      return (format2.prefix || "") + str + (format2.suffix || "");
    };
    P.toFraction = function(md) {
      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
      if (md != null) {
        n = new BigNumber2(md);
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
        }
      }
      if (!xc)
        return new BigNumber2(x);
      d = new BigNumber2(ONE);
      n1 = d0 = new BigNumber2(ONE);
      d1 = n0 = new BigNumber2(ONE);
      s = coeffToString(xc);
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber2(s);
      n0.c[0] = 0;
      for (; ; ) {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1)
          break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }
      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2;
      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
        div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
      ) < 1 ? [n1, d1] : [n0, d0];
      MAX_EXP = exp;
      return r;
    };
    P.toNumber = function() {
      return +valueOf(this);
    };
    P.toPrecision = function(sd, rm) {
      if (sd != null)
        intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };
    P.toString = function(b) {
      var str, n = this, s = n.s, e = n.e;
      if (e === null) {
        if (s) {
          str = "Infinity";
          if (s < 0)
            str = "-" + str;
        } else {
          str = "NaN";
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
        } else if (b === 10 && alphabetHasNormalDecimalDigits) {
          n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, "0");
        } else {
          intCheck(b, 2, ALPHABET2.length, "Base");
          str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
        }
        if (s < 0 && n.c[0])
          str = "-" + str;
      }
      return str;
    };
    P.valueOf = P.toJSON = function() {
      return valueOf(this);
    };
    P._isBigNumber = true;
    P[Symbol.toStringTag] = "BigNumber";
    P[Symbol.for("nodejs.util.inspect.custom")] = P.valueOf;
    if (configObject != null)
      BigNumber2.set(configObject);
    return BigNumber2;
  }
  function bitFloor(n) {
    var i2 = n | 0;
    return n > 0 || n === i2 ? i2 : i2 - 1;
  }
  function coeffToString(a) {
    var s, z, i2 = 1, j = a.length, r = a[0] + "";
    for (; i2 < j; ) {
      s = a[i2++] + "";
      z = LOG_BASE - s.length;
      for (; z--; s = "0" + s)
        ;
      r += s;
    }
    for (j = r.length; r.charCodeAt(--j) === 48; )
      ;
    return r.slice(0, j + 1 || 1);
  }
  function compare(x, y) {
    var a, b, xc = x.c, yc = y.c, i2 = x.s, j = y.s, k = x.e, l = y.e;
    if (!i2 || !j)
      return null;
    a = xc && !xc[0];
    b = yc && !yc[0];
    if (a || b)
      return a ? b ? 0 : -j : i2;
    if (i2 != j)
      return i2;
    a = i2 < 0;
    b = k == l;
    if (!xc || !yc)
      return b ? 0 : !xc ^ a ? 1 : -1;
    if (!b)
      return k > l ^ a ? 1 : -1;
    j = (k = xc.length) < (l = yc.length) ? k : l;
    for (i2 = 0; i2 < j; i2++)
      if (xc[i2] != yc[i2])
        return xc[i2] > yc[i2] ^ a ? 1 : -1;
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
    }
  }
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }
  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
  }
  function toFixedPoint(str, e, z) {
    var len2, zs;
    if (e < 0) {
      for (zs = z + "."; ++e; zs += z)
        ;
      str = zs + str;
    } else {
      len2 = str.length;
      if (++e > len2) {
        for (zs = z, e -= len2; --e; zs += z)
          ;
        str += zs;
      } else if (e < len2) {
        str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    return str;
  }
  var BigNumber = clone();
  class Encoder {
    constructor() {
      this.w = new Array();
      this.d32 = new BigNumber(4294967296);
    }
    writeByte(b) {
      this.w.push(b);
    }
    writeBytes(b) {
      this.w.push(...b);
    }
    /* tslint:disable */
    writeInt64(b) {
      const b1 = b.div(this.d32).toNumber();
      const b2 = b.mod(this.d32).toNumber();
      this.w.push(b1 >> 24 & 255);
      this.w.push(b1 >> 16 & 255);
      this.w.push(b1 >> 8 & 255);
      this.w.push(b1 & 255);
      this.w.push(b2 >> 24 & 255);
      this.w.push(b2 >> 16 & 255);
      this.w.push(b2 >> 8 & 255);
      this.w.push(b2 & 255);
    }
    writeInt32(b) {
      this.w.push(b >> 24);
      this.w.push(b >> 16);
      this.w.push(b >> 8);
      this.w.push(b & 255);
    }
    writeUint8(b) {
      this.w.push(b);
    }
    writeInt16(b) {
      this.w.push(b >> 8);
      this.w.push(b & 255);
    }
    writeString(s) {
      if (s && s.length > 0) {
        let strArray = this.stringToUint(s);
        this.writeInt16(strArray.length);
        this.w.push(...strArray);
      } else {
        this.writeInt16(0);
      }
    }
    stringToUint(str) {
      let string = unescape(encodeURIComponent(str));
      let charList = string.split("");
      let uintArray = new Array();
      for (let i2 = 0; i2 < charList.length; i2++) {
        uintArray.push(charList[i2].charCodeAt(0));
      }
      return uintArray;
    }
    toUint8Array() {
      return new Uint8Array(this.w);
    }
  }
  class Decoder {
    constructor(data) {
      this.offset = 0;
      this.data = data;
    }
    readByte() {
      const d = this.data[this.offset];
      this.offset++;
      return d;
    }
    readNum(b) {
      const data = this.data.slice(this.offset, this.offset + b);
      this.offset += b;
      let n = new BigNumber(0);
      for (let i2 = 0; i2 < data.length; i2++) {
        const d = new BigNumber(2).pow(new BigNumber((data.length - i2 - 1) * 8));
        n = n.plus(new BigNumber(data[i2]).multipliedBy(d));
      }
      return n;
    }
    // 读取64bit的int数据（js没有int64的类型，所以这里只能用字符串接受）
    readInt64() {
      return this.readNum(8);
    }
    readInt16() {
      return Number(this.readNum(2));
    }
    readInt32() {
      return Number(this.readNum(4));
    }
    readString() {
      const len2 = this.readInt16();
      if (len2 <= 0) {
        return "";
      }
      const strUint8Array = this.data.slice(this.offset, this.offset + len2);
      this.offset += len2;
      return this.uintToString(Array.from(strUint8Array));
    }
    // 读取剩余的字节
    readRemaining() {
      const data = this.data.slice(this.offset);
      this.offset = this.data.length;
      return data;
    }
    uintToString(array) {
      const encodedString = String.fromCharCode.apply(null, array);
      const decodedString = decodeURIComponent(escape(encodedString));
      return decodedString;
    }
    readVariableLength() {
      let multiplier = 0;
      let rLength = Number(0);
      while (multiplier < 27) {
        const b = this.readByte();
        rLength = rLength | (b & 127) << multiplier;
        if ((b & 128) == 0) {
          break;
        }
        multiplier += 7;
      }
      return rLength;
    }
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          var args = [null];
          args.push.apply(args, arguments);
          var Ctor = Function.bind.apply(f, args);
          return new Ctor();
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else
      a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var cryptoJsExports = {};
  var cryptoJs = {
    get exports() {
      return cryptoJsExports;
    },
    set exports(v) {
      cryptoJsExports = v;
    }
  };
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var coreExports = {};
  var core = {
    get exports() {
      return coreExports;
    },
    set exports(v) {
      coreExports = v;
    }
  };
  const __viteBrowserExternal = new Proxy({}, {
    get(_, key) {
      throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
    }
  });
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var hasRequiredCore;
  function requireCore() {
    if (hasRequiredCore)
      return coreExports;
    hasRequiredCore = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory();
        }
      })(commonjsGlobal, function() {
        var CryptoJS = CryptoJS || function(Math2, undefined$1) {
          var crypto;
          if (typeof window !== "undefined" && $inject_window_crypto) {
            crypto = $inject_window_crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto = globalThis.crypto;
          }
          if (!crypto && typeof window !== "undefined" && window.msCrypto) {
            crypto = window.msCrypto;
          }
          if (!crypto && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
            crypto = commonjsGlobal.crypto;
          }
          if (!crypto && typeof commonjsRequire === "function") {
            try {
              crypto = require$$0;
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if (typeof crypto.getRandomValues === "function") {
                try {
                  return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto.randomBytes === "function") {
                try {
                  return crypto.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = function() {
            return {
              /**
               * Creates a new object that inherits from this object.
               *
               * @param {Object} overrides Properties to copy into the new object.
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         field: 'value',
               *
               *         method: function () {
               *         }
               *     });
               */
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              /**
               * Extends this object and runs the init method.
               * Arguments to create() will be passed to init().
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var instance = MyType.create();
               */
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              /**
               * Initializes a newly created object.
               * Override this method to add some logic when your objects are created.
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         init: function () {
               *             // ...
               *         }
               *     });
               */
              init: function() {
              },
              /**
               * Copies properties into this object.
               *
               * @param {Object} properties The properties to mix in.
               *
               * @example
               *
               *     MyType.mixIn({
               *         field: 'value'
               *     });
               */
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              /**
               * Creates a copy of this object.
               *
               * @return {Object} The clone.
               *
               * @example
               *
               *     var clone = instance.clone();
               */
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$1) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i2 = 0; i2 < thatSigBytes; i2++) {
                  var thatByte = thatWords[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                  thisWords[thisSigBytes + i2 >>> 2] |= thatByte << 24 - (thisSigBytes + i2) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function() {
              var clone2 = Base.clone.call(this);
              clone2.words = this.words.slice(0);
              return clone2;
            },
            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function(nBytes) {
              var words = [];
              for (var i2 = 0; i2 < nBytes; i2 += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i2 = 0; i2 < sigBytes; i2++) {
                var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i2 = 0; i2 < hexStrLength; i2 += 2) {
                words[i2 >>> 3] |= parseInt(hexStr.substr(i2, 2), 16) << 24 - i2 % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2++) {
                var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i2 = 0; i2 < latin1StrLength; i2++) {
                words[i2 >>> 2] |= (latin1Str.charCodeAt(i2) & 255) << 24 - i2 % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function() {
              var clone2 = Base.clone.call(this);
              clone2._data = this._data.clone();
              return clone2;
            },
            _minBufferSize: 0
          });
          C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),
            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS;
      });
    })(core);
    return coreExports;
  }
  var x64CoreExports = {};
  var x64Core = {
    get exports() {
      return x64CoreExports;
    },
    set exports(v) {
      x64CoreExports = v;
    }
  };
  var hasRequiredX64Core;
  function requireX64Core() {
    if (hasRequiredX64Core)
      return x64CoreExports;
    hasRequiredX64Core = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(undefined$1) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C.x64 = {};
          C_x64.Word = Base.extend({
            /**
             * Initializes a newly created 64-bit word.
             *
             * @param {number} high The high 32 bits.
             * @param {number} low The low 32 bits.
             *
             * @example
             *
             *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
             */
            init: function(high, low) {
              this.high = high;
              this.low = low;
            }
            /**
             * Bitwise NOTs this word.
             *
             * @return {X64Word} A new x64-Word object after negating.
             *
             * @example
             *
             *     var negated = x64Word.not();
             */
            // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ANDs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to AND with this word.
             *
             * @return {X64Word} A new x64-Word object after ANDing.
             *
             * @example
             *
             *     var anded = x64Word.and(anotherX64Word);
             */
            // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to OR with this word.
             *
             * @return {X64Word} A new x64-Word object after ORing.
             *
             * @example
             *
             *     var ored = x64Word.or(anotherX64Word);
             */
            // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise XORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to XOR with this word.
             *
             * @return {X64Word} A new x64-Word object after XORing.
             *
             * @example
             *
             *     var xored = x64Word.xor(anotherX64Word);
             */
            // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the left.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftL(25);
             */
            // shiftL: function (n) {
            // if (n < 32) {
            // var high = (this.high << n) | (this.low >>> (32 - n));
            // var low = this.low << n;
            // } else {
            // var high = this.low << (n - 32);
            // var low = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the right.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftR(7);
             */
            // shiftR: function (n) {
            // if (n < 32) {
            // var low = (this.low >>> n) | (this.high << (32 - n));
            // var high = this.high >>> n;
            // } else {
            // var low = this.high >>> (n - 32);
            // var high = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Rotates this word n bits to the left.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotL(25);
             */
            // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
            // },
            /**
             * Rotates this word n bits to the right.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotR(7);
             */
            // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
            // },
            /**
             * Adds this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to add with this word.
             *
             * @return {X64Word} A new x64-Word object after adding.
             *
             * @example
             *
             *     var added = x64Word.add(anotherX64Word);
             */
            // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;
            // return X64Word.create(high, low);
            // }
          });
          C_x64.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.x64.WordArray.create();
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ]);
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ], 10);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$1) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            /**
             * Converts this 64-bit word array to a 32-bit word array.
             *
             * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
             *
             * @example
             *
             *     var x32WordArray = x64WordArray.toX32();
             */
            toX32: function() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i2 = 0; i2 < x64WordsLength; i2++) {
                var x64Word = x64Words[i2];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {X64WordArray} The clone.
             *
             * @example
             *
             *     var clone = x64WordArray.clone();
             */
            clone: function() {
              var clone2 = Base.clone.call(this);
              var words = clone2.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i2 = 0; i2 < wordsLength; i2++) {
                words[i2] = words[i2].clone();
              }
              return clone2;
            }
          });
        })();
        return CryptoJS;
      });
    })(x64Core);
    return x64CoreExports;
  }
  var libTypedarraysExports = {};
  var libTypedarrays = {
    get exports() {
      return libTypedarraysExports;
    },
    set exports(v) {
      libTypedarraysExports = v;
    }
  };
  var hasRequiredLibTypedarrays;
  function requireLibTypedarrays() {
    if (hasRequiredLibTypedarrays)
      return libTypedarraysExports;
    hasRequiredLibTypedarrays = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          if (typeof ArrayBuffer != "function") {
            return;
          }
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var superInit = WordArray.init;
          var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
              typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
              typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
              var typedArrayByteLength = typedArray.byteLength;
              var words = [];
              for (var i2 = 0; i2 < typedArrayByteLength; i2++) {
                words[i2 >>> 2] |= typedArray[i2] << 24 - i2 % 4 * 8;
              }
              superInit.call(this, words, typedArrayByteLength);
            } else {
              superInit.apply(this, arguments);
            }
          };
          subInit.prototype = WordArray;
        })();
        return CryptoJS.lib.WordArray;
      });
    })(libTypedarrays);
    return libTypedarraysExports;
  }
  var encUtf16Exports = {};
  var encUtf16 = {
    get exports() {
      return encUtf16Exports;
    },
    set exports(v) {
      encUtf16Exports = v;
    }
  };
  var hasRequiredEncUtf16;
  function requireEncUtf16() {
    if (hasRequiredEncUtf16)
      return encUtf16Exports;
    hasRequiredEncUtf16 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Utf16 = C_enc.Utf16BE = {
            /**
             * Converts a word array to a UTF-16 BE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 BE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 2) {
                var codePoint = words[i2 >>> 2] >>> 16 - i2 % 4 * 8 & 65535;
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 BE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 BE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i2 = 0; i2 < utf16StrLength; i2++) {
                words[i2 >>> 1] |= utf16Str.charCodeAt(i2) << 16 - i2 % 2 * 16;
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          C_enc.Utf16LE = {
            /**
             * Converts a word array to a UTF-16 LE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 LE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 2) {
                var codePoint = swapEndian(words[i2 >>> 2] >>> 16 - i2 % 4 * 8 & 65535);
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 LE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 LE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i2 = 0; i2 < utf16StrLength; i2++) {
                words[i2 >>> 1] |= swapEndian(utf16Str.charCodeAt(i2) << 16 - i2 % 2 * 16);
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
          }
        })();
        return CryptoJS.enc.Utf16;
      });
    })(encUtf16);
    return encUtf16Exports;
  }
  var encBase64Exports = {};
  var encBase64 = {
    get exports() {
      return encBase64Exports;
    },
    set exports(v) {
      encBase64Exports = v;
    }
  };
  var hasRequiredEncBase64;
  function requireEncBase64() {
    if (hasRequiredEncBase64)
      return encBase64Exports;
    hasRequiredEncBase64 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 3) {
                var byte1 = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                var byte2 = words[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255;
                var byte3 = words[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i2 + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i2 = 0; i2 < base64StrLength; i2++) {
              if (i2 % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i2 - 1)] << i2 % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i2)] >>> 6 - i2 % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64;
      });
    })(encBase64);
    return encBase64Exports;
  }
  var encBase64urlExports = {};
  var encBase64url = {
    get exports() {
      return encBase64urlExports;
    },
    set exports(v) {
      encBase64urlExports = v;
    }
  };
  var hasRequiredEncBase64url;
  function requireEncBase64url() {
    if (hasRequiredEncBase64url)
      return encBase64urlExports;
    hasRequiredEncBase64url = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Base64url = {
            /**
             * Converts a word array to a Base64url string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {string} The Base64url string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
             */
            stringify: function(wordArray, urlSafe = true) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = urlSafe ? this._safe_map : this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 3) {
                var byte1 = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                var byte2 = words[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255;
                var byte3 = words[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i2 + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64url string to a word array.
             *
             * @param {string} base64Str The Base64url string.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
             */
            parse: function(base64Str, urlSafe = true) {
              var base64StrLength = base64Str.length;
              var map = urlSafe ? this._safe_map : this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i2 = 0; i2 < base64StrLength; i2++) {
              if (i2 % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i2 - 1)] << i2 % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i2)] >>> 6 - i2 % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64url;
      });
    })(encBase64url);
    return encBase64urlExports;
  }
  var md5Exports = {};
  var md5 = {
    get exports() {
      return md5Exports;
    },
    set exports(v) {
      md5Exports = v;
    }
  };
  var hasRequiredMd5;
  function requireMd5() {
    if (hasRequiredMd5)
      return md5Exports;
    hasRequiredMd5 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var T = [];
          (function() {
            for (var i2 = 0; i2 < 64; i2++) {
              T[i2] = Math2.abs(Math2.sin(i2 + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function(M2, offset) {
              for (var i2 = 0; i2 < 16; i2++) {
                var offset_i = offset + i2;
                var M_offset_i = M2[offset_i];
                M2[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var M_offset_0 = M2[offset + 0];
              var M_offset_1 = M2[offset + 1];
              var M_offset_2 = M2[offset + 2];
              var M_offset_3 = M2[offset + 3];
              var M_offset_4 = M2[offset + 4];
              var M_offset_5 = M2[offset + 5];
              var M_offset_6 = M2[offset + 6];
              var M_offset_7 = M2[offset + 7];
              var M_offset_8 = M2[offset + 8];
              var M_offset_9 = M2[offset + 9];
              var M_offset_10 = M2[offset + 10];
              var M_offset_11 = M2[offset + 11];
              var M_offset_12 = M2[offset + 12];
              var M_offset_13 = M2[offset + 13];
              var M_offset_14 = M2[offset + 14];
              var M_offset_15 = M2[offset + 15];
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              a = FF(a, b, c, d, M_offset_0, 7, T[0]);
              d = FF(d, a, b, c, M_offset_1, 12, T[1]);
              c = FF(c, d, a, b, M_offset_2, 17, T[2]);
              b = FF(b, c, d, a, M_offset_3, 22, T[3]);
              a = FF(a, b, c, d, M_offset_4, 7, T[4]);
              d = FF(d, a, b, c, M_offset_5, 12, T[5]);
              c = FF(c, d, a, b, M_offset_6, 17, T[6]);
              b = FF(b, c, d, a, M_offset_7, 22, T[7]);
              a = FF(a, b, c, d, M_offset_8, 7, T[8]);
              d = FF(d, a, b, c, M_offset_9, 12, T[9]);
              c = FF(c, d, a, b, M_offset_10, 17, T[10]);
              b = FF(b, c, d, a, M_offset_11, 22, T[11]);
              a = FF(a, b, c, d, M_offset_12, 7, T[12]);
              d = FF(d, a, b, c, M_offset_13, 12, T[13]);
              c = FF(c, d, a, b, M_offset_14, 17, T[14]);
              b = FF(b, c, d, a, M_offset_15, 22, T[15]);
              a = GG(a, b, c, d, M_offset_1, 5, T[16]);
              d = GG(d, a, b, c, M_offset_6, 9, T[17]);
              c = GG(c, d, a, b, M_offset_11, 14, T[18]);
              b = GG(b, c, d, a, M_offset_0, 20, T[19]);
              a = GG(a, b, c, d, M_offset_5, 5, T[20]);
              d = GG(d, a, b, c, M_offset_10, 9, T[21]);
              c = GG(c, d, a, b, M_offset_15, 14, T[22]);
              b = GG(b, c, d, a, M_offset_4, 20, T[23]);
              a = GG(a, b, c, d, M_offset_9, 5, T[24]);
              d = GG(d, a, b, c, M_offset_14, 9, T[25]);
              c = GG(c, d, a, b, M_offset_3, 14, T[26]);
              b = GG(b, c, d, a, M_offset_8, 20, T[27]);
              a = GG(a, b, c, d, M_offset_13, 5, T[28]);
              d = GG(d, a, b, c, M_offset_2, 9, T[29]);
              c = GG(c, d, a, b, M_offset_7, 14, T[30]);
              b = GG(b, c, d, a, M_offset_12, 20, T[31]);
              a = HH(a, b, c, d, M_offset_5, 4, T[32]);
              d = HH(d, a, b, c, M_offset_8, 11, T[33]);
              c = HH(c, d, a, b, M_offset_11, 16, T[34]);
              b = HH(b, c, d, a, M_offset_14, 23, T[35]);
              a = HH(a, b, c, d, M_offset_1, 4, T[36]);
              d = HH(d, a, b, c, M_offset_4, 11, T[37]);
              c = HH(c, d, a, b, M_offset_7, 16, T[38]);
              b = HH(b, c, d, a, M_offset_10, 23, T[39]);
              a = HH(a, b, c, d, M_offset_13, 4, T[40]);
              d = HH(d, a, b, c, M_offset_0, 11, T[41]);
              c = HH(c, d, a, b, M_offset_3, 16, T[42]);
              b = HH(b, c, d, a, M_offset_6, 23, T[43]);
              a = HH(a, b, c, d, M_offset_9, 4, T[44]);
              d = HH(d, a, b, c, M_offset_12, 11, T[45]);
              c = HH(c, d, a, b, M_offset_15, 16, T[46]);
              b = HH(b, c, d, a, M_offset_2, 23, T[47]);
              a = II(a, b, c, d, M_offset_0, 6, T[48]);
              d = II(d, a, b, c, M_offset_7, 10, T[49]);
              c = II(c, d, a, b, M_offset_14, 15, T[50]);
              b = II(b, c, d, a, M_offset_5, 21, T[51]);
              a = II(a, b, c, d, M_offset_12, 6, T[52]);
              d = II(d, a, b, c, M_offset_3, 10, T[53]);
              c = II(c, d, a, b, M_offset_10, 15, T[54]);
              b = II(b, c, d, a, M_offset_1, 21, T[55]);
              a = II(a, b, c, d, M_offset_8, 6, T[56]);
              d = II(d, a, b, c, M_offset_15, 10, T[57]);
              c = II(c, d, a, b, M_offset_6, 15, T[58]);
              b = II(b, c, d, a, M_offset_13, 21, T[59]);
              a = II(a, b, c, d, M_offset_4, 6, T[60]);
              d = II(d, a, b, c, M_offset_11, 10, T[61]);
              c = II(c, d, a, b, M_offset_2, 15, T[62]);
              b = II(b, c, d, a, M_offset_9, 21, T[63]);
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i2 = 0; i2 < 4; i2++) {
                var H_i = H[i2];
                H[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          C.MD5 = Hasher._createHelper(MD5);
          C.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS.MD5;
      });
    })(md5);
    return md5Exports;
  }
  var sha1Exports = {};
  var sha1 = {
    get exports() {
      return sha1Exports;
    },
    set exports(v) {
      sha1Exports = v;
    }
  };
  var hasRequiredSha1;
  function requireSha1() {
    if (hasRequiredSha1)
      return sha1Exports;
    hasRequiredSha1 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function(M2, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i2 = 0; i2 < 80; i2++) {
                if (i2 < 16) {
                  W[i2] = M2[offset + i2] | 0;
                } else {
                  var n = W[i2 - 3] ^ W[i2 - 8] ^ W[i2 - 14] ^ W[i2 - 16];
                  W[i2] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i2];
                if (i2 < 20) {
                  t += (b & c | ~b & d) + 1518500249;
                } else if (i2 < 40) {
                  t += (b ^ c ^ d) + 1859775393;
                } else if (i2 < 60) {
                  t += (b & c | b & d | c & d) - 1894007588;
                } else {
                  t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS.SHA1;
      });
    })(sha1);
    return sha1Exports;
  }
  var sha256Exports = {};
  var sha256 = {
    get exports() {
      return sha256Exports;
    },
    set exports(v) {
      sha256Exports = v;
    }
  };
  var hasRequiredSha256;
  function requireSha256() {
    if (hasRequiredSha256)
      return sha256Exports;
    hasRequiredSha256 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H = [];
          var K2 = [];
          (function() {
            function isPrime(n2) {
              var sqrtN = Math2.sqrt(n2);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n2 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n2) {
              return (n2 - (n2 | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                }
                K2[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                nPrime++;
              }
              n++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M2, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e = H2[4];
              var f = H2[5];
              var g = H2[6];
              var h = H2[7];
              for (var i2 = 0; i2 < 64; i2++) {
                if (i2 < 16) {
                  W[i2] = M2[offset + i2] | 0;
                } else {
                  var gamma0x = W[i2 - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i2 - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i2] = gamma0 + W[i2 - 7] + gamma1 + W[i2 - 16];
                }
                var ch = e & f ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h + sigma1 + ch + K2[i2] + W[i2];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e | 0;
              H2[5] = H2[5] + f | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS.SHA256;
      });
    })(sha256);
    return sha256Exports;
  }
  var sha224Exports = {};
  var sha224 = {
    get exports() {
      return sha224Exports;
    },
    set exports(v) {
      sha224Exports = v;
    }
  };
  var hasRequiredSha224;
  function requireSha224() {
    if (hasRequiredSha224)
      return sha224Exports;
    hasRequiredSha224 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha256());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function() {
              var hash = SHA256._doFinalize.call(this);
              hash.sigBytes -= 4;
              return hash;
            }
          });
          C.SHA224 = SHA256._createHelper(SHA224);
          C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS.SHA224;
      });
    })(sha224);
    return sha224Exports;
  }
  var sha512Exports = {};
  var sha512 = {
    get exports() {
      return sha512Exports;
    },
    set exports(v) {
      sha512Exports = v;
    }
  };
  var hasRequiredSha512;
  function requireSha512() {
    if (hasRequiredSha512)
      return sha512Exports;
    hasRequiredSha512 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K2 = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W = [];
          (function() {
            for (var i2 = 0; i2 < 80; i2++) {
              W[i2] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function(M2, offset) {
              var H = this._hash.words;
              var H0 = H[0];
              var H1 = H[1];
              var H2 = H[2];
              var H3 = H[3];
              var H4 = H[4];
              var H5 = H[5];
              var H6 = H[6];
              var H7 = H[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H2.high;
              var H2l = H2.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i2 = 0; i2 < 80; i2++) {
                var Wil;
                var Wih;
                var Wi = W[i2];
                if (i2 < 16) {
                  Wih = Wi.high = M2[offset + i2 * 2] | 0;
                  Wil = Wi.low = M2[offset + i2 * 2 + 1] | 0;
                } else {
                  var gamma0x = W[i2 - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W[i2 - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W[i2 - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W[i2 - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  Wil = gamma0l + Wi7l;
                  Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  Wil = Wil + gamma1l;
                  Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  Wil = Wil + Wi16l;
                  Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K2[i2];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H2.low = H2l + cl;
              H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash = this._hash.toX32();
              return hash;
            },
            clone: function() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            },
            blockSize: 1024 / 32
          });
          C.SHA512 = Hasher._createHelper(SHA512);
          C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS.SHA512;
      });
    })(sha512);
    return sha512Exports;
  }
  var sha384Exports = {};
  var sha384 = {
    get exports() {
      return sha384Exports;
    },
    set exports(v) {
      sha384Exports = v;
    }
  };
  var hasRequiredSha384;
  function requireSha384() {
    if (hasRequiredSha384)
      return sha384Exports;
    hasRequiredSha384 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core(), requireSha512());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function() {
              var hash = SHA512._doFinalize.call(this);
              hash.sigBytes -= 16;
              return hash;
            }
          });
          C.SHA384 = SHA512._createHelper(SHA384);
          C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS.SHA384;
      });
    })(sha384);
    return sha384Exports;
  }
  var sha3Exports = {};
  var sha3 = {
    get exports() {
      return sha3Exports;
    },
    set exports(v) {
      sha3Exports = v;
    }
  };
  var hasRequiredSha3;
  function requireSha3() {
    if (hasRequiredSha3)
      return sha3Exports;
    hasRequiredSha3 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var C_algo = C.algo;
          var RHO_OFFSETS = [];
          var PI_INDEXES = [];
          var ROUND_CONSTANTS = [];
          (function() {
            var x = 1, y = 0;
            for (var t = 0; t < 24; t++) {
              RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
              var newX = y % 5;
              var newY = (2 * x + 3 * y) % 5;
              x = newX;
              y = newY;
            }
            for (var x = 0; x < 5; x++) {
              for (var y = 0; y < 5; y++) {
                PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
              }
            }
            var LFSR = 1;
            for (var i2 = 0; i2 < 24; i2++) {
              var roundConstantMsw = 0;
              var roundConstantLsw = 0;
              for (var j = 0; j < 7; j++) {
                if (LFSR & 1) {
                  var bitPosition = (1 << j) - 1;
                  if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                  } else {
                    roundConstantMsw ^= 1 << bitPosition - 32;
                  }
                }
                if (LFSR & 128) {
                  LFSR = LFSR << 1 ^ 113;
                } else {
                  LFSR <<= 1;
                }
              }
              ROUND_CONSTANTS[i2] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
          })();
          var T = [];
          (function() {
            for (var i2 = 0; i2 < 25; i2++) {
              T[i2] = X64Word.create();
            }
          })();
          var SHA3 = C_algo.SHA3 = Hasher.extend({
            /**
             * Configuration options.
             *
             * @property {number} outputLength
             *   The desired number of bits in the output hash.
             *   Only values permitted are: 224, 256, 384, 512.
             *   Default: 512
             */
            cfg: Hasher.cfg.extend({
              outputLength: 512
            }),
            _doReset: function() {
              var state = this._state = [];
              for (var i2 = 0; i2 < 25; i2++) {
                state[i2] = new X64Word.init();
              }
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M2, offset) {
              var state = this._state;
              var nBlockSizeLanes = this.blockSize / 2;
              for (var i2 = 0; i2 < nBlockSizeLanes; i2++) {
                var M2i = M2[offset + 2 * i2];
                var M2i1 = M2[offset + 2 * i2 + 1];
                M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                var lane = state[i2];
                lane.high ^= M2i1;
                lane.low ^= M2i;
              }
              for (var round = 0; round < 24; round++) {
                for (var x = 0; x < 5; x++) {
                  var tMsw = 0, tLsw = 0;
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                  }
                  var Tx = T[x];
                  Tx.high = tMsw;
                  Tx.low = tLsw;
                }
                for (var x = 0; x < 5; x++) {
                  var Tx4 = T[(x + 4) % 5];
                  var Tx1 = T[(x + 1) % 5];
                  var Tx1Msw = Tx1.high;
                  var Tx1Lsw = Tx1.low;
                  var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                  var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                  }
                }
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                  var tMsw;
                  var tLsw;
                  var lane = state[laneIndex];
                  var laneMsw = lane.high;
                  var laneLsw = lane.low;
                  var rhoOffset = RHO_OFFSETS[laneIndex];
                  if (rhoOffset < 32) {
                    tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                    tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                  } else {
                    tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                    tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                  }
                  var TPiLane = T[PI_INDEXES[laneIndex]];
                  TPiLane.high = tMsw;
                  TPiLane.low = tLsw;
                }
                var T0 = T[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;
                for (var x = 0; x < 5; x++) {
                  for (var y = 0; y < 5; y++) {
                    var laneIndex = x + 5 * y;
                    var lane = state[laneIndex];
                    var TLane = T[laneIndex];
                    var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                    var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                  }
                }
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
              }
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              var blockSizeBits = this.blockSize * 32;
              dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
              dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var state = this._state;
              var outputLengthBytes = this.cfg.outputLength / 8;
              var outputLengthLanes = outputLengthBytes / 8;
              var hashWords = [];
              for (var i2 = 0; i2 < outputLengthLanes; i2++) {
                var lane = state[i2];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
              }
              return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
              var clone2 = Hasher.clone.call(this);
              var state = clone2._state = this._state.slice(0);
              for (var i2 = 0; i2 < 25; i2++) {
                state[i2] = state[i2].clone();
              }
              return clone2;
            }
          });
          C.SHA3 = Hasher._createHelper(SHA3);
          C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
        })(Math);
        return CryptoJS.SHA3;
      });
    })(sha3);
    return sha3Exports;
  }
  var ripemd160Exports = {};
  var ripemd160 = {
    get exports() {
      return ripemd160Exports;
    },
    set exports(v) {
      ripemd160Exports = v;
    }
  };
  var hasRequiredRipemd160;
  function requireRipemd160() {
    if (hasRequiredRipemd160)
      return ripemd160Exports;
    hasRequiredRipemd160 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        /** @preserve
            			(c) 2012 by Cédric Mesnil. All rights reserved.
        
            			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
        
            			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
            			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
        
            			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
            			*/
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
              this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(M2, offset) {
              for (var i2 = 0; i2 < 16; i2++) {
                var offset_i = offset + i2;
                var M_offset_i = M2[offset_i];
                M2[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H[0];
              br = bl = H[1];
              cr = cl = H[2];
              dr = dl = H[3];
              er = el = H[4];
              var t;
              for (var i2 = 0; i2 < 80; i2 += 1) {
                t = al + M2[offset + zl[i2]] | 0;
                if (i2 < 16) {
                  t += f1(bl, cl, dl) + hl[0];
                } else if (i2 < 32) {
                  t += f2(bl, cl, dl) + hl[1];
                } else if (i2 < 48) {
                  t += f3(bl, cl, dl) + hl[2];
                } else if (i2 < 64) {
                  t += f4(bl, cl, dl) + hl[3];
                } else {
                  t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl(t, sl[i2]);
                t = t + el | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t;
                t = ar + M2[offset + zr[i2]] | 0;
                if (i2 < 16) {
                  t += f5(br, cr, dr) + hr[0];
                } else if (i2 < 32) {
                  t += f4(br, cr, dr) + hr[1];
                } else if (i2 < 48) {
                  t += f3(br, cr, dr) + hr[2];
                } else if (i2 < 64) {
                  t += f2(br, cr, dr) + hr[3];
                } else {
                  t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl(t, sr[i2]);
                t = t + er | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t;
              }
              t = H[1] + cl + dr | 0;
              H[1] = H[2] + dl + er | 0;
              H[2] = H[3] + el + ar | 0;
              H[3] = H[4] + al + br | 0;
              H[4] = H[0] + bl + cr | 0;
              H[0] = t;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i2 = 0; i2 < 5; i2++) {
                var H_i = H[i2];
                H[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          function f1(x, y, z) {
            return x ^ y ^ z;
          }
          function f2(x, y, z) {
            return x & y | ~x & z;
          }
          function f3(x, y, z) {
            return (x | ~y) ^ z;
          }
          function f4(x, y, z) {
            return x & z | y & ~z;
          }
          function f5(x, y, z) {
            return x ^ (y | ~z);
          }
          function rotl(x, n) {
            return x << n | x >>> 32 - n;
          }
          C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })();
        return CryptoJS.RIPEMD160;
      });
    })(ripemd160);
    return ripemd160Exports;
  }
  var hmacExports = {};
  var hmac = {
    get exports() {
      return hmacExports;
    },
    set exports(v) {
      hmacExports = v;
    }
  };
  var hasRequiredHmac;
  function requireHmac() {
    if (hasRequiredHmac)
      return hmacExports;
    hasRequiredHmac = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          C_algo.HMAC = Base.extend({
            /**
             * Initializes a newly created HMAC.
             *
             * @param {Hasher} hasher The hash algorithm to use.
             * @param {WordArray|string} key The secret key.
             *
             * @example
             *
             *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
             */
            init: function(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i2 = 0; i2 < hasherBlockSize; i2++) {
                oKeyWords[i2] ^= 1549556828;
                iKeyWords[i2] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            /**
             * Resets this HMAC to its initial state.
             *
             * @example
             *
             *     hmacHasher.reset();
             */
            reset: function() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            /**
             * Updates this HMAC with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {HMAC} This HMAC instance.
             *
             * @example
             *
             *     hmacHasher.update('message');
             *     hmacHasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            /**
             * Finalizes the HMAC computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The HMAC.
             *
             * @example
             *
             *     var hmac = hmacHasher.finalize();
             *     var hmac = hmacHasher.finalize('message');
             *     var hmac = hmacHasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac2;
            }
          });
        })();
      });
    })(hmac);
    return hmacExports;
  }
  var pbkdf2Exports = {};
  var pbkdf2 = {
    get exports() {
      return pbkdf2Exports;
    },
    set exports(v) {
      pbkdf2Exports = v;
    }
  };
  var hasRequiredPbkdf2;
  function requirePbkdf2() {
    if (hasRequiredPbkdf2)
      return pbkdf2Exports;
    hasRequiredPbkdf2 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA1 = C_algo.SHA1;
          var HMAC = C_algo.HMAC;
          var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hasher to use. Default: SHA1
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: SHA1,
              iterations: 1
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.PBKDF2.create();
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Computes the Password-Based Key Derivation Function 2.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var cfg = this.cfg;
              var hmac2 = HMAC.create(cfg.hasher, password);
              var derivedKey = WordArray.create();
              var blockIndex = WordArray.create([1]);
              var derivedKeyWords = derivedKey.words;
              var blockIndexWords = blockIndex.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                var block = hmac2.update(salt).finalize(blockIndex);
                hmac2.reset();
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;
                var intermediate = block;
                for (var i2 = 1; i2 < iterations; i2++) {
                  intermediate = hmac2.finalize(intermediate);
                  hmac2.reset();
                  var intermediateWords = intermediate.words;
                  for (var j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                  }
                }
                derivedKey.concat(block);
                blockIndexWords[0]++;
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS.PBKDF2;
      });
    })(pbkdf2);
    return pbkdf2Exports;
  }
  var evpkdfExports = {};
  var evpkdf = {
    get exports() {
      return evpkdfExports;
    },
    set exports(v) {
      evpkdfExports = v;
    }
  };
  var hasRequiredEvpkdf;
  function requireEvpkdf() {
    if (hasRequiredEvpkdf)
      return evpkdfExports;
    hasRequiredEvpkdf = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hash algorithm to use. Default: MD5
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.EvpKDF.create();
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Derives a key from a password.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var block;
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i2 = 1; i2 < iterations; i2++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS.EvpKDF;
      });
    })(evpkdf);
    return evpkdfExports;
  }
  var cipherCoreExports = {};
  var cipherCore = {
    get exports() {
      return cipherCoreExports;
    },
    set exports(v) {
      cipherCoreExports = v;
    }
  };
  var hasRequiredCipherCore;
  function requireCipherCore() {
    if (hasRequiredCipherCore)
      return cipherCoreExports;
    hasRequiredCipherCore = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEvpkdf());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.lib.Cipher || function(undefined$1) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C.enc;
          C_enc.Utf8;
          var Base64 = C_enc.Base64;
          var C_algo = C.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             *
             * @property {WordArray} iv The IV to use for this operation.
             */
            cfg: Base.extend(),
            /**
             * Creates this cipher in encryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
             */
            createEncryptor: function(key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            /**
             * Creates this cipher in decryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
             */
            createDecryptor: function(key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            /**
             * Initializes a newly created cipher.
             *
             * @param {number} xformMode Either the encryption or decryption transormation mode constant.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
             */
            init: function(xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            /**
             * Resets this cipher to its initial state.
             *
             * @example
             *
             *     cipher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Adds data to be encrypted or decrypted.
             *
             * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
             *
             * @return {WordArray} The data after processing.
             *
             * @example
             *
             *     var encrypted = cipher.process('data');
             *     var encrypted = cipher.process(wordArray);
             */
            process: function(dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            /**
             * Finalizes the encryption or decryption process.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
             *
             * @return {WordArray} The data after final processing.
             *
             * @example
             *
             *     var encrypted = cipher.finalize();
             *     var encrypted = cipher.finalize('data');
             *     var encrypted = cipher.finalize(wordArray);
             */
            finalize: function(dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            /**
             * Creates shortcut functions to a cipher's object interface.
             *
             * @param {Cipher} cipher The cipher to create a helper for.
             *
             * @return {Object} An object with encrypt and decrypt shortcut functions.
             *
             * @static
             *
             * @example
             *
             *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
             */
            _createHelper: function() {
              function selectCipherStrategy(key) {
                if (typeof key == "string") {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function(cipher) {
                return {
                  encrypt: function(message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function(ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            }()
          });
          C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
              var finalProcessedBlocks = this._process(true);
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
             * Creates this mode for encryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
             */
            createEncryptor: function(cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            /**
             * Creates this mode for decryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
             */
            createDecryptor: function(cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            /**
             * Initializes a newly created mode.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
             */
            init: function(cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = function() {
            var CBC2 = BlockCipherMode.extend();
            CBC2.Encryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC2.Decryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var block;
              var iv = this._iv;
              if (iv) {
                block = iv;
                this._iv = undefined$1;
              } else {
                block = this._prevBlock;
              }
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= block[i2];
              }
            }
            return CBC2;
          }();
          var C_pad = C.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            /**
             * Pads data using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to pad.
             * @param {number} blockSize The multiple that the data should be padded to.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
             */
            pad: function(data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i2 = 0; i2 < nPaddingBytes; i2 += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            /**
             * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to unpad.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.unpad(wordArray);
             */
            unpad: function(data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
              data.sigBytes -= nPaddingBytes;
            }
          };
          C_lib.BlockCipher = Cipher.extend({
            /**
             * Configuration options.
             *
             * @property {Mode} mode The block mode to use. Default: CBC
             * @property {Padding} padding The padding strategy to use. Default: Pkcs7
             */
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function() {
              var modeCreator;
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
              } else {
                modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function(words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
              var finalProcessedBlocks;
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                finalProcessedBlocks = this._process(true);
              } else {
                finalProcessedBlocks = this._process(true);
                padding.unpad(finalProcessedBlocks);
              }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            /**
             * Initializes a newly created cipher params object.
             *
             * @param {Object} cipherParams An object with any of the possible cipher parameters.
             *
             * @example
             *
             *     var cipherParams = CryptoJS.lib.CipherParams.create({
             *         ciphertext: ciphertextWordArray,
             *         key: keyWordArray,
             *         iv: ivWordArray,
             *         salt: saltWordArray,
             *         algorithm: CryptoJS.algo.AES,
             *         mode: CryptoJS.mode.CBC,
             *         padding: CryptoJS.pad.PKCS7,
             *         blockSize: 4,
             *         formatter: CryptoJS.format.OpenSSL
             *     });
             */
            init: function(cipherParams) {
              this.mixIn(cipherParams);
            },
            /**
             * Converts this cipher params object to a string.
             *
             * @param {Format} formatter (Optional) The formatting strategy to use.
             *
             * @return {string} The stringified cipher params.
             *
             * @throws Error If neither the formatter nor the default formatter is set.
             *
             * @example
             *
             *     var string = cipherParams + '';
             *     var string = cipherParams.toString();
             *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
             */
            toString: function(formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            /**
             * Converts a cipher params object to an OpenSSL-compatible string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The OpenSSL-compatible string.
             *
             * @static
             *
             * @example
             *
             *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              var wordArray;
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
              } else {
                wordArray = ciphertext;
              }
              return wordArray.toString(Base64);
            },
            /**
             * Converts an OpenSSL-compatible string to a cipher params object.
             *
             * @param {string} openSSLStr The OpenSSL-compatible string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
             */
            parse: function(openSSLStr) {
              var salt;
              var ciphertext = Base64.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({ ciphertext, salt });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
             * Configuration options.
             *
             * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
             */
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            /**
             * Encrypts a message.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext,
                key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            /**
             * Decrypts serialized ciphertext.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            /**
             * Converts serialized ciphertext to CipherParams,
             * else assumed CipherParams already and returns ciphertext unchanged.
             *
             * @param {CipherParams|string} ciphertext The ciphertext.
             * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
             *
             * @return {CipherParams} The unserialized ciphertext.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
             */
            _parse: function(ciphertext, format) {
              if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
             * Derives a key and IV from a password.
             *
             * @param {string} password The password to derive from.
             * @param {number} keySize The size in words of the key to generate.
             * @param {number} ivSize The size in words of the IV to generate.
             * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
             *
             * @return {CipherParams} A cipher params object with the key, IV, and salt.
             *
             * @static
             *
             * @example
             *
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
             */
            execute: function(password, keySize, ivSize, salt) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({ key, iv, salt });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
             * Configuration options.
             *
             * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
             */
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            /**
             * Encrypts a message using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            /**
             * Decrypts serialized ciphertext using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        }();
      });
    })(cipherCore);
    return cipherCoreExports;
  }
  var modeCfbExports = {};
  var modeCfb = {
    get exports() {
      return modeCfbExports;
    },
    set exports(v) {
      modeCfbExports = v;
    }
  };
  var hasRequiredModeCfb;
  function requireModeCfb() {
    if (hasRequiredModeCfb)
      return modeCfbExports;
    hasRequiredModeCfb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.CFB = function() {
          var CFB = CryptoJS.lib.BlockCipherMode.extend();
          CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = thisBlock;
            }
          });
          function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var keystream;
            var iv = this._iv;
            if (iv) {
              keystream = iv.slice(0);
              this._iv = void 0;
            } else {
              keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i2 = 0; i2 < blockSize; i2++) {
              words[offset + i2] ^= keystream[i2];
            }
          }
          return CFB;
        }();
        return CryptoJS.mode.CFB;
      });
    })(modeCfb);
    return modeCfbExports;
  }
  var modeCtrExports = {};
  var modeCtr = {
    get exports() {
      return modeCtrExports;
    },
    set exports(v) {
      modeCtrExports = v;
    }
  };
  var hasRequiredModeCtr;
  function requireModeCtr() {
    if (hasRequiredModeCtr)
      return modeCtrExports;
    hasRequiredModeCtr = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.CTR = function() {
          var CTR = CryptoJS.lib.BlockCipherMode.extend();
          var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= keystream[i2];
              }
            }
          });
          CTR.Decryptor = Encryptor;
          return CTR;
        }();
        return CryptoJS.mode.CTR;
      });
    })(modeCtr);
    return modeCtrExports;
  }
  var modeCtrGladmanExports = {};
  var modeCtrGladman = {
    get exports() {
      return modeCtrGladmanExports;
    },
    set exports(v) {
      modeCtrGladmanExports = v;
    }
  };
  var hasRequiredModeCtrGladman;
  function requireModeCtrGladman() {
    if (hasRequiredModeCtrGladman)
      return modeCtrGladmanExports;
    hasRequiredModeCtrGladman = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        /** @preserve
         * Counter block mode compatible with  Dr Brian Gladman fileenc.c
         * derived from CryptoJS.mode.CTR
         * Jan Hruby jhruby.web@gmail.com
         */
        CryptoJS.mode.CTRGladman = function() {
          var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
          function incWord(word) {
            if ((word >> 24 & 255) === 255) {
              var b1 = word >> 16 & 255;
              var b2 = word >> 8 & 255;
              var b3 = word & 255;
              if (b1 === 255) {
                b1 = 0;
                if (b2 === 255) {
                  b2 = 0;
                  if (b3 === 255) {
                    b3 = 0;
                  } else {
                    ++b3;
                  }
                } else {
                  ++b2;
                }
              } else {
                ++b1;
              }
              word = 0;
              word += b1 << 16;
              word += b2 << 8;
              word += b3;
            } else {
              word += 1 << 24;
            }
            return word;
          }
          function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
              counter[1] = incWord(counter[1]);
            }
            return counter;
          }
          var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              incCounter(counter);
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= keystream[i2];
              }
            }
          });
          CTRGladman.Decryptor = Encryptor;
          return CTRGladman;
        }();
        return CryptoJS.mode.CTRGladman;
      });
    })(modeCtrGladman);
    return modeCtrGladmanExports;
  }
  var modeOfbExports = {};
  var modeOfb = {
    get exports() {
      return modeOfbExports;
    },
    set exports(v) {
      modeOfbExports = v;
    }
  };
  var hasRequiredModeOfb;
  function requireModeOfb() {
    if (hasRequiredModeOfb)
      return modeOfbExports;
    hasRequiredModeOfb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.OFB = function() {
          var OFB = CryptoJS.lib.BlockCipherMode.extend();
          var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var keystream = this._keystream;
              if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = void 0;
              }
              cipher.encryptBlock(keystream, 0);
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= keystream[i2];
              }
            }
          });
          OFB.Decryptor = Encryptor;
          return OFB;
        }();
        return CryptoJS.mode.OFB;
      });
    })(modeOfb);
    return modeOfbExports;
  }
  var modeEcbExports = {};
  var modeEcb = {
    get exports() {
      return modeEcbExports;
    },
    set exports(v) {
      modeEcbExports = v;
    }
  };
  var hasRequiredModeEcb;
  function requireModeEcb() {
    if (hasRequiredModeEcb)
      return modeEcbExports;
    hasRequiredModeEcb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.ECB = function() {
          var ECB = CryptoJS.lib.BlockCipherMode.extend();
          ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.encryptBlock(words, offset);
            }
          });
          ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.decryptBlock(words, offset);
            }
          });
          return ECB;
        }();
        return CryptoJS.mode.ECB;
      });
    })(modeEcb);
    return modeEcbExports;
  }
  var padAnsix923Exports = {};
  var padAnsix923 = {
    get exports() {
      return padAnsix923Exports;
    },
    set exports(v) {
      padAnsix923Exports = v;
    }
  };
  var hasRequiredPadAnsix923;
  function requirePadAnsix923() {
    if (hasRequiredPadAnsix923)
      return padAnsix923Exports;
    hasRequiredPadAnsix923 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.AnsiX923 = {
          pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS.pad.Ansix923;
      });
    })(padAnsix923);
    return padAnsix923Exports;
  }
  var padIso10126Exports = {};
  var padIso10126 = {
    get exports() {
      return padIso10126Exports;
    },
    set exports(v) {
      padIso10126Exports = v;
    }
  };
  var hasRequiredPadIso10126;
  function requirePadIso10126() {
    if (hasRequiredPadIso10126)
      return padIso10126Exports;
    hasRequiredPadIso10126 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.Iso10126 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS.pad.Iso10126;
      });
    })(padIso10126);
    return padIso10126Exports;
  }
  var padIso97971Exports = {};
  var padIso97971 = {
    get exports() {
      return padIso97971Exports;
    },
    set exports(v) {
      padIso97971Exports = v;
    }
  };
  var hasRequiredPadIso97971;
  function requirePadIso97971() {
    if (hasRequiredPadIso97971)
      return padIso97971Exports;
    hasRequiredPadIso97971 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.Iso97971 = {
          pad: function(data, blockSize) {
            data.concat(CryptoJS.lib.WordArray.create([2147483648], 1));
            CryptoJS.pad.ZeroPadding.pad(data, blockSize);
          },
          unpad: function(data) {
            CryptoJS.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
          }
        };
        return CryptoJS.pad.Iso97971;
      });
    })(padIso97971);
    return padIso97971Exports;
  }
  var padZeropaddingExports = {};
  var padZeropadding = {
    get exports() {
      return padZeropaddingExports;
    },
    set exports(v) {
      padZeropaddingExports = v;
    }
  };
  var hasRequiredPadZeropadding;
  function requirePadZeropadding() {
    if (hasRequiredPadZeropadding)
      return padZeropaddingExports;
    hasRequiredPadZeropadding = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.ZeroPadding = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
          },
          unpad: function(data) {
            var dataWords = data.words;
            var i2 = data.sigBytes - 1;
            for (var i2 = data.sigBytes - 1; i2 >= 0; i2--) {
              if (dataWords[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) {
                data.sigBytes = i2 + 1;
                break;
              }
            }
          }
        };
        return CryptoJS.pad.ZeroPadding;
      });
    })(padZeropadding);
    return padZeropaddingExports;
  }
  var padNopaddingExports = {};
  var padNopadding = {
    get exports() {
      return padNopaddingExports;
    },
    set exports(v) {
      padNopaddingExports = v;
    }
  };
  var hasRequiredPadNopadding;
  function requirePadNopadding() {
    if (hasRequiredPadNopadding)
      return padNopaddingExports;
    hasRequiredPadNopadding = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.NoPadding = {
          pad: function() {
          },
          unpad: function() {
          }
        };
        return CryptoJS.pad.NoPadding;
      });
    })(padNopadding);
    return padNopaddingExports;
  }
  var formatHexExports = {};
  var formatHex = {
    get exports() {
      return formatHexExports;
    },
    set exports(v) {
      formatHexExports = v;
    }
  };
  var hasRequiredFormatHex;
  function requireFormatHex() {
    if (hasRequiredFormatHex)
      return formatHexExports;
    hasRequiredFormatHex = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(undefined$1) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var CipherParams = C_lib.CipherParams;
          var C_enc = C.enc;
          var Hex = C_enc.Hex;
          var C_format = C.format;
          C_format.Hex = {
            /**
             * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The hexadecimally encoded string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              return cipherParams.ciphertext.toString(Hex);
            },
            /**
             * Converts a hexadecimally encoded ciphertext string to a cipher params object.
             *
             * @param {string} input The hexadecimally encoded string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
             */
            parse: function(input) {
              var ciphertext = Hex.parse(input);
              return CipherParams.create({ ciphertext });
            }
          };
        })();
        return CryptoJS.format.Hex;
      });
    })(formatHex);
    return formatHexExports;
  }
  var aesExports = {};
  var aes = {
    get exports() {
      return aesExports;
    },
    set exports(v) {
      aesExports = v;
    }
  };
  var hasRequiredAes;
  function requireAes() {
    if (hasRequiredAes)
      return aesExports;
    hasRequiredAes = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var SBOX = [];
          var INV_SBOX = [];
          var SUB_MIX_0 = [];
          var SUB_MIX_1 = [];
          var SUB_MIX_2 = [];
          var SUB_MIX_3 = [];
          var INV_SUB_MIX_0 = [];
          var INV_SUB_MIX_1 = [];
          var INV_SUB_MIX_2 = [];
          var INV_SUB_MIX_3 = [];
          (function() {
            var d = [];
            for (var i2 = 0; i2 < 256; i2++) {
              if (i2 < 128) {
                d[i2] = i2 << 1;
              } else {
                d[i2] = i2 << 1 ^ 283;
              }
            }
            var x = 0;
            var xi = 0;
            for (var i2 = 0; i2 < 256; i2++) {
              var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
              sx = sx >>> 8 ^ sx & 255 ^ 99;
              SBOX[x] = sx;
              INV_SBOX[sx] = x;
              var x2 = d[x];
              var x4 = d[x2];
              var x8 = d[x4];
              var t = d[sx] * 257 ^ sx * 16843008;
              SUB_MIX_0[x] = t << 24 | t >>> 8;
              SUB_MIX_1[x] = t << 16 | t >>> 16;
              SUB_MIX_2[x] = t << 8 | t >>> 24;
              SUB_MIX_3[x] = t;
              var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
              INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
              INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
              INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
              INV_SUB_MIX_3[sx] = t;
              if (!x) {
                x = xi = 1;
              } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
              }
            }
          })();
          var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
              var t;
              if (this._nRounds && this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              var nRounds = this._nRounds = keySize + 6;
              var ksRows = (nRounds + 1) * 4;
              var keySchedule = this._keySchedule = [];
              for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                  keySchedule[ksRow] = keyWords[ksRow];
                } else {
                  t = keySchedule[ksRow - 1];
                  if (!(ksRow % keySize)) {
                    t = t << 8 | t >>> 24;
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                    t ^= RCON[ksRow / keySize | 0] << 24;
                  } else if (keySize > 6 && ksRow % keySize == 4) {
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  }
                  keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
              }
              var invKeySchedule = this._invKeySchedule = [];
              for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                  var t = keySchedule[ksRow];
                } else {
                  var t = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                  invKeySchedule[invKsRow] = t;
                } else {
                  invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
                }
              }
            },
            encryptBlock: function(M2, offset) {
              this._doCryptBlock(M2, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M2, offset) {
              var t = M2[offset + 1];
              M2[offset + 1] = M2[offset + 3];
              M2[offset + 3] = t;
              this._doCryptBlock(M2, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
              var t = M2[offset + 1];
              M2[offset + 1] = M2[offset + 3];
              M2[offset + 3] = t;
            },
            _doCryptBlock: function(M2, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
              var nRounds = this._nRounds;
              var s0 = M2[offset] ^ keySchedule[0];
              var s1 = M2[offset + 1] ^ keySchedule[1];
              var s2 = M2[offset + 2] ^ keySchedule[2];
              var s3 = M2[offset + 3] ^ keySchedule[3];
              var ksRow = 4;
              for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
              }
              var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
              var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
              var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
              var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
              M2[offset] = t0;
              M2[offset + 1] = t1;
              M2[offset + 2] = t2;
              M2[offset + 3] = t3;
            },
            keySize: 256 / 32
          });
          C.AES = BlockCipher._createHelper(AES);
        })();
        return CryptoJS.AES;
      });
    })(aes);
    return aesExports;
  }
  var tripledesExports = {};
  var tripledes = {
    get exports() {
      return tripledesExports;
    },
    set exports(v) {
      tripledesExports = v;
    }
  };
  var hasRequiredTripledes;
  function requireTripledes() {
    if (hasRequiredTripledes)
      return tripledesExports;
    hasRequiredTripledes = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var PC1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
          ];
          var PC2 = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
          ];
          var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var SBOX_P = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }
          ];
          var SBOX_MASK = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
          ];
          var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keyBits = [];
              for (var i2 = 0; i2 < 56; i2++) {
                var keyBitPos = PC1[i2] - 1;
                keyBits[i2] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
              }
              var subKeys = this._subKeys = [];
              for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                var subKey = subKeys[nSubKey] = [];
                var bitShift = BIT_SHIFTS[nSubKey];
                for (var i2 = 0; i2 < 24; i2++) {
                  subKey[i2 / 6 | 0] |= keyBits[(PC2[i2] - 1 + bitShift) % 28] << 31 - i2 % 6;
                  subKey[4 + (i2 / 6 | 0)] |= keyBits[28 + (PC2[i2 + 24] - 1 + bitShift) % 28] << 31 - i2 % 6;
                }
                subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                for (var i2 = 1; i2 < 7; i2++) {
                  subKey[i2] = subKey[i2] >>> (i2 - 1) * 4 + 3;
                }
                subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
              }
              var invSubKeys = this._invSubKeys = [];
              for (var i2 = 0; i2 < 16; i2++) {
                invSubKeys[i2] = subKeys[15 - i2];
              }
            },
            encryptBlock: function(M2, offset) {
              this._doCryptBlock(M2, offset, this._subKeys);
            },
            decryptBlock: function(M2, offset) {
              this._doCryptBlock(M2, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M2, offset, subKeys) {
              this._lBlock = M2[offset];
              this._rBlock = M2[offset + 1];
              exchangeLR.call(this, 4, 252645135);
              exchangeLR.call(this, 16, 65535);
              exchangeRL.call(this, 2, 858993459);
              exchangeRL.call(this, 8, 16711935);
              exchangeLR.call(this, 1, 1431655765);
              for (var round = 0; round < 16; round++) {
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;
                var f = 0;
                for (var i2 = 0; i2 < 8; i2++) {
                  f |= SBOX_P[i2][((rBlock ^ subKey[i2]) & SBOX_MASK[i2]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f;
              }
              var t = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = t;
              exchangeLR.call(this, 1, 1431655765);
              exchangeRL.call(this, 8, 16711935);
              exchangeRL.call(this, 2, 858993459);
              exchangeLR.call(this, 16, 65535);
              exchangeLR.call(this, 4, 252645135);
              M2[offset] = this._lBlock;
              M2[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          function exchangeLR(offset, mask) {
            var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t;
            this._lBlock ^= t << offset;
          }
          function exchangeRL(offset, mask) {
            var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t;
            this._rBlock ^= t << offset;
          }
          C.DES = BlockCipher._createHelper(DES);
          var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              }
              var key1 = keyWords.slice(0, 2);
              var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
              var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
              this._des1 = DES.createEncryptor(WordArray.create(key1));
              this._des2 = DES.createEncryptor(WordArray.create(key2));
              this._des3 = DES.createEncryptor(WordArray.create(key3));
            },
            encryptBlock: function(M2, offset) {
              this._des1.encryptBlock(M2, offset);
              this._des2.decryptBlock(M2, offset);
              this._des3.encryptBlock(M2, offset);
            },
            decryptBlock: function(M2, offset) {
              this._des3.decryptBlock(M2, offset);
              this._des2.encryptBlock(M2, offset);
              this._des1.decryptBlock(M2, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          C.TripleDES = BlockCipher._createHelper(TripleDES);
        })();
        return CryptoJS.TripleDES;
      });
    })(tripledes);
    return tripledesExports;
  }
  var rc4Exports = {};
  var rc4 = {
    get exports() {
      return rc4Exports;
    },
    set exports(v) {
      rc4Exports = v;
    }
  };
  var hasRequiredRc4;
  function requireRc4() {
    if (hasRequiredRc4)
      return rc4Exports;
    hasRequiredRc4 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keySigBytes = key.sigBytes;
              var S2 = this._S = [];
              for (var i2 = 0; i2 < 256; i2++) {
                S2[i2] = i2;
              }
              for (var i2 = 0, j = 0; i2 < 256; i2++) {
                var keyByteIndex = i2 % keySigBytes;
                var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                j = (j + S2[i2] + keyByte) % 256;
                var t = S2[i2];
                S2[i2] = S2[j];
                S2[j] = t;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function(M2, offset) {
              M2[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
          });
          function generateKeystreamWord() {
            var S2 = this._S;
            var i2 = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; n < 4; n++) {
              i2 = (i2 + 1) % 256;
              j = (j + S2[i2]) % 256;
              var t = S2[i2];
              S2[i2] = S2[j];
              S2[j] = t;
              keystreamWord |= S2[(S2[i2] + S2[j]) % 256] << 24 - n * 8;
            }
            this._i = i2;
            this._j = j;
            return keystreamWord;
          }
          C.RC4 = StreamCipher._createHelper(RC4);
          var RC4Drop = C_algo.RC4Drop = RC4.extend({
            /**
             * Configuration options.
             *
             * @property {number} drop The number of keystream words to drop. Default 192
             */
            cfg: RC4.cfg.extend({
              drop: 192
            }),
            _doReset: function() {
              RC4._doReset.call(this);
              for (var i2 = this.cfg.drop; i2 > 0; i2--) {
                generateKeystreamWord.call(this);
              }
            }
          });
          C.RC4Drop = StreamCipher._createHelper(RC4Drop);
        })();
        return CryptoJS.RC4;
      });
    })(rc4);
    return rc4Exports;
  }
  var rabbitExports = {};
  var rabbit = {
    get exports() {
      return rabbitExports;
    },
    set exports(v) {
      rabbitExports = v;
    }
  };
  var hasRequiredRabbit;
  function requireRabbit() {
    if (hasRequiredRabbit)
      return rabbitExports;
    hasRequiredRabbit = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S2 = [];
          var C_ = [];
          var G = [];
          var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
              var K2 = this._key.words;
              var iv = this.cfg.iv;
              for (var i2 = 0; i2 < 4; i2++) {
                K2[i2] = (K2[i2] << 8 | K2[i2] >>> 24) & 16711935 | (K2[i2] << 24 | K2[i2] >>> 8) & 4278255360;
              }
              var X2 = this._X = [
                K2[0],
                K2[3] << 16 | K2[2] >>> 16,
                K2[1],
                K2[0] << 16 | K2[3] >>> 16,
                K2[2],
                K2[1] << 16 | K2[0] >>> 16,
                K2[3],
                K2[2] << 16 | K2[1] >>> 16
              ];
              var C2 = this._C = [
                K2[2] << 16 | K2[2] >>> 16,
                K2[0] & 4294901760 | K2[1] & 65535,
                K2[3] << 16 | K2[3] >>> 16,
                K2[1] & 4294901760 | K2[2] & 65535,
                K2[0] << 16 | K2[0] >>> 16,
                K2[2] & 4294901760 | K2[3] & 65535,
                K2[1] << 16 | K2[1] >>> 16,
                K2[3] & 4294901760 | K2[0] & 65535
              ];
              this._b = 0;
              for (var i2 = 0; i2 < 4; i2++) {
                nextState.call(this);
              }
              for (var i2 = 0; i2 < 8; i2++) {
                C2[i2] ^= X2[i2 + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i22 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i22 & 4294901760;
                var i3 = i22 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i22;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i22;
                C2[7] ^= i3;
                for (var i2 = 0; i2 < 4; i2++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M2, offset) {
              var X2 = this._X;
              nextState.call(this);
              S2[0] = X2[0] ^ X2[5] >>> 16 ^ X2[3] << 16;
              S2[1] = X2[2] ^ X2[7] >>> 16 ^ X2[5] << 16;
              S2[2] = X2[4] ^ X2[1] >>> 16 ^ X2[7] << 16;
              S2[3] = X2[6] ^ X2[3] >>> 16 ^ X2[1] << 16;
              for (var i2 = 0; i2 < 4; i2++) {
                S2[i2] = (S2[i2] << 8 | S2[i2] >>> 24) & 16711935 | (S2[i2] << 24 | S2[i2] >>> 8) & 4278255360;
                M2[offset + i2] ^= S2[i2];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X2 = this._X;
            var C2 = this._C;
            for (var i2 = 0; i2 < 8; i2++) {
              C_[i2] = C2[i2];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i2 = 0; i2 < 8; i2++) {
              var gx = X2[i2] + C2[i2];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i2] = gh ^ gl;
            }
            X2[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X2[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X2[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X2[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X2[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X2[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X2[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X2[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.Rabbit = StreamCipher._createHelper(Rabbit);
        })();
        return CryptoJS.Rabbit;
      });
    })(rabbit);
    return rabbitExports;
  }
  var rabbitLegacyExports = {};
  var rabbitLegacy = {
    get exports() {
      return rabbitLegacyExports;
    },
    set exports(v) {
      rabbitLegacyExports = v;
    }
  };
  var hasRequiredRabbitLegacy;
  function requireRabbitLegacy() {
    if (hasRequiredRabbitLegacy)
      return rabbitLegacyExports;
    hasRequiredRabbitLegacy = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S2 = [];
          var C_ = [];
          var G = [];
          var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
              var K2 = this._key.words;
              var iv = this.cfg.iv;
              var X2 = this._X = [
                K2[0],
                K2[3] << 16 | K2[2] >>> 16,
                K2[1],
                K2[0] << 16 | K2[3] >>> 16,
                K2[2],
                K2[1] << 16 | K2[0] >>> 16,
                K2[3],
                K2[2] << 16 | K2[1] >>> 16
              ];
              var C2 = this._C = [
                K2[2] << 16 | K2[2] >>> 16,
                K2[0] & 4294901760 | K2[1] & 65535,
                K2[3] << 16 | K2[3] >>> 16,
                K2[1] & 4294901760 | K2[2] & 65535,
                K2[0] << 16 | K2[0] >>> 16,
                K2[2] & 4294901760 | K2[3] & 65535,
                K2[1] << 16 | K2[1] >>> 16,
                K2[3] & 4294901760 | K2[0] & 65535
              ];
              this._b = 0;
              for (var i2 = 0; i2 < 4; i2++) {
                nextState.call(this);
              }
              for (var i2 = 0; i2 < 8; i2++) {
                C2[i2] ^= X2[i2 + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i22 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i22 & 4294901760;
                var i3 = i22 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i22;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i22;
                C2[7] ^= i3;
                for (var i2 = 0; i2 < 4; i2++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M2, offset) {
              var X2 = this._X;
              nextState.call(this);
              S2[0] = X2[0] ^ X2[5] >>> 16 ^ X2[3] << 16;
              S2[1] = X2[2] ^ X2[7] >>> 16 ^ X2[5] << 16;
              S2[2] = X2[4] ^ X2[1] >>> 16 ^ X2[7] << 16;
              S2[3] = X2[6] ^ X2[3] >>> 16 ^ X2[1] << 16;
              for (var i2 = 0; i2 < 4; i2++) {
                S2[i2] = (S2[i2] << 8 | S2[i2] >>> 24) & 16711935 | (S2[i2] << 24 | S2[i2] >>> 8) & 4278255360;
                M2[offset + i2] ^= S2[i2];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X2 = this._X;
            var C2 = this._C;
            for (var i2 = 0; i2 < 8; i2++) {
              C_[i2] = C2[i2];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i2 = 0; i2 < 8; i2++) {
              var gx = X2[i2] + C2[i2];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i2] = gh ^ gl;
            }
            X2[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X2[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X2[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X2[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X2[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X2[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X2[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X2[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
        })();
        return CryptoJS.RabbitLegacy;
      });
    })(rabbitLegacy);
    return rabbitLegacyExports;
  }
  (function(module, exports) {
    (function(root, factory, undef) {
      {
        module.exports = factory(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy());
      }
    })(commonjsGlobal, function(CryptoJS) {
      return CryptoJS;
    });
  })(cryptoJs);
  var buffer = {};
  var base64Js = {};
  base64Js.byteLength = byteLength;
  base64Js.toByteArray = toByteArray;
  base64Js.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1)
      validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
      );
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
      );
    }
    return parts.join("");
  }
  var ieee754 = {};
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i2 = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer2[offset + i2];
    i2 += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i2 = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer2[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer2[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {
    }
    buffer2[offset + i2 - d] |= s * 128;
  };
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  (function(exports) {
    const base64 = base64Js;
    const ieee754$1 = ieee754;
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength2(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i2 = 0; i2 < length; i2 += 1) {
        buf[i2] = array[i2] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len2 = checked(obj.length) | 0;
        const buf = createBuffer(len2);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len2);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer2(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare2(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i2 = 0, len2 = Math.min(x, y); i2 < len2; ++i2) {
        if (a[i2] !== b[i2]) {
          x = a[i2];
          y = b[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
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
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      const buffer2 = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        let buf = list[i2];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer2.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer2,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength2(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len2 = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len2 === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len2;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len2 * 2;
          case "hex":
            return len2 >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength2;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i2 = b[n];
      b[n] = b[m];
      b[m] = i2;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len2 = this.length;
      if (len2 % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len2 = this.length;
      if (len2 % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len2 = this.length;
      if (len2 % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString2() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len2 = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i2 = 0; i2 < len2; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x = thisCopy[i2];
          y = targetCopy[i2];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i3) {
        if (indexSize === 1) {
          return buf[i3];
        } else {
          return buf.readUInt16BE(i3 * indexSize);
        }
      }
      let i2;
      if (dir) {
        let foundIndex = -1;
        for (i2 = byteOffset; i2 < arrLength; i2++) {
          if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i2;
            if (i2 - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i2 -= i2 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i2 = byteOffset; i2 >= 0; i2--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i2 + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i2;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        const parsed = parseInt(string.substr(i2 * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i2;
        buf[offset + i2] = parsed;
      }
      return i2;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i2 = start;
      while (i2 < end) {
        const firstByte = buf[i2];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i2 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i2 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              fourthByte = buf[i2 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i2 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len2 = codePoints.length;
      if (len2 <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i2 = 0;
      while (i2 < len2) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len2 = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len2)
        end = len2;
      let out = "";
      for (let i2 = start; i2 < end; ++i2) {
        out += hexSliceLookupTable[buf[i2]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
        res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len2 = this.length;
      start = ~~start;
      end = end === void 0 ? len2 : ~~end;
      if (start < 0) {
        start += len2;
        if (start < 0)
          start = 0;
      } else if (start > len2) {
        start = len2;
      }
      if (end < 0) {
        end += len2;
        if (end < 0)
          end = 0;
      } else if (end > len2) {
        end = len2;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength3, this.length);
      }
      let val = this[offset + --byteLength3];
      let mul = 1;
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength3, this.length);
      let i2 = byteLength3;
      let mul = 1;
      let val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let mul = 1;
      let i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let i2 = byteLength3 - 1;
      let mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i2 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i2 = byteLength3 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len2 = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len2;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code2 = val.charCodeAt(0);
          if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
            val = code2;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i2;
      if (typeof val === "number") {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len2 = bytes.length;
        if (len2 === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len2];
        }
      }
      return this;
    };
    const errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i2 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`;
      }
      return `${val.slice(0, i2)}${res}`;
    }
    function checkBounds(buf, offset, byteLength3) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
        boundsError(offset, buf.length - (byteLength3 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength3) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength3 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength3 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength3 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength3);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i2 = 0; i2 < length; ++i2) {
        codePoint = string.charCodeAt(i2);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i2 + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        byteArray.push(str.charCodeAt(i2) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i2);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        if (i2 + offset >= dst.length || i2 >= src.length)
          break;
        dst[i2 + offset] = src[i2];
      }
      return i2;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i2 = 0; i2 < 16; ++i2) {
        const i16 = i2 * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i2] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  })(buffer);
  class SecurityManager {
    constructor() {
      this.deviceID = 2;
    }
    static shared() {
      if (!this.instance) {
        this.instance = new SecurityManager();
      }
      return this.instance;
    }
    // public set identityKey(identityKeyPair: KeyPairType<ArrayBuffer> | undefined) {
    //     this.store.put("identityKey", identityKeyPair)
    // }
    // public async initSignal() {
    //     const registrationId = KeyHelper.generateRegistrationId();
    //     this.registrationID = registrationId
    //     this.store.put("registrationId", registrationId)
    //     const identityKeyPair = await KeyHelper.generateIdentityKeyPair();
    //     this.store.put("identityKey", identityKeyPair)
    // }
    // public async generateSignedPreKey() {
    //     const identityKeyPair = await this.store.getIdentityKeyPair()
    //     const signedPreKeyId = Math.floor(10000 * Math.random());
    //     const signedPreKey = await KeyHelper.generateSignedPreKey(
    //         identityKeyPair!,
    //         signedPreKeyId
    //     );
    //     this.store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);
    //     const publicSignedPreKey: SignedPublicPreKeyType = {
    //         keyId: signedPreKeyId,
    //         publicKey: signedPreKey.keyPair.pubKey,
    //         signature: signedPreKey.signature,
    //       };
    //     return publicSignedPreKey
    // }
    // public async generatePreKeys() :Promise<PreKeyType[]> {
    //     const baseKeyId = Math.floor(10000 * Math.random());
    //     const  publicPreKey1  = await this.generatePreKey(baseKeyId)
    //     const  publicPreKey2  = await this.generatePreKey(baseKeyId+1)
    //     return [publicPreKey1,publicPreKey2]
    // }
    // public async generatePreKey(keyID:number) {
    //     const preKey = await KeyHelper.generatePreKey(keyID);
    //     this.store.storePreKey(`${keyID}`, preKey.keyPair);
    //     const publicPreKey: PreKeyType = {
    //         keyId: preKey.keyId,
    //         publicKey: preKey.keyPair.pubKey,
    //       };
    //       return publicPreKey
    // }
    async signalDecrypt(recipientID, messageData) {
      return messageData.buffer;
    }
    async signalEncrypt(recipientID, contentData) {
      return contentData;
    }
    // public async signalProcessSession(recipientID: string, deviceType: DeviceType) {
    //     const recipientAddress = new SignalProtocolAddress(recipientID, this.deviceID);
    //     const sessionBuilder = new SessionBuilder(this.store, recipientAddress);
    //     const session = await sessionBuilder.processPreKey(deviceType)
    //     return session
    // }
    stringToUint(str) {
      const charList = str.split("");
      const uintArray = new Array();
      for (const v of charList) {
        uintArray.push(v.charCodeAt(0));
      }
      return uintArray;
    }
    encryption(message) {
      const actMsgKeyBytes = cryptoJsExports.AES.encrypt(cryptoJsExports.enc.Utf8.parse(message), cryptoJsExports.enc.Utf8.parse(this.aesKey), {
        keySize: 128 / 8,
        iv: cryptoJsExports.enc.Utf8.parse(this.aesIV),
        mode: cryptoJsExports.mode.CBC,
        padding: cryptoJsExports.pad.Pkcs7
      });
      const actMsgKey = actMsgKeyBytes.toString();
      return actMsgKey;
    }
    decryption(message) {
      const messageStr = this.uintToString(Array.from(message));
      const messagedecBase64 = cryptoJsExports.enc.Base64.parse(messageStr);
      const decrypted = cryptoJsExports.AES.decrypt(cryptoJsExports.enc.Base64.stringify(messagedecBase64), cryptoJsExports.enc.Utf8.parse(this.aesKey), {
        keySize: 128 / 8,
        iv: cryptoJsExports.enc.Utf8.parse(this.aesIV),
        mode: cryptoJsExports.mode.CBC,
        padding: cryptoJsExports.pad.Pkcs7
      });
      return Uint8Array.from(buffer.Buffer.from(decrypted.toString(cryptoJsExports.enc.Utf8)));
    }
    encryption2(message) {
      const encodedString = String.fromCharCode.apply(null, Array.from(message));
      const decodedString = decodeURIComponent(escape(encodedString));
      return this.encryption(decodedString);
    }
    uintToString(array) {
      const encodedString = String.fromCharCode.apply(null, array);
      return encodedString;
    }
  }
  var Md5 = (
    /** @class */
    function() {
      function Md52() {
      }
      Md52.AddUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 2147483648;
        lY8 = lY & 2147483648;
        lX4 = lX & 1073741824;
        lY4 = lY & 1073741824;
        lResult = (lX & 1073741823) + (lY & 1073741823);
        if (!!(lX4 & lY4)) {
          return lResult ^ 2147483648 ^ lX8 ^ lY8;
        }
        if (!!(lX4 | lY4)) {
          if (!!(lResult & 1073741824)) {
            return lResult ^ 3221225472 ^ lX8 ^ lY8;
          } else {
            return lResult ^ 1073741824 ^ lX8 ^ lY8;
          }
        } else {
          return lResult ^ lX8 ^ lY8;
        }
      };
      Md52.FF = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.F(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      Md52.GG = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.G(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      Md52.HH = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.H(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      Md52.II = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.I(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      Md52.ConvertToWordArray = function(string) {
        var lWordCount, lMessageLength = string.length, lNumberOfWords_temp1 = lMessageLength + 8, lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64, lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16, lWordArray = Array(lNumberOfWords - 1), lBytePosition = 0, lByteCount = 0;
        while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - lByteCount % 4) / 4;
          lBytePosition = lByteCount % 4 * 8;
          lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
          lByteCount++;
        }
        lWordCount = (lByteCount - lByteCount % 4) / 4;
        lBytePosition = lByteCount % 4 * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
      };
      Md52.WordToHex = function(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
          lByte = lValue >>> lCount * 8 & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
      };
      Md52.Utf8Encode = function(string) {
        var utftext = "", c;
        string = string.replace(/\r\n/g, "\n");
        for (var n = 0; n < string.length; n++) {
          c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }
        return utftext;
      };
      Md52.init = function(string) {
        var temp;
        if (typeof string !== "string")
          string = JSON.stringify(string);
        this._string = this.Utf8Encode(string);
        this.x = this.ConvertToWordArray(this._string);
        this.a = 1732584193;
        this.b = 4023233417;
        this.c = 2562383102;
        this.d = 271733878;
        for (this.k = 0; this.k < this.x.length; this.k += 16) {
          this.AA = this.a;
          this.BB = this.b;
          this.CC = this.c;
          this.DD = this.d;
          this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 3614090360);
          this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 3905402710);
          this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 606105819);
          this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 3250441966);
          this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 4118548399);
          this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 1200080426);
          this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 2821735955);
          this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 4249261313);
          this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 1770035416);
          this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 2336552879);
          this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 4294925233);
          this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 2304563134);
          this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 1804603682);
          this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 4254626195);
          this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 2792965006);
          this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 1236535329);
          this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 4129170786);
          this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 3225465664);
          this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 643717713);
          this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 3921069994);
          this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 3593408605);
          this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 38016083);
          this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 3634488961);
          this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 3889429448);
          this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 568446438);
          this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 3275163606);
          this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 4107603335);
          this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 1163531501);
          this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 2850285829);
          this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 4243563512);
          this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 1735328473);
          this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 2368359562);
          this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 4294588738);
          this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 2272392833);
          this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 1839030562);
          this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 4259657740);
          this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 2763975236);
          this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 1272893353);
          this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 4139469664);
          this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 3200236656);
          this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 681279174);
          this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 3936430074);
          this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 3572445317);
          this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 76029189);
          this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 3654602809);
          this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 3873151461);
          this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 530742520);
          this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 3299628645);
          this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 4096336452);
          this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 1126891415);
          this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 2878612391);
          this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 4237533241);
          this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 1700485571);
          this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 2399980690);
          this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 4293915773);
          this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 2240044497);
          this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 1873313359);
          this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 4264355552);
          this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 2734768916);
          this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 1309151649);
          this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 4149444226);
          this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 3174756917);
          this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 718787259);
          this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 3951481745);
          this.a = this.AddUnsigned(this.a, this.AA);
          this.b = this.AddUnsigned(this.b, this.BB);
          this.c = this.AddUnsigned(this.c, this.CC);
          this.d = this.AddUnsigned(this.d, this.DD);
        }
        temp = this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d);
        return temp.toLowerCase();
      };
      Md52.x = Array();
      Md52.S11 = 7;
      Md52.S12 = 12;
      Md52.S13 = 17;
      Md52.S14 = 22;
      Md52.S21 = 5;
      Md52.S22 = 9;
      Md52.S23 = 14;
      Md52.S24 = 20;
      Md52.S31 = 4;
      Md52.S32 = 11;
      Md52.S33 = 16;
      Md52.S34 = 23;
      Md52.S41 = 6;
      Md52.S42 = 10;
      Md52.S43 = 15;
      Md52.S44 = 21;
      Md52.RotateLeft = function(lValue, iShiftBits) {
        return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
      };
      Md52.F = function(x, y, z) {
        return x & y | ~x & z;
      };
      Md52.G = function(x, y, z) {
        return x & z | y & ~z;
      };
      Md52.H = function(x, y, z) {
        return x ^ y ^ z;
      };
      Md52.I = function(x, y, z) {
        return y ^ (x | ~z);
      };
      return Md52;
    }()
  );
  var PacketType = /* @__PURE__ */ ((PacketType2) => {
    PacketType2[PacketType2["Reserved"] = 0] = "Reserved";
    PacketType2[PacketType2["CONNECT"] = 1] = "CONNECT";
    PacketType2[PacketType2["CONNACK"] = 2] = "CONNACK";
    PacketType2[PacketType2["SEND"] = 3] = "SEND";
    PacketType2[PacketType2["SENDACK"] = 4] = "SENDACK";
    PacketType2[PacketType2["RECV"] = 5] = "RECV";
    PacketType2[PacketType2["RECVACK"] = 6] = "RECVACK";
    PacketType2[PacketType2["PING"] = 7] = "PING";
    PacketType2[PacketType2["PONG"] = 8] = "PONG";
    PacketType2[PacketType2["DISCONNECT"] = 9] = "DISCONNECT";
    return PacketType2;
  })(PacketType || {});
  class Setting {
    constructor() {
      this.receiptEnabled = false;
      this.topic = false;
    }
    // 是否存在话题
    toUint8() {
      return this.boolToInt(this.receiptEnabled) << 7 | this.boolToInt(this.topic) << 3;
    }
    static fromUint8(v) {
      let setting = new Setting();
      setting.receiptEnabled = (v >> 7 & 1) > 0;
      setting.topic = (v >> 3 & 1) > 0;
      return setting;
    }
    boolToInt(v) {
      return v ? 1 : 0;
    }
  }
  class Packet {
    constructor() {
      this._packetType = 0;
    }
    /* tslint:disable-line */
    from(f) {
      this.noPersist = f.noPersist;
      this.reddot = f.reddot;
      this.syncOnce = f.syncOnce;
      this.dup = f.dup;
      this.remainingLength = f.remainingLength;
      this._packetType = f._packetType;
    }
    // 是否是重发
    set packetType(packetType) {
      this._packetType = packetType;
    }
    get packetType() {
      return this._packetType;
    }
  }
  class ConnectPacket extends Packet {
    // 用户token
    get packetType() {
      return 1;
    }
  }
  class ConnackPacket extends Packet {
    constructor() {
      super(...arguments);
      this.reasonCode = 0;
    }
    // 原因码
    get packetType() {
      return 2;
    }
  }
  class DisconnectPacket extends Packet {
    constructor() {
      super(...arguments);
      this.reasonCode = 0;
    }
    // 具体断开原因
    get packetType() {
      return 9;
    }
  }
  class SendPacket extends Packet {
    // 负荷数据
    get packetType() {
      return 3;
    }
    veritifyString(payload) {
      const payloadStr = this.uint8ArrayToString(payload);
      return `${this.clientSeq}${this.clientMsgNo}${this.channelID ?? ""}${this.channelType}${payloadStr}`;
    }
    uint8ArrayToString(data) {
      const encodedString = String.fromCharCode.apply(null, Array.from(data));
      const decodedString = decodeURIComponent(escape(encodedString));
      return decodedString;
    }
  }
  class RecvPacket extends Packet {
    // 负荷数据
    get packetType() {
      return 5;
    }
    get veritifyString() {
      const payloadStr = this.uint8ArrayToString(this.payload);
      return `${this.messageID}${this.messageSeq}${this.clientMsgNo}${this.timestamp}${this.fromUID ?? ""}${this.channelID ?? ""}${this.channelType}${payloadStr}`;
    }
    uint8ArrayToString(data) {
      const encodedString = String.fromCharCode.apply(null, Array.from(data));
      const decodedString = decodeURIComponent(escape(encodedString));
      return decodedString;
    }
  }
  class PingPacket extends Packet {
    /* tslint:disable-line */
    get packetType() {
      return 7;
    }
  }
  class PongPacket extends Packet {
    /* tslint:disable-line */
    get packetType() {
      return 8;
    }
  }
  class SendackPacket extends Packet {
    get packetType() {
      return 4;
    }
  }
  class RecvackPacket extends Packet {
    get packetType() {
      return 6;
    }
  }
  class Proto {
    constructor() {
      this.packetEncodeMap = {};
      this.packetDecodeMap = {};
      this.packetEncodeMap[
        1
        /* CONNECT */
      ] = this.encodeConnect;
      this.packetEncodeMap[
        3
        /* SEND */
      ] = this.encodeSend;
      this.packetEncodeMap[
        6
        /* RECVACK */
      ] = this.encodeRecvack;
      this.packetDecodeMap[
        2
        /* CONNACK */
      ] = this.decodeConnect;
      this.packetDecodeMap[
        5
        /* RECV */
      ] = this.decodeRecvPacket;
      this.packetDecodeMap[
        4
        /* SENDACK */
      ] = this.decodeSendackPacket;
      this.packetDecodeMap[
        9
        /* DISCONNECT */
      ] = this.decodeDisconnect;
    }
    encode(f) {
      const enc = new Encoder();
      let body;
      if (f.packetType !== 7 && f.packetType !== 8) {
        let packetEncodeFunc = this.packetEncodeMap[f.packetType];
        body = packetEncodeFunc(f);
        let header = this.encodeFramer(f, body.length);
        enc.writeBytes(header);
        enc.writeBytes(body);
      } else {
        let header = this.encodeFramer(f, 0);
        enc.writeBytes(header);
      }
      return enc.toUint8Array().buffer;
    }
    decode(data) {
      const decode = new Decoder(data);
      const f = this.decodeFramer(decode);
      if (f.packetType === 7) {
        return new PingPacket();
      }
      if (f.packetType === 8) {
        return new PongPacket();
      }
      const packetDecodeFunc = this.packetDecodeMap[f.packetType];
      if (packetDecodeFunc == null) {
        console.log("不支持的协议包->", f.packetType);
      }
      return packetDecodeFunc(f, decode);
    }
    // 编码连接
    encodeConnect(packet) {
      const enc = new Encoder();
      enc.writeUint8(packet.version);
      enc.writeUint8(packet.deviceFlag);
      enc.writeString(packet.deviceID);
      enc.writeString(packet.uid);
      enc.writeString(packet.token);
      enc.writeInt64(new BigNumber(packet.clientTimestamp));
      enc.writeString(packet.clientKey);
      return enc.w;
    }
    encodeSend(packet) {
      const enc = new Encoder();
      enc.writeByte(packet.setting);
      enc.writeInt32(packet.clientSeq);
      if (!packet.clientMsgNo || packet.clientMsgNo === "") {
        packet.clientMsgNo = getUUID();
      }
      enc.writeString(packet.clientMsgNo);
      enc.writeString(packet.channelID);
      enc.writeByte(packet.channelType);
      const payload = Uint8Array.from(enc.stringToUint(SecurityManager.shared().encryption2(packet.payload)));
      const msgKey = SecurityManager.shared().encryption(packet.veritifyString(payload));
      enc.writeString(Md5.init(msgKey));
      const setting = Setting.fromUint8(packet.setting);
      if (setting.topic) {
        enc.writeString(packet.topic || "");
      }
      if (payload) {
        enc.writeBytes(Array.from(payload));
      }
      return enc.w;
    }
    encodeRecvack(packet) {
      const enc = new Encoder();
      enc.writeInt64(new BigNumber(packet.messageID));
      enc.writeInt32(packet.messageSeq);
      return enc.w;
    }
    decodeConnect(f, decode) {
      const p = new ConnackPacket();
      p.from(f);
      p.timeDiff = decode.readInt64();
      p.reasonCode = decode.readByte();
      p.serverKey = decode.readString();
      p.salt = decode.readString();
      return p;
    }
    decodeDisconnect(f, decode) {
      const p = new DisconnectPacket();
      p.from(f);
      p.reasonCode = decode.readByte();
      p.reason = decode.readString();
      return p;
    }
    decodeRecvPacket(f, decode) {
      const p = new RecvPacket();
      p.from(f);
      p.setting = decode.readByte();
      p.msgKey = decode.readString();
      p.fromUID = decode.readString();
      p.channelID = decode.readString();
      p.channelType = decode.readByte();
      p.clientMsgNo = decode.readString();
      p.messageID = decode.readInt64().toString();
      p.messageSeq = decode.readInt32();
      p.timestamp = decode.readInt32();
      const setting = Setting.fromUint8(p.setting);
      if (setting.topic) {
        p.topic = decode.readString();
      }
      p.payload = decode.readRemaining();
      return p;
    }
    decodeSendackPacket(f, decode) {
      const p = new SendackPacket();
      p.from(f);
      p.messageID = decode.readInt64();
      p.clientSeq = decode.readInt32();
      p.messageSeq = decode.readInt32();
      p.reasonCode = decode.readByte();
      return p;
    }
    // 编码头部
    encodeFramer(f, remainingLength) {
      if (f.packetType === 7 || f.packetType === 8) {
        return [f.packetType << 4 | 0];
      }
      const headers = new Array();
      const typeAndFlags = this.encodeBool(f.dup) << 3 | this.encodeBool(f.syncOnce) << 2 | this.encodeBool(f.reddot) << 1 | this.encodeBool(f.noPersist);
      headers.push(f.packetType << 4 | typeAndFlags);
      const vLen = this.encodeVariableLength(remainingLength);
      headers.push(...vLen);
      return headers;
    }
    decodeFramer(decode) {
      const b = decode.readByte();
      const f = new Packet();
      f.noPersist = (b & 1) > 0;
      f.reddot = (b >> 1 & 1) > 0;
      f.syncOnce = (b >> 2 & 1) > 0;
      f.dup = (b >> 3 & 1) > 0;
      f.packetType = b >> 4;
      if (f.packetType != 7 && f.packetType != 8) {
        f.remainingLength = decode.readVariableLength();
      }
      return f;
    }
    encodeBool(b) {
      return b ? 1 : 0;
    }
    encodeVariableLength(len2) {
      const ret = new Array();
      while (len2 > 0) {
        let digit = len2 % 128;
        len2 = Math.floor(len2 / 128);
        if (len2 > 0) {
          digit |= 128;
        }
        ret.push(digit);
      }
      return ret;
    }
  }
  function getUUID() {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  var lib = {};
  Object.defineProperty(lib, "__esModule", { value: true });
  let _9 = new Uint8Array(32);
  _9[0] = 9;
  function gf(init) {
    var i2, r = new Float64Array(16);
    if (init)
      for (i2 = 0; i2 < init.length; i2++)
        r[i2] = init[i2];
    return r;
  }
  const gf0 = gf(), gf1 = gf([1]), _121665 = gf([56129, 1]), D = gf([
    30883,
    4953,
    19914,
    30187,
    55467,
    16705,
    2637,
    112,
    59544,
    30585,
    16505,
    36039,
    65139,
    11119,
    27886,
    20995
  ]), D2 = gf([
    61785,
    9906,
    39828,
    60374,
    45398,
    33411,
    5274,
    224,
    53552,
    61171,
    33010,
    6542,
    64743,
    22239,
    55772,
    9222
  ]), X = gf([
    54554,
    36645,
    11616,
    51542,
    42930,
    38181,
    51040,
    26924,
    56412,
    64982,
    57905,
    49316,
    21502,
    52590,
    14035,
    8553
  ]), Y = gf([
    26200,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214
  ]), I = gf([
    41136,
    18958,
    6951,
    50414,
    58488,
    44335,
    6150,
    12099,
    55207,
    15867,
    153,
    11085,
    57099,
    20417,
    9344,
    11139
  ]);
  function ts64(x, i2, h, l) {
    x[i2] = h >> 24 & 255;
    x[i2 + 1] = h >> 16 & 255;
    x[i2 + 2] = h >> 8 & 255;
    x[i2 + 3] = h & 255;
    x[i2 + 4] = l >> 24 & 255;
    x[i2 + 5] = l >> 16 & 255;
    x[i2 + 6] = l >> 8 & 255;
    x[i2 + 7] = l & 255;
  }
  function vn(x, xi, y, yi, n) {
    var i2, d = 0;
    for (i2 = 0; i2 < n; i2++)
      d |= x[xi + i2] ^ y[yi + i2];
    return (1 & d - 1 >>> 8) - 1;
  }
  function crypto_verify_32(x, xi, y, yi) {
    return vn(x, xi, y, yi, 32);
  }
  function set25519(r, a) {
    var i2;
    for (i2 = 0; i2 < 16; i2++)
      r[i2] = a[i2] | 0;
  }
  function car25519(o) {
    var i2, v, c = 1;
    for (i2 = 0; i2 < 16; i2++) {
      v = o[i2] + c + 65535;
      c = Math.floor(v / 65536);
      o[i2] = v - c * 65536;
    }
    o[0] += c - 1 + 37 * (c - 1);
  }
  function sel25519(p, q, b) {
    var t, c = ~(b - 1);
    for (var i2 = 0; i2 < 16; i2++) {
      t = c & (p[i2] ^ q[i2]);
      p[i2] ^= t;
      q[i2] ^= t;
    }
  }
  function pack25519(o, n) {
    var i2, j, b;
    var m = gf(), t = gf();
    for (i2 = 0; i2 < 16; i2++)
      t[i2] = n[i2];
    car25519(t);
    car25519(t);
    car25519(t);
    for (j = 0; j < 2; j++) {
      m[0] = t[0] - 65517;
      for (i2 = 1; i2 < 15; i2++) {
        m[i2] = t[i2] - 65535 - (m[i2 - 1] >> 16 & 1);
        m[i2 - 1] &= 65535;
      }
      m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
      b = m[15] >> 16 & 1;
      m[14] &= 65535;
      sel25519(t, m, 1 - b);
    }
    for (i2 = 0; i2 < 16; i2++) {
      o[2 * i2] = t[i2] & 255;
      o[2 * i2 + 1] = t[i2] >> 8;
    }
  }
  function neq25519(a, b) {
    var c = new Uint8Array(32), d = new Uint8Array(32);
    pack25519(c, a);
    pack25519(d, b);
    return crypto_verify_32(c, 0, d, 0);
  }
  function par25519(a) {
    var d = new Uint8Array(32);
    pack25519(d, a);
    return d[0] & 1;
  }
  function unpack25519(o, n) {
    var i2;
    for (i2 = 0; i2 < 16; i2++)
      o[i2] = n[2 * i2] + (n[2 * i2 + 1] << 8);
    o[15] &= 32767;
  }
  function A(o, a, b) {
    for (var i2 = 0; i2 < 16; i2++)
      o[i2] = a[i2] + b[i2];
  }
  function Z(o, a, b) {
    for (var i2 = 0; i2 < 16; i2++)
      o[i2] = a[i2] - b[i2];
  }
  function M(o, a, b) {
    var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
  }
  function S(o, a) {
    M(o, a, a);
  }
  function inv25519(o, i2) {
    var c = gf();
    var a;
    for (a = 0; a < 16; a++)
      c[a] = i2[a];
    for (a = 253; a >= 0; a--) {
      S(c, c);
      if (a !== 2 && a !== 4)
        M(c, c, i2);
    }
    for (a = 0; a < 16; a++)
      o[a] = c[a];
  }
  function pow2523(o, i2) {
    var c = gf();
    var a;
    for (a = 0; a < 16; a++)
      c[a] = i2[a];
    for (a = 250; a >= 0; a--) {
      S(c, c);
      if (a !== 1)
        M(c, c, i2);
    }
    for (a = 0; a < 16; a++)
      o[a] = c[a];
  }
  function crypto_scalarmult(q, n, p) {
    var z = new Uint8Array(32);
    var x = new Float64Array(80), r, i2;
    var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
    for (i2 = 0; i2 < 31; i2++)
      z[i2] = n[i2];
    z[31] = n[31] & 127 | 64;
    z[0] &= 248;
    unpack25519(x, p);
    for (i2 = 0; i2 < 16; i2++) {
      b[i2] = x[i2];
      d[i2] = a[i2] = c[i2] = 0;
    }
    a[0] = d[0] = 1;
    for (i2 = 254; i2 >= 0; --i2) {
      r = z[i2 >>> 3] >>> (i2 & 7) & 1;
      sel25519(a, b, r);
      sel25519(c, d, r);
      A(e, a, c);
      Z(a, a, c);
      A(c, b, d);
      Z(b, b, d);
      S(d, e);
      S(f, a);
      M(a, c, a);
      M(c, b, e);
      A(e, a, c);
      Z(a, a, c);
      S(b, a);
      Z(c, d, f);
      M(a, c, _121665);
      A(a, a, d);
      M(c, c, a);
      M(a, d, f);
      M(d, b, x);
      S(b, e);
      sel25519(a, b, r);
      sel25519(c, d, r);
    }
    for (i2 = 0; i2 < 16; i2++) {
      x[i2 + 16] = a[i2];
      x[i2 + 32] = c[i2];
      x[i2 + 48] = b[i2];
      x[i2 + 64] = d[i2];
    }
    var x32 = x.subarray(32);
    var x16 = x.subarray(16);
    inv25519(x32, x32);
    M(x16, x16, x32);
    pack25519(q, x16);
    return 0;
  }
  function crypto_scalarmult_base(q, n) {
    return crypto_scalarmult(q, n, _9);
  }
  var K = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function crypto_hashblocks_hl(hh, hl, m, n) {
    var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i2, j, h, l, a, b, c, d;
    var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
    var pos = 0;
    while (n >= 128) {
      for (i2 = 0; i2 < 16; i2++) {
        j = 8 * i2 + pos;
        wh[i2] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
        wl[i2] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
      }
      for (i2 = 0; i2 < 80; i2++) {
        bh0 = ah0;
        bh1 = ah1;
        bh2 = ah2;
        bh3 = ah3;
        bh4 = ah4;
        bh5 = ah5;
        bh6 = ah6;
        bh7 = ah7;
        bl0 = al0;
        bl1 = al1;
        bl2 = al2;
        bl3 = al3;
        bl4 = al4;
        bl5 = al5;
        bl6 = al6;
        bl7 = al7;
        h = ah7;
        l = al7;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
        l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = ah4 & ah5 ^ ~ah4 & ah6;
        l = al4 & al5 ^ ~al4 & al6;
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = K[i2 * 2];
        l = K[i2 * 2 + 1];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = wh[i2 % 16];
        l = wl[i2 % 16];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        th = c & 65535 | d << 16;
        tl = a & 65535 | b << 16;
        h = th;
        l = tl;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
        l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
        l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        bh7 = c & 65535 | d << 16;
        bl7 = a & 65535 | b << 16;
        h = bh3;
        l = bl3;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = th;
        l = tl;
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        bh3 = c & 65535 | d << 16;
        bl3 = a & 65535 | b << 16;
        ah1 = bh0;
        ah2 = bh1;
        ah3 = bh2;
        ah4 = bh3;
        ah5 = bh4;
        ah6 = bh5;
        ah7 = bh6;
        ah0 = bh7;
        al1 = bl0;
        al2 = bl1;
        al3 = bl2;
        al4 = bl3;
        al5 = bl4;
        al6 = bl5;
        al7 = bl6;
        al0 = bl7;
        if (i2 % 16 === 15) {
          for (j = 0; j < 16; j++) {
            h = wh[j];
            l = wl[j];
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = wh[(j + 9) % 16];
            l = wl[(j + 9) % 16];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            th = wh[(j + 1) % 16];
            tl = wl[(j + 1) % 16];
            h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
            l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            th = wh[(j + 14) % 16];
            tl = wl[(j + 14) % 16];
            h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
            l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            wh[j] = c & 65535 | d << 16;
            wl[j] = a & 65535 | b << 16;
          }
        }
      }
      h = ah0;
      l = al0;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[0];
      l = hl[0];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[0] = ah0 = c & 65535 | d << 16;
      hl[0] = al0 = a & 65535 | b << 16;
      h = ah1;
      l = al1;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[1];
      l = hl[1];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[1] = ah1 = c & 65535 | d << 16;
      hl[1] = al1 = a & 65535 | b << 16;
      h = ah2;
      l = al2;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[2];
      l = hl[2];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[2] = ah2 = c & 65535 | d << 16;
      hl[2] = al2 = a & 65535 | b << 16;
      h = ah3;
      l = al3;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[3];
      l = hl[3];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[3] = ah3 = c & 65535 | d << 16;
      hl[3] = al3 = a & 65535 | b << 16;
      h = ah4;
      l = al4;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[4];
      l = hl[4];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[4] = ah4 = c & 65535 | d << 16;
      hl[4] = al4 = a & 65535 | b << 16;
      h = ah5;
      l = al5;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[5];
      l = hl[5];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[5] = ah5 = c & 65535 | d << 16;
      hl[5] = al5 = a & 65535 | b << 16;
      h = ah6;
      l = al6;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[6];
      l = hl[6];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[6] = ah6 = c & 65535 | d << 16;
      hl[6] = al6 = a & 65535 | b << 16;
      h = ah7;
      l = al7;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[7];
      l = hl[7];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[7] = ah7 = c & 65535 | d << 16;
      hl[7] = al7 = a & 65535 | b << 16;
      pos += 128;
      n -= 128;
    }
    return n;
  }
  function crypto_hash(out, m, n) {
    var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i2, b = n;
    hh[0] = 1779033703;
    hh[1] = 3144134277;
    hh[2] = 1013904242;
    hh[3] = 2773480762;
    hh[4] = 1359893119;
    hh[5] = 2600822924;
    hh[6] = 528734635;
    hh[7] = 1541459225;
    hl[0] = 4089235720;
    hl[1] = 2227873595;
    hl[2] = 4271175723;
    hl[3] = 1595750129;
    hl[4] = 2917565137;
    hl[5] = 725511199;
    hl[6] = 4215389547;
    hl[7] = 327033209;
    crypto_hashblocks_hl(hh, hl, m, n);
    n %= 128;
    for (i2 = 0; i2 < n; i2++)
      x[i2] = m[b - n + i2];
    x[n] = 128;
    n = 256 - 128 * (n < 112 ? 1 : 0);
    x[n - 9] = 0;
    ts64(x, n - 8, b / 536870912 | 0, b << 3);
    crypto_hashblocks_hl(hh, hl, x, n);
    for (i2 = 0; i2 < 8; i2++)
      ts64(out, 8 * i2, hh[i2], hl[i2]);
    return 0;
  }
  function add(p, q) {
    var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
    Z(a, p[1], p[0]);
    Z(t, q[1], q[0]);
    M(a, a, t);
    A(b, p[0], p[1]);
    A(t, q[0], q[1]);
    M(b, b, t);
    M(c, p[3], q[3]);
    M(c, c, D2);
    M(d, p[2], q[2]);
    A(d, d, d);
    Z(e, b, a);
    Z(f, d, c);
    A(g, d, c);
    A(h, b, a);
    M(p[0], e, f);
    M(p[1], h, g);
    M(p[2], g, f);
    M(p[3], e, h);
  }
  function cswap(p, q, b) {
    var i2;
    for (i2 = 0; i2 < 4; i2++) {
      sel25519(p[i2], q[i2], b);
    }
  }
  function pack(r, p) {
    var tx = gf(), ty = gf(), zi = gf();
    inv25519(zi, p[2]);
    M(tx, p[0], zi);
    M(ty, p[1], zi);
    pack25519(r, ty);
    r[31] ^= par25519(tx) << 7;
  }
  function scalarmult(p, q, s) {
    var b, i2;
    set25519(p[0], gf0);
    set25519(p[1], gf1);
    set25519(p[2], gf1);
    set25519(p[3], gf0);
    for (i2 = 255; i2 >= 0; --i2) {
      b = s[i2 / 8 | 0] >> (i2 & 7) & 1;
      cswap(p, q, b);
      add(q, p);
      add(p, p);
      cswap(p, q, b);
    }
  }
  function scalarbase(p, s) {
    var q = [gf(), gf(), gf(), gf()];
    set25519(q[0], X);
    set25519(q[1], Y);
    set25519(q[2], gf1);
    M(q[3], X, Y);
    scalarmult(p, q, s);
  }
  var L = new Float64Array([
    237,
    211,
    245,
    92,
    26,
    99,
    18,
    88,
    214,
    156,
    247,
    162,
    222,
    249,
    222,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    16
  ]);
  function modL(r, x) {
    var carry, i2, j, k;
    for (i2 = 63; i2 >= 32; --i2) {
      carry = 0;
      for (j = i2 - 32, k = i2 - 12; j < k; ++j) {
        x[j] += carry - 16 * x[i2] * L[j - (i2 - 32)];
        carry = x[j] + 128 >> 8;
        x[j] -= carry * 256;
      }
      x[j] += carry;
      x[i2] = 0;
    }
    carry = 0;
    for (j = 0; j < 32; j++) {
      x[j] += carry - (x[31] >> 4) * L[j];
      carry = x[j] >> 8;
      x[j] &= 255;
    }
    for (j = 0; j < 32; j++)
      x[j] -= carry * L[j];
    for (i2 = 0; i2 < 32; i2++) {
      x[i2 + 1] += x[i2] >> 8;
      r[i2] = x[i2] & 255;
    }
  }
  function reduce(r) {
    var x = new Float64Array(64), i2;
    for (i2 = 0; i2 < 64; i2++)
      x[i2] = r[i2];
    for (i2 = 0; i2 < 64; i2++)
      r[i2] = 0;
    modL(r, x);
  }
  function crypto_sign_direct(sm, m, n, sk) {
    var h = new Uint8Array(64), r = new Uint8Array(64);
    var i2, j, x = new Float64Array(64);
    var p = [gf(), gf(), gf(), gf()];
    for (i2 = 0; i2 < n; i2++)
      sm[64 + i2] = m[i2];
    for (i2 = 0; i2 < 32; i2++)
      sm[32 + i2] = sk[i2];
    crypto_hash(r, sm.subarray(32), n + 32);
    reduce(r);
    scalarbase(p, r);
    pack(sm, p);
    for (i2 = 0; i2 < 32; i2++)
      sm[i2 + 32] = sk[32 + i2];
    crypto_hash(h, sm, n + 64);
    reduce(h);
    for (i2 = 0; i2 < 64; i2++)
      x[i2] = 0;
    for (i2 = 0; i2 < 32; i2++)
      x[i2] = r[i2];
    for (i2 = 0; i2 < 32; i2++) {
      for (j = 0; j < 32; j++) {
        x[i2 + j] += h[i2] * sk[j];
      }
    }
    modL(sm.subarray(32), x);
    return n + 64;
  }
  function crypto_sign_direct_rnd(sm, m, n, sk, rnd) {
    var h = new Uint8Array(64), r = new Uint8Array(64);
    var i2, j, x = new Float64Array(64);
    var p = [gf(), gf(), gf(), gf()];
    sm[0] = 254;
    for (i2 = 1; i2 < 32; i2++)
      sm[i2] = 255;
    for (i2 = 0; i2 < 32; i2++)
      sm[32 + i2] = sk[i2];
    for (i2 = 0; i2 < n; i2++)
      sm[64 + i2] = m[i2];
    for (i2 = 0; i2 < 64; i2++)
      sm[n + 64 + i2] = rnd[i2];
    crypto_hash(r, sm, n + 128);
    reduce(r);
    scalarbase(p, r);
    pack(sm, p);
    for (i2 = 0; i2 < 32; i2++)
      sm[i2 + 32] = sk[32 + i2];
    crypto_hash(h, sm, n + 64);
    reduce(h);
    for (i2 = 0; i2 < 64; i2++)
      sm[n + 64 + i2] = 0;
    for (i2 = 0; i2 < 64; i2++)
      x[i2] = 0;
    for (i2 = 0; i2 < 32; i2++)
      x[i2] = r[i2];
    for (i2 = 0; i2 < 32; i2++) {
      for (j = 0; j < 32; j++) {
        x[i2 + j] += h[i2] * sk[j];
      }
    }
    modL(sm.subarray(32, n + 64), x);
    return n + 64;
  }
  function curve25519_sign(sm, m, n, sk, opt_rnd) {
    var edsk = new Uint8Array(64);
    var p = [gf(), gf(), gf(), gf()];
    for (var i2 = 0; i2 < 32; i2++)
      edsk[i2] = sk[i2];
    edsk[0] &= 248;
    edsk[31] &= 127;
    edsk[31] |= 64;
    scalarbase(p, edsk);
    pack(edsk.subarray(32), p);
    var signBit = edsk[63] & 128;
    var smlen;
    if (opt_rnd) {
      smlen = crypto_sign_direct_rnd(sm, m, n, edsk, opt_rnd);
    } else {
      smlen = crypto_sign_direct(sm, m, n, edsk);
    }
    sm[63] |= signBit;
    return smlen;
  }
  function unpackneg(r, p) {
    var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
    set25519(r[2], gf1);
    unpack25519(r[1], p);
    S(num, r[1]);
    M(den, num, D);
    Z(num, num, r[2]);
    A(den, r[2], den);
    S(den2, den);
    S(den4, den2);
    M(den6, den4, den2);
    M(t, den6, num);
    M(t, t, den);
    pow2523(t, t);
    M(t, t, num);
    M(t, t, den);
    M(t, t, den);
    M(r[0], t, den);
    S(chk, r[0]);
    M(chk, chk, den);
    if (neq25519(chk, num))
      M(r[0], r[0], I);
    S(chk, r[0]);
    M(chk, chk, den);
    if (neq25519(chk, num))
      return -1;
    if (par25519(r[0]) === p[31] >> 7)
      Z(r[0], gf0, r[0]);
    M(r[3], r[0], r[1]);
    return 0;
  }
  function crypto_sign_open(m, sm, n, pk) {
    var i2, mlen;
    var t = new Uint8Array(32), h = new Uint8Array(64);
    var p = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
    mlen = -1;
    if (n < 64)
      return -1;
    if (unpackneg(q, pk))
      return -1;
    for (i2 = 0; i2 < n; i2++)
      m[i2] = sm[i2];
    for (i2 = 0; i2 < 32; i2++)
      m[i2 + 32] = pk[i2];
    crypto_hash(h, m, n);
    reduce(h);
    scalarmult(p, q, h);
    scalarbase(q, sm.subarray(32));
    add(p, q);
    pack(t, p);
    n -= 64;
    if (crypto_verify_32(sm, 0, t, 0)) {
      for (i2 = 0; i2 < n; i2++)
        m[i2] = 0;
      return -1;
    }
    for (i2 = 0; i2 < n; i2++)
      m[i2] = sm[i2 + 64];
    mlen = n;
    return mlen;
  }
  function convertPublicKey(pk) {
    var z = new Uint8Array(32), x = gf(), a = gf(), b = gf();
    unpack25519(x, pk);
    A(a, x, gf1);
    Z(b, x, gf1);
    inv25519(a, a);
    M(a, a, b);
    pack25519(z, a);
    return z;
  }
  function curve25519_sign_open(m, sm, n, pk) {
    var edpk = convertPublicKey(pk);
    edpk[31] |= sm[63] & 128;
    sm[63] &= 127;
    return crypto_sign_open(m, sm, n, edpk);
  }
  function checkArrayTypes(...args) {
    var t, i2;
    for (i2 = 0; i2 < arguments.length; i2++) {
      if ((t = Object.prototype.toString.call(arguments[i2])) !== "[object Uint8Array]")
        throw new TypeError("unexpected type " + t + ", use Uint8Array");
    }
  }
  function sharedKey(secretKey, publicKey) {
    checkArrayTypes(publicKey, secretKey);
    if (publicKey.length !== 32)
      throw new Error("wrong public key length");
    if (secretKey.length !== 32)
      throw new Error("wrong secret key length");
    var sharedKey2 = new Uint8Array(32);
    crypto_scalarmult(sharedKey2, secretKey, publicKey);
    return sharedKey2;
  }
  var sharedKey_1 = lib.sharedKey = sharedKey;
  function signMessage(secretKey, msg, opt_random) {
    checkArrayTypes(msg, secretKey);
    if (secretKey.length !== 32)
      throw new Error("wrong secret key length");
    if (opt_random) {
      checkArrayTypes(opt_random);
      if (opt_random.length !== 64)
        throw new Error("wrong random data length");
      var buf = new Uint8Array(128 + msg.length);
      curve25519_sign(buf, msg, msg.length, secretKey, opt_random);
      return new Uint8Array(buf.subarray(0, 64 + msg.length));
    } else {
      var signedMsg = new Uint8Array(64 + msg.length);
      curve25519_sign(signedMsg, msg, msg.length, secretKey);
      return signedMsg;
    }
  }
  lib.signMessage = signMessage;
  function openMessage(publicKey, signedMsg) {
    checkArrayTypes(signedMsg, publicKey);
    if (publicKey.length !== 32)
      throw new Error("wrong public key length");
    var tmp = new Uint8Array(signedMsg.length);
    var mlen = curve25519_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
    if (mlen < 0)
      return null;
    var m = new Uint8Array(mlen);
    for (var i2 = 0; i2 < m.length; i2++)
      m[i2] = tmp[i2];
    return m;
  }
  lib.openMessage = openMessage;
  function sign(secretKey, msg, opt_random) {
    checkArrayTypes(secretKey, msg);
    if (secretKey.length !== 32)
      throw new Error("wrong secret key length");
    if (opt_random) {
      checkArrayTypes(opt_random);
      if (opt_random.length !== 64)
        throw new Error("wrong random data length");
    }
    var buf = new Uint8Array((opt_random ? 128 : 64) + msg.length);
    curve25519_sign(buf, msg, msg.length, secretKey, opt_random);
    var signature = new Uint8Array(64);
    for (var i2 = 0; i2 < signature.length; i2++)
      signature[i2] = buf[i2];
    return signature;
  }
  lib.sign = sign;
  function verify(publicKey, msg, signature) {
    checkArrayTypes(msg, signature, publicKey);
    if (signature.length !== 64)
      throw new Error("wrong signature length");
    if (publicKey.length !== 32)
      throw new Error("wrong public key length");
    var sm = new Uint8Array(64 + msg.length);
    var m = new Uint8Array(64 + msg.length);
    var i2;
    for (i2 = 0; i2 < 64; i2++)
      sm[i2] = signature[i2];
    for (i2 = 0; i2 < msg.length; i2++)
      sm[i2 + 64] = msg[i2];
    return curve25519_sign_open(m, sm, sm.length, publicKey) >= 0;
  }
  lib.verify = verify;
  function generateKeyPair(seed) {
    checkArrayTypes(seed);
    if (seed.length !== 32)
      throw new Error("wrong seed length");
    var sk = new Uint8Array(32);
    var pk = new Uint8Array(32);
    for (var i2 = 0; i2 < 32; i2++)
      sk[i2] = seed[i2];
    crypto_scalarmult_base(pk, sk);
    sk[0] &= 248;
    sk[31] &= 127;
    sk[31] |= 64;
    pk[31] &= 127;
    return {
      public: pk,
      private: sk
    };
  }
  var generateKeyPair_1 = lib.generateKeyPair = generateKeyPair;
  lib.default = {};
  const _Guid = class {
    static isGuid(guid) {
      const value = guid.toString();
      return guid && (guid instanceof _Guid || _Guid.validator.test(value));
    }
    static create() {
      return new _Guid([_Guid.gen(2), _Guid.gen(1), _Guid.gen(1), _Guid.gen(1), _Guid.gen(3)].join("-"));
    }
    static createEmpty() {
      return new _Guid("emptyguid");
    }
    static parse(guid) {
      return new _Guid(guid);
    }
    static raw() {
      return [_Guid.gen(2), _Guid.gen(1), _Guid.gen(1), _Guid.gen(1), _Guid.gen(3)].join("-");
    }
    static gen(count) {
      let out = "";
      for (let i2 = 0; i2 < count; i2++) {
        out += ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }
      return out;
    }
    constructor(guid) {
      if (!guid) {
        throw new TypeError("Invalid argument; `value` has no value.");
      }
      this.value = _Guid.EMPTY;
      if (guid && _Guid.isGuid(guid)) {
        this.value = guid;
      }
    }
    equals(other) {
      return _Guid.isGuid(other) && this.value === other.toString();
    }
    isEmpty() {
      return this.value === _Guid.EMPTY;
    }
    toString() {
      return this.value;
    }
    toJSON() {
      return {
        value: this.value
      };
    }
  };
  let Guid = _Guid;
  Guid.validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");
  Guid.EMPTY = "00000000-0000-0000-0000-000000000000";
  const uniObj = getUni();
  function getUni() {
    if (typeof uni === "undefined") {
      console.log("不是UniApp运行环境");
    } else {
      console.log("是UniApp运行环境");
      return uni;
    }
  }
  var ConnectStatus = /* @__PURE__ */ ((ConnectStatus2) => {
    ConnectStatus2[ConnectStatus2["Disconnect"] = 0] = "Disconnect";
    ConnectStatus2[ConnectStatus2["Connected"] = 1] = "Connected";
    ConnectStatus2[ConnectStatus2["Connecting"] = 2] = "Connecting";
    ConnectStatus2[ConnectStatus2["ConnectFail"] = 3] = "ConnectFail";
    ConnectStatus2[ConnectStatus2["ConnectKick"] = 4] = "ConnectKick";
    return ConnectStatus2;
  })(ConnectStatus || {});
  class ConnectManager {
    // 接受数据临时缓存
    constructor() {
      this.status = 0;
      this.connectStatusListeners = new Array();
      this.lockReconnect = false;
      this.pongRespTimeoutInterval = 3e3;
      this.needReconnect = true;
      this.pingRetryCount = 0;
      this.pingMaxRetryCount = 3;
      this.tempBufferData = new Array();
    }
    static shared() {
      if (!this.instance) {
        this.instance = new ConnectManager();
      }
      return this.instance;
    }
    stopHeart() {
      if (this.heartTimer) {
        clearInterval(this.heartTimer);
        this.heartTimer = null;
      }
    }
    stopReconnectTimer() {
      if (this.reConnectTimeout) {
        clearTimeout(this.reConnectTimeout);
        this.reConnectTimeout = null;
      }
    }
    // 重置心跳
    restHeart() {
      const self2 = this;
      if (this.heartTimer) {
        clearInterval(this.heartTimer);
      }
      if (this.pongRespTimer) {
        clearTimeout(this.pongRespTimer);
      }
      this.heartTimer = setInterval(() => {
        self2.sendPing();
        if (self2.pingRetryCount > self2.pingMaxRetryCount) {
          console.log("ping没有响应，断开连接。");
          self2.onlyDisconnect();
          if (this.status === 0) {
            self2.connect();
          }
        } else if (self2.pingRetryCount > 1) {
          console.log(`第${self2.pingRetryCount}次，尝试ping。`);
        }
      }, WKSDK.shared().config.heartbeatInterval);
    }
    connect() {
      this.needReconnect = true;
      this.onlyConnect();
    }
    onlyConnect() {
      if (this.status === 2) {
        console.log("已在连接中，不再进行连接.");
        return;
      }
      if (WKSDK.shared().config.provider.connectAddrCallback != null) {
        const connectAddrCallback = WKSDK.shared().config.provider.connectAddrCallback;
        connectAddrCallback((addr) => {
          this.connectWithAddr(addr);
        });
      } else {
        this.connectWithAddr(WKSDK.shared().config.addr);
      }
    }
    connectWithAddr(addr) {
      this.status = 2;
      console.log("connectWithAddr--->", addr);
      uniObj.connectSocket({
        url: addr
      });
      const self2 = this;
      uniObj.onSocketOpen(() => {
        console.log("onSocketOpen....");
        self2.tempBufferData = new Array();
        const seed = Uint8Array.from(self2.stringToUint(Guid.create().toString().replace(/-/g, "")));
        const keyPair = generateKeyPair_1(seed);
        const pubKey = buffer.Buffer.from(keyPair.public).toString("base64");
        self2.dhPrivateKey = keyPair.private;
        const connectPacket = new ConnectPacket();
        connectPacket.clientKey = pubKey;
        connectPacket.version = 5;
        connectPacket.deviceFlag = 1;
        const deviceID = Guid.create().toString().replace(/-/g, "");
        connectPacket.deviceID = deviceID + "W";
        connectPacket.clientTimestamp = (/* @__PURE__ */ new Date()).getTime();
        connectPacket.uid = WKSDK.shared().config.uid || "";
        connectPacket.token = WKSDK.shared().config.token || "";
        const data = self2.getProto().encode(connectPacket);
        uniObj.sendSocketMessage({ data });
      });
      uniObj.onSocketMessage((e) => {
        self2.unpacket(new Uint8Array(e.data), (packets) => {
          if (packets.length > 0) {
            for (const packetData of packets) {
              self2.onPacket(new Uint8Array(packetData));
            }
          }
        });
      });
      uniObj.onSocketClose((params) => {
        console.log("连接关闭！", params);
        if (this.status !== 0) {
          this.status = 0;
          this.notifyConnectStatusListeners(0);
        }
        if (self2.needReconnect) {
          this.reConnect();
        }
      });
      uniObj.onSocketError((params) => {
        console.log("连接出错！", params);
        if (this.status !== 0) {
          this.status = 0;
          this.notifyConnectStatusListeners(0);
        }
        if (self2.needReconnect) {
          this.reConnect();
        }
      });
    }
    /* tslint:disable */
    stringToUint(str) {
      const string = unescape(encodeURIComponent(str));
      const charList = string.split("");
      const uintArray = new Array();
      for (let i2 = 0; i2 < charList.length; i2++) {
        uintArray.push(charList[i2].charCodeAt(0));
      }
      return uintArray;
    }
    connected() {
      return this.status === 1;
    }
    disconnect() {
      this.needReconnect = false;
      console.log("断开不再重连");
      this.onlyDisconnect();
    }
    onlyDisconnect() {
      this.stopHeart();
      this.stopReconnectTimer();
      uniObj.closeSocket();
    }
    // 重连
    reConnect() {
      if (this.lockReconnect) {
        return;
      }
      console.log("开始重连");
      this.lockReconnect = true;
      if (this.reConnectTimeout) {
        clearTimeout(this.reConnectTimeout);
      }
      const self2 = this;
      this.reConnectTimeout = setTimeout(() => {
        self2.onlyConnect();
        this.lockReconnect = false;
      }, 3e3);
    }
    wssend(message) {
      if (this.status == 1) {
        uniObj.sendSocketMessage({
          data: this.getProto().encode(message)
        });
      }
    }
    unpacket(data, callback) {
      try {
        this.tempBufferData.push(...Array.from(data));
        let lenBefore, lenAfter;
        const dataList = new Array();
        do {
          lenBefore = this.tempBufferData.length;
          this.tempBufferData = this.unpackOne(this.tempBufferData, (packetData) => {
            dataList.push(packetData);
          });
          lenAfter = this.tempBufferData.length;
          if (lenAfter > 0) {
            console.log("有粘包！-->", this.tempBufferData);
          }
          if (dataList.length > 0) {
            callback(dataList);
          }
        } while (lenBefore != lenAfter && lenAfter >= 1);
      } catch (error) {
        console.log("解码数据异常---->", error);
        this.reConnect();
      }
    }
    unpackOne(data, dataCallback) {
      const header = data[0];
      const packetType = header >> 4;
      if (packetType == PacketType.PONG) {
        dataCallback([header]);
        return data.slice(1);
      }
      const length = data.length;
      const fixedHeaderLength = 1;
      let pos = fixedHeaderLength;
      let digit = 0;
      let remLength = 0;
      let multiplier = 1;
      let hasLength = false;
      let remLengthFull = true;
      do {
        if (pos > length - 1) {
          remLengthFull = false;
          break;
        }
        digit = data[pos++];
        remLength += (digit & 127) * multiplier;
        multiplier *= 128;
        hasLength = (digit & 128) != 0;
      } while (hasLength);
      if (!remLengthFull) {
        return data;
      }
      let remLengthLength = pos - fixedHeaderLength;
      if (fixedHeaderLength + remLengthLength + remLength > length) {
        console.log("还有包未到，存入缓存！！！");
        return data;
      } else {
        if (fixedHeaderLength + remLengthLength + remLength == length) {
          dataCallback(data);
          return [];
        } else {
          const packetLength = fixedHeaderLength + remLengthLength + remLength;
          dataCallback(data.slice(0, packetLength));
          return data.slice(packetLength, length - packetLength);
        }
      }
    }
    onPacket(data) {
      const p = this.getProto().decode(data);
      if (p.packetType === PacketType.CONNACK) {
        const connackPacket = p;
        if (connackPacket.reasonCode === 1) {
          console.log("连接成功！");
          this.status = 1;
          this.pingRetryCount = 0;
          this.restHeart();
          const serverPubKey = Uint8Array.from(buffer.Buffer.from(connackPacket.serverKey, "base64"));
          const secret = sharedKey_1(this.dhPrivateKey, serverPubKey);
          const secretBase64 = buffer.Buffer.from(secret).toString("base64");
          const aesKeyFull = Md5.init(secretBase64);
          SecurityManager.shared().aesKey = aesKeyFull.substring(0, 16);
          if (connackPacket.salt && connackPacket.salt.length > 16) {
            SecurityManager.shared().aesIV = connackPacket.salt.substring(0, 16);
          } else {
            SecurityManager.shared().aesIV = connackPacket.salt;
          }
          WKSDK.shared().chatManager.flushSendingQueue();
        } else {
          console.log("连接失败！错误->", connackPacket.reasonCode);
          this.status = 3;
          this.needReconnect = false;
        }
        this.notifyConnectStatusListeners(connackPacket.reasonCode);
      } else if (p.packetType === PacketType.PONG) {
        this.pingRetryCount = 0;
      } else if (p.packetType === PacketType.DISCONNECT) {
        const disconnectPacket = p;
        console.log("连接被踢->", disconnectPacket);
        this.status = 4;
        this.needReconnect = false;
        this.notifyConnectStatusListeners(disconnectPacket.reasonCode);
      }
      WKSDK.shared().chatManager.onPacket(p);
    }
    sendPing() {
      this.pingRetryCount++;
      this.sendPacket(new PingPacket());
    }
    sendPacket(p) {
      if (this.connected()) {
        this.wssend(p);
      } else {
        this.reConnect();
      }
    }
    getProto() {
      return WKSDK.shared().config.proto;
    }
    // 添加连接状态监听
    addConnectStatusListener(listener) {
      this.connectStatusListeners.push(listener);
    }
    removeConnectStatusListener(listener) {
      const len2 = this.connectStatusListeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.connectStatusListeners[i2]) {
          this.connectStatusListeners.splice(i2, 1);
          return;
        }
      }
    }
    notifyConnectStatusListeners(reasonCode) {
      if (this.connectStatusListeners) {
        this.connectStatusListeners.forEach((listener) => {
          if (listener) {
            listener(this.status, reasonCode);
          }
        });
      }
    }
    sendRecvackPacket(recvPacket) {
      const packet = new RecvackPacket();
      packet.messageID = recvPacket.messageID;
      packet.messageSeq = recvPacket.messageSeq;
      this.sendPacket(packet);
    }
    close() {
      uniObj.closeSocket();
    }
  }
  const ChannelTypePerson = 1;
  const ChannelTypeGroup = 2;
  class Channel {
    constructor(channelID, channelType) {
      this.channelID = channelID;
      this.channelType = channelType;
    }
    getChannelKey() {
      return `${this.channelID}-${this.channelType}`;
    }
    static fromChannelKey(channelKey) {
      const channelProps = channelKey.split("-");
      if (channelProps.length >= 2) {
        const channelType = parseInt(channelProps[1], 0);
        return new Channel(channelProps[0], channelType);
      }
      return void 0;
    }
    isEqual(c) {
      if (this.channelID === c.channelID && this.channelType === c.channelType) {
        return true;
      }
      return false;
    }
  }
  function decodePayload(payload) {
    let contentType = 0;
    if (payload) {
      const encodedString = String.fromCharCode.apply(null, Array.from(payload));
      const decodedString = decodeURIComponent(escape(encodedString));
      const contentObj = JSON.parse(decodedString);
      if (contentObj) {
        contentType = contentObj.type;
      }
    }
    const messageContent = MessageContentManager.shared().getMessageContent(contentType);
    messageContent.decode(payload);
    return messageContent;
  }
  class MessageHeader {
    // 是否是重发
  }
  var MessageStatus = /* @__PURE__ */ ((MessageStatus2) => {
    MessageStatus2[MessageStatus2["Wait"] = 0] = "Wait";
    MessageStatus2[MessageStatus2["Normal"] = 1] = "Normal";
    MessageStatus2[MessageStatus2["Fail"] = 2] = "Fail";
    return MessageStatus2;
  })(MessageStatus || {});
  class Message {
    constructor(recvPacket) {
      this.header = new MessageHeader();
      this.setting = new Setting();
      this.voicePlaying = false;
      this.voiceReaded = false;
      this.isDeleted = false;
      this.remoteExtra = new MessageExtra();
      if (recvPacket) {
        this.header.reddot = recvPacket.reddot;
        this.header.dup = recvPacket.dup;
        this.header.noPersist = recvPacket.noPersist;
        this.header.syncOnce = recvPacket.syncOnce;
        this.setting = Setting.fromUint8(recvPacket.setting);
        this.messageID = recvPacket.messageID;
        this.messageSeq = recvPacket.messageSeq;
        this.clientMsgNo = recvPacket.clientMsgNo;
        this.fromUID = recvPacket.fromUID;
        this.channel = new Channel(recvPacket.channelID, recvPacket.channelType);
        this.timestamp = recvPacket.timestamp;
        this.content = decodePayload(recvPacket.payload);
        this.status = 1;
      }
    }
    static fromSendPacket(sendPacket, content) {
      const m = new Message();
      m.header.reddot = true;
      m.setting = Setting.fromUint8(sendPacket.setting);
      m.clientMsgNo = sendPacket.clientMsgNo;
      m.clientSeq = sendPacket.clientSeq;
      m.fromUID = sendPacket.fromUID;
      m.channel = new Channel(sendPacket.channelID, sendPacket.channelType);
      if (content) {
        m.content = content;
      } else {
        m.content = decodePayload(sendPacket.payload);
      }
      m.timestamp = parseInt(((/* @__PURE__ */ new Date()).getTime() / 1e3).toString());
      m.status = 0;
      return m;
    }
    // 是否是发送的消息
    get send() {
      return this.fromUID === WKSDK.shared().config.uid;
    }
    get contentType() {
      return this.content.contentType;
    }
  }
  class MessageExtra {
    constructor() {
      this.readedCount = 0;
      this.unreadCount = 0;
      this.revoke = false;
      this.editedAt = 0;
      this.isEdit = false;
      this.extra = {};
      this.extraVersion = 0;
    }
    // 扩展数据版本 
  }
  class Mention {
    // @指定的人
  }
  class MessageContent {
    get contentType() {
      return this._contentType;
    }
    set contentType(value) {
      this._contentType = value;
    }
    get conversationDigest() {
      return this._conversationDigest;
    }
    set conversationDigest(value) {
      this._conversationDigest = value;
    }
    encode() {
      const contentObj = this.encodeJSON();
      contentObj.type = this.contentType;
      if (this.mention) {
        const mentionObj = {};
        if (this.mention.all) {
          mentionObj["all"] = 1;
        }
        if (this.mention.uids) {
          mentionObj["uids"] = this.mention.uids;
        }
        contentObj["mention"] = mentionObj;
      }
      if (this.reply) {
        contentObj["reply"] = this.reply.encode();
      }
      const contentStr = JSON.stringify(contentObj);
      return stringToUint8Array(contentStr);
    }
    decode(data) {
      const decodedString = uint8ArrayToString(data);
      const contentObj = JSON.parse(decodedString);
      this.contentObj = contentObj;
      if (contentObj) {
        this._contentType = contentObj.type;
      }
      const mentionObj = contentObj["mention"];
      if (mentionObj) {
        const mention = new Mention();
        mention.all = mentionObj["all"] === 1;
        if (mentionObj["uids"]) {
          mention.uids = mentionObj["uids"];
        }
        this.mention = mention;
      }
      const replyObj = contentObj["reply"];
      if (replyObj) {
        const reply = new Reply();
        reply.decode(replyObj);
        this.reply = reply;
      }
      this.visibles = contentObj["visibles"];
      this.invisibles = contentObj["invisibles"];
      this.decodeJSON(contentObj);
    }
    // 是否可见
    isVisiable(uid) {
      if (this.visibles && this.visibles.length > 0) {
        const v = this.visibles.includes(uid);
        if (!v) {
          return false;
        }
      }
      if (this.invisibles && this.invisibles.length > 0) {
        const v = this.invisibles.includes(uid);
        if (v) {
          return false;
        }
      }
      return true;
    }
    // 子类重写
    // tslint:disable-next-line:no-empty
    decodeJSON(content) {
    }
    // 子类重写
    // tslint:disable-next-line:no-empty
    encodeJSON() {
      return {};
    }
  }
  function stringToUint8Array(str) {
    const newStr = unescape(encodeURIComponent(str));
    const arr = new Array();
    for (let i2 = 0, j = newStr.length; i2 < j; ++i2) {
      arr.push(newStr.charCodeAt(i2));
    }
    const tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
  }
  function uint8ArrayToString(fileData) {
    const encodedString = String.fromCharCode.apply(null, Array.from(fileData));
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
  }
  class MediaMessageContent extends MessageContent {
    // 处理data
    // tslint:disable-next-line:no-empty
    dealFile() {
    }
  }
  class ChannelInfo {
    constructor() {
      this.online = false;
      this.lastOffline = 0;
    }
    // 最后一次离线时间
  }
  class Conversation {
    constructor() {
      this._logicUnread = 0;
      this.timestamp = 0;
      this._reminders = new Array();
      this.simpleReminders = new Array();
    }
    // 除去重复的type了的reminder
    get channelInfo() {
      return WKSDK.shared().channelManager.getChannelInfo(this.channel);
    }
    isEqual(c) {
      if (!c) {
        return false;
      }
      return c.channel.getChannelKey() === this.channel.getChannelKey();
    }
    get isMentionMe() {
      if (this._isMentionMe === void 0) {
        this.reloadIsMentionMe();
      }
      return this._isMentionMe;
    }
    set isMentionMe(isMentionMe) {
      this._isMentionMe = isMentionMe;
    }
    get remoteExtra() {
      if (this._remoteExtra) {
        return this._remoteExtra;
      }
      this._remoteExtra = new ConversationExtra();
      this._remoteExtra.channel = this.channel;
      return this._remoteExtra;
    }
    set remoteExtra(remoteExtra) {
      this._remoteExtra = remoteExtra;
    }
    get logicUnread() {
      if (this.remoteExtra.browseTo > 0 && this.lastMessage && this.remoteExtra.browseTo <= this.lastMessage.messageSeq) {
        return this.lastMessage.messageSeq - this.remoteExtra.browseTo;
      }
      return this.unread;
    }
    set reminders(reminders) {
      this._reminders = reminders;
      const simpleReminders = new Array();
      if (reminders && reminders.length > 0) {
        for (const reminder of reminders) {
          if (reminder.done) {
            continue;
          }
          let exist = false;
          let i2 = 0;
          for (const simpleReminder of simpleReminders) {
            if (reminder.reminderType === simpleReminder.reminderType) {
              exist = true;
              break;
            }
            i2++;
          }
          if (!exist) {
            simpleReminders.push(reminder);
          } else {
            simpleReminders[i2] = reminder;
          }
        }
      }
      this.simpleReminders = simpleReminders;
    }
    get reminders() {
      return this._reminders;
    }
    // 重新计算 isMentionMe
    reloadIsMentionMe() {
      if (this.lastMessage && this.lastMessage.content) {
        const mention = this.lastMessage.content.mention;
        if (mention) {
          if (mention.all) {
            this._isMentionMe = true;
          }
          if (mention.uids && mention.uids.includes(WKSDK.shared().config.uid || "")) {
            this._isMentionMe = true;
          }
        }
      }
      if (!this._isMentionMe) {
        this._isMentionMe = false;
      }
    }
  }
  class ConversationExtra {
  }
  class Reply {
    encode() {
      const rep = {
        "message_id": this.messageID,
        "message_seq": this.messageSeq,
        "from_uid": this.fromUID,
        "from_name": this.fromName
      };
      if (this.rootMessageID) {
        rep["root_message_id"] = this.rootMessageID;
      }
      if (this.content) {
        rep["payload"] = JSON.parse(uint8ArrayToString(this.content.encode()));
      }
      return rep;
    }
    decode(data) {
      this.messageID = data["message_id"];
      this.messageSeq = data["message_seq"];
      this.fromUID = data["from_uid"];
      this.fromName = data["from_name"];
      this.rootMessageID = data["root_message_id"];
      if (data["payload"]) {
        const contentType = data["payload"]["type"];
        const messageContent = WKSDK.shared().getMessageContent(contentType);
        const payload = stringToUint8Array(JSON.stringify(data["payload"]));
        messageContent.decode(payload);
        this.content = messageContent;
      }
    }
  }
  var PullMode = /* @__PURE__ */ ((PullMode2) => {
    PullMode2[PullMode2["Down"] = 0] = "Down";
    PullMode2[PullMode2["Up"] = 1] = "Up";
    return PullMode2;
  })(PullMode || {});
  class MessageContentManager {
    constructor() {
      this.contentMap = /* @__PURE__ */ new Map();
    }
    static shared() {
      if (!this.instance) {
        this.instance = new MessageContentManager();
      }
      return this.instance;
    }
    register(contentType, handler) {
      this.contentMap.set(contentType, handler);
    }
    registerFactor(factor) {
      this.factor = factor;
    }
    getMessageContent(contentType) {
      const handler = this.contentMap.get(contentType);
      if (handler) {
        const content2 = handler(contentType);
        if (content2) {
          return content2;
        }
      }
      const content = this.factor(contentType);
      if (content) {
        return content;
      }
      return new UnknownContent();
    }
  }
  class MessageText extends MessageContent {
    constructor(text) {
      super();
      this.text = text;
    }
    get conversationDigest() {
      return this.text || "";
    }
    get contentType() {
      return MessageContentType.text;
    }
    decodeJSON(content) {
      this.text = content["content"];
    }
    encodeJSON() {
      return { content: this.text || "" };
    }
  }
  class MessageSignalContent extends MessageContent {
    get contentType() {
      return MessageContentType.signalMessage;
    }
  }
  class UnknownContent extends MessageContent {
    get contentType() {
      return MessageContentType.unknown;
    }
    get conversationDigest() {
      return "[未知消息]";
    }
    decodeJSON(content) {
      this.realContentType = content["type"];
    }
  }
  class SystemContent extends MessageContent {
    decodeJSON(content) {
      this.content = content;
    }
    get conversationDigest() {
      return this.displayText;
    }
    get displayText() {
      const extra = this.content["extra"];
      let content = this.content["content"];
      if (extra) {
        const extraArray = extra;
        if (extraArray && extraArray.length > 0) {
          for (let i2 = 0; i2 <= extraArray.length - 1; i2++) {
            const extrMap = extraArray[i2];
            const name = extrMap["name"] || "";
            content = content.replace(`{${i2}}`, name);
          }
        }
      }
      return content;
    }
  }
  class CMDContent extends MessageContent {
    decodeJSON(content) {
      this.cmd = content["cmd"];
      this.param = content["param"];
    }
    get contentType() {
      return MessageContentType.cmd;
    }
  }
  var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
    TaskStatus2[TaskStatus2["wait"] = 0] = "wait";
    TaskStatus2[TaskStatus2["success"] = 1] = "success";
    TaskStatus2[TaskStatus2["processing"] = 2] = "processing";
    TaskStatus2[TaskStatus2["fail"] = 3] = "fail";
    TaskStatus2[TaskStatus2["suspend"] = 4] = "suspend";
    TaskStatus2[TaskStatus2["cancel"] = 5] = "cancel";
    return TaskStatus2;
  })(TaskStatus || {});
  class TaskManager {
    constructor() {
      this.taskMap = /* @__PURE__ */ new Map();
      this.listeners = new Array();
    }
    addTask(task) {
      this.taskMap.set(task.id, task);
      task.addListener(() => {
        this.notifyListeners(task);
      });
      task.start();
    }
    removeTask(id) {
      const task = this.taskMap.get(id);
      if (task) {
        task.cancel();
        this.taskMap.delete(id);
      }
    }
    addListener(listener) {
      this.listeners.push(listener);
    }
    removeListener(listener) {
      const len2 = this.listeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.listeners[i2]) {
          this.listeners.splice(i2, 1);
          return;
        }
      }
    }
    notifyListeners(task) {
      if (this.listeners) {
        this.listeners.forEach((callback) => {
          callback(task);
        });
      }
    }
  }
  class BaseTask {
    // tslint:disable-next-line:no-empty
    start() {
    }
    // tslint:disable-next-line:no-empty
    suspend() {
    }
    // tslint:disable-next-line:no-empty
    resume() {
    }
    // tslint:disable-next-line:no-empty
    cancel() {
    }
    update() {
      if (this.listeners) {
        this.listeners.forEach((callback) => {
          callback();
        });
      }
    }
    progress() {
      return 0;
    }
    addListener(listener) {
      this.listeners.push(listener);
    }
    removeListener(listener) {
      const len2 = this.listeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.listeners[i2]) {
          this.listeners.splice(i2, 1);
          return;
        }
      }
    }
    get listeners() {
      if (!this._listeners) {
        this._listeners = new Array();
      }
      return this._listeners;
    }
  }
  class MessageTask extends BaseTask {
    constructor(message) {
      super();
      this.id = message.clientMsgNo;
      this.message = message;
    }
  }
  class ChatManager {
    constructor() {
      this.cmdListeners = new Array();
      this.listeners = new Array();
      this.sendingQueues = /* @__PURE__ */ new Map();
      this.sendStatusListeners = new Array();
      this.clientSeq = 0;
      if (WKSDK.shared().taskManager) {
        WKSDK.shared().taskManager.addListener((task) => {
          if (task.status === TaskStatus.success) {
            if (task instanceof MessageTask) {
              const messageTask = task;
              const sendPacket = this.sendingQueues.get(messageTask.message.clientSeq);
              if (sendPacket) {
                sendPacket.payload = messageTask.message.content.encode();
                WKSDK.shared().connectManager.sendPacket(sendPacket);
              }
            }
          }
        });
      }
    }
    static shared() {
      if (!this.instance) {
        this.instance = new ChatManager();
      }
      return this.instance;
    }
    async onPacket(packet) {
      if (packet instanceof RecvPacket) {
        const recvPacket = packet;
        const actMsgKey = SecurityManager.shared().encryption(recvPacket.veritifyString);
        const actMsgKeyMD5 = Md5.init(actMsgKey);
        if (actMsgKeyMD5 !== recvPacket.msgKey) {
          console.log(`非法的消息，期望msgKey:${recvPacket.msgKey} 实际msgKey:${actMsgKeyMD5} 忽略此消息！！`);
          return;
        }
        recvPacket.payload = SecurityManager.shared().decryption(recvPacket.payload);
        const message = new Message(recvPacket);
        this.sendRecvackPacket(recvPacket);
        if (message.contentType === MessageContentType.cmd) {
          this.notifyCMDListeners(message);
          return;
        }
        this.notifyMessageListeners(message);
      } else if (packet instanceof SendackPacket) {
        const sendack = packet;
        this.sendingQueues.delete(sendack.clientSeq);
        this.notifyMessageStatusListeners(sendack);
      }
    }
    async syncMessages(channel, opts) {
      if (!WKSDK.shared().config.provider.syncMessagesCallback) {
        throw new Error("没有设置WKSDK.shared().config.provider.syncMessagesCallback");
      }
      return WKSDK.shared().config.provider.syncMessagesCallback(channel, opts);
    }
    async syncMessageExtras(channel, extraVersion) {
      if (!WKSDK.shared().config.provider.syncMessageExtraCallback) {
        throw new Error("没有设置WKSDK.shared().config.provider.syncMessageExtraCallback");
      }
      return WKSDK.shared().config.provider.syncMessageExtraCallback(channel, extraVersion, 100);
    }
    sendRecvackPacket(recvPacket) {
      const packet = new RecvackPacket();
      packet.noPersist = recvPacket.noPersist;
      packet.syncOnce = recvPacket.syncOnce;
      packet.reddot = recvPacket.reddot;
      packet.messageID = recvPacket.messageID;
      packet.messageSeq = recvPacket.messageSeq;
      WKSDK.shared().connectManager.sendPacket(packet);
    }
    /**
     *  发送消息
     * @param content  消息内容
     * @param channel 频道对象
     * @param setting  发送设置
     * @returns 完整消息对象
     */
    async send(content, channel, setting) {
      const packet = this.getSendPacket(content, channel, setting);
      this.sendingQueues.set(packet.clientSeq, packet);
      const message = Message.fromSendPacket(packet, content);
      if (content instanceof MediaMessageContent) {
        const task = WKSDK.shared().config.provider.messageUploadTask(message);
        if (task) {
          WKSDK.shared().taskManager.addTask(task);
        }
      } else {
        WKSDK.shared().connectManager.sendPacket(packet);
      }
      this.notifyMessageListeners(message);
      return message;
    }
    getSendPacket(content, channel, setting = new Setting()) {
      const packet = new SendPacket();
      packet.setting = setting.toUint8();
      packet.reddot = true;
      packet.clientMsgNo = `${Guid.create().toString().replace(/-/gi, "")}3`;
      packet.clientSeq = this.getClientSeq();
      packet.fromUID = WKSDK.shared().config.uid || "";
      packet.channelID = channel.channelID;
      packet.channelType = channel.channelType;
      packet.payload = content.encode();
      return packet;
    }
    getClientSeq() {
      return ++this.clientSeq;
    }
    // 通知命令消息监听者
    notifyCMDListeners(message) {
      if (this.cmdListeners) {
        this.cmdListeners.forEach((listener) => {
          if (listener) {
            listener(message);
          }
        });
      }
    }
    // 添加命令类消息监听
    addCMDListener(listener) {
      this.cmdListeners.push(listener);
    }
    removeCMDListener(listener) {
      const len2 = this.cmdListeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.cmdListeners[i2]) {
          this.cmdListeners.splice(i2, 1);
          return;
        }
      }
    }
    // 添加消息监听
    addMessageListener(listener) {
      this.listeners.push(listener);
    }
    // 移除消息监听
    removeMessageListener(listener) {
      const len2 = this.listeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.listeners[i2]) {
          this.listeners.splice(i2, 1);
          return;
        }
      }
    }
    // 通知消息监听者
    notifyMessageListeners(message) {
      if (this.listeners) {
        this.listeners.forEach((listener) => {
          if (listener) {
            listener(message);
          }
        });
      }
    }
    // 通知消息状态改变监听者
    notifyMessageStatusListeners(sendackPacket) {
      if (this.sendStatusListeners) {
        this.sendStatusListeners.forEach((listener) => {
          if (listener) {
            listener(sendackPacket);
          }
        });
      }
    }
    // 消息状态改变监听
    addMessageStatusListener(listener) {
      this.sendStatusListeners.push(listener);
    }
    removeMessageStatusListener(listener) {
      const len2 = this.sendStatusListeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.sendStatusListeners[i2]) {
          this.sendStatusListeners.splice(i2, 1);
          return;
        }
      }
    }
    // 将发送消息队列里的消息flush出去
    flushSendingQueue() {
      if (this.sendingQueues.size <= 0) {
        return;
      }
      console.log(`flush 发送队列内的消息。数量${this.sendingQueues.size}`);
      let clientSeqArray = new Array();
      this.sendingQueues.forEach((value, key) => {
        clientSeqArray.push(key);
      });
      clientSeqArray = clientSeqArray.sort();
      for (const clientSeq of clientSeqArray) {
        const sendPacket = this.sendingQueues.get(clientSeq);
        if (sendPacket) {
          console.log("重试消息---->", sendPacket);
          WKSDK.shared().connectManager.sendPacket(sendPacket);
        }
      }
    }
    deleteMessageFromSendingQueue(clientSeq) {
      this.sendingQueues.delete(clientSeq);
    }
  }
  class ChannelManager {
    constructor() {
      this.channelInfocacheMap = {};
      this.requestQueueMap = /* @__PURE__ */ new Map();
      this.listeners = new Array();
      this.subscribeCacheMap = /* @__PURE__ */ new Map();
      this.requestSubscribeQueueMap = /* @__PURE__ */ new Map();
      this.subscriberChangeListeners = new Array();
      this.deleteChannelInfoListeners = new Array();
    }
    static shared() {
      if (!this.instance) {
        this.instance = new ChannelManager();
      }
      return this.instance;
    }
    // 提取频道信息
    async fetchChannelInfo(channel) {
      const channelKey = channel.getChannelKey();
      const has = this.requestQueueMap.get(channelKey);
      if (has) {
        return;
      }
      try {
        this.requestQueueMap.set(channelKey, true);
        if (WKSDK.shared().config.provider.channelInfoCallback != null) {
          const channelInfoModel = await WKSDK.shared().config.provider.channelInfoCallback(channel);
          this.channelInfocacheMap[channelKey] = channelInfoModel;
          if (channelInfoModel) {
            this.notifyListeners(channelInfoModel);
          }
        }
      } finally {
        this.requestQueueMap.delete(channelKey);
      }
    }
    // 同步订阅者
    async syncSubscribes(channel) {
      const channelKey = channel.getChannelKey();
      const has = this.requestSubscribeQueueMap.get(channelKey);
      if (has) {
        return;
      }
      try {
        this.requestSubscribeQueueMap.set(channelKey, true);
        let cacheSubscribers = this.subscribeCacheMap.get(channelKey);
        let version = 0;
        if (cacheSubscribers && cacheSubscribers.length > 0) {
          const lastMember = cacheSubscribers[cacheSubscribers.length - 1];
          version = lastMember.version;
        } else {
          cacheSubscribers = new Array();
        }
        const subscribers = await WKSDK.shared().config.provider.syncSubscribersCallback(channel, version || 0);
        if (subscribers && subscribers.length > 0) {
          for (const subscriber of subscribers) {
            let update = false;
            for (let j = 0; j < cacheSubscribers.length; j++) {
              const cacheSubscriber = cacheSubscribers[j];
              if (subscriber.uid === cacheSubscriber.uid) {
                update = true;
                cacheSubscribers[j] = subscriber;
                break;
              }
            }
            if (!update) {
              cacheSubscribers.push(subscriber);
            }
          }
        }
        this.subscribeCacheMap.set(channelKey, cacheSubscribers);
        this.notifySubscribeChangeListeners(channel);
      } finally {
        this.requestSubscribeQueueMap.delete(channelKey);
      }
    }
    getChannelInfo(channel) {
      return this.channelInfocacheMap[channel.getChannelKey()];
    }
    // 设置频道缓存
    setChannleInfoForCache(channelInfo) {
      this.channelInfocacheMap[channelInfo.channel.getChannelKey()] = channelInfo;
    }
    // 删除频道信息
    deleteChannelInfo(channel) {
      const channelInfo = this.channelInfocacheMap[channel.getChannelKey()];
      delete this.channelInfocacheMap[channel.getChannelKey()];
      return channelInfo;
    }
    getSubscribes(channel) {
      const subscribers = this.subscribeCacheMap.get(channel.getChannelKey());
      const newSubscribers = new Array();
      if (subscribers) {
        for (const subscriber of subscribers) {
          if (!subscriber.isDeleted) {
            newSubscribers.push(subscriber);
          }
        }
      }
      return newSubscribers;
    }
    // 获取我在频道内的信息
    getSubscribeOfMe(channel) {
      const subscribers = this.subscribeCacheMap.get(channel.getChannelKey());
      if (subscribers) {
        for (const subscriber of subscribers) {
          if (!subscriber.isDeleted && subscriber.uid === WKSDK.shared().config.uid) {
            return subscriber;
          }
        }
      }
      return null;
    }
    addSubscriberChangeListener(listener) {
      this.subscriberChangeListeners.push(listener);
    }
    removeSubscriberChangeListener(listener) {
      const len2 = this.subscriberChangeListeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.subscriberChangeListeners[i2]) {
          this.subscriberChangeListeners.splice(i2, 1);
          return;
        }
      }
    }
    // 添加删除频道信息监听
    addDeleteChannelInfoListener(listener) {
      this.deleteChannelInfoListeners.push(listener);
    }
    // 移除删除频道信息监听
    removeDeleteChannelInfoListener(listener) {
      const len2 = this.deleteChannelInfoListeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.deleteChannelInfoListeners[i2]) {
          this.deleteChannelInfoListeners.splice(i2, 1);
          return;
        }
      }
    }
    addListener(listener) {
      this.listeners.push(listener);
    }
    removeListener(listener) {
      const len2 = this.listeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.listeners[i2]) {
          this.listeners.splice(i2, 1);
          return;
        }
      }
    }
    // 通知成员监听变化
    notifySubscribeChangeListeners(channel) {
      if (this.subscriberChangeListeners) {
        this.subscriberChangeListeners.forEach((callback) => {
          callback(channel);
        });
      }
    }
    notifyListeners(channelInfoModel) {
      if (this.listeners) {
        this.listeners.forEach((callback) => {
          callback(channelInfoModel);
        });
      }
    }
  }
  var ConversationAction = /* @__PURE__ */ ((ConversationAction2) => {
    ConversationAction2[ConversationAction2["add"] = 0] = "add";
    ConversationAction2[ConversationAction2["update"] = 1] = "update";
    ConversationAction2[ConversationAction2["remove"] = 2] = "remove";
    return ConversationAction2;
  })(ConversationAction || {});
  class ConversationManager {
    constructor() {
      this.listeners = new Array();
      this.conversations = new Array();
      this.maxExtraVersion = 0;
      ChatManager.shared().addMessageListener((message) => {
        this.updateOrAddConversation(message);
      });
    }
    static shared() {
      if (!this.instance) {
        this.instance = new ConversationManager();
      }
      return this.instance;
    }
    // 同步最近会话
    sync(filter) {
      const syncProvide = WKSDK.shared().config.provider.syncConversationsCallback(filter);
      if (syncProvide) {
        syncProvide.then((conversations) => {
          this.conversations = conversations;
          if (conversations.length > 0) {
            for (const conversation of conversations) {
              if (conversation.remoteExtra.version > this.maxExtraVersion) {
                this.maxExtraVersion = conversation.remoteExtra.version;
              }
            }
          }
          WKSDK.shared().reminderManager.sync();
        }).catch((err) => {
          console.log("同步最近会话失败！", err);
        });
      }
      return syncProvide;
    }
    async syncExtra() {
      if (!WKSDK.shared().config.provider.syncConversationExtrasCallback) {
        console.log("syncConversationExtrasCallback没有提供");
        return;
      }
      const conversationExtras = await WKSDK.shared().config.provider.syncConversationExtrasCallback(this.maxExtraVersion);
      if (conversationExtras) {
        for (const conversationExtra of conversationExtras) {
          if (conversationExtra.version > this.maxExtraVersion) {
            this.maxExtraVersion = conversationExtra.version;
          }
          for (const conversation of this.conversations) {
            if (conversation.channel.isEqual(conversationExtra.channel)) {
              conversation.remoteExtra = conversationExtra;
              this.notifyConversationListeners(
                conversation,
                1
                /* update */
              );
            }
          }
        }
      }
      return conversationExtras;
    }
    findConversation(channel) {
      if (this.conversations) {
        for (const conversation of this.conversations) {
          if (conversation.channel.isEqual(channel)) {
            return conversation;
          }
        }
      }
    }
    findConversations(channels) {
      if (this.conversations && this.conversations.length > 0) {
        const conversations = new Array();
        for (const conversation of this.conversations) {
          for (const channel of channels) {
            if (conversation.channel.isEqual(channel)) {
              conversations.push(conversation);
              break;
            }
          }
        }
        return conversations;
      }
    }
    // 创建一个空会话
    createEmptyConversation(channel) {
      const conversation = this.findConversation(channel);
      if (conversation) {
        conversation.timestamp = (/* @__PURE__ */ new Date()).getTime() / 1e3;
        this.notifyConversationListeners(
          conversation,
          1
          /* update */
        );
        return conversation;
      } else {
        const newConversation = new Conversation();
        newConversation.channel = channel;
        newConversation.timestamp = (/* @__PURE__ */ new Date()).getTime() / 1e3;
        this.notifyConversationListeners(
          newConversation,
          0
          /* add */
        );
        return newConversation;
      }
    }
    updateOrAddConversation(message) {
      const conversation = this.findConversation(message.channel);
      let newConversation;
      if (!conversation) {
        newConversation = new Conversation();
        newConversation.unread = 0;
        newConversation.channel = message.channel;
        newConversation.timestamp = message.timestamp;
        if (!message.send && message.header.reddot && (!this.openConversation || !this.openConversation.channel.isEqual(message.channel))) {
          newConversation.unread++;
        }
        newConversation.lastMessage = message;
        this.conversations = [newConversation, ...this.conversations];
        this.notifyConversationListeners(
          newConversation,
          0
          /* add */
        );
      } else {
        if (!message.send && message.header.reddot && (!this.openConversation || !this.openConversation.channel.isEqual(message.channel))) {
          conversation.unread++;
        }
        conversation.timestamp = message.timestamp;
        conversation.lastMessage = message;
        newConversation = conversation;
        this.notifyConversationListeners(
          newConversation,
          1
          /* update */
        );
      }
    }
    removeConversation(channel) {
      if (!this.conversations || this.conversations.length === 0) {
        return;
      }
      let oldConversation;
      for (let index = 0; index < this.conversations.length; index++) {
        const conversation = this.conversations[index];
        if (conversation.channel.isEqual(channel)) {
          this.conversations.splice(index, 1);
          oldConversation = conversation;
        }
      }
      if (oldConversation) {
        this.notifyConversationListeners(
          oldConversation,
          2
          /* remove */
        );
      }
    }
    getAllUnreadCount() {
      let unreadCount = 0;
      if (this.conversations) {
        for (const conversation of this.conversations) {
          unreadCount += conversation.unread;
        }
      }
      return unreadCount;
    }
    // 添加最近会话监听
    addConversationListener(listener) {
      this.listeners.push(listener);
    }
    // 移除最近监听
    removeConversationListener(listener) {
      const len2 = this.listeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.listeners[i2]) {
          this.listeners.splice(i2, 1);
          return;
        }
      }
    }
    // 通知最近会话监听者
    notifyConversationListeners(conversation, action) {
      if (this.listeners) {
        this.listeners.forEach((listener) => {
          if (listener) {
            listener(conversation, action);
          }
        });
      }
    }
  }
  class ReminderManager {
    constructor() {
      this.reminders = new Array();
    }
    static shared() {
      if (!this.instance) {
        this.instance = new ReminderManager();
      }
      return this.instance;
    }
    async sync() {
      if (!WKSDK.shared().config.provider.syncRemindersCallback) {
        console.log("##########syncRemindersCallback##########");
        return;
      }
      const version = this.maxReminderVersion();
      const reminders = await WKSDK.shared().config.provider.syncRemindersCallback(version);
      if (reminders && reminders.length > 0) {
        const channels = /* @__PURE__ */ new Set();
        for (const newReminder of reminders) {
          channels.add(newReminder.channel);
          let exist = false;
          for (let index = 0; index < this.reminders.length; index++) {
            const reminder = this.reminders[index];
            if (newReminder.reminderID === reminder.reminderID) {
              this.reminders[index] = newReminder;
              exist = true;
              break;
            }
          }
          if (!exist) {
            this.reminders.push(newReminder);
          }
        }
        this.updateConversations(Array.from(channels));
      }
    }
    async done(ids) {
      if (!WKSDK.shared().config.provider.reminderDoneCallback) {
        console.log("##########reminderDoneCallback##########");
        return;
      }
      const reminders = this.getRemindersWithIDs(ids);
      if (reminders && reminders.length > 0) {
        for (const reminder of reminders) {
          reminder.done = true;
        }
        const channels = this.getChannelWithReminders(reminders);
        this.updateConversations(channels);
      }
      return WKSDK.shared().config.provider.reminderDoneCallback(ids);
    }
    getChannelWithReminders(reminders) {
      if (!reminders || reminders.length === 0) {
        return [];
      }
      const channels = /* @__PURE__ */ new Set();
      for (const reminder of reminders) {
        channels.add(reminder.channel);
      }
      return Array.from(channels);
    }
    updateConversations(channels) {
      const conversations = ConversationManager.shared().findConversations(channels);
      if (conversations && conversations.length > 0) {
        for (const conversation of conversations) {
          conversation.reminders = this.getWaitDoneReminders(conversation.channel);
          ConversationManager.shared().notifyConversationListeners(conversation, ConversationAction.update);
        }
      }
    }
    getWaitDoneReminders(channel) {
      const channelReminders = new Array();
      for (const reminder of this.reminders) {
        if (reminder.channel.isEqual(channel)) {
          channelReminders.push(reminder);
        }
      }
      return channelReminders;
    }
    getRemindersWithIDs(ids) {
      const newReminders = new Array();
      for (const reminder of this.reminders) {
        for (const id of ids) {
          if (reminder.reminderID === id) {
            newReminders.push(reminder);
            break;
          }
        }
      }
      return newReminders;
    }
    maxReminderVersion() {
      let maxVersion = 0;
      for (const reminder of this.reminders) {
        if (reminder.version > maxVersion) {
          maxVersion = reminder.version;
        }
      }
      return maxVersion;
    }
  }
  class Provider {
    // // 获取IM连接地址
    // public set connectAddrCallback(callback: (callback: ConnectAddrCallback) => void) {
    //     this._connectAddrCallback = callback
    // }
    // public get connectAddrCallback(): (callback: ConnectAddrCallback) => void {
    //     return this._connectAddrCallback
    // }
    // 获取频道信息
    // public set channelInfoCallback(callback: ChannelInfoCallback) {
    //     this._channelInfoCallback = callback
    // }
    // public get channelInfoCallback(): ChannelInfoCallback {
    //     return this._channelInfoCallback
    // }
    // 获取频道订阅者
    // public set syncSubscribersCallback(callback: SyncSubscribersCallback) {
    //     this._syncSubscribersCallback = callback
    // }
    // public get syncSubscribersCallback(): SyncSubscribersCallback {
    //     return this._syncSubscribersCallback
    // }
    // 消息上传任务回调
    // public set messageUploadTaskCallback(callback: MessageUploadTaskCallback) {
    //     this._messageUploadTaskCallback = callback
    // }
    // 获取消息上传任务
    messageUploadTask(message) {
      if (this.messageUploadTaskCallback) {
        return this.messageUploadTaskCallback(message);
      }
    }
    // 同步最近会话
    // public set syncConversationsCallback(callback:SyncConversationsCallback) {
    //     this._syncConversationsCallback =  callback
    // }
    // public get syncConversationsCallback() {
    //     return this._syncConversationsCallback
    // }
  }
  class WKConfig {
    constructor() {
      this.debug = false;
      this.proto = new Proto();
      this.heartbeatInterval = 6e4;
      this.receiptFlushInterval = 2e3;
      this.sdkVersion = "1.0.0";
      this.provider = new Provider();
    }
    // SDK版本号
  }
  class ReceiptManager {
    constructor() {
      this.listeners = new Array();
      this.channelMessagesMap = /* @__PURE__ */ new Map();
    }
    static shared() {
      if (!this.instance) {
        this.instance = new ReceiptManager();
        this.instance.setup();
      }
      return this.instance;
    }
    setup() {
      this.timer = setInterval(this.flushLoop.bind(this), WKSDK.shared().config.receiptFlushInterval);
    }
    // 添加需要回执的消息
    addReceiptMessages(channel, messages) {
      if (!messages || messages.length === 0) {
        return;
      }
      let existMessages = this.channelMessagesMap.get(channel.getChannelKey());
      if (!existMessages) {
        existMessages = [];
      }
      for (const message of messages) {
        if (!message.remoteExtra.readed) {
          existMessages.push(message);
        }
      }
      this.channelMessagesMap.set(channel.getChannelKey(), existMessages);
    }
    flush(channelKey) {
      if (!WKSDK.shared().config.provider.messageReadedCallback) {
        throw new Error("没有设置WKSDK.shared().config.provider.messageReadedCallback");
      }
      const messages = this.channelMessagesMap.get(channelKey);
      const tmpMessages = new Array();
      let flushCachedLen = 0;
      if (messages && messages.length > 0) {
        flushCachedLen = messages.length;
        for (const message of messages) {
          tmpMessages.push(message);
        }
      }
      if (tmpMessages.length === 0) {
        return;
      }
      const channel = Channel.fromChannelKey(channelKey);
      WKSDK.shared().config.provider.messageReadedCallback(channel, tmpMessages).then(() => {
        this.removeCacheWithLength(channelKey, flushCachedLen);
        this.notifyListeners(channel, tmpMessages);
      });
    }
    removeCacheWithLength(channelKey, len2) {
      const cacheMessages = this.channelMessagesMap.get(channelKey);
      const tmpArray = new Array();
      if (!cacheMessages) {
        return;
      }
      for (const message of cacheMessages) {
        tmpArray.push(message);
      }
      let actLen = len2;
      if (tmpArray.length < len2) {
        actLen = tmpArray.length;
      }
      for (let index = 0; index < actLen; index++) {
        const message = tmpArray[index];
        for (let k = 0; k < cacheMessages.length; k++) {
          const element = cacheMessages[k];
          if (message.clientMsgNo === element.clientMsgNo) {
            cacheMessages.splice(k, 1);
            break;
          }
        }
      }
    }
    flushLoop() {
      this.channelMessagesMap.forEach((value, channelKey) => {
        this.flush(channelKey);
      });
    }
    // 添加命令类消息监听
    addListener(listener) {
      this.listeners.push(listener);
    }
    removeListener(listener) {
      const len2 = this.listeners.length;
      for (let i2 = 0; i2 < len2; i2++) {
        if (listener === this.listeners[i2]) {
          this.listeners.splice(i2, 1);
          return;
        }
      }
    }
    // 通知监听者
    notifyListeners(channel, messages) {
      if (this.listeners) {
        this.listeners.forEach((listener) => {
          if (listener) {
            listener(channel, messages);
          }
        });
      }
    }
  }
  class WKSDK {
    static shared() {
      if (!this.instance) {
        this.instance = new WKSDK();
        this.instance.init();
      }
      return this.instance;
    }
    init() {
      this.config = new WKConfig();
      this.taskManager = new TaskManager();
      this.messageContentManager = MessageContentManager.shared();
      this.connectManager = ConnectManager.shared();
      this.chatManager = ChatManager.shared();
      this.channelManager = ChannelManager.shared();
      this.conversationManager = ConversationManager.shared();
      this.securityManager = SecurityManager.shared();
      this.reminderManager = ReminderManager.shared();
      this.receiptManager = ReceiptManager.shared();
      this.registerFactor((contentType) => {
        if (this.isSystemMessage(contentType)) {
          return new SystemContent();
        }
        if (contentType === MessageContentType.cmd) {
          return new CMDContent();
        }
        return;
      });
      this.register(MessageContentType.text, () => new MessageText());
      this.register(MessageContentType.signalMessage, () => new MessageSignalContent());
    }
    // 注册消息正文
    register(contentType, handler) {
      this.messageContentManager.register(contentType, handler);
    }
    registerFactor(factor) {
      this.messageContentManager.registerFactor(factor);
    }
    getMessageContent(contentType) {
      return this.messageContentManager.getMessageContent(contentType);
    }
    // 是否是系统消息
    isSystemMessage(contentType) {
      return contentType >= 1e3 && contentType <= 2e3;
    }
    // 连接IM
    connect() {
      this.connectManager.connect();
    }
    disconnect() {
      this.connectManager.disconnect();
    }
    newMessageText(text) {
      return new MessageText(text);
    }
    newChannel(channelID, channelType) {
      return new Channel(channelID, channelType);
    }
    newMessage() {
      return new Message();
    }
    newChannelInfo() {
      return new ChannelInfo();
    }
    newMediaMessageContent() {
      return new MediaMessageContent();
    }
    newMessageContent() {
      return new MessageContent();
    }
  }
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  const { toString } = Object.prototype;
  const { getPrototypeOf } = Object;
  const kindOf = ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  const typeOfTest = (type) => (thing) => typeof thing === type;
  const { isArray } = Array;
  const isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  const isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  const isString = typeOfTest("string");
  const isFunction = typeOfTest("function");
  const isNumber = typeOfTest("number");
  const isObject = (thing) => thing !== null && typeof thing === "object";
  const isBoolean = (thing) => thing === true || thing === false;
  const isPlainObject = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype2 = getPrototypeOf(val);
    return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };
  const isDate = kindOfTest("Date");
  const isFile = kindOfTest("File");
  const isBlob = kindOfTest("Blob");
  const isFileList = kindOfTest("FileList");
  const isStream = (val) => isObject(val) && isFunction(val.pipe);
  const isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  };
  const isURLSearchParams = kindOfTest("URLSearchParams");
  const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i2;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i2 = 0, l = obj.length; i2 < l; i2++) {
        fn.call(null, obj[i2], i2, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len2 = keys.length;
      let key;
      for (i2 = 0; i2 < len2; i2++) {
        key = keys[i2];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i2 = keys.length;
    let _key;
    while (i2-- > 0) {
      _key = keys[i2];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    if (typeof globalThis !== "undefined")
      return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  const isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i2 = 0, l = arguments.length; i2 < l; i2++) {
      arguments[i2] && forEach(arguments[i2], assignValue);
    }
    return result;
  }
  const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  };
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  const inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i2;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
      return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i2 = props.length;
      while (i2-- > 0) {
        prop = props[i2];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  const toArray = (thing) => {
    if (!thing)
      return null;
    if (isArray(thing))
      return thing;
    let i2 = thing.length;
    if (!isNumber(i2))
      return null;
    const arr = new Array(i2);
    while (i2-- > 0) {
      arr[i2] = thing[i2];
    }
    return arr;
  };
  const isTypedArray = ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  const isHTMLForm = kindOfTest("HTMLFormElement");
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  const isRegExp = kindOfTest("RegExp");
  const reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      if (reducer(descriptor, name, obj) !== false) {
        reducedDescriptors[name] = descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value))
        return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop$1 = () => {
  };
  const toFiniteNumber = (value, defaultValue) => {
    value = +value;
    return Number.isFinite(value) ? value : defaultValue;
  };
  const ALPHA = "abcdefghijklmnopqrstuvwxyz";
  const DIGIT = "0123456789";
  const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  const toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i2) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i2] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i2 + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i2] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest("AsyncFunction");
  const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  const utils = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop: noop$1,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };
  function AxiosError(message, code2, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code2 && (this.code = code2);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  utils.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  const prototype$1 = AxiosError.prototype;
  const descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code2) => {
    descriptors[code2] = { value: code2 };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, "isAxiosError", { value: true });
  AxiosError.from = (error, code2, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);
    utils.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code2, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  const httpAdapter = null;
  function isVisitable(thing) {
    return utils.isPlainObject(thing) || utils.isArray(thing);
  }
  function removeBrackets(key) {
    return utils.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(function each(token, i2) {
      token = removeBrackets(token);
      return !dots && i2 ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new FormData();
    options = utils.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils.isSpecCompliantForm(formData);
    if (!utils.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null)
        return "";
      if (utils.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils.isBlob(value)) {
        throw new AxiosError("Blob is not supported. Use a Buffer instead.");
      }
      if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils.isArray(value) && isFlatArray(value) || (utils.isFileList(value) || utils.endsWith(key, "[]")) && (arr = utils.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils.isUndefined(value))
        return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils.forEach(value, function each(el, key) {
        const result = !(utils.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  function encode$1(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }
  const InterceptorManager$1 = InterceptorManager;
  const transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
  const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
  const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
  const isStandardBrowserEnv = (() => {
    let product;
    if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  })();
  const isStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  const platform = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  function parsePropPath(name) {
    return utils.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i2;
    const len2 = keys.length;
    let key;
    for (i2 = 0; i2 < len2; i2++) {
      key = keys[i2];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
      const obj = {};
      utils.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  const DEFAULT_CONTENT_TYPE = {
    "Content-Type": void 0
  };
  function stringifySafely(rawValue, parser, encoder) {
    if (utils.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils.isObject(data);
      if (isObjectPayload && utils.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils.isFormData(data);
      if (isFormData2) {
        if (!hasJSONContentType) {
          return data;
        }
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (data && utils.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    }
  };
  utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  const defaults$1 = defaults;
  const ignoreDuplicateOf = utils.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  const parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i2;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i2 = line.indexOf(":");
      key = line.substring(0, i2).trim().toLowerCase();
      val = line.substring(i2 + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };
  const $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils.isFunction(filter)) {
      return filter.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils.isString(value))
      return;
    if (utils.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }
    if (utils.isRegExp(filter)) {
      return filter.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i2 = keys.length;
      let deleted = false;
      while (i2--) {
        const key = keys[i2];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils.forEach(this, (value, header) => {
        const key = utils.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype2 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header);
          accessors[lHeader] = true;
        }
      }
      utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  }
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils.freezeMethods(AxiosHeaders.prototype);
  utils.freezeMethods(AxiosHeaders);
  const AxiosHeaders$1 = AxiosHeaders;
  function transformData(fns, response) {
    const config = this || defaults$1;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;
    utils.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  function CanceledError(message, config, request) {
    AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  utils.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
  });
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError(
        "Request failed with status code " + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  const cookies = platform.isStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          const cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  const isURLSameOrigin = platform.isStandardBrowserEnv ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement("a");
      let originURL;
      function resolveURL(url) {
        let href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin2(requestURL) {
        const parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin2() {
        return true;
      };
    }()
  );
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i2 = tail;
      let bytesCount = 0;
      while (i2 !== head) {
        bytesCount += bytes[i2++];
        i2 = i2 % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return (e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    };
  }
  const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  const xhrAdapter = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      let requestData = config.data;
      const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
      const responseType = config.responseType;
      let onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils.isFormData(requestData)) {
        if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
          requestHeaders.setContentType(false);
        } else {
          requestHeaders.setContentType("multipart/form-data;", false);
        }
      }
      let request = new XMLHttpRequest();
      if (config.auth) {
        const username = config.auth.username || "";
        const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
      }
      const fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders$1.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional = config.transitional || transitionalDefaults;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          config,
          request
        ));
        request = null;
      };
      if (platform.isStandardBrowserEnv) {
        const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
      }
      if (config.cancelToken || config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(fullPath);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    });
  };
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter
  };
  utils.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  const adapters = {
    getAdapter: (adapters2) => {
      adapters2 = utils.isArray(adapters2) ? adapters2 : [adapters2];
      const { length } = adapters2;
      let nameOrAdapter;
      let adapter;
      for (let i2 = 0; i2 < length; i2++) {
        nameOrAdapter = adapters2[i2];
        if (adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
          break;
        }
      }
      if (!adapter) {
        if (adapter === false) {
          throw new AxiosError(
            `Adapter ${nameOrAdapter} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          );
        }
        throw new Error(
          utils.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
        );
      }
      if (!utils.isFunction(adapter)) {
        throw new TypeError("adapter is not a function");
      }
      return adapter;
    },
    adapters: knownAdapters
  };
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders$1.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }
  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
        return utils.merge.call({ caseless }, target, source);
      } else if (utils.isPlainObject(source)) {
        return utils.merge({}, source);
      } else if (utils.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, caseless) {
      if (!utils.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils.isUndefined(a)) {
        return getMergedValue(void 0, a, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }
  const VERSION = "1.4.0";
  const validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
    };
  });
  const deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i2 = keys.length;
    while (i2-- > 0) {
      const opt = keys[i2];
      const validator2 = schema[opt];
      if (validator2) {
        const value = options[opt];
        const result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }
  const validator = {
    assertOptions,
    validators: validators$1
  };
  const validators = validator.validators;
  class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager$1(),
        response: new InterceptorManager$1()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional, paramsSerializer, headers } = config;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders;
      contextHeaders = headers && utils.merge(
        headers.common,
        headers[config.method]
      );
      contextHeaders && utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i2 = 0;
      let len2;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len2 = chain.length;
        promise = Promise.resolve(config);
        while (i2 < len2) {
          promise = promise.then(chain[i2++], chain[i2++]);
        }
        return promise;
      }
      len2 = requestInterceptorChain.length;
      let newConfig = config;
      i2 = 0;
      while (i2 < len2) {
        const onFulfilled = requestInterceptorChain[i2++];
        const onRejected = requestInterceptorChain[i2++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i2 = 0;
      len2 = responseInterceptorChain.length;
      while (i2 < len2) {
        promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  }
  utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  const Axios$1 = Axios;
  class CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners)
          return;
        let i2 = token._listeners.length;
        while (i2-- > 0) {
          token._listeners[i2](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message, config, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  }
  const CancelToken$1 = CancelToken;
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  function isAxiosError(payload) {
    return utils.isObject(payload) && payload.isAxiosError === true;
  }
  const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  const HttpStatusCode$1 = HttpStatusCode;
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);
    utils.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
    utils.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  const axios = createInstance(defaults$1);
  axios.Axios = Axios$1;
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;
  axios.AxiosError = AxiosError;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = (thing) => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;
  const axios$1 = axios;
  class APIClientConfig {
    constructor() {
      this._apiURL = "";
      this._token = "";
    }
    set apiURL(apiURL) {
      this._apiURL = apiURL;
      axios$1.defaults.baseURL = apiURL;
    }
    get apiURL() {
      return this._apiURL;
    }
  }
  const _APIClient = class {
    constructor() {
      this.config = new APIClientConfig();
    }
    // initAxios() {
    //     const self = this
    //     axios.interceptors.request.use(function (config) {
    //         let token:string | undefined
    //         if(self.config.tokenCallback) {
    //             token = self.config.tokenCallback()
    //         }
    //         if (token && token !== "") {
    //             config.headers!["token"] = token;
    //         }
    //         return config;
    //     });
    //     axios.interceptors.response.use(function (response) {
    //         return response;
    //     }, function (error) {
    //         var msg = "";
    //         switch (error.response && error.response.status) {
    //             case 400:
    //                 msg = error.response.data.msg;
    //                 break;
    //             case 404:
    //                 msg = "请求地址没有找到（404）"
    //                 break;
    //             case 401:
    //                 if(self.logoutCallback) {
    //                     self.logoutCallback()
    //                 }
    //             default:
    //                 msg = "未知错误"
    //                 break;
    //         }
    //         return Promise.reject({ error: error, msg: msg, status: error?.response?.status });
    //     });
    // }
    get(path, data) {
      return uni.request({
        url: `${this.config.apiURL}${path}`,
        method: "GET",
        data
      });
    }
    post(path, data) {
      return uni.request({
        url: `${this.config.apiURL}${path}`,
        method: "POST",
        data
      });
    }
  };
  let APIClient = _APIClient;
  APIClient.shared = new _APIClient();
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const apiAddr = vue.ref("https://api.githubim.com");
      const username = vue.ref("");
      const password = vue.ref("");
      const login = () => {
        APIClient.shared.config.apiURL = apiAddr.value;
        APIClient.shared.post("/user/token", {
          uid: username.value,
          // 第三方服务端的用户唯一uid
          token: password.value || "testtoken",
          // 第三方服务端的用户的token
          device_flag: 1,
          // 设备标识  0.app 1.web （相同用户相同设备标记的主设备登录会互相踢，从设备将共存）
          device_level: 0
          // 设备等级 0.为从设备 1.为主设备
        }).then((res) => {
          formatAppLog("log", "at pages/login/login.vue:20", res);
          uni.navigateTo({
            url: `/pages/index/index?uid=${username.value}&token=${password.value}`
          });
        }).catch((err) => {
          alert(err.msg);
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", { class: "hello" }, [
          vue.createElementVNode("div", { style: { "display": "flex", "justify-content": "center" } }, [
            vue.createElementVNode("a", {
              href: "https://githubim.com",
              target: "_blank"
            }, [
              vue.createElementVNode("img", {
                src: "/static/logo.png",
                class: "logo",
                alt: "Vite logo"
              })
            ])
          ]),
          vue.createElementVNode(
            "p",
            { style: { "text-align": "center" } },
            " 悟空IM演示程序，当前SDK版本：[v" + vue.toDisplayString(vue.unref(WKSDK).shared().config.sdkVersion) + "] ",
            1
            /* TEXT */
          ),
          vue.createElementVNode("div", { class: "form" }, [
            vue.createElementVNode("div", { class: "item" }, [
              vue.createElementVNode("div", { class: "label" }, [
                vue.createElementVNode("label", null, "API基地址")
              ]),
              vue.createElementVNode("div", { class: "field" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "text",
                    placeholder: "请输入API基地址",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => apiAddr.value = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, apiAddr.value]
                ])
              ])
            ]),
            vue.createElementVNode("div", { class: "item" }, [
              vue.createElementVNode("div", { class: "label" }, [
                vue.createElementVNode("label", null, "登录账号")
              ]),
              vue.createElementVNode("div", { class: "field" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "text",
                    placeholder: "演示下，随便输，唯一即可",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => username.value = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, username.value]
                ])
              ])
            ]),
            vue.createElementVNode("div", { class: "item" }, [
              vue.createElementVNode("div", { class: "label" }, [
                vue.createElementVNode("label", null, "登录密码")
              ]),
              vue.createElementVNode("div", { class: "field" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "text",
                    placeholder: "演示下，随便输",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => password.value = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, password.value]
                ])
              ])
            ]),
            vue.createElementVNode("button", {
              class: "submit",
              onClick: login
            }, "登录")
          ])
        ]);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/tt/work/projects/wukongIM/web/WuKongIMUniappSDK/examples/pages/login/login.vue"]]);
  class Convert {
    static toMessage(msgMap) {
      const message = new Message();
      if (msgMap["message_idstr"]) {
        message.messageID = msgMap["message_idstr"];
      } else {
        message.messageID = new BigNumber(msgMap["message_id"]).toString();
      }
      if (msgMap["header"]) {
        message.header.reddot = msgMap["header"]["red_dot"] === 1 ? true : false;
      }
      if (msgMap["setting"]) {
        message.setting = Setting.fromUint8(msgMap["setting"]);
      }
      if (msgMap["revoke"]) {
        message.remoteExtra.revoke = msgMap["revoke"] === 1 ? true : false;
      }
      if (msgMap["message_extra"]) {
        const messageExtra = msgMap["message_extra"];
        message.remoteExtra = this.toMessageExtra(messageExtra);
      }
      message.clientSeq = msgMap["client_seq"];
      message.channel = new Channel(msgMap["channel_id"], msgMap["channel_type"]);
      message.messageSeq = msgMap["message_seq"];
      message.clientMsgNo = msgMap["client_msg_no"];
      message.fromUID = msgMap["from_uid"];
      message.timestamp = msgMap["timestamp"];
      message.status = MessageStatus.Normal;
      const decodedBuffer = buffer.Buffer.from(msgMap["payload"], "base64");
      const contentObj = JSON.parse(decodedBuffer.toString("utf8"));
      let contentType = 0;
      if (contentObj) {
        contentType = contentObj.type;
      }
      const messageContent = WKSDK.shared().getMessageContent(contentType);
      if (contentObj) {
        messageContent.decode(this.stringToUint8Array(JSON.stringify(contentObj)));
      }
      message.content = messageContent;
      message.isDeleted = msgMap["is_deleted"] === 1;
      return message;
    }
    static toMessageExtra(msgExtraMap) {
      const messageExtra = new MessageExtra();
      if (msgExtraMap["message_id_str"]) {
        messageExtra.messageID = msgExtraMap["message_id_str"];
      } else {
        messageExtra.messageID = new BigNumber(msgExtraMap["message_id"]).toString();
      }
      messageExtra.messageSeq = msgExtraMap["message_seq"];
      messageExtra.readed = msgExtraMap["readed"] === 1;
      if (msgExtraMap["readed_at"] && msgExtraMap["readed_at"] > 0) {
        messageExtra.readedAt = new Date(msgExtraMap["readed_at"]);
      }
      messageExtra.revoke = msgExtraMap["revoke"] === 1;
      if (msgExtraMap["revoker"]) {
        messageExtra.revoker = msgExtraMap["revoker"];
      }
      messageExtra.readedCount = msgExtraMap["readed_count"] || 0;
      messageExtra.unreadCount = msgExtraMap["unread_count"] || 0;
      messageExtra.extraVersion = msgExtraMap["extra_version"] || 0;
      messageExtra.editedAt = msgExtraMap["edited_at"] || 0;
      const contentEditObj = msgExtraMap["content_edit"];
      if (contentEditObj) {
        const contentEditContentType = contentEditObj.type;
        const contentEditContent = WKSDK.shared().getMessageContent(contentEditContentType);
        const contentEditPayloadData = this.stringToUint8Array(JSON.stringify(contentEditObj));
        contentEditContent.decode(contentEditPayloadData);
        messageExtra.contentEditData = contentEditPayloadData;
        messageExtra.contentEdit = contentEditContent;
        messageExtra.isEdit = true;
      }
      return messageExtra;
    }
    static stringToUint8Array(str) {
      const newStr = unescape(encodeURIComponent(str));
      var arr = new Array();
      for (var i2 = 0, j = newStr.length; i2 < j; ++i2) {
        arr.push(newStr.charCodeAt(i2));
      }
      var tmpUint8Array = new Uint8Array(arr);
      return tmpUint8Array;
    }
  }
  var browserExports = {};
  var browser = {
    get exports() {
      return browserExports;
    },
    set exports(v) {
      browserExports = v;
    }
  };
  var process = browser.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      if (typeof setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len2 = queue.length;
    while (len2) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len2) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len2 = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        args[i2 - 1] = arguments[i2];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {
  }
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  process.listeners = function(name) {
    return [];
  };
  process.binding = function(name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function() {
    return "/";
  };
  process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function() {
    return 0;
  };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const chatRef = vue.ref(null);
      const showSettingPanel = vue.ref(false);
      const title = vue.ref("");
      const text = vue.ref("");
      vue.ref();
      const channelID = vue.ref("");
      const p2p = vue.ref(true);
      const to = vue.ref(new Channel("", 0));
      const placeholder = vue.ref("请输入对方登录名");
      const pulldowning = vue.ref(false);
      const pulldownFinished = vue.ref(false);
      const messages = vue.ref(new Array());
      onLoad((options) => {
        const uid = options.uid;
        const token = options.token || "testtoken";
        title.value = `${uid || ""}(未连接)`;
        if (!APIClient.shared.config.apiURL || APIClient.shared.config.apiURL === "") {
          WKSDK.shared().connectManager.disconnect();
          uni.navigateTo({
            url: "/pages/login/login"
          });
        }
        APIClient.shared.get("/route", { uid }).then((res) => {
          const data = res.data;
          let addr = data.wss_addr;
          if (!addr || addr === "") {
            addr = data.ws_addr;
          }
          formatAppLog("log", "at pages/index/index.vue:44", "addr-->", addr);
          connectIM(addr, uid, token);
        }).catch((err) => {
          formatAppLog("log", "at pages/index/index.vue:48", err);
          alert(err.msg);
        });
      });
      const connectIM = (addr, uid, token) => {
        const config = WKSDK.shared().config;
        if (uid && token) {
          config.uid = uid;
          config.token = token;
        }
        config.addr = addr;
        WKSDK.shared().config = config;
        WKSDK.shared().config.provider.syncMessagesCallback = async (channel, opts) => {
          let resultMessages = new Array();
          const limit = 30;
          const result = await APIClient.shared.post("/channel/messagesync", {
            login_uid: WKSDK.shared().config.uid,
            channel_id: channel.channelID,
            channel_type: channel.channelType,
            start_message_seq: opts.startMessageSeq,
            end_message_seq: opts.endMessageSeq,
            pull_mode: opts.pullMode,
            limit
          });
          const resp = result.data;
          const messageList = resp && resp["messages"];
          if (messageList) {
            messageList.forEach((msg) => {
              const message = Convert.toMessage(msg);
              resultMessages.push(message);
            });
          }
          return resultMessages;
        };
        WKSDK.shared().connectManager.addConnectStatusListener((status) => {
          if (status == ConnectStatus.Connected) {
            title.value = `${uid || ""}(连接成功)`;
          } else {
            title.value = `${uid || ""}(断开)`;
          }
        });
        WKSDK.shared().chatManager.addMessageListener((msg) => {
          messages.value.push(msg);
          scrollBottom();
        });
        WKSDK.shared().chatManager.addMessageStatusListener((ack) => {
          formatAppLog("log", "at pages/index/index.vue:107", ack);
          messages.value.forEach((m) => {
            if (m.clientSeq == ack.clientSeq) {
              m.status = ack.reasonCode == 1 ? MessageStatus.Normal : MessageStatus.Fail;
              return;
            }
          });
        });
        WKSDK.shared().connect();
      };
      const onSend = () => {
        if (!text.value || text.value.trim() === "") {
          return;
        }
        if (to.value && to.value.channelID != "") {
          let t = new MessageText(text.value);
          WKSDK.shared().chatManager.send(t, to.value);
          text.value = "";
        } else {
          showSettingPanel.value = true;
        }
      };
      const handleChannelTypeChange = (v) => {
        formatAppLog("log", "at pages/index/index.vue:134", v.detail.value);
        if (v.detail.value === "p2p") {
          placeholder.value = "请输入对方登录名";
          p2p.value = true;
        } else {
          placeholder.value = "请输入群组ID";
          p2p.value = false;
        }
      };
      const scrollBottom = () => {
        const chat = chatRef.value;
        if (chat) {
          browserExports.nextTick(function() {
            chat.scrollTop = chat.scrollHeight;
          });
        }
      };
      const pullLast = async () => {
        pulldowning.value = true;
        const msgs = await WKSDK.shared().chatManager.syncMessages(to.value, {
          limit: 15,
          startMessageSeq: 0,
          endMessageSeq: 0,
          pullMode: PullMode.Up
        });
        pulldowning.value = false;
        if (msgs && msgs.length > 0) {
          msgs.forEach((m) => {
            messages.value.push(m);
          });
        }
        scrollBottom();
      };
      const pullDown = async () => {
        if (messages.value.length == 0) {
          return;
        }
        const firstMsg = messages.value[0];
        if (firstMsg.messageSeq == 1) {
          pulldownFinished.value = true;
          return;
        }
        const limit = 15;
        const msgs = await WKSDK.shared().chatManager.syncMessages(to.value, {
          limit,
          startMessageSeq: firstMsg.messageSeq - 1,
          endMessageSeq: 0,
          pullMode: PullMode.Down
        });
        if (msgs.length < limit) {
          pulldownFinished.value = true;
        }
        if (msgs && msgs.length > 0) {
          msgs.reverse().forEach((m) => {
            messages.value.unshift(m);
          });
        }
        browserExports.nextTick(function() {
          const chat = chatRef.value;
          const firstMsgEl = document.getElementById(firstMsg.clientMsgNo);
          if (firstMsgEl) {
            chat.scrollTop = firstMsgEl.offsetTop;
          }
        });
      };
      const settingClick = () => {
        showSettingPanel.value = !showSettingPanel.value;
      };
      const settingOKClick = () => {
        if (p2p.value) {
          to.value = new Channel(channelID.value, ChannelTypePerson);
        } else {
          to.value = new Channel(channelID.value, ChannelTypeGroup);
        }
        if (!p2p.value) {
          joinChannel();
        }
        showSettingPanel.value = false;
        messages.value = [];
        pullLast();
      };
      const joinChannel = () => {
        APIClient.shared.post("/channel/subscriber_add", {
          channel_id: to.value.channelID,
          channel_type: to.value.channelType,
          subscribers: [WKSDK.shared().config.uid]
        }).then((res) => {
          formatAppLog("log", "at pages/index/index.vue:229", res);
        }).catch((err) => {
          formatAppLog("log", "at pages/index/index.vue:231", err);
          alert(err.msg);
        });
      };
      const logout = () => {
        WKSDK.shared().connectManager.disconnect();
        uni.navigateTo({
          url: "/pages/login/login"
        });
      };
      const getMessageText = (m) => {
        if (m.content instanceof MessageText) {
          const messageText = m.content;
          return messageText.text;
        }
        return "未知消息";
      };
      const handleScroll = (e) => {
        const targetScrollTop = e.target.scrollTop;
        if (targetScrollTop <= 250) {
          if (pulldowning.value || pulldownFinished.value) {
            return;
          }
          pulldowning.value = true;
          pullDown().then(() => {
            pulldowning.value = false;
          }).catch(() => {
            pulldowning.value = false;
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("div", { class: "chat" }, [
            vue.createElementVNode("div", { class: "header" }, [
              vue.createElementVNode("div", { class: "left" }, [
                vue.createElementVNode("button", { onClick: logout }, "退出")
              ]),
              vue.createElementVNode(
                "div",
                { class: "center" },
                vue.toDisplayString(title.value),
                1
                /* TEXT */
              ),
              vue.createElementVNode("div", { class: "right" }, [
                vue.createElementVNode(
                  "button",
                  { onClick: settingClick },
                  vue.toDisplayString(to.value.channelID.length == 0 ? "与谁会话？" : `${to.value.channelType == vue.unref(ChannelTypeGroup) ? "群" : "单聊"}${to.value.channelID}`),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode(
              "div",
              {
                class: "content",
                onScroll: handleScroll,
                ref_key: "chatRef",
                ref: chatRef
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(messages.value, (m) => {
                    return vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      [
                        m.send ? (vue.openBlock(), vue.createElementBlock("div", {
                          key: 0,
                          class: "message right",
                          id: m.clientMsgNo
                        }, [
                          m.status != vue.unref(MessageStatus).Normal ? (vue.openBlock(), vue.createElementBlock("div", {
                            key: 0,
                            class: "status"
                          }, "发送中")) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode("div", { class: "bubble right" }, [
                            vue.createElementVNode(
                              "div",
                              { class: "text" },
                              vue.toDisplayString(getMessageText(m)),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode(
                            "div",
                            { class: "avatar" },
                            vue.toDisplayString(m.fromUID.substring(0, 1).toUpperCase()),
                            1
                            /* TEXT */
                          )
                        ], 8, ["id"])) : vue.createCommentVNode("v-if", true),
                        !m.send ? (vue.openBlock(), vue.createElementBlock("div", {
                          key: 1,
                          class: "message",
                          id: m.clientMsgNo
                        }, [
                          vue.createElementVNode(
                            "div",
                            { class: "avatar" },
                            vue.toDisplayString(m.fromUID.substring(0, 1).toUpperCase()),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("div", { class: "bubble" }, [
                            vue.createElementVNode(
                              "div",
                              { class: "text" },
                              vue.toDisplayString(getMessageText(m)),
                              1
                              /* TEXT */
                            )
                          ])
                        ], 8, ["id"])) : vue.createCommentVNode("v-if", true)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    );
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ],
              544
              /* HYDRATE_EVENTS, NEED_PATCH */
            ),
            vue.createElementVNode("div", { class: "footer" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  placeholder: "发送消息",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => text.value = $event),
                  style: { "height": "40px" }
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, text.value]
              ]),
              vue.createElementVNode("button", { onClick: onSend }, "发送")
            ])
          ]),
          showSettingPanel.value ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "setting",
            onClick: settingClick
          }, [
            vue.createElementVNode("div", {
              class: "setting-content",
              onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {
              }, ["stop"]))
            }, [
              vue.createElementVNode(
                "radio-group",
                { onChange: handleChannelTypeChange },
                [
                  vue.createElementVNode("div", { class: "switch" }, [
                    vue.createElementVNode("div", { class: "item" }, [
                      vue.createElementVNode("radio", {
                        value: "p2p",
                        checked: p2p.value
                      }, "单聊", 8, ["checked"])
                    ]),
                    vue.createElementVNode("div", { class: "item" }, [
                      vue.createElementVNode("radio", {
                        value: "group",
                        checked: !p2p.value
                      }, "群聊", 8, ["checked"])
                    ])
                  ])
                ],
                32
                /* HYDRATE_EVENTS */
              ),
              vue.withDirectives(vue.createElementVNode("input", {
                placeholder: placeholder.value,
                class: "to",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => channelID.value = $event)
              }, null, 8, ["placeholder"]), [
                [vue.vModelText, channelID.value]
              ]),
              vue.createElementVNode("button", {
                class: "ok",
                onClick: settingOKClick
              }, "确定")
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/tt/work/projects/wukongIM/web/WuKongIMUniappSDK/examples/pages/index/index.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/tt/work/projects/wukongIM/web/WuKongIMUniappSDK/examples/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
