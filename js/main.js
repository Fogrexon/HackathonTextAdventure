
addEventListener("load", ()=>{
    let sc = new Scenario("./src/scenario.json");
    let tv = new TextViewer(document.getElementById("text_container"));
    let bc = new ElementController(document.getElementById("button1"),document.getElementById("button2"),document.getElementById("button3"),document.getElementById("face"));
    let game = new Game(sc, tv, bc);
    game.initialize();
});