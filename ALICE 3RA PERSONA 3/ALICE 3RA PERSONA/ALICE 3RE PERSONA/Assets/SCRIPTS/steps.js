#pragma strict
var walkSpeed: float; 
var runSpeed: float = 20;
var stepsound : AudioClip;
var woodstepsound : AudioClip[];
var metalstepsound: AudioClip[];
var waterstepsound : AudioClip[];
var ladderstepsound : AudioClip[];
var concretestepsound : AudioClip[];
var dirtstepsound : AudioClip[];
var jumpsound : AudioClip;
var step : boolean;
var audiosteplength : float;
var runstep : float;
var running : boolean;
var walking : boolean;
var horizontalVelocity : Vector3;
var FloorDetector : Transform;

private var ch: CharacterController;
var hit : RaycastHit;

function Start () {
ch = GetComponent(CharacterController);
horizontalVelocity = ch.velocity;
step = true;
running = false;
walking = false;
running = false;
walking = false;
audiosteplength= 0.5;
runstep = 0.20;
}

function Update () {
var fwd = 
FloorDetector.TransformDirection(Vector3.forward);
var direction = FloorDetector.forward;
Debug.DrawRay
(FloorDetector.position, fwd * 5, Color.green);

Physics.Raycast
(FloorDetector.position,fwd,hit,5);

running = false;
walking = false;
audiosteplength= 0.45;
var speed = walkSpeed;

if(Input.GetAxis("Vertical")!=0 
|| Input.GetAxis("Horizontal")!=0)
{
 	walking = true;
 	running = false;
}

Debug.Log("Estado = "+walking);

if (walking) 
{
speed = walkSpeed;
if (step)
	caminar();
} 
}


function caminar()
{
/*step = false;*/
/*if (hit.transform.tag=="madera")
{
audio.clip = woodstepsound[0];
}

if (hit.transform.tag=="metal")
{
audio.clip = metalstepsound[0];
}

if (hit.transform.tag=="dirt")
{
audio.clip = dirtstepsound[0];
}

if (hit.transform.tag=="water")
{
audio.clip = waterstepsound[0];
}
if (hit.transform.tag=="concreto")
{
audio.clip = concretestepsound[0];
}*/

/*audio.volume = .8;
audio.Play();
yield WaitForSeconds(audiosteplength);
step = true;*/
}



