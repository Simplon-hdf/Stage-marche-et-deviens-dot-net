import { Pipe, PipeTransform } from '@angular/core';
import { Session } from '../intefaces/session';

@Pipe({
  name: 'sessionActive',
  standalone: true
})
export class SessionActivePipe implements PipeTransform {

  transform(sessions: Session[]): Session[] {
    const currentDate = new Date();
    return sessions.filter(session => {
      const sessionEndDate = new Date(session.dateFin);
      return sessionEndDate >= currentDate;
    });
  }

}
