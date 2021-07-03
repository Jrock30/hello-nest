import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CreateMoviceDto } from './dto/create-movie-dto';
import { UpdateMoviceDto } from './dto/update-movice.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    //  dependeny injection, 생성자 주입
    constructor(private readonly moviesService: MoviesService) {} // constructor 는 MoviesService 를 가진다

    /**
     *  @Req, @Res 를 사용하면 Express 에 접근이 가능하다.
     *  기본적으로 NestJS 는 Express 위에서 돌아간다.
     *  하지만 Fastify 같은 다른 라이브러리와도 호환이 된다.
     *  즉 NestJS 는 Fastify 와 Express 두개에서 돌아간다고 생각하고 @Req, @Res 는 많이 사용하지 않는게 좋다. Express 에서 종속적이 되기 때문에
     *  성능이 Fastify 가 Express 보다 2배는 빠르다고 한다.
     *  ex) getAll(@Req() req, @Res() res)
     *  
     */
    @Get()
    getAll() :Movie[]{
        return this.moviesService.getAll();
    }

    @Get("/:id") // Path Variables
    getOne(@Param("id") movieId:number) :Movie{
        return this.moviesService.getOne(movieId);
    }
 
    @Post() // RequestBody Type CreateMoviceDto
    create(@Body() movieData: CreateMoviceDto) {
        console.log(movieData);
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId:number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch("/:id") // Path Variables, RequestBody
    patch(@Param("id") movieId: number, @Body() updateData: UpdateMoviceDto) {
        return this.moviesService.update(movieId, updateData);
    }

}
