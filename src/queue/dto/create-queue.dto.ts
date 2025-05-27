import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateQueueDto {
  @ApiProperty({ description: 'Queue name', example: 'Support Queue' })
  @IsString()
  queue_name: string;

  @ApiProperty({ description: 'Instance identifier', example: 'instance_001' })
  @IsString()
  instance: string;

  @ApiProperty({ description: 'Queue status', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  status?: boolean = true;

  @ApiProperty({
    description: 'Verification date',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  verification_date?: Date;

  @ApiProperty({
    description: 'Connection date',
    example: '2024-01-15T09:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  connection_date?: Date;

  @ApiProperty({
    description: 'Number of waiting chats',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  waiting_chats?: number = 0;
}
