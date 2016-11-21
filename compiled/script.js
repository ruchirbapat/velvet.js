var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Wrap around JS console functions
        - Easier colour managment in the console
*/
//Wrapper (static) class for now that wraps around the built in console operations
var Debug;
(function (Debug) {
    //Properties when logging
    Debug.backgroundColour = 'white';
    //Holds the current debug string
    function GenerateDebugFormatting() {
        //Create CSS Style info for the text
        return 'color: ' + Debug.textColour + ';' +
            'font-size: ' + Debug.fontSize + ';' +
            'background: ' + Debug.backgroundColour + ';';
    }
    Debug.GenerateDebugFormatting = GenerateDebugFormatting;
    ;
    //Will reset the formatting properties
    function ResetFormatting() {
        //Revert back to defualt values
        Debug.backgroundColour = 'white';
        Debug.textColour = 'black';
        Debug.fontSize = 'normal';
    }
    Debug.ResetFormatting = ResetFormatting;
    ;
    //Wrappers that add some functionality
    function RawLog(data) { console.log(data); }
    Debug.RawLog = RawLog;
    ; //Will print the param with console log directly, this is good for pritinf objects
    function Log(text) { console.log('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Log = Log;
    ; //Prints using the current debug formatting
    function Warning(text) { console.warn('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Warning = Warning;
    ; //Prints using the current debug formatting in warning format
    function Error(text) { console.error('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Error = Error;
    ; //Prints using the current debug formatting in error format
    function Info(text) { console.info('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Info = Info;
    ; //Prints using the current debug formatting in info format
    function Clear() { console.clear(); }
    Debug.Clear = Clear;
    ; //Removes all data from the console
    function Spacer() { Debug.Log("\n"); }
    Debug.Spacer = Spacer;
    ; //Creates a blank space in the console, good for organising data
    function EndGroup() { console.groupEnd(); }
    Debug.EndGroup = EndGroup;
    ; //Will end the current group (like a tree structure)
    function CreateGroup(name) { console.group(name); }
    Debug.CreateGroup = CreateGroup;
    ; //Will create the beggining of a group (like a tree structure)
})(Debug || (Debug = {}));
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Wrap around already exisiting JS math fuctions
        - Add math functions specific to game programming
        - Define mathematical constants
*/
//A math class to make mathematic operations easier and more relivant to game programming
//And to standardize function calls.
var Mathf;
(function (Mathf) {
    /* ----- Constant values ----- */
    Mathf.pi = 3.1415926; //The ratio of the circumference to the perimeter of a circle
    Mathf.tau = 6.2831852; //Double PI, this will make certain operations faster
    Mathf.rounding = 0.005; //This is used as an epsilon value when comparing floats
    Mathf.infinite = Infinity; //Exactly what it sounds like.
    Mathf.radToDeg = 360 / Mathf.tau; //For converting radians to degrees
    Mathf.degToRad = (Mathf.pi * 2) / 360; //For converting degrees to radians 
    /* ----- Wrapper functions to overlay built in JS math functions ----- */
    //General
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
    //Trig
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
    //Rounding
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
    /* ----- Useful functions ----- */
    //Logarithmics...
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
    //Allows for the modulus operation on floats (decimals)
    function Mod(num, div) { return div * ((num / div) - Mathf.Floor(num / div)); }
    Mathf.Mod = Mod;
    ;
    //Returns a number that has forced 'value' inbetween 'minimum' and 'maximum'
    function Clamp(value, minimum, maximum) {
        //Combine the maximum and mimumm functions to achive this
        return Mathf.Max(minimum, Mathf.Min(value, maximum));
    }
    Mathf.Clamp = Clamp;
    ;
    //Clamps 'value' between 0 and 1
    function Clamp01(value) { return Mathf.Clamp(value, 0.0, 1.0); }
    Mathf.Clamp01 = Clamp01;
    ;
    //Linearly interpolate 't' between two floats ('a' and 'b')
    function LerpUnclamped(a, b, t) {
        //Just use equation from:
        //(1 - t) * v0 + t * v1
        //https://devblogs.nvidia.com/parallelforall/lerp-faster-cuda/
        return (1 - t) * a + t * b;
    }
    Mathf.LerpUnclamped = LerpUnclamped;
    ;
    //A lerp where 't' cannot exceed 'b' and go below 'a'
    function Lerp(a, b, t) { return Mathf.LerpUnclamped(a, b, Mathf.Clamp01(t)); }
    Mathf.Lerp = Lerp;
    ;
    //Smoothdamp, much like lerp interpolates between values
    //But smoothing (much like a broad cubic function)
    //Apply the equation:
    //fn(x) = 3x^2 - 2x^3
    //This is in the form of a wuatratic equation
    //Source: https://en.wikipedia.org/wiki/Smoothstep
    // http://http.developer.nvidia.com/Cg/smoothstep.html
    function SmoothStep(left, right, x) {
        //Clamp the value
        x = Mathf.Clamp01((x - left) / (right - left));
        //Evaluate quadratic
        return x * x * (3.0 - 2.0 * x);
    }
    Mathf.SmoothStep = SmoothStep;
    ;
    //Default values for left and right are used
    function SmoothStep01(x) { return Mathf.SmoothStep(0.0, 1.0, x); }
    Mathf.SmoothStep01 = SmoothStep01;
    ;
    //Similar to SmoothStep but with the equation:
    //6x^5 - 15x^4 + 10x^3
    function SmootherStep(left, right, x) {
        //Scale and clamp
        var nx = Mathf.Clamp01((x - left) / (right - left));
        //Evaluate
        return nx * nx * nx * (nx * (nx * 6 - 15) + 10);
    }
    Mathf.SmootherStep = SmootherStep;
    ;
    //Default values for left and right are used
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
        //Make sure distance is less than delta
        if (Mathf.Abs(target - current) <= delta)
            return target;
        //Otherwise apply a lerp
        return current + Mathf.Sign(target - current) * delta;
    }
    Mathf.MoveTowards = MoveTowards;
    ;
    //Like movetowards but it corrects for angles around 360 and 0.
    function MoveTowardsAngle(current, target, delta) {
        target = current + Mathf.DeltaAngle(current, target);
        return Mathf.MoveTowards(current, target, delta);
    }
    Mathf.MoveTowardsAngle = MoveTowardsAngle;
    ;
    //Will bounce 'value' between 'min' and 'max'. 
    //Like clamping but once the max value is exceeded the result will start to move down and vise versa.  
    function Bounce(value, min, max) {
        var range = max - min;
        var state = Mathf.Mod(value - min, 2 * range);
        if (state > range)
            state = (2 * range) - state;
        return state + min;
    }
    Mathf.Bounce = Bounce;
    ;
    //Overloading the bounce function
    function Bounce0(value, max) { return Mathf.Bounce(value, 0.0, max); }
    Mathf.Bounce0 = Bounce0;
    ;
    function Bounce01(value) { return Mathf.Bounce(value, 0.0, 1.0); }
    Mathf.Bounce01 = Bounce01;
    ;
    //This will find the percentage through a lerp based on paramters
    //Inverse lerp - not done
    //Find the the closest difference between two angles
    //So this value may never exceed 180 degrees
    //Warning slow..
    function DeltaAngle(current, target) {
        //FInd difference
        var diff = target - current;
        //Adjust signs
        while (diff < -180)
            diff += 360;
        while (diff > 180)
            diff -= 360;
        //Done
        return diff;
    }
    Mathf.DeltaAngle = DeltaAngle;
    ;
    //Find the value as a power of two
    function ClosestBinaryPower(value) {
        //Needs	 the find the 2 root of the value then round that to an int
        return Mathf.Round(Mathf.Pow(Mathf.Round(Mathf.Sqrt(value)), 2));
    }
    Mathf.ClosestBinaryPower = ClosestBinaryPower;
    ;
    function IsBinaryPower(value) { return Mathf.ClosestBinaryPower(value) == value; }
    Mathf.IsBinaryPower = IsBinaryPower;
    ;
    //Find the highest value in an unsorted number array named 'arr'
    function MaxArray(arr) {
        //Stores the best value
        var current_highest = 0;
        //Go through and set based on max
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > current_highest || i == 0) {
                current_highest = arr[i];
            }
        }
        //Done
        return current_highest;
    }
    Mathf.MaxArray = MaxArray;
    ;
    //Find the lowest value in an unsorted number array named 'arr'
    function MinArray(arr) {
        //Stores the best value
        var current_lowest = 0;
        //Go through and set based on max
        for (var i = 0; i < arr.length; i++)
            if (arr[i] < current_lowest || i == 0) {
                current_lowest = arr[i];
            }
        //Done
        return current_lowest;
    }
    Mathf.MinArray = MinArray;
    ;
    //Because of slight round errors in floats, this should be used when comparing two values
    //For example Sqrt(9) == 3 should return true, but it will return false because of rounding errors
    function Approximatly(a, b, round) {
        if (round === void 0) { round = Mathf.rounding; }
        return Mathf.Abs(a - b) < round;
    }
    Mathf.Approximatly = Approximatly;
})(Mathf || (Mathf = {}));
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Make random number generation more convenient
*/
//For easy random number generation
var Rand;
(function (Rand) {
    //Random number between 'min' and 'max'
    function Range(min, max) { return (Math.random() * (max - min)) + min; }
    Rand.Range = Range;
    ;
    //Generates a random number between 0 and 1
    function Value() { return Math.random(); }
    Rand.Value = Value;
    ;
    //Generate a random integer 
    function RandBin() { return Rand.RandInt(0, 2); }
    Rand.RandBin = RandBin;
    ;
    function RandInt(min, max) { return Mathf.Round(Rand.Range(min, max)); }
    Rand.RandInt = RandInt;
    ;
})(Rand || (Rand = {}));
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Have a class that defined a 2D point
        - Centralise vector mathematics into static functions
        - Continas definitions for commonly used vectors
*/
//This is a class that can be used to make 2D calculations easier
var Vector2 = (function () {
    //Constructor will set properties
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    //Public functions that are non static
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
    //This will find the reflection of a vector based on a normal provided:
    //  V  N   R
    //  \  |  /
    //   \ | /
    //    \|/
    //  -------
    // V = The input (of velocity) vector
    // N = The normal (needs to be a unit vector)
    // R = Result of the function
    Vector2.Reflect = function (velocity, normal) {
        //Using the formula
        //R = -2*(V dot N)*N + V
        return Vector2.Add(Vector2.Mul(-2 * Vector2.Dot(velocity, normal), normal), velocity);
    };
    //Operator overloading, kinda
    Vector2._AddOperator = function (result, val) { return result += val; };
    Vector2._SubOperator = function (result, val) { return result -= val; };
    Vector2._MulOperator = function (result, val) { return result *= val; };
    Vector2._DivOperator = function (result, val) { return result /= val; };
    Vector2._Operation = function (li, operator) {
        //Stores the result of the calculation
        var result = (li[0] instanceof Vector2) ? li[0].Clone() : new Vector2(li[0], li[0]);
        //Allows for infinte arguments to be parsed
        //Check the type, then apply to the result
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
        //Done
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
    //Misc overloading
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
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Handle the frame by frame calling of update function
        - Create an ordered sequence of events for a program
        - Manage different frame rates on differently performing devices
*/
//This class handles all of the timing related operations
//Frame by frame updates
var Time;
(function (Time) {
    //Properties of a time
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
        //Call all callbacks
        for (var i = 0; i < _awakeCallbacks.length; i++) {
            _awakeCallbacks[i]();
        }
        //Call the next subsequent function
        _Start();
    }
    ;
    //Called when the page and basic operations have been formed
    function _Start() {
        //Call all callbacks
        for (var i = 0; i < _startCallbacks.length; i++) {
            _startCallbacks[i]();
        }
        //Call the next subsequent function
        requestAnimationFrame(_Update);
    }
    ;
    function _EarlyUpdate() { for (var i = 0; i < _earlyCallbacks.length; i++) {
        _updateCallbacks[i]();
    } _Update(); }
    ; //The actual update function calls
    function _Update() { for (var i = 0; i < _updateCallbacks.length; i++) {
        _updateCallbacks[i]();
    } _LateUpdate(); }
    ; //The actual update function calls
    function _LateUpdate() { for (var i = 0; i < _lateCallbacks.length; i++) {
        _lateCallbacks[i]();
    } requestAnimationFrame(_EarlyUpdate); }
    ; //Called at the very end of an update cycle
    //Needs to find delta time ect.
    Time.AddLateUpdateCallback(function () { Time.time += 1.0; });
    //Event listeners
    window.addEventListener("load", _Awake);
})(Time || (Time = {}));
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Hold RGBA colours in one structure
        - Convert colours into CSS for use of the canvas
*/
//Converts RGBA color into css colour
var Colour = (function () {
    //Constructor will set the value based on params
    function Colour(r, g, b, a) {
        if (a === void 0) { a = 255; }
        //This will store the current css string, this will be usde by the canvas style
        //Holds the formatted CSS rgba string
        this._CssString = 'rgba()';
        this.Set(r, g, b, a);
    }
    //This will create a css string
    Colour.prototype._CalculateLetters = function () {
        this._CssString = 'rgba(' +
            Mathf.Bounce(this._red, 0, 256) + ',' +
            Mathf.Bounce(this._green, 0, 256) + ',' +
            Mathf.Bounce(this._blue, 0, 256) + ',' +
            Mathf.Bounce01(this._alpha / 255) + ')';
    };
    //The properties need a getter and setter, since the CSS strings will need to recalculate
    Colour.prototype.GetStyle = function () { return this._CssString; };
    Object.defineProperty(Colour.prototype, "red", {
        get: function () { return this._red; },
        //Setters and getters need custom recalculation behaviour
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
    //Public function to set the colour in one go
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
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Get keyboard input
        - Get mouse input
        - Ignore browser events
*/
//This is a static classe used to get input:
// - Keyboard input
// - Mouse input
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
    //Holds the position of the mouse
    var _mousePosition = new Vector2(0, 0);
    function GetMousePosition() { return _mousePosition; }
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
        //Reset 
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
    //Defines all javascript key codes - not fully done
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
//Any class that can be added to a gameobject needs to inherit from this
var Component = (function () {
    function Component() {
        //Temporary
        this.name = '';
    }
    return Component;
}());
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Create a scene graph style heirachy for all transforms
*/
//A transform reprents to positioning of a game object
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        _super.apply(this, arguments);
        //Currently all properties are public
        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
        this.rotation = 0.0;
    }
    return Transform;
}(Component));
//A gameobjecty should work via a component system.
//Where certain componets can be added
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Allow for shape and sprite drawing
        - Create a layer of abstraction around the JS canvas
*/
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
    };
    //Drawing wrapper functions
    Renderer.prototype.SetColour = function (colour) { this._context.fillStyle = colour.GetStyle(); };
    Renderer.prototype.Clear = function () { this._context.clearRect(0, 0, this.width, this.height); };
    //Shape drawing functions
    Renderer.prototype.DrawRect = function (position, scale, col) {
        if (col === void 0) { col = Colour.black; }
        this.SetColour(col);
        this._context.fillRect(position.x, position.y, scale.x, scale.y);
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
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Show a demo
*/
//This class represents any entity
var Entity = (function () {
    //Constructor uses optional params
    function Entity(position, scale, colour) {
        if (position === void 0) { position = new Vector2(0, 0); }
        if (scale === void 0) { scale = new Vector2(10, 10); }
        if (colour === void 0) { colour = Colour.black; }
        this.position = position;
        this.colour = colour;
        this.scale = scale;
    }
    //Wrapper for DrawRect
    Entity.prototype.Draw = function (r) {
        if (r === void 0) { r = Display; }
        r.DrawRect(this.position, this.scale, this.colour);
    };
    return Entity;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    //Call base constructor
    function Player(position, scale, colour) {
        if (position === void 0) { position = new Vector2(0, 0); }
        if (scale === void 0) { scale = new Vector2(10, 10); }
        if (colour === void 0) { colour = Colour.black; }
        _super.call(this, position, scale, colour);
        //Public properties
        this.velocity = Vector2.zero;
        this.grounded = false;
    }
    return Player;
}(Entity));
//Consts
var Const = {
    GRAVITY: 1.0,
    FRICTION: 0.85,
    JUMP_HEIGHT: 12
};
//Player
var player;
function Awake() {
    //Rendering
    Display.Create(800, 400);
    Display.backgroundColour = Colour.magenta;
    player = new Player(new Vector2(400, 200));
    player.scale = new Vector2(20, 20);
    player.colour = Colour.white;
}
function Update() {
    Display.Clear();
    //Input
    if (Input.GetKey(Input.KeyCode.a)) {
        player.velocity.x -= 1;
    }
    if (Input.GetKey(Input.KeyCode.d)) {
        player.velocity.x += 1;
    }
    player.velocity.x *= Const.FRICTION;
    //Gravity
    player.velocity.y += Const.GRAVITY;
    //Jump check
    if (Input.GetKeyDown(Input.KeyCode.w) && player.grounded) {
        player.velocity.y -= Const.JUMP_HEIGHT;
    }
    //Apply the velocity
    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;
    //Collision detection (kinda)
    if (player.position.y > Display.height - player.scale.y) {
        //Resition of the Collision
        player.position.y -= player.position.y - (Display.height - player.scale.y); //Delta
        player.grounded = true;
        player.velocity.y = 0;
    }
    else {
        player.grounded = false;
    }
    //Debug.Log("Vel x:" + player.velocity.y)
    //Done
    player.Draw();
}
//Event listeners
Time.AddAwakeCallback(Awake);
Time.AddUpdateCallback(Update);
