function Set_Screen_Ofset_Funct(){
  var X, X_1, Y, Y_1, Z, Z_1;
  Z = 1280/578;
  X = window.innerWidth;
  Y = window.innerHeight;
  Z_1 = Y*Z;
  if (Z_1 > X){
    if ( X < Y ){
      Screen_Display_Ofset = 2;
    } else {
      Screen_Display_Ofset = X/1280;
    }
  } else if (Z_1 < X){
    Screen_Display_Ofset = Y/578;
  } else {
    Screen_Display_Ofset = Y/578;
  }
}
Set_Screen_Ofset_Funct();
