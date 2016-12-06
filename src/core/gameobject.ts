//A gameobject should work via a component system.
class GameObject // extends SceneNode
{
    //Components will be added and removed from the gameobject dynamically
    //For now they are defined manually
    public transform : Transform = new Transform();
    public renderer : Rectangle = new Rectangle();
    
    public body : Body = new Body();
    
    constructor() {
        this.body.rigidbody = new Rigidbody(5);
    }
    
    //Blank
    //constructor() { } { super(); }
    //Update() : void { super.Update(); Display.AddGameObject(this); }
}