#pragma strict

function OnTriggerEnter( other : Collider)
{
 if(other.gameObject.tag == "ascensor")
 {
 other.gameObject.BroadcastMessage("switchposition");
  }
 
}