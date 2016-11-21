/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Show a demo
*/

//This class represents any entity
class Entity
{
    //Public properties
    position : Vector2;
    colour : Colour;
    scale : Vector2;

    //Constructor uses optional params
    constructor(position : Vector2 = new Vector2(0, 0), 
                scale : Vector2 = new Vector2(10, 10), 
                colour : Colour = Colour.black)
    {
        this.position = position;
        this.colour = colour;
        this.scale = scale;
    }

    //Wrapper for DrawRect
    public Draw(r : Renderer = Display) : void { r.DrawRect(this.position, this.scale, this.colour); }
}

class Player extends Entity
{
    //Call base constructor
    constructor(position : Vector2 = new Vector2(0, 0), 
                scale : Vector2 = new Vector2(10, 10), 
                colour : Colour = Colour.black) 
    { super(position, scale, colour); }

    //Public properties
    public velocity : Vector2 = Vector2.zero;
    public grounded : boolean = false;
}

//Consts
var Const = 
{
    GRAVITY : 1.0,
    FRICTION : 0.85,
    JUMP_HEIGHT : 12
}

//Player
let player : Player;

function Awake() 
{ 
    //Rendering
    Display.Create(800, 400); 
    Display.backgroundColour = Colour.magenta;

    player = new Player(new Vector2(400, 200));
    player.scale = new Vector2(20, 20);
    player.colour = Colour.white;
}

function Update() 
{
    Display.Clear();

    //Input
    if(Input.GetKey(Input.KeyCode.a)) { player.velocity.x -= 1; }
    if(Input.GetKey(Input.KeyCode.d)) { player.velocity.x += 1; }
    player.velocity.x *= Const.FRICTION;

    //Gravity
    player.velocity.y += Const.GRAVITY;

    //Jump check
    if(Input.GetKeyDown(Input.KeyCode.w) && player.grounded) { player.velocity.y -= Const.JUMP_HEIGHT; }

    //Apply the velocity
    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;

    //Collision detection (kinda)
    if(player.position.y > Display.height - player.scale.y) 
    {
        //Resition of the Collision
        player.position.y -= player.position.y - (Display.height - player.scale.y); //Delta
        player.grounded = true;
        player.velocity.y = 0;
    }
    else { player.grounded = false; }

    //Debug.Log("Vel x:" + player.velocity.y)

    //Done
    player.Draw();
}

//Event listeners
Time.AddAwakeCallback(Awake); Time.AddUpdateCallback(Update);