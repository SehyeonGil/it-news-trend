import { ParsedDto } from '../dto';

export interface ParserService {
  parse(page: string): Array<ParsedDto>
}
