#pragma strict


var puerta1 : Transform;
var puerta2 : Transform;

function OnTriggerEnter( other : Collider)
{
if (other.tag == "alice")
{
puerta1.animation.Play("OPEN_DOOR_1");
puerta2.animation.Play("OPEN_DOOR_2");
}




}
