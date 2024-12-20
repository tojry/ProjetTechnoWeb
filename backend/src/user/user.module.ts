import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserDao } from './dao/user.dao';
import { AuthModule } from '../auth/auth.module';
import { QuizzModule } from 'src/quiz/quizz.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
        forwardRef(() => QuizzModule)
    ],
    controllers: [UserController],
    providers: [UserService, UserDao],
    exports: [UserService, UserDao],
})
export class UserModule {}