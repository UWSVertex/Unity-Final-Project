#pragma strict
var ComponentNav : NavMeshAgent;
var puntos : Transform[];
var numpoint : int;
var totalpoints : int;
var player : GameObject;
var position : Vector3;
var direccion : Vector3;
var rotationspeed : int;
//private var movespeed : float =6.0f;

//sonidos de ogro
public var ogroSND1: AudioClip;
public var ogroSND2: AudioClip;
public var ogroSND3: AudioClip;

public var misalud : int;
public var electricground : GameObject;
public var groundarea : GameObject;
public var animationtime : float;
var spawn : Transform;
public var bala : Rigidbody;
var disparar : boolean;

var ogro_IDLE : boolean;
var ogro_ATTACK : boolean;
var ogro_WALK : boolean;
var ogro_RUN  : boolean;
var ogro_DIE1   : boolean;
var ogro_DIE2	: boolean;
var ogro_PATROL : boolean;
var ogro_ISDEAD: boolean;
var ogro_HIT : boolean;
var eldestino :Transform;
var minDistance : int;
var maxDistance : int;

private var throwPower : float = 8;



function Start () {

ComponentNav = GetComponent(NavMeshAgent);
player = GameObject.FindGameObjectWithTag("alice");

animation["idle"].speed =1;
animation ["idle"].wrapMode = WrapMode.Loop;
animation ["idle"].layer = 0;

animation["walk"].speed =1;
animation ["walk"].wrapMode = WrapMode.Loop;
animation ["walk"].layer = 0;

animation["attack01"].speed =1;
animation ["attack01"].wrapMode = WrapMode.Once;
animation ["attack01"].layer = 0;

animation["run"].speed =1;
animation ["run"].wrapMode = WrapMode.Loop;
animation ["run"].layer = 0;

animation["die01"].speed =1;
animation ["die01"].wrapMode = WrapMode.Once;
animation ["die01"].layer = 0;

numpoint = 0;
totalpoints = puntos.length;
eldestino = puntos[numpoint];
ComponentNav.speed = 2.5f;

disparar = true;
ogro_IDLE = false;
ogro_WALK = false;
ogro_RUN  = false;
ogro_HIT  = false;
ogro_ATTACK = false;
ogro_DIE1   = false;
ogro_DIE2	= false;
ogro_PATROL = true;
ogro_ISDEAD = false;

minDistance=3;
maxDistance=20;
rotationspeed = 3;
misalud = 60;

//movespeed =6.0f;

}

function Update () {
var curDistance = Vector3.Distance(eldestino.position, transform.position);
var playerDistance = Vector3.Distance(player.transform.position, transform.position);
ComponentNav.SetDestination(eldestino.position);
position = player.transform.position;
//direction = position - transform.position;
//transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationspeed * Time.deltaTime);


if (playerDistance<20)
{
	ogro_PATROL= false;
	ogro_ATTACK = true;
}else{
	ogro_PATROL = true;
	ogro_ATTACK = false;
}

	if(ogro_IDLE)
	{
	animation.CrossFade("idle");
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
	
if(ogro_PATROL)
{
ComponentNav.speed = 2.5f;
animation.CrossFade("walk");
if (curDistance<=0.5)
{
numpoint++;
if (numpoint<totalpoints)
{
eldestino =  puntos[numpoint];
}

if(numpoint==totalpoints)
{
numpoint = 0;
eldestino =  puntos[numpoint];
}
}
}
	
	
	
	
	
	
	
	
}


function lanzargranada()
{
audio.PlayOneShot(ogroSND3, 0.7F);
disparar = false;
yield WaitForSeconds(animationtime*0.45);
var clone : Rigidbody;
clone = Instantiate(bala, spawn.position,spawn.rotation); 
throwPower = Random.Range(12.0,16.0);
clone.velocity = spawn.TransformDirection(Vector3.forward * throwPower);
yield WaitForSeconds(animationtime*0.55);
disparar = true;

}


