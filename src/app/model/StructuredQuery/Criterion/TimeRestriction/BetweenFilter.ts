import { AbstractTimeRestriction } from './AbstractTimeRestriction';

export class BetweenFilter extends AbstractTimeRestriction {
  constructor(afterDate: string, beforeDate: string) {
    super(afterDate, beforeDate);
  }
}
