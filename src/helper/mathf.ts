//A math class to make mathematic operations easier and more relivant to game programming
namespace Mathf
{
	//Consts
    export let pi : number = 3.1415926;
    export let tau : number = 6.2831852;
    export let rounding : number = 0.005; //Epsilon
    export let infinite : number = Infinity;
    export let radToDeg : number = 360 / Mathf.tau;
    export let degToRad : number = (Mathf.pi * 2) / 360; 

	//Default javasciprt wrapper functions
    export function Abs(f : number) : number { return Math.abs(f); }; //The absolute value of 'foo' (makes it posative)
    export function Sqrt(f : number) : number { return Math.sqrt(f); }; //Square root of 'f'
	export function Root(f : number, n : number) : number { return Math.pow(f, 1.0 / n); };  //The 'n' root of 'f'
    export function Pow(f : number, pow : number) : number { return Math.pow(f, pow); }; //'f' to the power of 'pow' 
    export function Cos(f : number) : number { return Math.cos(f); };
	export function Sin(f : number) : number { return Math.sin(f); };
    export function Tan(f : number) : number { return Math.tan(f); };
	export function Acos(f : number) : number { return Math.acos(f); };
	export function Asin(f : number) : number { return Math.asin(f); };
	export function Atan(f : number) : number { return Math.atan(f); };
	export function Atan2(f : number, b : number) : number { return Math.atan2(f, b); };
	export function Ceil(f : number) : number { return Math.ceil(f); };
	export function Floor(f : number) : number { return Math.floor(f); };
    export function Round(f : number) : number { return Math.round(f); };
	export function Max(f : number, b : number) : number { return Math.max(f, b); };
	export function Min(f : number, b : number) : number { return Math.min(f, b); };
    export function Log(f : number) : number { return Math.log(f); }; //For the natural log of 'f'
	export function Log2(f : number) : number { return Mathf.Logbase(f, 2); }; //'f' log 2
	export function Log10(f : number) : number { return Mathf.Logbase(f, 10); }; //'f' log 10
    export function Logbase(f : number, base : number) : number { return Math.log(f) / Math.log(base); }; //The 'base' log of 'f'
    
	//Modulus but on floats
	export function Mod(num : number, div : number) : number { return div * ((num / div) - Mathf.Floor(num / div)); };

	//Returns a number that has forced 'value' inbetween 'minimum' and 'maximum'
	export function Clamp(value : number, minimum : number, maximum : number) : number
	{
		return Mathf.Max(minimum, Mathf.Min(value, maximum));
	};
	export function Clamp01(value : number) : number { return Mathf.Clamp(value, 0.0, 1.0); };

    //Linearly interpolate 't' between two floats ('a' and 'b')
    export function LerpUnclamped(a : number, b : number, t : number) : number
	{
		//https://devblogs.nvidia.com/parallelforall/lerp-faster-cuda/
		return (1 - t) * a + t * b;
	};
    export function Lerp(a : number, b : number, t : number) : number { return Mathf.LerpUnclamped(a, b, Mathf.Clamp01(t)); };
    
	//Smoothdamp, much like lerp interpolates between values but with smoothing (much like a broad cubic function)
    export function SmoothStep(left : number, right : number, x : number) : number
	{
		x = Mathf.Clamp01((x - left) / (right - left));

		//Evaluate quadratic
		return x * x * (3.0 - 2.0 * x);
	};
    export function SmoothStep01(x : number) : number { return Mathf.SmoothStep(0.0, 1.0, x); };

	//Similar to SmoothStep but with the equation: 6x^5 - 15x^4 + 10x^3
    export function SmootherStep(left : number, right : number, x : number) : number
	{
		let nx = Mathf.Clamp01((x - left) / (right - left));

		//Evaluate
		return nx * nx * nx * (nx * (nx * 6 - 15) + 10);
	};
	export function SmootherStep01(x : number) : number { return Mathf.SmootherStep(0.0, 1.0, x); };

	//Find the sign (posative of negative) of 'number' and return either 0 or 1 to correspond
	//Note: 0 is considered a posative number
    export function Sign(foo : number) : number { return (foo < 0.0) ? -1.0 : 1.0; };

	//Like lerping but the 'delta' will never exceed a delta, and an addative method is used
    export function MoveTowards(current : number, target : number, delta : number) : number
	{
		if (Mathf.Abs(target - current) <= delta) return target;
		return current + Mathf.Sign(target - current) * delta;
	};
    
    //Corrects for angles around 360 and 0.
    export function MoveTowardsAngle(current : number, target : number, delta : number) : number
    {
        target = current + Mathf.DeltaAngle(current, target);
        return Mathf.MoveTowards(current, target, delta)
    };

	//Will bounce 'value' between 'min' and 'max'. 
    export function Bounce(value : number, min : number, max : number) : number
	{
		let range = max - min;
		let state = Mathf.Mod(value - min, 2 * range);

		if (state > range)
			state = (2 * range) - state;

		return state + min;
	};
    export function Bounce0(value : number, max : number) : number { return Mathf.Bounce(value, 0.0, max); };
    export function Bounce01(value : number) : number		       { return Mathf.Bounce(value, 0.0, 1.0); };

	//Inverse lerp This will find the percentage through a lerp based on paramters - not done

	//Find the the closest difference between two angles so this value may never exceed 180 degrees
    export function DeltaAngle(current : number, target : number) : number
	{
		let diff = target - current;

		while (diff < -180) diff += 360;
		while (diff > 180) diff -= 360;

		return diff;
	};

	export function ClosestBinaryPower(value : number) : number
	{
		return Mathf.Round(Mathf.Pow(Mathf.Round(Mathf.Sqrt(value)), 2));
	};
    export function IsBinaryPower(value : number) : boolean { return Mathf.ClosestBinaryPower(value) == value; };

	//Find the highest value in an unsorted number array named 'arr'
    export function MaxArray(arr : number[]) : number
	{
		let current_highest = 0;

		for (let i = 0; i < arr.length; i++) 
		{
            if (arr[i] > current_highest || i == 0) { current_highest = arr[i]; }
		}

		return current_highest;
	};

	//Find the lowest value in an unsorted number array named 'arr'
    export function MinArray(arr : number[]) : number
	{
		let current_lowest = 0;

		for (let i = 0; i < arr.length; i++) 
            if (arr[i] < current_lowest || i == 0) { current_lowest = arr[i]; }

		return current_lowest;
	};

	//Because of slight round errors in floats, this should be used when comparing two values
    export function Approximatly(a : number, b : number, round : number = Mathf.rounding) : boolean { return Mathf.Abs(a - b) < round; }
}