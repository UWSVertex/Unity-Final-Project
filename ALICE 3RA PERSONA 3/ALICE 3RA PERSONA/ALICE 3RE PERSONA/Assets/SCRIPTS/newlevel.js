#pragma strict

function OnTriggerEnter(other:Collider)
{
if (other.tag == "alice")
{
Invoke("cambialevel",0.2);

}
}

function cambialevel()
 {
Application.LoadLevel("l2");
}
