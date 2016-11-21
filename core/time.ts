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
namespace Time
{
    //Properties of a time
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
        //Call all callbacks
        for(var i = 0; i < _awakeCallbacks.length; i++) { _awakeCallbacks[i](); }
        
        //Call the next subsequent function
        _Start();
    };
    
    //Called when the page and basic operations have been formed
    function _Start() : void
    {
        //Call all callbacks
        for(var i = 0; i < _startCallbacks.length; i++) { _startCallbacks[i](); }
        
        //Call the next subsequent function
        requestAnimationFrame(_Update);
    };
    
    function _EarlyUpdate() : void  { for(var i = 0; i < _earlyCallbacks.length; i++)   { _updateCallbacks[i](); }  _Update(); }; //The actual update function calls
    function _Update() : void       { for(var i = 0; i < _updateCallbacks.length; i++)  { _updateCallbacks[i](); }  _LateUpdate(); }; //The actual update function calls
    function _LateUpdate() : void   { for(var i = 0; i < _lateCallbacks.length; i++)    { _lateCallbacks[i](); }    requestAnimationFrame(_EarlyUpdate); }; //Called at the very end of an update cycle

    //Needs to find delta time ect.
    Time.AddLateUpdateCallback(function() { Time.time += 1.0; })

    //Event listeners
    window.addEventListener("load", _Awake);
}