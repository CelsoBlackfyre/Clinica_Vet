package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"ClinicaVet/models"
)

var BD *gorm.DB

func Connect() {
	user := getEnv("DB_USER", "root")
	password := getEnv("DB_PASSWORD", "sql")
	host := getEnv("DB_HOST", "127.0.0.1")
	port := getEnv("DB_PORT", "3306")
	dbname := getEnv("DB_NAME", "clinica_vet")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname)

	var database *gorm.DB
	var err error

	for attempt := 1; attempt <= 30; attempt++ {
		database, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}

		log.Printf("Database connection attempt %d/30 failed: %v", attempt, err)
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		log.Printf("Failed to connect to database after retries: %v", err)
		panic("Erro ao conectar ao banco de dados. Check your DB credentials in .env")
	}

	err = database.AutoMigrate(&models.Cliente{})
	if err != nil {
		panic("Erro ao migrar o banco de dados (Cliente): " + err.Error())
	}

	err = database.AutoMigrate(&models.Vet{})
	if err != nil {
		panic("Erro ao migrar o banco de dados (Vet): " + err.Error())
	}

	err = database.AutoMigrate(&models.Pet{})
	if err != nil {
		panic("Erro ao migrar o banco de dados (Pet): " + err.Error())
	}

	err = database.AutoMigrate(&models.Consulta{})
	if err != nil {
		panic("Erro ao migrar o banco de dados (Consulta): " + err.Error())
	}

	BD = database
	log.Println("Database connected and migrated successfully")
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return fallback
}
