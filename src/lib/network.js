import {networkInterfaces} from "node:os";
export let IP_ADDRESS = '';
;(function(){
    const networkInterface = networkInterfaces();
    if(networkInterface["Беспроводная сеть 3"]){
        IP_ADDRESS += networkInterface["Беспроводная сеть 3"].find((network) => network.family == "IPv4").address;
    }
}())