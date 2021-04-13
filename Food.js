
class Food {
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
        this.lastFed;
    }
  
    display(){
       var x=80,y=100;
           if(this.foodStock<=5){
            for(var i =0; i<foods;i++){
                if(i%6===0){
                    x=80
                    y=y+70
                }
                image(this.image,x,y,70,70);
                x=x+30
            }
            
        }

   }
}