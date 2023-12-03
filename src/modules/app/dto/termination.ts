import { INestApplication, ShutdownSignal } from '@nestjs/common';

export interface SetupTerminationParams {
  app: INestApplication;
  signals?: ShutdownSignal[] | string[];
}
