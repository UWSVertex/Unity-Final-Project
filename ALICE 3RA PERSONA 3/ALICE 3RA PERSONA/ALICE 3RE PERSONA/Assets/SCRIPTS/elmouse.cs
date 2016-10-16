using UnityEngine;
using System.Collections;




public class elmouse : MonoBehaviour {

	public GameObject origen;
	MouseLook elraton;

	// Use this for initialization
	void Start () {

		elraton = origen.gameObject.GetComponent<MouseLook>();
	
	}
	
	// Update is called once per frame



	void activarmouse()
	{
		elraton.enabled = true;
	}

	void desactivarmouse()
	{
		elraton.enabled = false;
	}


}
