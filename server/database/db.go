package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"ClinicaVet/models"
)

var BD *gorm.DB

func Connect() {
	dsn := "root:sql@tcp(127.0.0.1:3306)/clinica_vet?charset=utf8mb4&parseTime=True&loc=Local"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Erro ao conectar ao banco de dados")
	}

	err = database.AutoMigrate(&models.Pet{})
	if err != nil {
		panic("Erro ao migrar o banco de dados")
	}

	err = database.AutoMigrate(&models.Cliente{})
	if err != nil {
		panic("Erro ao migrar o banco de dados")
	}

	err = database.AutoMigrate(&models.Vet{})
	if err != nil {
		panic("Erro ao migrar o banco de dados")
	}

	err = database.AutoMigrate(&models.Consulta{})
	if err != nil {
		panic("Erro ao migrar o banco de dados")
	}
	BD = database
}
