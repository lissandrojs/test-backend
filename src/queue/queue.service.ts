import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from './entities/queue.entity';
import { Repository } from 'typeorm';
import { ExternalQueueDto } from './dto/external-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue) private queuRepository: Repository<Queue>,
  ) {}
  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    const newQueue = this.queuRepository.create(createQueueDto);
    return this.queuRepository.save(newQueue);
  }

  async findAll(): Promise<Queue[]> {
    return this.queuRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.queuRepository.delete(id);
  }

  async findOne(id: number): Promise<Queue | null> {
    return this.queuRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateFilaDto: UpdateQueueDto,
  ): Promise<Queue | null> {
    await this.queuRepository.update(id, updateFilaDto);
    return this.findOne(id);
  }

  async markAsConnected(id: number): Promise<Queue | null> {
    await this.queuRepository.update(id, {
      status: true,
      connection_date: new Date(),
    });
    return this.queuRepository.findOne({ where: { id } });
  }
  async processExternalQueues(
    externalQueues: ExternalQueueDto[],
  ): Promise<void> {
    const verificationDate = new Date();

    for (const currentQueue of externalQueues) {
      let internalQueue = await this.findOne(currentQueue.id);
      if (currentQueue.connected === false) {
        if (internalQueue) {
          internalQueue = await this.update(internalQueue.id, {
            status: currentQueue.enabled,
            verification_date: verificationDate,
            waiting_chats: currentQueue.openChats || 0,
          });
        } else {
          internalQueue = await this.create({
            queue_name: currentQueue.name,
            instance: currentQueue.type,
            status: currentQueue.enabled,
            verification_date: verificationDate,
            waiting_chats: currentQueue.openChats || 0,
          });
        }
      } else if (currentQueue.connected === true) {
        if (internalQueue && currentQueue.connected === true) {
          await this.update(internalQueue.id, {
            status: currentQueue.enabled,
            verification_date: verificationDate,
            connection_date: verificationDate,
            waiting_chats: currentQueue.openChats || 0,
          });
        }
      }
    }
  }
}
