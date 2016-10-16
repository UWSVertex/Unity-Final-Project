#pragma strict

var controlador : GameObject;
var coinsound : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter ( objeto : Collider)
{
if ( objeto.tag =="alice")
 {
Instantiate(coinsound, transform.position, transform.rotation);
controlador.SendMessage("coincolect");
Destroy(gameObject); 
}
}




