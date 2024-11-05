import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, ClassSerializerInterceptor, UseInterceptors} from '@nestjs/common';
import {QuizzService} from "./quizz.service";
import {CreateAndPutQuizzDto} from "./dto/createQuizz-dto";
import {Observable} from "rxjs";
import {Quizz, QuizzDocument} from "./schema/quizz.schema";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { QuizzEntity } from './entities/quizz.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HandlerParamsCategory, HandlerParamsId } from './validators/handler-params';

@ApiTags('quiz')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('quiz')
export class QuizzController {
    /**
     * Handler to answer to /quizz route
     */
    constructor(private readonly _quizzService: QuizzService) {}


    @ApiCreatedResponse({
        description: 'The quiz has been successfully created.'
    })
    @ApiBody({
        description: 'Payload to create a new quiz',
        type: CreateAndPutQuizzDto,
      })
    @Post()
    ajouterQuizz(@Body() createAndPutQuizzDto: CreateAndPutQuizzDto): Observable<QuizzEntity> {
        return this._quizzService.createQuizz(createAndPutQuizzDto);
    }

    @ApiOkResponse({
        description: 'Returns the quiz with the specified ID.',
        type: QuizzEntity
    })
    @ApiNotFoundResponse({
        description: 'Quiz with the given "id" does not exist in the database.'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the quiz in the database',
        type: String,
        allowEmptyValue: false
      })
    @Get(':id')
    getQuizzById(@Param() params: HandlerParamsId): Observable<QuizzEntity> {
        return this._quizzService.findOne(params.id);
    }

    @ApiOkResponse({
        description: 'The quiz has been successfully updated.'
    })
    @ApiNotFoundResponse({
        description: 'Quiz with the given "id" does not exist in the database.'
    })
    @ApiUnauthorizedResponse({
        description: 'The user is not authorized to update the quiz.',
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the quiz in the database',
        type: String,
        allowEmptyValue: false
      })
    @ApiBody({
        description: 'Payload to update a quiz',
        type: CreateAndPutQuizzDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateQuizzById(@Param() params: HandlerParamsId, @Body() createAndPutQuizzDto: CreateAndPutQuizzDto, @Request() req): Observable<QuizzEntity> {
        return this._quizzService.modify(params.id, createAndPutQuizzDto, req.user.userId);
    }

    @ApiNoContentResponse({
        description: 'The quiz has been successfully deleted.'
    })
    @ApiNotFoundResponse({
        description: 'Quiz with the given "id" does not exist in the database.'
    })
    @ApiUnauthorizedResponse({
        description: 'The user is not authorized to delete the quiz.',
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the quiz in the database',
        type: String,
        allowEmptyValue: false
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteQuizzById(@Param() params: HandlerParamsId, @Request() req): Observable<void> {
        return this._quizzService.delete(params.id, req.user.userId);
    }

    @ApiOkResponse({
        description: 'Returns an array of all quiz.',
        type: [QuizzEntity]
    })
    @Get()
    getQuizzs(): Observable<QuizzEntity[]> {
        return this._quizzService.getAllQuizz();
    }


    @ApiOkResponse({
        description: 'Returns an array of quiz of the specified category.',
        type: [QuizzEntity]
    })
    @ApiParam({
        name: 'category',
        description: 'Category of the quiz',
        type: Number,
        allowEmptyValue: false
    })
    @Get('category/:category')
    getQuizzByCategory(@Param() params: HandlerParamsCategory,): Observable<QuizzEntity[]> {
        return this._quizzService.findByCategory(params.category);
    }

    /**
    @Get(':motcle')
    searchQuizzByKeyword(@Param('motcle') motcle: string): string {
        return 'TODO';
    }**/

}