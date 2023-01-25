import { Injectable, Inject } from '@nestjs/common';
import { Keyword } from './keyword.interface';
import { KeywordRepository } from '../keyword';
import { Title } from '../title';
import { spawn } from 'child_process'

@Injectable()
export class KeywordService {
    constructor(private readonly keywordRepository: KeywordRepository) {}
    
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

    async todayKeyword(): Promise<Keyword[]> {
        const date = new Date();
        date.setHours(0, 0 ,0, 0);
        return await this.keywordRepository.findAllKeywordByDate(date);
    }
}