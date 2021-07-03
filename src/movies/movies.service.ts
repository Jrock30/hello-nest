import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoviceDto } from './dto/create-movie-dto';
import { UpdateMoviceDto } from './dto/update-movice.dto';
import { Movie } from './entities/movie.entity';

/**
 * @Service 와 비슷한 것 이라 생각, 아래의 providers 에 있어야함.
 * providers: [MoviesService]
 */
@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number):Movie {
        const movie = this.movies.find(movie => movie.id === +id); // parseInt(id) == +id , String to Integer
        if (!movie) {
            throw new NotFoundException(`Movie with ID: ${id} not found.`); // nest 에서 exception 을 제공한다. json 으로 404 뱉음.
        }
        return movie;
    }

    deleteOne(id:number) {
        this.getOne(id); // 삭제 전에 id 를 체크하는 서비스 로직을 태운다.
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData: CreateMoviceDto) {
        this.movies.push({
            id: this.movies.length + 1,
        ...movieData
        })
    }

    update(id:number, updateData: UpdateMoviceDto) {
        // 간단하게 메모리 DB 형식으로 사용하고 있으니 지웠다고 다시 Push
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
