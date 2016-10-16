#pragma strict
var ComponentNav : NavMeshAgent;
var puntos : Transform[];
var numpoint : int;
var totalpoints : int;

var rotationspeed : int;
var minDistance : int;
var maxDistance : int;

var eldestino :Transform;

function Start () {
ComponentNav = GetComponent(NavMeshAgent);
numpoint = 0;
totalpoints = puntos.length;
eldestino= puntos[numpoint];

minDistance=3;
maxDistance=20;
rotationspeed = 3;
ComponentNav.speed = 2.5f;

}

function Update () {
var curDistance = Vector3.Distance(eldestino.position, transform.position);
ComponentNav.SetDestination(eldestino.position);
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