

import {readFileSync} from 'fs';
import { isJSON , errTypes,ErrFactory} from './types';


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
        let config: [] =[] ;
        const fileData : string= readFileSync(configpath,{encoding: 'utf-8'});
        if (isJSON(fileData)){
    
        config= JSON.parse(fileData);
        return config;
        }
        else {
            throw ErrFactory.getErr(errTypes.invalidFile)
        }

    }
    
}