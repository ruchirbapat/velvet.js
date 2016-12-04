//For easy random number generation
namespace Rand
{
	export function Range(min : number, max : number) : number { return (Math.random() * (max - min)) + min; };
	export function Value() : number { return Math.random(); };
    export function RandBin() : number { return Rand.RandInt(0, 2); };
    export function RandInt(min : number, max : number) : number { return Mathf.Round(Rand.Range(min, max)); };
}