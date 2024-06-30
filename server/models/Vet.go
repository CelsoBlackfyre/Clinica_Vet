package models

import (
	"time"
)

type Vet struct {
	ID              int        `json:"vet_id" gorm:"primaryKey"`
	Nome            string     `json:"nome"`
	Sobrenome       string     `json:"sobrenome"`
	Telefone        string     `json:"telefone"`
	DataCadastro    time.Time  `json:"data_cadastro"`
	DataAtualizacao time.Time  `json:"data_atualizacao"`
	Consultas       []Consulta `json:"consultas" gorm:"foreignKey:VetID"`
}
