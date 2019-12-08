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
        console.log(w);
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
            }, 30);
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

class ButtonController
{
    constructor(btn1,btn2,btn3)
    {
        this.btn1 = btn1;
        this.btn2 = btn2;
        this.btn3 = btn3;
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
            switch(e.key)
            {
                case "1":{
                    ths.oneClick();
                    break;
                }
                case "2":{
                    ths.twoClick();
                    break;
                }
                case "3":{
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

    setValue(values)
    {
        let one,two,three;
        if(values.length==3)
        {
            one = values[0];
            two = values[1];
            three = values[2];
        }else if(values.length==2){
            one = values[0];
            two = values[1];
            three = "";
        }else{
            one = values[0];
            two = "";
            three = "";
        }
        this.btn1.value = one;
        this.btn2.value = two;
        this.btn3.value = three;
    }
}


class Game
{
    constructor(scenario, textViewer, buttonController)
    {
        this.scenario = scenario;
        this.textViewer = textViewer;
        this.buttonController = buttonController;
        buttonController.game = this;
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

        let activeIndex = [];
        let num = 0;
        let choiceList = "";
        let exp;
        if(!!choice)
        {
        for(let i=0;i<choice.length;i++)
            {
                exp = choice[i].expression;

                if(!!exp&&!Util.solveExpression(exp.name, exp.operator, exp.num)) continue;
                activeIndex.push(choice[i].index);
                num++;
                choiceList += num+") "+choice[i].text+"\n";
            }
        }

        if(this.isEnd) choiceList = "1) 終了";

        this.activeIndex = activeIndex;

        this.textViewer.setText(text + choiceList);
    }

    onSelected(n)
    {
        if(this.isEnd) 
        {
            this.goScene(0);
            return;
        }
        console.log("GOTO "+this.activeIndex[n]);
        this.goScene(this.activeIndex[n]);
    }

}