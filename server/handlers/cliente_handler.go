package handlers

import (
	"ClinicaVet/database"
	"ClinicaVet/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetClientes(c *gin.Context) {
	var clientes []models.Cliente
	database.BD.Find(&clientes)
	c.JSON(http.StatusOK, gin.H{"clientes": clientes})
}

func GetCliente(c *gin.Context) {
	var cliente models.Cliente
	id := c.Param("id")
	database.BD.First(&cliente, id)
	if cliente.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cliente nao encontrado"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"cliente": cliente})
}

func CriarCliente(c *gin.Context) {
	var cliente models.Cliente
	if err := c.ShouldBindJSON(&cliente); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()})
		return
	}
	database.BD.Create(&cliente)
	c.JSON(http.StatusCreated, gin.H{"cliente": cliente})
}

func AtualizarCliente(c *gin.Context) {
	var cliente models.Cliente
	id := c.Param("id")
	database.BD.First(&cliente, id)
	if cliente.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cliente nao encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&cliente); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()})
		return
	}
	database.BD.Model(&cliente).Updates(cliente)
	c.JSON(http.StatusOK, gin.H{"cliente": cliente})
}

func DeletarCliente(c *gin.Context) {
	var cliente models.Cliente
	id := c.Param("id")
	database.BD.First(&cliente, id)
	if cliente.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cliente nao encontrado"})
		return
	}
	database.BD.Delete(&cliente)
	c.JSON(http.StatusOK, gin.H{"message": "Cliente deletado com sucesso"})
}
