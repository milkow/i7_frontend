import { I7EventsModule } from './i7events.module';

describe('EventsModule', () => {
  let eventsModule: I7EventsModule;

  beforeEach(() => {
    eventsModule = new I7EventsModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
