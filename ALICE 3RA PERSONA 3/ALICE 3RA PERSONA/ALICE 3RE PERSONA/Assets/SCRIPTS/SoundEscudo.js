#pragma strict

function Start () {
Invoke("destroyme",3);

}

function destroyme()
{
Destroy(gameObject);
}