#pragma strict
public var direccion : float; 
var mover : boolean;
var rb: Rigidbody;

function Start () {
direccion = 1;
mover = true;
rb = GetComponent.<Rigidbody>();
}

function FixedUpdate () {
if (mover)
{
	if (direccion==1)
	{
	transform.Translate(Vector3.up * Time.deltaTime  * 3);
//	rb.MovePosition(transform.position +  Time.deltaTime * Vector3.right *  direccion  * 4);
}

if (direccion==-1)
	{
	transform.Translate(Vector3.down * Time.deltaTime  * 3);
//	rb.MovePosition(transform.position +  Time.deltaTime * Vector3.right *  direccion  * 4);
}



}
}


function OnCollisionEnter( other: Collision)
{
direccion = direccion * -1;

if (direccion==-1)
{
rb.velocity = Vector3.zero;
transform.position.y = transform.position.y - 0.25;
}

if (direccion==1)
{
rb.velocity = Vector3.zero;
transform.position.y = transform.position.y + 0.25;
}


mover = false;
cambiardir();
}

function cambiardir()
{
yield WaitForSeconds (2);
//direccion = direccion * -1;
mover = true;
}


