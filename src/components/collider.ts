interface Collidable {
    
}

class AABB {
    min: Vector2 = Vector2.zero;
    max: Vector2 = Vector2.zero;
}

abstract class Collider {
    physicsMaterial: PhysicsMaterial = new PhysicsMaterial(0.5, 0.8);
    transform:Transform = new Transform();
    axisAlignedBoundingBox: AABB = new AABB();
    name: string = "Collider";
}

class BoxCollider extends Collider {
    
    name: string = "Box";
    constructor(t: Transform) {
        super();
        this.transform = t;
        this.axisAlignedBoundingBox.min = this.transform.position.Clone();
        this.axisAlignedBoundingBox.max = Vector2.Add(this.transform.position, this.transform.scale);
    }

    public GetX() : number {
        return this.transform.position.x;
    }

    public GetY() : number {
        return this.transform.position.y;
    }
    public GetWidth() : number {
        return this.transform.scale.x;
    }
    public GetHeight() : number {
        return this.transform.scale.y;
    }
}

class CircleCollider extends Collider {
    private _radius: number = 1.0;
    private _sqrRadius: number;

    public set radius(r: number) {
        this._radius = r;
    }

    public diameter: number = this.radius * 2;
    public area: number = Mathf.PI * this.radius * this.radius;
    public name: string = "Circle";
    constructor(t: Transform, r: number) {
        super();
        this.transform = t;
        this.transform.scale = new Vector2(r, r);
        this.radius = r;
        this.area = Mathf.PI * this.radius * this.radius;
        this.diameter = this.radius * 2;
    }
}

class PolygonCollider extends Collider {
    vertexCount:number;
    constructor() {
        super();
    }
}