var monster_colors = "ced4da-adb5bd-dee2e6".split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物類別
    constructor(args){  //預設值，基本資料(物件的顏色。移動的速度。大小，初始顯示位置......)
        this.r = args.r || random(30,65) //怪物的主體，就傳參數args.r來設定怪物大小，沒有船參數，就以100為主
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false  //代表活著
        this.timenum = 0
    }
    draw(){ //畫出元件
        if(this.dead == false ){
        push() //重新設定原點位置
            translate(this.p.x,this.p.y) //把原點座標(0,0)移到物件中心位置
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            if(this.mode == "happy"){
                fill(255)
                ellipse(0,0,this.r/2)
                fill("#343a40")
                ellipse(0,0,this.r/4)
            }else{
                fill(255)
                arc(0,0,this.r/2,this.r/2,0,PI)
                fill(0)
                arc(0,0,this.r/3,this.r/3,0,PI)
            }
            //加入怪物的腳
            stroke(this.color)
            strokeWeight(5)
            noFill()
            // line(this.r/2,0,this.r,0)

            for(var j=0;j<2;j++){ //腳*
                rotate(PI)
            
            beginShape() //畫怪物的腳
                for(var i = 0;i<(this.r/2);i++){
                    vertex(this.r/2+i,sin(i/10+frameCount/20)*10) 
                }
            endShape()
            }
        pop() //恢復到整個視窗的左上角
        }
        else{ //怪物死掉的畫面
            this.timenum = this.timenum+1
            push()
                translate(this.p.x,this.p.y) //把原點座標(0,0)移到物件中心位置
                fill(this.color)
                noStroke()
                ellipse(0,0,this.r)
                line(-this.r/2,0,this.r/2,0)
                stroke(this.color)
                strokeWeight(4)
                noFill()
                // for(var j=0;j<4;j++){
                //     rotate(PI/4)
                //     line(this.r/2,0,this.r,0)
                // }
            pop()
        }
    }


    update(){  //計算出移動元件後的位置
        this.p.add(this.v)

        if(this.p.x<=0 ||this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x //把x軸速度、方向改變
        }
          if(this.p.y<=0 ||this.p.y>=height){ //y軸碰到左邊(<=0)，或是碰到右邊(>=height)
            this.v.y = -this.v.y //把y軸速度、方向改變
        }
    }
    isBallInRanger(x,y){ //功能:滑鼠按下的位置是否在物件的範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
        if(d<this.r/2){
          return true   //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回true的值(碰觸)
        }else{
          return false    //滑鼠與物件的距離大於物件的寬度，代表沒有碰觸，則傳回false的值(未碰觸)
        }
      }
}