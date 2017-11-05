#include <DHT11.h> 
#include <ArduinoJson.h>

int sensing = 3; 
int sw420 = 4;
int front = 8;
int rear = 9;     
int left = 10; 
int right = 11; 
int dht11_pin = 7; 
bool interrupt = false;
float temp = 0; 
float humi = 0; 

DHT11 dht11(dht11_pin); 
StaticJsonBuffer<500> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

void setup() {
  pinMode(sw420, INPUT); 
  pinMode(sensing, INPUT_PULLUP); 
  attachInterrupt(digitalPinToInterrupt(sensing), is_interrupt, FALLING);
  Serial.begin(9600); 
}

void loop() {
  dht11_initialize();
  bool mode = false; 
  
  if (interrupt) {
    interrupt = false;
    detachInterrupt(digitalPinToInterrupt(sensing));
    mode = true; 
    attachInterrupt(digitalPinToInterrupt(sensing), is_interrupt, FALLING);
  }
  jsonSend(mode); 
}

void is_interrupt() {
  interrupt = true;
}

long sw420_initialize() {
  delay(100);
  long measurement = pulseIn(sw420, HIGH);
  return measurement;
}

void dht11_initialize() {
  int err;
  if((err=dht11.read(humi, temp))==0) {}
  delay(DHT11_RETRY_DELAY); 
}

void jsonSend(bool mode) {
  root["mode"] = mode;
  root["impulse"] = sw420_initialize();
  root["front"] = digitalRead(front); 
  root["rear"] = digitalRead(rear); 
  root["left"] = digitalRead(left); 
  root["right"] = digitalRead(right); 
  root["temperature"] = temp; 
  root["humidity"] = humi;
  root.printTo(Serial); 
  Serial.println();  
}

