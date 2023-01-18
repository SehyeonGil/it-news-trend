import { Newspaper } from "../common/newspaper";

export interface CreateNewBoardPageUrlDto {
    newspaper: Newspaper,
    page: number
}