function showGame(game) {
  const container = document.getElementById("game-display");
  container.innerHTML = ""; // Ջնջել նախորդ խաղը

  if(game === 'math') {
    container.innerHTML = `<div id="math-game" class="game-box"></div>`;
    initMathGame();
  }
  else if(game === 'tic') {
    container.innerHTML = `<div id="tic-tac-toe" class="game-box"></div>`;
    initTicTacToe();
  }
  else if(game === 'car') {
    container.innerHTML = `<div id="car-game" class="game-box"></div>`;
    initCarGame();
  }
  else if(game === 'block') {
    container.innerHTML = `<div id="block-blast" class="game-box"></div>`;
    initBlockBlast();
  }
}

// ==================== Մաթեմատիկական խաղ ====================
function initMathGame() {
  const container = document.getElementById("math-game");
  container.innerHTML = `
    <h2>Մաթեմատիկական խաղ</h2>
    <div id="math-question"></div>
    <input id="math-answer" type="number" placeholder="Պատասխան">
    <button id="math-submit">Պատասխանել</button>
    <div>Սկոր: <span id="math-score">0</span></div>
  `;
  const questionDiv = container.querySelector("#math-question");
  const answerInput = container.querySelector("#math-answer");
  const submitBtn = container.querySelector("#math-submit");
  const scoreSpan = container.querySelector("#math-score");

  let score = 0;
  let currentAnswer = 0;

  function generateQuestion() {
    const a = Math.floor(Math.random()*20+1);
    const b = Math.floor(Math.random()*20+1);
    const ops = ["+","-","*"];
    const op = ops[Math.floor(Math.random()*ops.length)];
    currentAnswer = eval(`${a}${op}${b}`);
    questionDiv.textContent = `${a} ${op} ${b} = ?`;
  }

  submitBtn.addEventListener("click",()=>{
    const userAnswer = Number(answerInput.value);
    if(userAnswer === currentAnswer) {
      score++;
      alert("Ճիշտ է 🎉");
    } else {
      alert("Սխալ է ❌, ճիշտ պատասխանն է: " + currentAnswer);
    }
    scoreSpan.textContent = score;
    answerInput.value="";
    generateQuestion();
  });

  generateQuestion();
}

// ==================== Tic-Tac-Toe ====================
function initTicTacToe() {
  const container = document.getElementById("tic-tac-toe");
  container.innerHTML = `<h2>Իքսիկ-Նոլիկ</h2><div id="tic-board" style="display:grid;grid-template-columns:repeat(3,80px);gap:5px;margin:20px auto;"></div><button id="tic-reset">Նոր խաղ</button>`;
  const board = container.querySelector("#tic-board");
  const resetBtn = container.querySelector("#tic-reset");
  let cells = [];

  function checkWin() {
    const combos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for(const [a,b,c] of combos){
      if(cells[a].textContent && cells[a].textContent===cells[b].textContent && cells[a].textContent===cells[c].textContent){
        setTimeout(()=>alert(cells[a].textContent+" հաղթեց 🎉"),10);
        return true;
      }
    }
    if(cells.every(cell=>cell.textContent)){
      setTimeout(()=>alert("Դյուրանցում ❌ Բոլորը լրացված են"),10);
      return true;
    }
    return false;
  }

  function botMove(){
    let empty=cells.map((c,i)=>!c.textContent?i:null).filter(v=>v!==null);
    if(empty.length===0) return;
    let move = empty[Math.floor(Math.random()*empty.length)];
    cells[move].textContent="O";
    checkWin();
  }

  function createBoard(){
    board.innerHTML="";
    cells=[];
    for(let i=0;i<9;i++){
      const cell=document.createElement("div");
      cell.style.width="80px";
      cell.style.height="80px";
      cell.style.background="#fff";
      cell.style.display="flex";
      cell.style.alignItems="center";
      cell.style.justifyContent="center";
      cell.style.fontSize="40px";
      cell.style.cursor="pointer";
      cell.style.border="2px solid #333";
      cell.addEventListener("click",()=>{
        if(!cell.textContent){
          cell.textContent="X";
          if(!checkWin()) botMove();
        }
      });
      board.appendChild(cell);
      cells.push(cell);
    }
  }
  resetBtn.addEventListener("click",createBoard);
  createBoard();
}

// ==================== Մեքենայի խաղ ====================
function initCarGame(){
  const container = document.getElementById("car-game");
  container.innerHTML=`
    <h2>Մեքենայի խաղ</h2>
    <canvas id="car-canvas" width="400" height="200" style="background:#eee;border:1px solid #ccc;"></canvas>
    <p>Օգտագործիր ← → ստեղները մեքենան շարժելու համար</p>
  `;
  const canvas = container.querySelector("#car-canvas");
  const ctx = canvas.getContext("2d");
  let carX=180;
  function draw(){
    ctx.clearRect(0,0,
