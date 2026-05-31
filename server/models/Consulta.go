package models

import (
	"time"
)

type Consulta struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	Data            time.Time `json:"data" binding:"required"`
	Observacao      string    `json:"observacao"`
	PetID           uint      `json:"pet_id" binding:"required"`
	VetID           uint      `json:"vet_id" binding:"required"`
	DataCadastro    time.Time `json:"data_cadastro"`
	DataAtualizacao time.Time `json:"data_atualizacao"`
	Pet             Pet       `json:"pet" gorm:"foreignKey:PetID"`
	Vet             Vet       `json:"vet" gorm:"foreignKey:VetID"`
}
