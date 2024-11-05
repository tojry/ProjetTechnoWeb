import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {CreateAndPutUserDto} from "./dto/createAndPut-user.dto";
import { ApiCreatedResponse, ApiBody, ApiConflictResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { JWTEntity } from './entities/jwt.entity';
import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('user')
export class UserController {
    /**
     * Handler to answer to /user route
     */
    constructor(private readonly _userService: UserService, private readonly _authService: AuthService) {}

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
    createUser(@Body() createUserDto : CreateAndPutUserDto): Observable<UserEntity> {
        return this._userService.createUser(createUserDto);
    }

    @ApiOkResponse({
        description: 'Returns the user which corresponds to the token in the request header.',
        type: UserEntity
    })
    @ApiUnauthorizedResponse({
        description: 'The token in the request header is invalid.'
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    getUser(@Request() req): Observable<UserEntity> {
        return this._userService.findOne(req.user.userId);
    }
   
    @ApiOkResponse({
        description: 'Returns the token of the user which corresponds to the username specified in the body.',
        type: JWTEntity
    })
    @ApiUnauthorizedResponse({
        description: 'Username or password is incorrect.'
    })
    @ApiBody({
        description: 'Payload to login user.',
        type: CreateAndPutUserDto,
    })
    @Post('login')
    login(@Body() loginDto : CreateAndPutUserDto): Observable<JWTEntity> {
        return this._authService.login(loginDto);
    }

}