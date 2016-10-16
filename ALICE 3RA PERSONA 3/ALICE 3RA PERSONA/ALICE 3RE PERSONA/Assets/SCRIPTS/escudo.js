#pragma strict

public var escudosound: GameObject;


function Start () {

}




function OnTriggerEnter(other : Collider)
{
if (other.tag == "bala")
{
	other.gameObject.SendMessage("Destroyme");

}
}