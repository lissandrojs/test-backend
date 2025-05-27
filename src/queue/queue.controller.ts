import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { ProvidersService } from 'src/providers/providers.service';
import { ProviderExternalApiDto } from 'src/providers/dto/providers.dto';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private readonly providersQueue: ProvidersService,
  ) {}

  @Post('/search/externalQueue')
  async search(@Body() externalQueue: ProviderExternalApiDto) {
    const resultExternalQueue =
      await this.providersQueue.searchQueue(externalQueue);

    await this.queueService.processExternalQueues(resultExternalQueue);

    return await this.findAll();
  }

  @Post('disconnected')
  create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
  }

  @Get('disconnected')
  findAll() {
    return this.queueService.findAll();
  }

  @Patch('disconnected/:id')
  update(@Param('id') id: string) {
    return this.queueService.markAsConnected(+id);
  }

  @Delete('disconnected/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.queueService.remove(+id);
  }
}
