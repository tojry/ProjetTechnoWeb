import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Matches } from "class-validator";

export class CreateAndPutUserDto {

    @ApiProperty({
        name: 'id',
        description: 'Username',
        example: 'UserTest',
    })
    @IsString()
    @IsNotEmpty()
    readonly id : string;

    @ApiProperty({
        name: 'password',
        description: 'Password of the user',
        example: 'PasswordTest',
    })
    @IsString()
    @IsNotEmpty()
    readonly password : string;
}