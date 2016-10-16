#pragma strict
public var key1_available : boolean;
var speed : float = 4.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;
var projectilespawn : Transform;
var projectile : GameObject;
private var animationtime : float;
var proyectil1 : Rigidbody;
private var pspeed : float =40;
var spawn : Transform;
var wand1 : GameObject;
var wand1chest : GameObject;
var wand1_bool : boolean;
var escudo : GameObject;
var controlador : GameObject;


var elescudo : boolean;
var disparar :boolean;


public static var timeScale: float;

var wand1_available : boolean;
var windpower_available : boolean;

public var key1: boolean;
public var key2: boolean;
public var key3: boolean;
public var key4: boolean;

public var healthBar : UnityEngine.UI.Image; 
public var salud: int; 

public var blueImage : GameObject;
public var greenImage : GameObject;
public var redImage : GameObject;
public var Wand1Image: GameObject;

var continuestriking : boolean;
var continueproyectil : boolean;
	
var alice_IDLE : boolean;
var alice_WALK : boolean;
var alice_KICK : boolean;
var alice_STRIKE : boolean;
var alice_JUMP : boolean;
var alice_RUN : boolean;
var alice_MELEEATTACK01 : boolean;	
var alice_DIE : boolean;	
var alice_ISDEAD : boolean;	


private var moveDirection : Vector3 = Vector3.zero;


function Awake () {
		//transform.position.x=82.19;
	//	transform.position.y=-1.41;
	//	transform.position.z=81.21;
		DontDestroyOnLoad(gameObject);
		
	}	
		
			
					
function Start () {
/*transform.position.x=82.19;
		transform.position.y=-1.41;
		transform.position.z=81.21;*/



animation["Idle"].speed =1;
animation ["Idle"].wrapMode = WrapMode.Loop;
animation ["Idle"].layer = 0;

animation["Walk"].speed =1;
animation ["Walk"].wrapMode = WrapMode.Loop;
animation ["Walk"].layer = 0;

animation["Run"].speed =1;
animation ["Run"].wrapMode = WrapMode.Loop;
animation ["Run"].layer = 0;

animation["Jump"].speed =1;
animation ["Jump"].wrapMode = WrapMode.Once;
animation ["Jump"].layer = 1;

animation["MeleeAttack01"].speed =1;
animation ["MeleeAttack01"].wrapMode = WrapMode.Once;
animation ["MeleeAttack01"].layer = 1;

animation["MagicAttack01"].speed =1;
animation ["MagicAttack01"].wrapMode = WrapMode.Once;
animation ["MagicAttack01"].layer = 1;

animation["MagicAttack02"].speed =1;
animation ["MagicAttack02"].wrapMode = WrapMode.Once;
animation ["MagicAttack02"].layer = 1;

animation["SpellCast01"].speed =1;
animation ["SpellCast01"].wrapMode = WrapMode.Once;
animation ["SpellCast01"].layer = 1;

animation["SpellCast02"].speed =1;
animation ["SpellCast02"].wrapMode = WrapMode.Once;
animation ["SpellCast02"].layer = 1;

animation["SpellCast03"].speed =1;
animation ["SpellCast03"].wrapMode = WrapMode.Once;
animation ["SpellCast03"].layer = 1;

animation["Recharge"].speed =1;
animation ["Recharge"].wrapMode = WrapMode.Once;
animation ["Recharge"].layer = 1;

animation["Stunned"].speed =1;
animation ["Stunned"].wrapMode = WrapMode.Once;
animation ["Stunned"].layer = 1;

animation["Stunned"].speed =1;
animation ["Stunned"].wrapMode = WrapMode.Once;
animation ["Stunned"].layer = 1;


key1 = false;
key2 = false;
key3 = false;
key4 = false;




continuestriking = true;
continueproyectil = true;
wand1_bool = false;
key1_available = false;
var wand1_available = false;
wand1.gameObject.SetActive(false);
escudo.gameObject.SetActive(false);

alice_DIE=false;	
alice_ISDEAD=false;	

elescudo = false;
salud= 100;
healthBar.fillAmount = salud;

disparar=true;
}

function Update () {


var controller : CharacterController = GetComponent.<CharacterController>();


if(salud>0){
animation.CrossFade("Idle");

	alice_IDLE = true;
	alice_WALK = false;
	alice_JUMP = false;
	alice_RUN = false;
	alice_MELEEATTACK01 = false;
}
if (Input.GetKey ("escape")) {
			Application.Quit();
		}



if(!alice_RUN)
{
speed = 4;
}

if(Input.GetAxis("Vertical") !=0 || Input.GetAxis("Horizontal") !=0)
		{
		alice_IDLE = false;
		alice_WALK =true;
		animation.CrossFade("Walk");
		}
		
if (Input.GetKey (KeyCode.LeftShift)  || Input.GetKey (KeyCode.RightShift))
		{
		speed = 10;
		alice_IDLE = false;
		alice_WALK = false;
		alice_RUN = true;
		animation.CrossFade("Run");
		}


						
							
if(Input.GetKeyDown("o") )		
	{
	elescudo = !elescudo;
	escudo.gameObject.SetActive(elescudo);
	
	
		}
		
if(Input.GetMouseButtonDown(0) && wand1_available)
//if(Input.GetKeyDown("l"))	
	{
	
	
	alice_IDLE = false;
	alice_WALK = false;
	alice_JUMP = false;
	alice_MELEEATTACK01 = true;
	
		animation.CrossFade("MeleeAttack01");
		animationtime = animation["MeleeAttack01"].length;
	if(disparar == true){
		disparar=false;
		crearproyectil(animationtime);
		}
}
		
if(Input.GetKeyDown("k") )
	{
	
	
	alice_IDLE = false;
	alice_WALK = false;
	alice_JUMP = false;
	alice_MELEEATTACK01 = true;
	
		animation.CrossFade("Stunned");
		animationtime = animation["Stunned"].length;

}
		
if(Input.GetKeyDown("j") )
	{
	
	
	alice_IDLE = false;
	alice_WALK = false;
	alice_JUMP = false;
	alice_MELEEATTACK01 = true;
	
		animation.CrossFade("SpellCast03");
		//animation.CrossFade("MagicAttack01");
		//animationtime = animation["MacigAttack01"].length;

		//crearproyectil(animationtime);
}	
		
			
if(Input.GetKeyDown("e") && wand1_bool==true)
{
	wand1.gameObject.SetActive(true);
	//Wand1Image.gameObject.SetActive(true);
	wand1chest.gameObject.SetActive(false);
	animation.CrossFade("SpellCast03");
	wand1_available = true;
}
				
						
		
		if (controller.isGrounded) {
moveDirection = Vector3(Input.GetAxis("Horizontal"), 0,
			                        Input.GetAxis("Vertical"));		
			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= speed;
			
			if (Input.GetButton ("Jump")) {
				alice_IDLE = false;
				alice_WALK = false;
				alice_JUMP = true;
				moveDirection.y = jumpSpeed;
				animation.CrossFade("Jump");
			}
		}

		// Aplicar Gravedad
		moveDirection.y -= gravity * Time.deltaTime;
		
		// Mover el controlador
		controller.Move(moveDirection * Time.deltaTime);
		
	
	if(salud<=0){			
			alice_IDLE = false;
			alice_WALK = false;
			alice_JUMP = false;
			alice_MELEEATTACK01 = false;
			alice_DIE=true;
	}
	
	if(alice_DIE)
	{
		if(!alice_ISDEAD){
			alice_ISDEAD=true;
			animation.CrossFade("Die");
			controlador.transform.SendMessage("gameover");
			}
	}
		
}
		

function continuargolpeando(at:float)
{
	continuestriking=false;
	continueproyectil = false;
	yield WaitForSeconds (at);
	continuestriking=true;
}

function crearproyectil(at:float)
{
yield WaitForSeconds (at/2);
		var clone:Rigidbody =
		Instantiate(proyectil1,spawn.transform.position, 
		spawn.transform.rotation);
		clone.velocity = transform.TransformDirection(Vector3(0,0,pspeed));
		
yield WaitForSeconds (at/2);
disparar=true;
}



function ActiveWand1()
{
wand1_bool = true;

}

function DeactivateWand1()
{
wand1_bool = false;
}

function ActivateKey(numberkey : int)
{
if (numberkey==1)
{
key1 = true;
}
if (numberkey==2)
{
key2 = true;
}
if (numberkey==3)
{
key3 = true;
}





}


function ApplyDamage( amount : float)
{
salud= salud - amount;
healthBar.fillAmount = healthBar.fillAmount- 0.1;


}

function ActivateBlue()
{
blueImage.gameObject.SetActive(true);

}





