import { Pipe, PipeTransform } from '@angular/core';
import { StudentDetailsInterface } from '../interface/student-details-interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: StudentDetailsInterface[], ...args: [boolean, string]): any {
    const [sortingStatus, keyName] = args;

    let sortingTableData = sortingStatus == true ? value.sort((next: StudentDetailsInterface | any, prev: StudentDetailsInterface | any) =>
      (next[keyName] > prev[keyName]) ? 1 : -1) : value.sort((next: StudentDetailsInterface | any, prev: StudentDetailsInterface | any) =>
        (next[keyName] < prev[keyName]) ? 1 : -1);

    return sortingTableData;

  };
};
