class FileLoad
{
    constructor()
    {

    }

    loadJson(url, callback)
    {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState == 4 && req.status == 200){
    
                let data = JSON.parse(req.responseText);	
                callback.bind(this);
                callback(data);
    
            }
        };
        req.open("GET", url, false);
        req.send(null);
    }
}