import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimDto } from './dto/claim.dto';

@Controller('claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  async create(@Body() claim: ClaimDto) {
    try {
      return await this.claimService.create(claim);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.claimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() claim: ClaimDto) {
    try {
      return await this.claimService.update(id, claim);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimService.remove(+id);
  }
}
