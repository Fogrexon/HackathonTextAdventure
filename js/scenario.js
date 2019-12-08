class Scenario
{
    constructor(url)
    {
        this.url = url;
        this.scenario = [];
    }
    load(cb)
    {
        let callback = (data) => {
            this.scenario = data;
            cb();
        }
        callback.bind(this);
        let fl = new FileLoad();
        fl.load(this.url, callback);
    }


}

const Util = {
    solveExpression : (vari, operator, val)=>{
        switch(operator)
        {
            case "<":
            {
                return vari < val;
            }
            case ">":
            {
                return vari > val;
            }
            case "=":
            {
                return vari == val;
            }
        }
    }
};