import { Injectable } from '@nestjs/common';
import { Keyword } from './keyword.interface';
import { Title } from '../title';
import { spawn } from 'child_process'

@Injectable()
export class KeywordService {
    constructor() {}
    
    async extractKeywordFromTitle(title:Title[]): Promise<string> {
        const text = title.map(t => t.text).join(";");
        const child = spawn('python3', ['src/util/wordrank.py', text.replace(/\[|\]/g, "")]);

        let data = "";
        for await (const chunk of child.stdout) {
            console.log('stdout chunk: ' + chunk);
            data += chunk;
        }
    
        return data;
    }
}

/* title: Title[] */

//.replace(/\[|\]/g, "")