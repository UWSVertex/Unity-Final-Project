#pragma strict

var azul : GameObject;
var diamanteazul : GameObject;


function Start () {
Invoke("crearcirculo",3);
Destroy(gameObject,6);
}


function crearcirculo()
{
Instantiate(azul, transform.position, transform.rotation);
Instantiate(diamanteazul,transform.position, transform.rotation);
}