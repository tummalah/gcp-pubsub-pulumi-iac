

import {readFileSync} from 'fs';


export interface IConfigData {
    readConfig(): void;
    configData: [] ;
    configPath: string;
}

export class ConfigReader implements IConfigData {

    configData: []  ;
    
    constructor(public configPath: string){

    }

    readConfig(): void {
       
        let config: [];
        config = this.getConfig(this.configPath);
        this.configData= config;
    
           
    }

    private  getConfig(configpath: string): []  {
        let config: [] ;
        const fileData : string= readFileSync(configpath,{encoding: 'utf-8'});
        config= JSON.parse(fileData);

        return config;

    }
    
}