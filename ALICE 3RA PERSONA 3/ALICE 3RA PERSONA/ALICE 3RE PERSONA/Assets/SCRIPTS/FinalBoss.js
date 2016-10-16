#pragma strict
var ComponentNav : NavMeshAgent;
var player : GameObject;

var FinalBoss_IDLE : boolean;
var FinalBoss_WALK : boolean;
var FinalBoss_ATTACK : boolean;
var FinalBoss_CHASE : boolean;
var FinalBoss_GUARD : boolean;
var FinalBoss_DIE : boolean;
var FinalBoss_ISDEAD : boolean;

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
// Systema De Navegacion
ComponentNav = GetComponent(NavMeshAgent);
player = GameObject.FindGameObjectWithTag("alice");

//Sistema De salud
salud = 100;

// Distancias y puntos de navegacion
numpoint = 0;
totalpoints = waypoints.Length;
eldestino =  waypoints[numpoint];
minDistance = 3;
chaseDistance = 15;
maxDistance = 25;
rotationspeed = 3;

//Incializicion de estados finitos
FinalBoss_IDLE = true;
FinalBoss_WALK = false;
FinalBoss_GUARD = false;
FinalBoss_ATTACK = false;
FinalBoss_CHASE = false;
FinalBoss_DIE =  false;
FinalBoss_ISDEAD =  false;

}

function Update () {

var curDistance = Vector3.Distance(eldestino.position, transform.position);
var playerDistance = Vector3.Distance(player.transform.position, transform.position);
ComponentNav.SetDestination(eldestino.position);


//Pasar a modo IDLE
if(playerDistance<maxDistance && playerDistance>chaseDistance)
{
FinalBoss_IDLE = true;
FinalBoss_WALK = false;
FinalBoss_GUARD = false;
FinalBoss_ATTACK = false;
FinalBoss_CHASE = false;
FinalBoss_DIE =  false;
FinalBoss_ISDEAD =  false;
}
//Pasar a Mode Chase

if (playerDistance<=chaseDistance && playerDistance > minDistance)
{
FinalBoss_IDLE = false;
FinalBoss_WALK = false;
FinalBoss_GUARD = false;
FinalBoss_ATTACK = false;
FinalBoss_CHASE = true;
FinalBoss_DIE =  false;
FinalBoss_ISDEAD =  false;

}

//Pasar a Modo GUARD
if(playerDistance > maxDistance)
{
FinalBoss_IDLE = false;
FinalBoss_WALK = false;
FinalBoss_GUARD = true;
FinalBoss_ATTACK = false;
FinalBoss_CHASE = false;
FinalBoss_DIE =  false;
FinalBoss_ISDEAD =  false;

}

//Estado Attack accion
if (playerDistance<=minDistance)
{

FinalBoss_IDLE = false;
FinalBoss_WALK = false;
FinalBoss_GUARD = false;
FinalBoss_ATTACK = true;
FinalBoss_CHASE = false;
FinalBoss_DIE =  false;
FinalBoss_ISDEAD =  false;

}

//Acciones para Estados Finitos.

//Acciones para estado IDLE
if(FinalBoss_IDLE)
{
ComponentNav.Stop();
animation.CrossFade("idle");
}

//Accion para estado CHASE

if (FinalBoss_CHASE)
{
ComponentNav.speed = 3.0f;
eldestino.position = player.transform.position;
animation.CrossFade("run");
}

//Accion para estado GUARD
if (FinalBoss_GUARD)
{
ComponentNav.speed = 1.5f;
animation.CrossFade("Run");

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

// Accion para estado ATTACK
if (FinalBoss_ATTACK)
{
ComponentNav.Stop();
direccion = player.transform.position - transform.position;
direccion.y = 0;
animation.CrossFade("Attack01");

transform.rotation = 
Quaternion.Slerp (transform.rotation, 
Quaternion.LookRotation(direccion),
 rotationspeed * Time.deltaTime);
}

}