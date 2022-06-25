import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import client, { DEFAULT_QUERYS } from '../../utils/api';
import { SchoolDto } from './entities/school.entities';

// const Got = eval("import('got')"); Lol

@Injectable()
export class SchoolsService {
  async getSchools(query: string): Promise<SchoolDto[]> {
    try {
      const { data } = await client.get('/schoolInfo', {
        params: {
          ...DEFAULT_QUERYS,
          SCHUL_NM: query ?? '교',
        },
      });

      if (!('schoolInfo' in data)) {
        throw new NotFoundException('학교를 찾을 수 없어요');
      }

      const schools = data.schoolInfo[1].row as any[];

      return schools.map((school) => ({
        code: school.SD_SCHUL_CODE,
        scCode: school.ATPT_OFCDC_SC_CODE,
        name: school.SCHUL_NM,
        where: school.ORG_RDNMA,
        site: school.HMPG_ADRES,
      }));
    } catch (e) {
      if (e instanceof HttpException) throw e;
      if (e instanceof AxiosError) {
        throw new NotFoundException('학교를 찾을 수 없어요');
      } else {
        throw new InternalServerErrorException('서버에 문제가 발생했어요');
      }
    }
  }
}
