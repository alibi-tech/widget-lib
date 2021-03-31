export type WidgetMessageType = 'resize';
export type widgetSize = 'filmStrip' | 'filmStripAndPlayer';

const SIGNATURE = 'alibi-tech-message';

export interface WidgetMessagePayload {
  SIGNATURE: 'alibi-tech-message';
  messageType: WidgetMessageType;
  newSize?: widgetSize;
}

const DEBUG = false;

export class WidgetLib {
  private static sendParent(payload: WidgetMessagePayload): void {
    if (window.parent) {
      DEBUG && console.log(`WidgetLib.sendParent`, payload);
      window.parent.postMessage(payload, '*');
    } else {
      DEBUG && console.log(`WidgetLib.sendParent skipped - no parent`, payload);
    }
  }
  public static setSize(size: widgetSize): void {
    WidgetLib.sendParent({ SIGNATURE, messageType: 'resize', newSize: size });
  }

  public static widgetMessage(origin: string, event: MessageEvent): WidgetMessagePayload | undefined {
    DEBUG && console.log(`WidgetLib.isWidgetMessage `, { origin, event, s: event.data['SIGNATURE'], SIGNATURE });
    return event.origin === origin && event.data['SIGNATURE'] === SIGNATURE ? event.data : undefined;
  }
}
