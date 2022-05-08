import { isProdEnv } from '/@/app.environment';
import { existsSync } from 'fs';
import { resolve } from 'path';

function parseEnv() {
  const localEnv = resolve('.env.development');
  const prodEnv = resolve('.env.production');

  if (!existsSync(localEnv) && !existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProdEnv && existsSync(prodEnv) ? prodEnv : localEnv;
  return { path: filePath };
}

export default parseEnv();
