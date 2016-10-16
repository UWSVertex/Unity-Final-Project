#pragma strict
import UnityEngine.UI;


public var crono : Text;
var tiempo : String;
var num : int = 1;

private var nexttime = 0.5;
private var hora = 0;
private var minutos = 0;
private var segundo = 0;
private var milesimas = 0;


function Start () {

}

function Update () {
nexttime = Time.time;
hora = nexttime%1;
minutos = nexttime / 60;
segundo = nexttime%60;
milesimas =(nexttime*100)%100;
updateGUI();

}

function updateGUI()
{
crono.text = hora.ToString()+":"+minutos.ToString()+":"+segundo.ToString();


}


