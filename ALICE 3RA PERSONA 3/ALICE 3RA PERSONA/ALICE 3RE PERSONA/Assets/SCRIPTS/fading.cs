using UnityEngine;
using System.Collections;

public class fading : MonoBehaviour {

	public Texture2D fadeOutTexture;
	public float fadeSpeed = 0.8f;
	private int drawDpeth = -1000;
	private float alpha = 1.0f;
	private int fadeDir = -1;

	void OnGUI()
	{
		alpha += fadeDir * fadeSpeed * Time.deltaTime;

		alpha = Mathf.Clamp01 (alpha);
		GUI.color = new Color (GUI.color.r, GUI.color.g, GUI.color.r, alpha);
		GUI.depth = drawDpeth;
		GUI.DrawTexture (new Rect (0, 0, Screen.width, Screen.height), fadeOutTexture);

	}


	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

	
	}
}
