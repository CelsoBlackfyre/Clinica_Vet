package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"ClinicaVet/database"
	"ClinicaVet/models"
)

// Listar Vets
func GetVets(c *gin.Context) {
	var vets []models.Vet
	database.BD.Find(&vets)
	c.JSON(http.StatusOK, gin.H{"vets": vets})
}

// Listar Vet por ID
func GetVet(c *gin.Context) {
	var vet models.Vet
	id := c.Param("id")
	database.BD.First(&vet, id)
	c.JSON(http.StatusOK, gin.H{"vet": vet})
}

// Criar Vet
func CriarVet(c *gin.Context) {
	var vet models.Vet
	if err := c.ShouldBindJSON(&vet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.BD.Create(&vet)
	c.JSON(http.StatusOK, gin.H{"vet": vet})
}

// Atualizar Vet
func AtualizarVet(c *gin.Context) {
	var vet models.Vet
	id := c.Param("id")
	database.BD.First(&vet, id)
	if vet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vet nao encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&vet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.BD.Save(&vet)
	c.JSON(http.StatusOK, gin.H{"vet": vet})
}

func DeletarVet(c *gin.Context) {
	var vet models.Vet
	id := c.Param("id")
	database.BD.First(&vet, id)
	if vet.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vet nao encontrado"})
		return
	}
	database.BD.Delete(&vet)
	c.JSON(http.StatusOK, gin.H{"message": "Vet deletado com sucesso"})
}
