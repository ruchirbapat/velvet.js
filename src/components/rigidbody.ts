class Rigidbody extends Component {
    mass:number;
    inverseMass:number;
    velocity: Vector2 = Vector2.zero;
    restitution: number;
    
    constructor(m: number) {
        super();
        this.mass = m;
        this.inverseMass = 1 / this.mass;
        this.restitution = this.inverseMass * 4;
        console.log("Generated restitution = " + this.restitution);
    }
}