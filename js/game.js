class textViewer
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
        while(w!="\\")
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
            }, 50);
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

class Game
{
    constructor(scenario, textViewer)
    {

    }
}