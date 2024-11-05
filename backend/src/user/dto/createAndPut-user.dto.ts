import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Matches } from "class-validator";

export class CreateAndPutUserDto {

    @ApiProperty({
        name: 'username',
        description: 'Username (unique)',
        example: 'UserTest',
    })
    @IsString()
    @IsNotEmpty()
    readonly username : string;

    @ApiProperty({
        name: 'password',
        description: 'Password of the user',
        example: 'PasswordTest',
    })
    @IsString()
    @IsNotEmpty()
    readonly password : string;
}