import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class JWTTokenEntity{

    @ApiProperty({
        name: 'token',
        description: 'Token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzEzNjUzNjgsImV4cCI6MTU3MTM2NjY2OH0.7WJ9aXZqS4wq7U0yVzJhX7Jw4yqJ4rD5kH6k5yjJjw',
    })
    @Expose()
    @Type(() => String)
    token: string;
}