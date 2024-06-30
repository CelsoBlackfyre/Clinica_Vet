package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"ClinicaVet/database"
	"ClinicaVet/models"
)

// Listar Pets
func GetPets(c *gin.Context) {
	var pets []models.Pet
	database.BD.Find(&pets)
	c.JSON(http.StatusOK, gin.H{"pets": pets})
}

// Buscar Pet
func GetPet(c *gin.Context) {
	var pet models.Pet
	id := c.Param("id")

	database.BD.First(&pet, id)

	if pet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal nao encontrado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"pet": pet})
}

// Criar Pet
func CriarPet(c *gin.Context) {
	var pet models.Pet

	if err := c.ShouldBindJSON(&pet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.BD.Create(&pet)
	c.JSON(http.StatusOK, gin.H{"pet": pet})
}

// Deletar Pet
func DeletarPet(c *gin.Context) {
	var pet models.Pet
	id := c.Param("id")

	database.BD.First(&pet, id)

	if pet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal nao encontrado"})
		return
	}

	database.BD.Delete(&pet)
	c.JSON(http.StatusOK, gin.H{"pet": true})
}

// Atualizar Pet
func AtualizarPet(c *gin.Context) {
	var pet models.Pet
	id := c.Param("id")
	database.BD.First(&pet, id)
	if pet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal nao encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&pet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.BD.Save(&pet)
	c.JSON(http.StatusOK, gin.H{"pet": pet})
}
