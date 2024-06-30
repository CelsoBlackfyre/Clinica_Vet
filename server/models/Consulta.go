package models

import (
	"time"
)

type Consulta struct {
	ID              int       `json:"consulta_id" gorm:"primaryKey"`
	Data            time.Time `json:"data"`
	Observacao      string    `json:"observacao"`
	PetID           int       `json:"pet_id"`
	VetID           int       `json:"vet_id"`
	DataCadastro    time.Time `json:"data_cadastro"`
	DataAtualizacao time.Time `json:"data_atualizacao"`
	Pet             Pet       `json:"pet" gorm:"foreignKey:PetID"`
	Vet             Vet       `json:"vet" gorm:"foreignKey:VetID"`
}
