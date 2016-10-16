#pragma strict

var plataforma : GameObject;


function OnTriggerEnter (other : Collider) {
    if(other.gameObject.tag == "alice") {
        other.transform.parent = plataforma.transform;
    }
}

function OnTriggerExit (other : Collider) {
    if(other.gameObject.tag == "alice") {
        other.transform.parent = null;
    }
}