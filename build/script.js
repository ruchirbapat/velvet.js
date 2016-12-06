var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Wrapper class for the built in javasciprt console
var Debug;
(function (Debug) {
    //Change visual attributes
    Debug.backgroundColour = 'white';
    //Create CSS Style info for the text
    function GenerateDebugFormatting() {
        return 'color: ' + Debug.textColour + ';' +
            'font-size: ' + Debug.fontSize + ';' +
            'background: ' + Debug.backgroundColour + ';';
    }
    Debug.GenerateDebugFormatting = GenerateDebugFormatting;
    ;
    function ResetFormatting() {
        //Revert back to defualt values
        Debug.backgroundColour = 'white';
        Debug.textColour = 'black';
        Debug.fontSize = 'normal';
    }
    Debug.ResetFormatting = ResetFormatting;
    ;
    function RawLog(data) { console.log(data); }
    Debug.RawLog = RawLog;
    ;
    function Log(text) { console.log('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Log = Log;
    ;
    function Warning(text) { console.warn('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Warning = Warning;
    ;
    function Error(text) { console.error('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Error = Error;
    ;
    function Info(text) { console.info('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Info = Info;
    ;
    function Clear() { console.clear(); }
    Debug.Clear = Clear;
    ;
    function Spacer() { Debug.Log("\n"); }
    Debug.Spacer = Spacer;
    ;
    function EndGroup() { console.groupEnd(); }
    Debug.EndGroup = EndGroup;
    ;
    function CreateGroup(name) { console.group(name); }
    Debug.CreateGroup = CreateGroup;
    ;
})(Debug || (Debug = {}));
//A math class to make mathematic operations easier and more relivant to game programming
var Mathf;
(function (Mathf) {
    //Consts
    Mathf.PI = 3.1415926;
    Mathf.TAU = 6.2831852;
    Mathf.Rounding = 0.005; //Epsilon
    Mathf.NegativeInfinity = Number.NEGATIVE_INFINITY;
    Mathf.PositiveInfinity = Number.POSITIVE_INFINITY;
    ;
    Mathf.RagToDeg = 360 / Mathf.TAU;
    Mathf.DegToRad = (Mathf.PI * 2) / 360;
    //Default javasciprt wrapper functions
    function Abs(f) { return Math.abs(f); }
    Mathf.Abs = Abs;
    ; //The absolute value of 'foo' (makes it posative)
    function Sqrt(f) { return Math.sqrt(f); }
    Mathf.Sqrt = Sqrt;
    ; //Square root of 'f'
    function Root(f, n) { return Math.pow(f, 1.0 / n); }
    Mathf.Root = Root;
    ; //The 'n' root of 'f'
    function Pow(f, pow) { return Math.pow(f, pow); }
    Mathf.Pow = Pow;
    ; //'f' to the power of 'pow' 
    function Cos(f) { return Math.cos(f); }
    Mathf.Cos = Cos;
    ;
    function Sin(f) { return Math.sin(f); }
    Mathf.Sin = Sin;
    ;
    function Tan(f) { return Math.tan(f); }
    Mathf.Tan = Tan;
    ;
    function Acos(f) { return Math.acos(f); }
    Mathf.Acos = Acos;
    ;
    function Asin(f) { return Math.asin(f); }
    Mathf.Asin = Asin;
    ;
    function Atan(f) { return Math.atan(f); }
    Mathf.Atan = Atan;
    ;
    function Atan2(f, b) { return Math.atan2(f, b); }
    Mathf.Atan2 = Atan2;
    ;
    function Ceil(f) { return Math.ceil(f); }
    Mathf.Ceil = Ceil;
    ;
    function Floor(f) { return Math.floor(f); }
    Mathf.Floor = Floor;
    ;
    function Round(f) { return Math.round(f); }
    Mathf.Round = Round;
    ;
    function Max(f, b) { return Math.max(f, b); }
    Mathf.Max = Max;
    ;
    function Min(f, b) { return Math.min(f, b); }
    Mathf.Min = Min;
    ;
    function Log(f) { return Math.log(f); }
    Mathf.Log = Log;
    ; //For the natural log of 'f'
    function Log2(f) { return Mathf.Logbase(f, 2); }
    Mathf.Log2 = Log2;
    ; //'f' log 2
    function Log10(f) { return Mathf.Logbase(f, 10); }
    Mathf.Log10 = Log10;
    ; //'f' log 10
    function Logbase(f, base) { return Math.log(f) / Math.log(base); }
    Mathf.Logbase = Logbase;
    ; //The 'base' log of 'f'
    //Modulus but on floats
    function Mod(num, div) { return div * ((num / div) - Mathf.Floor(num / div)); }
    Mathf.Mod = Mod;
    ;
    //Returns a number that has forced 'value' inbetween 'minimum' and 'maximum'
    function Clamp(value, minimum, maximum) {
        return Mathf.Max(minimum, Mathf.Min(value, maximum));
    }
    Mathf.Clamp = Clamp;
    ;
    function Clamp01(value) { return Mathf.Clamp(value, 0.0, 1.0); }
    Mathf.Clamp01 = Clamp01;
    ;
    //Linearly interpolate 't' between two floats ('a' and 'b')
    function LerpUnclamped(a, b, t) {
        //https://devblogs.nvidia.com/parallelforall/lerp-faster-cuda/
        return (1 - t) * a + t * b;
    }
    Mathf.LerpUnclamped = LerpUnclamped;
    ;
    function Lerp(a, b, t) { return Mathf.LerpUnclamped(a, b, Mathf.Clamp01(t)); }
    Mathf.Lerp = Lerp;
    ;
    //Smoothdamp, much like lerp interpolates between values but with smoothing (much like a broad cubic function)
    function SmoothStep(left, right, x) {
        x = Mathf.Clamp01((x - left) / (right - left));
        //Evaluate quadratic
        return x * x * (3.0 - 2.0 * x);
    }
    Mathf.SmoothStep = SmoothStep;
    ;
    function SmoothStep01(x) { return Mathf.SmoothStep(0.0, 1.0, x); }
    Mathf.SmoothStep01 = SmoothStep01;
    ;
    //Similar to SmoothStep but with the equation: 6x^5 - 15x^4 + 10x^3
    function SmootherStep(left, right, x) {
        var nx = Mathf.Clamp01((x - left) / (right - left));
        //Evaluate
        return nx * nx * nx * (nx * (nx * 6 - 15) + 10);
    }
    Mathf.SmootherStep = SmootherStep;
    ;
    function SmootherStep01(x) { return Mathf.SmootherStep(0.0, 1.0, x); }
    Mathf.SmootherStep01 = SmootherStep01;
    ;
    //Find the sign (posative of negative) of 'number' and return either 0 or 1 to correspond
    //Note: 0 is considered a posative number
    function Sign(foo) { return (foo < 0.0) ? -1.0 : 1.0; }
    Mathf.Sign = Sign;
    ;
    //Like lerping but the 'delta' will never exceed a delta, and an addative method is used
    function MoveTowards(current, target, delta) {
        if (Mathf.Abs(target - current) <= delta)
            return target;
        return current + Mathf.Sign(target - current) * delta;
    }
    Mathf.MoveTowards = MoveTowards;
    ;
    //Corrects for angles around 360 and 0.
    function MoveTowardsAngle(current, target, delta) {
        target = current + Mathf.DeltaAngle(current, target);
        return Mathf.MoveTowards(current, target, delta);
    }
    Mathf.MoveTowardsAngle = MoveTowardsAngle;
    ;
    //Will bounce 'value' between 'min' and 'max'. 
    function Bounce(value, min, max) {
        var range = max - min;
        var state = Mathf.Mod(value - min, 2 * range);
        if (state > range)
            state = (2 * range) - state;
        return state + min;
    }
    Mathf.Bounce = Bounce;
    ;
    function Bounce0(value, max) { return Mathf.Bounce(value, 0.0, max); }
    Mathf.Bounce0 = Bounce0;
    ;
    function Bounce01(value) { return Mathf.Bounce(value, 0.0, 1.0); }
    Mathf.Bounce01 = Bounce01;
    ;
    //Inverse lerp This will find the percentage through a lerp based on paramters - not done
    //Find the the closest difference between two angles so this value may never exceed 180 degrees
    function DeltaAngle(current, target) {
        var diff = target - current;
        while (diff < -180)
            diff += 360;
        while (diff > 180)
            diff -= 360;
        return diff;
    }
    Mathf.DeltaAngle = DeltaAngle;
    ;
    function ClosestBinaryPower(value) {
        return Mathf.Round(Mathf.Pow(Mathf.Round(Mathf.Sqrt(value)), 2));
    }
    Mathf.ClosestBinaryPower = ClosestBinaryPower;
    ;
    function IsBinaryPower(value) { return Mathf.ClosestBinaryPower(value) == value; }
    Mathf.IsBinaryPower = IsBinaryPower;
    ;
    //Find the highest value in an unsorted number array named 'arr'
    function MaxArray(arr) {
        var current_highest = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > current_highest || i == 0) {
                current_highest = arr[i];
            }
        }
        return current_highest;
    }
    Mathf.MaxArray = MaxArray;
    ;
    //Find the lowest value in an unsorted number array named 'arr'
    function MinArray(arr) {
        var current_lowest = 0;
        for (var i = 0; i < arr.length; i++)
            if (arr[i] < current_lowest || i == 0) {
                current_lowest = arr[i];
            }
        return current_lowest;
    }
    Mathf.MinArray = MinArray;
    ;
    //Because of slight round errors in floats, this should be used when comparing two values
    function Approximatly(a, b, round) {
        if (round === void 0) { round = Mathf.Rounding; }
        return Mathf.Abs(a - b) < round;
    }
    Mathf.Approximatly = Approximatly;
})(Mathf || (Mathf = {}));
//For easy random number generation
var Rand;
(function (Rand) {
    function Range(min, max) { return (Math.random() * (max - min)) + min; }
    Rand.Range = Range;
    ;
    function Value() { return Math.random(); }
    Rand.Value = Value;
    ;
    function RandBin() { return Rand.RandInt(0, 2); }
    Rand.RandBin = RandBin;
    ;
    function RandInt(min, max) { return Mathf.Round(Rand.Range(min, max)); }
    Rand.RandInt = RandInt;
    ;
})(Rand || (Rand = {}));
//Holds a point in 2D space
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.ToString = function () { return Vector2.ToString(this); }; //For debugging purposes
    Vector2.prototype.ArrayRef = function (index) { return (index == 0) ? this.x : this.y; }; //Will take an index and return either the x or y component
    Vector2.prototype.SqrMagnitude = function () { return (this.x * this.x) + (this.y * this.y); }; //Will find the square length of a vector from the origin
    Vector2.prototype.Magnitude = function () { return Mathf.Sqrt(this.SqrMagnitude()); }; //Will find the lenght of a vector from the origin
    Vector2.prototype.Clone = function () { return new Vector2(this.x, this.y); }; //Make sure no to use a pointer to the current object
    Vector2.prototype.Normalize = function () {
        var result = new Vector2(0, 0);
        var mag = this.Magnitude();
        //Apply
        result.x = this.x / mag;
        result.y = this.y / mag;
        //Done
        return result;
    };
    //Static vector math functions:
    Vector2.Dot = function (lhs, rhs) { return (lhs.x * rhs.x) + (lhs.y * rhs.y); };
    Vector2.Det = function (lhs, rhs) { return (lhs.x * rhs.y) - (lhs.y * rhs.x); };
    Vector2.Angle = function (from, to) { return Mathf.Atan2(Vector2.Dot(from, to), Vector2.Det(from, to)); };
    Vector2.SqrDistance = function (a, b) { return Mathf.Pow(b.x - a.x, 2) + Mathf.Pow(b.y - a.y, 2); };
    Vector2.Distance = function (a, b) { return Mathf.Sqrt(Vector2.SqrDistance(a, b)); };
    Vector2.SetMagnitude = function (vec, mag) { return Vector2.Mul(vec.Normalize(), mag); };
    Vector2.ClampMagnitude = function (vec, min, max) { return Vector2.SetMagnitude(vec, Mathf.Clamp(vec.Magnitude(), min, max)); };
    Vector2.Lerp = function (a, b, t) { return new Vector2(Mathf.Lerp(a.x, b.x, t), Mathf.Lerp(a.y, b.y, t)); };
    Vector2.LerpUnclamped = function (a, b, t) { return new Vector2(Mathf.LerpUnclamped(a.x, b.x, t), Mathf.LerpUnclamped(a.y, b.y, t)); };
    Vector2.Max = function (l, r) { return new Vector2((l.x > r.x) ? l.x : r.x, (l.y > r.y) ? l.y : r.y); };
    Vector2.Min = function (l, r) { return new Vector2((l.x < r.x) ? l.x : r.x, (l.y < r.y) ? l.y : r.y); };
    Vector2.MoveTowards = function (c, t, d) { return new Vector2(Mathf.MoveTowards(c.x, t.x, d), Mathf.MoveTowards(c.y, t.y, d)); };
    //Helpful static functions
    Vector2.RoundInt = function (vec) { return new Vector2(vec.x, vec.y); };
    Vector2.Random = function () { return new Vector2(Rand.Value(), Rand.Value()); };
    //This will find the reflection of a vector based on a normal provided
    Vector2.Reflect = function (velocity, normal) {
        //R = -2*(V dot N)*N + V
        return Vector2.Add(Vector2.Mul(-2 * Vector2.Dot(velocity, normal), normal), velocity);
    };
    //Operator overloading, kinda
    Vector2._AddOperator = function (result, val) { return result += val; };
    Vector2._SubOperator = function (result, val) { return result -= val; };
    Vector2._MulOperator = function (result, val) { return result *= val; };
    Vector2._DivOperator = function (result, val) { return result /= val; };
    Vector2._Operation = function (li, operator) {
        var result = (li[0] instanceof Vector2) ? li[0].Clone() : new Vector2(li[0], li[0]);
        //Allows for infinte arguments to be parsed
        for (var i = 1; i < li.length; i++) {
            if (li[i] instanceof Vector2) {
                result.x = operator(result.x, li[i].x);
                result.y = operator(result.y, li[i].y);
            }
            else {
                result.x = operator(result.x, li[i]);
                result.y = operator(result.y, li[i]);
            }
        }
        return result;
    };
    //Actual overloading
    Vector2.Add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._AddOperator);
    };
    Vector2.Sub = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._SubOperator);
    };
    Vector2.Mul = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._MulOperator);
    };
    Vector2.Div = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._DivOperator);
    };
    Vector2.ToString = function (val) { return val.x + " " + val.y; };
    Vector2.Equal = function (a, b) { return (Mathf.Approximatly(a.x, b.x) && Mathf.Approximatly(a.y, b.y)); };
    Vector2.NotEqual = function (a, b) { return (!Mathf.Approximatly(a.x, b.x) || !Mathf.Approximatly(a.y, b.y)); };
    //Static built in specific vectors
    Vector2.zero = new Vector2(0, 0);
    Vector2.one = new Vector2(1, 1);
    Vector2.minus = new Vector2(-1, -1);
    Vector2.left = new Vector2(-1, 0);
    Vector2.right = new Vector2(1, 0);
    Vector2.up = new Vector2(0, 1);
    Vector2.down = new Vector2(0, -1);
    return Vector2;
}());
//This class handles all of the timing related operations
var Time;
(function (Time) {
    Time.delta = 0; //Difference in time between subsequent function calls
    Time.time = 0; //Counter since game began
    //Holds an array of call backs
    var _updateCallbacks = [];
    var _startCallbacks = [];
    var _awakeCallbacks = [];
    var _lateCallbacks = [];
    var _earlyCallbacks = [];
    //Functions call backs 
    function AddEarlyUpdateCallback(call) { _earlyCallbacks.push(call); }
    Time.AddEarlyUpdateCallback = AddEarlyUpdateCallback;
    ;
    function AddLateUpdateCallback(call) { _lateCallbacks.push(call); }
    Time.AddLateUpdateCallback = AddLateUpdateCallback;
    ;
    function AddUpdateCallback(call) { _updateCallbacks.push(call); }
    Time.AddUpdateCallback = AddUpdateCallback;
    ;
    function AddAwakeCallback(call) { _awakeCallbacks.push(call); }
    Time.AddAwakeCallback = AddAwakeCallback;
    ;
    function AddStartCallback(call) { _startCallbacks.push(call); }
    Time.AddStartCallback = AddStartCallback;
    ;
    //Called when the page loads
    function _Awake() {
        for (var i = 0; i < _awakeCallbacks.length; i++) {
            _awakeCallbacks[i]();
        }
        _Start();
    }
    ;
    //Called when the page and basic operations have been formed
    function _Start() {
        for (var i = 0; i < _startCallbacks.length; i++) {
            _startCallbacks[i]();
        }
        requestAnimationFrame(_Update);
    }
    ;
    function _EarlyUpdate() { for (var i = 0; i < _earlyCallbacks.length; i++) {
        _updateCallbacks[i]();
    } _Update(); }
    ;
    function _Update() { for (var i = 0; i < _updateCallbacks.length; i++) {
        _updateCallbacks[i]();
    } _LateUpdate(); }
    ;
    function _LateUpdate() { for (var i = 0; i < _lateCallbacks.length; i++) {
        _lateCallbacks[i]();
    } requestAnimationFrame(_EarlyUpdate); }
    ;
    //Needs to find delta time ect.
    Time.AddLateUpdateCallback(function () { Time.time += 1.0; });
    window.addEventListener("load", _Awake);
})(Time || (Time = {}));
//Converts RGBA color into css colour
var Colour = (function () {
    function Colour(r, g, b, a) {
        if (a === void 0) { a = 255; }
        //This will store the current css string, this will be usde by the canvas style
        this._CssString = 'rgba()';
        this.Set(r, g, b, a);
    }
    Colour.prototype._CalculateLetters = function () {
        this._CssString = 'rgba(' +
            Mathf.Bounce(this._red, 0, 256) + ',' +
            Mathf.Bounce(this._green, 0, 256) + ',' +
            Mathf.Bounce(this._blue, 0, 256) + ',' +
            Mathf.Bounce01(this._alpha / 255) + ')';
    };
    Colour.prototype.GetStyle = function () { return this._CssString; };
    Object.defineProperty(Colour.prototype, "red", {
        get: function () { return this._red; },
        set: function (r) { this._red = Mathf.Floor(r); this._CalculateLetters(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Colour.prototype, "green", {
        get: function () { return this._green; },
        set: function (g) { this._green = Mathf.Floor(g); this._CalculateLetters(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Colour.prototype, "blue", {
        get: function () { return this._blue; },
        set: function (b) { this._blue = Mathf.Floor(b); this._CalculateLetters(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Colour.prototype, "alpha", {
        get: function () { return this._alpha; },
        set: function (a) { this._alpha = Mathf.Floor(a); this._CalculateLetters(); },
        enumerable: true,
        configurable: true
    });
    Colour.prototype.Set = function (r, g, b, a) {
        if (a === void 0) { a = null; }
        this.red = r;
        this.green = g;
        this.blue = b;
        if (a != null) {
            this.alpha = a;
        }
    };
    //Will get a colour value via an integer array ref
    Colour.prototype.Index = function (ind) {
        var clamped = Mathf.Round(Mathf.Mod(ind, 4));
        switch (clamped) {
            case 0: return this.red;
            case 1: return this.green;
            case 2: return this.blue;
            case 3: return this.alpha;
            default: return null;
        }
    };
    //Default constant colour values
    Colour.black = new Colour(0, 0, 0);
    Colour.white = new Colour(255, 255, 255);
    Colour.clear = new Colour(0, 0, 0, 0);
    Colour.green = new Colour(0, 255, 0);
    Colour.blue = new Colour(0, 0, 255);
    Colour.red = new Colour(255, 0, 0);
    Colour.magenta = new Colour(255, 0, 255);
    Colour.yellow = new Colour(255, 255, 0);
    Colour.cyan = new Colour(0, 255, 255);
    Colour.grey = new Colour(128, 128, 128);
    return Colour;
}());
//This is a static classe used to get input from the keyboard and mouse
var Input;
(function (Input) {
    //Holds an array of key data
    var _keyHeldData = []; //Data will be true while a key is being held down
    var _keyDownData = []; //Data will be true for one frame when a key is pressed down
    var _keyReleaseData = []; //Data will be true for one frame when a key is released
    var _mouseHeldData = []; //Data will be true while a mouse button is being held down
    var _mouseDownData = []; //Data will be true for one frame when a mouse button is pressed down
    var _mouseReleaseData = []; //Data will be true for one frame when a mouse button is released
    //Check for keyboard events
    function GetKey(keyCode) { return _keyHeldData[keyCode]; }
    Input.GetKey = GetKey;
    ; //Continuous input check
    function GetKeyUp(keyCode) { return _keyReleaseData[keyCode]; }
    Input.GetKeyUp = GetKeyUp;
    ; //Key up input check
    function GetKeyDown(keyCode) { return _keyDownData[keyCode]; }
    Input.GetKeyDown = GetKeyDown;
    ; //Key down input check
    function GetMouse(keyCode) { return _mouseHeldData[keyCode]; }
    Input.GetMouse = GetMouse;
    ; //Continuous input check
    function GetMouseUp(keyCode) { return _mouseReleaseData[keyCode]; }
    Input.GetMouseUp = GetMouseUp;
    ; //Key up input check
    function GetMouseDown(keyCode) { return _mouseDownData[keyCode]; }
    Input.GetMouseDown = GetMouseDown;
    ; //Key down input check
    var _mousePosition = new Vector2(0, 0);
    function GetMousePosition(disp) {
        var rect = disp.canvas.getBoundingClientRect();
        return new Vector2(_mousePosition.x - rect.left, _mousePosition.y - rect.top);
    }
    Input.GetMousePosition = GetMousePosition;
    //Holds the input movement axis
    var _axis = new Vector2(0, 0);
    function GetAxisHorizontal() { return _axis.x; }
    Input.GetAxisHorizontal = GetAxisHorizontal;
    function GetAxisVertical() { return _axis.y; }
    Input.GetAxisVertical = GetAxisVertical;
    //Called by event listeners
    function _CallbackMouseMove(event) { _prevent(event); _mousePosition = new Vector2(event.clientX, event.clientY); }
    ;
    function _CallbackKeyDown(event) { _prevent(event); if (_keyHeldData[event.keyCode] != true) {
        _keyDownData[event.keyCode] = true;
    } _keyHeldData[event.keyCode] = true; }
    ;
    function _CallbackKeyUp(event) { _prevent(event); delete _keyHeldData[event.keyCode]; delete _keyDownData[event.keyCode]; _keyReleaseData[event.keyCode] = true; }
    ;
    function _CallbackMouseDown(event) { _prevent(event); if (_mouseHeldData[event.button] != true) {
        _mouseDownData[event.button] = true;
    } _mouseHeldData[event.button] = true; }
    ;
    function _CallbackMouseUp(event) { _prevent(event); delete _mouseHeldData[event.button]; delete _mouseDownData[event.button]; _mouseReleaseData[event.button] = true; }
    ;
    function _CallbackUpdate() {
        _keyDownData = [];
        _keyReleaseData = [];
        _mouseDownData = [];
        _mouseReleaseData = [];
        //Needs to calculate the movement axis
        var right = (Input.GetKey(Input.KeyCode.right) || Input.GetKey(Input.KeyCode.d));
        var left = (Input.GetKey(Input.KeyCode.left) || Input.GetKey(Input.KeyCode.a));
        var down = (Input.GetKey(Input.KeyCode.down) || Input.GetKey(Input.KeyCode.s));
        var up = (Input.GetKey(Input.KeyCode.up) || Input.GetKey(Input.KeyCode.w));
        _axis = new Vector2(0, 0);
        _axis.x += (right == true) ? 1 : 0;
        _axis.x -= (left == true) ? 1 : 0;
        _axis.y += (up == true) ? 1 : 0;
        _axis.y -= (down == true) ? 1 : 0;
    }
    //Will prevent default browser behaviour
    function _prevent(event) { event.preventDefault(); }
    //Event listeners for input events
    window.addEventListener("mousemove", _CallbackMouseMove);
    window.addEventListener("mousedown", _CallbackMouseDown);
    window.addEventListener("mouseup", _CallbackMouseUp);
    window.addEventListener("keydown", _CallbackKeyDown);
    window.addEventListener("keyup", _CallbackKeyUp);
    Time.AddLateUpdateCallback(_CallbackUpdate); //Needs to subscribe to late update
    //Defines all javascript key codes
    Input.KeyCode = {
        mousemiddle: 1,
        mouseright: 2,
        mouseleft: 0,
        right: 39,
        down: 40,
        left: 37,
        up: 38,
        backspace: 8,
        pagedown: 34,
        escape: 27,
        pageup: 33,
        insert: 45,
        space: 32,
        tilda: 192,
        enter: 13,
        tab: 9,
        end: 35,
        home: 36,
        del: 46,
        zero: 48,
        one: 49,
        two: 50,
        three: 51,
        four: 52,
        five: 53,
        six: 54,
        seven: 55,
        eight: 56,
        nine: 57,
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90
    };
})(Input || (Input = {}));
;
//Everything in the engine must inherit from this
//Will allow for generatic functions to take in any type
var Base = (function () {
    function Base(name) {
        if (name === void 0) { name = "new"; }
        this.name = ""; //Pointless, just allows for clean organisation
        this._instanceID = Base.GetNextInstanceID(); //Like a GUID, but counts up
        this.name = name;
    }
    Object.defineProperty(Base.prototype, "instanceID", {
        get: function () { return this._instanceID; },
        enumerable: true,
        configurable: true
    });
    Base.GetNextInstanceID = function () { Base._instanceCounter += 1; return Base._instanceCounter; };
    Base.prototype.ToString = function () { return this.name + " : " + this.constructor.name + " - InstanceID : " + this.instanceID; };
    //Removes every known property
    Base.prototype.Destroy = function () {
        for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                delete this[prop];
            }
        }
        delete this;
    };
    Base.Destroy = function (object) { object.Destroy(); };
    // -- NOT WORKING --
    //Will create an exact copy of this
    Base.prototype.Clone = function () {
        var result = (new this.constructor);
        for (var attrib in this) {
            if (this.hasOwnProperty(attrib)) {
                //Instance ID must be unique for every object
                if (this[attrib] === this.instanceID) {
                    continue;
                }
                result[attrib] = this[attrib];
            }
        }
        result.name = this.name + " clone";
        return result;
    };
    Base.Instantiate = function (original) { return original.Clone(); };
    //Counts up everytime an instance of this class is created
    //Later update the allocation system to account for destroyed entitys
    Base._instanceCounter = 0;
    return Base;
}());
//This is the base class for any possible node in the scene graph
//The scene graph organises all bodys into a heirachy structure
var SceneNode = (function (_super) {
    __extends(SceneNode, _super);
    //Will setup this as a child of root
    function SceneNode(name) {
        if (name === void 0) { name = "SceneNode"; }
        _super.call(this, name);
        this._parent = SceneNode.root; //Holds the current parent that is storing this
        this._children = {};
        //Make sure this object isnt actually root
        if (SceneNode.root != null) {
            SceneNode.root.AddChild(this);
        }
        else {
            this._parent = null;
        }
    }
    Object.defineProperty(SceneNode.prototype, "parent", {
        //Getters and setters
        get: function () { return this._parent; },
        set: function (n) { this.SetParent(n); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "childCount", {
        //Getters
        get: function () { return Object.keys(this._children).length; } //May not work on older browsers
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "recursiveChildCount", {
        get: function () {
            //Counts up by recusivly totaling the childCount
            function CountChildren(obj) {
                var total = obj.childCount;
                for (var childID in obj._children) {
                    total += CountChildren(obj._children[childID]);
                }
                return total;
            }
            return CountChildren(this);
        },
        enumerable: true,
        configurable: true
    });
    //Needs to update all children - this causes a flow on effect
    SceneNode.prototype.Update = function () {
        for (var key in this._children) {
            this._children[key].Update();
        }
    };
    //Will remove the object and account for all scene graph refernces
    SceneNode.prototype.Destroy = function () {
        //First all children of this need to be deleted
        for (var key in this._children) {
            this._children[key].Destroy(); //Recursivly remove
            delete this._children[key]; //Remove ref from child array
        }
        //Remove from parents child list
        if (this._parent != null) {
            delete this._parent._children[this.instanceID];
        }
        //Manually remove all properties
        this._children = {};
        this._parent = null;
        delete this._children;
        delete this._parent;
        _super.prototype.Destroy.call(this);
    };
    SceneNode.prototype.DeleteChild = function (child) { if (child.instanceID in this._children) {
        child.Destroy();
    } };
    //Allows a child to be added to the object - returns the new child
    SceneNode.prototype.AddChild = function (child) {
        //If the child has a parent, remove the refernce in that array
        if (child._parent != null) {
            delete child._parent._children[child._instanceID];
            child._parent = null;
        }
        //Add to this child array and set the parent of the child
        this._children[child.instanceID] = child;
        child._parent = this;
        return child;
    };
    SceneNode.prototype.SetParent = function (parent) { parent.AddChild(this); };
    SceneNode.prototype.AddChildren = function (children) { for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        this.AddChild(child);
    } };
    //Returns the children as an array instead of a dictionary
    //This is very dodgy as it assumes the dictionary is sorted based on the order elemnts are added - fix this
    SceneNode.prototype.GetAllChildren = function () {
        var resultingArray = [];
        for (var childID in this._children) {
            resultingArray.push(this._children[childID]);
        }
        return resultingArray;
    };
    //Functions for getting children
    SceneNode.prototype.GetChildByID = function (ID) { return this._children[ID]; }; // O(1)
    SceneNode.prototype.GetChild = function (index) { return this.GetAllChildren()[index]; }; // O(n)
    SceneNode.prototype.FindChild = function (child) { return this._children[child.instanceID]; }; // O(1)
    SceneNode.prototype.FindChildByName = function (name) {
        for (var child in this._children) {
            if (this._children[child].name == name) {
                return this._children[child];
            }
        }
        return null;
    }; // worst case O(this.childCount)
    //Static scene functions
    //Optional function that gives some inforation from inherited classes
    SceneNode.prototype.GetExtraInformation = function () { return " "; };
    //Static methods for visually displaying the current hierarchy
    SceneNode.Print = function () {
        function printChildren(parent) {
            //Holds a nice debug message
            var formattedInfo = "[ID: " + parent.instanceID + "] " + parent.name + " (" + parent.GetExtraInformation() + ") => " + parent.constructor.name;
            if (parent.childCount > 0) {
                //Recursivly print the children of the children
                Debug.CreateGroup(formattedInfo);
                for (var child in parent._children) {
                    printChildren(parent._children[child]);
                }
                Debug.EndGroup();
            }
            else {
                Debug.Log(formattedInfo);
            }
        }
        ;
        printChildren(SceneNode.root);
    };
    //By default anything is a child of root
    SceneNode.root = new SceneNode("root");
    return SceneNode;
}(Base));
//Needs to update the root node
//Removed as updates will be handled on set
//Time.AddEarlyUpdateCallback(SceneNode._root.Update); 
//Any class that can be added to a gameobject needs to inherit from this
var Component = (function () {
    function Component() {
        //Temporary
        this.name = '';
    }
    return Component;
}());
//A transform reprents to positioning of a gameobject
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        _super.call(this);
        //Currently all properties are public
        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
        this.rotation = 0.0;
        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
        this.rotation = 0.0;
    }
    return Transform;
}(Component));
;
var AABB = (function () {
    function AABB() {
        this.min = Vector2.zero;
        this.max = Vector2.zero;
    }
    return AABB;
}());
var Collider = (function () {
    function Collider() {
        this.physicsMaterial = new PhysicsMaterial(0.5, 0.8);
        this.transform = new Transform();
        this.axisAlignedBoundingBox = new AABB();
        this.name = "Collider";
    }
    return Collider;
}());
var BoxCollider = (function (_super) {
    __extends(BoxCollider, _super);
    function BoxCollider(t) {
        _super.call(this);
        this.name = "Box";
        this.transform = t;
        this.axisAlignedBoundingBox.min = this.transform.position.Clone();
        this.axisAlignedBoundingBox.max = Vector2.Add(this.transform.position, this.transform.scale);
    }
    BoxCollider.prototype.GetX = function () {
        return this.transform.position.x;
    };
    BoxCollider.prototype.GetY = function () {
        return this.transform.position.y;
    };
    BoxCollider.prototype.GetWidth = function () {
        return this.transform.scale.x;
    };
    BoxCollider.prototype.GetHeight = function () {
        return this.transform.scale.y;
    };
    return BoxCollider;
}(Collider));
var CircleCollider = (function (_super) {
    __extends(CircleCollider, _super);
    function CircleCollider(t, r) {
        _super.call(this);
        this._radius = 1.0;
        this.diameter = this.radius * 2;
        this.area = Mathf.PI * this.radius * this.radius;
        this.name = "Circle";
        this.transform = t;
        this.transform.scale = new Vector2(r, r);
        this.radius = r;
        this.area = Mathf.PI * this.radius * this.radius;
        this.diameter = this.radius * 2;
    }
    Object.defineProperty(CircleCollider.prototype, "radius", {
        set: function (r) {
            this._radius = r;
        },
        enumerable: true,
        configurable: true
    });
    return CircleCollider;
}(Collider));
var PolygonCollider = (function (_super) {
    __extends(PolygonCollider, _super);
    function PolygonCollider() {
        _super.call(this);
    }
    return PolygonCollider;
}(Collider));
var Rigidbody = (function (_super) {
    __extends(Rigidbody, _super);
    function Rigidbody(m) {
        _super.call(this);
        this.velocity = Vector2.zero;
        this.mass = m;
        this.inverseMass = 1 / this.mass;
        this.restitution = this.inverseMass * 4;
        console.log("Generated restitution = " + this.restitution);
    }
    return Rigidbody;
}(Component));
//A renderable shape
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    //Construct by default
    function Rectangle() {
        _super.call(this);
        this.strokeColour = new Colour(255, 255, 255);
        this.fillColour = new Colour(0, 0, 0);
        this.size = new Vector2(10, 10);
        this.stroke = false;
    }
    return Rectangle;
}(Component));
var Circle = (function (_super) {
    __extends(Circle, _super);
    //Regular constructor
    function Circle() {
        //Call parent constructor first
        _super.call(this);
    }
    return Circle;
}(Component));
//A gameobject should work via a component system.
var GameObject // extends SceneNode
 = (function () {
    function GameObject // extends SceneNode
        () {
        //Components will be added and removed from the gameobject dynamically
        //For now they are defined manually
        this.transform = new Transform();
        this.renderer = new Rectangle();
        this.body = new Body();
        this.body.rigidbody = new Rigidbody(5);
    }
    return GameObject // extends SceneNode
    ;
}());
//This contains a renderer class - the renderer is responsible for:
// - Controlling all canvas operations
// - Asset loading
// - More..
var Renderer = (function () {
    function Renderer() {
        //Privates
        //Size of canvas
        this._width = 100;
        this._height = 100;
        //Actual low level canvas
        this._canvas = null; //The canvas elemnt
        this._context = null; //The canvas 2D context
        //Stores a stack of all gameobjects that are yet to be rendererd
        this._drawStack = new Array();
        //Drawing properties
        this._backgroundColour = new Colour(255, 255, 255);
    }
    //Setup everything
    Renderer.prototype.Create = function (w, h) {
        if (w === void 0) { w = 100; }
        if (h === void 0) { h = 100; }
        //If there is already a canvas, delete it
        if (this._canvas != null) {
            this._canvas.remove();
        }
        //Create canvas
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        this.width = w;
        this.height = h;
        //Add to the page
        document.body.appendChild(this._canvas);
        //Set the current display object
        Display = this;
        //Add timer
        this._drawStack = new Array();
    };
    //Drawing wrapper functions
    Renderer.prototype.SetFillColour = function (colour) { this._context.fillStyle = colour.GetStyle(); };
    Renderer.prototype.SetStrokeColour = function (colour) { this._context.strokeStyle = colour.GetStyle(); };
    Renderer.prototype.Clear = function () { this._context.clearRect(0, 0, this.width, this.height); };
    //Shape drawing functions
    Renderer.prototype.SimpleDrawRect = function (position, scale, col, rot) {
        if (col === void 0) { col = Colour.black; }
        if (rot === void 0) { rot = 0; }
        //Save canvas context state
        this._context.save();
        this._context.translate(position.x, position.y);
        this._context.rotate(rot * Mathf.DegToRad);
        //this._context.scale(scale..x, scale.y);
        //Draw
        this.SetFillColour(col);
        this._context.fillRect(-(scale.x / 2), -(scale.y / 2), scale.x, scale.y);
        //Done
        this._context.restore();
    };
    Renderer.prototype.SimpleStrokeRect = function (position, scale, col, rot) {
        if (col === void 0) { col = Colour.black; }
        if (rot === void 0) { rot = 0; }
        //Save canvas context state
        this._context.save();
        this._context.translate(position.x, position.y);
        this._context.rotate(rot * Mathf.DegToRad);
        //this._context.scale(scale..x, scale.y);
        //Draw
        this.SetStrokeColour(col);
        this._context.strokeRect(-(scale.x / 2), -(scale.y / 2), scale.x, scale.y);
        //Done
        this._context.restore();
    };
    Renderer.prototype.DrawRect = function (rect, trans) {
        if (trans === void 0) { trans = new Transform(); }
        this.SimpleDrawRect(trans.position, Vector2.Mul(trans.scale, rect.size), rect.fillColour, trans.rotation);
        if (rect.stroke) {
            this.SimpleStrokeRect(trans.position, Vector2.Mul(trans.scale, rect.size), rect.strokeColour);
        }
    };
    //Actual main drawing routine
    //Will account for the shape later
    Renderer.prototype.Draw = function (obj) { this.DrawRect(obj.renderer, obj.transform); };
    //Handles interaction with the draw stack
    Renderer.prototype.AddGameObject = function (g) { this._drawStack.unshift(g); };
    //This function will be called every frame by the time class
    //Handles poping of the draw stack
    Renderer.prototype.Update = function () {
        //Loop though the stack
        var stackLength = this._drawStack.length;
        while (stackLength > 0) {
            //Pop from the back of the stack
            var current = this._drawStack.pop();
            //Drawing routine is temporary
            this.Draw(current);
            //Increment
            stackLength -= 1;
        }
    };
    Object.defineProperty(Renderer.prototype, "width", {
        //Getters and setters
        get: function () { return this._width; },
        set: function (w) { this._width = w; this._canvas.width = this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "height", {
        get: function () { return this._height; },
        set: function (h) { this._height = h; this._canvas.height = this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "canvas", {
        get: function () { return this._canvas; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "backgroundColour", {
        get: function () { return this._backgroundColour; },
        set: function (col) { this._backgroundColour = col; this._canvas.style.background = this._backgroundColour.GetStyle(); },
        enumerable: true,
        configurable: true
    });
    //Public func.
    Renderer.prototype.SetSize = function (w, h) { this.width = w; this.height = h; };
    return Renderer;
}());
//Create a default one for static use, this allows for multiple renderers
var Display = new Renderer();
var Body = (function () {
    function Body() {
        this.collider = new BoxCollider(new Transform());
        this.rigidbody = new Rigidbody(1);
    }
    return Body;
}());
//Contact point
var Contact = (function () {
    function Contact() {
        this.position = Vector2.zero;
        this.normal = Vector2.zero;
        this.penetration = 0;
    }
    return Contact;
}());
//Generic manifold, holding collision data
var Manifold = (function () {
    function Manifold() {
        //All points of contact
        this.contacts = new Array(2);
        this.contacts.length = 2;
        for (var i = 0; i < this.contacts.length; i++)
            this.contacts[i] = new Contact();
        this.contactCount = 0;
    }
    return Manifold;
}());
/*
* The following functions have one purpose: to generate a manifold, given two objects
*/
function BoxToBox(boxA, boxB) {
    Debug.Log("BoxToBox function being called.");
    /*if(boxA.GetX() < boxB.GetX() + boxB.GetWidth() && boxA.GetX() + boxA.GetWidth() > boxB.GetX() && boxA.GetY() < boxB.GetY() + boxB.GetHeight() && boxA.GetHeight() + boxA.GetY() > boxB.GetY()) {
         return true;
    } else {
        return false;
    }*/
    var manifold = new Manifold();
    //From A to B
    var translation = new Vector2((boxB.transform.position.x - boxA.transform.position.x), (boxB.transform.position.y - boxA.transform.position.y));
    var a_extent = (boxA.axisAlignedBoundingBox.max.x - boxA.axisAlignedBoundingBox.min.x) / 2;
    var b_extent = (boxB.axisAlignedBoundingBox.max.x - boxB.axisAlignedBoundingBox.min.x) / 2;
    var overlap = new Vector2((a_extent + b_extent - Mathf.Abs(translation.x)), (a_extent + b_extent - Mathf.Abs(translation.y)));
    manifold.contacts[0].position = new Vector2(Mathf.Max(boxA.axisAlignedBoundingBox.min.x, boxB.axisAlignedBoundingBox.min.x), Mathf.Max(boxA.axisAlignedBoundingBox.min.y, boxB.axisAlignedBoundingBox.min.y));
    manifold.contacts[1].position = new Vector2(Mathf.Max(boxA.axisAlignedBoundingBox.max.x, boxB.axisAlignedBoundingBox.max.x), Mathf.Max(boxA.axisAlignedBoundingBox.max.y, boxB.axisAlignedBoundingBox.max.y));
    if (overlap.x > overlap.y) {
        manifold.contacts[0].normal = (translation.x < 0) ? Vector2.right : Vector2.left;
        manifold.contacts[0].penetration = overlap.x;
    }
    else {
        manifold.contacts[1].normal = (translation.y < 0) ? Vector2.up : Vector2.down;
        manifold.contacts[1].penetration = overlap.y;
    }
    /*
        if(x_overlap > y_overlap)
    {
      // Point towards B knowing that t points from A to B
      c->normal = t.x < 0 ? Vec( 1, 0 ) : Vec( -1, 0 )
      c->penetration = x_overlap;
    }
    else
    {
      // Point toward B knowing that t points from A to B
      c->normal = t.y < 0 ? Vec( 0, 1 ) : Vec( 0, -1 );
      c->penetration = y_overlap;
    }
    */
    return manifold;
}
//Perfect
function CircleToCircle(c1, c2) {
    Debug.Log("CircleToCircle function being called.");
    /*if(Mathf.Sqrt(((Mathf.Pow((c1.transform.position.x - c2.transform.position.x) , 2)) + (Mathf.Pow((c1.transform.position.y - c2.transform.position.y) , 2)))) <= c1.radius + c2.radius) {
        return true;
    } else {
        return false;
    }*/
    var manifold = new Manifold();
    var translationVector = new Vector2((c2.transform.position.x - c1.transform.position.x), (c2.transform.position.y - c1.transform.position.y));
    var radii = c1.radius + c2.radius;
    if (translationVector.SqrMagnitude() > radii * radii)
        return null;
    var distance = translationVector.Magnitude();
    var contact1 = new Contact();
    manifold.contacts[0] = contact1;
    if (distance == 0) {
        manifold.contacts[0].penetration = c1.radius;
        manifold.contacts[0].normal = Vector2.up;
        manifold.contacts[0].position = c1.transform.position;
        manifold.contactCount++;
    }
    else {
        manifold.contacts[0].penetration = radii - distance;
        manifold.contacts[0].normal = new Vector2((translationVector.x / distance), (translationVector.y / distance));
        manifold.contacts[0].position.x = manifold.contacts[0].normal.x * c1.radius + c1.transform.position.x;
        manifold.contacts[0].position.y = manifold.contacts[0].normal.y * c1.radius + c1.transform.position.y;
        manifold.contactCount++;
    }
    manifold.colliderA = c1;
    manifold.colliderB = c2;
    return manifold;
}
function CircleToBox(c, b) {
    var manifold = new Manifold();
    manifold.colliderA = c;
    manifold.colliderB = b;
    //From A to B
    var translationVector = new Vector2((b.transform.position.x - c.transform.position.x), (b.transform.position.y - c.transform.position.y));
    var closest = translationVector;
    var x_extent = (c.axisAlignedBoundingBox.max.x - b.axisAlignedBoundingBox.min.x) / 2;
    var y_extent = (c.axisAlignedBoundingBox.max.y - b.axisAlignedBoundingBox.min.y) / 2;
    closest.x = Mathf.Clamp(closest.x, -x_extent, x_extent);
    closest.y = Mathf.Clamp(closest.y, -y_extent, y_extent);
    var inside = false;
    if (Vector2.Equal(translationVector, closest)) {
        inside = true;
        if (Mathf.Abs(translationVector.x) > Mathf.Abs(translationVector.y)) {
            if (closest.x > 0) {
                closest.x = x_extent;
            }
            else {
                closest.x = -x_extent;
            }
        }
        else {
            if (closest.y > 0) {
                closest.y = y_extent;
            }
            else {
                closest.y = -y_extent;
            }
        }
    }
    var normal = new Vector2(translationVector.x - closest.x, translationVector.y - closest.y);
    var distance = normal.SqrMagnitude();
    var radius = c.radius;
    if (distance > radius * radius && !inside) {
        return null;
    }
    distance = Mathf.Sqrt(distance);
    if (inside) {
        manifold.contacts[0].normal = new Vector2(-translationVector.x, -translationVector.y);
        manifold.contacts[0].penetration = radius - distance;
    }
    else {
        manifold.contacts[0].normal = translationVector.Clone();
        manifold.contacts[0].penetration = radius - distance;
    }
    return manifold;
}
function BoxToCircle(b, c) {
    Debug.Log("BoxToCircle function being called.");
    return CircleToBox(c, b);
}
//Add CircleToLine (done, but need to import code from MikeJS)
function CircleToPoint(c, p) {
    if (Vector2.Distance(c.transform.position, p) <= c.radius) {
        return true;
    }
    else {
        return false;
    }
}
function PointToCircle(p, c) {
    return CircleToPoint(c, p);
}
function PointToBox(p, b) {
    if (p.x >= b.transform.position.x && p.x <= b.transform.position.x + b.transform.scale.y && p.y >= b.transform.position.y && p.y <= b.transform.position.y + b.transform.scale.y) {
        return true;
    }
    else {
        return false;
    }
}
function BoxToPoint(b, p) {
    return PointToBox(p, b);
}
function PointToPoint(p1, p2) {
    if (Vector2.Distance(p1, p2) <= Mathf.Rounding) {
        return true;
    }
    else {
        return false;
    }
}
var CollisionSolver;
(function (CollisionSolver) {
    /**
     * End goal:
     * There should be a function that takes in two Bodies and solves the collision
     * Firstly, it will check each Body's Child Collider's names (e.g. BoxCollider or CircleCollider) and concatenate a string to pass to eval()
     * eval() will take the string, run the code and return the Manifold which contains collision data on how to solve the collision
     * Then, it will solve the collision and return a bool perhaps?
     */
    //This function is to die
    function CheckCollision(objectA, objectB) {
        var aName = objectA.name;
        var bName = objectB.name;
        var funcName = aName + "To" + bName;
        console.log("Calling CollisionSolver.CheckCollision(): " + funcName);
        //var funcToCall = new Function(funcName);
        return eval(funcName + "(" + "objectA" + ", objectB)");
    }
    CollisionSolver.CheckCollision = CheckCollision;
    //Import useful code from 'CheckCollision' into this such as the string contcat and eval() to find Manifold
    function ResolveCollision(objectA, objectB) {
        //This needs to have a GetComponent<>()
        //Generic code
        var collisionData = eval((objectA.collider.name + "To" + objectB.collider.name) + "(objectA.collider, objectB.collider)");
        console.log(collisionData);
        //Relative velocity
        var relativeVelocity = new Vector2(objectB.rigidbody.velocity.x - objectA.rigidbody.velocity.x, objectB.rigidbody.velocity.y - objectA.rigidbody.velocity.y);
        //Velocity along the Normal
        var velocityAlongNormal = Vector2.Dot(relativeVelocity, collisionData.contacts[0].normal);
        if (velocityAlongNormal >= 0) {
            return false;
        }
        var restitution = Mathf.Min(objectA.rigidbody.restitution, objectB.rigidbody.restitution);
        //Temp
        restitution = 0.2;
        var impulseScalar = -(1 + restitution) * velocityAlongNormal;
        impulseScalar /= objectA.rigidbody.inverseMass + objectB.rigidbody.inverseMass;
        var impulse = new Vector2((collisionData.contacts[0].normal.x * impulseScalar), (collisionData.contacts[0].normal.y * impulseScalar));
        /*objectA.rigidbody.velocity.x -= objectA.rigidbody.inverseMass * impulse.x;
        objectA.rigidbody.velocity.y -= objectA.rigidbody.inverseMass * impulse.y;
        
        objectB.rigidbody.velocity.x += objectB.rigidbody.inverseMass * impulse.x;
        objectB.rigidbody.velocity.y += objectB.rigidbody.inverseMass * impulse.y;*/
        var massSum = objectA.rigidbody.mass + objectB.rigidbody.mass;
        var ratio = objectA.rigidbody.mass / massSum;
        objectA.rigidbody.velocity.x -= ratio * impulse.x;
        objectA.rigidbody.velocity.y -= ratio * impulse.y;
        ratio = objectB.rigidbody.mass / massSum;
        objectB.rigidbody.velocity.x += ratio * impulse.x;
        objectB.rigidbody.velocity.y += ratio * impulse.y;
        return true;
    }
    CollisionSolver.ResolveCollision = ResolveCollision;
})(CollisionSolver || (CollisionSolver = {}));
var Broadphase;
(function (Broadphase) {
    function GeneratePairs(bodies) {
        var pairs = [];
        for (var i = 0; i < bodies.length; i++) {
            for (var j = 0; j < bodies.length; j++) {
                var bodyA = bodies[i];
                var bodyB = bodies[j];
                if (bodyA === bodyB)
                    continue;
                if (bodyA.collider.transform.position.x < bodyB.collider.transform.position.x + bodyB.collider.transform.scale.x && bodyA.collider.transform.position.x + bodyA.collider.transform.scale.x > bodyB.collider.transform.position.x && bodyA.collider.transform.position.y < bodyB.collider.transform.position.y + bodyB.collider.transform.scale.y && bodyA.collider.transform.scale.y + bodyA.collider.transform.position.y > bodyB.collider.transform.position.y) {
                    pairs.push(bodyA);
                    pairs.push(bodyB);
                }
            }
        }
    }
    Broadphase.GeneratePairs = GeneratePairs;
})(Broadphase || (Broadphase = {}));
var PhysicsConstants;
(function (PhysicsConstants) {
    var GRAVITY = -9.8;
})(PhysicsConstants || (PhysicsConstants = {}));
var PhysicsMaterial = (function () {
    function PhysicsMaterial(f, b) {
        this.friction = f || 0.5;
        this.bounce = b || 0.8;
    }
    return PhysicsMaterial;
}());
