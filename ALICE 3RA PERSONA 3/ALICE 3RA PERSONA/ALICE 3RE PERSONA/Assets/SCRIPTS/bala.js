#pragma strict
var explosion : GameObject;
var airexplosion : GameObject;
public var SoundEscudo: GameObject;
private var mytime : float;
private var radius : float = 30.0;    
private var power : float = 50.0;  
private var explosiveLift : float = 7.0; 
private var sumary : Vector3;

function Start()
{
sumary = Vector3(0,0.05,0);


}
function OnCollisionEnter(collision : Collision)
{
var contact : ContactPoint = collision.contacts[0];
var rotation = Quaternion.FromToRotation(Vector3.up, contact.normal);

sumary = sumary + contact.point;
//Instantiate (explosion, contact.point, rotation);
Instantiate (explosion, sumary, rotation);

/*var grenadeOrigin : Vector3 = transform.position;

var colliders : Collider[] = Physics.OverlapSphere (grenadeOrigin, radius); 
for(var hit : Collider in colliders){  //for loop that says if we hit any colliders, then do the following below
if (hit.rigidbody){
hit.rigidbody.AddExplosionForce(power, grenadeOrigin, radius, explosiveLift);
 } 
}*/
Destroy(gameObject); 
}

function Destroyme()
{
Instantiate(airexplosion,transform.position,transform.rotation);
Instantiate(SoundEscudo,transform.position,transform.rotation);
Destroy(gameObject);
}




