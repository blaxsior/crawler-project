import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  MYSQL_USER: string;

  @IsString()
  MYSQL_PASSWORD: string;

  @IsString()
  MYSQL_DATABASE: string;
}

export function validateOptions(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: true });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
