package models

import (
	"time"
)

type Cliente struct {
	ID              int       `json:"cliente_id" gorm:"primaryKey"`
	Nome            string    `json:"nome"`
	Sobrenome       string    `json:"sobrenome"`
	Cpf             string    `json:"cpf"`
	Telefone        string    `json:"telefone"`
	Endereco        string    `json:"endereco"`
	Email           string    `json:"email"`
	DataCadastro    time.Time `json:"data_cadastro"`
	DataAtualizacao time.Time `json:"data_atualizacao"`
	Pets            []Pet     `json:"pets" gorm:"foreignKey:ClienteID"`
}
