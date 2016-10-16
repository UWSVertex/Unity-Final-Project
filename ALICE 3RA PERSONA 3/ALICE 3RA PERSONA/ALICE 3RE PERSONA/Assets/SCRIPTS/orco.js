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

var posicion : Vector3;
var direccion : Vector3;
var rotationspeed : int;
var salud : int;

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
}

function Update () {

var curDistance = Vector3.Distance(eldestino.position, transform.position);
var playerDistance = Vector3.Distance(player.transform.position, transform.position);
ComponentNav.SetDestination(eldestino.position);


//Pasar a modo IDLE
if(playerDistance<maxDistance && playerDistance>chaseDistance)
{
ogro_GUARD = false;
ogro_IDLE = true;
ogro_CHASE = false;
ogro_ATTACK = false;
ogro_DIE = false;
}

if(playerDistance > maxDistance)
{
ogro_GUARD = true;
ogro_IDLE = false;
ogro_CHASE = false;
ogro_ATTACK = false;
ogro_DIE = false;
}

if (playerDistance<=chaseDistance && playerDistance > minDistance)
{
ogro_GUARD = false;
ogro_IDLE = false;
ogro_CHASE = true;
ogro_ATTACK = false;
ogro_DIE = false;
}

if (playerDistance<=minDistance)
{
ogro_GUARD = false;
ogro_IDLE = false;
ogro_CHASE = false;
ogro_ATTACK = true;
ogro_DIE = false;
}

 if(salud<=0){
 	
 	ogro_GUARD = false;
	ogro_IDLE = false;
	ogro_CHASE = false;
	ogro_ATTACK = false;
	ogro_DIE = true;
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
//hasta aqui el modo Guard


if(ogro_IDLE)
{
ComponentNav.Stop();
animation.CrossFade("idle");
}

if (ogro_CHASE)
{
ComponentNav.speed = 3.0f;
eldestino.position = player.transform.position;
animation.CrossFade("run");
}

if (ogro_ATTACK)
{
ComponentNav.Stop();
direccion = player.transform.position - transform.position;
direccion.y = 0;
animation.CrossFade("attack01");

transform.rotation = 
Quaternion.Slerp (transform.rotation, 
Quaternion.LookRotation(direccion),
 rotationspeed * Time.deltaTime);
}

if(ogro_DIE)
{
	ComponentNav.Stop();
	if(!ogro_ISDEAD){
		ogro_ISDEAD=true;
		animation.CrossFade("die01");
	} 
	
 } 


}

function ApplyDamage(damage : int){
 salud = salud - damage;
 
}