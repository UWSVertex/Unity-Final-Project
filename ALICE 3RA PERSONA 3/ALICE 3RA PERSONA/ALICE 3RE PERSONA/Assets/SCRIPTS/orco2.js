#pragma strict
var ComponentNav : NavMeshAgent;
var player : GameObject;

var ogro_IDLE : boolean;
var ogro_ATTACK: boolean;
var ogro_CHASE : boolean;
var ogro_GUARD: boolean;
var ogro_DIE : boolean;

var ogro_ISDEAD : boolean;

var waypoints: Transform[];
var numpoint : int;
var totalpoints : int;
var eldestino :Transform;

var maxDistance: int;
var minDistance :int;
var chaseDistance: int;

var position : Vector3;
var direccion : Vector3;
var rotationspeed : int;
var salud : int;

var bala : Rigidbody;
var disparar : boolean;
var bulletspawn : Transform;
var animationtime : float;
var throwPower : float = 8;

function Start () {
ComponentNav = GetComponent(NavMeshAgent);
player = GameObject.FindGameObjectWithTag("alice");
ogro_GUARD = true;
ogro_IDLE = false;
ogro_CHASE = false;
ogro_ATTACK = false;
ogro_DIE = false;
salud = 100;
numpoint = 0;
totalpoints = waypoints.Length;
eldestino =  waypoints[numpoint];
minDistance = 3;
chaseDistance = 15;
maxDistance = 25;
rotationspeed = 3;
ogro_ISDEAD=false;
disparar = true;
}

function Update () {
var curDistance = Vector3.Distance(eldestino.position, transform.position);
var playerDistance = Vector3.Distance(player.transform.position, transform.position);
ComponentNav.SetDestination(eldestino.position);

if (playerDistance<20)
{
	ogro_GUARD= false;
	ogro_ATTACK = true;
}else{
	ogro_GUARD = true;
	ogro_ATTACK = false;
}

if(ogro_ATTACK)
{
ComponentNav.Stop();
direccion = position - transform.position;
direccion.y = 0;
transform.rotation = 
Quaternion.Slerp (transform.rotation, 
Quaternion.LookRotation(direccion),
rotationspeed * Time.deltaTime);
	if(disparar)
	{
		animation.Play("attack01");
		animationtime = animation["attack01"].length;
		lanzargranada();
	}
}





if (ogro_GUARD)
{
ComponentNav.speed = 1.5f;
animation.CrossFade("walk");

if (curDistance<=0.5)
{
numpoint++;
if (numpoint<totalpoints)
{
eldestino =  waypoints[numpoint];
}

if(numpoint==totalpoints)
{
numpoint = 0;
eldestino =  waypoints[numpoint];
}
}
}
}


function lanzargranada()
{
//audio.PlayOneShot(ogroSND3, 0.7F);
disparar = false;
yield WaitForSeconds(animationtime*0.45);
var clone : Rigidbody;
clone = Instantiate(bala, bulletspawn.position,bulletspawn.rotation); 
throwPower = Random.Range(12.0,16.0);
clone.velocity = bulletspawn.TransformDirection(Vector3.forward * throwPower);
yield WaitForSeconds(animationtime*0.55);
disparar = true;

}
