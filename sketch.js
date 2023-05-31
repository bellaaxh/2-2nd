

let points = [[0,6],[2,4],[1,4],[3,2],[1,2],[4,-1],[2,-1],[4,-3],[1,-3],[1,-5],[-1,-5],[-1,-3],[-4,-3],[-2,-1],[-4,-1],[-1,2],[-3,2],[-1,4],[-2,4]];


var fill_colors = "dad7cd-a3b18a-588157-3a5a40-344e41".split("-").map(a=>"#"+a)
var line_colors = "c3a995-ab947e-6f5e53-8a7968-593d3b".split("-").map(a=>"#"+a)



//++++++++++設定畫point點的物件變數
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

//+++++++++設定飛彈物件變數
var star  //"目前要處理"的物件，暫時放在bullet變數內
var stars =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

//++++++++++設定怪物物件變數
var monster  //"目前要處理"的物件，暫時放在monster變數內
var monsters =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

var score = 0

var shipP


function preload(){ //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  star_sound = loadSound("sound/star.mp3")
  tree_sound = loadSound("sound/bling.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP= createVector(windowWidth/2,windowHeight/2) //預設雲位置

  for(var i=0;i<10;i=i+1){ //i=0、1、2、3、4、5、6、7、8、.....
    ball = new Tree({}) //產生一個新的Tree class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<10;i=i+1){ //i=0、1、2、3、4、5、6、7、8、.....
    monster = new Monster({}) //產生一個新的Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內
  }
}

function draw() {
  background("#ccc5b9");
 //"#e5e5e5"
    if(key=="ArrowLeft"){  //按下鍵盤往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight"){ //按下鍵盤往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp"){ //按下鍵盤往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown"){ //按下鍵盤往下鍵
      shipP.y = shipP.y+5
    }

  // 大象的顯示
   for(let ball of balls){
    ball.draw() //呼叫物件畫圖
    ball.update() //呼叫物件移動
    for(let star of stars){  //檢查每一個物件
        if(ball.isBallInRanger(star.p.x,star.p.y)){ //飛彈物件有沒有接觸現在的ball
          balls .splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取1個
          stars .splice(stars.indexOf(star),1) 
          score = score-1 //加分
          tree_sound.play()
        }
      }
   }
    // 星星的顯示 
    for(let star of stars){
      star.draw() 
      star.update() 
    }
   //怪物的顯示
   for(let monster of monsters){
      if(monster.dead == true && monster.timenum>4){
        monsters.splice(monsters.indexOf(monster),1)
      }
      monster.draw() 
      monster.update()
      
    
    for(let star of stars){  //檢查每一個物件
      if(monster.isBallInRanger(star.p.x,star.p.y)){ //飛彈物件有沒有接觸現在的ball
        // monsters .splice(monsters.indexOf(monster),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取1個
        stars .splice(stars.indexOf(star),1) 
        score = score+1 
        monster.dead  = true
      }
    }
   }

  textSize(35)
  text(score,50,50) // 在座標(50,50)上，顯示score分數內容
  push() //重新規劃原點(0,0)在中心點
  let dx = mouseX-width/2
  let dy = mouseY-height/2
  let angle = atan2(dy,dx)

  translate(shipP.x,shipP.y)  //雲位置
  fill("#e2eafc")
  noStroke()
  rotate(angle)
  ellipse(0, 20, 40, 50);
  ellipse(25, 20, 40, 50);
  ellipse(50, 20, 40, 50);
  
  fill(0)
  ellipse(15,15,5)
  ellipse(35,15,5)
  fill("#bc4749")
  arc(25, 30, 15, 15, 0, PI, CHORD)
  pop() //恢復原本設定，原點在(0,0)左上角
  }


//+++++++++++++產生一個物件+++++++++++++++++++++++++++++++++++++
function mousePressed(){
//   ball = new Obj({
//     p:{x:mouseX,y:mouseY}
//   }) //在滑鼠按下的地方，產生一個新的Obj class元件
//   balls.push(ball) //把ball的物件放入到balls陣列內(丟到倉庫)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //在物件上按下滑鼠，物件消失不見，分數加1分
  // for(let ball of balls){  //檢查每一個物件
  //   if(ball.isBallInRanger()){
  //     balls .splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取1個
  //     score = score+1 //加分
  //   }
  // }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




  //+++++++++++++++按下產生一個飛彈++++++++++++++++++++++++++++
  star = new Star({
    r:15
  }) //在滑鼠按下的地方，摻生一個新的Bullet class元件(產生一個飛彈)
  stars.push(star) //把bullet的物件放入到bullets陣列內(丟到倉庫)
  star_sound.play()
}

function keyPressed(){
  if(key==" "){
    star = new Star({})
    stars.push(star)
    star_sound.play()
  }


}
