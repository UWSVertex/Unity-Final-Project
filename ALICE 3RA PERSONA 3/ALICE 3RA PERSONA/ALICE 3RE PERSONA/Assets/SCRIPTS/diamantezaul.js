#pragma strict

public var player : GameObject;

function Start () {
player = GameObject.FindGameObjectWithTag("alice");

}

function OnTriggerEnter()
{
player.SendMessage("ActivateBlue");
Destroy(gameObject,0.1);
}