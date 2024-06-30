package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"ClinicaVet/database"
	"ClinicaVet/handlers"
)

func main() {
	r := gin.Default()
	r.Static("/assets", "./assets")
	r.Use(cors.Default())

	database.Connect()

	// Rotas de Pets
	r.GET("/pets", handlers.GetPets)
	r.GET("/pets/:id", handlers.GetPet)
	r.POST("/pets", handlers.CriarPet)
	r.PUT("/pets/:id", handlers.AtualizarPet)
	r.DELETE("/pets/:id", handlers.DeletarPet)

	// Rotas de Vets
	r.GET("/vets", handlers.GetVets)
	r.GET("/vets/:id", handlers.GetVet)
	r.POST("/vets", handlers.CriarVet)
	r.PUT("/vets/:id", handlers.AtualizarVet)
	r.DELETE("/vets/:id", handlers.DeletarVet)

	// Rotas de Consultas
	r.GET("/consultas", handlers.GetConsultas)
	r.GET("/consultas/:id", handlers.GetConsulta)
	r.POST("/consultas", handlers.NovaConsulta)
	r.PUT("/consultas/:id", handlers.AtualizarConsulta)
	r.DELETE("/consultas/:id", handlers.DeletarConsulta)

	r.GET("/clientes", handlers.GetClientes)
	r.GET("/clientes/:id", handlers.GetCliente)
	r.POST("/clientes", handlers.CriarCliente)
	r.PUT("/clientes/:id", handlers.AtualizarCliente)
	r.DELETE("/clientes/:id", handlers.DeletarCliente)

	r.Run(":8080")
}
