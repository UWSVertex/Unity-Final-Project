#pragma strict
import UnityEngine.UI;

var levelpermission : boolean;
var mensaje : Text;



function Start () {
levelpermission = false;
}

function Update () {

}

function OnTriggerEnter(other: Collider)
{
if (other.tag == "alice" && levelpermission)
{
Application.LoadLevel("LEVEL2");
}
else
{
	mensaje.text = "Missing coins to next level";
}
}

function OnTriggerExit(other:Collider)
{
if (other.tag == "alice" && levelpermission==false)
{
	mensaje.text = " ";
}
}






function permission()
{
	levelpermission = true;
}
