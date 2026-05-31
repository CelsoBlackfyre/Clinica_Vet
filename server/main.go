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
	// Load .env file if it exists (graceful if missing)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading it. Using environment variables / defaults.")
	}

	r := gin.Default()

	// Serve static assets (ensure the path is correct when running the binary)
	r.Static("/assets", "./assets")

	// Configurable CORS (much safer than cors.Default())
	allowedOrigins := getAllowedOrigins()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

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

	port := getEnv("SERVER_PORT", "8080")
	log.Printf("Starting ClinicaVet server on port %s", port)
	r.Run(":" + port)
}

// getAllowedOrigins reads ALLOWED_ORIGINS from env (comma-separated)
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

// getEnv helper (duplicated here to avoid import cycle during early bootstrap)
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return fallback
}
