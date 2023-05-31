//定義一個bullet物件的class

let spoints = [[0,3],[1,1],[3,1],[1,0],[2,-2],[0,-1],[-2,-2],[-1,0],[-3,1],[-1,1]];


var star_colors = "ecf39e-fff3b0-fefae0-eddea4-f8ffe5".split("-").map(a=>"#"+a)

class Star{ //宣告一個怪物類別
    constructor(args){  //預設值，基本資料(物件的顏色。移動的速度。大小，初始顯示位置......)
        // this.r = args.r || random(30,100) //怪物的主體，就傳參數args.r來設定怪物大小，沒有船參數，就以100為主
        this.p = args.p || shipP.copy()//建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)//移動的速度，如果沒有
        this.size = random(5,10) //一個物件的放大倍率
        this.color = args.color || random(star_colors)
    }
        draw(){ //畫出元件
            push() //重新設定原點位置
                translate(this.p.x,this.p.y) //以該物件位置為原點
                scale(this.v.x<0?1:-1,-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1<，否則為-1，y軸的-1
                fill(this.color)
                // stroke(this.stroke)
                strokeWeight(2)
                beginShape()
                for(var k =0; k< spoints.length; k=k+1){
                  // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
                //   vertex(mpoints[k][0]*this.size,mpoints[k][1]*this.size) //只要設定一個點，當指令到endshape()，會把所有的點串連在一起
                  curveVertex(spoints[k][0]*this.size,spoints[k][1]*this.size) //畫線為圓弧方式畫圖
                }
                endShape(CLOSE)
            pop() 
               
            }
        
// class Bullet{
//     constructor(args){  //預設值，基本資料(物件的顏色。移動的速度。大小，初始顯示位置......)
//         this.r = args.r || 10 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小，沒有船參數，就以10為主
//         this.p = args.p || shipP.copy() //建立一個向量，{x:width/2,y:height/2}
//         this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
//         this.color = args.color || "#588157"
//     }
    // draw(){ //匯出物件程式碼
    //     push()  
    //         translate(this.p.x,this.p.y)
    //         fill(this.color)
    //         noStroke()
    //         ellipse(0,0,this.r)
    //     pop()
    // }
    update(){ //計算出移動的位置
        // this.p.x = this.p.x+this.v.x   //X軸目前位置(this.p.y)加上X軸的移動速度(this.v.y)
        // this.p.y = this.p.y+this.v.y   //Y軸目前位置(this.p.y)加上Y軸的移動速度(this.v.y)
        this.p.add(this.v)
    }
  }
