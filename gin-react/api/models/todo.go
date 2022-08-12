package models

type Todo struct {
	Name string `json:"name"`
	Complete bool `json:"complete"`
	ID string `json:"id"`
}