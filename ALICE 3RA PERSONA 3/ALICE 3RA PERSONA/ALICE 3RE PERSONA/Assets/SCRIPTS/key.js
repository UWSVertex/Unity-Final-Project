#pragma strict
import UnityEngine.UI;

var alicemsg : Text;
var alicia : GameObject;
public var mykeynumber : int;



function OnTriggerEnter( other : Collider )
{
if(other.tag=="alice")
{
alicia.SendMessage("ActivateKey",mykeynumber);
Destroy(gameObject);
}
}