//Contact point
class Contact {
    //Where the collison occured
    position: Vector2;
    
    //Normal vector of the collision
    normal: Vector2;
    
    //Amount of penetration
    penetration: number;

    constructor() {
        this.position = Vector2.zero;
        this.normal = Vector2.zero;
        this.penetration = 0;
    }
}

//Generic manifold, holding collision data
class Manifold {
    //All points of contact
    contacts : Contact[] = new Array(2);
    
    //Holds number of contacts
    contactCount: number;
    
    //Hold the first collision object
    colliderA: Collider;
    
    //Hold the second collision object
    colliderB: Collider;

    constructor() {
        this.contacts.length = 2;
        for(var i = 0; i < this.contacts.length; i++)
            this.contacts[i] = new Contact();
        this.contactCount = 0; 
    }
}

/*
* The following functions have one purpose: to generate a manifold, given two objects 
*/

function BoxToBox(boxA: BoxCollider, boxB: BoxCollider) : Manifold {
    Debug.Log("BoxToBox function being called.");
    /*if(boxA.GetX() < boxB.GetX() + boxB.GetWidth() && boxA.GetX() + boxA.GetWidth() > boxB.GetX() && boxA.GetY() < boxB.GetY() + boxB.GetHeight() && boxA.GetHeight() + boxA.GetY() > boxB.GetY()) {
         return true;
    } else {
        return false;
    }*/

    let manifold: Manifold = new Manifold();

    //From A to B
    let translation: Vector2 = new Vector2((boxB.transform.position.x - boxA.transform.position.x), (boxB.transform.position.y - boxA.transform.position.y));
    
    let a_extent: number = (boxA.axisAlignedBoundingBox.max.x - boxA.axisAlignedBoundingBox.min.x) / 2;
    let b_extent: number = (boxB.axisAlignedBoundingBox.max.x - boxB.axisAlignedBoundingBox.min.x) / 2;

    let overlap: Vector2 = new Vector2((a_extent + b_extent - Mathf.Abs(translation.x)), (a_extent + b_extent - Mathf.Abs(translation.y)));

    manifold.contacts[0].position = new Vector2(Mathf.Max(boxA.axisAlignedBoundingBox.min.x, boxB.axisAlignedBoundingBox.min.x), Mathf.Max(boxA.axisAlignedBoundingBox.min.y, boxB.axisAlignedBoundingBox.min.y));
    manifold.contacts[1].position = new Vector2(Mathf.Max(boxA.axisAlignedBoundingBox.max.x, boxB.axisAlignedBoundingBox.max.x), Mathf.Max(boxA.axisAlignedBoundingBox.max.y, boxB.axisAlignedBoundingBox.max.y));

    if(overlap.x > overlap.y) {
        manifold.contacts[0].normal = (translation.x < 0) ? Vector2.right : Vector2.left;
        manifold.contacts[0].penetration = overlap.x;
    } else {
        manifold.contacts[1].normal = (translation.y < 0) ? Vector2.up : Vector2.down;
        manifold.contacts[1].penetration = overlap.y;
    }

/*
    if(x_overlap > y_overlap)
{
  // Point towards B knowing that t points from A to B
  c->normal = t.x < 0 ? Vec( 1, 0 ) : Vec( -1, 0 )
  c->penetration = x_overlap;
}
else
{
  // Point toward B knowing that t points from A to B
  c->normal = t.y < 0 ? Vec( 0, 1 ) : Vec( 0, -1 );
  c->penetration = y_overlap;
}
*/
    return manifold;
}

//Perfect
function CircleToCircle(c1: CircleCollider, c2: CircleCollider) : Manifold {
    Debug.Log("CircleToCircle function being called.");
    /*if(Mathf.Sqrt(((Mathf.Pow((c1.transform.position.x - c2.transform.position.x) , 2)) + (Mathf.Pow((c1.transform.position.y - c2.transform.position.y) , 2)))) <= c1.radius + c2.radius) { 
        return true;
    } else { 
        return false;
    }*/
    var manifold = new Manifold();
    var translationVector = new Vector2((c2.transform.position.x - c1.transform.position.x), (c2.transform.position.y - c1.transform.position.y));
    var radii = c1.radius + c2.radius;
    if(translationVector.SqrMagnitude() > radii * radii)
        return null;

    var distance = translationVector.Magnitude();
    var contact1 = new Contact();
    manifold.contacts[0] = contact1;
    
    if(distance == 0) {
        manifold.contacts[0].penetration = c1.radius;
        manifold.contacts[0].normal = Vector2.up;
        manifold.contacts[0].position = c1.transform.position;
        manifold.contactCount++;
    } else {
        manifold.contacts[0].penetration = radii - distance;
        manifold.contacts[0].normal = new Vector2((translationVector.x / distance), (translationVector.y / distance));
        manifold.contacts[0].position.x = manifold.contacts[0].normal.x * c1.radius + c1.transform.position.x;
        manifold.contacts[0].position.y = manifold.contacts[0].normal.y * c1.radius + c1.transform.position.y;
        manifold.contactCount++;
    }

    manifold.colliderA = c1;
    manifold.colliderB = c2;
    
    return manifold;
}

function CircleToBox(c: CircleCollider, b: BoxCollider) : Manifold {
    var manifold = new Manifold();

    manifold.colliderA = c;
    manifold.colliderB = b;
    
    //From A to B
    let translationVector: Vector2 = new Vector2((b.transform.position.x - c.transform.position.x), (b.transform.position.y - c.transform.position.y));
    let closest: Vector2 = translationVector;

    var x_extent = (c.axisAlignedBoundingBox.max.x - b.axisAlignedBoundingBox.min.x) / 2;
    var y_extent = (c.axisAlignedBoundingBox.max.y - b.axisAlignedBoundingBox.min.y) / 2;

    closest.x = Mathf.Clamp(closest.x, -x_extent, x_extent);
    closest.y = Mathf.Clamp(closest.y, -y_extent, y_extent);
    
    let inside: boolean = false;

    if(Vector2.Equal(translationVector, closest)) {
        inside = true;

        if(Mathf.Abs(translationVector.x) > Mathf.Abs(translationVector.y)) {
            if(closest.x > 0) {
                closest.x = x_extent;
            } else {
                closest.x = -x_extent;
            }
        } else {
            if(closest.y > 0) {
                closest.y = y_extent;
            } else {
                closest.y = -y_extent;
            }
        }
    }

    let normal: Vector2 = new Vector2(translationVector.x - closest.x, translationVector.y - closest.y);
    let distance: number = normal.SqrMagnitude();
    let radius: number = c.radius;

    if(distance > radius * radius && !inside) {
        return null;
    }

    distance = Mathf.Sqrt(distance);

    if(inside) {
        manifold.contacts[0].normal = new Vector2(-translationVector.x, -translationVector.y);
        manifold.contacts[0].penetration = radius - distance;
    } else {
        manifold.contacts[0].normal = translationVector.Clone();
        manifold.contacts[0].penetration = radius - distance;
    }

    return manifold;
}

function BoxToCircle(b: BoxCollider, c: CircleCollider) : Manifold {
    Debug.Log("BoxToCircle function being called.");
    return CircleToBox(c, b);
}

//Add CircleToLine (done, but need to import code from MikeJS)

function CircleToPoint(c: CircleCollider, p: Vector2) : boolean {
    if(Vector2.Distance(c.transform.position, p) <= c.radius) {
        return true;
    } else {
        return false;
    }
}

function PointToCircle(p: Vector2, c: CircleCollider) : boolean {
    return CircleToPoint(c, p);
}

function PointToBox(p: Vector2, b: BoxCollider) : boolean {
    if(p.x >= b.transform.position.x && p.x <= b.transform.position.x + b.transform.scale.y && p.y >= b.transform.position.y && p.y <= b.transform.position.y + b.transform.scale.y) {
        return true;
    } else {
        return false;
    }
}

function BoxToPoint(b: BoxCollider, p: Vector2) : boolean {
    return PointToBox(p, b);
}

function PointToPoint(p1: Vector2, p2: Vector2) : boolean {
    if(Vector2.Distance(p1, p2) <= Mathf.Rounding) {
        return true;
    } else {
        return false;
    }
}

namespace CollisionSolver {

    /**
     * End goal:
     * There should be a function that takes in two Bodies and solves the collision
     * Firstly, it will check each Body's Child Collider's names (e.g. BoxCollider or CircleCollider) and concatenate a string to pass to eval()
     * eval() will take the string, run the code and return the Manifold which contains collision data on how to solve the collision
     * Then, it will solve the collision and return a bool perhaps?
     */


    //This function is to die
    export function CheckCollision(objectA: Collider, objectB: Collider) : boolean {
        var aName = objectA.name;
        var bName = objectB.name;
        var funcName = aName + "To" + bName;
        console.log("Calling CollisionSolver.CheckCollision(): " + funcName);
        //var funcToCall = new Function(funcName);
        return eval(funcName + "(" + "objectA" + ", objectB)");
    }

    
    //Import useful code from 'CheckCollision' into this such as the string contcat and eval() to find Manifold
    export function ResolveCollision(objectA: Body, objectB: Body) : boolean {
        
        //This needs to have a GetComponent<>()
        //Generic code
        let collisionData: Manifold = eval((objectA.collider.name + "To" + objectB.collider.name) + "(objectA.collider, objectB.collider)");

        console.log(collisionData);

        //Relative velocity
        let relativeVelocity: Vector2 = new Vector2(objectB.rigidbody.velocity.x - objectA.rigidbody.velocity.x, objectB.rigidbody.velocity.y - objectA.rigidbody.velocity.y);
        
        //Velocity along the Normal
        let velocityAlongNormal: number = Vector2.Dot(relativeVelocity, collisionData.contacts[0].normal);
        
        if(velocityAlongNormal >= 0) {
            return false;
        }
        
        let restitution: number = Mathf.Min(objectA.rigidbody.restitution, objectB.rigidbody.restitution);
        
        //Temp
        restitution = 0.2;
        
        let impulseScalar: number = -(1 + restitution) * velocityAlongNormal;
        
        impulseScalar /= objectA.rigidbody.inverseMass + objectB.rigidbody.inverseMass;
        
        let impulse: Vector2 = new Vector2((collisionData.contacts[0].normal.x * impulseScalar), (collisionData.contacts[0].normal.y * impulseScalar));
        
        /*objectA.rigidbody.velocity.x -= objectA.rigidbody.inverseMass * impulse.x;
        objectA.rigidbody.velocity.y -= objectA.rigidbody.inverseMass * impulse.y;
        
        objectB.rigidbody.velocity.x += objectB.rigidbody.inverseMass * impulse.x;
        objectB.rigidbody.velocity.y += objectB.rigidbody.inverseMass * impulse.y;*/

        let massSum: number = objectA.rigidbody.mass + objectB.rigidbody.mass;
        let ratio : number = objectA.rigidbody.mass / massSum;

        objectA.rigidbody.velocity.x -= ratio * impulse.x;
        objectA.rigidbody.velocity.y -= ratio * impulse.y;
        
        ratio = objectB.rigidbody.mass / massSum;
        objectB.rigidbody.velocity.x += ratio * impulse.x;
        objectB.rigidbody.velocity.y += ratio * impulse.y;

        return true;
    }
}

namespace Broadphase {
    export function GeneratePairs(bodies: Body[]) {
        let pairs: Body[] = [];
        
        for(var i = 0; i < bodies.length; i++) {
            for(var j = 0; j < bodies.length; j++) {
                var bodyA = bodies[i];
                var bodyB = bodies[j];
                
                if(bodyA === bodyB)
                    continue;
                
                if(bodyA.collider.transform.position.x < bodyB.collider.transform.position.x + bodyB.collider.transform.scale.x && bodyA.collider.transform.position.x + bodyA.collider.transform.scale.x > bodyB.collider.transform.position.x && bodyA.collider.transform.position.y < bodyB.collider.transform.position.y + bodyB.collider.transform.scale.y && bodyA.collider.transform.scale.y + bodyA.collider.transform.position.y > bodyB.collider.transform.position.y) {
                    pairs.push(bodyA);
                    pairs.push(bodyB);
                } 

            }
        }
    }
}