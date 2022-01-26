/*********
  Rui Santos
  Complete project details at https://randomnerdtutorials.com  
  Based on the Dallas Temperature Library example
*********/

#include <OneWire.h>
#include <DallasTemperature.h>
#include <SD.h>

// Insertion bibliothèque TinyGPS
#include <TinyGPS++.h>

File myFile;

/********************************************************************/
// Data wire is conntec to the Arduino digital pin 4
#define ONE_WIRE_BUS 4 //temperature Sensor
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);
// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);
/********************************************************************/

/*************************/
// Variables declaration:
float degreeCelsius;
float sensorValue = 0; 
float moistureLevel = 0;
// A3 Moisture Sensor
/*************************/

/******************************************************************************************************************/
// variables for pH
#define SensorPin 0          // the pH meter Analog output is connected with the Arduino’s Analog // A0 pH Sensor
unsigned long int avgValue;  //Store the average value of the sensor feedback
float pH;
int buf[10],temp;
/******************************************************************************************************************/

/***********************************************************************************/
// Déclaration des variables pour le GPS
char data;
String date =""; // Pour afficher la date : heure GMT

// Création de l'objet GPS
TinyGPSPlus gps;

// Déclaration des variables pour la liaison série entre Arduno UNO et GPS
#define RX 2 // Affectation des broches pour la liaison série logicielle
#define TX 3 // de l'Arduino

#include <SoftwareSerial.h> // Insertion de la bibliothèque serie logicielle
SoftwareSerial GPS(RX, TX); // Création de l'objet GPS pour la liaison série
                            // entre l'Arduino et le module GPS
/***********************************************************************************/

/********************************************************************************************/
void setup(void)
{
  GPS.begin(9600);    // initialisation de la liaison série du GPS pour reception données
  // Start serial communication for debugging purposes
  Serial.begin(9600);
  Serial.print ("Initializing SD card...");
  // on Ethernet shield CS corresponds to 4 pins. By default, it is set to output mode
  // note that if it is not used as a CS pin, SS pin on the equipment
  // (10 on most Arduino boards, 53 on Arduino Mega) should be left in output mode.
  // otherwise SD library functions will not work.
  pinMode(10, OUTPUT);
  if (!SD.begin(10)) {
    Serial.println("Initialization SD card failed!");
    return;
  }
  Serial.println("Initialization SD card done.");
  if (SD.exists("openlake.csv")) {
    if (SD.remove("openlake.csv")) {
      Serial.println("Deleting old openlake.csv file");
    }
    else {
      Serial.println("Can't delete old openlake.csv file");
    }
    }
  myFile = SD.open("openlake.csv", FILE_WRITE);
  if (myFile) {
    Serial.print ("Writing file's first line...");
    myFile.print("degree_celsius");
    myFile.print(",");
    myFile.print("humidity");
    myFile.print(",");
    myFile.print("ph");
    myFile.print(",");
    myFile.print("latitude");
    myFile.print(",");
    myFile.print("longitude");
    myFile.print(",");
    myFile.println("date et heure");
    // close the file:
    myFile.close();
    Serial.println("done.");
  } else {
    // if the file did not open, we will display an error message:
    Serial.println("Error can't open file on SD card");
  }
  
  // Start up the library
  sensors.begin();
}
/********************************************************************************************/

/*******************************************************************************************/
void loop(void){

  // GPS
  while (GPS.available()) {
    data = GPS.read();
    gps.encode(data);
    if (gps.location.isUpdated()){

      // TEMPERATURE 
      degreeCelsius = get_temperature();

      // Humidity
      moistureLevel = get_moisture_level();

      // pH
      pH = get_pH();

      date = String(gps.date.day()) + "/" + String(gps.date.month()) + "/" + String(gps.date.year()) + " "+ String (gps.time.hour()) + ":" + String (gps.time.minute()) + ":" + String (gps.time.second());

      write_data(degreeCelsius,moistureLevel,pH,gps.location.lat(),gps.location.lng(),date);
      print_data(degreeCelsius,moistureLevel,pH,gps.location.lat(),gps.location.lng(),date);

      delay(10);
    }
  }
}
/*******************************************************************************************/

/**************************************************************************************************************/
float get_temperature(void){
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  return sensors.getTempCByIndex(0); 
}
/**************************************************************************************************************/

/***********************************************/
float get_moisture_level(void){
 for (int i = 0; i <= 100; i++) 
 { 
   sensorValue = sensorValue + analogRead(A3); 
   delay(1); 
 } 
 sensorValue = sensorValue/100.0; 
 return sensorValue;   
}
/***********************************************/

/********************************************************************************************/
float get_pH(void){
  for(int i=0;i<10;i++)       //Get 10 sample value from the sensor for smooth the value
  { 
    buf[i]=analogRead(SensorPin);
    delay(10);
  }
  for(int i=0;i<9;i++)        //sort the analog from small to large
  {
    for(int j=i+1;j<10;j++)
    {
      if(buf[i]>buf[j])
      {
        temp=buf[i];
        buf[i]=buf[j];
        buf[j]=temp;
      }
    }
  }
  avgValue=0;
  for(int i=2;i<8;i++)                      //take the average value of 6 center sample
    avgValue+=buf[i];
  float phValue=(float)avgValue*5.0/1024/6; //convert the analog into millivolt
  phValue=3.5*phValue;                      //convert the millivolt into pH value

  return phValue;
}
/********************************************************************************************/

/********************************************************************************************************/
void print_data(float temp, int humidity, float ph, double latitude, double longitude, String date){
  Serial.print(temp,4);
  Serial.print(",");
  Serial.print(humidity);
  Serial.print(",");
  Serial.print(ph,4);
  Serial.print(",");
  Serial.print(latitude,8); //8 decimal => 1 mm
  Serial.print(",");
  Serial.print(longitude,8); //8 decimal => 1 mm
  Serial.print(",");
  Serial.println(date);
}
/********************************************************************************************************/

/********************************************************************************************************************************/
void write_data(float temp, int humidity, float ph, double latitude, double longitude, String date){
  // https://nerdytechy.com/sd-card-for-arduino-tutorial/

  // open the file. Note that you cannot open several files in parallel. Before opening a new file, the old one must be closed
  myFile = SD.open("openlake.csv", FILE_WRITE);
  
  if (myFile) {
    myFile.print(temp,4);
    myFile.print(",");
    myFile.print(humidity);
    myFile.print(",");
    myFile.print(ph,4);
    myFile.print(",");
    myFile.print(latitude,8); //8 decimal => 1 mm
    myFile.print(",");
    myFile.print(longitude,8); //8 decimal => 1 mm
    myFile.print(",");
    myFile.println(date);
    // close the file:
    myFile.close();
  } else {
    // if the file did not open, we will display an error message:
    Serial.println("Error can't open file on SD card");
  }
}
/********************************************************************************************************************************/
