class textViewer
{
    constructor(element)
    {
        this.console = element;
        this.stack = "";
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
            this.interbal = setInterval(this.showWord, 50);
        }
    }

    stopText()
    {
        if(!this.
            interval)
        {
            this.interbal = setInterval(this.showWord, 50);
        }
    }

    
}

class Game
{
    constructor(scenario, textViewer)
}