/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'license.txt', which is part of this source code package.

    The specific goal of this file is to:
        - Create a scene graph style heirachy for all transforms
*/


//A transform reprents to positioning of a game object
class Transform extends Component
{
    //Currently all properties are public
    public position : Vector2 = new Vector2(0, 0);
    public scale : Vector2 = new Vector2(1, 1);
    
    public rotation : number = 0.0;
}