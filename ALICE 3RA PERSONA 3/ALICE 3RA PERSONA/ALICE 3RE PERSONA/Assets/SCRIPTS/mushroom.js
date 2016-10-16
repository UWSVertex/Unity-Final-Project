#pragma strict
//var ComponentNav : NavMeshAgent;
var player : GameObject;
var posicion : Vector3;
var direccion : Vector3;
var rotationspeed : int;
var minDistance : int;
var maxDistance : int;
public var misalud : int;
public var electricground : GameObject;
public var groundarea : GameObject;
private var animationtime : float;

var mush_IDLE : boolean;
var mush_WALK : boolean;
var mush_HOP  : boolean;
var mush_HIT  : boolean;
var mush_ATTACK : boolean;
var mush_DIE   : boolean;


function Start () {

player = GameObject.FindGameObjectWithTag("alice");

animation["idle"].speed =1;
animation ["idle"].wrapMode = WrapMode.Loop;
animation ["idle"].layer = 0;

minDistance=3;
maxDistance=20;
rotationspeed = 3;
misalud = 20;
//ComponentNav.speed = 2.5f;

mush_IDLE = true;
mush_WALK = false;
mush_HOP  = false;
mush_HIT  = false;
mush_ATTACK = false;
mush_DIE   = false;


animation.CrossFade("idle");

}

function Update () {
var curDistance = Vector3.Distance(player.transform.position, transform.position);
var playerDistance = Vector3.Distance(player.transform.position, transform.position);
//ComponentNav.SetDestination(eldestino.position);
posicion = player.transform.position;

direccion = posicion - transform.position;
direccion.y = 0;
transform.rotation = 
Quaternion.Slerp (transform.rotation, 
Quaternion.LookRotation(direccion),
rotationspeed * Time.deltaTime);

if(playerDistance <= minDistance)
{
mush_IDLE=false;
mush_ATTACK = true;
}

if(playerDistance > maxDistance)
{
mush_IDLE=true;
mush_ATTACK = false;
}

if(mush_ATTACK)
{
animation.CrossFade("attack01");
}

if(mush_IDLE)
{
animation.CrossFade("idle");
}


}






