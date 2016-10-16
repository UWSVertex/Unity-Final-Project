#pragma strict
import UnityEngine.UI;

var componentecamara : CameraCollision;

public var coins_text : Text;
public var player : GameObject;
public var messages_panel : GameObject;
public var BlueGemImage : GameObject;
public var RedGemImage : GameObject;
public var GreenGemImage : GameObject;
public var Wand1Image: GameObject;
public var lacamara : GameObject;
var pausepanel : GameObject;
var pausedgame : boolean;

var coins : int;

function Start () {
BlueGemImage.gameObject.SetActive(false);
RedGemImage.gameObject.SetActive(false);
GreenGemImage.gameObject.SetActive(false);
Wand1Image.gameObject.SetActive(false);
pausepanel.gameObject.SetActive(false);
componentecamara =lacamara.gameObject.GetComponent(CameraCollision);
pausedgame = false;
}

function Update () {

if(pausedgame==true)
{
Time.timeScale = 0.0;
}
else
{
Time.timeScale = 1.0;
}


if(Input.GetKeyDown("p") )		
	{
	pausarjuego();
		}
		
if(Input.GetKeyDown("c") )		
	{
	continuarjuego();
		}
		
		
		

}

function coincolect()
{
coins++;
UpdateGUI();
}

function UpdateGUI()
{
coins_text.text = ""+coins.ToString();
}

function pausarjuego()
{
player.gameObject.BroadcastMessage("desactivarmouse");
componentecamara.enabled = false;
pausedgame = true;
pausepanel.gameObject.SetActive(true);
}


function continuarjuego()
{
player.gameObject.BroadcastMessage("activarmouse");
componentecamara.enabled = true;
pausedgame = false;
pausepanel.gameObject.SetActive(false);
}





