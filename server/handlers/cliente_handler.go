package handlers

import (
	"ClinicaVet/database"
	"ClinicaVet/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Listar Clientes
func GetClientes(c *gin.Context) {
	var clientes []models.Cliente
	database.BD.Find(&clientes)
	c.JSON(http.StatusOK, gin.H{"clientes": clientes})
}

// Buscar Cliente
func GetCliente(c *gin.Context) {
	var cliente models.Cliente
	id := c.Param("id")
	database.BD.First(&cliente, id)
	c.JSON(http.StatusOK, gin.H{"cliente": cliente})
}

// Criar Cliente
func CriarCliente(c *gin.Context) {
	var cliente models.Cliente
	if err := c.ShouldBindJSON(&cliente); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.BD.Create(&cliente)
	c.JSON(http.StatusOK, gin.H{"cliente": cliente})
}

// Atualizar Cliente
func AtualizarCliente(c *gin.Context) {
	var cliente models.Cliente
	id := c.Param("id")
	database.BD.First(&cliente, id)
	if cliente.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cliente nao encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&cliente); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.BD.Model(&cliente).Updates(cliente)
	c.JSON(http.StatusOK, gin.H{"cliente": cliente})
}

// Deletar Cliente
func DeletarCliente(c *gin.Context) {
	var cliente models.Cliente
	id := c.Param("id")
	database.BD.First(&cliente, id)
	if cliente.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cliente nao encontrado"})
		return
	}
	database.BD.Delete(&cliente)
	c.JSON(http.StatusOK, gin.H{"cliente": true})
}
