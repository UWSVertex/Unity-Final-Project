#pragma strict
//nav
var ComponentNav : NavMeshAgent;
var waypoints: Transform[];
var numpoint : int;
var totalpoints : int;
var eldestino :Transform;
var curDistance : int;

//states
var flower_IDLE : boolean;
var flower_ATTACK : boolean;
var flower_DIE : boolean;
var flower_TAKE_DAMAGE : boolean;
var flower_CHASE : boolean;
var flower_GUARD: boolean;

var flower_ISDEAD : boolean;
var flower_Applying_Damage : boolean;

//attributes
var salud: int;

var maxDistance: int;
var minDistance :int;
var chaseDistance: int;

var posicion : Vector3;
var direccion : Vector3;
var rotationspeed : int;

//public members
var player : GameObject;


function Start () {
	ComponentNav = GetComponent(NavMeshAgent);
	totalpoints = waypoints.Length;
	numpoint = 0;
	eldestino =  waypoints[numpoint];
	
	
	player = GameObject.FindGameObjectWithTag("alice");

	flower_IDLE = true;
	flower_ATTACK = false;
	flower_DIE = false;
	flower_TAKE_DAMAGE = false;
	flower_CHASE = false;
	flower_GUARD = false;
	flower_ISDEAD=false;
	flower_Applying_Damage=false;
	
	salud = 100;
	
	minDistance = 2;
	chaseDistance = 15;
	maxDistance = 25;
	rotationspeed = 3;
	
}

function Update () {
	curDistance = Vector3.Distance(eldestino.position, transform.position);
	var playerDistance = Vector3.Distance(player.transform.position, transform.position);
	ComponentNav.SetDestination(eldestino.position);
	
	//IDLE
	if(playerDistance<maxDistance && playerDistance>chaseDistance)
	{
		flower_GUARD = false;
		flower_IDLE = true;
		flower_CHASE = false;
		flower_ATTACK = false;
		flower_DIE = false;
	}
	
	//Guard
	if(playerDistance > maxDistance)
	{
		flower_GUARD = true;
		flower_IDLE = false;
		flower_CHASE = false;
		flower_ATTACK = false;
		flower_DIE = false;
		flower_TAKE_DAMAGE = false;
	}

	//chase
	if (playerDistance<=chaseDistance && playerDistance > minDistance)
	{
		flower_GUARD = false;
		flower_IDLE = false;
		flower_CHASE = true;
		flower_ATTACK = false;
		flower_DIE = false;
		flower_TAKE_DAMAGE = false;
	}
	
	//attack
	if (playerDistance<=minDistance)
	{
		flower_GUARD = false;
		flower_IDLE = false;
		flower_CHASE = false;
		flower_ATTACK = true;
		flower_DIE = false;
		flower_TAKE_DAMAGE = false;
	}
	
	//take damage
	if(flower_Applying_Damage){
	 	
	 	flower_GUARD = false;
		flower_IDLE = false;
		flower_CHASE = false;
		flower_ATTACK = false;
		flower_DIE = false;
		flower_TAKE_DAMAGE = true;
		flower_Applying_Damage = false;
	 }
	
	//die
	 if(salud<=0){
	 	flower_GUARD = false;
		flower_IDLE = false;
		flower_CHASE = false;
		flower_ATTACK = false;
		flower_DIE = true;
		flower_TAKE_DAMAGE = false;
	 }
	
	//use nav mesh and waypoints
	if (flower_GUARD)
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

	if(flower_IDLE)
	{
		ComponentNav.Stop();
		animation.CrossFade("idle");
	}

	if (flower_CHASE)
	{
		ComponentNav.speed = 3.0f;
		eldestino.position = player.transform.position;
		animation.CrossFade("walk");
	}

	if (flower_ATTACK)
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

	if(flower_DIE)
	{
		ComponentNav.Stop();
		if(!flower_ISDEAD){
			flower_ISDEAD=true;
			animation.CrossFade("die");
		} 
		
	 } 
	 
	 if(flower_TAKE_DAMAGE)
	{
		ComponentNav.Stop();
		animation.CrossFade("takedamage");	
		WaitAnimation(animation["takedamage"].length);
		
	 }

}

function WaitAnimation(animationtime : int){
	yield WaitForSeconds(animationtime);
}

function ApplyDamage(damage : int){
 salud = salud - damage;
 flower_Applying_Damage = true;
}

