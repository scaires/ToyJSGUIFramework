//CONSTANTS
GUI_LAYOUT_GRAVITY_CENTER = 0;
GUI_LAYOUT_GRAVITY_TOP = 1;
GUI_LAYOUT_GRAVITY_TOPRIGHT = 2;
GUI_LAYOUT_GRAVITY_RIGHT = 3;
GUI_LAYOUT_GRAVITY_BOTTOMRIGHT = 4;
GUI_LAYOUT_GRAVITY_BOTTOM = 5;
GUI_LAYOUT_GRAVITY_BOTTOMLEFT = 6;
GUI_LAYOUT_GRAVITY_LEFT = 7;
GUI_LAYOUT_GRAVITY_TOPLEFT = 8;

GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL = 0;
GUI_LINEARLAYOUT_ORIENTATION_VERTICAL = 1;

/* CONVENIENT INHERITANCE
	http://phrogz.net/js/classes/OOPinJS2.html
*/
Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
	if ( parentClassOrObject.constructor == Function ) 
	{ 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	} 
	else 
	{ 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
} 

/* MOUSE EVENT */
function GUIMouseEvent(handler, ev)
{

	var x, y;
	
	// Get the mouse position relative to the canvas element.
	if (ev.layerX || ev.layerX == 0) { // Firefox
		x = ev.layerX;
		y = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		x = ev.offsetX;
		y = ev.offsetY;
	}
	
	handler(x, y);

}

/* GUI */
function GUI()
{
	var myLayout;
	var myContext;
	var myCanvas;
	var myViewIndex;
	var myViews;
	var myInflater;

	//privileged
	this.init = function(canvas) 
	{
		myViewIndex = 0;
		myViews = {};
		myCanvas = canvas;
		myContext = myCanvas.getContext("2d");
		myCanvas.addEventListener('mousedown', 	GUIMouseEvent.bind(null, this.OnMouseDown), false);
		myCanvas.addEventListener('mouseup',	GUIMouseEvent.bind(null, this.OnMouseUp), false);
		myCanvas.addEventListener('mousemove',	GUIMouseEvent.bind(null, this.OnMouseMove), false);
		myInflater = new GUIInflater();
		isInitialized = true;
	}
	
	this.isInitialized = function()
	{
		return (myContext != undefined && myLayout != undefined); 
	}
	
	this.inflate = function(layout)
	{
		return myInflater.inflate(this, layout);
	}

	this.registerView = function(view)
	{
		var id = generateViewId();
		view.setId(id);
		myViews[id] = view;
		return true;
	}

	this.findViewById = function(id)
	{
		return myViews[id];
	}

	this.findViewByName = function(name)
	{
		for (var view in myViews)
		{
			if (view.name === name)
			{
				return view;
			}
		}
		return undefined;
	}

	this.setLayout = function(layout)
	{
		myLayout = layout;
	}

	this.getLayout = function() 
	{
		return myLayout;
	}

	this.draw = function() 
	{
		if (myContext && myLayout)
		{
			this.clearRect(0, 0, myCanvas.width, myCanvas.height);
			myLayout.draw(0, 0, myCanvas.width, myCanvas.height);
		}
	}
	
	this.clearRect = function(x, y, width, height)
	{
		myContext.clearRect(x, y, width, height);
	}
	
	this.drawRect = function(x, y, width, height, filled, color)
	{
		if (filled)
		{
			myContext.fillStyle = color;
			myContext.fillRect(x, y, width, height);
		}
		else
		{
			myContext.strokeStyle = color;
			myContext.strokeRect(x, y, width, height);
		}
	}

	this.drawText = function(x, y, color, text, size, bold)
	{
		boldText = "";
		if (bold)
		{
			boldText = "bold";
		}
		myContext.font = boldText + (size.toString() + "px Arial");
		myContext.fillStyle = color;
		myContext.fillText(text, x, y);
	}
	
	this.onMouseDown = function (x, y)
	{
	}

	this.OnMouseUp = function(x, y)
	{
	}

	this.OnMouseMove = function(x, y)
	{
	}
	
	//private
	var generateViewId = function()
	{
		myViewIndex = myViewIndex + 1;
		return myViewIndex;
	}
}
/* END GUI */

/* GUI INFLATER */
function GUIInflater()
{
	this.inflate = function(gui, layoutJSON)
	{
		//test code
		var v = new GUIView(gui);
		v.init();
		v.name = "name";
		return v;
	}
}

/* END GUI INFLATER */

/* VIEW */
function GUIView(gui)
{
	var myGUI = gui;
	var myName = "default"
	var myId = 0;
	var myPaddingLeft = 0;
	var myPaddingRight = 0;
	var myPaddingTop = 0;
	var myPaddingBottom = 0;
	var myGravity = 0;
	var myBackgroundColor = "rgba(0, 0, 0, 1.0)";
	var hasBorder = false;
	var myBorderColor = "rgba(0, 0, 0, 1.0)";
	var myBorderSize = 0;
	var isVisible = true;
	var myWidth = 0;
	var myHeight = 0;
	var isWidthFill = false;
	var isWidthWrap = false;
	var isWidthPercent = false;
	var isHeightFill = false;
	var isHeightWrap = false;
	var isHeightPercent = false;
	
	this.init = function()
	{
		myGUI.registerView(this);
		isWidthFill = true;
		isHeightFill = true;
	}

	//properties
	this.setId = function(id)
	{
		myId = id;
	}

	this.getId = function()
	{
		return myId;
	}

	this.setBackgroundColor = function(color)
	{
		myBackgroundColor = color;
	}

	this.setBorderColor = function(color)
	{
		myBorderColor = color;
	}
	
	//privileged methods
	this.draw = function(x, y, width, height)
	{
		if (isVisible)
		{
			myGUI.drawRect(offsetX(x, width), offsetY(y, height), measureX(x, width), measureY(y, height), true, myBackgroundColor);
			if (hasBorder)
			{
				myGUI.drawRect(offsetX(x, width), offsetY(y, height), measureX(x, width), measureY(y, height), false, myBorderColor);
			}
		}
	}

	//private
	var measureX = function(x, width)
	{
		if (isWidthFill)
		{
			return width;
		}
	}
	
	var measureY = function(y, height)
	{
		if (isHeightFill)
		{
			return height;
		}
	}
	
	var offsetX = function(x, width)
	{
		if (isWidthFill)
		{
			return x;
		}
	}
	
	var offsetY = function(y, height)
	{
		if (isHeightFill)
		{
			return y;
		}
	}
}
/* END VIEW */

/* LAYOUT */
function GUILayout()
{
	var myChildren = [];
	var myChildCount = 0;
	
	this.addChild = function(view)
	{
		myChildren.push(view);
		myChildCount = myChildCount + 1;
	}

	this.clear = function()
	{
		myChildren = [];
		myChildCount = 0;
	}
}
GUILayout.inheritsFrom(GUIView);
GUILayout.prototype.draw=function(x, y, width, height){ 
	this.parent.draw.call(this, x, y, width, height);
	for (var child in myChildren)
	{
		child.draw(x, y, width, height);
	}
}
/* END LAYOUT */

/* LINEARLAYOUT */
function GUILinearLayout()
{
	var myOrientation = GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL;
}
GUILinearLayout.inheritsFrom(GUILayout);
/* END LINEARLAYOUT */

/* TEXTVIEW */
function GUITextView()
{

}
GUITextView.inheritsFrom(GUIView);
/* END TEXTVIEW */

/* IMAGEVIEW */
function GUIImageView()
{

}
GUIImageView.inheritsFrom(GUIView);
/* END IMAGEVIEW */

/* BUTTONVIEW */
function GUIButtonView()
{

}
GUIButtonView.inheritsFrom(GUITextView);
/* END BUTTONVIEW */

/* CHECKBOX */
function GUICheckBoxView()
{

}
GUICheckBoxView.inheritsFrom(GUIButtonView);
/* END CHECKBOX */