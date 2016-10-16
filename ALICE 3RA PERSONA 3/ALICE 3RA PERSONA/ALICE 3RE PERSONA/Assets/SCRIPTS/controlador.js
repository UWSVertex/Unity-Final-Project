#pragma strict
import UnityEngine.UI;

var coincounter : int;
var text_coins : Text;
var dBlueImage : GameObject;
var pausepanel : GameObject;
var pausedgame : boolean;
var fadeImage : GameObject;
var ChangeLevel : GameObject;
var gameoverpanel : GameObject;

function Awake()
{
DontDestroyOnLoad(gameObject);
}



function Start () {
	pausedgame = false;
	coincounter = 0;
	//dBlueImage.gameObject.SetActive(false);
	pausepanel.gameObject.SetActive(false);
	Invoke("deactivateFadeImage", 2.5);
	gameoverpanel.gameObject.SetActive(false);
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
}

function coincolect()
{
coincounter = coincounter + 1;
text_coins.text=coincounter.ToString();
if (coincounter == 12)
{
	chlevelpermission();
}
}


function ShowdBlueImage()
{
	dBlueImage.gameObject.SetActive(true);
}

function pausarjuego()
{
//player.gameObject.BroadcastMessage("desactivarmouse");
//componentecamara.enabled = false;
pausedgame = true;
pausepanel.gameObject.SetActive(true);
}


function continuarjuego()
{
//player.gameObject.BroadcastMessage("activarmouse");
//componentecamara.enabled = true;
pausedgame = false;
pausepanel.gameObject.SetActive(false);
}

function deactivateFadeImage()
{
//fadeImage.gameObject.SetActive(false);
}


function chlevelpermission()
{
	ChangeLevel.transform.SendMessage("permission");
}

function gameover(){

	yield WaitForSeconds(2.0);
	gameoverpanel.gameObject.SetActive(true);
	pausedgame=true;
	Time.timeScale = 0.0;
}

function reiniciar(){
	gameoverpanel.gameObject.SetActive(false);
	Application.LoadLevel("LEVEL1");
}

function salir(){
	Application.Quit();
}



