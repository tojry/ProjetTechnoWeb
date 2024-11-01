import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {CreateAndPutUserDto} from "./dto/createAndPut-user.dto";

@Controller('user')
export class UserController {
    /**
     * Handler to answer to /user route
     */

    @Post()
    createUser(@Body() createUserDto : CreateAndPutUserDto): string {
        return "TODO";
    }

    @Get()
    getUser(): string {
        return 'user';
    }

    @Put()
    putUser(@Body() createAndPutUserDto : CreateAndPutUserDto): string {
        return "TODO";
    }

    @Delete()
    deleteUser(): string {
        return "TODO";
    }

    /**@Post()
    loginUser(): string {
        return "TODO";
    }**/


}