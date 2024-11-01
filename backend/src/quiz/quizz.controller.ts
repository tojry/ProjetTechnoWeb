import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {QuizzService} from "./quizz.service";
import {CreateAndPutQuizzDto} from "./dto/createQuizz-dto";
import {Observable} from "rxjs";
import {Quizz, QuizzDocument} from "./schema/quizz.schema";

@Controller('quiz')
export class QuizzController {
    /**
     * Handler to answer to /quizz route
     */
    constructor(private readonly _quizzService: QuizzService) {}


    @Post()
    ajouterQuizz(@Body() createAndPutQuizzDto: CreateAndPutQuizzDto): Observable<QuizzDocument> {
        return this._quizzService.createQuizz(createAndPutQuizzDto);
    }

    @Get(':id')
    getQuizzById(@Param('id') id: string): string {
        return 'quizz';
    }

    @Put(':id')
    updateQuizzById(@Param('id') id: string): string {
        return 'TODO';
    }

    @Delete(':id')
    deleteQuizzById(@Param('id') id: string): string {
        return 'TODO';
    }

    @Post(':id')
    answerQuizzById(@Param('id') id: string): string {
        return 'TODO';
    }

    @Get()
    getQuizzs(): Promise<Quizz[]> {
        return this._quizzService.getAllQuizz();
    }

    /**@Get(':categorie')
    QuizzById(@Param('categorie') categorie: string): string {
        return 'TODO';
    }

    @Get(':motcle')
    searchQuizzByKeyword(@Param('motcle') motcle: string): string {
        return 'TODO';
    }**/

}