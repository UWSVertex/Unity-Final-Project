#pragma strict

var fadeImage : GameObject;
 var yourCursor : Texture2D; 
 var cursorSizeX : int = 128;
 var cursorSizeY : int = 128;

function Start () {
Screen.showCursor = false;
//Invoke("deactivateFadeImage", 2.5);
}

function Update () {


}

function deactivateFadeImage()
{
fadeImage.gameObject.SetActive(false);
}

function OnGUI()
 {
 GUI.DrawTexture
 (Rect(Event.current.mousePosition.x-cursorSizeX/2, Event.current.mousePosition.y-cursorSizeY/2, cursorSizeX, cursorSizeY), yourCursor);
 }
 
function playLevel1()
{
Application.LoadLevel("LEVEL1");
}
