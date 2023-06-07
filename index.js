const fetch = require("node-fetch");
const fs = require("fs")
let clinetId = "icqkyq2xvk0e3ds60ogayi58phffmn";
let clinetSecret = "qd76rqdjgawtorc1l4uvj45v2pkq0i";
let BroadCasterid = "240540239";
let tokeNauth = "qpceb4on0dr3utlfmooo7cwmgje61a";
let idWater = '4c982dec-40fc-4756-84ee-ac26d2891f60';

 async function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;
   
    return fetch(url, {
        method: "POST",
        })
        .then((res) => res.json())
        .then((data) =>{
           return data
        } )

}

async function getAllRewardsActive()
{
    const endpoint = `https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${BroadCasterid}`;
    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${tokeNauth}`;

    let headers = {
        'Authorization':authorization,
        "Client-Id": clinetId,
    };

    const data = await fetch(endpoint, {
        method: "GET",
        headers
        })
        .then((res) => res.json())
        .then((data) =>{
           return data
        } )

    // let jsonD = [];

    // data.data.forEach(element => {
    //     if (element.is_enabled)
    //     {

    //         let obj1 = {
    //             name: element.title,
    //             id: element.id,
    //         };
    //         jsonD.push(obj1);
    //     }
    // });


    // fs.appendFile('Rewards\\rewards.txt', JSON.stringify(jsonD,null,4), function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    //   })
    // let createStream = fs.createWriteStream("C:\Users\jarod\Desktop\Proyectos\TwitterApi\Rewards\rewards.txt");
    // createStream.end();
    //fs.writeFile("C:\Users\jarod\Desktop\Proyectos\TwitterApi\Rewards\rewards.txt",JSON.stringify(json), (err) => { if (err) throw err; });
}

async function SuscribeToAllEvents() {
    const endpoint = `https://api.twitch.tv/helix/eventsub/subscriptions`
    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
        'Authorization': authorization,
        "Client-Id": clinetId,
        "Content-Type": "application/json"
    };

    
    fs.readFile('Rewards\\rewards.txt','utf8', function(err, data){
      
        // Display the file content
        if (data != undefined)
        {
            let readFile = JSON.parse(data);
            readFile.forEach(async element => {
            let body = 
                {
                type: "channel.channel_points_custom_reward_redemption.add",
                version: "1",
                condition: {
                broadcaster_user_id: BroadCasterid,
                reward_id: element.id // optional; gets notifications for a specific reward
                },
                transport: {
                method: "webhook",
                callback: "https://hunky-mailbox-production.up.railway.app/eventsub",
                secret: clinetSecret
                }
            }

            const data = await fetch(endpoint, {
                headers,
                method: "POST",
                body: JSON.stringify(body)
                })
                .then((res) => res.json())
                .then((data) => { console.log(data); return data.data});
            });

            console.log(data);
        }
    });
}

   async function GetEvents(){
        const endpoint = `https://api.twitch.tv/helix/eventsub/subscriptions`;
        //  const endpoint = `https://api.twitch.tv/helix/users?login=javinix`;
        
        let authorizationObject = await getTwitchAuthorization();
        let { access_token, expires_in, token_type } = authorizationObject;
       
        token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length);
        
        let authorization = `${token_type} ${access_token}`;
    
        let headers = {
            'Authorization':authorization,
            "Client-Id": clinetId,
        };


        const data = await  fetch(endpoint, {
            headers,
            method: "GET",
            })
            .then((res) => res.json())
            .then((data) => { return data.data});

        console.log(data);

    }
    
   

    // let body = 
    //     {
    //         type: "channel.channel_points_custom_reward_redemption.add",
    //         version: "1",
    //         condition: {
    //             broadcaster_user_id: id,
    //             reward_id: idWater // optional; gets notifications for a specific reward
    //         },
    //         transport: {
    //             method: "webhook",
    //             callback: "https://servertwitch-production.up.railway.app/eventsub",
    //             secret: clinetSecret
    //         }
    //     }

    //     const data = await fetch(endpoint, {
    //         headers,
    //         method: "GET",
    //         // body: JSON.stringify(body)
    //         })
    //         .then((res) => res.json())
    //         .then((data) => {return data.data});

    //     console.log(data);
    
//getAllRewardsActive();

//SuscribeToAllEvents();
GetEvents();