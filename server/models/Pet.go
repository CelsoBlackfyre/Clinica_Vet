package models

import (
	"time"
)

type Pet struct {
	ID              uint       `json:"id" gorm:"primaryKey"`
	Nome            string     `json:"nome"`
	Tipo            string     `json:"tipo"`
	Idade           uint       `json:"idade"`
	Peso            float64    `json:"peso"`
	Raca            string     `json:"raca"`
	DataCadastro    time.Time  `json:"data_cadastro"`
	DataAtualizacao time.Time  `json:"data_atualizacao"`
	ClienteID       uint       `json:"cliente_id"`
	Cliente         Cliente    `json:"cliente" gorm:"foreignKey:ClienteID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Consultas       []Consulta `json:"consultas" gorm:"foreignKey:PetID"`
}
