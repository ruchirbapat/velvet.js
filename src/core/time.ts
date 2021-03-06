//This class handles all of the timing related operations
namespace Time
{
    export let delta : number = 0; //Difference in time between subsequent function calls
    export let time : number = 0; //Counter since game began
    
    //Holds an array of call backs
    let _updateCallbacks : any[] = [];
    let _startCallbacks : any[] = [];
    let _awakeCallbacks : any[] = [];
    let _lateCallbacks : any[] = [];
    let _earlyCallbacks : any[] = [];
    
    //Functions call backs 
    export function AddEarlyUpdateCallback(call : any) : void { _earlyCallbacks.push(call); };
    export function AddLateUpdateCallback(call : any) : void { _lateCallbacks.push(call); };
    export function AddUpdateCallback(call : any) : void { _updateCallbacks.push(call); };
    export function AddAwakeCallback(call : any) : void { _awakeCallbacks.push(call); };
    export function AddStartCallback(call : any) : void { _startCallbacks.push(call); };
    
    //Called when the page loads
    function _Awake() : void
    {
        for(var i = 0; i < _awakeCallbacks.length; i++) { _awakeCallbacks[i](); }
        _Start();
    };
    
    //Called when the page and basic operations have been formed
    function _Start() : void
    {
        for(var i = 0; i < _startCallbacks.length; i++) { _startCallbacks[i](); }
        requestAnimationFrame(_Update);
    };
    
    function _EarlyUpdate() : void  
    { for(var i = 0; i < _earlyCallbacks.length; i++)   { _updateCallbacks[i](); }  _Update(); };

    function _Update() : void
    { for(var i = 0; i < _updateCallbacks.length; i++)  { _updateCallbacks[i](); }  _LateUpdate(); };
    
    function _LateUpdate() : void
    { for(var i = 0; i < _lateCallbacks.length; i++)    { _lateCallbacks[i](); }    requestAnimationFrame(_EarlyUpdate); };

    //Needs to find delta time ect.
    Time.AddLateUpdateCallback(function() { Time.time += 1.0; })
    window.addEventListener("load", _Awake);
}