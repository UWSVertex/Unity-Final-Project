#pragma strict
var velocidad : float;
public var objetivo : Transform;
var player : GameObject;
var vel_rotacion : float;
var GUARD : boolean;
var PERSECUTION : boolean;
var ComponentNav : NavMeshAgent;



function Start () {
objetivo = GameObject.Find ("wp1").transform;
ComponentNav = GetComponent(NavMeshAgent);
player = GameObject.FindGameObjectWithTag("alice");
ComponentNav.enabled = false;


animation["fly"].speed =1;
animation ["fly"].wrapMode = WrapMode.Loop;
animation ["fly"].layer = 0;

animation.CrossFade("fly");
GUARD = true;
PERSECUTION = false;

}

function Update () {
	var playerDistance = Vector3.Distance(player.transform.position, transform.position);

	if (playerDistance < 30)
	{
	GUARD = false;
	PERSECUTION = true;
	}else
	{
	GUARD = true;
	PERSECUTION = false;
	}
	
	if(GUARD)	
	{
	PERSECUTION = false;
	gameObject.transform.Translate (Vector3.forward * Time.deltaTime * velocidad);
	var rotation = Quaternion.LookRotation(objetivo.transform.position - gameObject.transform.position);
	gameObject.transform.rotation = Quaternion.Slerp(gameObject.transform.rotation, rotation, Time.deltaTime * vel_rotacion);
	}
	
	if(PERSECUTION)
	{
	GUARD = false;
	ComponentNav.enabled = true;
	ComponentNav.speed = 2.5f;
	ComponentNav.SetDestination(player.transform.position);
	
	}	
	
}