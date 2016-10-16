#pragma strict
import UnityEngine.UI;

var alicemsg : Text;
var alicia : GameObject;
private var animationtime : float;


function Start () {
animation["ChestAnim"].speed =1;
animation ["ChestAnim"].wrapMode = WrapMode.Once;
animation ["ChestAnim"].layer = 0;

animationtime = animation["ChestAnim"].length;

}


function OnTriggerEnter(object : Collider)
{
if(object.tag=="alice")
{
animation.CrossFade("ChestAnim");
enviarmensaje(animationtime);
}
}

function OnTriggerExit(object : Collider)
{
if(object.tag=="alice")
{
alicemsg.text = " ";
alicia.SendMessage("DeactivateWand1");
}
}

function enviarmensaje(at:float)
{
yield WaitForSeconds(at);
alicemsg.text = "Press E to take the Wand";
alicia.SendMessage("ActiveWand1");
audio.Play();

}
