let clinetId = "icqkyq2xvk0e3ds60ogayi58phffmn";
let clinetSecret = "qd76rqdjgawtorc1l4uvj45v2pkq0i";
let id = "240540239";
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
    const url = `https://api.twitch.tv/helix/channel_points/custom_rewards`;
    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
        'Authorization':authorization,
        "Client-Id": clinetId,
    };

    const answer = await fetch(endpoint, {
        headers,
        method: "GET"});

    console.log(answer);   
}

getAllRewardsActive();