import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMoviceDto } from "./create-movie-dto";

export class UpdateMoviceDto extends PartialType(CreateMoviceDto) {}