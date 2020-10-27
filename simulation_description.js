function Description(){
  try {
    document.getElementById("Description").innerHTML;
  } catch {
    var Screen = document.createElement("div");
    Screen.id = "Description";
    Screen.style.border = "solid black "+(3*Screen_Display_Ofset)+"px";
    Screen.style.backgroundColor = "darkgrey";
    Screen.style.width = window.innerWidth - (200*Screen_Display_Ofset) + "px";
    Screen.style.height = window.innerHeight - (50*Screen_Display_Ofset) + "px";
    Screen.style.position = "fixed";
    Screen.style.display = "fixed";
    Screen.style.zIndex = 100000;
    Screen.style.marginTop = (25*Screen_Display_Ofset)+"px";
    Screen.style.marginLeft = (100*Screen_Display_Ofset)+"px";
    document.body.appendChild(Screen);

    var Remove = document.createElement("div");
    Remove.style.position = "absolute";
    Remove.style.marginLeft = window.innerWidth - (200*Screen_Display_Ofset) - (50*Screen_Display_Ofset)+"px";
    Remove.style.border = "solid red "+(2.5*Screen_Display_Ofset)+"px";
    Remove.style.width = (45*Screen_Display_Ofset)+"px";
    Remove.style.height = (45*Screen_Display_Ofset)+"px";
    Remove_Text = document.createTextNode("X");
    Remove.appendChild(Remove_Text);
    Remove.style.backgroundColor = "#ff8f8f";
    Remove.style.color = "red";
    Remove.style.textAlign = "center";
    Remove.style.fontSize = (40*Screen_Display_Ofset)+"px";
    Remove.addEventListener("click", function(){document.getElementById("Description").remove()});
    Screen.appendChild(Remove);
	
    var Text_Storage = ["This simulation displays a collision force between an object, in this case a human, and a liquid (water) in a freefall. Simulation displays data with assumption that the object is a point of mass and impulse is lost evenly, in other words, speed is consistent in all parts of the object.", "Simulation purpose is to visualize the fall and changes experienced by the object during and after the fall. Additionally, the simulation shows the possible damage to an untrained average human body.", "The length of simulation is dependent on parameters selected.", ["POP_1"], "To ensure that data was as accurate as possible calculations were made every 10 milliseconds. It wasn’t possible to calculate it more often due to overload.", "In addition we used scaling so that the simulation is the same size on all PCs and laptops."];
    var L = document.createElement("div");
    Screen.appendChild(L);
	L.id = "Test_001";
    L.style.padding = 20*Screen_Display_Ofset+"px";
    L.style.fontSize = 15*Screen_Display_Ofset+"px";
    L.style.marginTop = 10*Screen_Display_Ofset+"px";
    for (var Y = 0; Y<Text_Storage.length ;Y++){
      var X = document.createElement("p");
      if ((typeof Text_Storage[Y]) == "object"){
        var D = Text_Storage[Y];
        for (var Z = 0; Z<D.length ; Z++){
          if ( D[Z] == "POP_1" ){
			  var T = document.createTextNode("To calculate objects momentum, we used formula (m*g=");
			  X.appendChild(T);
			  var X_01 = document.createElement("span");
			  var Y_01 = document.createElement("sub");
			  var Text = document.createTextNode("d");
			  Y_01.appendChild(Text);
			  var Z_01 = document.createElement("sup");
			  Text = document.createTextNode("2");
			  Z_01.appendChild(Text);
			  var T_01 = document.createTextNode("( C");
			  X_01.appendChild(T_01);
			  X_01.appendChild(Y_01);
			  T_01 = document.createTextNode(" * v");
			  X_01.appendChild(T_01);
			  X_01.appendChild(Z_01);
			  T_01 = document.createTextNode(" * A * P )/2");
			  X_01.appendChild(T_01);
			  X.appendChild(X_01);
			  
			  var T = document.createTextNode("), where");
			  X.appendChild(T);
			  
			  var X_01 = document.createElement("span");
			  var TOP = ["m – mass", "g – acceleration", "Cd – drag coefficient", "A – area of the object", "Ρ – liquid/air density", "v2 – object’s speed squared"];
			  var L_01 = document.createElement("ul");
			  for (var Z_01 = 0; Z_01<TOP.length ; Z_01++){
				var L_1 = document.createElement("li")
				var L_2 = document.createTextNode(TOP[Z_01]);
				L_1.appendChild(L_2);
				L_01.appendChild(L_1);
			  }
			  X_01.appendChild(L_01);
			  X.appendChild(X_01);
		  } else {
            var T = document.createTextNode(D[Z]);
            X.appendChild(T);
          }
        }
      } else {
        var X_1 = document.createTextNode(Text_Storage[Y]);
        X.appendChild(X_1);
      }
      L.appendChild(X);
    }
  }
}
function Falling_Result(){
  var X = document.createElement("div");
  X.style.border = "solid black "+(3*Screen_Display_Ofset)+"px";
  X.id = "Colision_Result";
  X.style.marginLeft = window.innerWidth - (320*Screen_Display_Ofset) + "px";
  X.style.width = (264 * Screen_Display_Ofset)+"px";
  X.style.marginTop = window.innerHeight - (450*Screen_Display_Ofset)+"px";
  X.style.position = "fixed";
  X.style.textAlign = "center";
  X.style.backgroundColor = "darkgrey";
  X.style.height = (294*Screen_Display_Ofset)+"px";
  document.body.appendChild(X);

  var Z = document.createElement("div");
  var Y = document.createElement("h1");
  var Y_1 = document.createTextNode("Result");
  Y.appendChild(Y_1);
  Z.appendChild(Y);
  X.appendChild(Z);

  var Z = document.createElement("div");
  Z.style.textAlign = "left";
  var Y = document.createElement("ul");
  Y.style.padding = (0*Screen_Display_Ofset)+"px " + (30*Screen_Display_Ofset)+"px ";
  
  var Y_1 = document.createElement("li");
  if (Min_Speed < Max_Speed){
    var Y_2 = document.createTextNode("Speed lost during impact was: " + (Math.round((Max_Speed-Min_Speed)*1000)/1000) + "m/s"); 
  } else {
    Y_2 = document.createTextNode("Speed was gained after impact");
  }
  Y_1.appendChild(Y_2);
  Y.appendChild(Y_1);

  Y_1 = document.createElement("li");
  if (Min_Speed < Max_Speed){
    Y_2 = document.createTextNode("Force used to stop your fall was: "+(Math.round((Lost_K_Energy)*1000)/1000)+"N");
  } else {
    Y_2 = document.createTextNode("You gained Kinetic energy");
  }
  Y_1.appendChild(Y_2);
  Y.appendChild(Y_1);
  
  var D = Lost_K_Energy/1.8;
  Y_1 = document.createElement("li");
  if (D<1200){
    Y_2 = document.createTextNode("You should be fine. ");
  } else if (D<2000){
    Y_2 = document.createTextNode("You might dislocate a joint. ");
  } else if (D < 2400){
    Y_2 = document.createTextNode("You could fracture a bone. ");
  } else if (D < 3000){
    Y_2 = document.createTextNode("If you fell on your head, you broak your skull. ");
    Y_1.appendChild(Y_2);
    Y_2 = document.createTextNode("You will sustain long term damage. ");
  } else if (D < 3500){
    Y_2 = document.createTextNode("You fractured/broak a rib. ");
    Y_1.appendChild(Y_2);
    Y_2 = document.createTextNode("You will sustain long term damage. ");
  } else if (D < 4000){
    Y_2 = document.createTextNode("You will sustain a lot of long tearm damage");
  } else if (D < 4500){
    Y_2 = document.createTextNode("You can and most likely will break your strongest bone in best case scenario!");
  } else if (D >= 4500){
    Y_2 = document.createTextNode("You will die");
  }
  Y_1.appendChild(Y_2);
  Y.appendChild(Y_1);
  
  Y_1 = document.createElement("li");
  Y_2 = document.createTextNode("Most likely, your body will continue to sink until it reaches the bottom.");
  Y_1.appendChild(Y_2);
  Y.appendChild(Y_1);
  
  Z.appendChild(Y);
  X.appendChild(Z);
}
function Creator_Information(){
  try {
    document.getElementById("Creator_Inf").innerHTML;
  } catch {
    var Screen = document.createElement("div");
    Screen.id = "Creator_Inf";
    Screen.style.border = "solid black "+(3*Screen_Display_Ofset)+"px";
    Screen.style.backgroundColor = "darkgrey";
    Screen.style.width = window.innerWidth - (200*Screen_Display_Ofset) + "px";
    Screen.style.height = window.innerHeight - (50*Screen_Display_Ofset) + "px";
    Screen.style.position = "fixed";
    Screen.style.display = "fixed";
    Screen.style.zIndex = 100000;
    Screen.style.marginTop = (25*Screen_Display_Ofset)+"px";
    Screen.style.marginLeft = (100*Screen_Display_Ofset)+"px";
    document.body.appendChild(Screen);

    var Remove = document.createElement("div");
    Remove.style.position = "absolute";
    Remove.style.marginLeft = window.innerWidth - (200*Screen_Display_Ofset) - (50*Screen_Display_Ofset)+"px";
    Remove.style.border = "solid red "+(2.5*Screen_Display_Ofset)+"px";
    Remove.style.width = (45*Screen_Display_Ofset)+"px";
    Remove.style.height = (45*Screen_Display_Ofset)+"px";
    Remove_Text = document.createTextNode("X");
    Remove.appendChild(Remove_Text);
    Remove.style.backgroundColor = "#ff8f8f";
    Remove.style.color = "red";
    Remove.style.textAlign = "center";
    Remove.style.fontSize = (40*Screen_Display_Ofset)+"px";
    Remove.addEventListener("click", function(){document.getElementById("Creator_Inf").remove()});
    Screen.appendChild(Remove);

    var Storage = document.createElement("div");
    Storage.style.marginLeft = (40*Screen_Display_Ofset) + "px"
    var D = document.createElement("h2");
    var D_1 = document.createTextNode("Project manager: Trošina Sandra");
    D.appendChild(D_1);
    Storage.appendChild(D);

    Info_List = [["Code:", ["Daniēls Zeps"]], ["Physics:", ["Emīls Šmits", "Daniēls Zeps"]], ["Graphics:", ["Artis Salmiņš", "Daniēls Zeps"]]];
    for (var X = 0; X<Info_List.length; X++){
      var Z = Info_List[X];
      var D = document.createElement("h2");
      var D_1 = document.createTextNode(Z[0]);
      D.appendChild(D_1);
      Storage.appendChild(D);
      var D = document.createElement("ul");
      for (var Y = 0; Y<Z[1].length; Y++){
        var D_1 = document.createElement("li");
        var D_2 = document.createElement("h3");
        var D_3 = document.createTextNode(Z[1][Y]);
        D_2.appendChild(D_3);
        D_1.appendChild(D_2);
        D.appendChild(D_1);
      }
      Storage.appendChild(D);
    }
    Screen.appendChild(Storage);
  }
}
