#pragma strict

var speed : int;
var impact : AudioClip;
var explosion : GameObject;
function Start () {
destruirme();
}

function Update () {

}


function OnCollisionEnter(other: Collision)
{
	if(other.transform.tag=="orco" || other.transform.tag=="flowermonster"){
		other.gameObject.SendMessage("ApplyDamage",20);
		Instantiate(explosion,transform.position,transform.rotation);
		Destroy(gameObject,0.1f);
	}else{
		Instantiate(explosion,transform.position,transform.rotation);
		Destroy(gameObject,0.1f);
	}
audio.PlayOneShot(impact);
//kill();
}

function kill() 
{
Destroy(gameObject,0.2);
}

function destruirme()
{
Destroy(gameObject,4);
}


