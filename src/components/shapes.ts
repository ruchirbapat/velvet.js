//A rederable shape
class Rectangle extends Component
{
    public strokeColour : Colour;
    public fillColour: Colour;
    public stroke: boolean;
    public size: Vector2;
    
    //Construct by default
    constructor() 
    {
        super();

        this.strokeColour = new Colour(255, 255, 255);
        this.fillColour = new Colour(0, 0, 0);
        this.size = new Vector2(10, 10);
        this.stroke = false;
    }
}