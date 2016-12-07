class Vertex {
    x: number;
    y: number;
    index: number;
    rigidbody: Rigidbody;
    internal: boolean;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.index = 0;
        this.rigidbody = new Rigidbody();
        this.internal = false;
    }
}

class Vertices {

    vertices: Vertex[] = [];

    constructor(points: Vector2[], rb: Rigidbody) {
        this.vertices.length = points.length;

        for(var i = 0; i < points.length; i++) {
            let vertex: Vertex = new Vertex();
            vertex.x = points[i].x;
            vertex.y = points[i].y;
            vertex.index = i;
            vertex.rigidbody = rb;
            vertex.internal = false;

            this.vertices.push(vertex);
        }
    }

    public static Area(verts: Vertex[], signed: boolean) : number {
        let area: number = 0;
        let j: number = verts.length - 1;

        for(var i = 0; i < verts.length; i++) {
            area += (verts[j].x - verts[i].x) * (verts[j].y + verts[i].y);
            j = i;
        }

        if(signed)
            return area / 2;
        else
            return Mathf.Abs(area) / 2;
    }

    public static Centre(verts: Vertex[]) : Vector2 {
        let area: number = Vertices.Area(verts, true);
        let centre: Vector2 = Vector2.zero;
        var crossProduct;
        var temp;
        var j;

        for(var i = 0; j < verts.length; i++) {
            j = (i + 1) % verts.length;
            var vertI = new Vector2(verts[i].x, verts[i].y);
            var vertJ = new Vector2(verts[j].x, verts[j].y);
            crossProduct = Vector2.Cross(vertI, vertJ);
            temp = Vector2.Mul(Vector2.Add(vertI, vertJ), crossProduct);
            centre = Vector2.Add(centre, temp);
        }

        return Vector2.Div(centre, 6 * area);
    }

    public static Mean(verts: Vertex[]) : Vector2 {
        let average: Vector2 = Vector2.zero;
        
        for(var i = 0; i < verts.length; i++) {
            average.x += verts[i].x;
            average.y += verts[i].y;
        }

        return Vector2.Div(average, verts.length);
    }

    public static Inertia(verts: Vertex[], mass: number) {
        let numerator: number = 0;
        let denominator: number = 0;

        for (var n = 0; n < verts.length; n++) {
            var j = (n + 1) % verts.length;
            var vertJ = new Vector2(verts[j].x, verts[j].y);
            var vertN = new Vector2(verts[n].x, verts[n].y);
            var cross = Mathf.Abs(Vector2.Cross(vertJ, vertN));
            numerator += cross * (Vector2.Dot(vertJ, vertJ) + Vector2.Dot(vertJ, vertN) + Vector2.Dot(vertN, vertN));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    }

}