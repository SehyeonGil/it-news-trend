import { Newspaper } from "../newspaper";

export interface CreateNewBoardPageUrlDto {
    newspaper: Newspaper,
    page: number
}