var Bricks2;
(function (Bricks2) {
    class Bar {
        //        topBorder:number;
        //        leftBorder:number;
        //        rightBorder:number;
        //        bottomBorder:number;
        constructor(_x, _y) {
            console.log("Bar");
            this.x = _x;
            this.y = _y;
            this.height = 20;
            this.width = 100;
            this.color = "#FFFFFF";
            //            this.topBorder=this.y;
            //            this.leftBorder=this.x;
            //            this.rightBorder=this.x+this.width;
            //            this.bottomBorder=this.y+this.height;
        }
        draw() {
            Bricks2.crc2.beginPath();
            Bricks2.crc2.rect(this.x, this.y, this.width, this.height);
            Bricks2.crc2.fillStyle = this.color;
            Bricks2.crc2.fill();
            Bricks2.crc2.closePath();
        }
        move() {
            if (Bricks2.rightKey == true && this.x + this.width < Bricks2.crc2.canvas.width) {
                this.x += 10;
            }
            else if (Bricks2.leftKey == true && this.x > 0) {
                this.x -= 10;
            }
        }
    }
    Bricks2.Bar = Bar; //class
})(Bricks2 || (Bricks2 = {})); //namespace
//# sourceMappingURL=Bar.js.map