//A transform reprents to positioning of a gameobject
class Transform extends Component
{
    //Currently all properties are public
    public position : Vector2 = new Vector2(0, 0);
    public scale : Vector2 = new Vector2(1, 1);
    public rotation : number = 0.0;
    
    constructor() 
    {
        super();

        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
        this.rotation = 0.0;
    }
};