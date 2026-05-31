package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"ClinicaVet/models"
)

var BD *gorm.DB

func Connect() {
	// Load configuration from environment variables with sensible defaults
	// (godotenv should be loaded in main.go before calling Connect)
	user := getEnv("DB_USER", "root")
	password := getEnv("DB_PASSWORD", "sql")
	host := getEnv("DB_HOST", "127.0.0.1")
	port := getEnv("DB_PORT", "3306")
	dbname := getEnv("DB_NAME", "clinica_vet")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname)

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("Failed to connect to database: %v", err)
		panic("Erro ao conectar ao banco de dados. Check your DB credentials in .env")
	}

	// AutoMigrate in explicit order to respect foreign key dependencies
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

// getEnv returns the value of the environment variable or the fallback
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return fallback
}
