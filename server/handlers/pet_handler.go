package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"ClinicaVet/database"
	"ClinicaVet/models"
)

func GetPets(c *gin.Context) {
	var pets []models.Pet
	database.BD.Find(&pets)
	c.JSON(http.StatusOK, gin.H{"pets": pets})
}

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

func CriarPet(c *gin.Context) {
	var pet models.Pet

	if err := c.ShouldBindJSON(&pet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()})
		return
	}

	database.BD.Create(&pet)
	c.JSON(http.StatusCreated, gin.H{"pet": pet})
}

func DeletarPet(c *gin.Context) {
	var pet models.Pet
	id := c.Param("id")

	database.BD.First(&pet, id)

	if pet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal nao encontrado"})
		return
	}

	database.BD.Delete(&pet)
	c.JSON(http.StatusOK, gin.H{"message": "Pet deletado com sucesso"})
}

func AtualizarPet(c *gin.Context) {
	var pet models.Pet
	id := c.Param("id")
	database.BD.First(&pet, id)
	if pet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal nao encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&pet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()})
		return
	}
	database.BD.Save(&pet)
	c.JSON(http.StatusOK, gin.H{"pet": pet})
}
