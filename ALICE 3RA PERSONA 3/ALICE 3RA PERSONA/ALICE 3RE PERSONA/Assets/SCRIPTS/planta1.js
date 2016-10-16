#pragma strict

function Start () {
animation["idle"].speed =1;
animation ["idle"].wrapMode = WrapMode.Loop;
animation ["idle"].layer = 0;

animation.CrossFade("idle");
}

