#pragma strict

public var bridgeb : Rigidbody;
public var humo 	: GameObject;
public var humosource : Transform;
public var humosource2 : Transform;


function Start () {
bridgeb.useGravity = false;
}

function OnTriggerEnter( other : Collider)
{
if (other.gameObject.tag == "alice")
{
Instantiate( humo , humosource.position, humosource.rotation);
Instantiate( humo , humosource2.position, humosource2.rotation);
ActivarGravedad();
}
}

function ActivarGravedad()
{
yield WaitForSeconds(0.05);
bridgeb.useGravity = true;
}

