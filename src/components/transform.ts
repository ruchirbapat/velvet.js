//A transform reprents to positioning of a gameobject
class Transform extends SceneNode
{
    //Currently all properties are public
    private _position : Vector2 = new Vector2(0, 0);
    private _scale : Vector2 = new Vector2(1, 1);
    private _rotation : number = 0.0;

    //private _localPositon : Vector2 = new Vector2(0, 0);
    //private _localScale : Vector2 = new Vector2(0, 0);
    //private _localRotation : number = 0.0;

    //Setters are where the magic happens
    public get position() : Vector2 { return this._position; }
    public get rotation() : number { return this._rotation; }
    public get scale() : Vector2 { return this._scale; }

    //public get localPosition() : Vector2 { return this._localPositon; }
    //public get localRotation() : number { return this._localRotation; }
    //public get localScale() : Vector2 { return this._localScale; }

    public set position(p : Vector2) { this._position = p;  super.Update(); }
    public set rotation(r : number) { this._rotation = r;   super.Update(); }
    public set scale(s : Vector2) { this._scale = s;        super.Update(); }

    //Will find the closes transform parent
    public GetClosestTransformParent() : Transform
    {
        //Keep looping up one parent until root is reached
        function CheckParent(currentLayer : SceneNode) : Transform
        {
            if(currentLayer.parent.instanceID == SceneNode.root.instanceID) { return null; }

            //Is another iteration needed?
            return (currentLayer.parent instanceof Transform) ? currentLayer.parent : CheckParent(currentLayer.parent);
        } return CheckParent(this);
    }

    //This will move the position of all children based on any transformations made to this
    public Update() : void
    {
        //We can assume if this part of the code has been reached then a transformation has been made to the parent
        let parentTransform = this.GetClosestTransformParent();
        
        Debug.Log(`Update called on: ${this.name}`);

        //This will call update on all children
        super.Update();

        /*
        function MoveChildren(node : Transform)
        {
            for(let childID in node._children)
            {
                //Type must be transform for it to be affected
                if(!(node._children[childID] instanceof Transform)) { continue; }

                //Move by position (later local)
                let child = <Transform>node._children[childID]

                child.position = Vector2.Add(child.position, node.position);
                child.scale = Vector2.Mul(child.scale, node.scale);
                child.rotation = child.rotation + node.rotation;
            }
        } MoveChildren(this);
        */
    }

/*
    public set position(a : Vector2) 
    { 
        this._position = a;

        //Bad, this method assumes the parent one layer above is a transform
        if(this.parent instanceof Transform) { this._localPositon = Vector2.Sub(this.position, this.parent.position); }

        this.Update(); 
    }

    public set rotation(a : number) { this._rotation = a; this.Update(); }
    public set scale(a : Vector2) { this._scale = a; this.Update(); }

    constructor(name:string="Transform") 
    {
        super(name);

        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
        this.rotation = 0.0;
    }
*/

    //For debugging
    protected GetExtraInformation() : string { return `${this.position.ToString()}, ${this.rotation}, ${this.scale.ToString()}`; }

};