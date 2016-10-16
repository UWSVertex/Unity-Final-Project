#pragma strict
var ComponentNav : NavMeshAgent;
var puntos : Transform[];
var numpoint : int;
var totalpoints : int;
var player : GameObject;
var posicion : Vector3;
var direccion : Vector3;
var rotationspeed : int;
public var misalud : int;
public var electricground : GameObject;
public var groundarea : GameObject;
private var animationtime : float;

var esperando: boolean;
var alhpatime:float = 2.0;
var alphaVal:float = 0.0;

var ogro_IDLE : boolean;
var ogro_WALK : boolean;
var ogro_RUN  : boolean;
var ogro_HIT  : boolean;
var ogro_ATTACK : boolean;
var ogro_DIE1   : boolean;
var ogro_DIE2	: boolean;
var ogro_PATROL : boolean;
var ogro_ISDEAD: boolean;
var eldestino :Transform;
var minDistance : int;
var maxDistance : int;

function Start () {
ComponentNav = GetComponent(NavMeshAgent);
player = GameObject.FindGameObjectWithTag("alice");
numpoint = 0;
totalpoints = puntos.length;
eldestino = puntos[numpoint];

animation["idle"].speed =1;
animation ["idle"].wrapMode = WrapMode.Loop;
animation ["idle"].layer = 0;

animation["walk"].speed =1;
animation ["walk"].wrapMode = WrapMode.Loop;
animation ["walk"].layer = 0;

animation["run"].speed =1;
animation ["run"].wrapMode = WrapMode.Loop;
animation ["run"].layer = 0;

animation["die01"].speed =1;
animation ["die01"].wrapMode = WrapMode.Once;
animation ["die01"].layer = 0;


animation["attack01"].speed =1;
animation ["attack01"].wrapMode = WrapMode.Once;
animation ["attack01"].layer = 0;

animationtime = animation["attack01"].length;

ogro_IDLE = false;
ogro_WALK = false;
ogro_RUN  = false;
ogro_HIT  = false;
ogro_ATTACK = false;
ogro_DIE1   = false;
ogro_DIE2	= false;
ogro_PATROL = true;
ogro_ISDEAD = false;

esperando = false;
minDistance=3;
maxDistance=20;
rotationspeed = 3;
misalud = 60;
ComponentNav.speed = 2.5f;
}


function Update () {

if (!ogro_ISDEAD)
{
var curDistance = Vector3.Distance(eldestino.position, transform.position);
var playerDistance = Vector3.Distance(player.transform.position, transform.position);
ComponentNav.SetDestination(eldestino.position);
posicion = player.transform.position;
}


//CAMBIO DE ESTADOS DE LA MAQUINA DE ESTADOS FINITOS
//LA CONDICION CAMBIA DE ACUERDO A LA DISTANCIA DEL JUGADOR
if(playerDistance <=maxDistance && playerDistance > minDistance)
{
ogro_PATROL=false;
ogro_RUN = true;
ogro_ATTACK = false;
}

if(playerDistance <= minDistance)
{
ogro_PATROL=false;
ogro_RUN = false;
ogro_ATTACK = true;
}

if(playerDistance > maxDistance)
{
ogro_PATROL=true;
ogro_RUN = false;
ogro_ATTACK = false;
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

if(ogro_RUN)
{
ComponentNav.speed = 4.0f;
eldestino.position = player.transform.position;

animation.CrossFade("run");
}



if(ogro_ATTACK && misalud>0)
{
ComponentNav.Stop();
if (esperando == false )
	{
	esperando = true;
	alataque(1);
	}
direccion = posicion - transform.position;
direccion.y = 0;
transform.rotation = 
Quaternion.Slerp (transform.rotation, 
Quaternion.LookRotation(direccion),
 rotationspeed * Time.deltaTime);
}

if(ogro_DIE1)
{
ComponentNav.Stop();
if (!ogro_ISDEAD)
{
ogro_ISDEAD = true;
animation. CrossFade("die01");
animationtime = animation["die01"].length;
//LeanTween.alpha(gameObject, alphaVal, alhpatime);
createEffect(animationtime);

}
}
}


function ApplyDamage()
{
misalud = misalud -20;
if(misalud<=0)
{
ogro_DIE1=true;
ogro_IDLE = false;
ogro_WALK = false;
ogro_RUN  = false;
ogro_HIT  = false;
ogro_PATROL = false;
animation.Stop();
//Destroy(gameObject);
}
}

function createEffect(at : float)
{
//yield WaitForSeconds (at);
Instantiate(electricground, transform.position, transform.rotation);
Instantiate(groundarea, transform.position, transform.rotation);
yield WaitForSeconds (3);
Destroy(gameObject);
}


function alataque(tiempo : float)
{ 
animation.CrossFade("attack01");
yield WaitForSeconds(animationtime); 
player.SendMessage("ApplyDamage",10);
yield WaitForSeconds(tiempo); 
esperando = false;
}

