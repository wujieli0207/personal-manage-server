import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResultEnum } from '/@/constants/system.constant';

/**
 * @class TransoformInterceptor
 * @classdesc 控制器数据响应成功时，在此转换为标准的数据结构
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          result: data,
          code: ResultEnum.SUCCESS,
          msg: '请求成功',
        };
      }),
    );
  }
}
