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
        if(stack=="") this.stopText();
        
    }
    
    setText(text)
    {
        this.stack += text;
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
}

class Game
{
    constructor(scenario, textViewer, ButtonController)
    {

    }
}