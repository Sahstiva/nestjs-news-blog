import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcService {
  calc(operator: string, operands: number[]): number | undefined {
    switch (operator) {
      case 'plus':
        return operands.reduce((sum, current) => sum + current);
      case 'minus':
        return operands.reduce((result, current) => result - current);
      case 'multiple':
        return operands.reduce((result, current) => result * current);
      case 'divide':
        return operands.reduce((result, current) => result / current);
      default:
        return undefined;
    }
  }
}
