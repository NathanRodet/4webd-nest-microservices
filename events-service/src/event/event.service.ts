import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import Event from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

const stripe = require('stripe')('sk_test_51N6D9qJBS32tQ8g9ASUBQnX8FKIb7pYlAOOIqceuoaszmH9gFDZV4soSiePUsI2F4cbFHVGhwNQspYq4QFbTyf6j006Hu7TCix');

async function create_product(nom, price) {
  const product = await stripe.products.create({
    name: nom,
    description: 'Achat d\'une place de concert',
  });
  const priceData = await stripe.prices.create({
    unit_amount: price,
    currency: 'eur',
    product: product.id,
  });
  return priceData.id;
}
async function getPaymentLink(priceId) {
  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ]
    });
    return paymentLink.url;
  } catch (err) {
    console.error(err);
  }
}


@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) { }

  async create(createEventDto: CreateEventDto): Promise<void> {
    if (await this.eventsRepository.findOneBy({ titre: createEventDto.titre }))
      throw new HttpException(
        { message: 'Event may already exist' },
        HttpStatus.BAD_REQUEST,
      );
    try {
      let priceId = await create_product(createEventDto.titre, createEventDto.price);
      let paymentLink;
      await getPaymentLink(priceId).then(url => paymentLink = url);
      const eventWithPaymentLink = Object.assign({}, createEventDto, { paymentLink: paymentLink });
      await this.eventsRepository.save(

        this.eventsRepository.create(eventWithPaymentLink),
      );


    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Error creating event' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Event[]> {
    return await this.eventsRepository.find();
  }

  async findOneById(id: string) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event)
      throw new HttpException(
        { message: 'Event not found.' },
        HttpStatus.NOT_FOUND,
      );
    else return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event)
      throw new HttpException(
        { message: 'Event not found.' },
        HttpStatus.NOT_FOUND,
      );
    else {
      const eventData = {
        titre: updateEventDto.titre,
        description: updateEventDto.description,
        dateDebut: updateEventDto.DateDebut,
        dateFin: updateEventDto.DateFin,
        ticketsDisponible: updateEventDto.ticketsDisponible,
        price: updateEventDto.price,
        paymentLink: updateEventDto.paymentLink
      };
      return await this.eventsRepository.update({ id }, eventData);
    }
  }

  async remove(id: string) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event)
      throw new HttpException(
        { message: 'Event not found.' },
        HttpStatus.NOT_FOUND,
      );
    else return await this.eventsRepository.delete({ id });
  }
  async getLink(id: string) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event)
      throw new HttpException(
        { message: 'Event not found.' },
        HttpStatus.NOT_FOUND,
      );
    else return event.paymentLink;
  }
}


