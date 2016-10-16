#pragma strict

function Start () {

var  velocidad : float = 2.0;

}

function Update () {

transform.Translate(Vector3.forward * Time.deltaTime * 7.0);

}