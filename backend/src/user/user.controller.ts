import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {CreateAndPutUserDto} from "./dto/createAndPut-user.dto";
import { ApiCreatedResponse, ApiBody, ApiConflictResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { JWTTokenEntity } from './entities/jwt-token.entity';

@Controller('user')
export class UserController {
    /**
     * Handler to answer to /user route
     */

    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    @ApiConflictResponse({
        description: 'The username already exists in the database.'
    })
    @ApiBody({
        description: 'Payload to create a new user',
        type: CreateAndPutUserDto,
      })
    @Post()
    createUser(@Body() createUserDto : CreateAndPutUserDto): string {
        return "TODO";
    }

    @ApiOkResponse({
        description: 'Returns the user which corresponds to the token in the request header.',
        type: UserEntity
    })
    @ApiUnauthorizedResponse({
        description: 'The token in the request header is invalid.'
    })
    @ApiBearerAuth()
    @Get()
    getUser(): string {
        return 'user';
    }
   
    @ApiOkResponse({
        description: 'Returns the token of the user which corresponds to the username specified in the body.',
        type: JWTTokenEntity
    })
    @ApiUnauthorizedResponse({
        description: 'Username or password is incorrect.'
    })
    @ApiBody({
        description: 'Payload to login user.',
        type: CreateAndPutUserDto,
    })
    @Post('login')
    loginUser(): string {
        return "TODO";
    }


}