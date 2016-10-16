#pragma strict
public var misalud : int;

var elscript  : ogro;

function Start () {

animation["die01"].speed =1;
animation ["die01"].wrapMode = WrapMode.Once;
animation ["die01"].layer = 1;

misalud = 100;


}




function ApplyDamage()
{
misalud = misalud -20;
}