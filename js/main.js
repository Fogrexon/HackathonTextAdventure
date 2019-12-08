
addEventListener("load", ()=>{
    let sc = new Scenario("scenario.json");
    let tv = new TextViewer(document.getElementById("text_container"));
    let bc = new ButtonController(document.getElementById("button1"),document.getElementById("button2"),document.getElementById("button3"));
    let game = new Game(sc, tv, bc);
    game.initialize();
});