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
        // Vamos tratar apenas filas desconectadas e as que foram reconectadas
        // Verifica se a fila já existe no banco

        if (internalQueue) {
          // Atualiza a fila existente
          internalQueue = await this.update(internalQueue.id, {
            status: false,
            verification_date: verificationDate,
            waiting_chats: currentQueue.openChats || 0,
          });
        } else {
          // Cria nova fila
          internalQueue = await this.create({
            queue_name: currentQueue.name,
            instance: currentQueue.type,
            status: false,
            verification_date: verificationDate,
            waiting_chats: currentQueue.openChats || 0,
          });
        }
      } else if (currentQueue.connected === true) {
        // Verifica se a fila estava desconectada anteriormente

        if (internalQueue && currentQueue.connected === true) {
          // A fila estava desconectada e agora está conectada
          await this.update(internalQueue.id, {
            status: true,
            verification_date: verificationDate,
            connection_date: verificationDate,
            waiting_chats: currentQueue.openChats || 0,
          });
        }
        // Se a fila já estava conectada ou é nova e conectada, não armazenamos
      }
    }
  }
}
