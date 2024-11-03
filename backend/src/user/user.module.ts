import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserDao } from './dao/user.dao';
import { AuthModule } from '../auth/auth.module'; // Assure-toi que ce chemin est correct

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule), // Utilisation de forwardRef pour la circularité
    ],
    controllers: [UserController],
    providers: [UserService, UserDao],
    exports: [UserService], // Exporte UserService si nécessaire
})
export class UserModule {}