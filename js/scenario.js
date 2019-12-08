class Scenario
{
    constructor(url)
    {
        this.url = url;
        this.scenario = [];
        this.resources = {};
    }
    load(cb)
    {
        let resourceCount = 0;
        let callbackJson = (data) => {
            this.scenario = data;
            resourceCount++;
            if(resourceCount == 5){
                cb();
            }
        }
        callback.bind(this);
        let fl = new FileLoad();
        fl.loadJson(this.url, callbackJson);
        const resList = ["normal","surprised","happy","sad"];

        let callbackImage = ()=>{
            resourceCount++;
            if(resourceCount == 5){
                cb();
            }
        }

        for(let i=0;i<resList.length;i++)
        {
            this.resources[resList[i]] = new Image();
            this.resources[resList[i]].addEvenetListener("load",callbackImage);
            this.resources[resList[i]].src = "img/"+resList[i]+".png";
        }
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