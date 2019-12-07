class Scenario
{
    constructor(url)
    {
        this.url = url;
        this.scenario = [];
    }
    load()
    {
        let callback = (data) => {
            this.scenario = data;
        }
        callback.bind(this);
        let fl = FileLoad(this.url, callback);
    }


}