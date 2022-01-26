// Insertion bibliothèque TinyGPS
#include <TinyGPS++.h>

// Déclaration des variables pour le GPS
char data;
double latitude;
double longitude;
double alt; //altitude
double vitesse;
unsigned long nbre_sat;

// Pour afficher la date
int annee;
byte mois, jour, seconde, minute, heure; // heure GMT
String date ="";

// Création de l'objet GPS
TinyGPSPlus gps;

// Déclaration des variables pour la liaison série entre Arduno UNO et GPS
#define RX 2 // Affectation des broches pour la liaison série logicielle
#define TX 3 // de l'Arduino

#include <SoftwareSerial.h> // Insertion de la bibliothèque serie logicielle
SoftwareSerial GPS(RX, TX); // Création de l'objet GPS pour la liaison série
                            // entre l'Arduino et le module GPS
   
void setup() {
//Initialisation des liaisons série
 Serial.print("Initialisation liaisons series");
 GPS.begin(9600);    // initialisation de la liaison série du GPS pour reception données
 Serial.begin(9600);
}
     
void loop() {
	while (GPS.available()) {
    data = GPS.read();
    Serial.print(data);
    gps.encode(data);
    	if (gps.location.isUpdated()){
    		  latitude = gps.location.lat();
        	longitude = gps.location.lng();
        	alt = gps.altitude.meters();
        	vitesse = gps.speed.kmph();
        	nbre_sat = gps.satellites.value();

          annee = gps.date.year();
          mois = gps.date.month();
          jour = gps.date.day();

          heure = gps.time.hour();
          minute = gps.time.minute();
          seconde = gps.time.second();
        	
      		date =String(jour) + "/" + String(mois) + "/" + String(annee) + " "+ String (heure) + ":" + String (minute) + ":" + String (seconde);
          
        	Serial.println(" ");   
        	Serial.println("-------- DONNEES GPS DECODEES ------------");
        	Serial.print("Latitude="); Serial.println(latitude);
        	Serial.print("Longitude="); Serial.println(longitude);
        	Serial.print("Altitude (m) ="); Serial.println(alt);
        	Serial.print("Vitesse (km/h)="); Serial.println(vitesse);
        	Serial.print("Nbre de satellites="); Serial.println(nbre_sat);
        	Serial.print("Date="); Serial.println(date);

          delay(10000);
     	}
    }
}
