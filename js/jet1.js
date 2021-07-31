class Jet{
    constructor(x,w,h){
        var options={
            friction:.5,
            restitution:.5,
            density:7
        }
        this.image = loadImage("images/jet (2).png");
        this.y = Math.round(random(0,200));
        this.x = x
        this.width = w
        this.height = h
        this.body = Bodies.rectangle(x,this.y,w,h,options)
        World.add(world,this.body)
    }
    display(){
        var angle = this.body.angle;
        var pos= this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.width, this.height);
        pop();
    }
}