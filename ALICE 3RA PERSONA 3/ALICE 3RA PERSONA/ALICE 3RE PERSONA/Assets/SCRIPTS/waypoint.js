﻿#pragma strict
var siguiente_way : Transform;
function Start () {

}

function Update () {

}
function OnTriggerStay (otro : Collider){
	otro.GetComponent(redcat).objetivo = siguiente_way;
}