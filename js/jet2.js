class Jet2{
    constructor(x,w,h){
        var options={
            friction:.5,
            restitution:.5,
            density:7
        }
        this.image = loadImage("images/jet (3).png");
        this.y = Math.round(random(200,350));
        this.x = x
        this.width = w
        this.height = h
        this.body = Bodies.rectangle(x,this.y,w,h,options)
        World.add(world,this.body)
    }
    display(){
        imageMode(CENTER)
        image(this.image,this.x,this.y,this.width,this.height)
    }
}