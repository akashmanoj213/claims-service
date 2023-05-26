import { PartialType } from '@nestjs/mapped-types';
import { CreateClaimDto } from './claim.dto';

export class UpdateClaimDto extends PartialType(CreateClaimDto) {}
