package models

import (
	"time"
)

type Cliente struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	Nome            string    `json:"nome" binding:"required"`
	Sobrenome       string    `json:"sobrenome"`
	Cpf             string    `json:"cpf" binding:"required"`
	Telefone        string    `json:"telefone"`
	Endereco        string    `json:"endereco"`
	Email           string    `json:"email" binding:"omitempty,email"`
	DataCadastro    time.Time `json:"data_cadastro"`
	DataAtualizacao time.Time `json:"data_atualizacao"`
	Pets            []Pet     `json:"pets" gorm:"foreignKey:ClienteID"`
}
