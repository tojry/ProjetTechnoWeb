import { IsMongoId, IsNotEmpty, IsNumberString } from 'class-validator';

export class HandlerParamsId {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class HandlerParamsCategory {
  @IsNumberString()
  category: number;
}