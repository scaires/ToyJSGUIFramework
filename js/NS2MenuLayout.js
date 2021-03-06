/* NS2 Styled Menu */

/* GUI JSON */
LayoutB = {
  name : "menuLayout",
  klass : "GUILayout",
  background_color : "rgba(0,0,0,0.5)",
  layout_width : "fill_parent",
  layout_height : "fill_parent",
  border_color : "rgb(0,0,0)",
  border_size : "10px",
  on_load : "onLoad",
  layout_children : [
    {
      klass : "GUIImageView",
      layout_width : "fill_parent",
      layout_height : "fill_parent",
      image_src : "img/nsbg.png"
    },
    {
      klass : "GUILayout",
      layout_width : "75%",
      layout_height : "fill_parent",
      layout_margin : "10px",
      layout_children : [
        {
          klass : "GUIImageView",
          layout_width : "wrap_content",
          layout_height : "wrap_content",
          layout_gravity : "top",
          image_src : "img/ns2logo.png"
        },
        //center box
        {
          klass : "GUILayout",
          layout_width : "fill_parent",
          layout_height : "60%",
          layout_gravity : "center",
          background_color : "rgba(0,0,0,0)",
          layout_children : [
            {
              //button container
              name : "buttonContainer",
              klass : "GUILinearLayout",
              layout_width : "wrap_content",
              layout_height : "wrap_content",
              layout_gravity : "top",
              layout_orientation : "horizontal",
              background_color : "rgba(0,0,0,0)",
              padding : "15px",
              layout_children : [
                //join button
                {
                  klass : "GUILayout",
                  layout_width : "wrap_content",
                  layout_height : "wrap_content",
                  layout_gravity : "left", 
                  background_color : "rgba(16,16,16,0.95)",
                  on_mouse_over : "menuButtonOnMouseOver",
                  on_mouse_out : "menuButtonOnMouseOut",
                  layout_children : [
                    {
                      klass : "GUILinearLayout",
                      layout_width : "wrap_content",
                      layout_height : "wrap_content",
                      layout_orientation : "vertical",
                      layout_children : [
                        {
                          klass : "GUIImageView",
                          layout_width : "wrap_content",
                          layout_height : "wrap_content",
                          image_src : "img/ns2joinbutton.png"
                        },
                        {
                          klass : "GUITextView",
                          layout_width : "fill_parent",
                          layout_height : "wrap_content",
                          padding : "5px",
                          text : "Join",
                          textSize : "15px",
                          textFont : "Arial",
                          textBold : "true",
                          textColor : "rgb(255,255,255)"
                        }
                      ]
                    },
                    {
                      klass : "GUIButtonView",
                      layout_width : "fill_parent",
                      layout_height : "fill_parent",
                      background_color : "rgba(0,0,0,0)",
                      border_color : "rgba(100,100,100,0.5)",
                      border_size : "2px",
                      on_mouse_click : "joinButtonOnMouseClick"
                    }
                  ]
                },
                //create button
                {
                  klass : "GUILayout",
                  layout_width : "wrap_content",
                  layout_height : "wrap_content",
                  layout_gravity : "left",
                  background_color : "rgba(16,16,16,0.95)",
                  on_mouse_over : "menuButtonOnMouseOver",
                  on_mouse_out : "menuButtonOnMouseOut",
                  layout_children : [
                    {
                      klass : "GUILinearLayout",
                      layout_width : "wrap_content",
                      layout_height : "wrap_content",
                      layout_orientation : "vertical",
                      layout_children : [
                        {
                          klass : "GUIImageView",
                          layout_width : "fill_parent",
                          layout_height : "wrap_content",
                          image_src : "img/ns2createbutton.png"
                        },
                        {
                          klass : "GUITextView",
                          layout_width : "fill_parent",
                          layout_height : "wrap_content",
                          padding : "5px",
                          text : "Create",
                          textSize : "15px",
                          textFont : "Arial",
                          textBold : "true",
                          textColor : "rgb(255,255,255)"
                        }
                      ]
                    },
                    {
                      klass : "GUIButtonView",
                      layout_width : "fill_parent",
                      layout_height : "fill_parent",
                      background_color : "rgba(0,0,0,0)",
                      border_color : "rgba(100,100,100,0.5)",
                      border_size : "2px",
                      on_mouse_click : "createButtonOnMouseClick"
                    }
                  ]
                },
                //options button
                {
                  klass : "GUILayout",
                  layout_width : "wrap_content",
                  layout_height : "wrap_content",
                  layout_gravity : "left",
                  background_color : "rgba(16,16,16,0.95)",
                  on_mouse_over : "menuButtonOnMouseOver",
                  on_mouse_out : "menuButtonOnMouseOut",
                  layout_children : [
                    {
                      klass : "GUILinearLayout",
                      layout_width : "wrap_content",
                      layout_height : "wrap_content",
                      layout_orientation : "vertical",
                      layout_children : [
                        {
                          klass : "GUIImageView",
                          layout_width : "fill_parent",
                          layout_height : "wrap_content",
                          image_src : "img/ns2optionsbutton.png"
                        },
                        {
                          klass : "GUITextView",
                          layout_width : "fill_parent",
                          layout_height : "wrap_content",
                          padding : "5px",
                          text : "Options",
                          textSize : "15px",
                          textFont : "Arial",
                          textBold : "true",
                          textColor : "rgb(255,255,255)"
                        }
                      ]
                    },
                    {
                      klass : "GUIButtonView",
                      layout_width : "fill_parent",
                      layout_height : "fill_parent",
                      background_color : "rgba(0,0,0,0)",
                      border_color : "rgba(100,100,100,0.5)",
                      border_size : "2px",
                      on_mouse_click : "optionsButtonOnMouseClick"
                    }
                  ]
                },
                //exit button
                {
                  klass : "GUILayout",
                  layout_width : "wrap_content",
                  layout_height : "wrap_content",
                  layout_gravity : "left",           
                  background_color : "rgba(16,16,16,0.95)",
                  on_mouse_over : "menuButtonOnMouseOver",
                  on_mouse_out : "menuButtonOnMouseOut",
                  layout_children : [
                    {
                      klass : "GUILinearLayout",
                      layout_width : "wrap_content",
                      layout_height : "wrap_content",
                      layout_orientation : "vertical",
                      layout_children : [
                        {
                          klass : "GUIImageView",
                          layout_width : "fill_parent",
                          layout_height : "wrap_content",
                          image_src : "img/ns2exitbutton.png"
                        },
                        {
                          klass : "GUITextView",
                          layout_width : "fill_parent",
                          layout_height : "wrap_content",
                          padding : "5px",
                          text : "Exit",
                          textSize : "15px",
                          textFont : "Arial",
                          textBold : "true",
                          textColor : "rgb(255,255,255)"
                        }
                      ]
                    },
                    {
                      klass : "GUIButtonView",
                      layout_width : "fill_parent",
                      layout_height : "fill_parent",
                      background_color : "rgba(0,0,0,0)",
                      border_color : "rgba(100,100,100,0.5)",
                      border_size : "2px",
                      on_mouse_click : "exitButtonOnMouseClick"
                    }
                  ]
                }
              ]
            },
            {
              klass : "GUILinearLayout",
              layout_width : "wrap_content",
              layout_height : "20px",
              layout_orientation : "horizontal",
              layout_gravity : "center",
              layout_children : [
                {
                  klass : "GUITextView",
                  text : "Welcome back, ",
                  textSize : "20px",
                  textFont : "Arial",
                  textBold : "true",
                  textColor : "rgba(255,255,255,1.0)",
                  layout_width : "wrap_content",
                  layout_height : "fill_parent",
                  layout_gravity : "left"
                },
                {
                  name : "textBoxName",
                  klass : "GUITextView",
                  text : "[IAM] The Captain",
                  textSize : "20px",
                  textFont : "Arial",
                  textColor : "#F88017",
                  layout_width : "wrap_content",
                  layout_height : "fill_parent",
                  layout_gravity : "left"
                }
              ]
            },
            {
              klass : "GUILayout",
              layout_width : "wrap_content",
              layout_height : "wrap_content",
              layout_gravity : "bottom",
              layout_children : [
                {
                  name : "whaleLayout",
                  klass : "GUILinearLayout",
                  layout_width : "wrap_content",
                  layout_height : "wrap_content",
                  layout_orientation : "vertical",
                  layout_gravity : "bottom",
                  padding : "10px",
                  background_color : "rgba(0,0,0,0.5)",
                  visible : "false",
                  layout_children : [
                    {
                      klass : "GUITextView",
                      text : "A wizard has turned you into a whale.",
                      textSize : "20px",
                      textFont : "Arial",
                      textColor : "#FFFFFF",
                      layout_width : "wrap_content",
                      layout_height : "3%",
                      layout_gravity : "left"
                    },
                    {
                      klass : "GUIView",
                      layout_width : "fill_parent",
                      layout_height : "3%",
                      background_color : "rgba(0,0,0,0)"
                    },
                    {
                      klass : "GUITextView",
                      text : "Is this awesome?",
                      textSize : "20px",
                      textFont : "Arial",
                      textColor : "#FFFFFF",
                      layout_width : "wrap_content",
                      layout_height : "3%",
                      layout_gravity : "left"
                    },
                    {
                      klass : "GUIView",
                      layout_width : "fill_parent",
                      layout_height : "3%",
                      background_color : "rgba(0,0,0,0)"
                    },
                    {
                      klass : "GUILinearLayout",
                      layout_width : "wrap_content",
                      layout_height : "wrap_content",
                      layout_orientation : "horizontal",
                      padding : "5px",
                      layout_gravity : "center",
                      layout_children : [
                        {
                          name : "checkboxyes",
                          klass : "GUICheckBoxView",
                          background_color : "rgba(0, 0, 0, 0.75)",
                          border_color : "rgba(0, 0, 0, 1)",
                          border_size : "5px",
                          layout_width : "25px",
                          layout_height : "25px",
                          checkbox_color : "#F88017",
                          layout_gravity : "left",
                          on_checked : "yesCheckboxChecked"
                        },
                        {
                          name : "textBoxName",
                          klass : "GUITextView",
                          text : "Y /",
                          textSize : "20px",
                          textFont : "Arial",
                          textColor : "#FFFFFF",
                          layout_width : "wrap_content",
                          layout_height : "wrap_content",
                          layout_gravity : "left"
                        },
                        {
                          name : "checkboxno",
                          klass : "GUICheckBoxView",
                          background_color : "rgba(0, 0, 0, 0.75)",
                          border_color : "rgba(0, 0, 0, 1)",
                          border_size : "5px",
                          layout_width : "25px",
                          layout_height : "25px",
                          checkbox_color : "#F88017",
                          layout_gravity : "left",
                          on_checked : "noCheckboxChecked"
                        },
                        {
                          name : "textBoxName",
                          klass : "GUITextView",
                          text : "N",
                          textSize : "20px",
                          textFont : "Arial",
                          textColor : "#FFFFFF",
                          layout_width : "wrap_content",
                          layout_height : "wrap_content",
                          layout_gravity : "left"
                        },
                      ]
                    }
                  ]
                },
                {
                  klass : "GUIView",
                  layout_width : "fill_parent",
                  layout_height : "fill_parent",
                  layout_gravity : "bottom",
                  background_color : "rgba(0,0,0,0)",
                  on_mouse_over : "whaleMouseover",
                  on_mouse_out : "whaleMouseout",
                }
              ]
            }
          ]
        },
        {
          klass : "GUILinearLayout",
          background_color : "rgba(0, 0, 0, 0)",
          layout_width : "fill_parent",
          layout_height : "6%",
          layout_orientation : "vertical",
          layout_gravity : "bottom",
          layout_children : [
            {
              klass : "GUITextView",
              background_color : "rgba(0, 0, 0, 0)",
              padding : "2.5px",
              text : "http://naturalselection2.com",
              textSize : "20px",
              textFont : "Arial",
              textColor : "rgba(255,255,255,0.75)",
              layout_width : "fill_parent",
              layout_height : "3%",
              layout_gravity : "top"
            },
            {
              klass : "GUITextView",
              background_color : "rgba(0, 0, 0, 0)",
              padding : "2.5px",
              text : "Copyright 2010 Unknown Worlds Entertainment, Inc",
              textSize : "20px",
              textFont : "Arial",
              textColor : "rgba(255,255,255,0.75)",
              layout_width : "fill_parent",
              layout_height : "3%",
              layout_gravity : "top"
            }
          ]
        }
      ]
    }
  ]
}

/* END GUI JSON */

/* Event Handlers */
var joinButtonOnMouseClick = function(self, x, y)
{
  alert("ERROR: Could not find servers in browser.");
  return;
}
var createButtonOnMouseClick = function(self, x, y)
{
  alert("ERROR: Could not find any games to create.");
  return;
}
var optionsButtonOnMouseClick = function(self, x, y)
{
  alert("ERROR: Options.xml not found in game directory");
  return;
}
var exitButtonOnMouseClick = function(self, x, y)
{
  alert("ERROR: Exit routine terminated.");
  return;
}
var menuButtonOnMouseOver = function(self, x, y)
{
  self.setBackgroundColor("#F88017");
  return;
}
var menuButtonOnMouseOut = function(self, x, y)
{
  self.setBackgroundColor("rgba(16,16,16,0.95)");
  return;
}
var yesCheckboxChecked = function(self)
{
  var nameBox = self.myGUI.findViewByName("textBoxName");
  nameBox.setText("[IAM] A Whale");
  var noCheckbox = self.myGUI.findViewByName("checkboxno");
  noCheckbox.setChecked(false);
  return;
}
var noCheckboxChecked = function(self)
{
  var nameBox = self.myGUI.findViewByName("textBoxName");
  nameBox.setText("[IAM] The Captain");
  var yesCheckbox = self.myGUI.findViewByName("checkboxyes");
  yesCheckbox.setChecked(false);
  return;
}

var whaleMouseover = function(self)
{
  var whaleLayout = self.myGUI.findViewByName("whaleLayout");
  whaleLayout.setVisible(true);
}

var whaleMouseout = function(self)
{
  var whaleLayout = self.myGUI.findViewByName("whaleLayout");
  whaleLayout.setVisible(false);
}

var onLoad = function(self)
{
  var noCheckbox = self.myGUI.findViewByName("checkboxno");
  noCheckbox.setChecked(true);
}