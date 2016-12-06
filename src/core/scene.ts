//This is the base class for any possible node in the scene graph
//The scene graph organises all bodys into a heirachy structure
class SceneNode extends Base
{
    //By default anything is a child of root
    public static readonly root = new SceneNode("root");

    //Store information about children
    private _children : { [ key : number] : SceneNode };  //Holds an array of SceneNodes - all the children
    private _parent : SceneNode = SceneNode.root;         //Holds the current parent that is storing this

    //Getters and setters
    public get parent() : SceneNode { return this._parent;  }
    public set parent(n : SceneNode) { this.SetParent(n); }

    //Getters
    public get childCount() : number { return Object.keys(this._children).length; } //May not work on older browsers
    public get recursiveChildCount() : number 
    { 
        //Counts up by recusivly totaling the childCount
        function CountChildren(obj : SceneNode) : number 
        { 
            let total : number = obj.childCount;
            for(let childID in obj._children) { total += CountChildren(obj._children[childID]); }
            return total;
        }

        return CountChildren(this);
    }

    //Will setup this as a child of root
    constructor(name : string = "SceneNode") 
    {
        super(name);

        this._children = { };

        //Make sure this object isnt actually root
        if(SceneNode.root != null)
        {
            SceneNode.root.AddChild(this);
        }
        else { this._parent = null; }
    }

    //Needs to update all children - this causes a flow on effect
    public Update() : void
    {
        for(let key in this._children) { this._children[key].Update(); }
    }

    //Will remove the object and account for all scene graph refernces
    public Destroy() : void
    {
        //First all children of this need to be deleted
        for(let key in this._children)
        {
            this._children[key].Destroy();  //Recursivly remove
            delete this._children[key];     //Remove ref from child array
        }

        //Remove from parents child list
        if(this._parent != null) { delete this._parent._children[this.instanceID]; }

        //Manually remove all properties
        this._children = { };
        this._parent = null;

        delete this._children;
        delete this._parent;
        
        super.Destroy();
    }
    public DeleteChild(child : SceneNode) : void { if(child.instanceID in this._children) { child.Destroy(); } }

    //Allows a child to be added to the object - returns the new child
    public AddChild(child : SceneNode) : SceneNode 
    {
        //If the child has a parent, remove the refernce in that array
        if(child._parent != null) { delete child._parent._children[child._instanceID]; child._parent = null; }

        //Add to this child array and set the parent of the child
        this._children[child.instanceID] = child; 
        child._parent = this;

        return child;
    }
    public SetParent(parent : SceneNode) : void { parent.AddChild(this); }
    public AddChildren(children : SceneNode[]) : void { for(let child of children) { this.AddChild(child); } }

    //Returns the children as an array instead of a dictionary
    //This is very dodgy as it assumes the dictionary is sorted based on the order elemnts are added - fix this
    public GetAllChildren() : SceneNode[]
    {
        let resultingArray : SceneNode[] = [ ];
        for(let childID in this._children) { resultingArray.push(this._children[childID]); }
        return resultingArray;
    }

    //Functions for getting children
    public GetChildByID(ID : number) : SceneNode { return this._children[ID]; }                  // O(1)
    public GetChild(index : number) : SceneNode { return this.GetAllChildren()[index]; }         // O(n)
    public FindChild(child : SceneNode) : SceneNode { return this._children[child.instanceID]; } // O(1)
    public FindChildByName(name : string) : SceneNode
    {
        for(let child in this._children) { if(this._children[child].name == name) { return this._children[child]; } }
        return null;
    } // worst case O(this.childCount)

    //Static scene functions
    
    //Optional function that gives some inforation from inherited classes
    protected GetExtraInformation() : string { return ` `; }

    //Static methods for visually displaying the current hierarchy
    public static Print() : void
    {
        function printChildren(parent : SceneNode) : void
        {
            //Holds a nice debug message
            let formattedInfo : string = `[ID: ${parent.instanceID}] ${parent.name} (${parent.GetExtraInformation()}) => ${(<any>parent).constructor.name}`;

            if(parent.childCount > 0)
            {
                //Recursivly print the children of the children
                Debug.CreateGroup(formattedInfo);
                for(let child in parent._children) { printChildren(parent._children[child]); }
                Debug.EndGroup();
            }
            else { Debug.Log(formattedInfo);}
        };

        printChildren(SceneNode.root);
    }

/*
    //Will override the existing 'base' clone
    public Clone<T extends SceneNode>(): T
    {
        let result : T = <T>(super.Clone());
        let childrenCopy : { [ key : number ] : SceneNode } = { };

        //Children must have a unique instance ID and thus they are cloned once again, this will be recursive
        for(let childID in result._children) 
        { 
            if (result._children.hasOwnProperty(childID)) 
            {                 
                let child = result._children[childID].Clone();
                                
                //Remove all other instances of the children
                childrenCopy[child.instanceID] = child; 
                child._parent.DeleteChild(child);
                child._parent = result;

                if(SceneNode._root.GetChildByID(child.instanceID) != null) { SceneNode._root.DeleteChild(child); }
            }
        }

        result._children = { };
        result._children = childrenCopy;

        return result;
    }
*/
}

//Needs to update the root node
//Removed as updates will be handled on set
//Time.AddEarlyUpdateCallback(SceneNode._root.Update);