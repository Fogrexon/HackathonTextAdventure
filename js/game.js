class TextViewer
{
    constructor(element)
    {
        this.console = element;
        this.stack = "";
        this.text = "";
    }

    showWord()
    {
        let w = "";
        w += this.stack.charAt(0);
        this.stack = this.stack.slice(1);
        if(w == "\\")
        {
            w += this.stack.charAt(0);
            this.stack = this.stack.slice(1);
        }
        this.text += w;
        this.console.innerText = this.text;
        if(this.stack=="") this.stopText();
        
    }
    
    setText(text)
    {
        this.stack += text;
        console.log(this.stack);
        this.playText();
    }

    playText()
    {
        if(!this.interval)
        {
            let ths = this;
            this.interval = setInterval(()=>{
                ths.showWord();
            }, 10);
        }
    }

    stopText()
    {
        if(!!this.interval)
        {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    clearShow()
    {
        this.stopText();
        this.stack = "";
        this.text = "";
        this.console.innerText = "";
    }

    
}

class ElementController
{
    constructor(btn1,btn2,btn3,face)
    {
        this.btn1 = btn1;
        this.btn2 = btn2;
        this.btn3 = btn3;
        this.face = face;
        let ths = this;
        let one = () => {
            ths.oneClick();
        }
        let two = () => {
            ths.twoClick();
        }
        let three = () => {
            ths.threeClick();
        }

        this.btn1.addEventListener("click", one);
        this.btn2.addEventListener("click", two);
        this.btn3.addEventListener("click", three);
        window.addEventListener("keydown", (e)=>{
            console.log(e.key);
            switch(e.key)
            {
                case "ArrowUp":
                case "w":{
                    ths.oneClick();
                    break;
                }
                case "ArrowLeft":
                case "a":{
                    ths.twoClick();
                    break;
                }
                case "ArrowRight":
                case "d":{
                    ths.threeClick();
                    break;
                }

            }
        });
        this.game = null;
    }

    oneClick()
    {
        this.game.onSelected(0);
    }
    twoClick()
    {
        this.game.onSelected(1);
    }
    threeClick()
    {
        this.game.onSelected(2);
    }

    setActive(len)
    {
        this.btn1.disabled = false;
        this.btn2.disabled = len < 2;
        this.btn3.disabled = len < 3;
    }

    setFace(src)
    {
        this.face.src = src;
    }
}


class Game
{
    constructor(scenario, textViewer, elementController)
    {
        this.scenario = scenario;
        this.textViewer = textViewer;
        this.elementController = elementController;
        elementController.game = this;
    }

    initialize()
    {
        let ths = this;
        this.scenario.load(()=>{
            ths.goScene(0);
        });
        this.textViewer.clearShow();
        this.isEnd = false;
        this.variables = {};

    }

    goScene(n)
    {
        this.textViewer.clearShow();

        const scene = this.scenario.scenario[n];
        const face = !!scene.face ? scene.face : "normal";
        this.isEnd = scene.isEnd;
        const variable = scene.variable;
        const choice = scene.choice;

        let text = scene.text + "\n";
        if(!!variable)
        {
            for(let i=0;i<variable.length;i++)
            {
                if(!this.variables[variable[i].name]) this.variables[variable[i].name] = 0;
                this.variables[variable[i].name] += variable[i].add;
            }
        }

        this.elementController.setFace(this.scenario.resources[face].src);

        let activeIndex = [];
        let num = 0;
        let choiceList = "";
        let exp;
        const list = ["N","W","E"]
        if(!!choice)
        {
            for(let i=0;i<choice.length;i++)
            {
                exp = choice[i].expression;
                if(!!exp)
                {
                    if(!this.variables[exp.name]) this.variables[exp.name] = 0;
                    if(!Util.solveExpression(this.variables[exp.name], exp.operator, exp.num)) continue;

                }
                activeIndex.push(choice[i].index);
                num++;
                choiceList += list[num-1]+") "+choice[i].text+"\n";
            }
        }

        if(this.isEnd)
        {
            choiceList = "N) 終了";
            activeIndex.push(0);
        }

        this.activeIndex = activeIndex;

        this.elementController.setActive(activeIndex.length);

        this.textViewer.setText(text + choiceList);
    }

    onSelected(n)
    {
        if(this.activeIndex.length < n+1) return; 
        this.goScene(this.activeIndex[n]);
    }

}