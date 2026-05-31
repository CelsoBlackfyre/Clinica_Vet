package main

import (
	"log"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"ClinicaVet/database"
	"ClinicaVet/handlers"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading it. Using environment variables / defaults.")
	}

	r := gin.Default()

	r.Static("/assets", "./assets")

	allowedOrigins := getAllowedOrigins()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	database.Connect()

	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	r.GET("/pets", handlers.GetPets)
	r.GET("/pets/:id", handlers.GetPet)
	r.POST("/pets", handlers.CriarPet)
	r.PUT("/pets/:id", handlers.AtualizarPet)
	r.DELETE("/pets/:id", handlers.DeletarPet)

	r.GET("/vets", handlers.GetVets)
	r.GET("/vets/:id", handlers.GetVet)
	r.POST("/vets", handlers.CriarVet)
	r.PUT("/vets/:id", handlers.AtualizarVet)
	r.DELETE("/vets/:id", handlers.DeletarVet)

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

	port := getEnv("SERVER_PORT", "8080")
	log.Printf("Starting ClinicaVet server on port %s", port)
	r.Run(":" + port)
}

func getAllowedOrigins() []string {
	originsStr := getEnv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
	if originsStr == "" {
		return []string{"*"}
	}
	origins := strings.Split(originsStr, ",")
	for i := range origins {
		origins[i] = strings.TrimSpace(origins[i])
	}
	return origins
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return fallback
}
