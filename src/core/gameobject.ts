//A gameobjecty should work via a component system.
class GameObject
{
    //Components will be added and removed from the gameobject dynamically
    //For now they are defined manually
    public transform : Transform;
    public renderer : Rectangle;
    
    //Blank
    constructor(name : string = "GameObject") 
    { 
        this.transform = new Transform(name); 
        this.renderer = new Rectangle(); //Temp
    }
}