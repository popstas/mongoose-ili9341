// mongoose-mlx90614
load('api_config.js');
load('api_esp8266.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');
load('api_ili9341_spi.js');

print('### mongoose-ili9341');

// globals
let baseTopic = Cfg.get('app.mqtt_base');

// setup sensor
print('Init ili9341');
// ILI9341.drawDIF(0, 0, '/mongoose-os.dif');
ILI9341.drawDIF(0, 0, '/img.dif');
// ILI9341.fillScreen();
// ILI9341.setBgColor(255, 255, 0);
// ILI9341.print(0, 0, 'Hello, world!');

function start() {
  // setup led
  // GPIO.setup_output(Cfg.get('board.led1.pin'), 1);
  // GPIO.blink(Cfg.get('board.led1.pin'), 1000, 1000);

  MQTT.setEventHandler(function(conn, ev, edata) {
    if (ev === MQTT.EV_CONNACK) {
      MQTT.pub(Cfg.get('mqtt.will_topic'), 'Online', 1, Cfg.get('mqtt.will_retain'))
      // GPIO.blink(Cfg.get('board.led1.pin'), 0, 0);
    }
    // if (ev === MQTT.EV_CLOSE) GPIO.blink(Cfg.get('board.led1.pin'), 1000, 1000);
  }, null);

  print(baseTopic);
  
  MQTT.sub(baseTopic + '/draw-dif', function(conn, topic, msg) {
    print(topic + ': ' + msg);
    // showStrDetail(d, msg);

    // save msg as file
    // TODO:

    // draw file
    ILI9341.drawDIF('/last.dif');
  });
}

start();
