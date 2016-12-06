namespace Physics {
    
}

namespace PhysicsConstants {
    const GRAVITY: Number = -9.8;
}

class PhysicsMaterial {
    friction: Number;
    bounce: Number;

    constructor(f: Number, b:Number) {
        this.friction = f || 0.5;
        this.bounce = b || 0.8;
    }
}