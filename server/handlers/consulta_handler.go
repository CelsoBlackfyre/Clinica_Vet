package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"ClinicaVet/database"
	"ClinicaVet/models"
)

// Buscar Consulta
func GetConsulta(c *gin.Context) {
	var consulta models.Consulta
	id := c.Param("id")
	database.BD.First(&consulta, id)
	c.JSON(http.StatusOK, gin.H{"consulta": consulta})
}

// Listar Consultas
func GetConsultas(c *gin.Context) {
	var consultas []models.Consulta
	database.BD.Find(&consultas)
	c.JSON(http.StatusOK, gin.H{"consultas": consultas})
}

// Criar Consulta
func NovaConsulta(c *gin.Context) {
	var consulta models.Consulta
	if err := c.ShouldBindJSON(&consulta); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.BD.Create(&consulta)
	c.JSON(http.StatusOK, gin.H{"consulta": consulta})
}

// Atualizar Consulta
func AtualizarConsulta(c *gin.Context) {
	var consulta models.Consulta
	id := c.Param("id")
	database.BD.First(&consulta, id)
	if consulta.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Consulta nao encontrada"})
		return
	}
	if err := c.ShouldBindJSON(&consulta); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.BD.Save(&consulta)
	c.JSON(http.StatusOK, gin.H{"consulta": consulta})
}

// Deletar Consulta
func DeletarConsulta(c *gin.Context) {
	var consulta models.Consulta
	id := c.Param("id")
	database.BD.First(&consulta, id)
	if consulta.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Consulta nao encontrada"})
		return
	}
	database.BD.Delete(&consulta)
	c.JSON(http.StatusOK, gin.H{"message": "Consulta deletada com sucesso"})
}
