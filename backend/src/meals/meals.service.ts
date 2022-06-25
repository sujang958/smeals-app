import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import client, { DEFAULT_QUERYS } from '../../utils/api';
import { Meal } from './entities/meal.entity';

@Injectable()
export class MealsService {
  async getMeals(code: string, scCode: string, date: string): Promise<Meal> {
    if (!code || !scCode || !date)
      throw new BadRequestException('잘못된 요청이에요');
    if (date.length !== 8 || isNaN(Number(date)))
      throw new BadRequestException('날짜 형식이 맞지 않아요');

    try {
      const { data } = await client.get('/mealServiceDietInfo', {
        params: {
          ...DEFAULT_QUERYS,
          SD_SCHUL_CODE: code,
          ATPT_OFCDC_SC_CODE: scCode,
          MLSV_YMD: date,
        },
      });

      if (!('mealServiceDietInfo' in data)) {
        throw new NotFoundException('급식을 찾을 수 없어요');
      }

      const mealSource = data.mealServiceDietInfo[1].row as any[];
      console.log(mealSource[0].DDISH_NM);
      return {
        meals: mealSource.map((mealSrc) => ({
          kcal: mealSrc.CAL_INFO,
          type: mealSrc.MMEAL_SC_NM,
          date: mealSrc.MLSV_YMD,
          dishes: (mealSrc.DDISH_NM as string)
            .split('<br/>')
            .map((dish) => dish.split('(')[0].trim().replace(/\*/gi, '')),
          nutrients: (mealSrc.NTR_INFO as string)
            .split('<br/>')
            .map((ntrSrc) => ntrSrc.split(':'))
            .map(([name, value]) => [name.trim(), value.trim()]),
        })),
        schoolName: mealSource[0].ATPT_OFCDC_SC_NM,
      };
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
