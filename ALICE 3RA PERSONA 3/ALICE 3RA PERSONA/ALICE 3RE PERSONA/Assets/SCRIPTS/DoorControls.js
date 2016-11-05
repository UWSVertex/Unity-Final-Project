#pragma strict

var doorOpen : boolean;



function Start () {

doorOpen = false;

}

function Update () {

if (Input.GetButtonDown("E"))

	{
	animation.CrossFade("Open_Inside");
	
	}else{
	
	animation.CrossFade("Close_Outside");
	}


}