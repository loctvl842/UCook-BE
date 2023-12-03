import * as packageJSON from '@/../package.json';
import {
  BeforeApplicationShutdown,
  INestApplication,
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import { HttpTerminator, createHttpTerminator } from 'http-terminator';
import { VersionRes } from './dto';

@Injectable()
export class AppService implements BeforeApplicationShutdown {
  private httpTerminator: HttpTerminator | null = null;

  public getVersion(): VersionRes {
    return { version: packageJSON.version };
  }

  public checkHealth(): string {
    return 'OK';
  }

  async beforeApplicationShutdown(): Promise<void> {
    await this.httpTerminator.terminate();
  }

  setupTermination(app: INestApplication): void {
    this.httpTerminator = createHttpTerminator({
      server: app.getHttpServer(),
    });
  }
}
