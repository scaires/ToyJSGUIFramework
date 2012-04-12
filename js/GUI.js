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
  var myMouseOverViewIds;

  //privileged
  this.init = function(canvas) 
  {
    myViewIndex = 0;
    myViews = {};
    myMouseOverViewIds = [];
    myCanvas = canvas;
    myContext = myCanvas.getContext("2d");
    myCanvas.addEventListener('mousedown',   GUIMouseEvent.bind(this, this.onMouseDown), false);
    myCanvas.addEventListener('mouseup',  GUIMouseEvent.bind(this, this.onMouseUp), false);
    myCanvas.addEventListener('mousemove',  GUIMouseEvent.bind(this, this.onMouseMove), false);
    isInitialized = true;
  }
  
  this.isInitialized = function()
  {
    return (myContext != undefined && myLayout != undefined); 
  }
  
  this.inflate = function(viewJSON)
  {
    if (viewJSON)
    {
      var k = eval(viewJSON.klass);
      if (k)
      {
        var v = new k(this);
        if (v)
        {
          v.inflate(viewJSON);
          return v;
        }
      }
    }
    return undefined;
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
    for (var i = 0; i < myViews.length; i++) 
    {
      var view = myViews[i];
      if (view.name === name)
      {
        return view;
      }
    }
    return undefined;
  }

  this.getContext = function()
  {
    return myContext;
  }

  this.getCanvas = function()
  {
    return myCanvas;
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
  
  this.drawRect = function(x, y, width, height, filled, color, borderSize)
  {
    if (filled)
    {
      myContext.fillStyle = color;
      myContext.fillRect(x, y, width, height);
    }
    else
    {
      myContext.lineWidth = borderSize;
      myContext.strokeStyle = color;
      myContext.strokeRect(x+borderSize/2, y+borderSize/2, width - borderSize, height - borderSize);
    }
  }

  this.drawText = function(text, x, y, maxWidth, maxHeight, color, textSize, font, bold)
  {
    boldText = "";
    if (bold)
    {
      boldText = "bold";
    }
    myContext.font = boldText + (textSize.toString() + "px " + font);
    myContext.fillStyle = color;
    myContext.textBaseline = "top";
    var correctedX = x;
    var correctedY = y;
    var textWidth = myContext.measureText(text).width;
    if (textWidth < maxWidth)
    {
      correctedX = x + (maxWidth - textWidth)/2;
    }
    if (textSize < maxHeight)
    {
      correctedY = y + (maxHeight - textSize)/2;
    }
    if (maxWidth > 0) 
    {
      myContext.fillText(text, correctedX, correctedY, maxWidth);
    }
  }
  
  this.measureText = function(text, textSize, font, bold)
  {
    boldText = "";
    if (bold)
    {
      boldText = "bold";
    }
    myContext.font = boldText + (textSize.toString() + "px " + font);
    myContext.textBaseline = "top";
    var textWidth = myContext.measureText(text).width;
    return textWidth;
  }

  this.drawImage = function(image, x, y, width, height)
  {
    myContext.drawImage(image, x, y, width, height);
  }
  
  //event handling
  this.onMouseDown = function (x, y)
  {
    if (myContext && myLayout)
    {
      myLayout.onMouseDown(x, y, 0, 0, myCanvas.width, myCanvas.height);
    }
  }

  this.onMouseUp = function(x, y)
  {
    if (myContext && myLayout)
    {
      myLayout.onMouseUp(x, y, 0, 0, myCanvas.width, myCanvas.height);
    }
  }

  this.onMouseMove = function(x, y)
  {
    if (myContext && myLayout)
    {
      myLayout.onMouseMove(x, y, 0, 0, myCanvas.width, myCanvas.height);
    }
  }
  
  this.registerMouseOverView = function(view)
  {
    myMouseOverViewIds.push(view.getId());
  }

  this.deregisterMouseOverView = function(view)
  {
    var index = myMouseOverViewIds.indexOf(view.getId());
    if (index != -1)
    {
      myMouseOverViewIds.splice(index, 1);
    }
  }

  this.isMouseOverView = function(view)
  {
    var index = myMouseOverViewIds.indexOf(view.getId());
    if (index != -1)
    {
      return true;
    } else {
      return false;
    }
  }

  //private
  var generateViewId = function()
  {
    myViewIndex = myViewIndex + 1;
    return myViewIndex;
  }
}
/* END GUI */

/* VIEW */
function GUIView(gui)
{
  this.myGUI = gui;
  this.myName = "default";
  this.myParentId = -1;
  this.myId = 0;
  this.myMargin = 0; //margin is outside
  this.myPadding = 0; //padding is inside
  this.myGravity = 0;
  this.myBackgroundColor = "rgba(0, 0, 0, 1.0)";
  this.hasBorder = false;
  this.myBorderColor = "rgba(0, 0, 0, 1.0)";
  this.myBorderSize = 0;
  this.isVisible = true;
  this.myWidth = 0;
  this.myHeight = 0;
  this.isWidthFill = false;
  this.isWidthWrap = false;
  this.isWidthPercent = false;
  this.isHeightFill = false;
  this.isHeightWrap = false;
  this.isHeightPercent = false;
  //event listeners
  this.myMouseDownListener;
  this.myMouseUpListener;
  this.myMouseOverListener;
  this.myMouseOutListener;
  this.myMouseClickListener;
}

GUIView.prototype.init = function()
{
  this.myGUI.registerView(this);
}

GUIView.prototype.inflate = function(viewJSON)
{
  this.init();
  if (viewJSON.name)
  {
    this.setName(viewJSON.name);
  }
  if (viewJSON.background_color)
  {
    this.setBackgroundColor(viewJSON.background_color);
  }
  if (viewJSON.border_color && viewJSON.borderSize && viewJSON.borderSize.match(/^\d+(px)?$/))
  {
    this.hasBorder = true;
    this.myBorderColor = viewJSON.border_color;
    this.myBorderSize = eval(/^\d+/.exec(viewJSON.borderSize)[0])
  }
  if (viewJSON.layout_width)
  {
    //pixel width
    if (viewJSON.layout_width.match(/^\d+(px)?$/))
    {
      this.myWidth = eval(/^\d+/.exec(viewJSON.layout_width)[0]);
    //percent width
    } else if (viewJSON.layout_width.match(/^\d+%$/)) {
      this.myWidth = eval(/^\d+/.exec(viewJSON.layout_width)[0]);
      this.isWidthPercent = true;        
    } else if (viewJSON.layout_width === "wrap_content") {
      this.isWidthWrap = true;
    } else if (viewJSON.layout_width === "fill_parent") {
      this.isWidthFill = true;
    }
  }
  if (viewJSON.layout_height)
  {
    //pixel height
    if (viewJSON.layout_height.match(/^\d+(px)?$/))
    {
      this.myHeight = eval(/^\d+/.exec(viewJSON.layout_height)[0])
    //percent height
    } else if (viewJSON.layout_height.match(/^\d+%$/)) {
      this.myHeight = eval(/^\d+/.exec(viewJSON.layout_height)[0])
      this.isHeightPercent = true;        
    } else if (viewJSON.layout_height === "wrap_content") {
      this.isHeightWrap = true;
    } else if (viewJSON.layout_height === "fill_parent") {
      this.isHeightFill = true;
    }
  }
  if (viewJSON.layout_gravity)
  {
    this.setGravity(viewJSON.layout_gravity);
  }
  if (viewJSON.padding && viewJSON.padding.match(/^\d+(px)?$/))
  {
    this.myPadding = eval(/^\d+/.exec(viewJSON.padding)[0]);
  }
  if (viewJSON.layout_margin && viewJSON.layout_margin.match(/^\d+(px)?$/))
  {
    this.myMargin = eval(/^\d+/.exec(viewJSON.layout_margin)[0]);
  }
  //TODO: regex to ensure a valid function
  if (viewJSON.on_mouse_down)
  {
    var fnString = viewJSON.on_mouse_down;
    this.myMouseDownListener = fnString;
  }
  if (viewJSON.on_mouse_up)
  {
    var fnString = viewJSON.on_mouse_up;
    this.myMouseUpListener = fnString;
  }
  if (viewJSON.on_mouse_over)
  {
    var fnString = viewJSON.on_mouse_over;
    this.myMouseOverListener = fnString;
  }
  if (viewJSON.on_mouse_out)
  {
    var fnString = viewJSON.on_mouse_out;
    this.myMouseOutListener = fnString;
  }
  if (viewJSON.on_mouse_click)
  {
    var fnString = viewJSON.on_mouse_click;
    this.myMouseClickListener = fnString;
  }
}

//event handling
//only override if the parent dimensions are necessary (for example, layouts testing children)
GUIView.prototype.onMouseDown = function(eventX, eventY, parentX, parentY, parentWidth, parentHeight)
{
  if (this.testBounds(eventX, eventY, parentX, parentY, parentWidth, parentHeight))
  {
    this.didMouseDown(eventX, eventY);
  }
}

GUIView.prototype.onMouseUp = function(eventX, eventY, parentX, parentY, parentWidth, parentHeight)
{
  if (this.testBounds(eventX, eventY, parentX, parentY, parentWidth, parentHeight))
  {
    this.didMouseUp(eventX, eventY);
    if (myGUI.isMouseOverView(this))
    {
      this.didMouseClick(eventX, eventY);
    }
  }
}

GUIView.prototype.onMouseMove = function(eventX, eventY, parentX, parentY, parentWidth, parentHeight)
{
  if (this.testBounds(eventX, eventY, parentX, parentY, parentWidth, parentHeight))
  {
    myGUI.registerMouseOverView(this);
    this.didMouseOver(eventX, eventY);
  } else if (myGUI.isMouseOverView(this) && 
    !this.testBounds(eventX, eventY, parentX, parentY, parentWidth, parentHeight)) {
    myGUI.deregisterMouseOverView(this);
    this.didMouseOut(eventX, eventY);
  }
}

//override to get basic functionality after the event occurs (for example, a mouseover effect for a button)
GUIView.prototype.didMouseDown = function(eventX, eventY)
{
  if (this.myMouseDownListener)
  {
    var fn = eval(this.myMouseDownListener);
    fn(this, eventX, eventY);
  }
}

GUIView.prototype.didMouseUp = function(eventX, eventY)
{
  if (this.myMouseUpListener)
  {
    var fn = eval(this.myMouseUpListener);
    fn(this, eventX, eventY);
  }
}

GUIView.prototype.didMouseOver = function(eventX, eventY)
{
  if (this.myMouseOverListener)
  {
    var fn = eval(this.myMouseOverListener);
    fn(this, eventX, eventY);
  }
}

GUIView.prototype.didMouseOut = function(eventX, eventY)
{
  if (this.myMouseOutListener)
  {
    var fn = eval(this.myMouseOutListener);
    fn(this, eventX, eventY);
  }
}

GUIView.prototype.didMouseClick = function(eventX, eventY)
{
  if (this.myMouseClickListener)
  {
    var fn = eval(this.myMouseClickListener);
    fn(this, eventX, eventY);
  }
}

//properties
GUIView.prototype.setId = function(id)
{
  this.myId = id;
}

GUIView.prototype.getId = function()
{
  return this.myId;
}

GUIView.prototype.setParent = function(view)
{
  this.myParentId = view.getId();
}

GUIView.prototype.getParent = function()
{
  if (this.myParentId != -1)
  {
    return myGUI.findViewById(this.myParentId);
  } else {
    return undefined;
  }
  
  this.myParentId = view.getId();
}

GUIView.prototype.setName = function(name)
{
  if (name)
  {
    this.myName = name;
  }
}

GUIView.prototype.getName = function()
{
  return this.myName;
}

GUIView.prototype.setVisible = function(visible)
{
  this.isVisible = visible;
}

GUIView.prototype.setBackgroundColor = function(color)
{
  if (color)
  {
    this.myBackgroundColor = color;
  }
}

GUIView.prototype.setBorderColor = function(color)
{
  if (color)
  {
    this.myBorderColor = color;
  }
}

GUIView.prototype.setGravity = function(gravity)
{
  switch(gravity)
  {
    case "center":
      this.myGravity = GUI_LAYOUT_GRAVITY_CENTER;
      break;
    case "top":
      this.myGravity = GUI_LAYOUT_GRAVITY_TOP;
      break;
    case "topright":
      this.myGravity = GUI_LAYOUT_GRAVITY_TOPRIGHT;
      break;
    case "right":
      this.myGravity = GUI_LAYOUT_GRAVITY_RIGHT;
      break;
    case "bottomright":
      this.myGravity = GUI_LAYOUT_GRAVITY_BOTTOMRIGHT;
      break;
    case "bottom":
      this.myGravity = GUI_LAYOUT_GRAVITY_BOTTOM;
      break;
    case "bottomleft":
      this.myGravity = GUI_LAYOUT_GRAVITY_BOTTOMLEFT;
      break;
    case "left":
      this.myGravity = GUI_LAYOUT_GRAVITY_LEFT;
      break;
    case "topleft":
      this.myGravity = GUI_LAYOUT_GRAVITY_TOPLEFT;
      break;
    default: 
      this.myGravity = GUI_LAYOUT_GRAVITY_CENTER;
      break;
  }
}

//methods
GUIView.prototype.measureX = function(x, width)
{
  if (this.isWidthFill)
  {
    return width - this.myMargin*2;
  } else if (this.isWidthWrap) {
    var contentWidth = Math.min(this.measureContentWidth(), width);
    return contentWidth - this.myMargin*2;
  } else if (this.isWidthPercent) {
    var contentWidth = Math.min((this.myWidth / 100.0) * (this.myGUI.getCanvas().width), width);
    return contentWidth - this.myMargin*2;
  } else {
    var contentWidth = Math.min(this.myWidth, width);
    return contentWidth - this.myMargin*2;
  }
}

GUIView.prototype.measureY = function(y, height)
{
  if (this.isHeightFill)
  {
    return height - this.myMargin*2;
  } else if (this.isHeightWrap) {
    var contentHeight = Math.min(this.measureContentHeight(), height);
    return contentHeight - this.myMargin*2;
  } else if (this.isHeightPercent) {
    var contentHeight = Math.min((this.myHeight / 100.0) * (this.myGUI.getCanvas().height), height);
    return contentHeight - this.myMargin*2;
  } else {
    var contentHeight = Math.min(this.myHeight, height);
    return contentHeight - this.myMargin*2;
  }
}

GUIView.prototype.offsetX = function(x, width)
{
  var contentWidth = this.measureX(x, width);
  if (this.myGravity == GUI_LAYOUT_GRAVITY_CENTER || this.myGravity == GUI_LAYOUT_GRAVITY_TOP || this.myGravity == GUI_LAYOUT_GRAVITY_BOTTOM)
  {
    return x + this.myMargin + ((width - this.myMargin*2 - contentWidth)/2);
  } else if (this.myGravity == GUI_LAYOUT_GRAVITY_RIGHT || this.myGravity == GUI_LAYOUT_GRAVITY_TOPRIGHT || this.myGravity == GUI_LAYOUT_GRAVITY_BOTTOMRIGHT) {
    return x + this.myMargin + (width - this.myMargin*2 - contentWidth);
  } else {
    return x + this.myMargin;
  }
}

GUIView.prototype.offsetY = function(y, height)
{
  var contentHeight = this.measureY(y, height);
  if (this.myGravity == GUI_LAYOUT_GRAVITY_CENTER || this.myGravity == GUI_LAYOUT_GRAVITY_RIGHT || this.myGravity == GUI_LAYOUT_GRAVITY_LEFT)
  {
    return y + this.myMargin + ((height - this.myMargin*2 - contentHeight)/2);
  } else if (this.myGravity == GUI_LAYOUT_GRAVITY_TOP || this.myGravity == GUI_LAYOUT_GRAVITY_TOPRIGHT || this.myGravity == GUI_LAYOUT_GRAVITY_TOPLEFT) {
    return y + this.myMargin;
  } else {
    return y + this.myMargin + (height - this.myMargin*2 - contentHeight);
  }
}

GUIView.prototype.draw = function(x, y, width, height)
{
  if (this.isVisible)
  {
    this.myGUI.drawRect(this.offsetX(x, width), this.offsetY(y, height), this.measureX(x, width), this.measureY(y, height), true, this.myBackgroundColor);
    this.drawBorder(x, y, width, height);
  }
}

GUIView.prototype.drawBorder = function(x, y, width, height)
{
  if (this.hasBorder)
  {
    this.myGUI.drawRect(this.offsetX(x, width), this.offsetY(y, height), this.measureX(x, width), this.measureY(y, height), false, this.myBorderColor, this.myBorderSize);
  }
}

GUIView.prototype.measureContentWidth = function()
{
  if (!this.isWidthPercent && !this.isWidthFill && !this.isWidthWrap)
  {
    return this.myWidth;
  } else if (this.isWidthPercent) {
    return (this.myWidth / 100.0) * (this.myGUI.getCanvas().width);
  } else {
    return 0;
  }
}

GUIView.prototype.measureContentHeight = function()
{
  if (!this.isHeightPercent && !this.isHeightFill && !this.isHeightWrap)
  {
    return this.myHeight;
  } else if (this.isHeightPercent) {
    return (this.myHeight / 100.0) * (this.myGUI.getCanvas().height)
  } else {
    return 0;
  }
}

GUIView.prototype.testBounds = function(eventX, eventY, parentX, parentY, parentWidth, parentHeight)
{
  var myX = this.offsetX(parentX, parentWidth);
  var myY = this.offsetY(parentY, parentHeight);
  var myWidth = this.measureX(parentX, parentWidth);
  var myHeight = this.measureY(parentY, parentHeight);
  return (eventX >= myX && eventX <= myX + myWidth && eventY >= myY && eventY <= myY + myHeight);
}
/* END VIEW */

/* LAYOUT */
function GUILayout(gui)
{
  this.myGUI = gui;
  this.myChildren = [];
}

GUILayout.inheritsFrom(GUIView);

GUILayout.prototype.init = function()
{
  GUILayout.prototype.parent.init.call(this);
  this.myBackgroundColor = "rgba(0,0,0,0)";
  this.clear();
}

GUILayout.prototype.addChild = function(view)
{
  view.setParent(this);
  this.myChildren.push(view);
}

GUILayout.prototype.clear = function()
{
  this.myChildren = [];
}

GUILayout.prototype.getChildren = function()
{
  var tempChildren = [];
  for (var i = 0; i < this.myChildren.length; i++) 
  {
    var child = this.myChildren[i];
    tempChildren.push(child)
  }
  return tempChildren;
}

GUILayout.prototype.onMouseDown = function(eventX, eventY, parentX, parentY, parentWidth, parentHeight)
{
  GUILayout.prototype.parent.onMouseDown.call(this, eventX, eventY, parentX, parentY, parentWidth, parentHeight);
  for (var i = 0; i < this.myChildren.length; i++) 
  {
    var child = this.myChildren[i];
    var myX = this.offsetX(parentX, parentWidth);
    var myY = this.offsetY(parentY, parentHeight);
    var myWidth = this.measureX(parentX, parentWidth);
    var myHeight = this.measureY(parentY, parentHeight);
    rect = this.childRect(myX, myY, myWidth, myHeight, i);
    if (child.testBounds(eventX, eventY, rect.x, rect.y, rect.width, rect.height))
    {
      child.onMouseDown(eventX, eventY, rect.x, rect.y, rect.width, rect.height);
    }
  }
}

//unfinished
GUILayout.prototype.onMouseUp = function(eventX, eventY, parentX, parentY, parentWidth, parentHeight)
{
  GUILayout.prototype.parent.onMouseUp.call(this, eventX, eventY, parentX, parentY, parentWidth, parentHeight);
  for (var i = 0; i < this.myChildren.length; i++) 
  {
    var child = this.myChildren[i];
    var myX = this.offsetX(parentX, parentWidth);
    var myY = this.offsetY(parentY, parentHeight);
    var myWidth = this.measureX(parentX, parentWidth);
    var myHeight = this.measureY(parentY, parentHeight);
    rect = this.childRect(myX, myY, myWidth, myHeight, i);
    if (child.testBounds(eventX, eventY, rect.x, rect.y, rect.width, rect.height))
    {
      child.onMouseUp(eventX, eventY, rect.x, rect.y, rect.width, rect.height);
    }
  }
}

//unfinished
GUILayout.prototype.onMouseMove = function(eventX, eventY, parentX, parentY, parentWidth, parentHeight)
{
  GUILayout.prototype.parent.onMouseMove.call(this, eventX, eventY, parentX, parentY, parentWidth, parentHeight);
  for (var i = 0; i < this.myChildren.length; i++) 
  {
    var child = this.myChildren[i];
    var myX = this.offsetX(parentX, parentWidth);
    var myY = this.offsetY(parentY, parentHeight);
    var myWidth = this.measureX(parentX, parentWidth);
    var myHeight = this.measureY(parentY, parentHeight);
    rect = this.childRect(myX, myY, myWidth, myHeight, i);
    if (myGUI.isMouseOverView(child) || child.testBounds(eventX, eventY, rect.x, rect.y, rect.width, rect.height))
    {
      child.onMouseMove(eventX, eventY, rect.x, rect.y, rect.width, rect.height);
    }
  }
}

//Override
GUILayout.prototype.inflate = function(viewJSON)
{
  GUILayout.prototype.parent.inflate.call(this, viewJSON);
  if (viewJSON.layout_children)
  {
    for (var i = 0; i < viewJSON.layout_children.length; i++) 
    {
      var childJSON = viewJSON.layout_children[i];
      var child = this.myGUI.inflate(childJSON);
      if (child)
      {
        this.addChild(child);
      }
    }
  }
}

//Override
GUILayout.prototype.measureContentHeight = function()
{
  if (this.isHeightWrap)
  {
    var height = 0;
    for (var i = 0; i < this.myChildren.length; i++) 
    {
      var child = this.myChildren[i];
      var childHeight = child.measureContentHeight();
      if (childHeight > height)
      {
        height = childHeight + this.myPadding;
      }
    }
    return height + this.myPadding;
  } else {
    return GUILayout.prototype.parent.measureContentHeight.call(this);
  }
}

//Override
GUILayout.prototype.measureContentWidth = function()
{
  if (this.isWidthWrap)
  { 
    var width = 0;
    for (var i = 0; i < this.myChildren.length; i++) 
    {
      var child = this.myChildren[i];
      var childWidth = child.measureContentWidth();
      if (childWidth > width)
      {
        width = childWidth + this.myPadding;
      }
    }
    return width + this.myPadding;
  } else {
    return GUILayout.prototype.parent.measureContentWidth.call(this);
  }
}

GUILayout.prototype.childRect = function(x, y, width, height, index)
{
  var rect = {
      x : this.offsetX(x, width), 
      y : this.offsetY(y, height), 
      width : this.measureX(x, width), 
      height : this.measureY(y, height)
  };
  return rect;
}

//Override
GUILayout.prototype.draw = function(x, y, width, height){ 
  this.drawBG(x, y, width, height);
  for (var i = 0; i < this.myChildren.length; i++) 
  {
    var child = this.myChildren[i];
    if (child.isVisible) 
    {
      rect = this.childRect(x, y, width, height, i);
      child.draw(rect.x, rect.y, rect.width, rect.height);
    }
  }
}

GUILayout.prototype.drawBG = function(x, y, width, height)
{
  GUILayout.prototype.parent.draw.call(this, x, y, width, height);
}
/* END LAYOUT */

/* LINEARLAYOUT */
function GUILinearLayout(gui)
{
  this.myGUI = gui;
  this.myOrientation = GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL;
}

GUILinearLayout.inheritsFrom(GUILayout);

GUILinearLayout.prototype.setOrientation = function(orientation)
{
  if (orientation)
  {
    if (orientation === "vertical")
    {
      this.myOrientation = GUI_LINEARLAYOUT_ORIENTATION_VERTICAL;
    } else if (orientation === "horizontal") {
      this.myOrientation = GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL;
    }
  }
}

//Override
GUILinearLayout.prototype.inflate = function(viewJSON)
{
  GUILinearLayout.prototype.parent.inflate.call(this, viewJSON);
  if (viewJSON.layout_orientation)
  {
    this.setOrientation(viewJSON.layout_orientation);
  }
}

//Override
GUILinearLayout.prototype.measureContentHeight = function()
{
  if (this.isHeightWrap)
  {
    var height = 0;
    for (var i = 0; i < this.myChildren.length; i++) 
    {
      var child = this.myChildren[i];
      var childHeight = child.measureContentHeight();
      if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_VERTICAL)
      {
        height = height + childHeight + this.myPadding;
      } else if (childHeight > height)
      {
        height = childHeight + this.myPadding;
      }
    }
    return height + this.myPadding;
  } else {
    return GUILinearLayout.prototype.parent.measureContentHeight.call(this);
  }
}

//Override
GUILinearLayout.prototype.measureContentWidth = function()
{
  if (this.isWidthWrap)
  {
    var width = 0;
    for (var i = 0; i < this.myChildren.length; i++) 
    {
      var child = this.myChildren[i];
      var childWidth = child.measureContentWidth();
      if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL)
      {
        width = width + childWidth + this.myPadding;
      } else if (childWidth > width)
      {
        width = childWidth + this.myPadding;
      }
    }
    return width + this.myPadding;
  } else {
    return GUILinearLayout.prototype.parent.measureContentWidth.call(this);
  }
}

//override
GUILinearLayout.prototype.childRect = function(x, y, width, height, index)
{
  var offsetX = this.myPadding;
  var offsetY = this.myPadding;

  for (var i = 0; i < this.myChildren.length; i++) 
  {
    var child = this.myChildren[i];
    var childOffsetX = 0;
    var childOffsetY = 0;
    var childWidth = 0;
    var childHeight = 0;
    var parentX = this.offsetX(x, width);
    var parentY = this.offsetY(y, height);
    var parentWidth = this.measureX(x, width);
    var parentHeight = this.measureY(y, height);
    if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_VERTICAL)
    {
      childOffsetX = parentX;
      childOffsetY = child.offsetY(parentY + offsetY, child.measureContentHeight());
      childWidth = parentWidth;
      childHeight = child.measureY(parentY + offsetY, parentHeight);
    } else if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL) {
      childOffsetX = child.offsetX(parentX + offsetX, child.measureContentWidth());
      childOffsetY = parentY;
      childWidth = child.measureX(parentX + offsetX, parentWidth);
      childHeight = parentHeight;
    }

    if (childOffsetX + childWidth > x + width)
    {
      if (childOffsetX < x + width)
      {
        childWidth = x + width - (childOffsetX);
      } else {
        childWidth = 0;
      }
    }

    if (childOffsetY + childHeight > parentY + parentHeight)
    {
      if (childOffsetY < parentY + parentHeight)
      {
        childHeight = parentY + parentHeight - (childOffsetY);
      } else {
        childHeight = 0;
      }
    }

    if (child.isVisible) 
    {
      if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_VERTICAL)
      {
        if (index == i)
        {
          return {
            x : parentX,
            y : parentY + offsetY,
            width : parentWidth,
            height : childHeight
          }
        }
      } else if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL) {
        if (index == i)
        {
          return {
            x : parentX + offsetX,
            y : parentY,
            width : childWidth,
            height : parentHeight
          }
        }
      }
    }

    if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_VERTICAL)
    {
      offsetY = offsetY + childHeight + this.myPadding;
    } else if (this.myOrientation == GUI_LINEARLAYOUT_ORIENTATION_HORIZONTAL) {
      offsetX = offsetX + childWidth + this.myPadding;
    }
  }
}

//Override
GUILinearLayout.prototype.draw = function(x, y, width, height){ 
  GUILinearLayout.prototype.parent.drawBG.call(this, x, y, width, height);

  for (var i = 0; i < this.myChildren.length; i++) 
  {
    var child = this.myChildren[i];
    if (child.isVisible) 
    {
      rect = this.childRect(x, y, width, height, i);
      child.draw(rect.x, rect.y, rect.width, rect.height);
    }
  }
}

/* END LINEARLAYOUT */

/* TEXTVIEW */
function GUITextView(gui)
{
  this.myGUI = gui;
  this.myText = "";
  this.myTextColor = "rgb(0,0,0)";
  this.myBackgroundColor = "rgba(0, 0, 0, 0)";
  this.myTextSize = 10;
  this.myFont = "Arial",
  this.isTextBold = false;
}
GUITextView.inheritsFrom(GUIView);
//Override
GUITextView.prototype.inflate = function(viewJSON)
{
  GUITextView.prototype.parent.inflate.call(this, viewJSON);
  if (viewJSON.text) 
  {
    this.myText = viewJSON.text;
    if (viewJSON.textColor) 
    {
      this.myTextColor = viewJSON.textColor;
    }
    if (viewJSON.textSize && viewJSON.textSize.match(/^\d+(px)?$/))
    {
      this.myTextSize = eval(/^\d+/.exec(viewJSON.textSize)[0])
    }
    if (viewJSON.isTextBold && viewJSON.isTextBold === "true" || viewJSON.isTextBold === "false")
    {
      this.myTextSize = eval(viewJSON.isTextBold);
    }
    if (viewJSON.textFont)
    {
      this.myFont = viewJSON.textFont;
    }
  }
}

//Override
GUITextView.prototype.measureContentWidth = function()
{
  return this.myPadding * 2 + this.myGUI.measureText(this.myText, this.myTextSize, this.myFont, this.isTextBold);
}

//Override
GUITextView.prototype.measureContentHeight = function()
{
  return this.myPadding * 2 + this.myTextSize;
}

//Override
GUITextView.prototype.draw = function(x, y, width, height)
{ 
  GUITextView.prototype.parent.draw.call(this, x, y, width, height);
  this.myGUI.drawText(this.myText, x + this.myPadding, y + this.myPadding, width - this.myPadding*2, height - this.myPadding*2,
    this.myTextColor, this.myTextSize, this.myFont, this.isTextBold);
}

/* END TEXTVIEW */

/* IMAGEVIEW */
function GUIImageView(gui)
{
  this.myGUI = gui;
  this.isLoaded = false;
  this.myImageSrc = "";
  this.myImage;
}
GUIImageView.inheritsFrom(GUIView);

GUIImageView.prototype.init = function()
{
  GUIImageView.prototype.parent.init.call(this);
  this.myBackgroundColor = "rgba(0,0,0,0)";
  this.isLoaded = false;
  this.myImageSrc = "";
  this.myImage = new Image();

  //closure allows onload callback
  var myImage = this;
  this.myImage.onload = function() {myImage.onLoad()};
}

//Override
GUIImageView.prototype.inflate = function(viewJSON)
{
  GUIImageView.prototype.parent.inflate.call(this, viewJSON);
  if (viewJSON.image_src) 
  {
    this.setImageSrc(viewJSON.image_src);
  }
}

GUIImageView.prototype.setImageSrc = function(path)
{
  this.myImageSrc = path;
  this.myImage.src = path;
}

GUIImageView.prototype.loaded = function()
{
  if (this.isLoaded)
  {
    return this.myImage.complete;
  } else {
    return this.isLoaded;
  }
}

GUIImageView.prototype.onLoad = function()
{
  this.isLoaded = true;
  return true;
}

//Override
GUIImageView.prototype.measureContentWidth = function()
{
  if (this.loaded())
  {
    return this.myPadding * 2 + this.myImage.width;
  } else {
    return GUIImageView.prototype.parent.measureContentWidth.call(this);
  }
}

//Override
GUIImageView.prototype.measureContentHeight = function()
{
  if (this.loaded())
  {
    return this.myPadding * 2 + this.myImage.height;;
  } else {
    return GUIImageView.prototype.parent.measureContentHeight.call(this);
  }
}

//Override
GUIImageView.prototype.draw = function(x, y, width, height)
{
  GUIImageView.prototype.parent.draw.call(this, x, y, width, height);
  if (this.loaded())
  {
    this.myGUI.drawImage(this.myImage, this.offsetX(x, width), this.offsetY(y, height), this.measureX(x, width), this.measureY(y, height));
  }
  this.drawBorder(x, y, width, height);
}

/* END IMAGEVIEW */

/* BUTTONVIEW */
function GUIButtonView(gui)
{
  this.myGUI = gui;
  this.depressed = false;
  this.mouseOver = false;
  this.showMouseOver = true;
  this.showMouseDown = true;
}
GUIButtonView.inheritsFrom(GUITextView);

//Override
GUIButtonView.prototype.inflate = function(viewJSON)
{
  GUIButtonView.prototype.parent.inflate.call(this, viewJSON);
  if (viewJSON.show_mouse_over) 
  {
    this.showMouseOver = eval(viewJSON.show_mouse_over);
  }
  if (viewJSON.show_mouse_down) 
  {
    this.showMouseDown = eval(viewJSON.show_mouse_down);
  }
}

GUIButtonView.prototype.didMouseDown = function(eventX, eventY)
{
  this.depressed = true;
}

GUIButtonView.prototype.didMouseUp = function(eventX, eventY)
{
  this.depressed = false;
}

GUIButtonView.prototype.didMouseOver = function(eventX, eventY)
{
  this.mouseOver = true;
}

GUIButtonView.prototype.didMouseOut = function(eventX, eventY)
{
  this.mouseOver = false;
}

GUIButtonView.prototype.draw = function(x, y, width, height)
{
  GUIButtonView.prototype.parent.draw.call(this, x, y, width, height);
  if (this.depressed && this.showMouseDown)
  {
    this.myGUI.drawRect(this.offsetX(x, width), this.offsetY(y, height), this.measureX(x, width), this.measureY(y, height), true, "rgba(0,0,0,0.1)");
  } else if (this.mouseOver && this.showMouseOver) {
    this.myGUI.drawRect(this.offsetX(x, width), this.offsetY(y, height), this.measureX(x, width), this.measureY(y, height), true, "rgba(255,255,255,0.1)");
  }
  this.drawBorder(x, y, width, height);
}
/* END BUTTONVIEW */

/* CHECKBOX */
function GUICheckBoxView(gui)
{
  this.myGUI = gui;
}
GUICheckBoxView.inheritsFrom(GUIButtonView);
/* END CHECKBOX */