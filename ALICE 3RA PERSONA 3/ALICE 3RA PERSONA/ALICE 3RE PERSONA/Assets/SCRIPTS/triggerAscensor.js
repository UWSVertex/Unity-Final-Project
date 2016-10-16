#pragma strict

var ascensor : GameObject;
var animador : Animation;
var arriba : boolean;
var abajo  : boolean;


function Start () {

animador = ascensor.GetComponent(Animation);

}

function OnTriggerEnter (other : Collider) {
    if(other.gameObject.tag == "alice") {
        other.transform.parent = ascensor.transform;
		}
}


function OnTriggerExit (other : Collider) {
    if(other.gameObject.tag == "alice") {
        other.transform.parent = null;
    }
}


function switchposition()
{
arriba = !arriba;
abajo  = !abajo;
}



