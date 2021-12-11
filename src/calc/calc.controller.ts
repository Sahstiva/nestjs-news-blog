import {Body, Controller, Headers, HttpException, HttpStatus, Put} from '@nestjs/common';
import { CalcService } from './calc.service';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Put('/')
  calc(@Headers() headers, @Body() operands: number[]): number {
    const result = this.calcService.calc(headers['type-operation'], operands);
    if (result !== undefined) return result;
    else
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Оператор не определён!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}
