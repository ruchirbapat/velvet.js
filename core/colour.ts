/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Hold RGBA colours in one structure
        - Convert colours into CSS for use of the canvas
*/

//Converts RGBA color into css colour
class Colour
{
    //Public have custom getters and setters and so they are treated as private
    private _red : number //Red channel;
    private _green : number; //Green channel
    private _blue : number; //Blue channel
    private _alpha : number; //Transparency
    
    //This will store the current css string, this will be usde by the canvas style
    //Holds the formatted CSS rgba string
    private _CssString : string = 'rgba()';
    
    //This will create a css string
    private _CalculateLetters() : void 
    { 
        this._CssString = 'rgba(' + 
            Mathf.Bounce(this._red, 0, 256) +    ',' + 
            Mathf.Bounce(this._green, 0, 256) +  ',' + 
            Mathf.Bounce(this._blue, 0, 256) +   ',' + 
            Mathf.Bounce01(this._alpha / 255) +  ')'; 
    }
    
    //The properties need a getter and setter, since the CSS strings will need to recalculate
    public GetStyle() : string { return this._CssString; }
    
    //Setters and getters need custom recalculation behaviour
    public set red(r : number)   { this._red = Mathf.Floor(r);   this._CalculateLetters(); }
    public set green(g : number) { this._green = Mathf.Floor(g); this._CalculateLetters(); }
    public set blue(b : number)  { this._blue = Mathf.Floor(b);  this._CalculateLetters(); }
    public set alpha(a : number) { this._alpha = Mathf.Floor(a); this._CalculateLetters(); }
    
    public get red()   : number { return this._red; }
    public get green() : number { return this._green; }
    public get blue()  : number { return this._blue; }
    public get alpha() : number { return this._alpha; }
    
    //Public function to set the colour in one go
    public Set(r : number, g : number, b : number, a : number = null) : void
    { 
        this.red = r;
        this.green = g;
        this.blue = b;
        
        if (a != null) { this.alpha = a; }
    }

    //Will get a colour value via an integer array ref
    public Index(ind : number) : number
    { 
        var clamped = Mathf.Round(Mathf.Mod(ind, 4));
        
        switch(clamped)
        {
            case 0: return this.red;
            case 1: return this.green;
            case 2: return this.blue;
            case 3: return this.alpha;
            default: return null;
        }
    }
    
    //Constructor will set the value based on params
    constructor(r : number, g : number, b : number, a : number = 255) { this.Set(r, g, b, a); }

    //Default constant colour values
    public static black : Colour = new Colour(  0,   0,   0);
    public static white : Colour = new Colour(255, 255, 255);
    public static clear : Colour = new Colour(  0,   0,   0, 0);
    
    public static green : Colour = new Colour(  0, 255,   0);
    public static blue : Colour =  new Colour(  0,   0, 255);
    public static red : Colour =   new Colour( 255,  0,   0);

    public static magenta : Colour = new Colour(255,   0, 255);
    public static yellow : Colour =  new Colour(255, 255,   0);
    public static cyan : Colour =    new Colour(  0, 255, 255);
    public static grey : Colour =    new Colour(128, 128, 128);
}