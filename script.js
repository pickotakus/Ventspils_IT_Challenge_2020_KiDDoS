Previous_Ball_Height = 0;
Ball_Height = 0;
Time = 0;
Updating_Interval = 10;
Falling_Interval_Checker = false;
Min_Deacceleration = 0;

User_Input_Height = 10;
Gravity = 9.81;
Mass = 100;
Speed = 0;
Drag_Coeficient = 0.4;
Area = 0.2;
Air_Density = 1.225;
Liquid_Density = 1000;
Drag_Active = true;
Max_Speed = null;
Min_Speed = null;
Fix_Time = null;

function Set_All_Values(){
  window.scrollTo(0, 0);
  Previous_Ball_Height = null;	
  Fix_Time = null;
  try{
    document.getElementById("Colision_Result").remove();
  } catch {}
  Max_Speed = null;
  Min_Speed = null;
  Lost_K_Energy = null;
  Lost_K_Energy_Speed = null;
  function Create_Worning(value){
    var X = document.createElement("h1");
    X.style.position = "absolute";
    X.style.fontSize = "18px";
    X.style.marginLeft = "125px";
    X.style.color = "red";
    X.style.zIndex = 100000;
    X.id = "Worning_"+value;
    var Y = document.createTextNode(value);
    X.appendChild(Y);
    document.body.appendChild(X);

    var Z = window.innerWidth - 250;
    var X = document.getElementById("Worning_"+value).getBoundingClientRect().width;
    var Y = Z/X;
    document.getElementById("Worning_"+value).style.fontSize = (18*Y)+"px";
    var D = document.getElementById("Worning_"+value).getBoundingClientRect().height;
    var Z = (window.innerHeight + D - 60)/2;
    document.getElementById("Worning_"+value).style.marginTop = Z+"px";

    setTimeout(function(){document.getElementById("Worning_"+value).remove()}, 3000);
  }
	var T_User_Input_Height = Number(document.getElementById("Input_Height").value);
  if (isNaN(T_User_Input_Height)){
    Create_Worning("Height must be a number!");
  } else if (T_User_Input_Height > 5000) {
    Create_Worning("Number is too high. Might cause lag.");
  } else if (T_User_Input_Height != Math.round(T_User_Input_Height)){
    if (T_User_Input_Height < Math.round(T_User_Input_Height)){
      var Y = "up";
    } else {
      var Y = "down";
    }
    Create_Worning("Hight was rounded "+Y+" to integers");
    User_Input_Height = Math.round(T_User_Input_Height);
    document.getElementById("Input_Height").value = User_Input_Height;
  } else {
    User_Input_Height = T_User_Input_Height;
  }
	var T_Mass = Number(document.getElementById("Input_Mass").value);
  if (isNaN(T_Mass)){
    Create_Worning("Mass must be a number!");
  } else {
    Mass = T_Mass;
  }
	var T_Gravity = Number(document.getElementById("Input_Gravity").value);
  if (isNaN(T_Gravity)){
    Create_Worning("Gravity must be a number!");
  } else {
    Gravity = T_Gravity;
    Min_Deacceleration = Gravity+1;
  }
	var T_Air_Density = Number(document.getElementById("Input_Air_Density").value);
  if (isNaN(T_Air_Density)){
    Create_Worning("Air density must be a number!");
  } else {
    Density = T_Air_Density;
  }
	var T_Drag_Coeficient = Number(document.getElementById("Input_Drag_Coeficient").value);
  if (isNaN(T_Drag_Coeficient)){
    Create_Worning("Drag coeficient must be a number!");
  } else {
    Drag_Coeficient = T_Drag_Coeficient;
  }
	var T_Area = Number(document.getElementById("Input_Area").value);
  if (isNaN(T_Area)){
    Create_Worning("Area must be a number!");
  } else {
    Area = T_Area;
  }
	var T_Liquid_Density = Number(document.getElementById("Input_Liquid_Density").value);
  if (isNaN(T_Liquid_Density)){
    Create_Worning("Liquid density must be a number!");
  } else {
    Liquid_Density = T_Liquid_Density;
  }
	

	Drag_Active = document.getElementById("Drag_Value").checked;
	
	Ball_Height = 0;
	Time = 0;
	Speed = 0;
	document.getElementById("Ball").style.marginTop = (45*Screen_Display_Ofset)+"px";
	document.getElementById("Ball").terminalSpeed = false;
	document.getElementById("Ball").falling = true;
	
	document.getElementById("Line_Storage").innerHTML = null;
	var X = document.createElement("div");
	X.id = "Diving_Bord";
	X.style.marginTop = 3*100*Screen_Display_Ofset+"px";
	X.style.height = 0.1*100*Screen_Display_Ofset+"px";
	X.style.width = 4*100*Screen_Display_Ofset+"px";
	X.style.position = "absolute";
	X.style.backgroundImage = "url('Images/Diving_Board.png')"
	document.getElementById("Line_Storage").appendChild(X);
	
	X = document.createElement("div");
	X.id = "Diving_Bord_Pole";
	X.style.marginTop = 3.1*100*Screen_Display_Ofset+"px";
	X.style.height = (User_Input_Height+8000-0.1)*100*Screen_Display_Ofset+"px";
	document.getElementById("Line_Storage").appendChild(X);
	for (var Y = 0; Y<Number(document.getElementById("Input_Height").value)+3 ;Y++){
		var Line = document.createElement("div");
		document.getElementById("Line_Storage").appendChild(Line);
	}
	var Image = document.createElement("img");
	Image.src = "Images/TopWater.png";
	Image.id = "Water_Top"
	document.getElementById("Line_Storage").appendChild(Image);
	var Line = document.createElement("div");
	Line.id = "Liquid";
	document.getElementById("Line_Storage").appendChild(Line);
	Line = document.createElement("div");
	Line.id = "See_Bed";
	document.getElementById("Line_Storage").appendChild(Line);
	
	document.getElementById("Height_Output").innerHTML = null;
	document.getElementById("Speed_Output").innerHTML = null;
	document.getElementById("Acceleration_Output").innerHTML = null;
	document.getElementById("Time_Output").innerHTML = null;
	
	document.getElementById("Height_Bar").style.marginTop = null;
	if (User_Input_Height - Ball_Height >= 2000){
		document.getElementById("Height_Bar").src = "Images/HI_CLD.png";
	} else if (User_Input_Height - Ball_Height >= 0){
		document.getElementById("Height_Bar").src = "Images/HI_GND.png";
	} else {
		document.getElementById("Height_Bar").src = "Images/HI_WTR.png";
	}
}
function Falling_Interval(){
	if (Falling_Interval_Checker && !(document.getElementById("Ball").terminalSpeed == "Finished")){
		Previous_Ball_Height = Ball_Height;
		Previous_Speed = Speed;
		try{document.getElementById("Diving_Bord").style.display = "none"}catch{};
		if (document.getElementById("Ball").terminalSpeed != "Liquid"){
			if (Drag_Active){
				var Force_Gravity = Mass * Gravity;
				var Force_Drag = (Air_Density*Math.pow(Speed, 2)*Drag_Coeficient*Area)/2;
				var Force_Result = Force_Gravity - Force_Drag;
				var Acceleration = Force_Result / Mass;
			} else {
				var Acceleration = Gravity;
			}
			
			Speed += ( Acceleration * 0.01 );
			if (Acceleration<1*Math.pow(10, -3)){
				document.getElementById("Ball").terminalSpeed = true;
			}
			if (Ball_Height > User_Input_Height+0.9){
				document.getElementById("Ball").terminalSpeed = "Liquid";
			}
			Ball_Height += Speed*0.01;
			if (Ball_Height < Previous_Ball_Height){
				Ball_Height = Previous_Ball_Height;
			} else {
				document.getElementById("Ball").style.marginTop = ((Ball_Height*100+45)*Screen_Display_Ofset)+"px";
			}
		} else if (document.getElementById("Ball").terminalSpeed == "Liquid") {
		    if (Max_Speed == null){
				Max_Speed = Speed;
				Min_Speed = Math.sqrt(Gravity*Mass)/(Drag_Coeficient*Area*Liquid_Density);
				Lost_K_Energy_Speed = Max_Speed - Min_Speed;
				Lost_K_Energy = Mass*Math.pow(Max_Speed, 2)/2 - Mass*Math.pow(Min_Speed, 2)/2;
				Fix_Time = Time;
		    }
			Force_Drag = (Air_Density*Math.pow(Speed, 2)*Liquid_Density*Area)/2;
			Force_Gravity = Mass * Gravity;
			var Force_Result = Force_Gravity - Force_Drag;
			var Acceleration = Force_Result / Mass;
			
			Speed += ( Acceleration * 0.01 );
			Ball_Height += Speed*0.01;
			if (Ball_Height >= User_Input_Height + 8000){
				document.getElementById("Ball").terminalSpeed = "Finished";
				Ball_Height = User_Input_Height + 8000;
			}
			if (Ball_Height < Previous_Ball_Height){
				Ball_Height = Previous_Ball_Height;
			} else {
				document.getElementById("Ball").style.marginTop = ((Ball_Height*100+45)*Screen_Display_Ofset)+"px";
			}
		}
		if (Fix_Time+2<Time && Fix_Time != null){
      setTimeout(Falling_Result, 1000);
      Fix_Time = null;
    }
		if ( Speed < 0 ){
			Speed = 0;
		}
		
		Time += 0.01;
		window.scrollTo(0, Ball_Height*100*Screen_Display_Ofset);
		var X = (User_Input_Height - Ball_Height) * 100
		X = Math.floor(X)/100;
		document.getElementById("Height_Output").innerHTML = X+"m";
		
		var X = Speed * 100
		X = Math.floor(X)/100;
		document.getElementById("Speed_Output").innerHTML = X+"m/s";
		
    if (Acceleration < Min_Deacceleration){
      Min_Deacceleration = Acceleration;
    }
		if (Acceleration!=null){
			var X = Acceleration * 100
			X = Math.floor(X)/100;
			document.getElementById("Acceleration_Output").innerHTML = X + "m/s<sup>2</sup>";
		} else {
			document.getElementById("Acceleration_Output").innerHTML = 0 + "m/s<sup>2</sup>";
		}
		var X = Time * 100
		X = Math.floor(X)/100;
		document.getElementById("Time_Output").innerHTML = X + "s";
		if (User_Input_Height - Ball_Height >= 2000){
			document.getElementById("Height_Bar").src = "Images/HI_CLD.png";
		} else if (User_Input_Height - Ball_Height >= 0){
			document.getElementById("Height_Bar").src = "Images/HI_GND.png";
		} else {
			document.getElementById("Height_Bar").src = "Images/HI_WTR.png";
		}
		if (User_Input_Height - Ball_Height <= 0){
			document.getElementById("Height_Bar").style.marginTop = (230*Screen_Display_Ofset)+"px";
		} else {
			var Z = (User_Input_Height - Ball_Height) / User_Input_Height;
			document.getElementById("Height_Bar").style.marginTop = (230 - (230*Z) )*Screen_Display_Ofset+"px";
		}
	} else {
	}
}
function Load_Assets(){
	var Scean = document.createElement("div");
	Scean.id = "Scean";
	
	var Ball = document.createElement("span");
	var Image = document.createElement("img");
	Image.src = "Images/Char.svg";
	Image.style.height = (180*Screen_Display_Ofset)+"px";
	Image.style.marginLeft  = (-11.5*Screen_Display_Ofset)+"px";
	Image.style.marginTop = (1*Screen_Display_Ofset)+"px";
	Image.style.position = "absolute";
	Image.style.zIndex = 30000;
	Ball.appendChild(Image);
	Ball.falling = true;
	Ball.id = "Ball";
	Ball.style.marginTop = (45*Screen_Display_Ofset)+"px";
	Scean.appendChild(Ball);
	document.body.appendChild(Scean);
	
	var Line_Storage = document.createElement("div");
	Line_Storage.id = "Line_Storage";
	
	for (var X = 0; X<User_Input_Height+3 ;X++){
		var Line = document.createElement("div");
		Line_Storage.appendChild(Line);
	}
	
	document.body.appendChild(Line_Storage);
	
	var User_Inputs = [["Height", "Height, m", 10], ["Mass", "Mass, kg", 70], ["Gravity", "Gravity, m/s^2", 9.81], ["Air_Density", "Air density, kg/m^3", 1.225], ["Drag_Coeficient", "Drag coeficient", 0.6], ["Area", "Area, m^2", 0.4], ["Liquid_Density", "Liquid density, kg/m^3", 1000]];
	
	var User_Input_Field_Container = document.createElement("div");
	User_Input_Field_Container.style.height = window.innerHeight-10;
	User_Input_Field_Container.id = "User_Input_Field_Container";
	var User_Input_Field = document.createElement("div");
	User_Input_Field.id = "User_Input_Field";
	var Input_Input_Field_Holder = document.createElement("div");
	Input_Input_Field_Holder.id = "Input_Input_Field_Holder";
	for (var X = 0; X<User_Inputs.length ;X++){
		var Y = User_Inputs[X];
		var Z = document.createElement("div");
		var Input = document.createElement("input");
		var Text_Holder = document.createElement("span");
		var Input_Text = document.createTextNode(Y[1]+": ");
		Text_Holder.appendChild(Input_Text);
		Z.appendChild(Text_Holder);
		Input.id = "Input_"+Y[0];
		Input.value = Y[2];
		Z.appendChild(Input);
		Input_Input_Field_Holder.appendChild(Z);
	}
	User_Input_Field.appendChild(Input_Input_Field_Holder);
	var Button_Holder = document.createElement("div");
	var Button_1 = document.createElement("button");
	User_Input_Field.appendChild(Button_1);
	Button_1.addEventListener("click", function(){Falling_Interval_Checker = true;})
	var Button_Text = document.createTextNode("Start");
	Button_1.appendChild(Button_Text);
  Button_1.style.marginLeft = "0px";
	Button_Holder.appendChild(Button_1);
	
	Button_1 = document.createElement("button");
	User_Input_Field.appendChild(Button_1);
	Button_1.addEventListener("click", function(){Falling_Interval_Checker = false})
	Button_Text = document.createTextNode("Stop");
	Button_1.appendChild(Button_Text);
	Button_Holder.appendChild(Button_1);
	
	Button_1 = document.createElement("button");
	User_Input_Field.appendChild(Button_1);
	Button_1.addEventListener("click", function(){Set_All_Values()})
	Button_Text = document.createTextNode("Restart");
	Button_1.appendChild(Button_Text);
	Button_Holder.appendChild(Button_1);

	function Input_Checker(){
		var X = document.getElementById("Drag_Value").checked;
		if (X){
			document.getElementById("On_Off").innerHTML = "Active";
		} else {
			document.getElementById("On_Off").innerHTML = "Off";
		}
	}
	Input_0 = document.createElement("div");
	Input_0.style.marginLeft = (10*Screen_Display_Ofset)+"px";
  Input_0.style.marginTop = (20*Screen_Display_Ofset)+"px";
	var Input_Text = document.createTextNode("Drag");
	Input_0.appendChild(Input_Text);
	var Input = document.createElement("input");
	Input.addEventListener("click", Input_Checker);
	Input.type = "checkbox";
	Input.checked = true;
	Input.id = "Drag_Value";
	Input_0.appendChild(Input);
	Input = document.createElement("span");
	Input.id = "On_Off";
	Input_Text = document.createTextNode("Active");
	Input.appendChild(Input_Text);
	Input_0.appendChild(Input);
	Button_Holder.appendChild(Input_0);
	
	User_Input_Field.appendChild(Button_Holder);
	
	var Simulation_Output = ["Height", "Speed", "Acceleration", "Time"];
	var Output_Holder = document.createElement("div");
	Output_Holder.id = "Output_Holder";
	for (var X = 0; X<Simulation_Output.length ;X++){
		var Output = document.createElement("span");
		Output.id = Simulation_Output[X] + "_Output";
		var Output_Name = document.createElement("div");
		var Output_Text = document.createTextNode(Simulation_Output[X]+": ");
		Output_Name.appendChild(Output_Text);
		Output_Name.appendChild(Output);
		
		Output_Holder.appendChild(Output_Name);
	}
	User_Input_Field.appendChild(Output_Holder);

	User_Input_Field_Container.appendChild(User_Input_Field);
	document.body.appendChild(User_Input_Field_Container);
	
  var Element = document.createElement("div");
  var Element_1 = document.createTextNode("Description");
  Element.appendChild(Element_1);
  Element.className = "User_Buttons";
  Element.addEventListener("click", Description);
  User_Input_Field_Container.appendChild(Element);

  var Element = document.createElement("div");
  var Element_1 = document.createTextNode("Creator information");
  Element.appendChild(Element_1);
  Element.className = "User_Buttons";
  Element.addEventListener("click", Creator_Information);
  User_Input_Field_Container.appendChild(Element);

  var Element = document.createElement("div");
  var Element_1 = document.createTextNode("Developed within VentspilsIT Challenge 2020");
  Element.appendChild(Element_1);
  Element.className = "Ventspils_IT";
  document.body.appendChild(Element);
  var X = Element.getBoundingClientRect().width;
  var Y = Element.getBoundingClientRect().height;
  Element.style.marginTop = (window.innerHeight - Y) - 5 + "px";
  Element.style.marginLeft = (window.innerWidth - X) - 20 + "px";

	function Position_Inputs(){
		var X = document.getElementById("Input_Input_Field_Holder").getElementsByTagName("div");
		for (var Y = 0; Y<X.length ;Y++){
			var Z = X[Y];
			var Width = Z.getBoundingClientRect().width;
			var Input = Z.getElementsByTagName("input");Input = Input[0];
			var Input_Width = Input.getBoundingClientRect().width;
			var Span = Z.getElementsByTagName("span");Span = Span[0];
			var Span_Width = Span.getBoundingClientRect().width;
			Input.style.marginLeft = Number(Width - Span_Width - Input_Width)+"px";
		}
	}
	Position_Inputs();
	
	Main_Interval = setInterval(Falling_Interval, Updating_Interval);
	
	var X = document.createElement("div");
	X.style.position = "fixed";
	X.style.zIndex = 1500;
	X.id = "Hight_Mesurment";
	var Y = document.createElement("img");
	Y.src = "Images/HeightIndicator.png";
	Y.style.width = (40*Screen_Display_Ofset)+"px";
	Y.style.height = (259*Screen_Display_Ofset)+"px";
	Y.style.position = "absolute";
	X.appendChild(Y);
	
	var Z = document.createElement("div");
	Z.style.marginTop = (-8*Screen_Display_Ofset)+"px";
	var Y_1 = document.createElement("img");
	Y_1.id = "Height_Bar";
	Y_1.src = "Images/HI_CLD.png";
	Y_1.style.position = "absolute";
	Y_1.style.marginLeft = (-40*Screen_Display_Ofset)+"px";
	Y_1.style.width = (60*Screen_Display_Ofset)+"px";
	Y_1.style.height = (40*Screen_Display_Ofset)+"px";
	Z.appendChild(Y_1);
	X.appendChild(Z);
	document.body.appendChild(X);
	
	var Z = Y.getBoundingClientRect().width;
	X.style.marginLeft = (window.innerWidth - Z)+"px";
	Z = Y.getBoundingClientRect().height;
	X.style.marginTop = (window.innerHeight - Z)/2+"px";
}
