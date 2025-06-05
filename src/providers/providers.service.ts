import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ExternalQueueDto } from 'src/queue/dto/external-queue.dto';
import { firstValueFrom } from 'rxjs';
import { ProviderExternalApiDto } from './dto/providers.dto';

@Injectable()
export class ProvidersService {
  constructor(private readonly httpService: HttpService) {}

  async searchQueue(data: ProviderExternalApiDto): Promise<ExternalQueueDto[]> {
    const { url, apiKey } = data;
    const externalUrl = `${url}/int/getAllQueues`;

    try {
      const response = await firstValueFrom(
        this.httpService.post<ExternalQueueDto[]>(externalUrl, { apiKey }),
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          'Erro ao consultar API externa: ' + error.message,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Erro desconhecido ao consultar API externa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
