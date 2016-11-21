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
class Renderer
{    
    //Privates

    //Size of canvas
    private _width : number  = 100;
    private _height : number = 100;
    
    //Actual low level canvas
    private _canvas : HTMLCanvasElement = null; //The canvas elemnt
    private _context : any = null; //The canvas 2D context
    
    //Drawing properties
    private _backgroundColour : Colour = new Colour(255, 255, 255);

    //Setup everything
    public Create(w : number = 100, h : number = 100) : void
    {
        //If there is already a canvas, delete it
        if(this._canvas != null) { this._canvas.remove(); }

        //Create canvas
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        
        this.width = w;
        this.height = h;
        
        //Add to the page
        document.body.appendChild(this._canvas);
    }
    
    
    //Drawing wrapper functions
    public SetColour(colour : Colour) : void { this._context.fillStyle = colour.GetStyle(); }
    
    public Clear() : void { this._context.clearRect(0, 0, this.width, this.height); }

    //Shape drawing functions
    public DrawRect(position : Vector2, scale : Vector2, col : Colour = Colour.black) 
    { 
        this.SetColour(col); 
        this._context.fillRect(position.x, position.y, scale.x, scale.y); 
    }
    
    //Getters and setters
    public get width()  : number { return this._width; }
    public get height() : number { return this._height;}
    public get backgroundColour() : Colour { return this._backgroundColour;}
    
    public set width(w : number) { this._width = w; this._canvas.width = this._width; }
    public set height(h : number) { this._height = h; this._canvas.height = this._height; }
    public set backgroundColour(col : Colour) { this._backgroundColour = col; this._canvas.style.background = this._backgroundColour.GetStyle(); }
     
    //Public func.
    public SetSize(w : number, h : number) { this.width = w; this.height = h; }
}

//Create a default one for static use, this allows for multiple renderers
let Display : Renderer = new Renderer();