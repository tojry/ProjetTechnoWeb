import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {CreateAndPutUserDto} from "./dto/createAndPut-user.dto";
import { ApiCreatedResponse, ApiBody, ApiConflictResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { JWTTokenEntity } from './entities/jwt-token.entity';
import {UserService} from "./user.service";
import {User, UserDocument} from "./schema/user.schema";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {AuthService} from "../auth/auth.service";


@Controller('user')
export class UserController {
    /**
     * Handler to answer to /user route
     */
    constructor(private readonly _userService: UserService, private readonly authService: AuthService) {}

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
    createUser(@Body() createUserDto : CreateAndPutUserDto): Observable<UserDocument> {
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
    @Get(':id')
    getUser(@Param('id') id: string): Promise<User | undefined> {
        return this._userService.findOne(id);
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
    login(@Body() loginDto : CreateAndPutUserDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        return req.logout();
    }


}