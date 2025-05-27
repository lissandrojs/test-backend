import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ProviderExternalApiDto {
  @ApiProperty({ description: 'API URL', example: 'https://api.example.com/' })
  @IsUrl()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'API Key for authentication',
    example: 'sk-1234567890abcdef',
  })
  @IsString()
  apiKey: string;
}
