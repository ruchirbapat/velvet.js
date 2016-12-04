//Wrapper class for the built in javasciprt console
namespace Debug
{
    //Change visual attributes
    export let backgroundColour = 'white';
    export let textColour : 'black';
    export let fontSize : 'normal';

    //Create CSS Style info for the text
    export function GenerateDebugFormatting() : string
    {
        return 'color: ' + Debug.textColour + ';' +
               'font-size: ' + Debug.fontSize + ';' +
               'background: ' + Debug.backgroundColour + ';';
    };

    export function ResetFormatting() : void
    {
        //Revert back to defualt values
        Debug.backgroundColour = 'white';
        Debug.textColour = 'black';
        Debug.fontSize = 'normal';
    };

    export function RawLog(data : any) : void       { console.log(data); };
    export function Log(text : string) : void       { console.log('%c' + text, Debug.GenerateDebugFormatting()); };
    export function Warning(text : string) : void   { console.warn('%c' + text, Debug.GenerateDebugFormatting()); };
    export function Error(text : string) : void     { console.error('%c' + text, Debug.GenerateDebugFormatting()); };
    export function Info(text : string) : void      { console.info('%c' + text, Debug.GenerateDebugFormatting()); };
    export function Clear() : void                  { console.clear(); };
    export function Spacer() : void                 { Debug.Log("\n") };
    export function EndGroup() : void               { console.groupEnd(); };
    export function CreateGroup(name : string) : void { console.group(name); };
}