import { AppService } from './app.service';
import { SetupTerminationParams } from './dto';

export function setupTermination(params: SetupTerminationParams): void {
  const { app, signals } = params;
  app.enableShutdownHooks(signals);
  app.get(AppService).setupTermination(app);
}
