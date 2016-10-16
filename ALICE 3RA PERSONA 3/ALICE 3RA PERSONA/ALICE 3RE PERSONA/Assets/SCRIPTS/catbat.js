#pragma strict
var puntos : Transform[];
var speed : float;
var rotationSpeed: float;
var distance : float;
var destino: Transform;
var waypoint : int;
var totalpoints : int;
var estacionado : boolean;

function Start () {
waypoint = 0;
destino = puntos[waypoint];
speed = 2.0;
rotationSpeed = 2.0;
totalpoints = puntos.Length;
estacionado = false;
}


function Update () {


if ( estacionado == false)
{
var curDistance = Vector3.Distance(destino.position, transform.position);
//transform.LookAt(destino);

transform.Translate(Vector3.forward * Time.deltaTime * speed);
var targetRotation = 
Quaternion.LookRotation(destino.position - transform.position);
transform.rotation = 
Quaternion.Slerp( transform.rotation , targetRotation, rotationSpeed * Time.deltaTime);

//**********************************************************************

if (curDistance<=0.2)
{
waypoint++;
if (waypoint < totalpoints)
{
destino = puntos[waypoint];
}

if (waypoint==totalpoints)
{
waypoint = 0;
destino = puntos[waypoint];
//estacionado = true;
//Invoke("despegar",10);
}
}
}
//**********************************************************************

}

function despegar()
{
estacionado= false;
}