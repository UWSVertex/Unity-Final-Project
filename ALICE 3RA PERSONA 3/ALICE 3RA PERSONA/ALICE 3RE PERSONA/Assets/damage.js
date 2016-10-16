#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider){
if(other.tag=="alice"){
other.SendMessage("ApplyDamage",10);
}
}