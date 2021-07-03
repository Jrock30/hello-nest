import { Module } from '@nestjs/common';
import { MoviesController } from './movices.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService]
})
export class MoviesModule {}
