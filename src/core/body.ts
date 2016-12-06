class Body {
    collider : Collider;
    rigidbody : Rigidbody;
    constructor() {
        this.collider = new BoxCollider(new Transform());
        this.rigidbody = new Rigidbody(1);
    }
}